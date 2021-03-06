import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-error-handler-dialog',
    templateUrl: 'error-handler.component.html',
    styleUrls: ['error-handler.component.scss'],
})
export class ErrorHandlerDialogComponent {
    @Input() title: string;
    @Input() description: string;
    @Input() showRetry: boolean = true;
    @Input() okeFunc: Function;

    constructor(protected ref: NbDialogRef < ErrorHandlerDialogComponent >) {

    }

    dismiss() {
        if (this.okeFunc) {
            this.okeFunc();
        }
        this.ref.close();
    }

    onRetry() {
        window.location.reload();
    }
}
