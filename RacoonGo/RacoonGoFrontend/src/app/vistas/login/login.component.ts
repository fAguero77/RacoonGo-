import { Component, OnInit } from '@angular/core';
import {signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../models/app.constants";
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from "../../services/helper.service";
import { User } from '../../models/app.model';
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  email!:string
  password!:string

    constructor(private backEndResponse: BackendRouterService, 
                private helperService: HelperService, 
                private router: Router) { }

    ngOnInit(): void {
  }

  signUp(){
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
            if (user) {
                this.backEndResponse.endpoints.user.signIn(this.email).subscribe({
                    //Encontrar tipo de data
                    
                    next: (data: HttpResponse<User>) => {

                        sessionStorage.setItem("user", JSON.stringify(data.body));
                        this.router.navigate(['/']);
                    },
                    error: () => {
                        Swal.fire('Error', 'No se ha podido inciar sesion, comprueba la contraseña y el usuario', 'error')                    }
                })

          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        
        });
  }
}
