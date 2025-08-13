import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, RouterOutlet} from '@angular/router';
import { Navbar } from '../shared/Components/nav/navbar/navbar';
import { Footer } from '../shared/Components/footer/footer';
import { Observable } from 'rxjs';
import { LayoutService } from '../core/services/layout-service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule],
  templateUrl: './app.html'
})
export class App implements OnInit{
  showHeaderFooter$!: Observable<boolean>;
  
  constructor(private router: Router, private layoutService: LayoutService) {}


  ngOnInit() {
     this.showHeaderFooter$ = this.layoutService.showHeaderFooter$;
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
