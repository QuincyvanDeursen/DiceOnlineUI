import { Component, EventEmitter, Input, Output } from '@angular/core';
import { D6Dice } from '../dice/d6-dice/d6-dice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dice-container',
  imports: [D6Dice, CommonModule],
  templateUrl: './dice-container.html',
  styleUrl: './dice-container.css'
})
export class DiceContainer {
  @Input() type: 'd6' | 'd8' = 'd6';
  @Input() value!: number;
  @Input() locked: boolean = false;

  @Output() lockedChangeEvent = new EventEmitter<void>();

  toggleLock() {
    this.locked = !this.locked;
    this.lockedChangeEvent.emit();
  }
}
