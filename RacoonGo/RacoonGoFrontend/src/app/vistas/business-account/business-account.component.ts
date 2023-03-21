import { Component, OnInit } from '@angular/core';
import {BackendRouterService} from "../../services/backend-router.service";
import {HelperService} from "../../services/helper.service";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../models/app.constants";
import {Company, User} from "../../models/app.model";
import Swal from "sweetalert2";
import {faLock, faUser, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons';

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
    email!:string
    password!:string
    username!:string
  website!:string
  phonenumber!:string
  
    constructor(private backEndResponse: BackendRouterService, private helperService: HelperService) { }
  
    ngOnInit(): void {
    }
  
    signUp(){
      createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            console.log(this.email)
  
            const user = userCredential.user;
            let user2;
            if (user) {
              sessionStorage.setItem("email", this.email);
              var company = new Company(new User(this.email, this.username, 0),this.website, this.phonenumber);
              this.backEndResponse.endpoints.company.addCompany(company).subscribe({
                next: () => {
                  Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu evento: ' + this.username, 'success')
                },
                error: () => {
  
                  Swal.fire('Error', 'No se ha creado el usuario', 'error')
  
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
