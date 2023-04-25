import { Component, OnInit } from '@angular/core';
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Game, Question, Option, User } from "../../models/app.model";

@Component({
  selector: 'app-game-match',
  templateUrl: './game-match.component.html',
  styleUrls: ['./game-match.component.css']
})
export class GameMatchComponent implements OnInit {

    game: Game
    actualQuestion: Question
    checked: boolean
    selectedOption!: Option
    points: number
    i: number
    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService, private router: Router) {
        this.i = 0;
        this.game = this.helperService.game!;
        this.points = 0
        this.actualQuestion = this.game.questions[this.i]
        this.checked = false;

    }

    ngOnInit(): void {
        
    }
    select(option: Option) {
        this.selectedOption = option;
    }
    check() {
        this.checked = true
        if (this.selectedOption.correct) {
            this.points += this.actualQuestion.points
        }
        this.i++
    }

    continue() {
        this.checked = false
        if (this.i >= this.game.questions.length) {
            this.helperService.game = undefined
            alert("te lo pasaste broski")
        } else {
            this.actualQuestion = this.game.questions[this.i]

        }

    }
}
