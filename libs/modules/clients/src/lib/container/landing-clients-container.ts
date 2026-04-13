import { Component } from '@angular/core';
import { LandingClientsResourceApiComponent } from '../components/landing-clients/with-resource-api/with-resource-api';
import { LandingClientsStoreUsageComponent } from '../components/landing-clients/with-store-usage/with-store-usage';
import { LandingClientsComponent } from '../components/landing-clients/with-to-signal/with-to-signal';

@Component({
  selector: 'lib-landing-clients-container',
  imports: [
    LandingClientsComponent,
    LandingClientsResourceApiComponent,
    LandingClientsStoreUsageComponent,
  ],
  templateUrl: './landing-clients-container.html',
})
export class LandingClientsContainer {}
