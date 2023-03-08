import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
    private apiUrl = 'https://localhost:7109/api/Events';

  constructor(private http: HttpClient) { }

  addEvent(event: Event) {
    return this.http.post<Event>(this.apiUrl, event);
  }
}
