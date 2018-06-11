/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from '../../custommodules/primeng/primeng';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map.routing';
import {
    AccordionModule, DataTableModule, TabViewModule, ScheduleModule, DataGridModule
} from '../../custommodules/primeng/primeng';
import * as config from '../app.config';
import { TranslateModule } from 'ng2-translate';
import { MapComponent } from './map.component';
// import { DateFormat } from '../common/dateformat.pipe';
import { ShareModule } from '../common/share.module';
@NgModule({
    imports: [
        MapRoutingModule,
        ShareModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        DataTableModule,
        CommonModule,
        TranslateModule,
        AccordionModule,
        CalendarModule,
        TabViewModule,
        ScheduleModule,
        DataGridModule
    ],
    declarations: [
        MapComponent
        // DateFormat,
        //    UserrolesComponent,
    ],
    providers: [{
        provide: 'staticJsonFilesEndPoint',
        useValue: config.STATIC_JSONFILES_END_POINT
    }]
})
export class MapModule { }
