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
  averageScore: number = 0;
  constructor(private backendRouterService: BackendRouterService, 
              private httpClient: HttpClient, 
              public helperService: HelperService) {
    this.user = JSON.parse(sessionStorage.getItem("user")!);
    this.game = this.helperService.game!;
    this.calculateAverageScore();
  }

  calculateAverageScore() {
    let totalScore = 0;
    let maxScore = 0;
    this.game.questions.forEach(question => {
      totalScore += question.points * question.corrects;
      maxScore += question.points * this.game.timesPlayed;
    });
    this.averageScore = totalScore / maxScore * 10;
  }

  ngOnInit(): void {
  }

  getDifficultyName(index: number): string {
    return this.helperService.getDifficultyInfo(index);
  }
}