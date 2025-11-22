import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { delay } from 'rxjs';
import { Client } from '../models/client';

export class ClientsService {
  private http = inject(HttpClient);

  public getClients() {
    return this.http
      .get<Client[]>('http://localhost:8000/api/clientes/')
      .pipe(delay(2000));
  }
}
