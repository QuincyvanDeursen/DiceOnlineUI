import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private showHeaderFooterSubject = new BehaviorSubject<boolean>(true);
  showHeaderFooter$ = this.showHeaderFooterSubject.asObservable();

  // Routes of patterns zonder header/footer
  private noHeaderFooterPatterns: RegExp[] = [
    /^\/sandbox$/,
    /^$/,               // home
    /^\/game(\/.*)?$/   // alles wat met /game begint
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderFooterVisibility(event.urlAfterRedirects);
      }
    });
  }

  private updateHeaderFooterVisibility(url: string) {
    this.showHeaderFooterSubject.next(!this.isNoHeaderFooterPage(url));
  }

  private isNoHeaderFooterPage(url: string): boolean {
    return this.noHeaderFooterPatterns.some(pattern => pattern.test(url));
  }
}
