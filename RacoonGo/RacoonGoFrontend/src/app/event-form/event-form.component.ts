import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

    addEventForm!: FormGroup;


    ngOnInit(): void {
        this.addEventForm = new FormGroup({
            title: new FormControl(''),
            description: new FormControl('')
        });
    }

    addEvent(): void {
        // Process checkout data here
        alert('Your order has been submitted ' + this.addEventForm.value.title + " \ " + this.addEventForm.value.description);
        http.po

    }

}
