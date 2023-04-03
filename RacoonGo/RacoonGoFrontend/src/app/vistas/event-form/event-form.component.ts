import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import {RecommendedAge, Theme} from "../../models/app.enum";
import {Event, Location, User} from "../../models/app.model";
import {BackendRouterService} from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import { DatePipe } from '@angular/common';

 

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

    addEventForm!: FormGroup;
    submitted = false;
    title: string="";
    age: number=0;
    description: string="";
    startDate: string="";
    endDate: string="";
    invalidStartDate = false;
    invalidEndDate = false;
    invalidLength = false;
    invalidAge = false;
    location: string="";
    themeList: string[] = [];
    themes: number[] = [];
    colorList: string[];
    todayDate!: string;
    image: string;
    readonly defaultImg: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
    user!: User;
    event: Event | undefined;
    datePipe: DatePipe;
    ageList: string[] = [];


    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService, private fb: FormBuilder) {
        this.image = this.defaultImg;
        this.colorList = this.helperService.colorList;
        for (let i = 0; i < 10; i++) {
            this.themeList.push(Theme[i])
        }
        //this.todayDate = this.generarDiaActual();
        this.datePipe = new DatePipe('en-US');

        this.ageList.push("Edad recomendada")
        for (let i = 0; i < 5; i++) {
            this.ageList.push(this.helperService.getAgeText(i))
        }

    }

    /*generarDiaActual() {
        let date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }*/

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem("user")!).body  ;
        alert(this.user.username)
        this.addEventForm = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            age: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            location: ['', [Validators.required]],
            image: ['', [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]]
        })
        /*this.addEventForm = new FormGroup({
            title: new FormControl(e.title),
            description: new FormControl(e.description),
            recommendedAge: new FormControl(e.recommendedAge),
            startDate: new FormControl(this.datePipe.transform(e.startDate, 'yyyy-MM-dd')),
            endDate: new FormControl(this.datePipe.transform(e.endDate, 'yyyy-MM-dd')),
            location: new FormControl(e.location.name)
        });*/
    }
    
    checkValidity(controlName: string) {
        const control = this.addEventForm.get(controlName);
        if (control) {
            control.markAsTouched();
        }
    }
    
    onSubmit() {
        this.submitted = true;
        if (this.defaultImg === this.image) {
            this.image = "";
        }
        let startDate = new Date(this.addEventForm.value.startDate)
        let endDate = new Date(this.addEventForm.value.endDate)
        if (startDate.getTime() - new Date().getTime() <0) {
            this.invalidStartDate = true;
        }
        if (endDate.getTime() - startDate.getTime() <0) {
            this.invalidEndDate = true;
        }
        if (this.themes.length == 0) {
            this.invalidLength = true;
        }
        if (this.addEventForm.value.age == 0) {
            this.invalidAge = true;
        }
        if (this.addEventForm.invalid) {
            return;
        }
        else {
            this.invalidStartDate = false;
            this.invalidEndDate = false;
            this.invalidLength = false;
            this.invalidAge = false;
            this.addEvent();
        }
    }

    addEvent(): void {
        let event = new Event('',
            this.addEventForm.value.title,
            this.addEventForm.value.description,
            this.addEventForm.value.age,
            this.addEventForm.value.startDate,
            this.addEventForm.value.endDate, 
            new Location(this.addEventForm.value.location),
            this.themes, 
            this.image,
            this.user
        );

        this.backendRouterService.endpoints.event.addEvent(event).subscribe({
            next: () => {

                Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu evento: ' + event.title, 'success')
            },
            error: () => {

                Swal.fire('Error', 'La ciudad ' + event.location.name + ' no se ha encontrado', 'error')

            }
        });
    }
    onSelectionChange(event: any) {
        this.themes.push(event.target?.value as number)
        for (let i = 0; i < this.themes.length-1; i++) {
            if (this.themes[i] == event.target?.value){
                let auxDelante = this.themes.slice(0, i);
                let auxAtras = this.themes.slice(i + 1, this.themes.length);
                this.themes = auxDelante.concat(auxAtras);
                this.themes.pop();
                break;
            }
    }
}
    onWriteChange(event: any) {
        let img = event.target?.value;
        try {
            new URL(img);
            this.image = img;
        } catch (err) {
            this.image = this.defaultImg;
        }
    }
    getThemeName(index: number) {
        return Theme[index];

    }

    deleteTag(theme: number) {
        
        let auxDelante = this.themes.slice(0, this.themes.indexOf(theme));
        let auxAtras = this.themes.slice(this.themes.indexOf(theme) + 1, this.themes.length);
        this.themes = auxDelante.concat(auxAtras);
        
       
    }

    randomColor(index: number) {
        return this.colorList[index];
    }
}
