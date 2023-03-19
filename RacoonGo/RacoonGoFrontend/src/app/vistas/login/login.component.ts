import { Component, OnInit } from '@angular/core';
import {signInWithEmailAndPassword } from "firebase/auth";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import {auth} from "../../app.module";
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

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {

          const user = userCredential.user;
          if (user) {
            sessionStorage.setItem("email", this.email);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        
        });
  }

}
