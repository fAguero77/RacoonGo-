import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;
  visibleS: boolean;


  constructor(private router: Router, ) {
    this.visible = false;
    this.visibleS = false;
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.visible = !(event.url == "/login" || event.url == "/register");
          this.visibleS = event.url != "/";
        }
      }
    );
  }
  
  hide() { this.visible = false; }
}
