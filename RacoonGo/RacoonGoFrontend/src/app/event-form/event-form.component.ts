import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Event, Theme } from '../models/event';
import { Location } from '../models/location';
import { EventsService } from '../services/events.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

 

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
    todayDate: string;
    image: string;
    readonly defaultImg:  string = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png";


    constructor(private eventService: EventsService, private httpClient: HttpClient) {
        this.image = this.defaultImg;

        for (let i = 0; i < 10; i++) {
            this.themeList.push(Theme[i])
        }
        this.colorList =
        ['#81f774',
            '#86fcf1',
            '#e2eb7f',
            '#f7bb92',
            '#f59f9a',
            '#ec92f7',
            '#fc8dba',
            '#a692f0',
            '#ff6370',
            '#ab989a'
            ]
        let date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        this.todayDate = `${year}-${month}-${day}`;
    }

    ngOnInit(): void {

        this.addEventForm = new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
            recommendedAge: new FormControl(''),
            startDate: new FormControl(''),
            endDate: new FormControl(''),
            location: new FormControl('')
           });


    }

    addEvent(): void {
        if (this.defaultImg === this.image) {
            this.image = "";
        }   
        let startDate = new Date(this.addEventForm.value.startDate)
        let endDate = new Date(this.addEventForm.value.endDate)
        if (this.addEventForm.value.title == undefined || this.addEventForm.value.description == undefined || this.addEventForm.value.recommendedAge == undefined || isNaN(startDate.getTime()) || isNaN(startDate.getTime()) || this.addEventForm.value.location == undefined || this.addEventForm.value.location.length == 0 || this.themes.length == 0) {
            Swal.fire('Error', 'Debes rellenar todos los campos para crear un evento', 'error')

        }
        else if (endDate.getTime() - startDate.getTime() <0) {
            Swal.fire('Error', 'Las fecha de fin no puede ser anterior a la fecha de inicio', 'error')
        }
        else {
            let event = new Event(
                this.addEventForm.value.title,
                this.addEventForm.value.description,
                this.addEventForm.value.recommendedAge,
                this.addEventForm.value.startDate,
                this.addEventForm.value.endDate,
                new Location(this.addEventForm.value.location),
                this.themes,
               this.image
            );

            this.eventService.addEvent(event).subscribe(
                (response) => {

                    Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu evento: ' + event.title, 'success')
                },
                (error) => { 

                    Swal.fire('Error', 'La ciudad '+event.location.name+' no se ha encontrado', 'error')

                }

            );
        }
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
