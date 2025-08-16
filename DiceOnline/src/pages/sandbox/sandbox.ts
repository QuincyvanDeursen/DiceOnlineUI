import { Component } from '@angular/core';
import { D6Dice } from '../../shared/Components/dice/d6-dice/d6-dice';
import { Message } from '../game/subcomponents/chat/subcomponents/message/message';


@Component({
  selector: 'app-sandbox',
  imports: [D6Dice, Message],
  templateUrl: './sandbox.html',
  styleUrl: './sandbox.css'
})
export class Sandbox {
  date: Date = new Date();
}
