/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 *  NotificationComponent has the following methods:
 * ngOnInit(): Getting Notifications while loading page.
 * ngAfterViewInit(): After view intialisation is rendered.
 * ngAfterContentChecked(): To check the content.
 * deleteNotificationPopup(action, notificationObj): To open delete/view Pop-Up.
 * AdvancePopupModal(: To open advanced search popup.
 * gettimeZones(): To get time zones.
 * getTimezones(timezone): To change the Timezoneslist.
 * getRecordDetails(recordId, pageName): To route the page.
 * getNotificationTypes(): To get notification types.
 * getNotificationStatuses(): To get the notifications.
 * changeStatus(notificationId, readStatus): To change read status of notification.
 * getNotifications(searchString): To get Notifications list.
 * deleteNotification(notificationId): To Delete Notification.
 * submitAdvancedSearch(): To submit Advanced search data.
 * exportData(searchstring): To export the data.
 * handleKeyPress(e): Method for handle key press.
 * hideAdvanceModal(): To close advanced search popup.
 * clear(): To clear data in advanced search popup.
 */

import {
  Component, ElementRef, ViewChild, OnInit, AfterContentChecked, ViewContainerRef, Inject
  , AfterViewInit, ViewChildren
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Http } from '@angular/http';
import { NotificationsService } from './notifications.service';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'notifications.html',
  providers: [NotificationsService]
})
export class NotificationsComponent implements OnInit, AfterViewInit, AfterContentChecked {
  stacked = '';
  errors = '';
  pagename = '';
  notificationsObj: any;
  enterprisevalue: any = '';
  userName: any = '';
  notificationType: any = '';
  notificationMessage: any = '';
  notificationStatus: any = '';
  notificationStatuses: any;
  notifications: any;
  singleNotification: any;
  errorMessage: string;
  toastermessage: any;
  viewstatus: any;
  liststatus: any;
  deletestatus: any;
  exportstatus: any;
  readstatus: any;
  unreadstatus: any;
  searchString: any;
  createdAt: any;
  actionType: any;
  updatedAt: any;
  datetime: any;
  rowsPerPage = 10;
  timezoneCode: any;
  count = 0;
  enterpriseIconFilePath: any;
  storage: Storage = window.localStorage;
  value: any;
  // time zones
  notificationDate: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  enterpriseIcon: any;
  loginUserDateFormat: any;
  timeZones: any[];
  fromDate: any = '';
  toDate: any = '';
  notificationTypes: any[];
  paramadvancedFromDate: any = '';
  paramadvancedToDate: any = '';
  userrole: any;
  enterpriseNames: any;
  advanceutctimezonestring: any;
  advanceutctimezone: any;
  advuserpreferedtimezone: any;
  userToken: any;
  resetForm: any;
  userNameCheck: any;
  erroradvstartdate: any;
  erroradvenddate: any;
  error: any;
  @ViewChildren('input') vc;
  @ViewChild('childModal') public childModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  @ViewChild('mgModal') public childModal1: ModalDirective;

  /**---- Constructor for notifications component ----*/
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef,
    private element: ElementRef,
    private http: Http, private router: Router,
    private notificationService: NotificationsService,
    public route: ActivatedRoute,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*----- Getting Notifications while loading page ------ */
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.viewstatus = window.localStorage.getItem('notificationviewstatus');
    this.liststatus = window.localStorage.getItem('notificationliststatus');
    this.deletestatus = window.localStorage.getItem('notificationdeletestatus');
    this.exportstatus = window.localStorage.getItem('notificationexportstatus');
    this.readstatus = window.localStorage.getItem('notificationreadstatus');
    this.unreadstatus = window.localStorage.getItem('notificationunreadstatus');
    const userToken = window.localStorage.getItem('token');
    // time zone
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.advuserpreferedtimezone = this.userpreferedtimezone;
    this.advanceutctimezone = utcval[0];
    this.advanceutctimezonestring = utcval[0].toString();
    if (userToken === undefined || userToken === null || userToken === '') {
      this.router.navigate(['']);
    } else if ((this.liststatus === 'false') && (userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getNotifications('');
    }
  }

  /**--- After view intialisation is rendered ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /*---- To check the content ----*/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('advance') === 'advanced') {
      this.submitAdvancedSearch();
    }
    if (window.localStorage.getItem('notificationActive') === 'Active') {
      this.getNotifications('');
    }
    window.localStorage.removeItem('advance');
    window.localStorage.removeItem('notificationActive');
  }

  /* ----- To open delete/view Pop-Up -----*/
  deleteNotificationPopup(action, notificationObj) {
    this.notificationMessage = notificationObj.notificationMessage.toString().split(',');
    this.notificationMessage = this.notificationMessage[0] + '' + this.notificationMessage[1] + '' + this.notificationMessage[2];
    this.singleNotification = notificationObj;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.createdAt = moment(this.singleNotification['createdAt'])
      .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.datetime = this.singleNotification['notificationDate'];
    this.updatedAt = moment(this.singleNotification['updatedAt'])
      .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.pagename = action + ' Notification';
    this.enterpriseIcon = notificationObj.enterprise.enterpriseId.enterpriseIcon;
    this.enterpriseIconFilePath = notificationObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
    this.resetForm = <HTMLFormElement>document.getElementById('Country_add_form');
    this.actionType = action;
    this.infoModal.show();
    if (action === 'View' && notificationObj.readStatus === 'Unread'
      && notificationObj.userAccount === window.localStorage.getItem('user_Account')) {
      this.changeStatus(notificationObj, 'Read');
    }
  }

  /**--- To open advanced search popup ---*/
  public AdvancePopupModal() {
    this.error = '';
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.getNotificationStatuses();
    this.getNotificationTypes();
    this.gettimeZones();
    this.childModal1.show();
  }

  /*---- To get time zones ----*/
  public gettimeZones() {
    const token = window.localStorage.getItem('token');
    this.notificationService.getLookupsList(token, 'TIME_ZONES').subscribe(
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

  /*---- To change the Timezoneslist ----*/
  getTimezones(timezone) {
    const advancetimevalue = timezone.split('$');
    this.advuserpreferedtimezone = advancetimevalue[0];
    const advancetimezonevalue = advancetimevalue[1].split('(UTC');
    const advanceutcval = advancetimezonevalue[1].split(')');
    this.advanceutctimezone = advanceutcval[0];
    this.advanceutctimezonestring = advanceutcval[0].toString();
  }

  /**------ To get notification types -----*/
  public getNotificationTypes() {
    const token = window.localStorage.getItem('token');
    this.notificationService.getLookupsList(token, 'NOTIFICATION_TYPES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.notificationTypes = data['result'];
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

  /**---- To get the notifications ----*/
  getNotificationStatuses() {
    const userToken = window.localStorage.getItem('token');
    this.notificationService.getLookupsList(userToken, 'NOTIFICATION_STATUSES')
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.notificationStatuses = data['result'];
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

  /* ---- To change read status of notification ---- */
  changeStatus(notificationId, readStatus) {
    const token = window.localStorage.getItem('token');
    if (notificationId.userAccount === window.localStorage.getItem('user_Account')) {
      this.notificationService.changeStatus(notificationId._id, readStatus, token).subscribe(
        result => {
          const notCount: any = window.localStorage.getItem('notificationcount');
          const Count = parseInt(notCount) - 1;
          if (Count > 99) {
            window.localStorage.setItem('notificationcount', '99+');
          } else {
            window.localStorage.setItem('notificationcount', Count + '');
          }
          this.actionType = '';
          const notificationarray = [];
          for (let i = 0; i < this.notifications.length; ++i) {
            if (this.notifications[i]._id === notificationId) {
              this.notifications[i].readStatus = readStatus;
            }
            notificationarray.push(this.notifications[i]);
          }
          this.notifications = notificationarray;
          if (readStatus === 'Read') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_READ_SUCCESS');
            this.toastr.success(this.toastermessage.value);
          } else {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_UNREAD_SUCCESS');
            this.toastr.success(this.toastermessage.value);
          }
          const condition = window.localStorage.getItem('notificationsSearch');
          if (condition !== 'advanced') {
            this.getNotifications(this.searchString);
          } else {
            window.localStorage.setItem('advance', 'advanced');
          }
          if (this.pagename === 'View Notification') {

          } else {
            this.infoModal.hide();
          }
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
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
            case 500:
              break;
          } this.errorMessage = <any>error;
        });
    }
  }

  /**--- To route the page ----*/
  getRecordDetails(recordId, pageName) {
    this.userToken = window.localStorage.getItem('token');
    if (recordId !== undefined && recordId !== 'undefined') {
      window.localStorage.setItem('notificationId', recordId);
      window.localStorage.setItem('notificationpage', pageName);
      if (pageName === 'events') {
        this.router.navigate(['transactions/events']);
      } else if (pageName === 'eventregistrations') {
        this.router.navigate(['/transactions/eventregistrations']);
      } else if (pageName === 'enterpriseresources') {
        this.router.navigate(['/enterprises/enterprisesresourses']);
      } else if (pageName === 'users') {
        this.router.navigate(['/admin/users']);
      } else if (pageName === 'enterprises') {
        this.router.navigate(['/admin/enterprises']);
      } else if (pageName === 'fleetreservations') {
        this.router.navigate(['/transactions/fleetreservations']);
      } else if (pageName === 'feedback') {
        this.router.navigate(['/feedback']);
      }
    }
  }

  /*----- To get Notifications list ------ */
  getNotifications(searchString) {
    let count = 0;
    this.searchString = searchString;
    const userToken = window.localStorage.getItem('token');
    window.localStorage.removeItem('notificationsSearch');
    this.userName = window.localStorage.getItem('userName');
    this.userNameCheck = window.localStorage.getItem('userName');
    this.notificationStatus = 'Unread';
    this.notificationService.getNotifications(userToken, searchString).subscribe(
      notifications => {
        for (let i = 0; i < notifications['result'].length; i++) {
          this.value = notifications['result'][i].notificationMessage.split('#');
          const message = [];
          message.push(this.value[0]);
          message.push(this.value[1]);
          message.push(this.value[2]);
          notifications['result'][i].notificationMessage = message;
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            notifications['result'][i].notificationDate = moment(notifications['result'][i].notificationDate).utc();
            notifications['result'][i].notificationDate =
              moment(notifications['result'][i].notificationDate).add(utctimesplit[0], 'hours');
            notifications['result'][i].notificationDate =
              moment(notifications['result'][i].notificationDate).add(utctimesplit[1], 'minutes');
            notifications['result'][i].notificationDate =
              notifications['result'][i].notificationDate.format(this.loginUserDateFormat + ' HH:mm') + '  ' + this.userpreferedtimezone;
            notifications['result'][i].createdAt = moment(notifications['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            notifications['result'][i].createdAt = moment(notifications['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            notifications['result'][i].notificationDate =
              moment(notifications['result'][i].notificationDate).utc();
            notifications['result'][i].notificationDate =
              moment(notifications['result'][i].notificationDate).subtract(utctimesplit[0], 'hours');
            notifications['result'][i].notificationDate =
              moment(notifications['result'][i].notificationDate).subtract(utctimesplit[1], 'minutes');
            notifications['result'][i].notificationDate =
              notifications['result'][i].notificationDate.format(this.loginUserDateFormat + ' HH:mm') + '  ' + this.userpreferedtimezone;
            notifications['result'][i].createdAt = moment(notifications['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            notifications['result'][i].createdAt = moment(notifications['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
          if (notifications['result'][i].readStatus === 'Unread') {
            count = count + 1;
          }
        }
        if (count > 99) {
          window.localStorage.setItem('notificationcount', '99+');
        } else {
          window.localStorage.setItem('notificationcount', count + '');
        }
        this.notifications = notifications['result'];
        window.localStorage.setItem('notificationActive', 'Inactive');
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
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            }
            this.notifications = [];
            break;
          case 500:
            break;
        } this.errorMessage = <any>error;
      });
  }

  /* ---- To Delete Notification ---- */
  public deleteNotification(notificationId) {
    const token = window.localStorage.getItem('token');
    this.notificationService.deleteNotification(notificationId, token).subscribe(
      result => {
        this.actionType = '';
        const notificationarray = [];
        for (let i = 0; i < this.notifications.length; ++i) {
          if (this.notifications[i]._id !== notificationId) {
            notificationarray.push(this.notifications[i]);
          }
        }
        this.notifications = notificationarray;
        const condition = window.localStorage.getItem('notificationsSearch');
        if (condition !== 'advanced') {
          this.getNotifications(this.searchString);
        } else {
          window.localStorage.setItem('advance', 'advanced');
        }
        this.infoModal.hide();
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
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            }
            break;
          case 500:
            break;
        } this.errorMessage = <any>error;
      });
  }

  /**---- To export the data ---- */
  exportData(searchstring) {
    const token = window.localStorage.getItem('token');
    let searchdiff = '';
    if (window.localStorage.getItem('notificationsSearch') === 'advanced') {
      searchstring = JSON.stringify(this.notificationsObj);
      window.localStorage.removeItem('notificationsSearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.notificationService.exportlist(searchstring, token);
    window.location.href = filePath;
  }

  /**---- To submit Advanced search data ----*/
  public submitAdvancedSearch() {
    const userToken = window.localStorage.getItem('token');
    window.localStorage.removeItem('notificationsSearch');
    this.count = 0;
    /** ----- Convert prefered time zone to utc format start----- */
    this.erroradvstartdate = this.fromDate;
    this.erroradvenddate = this.toDate;
    if (this.fromDate !== '' && this.fromDate >= this.toDate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.fromDate = this.erroradvstartdate;
      this.toDate = this.erroradvenddate;
    } else {
      if (this.fromDate !== '') {
        if (this.advanceutctimezonestring.charAt(0) === '-') {
          const utctime = this.advanceutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedFromDate = moment(this.fromDate).add(utctimesplit[0], 'hours');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).add(utctimesplit[1], 'minutes');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).format('YYYY-MM-DD HH:mm');
        } else {
          const utctime = this.advanceutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedFromDate = moment(this.fromDate).subtract(utctimesplit[0], 'hours');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).subtract(utctimesplit[1], 'minutes');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).format('YYYY-MM-DD HH:mm');
        }
      }
      if (this.toDate !== '') {
        if (this.advanceutctimezonestring.charAt(0) === '-') {
          const utctime = this.advanceutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedToDate = moment(this.toDate).add(utctimesplit[0], 'hours');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).add(utctimesplit[1], 'minutes');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).format('YYYY-MM-DD HH:mm');
        } else {
          const utctime = this.advanceutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedToDate = moment(this.toDate).subtract(utctimesplit[0], 'hours');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).subtract(utctimesplit[1], 'minutes');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).format('YYYY-MM-DD HH:mm');
        }
      }
      if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
        this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.userName !== '' && this.userName !== undefined) {
        this.userName = this.userName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.notificationMessage !== '' && this.notificationMessage !== undefined) {
        this.notificationMessage = this.notificationMessage.trim().replace(/\s\s+/g, ' ');
      }
      /** ----- Convert prefered time zone to utc format end----- */
      this.notificationsObj = {
        'enterpriseName': this.enterprisevalue,
        'userAccount': this.userName,
        'notificationType': this.notificationType,
        'notificationMessage': this.notificationMessage,
        'fromDate': this.paramadvancedFromDate,
        'toDate': this.paramadvancedToDate,
        'readStatus': this.notificationStatus
      };
      this.notificationService.advancedSearch(userToken, this.notificationsObj).subscribe(
        notifications => {
          this.error = '';
          this.erroradvstartdate = this.fromDate;
          this.erroradvenddate = this.toDate;
          if (notifications['statusCode'] === '1028') {
            window.localStorage.setItem('notificationsSearch', 'advanced');
            this.childModal1.hide();
            for (let i = 0; i < notifications['result'].length; i++) {
              this.value = notifications['result'][i].notificationMessage.split('#');
              const message = [];
              message.push(this.value[0]);
              message.push(this.value[1]);
              message.push(this.value[2]);
              notifications['result'][i].notificationMessage = message;
              if (this.utctimezonestring.charAt(0) === '+') {
                const utctime = this.utctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                notifications['result'][i].notificationDate = moment(notifications['result'][i].notificationDate).utc();
                notifications['result'][i].notificationDate =
                  moment(notifications['result'][i].notificationDate).add(utctimesplit[0], 'hours');
                notifications['result'][i].notificationDate =
                  moment(notifications['result'][i].notificationDate).add(utctimesplit[1], 'minutes');
                notifications['result'][i].notificationDate =
                  notifications['result'][i].notificationDate.format(this.loginUserDateFormat + ' HH:mm')
                  + '  ' + this.userpreferedtimezone;
                notifications['result'][i].createdAt = moment(notifications['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                notifications['result'][i].createdAt = moment(notifications['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              } else {
                const utctime = this.utctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                notifications['result'][i].notificationDate =
                  moment(notifications['result'][i].notificationDate).utc();
                notifications['result'][i].notificationDate =
                  moment(notifications['result'][i].notificationDate).subtract(utctimesplit[0], 'hours');
                notifications['result'][i].notificationDate =
                  moment(notifications['result'][i].notificationDate).subtract(utctimesplit[1], 'minutes');
                notifications['result'][i].notificationDate =
                  notifications['result'][i].notificationDate.format(this.loginUserDateFormat + ' HH:mm')
                  + '  ' + this.userpreferedtimezone;
                notifications['result'][i].createdAt = moment(notifications['result'][i]
                  .createdAt).utc().subtract(utctimesplit[0], 'hours');
                notifications['result'][i].createdAt = moment(notifications['result'][i]
                  .createdAt).subtract(utctimesplit[1], 'minutes');
                notifications['result'][i].updatedAt = moment(notifications['result'][i]
                  .updatedAt).utc().subtract(utctimesplit[0], 'hours');
                notifications['result'][i].updatedAt = moment(notifications['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              }
              if (notifications['result'][i].readStatus === 'Unread') {
                this.count = this.count + 1;
              }
            }
            // if (this.count > 99) {
            //   window.localStorage.setItem('notificationcount', '99+');
            // } else {
            //   window.localStorage.setItem('notificationcount', this.count + '');
            // }
            this.notifications = notifications['result'];
            window.localStorage.setItem('notificationActive', 'Inactive');
          }
        },
        error => {
          this.erroradvstartdate = this.fromDate;
          this.erroradvenddate = this.toDate;
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 400:
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '9997') {
                this.childModal1.hide();
              }
              this.notifications = [];
              break;
            case 500:
              break;
          } this.errorMessage = <any>error;
        });
    }
  }

  /**---- Method for handle key press ----*/
  handleKeyPress(e) {
    const key = e.keyCode; if (key === 13) {
      this.getNotifications(this.searchString);
    }
  }
  advanfromDateChange() {
    this.error = '';
  }
  advantoDateChange() {
    this.error = '';
  }
  /**--- To clear data in advanced search popup ---*/
  public clear() {
    this.error = '';
    this.getNotifications('');
    this.enterprisevalue = '';
    this.notificationType = '';
    this.notificationMessage = '';
    this.notificationStatus = '';
    this.fromDate = '';
    this.toDate = '';
    this.paramadvancedFromDate = '';
    this.paramadvancedToDate = '';
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.advuserpreferedtimezone = utcformat[0].trim();
  }

  /**--- To close advanced search popup ----*/
  public hideAdvanceModal() {
    this.childModal1.hide();
  }

}
export class Notifications {
  public userId: string;
  public enterpriseId: string;
  public message: string;
  public type: string;
  public readStatus: string;
  public isDeleted: string;
}
export class MenuItem {
}
