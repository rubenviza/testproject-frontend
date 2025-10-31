import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  httpResource,
  HttpStatusCode,
} from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  of,
  switchMap,
} from 'rxjs';
import { ClientData } from './models/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppComponent {
  private http = inject(HttpClient);

  protected clientInput = new FormControl('');

  // protected clients = toSignal(
  //   this.http.get<ClientData[]>('http://localhost:8000/api/clientes/'),
  //   {
  //     initialValue: [],
  //   }
  // );

  private clientsResource = httpResource<ClientData[]>(
    () => 'http://localhost:8000/api/clientes/'
  );
  protected clients = computed(
    () => this.clientsResource.value() ?? ([] as ClientData[])
  );

  protected clientSearchItem = computed(() => {
    const client = this.clientSearch();
    return client ? `${client.nombre} - ${client.email}` : '';
  });

  private clientSearch = toSignal(
    this.clientInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id) => {
        if (!id || isNaN(Number(id))) {
          return of(null);
        }
        return this.http
          .post<ClientData>('http://localhost:8000/api/cliente/', {
            id,
          })
          .pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === HttpStatusCode.NotFound) {
                console.log('Cliente no encontrado');
              }
              return EMPTY;
            })
          );
      })
    )
  );

  // private clientSearch = httpResource<any>(() => ({
  //   url: 'http://localhost:8000/api/cliente/',
  //   method: 'POST',
  //   body: { id: this.clientId() ?? false },
  // }));
}
