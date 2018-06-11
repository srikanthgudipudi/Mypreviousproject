/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/**
 * ngOnInit(): To load the content at loading time.
 * ngAfterContentChecked(): To Check the content.
 * viewProfile():  To view profile.
 * getNotifications(searchString): To Get Notifications.
 * changeLang(lang): To Change language.
 * notificationActive(): To get the unread notification count.
 * getLanguages(): To get languages based on country.
 * sidemenu(event, parentid): Side Nav Menu Expand and collapse.
 * logout(): To logout from the application.
 * getSecurityQuestions(): To get security questions.
 * getCurrencyFormat(): To get currency formates.
 * getCurrencys(): To get currencies.
 * getThemes(): To get themes list.
 * getRowsperPage(): To get rows per page.
 * getDateFormates(): To get date format based on country.
 * getTimeZones(): To get time zones.
 * getLanguage(language): To change the language list.
 * getCurrency(currency): To change the Currency list.
 * getDateFormat(dateformat): To change the Date Format list.
 * gettheme(selectedtheme): To change the Theme list.
 * changeTheme() : To get the changed theme.
 * themeApply(selectedtheme): To apply themes.
 * getTimezones(timezone): To change the Department list.
 * getsocialcalendar(): To get the social calander.
 * getCurrencyformat(currencyformat): To change the Currency Format list.
 * getupdatedrowsperpage(updaterowperpage): To get the selected rows per page.
 * getCountryCodes(): To get the country codes.
 * getSecurityQuestion1(securityQuestion1): To validate the security question1 with other questions.
 * getSecurityQuestion2(securityQuestion2): To validate the security question2 with other questions.
 * getSecurityQuestion3(securityQuestion3): To validate the security question3 with other questions.
 * getSecurityQuestion4(securityQuestion4): To validate the security question4 with other questions.
 * getSecurityQuestion5(securityQuestion5): To validate the security question5 with other questions.
 * questionSelected(questions): To get the selected question.
 * getMobileCountryCodeEdit(countryCode): To get Moblie Country Code values in Edit.
 * getCountryCodeEdit(countryCode): To get Work Country Code values in Edit.
 * hyphen_generate_worknum(value): To generate the hyphen in between the work number.
 * hyphen_generate_mobile(value): To generate hyphen in between the numbers.
 * onchangesocialnetwork(data): To get the list of social networks to sync calendar.
 * imageUploaded(event): To upload the image.
 * securityQuestion(): To get saved security questions and answers.
 * updateuserprofilesecurityquestions(): To update the security questions.
 * updateuserprofile(): To update the user profile.
 * handleEventClick(event): Method for handle Event click on calander.
 * handleDayClick(event): Method to handle the day click on calander.
 * getFleetReservationsList(): To get Fleet Reservations List.
 * clearmessage(): To clear the messages.
 * hideUserModal(): To hide the user profile.
 * hidembsidebar(): To hide the slide menu bar.
 */

import { Component, OnInit, Inject, AfterContentChecked, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr';
import 'fullcalendar';
import * as moment from 'moment/moment';
import { LoginService } from '../../app/pages/login/login.service';
import { Enterpriseservice } from '../admin/enterprises/enterprisepopup/enterprise.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Userservice } from '../admin/users/userpopup/user.service';
import { FleetReservationsService } from '../transactions/fleetreservations/fleetreservationlist/fleetreservations.service';

export function createTranslateLoader(http: Http, prefix: string) {
  return new TranslateStaticLoader(http, prefix, '.json');
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
  providers: [LoginService, NotificationsService, Enterpriseservice, Userservice, FleetReservationsService, {
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
  }
  ]
})

export class FullLayoutComponent implements OnInit, AfterContentChecked {
  userrolesListright: any;
  userToken: any;
  data: any;
  errorMessage: string;
  loginhistoryliststatus: any;
  usersliststatus: any;
  enterprisesliststatus: any;
  fleetTypeAttributesliststatus: any;
  liststatus: any;
  fleetliststatus: any;
  userImage: any;
  resorceliststatus: any;
  lookupliststatus: any;
  notificationliststatus: any;
  universeimgliststatus: any;
  advtliststatus: any;
  toastermessage: any;
  userName: any;
  importliststatus: any;
  staticcontentliststatus: any;
  eventliststatus: any;
  eventregistrationliststatus: any;
  fleetreservationliststatus: any;
  notificationCount: any;
  language: any;
  count: any;
  enterpriseImage: any;
  msgliststatus: any;
  languageactive: string;
  pagename: string;
  langcode: string;
  public error: any = '';
  userAccount: any;
  userData: any;
  actionName: any;
  worknumbercntrycode: any;
  mobile: any;
  worknumber: any;
  userIcon: any = '';
  imgSrc: any = '';
  imagename: any;
  advancedReservationWindowInDays: any;
  checkinRequired: any;
  earlyCheckinWindowInMins: any;
  reservationCanBeBumped: any;
  longTermReservationEligible: any;
  expirationGracePeriodInMins: any;
  maxActiveReservationsPerUser: any;
  maxReservationWindowInHrs: any;
  reservationReminderWindowInMins: any;
  sendReservationReminders: any;
  securityQuestionsDetails: any;
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
  amountformats: any;
  currencies: any[];
  themes: any;
  rowsPerpage: any;
  perpagecount: any;
  datefomat: any[];
  timeZones: any[];
  languages: any[];
  loginUserDateFormat: any;
  updateAt: any;
  createAt: any;
  timezoneCode: any;
  defaultCurrency: any;
  currencyFormat: any;
  dateFormat: any;
  defaultTheme: any;
  defaultTimezone: any;
  updatedrowsperpage: any;
  imageTypeError: any = false;
  imgStatus: any = false;
  errMsg1: any;
  errMsg2: any;
  imgfile: any = '';
  mobileCountryCode: any;
  countryCodes: any;
  mobileCountryCodeEdit: any;
  countryCodeEdit: any;
  feedbackliststatus: any;
  helpliststatus: any;
  ext: any = '';
  allFleetReservationsList: any;
  events: any = [];
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  loginUserTheme: any;
  headerConfig: any;
  questionslist: any;
  questionscount: any = 0;
  questions: any;
  answers: any;
  count1: any = 0;
  count2: any = 0;
  count3: any = 0;
  count4: any = 0;
  count5: any = 0;
  error1: any;
  error2: any;
  billpaymentliststatus: any;
  enetrprisecontractstatus: any;
  displaymapliststatus: any;
  callhistoryliststatus: any;
  createsecurityQuestionsDetails: any[];
  storage: any;
  socialnw: any;
  mail: any = '';
  calendertype: any = '';
  socialcalendar: any;
  syncEnabled: any;
  enterprisecontractsliststatus: any;
  selectedDate: any;
  fleettypesliststatus: any;
  profiledefaultLanguage: any;
  fleetCommonName: any;
  fleetsCommonName: any;
  pickticketsliststatus: any;
  disrections: any;
  distance: any;
  duration: any;
  userrole: any;
  toCreateEventOnOtherUser: any;
  @ViewChild('mgModal') public childModal: ModalDirective;
  public status: { isopen: boolean } = { isopen: false };

  /**--- Constructor for Full layout component ----*/
  constructor(private router: Router,
    private sanitizer: DomSanitizer,
    public toastr: ToastsManager,
    private singleuserservices: Userservice,
    private translateService: TranslateService,
    private notificationService: NotificationsService,
    private translate: TranslateService,
    private fleetReservationsService: FleetReservationsService,
    private singleEnterpriseService: Enterpriseservice,
    private tanslate: TranslateService, private loginService: LoginService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('deflanguagecode') private defaultlangaugecode: string,
    @Inject('defcountrycode') private defcountrycode: string,
    @Inject('defaultLanguage') public defaultLanguage: string,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number) { }
  public toggled(open: boolean): void {
  }

  /**----- To load the content at loading time ----*/
  ngOnInit(): void {
    this.pickticketsliststatus = window.localStorage.getItem('pickticketsliststatus');
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userName = window.localStorage.getItem('first_name');
    this.userImage = this.apiEndPoint + '/' + window.localStorage.getItem('UserImage');
    this.userToken = window.localStorage.getItem('token');
    this.fleetliststatus = localStorage.getItem('fleetliststatus');
    this.loginhistoryliststatus = window.localStorage.getItem('loginhistoryliststatus');
    this.usersliststatus = window.localStorage.getItem('usersliststatus');
    this.enterprisesliststatus = window.localStorage.getItem('enterprisesliststatus');
    this.fleetTypeAttributesliststatus = window.localStorage.getItem('fleetTypeAttributesliststatus');
    this.userrolesListright = window.localStorage.getItem('roleRightsListstatus');
    this.userrole = window.localStorage.getItem('userrole');
    this.fleetreservationliststatus = window.localStorage.getItem('fleetreservationliststatus');
    this.eventregistrationliststatus = window.localStorage.getItem('eventregistrationliststatus');
    this.liststatus = window.localStorage.getItem('funfactsliststatus');
    this.resorceliststatus = window.localStorage.getItem('resourceliststatus');
    this.lookupliststatus = window.localStorage.getItem('lookupliststatus');
    this.notificationliststatus = window.localStorage.getItem('notificationliststatus');
    this.universeimgliststatus = window.localStorage.getItem('universalimgliststatus');
    this.advtliststatus = window.localStorage.getItem('advtsliststatus');
    this.importliststatus = window.localStorage.getItem('importviewstatus');
    this.staticcontentliststatus = window.localStorage.getItem('staticcontentliststatus');
    this.eventliststatus = window.localStorage.getItem('eventliststatus');
    this.msgliststatus = window.localStorage.getItem('msghistoryliststatus');
    this.enterpriseImage = this.apiEndPoint + '/' + window.localStorage.getItem('EnterpriseImage');
    this.defaultLanguage = window.localStorage.getItem('loginUserLanguage');
    this.changeLang(window.localStorage.getItem('loginUserLanguage'));
    this.userAccount = window.localStorage.getItem('user_Account');
    this.advancedReservationWindowInDays = window.localStorage.getItem('advancedReservationWindowInDays');
    this.earlyCheckinWindowInMins = window.localStorage.getItem('earlyCheckinWindowInMins');
    this.expirationGracePeriodInMins = window.localStorage.getItem('expirationGracePeriodInMins');
    this.maxActiveReservationsPerUser = window.localStorage.getItem('maxActiveReservationsPerUser');
    this.maxReservationWindowInHrs = window.localStorage.getItem('maxReservationWindowInHrs');
    this.reservationCanBeBumped = window.localStorage.getItem('reservationCanBeBumped');
    this.reservationReminderWindowInMins = window.localStorage.getItem('reservationReminderWindowInMins');
    this.sendReservationReminders = window.localStorage.getItem('sendReservationReminders');
    this.feedbackliststatus = window.localStorage.getItem('feedbackliststatus');
    this.helpliststatus = window.localStorage.getItem('helpliststatus');
    this.defaultTheme = window.localStorage.getItem('loginUserTheme');
    this.billpaymentliststatus = window.localStorage.getItem('billpaymentliststatus');
    this.enetrprisecontractstatus = window.localStorage.getItem('enterprisecontractsliststatus');
    this.displaymapliststatus = window.localStorage.getItem('displaymapliststatus');
    this.callhistoryliststatus = window.localStorage.getItem('callhistoryliststatus');
    this.enterprisecontractsliststatus = window.localStorage.getItem('enterprisecontractsliststatus');
    this.fleettypesliststatus = window.localStorage.getItem('fleettypesliststatus');
    
    this.getNotifications('');
    this.getLanguages();
    this.changeTheme();
    this.getsocialcalendar();
    this.themeApply(this.defaultTheme);
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.getFleetReservationsList();
    this.headerConfig = {
      left: 'prev',
      center: 'title',
      right: 'next'
    };
  }

  /**---- To Check the content ----*/
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.notificationCount = window.localStorage.getItem('notificationcount');
    if (this.notificationCount === '' || this.notificationCount === null || this.notificationCount === undefined) {
      this.notificationCount = 0;
    }
  }

  /* ---- To view profile ---- */
  viewProfile() {
    this.getCurrencyFormat();
    this.getCurrencys();
    this.getRowsperPage();
    this.getDateFormates();
    this.getTimeZones();
    this.getThemes();
    this.securityQuestion();
    this.getCountryCodes();
    this.getSecurityQuestions();
    this.createsecurityQuestionsDetails = [];
    this.questions = [];
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0;
    this.singleuserservices.userProfile(this.userToken)
      .subscribe(
      data => {
        this.userData = data['result'][0];
        this.checkinRequired = this.userData.settings.checkinRequired;
        this.profiledefaultLanguage = this.userData.preferences.defaultLanguage;
        this.defaultCurrency = this.userData.preferences.defaultCurrency;
        this.currencyFormat = this.userData.preferences.currencyFormat;
        this.dateFormat = this.userData.preferences.dateFormat;
        this.defaultTheme = this.userData.preferences.defaultTheme;
        this.defaultTimezone = this.userData.preferences.defaultTimezone;
        this.defaultTimezone = this.defaultTimezone.replace('%2B', '+');
        this.updatedrowsperpage = this.userData.preferences.rowsPerPage;
        this.maxActiveReservationsPerUser = this.userData.settings.maxActiveReservationsPerUser;
        this.advancedReservationWindowInDays = this.userData.settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = this.userData.settings.earlyCheckinWindowInMins;
        this.longTermReservationEligible = this.userData.settings.longTermReservationEligible;
        this.reservationCanBeBumped = this.userData.settings.reservationCanBeBumped;
        this.sendReservationReminders = this.userData.settings.sendReservationReminders;
        this.toCreateEventOnOtherUser = this.userData.settings.toCreateEventOnOtherUser;
        this.maxReservationWindowInHrs = this.userData.settings.maxReservationWindowInHrs;
        this.expirationGracePeriodInMins = this.userData.settings.expirationGracePeriodInMins;
        this.reservationReminderWindowInMins = this.userData.settings.reservationReminderWindowInMins;
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.timezoneCode = this.timezoneCode.split('-');
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
        if (this.utctimezonestring.charAt(0) === '+') {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.userData.createdAt = moment(this.userData.createdAt).utc().add(utctimesplit[0], 'hours');
          this.userData.createdAt = moment(this.userData.createdAt).add(utctimesplit[1], 'minutes');
          this.userData.updatedAt = moment(this.userData.updatedAt).utc().add(utctimesplit[0], 'hours');
          this.userData.updatedAt = moment(this.userData.updatedAt).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.userData.createdAt = moment(this.userData.createdAt).utc().subtract(utctimesplit[0], 'hours');
          this.userData.createdAt = moment(this.userData.createdAt).subtract(utctimesplit[1], 'minutes');
          this.userData.updatedAt = moment(this.userData.updatedAt).utc().subtract(utctimesplit[0], 'hours');
          this.userData.updatedAt = moment(this.userData.updatedAt).subtract(utctimesplit[1], 'minutes');
        }
        this.updateAt = moment(this.userData.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
        this.createAt = moment(this.userData.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
        this.countryCodeEdit = this.userData.enterpriseResourceObj.contactDetails.workNumberCountrycode;
        this.ext = this.userData.enterpriseResourceObj.contactDetails.workNumberExtn;
        this.mobileCountryCodeEdit = this.userData.enterpriseResourceObj.contactDetails.mobileNumberCountrycode;
        this.mobile = this.userData.enterpriseResourceObj.contactDetails.mobileNumber;
        this.worknumber = this.userData.enterpriseResourceObj.contactDetails.workNumber;
        this.mail = this.userData.syncCalendar.mail;
        this.socialnw = this.userData.syncCalendar.calendarType;
        this.userIcon = this.userData.enterpriseResourceObj.enterpriseResourcesImageFileName;
        if (this.userIcon === null) {
          this.userIcon = this.userData.enterpriseResourceObj.enterprise.enterpriseId.enterpriseIcon;
          this.imgSrc = this.apiEndPoint + '/' + this.userData.enterpriseResourceObj.enterprise.enterpriseId.enterpriseIconFilePath + '/'
            + this.userIcon;
          this.imagename = this.userIcon.split('.');
          if (this.imagename[0].length > 30) {
            const imgname = this.imagename.toString();
            this.userIcon = imgname.substring(0, 30) + '...' + this.imagename[1];
          }
        } else {
          this.imgSrc = this.apiEndPoint + '/' + this.userData.enterpriseResourceObj.enterpriseResourcesImageFilePath + '/'
            + this.userIcon;
          this.userIcon = this.userData.enterpriseResourceObj.enterpriseResourcesImageFileName;
          this.imagename = this.userIcon.split('.');
          if (this.imagename[0].length > 30) {
            const imgname = this.imagename.toString();
            this.userIcon = imgname.substring(0, 30) + '...' + this.imagename[1];
          }
        }
        this.syncEnabled = this.userData.syncCalendar.syncEnabled;
      },
      error => this.errorMessage = <any>error);
  }

  /*----- To Get Notifications ------ */
  getNotifications(searchString) {
    this.count = 0;
    const userToken = window.localStorage.getItem('token');
    this.notificationService.getNotifications(userToken, searchString).subscribe(
      notifications => {
        for (let i = 0; i < notifications['result'].length; i++) {
          if (notifications['result'][i].readStatus === 'Unread') {
            this.count = this.count + 1;
          }
        }
        window.localStorage.setItem('notificationcount', this.count);
        window.localStorage.setItem('notificationActive', 'Active');
        if (this.count > 99) {
          window.localStorage.setItem('notificationcount', '99+');
        } else {
          window.localStorage.setItem('notificationcount', this.count + '');
        }
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  /**----- To Change language ----- */
  changeLang(lang) {
    const language = lang.split('(')[0];
    const langcode = lang.split('(')[1];
    this.langcode = language;
    const languagecode = langcode.split(')')[0].toLowerCase();
    window.localStorage.setItem('loginUserLanguage', lang);
    this.FleetCommonNameTranslation(this.langcode.toLowerCase());
    this.languageactive = language;
    this.disrections = this.translateService.get('MAP.DIRECTIONS');
    localStorage.setItem('directions', this.disrections.value);
    this.distance = this.translateService.get('MAP.DISTANCE');
    localStorage.setItem('distance', this.distance.value);
    this.duration = this.translateService.get('MAP.DURATION');
    localStorage.setItem('duration', this.duration.value);
    this.translate.use(languagecode);

  }
  FleetCommonNameTranslation(lang) {
    const fleetCommonNameData = {
      'fleet': window.localStorage.getItem('fleetCommonName'),
      'fleets': window.localStorage.getItem('fleetCommonName') + 's'
    };
    this.singleuserservices.FleetCommonNameTranslation(window.localStorage.getItem('token'), fleetCommonNameData, lang).subscribe(
      data => {
        window.localStorage.setItem('fleetTranslation', data['result'][0].fleet);
        window.localStorage.setItem('fleetsTranslation', data['result'][1].fleets);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }
  /**---- To get the unread notification count ----*/
  notificationActive() {
    window.localStorage.setItem('notificationActive', 'Active');
  }

  /*---- To get languages based on country   ---*/
  public getLanguages() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'LANGUAGES').subscribe(
      data => {
        this.disrections = this.translateService.get('MAP.DIRECTIONS');
        localStorage.setItem('directions', this.disrections.value);
        this.languages = data['result'];
        this.language = data['result'];
      },
      error => {
      }
    );
  }

  /** ----- Side Nav Menu Expand and collapse----- */
  sidemenu(event, parentid) {
    const openIndex = document.getElementById(parentid).classList.toString().indexOf('open');
    const x = document.getElementsByClassName('nav-dropdown');
    let i: number;
    const num = 0;
    for (i = num; i < x.length; i++) {
      document.getElementById(x[i].id).classList.remove('open');
    }
    if (openIndex === -1) {
      document.getElementById(parentid).classList.add('open');
    } else {
      document.getElementById(parentid).classList.remove('open');
    }
  }

  /** ----- To logout from the application ----- */
  logout() {
    this.loginService.logout(this.userToken)
      .subscribe(
      data => {
        this.data = data['result'];
        window.localStorage.clear();
        this.router.navigate(['']);
      },
      error => this.errorMessage = <any>error);
  }

  /**---- To get security questions ----*/
  public getSecurityQuestions() {
    this.singleuserservices.getLookupsList(window.localStorage.getItem('token'), 'SECRET_QUESTIONS').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.questionslist = data['result'];
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /**---- To get currency formates ----*/
  getCurrencyFormat() {
    this.singleuserservices.getLookupsList(this.userToken, 'AMOUNT_FORMATS')
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

  /**---- To get currencies ----*/
  public getCurrencys() {
    this.singleuserservices.getLookupsList(this.userToken, 'CURRENCIES').subscribe(
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
              // this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              // this.toastr.success(this.toastermessage.value);
              // this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To get themes list   ---*/
  public getThemes() {
    this.singleuserservices.getLookupsList(this.userToken, 'UI_THEMES').subscribe(
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /**---- To get rows per page ----*/
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /*---- To get date format based on country   ---*/
  public getDateFormates() {
    this.singleuserservices.getLookupsList(this.userToken, 'DATE_FORMATS').subscribe(
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /**---- To get time zones ----*/
  public getTimeZones() {
    this.singleuserservices.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /**--- To change the language list ----*/
  getLanguage(language) {
    this.profiledefaultLanguage = language;
  }

  /*---- To change the Currency list ----*/
  getCurrency(currency) {
    this.defaultCurrency = currency;
  }

  /**----- To change the Date Format list ----*/
  getDateFormat(dateformat) {
    this.dateFormat = dateformat;
  }

  /**---- To change the Theme list ----*/
  gettheme(selectedtheme) {
    this.defaultTheme = selectedtheme;
  }

  /**---- To get the changed theme ----*/
  changeTheme() {
    const theme = <HTMLLinkElement>document.getElementById('themeId');
    if (this.defaultTheme === 'Theme1') {
      theme.href = '/assets/css/theme.css';
    } else if (this.defaultTheme === 'Plumpie') {
      theme.href = '/assets/css/theme1.css';
    } else if (this.defaultTheme === 'Darkslateblue') {
      theme.href = '/assets/css/theme2.css';
    } else if (this.defaultTheme === 'Ferngreen') {
      theme.href = '/assets/css/theme3.css';
    } else if (this.defaultTheme === 'Darkseagreen') {
      theme.href = '/assets/css/theme4.css';
    } else {
      theme.href = '/assets/css/theme.css';
    }
  }

  /**--- To apply themes ----*/
  themeApply(selectedtheme) {
    this.defaultTheme = selectedtheme;
    const theme = <HTMLLinkElement>document.getElementById('themeId');
    if (this.defaultTheme === 'Gunmetal') {
      theme.href = '/assets/css/theme.css';
    } else if (this.defaultTheme === 'Plum-Pie') {
      theme.href = '/assets/css/theme1.css';
    } else if (this.defaultTheme === 'Dark-Slate-Blue') {
      theme.href = '/assets/css/theme2.css';
    } else if (this.defaultTheme === 'Fern-Green') {
      theme.href = '/assets/css/theme3.css';
    } else if (this.defaultTheme === 'Dark-Sea-Green') {
      theme.href = '/assets/css/theme4.css';
    } else {
      theme.href = '/assets/css/theme.css';
    }
  }

  /**---- To change the Department list ----*/
  getTimezones(timezone) {
    this.defaultTimezone = timezone;
  }

  /**---- To get the social calander ----*/
  getsocialcalendar() {
    this.singleuserservices.getsocialnetworkcalendars(this.userToken)
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

  /**---- To change the Currency Format list ----*/
  getCurrencyformat(currencyformat) {
    this.currencyFormat = currencyformat;
  }

  /**--- To get the selected rows per page ----*/
  getupdatedrowsperpage(updaterowperpage) {
    this.updatedrowsperpage = updaterowperpage;
  }

  /**---- To get the country codes ----*/
  public getCountryCodes() {
    this.singleuserservices.getLookupsList(this.userToken, 'COUNTRY_CODES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.countryCodes = data['result'];
          this.mobileCountryCode = data['result'][0].lookupName;
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
    );
  }

  /**---- To validate the security question1 with other questions ----*/
  getSecurityQuestion1(securityQuestion1) {
    if (securityQuestion1 !== '') {
      this.questionscount = this.questionscount + 1;
      this.count1 = this.count1 + 1;
      if (this.count1 > 1) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 1) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion1 = securityQuestion1;
      this.questions.push({ 'key': 1, 'question': this.securityQuestion1 });
      if (this.questions.length > 1) {
        this.questionSelected(this.questions);
      }
    } else {
      if (this.count1 > 0) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 1) {
            this.questions.splice(i, 1);
            this.count1 = this.count1 - 1;
            break;
          }
        }
      }
      this.securityQuestion1 = securityQuestion1;
      this.questionscount = this.questionscount - 1;
    }
  }

  /**---- To validate the security question2 with other questions ----*/
  getSecurityQuestion2(securityQuestion2) {
    if (securityQuestion2 !== '') {
      this.count2 = this.count2 + 1;
      if (this.count2 > 1) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 2) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion2 = securityQuestion2;
      this.questionscount = this.questionscount + 1;
      this.questions.push({ 'key': 2, 'question': this.securityQuestion2 });
      if (this.questions.length > 1) {
        this.questionSelected(this.questions);
      }
    } else {
      if (this.count2 > 0) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 2) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion2 = securityQuestion2;
      this.questionscount = this.questionscount - 1;
    }
  }

  /**---- To validate the security question3 with other questions ----*/
  getSecurityQuestion3(securityQuestion3) {
    if (securityQuestion3 !== '') {
      this.count3 = this.count3 + 1;
      if (this.count3 > 1) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 3) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion3 = securityQuestion3;
      this.questionscount = this.questionscount + 1;
      this.questions.push({ 'key': 3, 'question': this.securityQuestion3 });
      if (this.questions.length > 1) {
        this.questionSelected(this.questions);
      }
    } else {
      if (this.count3 > 0) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 3) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion3 = securityQuestion3;
      this.questionscount = this.questionscount - 1;
    }
  }
  /**---- To validate the security question4 with other questions ----*/
  getSecurityQuestion4(securityQuestion4) {
    if (securityQuestion4 !== '') {
      this.count4 = this.count4 + 1;
      if (this.count4 > 1) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 4) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion4 = securityQuestion4;
      this.questionscount = this.questionscount + 1;
      this.questions.push({ 'key': 4, 'question': this.securityQuestion4 });
      if (this.questions.length > 1) {
        this.questionSelected(this.questions);
      }
    } else {
      if (this.count4 > 0) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 4) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion4 = securityQuestion4;
      this.questionscount = this.questionscount - 1;
    }
  }

  /**---- To validate the security question5 with other questions ----*/
  getSecurityQuestion5(securityQuestion5) {
    if (securityQuestion5 !== '') {
      this.count5 = this.count5 + 1;
      if (this.count5 > 1) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 5) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion5 = securityQuestion5;
      this.questionscount = this.questionscount + 1;
      this.questions.push({ 'key': 5, 'question': this.securityQuestion5 });
      if (this.questions.length > 1) {
        this.questionSelected(this.questions);
      }
    } else {
      if (this.count5 > 0) {
        for (let i = 0; i < this.questions.length; i++) {
          if (this.questions[i].key === 5) {
            this.questions.splice(i, 1);
            break;
          }
        }
      }
      this.securityQuestion5 = securityQuestion5;
      this.questionscount = this.questionscount - 1;
    }
  }

  /**---- To get the selected question ----*/
  questionSelected(questions) {
    this.error = '';
    if (questions !== undefined && questions !== []) {
      for (let i = 0; i < this.questions.length - 1; i++) {
        for (let j = i + 1; j < this.questions.length; j++) {
          if (questions[i].question === questions[j].question) {
            this.error1 = this.translateService.get('COMMON_SECURITY_QUESTIONS_BLOCK.QUESTION');
            this.error2 = this.translateService.get('COMMON_SECURITY_QUESTIONS_BLOCK.VALID_QUESTIONS_TO_SELECT');
            this.error = this.error1.value + ' ' + questions[i].key + ' & ' + questions[j].key + this.error2.value;
            break;
          }
        }
      }
    }
  }

  /*---- To get Moblie Country Code values in Edit ----*/
  getMobileCountryCodeEdit(countryCode) {
    this.mobileCountryCodeEdit = countryCode;
  }

  /*---- To get Work Country Code values in Edit ----*/
  getCountryCodeEdit(countryCode) {
    this.countryCodeEdit = countryCode;
  }

  /**---- To generate the hyphen in between the work number ----*/
  hyphen_generate_worknum(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('worknumber_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('worknumber_id')).value = value.concat('-');
    }
  }

  /**---- To generate hyphen in between the numbers ----*/
  hyphen_generate_mobile(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('mobile_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('mobile_id')).value = value.concat('-');
    }
  }

  /** ---- To get the list of social networks to sync calendar ----- */
  onchangesocialnetwork(data) {
    this.calendertype = data;
  }

  /**---- To upload the image ----*/
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
  }

  /**---- To get saved security questions and answers ----*/
  securityQuestion() {
    this.singleuserservices.securityQuestion(this.userAccount, window.localStorage.getItem('token'))
      .subscribe(
      securityQuestionsDetails => {
        this.actionName = 'View';
        this.childModal.show();
        this.securityQuestionsDetails = securityQuestionsDetails['result'];
        if (this.securityQuestionsDetails.length !== 0) {
          this.securityQuestionsTab = true;
          this.securityQuestion1 = this.securityQuestionsDetails[0].question;
          this.questions.push({ 'key': 1, 'question': this.securityQuestion1 });
          this.answer1 = this.securityQuestionsDetails[0].answer;
          this.securityQuestion2 = this.securityQuestionsDetails[1].question;
          this.questions.push({ 'key': 2, 'question': this.securityQuestion2 });
          this.answer2 = this.securityQuestionsDetails[1].answer;
          this.securityQuestion3 = this.securityQuestionsDetails[2].question;
          this.questions.push({ 'key': 3, 'question': this.securityQuestion3 });
          this.answer3 = this.securityQuestionsDetails[2].answer;
          this.securityQuestion4 = this.securityQuestionsDetails[3].question;
          this.questions.push({ 'key': 4, 'question': this.securityQuestion4 });
          this.answer4 = this.securityQuestionsDetails[3].answer;
          this.securityQuestion5 = this.securityQuestionsDetails[4].question;
          this.questions.push({ 'key': 5, 'question': this.securityQuestion5 });
          this.answer5 = this.securityQuestionsDetails[4].answer;
          this.count1 = 1;
          this.count2 = 1;
          this.count3 = 1;
          this.count4 = 1;
          this.count5 = 1;
        } else {
          this.securityQuestionsTab = false;
          this.securityQuestionsDetails = [];
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
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
      );
  }

  /**---- To update the security questions ----*/
  updateuserprofilesecurityquestions() {
    this.questionscount = 1;
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ((this.mobile === '' || this.mobile === undefined) &&
      (this.mobileCountryCodeEdit !== '' && this.mobileCountryCodeEdit !== undefined)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE#';
    } else if (this.mobile.length < 12) {
      this.error = 'LOGIN.MOBILENO_INVALID';
    } else if ((this.countryCodeEdit !== '' && this.countryCodeEdit !== undefined) &&
      (this.worknumber === '' || this.worknumber === undefined)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.userData.enterpriseResourceObj.contactDetails.email === ''
      || this.userData.enterpriseResourceObj.contactDetails.email === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!EMAIL_REGEXP.test(this.userData.enterpriseResourceObj.contactDetails.email)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.mail !== '' && this.mail !== undefined
      && !EMAIL_REGEXP.test(this.mail)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else {
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
          this.securityQuestionsDetails[0].question = this.securityQuestion1;
          this.securityQuestionsDetails[1].question = this.securityQuestion2;
          this.securityQuestionsDetails[2].question = this.securityQuestion3;
          this.securityQuestionsDetails[3].question = this.securityQuestion4;
          this.securityQuestionsDetails[4].question = this.securityQuestion5;
          this.securityQuestionsDetails[0].answer = this.answer1;
          this.securityQuestionsDetails[1].answer = this.answer2;
          this.securityQuestionsDetails[2].answer = this.answer3;
          this.securityQuestionsDetails[3].answer = this.answer4;
          this.securityQuestionsDetails[4].answer = this.answer5;
          this.singleuserservices.updateSecurityQuestionsprofile(this.userAccount, this.securityQuestionsDetails, this.userToken).
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
                    this.router.navigate(['/pages/login']);
                  } break;
              }
            }
            );
          this.updateuserprofile();
        }
      } else if (this.securityQuestionsTab === false && this.questionscount > 0) {
        if (this.securityQuestion1 === '' || this.securityQuestion1 === undefined || this.securityQuestion1 === null) {
          this.error = 'Please enter Question1';
        } else if (this.answer1 === '' || this.answer1 === undefined || this.answer1.trim() === null) {
          this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER1';
        } else if (this.securityQuestion2 === '' || this.securityQuestion2 === undefined || this.securityQuestion2 === null) {
          this.error = 'Please enter Question2';
        } else if (this.answer2 === '' || this.answer2 === undefined || this.answer2.trim() === null) {
          this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER2';
        } else if (this.securityQuestion3 === '' || this.securityQuestion3 === undefined || this.securityQuestion3 === null) {
          this.error = 'Please enter Question3';
        } else if (this.answer3 === '' || this.answer3 === undefined || this.answer3.trim() === null) {
          this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER3';
        } else if (this.securityQuestion4 === '' || this.securityQuestion4 === undefined || this.securityQuestion4 === null) {
          this.error = 'Please enter Question4';
        } else if (this.answer4 === '' || this.answer4 === undefined || this.answer4.trim() === null) {
          this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER4';
        } else if (this.securityQuestion5 === '' || this.securityQuestion5 === undefined || this.securityQuestion5 === null) {
          this.error = 'Please enter Question5';
        } else if (this.answer5 === '' || this.answer5 === undefined || this.answer5.trim() === null) {
          this.error = 'COMMON_SECURITY_QUESTIONS_BLOCK.PLEASE_ENTER_ANSWER5';
        } else {
          this.createsecurityQuestionsDetails.push({ 'key': 1, 'question': this.securityQuestion1, 'answer': this.answer1 });
          this.createsecurityQuestionsDetails.push({ 'key': 2, 'question': this.securityQuestion2, 'answer': this.answer2 });
          this.createsecurityQuestionsDetails.push({ 'key': 3, 'question': this.securityQuestion3, 'answer': this.answer3 });
          this.createsecurityQuestionsDetails.push({ 'key': 4, 'question': this.securityQuestion4, 'answer': this.answer4 });
          this.createsecurityQuestionsDetails.push({ 'key': 5, 'question': this.securityQuestion5, 'answer': this.answer5 });
          this.singleuserservices.createSecurityQuestions(this.userAccount, this.createsecurityQuestionsDetails, this.userToken).
            subscribe(
            data => {
              this.hideUserModal();
              this.updateuserprofile();
            },
            error => {
              const status = JSON.parse(error['status']);
              const statuscode = JSON.parse(error['_body']).status;
              switch (status) {
                case 500:
                  break;
                case 400:
                  if (statuscode === '9961') {
                    this.router.navigate(['/pages/login']);
                  } break;
              }
            }
            );
        }
      } else {
        this.updateuserprofile();
      }
    }
  }

  /**---- To update the user profile ----*/
  updateuserprofile() {
    this.defaultTimezone = this.defaultTimezone.replace('+', '%2B');
    this.userData.preferences = {
      'defaultLanguage': this.profiledefaultLanguage,
      'defaultCurrency': this.defaultCurrency,
      'currencyFormat': this.currencyFormat,
      'dateFormat': this.dateFormat,
      'defaultTheme': this.defaultTheme,
      'defaultTimezone': this.defaultTimezone,
      'rowsPerPage': this.updatedrowsperpage
    };
    this.userData.syncCalendar = {
      'calendarType': this.calendertype,
      'mail': this.mail,
      'syncEnabled': this.syncEnabled
    };
    this.userData.enterpriseResourceObj.contactDetails.mobileNumberCountrycode = this.mobileCountryCodeEdit;
    this.userData.enterpriseResourceObj.contactDetails.mobileNumber = this.mobile.trim().replace(/\s\s+/g, ' ');
    this.userData.enterpriseResourceObj.contactDetails.workNumber = this.worknumber;
    this.userData.enterpriseResourceObj.contactDetails.workNumberExtn = this.ext;
    this.userData.enterpriseResourceObj.contactDetails.workNumberCountrycode = this.countryCodeEdit;
    this.userData.EnterpriseResources = this.userData.enterpriseResourceObj;
    if (this.error === '') {
      this.singleuserservices.updateUserProfile(this.userData, this.imgfile, this.userToken)
        .subscribe(data => {
          window.localStorage.setItem('loginUserTheme', this.defaultTheme);
          window.localStorage.setItem('loginUserTimezone', this.defaultTimezone.replace('%2B', '+'));
          window.localStorage.setItem('loginUserDateFormat', this.dateFormat);
          window.localStorage.setItem('loginUserLanguage', this.profiledefaultLanguage);
          this.defaultLanguage = this.profiledefaultLanguage;
          this.changeLang(this.defaultLanguage);
          this.themeApply(this.defaultTheme);
          this.childModal.hide();
        });
    }
  }

  /**---- Method for handle Event click on calander ----*/
  handleEventClick(event) {
    this.router.navigate(['/calendar']);
    this.hidembsidebar();
  }

  /**--- Method to handle the day click on calander ----*/
  handleDayClick(event) {
    const stdate = moment(event.date._d).format('YYYY-MM-DD HH:mm');
    /*  if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.selectedDate = moment(stdate).add(utctimesplit[0], 'hours');
        this.selectedDate = moment(this.selectedDate).add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.selectedDate = moment(stdate).subtract(utctimesplit[0], 'hours');
        this.selectedDate = moment(this.selectedDate).subtract(utctimesplit[1], 'minutes');
      }*/
    this.selectedDate = moment(stdate).add(5, 'hours');
    window.localStorage.setItem('calendarDate', 'clicked');
    window.localStorage.setItem('clickedDate', moment(this.selectedDate).format('YYYY-MM-DD'));
    this.router.navigate(['/calendar']);
  }

  /*---- To get Fleet Reservations List ----*/
  getFleetReservationsList() {
    this.fleetReservationsService.getFleetReservationListForCalendar(this.userToken)
      .subscribe(
      allFleetReservationsList => {
        const eventObjList = [];
        for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
          // if (this.utctimezonestring.charAt(0) === '+') {
          //   const utctime = this.utctimezone.split('+');
          //   const utctimesplit = utctime[1].split(':');
          //   allFleetReservationsList['result'][i]._id.newFieldName = moment(allFleetReservationsList['result']
          //   [i]._id.newFieldName).utc().add(utctimesplit[0], 'hours');
          //   allFleetReservationsList['result'][i]._id.newFieldName = moment(allFleetReservationsList['result']
          //   [i]._id.newFieldName).add(utctimesplit[1], 'minutes');
          //   allFleetReservationsList['result'][i]._id.newFieldName = moment(allFleetReservationsList['result']
          //   [i]._id.newFieldName).format('YYYY-MM-DD HH:mm');

          // } else {
          //   const utctime = this.utctimezone.split('-');
          //   const utctimesplit = utctime[1].split(':');
          //   allFleetReservationsList['result'][i]._id.newFieldName = moment(allFleetReservationsList['result']
          //   [i]._id.newFieldName).utc().subtract(utctimesplit[0], 'hours');
          //   allFleetReservationsList['result'][i]._id.newFieldName = moment(allFleetReservationsList['result']
          //   [i]._id.newFieldName).subtract(utctimesplit[1], 'minutes');
          //   allFleetReservationsList['result'][i]._id.newFieldName = moment(allFleetReservationsList['result']
          //   [i]._id.newFieldName).format('YYYY-MM-DD HH:mm');

          // }
          const eventObj = {
            title: '', start: allFleetReservationsList['result'][i]._id.newFieldName
          };
          if (allFleetReservationsList['result'][i].eventName) {
            eventObj.title = allFleetReservationsList['result'][i].eventName.eventName;
          }
          eventObjList.push(eventObj);
        }
        this.events = eventObjList;
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
      );
  }

  /**---- To clear the messages ----*/
  clearmessage() {
    this.error = '';
  }

  /**---- To hide the user profile ----*/
  hideUserModal() {
    this.questionscount = 0;
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
    this.answer5 = '';
    this.securityQuestion1 = '';
    this.securityQuestion2 = '';
    this.securityQuestion3 = '';
    this.securityQuestion4 = '';
    this.securityQuestion5 = '';
    this.childModal.hide();
  }

  /**---- To hide the slide menu bar ----*/
  hidembsidebar() {
    document.querySelector('body').classList.toggle('sidebar-mobile-show');
  }
}
