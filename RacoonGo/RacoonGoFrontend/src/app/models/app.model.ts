import { Theme } from "./app.enum";

export class BackEndResponse<T> {
    success!: boolean;
    data?: T;
    message?: any;
    meta?: any;
}

export class Location {
    public name!: string;
    public lat!: number;
    public lon!: number;

    constructor(name: string, lat: number = 0, lon: number = 0) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
    }

}

export class Event {

    public title!: string;
    public description!: string;
    public recommendedAge!: number;
    public startDate!: Date;
    public endDate!: Date;
    public themes!: number[];
    public location!: Location;
    public photoUrl !: string;

    constructor(title: string, description: string, recommendedAge: number, startDate: Date, endDate: Date, location: Location, themes: Theme[] = [], photoUrl: string) {
        this.title = title;
        this.description = description;
        this.recommendedAge = recommendedAge;
        this.startDate = startDate;
        this.endDate = endDate;
        this.location = location;
        this.themes = themes;
        this.photoUrl = photoUrl;
    }
}

export class User {
    public email: string;
    public username: string;
    public score: number;
    constructor(email: string, username: string, score: number) {
        this.email = email;
        this.username = username;
        this.score = score;
    }
}