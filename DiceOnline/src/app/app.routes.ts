import { Routes } from '@angular/router';

import { Home } from '../pages/home/home';
import { Sandbox } from '../pages/sandbox/sandbox';

//add app component to index.html
export const routes: Routes = [
  { path: '', component: Home },
  {path: 'sandbox', component: Sandbox }
];
