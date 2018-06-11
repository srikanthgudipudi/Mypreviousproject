/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* EnterprisesModalComponent have below methods:
* showChildModal(): To show the child modal.
* ngOnInit(): To load the userToken at loading time.
* imageUploaded(event): This method is used to upload image.
* getCountryCodesList(): To Get Country Code list.
* getRowsperPage(): To Get Rows Per page list.
* getreason(reason): This method is used to get selected reason on change.
* getMonth(): This method is used to get selected Month on change.
* getYear(): This method is used to get selected year on change.
* keyPress(e): This method is used to focus on the below button when we clicked on enter key.
* inactivateEnterprise(enterpriseName, enterpriseId): This method is used to inactiveEnterprise user.
* activateEnterprise(enterpriseName, enterpriseId): This method is used to activeEnterprise user.
* deleteEnterprise(enterpriId: string): This method is used to delete the Enterprise user.
* showChildModal(updateaction, enterpriseid): This method is used to open the selected popup.
* getEnterpriseEditDetails(enterpriseid): To get selected Enterprise Edit Details.
* getEnterpriseDetails(enterpriseid): To get selected Enterprise Details.
* deleteEnterprise(enterpriId: string): To delete the selected enterprise.
* getCountryStates(countryName): This method is used get states based on country.
* getCountryStatesEdit(countryName): This method is used to edit states based on country.
* getTimeZones(): This method is used to get timezones based on country.
* getLanguages(): This method is used to get languages based on country.
* getCurrencyFormat(): This method is used to get the currency formates.
* getThemes(): This method is used to get themes based on country.
* getDateFormat(): This method is used to get date format based on country.
* getCurrency():This method is used to get currency based on country.
* getCountries():This method is used to get Countries based on country.
* getStatus(): This method is used to get the statuslist.
* browseImage(event): This method is used to upload the image.
* addEnterprise(): This method is used to add an enterprise.
* editEnterprise(enterpriseId): This method is used to edit an enterprise.
* getblockReasons(): This method is used to get the reasons to block.
* getunblockReasons(): This method is used to get the unreasons to block.
* autocase(text): Function to handle initcaps.
* hyphen_generate(value): This method is used to generate hyphen between numbers.
* hyphen_generateEdit(value): Hyphen Generator for Edit.
* clearmessage(): To clear the messages.
* hideChildModal(): To hide the popup modal and clear the error messages.
* autocase(text): Auto capitalization for each word.
*/
import { Component, Inject, OnInit, ViewChild, ViewContainerRef, Output,
  AfterContentChecked, HostListener, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Enterpriseservice } from './enterprise.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { EnterprisesDetails } from '../enterpriseslist/enterprisesdetails';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-enterprises-popup',
  templateUrl: 'enterprise.html',
  providers: [Enterpriseservice]
})

export class EnterpriseComponent implements OnInit, AfterContentChecked {
  entimages: any[];
  updateaction: any;
  retext: any;
  reasons: any;
  reasonValue: any;
  enterpriseid: any;
  comment: any;
  error: any = '';
  timezoneCode: any;
  updateAt: any;
  createAt: any;
  pagename: any;
  action: any;
  userToken: any;
  toastermessage: any;
  singleenterpriseEditDetails: EnterprisesDetails[];
  singleentAdd: any;
  singleentEdit: any;
  storage: Storage = window.localStorage;
  timeZone: any;
  rowsPerpage: any;
  perpagecount: any;
  theme: any;
  star = false;
  createstar = false;
  language: any;
  currency: any;
  enterpriseobj: any;
  currencyformat: any;
  dateformat: any;
  countries: any[];
  errorMessage: string;
  file: File;
  enterprise: any;
  enterpriseEdit: any;
  states: any;
  editLong: any;
  imagename: any;
  editLat: any;
  addLong: any;
  addLat: any;
  addTimeZone: any;
  editTimeZone: any;
  enabled: any;
  enabledSso: any;
  enabledPassReset: any;
  enabledCaptcha: any;
  enterpriseIconFilePath: any = '';
  enterpriseIcon: any = '';
  statuslist: any;
  countryCodeslist: any;
  reasonActivate: any;
  reasonInactivate: any;
  oldreasonActive: any;
  oldreasonInactive: any;
  imgfile: any = '';
  APIendpoint: any = '';
  minsize: any = 4;
  maxsize: any = 10;
  active: any;
  imgSrc: any = '';
  adminDetails: any;
  value1: any;
  value: any;
  oldreason: any;
  mobileCountryCode: any;
  countryCodes: any;
  worknumbercntrycode: any;
  worknumext: any;
  worknumber: any;
  editimagepath: any;
  editimagename: any;
  imageTypeError: any = false;
  imgStatus: any = false;
  worknumbercntrycodesplit: any[];
  loginUserDateFormat: any;
  errMsg1: any;
  errMsg2: any;
  cardTypes: any;
  cardTypeMonthValue: any;
  cardTypeYearValue: any;
  nameOnCreditCard: any;
  creditCardType: any;
  creditCardNumber: any;
  country: any;
  addressLine1: any;
  addressLine2: any;
  state: any;
  zip: any;
  city: any;
  creditCardExpiryDate: any;
  year: any;
  year1: any[];
  yearArray = [];
  expiryDate: any;
  number: any;
  cardnumber: any;
  emptyimg: any;
  cvvnumber: any;
  month: any;
  viewssoEnabled: any;
  fleetCommonName: any;
  private emailpattern = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$';
  private URL_PATTERN = '(?:(?:https?|ftp)://|www\\.)[-a-z0-9+&@#\\%?=~_|!:,.;]*[-a-z0-9+&@#\\%=~_|]+[\\.]{1}[a-z]{2,4}$';
  private LONG_LAT_PAT1 = '^[-+](?:[0-9]|[1-9][0-9]|1[0-7][0-9])(\\.\\d{1,13})?$';
  private LONG_LAT_PAT = '^([-+](?:180(?:(?:\.0{1,13})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,13})?)?)?)$';
  @Output()
  deleted: EventEmitter<string> = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private singleEnterpriseService: Enterpriseservice,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultLanguage') public defaultLanguage: string,
    @Inject('defaultTimezone') public defaultTimezone: string,
    @Inject('defaultCurrency') public defaultCurrency: string,
    @Inject('currencyFormat') public currencyFormat: string,
    @Inject('dateFormat') public dateFormat: string,
    @Inject('defaultTheme') public defaultTheme: string,
    @Inject('defaultCountry') public defaultCountry: string,
    @Inject('defaultState') public defaultState: string,
    @Inject('rowperpage') public rowperpage: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,

    private sanitizer: DomSanitizer) {
    this.APIendpoint = apiEndPoint;
    this.APIendpoint = this.APIendpoint + '/';
    this.entimages = [];
  }
  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userToken = window.localStorage.getItem('token');
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else {
      this.enterprise = {};
      this.enterprise.contactDetails = {};
      this.enterprise.address = {};
      this.enterprise.geoLoc = [];
      this.enterprise.settings = {};
      this.enterprise.gallery = {};

      this.enterpriseEdit = {};
      this.enterpriseEdit.contactDetails = {};
      this.enterpriseEdit.address = {};
      this.enterpriseEdit.geoLoc = [];
      this.enterpriseEdit.settings = {};
      this.enterpriseEdit.gallery = {};
      this.getCountryCodesList();
    }
    this.getblockReasons();
    this.getunblockReasons();
    this.getCardTypes();
  }
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
  }
  /*---- To get selected Enterprise Details ---*/
  getEnterpriseDetails(enterpriId) {
    const loginUserToken = window.localStorage.getItem('token');
    this.singleEnterpriseService.getEnterpriseDetails(enterpriId, loginUserToken)
      .subscribe(
      enterprisesDetails => {
        this.adminDetails = enterprisesDetails['result'];
        // this.imgSrc = this.APIendpoint + this.adminDetails.enterpriseIconFilePath;
        this.singleentAdd.addressLine1 = this.adminDetails.address['addressLine1'];
        this.singleentAdd.addressLine2 = this.adminDetails.address['addressLine2'];
        this.singleentAdd.city = this.adminDetails.address['city'];
        this.singleentAdd.zip = this.adminDetails.address['ZIP'];
        this.singleentAdd.longitude = this.adminDetails.address['geoCoordinates'][0];
        this.singleentAdd.latitude = this.adminDetails.address['geoCoordinates'][1];
        this.singleentAdd.country = this.adminDetails.address['country'];
        this.singleentAdd.enterpriseIconFilePath = this.adminDetails.enterpriseIconFilePath;
        this.singleentAdd.enterpriseIcon = this.adminDetails.enterpriseIcon;
        this.getCountryStates(this.adminDetails.address['country']);
        this.getCountryCodes(this.adminDetails.address['country']);
        this.singleentAdd.workNumberCountrycode = this.mobileCountryCode;
        this.singleentAdd.state = this.adminDetails.address['state'];
        this.singleentAdd.email = this.adminDetails.contactDetails['email'];
        // this.singleentAdd.workNumberCountrycode = '+91'; // this.adminDetails.contactDetails['workNumberCountrycode'];
        this.singleentAdd.workNumberExtn = this.adminDetails.contactDetails['workNumberExtn'];
        this.singleentAdd.mobile = this.adminDetails.contactDetails['workNumber'];
        this.singleentAdd.earlyCheckinWindowInMins = this.adminDetails.settings['earlyCheckinWindowInMins'];
        this.singleentAdd.disablePasswordRes = this.adminDetails.settings['enablePasswordReset'];
        this.singleentAdd.inactiveTimeOut = this.adminDetails.settings['inactivityTimeoutInMins'];
        // this.singleentAdd.ssoLogoutUrl = this.adminDetails.settings['SSOLogoutUrl'];
        // this.singleentAdd.ssoLoginUrl = this.adminDetails.settings['SSOLoginUrl'];
        // this.singleentAdd.sso = this.adminDetails.settings['SSO'];
        this.singleentAdd.disableCaptcha = this.adminDetails.settings['enableCaptcha'];
        this.singleentAdd.adminEmail = this.adminDetails.settings['adminEmail'];
        this.singleentAdd.expiryHours = this.adminDetails.settings['fleetExpiryHours'];
        this.singleentAdd.appTitle = this.adminDetails.settings['appTitle'];
        this.singleentAdd.fleetCommonName = this.adminDetails.settings['fleetCommonName'];
        this.singleentAdd.timeZone = this.adminDetails.preferences['defaultTimezone'];
        this.singleentAdd.advancedReservationWindowInDays = this.adminDetails.settings['advancedReservationWindowInDays'];
        this.singleentAdd.theme = this.adminDetails.preferences['defaultTheme'];
        this.singleentAdd.language = this.adminDetails.preferences['defaultLanguage'];
        this.singleentAdd.currency = this.adminDetails.preferences['defaultCurrency'];
        this.singleentAdd.defaultcurrformat = this.adminDetails.preferences['currencyFormat'];
        this.singleentAdd.dateformat = this.adminDetails.preferences['dateFormat'];
        this.singleentAdd.rowsperpage = this.adminDetails.preferences['rowsPerPage'];
        this.singleentAdd.earlyCheckinWindowInMins = this.adminDetails.settings['earlyCheckinWindowInMins'];
        this.singleentAdd.expirationGracePeriodInMins = this.adminDetails.settings['expirationGracePeriodInMins'];
        this.singleentAdd.longTermReservationPossible = this.adminDetails.settings['longTermReservationPossible'];
        this.singleentAdd.maxActiveReservationsPerUser = this.adminDetails.settings['maxActiveReservationsPerUser'];
        this.singleentAdd.maxReservationWindowInHrs = this.adminDetails.settings['maxReservationWindowInHrs'];
        this.singleentAdd.reservationCanBeBumped = this.adminDetails.settings['reservationCanBeBumped'];
        this.singleentAdd.reservationReminderWindowInMins = this.adminDetails.settings['reservationReminderWindowInMins'];
        this.singleentAdd.sendReservationReminders = this.adminDetails.settings['sendReservationReminders'];
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
              break;
            } else if (statuscode === '9997') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              break;
            }
        }
      });
  }

  /*--- To Get Country Code list ---*/
  public getCountryCodesList() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'COUNTRY_CODES').subscribe(
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
    this.singleEnterpriseService.getLookupsList(window.localStorage.getItem('token'), 'ROWS_PER_PAGE').subscribe(
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
  /**---This is on change method called for every change in rows perpage ----*/
  changerowsperpage(rowperpage) {
    this.perpagecount = rowperpage;
  }

  /* To change the reason list */
  getreason(reason) {
    this.reasonValue = reason;
  }

  /** -----To change month list---- */
  getMonth(month) {
    this.cardTypeMonthValue = month;
  }

  /** -----To change year list---- */
  getYear(year) {
    this.cardTypeYearValue = year;
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
    // this.imgSrc = this.imgfile.src;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgfile));
    setTimeout(() => {
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgfile));
    }, 500);
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
          // 'Enterprise Icon size should be greater than ' + this.minsize + 'kb and less than ' + this.maxsize + 'kb';
        } else if (size > this.imageMaxSize || bytes !== 'KB') {
          this.imgStatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
          // 'Enterprise Icon size should be greater than ' + this.minsize + 'kb and less than ' + this.maxsize + 'kb';
        } else {
          this.imgStatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }
    if (this.updateaction === 'CREATE') {
      const enterpriseimg = <HTMLInputElement>document.getElementById('enterpriseimg');
      let img = this.imgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.imgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.imgfile.name.split('.')[1];
        }
      }
      enterpriseimg.innerHTML = img;
    } else if (this.updateaction === 'EDIT') {
      const editfleetimg = <HTMLInputElement>document.getElementById('editenterpriseimg');
      let img = this.imgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.imgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.imgfile.name.split('.')[1];
        }
      }
      editfleetimg.innerHTML = img;
    }
  }

  /*---- Toi show child modal ----*/
  public showChildModal(updateaction, enterpriseobj): void {
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';
    this.enterpriseid = enterpriseobj;
    this.enterpriseobj = enterpriseobj;
    if (this.updateaction !== 'CREATE') {
      this.enterpriseIconFilePath = enterpriseobj.enterpriseIconFilePath + '/' + enterpriseobj.enterpriseIcon;
      this.enterpriseIcon = enterpriseobj.enterpriseIcon;
      this.editimagename = enterpriseobj.enterpriseIcon;
      this.editimagepath = enterpriseobj.enterpriseIconFilePath;
      this.imgSrc = this.APIendpoint + enterpriseobj.enterpriseIconFilePath + '/' + enterpriseobj.enterpriseIcon;
      this.imagename = this.enterpriseIcon.split('.');
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.enterpriseIcon = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      this.enterpriseIconFilePath = enterpriseobj.enterpriseIconFilePath + '/' + enterpriseobj.enterpriseIcon;
    }
    if (updateaction === 'VIEW') {
      this.reasonValue = '';
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_ENTERPRISE';
      this.action = 'View';
      this.retext = true;
      this.viewssoEnabled = enterpriseobj.singleSignOn.ssoEnabled;
      this.enterpriseobj = enterpriseobj;
      this.enabled = enterpriseobj.isEnabled;
      this.worknumbercntrycode = this.enterpriseobj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null && this.worknumbercntrycode !== '') {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.enterpriseobj.contactDetails.workNumberExtn;
      this.worknumber = this.enterpriseobj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.enterpriseobj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.enterpriseobj.contactDetails.workNumberExtn;
      }
      this.reasonActivate = enterpriseobj.reasonActivate;
      this.reasonInactivate = enterpriseobj.reasonInactivate;
      this.enabledSso = enterpriseobj.settings.SSO;
      this.enabledPassReset = enterpriseobj.settings.enablePasswordReset;
      this.enabledCaptcha = enterpriseobj.settings.enableCaptcha;
      this.comment = enterpriseobj.description;
      this.creditCardNumber = this.enterpriseobj.billToDetails.creditCardNumber;
      this.number = this.creditCardNumber.split('-');
      this.number = this.number[3];
      this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.enterpriseobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.enterpriseobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    } else if (updateaction === 'INACTIVE') {
      this.reasonValue = '';
      this.viewssoEnabled = enterpriseobj.singleSignOn.ssoEnabled;
      this.pagename = 'COMMON_PAGE_TITLES.INACTIVATE_ENTERPRISE';
      this.action = 'Inactivate';
      this.retext = false;
      this.getunblockReasons();
      this.worknumbercntrycode = this.enterpriseobj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null && this.worknumbercntrycode !== '') {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.enterpriseobj.contactDetails.workNumberExtn;
      this.worknumber = this.enterpriseobj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.enterpriseobj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.enterpriseobj.contactDetails.workNumberExtn;
      }
      this.oldreasonActive = enterpriseobj.reasonActivate;
      this.enabled = enterpriseobj.isEnabled;
      this.enabledSso = enterpriseobj.settings.SSO;
      this.enabledPassReset = enterpriseobj.settings.enablePasswordReset;
      this.enabledCaptcha = enterpriseobj.settings.enableCaptcha;
      this.comment = enterpriseobj.description;
      this.creditCardNumber = this.enterpriseobj.billToDetails.creditCardNumber;
      this.number = this.creditCardNumber.split('-');
      this.number = this.number[3];
      this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.enterpriseobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.enterpriseobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      // this.enterpriseIconFilePath = this.enterpriseobj.enterpriseIconFilePath;
    } else if (updateaction === 'ACTIVE') {
      this.reasonValue = '';
      this.viewssoEnabled = enterpriseobj.singleSignOn.ssoEnabled;
      this.retext = false;
      this.getblockReasons();
      this.worknumbercntrycode = this.enterpriseobj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null && this.worknumbercntrycode !== '') {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.enterpriseobj.contactDetails.workNumberExtn;
      this.worknumber = this.enterpriseobj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.enterpriseobj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.enterpriseobj.contactDetails.workNumberExtn;
      }
      this.oldreasonInactive = enterpriseobj.reasonInactivate;
      this.pagename = 'COMMON_PAGE_TITLES.ACTIVATE_ENTERPRISE';
      this.action = 'Activate';
      this.enabled = enterpriseobj.isEnabled;
      this.enabledSso = enterpriseobj.settings.SSO;
      this.enabledPassReset = enterpriseobj.settings.enablePasswordReset;
      this.enabledCaptcha = enterpriseobj.settings.enableCaptcha;
      this.comment = enterpriseobj.description;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.enterpriseobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.enterpriseobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.creditCardNumber = this.enterpriseobj.billToDetails.creditCardNumber;
      this.number = this.creditCardNumber.split('-');
      this.number = this.number[3];
      this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
    } else if (updateaction === 'EDIT') {
      this.imgfile = '';
      this.getTimeZones();
      this.getCountries();
      this.getThemes();
      this.getRowsperPage();
      this.getLanguages();
      this.getCurrency();
      this.getCurrencyFormat();
      this.getDateFormat();
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_ENTERPRISE';
      this.reasonActivate = enterpriseobj.reasonActivate;
      this.reasonInactivate = enterpriseobj.reasonInactivate;
      this.singleentEdit = new EnterprisesDetails();
      this.singleenterpriseEditDetails = this.enterpriseobj;
      this.singleentEdit.description = this.enterpriseobj.description;
      this.singleentEdit.isEnabled = this.enterpriseobj.isEnabled;
      this.singleentEdit.ein = this.enterpriseobj.EIN;
      this.enterpriseobj = enterpriseobj;
      this.viewssoEnabled = enterpriseobj.singleSignOn.ssoEnabled;
      this.singleentEdit.enterpriseName = this.enterpriseobj.enterpriseName;
      this.singleentEdit.webSite = this.enterpriseobj.meta.websiteURL;
      this.singleentEdit.mediaassetLocation = this.enterpriseobj.meta.mediaFilesPath;
      // preferences block
      this.singleentEdit.timeZone = this.enterpriseobj.preferences.defaultTimezone;
      this.singleentEdit.language = this.enterpriseobj.preferences.defaultLanguage;
      this.singleentEdit.currency = this.enterpriseobj.preferences.defaultCurrency;
      this.singleentEdit.defaultcurrformat = this.enterpriseobj.preferences.currencyFormat;
      this.singleentEdit.dateformat = this.enterpriseobj.preferences.dateFormat;
      this.singleentEdit.rowsperpage = this.enterpriseobj.preferences.rowsPerPage;
      // address block
      this.singleentEdit.longitude = this.enterpriseobj.address.geoCoordinates[1];
      this.singleentEdit.latitude = this.enterpriseobj.address.geoCoordinates[0];
      this.singleentEdit.addressLine1 = this.enterpriseobj.address.addressLine1;
      this.singleentEdit.addressLine2 = this.enterpriseobj.address.addressLine2;
      this.singleentEdit.city = this.enterpriseobj.address.city;
      this.singleentEdit.zip = this.enterpriseobj.address.ZIP;
      this.singleentEdit.state = this.enterpriseobj.address.state;
      this.singleentEdit.country = this.enterpriseobj.address.country;
      // contact details block
      this.singleentEdit.email = this.enterpriseobj.contactDetails.email;
      this.singleentEdit.mobile = this.enterpriseobj.contactDetails.workNumber;
      this.singleentEdit.workNumberCountrycode = this.enterpriseobj.contactDetails.workNumberCountrycode;
      this.singleentEdit.workNumberExtn = this.enterpriseobj.contactDetails.workNumberExtn;
      // settings block
      this.singleentEdit.disableCaptcha = this.enterpriseobj.settings.enableCaptcha;
      this.singleentEdit.sso = this.enterpriseobj.settings.SSO;
      this.singleentEdit.disablePasswordRes = this.enterpriseobj.settings.enablePasswordReset;
      this.singleentEdit.fleetCommonName = this.enterpriseobj.settings.fleetCommonName;
      this.singleentEdit.advancedReservationWindowInDays = this.enterpriseobj.settings.advancedReservationWindowInDays;
      this.singleentEdit.reservationCanBeBumped = this.enterpriseobj.settings.reservationCanBeBumped;
      this.singleentEdit.expirationGracePeriodInMins = this.enterpriseobj.settings.expirationGracePeriodInMins;
      this.singleentEdit.longTermReservationPossible = this.enterpriseobj.settings.longTermReservationPossible;
      this.singleentEdit.maxActiveReservationsPerUser = this.enterpriseobj.settings.maxActiveReservationsPerUser;
      this.singleentEdit.maxReservationWindowInHrs = this.enterpriseobj.settings.maxReservationWindowInHrs;
      this.singleentEdit.reservationReminderWindowInMins = this.enterpriseobj.settings.reservationReminderWindowInMins;
      this.singleentEdit.sendReservationReminders = this.enterpriseobj.settings.sendReservationReminders;
      this.singleentEdit.appTitle = this.enterpriseobj.settings.appTitle;
      this.singleentEdit.expiryHours = this.enterpriseobj.settings.fleetExpiryHours;
      this.singleentEdit.adminEmail = this.enterpriseobj.settings.adminEmail;
      this.singleentEdit.ssoLoginUrl = this.enterpriseobj.settings.SSOLoginUrl;
      this.singleentEdit.ssoLogoutUrl = this.enterpriseobj.settings.SSOLogoutUrl;
      this.singleentEdit.inactiveTimeOut = this.enterpriseobj.settings.inactivityTimeoutInMins;
      this.singleentEdit.earlyCheckinWindowInMins = this.enterpriseobj.settings.earlyCheckinWindowInMins;
      // bill to details
      this.addressLine1 = this.enterpriseobj.billToDetails.addressLine1;
      this.addressLine2 = this.enterpriseobj.billToDetails.addressLine2;
      this.city = this.enterpriseobj.billToDetails.city;
      this.state = this.enterpriseobj.billToDetails.state;
      this.zip = this.enterpriseobj.billToDetails.ZIP;
      this.country = this.enterpriseobj.billToDetails.country;
      this.creditCardType = this.enterpriseobj.billToDetails.creditCardType;
      this.expiryDate = this.enterpriseobj.billToDetails.creditCardExpiryDate;
      this.cardTypeMonthValue = this.expiryDate.split('-');
      this.cardTypeMonthValue = this.cardTypeMonthValue[0];
      this.cardTypeYearValue = this.expiryDate.split('-');
      this.cardTypeYearValue = this.cardTypeYearValue[1];
      this.creditCardNumber = this.enterpriseobj.billToDetails.creditCardNumber;
      this.nameOnCreditCard = this.enterpriseobj.billToDetails.nameOnCreditCard;
      this.cvvnumber = this.enterpriseobj.billToDetails.cvvNumber;
      // sso block
      this.singleentEdit.sso = this.enterpriseobj.singleSignOn.ssoEnabled;
      this.singleentEdit.ssoAlias = this.enterpriseobj.singleSignOn.ssoAlias;
      this.singleentEdit.ssoHost = this.enterpriseobj.singleSignOn.ssoHost;
      this.singleentEdit.ssoPort = this.enterpriseobj.singleSignOn.ssoPort;
      this.singleentEdit.ssoLDAPS = this.enterpriseobj.singleSignOn.ssoLDAPS;
      this.singleentEdit.ssoAccount = this.enterpriseobj.singleSignOn.ssoAccount;
      this.singleentEdit.ssoPassword = this.enterpriseobj.singleSignOn.ssoPassword;
      this.singleentEdit.ssoBaseDN = this.enterpriseobj.singleSignOn.ssoBaseDN;
      this.singleentEdit.ssoLDAPFilter = this.enterpriseobj.singleSignOn.ssoLDAPFilter;
      this.singleentEdit.ssoTimeoutInSeconds = this.enterpriseobj.singleSignOn.ssoTimeoutInSeconds;
      this.singleentEdit.ssoOnTheFlyUserCreation = this.enterpriseobj.singleSignOn.ssoOnTheFlyUserCreation;
      this.singleentEdit.ssoLoginAttribute = this.enterpriseobj.singleSignOn.ssoLoginAttribute;
      this.singleentEdit.ssoFirstnameAttribute = this.enterpriseobj.singleSignOn.ssoFirstnameAttribute;
      this.singleentEdit.ssoLastnameAttribute = this.enterpriseobj.singleSignOn.ssoLastnameAttribute;
      this.singleentEdit.ssoEmailAttribute = this.enterpriseobj.singleSignOn.ssoEmailAttribute;
      this.singleentEdit.ssoLoginUrl = this.enterpriseobj.singleSignOn.ssoLoginUrl;
      this.singleentEdit.ssoLogoutUrl = this.enterpriseobj.singleSignOn.ssoLogoutUrl;
      this.year = new Date().getFullYear();
      for (let i = 0; i <= 20; i++) {
        this.year1 = this.year + i;
        this.yearArray.push(this.year1);
      }
      this.getCountryStates(this.singleentEdit.country);
      if (this.enterpriseobj.preferences.defaultTheme === '') {
        this.singleentEdit.theme = 'Select';
      } else {
        this.singleentEdit.theme = this.enterpriseobj.preferences.defaultTheme;
      }
      this.action = 'Edit';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.enterpriseobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.enterpriseobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      const editfleetimg = <HTMLInputElement>document.getElementById('editenterpriseimg');
      if (editfleetimg !== null) {
        editfleetimg.innerHTML = '';
      }
    } else if (updateaction === 'DELETE') {
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_ENTERPRISE';
      this.action = 'Delete';
      this.retext = true;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.enterpriseobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.enterpriseobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    } else if (updateaction === 'CREATE') {
      this.getTimeZones();
      this.getCountries();
      this.getRowsperPage();
      this.getThemes();
      this.getLanguages();
      this.getCurrency();
      this.getStatus();
      this.getCurrencyFormat();
      this.getDateFormat();
      this.getEnterpriseDetails('0');
      this.getCardTypes();
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_ENTERPRISE';
      this.action = 'Create';
      this.year = new Date().getFullYear();
      for (let i = 0; i <= 20; i++) {
        this.year1 = this.year + i;
        this.yearArray.push(this.year1);
      }
      this.singleentAdd = new EnterprisesDetails();
      this.singleentAdd.enabledEmail = true;
      this.singleentAdd.disablePasswordRes = true;
      this.singleentAdd.allowGuestReservations = true;
      this.singleentAdd.allowWaitingList = true;
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.imgSrc = this.APIendpoint + window.localStorage.getItem('EnterpriseImage');
      const enterpriseimg = <HTMLInputElement>document.getElementById('enterpriseimg');
      if (enterpriseimg !== null) {
        this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
        enterpriseimg.innerHTML = this.emptyimg.value;
      }
    }
    this.childModal.show();
  }

  @HostListener('keypress', ['$event'])

  /** ----This method is used to focus on the below button when we clicked on enter key ----*/
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'VIEW') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.updateaction === 'DELETE') {
      if (key === 13) {
        this.deleteEnterprise(this.enterpriseid);
      }
    }
    if (this.updateaction === 'INACTIVE') {
      if (key === 13) {
        this.inactivateEnterprise(this.singleentEdit.enterpriseName, this.enterpriseid);
      }
    }
    if (this.updateaction === 'ACTIVE') {
      if (key === 13) {
        this.activateEnterprise(this.singleentEdit.enterpriseName, this.enterpriseid);
      }
    }
  }

  /*-----  To Inactivate Enterprise ----- */
  inactivateEnterprise(enterpriseName, enterpriseId) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      const loginUserToken = window.localStorage.getItem('token');
      this.singleEnterpriseService.inactivateEnterprise(enterpriseId, loginUserToken, this.reasonValue)
        .subscribe(
        followObj => {
          const condition = window.localStorage.getItem('searchenterprisesDetails');
          if (condition !== 'advanced') {
            this.deleted.emit();
          } else {
            window.localStorage.setItem('advance', 'advanced');
          }
          if (localStorage.getItem('enterpriseSearch') === 'enterpriseSearch') {
            localStorage.setItem('inactiveSearch', 'inactiveSearch');
          } else {
            this.deleted.emit();
          }
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_INACTIVATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.childModal.hide();
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).status;
          switch (status) {
            case 400: if (statusCode === '2014') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
            } break;
            case 500:
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*-----  To Activate Enterprise ----- */
  activateEnterprise(enterpriseName, enterpriseId) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      const loginUserToken = window.localStorage.getItem('token');
      this.singleEnterpriseService.activateEnterprise(enterpriseId, loginUserToken, this.reasonValue)
        .subscribe(
        followObj => {
          const condition = window.localStorage.getItem('searchenterprisesDetails');
          if (condition !== 'advanced') {
            this.deleted.emit();
          } else {
            window.localStorage.setItem('advance', 'advanced');
          }
          if (localStorage.getItem('enterpriseSearch') === 'enterpriseSearch') {
            localStorage.setItem('activeSearch', 'activeSearch');
          } else {
            this.deleted.emit();
          }
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_ACTIVATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.childModal.hide();
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).status;
          switch (status) {
            case 400:
              if (statusCode === '2014') {
                this.toastermessage = this.translateService.get('TOASTER.' + statusCode);
                this.toastr.success(this.toastermessage.value);
              } break;
            case 500:
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*-----  To delete enterprise  ----- */
  deleteEnterprise(enterpriId: string) {
    this.singleEnterpriseService.deleteEnterprise(enterpriId, this.userToken)
      .subscribe(
      enterpriseDetails => {
        this.deleted.emit();
        this.childModal.hide();
      },
      error => {
        const status = JSON.parse(error['status']);
        switch (status) {
          case 500:
            break;
          case 400:
            break;
        }
      });
  }

  /*---- To get states based on country   ---*/
  getCountryStates(countryName) {
    this.singleEnterpriseService.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
      },
      error => this.errorMessage = <any>error);
  }

  /** ---To get the country codes based on country  ---*/
  getCountryCodes(countryName) {
    this.singleEnterpriseService.getCountryCodesbyCountryName(countryName)
      .subscribe(statesValues => {
        this.countryCodeslist = statesValues['result'];
      },
      error => this.errorMessage = <any>error);
  }

  /*---- To get states based on country   ---*/
  getCountryStates1(countryName) {
    this.singleentAdd.state = '';
    this.createstar = true;
    this.singleEnterpriseService.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
      },
      error => this.errorMessage = <any>error);
  }

  /*---- To get states based on country   ---*/
  getCountryStatesEdit(countryName) {
    this.singleentEdit.state = '';
    this.star = true;
    this.singleEnterpriseService.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
      },
      error => this.errorMessage = <any>error);
  }

  /*---- To get timezones based on country   ---*/
  public getTimeZones() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.timeZone = data['result'];
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
    this.singleEnterpriseService.getLookupsList(this.userToken, 'LANGUAGES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.language = data['result'];
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

  /*---- To get currency based on country   ---*/
  public getCurrency() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'CURRENCIES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.currency = data['result'];
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

  /*---- To get currency format based on country   ---*/
  getCurrencyFormat() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'AMOUNT_FORMATS')
      .subscribe(currencyFormatValues => {
        this.currencyformat = currencyFormatValues['result'];
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

  /*---- To get date format based on country   ---*/
  public getDateFormat() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'DATE_FORMATS').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.dateformat = data['result'].sort();
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

  /*---- To get theme based on country   ---*/
  public getThemes() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'UI_THEMES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.theme = data['result'];
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

  /*---- To get Enterprise status based on country   ---*/
  public getStatus() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'ENTERPRISE_STATUSES').subscribe(
      data => {
        this.statuslist = data['result'];
        this.singleentAdd.isEnabled = data['result'][0].lookupName;
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

  /*---- To get countrys list ---*/
  public getCountries() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'COUNTRIES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.countries = data['result'];
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

  /* ----- Image Upload ----- */
  browseImage(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    if (files.length > 0) {
      this.file = files[0];
    }
    let fSize = this.file.size;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
  }

  /* ---- Add Enterprise ---- */
  addEnterprise() {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const URL_PATTERN = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    this.creditCardExpiryDate = this.cardTypeMonthValue + '-' + this.cardTypeYearValue;
    if (this.value !== '') {
      this.value = this.singleentAdd.longitude.split('.');
    }
    if (this.value1 !== '') {
      this.value1 = this.singleentAdd.latitude.split('.');
    }
    this.month = new Date().getMonth() + 1;
    this.month = this.month.toString();
    this.year = new Date().getFullYear();
    this.year = this.year.toString();
    if (this.singleentAdd.enterpriseName === undefined || this.singleentAdd.enterpriseName.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.singleentAdd.webSite === undefined || this.singleentAdd.webSite.trim() === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_WEBSITE';
    } else if (!this.singleentAdd.webSite.match(this.URL_PATTERN)) {
      this.error = 'ENTERPRISES.VALID_WEBSITE_FORMAT';
    } else if (this.singleentAdd.ein === undefined || this.singleentAdd.ein === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_EIN';
    } else if (this.singleentAdd.description === undefined || this.singleentAdd.description.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.imgfile === undefined || this.imgfile === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_ENTERPRISE_IMAGE';
    } else if (this.imgfile !== '' && this.imgfile.type === '') {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgfile.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgStatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else if (this.singleentAdd.mobile === undefined || this.singleentAdd.mobile === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.singleentAdd.mobile.length < 12) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_WORKNUMBER';
    } else if (this.singleentAdd.email === undefined || this.singleentAdd.email.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!this.singleentAdd.email.match(this.emailpattern)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.singleentAdd.adminEmail === undefined || this.singleentAdd.adminEmail.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!this.singleentAdd.adminEmail.match(this.emailpattern)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.singleentAdd.addressLine1 === undefined || this.singleentAdd.addressLine1.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.singleentAdd.city === undefined || this.singleentAdd.city.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.singleentAdd.zip === undefined || this.singleentAdd.zip.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.singleentAdd.state === undefined || this.singleentAdd.state.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.singleentAdd.latitude === undefined || this.singleentAdd.latitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LATITUDE';
    } else if (!this.singleentAdd.latitude.match(this.LONG_LAT_PAT) || this.value1[1] === undefined || this.value1[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (!this.singleentAdd.latitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (this.singleentAdd.longitude === undefined || this.singleentAdd.longitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LONGITUDE';
    } else if (!this.singleentAdd.longitude.match(this.LONG_LAT_PAT) || this.value[1] === undefined || this.value[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (!this.singleentAdd.longitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (this.singleentAdd.appTitle === undefined || this.singleentAdd.appTitle.trim() === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_APP_TITLE';
    } else if (this.singleentAdd.fleetCommonName === undefined || this.singleentAdd.fleetCommonName.trim() === '') {
      this.error = this.translateService.get('ENTERPRISES.VALID_NOBLANK_FLEET_COMMON_NAME');
      this.error =  this.fleetCommonName + this.error.value;
    } else if (this.singleentAdd.maxActiveReservationsPerUser === undefined || this.singleentAdd.maxActiveReservationsPerUser === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_MAX_LIMIT_ACTIVE_RESERVATIONS_PER_USER';
    } else if (this.singleentAdd.advancedReservationWindowInDays === undefined ||
      this.singleentAdd.advancedReservationWindowInDays === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_ADVANCED_RESERVATION_WINDOW_IN_DAYS';
    } else if (this.singleentAdd.maxReservationWindowInHrs === undefined || this.singleentAdd.maxReservationWindowInHrs === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_MAX_RESERVATION_WINDOW_IN_HRS';
    } else if (this.singleentAdd.reservationReminderWindowInMins === undefined ||
      this.singleentAdd.reservationReminderWindowInMins === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_RESERVATION_REMINDER_WINDOW_IN_MINS';
    } else if (this.singleentAdd.expiryHours === undefined ||
      this.singleentAdd.expiryHours === '' || Number(this.singleentAdd.expiryHours) === 0) {
     this.error = this.translateService.get('ENTERPRISES.VALID_VALUE_FLEET_RESERVATION_AUTO_EXPIRES_IN_HOURS');
        this.error =  this.fleetCommonName + this.error.value;
    } else if (this.singleentAdd.expirationGracePeriodInMins === undefined || this.singleentAdd.expirationGracePeriodInMins === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_EXPIRATION_GRACE_PERIOD_IN_MINS';
    } else if (this.singleentAdd.inactiveTimeOut === undefined
      || this.singleentAdd.inactiveTimeOut === '' ||
      Number(this.singleentAdd.inactiveTimeOut) === 0) {
      this.error = 'ENTERPRISES.VALID_VALUE_INACTIVE_TIMEOUT_IN_MINS';
    } else if (this.singleentAdd.earlyCheckinWindowInMins === undefined
      || this.singleentAdd.earlyCheckinWindowInMins === '' || Number(this.singleentAdd.earlyCheckinWindowInMins) === 0) {
      this.error = 'ENTERPRISES.VALID_VALUE_CHECKIN_PRIOR_IN_MINS';
      // } else if (this.singleentAdd.sso === true && this.singleentAdd.ssoemailattribute !== undefined
      //   && this.singleentAdd.ssoemailattribute !== '' && !EMAIL_REGEXP.test(this.singleentAdd.ssoemailattribute)) {
      //   this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
      // } else if (this.singleentAdd.sso === true && this.singleentAdd.ssoLoginUrl !== undefined
      //   && this.singleentAdd.ssoLoginUrl !== '' && !URL_PATTERN.test(this.singleentAdd.ssoLoginUrl)) {
      //   this.error = 'SSOBLOCK.INVALID_LOGINURL_FORMAT';
      // } else if (this.singleentAdd.sso === true && this.singleentAdd.ssoLogoutUrl !== undefined
      //   && this.singleentAdd.ssoLogoutUrl !== '' && !URL_PATTERN.test(this.singleentAdd.ssoLogoutUrl)) {
      //   this.error = 'SSOBLOCK.INVALID_LOGOUTURL_FORMAT';
    } else if (this.singleentAdd.addressLine1.trim() === '' || this.singleentAdd.zip === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.singleentAdd.city === '' || this.singleentAdd.city === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.singleentAdd.state === '' || this.singleentAdd.state === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.singleentAdd.zip.trim() === '' || this.singleentAdd.zip === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.singleentAdd.creditCardType === '' || this.singleentAdd.creditCardType === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_TYPE';
    } else if (this.singleentAdd.creditCardNumber === '' || this.singleentAdd.creditCardNumber === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_NUM';
    } else if (this.singleentAdd.creditCardNumber.length < 19) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CREDIT_CARD_NUM';
    } else if (this.singleentAdd.nameOnCreditCard === '' || this.singleentAdd.nameOnCreditCard === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_NAME_ON_CREDIT_CARD';
    } else if (this.cardTypeMonthValue === '' || this.cardTypeMonthValue === undefined ||
      this.cardTypeYearValue === '' || this.cardTypeYearValue === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_EXPIRY_DATE';
    } else if ((this.cardTypeYearValue === this.year) && (this.month >= this.cardTypeMonthValue)) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CREDIT_CARD_EXPIRY_DATE';
    } else if (this.cvvnumber === '' || this.cvvnumber === undefined || this.cvvnumber === null) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CVV_NUMBER';
    } else if (this.cvvnumber.length < 3) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CVV_NUMBER';
    } else if (this.error === '') {
      if (this.singleentAdd.mediaassetLocation !== undefined && this.singleentAdd.mediaassetLocation !== '') {
        this.singleentAdd.mediaassetLocation = this.singleentAdd.mediaassetLocation.trim().replace(/\s\s+/g, ' ');
      }
      this.addLong = this.singleentAdd.longitude.trim().replace(/\s\s+/g, ' ');
      this.addLong = this.addLong.replace('+', '%2B');
      this.addLat = this.singleentAdd.latitude.trim().replace(/\s\s+/g, ' ');
      this.addLat = this.addLat.replace('+', '%2B');
      this.enterprise.enterpriseName = this.autocase(this.singleentAdd.enterpriseName).trim().replace(/\s\s+/g, ' ');
      this.enterprise.description = this.singleentAdd.description.trim().replace(/\s\s+/g, ' ');
      this.enterprise.EIN = this.singleentAdd.ein;
      if (this.singleentAdd.isEnabled === undefined || this.singleentAdd.isEnabled === 'undefined') {
        this.singleentAdd.isEnabled = false;
      }
      this.enterprise.address = {
        'addressLine1': this.autocase(this.singleentAdd.addressLine1).trim().replace(/\s\s+/g, ' '),
        'addressLine2': this.autocase(this.singleentAdd.addressLine2).trim().replace(/\s\s+/g, ' '),
        'city': this.autocase(this.singleentAdd.city).trim().replace(/\s\s+/g, ' '), 'state': this.singleentAdd.state,
        'ZIP': this.singleentAdd.zip.trim().replace(/\s\s+/g, ' '), 'country': this.singleentAdd.country,
        'geoCoordinates': [this.addLat, this.addLong]
      };
      this.enterprise.contactDetails = {
        'email': this.singleentAdd.email, 'workNumber': this.singleentAdd.mobile,
        'workNumberCountrycode': this.singleentAdd.workNumberCountrycode,
        'workNumberExtn': this.singleentAdd.workNumberExtn
      };
      this.enterprise.logoUrl = 'http://logo';
      this.addTimeZone = this.singleentAdd.timeZone;
      this.enterprise.settings = {
        'appTitle': this.autocase(this.singleentAdd.appTitle).trim().replace(/\s\s+/g, ' '),
        'fleetExpiryHours': this.singleentAdd.expiryHours,
        'adminEmail': this.singleentAdd.adminEmail,
        'enableCaptcha': this.singleentAdd.disableCaptcha,
        'inactivityTimeoutInMins': this.singleentAdd.inactiveTimeOut,
        'enablePasswordReset': this.singleentAdd.disablePasswordRes,
        'earlyCheckinWindowInMins': this.singleentAdd.earlyCheckinWindowInMins,
        'fleetCommonName': this.autocase(this.singleentAdd.fleetCommonName).trim().replace(/\s\s+/g, ' '),
        'advancedReservationWindowInDays': this.singleentAdd.advancedReservationWindowInDays,
        'reservationCanBeBumped': this.singleentAdd.reservationCanBeBumped,
        'expirationGracePeriodInMins': this.singleentAdd.expirationGracePeriodInMins,
        'longTermReservationPossible': this.singleentAdd.longTermReservationPossible,
        'maxActiveReservationsPerUser': this.singleentAdd.maxActiveReservationsPerUser,
        'maxReservationWindowInHrs': this.singleentAdd.maxReservationWindowInHrs,
        'reservationReminderWindowInMins': this.singleentAdd.reservationReminderWindowInMins,
        'sendReservationReminders': this.singleentAdd.sendReservationReminders,
        'fleetAvaliableColor': window.localStorage.getItem('fleetAvaliableColor'),
        'fleetReservedColor': window.localStorage.getItem('fleetReservedColor'),
        'fleetInactiveColor': window.localStorage.getItem('fleetInactiveColor'),
        'fleetCheckinColor': window.localStorage.getItem('fleetCheckinColor')
      };
      this.enterprise.singleSignOn = {
        'ssoEnabled': this.singleentAdd.sso,
        'ssoAlias': this.singleentAdd.ssoalias,
        'ssoHost': this.singleentAdd.ssohost,
        'ssoPort': this.singleentAdd.ssoport,
        'ssoLDAPS': this.singleentAdd.ssoldaps,
        'ssoAccount': this.singleentAdd.ssoaccount,
        'ssoPassword': this.singleentAdd.ssopswd,
        'ssoBaseDN': this.singleentAdd.ssobase,
        'ssoLDAPFilter': this.singleentAdd.ssoldapfilter,
        'ssoTimeoutInSeconds': this.singleentAdd.ssotimeout,
        'ssoOnTheFlyUserCreation': this.singleentAdd.flyuser,
        'ssoLoginAttribute': this.singleentAdd.ssologinattribute,
        'ssoFirstnameAttribute': this.singleentAdd.ssofirstattribute,
        'ssoLastnameAttribute': this.singleentAdd.ssolastattribute,
        'ssoEmailAttribute': this.singleentAdd.ssoemailattribute,
        'ssoLoginUrl': this.singleentAdd.ssoLoginUrl,
        'ssoLogoutUrl': this.singleentAdd.ssoLogoutUrl
      };
      this.enterprise.preferences = {
        'defaultLanguage': this.singleentAdd.language, 'defaultTimezone': this.addTimeZone,
        'defaultTheme': this.singleentAdd.theme, 'defaultCurrency': this.singleentAdd.currency,
        'currencyFormat': this.singleentAdd.defaultcurrformat, 'dateFormat': this.singleentAdd.dateformat,
        'rowsPerPage': this.perpagecount
      };
      this.enterprise.remarks = 'Test';
      this.enterprise.meta = {
        'websiteURL': this.singleentAdd.webSite.trim().replace(/\s\s+/g, ' '),
        'mediaFilesPath': this.singleentAdd.mediaassetLocation
      };
      this.enterprise.billToDetails = {
        'addressLine1': this.singleentAdd.addressLine1,
        'addressLine2': this.singleentAdd.addressLine2,
        'city': this.singleentAdd.city,
        'state': this.singleentAdd.state,
        'ZIP': this.singleentAdd.zip,
        'country': this.singleentAdd.country,
        'nameOnCreditCard': this.singleentAdd.nameOnCreditCard,
        'creditCardType': this.singleentAdd.creditCardType,
        'creditCardNumber': this.singleentAdd.creditCardNumber,
        'creditCardExpiryDate': this.creditCardExpiryDate,
        'cvvNumber': this.cvvnumber,
      };

      this.enterprise.isEnabled = this.singleentAdd.isEnabled;
      this.enterprise.enterpriseIconFilePath = this.singleentAdd.enterpriseIconFilePath;
      this.enterprise.enterpriseIcon = this.singleentAdd.enterpriseIcon;
      this.singleEnterpriseService.addEnterprise(this.enterprise, this.userToken, this.imgfile).subscribe(
        data => {
          const condition = window.localStorage.getItem('searchenterprisesDetails');
          if (condition !== 'advanced') {
            this.deleted.emit();
          } else {
            window.localStorage.setItem('advance', 'advanced');
          }
          this.childModal.hide();
        },
        error => {
          const status = JSON.parse(error['status']);
          switch (status) {
            case 500:
              break;
            case 400:
              const statusCode = JSON.parse(error['_body']).statusCode;
              switch (statusCode) {
                case '2033':
                  this.error = 'COMMON_STATUS_CODES.' + statusCode;
                  break;
                default:
                  this.error = 'COMMON_STATUS_CODES.' + statusCode;
                  break;
              }
              break;
          }
        }
      );
    }
  };

  /* ---- Edit Enterprise ---- */
  editEnterprise(enterpriseId) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const URL_PATTERN = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    this.month = new Date().getMonth() + 1;
    this.month = this.month.toString();
    this.year = new Date().getFullYear();
    this.year = this.year.toString();
    this.creditCardExpiryDate = this.cardTypeMonthValue + '-' + this.cardTypeYearValue;
    this.value = this.singleentEdit.longitude.split('.');
    this.value1 = this.singleentEdit.latitude.split('.');
    if (this.singleentEdit.enterpriseName === undefined || this.singleentEdit.enterpriseName.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.singleentEdit.webSite === undefined || this.singleentEdit.webSite.trim() === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_WEBSITE';
    } else if (!this.singleentEdit.webSite.match(this.URL_PATTERN)) {
      this.error = 'ENTERPRISES.VALID_WEBSITE_FORMAT';
    } else if (this.singleentEdit.ein === undefined || this.singleentEdit.ein === '' || this.singleentEdit.ein === null) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_EIN';
    } else if (this.singleentEdit.description === undefined || this.singleentEdit.description.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.imgfile !== '' && this.imgfile.type === '') {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgfile.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgStatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else if (this.singleentEdit.mobile === undefined || this.singleentEdit.mobile === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.singleentEdit.mobile.length < 12) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_WORKNUMBER';
    } else if (this.singleentEdit.email === undefined || this.singleentEdit.email.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!this.singleentEdit.email.match(this.emailpattern)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.singleentEdit.adminEmail === undefined || this.singleentEdit.adminEmail.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!this.singleentEdit.adminEmail.match(this.emailpattern)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.singleentEdit.addressLine1 === undefined || this.singleentEdit.addressLine1.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.singleentEdit.city === undefined || this.singleentEdit.city.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.singleentEdit.zip === undefined || this.singleentEdit.zip.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.singleentEdit.state === undefined || this.singleentEdit.state.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.singleentEdit.latitude === undefined || this.singleentEdit.latitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LATITUDE';
    } else if (!this.singleentEdit.latitude.match(this.LONG_LAT_PAT) || this.value1[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (!this.singleentEdit.latitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (this.singleentEdit.longitude === undefined || this.singleentEdit.longitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LONGITUDE';
    } else if (!this.singleentEdit.longitude.match(this.LONG_LAT_PAT) || this.value[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (!this.singleentEdit.longitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (this.singleentEdit.appTitle === undefined || this.singleentEdit.appTitle.trim() === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_APP_TITLE';
    } else if (this.singleentEdit.fleetCommonName === undefined || this.singleentEdit.fleetCommonName.trim() === '') {
     this.error = this.translateService.get('ENTERPRISES.VALID_NOBLANK_FLEET_COMMON_NAME');
      this.error =  this.fleetCommonName + this.error.value;
    } else if (this.singleentEdit.maxActiveReservationsPerUser === undefined || this.singleentEdit.maxActiveReservationsPerUser === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_MAX_LIMIT_ACTIVE_RESERVATIONS_PER_USER';
    } else if (this.singleentEdit.advancedReservationWindowInDays === undefined ||
      this.singleentEdit.advancedReservationWindowInDays === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_ADVANCED_RESERVATION_WINDOW_IN_DAYS';
    } else if (this.singleentEdit.maxReservationWindowInHrs === undefined || this.singleentEdit.maxReservationWindowInHrs === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_MAX_RESERVATION_WINDOW_IN_HRS';
    } else if (this.singleentEdit.reservationReminderWindowInMins === undefined ||
      this.singleentEdit.reservationReminderWindowInMins === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_RESERVATION_REMINDER_WINDOW_IN_MINS';
    } else if (this.singleentEdit.expiryHours === undefined || this.singleentEdit.expiryHours === ''
      || Number(this.singleentEdit.expiryHours) === 0) {
     this.error = this.translateService.get('ENTERPRISES.VALID_VALUE_FLEET_RESERVATION_AUTO_EXPIRES_IN_HOURS');
        this.error =  this.fleetCommonName + this.error.value;
    } else if (this.singleentEdit.expirationGracePeriodInMins === undefined || this.singleentEdit.expirationGracePeriodInMins === '') {
      this.error = 'ENTERPRISES.VALID_NOBLANK_EXPIRATION_GRACE_PERIOD_IN_MINS';
    } else if (this.singleentEdit.inactiveTimeOut === undefined || this.singleentEdit.inactiveTimeOut === ''
      || Number(this.singleentEdit.inactiveTimeOut) === 0) {
      this.error = 'ENTERPRISES.VALID_VALUE_INACTIVE_TIMEOUT_IN_MINS';
    } else if (this.singleentEdit.earlyCheckinWindowInMins === undefined || this.singleentEdit.earlyCheckinWindowInMins === ''
      || Number(this.singleentEdit.earlyCheckinWindowInMins) === 0) {
      this.error = 'ENTERPRISES.VALID_VALUE_CHECKIN_PRIOR_IN_MINS';
      // } else if (this.singleentEdit.sso === true && this.singleentEdit.ssoEmailAttribute !== undefined
      //   && this.singleentEdit.ssoEmailAttribute !== '' && !EMAIL_REGEXP.test(this.singleentEdit.ssoEmailAttribute)) {
      //   this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
      // } else if (this.singleentEdit.sso === true && this.singleentEdit.ssoLoginUrl !== undefined && this.singleentEdit.ssoLoginUrl !== ''
      //   && !URL_PATTERN.test(this.singleentEdit.ssoLoginUrl)) {
      //   this.error = 'SSOBLOCK.INVALID_LOGINURL_FORMAT';
      // } else if (this.singleentEdit.sso === true && this.singleentEdit.ssoLogoutUrl !== undefined
      //   && this.singleentEdit.ssoLoginUrl !== '' && !URL_PATTERN.test(this.singleentEdit.ssoLogoutUrl)) {
      //   this.error = 'SSOBLOCK.INVALID_LOGOUTURL_FORMAT';
    } else if (this.addressLine1.trim() === '' || this.addressLine1 === null || this.addressLine1 === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.city.trim() === '' || this.city === null || this.city === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.state === '' || this.state === null || this.state === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.zip.trim() === '' || this.zip === null || this.zip === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.creditCardType === '' || this.creditCardType === null || this.creditCardType === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_TYPE';
    } else if (this.creditCardNumber.trim() === '' || this.creditCardNumber === null || this.creditCardNumber === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_NUM';
    } else if (this.creditCardNumber.length < 19) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CREDIT_CARD_NUM';
    } else if (this.nameOnCreditCard.trim() === '' || this.nameOnCreditCard === null || this.nameOnCreditCard === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_NAME_ON_CREDIT_CARD';
    } else if (this.cardTypeMonthValue === '' || this.cardTypeMonthValue === undefined ||
      this.cardTypeYearValue === '' || this.cardTypeYearValue === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_EXPIRY_DATE';
    } else if ((this.cardTypeYearValue === this.year) && (this.month >= this.cardTypeMonthValue)) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CREDIT_CARD_EXPIRY_DATE';
    } else if (this.cvvnumber === '' || this.cvvnumber === undefined || this.cvvnumber === null) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CVV_NUMBER';
    } else if (this.cvvnumber.length < 3) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CVV_NUMBER';
    } else if (this.error === '') {
      if (this.singleentEdit.theme === 'Select') {
        this.singleentEdit.theme = '';
      } else {
        if (this.singleentEdit.ssoLoginUrl !== undefined && this.singleentEdit.ssoLoginUrl !== ''
          && this.singleentEdit.ssoLoginUrl !== null) {
          this.singleentEdit.ssoLoginUrl = this.singleentEdit.ssoLoginUrl.trim().replace(/\s\s+/g, ' ');
        } if (this.singleentEdit.ssoLogoutUrl !== undefined && this.singleentEdit.ssoLogoutUrl !== ''
          && this.singleentEdit.ssoLogoutUrl !== null) {
          this.singleentEdit.ssoLogoutUrl = this.singleentEdit.ssoLogoutUrl.trim().replace(/\s\s+/g, ' ');
        } if (this.singleentEdit.mediaassetLocation !== undefined && this.singleentEdit.mediaassetLocation !== ''
          && this.singleentEdit.mediaassetLocation !== null) {
          this.singleentEdit.mediaassetLocation = this.singleentEdit.mediaassetLocation.trim().replace(/\s\s+/g, ' ');
        }
        this.editLong = this.singleentEdit.longitude.trim().replace(/\s\s+/g, ' ');
        this.editLong = this.editLong.replace('+', '%2B');
        this.editLat = this.singleentEdit.latitude.trim().replace(/\s\s+/g, ' ');
        this.editLat = this.editLat.replace('+', '%2B');
        this.enterpriseEdit.description = this.singleentEdit.description.trim().replace(/\s\s+/g, ' ');
        this.enterpriseEdit.enterpriseIconFilePath = this.enterpriseIconFilePath;
        this.enterpriseEdit.enterpriseIcon = this.enterpriseIcon;
        this.enterpriseEdit.EIN = this.singleentEdit.ein;
        this.enterpriseEdit.enterpriseIconFilePath = this.editimagepath;
        this.enterpriseEdit.enterpriseIcon = this.editimagename;
        this.enterpriseEdit.address = {
          'addressLine1': this.autocase(this.singleentEdit.addressLine1).trim().replace(/\s\s+/g, ' '),
          'addressLine2': this.autocase(this.singleentEdit.addressLine2).trim().replace(/\s\s+/g, ' '),
          'city': this.autocase(this.singleentEdit.city).trim().replace(/\s\s+/g, ' '), 'state': this.singleentEdit.state,
          'ZIP': this.singleentEdit.zip, 'country': this.singleentEdit.country,
          'geoCoordinates': [this.editLat, this.editLong]
        };
        this.enterpriseEdit.contactDetails = {
          'email': this.singleentEdit.email,
          'workNumber': this.singleentEdit.mobile,
          'workNumberCountrycode': this.singleentEdit.workNumberCountrycode,
          'workNumberExtn': this.singleentEdit.workNumberExtn
        };
        this.enterpriseEdit.logoUrl = 'http://logo';
        this.editTimeZone = this.singleentEdit.timeZone;
        this.editTimeZone = this.editTimeZone.replace('+', '%2B');
        this.enterpriseEdit.settings = {
          'appTitle': this.autocase(this.singleentEdit.appTitle).trim().replace(/\s\s+/g, ' '),
          'fleetExpiryHours': this.singleentEdit.expiryHours,
          'adminEmail': this.singleentEdit.adminEmail,
          'enableCaptcha': this.singleentEdit.disableCaptcha,
          'inactivityTimeoutInMins': this.singleentEdit.inactiveTimeOut,
          'enablePasswordReset': this.singleentEdit.disablePasswordRes,
          'earlyCheckinWindowInMins': this.singleentEdit.earlyCheckinWindowInMins,
          'fleetCommonName': this.autocase(this.singleentEdit.fleetCommonName).trim().replace(/\s\s+/g, ' '),
          'advancedReservationWindowInDays': this.singleentEdit.advancedReservationWindowInDays,
          'reservationCanBeBumped': this.singleentEdit.reservationCanBeBumped,
          'expirationGracePeriodInMins': this.singleentEdit.expirationGracePeriodInMins,
          'longTermReservationPossible': this.singleentEdit.longTermReservationPossible,
          'maxActiveReservationsPerUser': this.singleentEdit.maxActiveReservationsPerUser,
          'maxReservationWindowInHrs': this.singleentEdit.maxReservationWindowInHrs,
          'reservationReminderWindowInMins': this.singleentEdit.reservationReminderWindowInMins,
          'sendReservationReminders': this.singleentEdit.sendReservationReminders
        };
        this.enterpriseEdit.singleSignOn = {
          'ssoEnabled': this.singleentEdit.sso,
          'ssoAlias': this.singleentEdit.ssoAlias,
          'ssoHost': this.singleentEdit.ssoHost,
          'ssoPort': this.singleentEdit.ssoPort,
          'ssoLDAPS': this.singleentEdit.ssoLDAPS,
          'ssoAccount': this.singleentEdit.ssoAccount,
          'ssoPassword': this.singleentEdit.ssoPassword,
          'ssoBaseDN': this.singleentEdit.ssoBaseDN,
          'ssoLDAPFilter': this.singleentEdit.ssoLDAPFilter,
          'ssoTimeoutInSeconds': this.singleentEdit.ssoTimeoutInSeconds,
          'ssoOnTheFlyUserCreation': this.singleentEdit.ssoOnTheFlyUserCreation,
          'ssoLoginAttribute': this.singleentEdit.ssoLoginAttribute,
          'ssoFirstnameAttribute': this.singleentEdit.ssoFirstnameAttribute,
          'ssoLastnameAttribute': this.singleentEdit.ssoLastnameAttribute,
          'ssoEmailAttribute': this.singleentEdit.ssoEmailAttribute,
          'ssoLoginUrl': this.singleentEdit.ssoLoginUrl,
          'ssoLogoutUrl': this.singleentEdit.ssoLogoutUrl
        };
        this.enterpriseEdit.preferences = {
          'defaultLanguage': this.singleentEdit.language, 'defaultTimezone': this.editTimeZone,
          'defaultTheme': this.singleentEdit.theme, 'defaultCurrency': this.singleentEdit.currency,
          'currencyFormat': this.singleentEdit.defaultcurrformat, 'dateFormat': this.singleentEdit.dateformat,
          'rowsPerPage': this.singleentEdit.rowsperpage
        };
        this.enterpriseEdit.remarks = 'Test';
        this.enterpriseEdit.meta = {
          'websiteURL': this.singleentEdit.webSite.trim().replace(/\s\s+/g, ' '),
          'mediaFilesPath': this.singleentEdit.mediaassetLocation
        };
        this.enterpriseEdit.billToDetails = {
          'addressLine1': this.addressLine1,
          'addressLine2': this.addressLine2,
          'city': this.city,
          'state': this.state,
          'ZIP': this.zip,
          'country': this.country,
          'nameOnCreditCard': this.nameOnCreditCard,
          'creditCardType': this.creditCardType,
          'creditCardNumber': this.creditCardNumber,
          'creditCardExpiryDate': this.creditCardExpiryDate,
          'cvvNumber': this.cvvnumber,
        };
        this.enterpriseEdit.isEnabled = this.singleentEdit.isEnabled;
        this.enterpriseEdit.enterpriseName = this.autocase(this.singleentEdit.enterpriseName).trim().replace(/\s\s+/g, ' ');
        this.singleEnterpriseService.EditEnterprise(this.enterpriseEdit, this.userToken, enterpriseId, this.imgfile).subscribe(
          data => {
            const condition = window.localStorage.getItem('searchenterprisesDetails');
            if (condition !== 'advanced') {
              this.deleted.emit();
            } else {
              window.localStorage.setItem('advance', 'advanced');
            }
            if (localStorage.getItem('enterpriseSearch') === 'enterpriseSearch') {
              localStorage.setItem('simpleEnterprise', 'simpleEnterprise');
            } else {
              this.deleted.emit();
            }
            window.localStorage.removeItem('enterpriseSearch');
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            this.childModal.hide();
          },
          error => {
            const status = JSON.parse(error['status']);
            switch (status) {
              case 500:
                break;
              case 400:
                const statusCode = JSON.parse(error['_body']).statusCode;
                switch (statusCode) {
                  case '2033':
                    this.error = 'COMMON_STATUS_CODES.' + statusCode;
                    break;
                  default:
                    this.error = 'COMMON_STATUS_CODES.' + statusCode;
                    break;
                }
                break;
            }
          }
        );
      }
    }
  };

  /*---- Hyphen Generator for Create ----*/
  hyphen_generateCardNumber(value) {
    if (value.length === 4) {
      (<HTMLInputElement>document.getElementById('enterprise_create_num_id')).value = value.concat('-');
    } if (value.length === 9) {
      (<HTMLInputElement>document.getElementById('enterprise_create_num_id')).value = value.concat('-');
    } if (value.length === 14) {
      (<HTMLInputElement>document.getElementById('enterprise_create_num_id')).value = value.concat('-');
    }
  }

  /*---- Hyphen Generator for Edit ----*/
  hyphen_generateCardNumberEdit(value) {
    if (value.length === 4) {
      (<HTMLInputElement>document.getElementById('enterprise_card_num_id')).value = value.concat('-');
    } if (value.length === 9) {
      (<HTMLInputElement>document.getElementById('enterprise_card_num_id')).value = value.concat('-');
    } if (value.length === 14) {
      (<HTMLInputElement>document.getElementById('enterprise_card_num_id')).value = value.concat('-');
    }
  }

  /*---- To get card types  ---*/
  public getCardTypes() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'CARD_TYPES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.cardTypes = data['result'];
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

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /*---- Function to handle initcaps ----*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /*---- Hyphen Generator for Add ----*/
  hyphen_generate(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('enterprise_create_mobile_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('enterprise_create_mobile_id')).value = value.concat('-');
    }
  }

  /*---- Hyphen Generator for Edit ----*/
  hyphen_generateEdit(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('enterprise_edit_mobile_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('enterprise_edit_mobile_id')).value = value.concat('-');
    }
  }

  /* ---- To get reasons list   ---*/
  public getblockReasons() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'ENTERPRISE_INACTIVATE_REASONS').subscribe(
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
    this.singleEnterpriseService.getLookupsList(this.userToken, 'ENTERPRISE_ACTIVATE_REASONS').subscribe(
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

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.imgSrc = '';
    this.imgfile = '';
    this.error = '';
    this.comment = '';
    this.creditCardExpiryDate = '';
    this.addressLine1 = '';
    this.addressLine2 = '';
    this.city = '';
    this.state = '';
    this.zip = '';
    this.country = '';
    this.nameOnCreditCard = '';
    this.creditCardType = '';
    this.creditCardNumber = '';
    this.enterpriseIconFilePath = '';
    this.cvvnumber = '';
    this.childModal.hide();
  }
}

export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}
