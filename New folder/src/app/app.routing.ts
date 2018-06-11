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
// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pages/login', pathMatch: 'full', },
  {
    path: '', component: FullLayoutComponent, data: { title: 'Home' },
    children: [
      { path: 'transactions', loadChildren: './transactions/transactions.module#TransactionsModule' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
      { path: 'history', loadChildren: './history/history.module#HistoryModule' },
      { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path: 'enterprises', loadChildren: './enterprises/enterprises.module#EnterprisesModule' },
      { path: 'admin', loadChildren: './notifications/notifications.module#NotificationsModule' },
      { path: '', loadChildren: './feedback/feedback.module#FeedbackModule' },
      { path: '', loadChildren: './help/help.module#HelpModule' },
      { path: '', loadChildren: './help/help.module#HelpModule' },
       { path: '', loadChildren: './map/map.module#MapModule' },
      { path: 'calendar', component: CalendarComponent, data: { title: 'Srisys - Pigeon - Calendar' } },
    ]
  },
  {
    path: 'pages', component: SimpleLayoutComponent, data: { title: 'Pages' },
    children: [
      { path: '', loadChildren: './pages/pages.module#PagesModule', }
    ]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
