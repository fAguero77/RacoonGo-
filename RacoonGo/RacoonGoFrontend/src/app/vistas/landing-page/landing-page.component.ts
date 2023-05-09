import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }
    monicaReversed: boolean = false
    davidReversed: boolean = false
    feliReversed: boolean = false
    feliuReversed: boolean = false

  ngOnInit(): void {
  }

    reverse(index: number) {
        switch (index) {
            case 0: {
                this.monicaReversed = !this.monicaReversed
                break;
            }
            case 1: {
                this.davidReversed = !this.davidReversed
                break;
            }
            case 2: {
                this.feliReversed = !this.feliReversed
                break;
            }
            case 3: {
                this.feliuReversed = !this.feliuReversed
                break;
            }
        }
    }
}
