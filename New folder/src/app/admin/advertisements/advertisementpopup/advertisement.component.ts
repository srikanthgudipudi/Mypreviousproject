/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * SingleAdvertisementComponent  has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * showChildModal(updateaction, imgObj): This method is used to select the child popup.
 * getservercurrentutctime(): To get Current UTC time from Server.
 * getEnterprisesList(): This method is used to get Enterpriselist.
 * getAdvertisementTypes(): This method is used to get advertisement types.
 * gettimeZones(): To get the timezones list from Lookup codes.
 * daysChanged(days) : To calculate End date when Days Changed in duration field.
 * hoursChanged(hours): To calculate End date when Hours Changed in duration field.
 * durationChanged(duration): To calculate End date when Minitues Changed in duration field.
 * startDateChange(value): To convert the start date with user prefered Time zone and Date formate.
 * endDateChange(endvalue): To convert the end date with user prefered Time zone and Date formate.
 * getEnterpriseName(value): Method for get the changed Enterprise Value.
 * getadversitetype(value): Method for get the changed Advertisement Type.
 * createAdvertisement(): To Created Advertisemnt record.
 * updateAdvertisement(): To Validate the edited Advertisement Record.
 * editadvertise(advDuration): To Update the edited Advertisemnt Record.
 * deleteAdvertisement(): To Delete the Advertisement Record.
 * imageUploaded(event): To upload the Advertisement image.
 * closePopupModal(): To Close the Advertisement Popup when click on Cancel button.
 * hideAdvertiseModal(): To close the Advertisement Create, Delete, Edit and View popups.
 * clearmessage(): To Clear the Validation Error.
 * autocase(text): Used for init caps.
 * exportlist(searchstring, userToken): This method is used to download the data
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 */
import {
  Component, OnInit, ViewChild, Inject, Output, EventEmitter, ElementRef, HostListener
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';
import { Advertisementservices } from './advertisement.service';
import { AdvertisementsService } from '../advertisementslist/advertisements.service';

@Component({
  selector: 'app-advertisement-popup',
  templateUrl: './advertisement.html',
  providers: [Advertisementservices, AdvertisementsService]
})

export class AdvertisementComponent implements OnInit {
  token: any = window.localStorage.getItem('token');
  storage: Storage = window.localStorage;
  toastermessage: any;
  enterprisesSize: any;
  enterprisesName: any;
  enterprisesNames: any = [];
  selectedObj: any;
  enterpriseid: any;
  enterprisename: any = '';
  pagename: any;
  actionName: any;
  startDatetime: any;
  endDatetime: any;
  durationList: any = [];
  selectedduration: any;
  enabled: any = true;
  comments: any = '';
  error: any;
  advimgname: any = '';
  imagename: any;
  resourceObj: any;
  advDuration: any;
  file: any;
  advName: any = '';
  advdesc: any = '';
  enterpriseIconFilePath: any;
  advsequenceorder: any = '';
  startdate: any;
  enddate: any;
  advertisetypes: any;
  selectedAdvType: any = '';
  daysList: any = [];
  hoursList: any = [];
  selecteddays: any;
  selectedhours: any;
  timeZones: any[];
  selectedTimezone: any;
  duration: any;
  imgSrc: any;
  timezoneCode: any;
  timezoneCodes: any;
  public fullImagePath: any;
  timezoneCodesstart: any;
  timezoneCodesend: any;
  utctimezone: any;
  utctimezonestring: any;
  imagestatus: any = false;
  imageTypeError: any = false;
  enterpriseIcon: any;
  loginUserDateFormat: any;
  createdAt: any;
  updatedAt: any;
  errMsg1: any;
  errMsg2: any;
  errorstartdate: any;
  errorenddate: any;
  currentutc: any;
  startdate1: any;
  enddate1: any;
  advertisementName: any;
  advertisementType: any;
  advertisementSequence: any;
  isEnabled: any;
  notes: any;
  advertisementDescription: any;
  emptyimg: any;
  @ViewChild('lgModal') public childModal: ModalDirective;
  @Output() updatedList: EventEmitter<string> = new EventEmitter();

  /* Constructor for Advertisement Component */
  constructor(
    private router: Router,
    private el: ElementRef,
    public toastr: ToastsManager,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    @Inject('defaultDisplaySequence') public defaultDisplaySequence: number,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultDays') public defaultDays: number,
    @Inject('defaultDuration') public defaultDuration: number,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    public advertisementsService: AdvertisementsService,
    private advertisementservice: Advertisementservices) {
  }

  /* Component Initalization */
  ngOnInit() {
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    }
    const num = 0;
    let i: number;
    for (i = num; i <= 11; i++) {
      if (i === 0) {
        this.durationList.push('00');
      } else if (i === 1) {
        this.durationList.push('0' +  i * this.defaultDuration);
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

  /* To open Advertisement create, Edit, View and Delete popups */
  public showChildModal(updateaction, imgObj): void {
    this.selectedObj = imgObj;
    this.actionName = updateaction;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    if (this.actionName === 'Create') {
      this.getservercurrentutctime();
      this.getEnterprisesList();
      this.getAdvertisementTypes();
      this.gettimeZones();
      this.enabled = true;
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_ADVERTISEMENT';
      this.advsequenceorder = this.defaultDisplaySequence;
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      /**--- Code start for Convet User prefered time zone ---*/
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      /**--- Code end for Convet User prefered time zone --- */
      /* Code start for Duaration and End date Calculation */
      this.duration = this.defaultDuration;
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.selecteddays = '0';
      this.selectedhours = '00';
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      /* Code end for Duaration and End date Calculation */
      const createadvertisementimg = <HTMLInputElement>document.getElementById('createadvertisementimg');
      if (createadvertisementimg !== null) {
        this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
        createadvertisementimg.innerHTML = this.emptyimg.value;
      }

    } else if (this.actionName === 'Edit') {
      this.getservercurrentutctime();
      this.getAdvertisementTypes();
      this.gettimeZones();
      this.advimgname = imgObj.advertisementMediaFileName;
      this.advertisementName = this.selectedObj.advertisementName;
      this.advertisementType = this.selectedObj.advertisementType;
      this.advertisementSequence = this.selectedObj.advertisementSequence;
      this.isEnabled = this.selectedObj.isEnabled;
      this.notes = this.selectedObj.notes;
      this.advertisementDescription = this.selectedObj.advertisementDescription;
      this.imgSrc = this.apiEndPoint + '/' + imgObj.advertisementMediaFilePath + '/' + imgObj.advertisementMediaFileName;
      this.imagename = this.advimgname.split('.');
      const duration = this.selectedObj.duration.split(' ');
      this.selecteddays = duration[0].split('D')[0];
      this.selectedhours = duration[1].split('H')[0];
      this.selectedduration = duration[2].split('M')[0];
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.advimgname = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      this.file = '';
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.startdate = new Date(this.selectedObj.startDatetime);
      this.enddate = new Date(this.selectedObj.endDatetime);

      /**--- Code start for Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      /**----Code end for Convret User prefered time zone ------ */

      this.pagename = 'COMMON_PAGE_TITLES.EDIT_ADVERTISEMENT';
      const editadvertisementimg = <HTMLInputElement>document.getElementById('editadvertisementimg');
      if (editadvertisementimg !== null) {
        editadvertisementimg.innerHTML = '';
      }

    } else if (this.actionName === 'View') {
      this.imgSrc = this.apiEndPoint + '/' + imgObj.advertisementMediaFilePath + '/' + imgObj.advertisementMediaFileName;
      this.advimgname = imgObj.advertisementMediaFileName;
      this.imagename = this.advimgname.split('.');
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.advimgname = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      /**--- Code start for Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.startDatetime = moment(this.selectedObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.endDatetime = moment(this.selectedObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      /**----Code end for Convret User prefered time zone ------ */
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_ADVERTISEMENT';

    } else if (this.actionName === 'Delete') {
      this.imgSrc = this.apiEndPoint + '/' + imgObj.advertisementMediaFilePath + '/' + imgObj.advertisementMediaFileName;
      this.advimgname = imgObj.advertisementMediaFileName;
      this.imagename = this.advimgname.split('.');
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.advimgname = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      /**--- Code start for Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.startDatetime = moment(this.selectedObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.endDatetime = moment(this.selectedObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      /**----Code end for Convret User prefered time zone ------ */
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_ADVERTISEMENT';
    }
    this.childModal.show();
  }

  /** -----To get Current UTC time from Server ------ */
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.token).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /*-- To get Enterprises list from Enterprise table --*/
  getEnterprisesList() {
    this.advertisementservice.getEnterprices(this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
            this.enterpriseid = this.enterprisesName[0]._id;
            this.enterprisename = this.enterprisesName[0].enterpriseName;
            this.enterprisesSize = true;
          } else {
            this.enterprisesNames = data.result;
            this.enterprisesSize = false;
          }
        }
      });
  }

  /* To get Advertisement types from Lookup codes */
  getAdvertisementTypes() {
    this.advertisementservice.getLookupsList(this.token, 'ADVERTISE_TYPES')
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.advertisetypes = data['result'];
        }
      }, error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
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
      });
  }

  /* To get the timezones list from Lookup codes */
  public gettimeZones() {
    this.advertisementservice.getLookupsList(this.token, 'TIME_ZONES').subscribe(
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

  /* To calculate End date when Days Changed in duration field */
  daysChanged(days) {
    const durationvalue = Math.floor(this.duration / (24 * 60));
    this.duration = this.duration - durationvalue * 24 * 60 + 24 * 60 * Number(days);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }
  /* To calculate End date when Hours Changed in duration field */
  hoursChanged(hours) {
    const durationvaluedays = Math.floor(this.duration / (24 * 60));
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = this.duration - (durationvaluehours - durationvaluedays * 24) * 60 + Number(hours) * 60;
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }
  /* To calculate End date when Minitues Changed in duration field */
  durationChanged(duration) {
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = durationvaluehours * 60 + Number(duration);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }
  /* To convert the start date with user prefered Time zone and Date formate */
  startDateChange(value) {
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
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
    } else {
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
    }
  }
  /* To convert the end date with user prefered Time zone and Date formate */
  endDateChange(endvalue) {
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
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') >= moment(this.enddate).format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
    } else {
      this.error = '';
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

  /* Method for get the changed Enterprise Value */
  getEnterpriseName(value) {
    this.enterprisesName = value.split('~');
    this.enterpriseid = this.enterprisesName[0];
    this.enterprisename = this.enterprisesName[1];
    this.enterpriseIconFilePath = this.enterprisesName[2] + '/' + this.enterprisesName[3];
    if (this.enterpriseid === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
  }
  /* Method for get the changed Advertisement Type */
  getadversitetype(value) {
    if (value !== '') {
      this.selectedAdvType = value;
    } else {
      this.selectedAdvType = '';
    }
  }

  /* Method for get the changed timezone value */
  getTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*-- To Created Advertisemnt record --*/
  public createAdvertisement() {
    if (this.enterprisename === '' || this.enterprisename === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.advName.trim().replace(/\s\s+/g, ' ') === '' || this.advName.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'ADVERTISEMENTS.VALID_NOBLANK_AD_NAME';
    } else if (this.selectedAdvType === '' || this.selectedAdvType === undefined) {
      this.error = 'ADVERTISEMENTS.VALID_NOBLANK_AD_TYPE';
    } else if (this.advdesc.trim() === '' || this.advdesc.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.file === '' || this.file === undefined) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_NOBLANK_IMAGE';
    } else if (this.file !== '' && (this.file.type === '' || this.file.type === undefined)) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.file !== '' && this.file.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.file !== '' && this.imagestatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else if (this.startdate === '' || this.startdate === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
    } else if (this.enddate === '' || this.enddate === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm:ss') >= moment(this.enddate).format('YYYY-MM-DD HH:mm:ss')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      if (this.advsequenceorder === '' || this.advsequenceorder === undefined) {
        this.advsequenceorder = this.defaultDisplaySequence;
      }
      /* Code start for Duration field formate "00D 00H 00M" */
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
      /* Code end for Duration field formate "00D 00H 00M" */

      this.errorstartdate = this.startdate;
      this.errorenddate = this.enddate;
      /** -----Code start for Convert prefered time zone to utc format start----- */
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
      }
      /** ----- Code end for Convert prefered time zone to utc format end----- */
      if (moment(this.startdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
      ) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
      } else if (moment(this.enddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
      } else {
        this.resourceObj = {
          'enterprise': {
            'enterpriseId': parseInt(this.enterpriseid, 0), 'enterpriseName': this.enterprisename
          },
          'advertisementName': this.autocase(this.advName.trim().replace(/\s\s+/g, ' ')),
          'advertisementDescription': this.autocase(this.advdesc.trim().replace(/\s\s+/g, ' ')),
          'advertisementType': this.selectedAdvType,
          'startDatetime': moment(this.startdate).format('YYYY-MM-DD HH:mm:ss'),
          'endDatetime': moment(this.enddate).format('YYYY-MM-DD HH:mm:ss'),
          'advertisementSequence': parseInt(this.advsequenceorder, 0),
          'notes': this.comments.replace(/\s\s+/g, ' '),
          'isEnabled': this.enabled,
          'duration': advDuration
        };
        /*-- Calling Advertisement Record save Service*/
        this.advertisementservice.createAdvertisement(this.token, this.resourceObj, this.file).subscribe(
          data => {
            if (data['statusCode'] === '1011') {
              this.updatedList.emit('submit');
              this.hideAdvertiseModal();
              this.enterpriseIconFilePath = '';
              this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
              this.toastr.success(this.toastermessage.value);
            }
          },
          error => {
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
            const status = JSON.parse(error['status']);
            const statuscode = JSON.parse(error['_body']).statusCode;
            switch (status) {
              case 500:
                break;
              case 400:
                if (statuscode === '9961') {
                  this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                  this.toastr.success(this.toastermessage.value);
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                } else if (statuscode === '2033') {
                  this.error = 'COMMON_STATUS_CODES.' + statuscode;
                } else if (statuscode === '2034') {
                  this.error = 'COMMON_STATUS_CODES.' + statuscode;
                } break;
            }
          }
        );
      }
    }
  }
  /* To Validate the edited Advertisement Record */
  updateAdvertisement() {
    if (this.advertisementName.trim() === '' || this.advertisementName.trim() === undefined) {
      this.error = 'ADVERTISEMENTS.VALID_NOBLANK_AD_NAME';
    } else if (this.advertisementType.trim() === '' || this.advertisementType.trim() === undefined) {
      this.error = 'ADVERTISEMENTS.VALID_NOBLANK_AD_TYPE';
    } else if (this.advertisementDescription.trim() === '' || this.advertisementDescription.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.startdate === '' || this.startdate === undefined) {
      this.error = 'ADVERTISEMENTS.VALIDATION_MESSAGES.START_DATE_NOT_BLANK';
    } else if (this.enddate === '' || this.enddate === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm:ss') >= moment(this.enddate).format('YYYY-MM-DD HH:mm:ss')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      if (this.file !== '' && (this.file.type === '' || this.file.type === undefined)) {
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      } else if (this.file !== '' && this.file.type !== '' && this.imageTypeError === true) {
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      } else if (this.file !== '' && this.imagestatus === false) {
        this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
        this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
        this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
      } else {
        if (this.advertisementSequence === '' || this.advertisementSequence === undefined) {
          this.advertisementSequence = this.defaultDisplaySequence;
        }
        /* Code start for Duration field formate "00D 00H 00M" */
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
        /* Code end for Duration field formate "00D 00H 00M" */
        this.errorstartdate = this.startdate;
        this.errorenddate = this.enddate;
        /** ----- Code start for Convert prefered time zone to utc format start----- */
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
        }
        /** ----- Code end for Convert prefered time zone to utc format end----- */
        if (this.selectedObj.startdatestatus === 'statdateactive') {
          if (moment(this.startdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
          ) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
          } else if (moment(this.enddate).format('YYYY-MM-DD HH:mm') < moment(this.startdate).format('YYYY-MM-DD HH:mm')
          ) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
          } else {
            this.editadvertise(advDuration);
          }
        } else {
          if (moment(this.enddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
          ) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
          } else {
            this.editadvertise(advDuration);
          }
        }
      }
    }
  }
  /**-- To Update the edited Advertisemnt Record -----*/
  editadvertise(advDuration) {
    this.resourceObj = {
      '_id': this.selectedObj._id,
      'enterprise': {
        'enterpriseId': this.selectedObj.enterprise.enterpriseId,
        'enterpriseName': this.selectedObj.enterprise.enterpriseName
      },
      'advertisementName': this.autocase(this.advertisementName.trim().replace(/\s\s+/g, ' ')),
      'advertisementDescription': this.autocase(this.advertisementDescription.trim().replace(/\s\s+/g, ' ')),
      'advertisementMediaFileName': this.selectedObj.advertisementMediaFileName,
      'advertisementMediaFilePath': this.selectedObj.advertisementMediaFilePath,
      'advertisementType': this.advertisementType,
      'startDatetime': moment(this.startdate).format('YYYY-MM-DD HH:mm:ss'),
      'endDatetime': moment(this.enddate).format('YYYY-MM-DD HH:mm:ss'),
      'advertisementSequence': parseInt(this.advertisementSequence, 0),
      'notes': this.notes.replace(/\s\s+/g, ' '),
      'isEnabled': this.isEnabled,
      'duration': advDuration
    };
    this.error = '';

    this.advertisementservice.updateAdvertisement(this.selectedObj._id, this.token, this.resourceObj, this.file)
      .subscribe(
      response => {
        if (response['statusCode'] === '1014') {
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          const condition = window.localStorage.getItem('advertisementadvance');
          if (condition !== 'advance') {
            this.updatedList.emit('submit');
            window.localStorage.removeItem('advertisementadvance');
          } else {
            window.localStorage.setItem('advertisementaction', 'Advance');
          }
          if (localStorage.getItem('advertisementSearch') === 'advertisementSearch') {
            localStorage.setItem('editAdvertisement', 'editAdvertisement');
          } else {
            this.updatedList.emit();
            window.localStorage.removeItem('advertisementSearch');
          }
          this.closePopupModal();
        }
      },
      error => {
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '2033') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } else if (statuscode === '2034') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } else {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
            break;
        }
        this.updatedList.emit('submit');
      });
  }
  /*-- To Delete the Advertisement Record --*/
  deleteAdvertisement() {
    this.advertisementservice.deleteAdvertisement(this.token, this.selectedObj._id).subscribe(
      data => {
        if (data['statusCode'] === '1013') {
          const condition = window.localStorage.getItem('advertisementadvance');
          if (condition !== 'advance') {
            this.updatedList.emit('submit');
            window.localStorage.removeItem('advertisementadvance');
          } else {
            window.localStorage.setItem('advertisementaction', 'Advance');
          }
          if (localStorage.getItem('advertisementSearch') === 'advertisementSearch') {
            localStorage.setItem('deletedAdvertisement', 'deletedAdvertisement');
          } else {
            this.updatedList.emit();
            window.localStorage.removeItem('advertisementSearch');
          }
          this.childModal.hide();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.updatedList.emit('submit');
        }
      }, error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
            break;
        }
      }
    );
  }

  /*---- To upload the Advertisement image ----*/
  imageUploaded(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.fullImagePath = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.file.size;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    const size = (Math.round(fSize * 100) / 100);
    const bytes = fSExt[i];
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    setTimeout(() => {
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    }, 500);

    const pictype = this.file.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/jpg', '/jpeg', '/gif', '/bmp', '/png'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      const index = myObj['imageTypes'][j].indexOf(extension);
      if (index > -1) {
        this.imageTypeError = false;
        this.error = '';
        if (this.imageMinSize > size || bytes !== 'KB') {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else if (size > this.imageMaxSize || bytes !== 'KB') {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else {
          this.imagestatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }
    if (this.actionName === 'Create') {
      const createadvertisementimg = <HTMLInputElement>document.getElementById('createadvertisementimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      createadvertisementimg.innerHTML = img;
    } else if (this.actionName === 'Edit') {
      const editadvertisementimg = <HTMLInputElement>document.getElementById('editadvertisementimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      editadvertisementimg.innerHTML = img;
    }
  }

  /*---- To Close the Advertisement Popup when click on Cancel button ----*/
  closePopupModal() {
    this.error = '';
    this.imgSrc = '';
    this.enterpriseIconFilePath = '';
    this.updatedList.emit('submit');
    this.childModal.hide();
  }
  /* To close the Advertisement Create, Delete, Edit and View popups */
  public hideAdvertiseModal() {
    this.selectedduration = this.defaultDuration;
    this.enterprisename = '';
    this.imgSrc = '';
    this.enterpriseIconFilePath = '';
    this.advName = '';
    this.advdesc = '';
    this.selectedAdvType = '';
    this.file = '';
    this.startdate = '';
    this.enddate = '';
    this.advsequenceorder = '';
    this.comments = '';
    this.error = '';
    this.childModal.hide();
  }
  /*---- To Clear the Validation Error ----*/
  clearmessage() {
    this.error = '';
  }
  /* Used for init caps */
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }
  /* Autofocus for Cancel and Delete button */
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.actionName === 'View') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.actionName === 'Delete') {
      if (key === 13) {
        this.deleteAdvertisement();
      }
    }
  }
}
