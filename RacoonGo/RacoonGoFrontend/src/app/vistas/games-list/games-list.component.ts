import { Component, OnInit } from '@angular/core';
import {BackEndResponse, Game, User} from "../../models/app.model";
import {ActivatedRoute} from "@angular/router";
import {BackendRouterService} from "../../services/backend-router.service";
import {HelperService} from "../../services/helper.service";
import {HttpResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import { Router } from "@angular/router";


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  gamesList: Game[] = [];
  user: User |undefined = undefined;
    constructor(private route: ActivatedRoute, private backEndResponse: BackendRouterService, private helperService: HelperService, private router: Router) {
    if (JSON.parse(sessionStorage.getItem("user")!) != undefined) {
      this.user = JSON.parse(sessionStorage.getItem("user")!);
    }
  }

  ngOnInit(): void {
    this.getGames();
  }

  private getGames() {
    this.backEndResponse.endpoints.game.getGames().subscribe({
      next: (data: HttpResponse<BackEndResponse<any>>) => {
        if (data.body) {
          this.gamesList = data.body as unknown as Game[];
        }
      },
      error: () => {
        Swal.fire('Error', 'Se ha producido un error al buscar juegos. Inténtelo de nuevo en unos minutos.', 'error')
      }
    });
  }
  
  getDifficultyName(index: number): string {
    return this.helperService.getDifficultyInfo(index);
    }

    goToGame(g: Game) {
        this.helperService.playMatch(g);
    }
}
