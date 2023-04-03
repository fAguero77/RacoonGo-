﻿import { Injectable } from '@angular/core';
import { Theme } from '../models/app.enum';
import { BackEndResponse, Event, User } from "../models/app.model";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from "@angular/router";
import { BackendRouterService } from "../services/backend-router.service";
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
    colorList =
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

    ageText = [
        "Todos los públicos",
        "Niños (8-11 años)",
        "Jóvenes (12-14 años)",
        "Adolescentes (15-18 años)",
         "Adultos (+18 años)"
        ]
    event: Event | undefined;


    constructor(private route: ActivatedRoute,
        private router: Router,
        private backEndResponse: BackendRouterService,) { }


    getThemeInfo(index: number): [string,string] {
        return [Theme[index], this.colorList[index]];
    }

    getAgeText(index: number): string {
        return this.ageText[index];
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
            this.backEndResponse.endpoints.event.deleteEvent(e.user.email, e.id).subscribe({
                next: (data: HttpResponse<BackEndResponse<any>>) => {
                    Swal.fire('\u00A1Muy bien!', 'Se ha eliminado correctamente tu evento: ' + e.title, 'success').then((a) => {
                        window.location.reload();
                    })
                }
            });

        })

    }

    updateEvent(e: Event) {
        this.event = e;
        this.router.navigate(['/addEvent']);
    }
    
}
