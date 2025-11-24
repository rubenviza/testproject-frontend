import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Client } from '../models/client';

export class ClientsService {
  private http = inject(HttpClient);

  public getClients() {
    return this.http.get<Client[]>('http://localhost:8000/api/clientes/');
  }
}
