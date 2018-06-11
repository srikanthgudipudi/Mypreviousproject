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
import { LoginComponent } from './login/login.component';
import {ForgotpwdComponent} from './forgotpassword/forgotpwd.component';
import {SecurityQuestionsComponent} from './securityquestions/securityquestions.component';
import {ChangePasswordComponent} from './changepassword/changepassword.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Example Pages'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Srisys - Pigeon - Login'
        }
      },
      {
        path: 'forgotpwd',
        component: ForgotpwdComponent,
        data: {
          title: 'Srisys - Pigeon - Forgot Password'
        }
      },
      {
        path: 'securityq',
        component: SecurityQuestionsComponent,
        data: {
          title: 'Srisys - Pigeon - Security Questions'
        }
      },  {
        path: 'resetPassword',
        component: ChangePasswordComponent,
        data: {
          title: 'Srisys - Pigeon - Change Password'
        }
      },
      {
        path: 'resetPassword/:spToken',
        component: ChangePasswordComponent,
        data: {
          title: ''
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
