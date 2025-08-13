import { Component } from '@angular/core';
import { GameNav } from './subcomponents/game-nav/game-nav';
import { DiceContainer } from '../../shared/Components/dice-container/dice-container';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [GameNav, DiceContainer, CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  dices: { id: number; type: 'd6' | 'd8'; value: number; locked: boolean }[] = [

    { id: 1, type: 'd6', value: 4, locked: false },
    { id: 2, type: 'd6', value: 2, locked: false },
    { id: 3, type: 'd6', value: 6, locked: false },



  ];

  onDiceToggle(diceId: number) {
    const dice = this.dices.find(d => d.id === diceId);
    if (dice) {
      dice.locked = !dice.locked;
      console.log('Dice', diceId, 'is now', dice.locked ? 'locked' : 'unlocked');
    }
  }

  resetDice(){
    this.dices.forEach(dice => {
      dice.locked = false;

    });
  }
}
