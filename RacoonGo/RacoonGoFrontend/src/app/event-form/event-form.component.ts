import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Event } from '../models/event';
import { Location } from '../models/location';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

    addEventForm!: FormGroup;

    constructor(private eventService: EventsService) { }

    ngOnInit(): void {
        this.addEventForm = new FormGroup({
            title: new FormControl(''),
            description: new FormControl('')
        });
    }

    addEvent(): void {

        let event = new Event(
            this.addEventForm.value.title,
            this.addEventForm.value.description,
            1,
            new Date(),
            new Date(),
            new Location ("Valencia")
        );
        

        this.eventService.addEvent(event).subscribe(newEvent => {
            // and check for errors probably
            console.log('New event added:', newEvent);
        });

    }

}
