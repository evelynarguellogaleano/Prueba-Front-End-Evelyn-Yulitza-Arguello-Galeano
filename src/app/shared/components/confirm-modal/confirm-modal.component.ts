import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
    @Input() visible: boolean = false;
    @Input() title: string = 'Confirmar';
    @Input() message: string = '¿Está seguro?';
    @Input() warning: string = 'Esta acción no se puede deshacer.';
    @Input() confirmText: string = 'Confirmar';
    @Input() cancelText: string = 'Cancelar';

    @Output() confirm = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    onConfirm(): void {
        this.confirm.emit();
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
