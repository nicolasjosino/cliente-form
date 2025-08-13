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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { LogService } from '../../services/log.service';
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
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './list-clients.html',
  styleUrl: './list-clients.scss',
})
export class ListClients implements OnInit {
  loading = false;
  clients: Client[] = [];
  filteredClients: Client[] = []; // Lista já filtrada para mostrar na tela
  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();
  @ViewChild('deleteModal') deleteModal!: ConfirmModalComponent;
  selectedClientId!: number;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private messageService: MessageService,
    private logService: LogService
  ) {}

  ngOnInit(): void {
    this.loadClients();

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((searchTerm) => {
        this.applyFilter(searchTerm ?? '');
      });
  }

  applyFilter(searchTerm: string) {
    if (!searchTerm) {
      this.filteredClients = [...this.clients]; // se vazio, mostra tudo
      return;
    }

    const term = searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.cpf?.includes(term) ||
        client.country?.name.toLowerCase().includes(term) ||
        client.state?.name.toLowerCase().includes(term)
    );
  }

  loadClients() {
    this.loading = true;
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = data;
        this.loading = false;
        this.logService.info('Clientes carregados com sucesso', 'ListClients', {
          clients: data,
        });
      },
      error: () => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar clientes.',
        });
        this.logService.error('Erro ao carregar clientes', 'ListClients');
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
