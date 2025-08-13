import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { ListClients } from './list-clients';

describe('ListClients', () => {
  let component: ListClients;
  let fixture: ComponentFixture<ListClients>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockClients: Client[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@email.com',
      cpf: '123',
      country: { name: 'Brazil', code: 'BR', states: [] },
      state: { name: 'SP', code: 'SP', countryCode: 'BR' },
      phone: '111-1111',
      birthDate: new Date('1990-01-01'),
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@email.com',
      cpf: '456',
      country: { name: 'USA', code: 'US', states: [] },
      state: { name: 'CA', code: 'CA', countryCode: 'US' },
      phone: '222-2222',
      birthDate: new Date('1985-05-05'),
    },
  ];

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'getClients',
      'deleteClient',
    ]);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ListClients, ReactiveFormsModule],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ConfirmationService,
          useValue: jasmine.createSpyObj('ConfirmationService', ['confirm']),
        },
        provideAnimations(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ListClients);
    component = fixture.componentInstance;

    clientServiceSpy.getClients.and.returnValue(of(mockClients));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    expect(component.clients).toEqual(mockClients);
    expect(component.filteredClients).toEqual(mockClients);
    expect(component.loading).toBeFalse();
  });

  it('should filter clients by name', () => {
    component.applyFilter('Alice');
    expect(component.filteredClients.length).toBe(1);
    expect(component.filteredClients[0].name).toBe('Alice');
  });

  it('should filter clients by email', () => {
    component.applyFilter('bob@email.com');
    expect(component.filteredClients.length).toBe(1);
    expect(component.filteredClients[0].email).toBe('bob@email.com');
  });

  it('should reset filter if search term is empty', () => {
    component.applyFilter('');
    expect(component.filteredClients).toEqual(mockClients);
  });

  it('should handle error when loading clients', () => {
    clientServiceSpy.getClients.and.returnValue(
      throwError(() => new Error('fail'))
    );
    component.loadClients();
    expect(component.loading).toBeFalse();
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      jasmine.objectContaining({
        severity: 'error',
        summary: 'Erro',
      })
    );
  });

  it('should navigate to edit client', () => {
    const client = mockClients[0];
    component.editClient(client);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients', client.id]);
  });

  it('should delete client and reload list', () => {
    clientServiceSpy.deleteClient.and.returnValue(of(void 0));
    spyOn(component, 'loadClients');
    component.selectedClientId = mockClients[0].id!;
    component.deleteClient();
    expect(clientServiceSpy.deleteClient).toHaveBeenCalledWith(
      mockClients[0].id
    );
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      jasmine.objectContaining({
        severity: 'error',
        summary: 'Exclusão',
      })
    );
    expect(component.loadClients).toHaveBeenCalled();
  });

  it('should handle error on delete client', () => {
    clientServiceSpy.deleteClient.and.returnValue(
      throwError(() => new Error('fail'))
    );
    spyOn(console, 'error');
    component.selectedClientId = mockClients[0].id!;
    component.deleteClient();
    expect(console.error).toHaveBeenCalledWith('Erro ao excluir cliente');
  });

  it('should clean up on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
