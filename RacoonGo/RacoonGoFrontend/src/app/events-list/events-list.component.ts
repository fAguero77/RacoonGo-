import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { Event, Theme } from '../models/event';
import Swal from 'sweetalert2';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

    eventsList: Event[] = [];

    constructor(private eventsService: EventsService) { }

    ngOnInit(): void { this.getEvents(); }

    getEvents(): void {
        this.eventsService.getEvents().subscribe({
            next: data => {
                this.eventsList = data as Event[];
            },
            error: error => {
                Swal.fire('Error', 'Se ha producido un error al buscar eventos. Inténtelo de nuevo en unos minutos.')
            }
        })
    }

    getThemeName(index: number): [string, string]{
        return this.eventsService.getThemeInfo(index);
    }

    formatDate(date: Date): string {
        return date.getDay + "/" + date.getMonth + "/" + date.getFullYear;
    }
}
