import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Game, Option, Question, User } from "../../models/app.model";
import { MatButton } from '@angular/material/button';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})

export class QuestionDialogComponent implements OnInit {

    question: Question
    oldQuestion: Question
    invalidOptions: boolean = false
    addQuestionForm!: FormGroup;
    submitted: Boolean=false

    constructor(public dialogRef: MatDialogRef<QuestionDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: Question, private fb: FormBuilder) {
        this.question = data;
        this.oldQuestion = Object.assign({}, data, {
            options: this.data.options.slice()
        });
    }

    ngOnInit(): void {
        this.addQuestionForm = this.fb.group({
            title: ['', [Validators.required]],
            points: [0, [Validators.required, Validators.min(1)]]
        });
        this.addQuestionForm.patchValue({
            title: this.question.title,
            points: this.question.points
        });
    }
    onClose() {
        this.question = Object.assign({}, this.oldQuestion, {
            options: this.oldQuestion.options.slice()
        });
        this.dialogRef.close(this.question);
    }

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
    }

    //Botón aceptar
    confirm() {
        this.comprobations();
        if (!this.invalidOptions) {
            this.dialogRef.close(this.question);
        }
    }

    checkValidity(controlName: string) {
        const control = this.addQuestionForm.get(controlName);
        if(control)
            control.markAsTouched();
    }
}
