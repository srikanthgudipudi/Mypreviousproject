/*
  * Single user component are using to following functionality
  * openUserInfoModal(userid, userAccount, firstname, lastName, email, mobile, country,
  status, cancelType): Display single user details of front end user
  * getEnterprices(): To get the Enterprices list.
  * getResourcesData(resourceId): To get the ResourcesData list.
  * getTimeZones(): To get timezones based on country.
  * getCurrencys(): To get currency based on country.
  * getCurrencyFormat(): To get currency format based on country.
  * getDateFormates(): To get date format based on country.
  * getLanguages(): To get languages based on country.
  * getUserRoles(): To get UserRoles list.
  * getThemes(): To get themes list.
  * securityQuestion(): To get the list of Security Question.
  * userInfoSubmit(selectedUserObj): To insert user status into database.
  * createUser(): To insert the data into database.
  * deleteUser(): To delete the user from user table.
  * getChangeusertype(userType): To change the usertype list.
  * getChangeuserStatus(userstatus): To change the userStatus list.
  * getChangeuserRoles(userRoles): To change the userRoles list.
  * getEnabled(enable): To change the Enabled list.
  * getEnterpriseResources(type): To get the EnterpriseResources list.
  * getPosition(position): To change the position list.
  * getLanguage(language): To change the language list.
  * getCurrency(currency): To change the Currency list.
  * getDateFormat(dateformat): To change the Date Format list.
  * gettheme(theme): To change the Theme list.
  * getstatus(status): To change the Status list.
  * getcountry(country): To change the Country list
  * getdepartment(department): To change the Department list.
  * getCurrencyformat(currencyformat): To change the Currency Format list.
  * browseImage(event): To browseImage functionality.
  * saveImageUploaded(): To save uploaded image or avtar in profilepicupdate html page.

*/
import {
  Component, ViewContainerRef, OnInit, ViewChild, Inject, Output, EventEmitter, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Userservice } from './user.service';
import { SelectItem } from '../../../../custommodules/primeng/primeng';
import { UserRolesService } from '../../../admin/roles/userroles.service';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-details-popup',
  templateUrl: './user.html',
  providers: [Userservice, UserRolesService]
})

export class UserComponent implements OnInit {
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  cities: SelectItem[];
  pageName: any;
  public act: any;
  public reason: any;
  public error: any;
  timezoneCode: any;
  imgfile: any = '';
  imgSrc: any = '';
  public selectedUserObj: any;
  actionName: any;
  errorpass: string;
  errorReg: string;
  timeZones: any[];
  languages: any[];
  gender: any;
  imagename: any;
  userIcon: any = '';
  token: string;
  enterpriseId: any;
  resourcesList: any[];
  resource: any;
  value: any[];
  currencies: any[];
  datefomat: any[];
  status: any[];
  userType: any;
  usrRole: any[];
  Position: any[];
  Department: any[];
  test: any;
  enterprisesName: any;
  enterprisesNames: any;
  firstName: any;
  lastName: any;
  userName: any;
  passWord: any;
  ConformPasswod: any;
  email: any;
  storage: any;
  mobile: any;
  abtLanguage: any;
  abtCurrency: any;
  abtDateFormat: any;
  city: any;
  state: any;
  country: any;
  zip: any;
  image: any;
  timezone: any;
  urType: any;
  urstatus: any;
  urrole: any;
  urposition: any;
  themes: any;
  department: any;
  designation: any;
  worknumber: any;
  actiontype: any;
  workeumberext: any;
  securityQuestion1: any;
  answer1: any;
  securityQuestion2: any;
  answer2: any;
  securityQuestion3: any;
  answer3: any;
  securityQuestion4: any;
  answer4: any;
  securityQuestion5: any;
  answer5: any;
  securityQuestionsTab: boolean;
  theme: any;
  enterprise: any;
  amountformats: any;
  toastermessage: any;
  addressList: Address = new Address();
  currencyformat: any;
  enterprisesSize: any;
  supervisoremail: any;
  ssn: any;
  securityQuestionsDetails: any;
  enterpriseIconFilePath: any;
  updateAt: any;
  createAt: any;
  retext: any;
  reasons: any;
  reasonValue: any;
  oldreasonValue: any;
  rowsPerpage: any;
  perpagecount: any;
  updatedrowsperpage: any;
  geoCoordinates: any;
  latitude: any;
  longitutude: any;
  reasonValue1: any;
  worknumbercntrycode: any;
  mobilenumcuntrycode: any;
  worknumbercntrycodesplit: any[];
  worknumext: any;
  imagevalue: any;
  resourcepath: any;
  imagefileName: any;
  enabled = 'Active';
  imageTypeError: any = false;
  imgStatus: any = false;
  loginUserDateFormat: any;
  mobilenumbercntrycodesplit: any[];
  errMsg1: any;
  errMsg2: any;
  logiUserEnId: any;
  advancedReservationWindowInDays: any;
  checkinRequired: any;
  earlyCheckinWindowInMins: any;
  longTermReservationPossible: any;
  reservationCanBeBumped: any;
  expirationGracePeriodInMins: any;
  maxActiveReservationsPerUser: any;
  maxReservationWindowInHrs: any;
  reservationReminderWindowInMins: any;
  sendReservationReminders: any;
  emptyimg: any;
  errorMessage: string;
  socialcalendar: any;
  calendertype: any = '';
  mail: any = '';
  socialnw: any;
  syncEnabled: any;
  toCreateEventOnOtherUser = false;

  @ViewChild('lgModal')
  public lggModal: ModalDirective;
  constructor(private singleuserservices: Userservice,
    private sanitizer: DomSanitizer,
    public router: Router,
    private userRolesService: UserRolesService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultLanguage') public defaultLanguage: string,
    @Inject('defaultTimezone') public defaultTimezone: string,
    @Inject('defaultCurrency') public defaultCurrency: string,
    @Inject('currencyFormat') public currencyFormat: string,
    @Inject('dateFormat') public dateFormat: string,
    @Inject('defaultTheme') public defaultTheme: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    public toastr: ToastsManager, private translateService: TranslateService, vcr: ViewContainerRef,
    @Inject('footerPoweredByName') public footerPoweredByName: string) {
    this.toastr.setRootViewContainerRef(vcr);
    this.cities = [];
    this.cities.push({ label: 'New York', value: 'New York' });
    this.cities.push({ label: 'Rome', value: 'Rome' });
    this.cities.push({ label: 'London', value: 'London' });
    this.cities.push({ label: 'Istanbul', value: 'Istanbul' });
    this.cities.push({ label: 'Paris', value: 'Paris' });
  }

  /** ----This is the initial method called while page is loading----- */
  ngOnInit() {
    this.token = window.localStorage.getItem('token');
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else {
      this.getEnterprices();
      this.getCurrencyFormat();
      this.getCurrencys();
      this.getLanguages();
      this.getDateFormates();
      this.getTimeZones();
      this.getUserRoles();
      this.getThemes();
      this.getblockReasons();
      this.getunblockReasons();
    }
    this.getsocialcalendar();
  }

  /* To display single user details */
  public openUserInfoModal(action, user): void {
    this.selectedUserObj = user;
    this.imgSrc = '';
    this.actiontype = action;
    this.lggModal.show();
    if (this.actiontype !== 'Create') {
      this.selectedUserObj.preferences.defaultTimezone = this.selectedUserObj.preferences.defaultTimezone.replace('%2B', '+');
      this.worknumbercntrycode = this.selectedUserObj.EnterpriseResources.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== undefined) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.selectedUserObj.EnterpriseResources.contactDetails.workNumberExtn;
      this.mobilenumcuntrycode = this.selectedUserObj.EnterpriseResources.contactDetails.mobileNumberCountrycode;
      this.mobilenumbercntrycodesplit = this.mobilenumcuntrycode.split(' -');
      this.mobile = this.mobilenumbercntrycodesplit[0] + '-' + this.selectedUserObj.EnterpriseResources.contactDetails.mobileNumber;
      if (this.selectedUserObj.EnterpriseResources.contactDetails.workNumber) {
        this.worknumber = this.selectedUserObj.EnterpriseResources.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.selectedUserObj.EnterpriseResources.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.selectedUserObj.EnterpriseResources.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
      this.enterpriseIconFilePath = this.selectedUserObj.enterprises.enterpriseIconFilePath + '/'
        + this.selectedUserObj.enterprises.enterpriseIcon;
      this.userIcon = this.selectedUserObj.EnterpriseResources.enterpriseResourcesImageFileName;
      if (this.userIcon === null) {
        this.userIcon = this.selectedUserObj.enterprises.enterpriseIcon;
        this.imgSrc = this.apiEndPoint + '/' + this.selectedUserObj.enterprises.enterpriseIconFilePath + '/' + this.userIcon;
        this.imagename = this.userIcon.split('.');
        if (this.imagename[0].length > 20) {
          const imgname = this.imagename.toString();
          this.userIcon = imgname.substring(0, 20) + '...' + this.imagename[1];
        }
      } else {
        this.imgSrc = this.apiEndPoint + '/' + this.selectedUserObj.EnterpriseResources.enterpriseResourcesImageFilePath + '/'
          + this.userIcon;
        this.userIcon = this.selectedUserObj.EnterpriseResources.enterpriseResourcesImageFileName;
        this.imagename = this.userIcon.split('.');
        if (this.imagename[0].length > 20) {
          const imgname = this.imagename.toString();
          this.userIcon = imgname.substring(0, 20) + '...' + this.imagename[1];
        }
      }
      const edituserimg = <HTMLInputElement>document.getElementById('edituserimg');
      if (edituserimg !== null) {
        edituserimg.innerHTML = '';
      }
    }
    this.actionName = action;
    if (action === 'Edit') {
      this.logiUserEnId = localStorage.getItem('enterpriseId');
      this.pageName = 'COMMON_PAGE_TITLES.EDIT_USER';
      this.mobilenumcuntrycode = this.selectedUserObj.EnterpriseResources.contactDetails.mobileNumberCountrycode;
      this.mobilenumbercntrycodesplit = this.mobilenumcuntrycode.split(' -');
      this.mobile = this.mobilenumbercntrycodesplit[0] + '-' + this.selectedUserObj.EnterpriseResources.contactDetails.mobileNumber;
      this.worknumbercntrycode = this.selectedUserObj.EnterpriseResources.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== undefined) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.selectedUserObj.EnterpriseResources.contactDetails.workNumberExtn;
      if (this.selectedUserObj.EnterpriseResources.contactDetails.workNumber) {
        this.worknumber = this.selectedUserObj.EnterpriseResources.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.selectedUserObj.EnterpriseResources.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.selectedUserObj.EnterpriseResources.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
      this.getCurrencyFormat();
      this.getCurrencys();
      this.getStatusList();
      this.getRowsperPage();
      this.getLanguages();
      this.getDateFormates();
      this.getTimeZones();
      this.getUserRoles();
      this.getThemes();
      this.securityQuestion();
      this.updatedrowsperpage = this.selectedUserObj.preferences.rowsPerPage;
      this.enabled = this.selectedUserObj.isEnabled;
      this.reasonValue = this.selectedUserObj.reasonUnblock;
      this.reasonValue1 = this.selectedUserObj.reasonBlock;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedUserObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedUserObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.advancedReservationWindowInDays = this.selectedUserObj.settings.advancedReservationWindowInDays;
      this.reservationCanBeBumped = this.selectedUserObj.settings.reservationCanBeBumped;
      this.checkinRequired = this.selectedUserObj.settings.checkinRequired;
      this.earlyCheckinWindowInMins = this.selectedUserObj.settings.earlyCheckinWindowInMins;
      this.expirationGracePeriodInMins = this.selectedUserObj.settings.expirationGracePeriodInMins;
      this.longTermReservationPossible = this.selectedUserObj.settings.longTermReservationPossible;
      this.maxActiveReservationsPerUser = this.selectedUserObj.settings.maxActiveReservationsPerUser;
      this.maxReservationWindowInHrs = this.selectedUserObj.settings.maxReservationWindowInHrs;
      this.reservationReminderWindowInMins = this.selectedUserObj.settings.reservationReminderWindowInMins;
      this.sendReservationReminders = this.selectedUserObj.settings.sendReservationReminders;
      this.mail = this.selectedUserObj.syncCalendar.mail;
      this.socialnw = this.selectedUserObj.syncCalendar.calendarType;
      this.toCreateEventOnOtherUser = this.selectedUserObj.settings.toCreateEventOnOtherUser;
      this.syncEnabled = JSON.parse(this.selectedUserObj.syncCalendar.syncEnabled);
    } else if (action === 'View') {
      this.reasonValue = '';
      this.retext = true;
      this.pageName = 'COMMON_PAGE_TITLES.VIEW_USER';
      this.securityQuestion();
      this.enabled = this.selectedUserObj.isEnabled;
      this.reasonValue = this.selectedUserObj.reasonUnblock;
      this.reasonValue1 = this.selectedUserObj.reasonBlock;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedUserObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedUserObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.advancedReservationWindowInDays = this.selectedUserObj.settings.advancedReservationWindowInDays;
      this.reservationCanBeBumped = this.selectedUserObj.settings.reservationCanBeBumped;
      this.checkinRequired = this.selectedUserObj.settings.checkinRequired;
      this.earlyCheckinWindowInMins = this.selectedUserObj.settings.earlyCheckinWindowInMins;
      this.expirationGracePeriodInMins = this.selectedUserObj.settings.expirationGracePeriodInMins;
      this.longTermReservationPossible = this.selectedUserObj.settings.longTermReservationPossible;
      this.maxActiveReservationsPerUser = this.selectedUserObj.settings.maxActiveReservationsPerUser;
      this.maxReservationWindowInHrs = this.selectedUserObj.settings.maxReservationWindowInHrs;
      this.reservationReminderWindowInMins = this.selectedUserObj.settings.reservationReminderWindowInMins;
      this.sendReservationReminders = this.selectedUserObj.settings.sendReservationReminders;
      this.toCreateEventOnOtherUser = this.selectedUserObj.settings.toCreateEventOnOtherUser;
    } else if (action === 'Add') {
      this.pageName = 'COMMON_PAGE_TITLES.CREATE_USER';
      this.getStatusList();
      this.securityQuestion();
    } else if (action === 'Block') {
      this.reasonValue = '';
      this.retext = false;
      this.getblockReasons();
      this.oldreasonValue = this.selectedUserObj.reasonUnblock;
      this.reason = '';
      this.pageName = 'COMMON_PAGE_TITLES.BLOCK_USER';
      this.securityQuestion();
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedUserObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedUserObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.advancedReservationWindowInDays = this.selectedUserObj.settings.advancedReservationWindowInDays;
      this.reservationCanBeBumped = this.selectedUserObj.settings.reservationCanBeBumped;
      this.checkinRequired = this.selectedUserObj.settings.checkinRequired;
      this.earlyCheckinWindowInMins = this.selectedUserObj.settings.earlyCheckinWindowInMins;
      this.expirationGracePeriodInMins = this.selectedUserObj.settings.expirationGracePeriodInMins;
      this.longTermReservationPossible = this.selectedUserObj.settings.longTermReservationPossible;
      this.maxActiveReservationsPerUser = this.selectedUserObj.settings.maxActiveReservationsPerUser;
      this.maxReservationWindowInHrs = this.selectedUserObj.settings.maxReservationWindowInHrs;
      this.reservationReminderWindowInMins = this.selectedUserObj.settings.reservationReminderWindowInMins;
      this.sendReservationReminders = this.selectedUserObj.settings.sendReservationReminders;
      this.toCreateEventOnOtherUser = this.selectedUserObj.settings.toCreateEventOnOtherUser;
    } else if (action === 'Unblock') {
      this.reasonValue = '';
      this.getunblockReasons();
      this.retext = false;
      this.reason = '';
      this.pageName = 'COMMON_PAGE_TITLES.UNBLOCK_USER';
      this.oldreasonValue = this.selectedUserObj.reasonBlock;
      this.advancedReservationWindowInDays = this.selectedUserObj.settings.advancedReservationWindowInDays;
      this.reservationCanBeBumped = this.selectedUserObj.settings.reservationCanBeBumped;
      this.checkinRequired = this.selectedUserObj.settings.checkinRequired;
      this.earlyCheckinWindowInMins = this.selectedUserObj.settings.earlyCheckinWindowInMins;
      this.expirationGracePeriodInMins = this.selectedUserObj.settings.expirationGracePeriodInMins;
      this.longTermReservationPossible = this.selectedUserObj.settings.longTermReservationPossible;
      this.maxActiveReservationsPerUser = this.selectedUserObj.settings.maxActiveReservationsPerUser;
      this.maxReservationWindowInHrs = this.selectedUserObj.settings.maxReservationWindowInHrs;
      this.reservationReminderWindowInMins = this.selectedUserObj.settings.reservationReminderWindowInMins;
      this.sendReservationReminders = this.selectedUserObj.settings.sendReservationReminders;
    } else if (action === 'Delete') {
      this.reasonValue = '';
      this.retext = true;
      this.enabled = this.selectedUserObj.isEnabled;
      if (this.enabled) {
        this.reasonValue = this.selectedUserObj.reasonUnblock;
      } else {
        this.reasonValue = this.selectedUserObj.reasonBlock;
      }
      this.pageName = 'COMMON_PAGE_TITLES.DELETE_USER';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedUserObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedUserObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.advancedReservationWindowInDays = this.selectedUserObj.settings.advancedReservationWindowInDays;
      this.reservationCanBeBumped = this.selectedUserObj.settings.reservationCanBeBumped;
      this.checkinRequired = this.selectedUserObj.settings.checkinRequired;
      this.earlyCheckinWindowInMins = this.selectedUserObj.settings.earlyCheckinWindowInMins;
      this.expirationGracePeriodInMins = this.selectedUserObj.settings.expirationGracePeriodInMins;
      this.longTermReservationPossible = this.selectedUserObj.settings.longTermReservationPossible;
      this.maxActiveReservationsPerUser = this.selectedUserObj.settings.maxActiveReservationsPerUser;
      this.maxReservationWindowInHrs = this.selectedUserObj.settings.maxReservationWindowInHrs;
      this.reservationReminderWindowInMins = this.selectedUserObj.settings.reservationReminderWindowInMins;
      this.sendReservationReminders = this.selectedUserObj.settings.sendReservationReminders;
      this.toCreateEventOnOtherUser = this.selectedUserObj.settings.toCreateEventOnOtherUser;
    } else if (action === 'Create') {
      this.pageName = 'COMMON_PAGE_TITLES.CREATE_USER';
      this.getEnterprices();
      this.getCurrencyFormat();
      this.getRowsperPage();
      this.getCurrencys();
      this.getStatusList();
      this.getLanguages();
      this.getDateFormates();
      this.getTimeZones();
      this.getUserRoles();
      this.getThemes();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.advancedReservationWindowInDays = window.localStorage.getItem('advancedReservationWindowInDays');
      this.earlyCheckinWindowInMins = window.localStorage.getItem('earlyCheckinWindowInMins');
      this.expirationGracePeriodInMins = window.localStorage.getItem('expirationGracePeriodInMins');
      this.maxActiveReservationsPerUser = window.localStorage.getItem('maxActiveReservationsPerUser');
      this.maxReservationWindowInHrs = window.localStorage.getItem('maxReservationWindowInHrs');
      this.reservationCanBeBumped = JSON.parse(window.localStorage.getItem('reservationCanBeBumped'));
      this.longTermReservationPossible = JSON.parse(window.localStorage.getItem('longTermReservationPossible'));
      this.reservationReminderWindowInMins = window.localStorage.getItem('reservationReminderWindowInMins');
      this.sendReservationReminders = JSON.parse(window.localStorage.getItem('sendReservationReminders'));
      const createuserimg = <HTMLInputElement>document.getElementById('createuserimg');
      if (createuserimg !== null) {
        this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
        createuserimg.innerHTML = this.emptyimg.value;
      }
    }
    this.lggModal.show();
  }

  /** ----This method is used to autocapitlize------*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{2,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /** This method is used to close the popup modal of view and delete when we press Enter key  */
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.actiontype === 'View') {
      if (key === 13) {
        this.lggModal.hide();
      }
    }
    if (this.actiontype === 'Delete') {
      if (key === 13) {
        this.deleteUser();
      }
    }
  }

  /* -- To change the reason list */
  getreason(reason) {
    this.reasonValue = reason;
  }

  /* To get the Enterprices list */
  getEnterprices() {
    this.singleuserservices.getEnterprices(this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprise = data['result'][0].enterpriseName;
            this.enterprisesSize = true;
            this.enterpriseId = data['result'][0]._id;
            this.enterprisesName = data['result'][0].enterpriseName;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.imgSrc = this.apiEndPoint + '/' + this.enterpriseIconFilePath;
            this.defaultTimezone = data['result'][0].preferences.defaultTimezone;
            this.defaultCurrency = data['result'][0].preferences.defaultCurrency;
            this.defaultTheme = data['result'][0].preferences.defaultTheme;
            this.dateFormat = data['result'][0].preferences.dateFormat;
            this.currencyFormat = data['result'][0].preferences.currencyFormat;
            this.defaultLanguage = data['result'][0].preferences.defaultLanguage;
            this.advancedReservationWindowInDays = data['result'][0].settings.advancedReservationWindowInDays;
            this.earlyCheckinWindowInMins = data['result'][0].settings.earlyCheckinWindowInMins;
            this.expirationGracePeriodInMins = data['result'][0].settings.expirationGracePeriodInMins;
            this.maxActiveReservationsPerUser = data['result'][0].settings.maxActiveReservationsPerUser;
            this.maxReservationWindowInHrs = data['result'][0].settings.maxReservationWindowInHrs;
            this.reservationReminderWindowInMins = data['result'][0].settings.reservationReminderWindowInMins;
            this.reservationCanBeBumped = data['result'][0].settings.reservationCanBeBumped;
            this.sendReservationReminders = data['result'][0].settings.sendReservationReminders;
            this.longTermReservationPossible = data['result'][0].settings.longTermReservationPossible;
            this.singleuserservices.getResources(this.token, this.enterpriseId)
              .subscribe(data2 => {
                this.resourcesList = data2['result'];
              });
          } else {
            this.enterprisesNames = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }

  /* To get the ResourcesData list */
  getResourcesData(resourceId) {
    this.resource = resourceId;
    this.imagevalue = '';
    this.singleuserservices.getResourcesData(this.token, resourceId)
      .subscribe(EnterpriseResources => {
        if (EnterpriseResources['result'].length === 0) {
          EnterpriseResources['result'][0] = {
            address: {},
            contactDetails: {}
          };
        }
        this.userName = EnterpriseResources['result'][0].contactDetails.email;
        this.firstName = EnterpriseResources['result'][0].firstName;
        this.lastName = EnterpriseResources['result'][0].lastName;
        this.userType = EnterpriseResources['result'][0].resourceType;
        this.department = EnterpriseResources['result'][0].department;
        this.designation = EnterpriseResources['result'][0].designation;
        this.gender = EnterpriseResources['result'][0].gender;
        this.ssn = EnterpriseResources['result'][0].SSN;
        this.addressList = EnterpriseResources['result'][0].address;
        this.latitude = EnterpriseResources['result'][0].address.geoCoordinates[0];
        this.longitutude = EnterpriseResources['result'][0].address.geoCoordinates[1];
        this.email = EnterpriseResources['result'][0].contactDetails.email;
        this.supervisoremail = EnterpriseResources['result'][0].supervisorEmail;
        this.worknumbercntrycode = EnterpriseResources['result'][0].contactDetails.workNumberCountrycode;
        this.worknumext = EnterpriseResources['result'][0].contactDetails.workNumberExtn;
        this.mobilenumcuntrycode = EnterpriseResources['result'][0].contactDetails.mobileNumberCountrycode;
        this.mobilenumbercntrycodesplit = this.mobilenumcuntrycode.split(' -');
        if (EnterpriseResources['result'][0].contactDetails.workNumber) {
          this.worknumber = EnterpriseResources['result'][0].contactDetails.workNumber;
          if (this.worknumbercntrycode) {
            this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
            this.worknumber = this.worknumbercntrycodesplit[0] + '-' + EnterpriseResources['result'][0].contactDetails.workNumber;
          }
          if (this.worknumext) {
            this.worknumber = this.worknumber + ' x' + EnterpriseResources['result'][0].contactDetails.workNumberExtn;
          }
        } else {
          this.worknumber = '';
        }
        this.mobile = this.mobilenumbercntrycodesplit[0] + '-' + EnterpriseResources['result'][0].contactDetails.mobileNumber;
        this.imagevalue = EnterpriseResources['result'][0].enterpriseResourcesImageFilePath;
        this.imagefileName = EnterpriseResources['result'][0].enterpriseResourcesImageFileName;
        this.resourcepath = EnterpriseResources['result'][0].enterpriseResourcesImageFilePath;
        if (EnterpriseResources['result'][0].enterpriseResourcesImageFileName !== null) {
          this.imgSrc = this.apiEndPoint + '/' + this.imagevalue + '/' + EnterpriseResources['result'][0].enterpriseResourcesImageFileName;
        }
      });
  }

  /*---- To get currency format based on country   ---*/
  getCurrencyFormat() {
    this.singleuserservices.getLookupsList(this.token, 'AMOUNT_FORMATS')
      .subscribe(currencyFormatValues => {
        this.amountformats = currencyFormatValues['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
      );
  }

  /**----- This method is used to get the status list ---- */
  public getStatusList() {
    this.singleuserservices.getLookupsList(this.token, 'USER_STATUSES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.status = data['result'];
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /**---- This method is used to get the timezones---- */
  public getTimeZones() {
    this.singleuserservices.getLookupsList(this.token, 'TIME_ZONES').subscribe(
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*-- Get Rows Per page list --*/
  public getRowsperPage() {
    this.singleuserservices.getLookupsList(window.localStorage.getItem('token'), 'ROWS_PER_PAGE').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.rowsPerpage = data['result'];
          this.perpagecount = data['result'][0]['description'];
        }
      },
      error => {
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
            } break;
        }
      }
    );
  }

  /** This is on change method called when we change rowperpage */
  changerowsperpage(rowperpage) {
    this.perpagecount = rowperpage;
  }

  /*---- To get date format based on country   ---*/
  public getDateFormates() {
    this.singleuserservices.getLookupsList(this.token, 'DATE_FORMATS').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.datefomat = data['result'].sort();
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To get languages based on country   ---*/
  public getLanguages() {
    this.singleuserservices.getLookupsList(this.token, 'LANGUAGES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.languages = data['result'];
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To get UserRoles list   ---*/
  public getUserRoles() {
    this.singleuserservices.getUserRoles(this.token).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.usrRole = data['result'].sort();
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /** ---This method is used to get the currency list from lookup's --- */
  public getCurrencys() {
    this.singleuserservices.getLookupsList(this.token, 'CURRENCIES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.currencies = data['result'];
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To get themes list   ---*/
  public getThemes() {
    this.singleuserservices.getLookupsList(this.token, 'UI_THEMES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.themes = data['result'];
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /** ----This method is used to clear the error messages---- */
  clearmessage() {
    this.error = '';
    this.errorpass = '';
    this.errorReg = '';
  }

  /* To get the list of Security Question */
  securityQuestion() {
    this.singleuserservices.securityQuestion(this.selectedUserObj.userAccount, window.localStorage.getItem('token'))
      .subscribe(
      securityQuestionsDetails => {
        this.securityQuestionsDetails = securityQuestionsDetails['result'];
        if (this.securityQuestionsDetails.length !== 0) {
          this.securityQuestionsTab = true;
          this.securityQuestion1 = this.securityQuestionsDetails[0].question;
          this.answer1 = this.securityQuestionsDetails[0].answer;
          this.securityQuestion2 = this.securityQuestionsDetails[1].question;
          this.answer2 = this.securityQuestionsDetails[1].answer;
          this.securityQuestion3 = this.securityQuestionsDetails[2].question;
          this.answer3 = this.securityQuestionsDetails[2].answer;
          this.securityQuestion4 = this.securityQuestionsDetails[3].question;
          this.answer4 = this.securityQuestionsDetails[3].answer;
          this.securityQuestion5 = this.securityQuestionsDetails[4].question;
          this.answer5 = this.securityQuestionsDetails[4].answer;
        } else {
          this.securityQuestionsTab = false;
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
      );
  }

  /* To insert user status into database */
  public userInfoSubmit(selectedUserObj) {
    if (this.securityQuestionsTab === true) {
      if (this.answer1 === '' || this.answer1 === undefined || this.answer1 === null) {
        this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER1';
      } else if (this.answer2 === '' || this.answer2 === undefined || this.answer2 === null) {
        this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER2';
      } else if (this.answer3 === '' || this.answer3 === undefined || this.answer3 === null) {
        this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER3';
      } else if (this.answer4 === '' || this.answer4 === undefined || this.answer4 === null) {
        this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER4';
      } else if (this.answer5 === '' || this.answer5 === undefined || this.answer5 === null) {
        this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER5';
      } else {
        this.securityQuestionsDetails[0].answer = this.answer1;
        this.securityQuestionsDetails[1].answer = this.answer2;
        this.securityQuestionsDetails[2].answer = this.answer3;
        this.securityQuestionsDetails[3].answer = this.answer4;
        this.securityQuestionsDetails[4].answer = this.answer5;
        this.singleuserservices.updateSecurityQuestions(this.selectedUserObj.userAccount, this.securityQuestionsDetails, this.token).
          subscribe(
          data => {
          },
          error => {
            const status = JSON.parse(error['status']);
            const statuscode = JSON.parse(error['_body']).status;
            switch (status) {
              case 500:
                break;
              case 400:
                if (statuscode === '9961') {
                  this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                  this.toastr.success(this.toastermessage.value);
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                } break;
            }
          }
          );
      }
    }
    if (this.imgfile !== '' && this.imgfile.type === '') {
      this.error = ' COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgfile.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgStatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else {
      this.defaultTimezone = this.defaultTimezone.replace('+', '%2B');
      selectedUserObj.settings = {
        'advancedReservationWindowInDays': this.advancedReservationWindowInDays,
        'checkinRequired': this.checkinRequired,
        'earlyCheckinWindowInMins': this.earlyCheckinWindowInMins,
        'longTermReservationPossible': this.longTermReservationPossible,
        'reservationCanBeBumped': this.reservationCanBeBumped,
        'expirationGracePeriodInMins': this.expirationGracePeriodInMins,
        'maxActiveReservationsPerUser': this.maxActiveReservationsPerUser,
        'maxReservationWindowInHrs': this.maxReservationWindowInHrs,
        'reservationReminderWindowInMins': this.reservationReminderWindowInMins,
        'sendReservationReminders': this.sendReservationReminders,
        'toCreateEventOnOtherUser': this.toCreateEventOnOtherUser
      };
      selectedUserObj.preferences = {
        'defaultLanguage': this.defaultLanguage,
        'defaultCurrency': this.defaultCurrency,
        'currencyFormat': this.currencyFormat,
        'dateFormat': this.dateFormat,
        'defaultTheme': this.defaultTheme,
        'defaultTimezone': this.defaultTimezone,
        'rowsPerPage': this.updatedrowsperpage
      };
      selectedUserObj.syncCalendar = {
        'syncEnabled': this.syncEnabled,
        'calendarType': this.calendertype,
        'mail': this.mail
      };
      this.singleuserservices.updateUser(selectedUserObj, this.imgfile, this.token)
        .subscribe(data => {
          if (data.statusCode === '1001') {
            if (window.localStorage.getItem('advancedSearch') === 'advancedSearch') {
              window.localStorage.setItem('goToAdvance', 'goToAdvance');
              window.localStorage.removeItem('advancedSearch');
            } else if (window.localStorage.getItem('simpleSearch') === 'simpleSearch') {
              window.localStorage.setItem('goToSimple', 'goToSimple');
              window.localStorage.removeItem('simpleSearch');
            } else {
              this.uploaded.emit();
            }
            this.clearmessage();
            this.lggModal.hide();
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
            this.toastr.success(this.toastermessage.value);
          } else {
            this.lggModal.hide();
            this.toastr.error(data.message);
          }
        }, error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).status;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
          }
        }
        );
    }
  }

  /* To insert the data into database  */
  createUser() {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.actionName === 'Create') {
      if (this.enterprisesName === '' || this.enterprisesName === undefined || this.enterprisesName === null) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
      } else if (this.resource === '' || this.resource === undefined || this.resource === null) {
        this.error = 'USERS.VALID_NOBLANK_RESOURCE_NAME';
      // } else if (this.userName === undefined || this.userName === null || this.userName.trim() === '') {
      //   this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
      } else if (this.userName.length < 6 && this.userName !== undefined && this.userName !== null) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_LENGTH_USERNAME';
      } else if (this.urrole === '' || this.urrole === undefined || this.urrole === null) {
        this.error = 'USER_ROLES.VALID_NOBLANK_ROLE_NAME';
      } else if (this.mail !== '' && this.mail !== undefined
        && !EMAIL_REGEXP.test(this.mail)) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
      // } else if (this.userName.length > 10 && this.userName !== undefined && this.userName !== null) {
      //   this.error = 'COMMON_VALIDATION_MESSAGES.VALID_LENGTH_USERNAME';
      } else if (this.imgfile !== '' && this.imgfile.type === '') {
        this.error = ' COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      } else if (this.imgfile !== '' && this.imgfile.type !== '' && this.imageTypeError === true) {
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      } else if (this.imgfile !== '' && this.imgStatus === false) {
        this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
        this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
        this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
      } else {
        this.defaultTimezone = this.defaultTimezone.replace('+', '%2B');
        const enterprise = {
          'enterpriseId': this.enterpriseId,
          'enterpriseName': this.enterprisesName
        };
        const enterpriseResourcesImageFileName = this.imagefileName;
        const enterpriseResourcesImageFilePath = this.resourcepath;
        const settings = {
          'advancedReservationWindowInDays': this.advancedReservationWindowInDays,
          'checkinRequired': this.checkinRequired,
          'earlyCheckinWindowInMins': this.earlyCheckinWindowInMins,
          'longTermReservationPossible': this.longTermReservationPossible,
          'reservationCanBeBumped': this.reservationCanBeBumped,
          'expirationGracePeriodInMins': this.expirationGracePeriodInMins,
          'maxActiveReservationsPerUser': this.maxActiveReservationsPerUser,
          'maxReservationWindowInHrs': this.maxReservationWindowInHrs,
          'reservationReminderWindowInMins': this.reservationReminderWindowInMins,
          'sendReservationReminders': this.sendReservationReminders,
          'toCreateEventOnOtherUser': this.toCreateEventOnOtherUser
        };
        const prefernces = {
          'defaultLanguage': this.defaultLanguage,
          'defaultCurrency': this.defaultCurrency,
          'currencyFormat': this.currencyFormat,
          'dateFormat': this.dateFormat,
          'defaultTheme': this.defaultTheme,
          'defaultTimezone': this.defaultTimezone,
          'rowsPerPage': this.perpagecount
        };
        const syncCalendar = {
          'syncEnabled': this.syncEnabled,
          'calendarType': this.calendertype,
          'mail': this.mail
        };
        this.singleuserservices.createUser(this.token, enterprise, this.resource, this.userName.trim().replace(/\s\s+/g, ' '),
          this.urrole, this.enabled, this.email, prefernces, syncCalendar, settings, this.imgfile,
          enterpriseResourcesImageFilePath, enterpriseResourcesImageFileName)
          .subscribe(data => {
            if (data.statusCode === '1001') {
              this.hideUserModal();
              this.uploaded.emit('submit');
              this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
              this.toastr.success(this.toastermessage.value);
            } else {
              this.lggModal.hide();
              // this.toastr.error(data.message);
            }
          }, error => {
            const status = JSON.parse(error['status']);
            const statuscode = JSON.parse(error['_body']).statusCode;
            switch (status) {
              case 500:
                break;
              case 400:
                if (statuscode === '2033') {
                  this.error = 'COMMON_STATUS_CODES.' + statuscode;
                } else if (statuscode === '9961') {
                  this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                  this.toastr.success(this.toastermessage.value);
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                } break;
            }
          }
          );
      }
    } else if (this.actionName === 'Edit') {
      this.userInfoSubmit(this.selectedUserObj);
    }
  }

  /* To delete the user from user table */
  deleteUser() {
    this.singleuserservices.deleteUserInfo(this.selectedUserObj._id, this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.uploaded.emit();
          if (window.localStorage.getItem('advancedSearch') === 'advancedSearch') {
            window.localStorage.setItem('goToAdvance', 'goToAdvance');
            window.localStorage.removeItem('advancedSearch');
          } else if (window.localStorage.getItem('simpleSearch') === 'simpleSearch') {
            window.localStorage.setItem('goToSimple', 'goToSimple');
            window.localStorage.removeItem('simpleSearch');
          }
          this.lggModal.hide();
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
            } else if (statuscode === '2013') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } break;
        }
      }
      );
  }

  /* To block the user from user table */
  blockUser() {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      this.singleuserservices.blockUserInfo(this.selectedUserObj._id, this.token, this.reasonValue)
        .subscribe(data => {
          if (data.statusCode === '1001') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_BLOCK_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            if (window.localStorage.getItem('advancedSearch') === 'advancedSearch') {
              window.localStorage.setItem('goToAdvance', 'goToAdvance');
              window.localStorage.removeItem('advancedSearch');
            } else if (window.localStorage.getItem('simpleSearch') === 'simpleSearch') {
              window.localStorage.setItem('goToSimple', 'goToSimple');
              window.localStorage.removeItem('simpleSearch');
            } else {
              this.uploaded.emit();
            }
            this.lggModal.hide();
          }
        }, error => {
          switch (JSON.parse(error['_body']).statusCode) {
            case '9998':
              break;
            case '9995':
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              break;
            case '9997':
              break;
            case '2016':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
            case '9961':
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*---- To get reasons list   ---*/
  public getblockReasons() {
    this.singleuserservices.getLookupsList(this.token, 'ENTERPRISE_INACTIVATE_REASONS').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.reasons = data['result'];
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To get reasons list   ---*/
  public getunblockReasons() {
    this.singleuserservices.getLookupsList(this.token, 'ENTERPRISE_ACTIVATE_REASONS').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.reasons = data['result'];
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /* To block the user from user table */
  unblockUser() {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      this.singleuserservices.unblockUserInfo(this.selectedUserObj._id, this.token, this.reasonValue)
        .subscribe(data => {
          if (data.statusCode === '1001') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_UNBLOCK_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            if (window.localStorage.getItem('advancedSearch') === 'advancedSearch') {
              window.localStorage.removeItem('advancedSearch');
              window.localStorage.setItem('goToAdvance', 'goToAdvance');
            } else if (window.localStorage.getItem('simpleSearch') === 'simpleSearch') {
              window.localStorage.removeItem('simpleSearch');
              window.localStorage.setItem('goToSimple', 'goToSimple');
            } else {
              this.uploaded.emit();
            }
            window.localStorage.removeItem('advancedSearch');
            window.localStorage.removeItem('simpleSearch');
            this.lggModal.hide();
          }
        }, error => {
          const status = JSON.parse(error['status']);
          switch (status) {
            case '9998':
              break;
            case '9995':
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              break;
            case '9997':
              break;
            case '9961':
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /**--- This method is used to get the socialnetwork to sync calendar ---- */
  getsocialcalendar() {
    this.singleuserservices.getsocialnetworkcalendars(this.token)
      .subscribe(data => {
        this.socialcalendar = data['result'];
      }, error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }

  /* To change the usertype list */
  getChangeusertype(userType) {
    this.urType = userType;
  }

  /* To change the userStatus list */
  getChangeuserStatus(userstatus) {
    this.urstatus = userstatus;
  }

  /* To change the userRoles list */
  getChangeuserRoles(userRoles) {
    this.urrole = userRoles;
  }

  /* To change the Enabled list */
  getUserStatus(enable) {
    this.enabled = enable;
  }

  /* To get the EnterpriseResources list */
  getEnterpriseResources(type) {
    if (type === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.advancedReservationWindowInDays = window.localStorage.getItem('advancedReservationWindowInDays');
      this.earlyCheckinWindowInMins = window.localStorage.getItem('earlyCheckinWindowInMins');
      this.expirationGracePeriodInMins = window.localStorage.getItem('expirationGracePeriodInMins');
      this.maxActiveReservationsPerUser = window.localStorage.getItem('maxActiveReservationsPerUser');
      this.maxReservationWindowInHrs = window.localStorage.getItem('maxReservationWindowInHrs');
      this.reservationCanBeBumped = window.localStorage.getItem('reservationCanBeBumped');
      this.reservationCanBeBumped = JSON.parse(window.localStorage.getItem('reservationCanBeBumped'));
      this.sendReservationReminders = JSON.parse(window.localStorage.getItem('sendReservationReminders'));
      this.longTermReservationPossible = JSON.parse(window.localStorage.getItem('longTermReservationPossible'));
    } else {
      this.value = type.split('$');
      this.enterpriseId = this.value[0];
      this.enterprisesName = this.value[1];
      this.enterpriseIconFilePath = this.value[2] + '/' + this.value[9];
      this.imgSrc = this.apiEndPoint + '/' + this.enterpriseIconFilePath;
      this.defaultLanguage = this.value[3];
      this.defaultCurrency = this.value[4];
      this.defaultTheme = this.value[5];
      this.defaultTimezone = this.value[6];
      this.dateFormat = this.value[7];
      this.currencyFormat = this.value[8];
      this.advancedReservationWindowInDays = this.value[10];
      this.earlyCheckinWindowInMins = this.value[11];
      this.expirationGracePeriodInMins = this.value[12];
      this.maxActiveReservationsPerUser = this.value[13];
      this.maxReservationWindowInHrs = this.value[14];
      this.reservationReminderWindowInMins = this.value[15];
      this.reservationCanBeBumped = JSON.parse(this.value[16]);
      this.sendReservationReminders = JSON.parse(this.value[17]);
      this.longTermReservationPossible = JSON.parse(this.value[18]);
      this.firstName = '';
      this.lastName = '';
      this.userType = '';
      this.department = '';
      this.designation = '';
      this.gender = '';
      this.ssn = '';
      this.addressList.addressLine1 = '';
      this.addressList.addressLine2 = '';
      this.addressList.city = '';
      this.addressList.state = '';
      this.addressList.country = '';
      this.addressList.ZIP = '';
      this.email = '';
      this.supervisoremail = '';
      this.mobile = '';
      this.worknumber = '';
      this.workeumberext = '';
      this.resourcesList = [{}];
      this.resource = '';
      this.singleuserservices.getResources(this.token, this.enterpriseId)
        .subscribe(data => {
          this.resourcesList = data['result'];
        });
      if (this.enterpriseId === '') {
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      }
    }
  }

  /* To change the position list */
  getPosition(position) {
    this.urposition = position;
  }

  /* To change the language list */
  getLanguage(language) {
    this.defaultLanguage = language;
  }

  /* To change the Currency list */
  getCurrency(currency) {
    this.defaultCurrency = currency;
  }

  /* To change the Date Format list */
  getDateFormat(dateformat) {
    this.dateFormat = dateformat;
  }

  /* To change the Theme list */
  gettheme(theme) {
    this.defaultTheme = theme;
  }

  /* To change the Status list */
  getstatus(status) {
    this.urstatus = status;
  }
  /* To change the Country list */
  getcountry(country) {
    this.country = country;
  }

  /* To change the Department list */
  getdepartment(department) {
    this.Department = department;
  }

  /* To change the Department list */
  getTimezones(timezone) {
    this.defaultTimezone = timezone;
  }

  /* To change the Currency Format list */
  getCurrencyformat(currencyformat) {
    this.currencyFormat = currencyformat;
  }

  createpopup() {
    this.error = '';
    this.lggModal.show();
  }

  /*---- To upload the image ----*/
  imageUploaded(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.imgfile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.imgfile.size;
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgfile));
    setTimeout(() => {
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgfile));
    }, 500);
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    const size = (Math.round(fSize * 100) / 100);
    const bytes = fSExt[i];
    const pictype = this.imgfile.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/jpg', '/jpeg', '/gif', '/bmp', '/png'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      const index = myObj['imageTypes'][j].indexOf(extension);
      if (index > -1) {
        this.imageTypeError = false;
        this.error = '';
        if (this.imageMinSize > size || bytes !== 'KB') {
          this.imgStatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else if (size > this.imageMaxSize || bytes !== 'KB') {
          this.imgStatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else {
          this.imgStatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }
    if (this.actionName === 'Create') {
      const createuserimg = <HTMLInputElement>document.getElementById('createuserimg');
      let img = this.imgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.imgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.imgfile.name.split('.')[1];
        }
      }
      createuserimg.innerHTML = img;
    } else if (this.actionName === 'Edit') {
      const edituserimg = <HTMLInputElement>document.getElementById('edituserimg');
      let img = this.imgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.imgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.imgfile.name.split('.')[1];
        }
      }
      edituserimg.innerHTML = img;
    }
  }
  /** ----To get the list of social networks to sync calendar ----- */
  onchangesocialnetwork(value) {
    this.calendertype = value;
  }

  /**---- This method is used to reset input form details---- */
  formreset() {
    this.enterprisesName = '';
    this.enterpriseIconFilePath = '';
    this.urrole = '';
    this.userName = '';
    this.passWord = '';
    this.ConformPasswod = '';
    this.abtCurrency = '';
    this.currencyformat = '';
    this.abtLanguage = '';
    this.theme = '';
    this.abtDateFormat = '';
    this.timezone = '';
    this.enterprisesName = '';
    this.urrole = '';
    this.firstName = '';
    this.lastName = '';
    this.userType = '';
    this.department = '';
    this.designation = '';
    this.gender = '';
    this.ssn = '';
    this.addressList.addressLine1 = '';
    this.addressList.addressLine2 = '';
    this.addressList.city = '';
    this.addressList.state = '';
    this.addressList.country = '';
    this.addressList.ZIP = '';
    this.email = '';
    this.supervisoremail = '';
    this.mobile = '';
    this.worknumber = '';
    this.workeumberext = '';
    this.resourcesList = [{}];
    if (this.actiontype === 'Create') {
      this.timeZones = [{}];
      this.currencies = [{}];
      this.amountformats = [{}];
      this.advancedReservationWindowInDays = '';
      this.earlyCheckinWindowInMins = '';
      this.expirationGracePeriodInMins = '';
      this.maxActiveReservationsPerUser = '';
      this.maxReservationWindowInHrs = '';
      this.reservationReminderWindowInMins = '';
      this.reservationCanBeBumped = '';
      this.sendReservationReminders = '';
      this.longTermReservationPossible = '';
    }
  }

  public hideUserModal(): void {
    this.imgSrc = '';
    this.imgfile = '';
    this.clearmessage();
    this.formreset();
    this.lggModal.hide();
    this.syncEnabled = '';
  }
}

export class Address {
  public addressLine1: any;
  public addressLine2: any;
  public state: string;
  public city: string;
  public country: string;
  public ZIP: string;
}
