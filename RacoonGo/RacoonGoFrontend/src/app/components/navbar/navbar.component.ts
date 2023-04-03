import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarService } from './navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userName?: string;

  static navSearch: boolean
  constructor(public navService: NavbarService,
    private router: Router) {
    sessionStorage.getItem("user") ? this.userName = JSON.parse(sessionStorage.getItem("user")!).username : this.userName = "Invitado";
  }

  goAddEve() {
    this.router.navigate(['/addEvent']);

  }

  goEveList() {
    this.router.navigate(['/events']);

  }
  gologin() {
    this.router.navigate(['/login']);
  }
  
  goProfile() {
    this.router.navigate(['/profile']);
  }
  logout(): void {

  }

}
