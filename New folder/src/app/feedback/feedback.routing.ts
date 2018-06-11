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
import { FeedbacklistComponent } from './feedbacklist/feedbacklist.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
   { path: 'feedback',
    component: FeedbacklistComponent, data: { title: 'Srisys - Pigeon - feedback' } },
   ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
