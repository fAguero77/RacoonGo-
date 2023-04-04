import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../models/app.constants";
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from "../../services/helper.service";
import Swal from "sweetalert2";
import { User } from "../../models/app.model";
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    faUser = faUser;
    faLock = faLock;
    email!: string
    password!: string
    username!: string

    constructor(private backEndResponse: BackendRouterService, private helperService: HelperService, private router: Router) { }

    ngOnInit(): void {
    }

    signUp() {
        createUserWithEmailAndPassword(auth, this.email, this.password)
            .then((userCredential) => {

                const user = userCredential.user;
                let loginUser : User;
                if (user) {
                    loginUser = new User(this.email, this.username, 0);
                     this.backEndResponse.endpoints.user.addUser(loginUser).subscribe({

                    //this.backEndResponse.endpoints.user.addUser(new User(this.email, this.username, 0)).subscribe({
                        next: () => {
                             Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu usuario: ' + this.username, 'success')
                             this.router.navigate(['/']);

                        },
                        error: () => {

                            Swal.fire('Error', 'No se ha creado el usuario', 'error')

                         },
                         complete: () => {
                             console.log(JSON.stringify(loginUser));
                            sessionStorage.setItem("user", JSON.stringify(loginUser));
                            console.log(JSON.parse(sessionStorage.getItem("user")!))


                        }
                    });
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
}