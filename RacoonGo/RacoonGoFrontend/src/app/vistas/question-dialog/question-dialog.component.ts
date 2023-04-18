import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game, Option, Question, User } from "../../models/app.model";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

    question: Question
    oldQuestion: Question
    invalidTitle: boolean = false;
    invalidPoints: boolean = false;
    invalidOptions: boolean = false


    constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: Question) {
        this.question = data;
        this.oldQuestion = Object.assign({}, data, {
            options: this.data.options.slice()
        });

}

    ngOnInit(): void {
    }

    //Botón X cerrar
    onClose() {
        this.question = Object.assign({}, this.oldQuestion, {
            options: this.oldQuestion.options.slice()
        });
        this.dialogRef.close(this.question);
    }

    //Botón añadir Opción
    addOption(): void {
        if (this.question.options.length == 4) {
            return
        }
        this.question.options.push(new Option("Opción #" + (this.question.options.length + 1)))

    }

    //Toggle
    changeState(i: number): void {
        for (let j = 0; j < this.question.options.length; j++) {
            if (this.question.options[j].correct && i != j) {
                this.question.options[j].correct = false;
                return;
            }
        }
    }

    //Comprobaciones para ver si es correcta la pregunta
    comprobations() {

        this.invalidOptions = true;
        for (let opt of this.question.options) {
            if (opt.correct) {
                this.invalidOptions = false;
            }
        }
        if (this.question.options.length < 2) {
            this.invalidOptions = true;

        }

        if (this.question.points <= 0) {
            this.invalidPoints = true;
        } else {
            this.invalidPoints = false;

        }
        if (this.question.title.trim().length == 0) {
            this.invalidTitle = true;
        } else {
            this.invalidTitle = false;

        }
    }

    //Botón aceptar
    confirm() {
        this.comprobations();
        if (!this.invalidOptions && !this.invalidTitle && !this.invalidPoints) {
            this.dialogRef.close(this.question);

        }
              
            
        

    }
}
