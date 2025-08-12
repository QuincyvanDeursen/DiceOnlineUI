import { Component } from '@angular/core';
import { JumbotronSvg } from '../../assets/svg/jumbotron-svg/jumbotron-svg';
import { GameCard } from './subcomponents/game-card/game-card';

@Component({
  selector: 'app-home',
  imports: [JumbotronSvg, GameCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
