import { Component, OnInit } from '@angular/core';
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Game, Question, User } from "../../models/app.model";


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

    game: Game;
    user!: User;
    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService,  private router: Router) {
        this.user = JSON.parse(sessionStorage.getItem("user")!);
        this.game = new Game();
        this.game.name = "Juego de "+this.user.username
    }

    ngOnInit(): void {
  }

    addQuestion() {
        this.game.questions.push(new Question("Pregunta #"+ (this.game.questions.length+1),10))
    }
    editQuestion(question: Question) {

    }
    deleteQuestion(index: number) {
        let auxDelante = this.game.questions.slice(0, index);
        let auxAtras = this.game.questions.slice(index + 1, this.game.questions.length);
        for (let i = 0; i < auxAtras.length; i++) {
            let q: Question = auxAtras[i];
            q.title="Pregunta #"+ (i+auxDelante.length+1)
        }
        this.game.questions = auxDelante.concat(auxAtras);
        console.log(this.game.questions.length)
    }
}
