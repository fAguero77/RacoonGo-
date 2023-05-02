import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import {Theme} from "../../models/app.enum";
import {CompanyUser, Event, Location, User} from "../../models/app.model";
import {BackendRouterService} from "../../services/backend-router.service";
import { HelperService } from '../../services/helper.service';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
    addEventForm!: FormGroup;
    submitted = false;
    age: number=0;
    invalidStartDate = false;
    invalidEndDate = false;
    invalidLength = false;
    themeList: string[] = [];
    themes: number[] = [];
    colorList: string[];
    todayDate!: string;
    image: string;
    readonly defaultImg: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
    user!: CompanyUser;
    event: Event | undefined;
    ageList: string[] = [];
    datePipe: DatePipe;

    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, public helperService: HelperService, private fb: FormBuilder, private router: Router) {
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
        this.user = JSON.parse(sessionStorage.getItem("user")!);
        if (this.user == null) {
            this.router.navigate(['/login']);
        }
        this.addEventForm = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            location: ['', [Validators.required]],
            image: ['', [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]],
            ageF: [0, [Validators.required, Validators.min(0)]]
        });
        if(this.helperService.event != undefined) {
            let e = this.helperService.event;
            this.addEventForm.patchValue({
                title: e.title,
                description: e.description,
                startDate: this.datePipe.transform(e.startDate, 'yyyy-MM-dd'),
                endDate: this.datePipe.transform(e.endDate, 'yyyy-MM-dd'),
                location: e.location.name,
                ageF: e.recommendedAge
            });
            this.image = e.photoUrl;
            this.themes = e.themes;
        }
    }
    checkValidity(controlName: string) {
        const control = this.addEventForm.get(controlName);
        if (control) {
            control.markAsTouched();
        }
    }
    
    onSubmit() {
        this.submitted = true;
        let startDate = new Date(this.addEventForm.value.startDate)
        let endDate = new Date(this.addEventForm.value.endDate)
        this.invalidStartDate = startDate.getTime() - new Date().getTime() < 0;
        this.invalidEndDate = endDate.getTime() - startDate.getTime() < 0;
        this.invalidLength = this.themes.length == 0;
        if (this.addEventForm.invalid) {
            return;
        }
        else if (!this.invalidEndDate && !this.invalidEndDate && !this.invalidLength) {
            this.addEvent();
        }
    }

    addEvent(): void {
        if (this.defaultImg === this.image) {
            this.image = "";
        }
        let event: Event;
        if (this.helperService.event != undefined) {
            event = new Event(this.helperService.event.id,
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
        }
        else {
            event = new Event('',
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
        }

        this.backendRouterService.endpoints.event.addEvent(event).subscribe({
            next: () => {
                if (this.helperService.event === undefined) {
                    Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu evento: ' + event.title, 'success')
                } else {
                    Swal.fire('\u00A1Muy bien!', 'Se ha modificado correctamente tu evento: ' + event.title, 'success')
                    this.helperService.event = undefined;
                }
                this.router.navigate(['/events']);
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
