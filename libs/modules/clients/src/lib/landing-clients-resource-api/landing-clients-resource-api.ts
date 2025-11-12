import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import { Component, computed, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, of } from 'rxjs';
import { Client } from '../models/client';

@Component({
  selector: 'lib-clients-resource-api',
  templateUrl: './landing-clients-resource-api.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class LandingClientsResourceApiComponent {
  private http = inject(HttpClient);

  protected clientInput = new FormControl('');

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
