/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * call service spec is used to test the calls service.
 * CallsService have below methods.
 * getCallHistoryList(token): To get call history list.
 * getLookupsList(token, lookupType): To get call status and type from lookups.
 *  deleteCallHistory(loginhistoryid, token): To delete call history.
 * callsAdvancedSearch(callsSearchData, token): To get Advanced Search result.
 * getSearchResult(searchstring, userToken): To get call history search results.
 * locates(locate, userToken, search): To map locate.
 * singlelocateCallHistory(locate, userToken, callhistoryid, floorPlanAvailable): To map single record.
 * getCallHistoryInfoById(userToken, callhistoryid): To get call history info.
 * getdisplaytomapsetting(token, enterpriseId, pageType): To get display to map settings data.
 * extractData(): To extract the data
 * exportlist(searchstring, userToken): To export the data
 * handleError(): To handle error messages.
*/

import {
  Component, OnInit, AfterViewInit, ViewContainerRef,
  ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { FleetsService } from '../../../enterprises/fleets/fleetslist/fleets.service';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { CallsService } from './calls.service';
import { CallComponent } from '../callpopup/call.component';
import { Loginsdetails } from '../../logins/loginslist/loginsdetails';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'calls.html',
  providers: [CallsService, FleetsService]
})

export class CallsComponent implements OnInit, AfterViewInit {
  fromUserName: any;
  toUserName: any;
  import: Menuitem[];
  historyDetails: Array<Loginsdetails> = [];
  userToken: any;
  stacked: boolean;
  searchstring: any;
  status: any;
  toastermessage: any;
  callhistoryviewstatus: any;
  callhistoryliststatus: any;
  callhistorydeletestatus: any;
  callhistoryexportstatus: any;
  storage: Storage = window.localStorage;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  enterpriseNames: any;
  statusList: any;
  callTypeList: any;
  callTypeValue: any;
  userAccountValue: any;
  userNameValue: any;
  fromUserMobileValue: any;
  toUserAccountValue: any;
  toUserNameValue: any;
  toUserMobileValue: any;
  callHistoryObj: any;
  userroles: any;
  loginUserDateFormat: any;
  toMobileNoCountryCode: any;
  toMobileNoCountryCodeSplit: any;
  fromMobileNoCountryCode: any;
  fromMobileNoCountryCodeSplit: any;
  // mobileCountryCode: any;
  fromMobileCountryCode: any;
  toMobileCountryCode: any;
  fromCountryCodes: any;
  toCountryCodes: any;
  timeZones: any;
  startDate: any;
  endDate: any;
  errorStartDate: any;
  timeZoneCodes: any;
  errorEndDate: any;
  error: any;
  adverrefresh: any = 'true';
  check: any = false;
  callStartDate: any;
  callEndDate: any;
  enterpriseIconFilePath: any;
  callsutctimezone: any;
  callsutctimezonestring: any;
  useraccount: any;
  messageto: any;
  messagetoId: any;
  messagetoaccount: any;
  @ViewChild('callsAdvSearchModal') public callsAdvSearchModal: ModalDirective;
  @ViewChildren('input') vc;
  @ViewChild(CallComponent)
  private loginHistoryModalComponent: CallComponent;

  /**---- Constructor for call history component ----*/
  constructor(
    public toastr: ToastsManager,
    private router: Router, private vcr: ViewContainerRef,
    private translateService: TranslateService,
    private callHistoryService: CallsService,
    public fleetsService: FleetsService,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /**----- To load the content at loading time ----*/
  ngOnInit() {
    this.callhistoryviewstatus = window.localStorage.getItem('callhistoryviewstatus');
    this.callhistoryliststatus = window.localStorage.getItem('callhistoryliststatus');
    this.callhistorydeletestatus = window.localStorage.getItem('callhistorydeletestatus');
    this.callhistoryexportstatus = window.localStorage.getItem('callhistoryexportstatus');
    this.userToken = window.localStorage.getItem('token');
    this.useraccount = window.localStorage.getItem('user_Account');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.timeZoneCodes = utcformat[0].trim();
    this.getLookupCallTypes();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.callhistoryliststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getCallHistoryList();
      this.import = [
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
    window.localStorage.removeItem('lccallhistory');
    window.localStorage.removeItem('lccallhistorydata');
    if (window.localStorage.getItem('mapmessageuser') === 'mapmessageuser') {
      window.localStorage.removeItem('mapmessageuser');
      this.callHistoryService.getCallHistoryInfoById(this.userToken, window.localStorage.getItem('id')).subscribe(
        singleCallHistoryInfo => {
          if (singleCallHistoryInfo['result'].callTo.userAccount === this.useraccount) {
            this.messageto = singleCallHistoryInfo['result'].callFrom.userId.enterpriseResourceObj.firstName
              + ' ' + singleCallHistoryInfo['result'].callFrom.userId.enterpriseResourceObj.lastName;
            this.messagetoId = singleCallHistoryInfo['result'].callFrom.userId.enterpriseResourceObj._id;
            this.messagetoaccount = singleCallHistoryInfo['result'].callFrom.userAccount;
          } else {
            this.messageto = singleCallHistoryInfo['result'].callTo.userId.enterpriseResourceObj.firstName + ' ' +
              singleCallHistoryInfo['result'].callTo.userId.enterpriseResourceObj.lastName;
            this.messagetoId = singleCallHistoryInfo['result'].callTo.userId.enterpriseResourceObj._id;
            this.messagetoaccount = singleCallHistoryInfo['result'].callTo.userAccount;
          }
          this.showmessage(this.messageto, this.messagetoaccount, this.messagetoId,
            singleCallHistoryInfo['result'].enterprise.enterpriseName, singleCallHistoryInfo['result'].enterprise.enterpriseId._id);
        }, error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
          }
        });
    }

  }
  /** ---To navigate and open create message popup ----*/
  showmessage(username, userAccount, userId, enterpriseName, enterpriseId) {
    this.router.navigate(['/history/messages']);
    window.localStorage.setItem('messageuser', 'messageuser');
    window.localStorage.setItem('useraccount', username);
    window.localStorage.setItem('tousernameacc', userAccount);
    window.localStorage.setItem('enterprisename', enterpriseName);
    window.localStorage.setItem('enterpriseid', enterpriseId);
    window.localStorage.setItem('userid', userId);
  }
  /**---- After view intialisation is rendered -----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /**----- To open the popup ----*/
  singleLoginHistoryDetails(selectedAction, loginHistoryObj) {
    this.loginHistoryModalComponent.showChildModal(selectedAction, loginHistoryObj);
  }

  /**---- To open the advance search popup -----*/
  advancedSearch() {
    this.getCountryCodes();
    this.getTimeZones();
    this.userroles = window.localStorage.getItem('userrole');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.callsAdvSearchModal.show();
  }

  /**---- To get call status ----*/
  public getLookupCallStatus() {
    this.callHistoryService.getLookupsList(this.userToken, 'CALL_STATUSES').subscribe(
      data => {
        this.statusList = data['result'];
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

  /**---- To get call types -----*/
  public getLookupCallTypes() {
    this.callHistoryService.getLookupsList(this.userToken, 'CALL_TYPES').subscribe(
      data => {
        this.callTypeList = data['result'];
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

  /**--- To get the selected call type ----*/
  getCallTypes(callType) {
    this.callTypeValue = callType;
  }

  /*--- To Get Country Code list ---*/
  public getCountryCodes() {
    this.callHistoryService.getLookupsList(this.userToken, 'COUNTRY_CODES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.fromCountryCodes = data['result'];
          this.fromMobileCountryCode = data['result'][0].lookupName;
          this.toCountryCodes = data['result'];
          this.toMobileCountryCode = data['result'][0].lookupName;
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

  /**---- To get selected Moblie Country Code ----*/
  getFromMobileCountryCode(countryCode) {
    this.fromMobileCountryCode = countryCode;
  }

  /**----- To get the selected mobile country code -----*/
  getToMobileCountryCode(countryCode) {
    this.toMobileCountryCode = countryCode;
  }

  /*-- hyphen generate in between the mobile numbers ----*/
  hyphen_generate_mobile(value, id) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById(id)).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById(id)).value = value.concat('-');
    }
  }

  /**---- To get the time zones -----*/
  public getTimeZones() {
    this.callHistoryService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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

  /**---- To get the selected the time zones ----*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timeZoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const callutcval = timezonevalue[1].split(')');
    this.callsutctimezone = callutcval[0];
    this.callsutctimezonestring = callutcval[0].toString();
  }

  /**---- To get the call history list ----*/
  getCallHistoryList() {
    this.callHistoryService.getCallHistoryList(this.userToken)
      .subscribe(
      data => {
        for (let i = 0; i < data['result'].length; i++) {
          this.fromMobileNoCountryCode = data['result'][i].callFrom.mobileNumberCountrycode;
          this.fromMobileNoCountryCodeSplit = this.fromMobileNoCountryCode.split(' -');
          data['result'][i].fromMobileNo = this.fromMobileNoCountryCodeSplit[0] + '-' + data['result'][i].callFrom.mobileNumber;
          this.toMobileNoCountryCode = data['result'][i].callTo.mobileNumberCountrycode;
          this.toMobileNoCountryCodeSplit = this.toMobileNoCountryCode.split(' -');
          data['result'][i].toMobileNo = this.toMobileNoCountryCodeSplit[0] + '-' + data['result'][i].callTo.mobileNumber;
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            data['result'][i].callStartDate = moment(data['result'][i].callStartDate).utc().add(utctimesplit[0], 'hours');
            data['result'][i].callStartDate = moment(data['result'][i].callStartDate).add(utctimesplit[1], 'minutes');
            data['result'][i].callStartDate = moment(data['result'][i].callStartDate).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].callEndDate = moment(data['result'][i].callEndDate).utc().add(utctimesplit[0], 'hours');
            data['result'][i].callEndDate = moment(data['result'][i].callEndDate).add(utctimesplit[1], 'minutes');
            data['result'][i].callEndDate = moment(data['result'][i].callEndDate).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            data['result'][i].callStartDate = moment(data['result'][i].callStartDate).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].callStartDate = moment(data['result'][i].callStartDate).subtract(utctimesplit[1], 'minutes');
            data['result'][i].callStartDate = moment(data['result'][i].callStartDate).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].callEndDate = moment(data['result'][i].callEndDate).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].callEndDate = moment(data['result'][i].callEndDate).subtract(utctimesplit[1], 'minutes');
            data['result'][i].callEndDate = moment(data['result'][i].callEndDate).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.historyDetails = data['result'];
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

  /**---- To call the lilst in child component ----*/
  delete(event) {
    if (window.localStorage.getItem('advancesearch') === 'advancesearch') {
      this.advance();
    } else {
      this.getCallHistoryList();
    }
  }

  /**----- To get the call history search results list ----*/
  public getCallHistorySearchList(searchstring) {
    this.searchstring = searchstring;
    if (searchstring) {
      this.callHistoryService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        data => {
          for (let i = 0; i < data['result'].length; i++) {
            this.fromMobileNoCountryCode = data['result'][i].callFrom.mobileNumberCountrycode;
            this.fromMobileNoCountryCodeSplit = this.fromMobileNoCountryCode.split(' -');
            data['result'][i].fromMobileNo = this.fromMobileNoCountryCodeSplit[0] + '-' + data['result'][i].callFrom.mobileNumber;
            this.toMobileNoCountryCode = data['result'][i].callTo.mobileNumberCountrycode;
            this.toMobileNoCountryCodeSplit = this.toMobileNoCountryCode.split(' -');
            data['result'][i].toMobileNo = this.toMobileNoCountryCodeSplit[0] + '-' + data['result'][i].callTo.mobileNumber;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).add(utctimesplit[1], 'minutes');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).add(utctimesplit[1], 'minutes');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).add(utctimesplit[1], 'minutes');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).add(utctimesplit[1], 'minutes');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.historyDetails = data.result;
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
                this.historyDetails = [];
              } break;
            case 500:
              break;
          }
        }
        );
    } else {
      this.getCallHistoryList();
    }
  }

  /**---- To get calls advance search results ----*/
  advance() {
    this.adverrefresh = 'false';
    this.errorStartDate = this.startDate;
    this.errorEndDate = this.endDate;
    if (this.startDate !== '' && this.endDate !== '' && this.startDate > this.endDate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startDate = this.errorStartDate;
      this.endDate = this.errorEndDate;
    } else {
      window.localStorage.setItem('advancesearch', 'advancesearch');

      /** ----- Convert prefered time zone to utc format start----- */
      if (this.startDate !== '' && this.startDate !== undefined && this.startDate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');

          this.startDate = moment(this.startDate).add(utctimesplit[0], 'hours');
          this.startDate = moment(this.startDate).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.startDate = moment(this.startDate).subtract(utctimesplit[0], 'hours');
          this.startDate = moment(this.startDate).subtract(utctimesplit[1], 'minutes');
        }
        this.callStartDate = moment(this.startDate).format('YYYY-MM-DD HH:mm');
      }
      if (this.endDate !== '' && this.endDate !== undefined && this.endDate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.endDate = moment(this.endDate).add(utctimesplit[0], 'hours');
          this.endDate = moment(this.endDate).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.endDate = moment(this.endDate).subtract(utctimesplit[0], 'hours');
          this.endDate = moment(this.endDate).subtract(utctimesplit[1], 'minutes');
        }
        this.callEndDate = moment(this.endDate).format('YYYY-MM-DD HH:mm');
      }
      this.storage.removeItem('status');
      this.storage.removeItem('selecteddashboardenterpriseid');
      window.localStorage.removeItem('advancedSearch');
      window.localStorage.removeItem('simpleSearch');

      if (this.check === true) {
        this.enterpriseNames = '';
      }
      if (this.enterpriseNames !== '' && this.enterpriseNames !== undefined) {
        this.enterpriseNames = this.enterpriseNames.trim().replace(/\s\s+/g, ' ');
      }
      if (this.callTypeValue !== '' && this.callTypeValue !== undefined) {
        this.callTypeValue = this.callTypeValue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.userNameValue !== '' && this.userNameValue !== undefined) {
        this.userNameValue = this.userNameValue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.fromMobileCountryCode !== '' && this.fromMobileCountryCode !== undefined) {
        this.fromMobileCountryCode = this.fromMobileCountryCode.trim().replace(/\s\s+/g, ' ');
      }
      if (this.fromUserMobileValue !== '' && this.fromUserMobileValue !== undefined) {
        this.fromUserMobileValue = this.fromUserMobileValue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.toMobileCountryCode !== '' && this.toMobileCountryCode !== undefined) {
        this.toMobileCountryCode = this.toMobileCountryCode.trim().replace(/\s\s+/g, ' ');
      }
      if (this.toUserNameValue !== '' && this.toUserNameValue !== undefined) {
        this.toUserNameValue = this.toUserNameValue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.toUserMobileValue !== '' && this.toUserMobileValue !== undefined) {
        this.toUserMobileValue = this.toUserMobileValue.trim().replace(/\s\s+/g, ' ');
      }
      this.callHistoryObj = {
        'enterpriseName': this.enterpriseNames,
        'callType': this.callTypeValue,
        'userName': this.userNameValue,
        'fromMobileCountryCode': this.fromMobileCountryCode,
        'fromMobileNumber': this.fromUserMobileValue,
        'toUserName': this.toUserNameValue,
        'toMobileCountryCode': this.toMobileCountryCode,
        'toMobileNumber': this.toUserMobileValue,
        'callStartDate': this.startDate,
        'callEndDate': this.endDate
      };
      this.callHistoryService.callsAdvancedSearch(this.callHistoryObj, this.userToken)
        .subscribe(
        data => {
          window.localStorage.setItem('lccallhistory', 'lccallhistorydata');
          window.localStorage.setItem('lccallhistorydata', JSON.stringify(data));
          window.localStorage.setItem('exportAdvSearch', 'exportAdvSearch');
          this.startDate = this.errorStartDate;
          this.endDate = this.errorEndDate;
          this.callsAdvSearchModal.hide();
          for (let i = 0; i < data['result'].length; i++) {
            this.fromMobileNoCountryCode = data['result'][i].callFrom.mobileNumberCountrycode;
            this.fromMobileNoCountryCodeSplit = this.fromMobileNoCountryCode.split(' -');
            data['result'][i].fromMobileNo = this.fromMobileNoCountryCodeSplit[0] + '-' + data['result'][i].callFrom.mobileNumber;
            this.toMobileNoCountryCode = data['result'][i].callTo.mobileNumberCountrycode;
            this.toMobileNoCountryCodeSplit = this.toMobileNoCountryCode.split(' -');
            data['result'][i].toMobileNo = this.toMobileNoCountryCodeSplit[0] + '-' + data['result'][i].callTo.mobileNumber;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).add(utctimesplit[1], 'minutes');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).add(utctimesplit[1], 'minutes');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].callStartDate = moment(data['result'][i].callStartDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].callEndDate = moment(data['result'][i].callEndDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.historyDetails = data['result'];
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statusCode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statusCode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success('Missing mandatory fields');
              } else if (statusCode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
              } else if (statusCode === '9997') {
                this.historyDetails = [];
                this.callsAdvSearchModal.hide();
              } break;
          }
        });
    }
  }


  /**---- To export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advancesearch') === 'advancesearch') {
      searchstring = JSON.stringify(this.callHistoryObj);
      window.localStorage.removeItem('advancesearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.callHistoryService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /**---- Method for handle key press ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getCallHistorySearchList(this.searchstring);
    }
  }

  /**----- To hide the advance popup model ----*/
  hideCallHistoryModal() {
    this.callsAdvSearchModal.hide();
  }

  /**---- To clear the data in advance model -----*/
  clearAdvanced() {
    this.enterpriseNames = '';
    this.callTypeValue = '';
    this.userNameValue = '';
    this.fromMobileCountryCode = '';
    this.fromUserMobileValue = '';
    this.toUserNameValue = '';
    this.toMobileCountryCode = '';
    this.toUserMobileValue = '';
    this.startDate = '';
    this.endDate = '';
    window.localStorage.removeItem('advancesearch');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    this.timeZoneCodes = utcformat[0].trim();
    this.getLookupCallStatus();
    this.getLookupCallTypes();
    this.getCallHistoryList();
    this.getTimeZones();
  }

  /**---- Method for locate -----*/
  locates(locate) {
    this.callHistoryService.locates(locate, this.userToken, this.searchstring);
  }

  /**----- Method for single locate ----*/
singlelocate(locate, singleCallHistory) {
    this.fleetsService.getBuildingId(this.userToken, singleCallHistory._id, 'callhistory').subscribe(
      builingcode => {
        if (builingcode.result.buildingCode) {
          this.fleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lccallhistoryinfo', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              localStorage.setItem('callsurrentfloorname', builingcode.result.currentFloor);
              const currentFloorName = 'callsurrentfloorname';
              const currentucallsid = singleCallHistory._id;
              this.callHistoryService.singlelocateCallHistory(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, currentucallsid,
                builingcode.result.fleetId, builingcode.result.currentFloorId, fleetInfo.fleetName);
            });
        } else {
          this.callHistoryService.getCallHistoryInfoById(this.userToken, singleCallHistory._id).subscribe(
            singleCallHistoryInfo => {
              let date = singleCallHistoryInfo['result'].callEndDate;
              if (this.utctimezonestring.charAt(0) === '+') {
                const utctime = this.utctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                date = moment(date).utc().add(utctimesplit[0], 'hours');
                date = moment(date).add(utctimesplit[1], 'minutes');
                date = moment(date)
                  .format(this.loginUserDateFormat + ' HH:mm');
              } else {
                const utctime = this.utctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                date = moment(date).utc().
                  subtract(utctimesplit[0], 'hours');
                date = moment(date).subtract(utctimesplit[1], 'minutes');
                date = moment(date)
                  .format(this.loginUserDateFormat + ' HH:mm');
              }
              delete singleCallHistoryInfo.result.workNumber;
              delete singleCallHistoryInfo.result.mobileNumber;
              delete singleCallHistoryInfo.result.callTo.mobileNumber;
              delete singleCallHistoryInfo.result.callTo.mobileNumberCountrycode;
              if (window.localStorage.getItem('user_id') != singleCallHistoryInfo.result.callTo.userId._id.toString()) {
                const calTo = singleCallHistoryInfo.result.callTo.userId.enterpriseResourceObj;
                const address2 = calTo.address;
                singleCallHistoryInfo.result.resDesignation = calTo.designation;
                singleCallHistoryInfo.result.resDepartment = calTo.department;
                singleCallHistoryInfo.result.imagePath = calTo.enterpriseResourcesImageFilePath;
                singleCallHistoryInfo.result.imageName = calTo.enterpriseResourcesImageFileName;
                singleCallHistoryInfo.result.resAddress = address2.addressLine1 + ', '
                  + address2.addressLine2 + ', ' + address2.city + ', '
                  + address2.state + ', ' + address2.ZIP + ', ' + address2.country;
                singleCallHistoryInfo.result.presentlyLocated = '';
                const mobileCountryCode = calTo.contactDetails.mobileNumberCountrycode.split(' - ');
                singleCallHistoryInfo.result.resMobileNumber = mobileCountryCode[0] + '-' + calTo.contactDetails.mobileNumber;
                singleCallHistoryInfo.result.resEmail = calTo.contactDetails.email;
                singleCallHistoryInfo.result.rescallEndDate = date;
                delete singleCallHistoryInfo.result.enterprise.enterpriseId.address;
                delete singleCallHistoryInfo.result.callFrom.mobileNumber;
                delete singleCallHistoryInfo.result.callFrom.mobileNumberCountrycode;
              } else {
                const calFrom = singleCallHistoryInfo.result.callFrom.userId.enterpriseResourceObj;
                const address2 = calFrom.address;
                singleCallHistoryInfo.result.resDesignation = calFrom.designation;
                singleCallHistoryInfo.result.resDepartment = calFrom.department;
                singleCallHistoryInfo.result.imagePath = calFrom.enterpriseResourcesImageFilePath;
                singleCallHistoryInfo.result.imageName = calFrom.enterpriseResourcesImageFileName;
                singleCallHistoryInfo.result.resAddress = address2.addressLine1 + ', '
                  + address2.addressLine2 + ', ' + address2.city + ', '
                  + address2.state + ', ' + address2.ZIP + ', ' + address2.country;
                singleCallHistoryInfo.result.presentlyLocated = '';
                const mobileCountryCode = calFrom.contactDetails.mobileNumberCountrycode.split(' - ');
                singleCallHistoryInfo.result.resMobileNumber = mobileCountryCode[0] + '-' + calFrom.contactDetails.mobileNumber;
                singleCallHistoryInfo.result.resEmail = calFrom.contactDetails.email;
                singleCallHistoryInfo.result.rescallEndDate = date;
              }
              window.localStorage.setItem('lccallhistoryinfo', JSON.stringify(singleCallHistoryInfo));
              // window.localStorage.setItem('chmapsettings', JSON.stringify(mapSettings));
              localStorage.setItem('lccallhistoryinfo', JSON.stringify(singleCallHistoryInfo['result']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              localStorage.removeItem('callsurrentfloorname');
              const currentFloorName = '';
              const currentucallsid = singleCallHistory._id;
              const buildingName = null;
              const currentfloorid = null;
              const currentFleetId = null;
              this.callHistoryService.singlelocateCallHistory(locate, this.userToken, singleCallHistoryInfo['result']._id,
                false,
                currentFloorName, currentucallsid, currentfloorid, currentFleetId, buildingName);
            });
        }
      });
  }
}

export class Menuitem {

}
