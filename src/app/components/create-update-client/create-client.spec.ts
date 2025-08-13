import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { ClientService } from '../../services/client.service';
import { CreateUpdateClient } from './create-update-client';
import { Client } from '../../models/client.model';

describe('CreateClient', () => {
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
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      imports: [
        CreateUpdateClient, // standalone
        NoopAnimationsModule,
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map() },
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

    fixture = TestBed.createComponent(CreateUpdateClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should mark CPF invalid if empty', () => {
  //   component.form.get('cpf')?.setValue('');
  //   component.validateCpf();
  //   expect(component.isCpfValid).toBeFalse();
  // });

  // it('should mark CPF invalid if length is not 11', () => {
  //   component.form.get('cpf')?.setValue('12345');
  //   component.validateCpf();
  //   expect(component.isCpfValid).toBeFalse();
  // });

  // it('should mark CPF valid for a correct CPF', () => {
  //   component.form.get('cpf')?.setValue('52998224725');
  //   component.validateCpf();
  //   expect(component.isCpfValid).toBeTrue();
  // });

  // it('should add required validator to CPF when country is Brazil', () => {
  //   component.form.get('country')?.setValue({ name: 'Brasil', code: 'BR' });
  //   expect(
  //     component.form.get('cpf')?.hasValidator(Validators.required)
  //   ).toBeTrue();
  // });

  // it('should remove required validator from CPF when country is not Brazil', () => {
  //   component.form.get('country')?.setValue({ name: 'USA', code: 'US' });
  //   expect(
  //     component.form.get('cpf')?.hasValidator(Validators.required)
  //   ).toBeFalse();
  // });

  // it('should validate birthDate correctly', () => {
  //   const futureDate = new Date();
  //   futureDate.setDate(futureDate.getDate() + 1);
  //   component.form.get('birthDate')?.setValue(futureDate);
  //   component.validateDate();
  //   expect(component.form.get('birthDate')?.errors).toEqual({
  //     invalidDate: true,
  //   });
  // });

  it('should call createClient when not editing', () => {
    clientServiceSpy.createClient.and.returnValue(of(mockClient));
    component.form.patchValue(mockClient);

    component.onSubmit();
    expect(clientServiceSpy.createClient).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/clients']);
  });
});
