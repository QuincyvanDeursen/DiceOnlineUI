import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dice-cursor',
  imports: [CommonModule],
  templateUrl: './dice-cursor.html',
  styleUrls: ['./dice-cursor.css'],
})
export class DiceCursor {
 x = 0;
  y = 0;
  spinning = false;
  isTouchDevice = false;
  showCursor = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Zodra we muis zien bewegen, weten we dat het géén touch device is
    this.isTouchDevice = false;
    this.showCursor = true;
    this.x = event.clientX;
    this.y = event.clientY;
  }

  @HostListener('document:touchstart')
  onTouchStart() {
    // Bij touchstart weten we dat het touch device is
    this.isTouchDevice = true;
    this.showCursor = false;
  }

  @HostListener('document:click')
  onClick() {
    if (this.isTouchDevice) return;
    this.spinning = false;
    setTimeout(() => (this.spinning = true), 0);
  }
}