import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTableModule, AccordionModule } from '../../custommodules/primeng/primeng';
import * as config from '../app.config';
import { TranslateModule } from 'ng2-translate';
import { NotificationRoutingModule } from './notifications.rounting';
import { NotificationsComponent } from './notifications.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {ShareModule} from '../common/share.module';
import { CalendarModule } from '../../custommodules/primeng/primeng';

@NgModule({
  imports: [
    NotificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ModalModule,
    DataTableModule,
    AccordionModule,
    CalendarModule,
    ShareModule
  ],
  declarations: [
    NotificationsComponent
  ],
  providers: [{
    provide: 'staticJsonFilesEndPoint',
    useValue: config.STATIC_JSONFILES_END_POINT
  }]
})
export class NotificationsModule { }
