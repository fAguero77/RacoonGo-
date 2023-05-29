import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BackEndResponse, CompanyUser, User } from '../../models/app.model';
import { BackendRouterService } from '../../services/backend-router.service';
import { HelperService } from '../../services/helper.service';
import {Router} from "@angular/router";
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'sponsor-form',
    templateUrl: './sponsor-form.component.html',
    styleUrls: ['./sponsor-form.component.css']
})
export class SponsorFormComponent implements OnInit {

    constructor(private routerService: BackendRouterService, private router: Router) { }

    ngOnInit(): void {
    }

    company!: CompanyUser;
    checkOut(n: number) {

        // it has to be a companyUser because they are the only ones with events
        this.company = JSON.parse(sessionStorage.getItem("user")!);
        //console.log(this.company);
        if (this.company == null) {
            this.router.navigate(['/login']);
        }
        //console.log(this.company);
        this.routerService.endpoints.user.setSponsor(this.company.email, n).subscribe({
            next: (response: HttpResponse<BackEndResponse<any>>) => {
                //let date: Date = new Date();
                //date.setDate(date.getDate() + n);
                let c: CompanyUser = response.body as unknown as CompanyUser;
                let formattedDt = formatDate(new Date(c.sponsored), 'dd/MM/yyyy', 'en_US');
                Swal.fire('Compra realizada con &eacutexito',
                    'Todos tus eventos apareceran destacados hasta el ' + formattedDt);

            },
            error: () => {
                Swal.fire('No se pudo efectuar la compra',
                    'Por favor, int&eacutentelo de nuevo en unos minutos. Si el problema persiste contacte con su proveedor de internet.');
            }
        });


    }

}