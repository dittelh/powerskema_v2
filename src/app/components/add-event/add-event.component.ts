import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

import { IonModal } from '@ionic/angular/common';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEventComponent implements OnInit {
  newEvent: any;
  @ViewChild('modal') modal!: IonModal;
  constructor() {}

  ngOnInit() {}
}
