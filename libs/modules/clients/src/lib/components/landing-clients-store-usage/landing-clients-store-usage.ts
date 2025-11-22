import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { ClientsStore } from '../../store/clients.store';

@Component({
  selector: 'lib-landing-clients-store-usage',
  imports: [CommonModule],
  templateUrl: './landing-clients-store-usage.html',
  providers: [ClientsStore, ClientsService],
})
export class LandingClientsStoreUsageComponent {
  private clientsStore = inject(ClientsStore);

  protected clients = this.clientsStore.clients;
}
