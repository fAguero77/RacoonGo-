import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    password!: string;
  username: string = "RacoonGo";
  email: string = " paco@prueba.org";

  constructor() { }

  ngOnInit(): void {
  }

}
