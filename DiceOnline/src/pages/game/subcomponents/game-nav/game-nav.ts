import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chat } from '../chat/chat';

@Component({
  selector: 'app-game-nav',
  imports: [CommonModule, Chat, FormsModule],
  templateUrl: './game-nav.html',
  styleUrl: './game-nav.css'
})
export class GameNav {
@Output() resetEvent = new EventEmitter<void>();

  reset() {
    // Implement your reset logic here
    this.resetEvent.emit();
  }

  rollDices() {
    // Implement your roll dices logic here
  }
}
