import { Component, OnInit } from '@angular/core';
import {BackEndResponse, Event, User} from "../../models/app.model";
import {HttpResponse} from "@angular/common/http";
import {BackendRouterService} from "../../services/backend-router.service";
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  password!: string;
  username: string = "";
  email: string = "";
  eventsList: Event[] = [];

  defaultImg: string = 'https://cdnph.upi.com/ph/st/th/5751650313577/2022/i/16503136903474/v1.2/Raccoon-bandit-evicted-from-trash-can-by-Michigan-police.jpg';

    constructor(private backEndResponse: BackendRouterService, private helperService: HelperService) {
        let user: User = JSON.parse(sessionStorage.getItem("user")!)
        console.log(user)
        this.username = user.username;
        this.email = user.email;
    }

  ngOnInit(): void {
    this.backEndResponse.endpoints.event.getMyEvents(this.email).subscribe({
      next: (data: HttpResponse<BackEndResponse<any>>) =>{
        this.eventsList = data.body as unknown as Event[];

      }
    })
  }

  getThemeName(index: number): [string, string] {
    return this.helperService.getThemeInfo(index);
    }

    getAgeRecommendation(age: number): string {
        return this.helperService.getAgeText(age);
    }


    deleteEvent(e: Event) {
        this.helperService.deleteEvent(e);

    }

    updateEvent(e: Event) {
        this.helperService.updateEvent(e);
    }

  

}
