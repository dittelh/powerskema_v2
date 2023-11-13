import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { format, parseISO } from 'date-fns';
import { CalendarMode } from 'ionic7-calendar/calendar.interface';
import { CalendarComponent } from 'ionic7-calendar';
import { EventsMySQLService } from 'src/app/services/eventsMySQL.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit {
  @Input() event: any;

  constructor(private eventsMySQLService: EventsMySQLService) {
  }

  ngOnInit() {
    this.formattedStart = format(parseISO(this.event.startTime), 'HH:mm, MMM d, yyyy');
    this.formattedEnd = format(parseISO(this.event.endTime), 'HH:mm, MMM d, yyyy');

  }

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

  confirm() {
    console.log(this.event);
    this.eventsMySQLService
      .update(this.event.id, this.event)
      .subscribe((data) => {
        console.log(data);
      });
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

  startTimeChanged(value: any) {
    this.event.startTime = value;
    this.formattedStart = format(parseISO(value), 'HH:mm, MMM d, yyyy');
    console.log(value);
  }

  endTimeChanged(value: any) {
    this.event.endTime = value;
    this.formattedEnd = format(parseISO(value), 'HH:mm, MMM d, yyyy');
  }

  onTimeSelected = (ev: { selectedTime: Date; events: any[] }) => {
    console.log(ev.selectedTime)
    this.formattedStart = format(ev.selectedTime, 'HH:mm, MMM d, yyyy');
    this.event.startTime = format(ev.selectedTime, "yyyy-MM-dd'T'HH:mm:ss");

    const later = ev.selectedTime.setHours(ev.selectedTime.getHours() + 1);
    this.formattedEnd = format(later, 'HH:mm MMM d, yyyy');
    this.event.endTime = format(later, "yyyy-MM-dd'T'HH:mm:ss");

    if (this.calendar.mode === 'day' || this.calendar.mode === 'week') {
      this.modal.present();
    }
  };
}
