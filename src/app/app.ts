import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menubar } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menubar, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('cliente-form');
  protected readonly items = [
    {
      label: 'Clientes',
      items: [
        { label: 'Listar', icon: 'pi pi-fw pi-list', routerLink: '/clients' },
        {
          label: 'Criar',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/clients/create',
        },
      ],
    },
  ];
}
