import { Component, HostListener, QueryList, ViewChildren } from '@angular/core';
import { GameNav } from './subcomponents/game-nav/game-nav';
import { DiceContainer } from '../../shared/Components/dice-container/dice-container';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../core/services/signalr-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LobbyService } from '../../core/services/lobby-service';
import { Lobby } from '../../core/models/lobby';
import { Subject, takeUntil } from 'rxjs';
import { RollDiceCommand } from '../../core/dtos/RollDiceCommand';
import { CheatService } from '../../core/services/cheat-service';
import { Message } from 'postcss';

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
  dices: { id: number; type: 'd6' | 'd8'; value: number; min: number; max: number; locked: boolean }[] = [];
  destroy$ = new Subject<void>();
  rolledBy: string | null = null;
  players: any[] = [];
  //#endregion

  //#region ctor + lifecycle
  constructor(private signalRService: SignalRService, private route: ActivatedRoute, private lobbyService: LobbyService, private cheatService : CheatService,  private router: Router) {

  }

  ngOnInit() {
    this.initGameConnection();
    this.getLobbyByCode();
   
  
  }

  ngAfterViewInit() {
  this.startListeningToPlayerJoined();
    this.startListeningToPlayerLeft();
    this.startListeningToDiceRolled();
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private cleanup() {
    this.destroy$.next();
    this.destroy$.complete();
    this.leaveLobby();
  }
  //#endregion


  //#region game initialization
  private getLobbyByCode() {
    const lobbyCode = localStorage.getItem('lobbyCode');
    if (lobbyCode) {
      this.lobbyService.getLobby(lobbyCode).subscribe({
        next: lobby => {
          this.lobby = lobby;
          this.players = lobby.players;
          this.prepareGame(lobby);
        },
        error: err => {
          console.error('Error fetching lobby from localStorage:', err);
          this.router.navigate(['/home']);
        }
      });
    }
  }

  private prepareGame(lobby: Lobby) {
    for (let d of lobby.dices) {
      this.dices.push({
        id: d.index,
        type: 'd6',
        value: 0,
        locked: false,
        min: d.minValue ?? 1,
        max: d.maxValue ?? 6
      });
    }
   this.cheatService.setDices(this.dices);
  }

  //#endregion


  private startListeningToDiceRolled() {
    this.signalRService.diceRolled$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
          event.results.forEach(dice => {
            this.rolledBy = event.playerName;
            const container = this.diceContainers.find(c => c.diceId === dice.index);
            if (container) {
              container.roll(dice.value);
            }
          });
        }
      });
  }

    private startListeningToPlayerJoined() {
      this.signalRService.playerJoined$
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (event) {
            this.players.push({ name: event.playerName });
            console.log('Player joined:', event.playerName);
          }
        });
    }
  
    private startListeningToPlayerLeft() {
      this.signalRService.playerLeft$
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (event) {
            this.players = this.players.filter(p => p.name !== event.playerName);
            console.log('Player left:', event.playerName);
          }
        });
    }

  //#region game actions

  leaveLobby() {
    this.signalRService.stopConnection();
  }

  onDiceToggle(diceId: number) {
    const dice = this.dices.find(d => d.id === diceId);
    if (dice) {
      dice.locked = !dice.locked;
    }
  }

  rollDices() {
    if(this.dices.every(dice => dice.locked)) return;

    const command: RollDiceCommand = {
      lobbyCode: this.lobby?.lobbyCode || '',
      playerName: localStorage.getItem('playerName') || 'unknown',
      dices: this.dices
        .filter(d => !d.locked)
        .map((d) => ({
          index: d.id,
          minValue: d.min,
          maxValue: d.max
        }))
    };

    this.lobbyService.rollDice(command).subscribe({
      next: () => {
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


  private async initGameConnection(): Promise<void> {
    try {
      // Start de SignalR-verbinding als die nog niet actief is
      console.log(this.signalRService.connectionId);
      if (!this.signalRService.connectionId) {
        await this.signalRService.startConnection();
      } else {
        return;
      }

      // Haal opgeslagen lobby info op
      const lobbyCode = localStorage.getItem('lobbyCode');
      const playerName = localStorage.getItem('playerName');
      const connectionId = this.signalRService.connectionId;
      if (!connectionId) {
        throw new Error('Could not connect to server.');
      }

      if (lobbyCode && playerName) {
        // Her-join de lobby automatisch
        this.lobbyService.joinLobby({
          LobbyCode: lobbyCode,
          PLayerName: playerName,
          ConnectionId: connectionId
        }).subscribe({
          next: () => this.players.push({ name: playerName }),
          error: err => console.error('Failed to re-join lobby', err)
        });
      }
    } catch (err) {
      console.error('Failed to init game connection', err);
    }
  }
}
