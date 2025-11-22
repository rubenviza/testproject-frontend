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
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'lib-clients',
  templateUrl: './landing-clients.html',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [ClientsService],
})
export class LandingClientsComponent {
  private http = inject(HttpClient);

  private clientsService = inject(ClientsService);

  protected clientInput = new FormControl('');

  protected clients = toSignal(this.clientsService.getClients(), {
    initialValue: [] as Client[],
  });

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
