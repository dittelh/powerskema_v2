import { Component, OnInit } from '@angular/core';
import { Event, EventsMySQLService } from '../services/eventsMySQL.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  events: Event[] | any;
  alertButtons = [
    {
      text: 'Nej',
      handler: () => {
        console.log('nej');
      },
    },
    {
      text: 'Ja',
      handler: (id) => {
        this.deleteEvent(id);
      },
    },
  ];

  constructor(
    private eventsService: EventsMySQLService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.retrieveEvents();
  }

  retrieveEvents(): void {
    this.eventsService.getAll().subscribe(
      (data) => {
        this.events = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async deleteAlert(event: any) {
    const alert = await this.alertController.create({
      header: 'Vil du slette "' + event.title + '"?',
      buttons: [
        {
          text: 'Nej',
          handler: () => {
            console.log('nej');
          },
        },
        {
          text: 'Ja',
          cssClass: 'alert-button-cancel',
          handler: () => {
            this.deleteEvent(event);
          },
        },
      ],
    });
    await alert.present();
  }

  deleteEvent(event: any): void {
    this.eventsService.delete(event.id).subscribe(
      (data) => {
        this.retrieveEvents();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addItem(newEvent: string) {
    this.events.push(newEvent);
  }

  editEvent(event: any): void {

  }
}
