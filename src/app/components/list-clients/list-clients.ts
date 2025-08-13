import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-clients',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    PanelModule,
  ],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.scss',
})
export class ListClients implements OnInit {
  loading = false;
  clients: Client[] = [];
  constructor(
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        console.error('Erro ao carregar clientes');
      },
    });
  }

  editClient(client: Client) {
    this.router.navigate(['/clients', client.id]);
  }

  deleteClient(client: Client) {
    if (confirm(`Tem certeza de que deseja excluir ${client.name}?`)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Exclusão',
        detail: 'Cliente excluído com sucesso.',
      });
      this.clientService.deleteClient(client.id!).subscribe({
        next: () => {
          this.loadClients();
        },
        error: () => console.error('Erro ao excluir cliente'),
      });
    }
  }
}
