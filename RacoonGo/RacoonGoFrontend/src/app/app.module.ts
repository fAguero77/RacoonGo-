import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { EventFormComponent } from './event-form/event-form.component';
import { AccountComponent } from './user/account/account.component';
import { LoginComponent } from './vistas/login/login.component';
import { EventsListComponent } from './events-list/events-list.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app-routing.module";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmVfdP2afXuFx8lux7VGfxyI8jxM7UYX4",
  authDomain: "racoongo.firebaseapp.com",
  projectId: "racoongo",
  storageBucket: "racoongo.appspot.com",
  messagingSenderId: "498418850159",
  appId: "1:498418850159:web:0f5ec85ca154ba163d709a",
  measurementId: "G-CKR90DQ6VD"
};

// Initialize Firebase

//-------------------------------------------------------------------------------ESTAS DOS LINEAS DE DEBAJO DAN ERROR, LO DEJO COMENTADO


//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    AccountComponent,
    LoginComponent,
    EventsListComponent,
  ],
    imports: [
        BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule
  ],
    providers: [],
    exports: [RouterModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
