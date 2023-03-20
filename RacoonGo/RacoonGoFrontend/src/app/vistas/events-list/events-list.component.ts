import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {BackendRouterService} from "../../services/backend-router.service";
import {BackEndResponse, Event} from "../../models/app.model";
import { first } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

    eventsList: Event[] = [];

    constructor(private backEndResponse: BackendRouterService, private helperService: HelperService) { }

    ngOnInit(): void { this.getEvents(); }

    getEvents(): void {
        this.backEndResponse.endpoints.event.getEvents().subscribe({
            next: (data: HttpResponse<BackEndResponse<any>>) => {
                if (data.body) {

                    this.eventsList = data.body as unknown as Event[];
                 
                }
            },
            error: () => {
                Swal.fire('Error', 'Se ha producido un error al buscar eventos. Int�ntelo de nuevo en unos minutos.', 'error')
            }
        });
    }

    getThemeName(index: number): [string, string]{
        return this.helperService.getThemeInfo(index);
    }

    formatDate(date: Date): string {
        return date.getDay + "/" + date.getMonth + "/" + date.getFullYear;
    }
}
