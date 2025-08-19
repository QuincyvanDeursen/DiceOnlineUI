import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chat } from '../chat/chat';
import { LobbyPanel } from '../lobbypanel/lobby-panel/lobby-panel';

@Component({
  selector: 'app-game-nav',
  imports: [CommonModule, Chat, FormsModule, LobbyPanel],
  templateUrl: './game-nav.html',
  styleUrl: './game-nav.css'
})
export class GameNav {
ChatTabActive = true;
LobbyTabActive = false;

@Input() players: any[] = [];
@Output() rollEvent = new EventEmitter<void>();

disableButton = false;
progress = 100;

rollDices() {
  this.disableButton = true;
  this.progress = 100; // start op 100%

  const duration = 1500;
  const interval = 10;
  const step = interval / duration * 100;

  const timer = setInterval(() => {
    this.progress -= step;
    if (this.progress <= 0) {
      this.progress = 0;
      clearInterval(timer);
      this.disableButton = false;
    }
  }, interval);

  this.rollEvent.emit();
}
}
