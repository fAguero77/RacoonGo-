import { Component, OnInit } from '@angular/core';
import {BackendRouterService} from "../../services/backend-router.service";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../models/app.constants";
import {CompanyUser, User} from "../../models/app.model";
import {faLock, faUser, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-business-account',
  templateUrl: './business-account.component.html',
  styleUrls: ['./business-account.component.css']
})

export class BusinessAccountComponent implements OnInit {
    faUser = faUser;
    faLock = faLock;
    faGlobe = faGlobe;
    faPhone = faPhone;
    businessSignUpForm!: FormGroup;
    submitted = false;
    invalidSignUp = false;
    email!:string
    password!:string
    username!:string
  website!:string
  phonenumber!:string
  
    constructor(private backEndResponse: BackendRouterService, private fb: FormBuilder) { }
    
    ngOnInit(): void {
        this.businessSignUpForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            website: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
            phonenumber: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern("^[0-9]*$")]],
        })
    }
    
    checkValidity(controlName: string) {
        const control = this.businessSignUpForm.get(controlName);
        if (control) {
            control.markAsTouched();
        }
    }
    
    onSubmit() {
        this.submitted = true;
        if (this.businessSignUpForm.invalid) {
            return;
        }
        this.signUp();
    }
  
    signUp(){
        var company = new CompanyUser(new User(this.email, this.username, 0),this.website, this.phonenumber);
        this.backEndResponse.endpoints.company.addCompany(company).subscribe({
            next: () => {
                this.invalidSignUp = false;
                createUserWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        if (user) {
                            sessionStorage.setItem("email", this.email);
                        }
                    })
                    .catch((error) => {
                    });
            },
            error: () => {
                this.invalidSignUp = true;
            }
        });
    }
}
