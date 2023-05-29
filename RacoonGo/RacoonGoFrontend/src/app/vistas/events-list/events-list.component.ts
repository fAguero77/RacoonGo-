import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BackendRouterService } from "../../services/backend-router.service";
import {BackEndResponse, CompanyUser, Event, User} from "../../models/app.model";
import { HttpResponse } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

    eventsList: Event[] = [];
    user: User;

    userCompany: CompanyUser;

    constructor(private route: ActivatedRoute, 
                private router: Router, 
                private backEndResponse: BackendRouterService, 
                private helperService: HelperService) {
        this.user = JSON.parse(sessionStorage.getItem("user")!);
        this.userCompany = JSON.parse(sessionStorage.getItem("user")!);
    }

    ngOnInit(): void {
        this.getEvents();

    }
    onEventsListUpdate(data: Event[]) {
        // Para recibir lista actualizada del hijo (search-bar) con las listas filtradas
        this.eventsList = data;

    }

    getEvents(): void {
        this.backEndResponse.endpoints.event.getEvents().subscribe({
            next: (data: HttpResponse<BackEndResponse<any>>) => {
                if (data.body) {
                    this.eventsList = data.body as unknown as Event[];
                    //this.eventsList = this.eventsList.filter((value, index) => index % 3 === 0);

                }
            },
            error: () => {
                Swal.fire('Error', 'Se ha producido un error al buscar eventos. Inténtelo de nuevo en unos minutos.', 'error')
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
        let user: User = JSON.parse(sessionStorage.getItem("user")!)
        this.backEndResponse.endpoints.event.getMyEvents(user.email).subscribe({
            next: (data: HttpResponse<BackEndResponse<any>>) =>{
                this.eventsList = data.body as unknown as Event[];

            }
        })
    }

    deleteEvent(e: Event) {
        this.helperService.deleteEvent(e);
        
    }

    updateEvent(e: Event) {
        this.helperService.updateEvent(e);
    }

    evento!: Event;
    eventoGrande = false;
    
    wievEvent(e: Event) {
        this.evento = e;
        this.eventoGrande = true;
    }
    notWievEvent() {
        this.eventoGrande = false;
    }

    isSponsored(d: Date): boolean {
        const eventDate = new Date(d);
        return eventDate >= new Date();
    }

    login() {
        this.router.navigate(['/login']);
    }
}
