import { Component, OnInit } from '@angular/core';
import {signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../models/app.constants";
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from "../../services/helper.service";
import { User } from '../../models/app.model';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  logInForm!: FormGroup;
  submitted = false;
  email!:string
  password!:string

    constructor(private backEndResponse: BackendRouterService, private helperService: HelperService, private fb: FormBuilder) { }

    ngOnInit(): void {
      this.logInForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
      })
  }

  signUp(){
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {

          const user = userCredential.user;
            if (user) {
                this.backEndResponse.endpoints.user.signIn(this.email).subscribe({
                    next: (data: User) => {
                        console.log(JSON.stringify(data))
                        sessionStorage.setItem("user", JSON.stringify(data));
                        window.alert('login correcto')
                    }
                })

          } else {
            window.alert('algo ha fallado')
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        
        });
  }

    checkValidity(controlName: string) {
        const control = this.logInForm.get(controlName);
        if (control) {
            control.markAsTouched();
        }
    }
    
    onSubmit() {
        this.submitted = true;
        if (this.logInForm.invalid) {
            return;
        }
        this.signUp();
    }
}
