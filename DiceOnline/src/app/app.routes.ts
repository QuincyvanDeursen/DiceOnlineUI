import { Routes } from '@angular/router';

import { Home } from '../pages/home/home';
import { Sandbox } from '../pages/sandbox/sandbox';
import { Game } from '../pages/game/game';

//add app component to index.html
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'game/:id', component: Game },
  { path: 'sandbox', component: Sandbox }
];
