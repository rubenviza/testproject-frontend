import { Component } from '@angular/core';
import { LandingClientsResourceApiComponent } from '../landing-clients-resource-api/landing-clients-resource-api';
import { LandingClientsStoreUsageComponent } from '../landing-clients-store-usage/landing-clients-store-usage';
import { LandingClientsComponent } from '../landing-clients/landing-clients';

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
