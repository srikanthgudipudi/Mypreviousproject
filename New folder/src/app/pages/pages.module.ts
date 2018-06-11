/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { ForgotpwdComponent } from './forgotpassword/forgotpwd.component';
import { SecurityQuestionsComponent } from './securityquestions/securityquestions.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { ChangePasswordComponent } from './changepassword/changepassword.component';
import { MobileOtpPopupComponent } from './mobileotp/mobileotppopup.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShareModule } from '../common/share.module';
import { TranslateModule } from 'ng2-translate';
@NgModule({
  imports: [PagesRoutingModule, CommonModule, FormsModule, ToastModule.forRoot(), ShareModule, TranslateModule, ModalModule],
  declarations: [
    LoginComponent,
    ForgotpwdComponent,
    SecurityQuestionsComponent,
    ChangePasswordComponent, MobileOtpPopupComponent
  ]
})
export class PagesModule { }
