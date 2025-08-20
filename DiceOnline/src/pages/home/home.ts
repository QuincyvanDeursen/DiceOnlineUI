import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JumbotronSvg } from '../../assets/svg/jumbotron-svg/jumbotron-svg';
import { GameCard } from './subcomponents/game-card/game-card';
import { JoinModal } from './subcomponents/join-modal/join-modal';
import { HostModal } from './subcomponents/host-modal/host-modal';
import { LobbyService } from '../../core/services/lobby-service';
import { CreateLobbyCommand } from '../../core/dtos/CreateLobbyCommand';
import { SignalRService } from '../../core/services/signalr-service';
import { Dice } from '../../core/models/Dice';
import { CheatService } from '../../core/services/cheat-service';
import { NotificationService } from '../../core/services/notification/notification-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JumbotronSvg, GameCard, JoinModal, HostModal, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private lobbyService: LobbyService,
    private signalR: SignalRService,
    private router: Router,
    private cheatService: CheatService,
    private notificationService: NotificationService
  ) { }

  // New lobby host has to start before navigating
  async onHostCreated(event: { name: string; diceCount: number }) {
    this.loading = true;
    this.errorMessage = null;

    if (event.name.includes("cheat")) {
      this.cheatService.enableCheat();
      this.notificationService.info('Cheat mode enabled.');
    }
    const nameWithoutCheat = event.name.replace("cheat", '');
    try {
      await this.signalR.startConnection();
      const connectionId = this.signalR.connectionId;
      if (!connectionId) {
        throw new Error('Could not connect to server.');
      }

      var dices: Dice[] = [];
      for (let i = 0; i < event.diceCount; i++) {
        dices.push({
          index: i,
          minValue: 1,
          maxValue: 6
        });
      }

      const command: CreateLobbyCommand = {
        PlayerName: nameWithoutCheat,
        ConnectionId: connectionId,
        Dices: dices
      };

      this.lobbyService.createLobby(command).subscribe({
        next: result => {
          localStorage.setItem('playerName', nameWithoutCheat);
          localStorage.setItem('lobbyCode', result);
          this.loading = false;
          this.notificationService.success('Lobby created successfully!');
          this.router.navigate([`/game/${result}`]);
        },
        error: err => {
          this.loading = false;
          this.errorMessage = 'Lobby creation failed: ' + err.error;
          this.notificationService.error('Lobby creation failed: ' + err.error);
          console.error('Lobby creation failed:', err.error);
        }
      });
    } catch (err) {
      this.loading = false;
      this.errorMessage = '' + err;
      this.notificationService.error('Connection or other error: ' + err);
      console.error('SignalR connection or other issue:', err);
    }
  }

  async onJoinSubmitted(event: { name: string; lobbyCode: string }) {
    if (event.name.includes("cheat")) {
      this.cheatService.enableCheat();
      this.notificationService.info('Cheat mode enabled.');
    }
    const nameWithoutCheat = event.name.replace("cheat", '');
    localStorage.setItem('playerName', nameWithoutCheat);
    localStorage.setItem('lobbyCode', event.lobbyCode);
    this.router.navigate([`/game/${event.lobbyCode}`]);
  }
}
