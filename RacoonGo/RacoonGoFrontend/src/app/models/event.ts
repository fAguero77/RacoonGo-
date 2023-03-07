import { Component, OnInit } from '@angular/core';
import { Location } from './location';
export class Event   {

    
    constructor(
        public title: string,
        public description: number,
        public recommendedAge: number,
        public startDate: Date,
        public endDate: Date,
        public location: string

    ) { }

 

}
