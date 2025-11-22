import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientsService } from '../../services/clients.service';
import { ClientsStore } from '../../store/clients.store';

@Component({
  selector: 'lib-landing-clients-store-usage',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './landing-clients-store-usage.html',
  providers: [ClientsStore, ClientsService],
})
export class LandingClientsStoreUsageComponent {
  private clientsStore = inject(ClientsStore);

  protected clients = this.clientsStore.clients;

  protected loading = this.clientsStore.loading;
}
