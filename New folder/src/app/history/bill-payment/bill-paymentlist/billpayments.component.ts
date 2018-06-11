/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 *  HistoryComponent have below methods.
 * ngOnInit():  This method is used to fetch required details at loading time.
 * ngAfterViewInit(): This method is called after a component's view has been fully initialized.
 * ngAfterContentChecked(): This method is used after every check of a directive's content.
 * billPayment(selectedaction, billpayments): To open bill payment popups.
 * delete(event): To call billpayment History.
 * getLoginHistoryList(): To get all login history list.
 * getBillpaymenthistory(searchstring): To get login history search results list.
 * exportData(searchstring): This method used to download the data.
 * handleKeyPress(e): To autofocusing on search.
 * advancedBillpaymentsearch(): To open advanced popup.
 * advancedBillpaymenthistory(): To send advanced search data.
 * gettimeZones(): To get timezones list.
 * getPeriodTypeValues(): To get period types list.
 * getStatus(): To get Enterprise status list.
 * changeTimezones(timezone): To get timezone value.
 * clearmessages(): To clear the errormessages.
 * clearBillpaymentAdvancedModal(): To clear the advaced model data.
 * hideBillpaymentAdvancedModal(): To hide the advance popup model.
*/
import { Component, OnInit, AfterContentChecked, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import { ViewContainerRef, ViewChild, ViewChildren, Inject } from '@angular/core';
import { BillpaymentsService } from './billpayments.service';
import { BillpaymentComponent } from '../bill-paymentpopup/billpayment.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Billpaymentsdetails } from './billpaymentsdetails';
import * as moment from 'moment/moment';
@Component({
  templateUrl: 'billpayments.html',
  providers: [BillpaymentsService]
})
export class BillpaymentsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  import: Menuitem[];
  billpaymentsDetails: Array<Billpaymentsdetails> = [];
  userToken: any;
  stacked: boolean;
  searchstring: any;
  status: any;
  toastermessage: any;
  rowsPerPage = 10;
  // time zones
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  loginUserDateFormat: any;
  advanced: any;
  enterpriseName: any;
  error: any = '';
  timeZones: any[];
  timezoneCodes: any;
  timezoneCode: any;
  startdate: any = '';
  enddate: any = '';
  errorstartdate: any;
  errorenddate: any;
  currentutc: any;
  adverrefresh: any = 'true';
  enterpriseIconFilePath: any;
  userrole: any;
  enterpriseNames: any;
  storage: Storage = window.localStorage;
  paymentstatus: any = '';
  amountdue: any = '';
  invoicenumber: any = '';
  invoicedate: any = '';
  errorinvoicedate: any;
  statuslist: any;
  periodtypes: any;
  billPeriodType: any = '';
  fleetValues: any;
  fleetvaluestatus = false;
  periodType: any;
  Paidstartdate: any = '';
  Paidenddate: any = '';
  Invoicestartdate: any = '';
  Invoiceenddate: any = '';
  errorPaidstartdate: any;
  errorPaidenddate: any;
  errorInvoicestartdate: any;
  errorInvoiceenddate: any;
  viewstatus: any;
  addstatus: any;
  deletestatus: any;
  exportstatus: any;
  editstatus: any;
  liststatus: any;

  @ViewChildren('input') vc;
  @ViewChild(BillpaymentComponent)
  private billpaymentModalComponent: BillpaymentComponent;
  @ViewChild('billpaymentadvancedModel') public billpaymentadvancedModel: ModalDirective;
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  /**---- Constructor for bill and payment history component ----*/
  constructor(private historyService: BillpaymentsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  /*---- To get required details at loading time ----*/
  ngOnInit() {
    this.addstatus = window.localStorage.getItem('billpaymentaddstatus');
    this.viewstatus = window.localStorage.getItem('billpaymentviewstatus');
    this.editstatus = window.localStorage.getItem('billpaymenteditstatus');
    this.exportstatus = window.localStorage.getItem('billpaymentexportstatus');
    this.deletestatus = window.localStorage.getItem('billpaymentdeletedstatus');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.liststatus = window.localStorage.getItem('billpaymentliststatus');
    this.userToken = window.localStorage.getItem('token');
    // time zone convert code
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getBillPaymentHistoryList();
      this.import = [
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
  }

  /*** This method is called after a component's view has been fully initialized ***/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /***  This method is used after every check of a directive's content ***/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('billpaymentadvance') === 'billpaymentadvanceadvanceList') {
      this.advancedBillpaymenthistory();
      window.localStorage.removeItem('billpaymentadvance');
    } else if (window.localStorage.getItem('simplesearch') === 'searchsearchList') {
      this.getBillpaymenthistory(this.searchstring);
      window.localStorage.removeItem('simplesearch');
    }

  }

  /*** To open bill payment popups ***/
  billPayment(selectedaction, billpayments) {
    this.billpaymentModalComponent.showChildModal(selectedaction, billpayments);
  }

  /*** To open advanced popup ***/
  public advancedBillpaymentsearch(): void {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.gettimeZones();
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.billpaymentadvancedModel.show();
    this.getStatus();
    this.getPeriodTypeValues();
  }

  /*** To get timezones list ***/
  public gettimeZones() {
    this.historyService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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

  /*** To get timezone value ***/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*** To get period types list ***/
  public getPeriodTypeValues() {
    this.historyService.getLookupsList(this.userToken, 'BILLING_CYCLES').subscribe(
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

  /*** To get Enterprise status list ***/
  public getStatus() {
    this.historyService.getLookupsList(this.userToken, 'ENTERPRISE_STATUSES').subscribe(
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

  /*** To call billpayment History ***/
  delete(event) {
    this.getBillPaymentHistoryList();
  }

  /*** To get the billpayment history list ***/
  getBillPaymentHistoryList() {
    this.historyService.getBillPaymentHistoryList(this.userToken)
      .subscribe(
      data => {
        for (let i = 0; i < data['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).utc().add(utctimesplit[0], 'hours');
            data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).add(utctimesplit[1], 'minutes');
            data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate)
              .format(this.loginUserDateFormat + ' HH:mm');

            data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).utc().add(utctimesplit[0], 'hours');
            data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).add(utctimesplit[1], 'minutes');
            data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate)
              .format(this.loginUserDateFormat + ' HH:mm');

            if (data['result'][i].invoiceDate !== null) {
              data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).add(utctimesplit[1], 'minutes');
              data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate)
                .format(this.loginUserDateFormat + ' HH:mm');
            }

            if (data['result'][i].payDetails.paidDate !== null) {
              data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).add(utctimesplit[1], 'minutes');
              data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate)
                .format(this.loginUserDateFormat + ' HH:mm');
            }

            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');

          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');

            data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).subtract(utctimesplit[1], 'minutes');
            data['result'][i].billPeriodStartDate = moment(data['result'][i]
              .billPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');

            data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).subtract(utctimesplit[1], 'minutes');
            data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate)
              .format(this.loginUserDateFormat + ' HH:mm');

            if (data['result'][i].invoiceDate !== null) {
              data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate)
                .format(this.loginUserDateFormat + ' HH:mm');
            }

            if (data['result'][i].payDetails.paidDate !== null) {
              data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate)
                .format(this.loginUserDateFormat + ' HH:mm');
            }
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
          data['result'][i].amountDue = parseFloat(data['result'][i].amountDue).toFixed(2);
        }
        this.billpaymentsDetails = data['result'];
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
      });
  }

  /*** To get the billpayment history search results list ***/
  public getBillpaymenthistory(searchstring) {
    window.localStorage.removeItem('Advance');
    if (searchstring) {
      this.historyService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        data => {
          window.localStorage.setItem('normal', 'normalSearch');
          for (let i = 0; i < data['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).add(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate)
                .format(this.loginUserDateFormat + ' HH:mm');

              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).add(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate)
                .format(this.loginUserDateFormat + ' HH:mm');

              if (data['result'][i].invoiceDate !== null) {
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).utc().add(utctimesplit[0], 'hours');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).add(utctimesplit[1], 'minutes');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }

              if (data['result'][i].payDetails.paidDate !== null) {
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).utc().add(utctimesplit[0], 'hours');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).add(utctimesplit[1], 'minutes');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }

              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');

            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');

              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodStartDate = moment(data['result'][i]
                .billPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');

              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate)
                .format(this.loginUserDateFormat + ' HH:mm');

              if (data['result'][i].invoiceDate !== null) {
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).subtract(utctimesplit[1], 'minutes');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }

              if (data['result'][i].payDetails.paidDate !== null) {
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).utc().
                  subtract(utctimesplit[0], 'hours');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).subtract(utctimesplit[1], 'minutes');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
            data['result'][i].amountDue = parseFloat(data['result'][i].amountDue).toFixed(2);
          }
          this.billpaymentsDetails = data['result'];
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 400:
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9997') {
                this.billpaymentsDetails = [];
              } break;
            case 500:
              break;
          }
        }
        );
    } else {
      this.getBillPaymentHistoryList();
    }
  }

  /*** To send advanced search data ***/
  advancedBillpaymenthistory() {
    this.errorstartdate = this.startdate;
    this.errorenddate = this.enddate;
    this.errorPaidstartdate = this.Paidstartdate;
    this.errorPaidenddate = this.Paidenddate;
    this.errorInvoicestartdate = this.Invoicestartdate;
    this.errorInvoiceenddate = this.Invoiceenddate;
    this.errorinvoicedate = this.invoicedate;
    if (this.startdate !== '' && this.enddate !== '' && this.startdate > this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
    } else if (this.Paidstartdate !== '' && this.Paidenddate !== '' && this.Paidstartdate > this.Paidenddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.Paidstartdate = this.errorPaidstartdate;
      this.Paidenddate = this.errorPaidenddate;
    } else if (this.Invoicestartdate !== '' && this.Invoiceenddate !== '' && this.Invoicestartdate > this.Invoiceenddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.Invoicestartdate = this.errorInvoicestartdate;
      this.Invoiceenddate = this.errorInvoiceenddate;
    } else {
      window.localStorage.setItem('Advance', 'AdvanceSearch');
      /** ----- Convert prefered time zone to utc format start----- */

      if (this.startdate !== '' && this.startdate !== undefined && this.startdate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');

        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');

        }
        this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      }
      /**---------   Converting timezone for the paid start date   ----------*/
      if (this.Paidstartdate !== '' && this.Paidstartdate !== undefined && this.Paidstartdate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.Paidstartdate = moment(this.Paidstartdate).add(utctimesplit[0], 'hours');
          this.Paidstartdate = moment(this.Paidstartdate).add(utctimesplit[1], 'minutes');

        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.Paidstartdate = moment(this.Paidstartdate).subtract(utctimesplit[0], 'hours');
          this.Paidstartdate = moment(this.Paidstartdate).subtract(utctimesplit[1], 'minutes');

        }
        this.Paidstartdate = moment(this.Paidstartdate).format('YYYY-MM-DD HH:mm');
      }
      /**---------   Converting timezone for the paid start date   ----------*/
      if (this.Invoicestartdate !== '' && this.Invoicestartdate !== undefined && this.Invoicestartdate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.Invoicestartdate = moment(this.Invoicestartdate).add(utctimesplit[0], 'hours');
          this.Invoicestartdate = moment(this.Invoicestartdate).add(utctimesplit[1], 'minutes');

        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.Invoicestartdate = moment(this.Invoicestartdate).subtract(utctimesplit[0], 'hours');
          this.Invoicestartdate = moment(this.Invoicestartdate).subtract(utctimesplit[1], 'minutes');

        }
        this.Invoicestartdate = moment(this.Invoicestartdate).format('YYYY-MM-DD HH:mm');
      }
      if (this.enddate !== '' && this.enddate !== undefined && this.enddate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');

          this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');

          this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
        }
        this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
      }
      /**---------   Converting timezone for the paid end date   ----------*/
      if (this.Paidenddate !== '' && this.Paidenddate !== undefined && this.Paidenddate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');

          this.Paidenddate = moment(this.Paidenddate).add(utctimesplit[0], 'hours');
          this.Paidenddate = moment(this.Paidenddate).add(utctimesplit[1], 'minutes');
        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');

          this.Paidenddate = moment(this.Paidenddate).subtract(utctimesplit[0], 'hours');
          this.Paidenddate = moment(this.Paidenddate).subtract(utctimesplit[1], 'minutes');
        }
        this.Paidenddate = moment(this.Paidenddate).format('YYYY-MM-DD HH:mm');
      }
      /**---------   Converting timezone for the paid end date   ----------*/
      if (this.Invoiceenddate !== '' && this.Invoiceenddate !== undefined && this.Invoiceenddate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');

          this.Invoiceenddate = moment(this.Invoiceenddate).add(utctimesplit[0], 'hours');
          this.Invoiceenddate = moment(this.Invoiceenddate).add(utctimesplit[1], 'minutes');
        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');

          this.Invoiceenddate = moment(this.Invoiceenddate).subtract(utctimesplit[0], 'hours');
          this.Invoiceenddate = moment(this.Invoiceenddate).subtract(utctimesplit[1], 'minutes');
        }
        this.Invoiceenddate = moment(this.Invoiceenddate).format('YYYY-MM-DD HH:mm');
      }
      if (this.enterpriseName !== '' && this.enterpriseName !== undefined && this.enterpriseName !== null) {
        this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.invoicenumber !== '' && this.invoicenumber !== undefined && this.invoicenumber !== null) {
        this.invoicenumber = this.invoicenumber.trim().replace(/\s\s+/g, ' ');
      }
      if (this.amountdue !== '' && this.amountdue !== undefined && this.amountdue !== null) {
        this.amountdue = this.amountdue.trim().replace(/\s\s+/g, ' ');
      }
      this.advanced = {
        'enterprise': this.enterpriseName,
        'billPeriodStartDate': this.startdate,
        'billPeriodEndDate': this.enddate,
        'paidStartDate': this.Paidstartdate,
        'paidEndDate': this.Paidenddate,
        'invoiceStartDate': this.Invoicestartdate,
        'invoiceEndDate': this.Invoiceenddate,
        'periodType': this.billPeriodType,
        'billPaymentStatus': this.paymentstatus,
        'invoiceNumber': this.invoicenumber,
      };
      this.historyService.billpaymentSearchAdvance(this.advanced, this.userToken).subscribe(
        data => {
          this.billpaymentadvancedModel.hide();
          window.localStorage.setItem('billpaymentSearchAdvance', 'search');
          for (let i = 0; i < data['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).add(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate)
                .format(this.loginUserDateFormat + ' HH:mm');

              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).add(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate)
                .format(this.loginUserDateFormat + ' HH:mm');

              if (data['result'][i].invoiceDate !== null) {
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).utc().add(utctimesplit[0], 'hours');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).add(utctimesplit[1], 'minutes');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }

              if (data['result'][i].payDetails.paidDate !== null) {
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).utc().add(utctimesplit[0], 'hours');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).add(utctimesplit[1], 'minutes');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }

              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');

            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');

              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].billPeriodStartDate = moment(data['result'][i].billPeriodStartDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodStartDate = moment(data['result'][i]
                .billPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');

              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].billPeriodEndDate = moment(data['result'][i].billPeriodEndDate)
                .format(this.loginUserDateFormat + ' HH:mm');

              if (data['result'][i].invoiceDate !== null) {
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate).subtract(utctimesplit[1], 'minutes');
                data['result'][i].invoiceDate = moment(data['result'][i].invoiceDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }

              if (data['result'][i].payDetails.paidDate !== null) {
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).utc().
                  subtract(utctimesplit[0], 'hours');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate).subtract(utctimesplit[1], 'minutes');
                data['result'][i].payDetails.paidDate = moment(data['result'][i].payDetails.paidDate)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
            data['result'][i].amountDue = parseFloat(data['result'][i].amountDue).toFixed(2);
          }
          this.billpaymentsDetails = data['result'];
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

  /*** To export billpayment data ***/
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('billpaymentSearchAdvance') === 'search') {
      searchstring = JSON.stringify(this.advanced);
      window.localStorage.removeItem('billpaymentSearchAdvance');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.historyService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /*** To autofocusing on search  ***/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getBillpaymenthistory(this.searchstring);
    }
  }

  /*---- To clear the errormessages ----*/
  public clearmessages() {
    this.error = '';
  }

  /*---- To clear the advaced model data ----*/
  public clearBillpaymentAdvancedModal(): void {
    this.enterpriseName = '';
    this.startdate = '';
    this.enddate = '';
    this.Paidstartdate = '';
    this.Paidenddate = '';
    this.Invoicestartdate = '';
    this.Invoiceenddate = '';
    this.paymentstatus = '';
    this.invoicenumber = '';
    this.invoicedate = '';
    this.amountdue = '';
    this.billPeriodType = '';
    this.error = '';
    this.getBillPaymentHistoryList();
    window.localStorage.removeItem('Advance');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    this.timezoneCodes = utcformat[0].trim();
  }

  /**---- To hide the advance popup model ----*/
  hideBillpaymentAdvancedModal() {
    this.billpaymentadvancedModel.hide();
  }
}

export class Menuitem {
}
