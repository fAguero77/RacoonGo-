import { Component, OnInit } from '@angular/core';
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Game, Question, Option, User, CompanyUser } from "../../models/app.model";
import Swal from 'sweetalert2';

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
    user: CompanyUser
    correctQuestions: number
    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService, private router: Router) {
        this.i = 0;
        this.user = JSON.parse(sessionStorage.getItem("user")!);

        if (this.user == null || this.user.website != undefined) {
            this.router.navigate(['/login'])
        }
        this.correctQuestions = 0
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
            this.correctQuestions += 1
            this.game.questions[this.i].corrects+=1
        }
        this.i++
    }
    totalPoints(): number {
        let total = 0;
        for (let question of this.game.questions){
            total += question.points
        }
        return total
    }

    continue() {
        this.checked = false
        if (this.i >= this.game.questions.length) {
            this.helperService.game = undefined
            this.user.score += this.points
            this.game.timesPlayed += 1
            this.backendRouterService.endpoints.user.setFinishedGame(this.user, this.game).subscribe({
                next: (data: HttpResponse<Game>) => {
                    Swal.fire({
                        title: '¡Enhorabuena!',
                        html: 'Has completado ' + data.body?.name + '.<br><br>Has acertado <b>' + this.correctQuestions + '</b> preguntas, consiguiendo una puntuación de <br> <b style="font-size:36px">' + this.points + '/' + this.totalPoints() + '</b> <label style="font-size:36px">puntos</label>',
                        icon: 'success'
                    })
                    sessionStorage.setItem("user", JSON.stringify(this.user));

                    this.router.navigate(['/games'])

                }
                
            })
           
        } else {
            this.actualQuestion = this.game.questions[this.i]

        }

    }
}
