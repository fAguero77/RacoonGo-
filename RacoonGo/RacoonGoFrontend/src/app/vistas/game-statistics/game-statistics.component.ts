import { Component, OnInit } from '@angular/core';
import {CompanyUser, Game} from "../../models/app.model";
import {BackendRouterService} from "../../services/backend-router.service";
import {HttpClient} from "@angular/common/http";
import {HelperService} from "../../services/helper.service";


@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit {
  game: Game;
  user: CompanyUser;

  constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService) {
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.game=this.helperService.game!;
    console.log(this.game);
  }

  ngOnInit(): void {
  }
}
