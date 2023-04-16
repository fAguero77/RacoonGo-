import { Component, OnInit } from '@angular/core';
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { Game, Question, User } from "../../models/app.model";
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

    game: Game;
    user!: User;
    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService,  private router: Router, private dialog: MatDialog) {
        this.user = JSON.parse(sessionStorage.getItem("user")!);
        if (this.user == undefined) {
            this.router.navigate(['/'])
        }
        this.game = new Game();
        this.game.name = "Juego de "+this.user.username
    }

    ngOnInit(): void {
  }

    openDialog(question: Question, index:number) {
        const dialogRef = this.dialog.open(QuestionDialogComponent, {
            panelClass: 'custom-dialog',
            disableClose: true,
            data:   question 
        });

        dialogRef.afterClosed().subscribe(result => {
            this.game.questions[index] = result;
        });
    }

    addQuestion() {
        this.game.questions.push(new Question("Pregunta #"+ (this.game.questions.length+1),10))
    }
    editQuestion(question: Question, index:number) {
        this.openDialog(question, index);
    }
    deleteQuestion(index: number) {
        let auxDelante = this.game.questions.slice(0, index);
        let auxAtras = this.game.questions.slice(index + 1, this.game.questions.length);
        for (let i = 0; i < auxAtras.length; i++) {
            let q: Question = auxAtras[i];
            if (q.title.includes("Pregunta #")) {
                q.title = "Pregunta #" + (i + auxDelante.length + 1)

            }
        }
        this.game.questions = auxDelante.concat(auxAtras);
    }

    submit() {
//HACER CONEXION CON BBDD Y .NET Y COMPROBACIONES DE >=1 NRO PREGUNTAS, PREGUNTAS EXISTENTES NO VACIAS...
        alert("polla")
    }
}
