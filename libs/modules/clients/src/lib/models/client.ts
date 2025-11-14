import { Occupation } from './occupation';

export type Client = {
  id: number;
  nombre: string;
  email: string;
  occupation: Occupation;
};
