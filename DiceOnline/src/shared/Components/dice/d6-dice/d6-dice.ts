import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DiceInterface } from '../../../../core/interfaces/dice-interface';

@Component({
  selector: 'app-d6-dice',
  imports: [CommonModule],
  templateUrl: './d6-dice.html',
  styleUrl: './d6-dice.css'
})
export class D6Dice implements DiceInterface {
  @Input() value: number = 0;           // waarde 1 t/m 6
  @Input() bgColor: string = '#ffffff'; // achtergrondkleur
  @Input() pipColor: string = '#000000'; // oogkleur


isShaking = false;
isFlipping = false;
private nextValue: number | null = null;
rollDiceAnimationWithValue(newValue: number) {
  if (this.isShaking || this.isFlipping) {
    this.nextValue = newValue; // remember last
    return;
  }

  this.isShaking = true;
  setTimeout(() => {
    this.isShaking = false;
    this.isFlipping = true;

    setTimeout(() => {
      this.value = newValue;
    }, 300);

    setTimeout(() => {
      this.isFlipping = false;

      if (this.nextValue !== null) {
        const val = this.nextValue;
        this.nextValue = null;
        this.rollDiceAnimationWithValue(val); // run queued one
      }
    }, 600);
  }, 400);
}
}
