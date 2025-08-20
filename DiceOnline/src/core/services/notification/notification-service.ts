import { Inject, Injectable } from '@angular/core';
import { Notyf } from 'notyf';
import { NOTYF } from './notyf.token';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(@Inject(NOTYF) private notyf: Notyf) { }

success(message: string) {
    this.notyf.open({
      background: '#0a6118',
      position: { x: 'center', y: 'top' },
      message: this.formatMessage(
        'icon-[solar--check-square-bold-duotone]',
        message,
        'size-10'
      ),
    });
  }

  warning(message: string) {
    this.notyf.open({
      background: '#c76700',
      position: { x: 'center', y: 'top' },
      message: this.formatMessage(
        'icon-[solar--shield-warning-bold]',
        message,
        'size-10'
      ),
    });
  }

  error(message: string) {
    this.notyf.open({
      background: '#82091d',
      position: { x: 'center', y: 'top' },
      message: this.formatMessage(
        'icon-[solar--close-circle-bold]',
        message,
        'size-10'
      ),
    });
  }

  info(message: string) {
    this.notyf.open({
      background: '#1c58ce',
      position: { x: 'center', y: 'top' },
      message: this.formatMessage(
        'icon-[solar--info-circle-bold-duotone]',
        message,
        'size-10'
      ),
    });
  }

  private formatMessage(icon: string, message: string, size: string): string {
    return `
      <div class="flex flex-row items-center">
      <span class="${size} ${icon} flex-shrink-0 mr-3"></span>
      <span class="flex-1">${message}</span>
      </div>
    `;
  }
}
