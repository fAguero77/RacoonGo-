import { Component, OnInit } from '@angular/core';

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
