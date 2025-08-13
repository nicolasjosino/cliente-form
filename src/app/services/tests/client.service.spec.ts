import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ClientService } from '../client.service';
import { Client } from '../../models/client.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  const mockClient: Client = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    cpf: '52998224725',
    birthDate: new Date('01/01/1990'),
    phone: '1234567890',
    country: { name: 'Brasil', code: 'BR', states: [] },
    state: { name: 'São Paulo', code: 'SP', countryCode: 'BR' },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService],
    });

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all clients', () => {
    service.getClients().subscribe((clients) => {
      expect(clients).toEqual([mockClient]);
    });

    const req = httpMock.expectOne('http://localhost:3000/clients');
    expect(req.request.method).toBe('GET');
    req.flush([mockClient]);
  });

  it('should fetch a client by ID', () => {
    service.getClientById('1').subscribe((client) => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne('http://localhost:3000/clients/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockClient);
  });

  it('should create a client', () => {
    service.createClient(mockClient).subscribe((client) => {
      expect(client).toEqual(mockClient);
    });

    const req = httpMock.expectOne('http://localhost:3000/clients');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockClient);
    req.flush(mockClient);
  });

  it('should update a client', () => {
    const updatedClient = { ...mockClient, name: 'Jane Doe' };

    service.updateClient('1', updatedClient).subscribe((client) => {
      expect(client).toEqual(updatedClient);
    });

    const req = httpMock.expectOne('http://localhost:3000/clients/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedClient);
    req.flush(updatedClient);
  });

  it('should delete a client', () => {
    service.deleteClient('1').subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/clients/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
