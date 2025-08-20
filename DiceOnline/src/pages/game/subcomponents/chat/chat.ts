import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from './subcomponents/message/message';
import { SignalRService } from '../../../../core/services/signalr-service';
import { LobbyService } from '../../../../core/services/lobby-service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule, CommonModule, Message],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
 @ViewChild('chatContainer') private chatContainer!: ElementRef;
  //#region Properties
  @Input() messages: Message[] = [];  
  private destroy$ = new Subject<void>();
  chatForm: FormGroup;
  //#endregion

  //#region ctor + Lifecycle
  constructor(private fb: FormBuilder, private signalR: SignalRService, private lobbyService: LobbyService) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.addFirstMessage();
    this.startListeningToPlayerJoined();
    this.startListeningToMessageSent();
    this.startListeningToPlayerLeft();
    this.startListeningToDiceRolled();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

    ngAfterViewChecked() {
    this.scrollToBottom();
  }

  //#endregion

  //#region Chat Initialization
  private addFirstMessage() {
    const lobbyCode = this.getLobbyCodeFromLocalStorage();
    const content = `PlayDice welcomes you! The code of this lobby is ${lobbyCode}.`;
    this.messages.push({
      user: '',
      content: content,
      timestamp: new Date(),
      system: true
    });
  }
  //#endregion 

  //#region sending messages
  sendMessage() {
    if (this.chatForm.invalid) {
      return;
    }
    const lobbyCode = this.getLobbyCodeFromLocalStorage();
    const username = this.getNameFromLocalStorage();

    this.lobbyService.sendMessage({
      lobbycode: lobbyCode,
      pLayerName: username,
      message: this.chatForm.value.message
    }).subscribe({
      next: () => {
        this.chatForm.reset();
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  }
  //#endregion

  //#region listening to events from signalR
  startListeningToPlayerJoined() {
    this.signalR.playerJoined$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
          this.messages.push({
            user: event.playerName,
            content: `${event.playerName} has joined the game.`,
            timestamp: new Date(),
            system: true
          });
        }
      });
  }

  startListeningToPlayerLeft() {
    this.signalR.playerLeft$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
          this.messages.push({
            user: event.playerName,
            content: `${event.playerName} has left the game.`,
            timestamp: new Date(),
            system: true
          });
        }
      });
  }

  startListeningToMessageSent() {
    this.signalR.messageSent$
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => {
        if (message) {
          this.messages.push({
            user: message.playerName,
            content: message.message,
            timestamp: new Date(),
            system: false
          });
        }
      });
  }

  startListeningToDiceRolled() {
    this.signalR.diceRolled$
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event) {
            const diceResults = event.results
              .map(dice => `🎲[${toRoman(dice.index + 1)}, ${dice.value}]`)
              .join(', ');
            this.messages.push({
              user: event.playerName,
              content: `Player ${event.playerName} rolled: ${diceResults}.`,
              timestamp: new Date(),
              system: true
            });

            function toRoman(num: number): string {
              const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
              return romanNumerals[num - 1];
            }
        }
      });
  }

  //#endregion

    private scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

  //#region Local Storage
  getNameFromLocalStorage(): string {
    return localStorage.getItem('playerName') ?? 'unknown';
  }

  getLobbyCodeFromLocalStorage(): string {
    return localStorage.getItem('lobbyCode') ?? 'unknown';
  }
  //#endregion
}
