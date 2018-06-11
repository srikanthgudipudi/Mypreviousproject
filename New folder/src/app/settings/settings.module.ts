import { NgModule } from '@angular/core';
// Modal Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { GeneralComponent } from './general.component';
import { SocialComponent } from './social.component';
import { LanguageComponent } from './language.component';
import { SettingsRoutingModule } from './settings-routing.module';
import {CommonModule} from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from '../../custommodules/primeng/primeng';
@NgModule({
  imports: [ SettingsRoutingModule, TabViewModule, FormsModule, ModalModule.forRoot(), CommonModule,
             BsDropdownModule.forRoot()],
  declarations: [
    GeneralComponent,
    SocialComponent,
    LanguageComponent,
    RegisterComponent
  ]
})
export class SettingsModule { }
