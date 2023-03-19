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
