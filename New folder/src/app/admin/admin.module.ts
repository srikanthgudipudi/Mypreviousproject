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
import { AdminRoutingModule } from './admin-routing';
import { UserrolesComponent } from './roles/userroles.component';
import { AccordionModule, DataTableModule, TabViewModule, ScheduleModule, DataGridModule
} from '../../custommodules/primeng/primeng';
import * as config from '../app.config';
import { LookupsComponent } from './lookups/lookupslist/lookups.component';
import { LookupComponent } from './lookups/lookuppopup/lookup.component';
import { AdvertisementComponent } from './advertisements/advertisementpopup/advertisement.component';
import { Advertisements } from './advertisements/advertisementslist/advertisements.component';
import { EnterpriseComponent } from './enterprises/enterprisepopup/enterprise.component';
import { EnterprisesComponent } from './enterprises/enterpriseslist/enterprises.component';
import { UniversalImages } from './universalimages/universalimages.component';
import { UniversalImageComponent } from './universalimages/universalimagepopup/universalimage.component';
import { UsersComponent } from './users/userslist/userslist.component';
import { UserComponent } from './users/userpopup/user.component';
import { TranslateModule } from 'ng2-translate';
// import { DateFormat } from '../common/dateformat.pipe';
import {ShareModule} from '../common/share.module';
@NgModule({
  imports: [
    AdminRoutingModule,
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
   // DateFormat,
    UserrolesComponent,
    Advertisements,
    AdvertisementComponent,
    EnterprisesComponent,
    EnterpriseComponent,
    LookupsComponent,
    LookupComponent,
    UniversalImages,
    UniversalImageComponent,
    UsersComponent,
    UserComponent,
  ],
  providers: [{
    provide: 'staticJsonFilesEndPoint',
    useValue: config.STATIC_JSONFILES_END_POINT
  }]
})
export class AdminModule { }
