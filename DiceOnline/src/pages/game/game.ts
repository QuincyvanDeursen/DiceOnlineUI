import { Component, QueryList, ViewChildren } from '@angular/core';
import { GameNav } from './subcomponents/game-nav/game-nav';
import { DiceContainer } from '../../shared/Components/dice-container/dice-container';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../core/services/signalr-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../../core/services/lobby-service';
import { Lobby } from '../../core/models/lobby';
import { LeaveLobbyCommand } from '../../core/dtos/LeaveLobbyCommand';
import { Subject, takeUntil } from 'rxjs';
import { RollDiceCommand } from '../../core/dtos/RollDiceCommand';

@Component({
  selector: 'app-game',
  imports: [GameNav, DiceContainer, CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {

  //#region Properties
  @ViewChildren('container') diceContainers!: QueryList<DiceContainer>;
  lobby?: Lobby;
  dices: { id: number; type: 'd6' | 'd8'; value: number; locked: boolean }[] = [];
  players: string[] = [];
  destroy$ = new Subject<void>();
  //#endregion

  //#region ctor + lifecycle
  constructor(private signalRService: SignalRService, private route: ActivatedRoute, private lobbyService: LobbyService, private router: Router) {
   
  }

  ngOnInit() {
    this.getLobbyByCode();
    this.startListeningToPlayerJoined();
    this.startListeningToPlayerLeft();
    this.startListeningToDiceRolled();
    console.log('Game component initialized');
    console.log('dices:', this.dices);
  }

  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.leaveLobby();
    console.log('Game component destroyed');
  }
  //#endregion


  //#region game initialization
  private getLobbyByCode() {
    const lobbyCode = localStorage.getItem('lobbyCode');
    if (lobbyCode) {
      this.lobbyService.getLobby(lobbyCode).subscribe({
        next: lobby => {
          this.lobby = lobby;
          this.prepareGame(lobby);
          console.log('Fetched lobby from localStorage:', lobby);
        },
        error: err => {
          console.error('Error fetching lobby from localStorage:', err);
          this.router.navigate(['/home']);
        }
      });
    }
  }

  private prepareGame(lobby: Lobby) {

    console.log('Preparing game with lobby:', this.lobby);
    console.log('Dice settings:', lobby.diceSettings);
    for (let i = 0; i < lobby.diceSettings.count; i++) {
      this.dices.push({
        id: i + 1,
        type: 'd6',
        value: 0,
        locked: false
      });
    }
    this.players = lobby.players;

  }

  //#endregion

  private startListeningToPlayerJoined() {
    this.signalRService.playerJoined$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
          this.players.push(event.playerName);
          console.log('Player joined:', event.playerName);
        }
      });
  }

  private startListeningToPlayerLeft() {
    this.signalRService.playerLeft$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
          this.players = this.players.filter(p => p !== event.playerName);
          console.log('Player left:', event.playerName);
        }
      });
  }

  private startListeningToDiceRolled() {
    this.signalRService.diceRolled$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
          console.log('Dice rolled event received:', event);
          event.results.forEach(dice => {
            const container = this.diceContainers.find(c => c.diceId === dice.index);
            console.log('Rolling dice with index:', dice.index, 'and value:', dice.value);
            if (container) {
              container.roll(dice.value);
            }
          });
        }
      });
  }

  //#region game actions

  leaveLobby() {
    const command: LeaveLobbyCommand = {
      lobbyCode: this.lobby?.lobbyCode || '',
      playerName: localStorage.getItem('playerName') || 'unknown',
      connectionId: this.signalRService.connectionId || ''
    };

    console.log('Leaving lobby with command:', command);
    this.lobbyService.leaveLobby(command).subscribe({
      next: () => {
        console.log('Left lobby successfully');
        this.signalRService.stopConnection();
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Error leaving lobby:', err);
      }
    });
  }

  onDiceToggle(diceId: number) {
    const dice = this.dices.find(d => d.id === diceId);
    if (dice) {
      dice.locked = !dice.locked;
      console.log('Dice', diceId, 'is now', dice.locked ? 'locked' : 'unlocked');
    }
  }

  rollDices() {
    const command: RollDiceCommand = {
      lobbyCode: this.lobby?.lobbyCode || '',
      playerName: localStorage.getItem('playerName') || 'unknown',
      dices: this.dices
        .filter(d => !d.locked)
        .map((d) => ({
          index: d.id,
          minValue: this.lobby?.diceSettings.minValue ?? 1,
          maxValue: this.lobby?.diceSettings.maxValue ?? 6
        }))
    };

    this.lobbyService.rollDice(command).subscribe({
      next: () => {
        console.log('Dice rolled successfully');
      },
      error: err => {
        console.error('Error rolling dice:', err);
      }
    });
  }

  unlockAllDices() {
    //wait 1sec
    setTimeout(() => {
      this.dices.forEach(dice => {
        dice.locked = false;
      });
    }, 1000);
  }

  //#endregion
}
