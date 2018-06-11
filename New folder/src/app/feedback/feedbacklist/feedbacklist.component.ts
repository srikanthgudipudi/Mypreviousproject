/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* FeedbacklistComponent have below functionality.
*  singleFeedback(selectedaction, selectedObj): method is used to call feddback popup from component.
* ngOnInit(): To load the list will be loaded at loading time.
* ngAfterViewInit(): Component views intialisation.
* Allfeedbacklist(event): To get Feedback list from Feedback table.
* ngAfterContentChecked(): To check the content.
* formatDate(date): DOB Formating function into "yyyy-mm-dd".
* advancedModal(): This method is used to open feedback advance popup.
* clearmessages(): To clear the messages.
* hideAdvanceModal(): This method is used to close feedback advance popup.
* clearAdvanced(): This method is used to clear values for feedback advance popup.
* advanceSearch(): method to perform advance search operation for feedback based on user inputs
* getFeedbackList(): To get all feedback list.
* getfeedbackSearchlist(searchstring): To search the feedback list by string.
* changeTimezones(timezone): To change the Timezones list.
* getstatustype(): This method is used to get status type list.
* getstatusonchange(status): This method is used to change the status.
* exportData(searchstring): export the data.
* getrecorddetails(): To get the single notification record details.
*/

import { Component, ViewChild, OnInit, Inject, AfterContentChecked, ViewContainerRef, AfterViewInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ConfirmationService } from '../../../custommodules/primeng/primeng';
import * as moment from 'moment/moment';
import { FeedbacklistService } from './feedbacklist.service';
import { FeedbackpopupService } from '../feedbackpopup/feedbackpopup.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { FeedbackpopupComponent } from '../feedbackpopup/feedbackpopup.component';

@Component({
  templateUrl: 'feedbacklist.html',
  providers: [FeedbacklistService, ConfirmationService, FeedbackpopupService]
})

export class FeedbacklistComponent implements OnInit, AfterContentChecked, AfterViewInit {
  feedbackDetails: any;
  stacked: any;
  items: MenuItem[];
  import: MenuItem[];
  errorMessage: string;
  searchstring: string;
  userToken: any;
  toastermessage: any;
  searchfield: any;
  displayEndDateTime: any;
  storage: Storage = window.localStorage;
  viewstatus: any;
  addstatus: any;
  editstatus: any;
  liststatus: any;
  deletestatus: any;
  importstatus: any;
  exportstatus: any;
  rowsPerPage = 10;
  pagename: any;
  recordid: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  loginUserDateFormat: any;
  timeZones: any;
  enddate: any = '';
  errorstartdate: any;
  errorenddate: any;
  error: any;
  enterpriseName: any = '';
  startDate: any = '';
  endDate: any = '';
  timezoneCode: any;
  enterpriseIconFilePath: any;
  startdate: any = '';
  adverrefresh: any = 'true';
  check: any = false;
  enterpriseNameValue: any;
  search: any;
  fromuser: any;
  feedbackadvSearchObj: any;
  enterprisename: any;
  objecttype: any = '';
  objectname: any = '';
  feedback: any = '';
  feedbackstatus: any = '';
  fromDate: any = '';
  toDate: any = '';
  statusList: any;
  advfromuser: any = '';
  userrole: any;
  Account: any;
  advuserpreferedtimezone: any;
  advutctimezone: any;
  advutctimezonestring: any;
  @ViewChildren('input') vc;
  @ViewChild(FeedbackpopupComponent)
  private feedbackModalComponent: FeedbackpopupComponent;
  @ViewChild('myModal') public myModal: ModalDirective;

  /*-- method is used to call feddback popup from component*/
  singleFeedback(selectedaction, selectedObj) {
    this.feedbackModalComponent.showChildModal(selectedaction, selectedObj);
  }

  /* Constructor for Feedbacklist Component */
  constructor(private feedbacklistService: FeedbacklistService,
    private confirmationService: ConfirmationService,
    private notificationService: NotificationsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private feedbackpopupService: FeedbackpopupService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the list at loading time ----*/
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.viewstatus = window.localStorage.getItem('feedbackviewstatus');
    this.addstatus = window.localStorage.getItem('feedbackaddstatus');
    this.editstatus = window.localStorage.getItem('feedbackeditstatus');
    this.liststatus = window.localStorage.getItem('feedbackliststatus');
    this.deletestatus = window.localStorage.getItem('feedbackdeletedstatus');
    this.exportstatus = window.localStorage.getItem('feedbackexportstatus');
    this.userToken = window.localStorage.getItem('token');
    this.enterpriseNameValue = window.localStorage.getItem('enterPriseName');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    /* time zone */
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else if (this.pagename === 'feedback') {
      this.getrecorddetails();
      this.storage.removeItem('notificationpage');
    } else {
      this.getFeedbackList();
      this.items = [
        {
          label: 'Create fun facts', icon: 'fa fa-smile-o', command: () => {
            this.feedbackModalComponent.showChildModal('CREATE', '');
          }
        },
      ];
      this.import = [

        { label: 'Import', icon: 'fa-upload', url: '#' },
        { label: 'Export', icon: 'fa-download', url: '#' },


      ];
    }
    this.getstatustype();
  }

  /* Component views intialisation */
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /*---- To check the content ----*/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('feedbackadvance') === 'feedbackadvanceList') {
      this.advanceSearch();
      window.localStorage.removeItem('feedbackadvance');
    } else if (window.localStorage.getItem('simplesearch') === 'searchsearchList') {
      this.getfeedbackSearchlist(this.searchstring);
      window.localStorage.removeItem('simplesearch');
    }
  }

  /*To get Feedback list from Feedback table */
  Allfeedbacklist(event) {
    if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
      this.getfeedbackSearchlist(this.searchstring);
    } else {
      this.getFeedbackList();
    }
  }


  /*---- To get all feedback list ----*/
  getFeedbackList() {
    this.Account = window.localStorage.getItem('user_Account');
    this.feedbacklistService.getMyfeedbackList(this.userToken)
      .subscribe(
      FeedbackDetails => {
        if (FeedbackDetails['result'].length > 0) {
          for (let i = 0; i < FeedbackDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).utc().add(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).add(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).utc().subtract(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).subtract(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');

            }
          }
        }
        this.feedbackDetails = FeedbackDetails['result'];
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
              this.router.navigate(['']);
            } break;
        }
      });
  }

  searchbyfield(searchvalue) {
    this.searchfield = searchvalue;
  }


  /*---- To search the feedback list by string ----*/
  public getfeedbackSearchlist(searchstring) {
    window.localStorage.setItem('normal', 'normalSearch');
    if (searchstring !== '' && searchstring !== undefined && searchstring !== null) {
      this.feedbacklistService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        FeedbackDetails => {
          for (let i = 0; i < FeedbackDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).utc().add(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).add(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).utc().subtract(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).subtract(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
                .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');

            }
          }
          this.feedbackDetails = FeedbackDetails['result'];
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
                this.router.navigate(['']);
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
              } break;
          }
        });
    } else {
      this.getFeedbackList();
    }
  }

  /**------ To get the single notification record details-------- */
  getrecorddetails() {
    this.notificationService.getNotification(this.recordid, this.pagename, this.userToken)
      .subscribe(
      FeedbackDetails => {
        for (let i = 0; i < FeedbackDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).add(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).utc().subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).subtract(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().
              subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().
              subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');

          }
        }
        this.feedbackDetails = FeedbackDetails['result'];
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
              this.router.navigate(['']);
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
            } break;
        }
      });
  }

  /* To get the timezones list from Lookup codes */
  public getTimezones() {
    this.feedbackpopupService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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

  /* To change the Timezones list */
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.advuserpreferedtimezone = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
  }

  /* This method is used to get status type list*/
  getstatustype() {
    this.feedbackpopupService.getstatustype(this.userToken).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.statusList = data['result'];
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

  /* This method is used to change the status */
  getstatusonchange(status) {
    this.feedbackstatus = status;
  }

  /* This method is used to open feedback advance popup */
  advancedModal() {
    this.myModal.show();
    this.getTimezones();
    this.fromuser = window.localStorage.getItem('user_Account');
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }

  /* method to perform advance search operation for feedback based on user inputs*/
  advanceSearch() {
    this.adverrefresh = 'false';
    this.errorstartdate = this.fromDate;
    this.errorenddate = this.toDate;
    if (this.objecttype !== '' && this.objecttype !== undefined) {
      this.objecttype = this.objecttype.trim().replace(/\s\s+/g, ' ');
    }
    if (this.objectname !== '' && this.objectname !== undefined) {
      this.objectname = this.objectname.trim().replace(/\s\s+/g, ' ');
    }
    if (this.feedback !== '' && this.feedback !== undefined) {
      this.feedback = this.feedback.trim().replace(/\s\s+/g, ' ');
    }
    /* ----- Convert prefered time zone to utc format start----- */
    if (this.fromDate !== '') {
      if (this.advutctimezonestring.charAt(0) === '-') {
        const utctime = this.advutctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.fromDate = moment(this.fromDate).add(utctimesplit[0], 'hours');
        this.fromDate = moment(this.fromDate).add(utctimesplit[1], 'minutes');
        this.fromDate = moment(this.fromDate).format('YYYY-MM-DD HH:mm');
      } else {
        const utctime = this.advutctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.fromDate = moment(this.fromDate).subtract(utctimesplit[0], 'hours');
        this.fromDate = moment(this.fromDate).subtract(utctimesplit[1], 'minutes');
        this.fromDate = moment(this.fromDate).format('YYYY-MM-DD HH:mm');
      }
    }
    if (this.toDate !== '') {
      if (this.advutctimezonestring.charAt(0) === '-') {
        const utctime = this.advutctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.toDate = moment(this.toDate).add(utctimesplit[0], 'hours');
        this.toDate = moment(this.toDate).add(utctimesplit[1], 'minutes');
        this.toDate = moment(this.toDate).format('YYYY-MM-DD HH:mm');
      } else {
        const utctime = this.advutctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.toDate = moment(this.toDate).subtract(utctimesplit[0], 'hours');
        this.toDate = moment(this.toDate).subtract(utctimesplit[1], 'minutes');
        this.toDate = moment(this.toDate).format('YYYY-MM-DD HH:mm');
      }
    }
    this.feedbackadvSearchObj = {
      'enterpriseName': this.enterpriseName,
      'userfrom': this.advfromuser,
      'objectType': this.objecttype,
      'objName': this.objectname,
      'feedback': this.feedback,
      'feedbackStatus': this.feedbackstatus,
      'fromDate': this.fromDate,
      'toDate': this.toDate
    };
    this.feedbacklistService.getAdvancedSearch(this.userToken, this.feedbackadvSearchObj)
      .subscribe(
      FeedbackDetails => {
        this.fromDate = this.errorstartdate;
        this.toDate = this.errorenddate;
        this.myModal.hide();
        window.localStorage.setItem('Advance', 'AdvanceSearch');
        for (let i = 0; i < FeedbackDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).add(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
            FeedbackDetails['result'][i].displayEndDateTime = moment(FeedbackDetails['result'][i]
              .displayEndDateTime).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].displayEndDateTime = moment(FeedbackDetails['result'][i]
              .displayEndDateTime).add(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].displayEndDateTime = moment(FeedbackDetails['result'][i]
              .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).utc().subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).subtract(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].feedbackDate = moment(FeedbackDetails['result'][i]
              .feedbackDate).format(this.loginUserDateFormat + ' HH:mm');
            FeedbackDetails['result'][i].displayEndDateTime = moment(FeedbackDetails['result'][i]
              .displayEndDateTime).utc().subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].displayEndDateTime = moment(FeedbackDetails['result'][i]
              .displayEndDateTime).subtract(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].displayEndDateTime = moment(FeedbackDetails['result'][i]
              .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).utc().
              subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].createdAt = moment(FeedbackDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).utc().
              subtract(utctimesplit[0], 'hours');
            FeedbackDetails['result'][i].updatedAt = moment(FeedbackDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');

          }
        }
        this.feedbackDetails = FeedbackDetails['result'];
      },
      error => {
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
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
              this.router.navigate(['']);
            } else if (statusCode === '2028') {
            } else if (statusCode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
            }
            break;
        }
      });
    // }
  }


  /**----export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('feedbackadvance') === 'advance') {
      searchstring = JSON.stringify(this.feedbackadvSearchObj);
      window.localStorage.removeItem('feedbackadvance');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.feedbacklistService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }


  /*---- To clear the messages ----*/
  clearmessages() {
    this.error = '';
  }

  /* This method is used to close feedback advance popup */
  hideAdvanceModal() {
    this.myModal.hide();
    this.error = '';
  }

  /* This method is used to clear values for feedback advance popup */
  clearAdvanced() {
    this.enterpriseName = '';
    this.error = '';
    this.fromDate = '';
    this.toDate = '';
    this.objecttype = '';
    this.objectname = '';
    this.feedback = '';
    this.feedbackstatus = '';
    this.advfromuser = '';
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.getFeedbackList();
    this.getstatustype();
    this.getTimezones();
  }

  /* This method is used to get feedback search list by pressing enter */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getfeedbackSearchlist(this.searchstring);
    }
  }
}
export class MenuItem {
}
