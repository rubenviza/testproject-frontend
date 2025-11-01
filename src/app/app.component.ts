import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { Client } from './models/client';

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
  //   this.http.get<Client[]>('http://localhost:8000/api/clientes/'),
  //   {
  //     initialValue: [],
  //   }
  // );

  private clientsResource = httpResource<Client[]>(
    () => 'http://localhost:8000/api/clientes/'
  );
  protected clients = computed(
    () => this.clientsResource.value() ?? ([] as Client[])
  );

  protected clientSearchItem = computed(() => {
    const client = this.clientSearch();
    if (client === null) {
      return 'Cliente no encontrado';
    }
    return client ? `${client.nombre} - ${client.email}` : '';
  });

  // private clientSearch = toSignal(
  //   this.clientInput.valueChanges.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((id) => {
  //       if (!id || isNaN(Number(id))) {
  //         return of(undefined);
  //       }
  //       return this.http
  //         .post<Client>('http://localhost:8000/api/cliente/', {
  //           id,
  //         })
  //         .pipe(catchError(() => of(null)));
  //     })
  //   )
  // );

  private clientSearch = computed(() => this.clientResource.value());

  private clientId = toSignal(
    this.clientInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
  );

  private clientResource = rxResource({
    params: () => ({ id: this.clientId() }),
    stream: ({ params }) => {
      const id = params.id;
      if (!id || isNaN(Number(id))) {
        return of(undefined);
      }
      return this.http
        .post<Client>('http://localhost:8000/api/cliente/', {
          id,
        })
        .pipe(catchError(() => of(null)));
    },
  });
}
