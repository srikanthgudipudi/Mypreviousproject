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
import { ShareModule } from '../common/share.module';

import { EnterprisesResourcesComponent } from './enterpriseresources/enterpriseresourceslist/enterpriseresources.component';
import { EnterpriseResourceComponent } from './enterpriseresources/enterpriseresourcepopup/enterpriseresource.component';

import { FleetsComponent } from './fleets/fleetslist/fleets.component';
import { FleetComponent } from './fleets/fleetpopup/fleet.component';
import { AttributesComponent } from './fleettypeattributes/attributeslist/attributes.component';
import { AttributeComponent } from './fleettypeattributes/attributepopup/attribute.component';
import { FunfactsComponent } from './funfacts/funfactslist/funfacts.component';
import { FunfactComponent } from './funfacts/funfactpopup/funfact.component';
import { StaticContentComponent } from './staticcontent/staticcontentlist/staticcontent.component';
import { SingleStaticContentComponent } from './staticcontent/staticcontentpopup/singlestaticcontent.component';
import { MapsettingsComponent } from './mapsettings/mapsettingslist/mapsettings.component';
import { ContractDetailsComponent } from './contractdetails/contractdetailslist/contractdetails.component';
import { ContractDetailComponent } from './contractdetails/contractdetailspopup/contractdetail.component';
import { FleetTypesComponent } from './fleettypes/fleettypeslist/fleettypes.component';
import { FleetTypeComponent } from './fleettypes/fleettypespopup/fleettype.component';
import { EnterprisesRoutingModule } from './enterprises-routing';
import { MultiStopLocatorComponent } from './pickticket/multistoplocatorpopup/multistoplocator.component';
import { MultiStopLocatorsComponent } from './pickticket/multistoplocatorlist/multistoplocators.component';
import { EnterpriseSettingComponent } from './enterprisesettings/enterprisesettingpopup/enterprisesetting.component';
import { EnterpriseSettingsComponent } from './enterprisesettings/enterprisesettingslist/enterprisesettings.component';

import { TranslateModule } from 'ng2-translate';
import { ToastModule } from 'ng2-toastr';
import { HttpModule } from '@angular/http';
import {
  TabViewModule, GrowlModule, CalendarModule,
  DataTableModule, OverlayPanelModule, ContextMenuModule, DialogModule,
  SplitButtonModule, AccordionModule, ConfirmDialogModule, FileUploadModule, LightboxModule, MultiSelectModule, PickListModule
} from '../../custommodules/primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MapSettingComponent } from './mapsettings/mapsettingpopup/mapsetting.component';
import { DateFormat } from './dateformat.pipe';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, OverlayPanelModule, MultiSelectModule, PickListModule, ContextMenuModule,
    EnterprisesRoutingModule, TranslateModule,
    CommonModule, TabViewModule, GrowlModule, DataTableModule, SplitButtonModule, AccordionModule, FileUploadModule, LightboxModule,
    HttpModule, CalendarModule,
    TabsModule.forRoot(), ModalModule.forRoot(), ToastModule.forRoot(), DialogModule, ConfirmDialogModule, ShareModule],
  declarations: [
    EnterprisesResourcesComponent, EnterpriseResourceComponent, FleetsComponent, FleetComponent, AttributeComponent, AttributesComponent,
    DateFormat, FunfactsComponent, FunfactComponent, StaticContentComponent, ContractDetailsComponent, ContractDetailComponent,
    SingleStaticContentComponent, MapsettingsComponent, MapSettingComponent,  FleetTypesComponent,
    MultiStopLocatorsComponent, MultiStopLocatorComponent, FleetTypeComponent, EnterpriseSettingsComponent, EnterpriseSettingComponent
  ]
})
export class EnterprisesModule { }
