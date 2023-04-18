import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {BackEndResponse, Event, User} from "../../models/app.model";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendRouterService} from "../../services/backend-router.service";
import {HelperService} from "../../services/helper.service";
import {InfoService} from "./info.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-event-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  user: User |undefined = undefined;
  event!: Event;
  data$!: Observable<Event | undefined>;

  show: boolean = false;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private backEndResponse: BackendRouterService, 
              private helperService: HelperService,
              private infoService: InfoService,
              private changeDetector: ChangeDetectorRef) {
    if (JSON.parse(sessionStorage.getItem("user")!) != undefined) {
      this.user = JSON.parse(sessionStorage.getItem("user")!);

    }
  }

  ngOnInit(): void {
    this.data$ = this.infoService.dataChanged;
    this.data$.subscribe(data => {
      if (data) {
        console.log("data: ", data);
        this.event = data;
        console.log("this.event: ", this.event, this.event != undefined);
        this.changeDetector.detectChanges(); // call detectChanges()
      }
    });
  }

  deleteEvent(e: Event) {
    this.helperService.deleteEvent(e);

  }

  updateEvent(e: Event) {
    this.helperService.updateEvent(e);
  }

  getThemeName(index: number): [string, string] {
    return this.helperService.getThemeInfo(index);
  }

}
