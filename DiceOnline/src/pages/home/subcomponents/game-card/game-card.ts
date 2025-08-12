import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}
