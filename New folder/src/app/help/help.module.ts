/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { HelpRoutingModule } from './help-routing';
import { HelpComponent } from '../help/helplist/help.component';
import { HelpPopUpComponent } from '../help/helppopup/helppopup.component';
import { TranslateModule } from 'ng2-translate';
import { ToastModule } from 'ng2-toastr';
import { HttpModule } from '@angular/http';
import { ShareModule } from '../common/share.module';
import {
  TabViewModule, GrowlModule, CalendarModule,
  DataTableModule, OverlayPanelModule, ContextMenuModule, DialogModule,
  SplitButtonModule, AccordionModule, ConfirmDialogModule, FileUploadModule, LightboxModule, MultiSelectModule
} from '../../custommodules/primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DateFormat } from './dateformat.pipe';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, OverlayPanelModule, MultiSelectModule, ContextMenuModule,
  TranslateModule, HelpRoutingModule, ShareModule, CommonModule, TabViewModule, GrowlModule,
  DataTableModule, SplitButtonModule, AccordionModule, FileUploadModule, LightboxModule,
  HttpModule, CalendarModule, TabsModule.forRoot(), ModalModule.forRoot(), ToastModule.forRoot(), DialogModule, ConfirmDialogModule],
  declarations: [
   HelpComponent, HelpPopUpComponent,
    DateFormat
  ]
})
export class HelpModule { }
