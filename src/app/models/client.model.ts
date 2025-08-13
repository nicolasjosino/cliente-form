import { Country, State } from '../utils/localities';

export interface Client {
  id: number;
  name: string;
  email: string;
  cpf: string;
  birthDate: Date;
  phone: string;
  country?: Country;
  state?: State;
}
