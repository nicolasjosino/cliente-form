import { Country, State } from '../utils/localities';

export interface Client {
  id?: number;
  name: string;
  email: string;
  // cpf: string;
  birthDate: string; //TODO: Use Date
  contact: string;
  country?: Country;
  state?: State;
}
