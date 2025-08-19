import { Component, Input } from '@angular/core';
import { SignalRService } from '../../../../../core/services/signalr-service';
import { Subject, takeUntil } from 'rxjs';
import { CheatService } from '../../../../../core/services/cheat-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lobby-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './lobby-panel.html',
  styleUrl: './lobby-panel.css'
})
export class LobbyPanel {

  @Input() players: any[] = [];
  cheatEnabled: boolean = false;
  dices: { id: number; type: 'd6' | 'd8'; value: number; min: number; max: number; locked: boolean }[] = [];

  private destroy$ = new Subject<void>();

  constructor(private cheatService: CheatService) { }

  ngOnInit() {
    this.startListeningToCheatEnabled();
    console.log('LobbyPanel initialized with players:', this.players);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }



    private startListeningToCheatEnabled() {
      this.cheatService.cheatEnabled$
        .pipe(takeUntil(this.destroy$))
        .subscribe(isEnabled => {
          if (isEnabled) {
            this.cheatEnabled = true;
            this.dices = this.cheatService.getDices();
            console.log('Cheat mode enabled with dices:', this.dices);
          } else {
            this.cheatEnabled = false;
          }
        });
    }
}
