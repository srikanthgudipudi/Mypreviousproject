import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CalendarModule } from '../../custommodules/primeng/primeng';
import { AccordionModule, ChartModule, DialogModule } from '../../custommodules/primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';
import { ShareModule } from '../common/share.module';
@NgModule({
  imports: [
    ChartModule,
    AccordionModule,
    DashboardRoutingModule,
    TranslateModule,
    BsDropdownModule,
    ModalModule,
    CalendarModule,
    FormsModule, ReactiveFormsModule,
    CommonModule, DialogModule, ShareModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
