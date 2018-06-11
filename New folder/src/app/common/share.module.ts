import { NgModule } from '@angular/core';
import { PoweredByComponent } from '../poweredfooter/pop-footerlayout.component';
import { LogoheaderComponent } from '../logoheader/pop-headerlayout.component';

import { TranslateModule } from 'ng2-translate';
import { DateFormat } from '../common/dateformat.pipe';
@NgModule({
  imports: [
    TranslateModule,
  ],
  declarations: [
      DateFormat,
      PoweredByComponent,
      LogoheaderComponent,
  ],
  exports: [DateFormat,  PoweredByComponent, LogoheaderComponent
 ]

})
export class ShareModule { }
