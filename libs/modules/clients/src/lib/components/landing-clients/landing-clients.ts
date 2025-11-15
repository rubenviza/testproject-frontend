import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { isNumber } from '@frontend/utilities';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
} from 'rxjs';
import { Client } from '../../models/client';

@Component({
  selector: 'lib-clients',
  templateUrl: './landing-clients.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class LandingClientsComponent {
  private http = inject(HttpClient);

  protected clientInput = new FormControl('');

  protected clients = toSignal(
    this.http.get<Client[]>('http://localhost:8000/api/clientes/'),
    {
      initialValue: [],
    }
  );

  protected clientSearchItem = computed(() => {
    const client = this.clientSearch();
    if (client === null) {
      return 'Cliente no encontrado';
    }
    return client ? `${client.nombre} - ${client.email}` : '';
  });

  private clientSearch = toSignal(
    this.clientInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id) => {
        if (!id || !isNumber(id)) {
          return of(undefined);
        }
        return this.http
          .post<Client>('http://localhost:8000/api/cliente/', {
            id,
          })
          .pipe(catchError(() => of(null)));
      })
    )
  );
}
