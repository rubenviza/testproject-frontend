import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { isNumber } from '@frontend/utilities';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { listColor } from '../../constants/list-color';
import { Client } from '../../models/client';
import { ClientsService } from '../../services/clients.service';
import { HeaderClientsComponent } from '../header-clients/header-clients';

@Component({
  selector: 'lib-clients',
  templateUrl: './landing-clients.html',
  imports: [CommonModule, ReactiveFormsModule, HeaderClientsComponent],
  providers: [ClientsService],
})
export class LandingClientsComponent {
  private http = inject(HttpClient);

  private clientsService = inject(ClientsService);

  protected clientInput = new FormControl('');

  protected listColor = listColor;

  protected loading = signal(true);

  protected clients = toSignal(
    this.clientsService.getClients().pipe(tap(() => this.loading.set(false))),
    {
      initialValue: [] as Client[],
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
