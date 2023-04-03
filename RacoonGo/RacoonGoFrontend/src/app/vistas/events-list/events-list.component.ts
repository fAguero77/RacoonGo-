import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BackendRouterService } from "../../services/backend-router.service";
import { BackEndResponse, Event, User } from "../../models/app.model";
import { first } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute, Router } from "@angular/router";
import { EventFormComponent } from '../event-form/event-form.component';

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

    eventsList: Event[] = [];
    user: User |undefined = undefined;


    constructor(private route: ActivatedRoute,
        private router: Router,
        private backEndResponse: BackendRouterService, private helperService: HelperService) {
        if (JSON.parse(sessionStorage.getItem("user")!) != undefined) {
            this.user = JSON.parse(sessionStorage.getItem("user")!).body;

        }
    }

    ngOnInit(): void { this.getEvents(); }

    getEvents(): void {
        this.backEndResponse.endpoints.event.getEvents().subscribe({
            next: (data: HttpResponse<BackEndResponse<any>>) => {
                if (data.body) {
                    this.eventsList = data.body as unknown as Event[];
                    this.eventsList.filter((value, index) => index % 3 === 0);
                }
            },
            error: () => {
                Swal.fire('Error', 'Se ha producido un error al buscar eventos. Int�ntelo de nuevo en unos minutos.', 'error')
            }
        });
    }

    getThemeName(index: number): [string, string] {
        return this.helperService.getThemeInfo(index);
    }

    formatDate(date: Date): string {
        return date.getDay + "/" + date.getMonth + "/" + date.getFullYear;
    }

    getAgeRecommendation(age: number): string {
        return this.helperService.getAgeText(age);
    }

    isDifDate(start: Date, end: Date): boolean {
        return start.getTime() < end.getTime();
    }

    convertDate(d: Date): string {
        return d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear();
    }

    getMyEvents() {
        let user: User = JSON.parse(sessionStorage.getItem("user")!).body
        this.backEndResponse.endpoints.event.getMyEvents(user.email).subscribe({
            next: (data: HttpResponse<BackEndResponse<any>>) =>{
                this.eventsList = data.body as unknown as Event[];

            }
        })
    }

    deleteEvent(e: Event) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            this.backEndResponse.endpoints.event.deleteEvent(this.user?.email,e.id).subscribe({
                next: (data: HttpResponse<BackEndResponse<any>>) => {
                    Swal.fire('\u00A1Muy bien!', 'Se ha eliminado correctamente tu evento: ' + e.title, 'success').then((a) =>{
                        window.location.reload();
                    })
                }
            });
            
        })
        
    }

    updateEvent(e: Event) {
        this.helperService.event = e;
        this.router.navigate(['/addEvent']);
    }

}
