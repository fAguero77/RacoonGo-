import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event, Theme } from '../models/event';

@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private apiUrl = 'https://localhost:7109/api/Events';

    constructor(private http: HttpClient) { }

    addEvent(event: Event) {
        return this.http.post<Event>(this.apiUrl, event);
    }

    getEvents() {
        return this.http.get<Event[]>(this.apiUrl);
    }


    // #region Themes

    getThemeInfo(index: number): [string, string] {
        return [Theme[index], '#81f774'];
    }


    // #endregion
}

