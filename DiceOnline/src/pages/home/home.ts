import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JumbotronSvg } from '../../assets/svg/jumbotron-svg/jumbotron-svg';
import { GameCard } from './subcomponents/game-card/game-card';
import { JoinModal } from './subcomponents/join-modal/join-modal';
import { HostModal } from './subcomponents/host-modal/host-modal';
import { LobbyService } from '../../core/services/lobby-service';
import { CreateLobbyCommand } from '../../core/dtos/CreateLobbyCommand';
import { SignalRService } from '../../core/services/signalr-service';

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
    private router: Router
  ) { }

  async onHostCreated(event: { name: string; diceCount: number }) {
    this.loading = true;  // Zet de loading indicator aan
    this.errorMessage = null;  // Zet eventuele foutmeldingen leeg

    try {
      // 1. Start de hub
      await this.signalR.startConnection();
      const connectionId = this.signalR.connectionId;
      if (!connectionId) {
        throw new Error('Could not connect to server.');
      }

      // 2. Creëer de lobby
      const command: CreateLobbyCommand = {
        PLayerName: event.name,
        ConnectionId: connectionId,
        DiceSettings: {
          count: event.diceCount,
          minValue: 1,
          maxValue: 6
        }
      };

      this.lobbyService.createLobby(command).subscribe({
        next: result => {
          localStorage.setItem('playerName', event.name);  // Sla de spelersnaam op in localStorage
          localStorage.setItem('lobbyCode', result);  // Sla de lobbycode op in localStorage
          this.loading = false;  // Zet de loading indicator uit
          this.router.navigate([`/game/${result}`]);
        },
        error: err => {
          this.loading = false;  // Zet de loading indicator uit
          this.errorMessage = 'Lobby creation failed: ' + err.error;  // Zet de foutmelding
          console.error('Lobby creation failed:', err.error);
        }
      });
    } catch (err) {
      this.loading = false;  // Zet de loading indicator uit
      this.errorMessage = '' + err;  // Zet de foutmelding
      console.error('SignalR connection or other issue:', err);
    }
  }


  async onJoinSubmitted(event: { name: string; lobbyCode: string }) {
    this.loading = true;
    this.errorMessage = null;

    try {
      // 1. Start de hub
      await this.signalR.startConnection();
      const connectionId = this.signalR.connectionId;
      if (!connectionId) {
        throw new Error('Could not connect to server.');
      }

      // 2. Join de lobby
      this.lobbyService.joinLobby({
        PLayerName: event.name,
        ConnectionId: connectionId,
        LobbyCode: event.lobbyCode
      }).subscribe({
        next: result => {
          localStorage.setItem('playerName', event.name);  // Sla de gebruikersnaam op in localStorage
          localStorage.setItem('lobbyCode', event.lobbyCode);  // Sla de lobbycode op in localStorage
          this.loading = false;
          this.router.navigate([`/game/${event.lobbyCode}`]);
        },
        error: err => {
          this.loading = false;
          this.errorMessage = 'Lobby join failed: ' + err.error;
          console.error('Lobby join failed:', err.error);
        }
      });
    } catch (err) {
      this.loading = false;
      this.errorMessage = '' + err;
      console.error('SignalR connection or other issue:', err);
    }
  }

}
