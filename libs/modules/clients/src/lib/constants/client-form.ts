import { max, minLength, required, schema } from '@angular/forms/signals';
import { ClientExtended } from '../models/client-extended';

export const clientFormInitialData = {
  id: NaN,
  nombre: '',
  edad: null,
  telephoneNumber: '',
};

export const clientFormSchema = schema<ClientExtended>((path) => {
  required(path.nombre, { message: 'Name is required' });
  required(path.telephoneNumber, {
    message: 'Telephone number is required',
  });
  max(path.edad, 100, { message: 'Maximum age is 100' });
  minLength(path.telephoneNumber, 7, {
    message: 'Minimum 7 characters long',
  });
});
