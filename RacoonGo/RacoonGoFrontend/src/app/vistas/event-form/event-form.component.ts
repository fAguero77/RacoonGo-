import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import {Theme} from "../../models/app.enum";
import {Event, Location, User} from "../../models/app.model";
import {BackendRouterService} from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
 

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
    location: string="";
    themeList: string[] = [];
    themes: number[] = [];
    colorList: string[];
    todayDate!: string;
    image: string;
    readonly defaultImg: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
    user!: User;
    event: Event | undefined;
    ageList: string[] = [];

    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService, private fb: FormBuilder) {
        this.image = this.defaultImg;
        this.colorList = this.helperService.colorList;
        for (let i = 0; i < 10; i++) {
            this.themeList.push(Theme[i])
        }
        this.ageList.push("Edad recomendada")
        for (let i = 0; i < 5; i++) {
            this.ageList.push(this.helperService.getAgeText(i))
        }
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem("user")!);
        alert(this.user.username)
        let e = this.helperService.event;
        this.addEventForm = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            location: ['', [Validators.required]],
            image: ['', [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
            ageF: [0, [Validators.required, Validators.min(0)]]
        });
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
        else this.invalidStartDate = false;
        if (endDate.getTime() - startDate.getTime() <0) {
            this.invalidEndDate = true;
        }
        else this.invalidEndDate = false;
        if (this.themes.length == 0) {
            this.invalidLength = true;
        }
        else this.invalidLength = false;
        if (this.addEventForm.invalid) {
            return;
        }
        else if (!this.invalidEndDate && !this.invalidEndDate && !this.invalidLength) {
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

                Swal.fire('Muy bien!', 'Se ha creado correctamente tu evento: ' + event.title, 'success')
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
