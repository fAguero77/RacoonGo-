import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import {auth} from "../../models/app.constants";





@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    faUser = faUser;
    faLock = faLock;
  email!:string
  password!:string

  constructor() { }

  ngOnInit(): void {
  }
  
  signUp(){
    createUserWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
      console.log(this.email)
      
      const user = userCredential.user;
      if (user) {
        sessionStorage.setItem("email", this.email);
        //this.userService.register(this.email).subscribe(data => {
          //window.location.reload();
        //});
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
}
