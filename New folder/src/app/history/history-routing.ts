import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginsComponent } from './logins/loginslist/logins.component';

import { CallsComponent } from './calls/callslist/calls.component';
import { MessagesComponent } from './messages/messageslist/messages.component';
import { MessagesGroupComponent } from './messages/messagegroupslist/messagesgroup.component';
import { ImportsComponent } from './importhistory/importslist/imports.component';
import { BillpaymentsComponent } from './bill-payment/bill-paymentlist/billpayments.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users'
    },
    children: [
      { path: 'billpayment', component: BillpaymentsComponent, data: { title: 'Srisys - Pigeon - Bill Payment History' } },
      { path: 'logins', component: LoginsComponent, data: { title: 'Srisys - Pigeon - Login History' } },
      { path: 'calls', component: CallsComponent, data: { title: 'Srisys - Pigeon - Call History' } },
      { path: 'messages', component: MessagesComponent, data: { title: 'Srisys - Pigeon - Message History' } },
      { path: 'messagesgroup', component: MessagesGroupComponent, data: { title: 'Srisys - Pigeon - Message Group History' } },
      { path: 'imports', component: ImportsComponent, data: { title: 'Srisys - Pigeon - Import History' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
