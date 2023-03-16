import { Component, OnInit } from '@angular/core';
import { Location } from './location';

export class Event {

    public title!: string;
    public description!: string;
    public recommendedAge!: number;
    public startDate!: Date;
    public endDate!: Date;
    public themes!: number[];
    public location!: Location;

    constructor(title: string, description: string, recommendedAge: number, startDate: Date, endDate: Date, location: Location, themes: Theme[] = []) {
        this.title = title;
        this.description = description;
        this.recommendedAge = recommendedAge;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.themes = themes;
    }

}

export enum Theme {
    Arqueología = 0,
    Biología,
    Astronomía,
    Física,
    Nutrición,
    Psicología,
    Investigación,
    Arte,
    Historia,
    Otros
}
