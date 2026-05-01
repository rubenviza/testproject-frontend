import { Client } from './client';

export type ClientExtended = Pick<Client, 'id' | 'nombre'> & {
  edad: number;
  telephoneNumber: string;
  alias: string;
  hasAlias: boolean;
  hasTelephoneNumber: boolean;
};
