/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * CallComponent have below methods:
 * ngOnInit(): To load the user token at loading time.showChildModal(selectedAction,
 * callHistoryObj): To show popup modal.
 * deleteCallHistory(loginHistoryId): To delete call history.
 * closePopupModal(): To close popup modal.
*/

import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter,
  Inject } from '@angular/core';
  import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import * as moment from 'moment/moment';
import { Loginsdetails } from '../../logins/loginslist/loginsdetails';
import { CallsService } from '../callslist/calls.service';

@Component({
  selector: 'app-callhistory-popup',
  templateUrl: 'call.html',
  providers: [CallsService]
})

export class CallComponent implements OnInit {
  singleCallHistoryDetails = new Loginsdetails();
  userToken: any;
  toastermessage: any;
  actionType: any;
  pagename: any;
  createdAt: any;
  updatedAt: any;
  enterpriseIconFilePath: any;
  loginTime: any;
  logoutTime: any;
  callStartDate: any;
  callEndDate: any;
  storage: Storage = window.localStorage;
  enterpriseIcon: any;
  timezoneCode: any;
  timezoneCodes: any;
  loginUserDateFormat: any;
  toMobileNoCountryCode: any;
  toMobileNoCountryCodeSplit: any;
  fromMobileNoCountryCode: any;
  fromMobileNoCountryCodeSplit: any;
  fromMobileNo: any;
  toMobileNo: any;

  @ViewChild('infoModal') public infoModal: ModalDirective;
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  /**---- Constrctor for call history component ----*/
  constructor(private historyService: CallsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
  }

  /*---- To show popup modal ----*/
  public showChildModal(selectedAction, callHistoryObj): void {
    this.singleCallHistoryDetails = callHistoryObj;
    this.loginTime = moment(this.singleCallHistoryDetails.loginTime).format('YYYY-MM-DD HH:mm:ss');
    if (this.singleCallHistoryDetails.logoutTime !== undefined && this.singleCallHistoryDetails.logoutTime !== 'undefined'
      && this.singleCallHistoryDetails.logoutTime !== '' && this.singleCallHistoryDetails.logoutTime !== null) {
      this.logoutTime = moment(this.singleCallHistoryDetails.logoutTime).format('YYYY-MM-DD HH:mm:ss');
    }

    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    this.callStartDate = moment(this.singleCallHistoryDetails['callStartDate'])
    .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.callEndDate = moment(this.singleCallHistoryDetails['callEndDate'])
    .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.fromMobileNoCountryCode = callHistoryObj.callFrom.mobileNumberCountrycode;
    this.fromMobileNoCountryCodeSplit = this.fromMobileNoCountryCode.split(' -');
    this.fromMobileNo = this.fromMobileNoCountryCodeSplit[0] + '-' + callHistoryObj.callFrom.mobileNumber;
    this.toMobileNoCountryCode = callHistoryObj.callTo.mobileNumberCountrycode;
    this.toMobileNoCountryCodeSplit = this.toMobileNoCountryCode.split(' -');
    this.toMobileNo = this.toMobileNoCountryCodeSplit[0] + '-' + callHistoryObj.callTo.mobileNumber;
    this.createdAt = moment(this.singleCallHistoryDetails['createdAt'])
    .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.updatedAt = moment(this.singleCallHistoryDetails['updatedAt'])
    .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    if (selectedAction === 'VIEW') {
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_CALL_HISTORY';
      this.actionType = 'View';
      if (callHistoryObj && callHistoryObj.enterprise
        && callHistoryObj.enterprise.enterpriseId
        && callHistoryObj.enterprise.enterpriseId.enterpriseIcon) {
          this.enterpriseIcon = callHistoryObj.enterprise.enterpriseId.enterpriseIcon;
        }
      if (callHistoryObj && callHistoryObj.enterprise
        && callHistoryObj.enterprise.enterpriseId
        && callHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath
        && callHistoryObj.enterprise.enterpriseId.enterpriseIcon) {
          this.enterpriseIconFilePath = callHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
        }
    } else if (selectedAction === 'DELETE') {
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_CALL_HISTORY';
      this.actionType = 'Delete';
      if (callHistoryObj && callHistoryObj.enterprise
        && callHistoryObj.enterprise.enterpriseId
        && callHistoryObj.enterprise.enterpriseId.enterpriseIcon) {
          this.enterpriseIcon = callHistoryObj.enterprise.enterpriseId.enterpriseIcon;
        }
      if (callHistoryObj && callHistoryObj.enterprise
        && callHistoryObj.enterprise.enterpriseId
        && callHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath
        && callHistoryObj.enterprise.enterpriseId.enterpriseIcon) {
          this.enterpriseIconFilePath = callHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
        }
    }
    this.infoModal.show();
  }

  /*-----  To delete call history  ----- */
  deleteCallHistory(loginHistoryId) {
    this.historyService.deleteCallHistory(loginHistoryId, this.userToken)
      .subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          this.deleted.emit('submit');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.infoModal.hide();
          this.logoutTime = '';
          this.enterpriseIconFilePath = '';
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
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '2013') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.infoModal.hide();
              this.logoutTime = '';
            }
            break;
        }
      });
  }

  /*---- To close popup modal ----*/
  closePopupModal() {
    this.infoModal.hide();
    this.enterpriseIconFilePath = '';
    this.logoutTime = '';
  }
}
