import { Injectable } from '@angular/core';
import { Theme } from '../models/app.enum';
import { Event } from "../models/app.model";
@Injectable({
  providedIn: 'root'
})
export class HelperService {
    colorList =
    ['#81f774',
        '#86fcf1',
        '#e2eb7f',
        '#f7bb92',
        '#f59f9a',
        '#ec92f7',
        '#fc8dba',
        '#a692f0',
        '#ff6370',
        '#ab989a'
        ]

    ageText = [
        "Todos los públicos",
        "Niños (8-11 años)",
        "Jóvenes (12-14 años)",
        "Adolescentes (15-18 años)",
         "Adultos (+18 años)"
        ]
    event: Event | undefined;


    constructor() { }


    getThemeInfo(index: number): [string,string] {
        return [Theme[index], this.colorList[index]];
    }

    getAgeText(index: number): string {
        return this.ageText[index];
    }
    
}
