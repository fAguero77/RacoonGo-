import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    //public sessionExists: boolean = false;
    email!: string;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.email = sessionStorage.getItem('email') as string;
        window.addEventListener('storage', () => {
            this.email = sessionStorage.getItem('email') as string;
        });
    }

    signOut() {
        sessionStorage.clear();
        // TODO: redirect to main page
        this.router.navigate(['/login']);
        this.email = "";
    }
}
