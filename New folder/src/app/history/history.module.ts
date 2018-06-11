import { NgModule } from '@angular/core';
// Modal Component
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HistoryRoutingModule } from './history-routing';
import { CalendarModule } from '../../custommodules/primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule, SplitButtonModule,
  ConfirmDialogModule, MultiSelectModule, AccordionModule, FileUploadModule, LightboxModule, PickListModule
} from '../../custommodules/primeng/primeng';
import { LoginsComponent } from './logins/loginslist/logins.component';
import { SingleLoginComponent } from './logins/loginpopup/singlelogin.component';
import { CallComponent } from './calls/callpopup/call.component';
import { CallsComponent } from './calls/callslist/calls.component';
import { MessagesComponent } from './messages/messageslist/messages.component';
import { MessageComponent } from './messages/messagepopup/message.component';
import { MessagesGroupComponent } from './messages/messagegroupslist/messagesgroup.component';
import { MessageGroupComponent } from './messages/messagegroupspopup/messagegroup.component';
import { ImportsComponent } from './importhistory/importslist/imports.component';
import { ImportComponent } from './importhistory/importpopup/import.component';
import { BillpaymentsComponent } from './bill-payment/bill-paymentlist/billpayments.component';
import { BillpaymentComponent } from './bill-payment/bill-paymentpopup/billpayment.component';
import { TranslateModule } from 'ng2-translate';
import {ShareModule} from '../common/share.module';
import { ToastModule } from 'ng2-toastr';
@NgModule({
  imports: [
    HistoryRoutingModule,
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    DataTableModule, CalendarModule, ConfirmDialogModule, FormsModule, ReactiveFormsModule, CommonModule, ConfirmDialogModule,
    TranslateModule, SplitButtonModule, MultiSelectModule, AccordionModule, FileUploadModule, LightboxModule, ShareModule, PickListModule
  ],
  declarations: [
    LoginsComponent,
    SingleLoginComponent,
    CallComponent,
    BillpaymentsComponent,
    BillpaymentComponent,
    CallsComponent,
    MessagesComponent,
    MessageComponent,
    MessagesGroupComponent,
    MessageGroupComponent,
    ImportComponent,
    ImportsComponent
  ]
})
export class HistoryModule { }
