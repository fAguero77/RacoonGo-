import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Event, Theme } from '../models/event';
import { Location } from '../models/location';
import { EventsService } from '../services/events.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

 

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

    addEventForm!: FormGroup;
    themeList: string[] = [];
    themes: number[] = [];
    constructor(private eventService: EventsService) {
        for (let i = 0; i < 10; i++) {
            this.themeList.push(Theme[i])
        }
}

    ngOnInit(): void {

        this.addEventForm = new FormGroup({
            title: new FormControl(''),
            description: new FormControl(''),
            recommendedAge: new FormControl(''),
            startDate: new FormControl(''),
            endDate: new FormControl(''),
            location: new FormControl(''),
        });


    }

    addEvent(): void {
        if (this.addEventForm.value.title == undefined || this.addEventForm.value.description == undefined || this.addEventForm.value.recommendedAge == undefined || this.addEventForm.value.startDate == undefined || this.addEventForm.value.endDate == undefined || this.addEventForm.value.location == undefined || this.themes.length == 0) {
            Swal.fire('Error', 'Debes rellenar todos los campos para crear un evento', 'error')

        }
        else if (this.addEventForm.value.startDate < new Date() || this.addEventForm.value.endDate < new Date() ) {
            Swal.fire('Error', 'La fecha de inicio y de fin no pueden ser anteriores a la fecha actual', 'error')

        } else if (this.addEventForm.value.endDate < this.addEventForm.value.startDate) {
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
                this.themes
            );

            this.eventService.addEvent(event).subscribe(newEvent => {
                Swal.fire('\u00A1Muy bien!', 'Se ha creado correctamente tu evento: ' + event.title, 'success')
            });
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

}
