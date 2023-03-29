import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app-routing.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventsListComponent} from "./vistas/events-list/events-list.component";
import { EventFormComponent } from './vistas/event-form/event-form.component';
import { AccountComponent } from "./vistas/account/account.component";
import { LogoutComponent } from './vistas/logout/logout.component';
import { BusinessAccountComponent } from './vistas/business-account/business-account.component';
import { SponsorFormComponent } from './vistas/sponsor-form/sponsor-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EventsListComponent,
    EventFormComponent,
    AccountComponent,
    LogoutComponent,
    BusinessAccountComponent,
    SponsorFormComponent
  ],
    imports: [
      BrowserModule, 
      HttpClientModule, 
      FormsModule, 
      ReactiveFormsModule, 
      AppRoutingModule, 
      FontAwesomeModule
  ],
    providers: [],
    exports: [RouterModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
