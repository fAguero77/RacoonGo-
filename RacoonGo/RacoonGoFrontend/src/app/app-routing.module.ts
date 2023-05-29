import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./vistas/login/login.component";
import { EventFormComponent } from "./vistas/event-form/event-form.component";
import { EventsListComponent } from "./vistas/events-list/events-list.component";
import { AccountComponent } from "./vistas/account/account.component";
import { BusinessAccountComponent } from "./vistas/business-account/business-account.component";
import {PasswordComponent} from "./vistas/password/password.component";
import { SponsorFormComponent } from './vistas/sponsor-form/sponsor-form.component';
import {ProfileComponent} from "./vistas/profile/profile.component";
import { GameFormComponent } from './vistas/game-form/game-form.component';
import {GamesListComponent} from "./vistas/games-list/games-list.component";
import { GameMatchComponent } from './vistas/game-match/game-match.component';
import {GameStatisticsComponent} from "./vistas/game-statistics/game-statistics.component";



const routes: Routes = [
    { path: 'addEvent', component: EventFormComponent },
    { path: '', component: EventsListComponent },
    { path: 'register', component: AccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'changePassword', component: PasswordComponent },
    { path: 'loginBusiness', component: BusinessAccountComponent },
    { path: 'sponsor', component: SponsorFormComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'addGame', component: GameFormComponent },
    { path: 'games', component: GamesListComponent },
    { path: 'match', component: GameMatchComponent},
    { path: 'statistics', component: GameStatisticsComponent }
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule, RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }