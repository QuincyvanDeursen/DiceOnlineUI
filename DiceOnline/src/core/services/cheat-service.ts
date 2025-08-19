import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheatService {
  private cheatEnabledSubject = new BehaviorSubject<boolean>(false);
  private dices: { id: number; type: 'd6' | 'd8'; value: number; min: number; max: number; locked: boolean }[] = [];
  cheatEnabled$ = this.cheatEnabledSubject.asObservable();



  enableCheat() {
    this.cheatEnabledSubject.next(true);
  }

  disableCheat() {
    this.cheatEnabledSubject.next(false);
  }

  setDices(dices: { id: number; type: 'd6' | 'd8'; value: number; min: number; max: number; locked: boolean }[]) {
    this.dices = dices;
  }

  getDices() {
    return this.dices;
  }
}
