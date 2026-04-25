import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  clientFormInitialData,
  clientFormSchema,
} from '../../constants/client-form';
import { listColor } from '../../constants/list-color';
import { ClientExtended } from '../../models/client-extended';
import { HeaderClientsComponent } from '../header-clients/header-clients';

@Component({
  selector: 'lib-extended-client-signal-form',
  imports: [
    HeaderClientsComponent,
    FormField,
    FormRoot,
    JsonPipe,
    MatInputModule,
    MatButtonModule,
  ],
  styleUrl: './extended-client-signal-form.scss',
  templateUrl: './extended-client-signal-form.html',
})
export class ExtendedClientSignalForm {
  protected listColor = listColor;

  protected readonly person = signal<ClientExtended>(clientFormInitialData);

  protected readonly personForm = form(this.person, clientFormSchema, {
    submission: {
      action: async () =>
        console.log('Form submitted with value:', this.person()),
      //onInvalid: () => console.log('Form is invalid'),
      ignoreValidators: 'none',
    },
  });

  public changePersonName(value: string) {
    this.personForm.nombre().value.set(value);
  }
}
