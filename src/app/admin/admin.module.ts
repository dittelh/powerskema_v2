import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { EditEventComponent } from '../components/edit-event/edit-event.component';
import { SharedModule } from '../components/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    SharedModule
  ],
  declarations: [AdminPage, EditEventComponent]
})
export class AdminPageModule {}
