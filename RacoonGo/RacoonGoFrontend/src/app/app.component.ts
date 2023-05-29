import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {User} from "./models/app.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
        
    user: User;
    visible: boolean = false;
    constructor(http: HttpClient,
        private route: ActivatedRoute,
        private router: Router   ) {
        
        this.user = JSON.parse(sessionStorage.getItem("user")!);

        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationStart) {
                    
                    if (event.url == "/login" || event.url == "/register" || event.url == "/loginBusiness" || event.url == "/changePassword" ) {
                        document.body.style.backgroundColor = '#165933';
                    }else{
                        document.body.style.backgroundColor = 'white';
                    }
                }
            }
        );
    }
    
    title = 'RacoonGoFrontend';

    
}
