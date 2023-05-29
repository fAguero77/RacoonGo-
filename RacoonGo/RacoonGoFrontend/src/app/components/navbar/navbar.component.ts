import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarService } from './navbar.service';
import {CompanyUser, User} from '../../models/app.model';
import { BackendRouterService } from '../../services/backend-router.service';
import { getAuth, deleteUser } from 'firebase/auth';
import {HelperService} from "../../services/helper.service";


@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    userName?: string;

    static navSearch: boolean
    user: User;
    userCompany: CompanyUser;
    constructor(public navService: NavbarService,
        private router: Router, private routerService: BackendRouterService, public helperService: HelperService) {
        this.user = JSON.parse(sessionStorage.getItem("user")!);
        this.userCompany = JSON.parse(sessionStorage.getItem("user")!);
        
    }


    goAddEve() {
        this.helperService.event= undefined;
        window.location.assign('/addEvent');
    }

    goEveList() {
        this.router.navigate(['/']);

    }
    goInfo() {
        this.router.navigate(['/info']);

    }
    gologin() {
        this.router.navigate(['/login']);
    }

    goProfile() {
        this.router.navigate(['/profile']);
    }
    logout(): void {
        sessionStorage.clear();
        // TODO: redirect to main page
        this.router.navigate(['/login']);
    }
    goSingIn() {
        this.router.navigate(['/register']);
    }

    goSponsor() {
        this.router.navigate(['/sponsor']);

    }
    goAddGame() {
        this.helperService.game= undefined;
        window.location.assign('/addGame');
    }
    deleteAcount() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás recuperar tu cuenta!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar.',
            cancelButtonText: 'No, cancelar.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.deleteUserInfo();
                sessionStorage.removeItem("user");
            }
        })

    }
    async deleteUserInfo(): Promise<void> {
        let user: User = JSON.parse(sessionStorage.getItem("user")!);
        // Delete user account, events and games
        this.routerService.endpoints.user.deleteAccount(user.email).subscribe({
            next: (data: any) => {
                this.deleteFromFirebaseAuth();
                // Delete session and redirect to main page
                sessionStorage.removeItem("user");
                this.router.navigate(['/events']);
                // TODO: derigir a home (cuando la creemos):
                //this.router.navigate(['/home']);
            },
            error: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la cuenta',
                    text: 'Intentelo de nuevo en unos minutos'
                });
            }
        });

    }

    async deleteFromFirebaseAuth() {
        try {
            // Delete the user from Firebase Authentication
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (currentUser) {
                await deleteUser(currentUser);
            }
        } catch (error) {
            throw new Error('Error al eliminar la cuenta de firebase auth ');
        }
    }

    goGameList() {
        this.router.navigate(['/games']);
    }
}
