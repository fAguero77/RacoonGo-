import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../../models/app.model';
import { BackendRouterService } from '../../services/backend-router.service';
import { Router } from '@angular/router';

@Component({
    selector: 'delete-user-btn',
    templateUrl: './delete-user-btn.component.html',
    styleUrls: ['./delete-user-btn.component.css']
})
export class DeleteUserBtnComponent implements OnInit {

    constructor(private routerService: BackendRouterService, private router: Router) { }

  ngOnInit(): void {
  }

    deleteAcount(){
        Swal.fire({
            title: '&#191;Est&aacute;s seguro?',
            text: '&iquest;No podr&aacute;s recuperar tu cuenta!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'S&iacute;, eliminar.',
            cancelButtonText: 'No, cancelar.'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.deleteUserInfo();
                //try {
                //    await this.deleteUserInfo();

                //} catch (error) {
                //    Swal.fire({
                //        icon: 'error',
                //        title: 'Error al eliminar la cuenta',
                //        text: 'Intentelo de nuevo en unos minutos'
                //    });
                //}
            }
        })
    }

    async deleteUserInfo(): Promise<void> {
        let user: User = JSON.parse(sessionStorage.getItem("user")!).body;
        // Delete user account, events and games
        this.routerService.endpoints.user.deleteAccount(user.email).subscribe({
            next: (data: any) => {
                // Delete session and redirect to main page
                sessionStorage.removeItem("user");
                this.router.navigate(['/login']);
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
}
