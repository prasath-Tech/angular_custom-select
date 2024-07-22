import { InjectionToken, TemplateRef } from '@angular/core';

export class ToastData {
    type: ToastType = "warning";
    text?: string;
    template?: TemplateRef<any>;
    templateContext?: {};
}

export type ToastType = 'warning' | 'failure' | 'success' | 'neutral';

export interface ToastConfig {
    position: {
        top: number;
        right: number;
    };
}
