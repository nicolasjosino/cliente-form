import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', [
      'confirm',
    ]);

    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent],
      providers: [
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with default inputs', () => {
    expect(component).toBeTruthy();
    expect(component.title).toBe('Confirmar');
    expect(component.message).toBe('Deseja confirmar?');
    expect(component.acceptLabel).toBe('Sim');
    expect(component.rejectLabel).toBe('Não');
    expect(component.isWarning).toBeFalse();
  });

  it('should call confirmationService.confirm on show', () => {
    component.show();
    expect(confirmationServiceSpy.confirm).toHaveBeenCalled();

    const callArgs = confirmationServiceSpy.confirm.calls.mostRecent();
    expect(callArgs).toBeDefined();

    const arg = callArgs!.args[0] as {
      header: string;
      message: string;
      accept: () => void;
      reject: (type: any) => void;
      acceptButtonProps: any;
      rejectButtonProps: any;
      icon: string;
    };

    expect(arg.header).toBe(component.title);
    expect(arg.message).toBe(component.message);
    expect(arg.acceptButtonProps.label).toBe(component.acceptLabel);
    expect(arg.rejectButtonProps.label).toBe(component.rejectLabel);
  });

  it('should emit accepted when accept callback is called', () => {
    spyOn(component.accepted, 'emit');

    component.show();

    const arg = confirmationServiceSpy.confirm.calls.mostRecent()!
      .args[0] as any;
    arg.accept();

    expect(component.accepted.emit).toHaveBeenCalled();
  });

  it('should emit rejected when reject callback is called with REJECT', () => {
    spyOn(component.rejected, 'emit');

    component.show();

    const arg = confirmationServiceSpy.confirm.calls.mostRecent()!
      .args[0] as any;
    arg.reject(ConfirmEventType.REJECT);

    expect(component.rejected.emit).toHaveBeenCalled();
  });

  it('should emit rejected when reject callback is called with CANCEL', () => {
    spyOn(component.rejected, 'emit');

    component.show();

    const arg = confirmationServiceSpy.confirm.calls.mostRecent()!
      .args[0] as any;
    arg.reject(ConfirmEventType.CANCEL);

    expect(component.rejected.emit).toHaveBeenCalled();
  });

  it('should not emit rejected for unknown reject type', () => {
    spyOn(component.rejected, 'emit');

    component.show();

    const arg = confirmationServiceSpy.confirm.calls.mostRecent()!
      .args[0] as any;
    arg.reject('UNKNOWN');

    expect(component.rejected.emit).not.toHaveBeenCalled();
  });

  it('should use warning styling when isWarning is true', () => {
    component.isWarning = true;
    component.acceptLabel = 'Delete';

    component.show();

    const arg = confirmationServiceSpy.confirm.calls.mostRecent()!
      .args[0] as any;
    expect(arg.icon).toBe('pi pi-exclamation-triangle');
    expect(arg.acceptButtonProps.severity).toBe('danger');
  });
});
