import {
  applyWhen,
  max,
  minLength,
  required,
  schema,
  validate,
} from '@angular/forms/signals';
import { ClientExtended } from '../models/client-extended';

export const clientFormInitialData = {
  id: NaN,
  nombre: '',
  edad: NaN,
  telephoneNumber: '',
  hasTelephoneNumber: true,
  alias: '',
  hasAlias: false,
};

export const clientFormSchema = schema<ClientExtended>((path) => {
  required(path.nombre, { message: 'Name is required' });
  applyWhen(
    path.telephoneNumber,
    ({ valueOf }) => valueOf(path.hasTelephoneNumber),
    (phonePath) => {
      required(phonePath, {
        message: 'Telephone number is required',
      });
      minLength(phonePath, 7, {
        message: 'Minimum 7 characters long',
      });
    }
  );
  required(path.alias, {
    //message: 'Alias is required',
    when: ({ valueOf }) => valueOf(path.hasAlias),
  });
  validate(path.hasAlias, (ctx) => {
    const hasAlias = ctx.value();
    const hasTelephoneNumber = ctx.valueOf(path.hasTelephoneNumber);
    if (hasAlias || hasTelephoneNumber) {
      return null;
    }
    return {
      kind: 'aliasOrPhoneRequired',
      message: 'At least alias or phone must be provided',
    };
  });
  max(path.edad, 100, { message: 'Maximum age is 100' });
});
