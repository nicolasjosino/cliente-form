import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';
import { CreateUpdateClient } from './create-update-client';

describe('UpdateClient', () => {
  let component: CreateUpdateClient;
  let fixture: ComponentFixture<CreateUpdateClient>;
  let clientServiceSpy: jasmine.SpyObj<ClientService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  const mockClient: Client = {
    id: 123,
    name: 'John Doe',
    email: 'john@example.com',
    cpf: '52998224725',
    birthDate: new Date('1990-01-01'),
    phone: '1234567890',
    country: { name: 'Brasil', code: 'BR', states: [] },
    state: { name: 'São Paulo', code: 'SP', countryCode: 'BR' },
  };

  beforeEach(async () => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', [
      'getClientById',
      'createClient',
      'updateClient',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [CreateUpdateClient, NoopAnimationsModule],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map([['id', '123']]) }, // edit mode
          },
        },
        {
          provide: ConfirmationService,
          useValue: jasmine.createSpyObj('ConfirmationService', ['confirm']),
        },
      ],
    }).compileComponents();
  });

  function setRouteParam(id: string) {
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { paramMap: new Map([['id', id]]) } },
    });
  }

  beforeEach(() => {
    clientServiceSpy.getClientById.and.returnValue(of(mockClient));
    clientServiceSpy.updateClient.and.returnValue(of(mockClient));

    fixture = TestBed.createComponent(CreateUpdateClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateClient when editing', () => {
    component.form.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      birthDate: new Date('1990-01-01'),
    });

    component.onSubmit();

    expect(clientServiceSpy.updateClient).toHaveBeenCalledWith(
      '123',
      jasmine.any(Object)
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('should set loading false on loadClient error', () => {
    component.clientId = '123';
    component.isEdit = true;
    clientServiceSpy.getClientById.and.returnValue(
      throwError(() => new Error('error'))
    );
    component.loadClient();
    expect(component.loading).toBeFalse();
  });
});
