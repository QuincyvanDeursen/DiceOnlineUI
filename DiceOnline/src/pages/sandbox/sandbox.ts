import { Component } from '@angular/core';
import { D6Dice } from '../../shared/Components/dice/d6-dice/d6-dice';


@Component({
  selector: 'app-sandbox',
  imports: [D6Dice],
  templateUrl: './sandbox.html',
  styleUrl: './sandbox.css'
})
export class Sandbox {

}
