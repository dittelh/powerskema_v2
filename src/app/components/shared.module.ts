import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomeWorkPage } from '../overview/home-work/home-work.page';
import { EventsPage } from '../overview/events/events.page';
import { AssignmentPage } from '../overview/assignment/assignment.page';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';
  
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    HomeWorkPage,
    EventsPage,
    AssignmentPage,
    AddEventComponent
  ],
  exports: [HomeWorkPage, EventsPage, AssignmentPage, AddEventComponent]
})
export class SharedModule { }