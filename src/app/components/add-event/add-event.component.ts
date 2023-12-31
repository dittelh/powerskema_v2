import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarMode } from 'ionic7-calendar/calendar.interface';
import { CalendarComponent } from 'ionic7-calendar';
import {
  EventsMySQLService,
} from 'src/app/services/eventsMySQL.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {

  eventid?: string;
  title: string;
  allDay?: boolean;
  startTime: any;
  endTime: any;
  category?: string;
  subject?: string;
  description?: string;

  @Output() newItemEvent = new EventEmitter<string>();
  @Input() modalId: any;

  addNewItem(value: any) {
    this.newItemEvent.emit(value);
  }

  constructor(private eventsMySQLService: EventsMySQLService) {}

  ngOnInit() {}

  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(CalendarComponent) myCalendar!: CalendarComponent;

  name: string;
  showStart = false;
  showEnd = false;
  formattedStart: string;
  formattedEnd: string;

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    formatHourColumn: 'H:mm',
    formatWeekTitle: `MMM 'uge' w`,
  };

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  save() {
    const event: any = {
      title: this.title,
      allday: this.allDay,
      startTime: this.startTime,
      endTime: this.endTime,
      category: this.category,
      subject: this.subject,
      description: this.description,
    };
    this.eventsMySQLService.create(event).subscribe(
      (data) => {
        console.log(data);
        this.addNewItem(data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.modal.dismiss(this.name, 'confirm');
  }

  startTimeChanged(value: any) {
    this.startTime = value;
    this.formattedStart = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    console.log(value);
  }

  endTimeChanged(value: any) {
    this.endTime = value;
    this.formattedEnd = format(parseISO(value), 'HH:mm, MMM d, yyyy');
  }

  onTimeSelected = (ev: { selectedTime: Date; events: any[] }) => {
    console.log(ev.selectedTime);
    this.formattedStart = format(ev.selectedTime, 'HH:mm, MMM d, yyyy');
    this.startTime = format(ev.selectedTime, "yyyy-MM-dd'T'HH:mm:ss");

    const later = ev.selectedTime.setHours(ev.selectedTime.getHours() + 1);
    this.formattedEnd = format(later, 'HH:mm MMM d, yyyy');
    this.endTime = format(later, "yyyy-MM-dd'T'HH:mm:ss");

    if (this.calendar.mode === 'day' || this.calendar.mode === 'week') {
      this.modal.present();
    }
  };
}
