import { Component, OnInit } from '@angular/core';
import { createUserWithEmailAndPassword } from "firebase/auth";

import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../../models/app.constants";
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from "../../services/helper.service";
import Swal from "sweetalert2";
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
    invalidEmail = false;
    invalidUsername = false;
    email!: string
    password!: string
    username!: string

    constructor(private backEndResponse: BackendRouterService, private fb: FormBuilder) {
    }

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
                this.invalidUsername = false;
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        this.invalidEmail = false;
                    })
                    .catch((error) => {
                        this.invalidEmail = true;
                    });
            },
            error: () => {
                this.invalidUsername = true;
            }
        });
    }
}