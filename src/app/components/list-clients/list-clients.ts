import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal';
@Component({
  selector: 'app-list-clients',
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    PanelModule,
    ConfirmModalComponent,
  ],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.scss',
})
export class ListClients implements OnInit {
  loading = false;
  clients: Client[] = [];
  @ViewChild('deleteModal') deleteModal!: ConfirmModalComponent;
  selectedClientId!: number;

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
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar clientes.',
        });
      },
    });
  }

  editClient(client: Client) {
    this.router.navigate(['/clients', client.id]);
  }

  confirmDelete(client: Client) {
    this.selectedClientId = client.id!;
    this.deleteModal.show();
  }

  deleteClient() {
    this.clientService.deleteClient(this.selectedClientId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Exclusão',
          detail: 'Cliente excluído com sucesso.',
        });
        this.loadClients();
      },
      error: () => console.error('Erro ao excluir cliente'),
    });
  }
}
