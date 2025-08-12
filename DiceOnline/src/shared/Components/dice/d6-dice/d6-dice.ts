import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-d6-dice',
  imports: [CommonModule],
  templateUrl: './d6-dice.html',
  styleUrl: './d6-dice.css'
})
export class D6Dice {
  @Input() value: number = 1;           // waarde 1 t/m 6
  @Input() bgColor: string = '#ffffff'; // achtergrondkleur
  @Input() pipColor: string = '#000000'; // oogkleur
}
