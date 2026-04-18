import { Component } from '@angular/core';
import { ExtendedClientSignalForm } from '../components/extended-client-signal-form/extended-client-signal-form';
import { LandingClientsResourceApiComponent } from '../components/landing-clients/with-resource-api/with-resource-api';
import { LandingClientsStoreUsageComponent } from '../components/landing-clients/with-store-usage/with-store-usage';
import { LandingClientsComponent } from '../components/landing-clients/with-to-signal/with-to-signal';

@Component({
  selector: 'lib-clients-container',
  imports: [
    LandingClientsComponent,
    LandingClientsResourceApiComponent,
    LandingClientsStoreUsageComponent,
    ExtendedClientSignalForm,
  ],
  templateUrl: './clients-container.html',
})
export class LandingClientsContainer {}
