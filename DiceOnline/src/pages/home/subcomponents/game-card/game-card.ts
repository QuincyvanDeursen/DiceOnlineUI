import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-game-card',
  imports: [CommonModule],
  templateUrl: './game-card.html',
})
export class GameCard {
  @Input() imagePath: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() buttonText: string = '';
  @Input() disabled: boolean = false;
  @Input() modalId = ''; // bv 'host-modal' of 'join-modal'
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    console.log('Button clicked:', this.title);
    this.buttonClick.emit();
  }
}
