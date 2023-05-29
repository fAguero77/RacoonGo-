import { Component, OnInit } from '@angular/core';
import { BackendRouterService } from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Game, Question, User } from "../../models/app.model";
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {G} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
    addGameForm!: FormGroup;
    invalidQuestions: boolean;
    invalidGame: boolean
    //game: Game | undefined;
    user!: User;
    preguntasError: string;
    submitted: boolean=false;
    questions: Question[] = [];
    hidden: boolean = false;
    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService,  private router: Router, private dialog: MatDialog, private fb: FormBuilder) {
        this.preguntasError = "";
        this.invalidGame = false;
        this.invalidQuestions = false;
        this.user = JSON.parse(sessionStorage.getItem("user")!);

        if (this.user == null) {
            this.router.navigate(['/login'])
        }
    }

    ngOnInit(): void {
        this.addGameForm = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            difficulty: [-1, [Validators.required, Validators.min(0), Validators.max(2)]],
        });
        this.addGameForm.patchValue({
            title: "Juego de " + this.user.username});
        if (this.helperService.game!=undefined) {
            let g = this.helperService.game;
            this.addGameForm.patchValue({
                title: g.name,
                description: g.description,
                difficulty: g.difficulty,
            });
            this.questions = g.questions;
            this.hidden = g.hidden;
        }
  }

    openDialog(question: Question, index:number) {
        const dialogRef = this.dialog.open(QuestionDialogComponent, {
            panelClass: 'custom-dialog',
            disableClose: true,
            data:   question 
        });

        dialogRef.afterClosed().subscribe(result => {
            this.questions[index] = result;
        });
    }

    addQuestion() {
        if (this.questions.length  < 15) {
            this.questions.push(new Question("Pregunta #" + (this.questions.length + 1), 10));
            this.openDialog(this.questions[this.questions.length-1], this.questions.length-1);
        } 
    }
    editQuestion(question: Question, index:number) {
        this.openDialog(question, index);
    }
    deleteQuestion(index: number) {
        let auxDelante = this.questions.slice(0, index);
        let auxAtras = this.questions.slice(index + 1, this.questions.length);
        for (let i = 0; i < auxAtras.length; i++) {
            let q: Question = auxAtras[i];
            if (q.title.includes("Pregunta #")) {
                q.title = "Pregunta #" + (i + auxDelante.length + 1)

            }
        }
        this.questions = auxDelante.concat(auxAtras);
    }

    errorPreguntas(): boolean {
        this.invalidQuestions = false;
        this.preguntasError = "";
        for (let question of this.questions) {
            if (question.options.length < 2) {
                this.preguntasError += question.title + ", ";
                this.invalidQuestions = true;
            }
        }
        if (this.invalidQuestions) {
            this.preguntasError = this.preguntasError.substring(0, this.preguntasError.length - 2);
            return true;
        }
        return false;
    }
    onSubmit() {
        this.submitted = true;
        if (this.questions.length === 0) {
            this.invalidGame = true;
            return;
        }
        this.invalidGame = false;
        if (this.errorPreguntas())
            return;
        if (this.addGameForm.valid) {
            this.addGame();
        }
    }
    
    addGame() {
        let game: Game;
        if (this.helperService.game == undefined){
            game=new Game('', this.addGameForm.value.title, this.addGameForm.value.description, this.addGameForm.value.difficulty, this.questions, this.user.email, this.hidden, 0);
        }
        else{
            game=new Game(this.helperService.game.id, this.addGameForm.value.title, this.addGameForm.value.description, this.addGameForm.value.difficulty, this.questions, this.user.email, this.hidden, this.helperService.game.timesPlayed);
        }
            this.backendRouterService.endpoints.game.addGame(game).subscribe({
                next: (data: HttpResponse<Game>) => {
                    if (this.helperService.game == undefined) {
                        if (data.body?.hidden) {
                            Swal.fire({
                                title: '¡Muy bien!',
                                html: 'Se ha creado correctamente tu juego: ' + game.name+ '<br><br> Para que otros accedan a tu juego pásales el código: <br> <b>' + data.body.id+'</b>',
                                icon:'success'
                            })
                        } else {
                            Swal.fire('¡Muy bien!', 'Se ha creado correctamente tu juego: ' + game.name, 'success')
                        }
                    } else {
                        if (data.body?.hidden) {
                            Swal.fire({
                                title: '¡Muy bien!',
                                html: 'Se ha modificado correctamente tu juego: ' + game.name + '<br><br> Para que otros accedan a tu juego pásales el código: <br> <b>' + data.body.id + '</b>',
                                icon: 'success'
                            })
                        } else {
                            Swal.fire('¡Muy bien!', 'Se ha modificado correctamente tu juego: ' + game.name, 'success')
                        }
                        this.helperService.game = undefined;
                    }
                    this.router.navigate(['/games']);
                }
            })
    }

    checkValidity(controlName: string) {
        const control = this.addGameForm.get(controlName);
        if (control)
            control.markAsTouched();
    }
}
