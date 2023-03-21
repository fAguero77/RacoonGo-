import { Injectable } from '@angular/core';
import { Theme } from '../models/app.enum';

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
    constructor() { }


    getThemeInfo(index: number): [string,string] {
        return [Theme[index], this.colorList[index]];
    }
}
