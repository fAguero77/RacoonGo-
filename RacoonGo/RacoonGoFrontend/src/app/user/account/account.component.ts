import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { UserService } from 'src/app/services/user.service';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const firebaseConfig = {
  apiKey: "AIzaSyCmVfdP2afXuFx8lux7VGfxyI8jxM7UYX4",
  authDomain: "racoongo.firebaseapp.com",
  databaseURL: "https://racoongo-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "racoongo",
  storageBucket: "racoongo.appspot.com",
  messagingSenderId: "498418850159",
  appId: "1:498418850159:web:0f5ec85ca154ba163d709a",
  measurementId: "G-CKR90DQ6VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

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
