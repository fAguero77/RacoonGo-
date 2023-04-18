import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {EventsListComponent} from "../events-list/events-list.component";
import {Event} from "../../models/app.model";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }
  data: Event | undefined;
  dataChanged = new Subject<Event | undefined>();

  setData(newData: Event | undefined) {
    console.log("newData: ", newData);
    this.data = newData;
    this.dataChanged.next(this.data);
  }
}
