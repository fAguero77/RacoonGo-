import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(http: HttpClient,
        private route: ActivatedRoute,
        private router: Router   ) {

        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationStart) {
                    if (event.url == "/login" || event.url == "/register")
                        document.body.style.backgroundColor = '#4d4d4d';
                    else
                        document.body.style.backgroundColor = 'white';
                }
            }
        );
    }

    public goAddEve() {
        this.router.navigate(['/addEvent']);

    }

    public goEveList() {
        this.router.navigate(['/events']);

    }

    title = 'RacoonGoFrontend';

    gologin() {
        this.router.navigate(['/login']);
    }
}
