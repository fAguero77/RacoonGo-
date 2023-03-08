import { Component, OnInit } from '@angular/core';
import { Location } from './location';

export class Event {

    public title!: string;
    public description!: string;
    public recommendedAge!: number;
    public startDate!: Date;
    public endDate!: Date;
    public themes!: Theme[];
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

enum Theme {
    Archeology,
    Biology,
    Astronomy,
    Physics,
    Nutrition,
    Psicology,
    Investigation,
    Art,
    History,
    Others
}
