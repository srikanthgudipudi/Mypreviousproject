/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserrolesComponent } from './roles/userroles.component';
import { Advertisements } from './advertisements/advertisementslist/advertisements.component';
import { EnterprisesComponent } from './enterprises/enterpriseslist/enterprises.component';
import { LookupsComponent } from './lookups/lookupslist/lookups.component';
import { UniversalImages } from './universalimages/universalimages.component';
import { UsersComponent } from './users/userslist/userslist.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Pages'
    },
    children: [
      { path: 'userroles', component: UserrolesComponent , data: { title: 'Srisys - Pigeon - User Roles' }},
      { path: 'advertisements', component: Advertisements, data: { title: 'Srisys - Pigeon - Advertisements' }},
      { path: 'enterprises', component: EnterprisesComponent, data: { title: 'Srisys - Pigeon - Enterprises' } },
      { path: 'lookups', component: LookupsComponent, data: { title: 'Srisys - Pigeon - Lookups' } },
      { path: 'universalimages', component: UniversalImages, data: { title: 'Srisys - Pigeon - Universal Images' }},
      { path: 'users', component: UsersComponent, data: { title: 'Srisys - Pigeon - Users' } },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
