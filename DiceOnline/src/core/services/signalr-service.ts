import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlayerJoinedEvent } from '../events/playerJoinedEvent';
import { PlayerLeftEvent } from '../events/PlayerLeftEvent';
import { DiceRolledEvent } from '../events/diceRolledEvent';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  //#region SignalR connection properties
  private hubConnection!: signalR.HubConnection;
  private connectionIdSubject = new BehaviorSubject<string | null>(null);
  connectionId$ = this.connectionIdSubject.asObservable();
  //#endregion

  //#region observables for signalR methods
  private playerJoinedSubject = new BehaviorSubject<PlayerJoinedEvent | null>(null);
  playerJoined$: Observable<PlayerJoinedEvent | null> = this.playerJoinedSubject.asObservable();

  private playerLeftSubject = new BehaviorSubject<PlayerLeftEvent | null>(null);
  playerLeft$: Observable<PlayerLeftEvent | null> = this.playerLeftSubject.asObservable();

  private messageSentSubject = new BehaviorSubject<{ message: string; playerName: string } | null>(null);
  messageSent$: Observable<{ message: string; playerName: string } | null> = this.messageSentSubject.asObservable();

  private diceRolledSubject = new BehaviorSubject<DiceRolledEvent | null>(null);
  diceRolled$: Observable<{ playerName: string; results: { index: number; value: number }[] } | null> = this.diceRolledSubject.asObservable();
  //#endregion

  private eventsRegistered = false;

  async startConnection(): Promise<void> {
    if (!this.hubConnection) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/gamehub`)
        .withAutomaticReconnect()
        .build();
    }

    // Reconnect / close logica behouden
    this.hubConnection.onreconnecting((error) => console.warn('SignalR reconnecting...', error));
    this.hubConnection.onreconnected(async () => {
      console.log('SignalR reconnected');
      try {
        const id = await this.hubConnection.invoke<string>('GetConnectionId');
        localStorage.setItem('connectionId', id);
        this.connectionIdSubject.next(id);
      } catch (err) {
        console.error('Error getting connection id after reconnect:', err);
      }
    });
    this.hubConnection.onclose((error) => {
      console.error('SignalR connection closed:', error);
      this.connectionIdSubject.next(null);
    });

    try {
      await this.hubConnection.start();
      console.log('SignalR Connected');
      const id = await this.hubConnection.invoke<string>('GetConnectionId');
      localStorage.setItem('connectionId', id);
      this.connectionIdSubject.next(id);
    } catch (err) {
      console.error('Error connecting to SignalR:', err);
    }

    // Registreer events 1 keer
    if (!this.eventsRegistered) {
      this.registerHubEvents();
      this.eventsRegistered = true;
    }
  }

  private registerHubEvents() {
    // Oude handlers verwijderen voordat we nieuwe registreren
    this.hubConnection.off('PlayerJoined');
    this.hubConnection.off('MessageSent');
    this.hubConnection.off('PlayerLeft');
    this.hubConnection.off('diceRolled');

    this.hubConnection.on('PlayerJoined', (playerName: string) => {
      this.playerJoinedSubject.next({ playerName });
    });

    this.hubConnection.on('MessageSent', (playerName: string, message: string) => {
      console.log('Message received:', playerName, message);
      this.messageSentSubject.next({ message, playerName });
    });

    this.hubConnection.on('PlayerLeft', (playerName: string) => {
      console.log('Player left:', playerName);
      this.playerLeftSubject.next({ playerName });
    });

    this.hubConnection.on('DiceRolled', (data: { playerName: string; results: { index: number; value: number }[] }) => {
      console.log('Dice rolled:', data.playerName, data.results);
      this.diceRolledSubject.next({ playerName: data.playerName, results: data.results });
    });
  }

  stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        console.log('SignalR connection stopped');
        this.connectionIdSubject.next(null);
      }).catch(err => {
        console.error('Error stopping SignalR connection:', err);
      });
    }
  }

  get connectionId(): string | null {
    return this.connectionIdSubject.value;
  }
}

