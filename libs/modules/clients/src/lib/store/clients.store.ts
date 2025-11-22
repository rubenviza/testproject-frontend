import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { pipe } from 'rxjs/internal/util/pipe';
import { Client } from '../models/client';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, EMPTY, map, switchMap, tap } from 'rxjs';
import { ClientsService } from '../services/clients.service';

type ClientsList = { clients: Client[]; loading: boolean };

const initialState: ClientsList = { clients: [], loading: false };

export const ClientsStore = signalStore(
  withState(initialState),
  withMethods((store, clientsService = inject(ClientsService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          clientsService.getClients().pipe(
            map((clients) => patchState(store, { clients, loading: false })),
            catchError(() => {
              patchState(store, { clients: [], loading: false });
              return EMPTY;
            })
          )
        )
      )
    ),
  })),
  withHooks({ onInit: (store) => store.loadAll() })
);
