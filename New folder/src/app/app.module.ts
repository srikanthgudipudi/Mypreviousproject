/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { CalendarComponent } from './calendar/calendar.component';
// prime ng module
import * as jQuery from 'jquery';
(window as any).jQuery = (window as any).$ = jQuery;
import { AccordionModule, ScheduleModule, CalendarModule, } from '../custommodules/primeng/primeng';
// Routing Module
import { AppRoutingModule } from './app.routing';

// ck editor
// Layouts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

// Modal Component
import { ToastModule } from 'ng2-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import * as config from './app.config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../app/common/share.module';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}


@NgModule({
  imports: [FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    CalendarModule,
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CalendarModule,
    AccordionModule,
    ScheduleModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }), ShareModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    CalendarComponent,
    NAV_DROPDOWN_DIRECTIVES,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [
    Title,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: 'apiEndPoint',
      useValue: config.API_END_POINT
    },
    {
      provide: 'staticJsonFilesEndPoint',
      useValue: config.STATIC_JSONFILES_END_POINT
    },
    {
      provide: 'geoEndPoint',
      useValue: config.GEO_END_POINT
    },
    {
      provide: 'footerPoweredByName',
      useValue: config.FOOTER_POWERED_BY_NAME
    },
    {
      provide: 'defaultCountry',
      useValue: config.DEFAULT_COUNTRY
    },
    {
      provide: 'defaultState',
      useValue: config.DEFAULT_STATE
    },
    {
      provide: 'defaultLanguage',
      useValue: config.DEFAULT_LANGUAGE
    },
    {
      provide: 'defaultTimezone',
      useValue: config.DEFAULT_TIMEZONE
    },
    {
      provide: 'defaultCurrency',
      useValue: config.DEFAULT_CURRENCY
    },
    {
      provide: 'defaultTheme',
      useValue: config.DEFAULT_THEME
    },
    {
      provide: 'dateFormat',
      useValue: config.DEFAULT_DATEFORMAT
    },
    {
      provide: 'rowperpage',
      useValue: config.ROW_PER_PAGE
    },
    {
      provide: 'currencyFormat',
      useValue: config.DEFAULT_CURRENCY_FORMAT
    },
    {
      provide: 'defaultDuration',
      useValue: config.DEFAULT_DURATION
    }, {
      provide: 'defaultDurationRange',
      useValue: config.DEFAULT_DURATION_RANGE
    },
    {
      provide: 'defaultDays',
      useValue: config.DEFAULT_DAYS
    },
    {
      provide: 'enterpriseEndUser',
      useValue: config.ENTERPRISE_END_USER
    },
    {
      provide: 'defaultDisplaySequence',
      useValue: config.DEFAULT_DISPLAY_SEQUENCE
    },
    {
      provide: 'defaultSeatLimit',
      useValue: config.DEFAULT_SEAT_LIMIT
    },
    {
      provide: 'deflanguagecode',
      useValue: config.DEFAULT_LANGUAGE_CODE
    },
    {
      provide: 'defcountrycode',
      useValue: config.DEFAULT_COUNTRY_CODE
    },
    {
      provide: 'imageMinSize',
      useValue: config.IMAGE_MIN_SIZE
    },
    {
      provide: 'imageMaxSize',
      useValue: config.IMAGE_MAX_SIZE
    },
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule]
})
export class AppModule { }
