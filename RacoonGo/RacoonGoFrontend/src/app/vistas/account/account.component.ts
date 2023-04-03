import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../models/app.constants";
import { BackendRouterService } from "../../services/backend-router.service";
import { User } from "../../models/app.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
    faUser = faUser;
    faLock = faLock;
    signUpForm!: FormGroup;
    submitted = false;
    invalidSignup = false;
    email!: string
    password!: string
    username!: string

    constructor(private backEndResponse: BackendRouterService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            username: ['', [Validators.required, Validators.minLength(4)]]
        })
    }
    
    checkValidity(controlName: string) {
        const control = this.signUpForm.get(controlName);
        if (control) {
            control.markAsTouched();
        }
    }
    
    onSubmit() {
        this.submitted = true;
        if (this.signUpForm.invalid) {
            return;
        }
        this.signUp();
    }

    signUp() {
        const loginUser = new User(this.email, this.username, 0);
        this.backEndResponse.endpoints.user.addUser(loginUser).subscribe({
            next: () => {
                sessionStorage.setItem("user", JSON.stringify(loginUser));
                this.invalidSignup = false;
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                    })
                    .catch((error) => {
                    });
            },
            error: () => {
                this.invalidSignup = true;
            }
        });
    }
}