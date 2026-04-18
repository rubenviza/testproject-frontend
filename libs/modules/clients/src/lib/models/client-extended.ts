import { Client } from './client';

export type ClientExtended = Pick<Client, 'id' | 'nombre'> & {
  edad: number | null;
  telephoneNumber: string;
  alias?: string;
};
