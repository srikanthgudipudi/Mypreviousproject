/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterprisesResourcesComponent } from './enterpriseresources/enterpriseresourceslist/enterpriseresources.component';
import { FleetsComponent } from './fleets/fleetslist/fleets.component';
import { AttributesComponent } from './fleettypeattributes/attributeslist/attributes.component';
import { FunfactsComponent } from './funfacts/funfactslist/funfacts.component';
import { StaticContentComponent } from './staticcontent/staticcontentlist/staticcontent.component';
import { MapsettingsComponent } from './mapsettings/mapsettingslist/mapsettings.component';
import { ContractDetailsComponent } from './contractdetails/contractdetailslist/contractdetails.component';
import { FleetTypesComponent } from './fleettypes/fleettypeslist/fleettypes.component';
import { MultiStopLocatorsComponent } from './pickticket/multistoplocatorlist/multistoplocators.component';
import { EnterpriseSettingsComponent } from './enterprisesettings/enterprisesettingslist/enterprisesettings.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Enterprises'
    },
    children: [
      {
        path: 'enterprisesresourses',
        component: EnterprisesResourcesComponent, data: { title: 'Srisys - Pigeon - Enterprise Resourses' }
      },
      { path: 'mapsettings', component: MapsettingsComponent, data: { title: 'Srisys - Pigeon - MapSettings' } },
      { path: 'fleets', component: FleetsComponent, data: { title: 'Srisys - Pigeon - Fleets' } },
      { path: 'fleetattributes', component: AttributesComponent, data: { title: 'Srisys - Pigeon - Fleet Type Attributes' } },
      { path: 'funfacts', component: FunfactsComponent, data: { title: 'Srisys - Pigeon - Fun Facts' } },
      { path: 'staticcontent', component: StaticContentComponent, data: { title: 'Srisys - Pigeon - Static Content' } },
      { path: 'contractdetails', component: ContractDetailsComponent, data: { title: 'Srisys - Pigeon - Contract Details' } },
      {
        path: 'pickticket',
        component: MultiStopLocatorsComponent, data: { title: 'Srisys - Pigeon - Multi Stop Locator' }
      }, {
        path: 'enterprisesettings',
        component: EnterpriseSettingsComponent, data: { title: 'Srisys - Pigeon - Enterprise Settings' }
      },
      {
        path: 'fleettypes',
        component: FleetTypesComponent, data: { title: 'Srisys - Pigeon - Fleet Types' }
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterprisesRoutingModule { }
