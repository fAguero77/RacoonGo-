import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BackEndResponse, Event, Game, User} from "../../models/app.model";
import {HttpResponse} from "@angular/common/http";
import {BackendRouterService} from "../../services/backend-router.service";
import { HelperService } from "../../services/helper.service";
import { faPen, faTrash, faChartBar } from '@fortawesome/free-solid-svg-icons';

import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  password!: string;
  username: string = "";
  email: string = "";
    eventsList: Event[] = [];
    faPenSquare = faPen;
    faTrash = faTrash;
    faChartBar = faChartBar;

    gamesList: Game[] = [];
    user : User
  defaultImg: string = 'https://cdnph.upi.com/ph/st/th/5751650313577/2022/i/16503136903474/v1.2/Raccoon-bandit-evicted-from-trash-can-by-Michigan-police.jpg';

    constructor(private backEndResponse: BackendRouterService, private helperService: HelperService, private router: Router) {
        this.user = JSON.parse(sessionStorage.getItem("user")!)
        if (this.user == null) {
            this.router.navigate(['/login']);
        }
        else {
            this.username = this.user.username;
            this.email = this.user.email;
        }
    }

  ngOnInit(): void {
    this.backEndResponse.endpoints.event.getMyEvents(this.email).subscribe({
      next: (data: HttpResponse<BackEndResponse<any>>) =>{
        this.eventsList = data.body as unknown as Event[];
      }
    })
      this.backEndResponse.endpoints.game.getMyGames(this.email).subscribe({
          next: (data: HttpResponse<BackEndResponse<any>>) => {
              this.gamesList = data.body as unknown as Game[];
          }
      })
  }

  getThemeName(index: number): [string, string] {
    return this.helperService.getThemeInfo(index);
    }
    getDifficultyName(index: number): string {
        return this.helperService.getDifficultyInfo(index);
    }

    getAgeRecommendation(age: number): string {
        return this.helperService.getAgeText(age);
    }


    deleteEvent(e: Event) {
        this.helperService.deleteEvent(e);
    }

    updateEvent(e: Event) {
        this.helperService.updateEvent(e);
    }

    goToGame(g: Game) {
        this.helperService.playMatch(g);
    }

    addGame() {
        this.router.navigate(['/addGame']);
    }

    updateGame(g: Game) {
        this.helperService.updateGame(g);
    }

    deleteGame(g: Game) {
        this.helperService.deleteGame(g);
    }

    statisticsGame(g: Game) {
        this.helperService.statisticsGame(g);
    }
}
