import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ClientsStore } from '../../../store/clients.store';
import { HeaderClientsComponent } from '../../header-clients/header-clients';

@Component({
  selector: 'lib-landing-clients-store-usage',
  imports: [CommonModule, HeaderClientsComponent],
  templateUrl: './with-store-usage.html',
  providers: [ClientsStore, ClientsService],
})
export class LandingClientsStoreUsageComponent {
  private clientsStore = inject(ClientsStore);

  protected clients = this.clientsStore.clients;

  protected loading = this.clientsStore.loading;
}
