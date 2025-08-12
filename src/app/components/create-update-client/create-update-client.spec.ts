import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateClient } from './create-update-client';

describe('CreateUpdateClient', () => {
  let component: CreateUpdateClient;
  let fixture: ComponentFixture<CreateUpdateClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateClient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
