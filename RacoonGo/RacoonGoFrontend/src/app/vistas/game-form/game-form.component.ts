import { Component, OnInit } from '@angular/core';
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Game, Question, User } from "../../models/app.model";
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

    invalidQuestions: boolean;
    game: Game;
    user!: User;
    preguntasError: string;
    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService,  private router: Router, private dialog: MatDialog) {
        this.preguntasError = "";
        this.invalidQuestions = false;
        this.user = JSON.parse(sessionStorage.getItem("user")!);

        if (this.user == null) {
            this.router.navigate(['/login'])
        }
        this.game = new Game();
        this.game.email = this.user.email;
        this.game.name = "Juego de "+this.user.username
    }

    ngOnInit(): void {
        if (this.helperService.game != undefined){
            this.game = this.helperService.game;
       }
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
        if (this.game.questions.length  < 15) {
            this.game.questions.push(new Question("Pregunta #" + (this.game.questions.length + 1), 10));
        } 
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

    errorPreguntas(): boolean {
        this.invalidQuestions = false;
        if (this.game.questions.length == 0) {
            return true;
        }
        this.preguntasError = "";
        for (let question of this.game.questions) {
            if (question.options.length < 2) {
                this.preguntasError += question.title + ", "
                this.invalidQuestions = true;
            }
        }
        if (this.invalidQuestions) {
            this.preguntasError = this.preguntasError.substring(0, this.preguntasError.length - 2);
            return true;
        }
        return false;
    }

    submit() {
        if (!this.errorPreguntas()) {
            if (this.helperService.game == undefined)
                this.game.id = ""
            this.backendRouterService.endpoints.game.addGame(this.game).subscribe({
                next: (data: HttpResponse<Game>) => {
                    if (this.helperService.game == undefined) {
                        if (data.body?.hidden) {
                            Swal.fire({
                                title: '¡Muy bien!',
                                html: 'Se ha creado correctamente tu juego: ' + this.game.name + '<br><br> Para que otros accedan a tu juego pásales el código: <br> <b>' + data.body.id+'</b>',
                                icon:'success'
                            })
                        } else {
                            Swal.fire('¡Muy bien!', 'Se ha creado correctamente tu juego: ' + this.game.name, 'success')
                        }
                    } else {
                        if (data.body?.hidden) {
                            Swal.fire({
                                title: '¡Muy bien!',
                                html: 'Se ha modificado correctamente tu juego: ' + this.game.name + '<br><br> Para que otros accedan a tu juego pásales el código: <br> <b>' + data.body.id + '</b>',
                                icon: 'success'
                            })
                        } else {
                            Swal.fire('¡Muy bien!', 'Se ha modificado correctamente tu juego: ' + this.game.name, 'success')
                        }
                    }
                }
            })
        }
           
    
    }
}
