import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Event, Theme } from '../models/event';
import { Location } from '../models/location';
import { EventsService } from '../services/events.service';
import { ReactiveFormsModule } from '@angular/forms';
 

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
            // and check for errors probably
            console.log('New event added:', newEvent);
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

}
