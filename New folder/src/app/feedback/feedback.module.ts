import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataTableModule, AccordionModule } from '../../custommodules/primeng/primeng';
import * as config from '../app.config';
import { TranslateModule } from 'ng2-translate';
import { FeedbacklistComponent } from './feedbacklist/feedbacklist.component';
import { FeedbackpopupComponent } from './feedbackpopup/feedbackpopup.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CalendarModule } from '../../custommodules/primeng/primeng';
import { FeedbackRoutingModule } from './feedback.routing';
import { ShareModule } from '../common/share.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    ModalModule,
    DataTableModule,
    AccordionModule,
    CalendarModule,
    ShareModule,
    FeedbackRoutingModule,
  ],
  declarations: [FeedbacklistComponent,
    FeedbackpopupComponent
  ],
  providers: [{
    provide: 'staticJsonFilesEndPoint',
    useValue: config.STATIC_JSONFILES_END_POINT
  }]
})
export class FeedbackModule { }
