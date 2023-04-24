import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CompanyUser, User } from '../../models/app.model';
import { BackendRouterService } from '../../services/backend-router.service';
import { HelperService } from '../../services/helper.service';
import {Router} from "@angular/router";

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

        //// test debug hasta que el login de usuario comp funcione
        //const u = new User("c@gmail.com", "c", 10);
        //const c = new CompanyUser(u, "c.com", "123456");
        //sessionStorage.setItem("testCompany", JSON.stringify(c));
        //sessionStorage.setItem("testUser", JSON.stringify(u));
        //console.log("heyy wey");
        //console.log(c);


        // it has to be a companyUser becouse they are the only ones with events
        this.company = JSON.parse(sessionStorage.getItem("testCompany")!).body;
        if (this.company == null) {
            this.router.navigate(['/login']);
        }

        this.routerService.endpoints.user.setSponsor(this.company, n).subscribe({
            next: () => {
                let date: Date = new Date();
                date.setDate(date.getDate() + n);
                let formattedDt = formatDate(date, 'dd/MM/yyyy', 'en_US')
                Swal.fire('Compra realizada con &eacutexito', 'Todos tus eventos apareceran destacados hasta el ' + formattedDt);
            }, error: () => {
                Swal.fire('No se pudo efectuar la compra', 'Por favor, int&eacutentelo de nuevo en unos minutos. Si el problema persiste contacte con su proveedor de internet.');
            }
        })



        
    }

}
