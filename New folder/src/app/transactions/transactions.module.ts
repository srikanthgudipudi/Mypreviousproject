import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from '../../custommodules/primeng/primeng';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/eventslist/events.component';
import { EventRegistrationsComponent } from './eventregistrations/eventregistrationslist/eventregistrations.component';
import { EventRegistrationComponent } from './eventregistrations/eventregistrationpopup/eventregistration.component';
import { FleetReservationsComponent } from './fleetreservations/fleetreservationlist/fleetreservations.component';
import { FleetReservationComponent } from './fleetreservations/fleetreservationpopup/fleetreservation.component';
import { TransactionsRoutingModule } from './transactions.routing';
import { AccordionModule, DataTableModule, FileUploadModule, LightboxModule, ConfirmDialogModule
} from '../../custommodules/primeng/primeng';
import * as config from '../app.config';
import { TranslateModule } from 'ng2-translate';
import { EventComponent } from './events/eventpopup/event.component';
import { SplitButtonModule } from 'primeng/primeng';
import { ShareModule } from '../common/share.module';

@NgModule({
  imports: [
    TransactionsRoutingModule,
    ShareModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    ConfirmDialogModule,
    CommonModule,
    TranslateModule,
    AccordionModule,
    CalendarModule,
    SplitButtonModule,
    FileUploadModule,
    LightboxModule
  ],
  declarations: [
    EventsComponent,
    EventComponent,
    EventRegistrationsComponent,
    EventRegistrationComponent,
    FleetReservationsComponent,
    FleetReservationComponent
  ],
  providers: [{
    provide: 'staticJsonFilesEndPoint',
    useValue: config.STATIC_JSONFILES_END_POINT
  }]
})
export class TransactionsModule { }
