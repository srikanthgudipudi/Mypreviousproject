/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 *  FunfactModalComponent have below methods:
 * ngOnInit(): Method for Component Initalization.
 * showChildModal(updateaction, allfunfacts): Method to open Funfact Create, Edit, View and Delete popups.
 * getEnterpriselist(): Method to get Enterprises list from Enterprise table.
 * gettimeZones(): Method to get Time Zones from Lookup codes.
 * getservercurrentutctime(): Method to get current utc time.
 * getEnterpriseResources(type): Method to get the enterpriseresources info bases on the changed value.
 * funfactInfo(value): Method to get the funfacts info.
 * Boolean(value): Method to get the boolean value.
 * funfactAsset(value): Method to get the fun facts asset value.
 * Booleanenabled(value): Method to get the enabled boolean value.
 * changeTimezones(timezone): Method to change the getTimezonesstartdate list.
 * daysChanged(days): Method to change the daysChanged list.
 * hoursChanged(days): Method to change the hoursChanged list.
 * durationChanged(days): Method to change the durationChanged list.
 * startDateChange(value): Method to change start date value.
 * endDateChange(endvalue): Method to change end date value.
 * formatDate(date): Method for DOB Formating function into "yyyy-mm-dd".
 * createFunfactsList(funfact): Method to create the fun facts list.
 * updateFunfacts(funfactupdate): Method to update the fun facts list.
 * deleteFunFact(): Method to delete the fun facts list.
 * clearmessage(): Method to clear the messages.
 * hideChildModal(): Method to hide the popup modal.
 * autocase(text): Method for Auto capitalization for each word.
*/

import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';
import { FunfactsDetails } from '../funfactslist/funfacts.component';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
import { FunfactService } from './funfact.service';
import { FunfactsService } from '../funfactslist/funfacts.service';

@Component({
  selector: 'app-funfact-popup',
  templateUrl: 'funfact.html',
  providers: [FunfactService, DatePipe, AdvertisementsService]
})

export class FunfactComponent implements OnInit {
  updateaction: any;
  updatefunfactobject: any;
  reason: any;
  comment: any;
  error: any;
  checkbox: any;
  pagename: string;
  value: any[];
  enterpriseId: any;
  enterprisesName: any;
  enterprisesSize: any;
  enterprisesNames: any;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  funfactData: FunfactsDetails;
  funfact: FunfactDetails = new FunfactDetails();
  funfactupdate: FunfactUpdateDetails = new FunfactUpdateDetails();
  startdate: any;
  enddate: any;
  error1: string;
  error2: string;
  error3: string;
  daysList: any = [];
  hoursList: any = [];
  selecteddays: any;
  selectedhours: any;
  enterpriseIconFilePath: any;
  updateAt: any;
  createAt: any;
  timezoneCode: any;
  minDate: Date;
  isEnabled = true;
  public funfactObj: any;
  duration: number;
  durationList: any = [];
  selectedduration: any;
  utctimezone: any;
  utctimezonestring: any;
  timezoneCodes: any;
  timeZones: any[];
  enterpriseIcon: any;
  loginUserDateFormat: any;
  currentutc: any;
  errorstartdate: any;
  errorenddate: any;
  startdate1: any;
  enddate1: any;
  funfactname: any;
  notes: any;
  date: Date;

  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();

  /*---- Constructor for Funfact Component ----*/
  constructor(private singlefunfactservice: FunfactService,
    private funfactsService: FunfactsService,
    public toastr: ToastsManager,
    private datePipe: DatePipe,
    public advertisementsService: AdvertisementsService,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('defaultDurationRange') public defaultDurationRange: number,
    @Inject('defaultDuration') public defaultDuration: number,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultDays') public defaultDays: number,
    @Inject('footerPoweredByName') public footerPoweredByName: string) { }

  /*---- Component Initalization ---- */
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.getEnterpriselist();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    }
    const num = 0;
    let i: number;
    for (i = num; i <= 11; i++) {
      if (i === 0) {
        this.durationList.push('00');
      } else if (i === 1) {
        this.durationList.push('0' + i * this.defaultDuration);
      } else {
        this.durationList.push(i * this.defaultDuration);
      }
    }
    this.selectedduration = this.defaultDuration;
    this.duration = this.defaultDuration;
    for (let j = 0; j <= this.defaultDays; j++) {
      this.daysList.push(j);
    }
    for (let k = 0; k <= 23; k++) {
      if (k < 10) {
        this.hoursList.push('0' + k);
      } else {
        this.hoursList.push(k);
      }
    }
  }

  /* ----- To open Funfact Create, Edit, View and Delete popups -----*/
  public showChildModal(updateaction, allfunfacts): void {
    this.funfactObj = allfunfacts;
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';
    if (updateaction === 'VIEW') {
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.funfactObj.displayStartDateTime)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.funfactObj.displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.funfactObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.funfactObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.updateAt = moment(this.funfactObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.funfactObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_FUNFACT';
      this.actionType = 'View';

    } else if (updateaction === 'EDIT') {
      this.getEnterpriselist();
      this.funfactupdate = allfunfacts;
      this.isEnabled = this.funfactObj.isEnabled;
      this.funfactname = this.funfactupdate.funfact;
      this.notes = this.funfactupdate.notes;
      this.minDate = new Date();
      this.enterpriseIcon = this.funfactObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.funfactObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.startdate = new Date(this.funfactObj.displayStartDateTime);
      this.enddate = new Date(this.funfactObj.displayEndDateTime);

      /**----- Convet User prefered time zone ----*/
      this.gettimeZones();
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();

      /**--- Convet User prefered time zone ---- */
      this.updateAt = moment(this.funfactObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.funfactObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_FUNFACT';
      this.actionType = 'Edit';
      const duration = this.funfactObj.duration.split(' ');
      this.selecteddays = duration[0].split('D')[0];
      this.selectedhours = duration[1].split('H')[0];
      this.selectedduration = duration[2].split('M')[0];
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);

    } else if (updateaction === 'DELETE') {
      this.enterpriseIcon = this.funfactObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.funfactObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.updateAt = this.funfactObj.updatedAt;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.funfactObj.displayStartDateTime)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.funfactObj.displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.updateAt = moment(this.funfactObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.funfactObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_FUNFACT';
      this.actionType = 'Delete';

    } else if (updateaction === 'CREATE') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.getEnterpriselist();
      this.gettimeZones();

      /*-- Convet User prefered time zone--- */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();

      /*------ Convet User prefered time zone ---- */
      this.minDate = new Date();
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.selecteddays = '0';
      this.selectedhours = '00';
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      this.isEnabled = true;
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_FUNFACT';
      this.actionType = 'Create';
      this.duration = this.defaultDuration;

    }
    this.childModal.show();

  }

  /*----To get Enterprises list from Enterprise table----- */
  getEnterpriselist() {
    this.singlefunfactservice.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseId = data['result'][0]._id;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
            this.enterprisesName = data['result'][0].enterpriseName;
            this.enterprisesSize = true;
          } else {
            this.enterprisesNames = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }

  /*---- To get the enterpriseresources info bases on the changed value ------*/
  getEnterpriseResources(type) {
    this.value = type.split('$');
    this.enterpriseId = this.value[0];
    this.enterprisesName = this.value[1];
    this.enterpriseIcon = this.value[3];
    this.enterpriseIconFilePath = this.value[2] + '/' + this.enterpriseIcon;
    if (this.enterpriseId === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
  }

  /*--- To get Time Zones from Lookup codes --- */
  public gettimeZones() {
    this.singlefunfactservice.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.timeZones = data['result'];
        }
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('TOASTER.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To change the getTimezonesstartdate list----*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*----To get current utc time ----*/
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /*---- To get the funfacts info ------*/
  funfactInfo(value) {
    this.funfact.fleetAsset = value;
  }

  /*-- To get the boolean value -- */
  Boolean(value) {
    this.funfact.isEnabled = value;
  }

  /*-- To get the fun facts asset value --*/
  funfactAsset(value) {
    this.funfactupdate.fleetAsset = value;
  }

  /*-- To get the enabled boolean value --*/
  Booleanenabled(value) {
    this.funfactupdate.enabled = value;
  }

  /*---To change the daysChanged list --*/
  daysChanged(days) {
    const durationvalue = Math.floor(this.duration / (24 * 60));
    this.duration = this.duration - durationvalue * 24 * 60 + 24 * 60 * Number(days);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /*-- To change the hoursChanged list --*/
  hoursChanged(hours) {
    const durationvaluedays = Math.floor(this.duration / (24 * 60));
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = this.duration - (durationvaluehours - durationvaluedays * 24) * 60 + Number(hours) * 60;
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /*---- To change the durationChanged list ---*/
  durationChanged(duration) {
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = durationvaluehours * 60 + Number(duration);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /*-----To change the start date value ----*/
  startDateChange(value) {
    // this.startdate = value;
    const stdate = moment(value).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.startdate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.startdate1 = moment(this.startdate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.startdate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.startdate1 = moment(this.startdate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.startdate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
    }
  }

  /*---- To change the start date value ----*/
  endDateChange(endvalue) {
    this.enddate = endvalue;
    const stdate = moment(endvalue).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.enddate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.enddate1 = moment(this.enddate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.enddate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.enddate1 = moment(this.enddate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.enddate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') >= moment(this.enddate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      let hrs: any;
      let mins: any;
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      const duration = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm'))).format('m');
      if (Number(duration) < 10) {
        mins = '0' + Number(duration);
      } else {
        mins = Number(duration);
      }
      const durationhrs = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm'))).format('H');
      if (Number(durationhrs) < 10) {
        hrs = '0' + Number(durationhrs);
      } else {
        hrs = Number(durationhrs);
      }
      const durationdays = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm')));
      this.selectedhours = hrs;
      this.selecteddays = Math.floor(Number(durationdays) / (24 * 60 * 60 * 1000));
      this.selectedduration = mins;
      this.duration = Math.floor(Number(durationdays) / (60 * 1000));
    }
  }

  /*---- DOB Formating function into "yyyy-mm-dd" ----*/
  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1), day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
  }

  /*--- To create the fun facts list -- */
  createFunfactsList(funfact) {
    funfact.displayStartDateTime = this.startdate;
    funfact.displayEndDateTime = this.enddate;
    if (this.enterprisesName !== '' && this.enterprisesName !== undefined && this.enterprisesName !== null) {
      this.error = '';
      if (this.startdate !== '' && this.startdate !== undefined) {
        this.error = '';
        if (this.enddate !== '' && this.enddate !== undefined) {
          this.error = '';
          if (moment(this.startdate).format('YYYY-MM-DD HH:mm') < moment(this.enddate).format('YYYY-MM-DD HH:mm')) {
            this.error = '';
            if (funfact.funfact.trim().replace(/\s\s+/g, ' ') !== '' &&
              funfact.funfact.trim() !== undefined && funfact.funfact.trim() !== null) {
              this.error = '';
              if ((this.enterprisesName !== '' && this.enterprisesName !== undefined && this.enterprisesName !== null) ||
                (funfact.funfact.trim().replace(/\s\s+/g, ' ') !== '' &&
                  funfact.funfact.trim() !== undefined && funfact.funfact.trim() !== null)) {
                this.error = '';
                let hrs: any;
                let mins: any;
                const selecteddays = Math.floor(this.duration / (24 * 60));
                const selectedhours = Math.floor(this.duration / 60) - selecteddays * 24;
                const selectedduration = this.duration - Math.floor(this.duration / 60) * 60;
                if (Number(selectedhours) < 10) {
                  hrs = '0' + Number(selectedhours);
                } else {
                  hrs = Number(selectedhours);
                }
                if (Number(selectedduration) < 10) {
                  mins = '0' + Number(selectedduration);
                } else {
                  mins = Number(selectedduration);
                }
                const advDuration = selecteddays + 'D' + ' ' + hrs + 'H' + ' ' + mins + 'M';
                this.errorstartdate = funfact.displayStartDateTime;
                this.errorenddate = funfact.displayEndDateTime;
                /** ----- Convert prefered time zone to utc format start----- */
                if (this.utctimezonestring.charAt(0) === '-') {
                  const utctime = this.utctimezone.split('-');
                  const utctimesplit = utctime[1].split(':');
                  funfact.displayStartDateTime = moment(funfact.displayStartDateTime).add(utctimesplit[0], 'hours');
                  funfact.displayStartDateTime = moment(funfact.displayStartDateTime).add(utctimesplit[1], 'minutes');
                  funfact.displayEndDateTime = moment(funfact.displayEndDateTime).add(utctimesplit[0], 'hours');
                  funfact.displayEndDateTime = moment(funfact.displayEndDateTime).add(utctimesplit[1], 'minutes');
                } else {
                  const utctime = this.utctimezone.split('+');
                  const utctimesplit = utctime[1].split(':');
                  funfact.displayStartDateTime = moment(funfact.displayStartDateTime).subtract(utctimesplit[0], 'hours');
                  funfact.displayStartDateTime = moment(funfact.displayStartDateTime).subtract(utctimesplit[1], 'minutes');
                  funfact.displayEndDateTime = moment(funfact.displayEndDateTime).subtract(utctimesplit[0], 'hours');
                  funfact.displayEndDateTime = moment(funfact.displayEndDateTime).subtract(utctimesplit[1], 'minutes');
                }
                /** ----- Convert prefered time zone to utc format end----- */
                if (moment(funfact.displayStartDateTime).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().
                  format('YYYY-MM-DD HH:mm')) {
                  this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                  this.startdate = this.errorstartdate;
                  this.enddate = this.errorenddate;
                } else if (moment(funfact.displayEndDateTime).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().
                  format('YYYY-MM-DD HH:mm')) {
                  this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                  this.startdate = this.errorstartdate;
                  this.enddate = this.errorenddate;
                } else {
                  const enterprise = {
                    'displayStartDateTime': moment(funfact.displayStartDateTime).format('YYYY-MM-DD HH:mm'),
                    'displayEndDateTime': moment(funfact.displayEndDateTime).format('YYYY-MM-DD HH:mm'),
                    'enterprise': {
                      'enterpriseId': this.enterpriseId,
                      'enterpriseName': this.enterprisesName
                    },
                    'funfact': this.autocase(funfact.funfact.trim().replace(/\s\s+/g, ' ')),
                    'notes': this.autocase(funfact.notes.trim().replace(/\s\s+/g, ' ')),
                    'isEnabled': this.isEnabled,
                    'duration': advDuration,
                  };
                  this.singlefunfactservice.createFunfact(enterprise, this.userToken)
                    .subscribe(data => {
                      this.hideChildModal();
                      this.uploaded.emit('submit');
                      window.localStorage.setItem('funfactsstatus', 'Create');
                      this.clearmessage();
                      this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
                      this.toastr.success(this.toastermessage.value);
                    }, error => {
                      this.startdate = this.errorstartdate;
                      this.enddate = this.errorenddate;
                      const statuscode = JSON.parse(error['_body']).statusCode;
                      switch (JSON.parse(error['_body']).statusCode) {
                        case '2033':
                          this.error = 'COMMON_STATUS_CODES.' + statuscode;
                          break;
                        case '9961':
                          this.storage.removeItem('token');
                          this.router.navigate(['']);
                          break;
                      }
                    });
                }
              } else {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              }
            } else {
              this.error = 'FUNFACTS.VALID_NOBLANK_FUN_FACT';
            }
          } else {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
          }
        } else {
          this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
        }
      } else {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    }

  }

  /*--- To update the fun facts list ----*/
  updateFunfacts(funfactupdate) {
    if (this.funfactname.trim().replace(/\s\s+/g, ' ') !== '' &&
      this.funfactname.trim() !== undefined && this.funfactname.trim() !== null) {
      this.error = '';
      if ((this.funfactname.trim().replace(/\s\s+/g, ' ') !== '' && this.funfactname.trim() !== undefined &&
        this.funfactname.trim() !== null)) {
        this.error = '';
        let hrs: any;
        let mins: any;
        const selecteddays = Math.floor(this.duration / (24 * 60));
        const selectedhours = Math.floor(this.duration / 60) - selecteddays * 24;
        const selectedduration = this.duration - Math.floor(this.duration / 60) * 60;
        if (Number(selectedhours) < 10) {
          hrs = '0' + Number(selectedhours);
        } else {
          hrs = Number(selectedhours);
        }
        if (Number(selectedduration) < 10) {
          mins = '0' + Number(selectedduration);
        } else {
          mins = Number(selectedduration);
        }
        const advDuration = selecteddays + 'D' + ' ' + hrs + 'H' + ' ' + mins + 'M';
        this.errorstartdate = this.startdate;
        this.errorenddate = this.enddate;
        /** ----- Convert prefered time zone to utc format start----- */
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');
          this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');
          this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
        } /** ----- Convert prefered time zone to utc format end----- */
        if (this.funfactObj.startdatestatus === 'statdateactive') {
          if (moment(this.startdate).format('YYYY-MM-DD HH:mm') <
            moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
          ) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
          } else if (moment(this.enddate).format('YYYY-MM-DD HH:mm') <
            moment(this.startdate).format('YYYY-MM-DD HH:mm')
          ) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
          } else {
            // this.editadvertise(advDuration);
            this.editfunfacts(funfactupdate, advDuration);
          }
        } else {
          if (moment(this.errorenddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
          ) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
          } else {
            //   this.editadvertise(advDuration);
            this.editfunfacts(funfactupdate, advDuration);
          }
        }

      } else {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
      }
    } else {
      this.error = 'FUNFACTS.VALID_NOBLANK_FUN_FACT';
    }
  }
  editfunfacts(funfactupdate, advDuration) {
    this.updatefunfactobject = {
      'displayStartDateTime': moment(this.startdate).format('YYYY-MM-DD HH:mm'),
      'displayEndDateTime': moment(this.enddate).format('YYYY-MM-DD HH:mm'),
      'enterprise': {
        'enterpriseId': funfactupdate.enterprise.enterpriseId,
        'enterpriseName': funfactupdate.enterprise.enterpriseName
      },
      'funfact': this.autocase(this.funfactname.trim().replace(/\s\s+/g, ' ')),
      'notes': this.autocase(this.notes.trim().replace(/\s\s+/g, ' ')),
      'isEnabled': this.isEnabled,
      'duration': advDuration,
    };
    this.singlefunfactservice.updateFunfact(this.updatefunfactobject, this.funfactObj._id, this.userToken)
      .subscribe(data => {
        this.hideChildModal();
        if (window.localStorage.getItem('advancesearch') === 'advancesearch') {
          window.localStorage.setItem('funfactupdate', 'advanceupdate');
        } else {
          window.localStorage.setItem('searchupdate', 'searchupdate');
          this.uploaded.emit('submit');
        }
        window.localStorage.removeItem('advancesearch');
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
        this.toastr.success(this.toastermessage.value);
        this.clearmessage();
      }, error => {
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (JSON.parse(error['_body']).statusCode) {
          case '1501':
            this.hideChildModal();
            break;
          case '2033':
            this.error = 'COMMON_STATUS_CODES.' + statuscode;
            break;
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['']);
            break;
        }
      });
  }

  /*---- To delete the fun facts -------*/
  deleteFunFact() {
    this.singlefunfactservice.deletefunfact(this.userToken, this.funfactObj._id)
      .subscribe(
      videoDetails => {
        this.hideChildModal();
        if (window.localStorage.getItem('advancesearch') === 'advancesearch') {
          window.localStorage.setItem('funfactupdate', 'advanceupdate');
        } else {
          window.localStorage.setItem('searchupdate', 'searchupdate');
          this.uploaded.emit('submit');
        }
        window.localStorage.removeItem('advancesearch');
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statuscode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['']);
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            }
            break;
        }
      });
  }

  /*-- Autofocus for Cancel and Delete button ---*/
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'VIEW') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.updateaction === 'DELETE') {
      if (key === 13) {
        this.deleteFunFact();
      }
    }
  }

  /* --- Inint capitalization ---*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /*---- To clear the messages----*/
  public clearmessage() {
    this.error2 = '';
    this.error3 = '';
    this.error1 = '';
    this.error = '';
  }
  /*---- To hide the modal -----*/
  public hideChildModal(): void {
    this.enterpriseIconFilePath = '';
    this.selectedduration = this.defaultDuration;
    this.enterpriseId = '';
    this.enterprisesName = '';
    this.comment = '';
    this.checkbox = false;
    this.childModal.hide();
    this.clearmessage();
    this.funfact.funfact = '';
    this.funfact.notes = '';
    this.funfact.isEnabled = false;
  }
}

export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}

export class FunfactDetails {
  public enterpriseId: string;
  public enterpriseName: string;
  public startdate: any;
  public enddate: any;
  public fleetAsset: string;
  public funfact = '';
  public isEnabled: Boolean;
  public notes = '';
}

export class FunfactUpdateDetails {
  public enterpriseId: string;
  public fleetAsset: string;
  public startdate: any;
  public enddate: any;
  public funfact = '';
  public notes = '';
  public enabled: string;
}

