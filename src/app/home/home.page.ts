import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { CalendarMode } from 'ionic7-calendar/calendar.interface';
import { CalendarComponent } from 'ionic7-calendar';

import { format } from 'date-fns';
import { IonModal } from '@ionic/angular/common';
import { Subscription } from 'rxjs';
import { Event, EventsMySQLService } from '../services/eventsMySQL.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    formatHourColumn: 'H:mm',
    formatWeekTitle: `MMM 'uge' w`,
  };
  options = {
    threshold: 50,
  };
  newEvent: any = {
    title: '',
    allDay: false,
    startTime: '',
    endTime: '',
    category: '',
    subject: '',
    description: '',
  };
  eventList: Event[] = [];
  events: Event[] | any;

  showStart = false;
  showEnd = false;
  formattedSart: string;
  formattedend: string;

  eventSource: any[] = [];
  eventSubsription!: Subscription;
  viewTitle: string = '';
  presentingElemement: any;
  isDayView: boolean = false;
  eventMode: string = 'create';

  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;
  @ViewChild('modal') modal!: IonModal;

  constructor(
    private eventsService: EventsMySQLService
  ) {
  }

  ngOnInit() {
    this.retrieveEvents();
  }

  previousMonth() {
    this.myCalendar.slidePrev();
  }

  nextMonth() {
    this.myCalendar.slideNext();
  }
  onViewTitleChange(title: string) {
    this.viewTitle = title;
    this.checkIsDayView();
  }

  onTimeSelected = (ev: { selectedTime: Date; events: any[] }) => {
    this.formattedSart = format(ev.selectedTime, 'HH:mm, MMM d, yyyy');
    this.newEvent.startTime = format(ev.selectedTime, "yyyy-MM-dd'T'HH:mm:ss");

    const later = ev.selectedTime.setHours(ev.selectedTime.getHours() + 1);
    this.formattedend = format(later, 'HH:mm MMM d, yyyy');
    this.newEvent.endTime = format(later, "yyyy-MM-dd'T'HH:mm:ss");

    if (this.calendar.mode === 'day' || this.calendar.mode === 'week') {
      this.modal.present();
    }
  };

  onEventSelected(event: any) {
    console.log('Event: selected:', event.subject);

    this.modal.present();
  }

  checkIsDayView() {
    this.isDayView = this.calendar.mode === 'day';
  }

  
  retrieveEvents(): void {
    this.eventsService.getAll().subscribe(
      (data) => {
        this.events = data;
        this.updateEvents();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItem(newEvent: string) {
    this.events.push(newEvent);
    this.updateEvents();
  }

  updateEvents() {
    for (let i = 0; i < this.events.length; i++) {
      const event = this.events[i];
      const startTime = new Date(event.startTime);
      const endTime = new Date(event.endTime);
      this.events[i].startTime = startTime;
      this.events[i].endTime = endTime;   
    }
            
    this.eventSource = this.events;
    this.myCalendar.loadEvents();
  }
}
