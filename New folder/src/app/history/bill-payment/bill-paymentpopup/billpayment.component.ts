/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* ngOnInit(): To load the userToken at loading time.
* keyPress(e): To autofocus a button based on opened popup.
* showChildModal(loginHistoryId):To show the popup modal.
* getEnterpriselist(): To get enterprise list names.
* getTimeZones(): To get timezones based on country.
* getPeriodTypeValues(): To get period type list.
* getCardTypes(): To get card types.
* getCountries(): To get countrys list.
* getStatus(): To get status list.
* getCountryStates(countryName): To get states based on country.
* ChangeStatus(value): To get selected status.
* startDateChange(value): To get selected start date.
* endDateChange(endvalue): To get selected end date.
* hyphen_generateCardNumber(value): Hyphen Generator.
* getYear(year): To get selected year.
* getMonth(month): To get selected month.
* getenterpriseData(): To get selected enterprise data.
* changeTimezones(timezone): To get selected timezone.
* getEnterpriseDetails(type): To split the enterprise id and name.
* getPeriodTypeValue(type): To get selected period type value.
* createBillhistory(createobj): To create bill history to service.
* editBillhistory: To Edit bill history details.
* deleteBillhistory(billId): deleteBillhistory(billId).
* LoginHistoryModalComponent have below methods.
* clearmessage(): To clear the messages.
*  hideChildModal(): To hide the modal.
*/
import { Component, OnInit, ViewChild, ViewContainerRef, HostListener, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import * as moment from 'moment/moment';
import { Billpaymentsdetails } from '../bill-paymentlist/billpaymentsdetails';
import { BillpaymentService } from '../bill-paymentpopup/billpayment.service';

@Component
  ({
    selector: 'app-billpaymenthistory-popup',
    templateUrl: 'billpayment.html',
    providers: [BillpaymentService]
  })
export class BillpaymentComponent implements OnInit {
  public billpayRec: any;
  checkInDate: any;
  enterpriseId: any;
  updateaction: any;
  enterprisesName: any;
  enterprisesNames: any;
  enterprisesSize: any;
  timezoneCode: any;
  userrole: any;
  enterpriseid: any;
  userAccount: any;
  error: any;
  pagename: any;
  userToken: any;
  toastermessage: any;
  startdate: any;
  checkOutDate: any;
  registrationCloseDate: any;
  enddate: any;
  updatedAt: any;
  createdAt: any;
  selectedduration: any;
  durationList = [];
  minDate: Date;
  storage: Storage = window.localStorage;
  updateenterpriseId: any;
  updateenterpriseName: any;
  updatenotes: any;
  enterpriseIconFilePath: any;
  duration: any;
  selecteddays: any;
  selectedhours: any;
  daysList: any = [];
  hoursList: any = [];
  maxDate: Date;
  utctimezone: any;
  utctimezonestring: any;
  timeZones: any[];
  timezoneCodes: any;
  loginUserDateFormat: any;
  // eventregistrationCloseDate: any;
  currentutc: any;
  enddate1: any;
  startdate1: any;
  errorstartdate: any;
  errorenddate: any;
  errorclosedate: any;
  actionName: any;
  billId: any;
  periodType: any;
  states: any;
  errorMessage: any;
  countries: any[];
  periodtypes: any[];
  statuslist: any[];
  enterpriseName: any;
  billPeriodType: any;
  billPeriodStartDate: any;
  billPeriodEndDate: any;
  billPeriodDuration: any;
  invoiceNumber: any;
  invoiceDate: any;
  amountDue: any;
  addressLine1: any;
  addressLine2: any;
  city: any;
  state: any;
  ZIP: any;
  country: any;
  amountPaid: any;
  paidDate: any;
  paidByCreditCartAuthorizationNumber: any;
  nameOnCreditCard: any;
  creditCardType: any;
  creditCardNumber: any;
  creditCardExpiryDate: any;
  notes: any;
  updatebillPeriodType: any;
  updatebillPeriodStartDate: any;
  updatebillPeriodEndDate: any;
  updatebillPeriodDuration: any;
  updateinvoiceNumber: any;
  updateinvoiceDate: any;
  updateamountDue: any;
  updateaddressLine1: any;
  updateaddressLine2: any;
  updatecity: any;
  updatestate: any;
  updateZIP: any;
  updatecountry: any;
  updateamountPaid: any;
  updatepaidDate: any;
  updatenameOnCreditCard: any;
  updatecreditCardType: any;
  updatecreditCardNumber: any;
  updatecreditCardExpiryDate: any;
  updatebillPaymentStatus: any;
  billPaymentStatus = 'Active';
  public cardexpDate: any = '';
  Invoicedate: any;
  startDatetime: any;
  endDatetime: any;
  errorInvoicedate: any;
  errorpaiddate: any;
  paiddate: any;
  periodstartdate: any;
  periodenddate: any;
  userpreferedtimezone: any;
  validstartdate: any;
  validenddate: any;
  paidcarddate: any;
  number: any;
  cardnumber: any;
  pstartdate: any;
  penddate: any;
  invdate: any;
  createat: any;
  updatedat: any;
  invoicedate: any;
  year1: any;
  year: any;
  yearArray = [];
  cardTypeYearValue: any;
  cardTypes: any[];
  enterpriseDetails: any;
  timeZone: any;
  cardTypeMonthValue: any;
  expiryDate: any;
  authorizationNumber: any;
  invoicedate1: any;
  month: any;
  cvvnumber: any;
  advDuration: any;
  validAmoutpaid: any;
  createobj: Billpaymentsdetails = new Billpaymentsdetails();
  @ViewChild('billHistoryModal') public billHistoryModal: ModalDirective;
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  constructor(private billpaymentservice: BillpaymentService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultDuration') private defaultDuration: number,
    @Inject('defaultDays') private defaultDays: number,
    @Inject('footerPoweredByName') public footerPoweredByName: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
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

  /*** To autofocus a button based on opened popup */
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'View') {
      if (key === 13) {
        this.billHistoryModal.hide();
      }
    }
    if (this.updateaction === 'Delete') {
      if (key === 13) {
      }
    }
  }

  /*** To show child modal ***/
  public showChildModal(updateaction, billpayments) {
    this.updateaction = updateaction;
    this.billpayRec = billpayments;
    this.error = '';
    if (updateaction === 'VIEW') {
      if (this.billpayRec.enterprise.enterpriseId) {
        const enterpriseIcon = this.billpayRec.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = this.billpayRec.enterprise.enterpriseId.enterpriseIconFilePath + '/' + enterpriseIcon;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.billpayRec.billPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.billpayRec.billPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.invoicedate = moment(this.billpayRec.invoiceDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.billpayRec.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.billpayRec.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.invoiceDate = this.billpayRec.invoiceDate;
      this.amountDue = parseFloat(this.billpayRec.amountDue).toFixed(2);
      this.pagename = 'BILL_PAYMENT_HISTORY.VIEW_BILLPAYMENT_HISTORY';
      this.actionName = 'View';
      if (this.billpayRec.payDetails.amountPaid === undefined || this.billpayRec.payDetails.amountPaid === null ||
        this.billpayRec.payDetails.amountPaid === '') {
        this.getenterpriseData();
      } else {
        this.updateamountPaid = this.billpayRec.payDetails['amountPaid'];
        this.updateamountPaid = this.updateamountPaid.toFixed(2);
        this.addressLine1 = this.billpayRec.payDetails.addressLine1;
        this.addressLine2 = this.billpayRec.payDetails.addressLine2;
        this.city = this.billpayRec.payDetails.city;
        this.updatestate = this.billpayRec.payDetails.state;
        this.updateZIP = this.billpayRec.payDetails.ZIP;
        this.country = this.billpayRec.payDetails.country;
        this.authorizationNumber = this.billpayRec.payDetails.paidByCreditCartAuthorizationNumber;
        this.updatenameOnCreditCard = this.billpayRec.payDetails.nameOnCreditCard;
        this.updatecreditCardType = this.billpayRec.payDetails.creditCardType;
        this.expiryDate = this.billpayRec.payDetails.creditCardExpiryDate;
        this.updatecreditCardNumber = this.billpayRec.payDetails.creditCardNumber;
        this.number = this.updatecreditCardNumber.split('-');
        this.number = this.number[3];
        this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
        this.cvvnumber = this.billpayRec.payDetails.cvvNumber;
        this.paiddate = moment(this.billpayRec.paidDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }

    } else if (updateaction === 'EDIT') {
      if (this.billpayRec.enterprise.enterpriseId) {
        const enterpriseIcon = this.billpayRec.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = this.billpayRec.enterprise.enterpriseId.enterpriseIconFilePath + '/' + enterpriseIcon;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate1 = moment(this.billpayRec.billPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm') +
        ' ' + this.timezoneCode[0];
      this.enddate1 = moment(this.billpayRec.billPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.invoicedate1 = moment(this.billpayRec.invoiceDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.billpayRec.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.billpayRec.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.pagename = 'BILL_PAYMENT_HISTORY.EDIT_BILLPAYMENT_HISTORY';
      this.actionName = 'Edit';
      this.getCountries();
      // this.getPeriodTypeValues();
      this.getTimeZones();
      this.getCardTypes();
      this.updateenterpriseName = this.billpayRec.enterprise.enterpriseName;
      this.startdate = this.billpayRec.billPeriodStartDate;
      this.enddate = this.billpayRec.billPeriodEndDate;
      this.invoicedate = this.billpayRec.invoiceDate;
      this.paiddate = moment(this.updatepaidDate).format('YYYY-MM-DD HH:mm');
      this.updatebillPeriodType = this.billpayRec.billPeriodType;
      this.updateamountDue = parseFloat(this.billpayRec.amountDue).toFixed(2);
      this.updatenotes = this.billpayRec.notes;
      this.updatebillPaymentStatus = this.billpayRec.billPaymentStatus;
      this.updateinvoiceNumber = this.billpayRec.invoiceNumber;
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcformat = timezonevalue[0].split('-');
      this.userpreferedtimezone = utcformat[0].trim();
      this.timezoneCodes = utcformat[0].trim();
      if (this.billpayRec.payDetails.amountPaid === undefined || this.billpayRec.payDetails.amountPaid === null ||
        this.billpayRec.payDetails.amountPaid === '') {
        this.getenterpriseData();
      } else {
        this.updateamountPaid = this.billpayRec.payDetails['amountPaid'];
        this.updateamountPaid = this.updateamountPaid.toFixed(2);
        this.addressLine1 = this.billpayRec.payDetails.addressLine1;
        this.addressLine2 = this.billpayRec.payDetails.addressLine2;
        this.city = this.billpayRec.payDetails.city;
        this.updatestate = this.billpayRec.payDetails.state;
        this.updateZIP = this.billpayRec.payDetails.ZIP;
        this.country = this.billpayRec.payDetails.country;
        this.authorizationNumber = this.billpayRec.payDetails.paidByCreditCartAuthorizationNumber;
        this.updatenameOnCreditCard = this.billpayRec.payDetails.nameOnCreditCard;
        this.updatecreditCardType = this.billpayRec.payDetails.creditCardType;
        this.updatecreditCardNumber = this.billpayRec.payDetails.creditCardNumber;
        this.number = this.updatecreditCardNumber.split('-');
        this.number = this.number[3];
        this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
        this.expiryDate = this.billpayRec.payDetails.creditCardExpiryDate;
        this.cardTypeMonthValue = this.expiryDate.split('-');
        this.cardTypeMonthValue = this.cardTypeMonthValue[0];
        this.cardTypeYearValue = this.expiryDate.split('-');
        this.cardTypeYearValue = this.cardTypeYearValue[1];
        this.cvvnumber = this.billpayRec.payDetails.cvvNumber;
        this.getCountryStates(this.billpayRec.payDetails['country']);
      }
      this.year = new Date().getFullYear();
      for (let i = 0; i <= 20; i++) {
        this.year1 = this.year + i;
        this.yearArray.push(this.year1);
      }
    } else if (updateaction === 'DELETE') {
      if (this.billpayRec.enterprise.enterpriseId) {
        const enterpriseIcon = this.billpayRec.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = this.billpayRec.enterprise.enterpriseId.enterpriseIconFilePath + '/' + enterpriseIcon;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.pagename = 'BILL_PAYMENT_HISTORY.DELETE_BILLPAYMENT';
      this.actionName = 'Delete';
      this.amountDue = parseFloat(this.billpayRec.amountDue).toFixed(2);
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.billpayRec.billPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.billpayRec.billPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.invoicedate = moment(this.billpayRec.invoiceDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.billpayRec.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.billpayRec.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.billpayRec.payDetails.amountPaid === undefined || this.billpayRec.payDetails.amountPaid === null ||
        this.billpayRec.payDetails.amountPaid === '') {
        this.getenterpriseData();
      } else {
        this.updateamountPaid = this.billpayRec.payDetails['amountPaid'];
        this.updateamountPaid = this.updateamountPaid.toFixed(2);
        this.addressLine1 = this.billpayRec.payDetails.addressLine1;
        this.addressLine2 = this.billpayRec.payDetails.addressLine2;
        this.city = this.billpayRec.payDetails.city;
        this.updatestate = this.billpayRec.payDetails.state;
        this.updateZIP = this.billpayRec.payDetails.ZIP;
        this.country = this.billpayRec.payDetails.country;
        this.authorizationNumber = this.billpayRec.payDetails.paidByCreditCartAuthorizationNumber;
        this.updatenameOnCreditCard = this.billpayRec.payDetails.nameOnCreditCard;
        this.updatecreditCardType = this.billpayRec.payDetails.creditCardType;
        this.expiryDate = this.billpayRec.payDetails.creditCardExpiryDate;
        this.updatecreditCardNumber = this.billpayRec.payDetails.creditCardNumber;
        this.number = this.updatecreditCardNumber.split('-');
        this.number = this.number[3];
        this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
        this.cvvnumber = this.billpayRec.payDetails.cvvNumber;
        this.paiddate = moment(this.billpayRec.paidDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }

    } else if (updateaction === 'CREATE') {
      this.startdate = '';
      this.enddate = '';
      this.paiddate = '';
      this.paidcarddate = '';
      this.Invoicedate = '';
      this.invoiceNumber = '';
      this.amountDue = '';
      this.notes = '';
      this.pagename = 'BILL_PAYMENT_HISTORY.CREATE_BILLPAYMENT';
      this.actionName = 'Create';
      this.getCountries();
      this.getPeriodTypeValues();
      this.getStatus();
      this.getEnterpriselist();
      // if (window.localStorage.getItem('userrole') === 'Enterprise End User') {
      //   this.userId = window.localStorage.getItem('user_id');
      //   this.userAccount = window.localStorage.getItem('user_Account');
      // }
      this.getTimeZones();
      /**--- Convert User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.selecteddays = '0';
      this.selectedhours = '00';
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.Invoicedate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      // this.eventregistrationCloseDate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() -
      //   Number(5)))).format('YYYY-MM-DD HH:mm');
      this.maxDate = new Date(moment(moment(this.startdate).days((moment(this.startdate).days()
        + Number(7)))).format('YYYY-MM-DD HH:mm'));
      this.registrationCloseDate = new Date();
      this.checkInDate = new Date();
      this.checkOutDate = new Date();
      this.minDate = new Date();
    }
    this.billHistoryModal.show();
  }

  /* To get enterprise list names */
  getEnterpriselist() {
    this.billpaymentservice.getEnterprises(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseId = data['result'][0]._id;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterprisesName = data['result'][0].enterpriseName;
            this.enterprisesSize = true;
          } else {
            this.enterprisesNames = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }

  /*---- To get timezones based on country   ---*/
  public getTimeZones() {
    this.billpaymentservice.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.timeZone = data['result'];
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

  /*---- To get period type list ---*/
  public getPeriodTypeValues() {
    this.billpaymentservice.getLookupsList(this.userToken, 'BILLING_CYCLES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.periodtypes = data['result'];
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

  /*** getCardTypes():To get card types  ***/
  public getCardTypes() {
    this.billpaymentservice.getLookupsList(this.userToken, 'CARD_TYPES').subscribe(
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

  /*---- To get countrys list ---*/
  public getCountries() {
    this.billpaymentservice.getLookupsList(this.userToken, 'COUNTRIES').subscribe(
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

  /*** To get status list ***/
  public getStatus() {
    this.billpaymentservice.getLookupsList(this.userToken, 'ENTERPRISE_STATUSES').subscribe(
      data => {
        this.statuslist = data['result'];
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
  changeCountry(countryName) {
    this.updatestate = '';
    this.billpaymentservice.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
      },
      error => this.errorMessage = <any>error);
  }

  /*** To get states based on country   ***/
  getCountryStates(countryName) {
    //this.updatestate = '';
    this.billpaymentservice.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
      },
      error => this.errorMessage = <any>error);
  }

  /*** To get selected status ***/
  ChangeStatus(value) {
    this.billPaymentStatus = value;
  }

  /*** To get selected start date ***/
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
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
      this.maxDate = new Date(moment(moment(this.startdate).days((moment(this.startdate).days()
        + Number(7)))).format('YYYY-MM-DD HH:mm'));
    }
  }

  /*** To get selected end date */
  endDateChange(endvalue) {
    const endate = moment(endvalue).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.enddate1 = moment(endate).add(utctimesplit[0], 'hours');
      this.enddate1 = moment(this.enddate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.enddate1 = moment(endate).subtract(utctimesplit[0], 'hours');
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

  /*** Hyphen Generator ***/
  hyphen_generateCardNumber(value) {
    if (value.length === 4) {
      (<HTMLInputElement>document.getElementById('enterprise_card_num_id')).value = value.concat('-');
    } if (value.length === 9) {
      (<HTMLInputElement>document.getElementById('enterprise_card_num_id')).value = value.concat('-');
    } if (value.length === 14) {
      (<HTMLInputElement>document.getElementById('enterprise_card_num_id')).value = value.concat('-');
    }
  }

  /*** To get selected year ***/
  getYear(year) {
    this.cardTypeYearValue = year;
  }

  /*** To get selected month ***/
  getMonth(month) {
    this.cardTypeMonthValue = month;
  }

  /*** To get selected enterprise data ***/
  getenterpriseData() {
    this.updateenterpriseId = this.billpayRec['enterprise'].enterpriseId._id;
    this.billpaymentservice.getenterprisesdata(this.userToken, this.updateenterpriseId)
      .subscribe(data => {
        this.enterpriseDetails = data['result'];
        this.addressLine1 = this.enterpriseDetails.billToDetails['addressLine1'];
        this.addressLine2 = this.enterpriseDetails.billToDetails.addressLine2;
        this.city = this.enterpriseDetails.billToDetails.city;
        this.updatestate = this.enterpriseDetails.billToDetails.state;
        this.updateZIP = this.enterpriseDetails.billToDetails.ZIP;
        this.country = this.enterpriseDetails.billToDetails.country;
        this.updatenameOnCreditCard = this.enterpriseDetails.billToDetails.nameOnCreditCard;
        this.updatecreditCardType = this.enterpriseDetails.billToDetails.creditCardType;
        this.expiryDate = this.enterpriseDetails.billToDetails.creditCardExpiryDate;
        this.cardTypeMonthValue = this.expiryDate.split('-');
        this.cardTypeMonthValue = this.cardTypeMonthValue[0];
        this.cardTypeYearValue = this.expiryDate.split('-');
        this.cardTypeYearValue = this.cardTypeYearValue[1];
        this.updatecreditCardNumber = this.enterpriseDetails.billToDetails.creditCardNumber;
        this.number = this.updatecreditCardNumber.split('-');
        this.number = this.number[3];
        this.cardnumber = 'XXXX-XXXX-XXXX' + '-' + this.number;
        this.cvvnumber = this.enterpriseDetails.billToDetails.cvvNumber;
        this.getCountryStates(this.enterpriseDetails.billToDetails['country']);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      }
      );
  }

  /*** To get selected timezone ***/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*** To split the enterprise id and name ***/
  getEnterpriseDetails(type) {
    const value = type.split('$');
    this.enterpriseId = value[0];
    this.enterprisesName = value[1];
    this.enterpriseIconFilePath = value[2] + '/' + value[3];
  }

  /*** To get selected period type value  ***/
  getPeriodTypeValue(type) {
    this.billPeriodType = type;
  }

  /*** To create bill history to service ***/
  createBillhistory(createobj) {
    this.errorstartdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
    this.errorenddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
    this.errorInvoicedate = moment(this.Invoicedate).format('YYYY-MM-DD HH:mm');
    this.errorpaiddate = moment(this.paiddate).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
      this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');
      this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
      this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
      this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
      this.Invoicedate = moment(this.Invoicedate).add(utctimesplit[0], 'hours');
      this.Invoicedate = moment(this.Invoicedate).add(utctimesplit[1], 'minutes');
      this.Invoicedate = moment(this.Invoicedate).format('YYYY-MM-DD HH:mm');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
      this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');
      this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
      this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
      this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
      this.Invoicedate = moment(this.Invoicedate).subtract(utctimesplit[0], 'hours');
      this.Invoicedate = moment(this.Invoicedate).subtract(utctimesplit[1], 'minutes');
      this.Invoicedate = moment(this.Invoicedate).format('YYYY-MM-DD HH:mm');
    }
    this.validstartdate = this.startdate;
    this.validenddate = this.enddate;
    if (this.enterprisesName === '' || this.enterprisesName === null || this.enterprisesName === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
    } else if (this.invoiceNumber === '' || this.invoiceNumber === null || this.invoiceNumber === undefined) {
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_INVOICE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
    } else if (this.Invoicedate === '' || this.Invoicedate === null || this.Invoicedate === undefined) {
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_INVOICEDATE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
    } else if (this.billPeriodType === '' || this.billPeriodType === null || this.billPeriodType === undefined) {
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_BILLPERIOD';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
    } else if (this.validstartdate === '' || this.validstartdate === undefined ||
      this.validstartdate === null) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
    } else if (this.validenddate === '' || this.validenddate === undefined || this.validenddate === null) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
    } else if (this.validstartdate >=
      this.validenddate) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.validstartdate < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
    ) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.validenddate < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.amountDue === '' || this.amountDue === null || this.amountDue === undefined || parseInt(this.amountDue) === 0) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_AMOUNTDUE';
    } else if (this.billPaymentStatus === '' || this.billPaymentStatus === null || this.billPaymentStatus === undefined) {
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
      this.Invoicedate = this.errorInvoicedate;
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_STATUS';
    } else {
      this.amountDue = parseFloat(this.amountDue).toFixed(2);

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
      this.advDuration = selecteddays + 'D' + ' ' + hrs + 'H' + ' ' + mins + 'M';
      const createBillPayment = {

        'enterprise': {
          'enterpriseId': this.enterpriseId,
          'enterpriseName': this.enterprisesName
        },
        'billPeriodType': this.billPeriodType, // LOV (BILLING_CYCLES) - Monthly, Quarterly, Half Yearly, Yearly...
        'billPeriodStartDate': moment(this.startdate).format('YYYY-MM-DD HH:mm'),
        'billPeriodEndDate': moment(this.enddate).format('YYYY-MM-DD HH:mm'),
        // 'billPeriodDuration': advDuration,
        'billPaymentStatus': this.billPaymentStatus, // LOV - Invoiced/Partially Paid/Paid
        'invoiceNumber': this.invoiceNumber,
        'invoiceDate': moment(this.Invoicedate).format('YYYY-MM-DD HH:mm'),
        'amountDue': this.amountDue,
        'payDetails': {
          'addressLine1': '',
          'addressLine2': '',
          'city': '',
          'state': '',
          'ZIP': '',
          'country': '',
          'amountPaid': '',
          'paidDate': '',
          'paidByCreditCartAuthorizationNumber': '',
          'nameOnCreditCard': '',
          'creditCardType': '',
          'creditCardNumber': '',
          'creditCardExpiryDate': '',
          'cvvNumber': ''
        },
        'notes': this.notes,
      };
      this.billpaymentservice.createBillhistory(createBillPayment, this.userToken)
        .subscribe(data => {
          this.periodstartdate = this.errorstartdate;
          this.periodenddate = this.errorenddate;
          this.Invoicedate = this.errorInvoicedate;
          this.paiddate = this.errorpaiddate;
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          this.Invoicedate = this.errorInvoicedate;
          this.billHistoryModal.hide();
          this.enterpriseIconFilePath = '';
          this.deleted.emit('submit');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.clearmessage();
        }, error => {
          this.periodstartdate = this.errorstartdate;
          this.periodenddate = this.errorenddate;
          this.Invoicedate = this.errorInvoicedate;
          this.paiddate = this.errorpaiddate;
          this.registrationCloseDate = this.errorclosedate;
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          this.Invoicedate = this.errorInvoicedate;
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (JSON.parse(error['_body']).statusCode) {
            case '9961':
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
            case '9995':
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              break;
            case '2057':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
            case '2060':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
            case '2059':
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
              break;
            // case '2062':
            //   this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            //   break;
            case '9998':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
          }
        });
    }
  }

  /***   To Edit bill history details ***/
  editBillhistory(editobj) {
    this.creditCardExpiryDate = this.cardTypeMonthValue + '-' + this.cardTypeYearValue;
    this.paiddate = new Date();
    this.month = new Date().getMonth() + 1;
    this.month = this.month.toString();
    this.year = new Date().getFullYear();
    this.year = this.year.toString();
    this.validAmoutpaid = parseInt(this.updateamountPaid);
    if (this.updateamountPaid === '' || this.updateamountPaid === undefined || this.validAmoutpaid === 0) {
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_AMOUNT_PAID';
    } else if (parseFloat(this.validAmoutpaid) > parseFloat(this.updateamountDue)) {
      this.error = 'BILL_PAYMENT_HISTORY.VALID_NOBLANK_INCORRECT_AMOUNT_PAID';
    } else if (this.updatecreditCardType === '' || this.updatecreditCardType === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_TYPE';
    } else if (this.updatecreditCardNumber === '' || this.updatecreditCardNumber === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_NUM';
    } else if (this.updatecreditCardNumber.length < 19) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CREDIT_CARD_NUM';
    } else if (this.cardTypeMonthValue === '' || this.cardTypeMonthValue === undefined ||
      this.cardTypeYearValue === '' || this.cardTypeYearValue === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CREDIT_CARD_EXPIRY_DATE';
    } else if ((this.cardTypeYearValue === this.year) && (this.month >= this.cardTypeMonthValue)) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CREDIT_CARD_EXPIRY_DATE';
    } else if (this.updatenameOnCreditCard === '' || this.updatenameOnCreditCard === undefined) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_NAME_ON_CREDIT_CARD';
    } else if (this.cvvnumber === '' || this.cvvnumber === undefined || this.cvvnumber === null) {
      this.error = 'ENTERPRISES.VALID_NOBLANK_CVV_NUMBER';
    } else if (this.cvvnumber.length < 3) {
      this.error = 'ENTERPRISES.VALID_INCORRECT_CVV_NUMBER';
    } else if (this.addressLine1.trim() === '' || this.addressLine1 === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.city === '' || this.city === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.updatestate === '' || this.updatestate === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.updateZIP === '' || this.updateZIP === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.error === '') {
      const editBillPayment = {
        'enterprise': {
          'enterpriseId': this.updateenterpriseId,
          'enterpriseName': this.updateenterpriseName
        },
        '_id': editobj._id,
        'billPeriodType': this.updatebillPeriodType, // LOV (BILLING_CYCLES) - Monthly, Quarterly, Half Yearly, Yearly...
        'billPeriodStartDate': moment(this.billpayRec.billPeriodStartDate).format('YYYY-MM-DD HH:mm'),
        'billPeriodEndDate': moment(this.billpayRec.billPeriodEndDate).format('YYYY-MM-DD HH:mm'),
        'billPeriodDuration': this.updatebillPeriodDuration,
        'billPaymentStatus': this.updatebillPaymentStatus, // LOV - Invoiced/Partially Paid/Paid
        'invoiceNumber': this.updateinvoiceNumber,
        'invoiceDate': moment(this.billpayRec.invoiceDate).format('YYYY-MM-DD HH:mm'),
        'amountDue': this.updateamountDue,
        'payDetails': {
          'addressLine1': this.addressLine1,
          'addressLine2': this.addressLine2,
          'city': this.city,
          'state': this.updatestate,
          'ZIP': this.updateZIP,
          'country': this.country,
          'amountPaid': this.updateamountPaid,
          'paidDate': this.paiddate,
          'creditCardType': this.updatecreditCardType,
          'paidByCreditCartAuthorizationNumber': this.authorizationNumber,
          'nameOnCreditCard': this.updatenameOnCreditCard,
          'creditCardNumber': this.updatecreditCardNumber,
          'creditCardExpiryDate': this.creditCardExpiryDate,
          'cvvNumber': this.cvvnumber
        },
        'notes': this.updatenotes,
      };
      this.billpaymentservice.updateBillhistory(editBillPayment, editobj._id, this.userToken)
        .subscribe(
        data => {
          if (window.localStorage.getItem('Advance') === 'AdvanceSearch') {
            window.localStorage.setItem('billpaymentadvance', 'billpaymentadvanceadvanceList');
          } else if (window.localStorage.getItem('normal') === 'normalSearch') {
            window.localStorage.setItem('simplesearch', 'searchsearchList');
          } else {
            this.deleted.emit('submit');
          }
          window.localStorage.removeItem('Advance');
          window.localStorage.removeItem('normal');
          this.billHistoryModal.hide();
          this.hideChildModal();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.clearmessage();
        }, error => {
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (JSON.parse(error['_body']).statusCode) {
            case '1005':
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
          }
        });
    }
  }

  /***   To delete bill history details ***/
  deleteBillhistory(billId) {
    this.billpaymentservice.deleteBillhistory(billId, this.userToken)
      .subscribe(
      data => {
        if (window.localStorage.getItem('Advance') === 'AdvanceSearch') {
          window.localStorage.setItem('billpaymentadvance', 'billpaymentadvanceadvanceList');
        } else if (window.localStorage.getItem('normal') === 'normalSearch') {
          window.localStorage.setItem('simplesearch', 'searchsearchList');
        } else {
          this.deleted.emit('submit');
        }
        window.localStorage.removeItem('Advance');
        window.localStorage.removeItem('normal');
        this.billHistoryModal.hide();

        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      }, error => {
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (JSON.parse(error['_body']).statusCode) {
          case '9961':
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
          case '2013':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9997':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9998':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
        }
      });
  }

  /*** To clear the messages ***/
  public clearmessage() {
    this.error = '';
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.enterpriseIconFilePath = '';
    this.error = '';
    this.updatecreditCardType = '';
    this.updatestate = '';
    this.updateamountPaid = '';
    this.paiddate = '';
    this.paidDate = '';
    this.addressLine1 = '';
    this.addressLine2 = '';
    this.city = '';
    this.updateZIP = '';
    this.country = '';
    this.authorizationNumber = '';
    this.expiryDate = '';
    this.updatecreditCardType = '';
    this.updatenameOnCreditCard = '';
    this.cvvnumber = '';
    this.billHistoryModal.hide();
  }
}
