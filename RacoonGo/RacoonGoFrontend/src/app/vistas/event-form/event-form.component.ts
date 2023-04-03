import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
    image: string;
    readonly defaultImg: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";
    user!: User;


    constructor(private backendRouterService: BackendRouterService, private httpClient: HttpClient, private helperService: HelperService, private fb: FormBuilder) {
        this.image = this.defaultImg;
        this.colorList = this.helperService.colorList;
        for (let i = 0; i < 10; i++) {
            this.themeList.push(Theme[i])
        }
    }

    ngOnInit(): void {
        this.user = JSON.parse(sessionStorage.getItem("user")!).body  ;
        alert(this.user.username)
        this.addEventForm = this.fb.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            age: ['', [Validators.required]],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            location: ['', [Validators.required]],
            image: ['', [Validators.pattern(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/)]]
        })
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
        if (this.addEventForm.invalid) {
            return;
        }
        else {
            this.invalidStartDate = false;
            this.invalidEndDate = false;
            this.invalidLength = false;
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
        if (this.themes.includes(event.target?.value)) {
            let aux = this.themes
            this.themes = []
            for (let i = 0; i < aux.length; i++) {
                if (aux[i] != event.target?.value )
                    this.themes.push(aux[i] as number)
            }
        } else {
            this.themes.push(event.target?.value as number)

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
