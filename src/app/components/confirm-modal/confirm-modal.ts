import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-confirm-modal',
  imports: [ConfirmDialogModule],
  template: '',
})
export class ConfirmModalComponent {
  @Input() title: string = 'Confirmar';
  @Input() message: string = 'Deseja confirmar?';
  @Input() acceptLabel: string = 'Sim';
  @Input() rejectLabel: string = 'Não';
  @Input() isWarning: boolean = false;

  @Output() accepted = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  public show() {
    this.confirmationService.confirm({
      header: this.title,
      message: this.message,
      rejectButtonProps: {
        label: this.rejectLabel,
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: this.acceptLabel,
        severity: this.isWarning ? 'danger' : 'info',
        outlined: true,
      },
      icon: this.isWarning ? 'pi pi-exclamation-triangle' : 'pi pi-info-circle',
      accept: () => this.accepted.emit(),
      reject: (type: ConfirmEventType) => {
        if (
          type === ConfirmEventType.REJECT ||
          type === ConfirmEventType.CANCEL
        ) {
          this.rejected.emit();
        }
      },
    });
  }
}
