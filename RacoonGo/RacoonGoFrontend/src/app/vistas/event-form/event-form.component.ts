import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
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

    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService) {
        
        this.image = this.defaultImg;
        this.colorList = this.helperService.colorList;
        for (let i = 0; i < 10; i++) {
            this.themeList.push(Theme[i])
        }
        this.todayDate = this.generarDiaActual();
        this.datePipe = new DatePipe('en-US');

        this.ageList.push("Edad recomendada")
        for (let i = 0; i < 5; i++) {
            this.ageList.push(this.helperService.getAgeText(i))
        }

    }

    generarDiaActual() {
        let date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem("user")!).body;

        if (this.helperService.event != undefined) {
            let e = this.helperService.event;
            this.addEventForm = new FormGroup({
                title: new FormControl(e.title),
                description: new FormControl(e.description),
                recommendedAge: new FormControl(e.recommendedAge),
                startDate: new FormControl(this.datePipe.transform(e.startDate, 'yyyy-MM-dd')),
                endDate: new FormControl(this.datePipe.transform(e.endDate, 'yyyy-MM-dd')),
                location: new FormControl(e.location.name)
            });
            this.image = e.photoUrl
            this.themes= e.themes
        } else {
            this.addEventForm = new FormGroup({
                title: new FormControl(''),
                description: new FormControl(''),
                recommendedAge: new FormControl('-1'),
                startDate: new FormControl(''),
                endDate: new FormControl(''),
                location: new FormControl('')
            });
        }



    }

    addEvent(): void {
        if (this.defaultImg === this.image) {
            this.image = "";
        }   
        let startDate = new Date(this.addEventForm.value.startDate)
        let endDate = new Date(this.addEventForm.value.endDate)
        if (this.addEventForm.value.title == undefined || this.addEventForm.value.description == undefined || this.addEventForm.value.recommendedAge < 0 || isNaN(startDate.getTime()) || isNaN(startDate.getTime()) || this.addEventForm.value.location == undefined || this.addEventForm.value.location.length == 0 || this.themes.length == 0) {
            Swal.fire('Error', 'Debes rellenar todos los campos para crear un evento', 'error')

        }
        else if (endDate.getTime() - startDate.getTime() <0) {
            Swal.fire('Error', 'Las fecha de fin no puede ser anterior a la fecha de inicio', 'error')
        }
        else {
            let id =''
            if (this.helperService.event != undefined) {
                id = this.helperService.event.id;
            }
            
            let event = new Event(id,
                this.addEventForm.value.title,
                this.addEventForm.value.description,
                this.addEventForm.value.recommendedAge,
                this.addEventForm.value.startDate,
                this.addEventForm.value.endDate,
                new Location(this.addEventForm.value.location),
                this.themes,
                this.image,
                this.user
            );
                this.backendRouterService.endpoints.event.addEvent(event).subscribe({
                    next: () => {
                        if (this.helperService.event === undefined) {
                            Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu evento: ' + event.title, 'success')
                        } else {
                            Swal.fire('\u00A1Muy bien!', 'Se ha modificado correctamente tu evento: ' + event.title, 'success')

                        }
                    },
                    error: () => {

                        Swal.fire('Error', 'La ciudad ' + event.location.name + ' no se ha encontrado', 'error')

                    }
                });
            

        }
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
