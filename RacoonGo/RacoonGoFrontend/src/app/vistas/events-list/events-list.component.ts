import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {BackendRouterService} from "../../services/backend-router.service";
import {Event} from "../../models/app.model";
@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

    eventsList: Event[] = [];

    constructor(private backEndResponse: BackendRouterService) { }

    ngOnInit(): void { this.getEvents(); }

    getEvents(): void {
        this.backEndResponse.endpoints.getEvents().subscribe({
            next: (data: Event[]) => {
                this.eventsList = data as Event[];
            },
            error: () => {
                Swal.fire('Error', 'Se ha producido un error al buscar eventos. Int�ntelo de nuevo en unos minutos.', 'error')
            }
        })
    }

    getThemeName(index: number): [string, string]{
        return this.backEndResponse.endpoints.getThemeInfo(index);
    }

    formatDate(date: Date): string {
        return date.getDay + "/" + date.getMonth + "/" + date.getFullYear;
    }
}
