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

  rollDiceAnimationWithValue(newValue: number) {
    if (this.isShaking || this.isFlipping) return;

    this.isShaking = true;
    setTimeout(() => {
      this.isShaking = false;

      this.isFlipping = true;
      setTimeout(() => {
        this.value = newValue; // nieuwe waarde halverwege flip
      }, 300);

      setTimeout(() => {
        this.isFlipping = false;
      }, 600);
    }, 400);
  }
}
