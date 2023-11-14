import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event, EventsMySQLService } from 'src/app/services/eventsMySQL.service';

@Component({
  selector: 'app-alle',
  templateUrl: './alle.page.html',
  styleUrls: ['./alle.page.scss'],
})
export class AllePage implements OnInit {
  selectedButton: string = 'afleveringer';
  eventSubsription!: Subscription;
  eventList: any;
  events: Event[] | any;


  onButtonSelected(site: string) {
    this.selectedButton = site;
  }

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsMySQLService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedButton = params['selectedButton'];
    });
    this.retrieveEvents();
  }

  retrieveEvents(): void {
    this.eventsService.getAll().subscribe(
      (data) => {
        this.events = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
