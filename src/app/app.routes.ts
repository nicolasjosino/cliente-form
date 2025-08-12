import { Routes } from '@angular/router';
import { CreateUpdateClient } from './components/create-update-client/create-update-client';

  {
    path: 'clients/create',
    component: CreateUpdateClient,
  },
  {
    path: 'clients/:id',
    component: CreateUpdateClient,
  },
];
