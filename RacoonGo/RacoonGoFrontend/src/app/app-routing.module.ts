import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventFormComponent } from "./event-form/event-form.component";
import { EventsListComponent } from "./events-list/events-list.component";


const routes: Routes = [
    {path: 'addEvent', component: EventFormComponent},
    {path: 'events', component: EventsListComponent}
    
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
