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

    constructor(http: HttpClient,
        private route: ActivatedRoute,
        private router: Router   ) {
               

        this.router.events.subscribe(
            event => {
                if (event instanceof NavigationStart) {
                    if (event.url == "/login" || event.url == "/register" || event.url == "/loginBusiness" || event.url == "/changePassword") {
                        document.body.style.backgroundColor = '#165933';
                    }else{
                        /*let user: User = JSON.parse(sessionStorage.getItem("user")!)
                        if (user == null) {
                            this.router.navigate(['/login']);
                        }*/
                        document.body.style.backgroundColor = 'white';
                    }
                }
            }
        );
    }
    
    title = 'RacoonGoFrontend';

    
}
