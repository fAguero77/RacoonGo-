import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app-routing.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventsListComponent } from "./vistas/events-list/events-list.component";
import { EventFormComponent } from './vistas/event-form/event-form.component';
import { AccountComponent } from "./vistas/account/account.component";
import { LogoutComponent } from './vistas/logout/logout.component';
import { BusinessAccountComponent } from './vistas/business-account/business-account.component';
import { PasswordComponent } from './vistas/password/password.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from "@angular/material/menu";
import { SponsorFormComponent } from './vistas/sponsor-form/sponsor-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { DeleteUserBtnComponent } from './vistas/delete-user-btn/delete-user-btn.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './vistas/profile/profile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GameFormComponent } from './vistas/game-form/game-form.component';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        EventsListComponent,
        EventFormComponent,
        AccountComponent,
        LogoutComponent,
        BusinessAccountComponent,
        SponsorFormComponent,
        PasswordComponent,
        DeleteUserBtnComponent,
        NavbarComponent,
        ProfileComponent,
        SearchBarComponent,
        GameFormComponent
    ],
    imports: [
        CommonModule,
      BrowserModule, 
      HttpClientModule, 
      FormsModule, 
      ReactiveFormsModule, 
      AppRoutingModule, 
        FontAwesomeModule,
        NoopAnimationsModule,
        MatIconModule,
        MatMenuModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    providers: [],
    exports: [RouterModule],

    bootstrap: [AppComponent]
})
export class AppModule { }
