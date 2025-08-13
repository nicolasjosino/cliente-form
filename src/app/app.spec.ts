import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

describe('App', () => {
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          return key === 'id' ? '1' : null;
        },
      },
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        MessageService,
        ConfirmationService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have items', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.items).toBeTruthy();
    expect(app.items.length).toBeGreaterThan(0);
  });
});
