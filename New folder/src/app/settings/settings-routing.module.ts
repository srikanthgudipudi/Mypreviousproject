import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general.component';
import { SocialComponent } from './social.component';
import { RegisterComponent } from './register.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Setting Pages'
    },
    children: [
      {
        path: 'general',
        component: GeneralComponent,
        data: {
          title: 'General Settings'
        }
      },
      {
        path: 'social',
        component: SocialComponent,
        data: {
          title: 'Social Settings'
        }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'email templates'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
