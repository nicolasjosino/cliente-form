import { Routes } from '@angular/router';
import { CreateUpdateClient } from './components/create-update-client/create-update-client';
import { ListClients } from './components/list-clients/list-clients';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    component: ListClients,
  },
  {
    path: 'clients/create',
    component: CreateUpdateClient,
  },
  {
    path: 'clients/:id',
    component: CreateUpdateClient,
  },
];
