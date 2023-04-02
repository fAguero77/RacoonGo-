import { Component, OnInit } from '@angular/core';
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../models/app.constants";
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
    faUser = faUser;
    recoveryForm!: FormGroup;
    submitted = false;
    invalidEmail = false;
    email!:string
  constructor(private fb: FormBuilder) { }
    
  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
  
    checkValidity(controlName: string) {
        const control = this.recoveryForm.get(controlName);
        if (control) {
            control.markAsTouched();
        }
    }
    
    onSubmit() {
        this.submitted = true;
        if (this.recoveryForm.invalid) {
            return;
        }
        this.changePassword();
    }

  changePassword(){
    sendPasswordResetEmail(auth, this.email)
        .then(() => {
            this.invalidEmail = false;
        }
        ).catch((error) => {
            this.invalidEmail = true;
        }
    );
  }
}
