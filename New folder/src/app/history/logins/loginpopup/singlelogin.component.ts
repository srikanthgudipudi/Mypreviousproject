/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* LoginHistoryModalComponent have below methods:
* showChildModal(loginHistoryId):To show the popup modal.
* closePopupModal():To close the popup modal.
* ngOnInit(): To load the userToken at loading time.
* deleteLoginHistory(loginHistoryId): To delete logi history.
*/
import { Component, OnInit, ViewChild, ViewContainerRef, HostListener, Output, EventEmitter, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { LoginsService } from '../loginslist/logins.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { Loginsdetails } from '../loginslist/loginsdetails';

@Component({
  selector: 'app-loginhistory-popup',
  templateUrl: 'singlelogin.html',
  providers: [LoginsService]
})

export class SingleLoginComponent implements OnInit {
  enterpriseName = '';
  singleLoginHistoryDetails = new Loginsdetails();
  userToken: any;
  toastermessage: any;
  actionType: any;
  pagename: any;
  createdAt: any;
  updatedAt: any;
  enterpriseIconFilePath: any;
  loginTime: any;
  logoutTime: any;
  timezoneCode: any;
  enterpriseIcon: any;
  loginUserDateFormat: any;
  storage: Storage = window.localStorage;

  @ViewChild('infoModal') public infoModal: ModalDirective;
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  constructor(private historyService: LoginsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
  }

  /*---- To show popup modal ----*/
  public showChildModal(selectedAction, loginHistoryObj): void {
    this.singleLoginHistoryDetails = loginHistoryObj;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    if (this.singleLoginHistoryDetails.loginTime !== undefined && this.singleLoginHistoryDetails.loginTime !== 'undefined'
      && this.singleLoginHistoryDetails.loginTime !== '' && this.singleLoginHistoryDetails.loginTime !== null) {
      this.loginTime = this.singleLoginHistoryDetails['logintime'];
      // this.loginTime = moment(this.singleLoginHistoryDetails.loginTime).format('YYYY-MM-DD HH:mm:ss')  + ' ' + this.timezoneCode[0];
    }
    if (this.singleLoginHistoryDetails.logoutTime !== undefined && this.singleLoginHistoryDetails.logoutTime !== 'undefined'
      && this.singleLoginHistoryDetails.logoutTime !== '' && this.singleLoginHistoryDetails.logoutTime !== null) {
      this.logoutTime = this.singleLoginHistoryDetails['logouttime'];
      // this.logoutTime = moment(this.singleLoginHistoryDetails.logoutTime).format('YYYY-MM-DD HH:mm:ss');
    }
    this.createdAt = moment(this.singleLoginHistoryDetails['createdAt']).format('YYYY-MM-DD HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.updatedAt = moment(this.singleLoginHistoryDetails['updatedAt']).format('YYYY-MM-DD HH:mm:ss')
      + ' ' + this.timezoneCode[0]; if (selectedAction === 'VIEW') {
        this.pagename = 'COMMON_PAGE_TITLES.VIEW_LOGIN_HISTORY';
        this.actionType = 'View';
        this.enterpriseIcon = loginHistoryObj.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = loginHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      } else if (selectedAction === 'DELETE') {
        this.pagename = 'COMMON_PAGE_TITLES.DELETE_LOGIN_HISTORY';
        this.actionType = 'Delete';
        this.enterpriseIcon = loginHistoryObj.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = loginHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      }
    this.infoModal.show();
  }

  /*-----  To delete login history  ----- */
  deleteLoginHistory(loginHistoryId) {
    this.historyService.deleteLoginHistory(loginHistoryId, this.userToken)
      .subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          if (window.localStorage.getItem('Advance') === 'Advance') {
            window.localStorage.setItem('advancedDelete', 'advancedDelete');
          } else if (window.localStorage.getItem('Normal') === 'Normal') {
            window.localStorage.setItem('normalDelete', 'normalDelete');
          } else {
            this.deleted.emit('submit');
          }
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

  /** ---This method is called when we press enter key --- */
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.actionType === 'View') {
      if (key === 13) {
        this.infoModal.hide();
        this.logoutTime = '';
      }
    }
    if (this.actionType === 'Delete') {
      if (key === 13) {
        this.deleteLoginHistory(this.singleLoginHistoryDetails['_id']);
      }
    }
  }


  /*---- To close popup modal ----*/
  closePopupModal() {
    this.infoModal.hide();
    this.enterpriseIconFilePath = '';
    this.logoutTime = '';
  }
}
