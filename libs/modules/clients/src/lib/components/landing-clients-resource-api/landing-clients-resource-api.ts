import { CommonModule } from '@angular/common';
import { HttpClient, httpResource } from '@angular/common/http';
import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import {
  rxResource,
  takeUntilDestroyed,
  toSignal,
} from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { catchError, debounceTime, distinctUntilChanged, of, tap } from 'rxjs';
import { occupations } from '../../constants/occupations';
import { Client } from '../../models/client';
import { Occupation } from '../../models/occupation';

@Component({
  selector: 'lib-clients-resource-api',
  templateUrl: './landing-clients-resource-api.html',
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule],
})
export class LandingClientsResourceApiComponent {
  constructor() {
    effect(() => {
      const occupation = this.clientSearch()?.occupation ?? null;
      this.occupationSelectControl.setValue(occupation, {
        emitEvent: false,
      });
    });

    this.occupationSelectControl.valueChanges
      .pipe(
        takeUntilDestroyed(),
        tap((occupation) => {
          const icon = occupation?.icon;
          if (icon) {
            this.occupationIcon.set(icon);
          }
        })
      )
      .subscribe();
  }

  private http = inject(HttpClient);

  protected occupations = occupations;

  protected clientIdControl = new FormControl('');

  protected occupationSelectControl = new FormControl<Occupation | null>(null);

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

  private clientSearch = computed(() => this.clientSearchResource.value());

  private clientId = toSignal(
    this.clientIdControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
  );

  private clientSearchResource = rxResource({
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

  protected occupationIcon = linkedSignal({
    source: this.clientSearch,
    computation: (client) => {
      const id = client?.occupation.id;
      if (!id) {
        return '';
      }
      return this.occupations.find((item) => item.id === id)?.icon ?? '';
    },
  });

  public compareOccupation(o1: Occupation, o2: Occupation): boolean {
    return o1 && o2 && o1.id === o2.id;
  }
}
