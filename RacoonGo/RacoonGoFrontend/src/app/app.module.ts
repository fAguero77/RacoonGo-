import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { EventFormComponent } from './event-form/event-form.component';
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
