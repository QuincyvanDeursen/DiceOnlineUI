import { Component, OnInit, signal } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App implements OnInit{
  protected readonly title = signal('DiceOnline');

    constructor(private router: Router) {}


  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.HSStaticMethods) {
            window.HSStaticMethods.autoInit();
          }
        }, 100);
      }
    });
  }
}
