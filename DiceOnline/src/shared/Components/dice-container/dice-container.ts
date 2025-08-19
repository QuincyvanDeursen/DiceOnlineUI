import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { D6Dice } from '../dice/d6-dice/d6-dice';
import { CommonModule } from '@angular/common';
import { DiceInterface } from '../../../core/interfaces/dice-interface';

@Component({
  selector: 'app-dice-container',
  imports: [D6Dice, CommonModule],
  templateUrl: './dice-container.html',
  styleUrl: './dice-container.css'
})
export class DiceContainer {
    @Input() diceId!: number;               // nieuwe id input
  @Input() type: 'd6' | 'd8' = 'd6';
  @Input() value!: number;
  @Input() locked: boolean = false;
  @Output() lockedChangeEvent = new EventEmitter<void>();


  @ViewChild('dice') dice!: DiceInterface;

  roll(newValue: number) {

    this.dice.rollDiceAnimationWithValue(newValue);

  }
  toggleLock() {
    this.locked = !this.locked;
    this.lockedChangeEvent.emit();
  }

  toRoman(num: number): string {
  const romanNumerals = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  return romanNumerals[num - 1] || '';
}
}
