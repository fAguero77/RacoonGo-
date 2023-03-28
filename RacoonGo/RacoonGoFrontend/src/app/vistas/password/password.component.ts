import { Component, OnInit } from '@angular/core';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../models/app.constants";
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    faUser = faUser;
    email!:string
  constructor() { }

  ngOnInit(): void {
  }

  changePassword(){
    sendPasswordResetEmail(auth, this.email)
  }
}
