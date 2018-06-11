/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* FeedbackpopupComponent have below methods:
* ngOnInit(): To load the userToken at loading time.
* getEnterpriselist(): This method is used to get Enterpriselist.
* showChildModal(updateaction, enterpriseid, userAccount, videoTitle, enterpriseStatus):
  To show the child modal.
* changeTimezones(timezone): To change the getTimezonesstartdate list.
* gettimeZones(): To get the timezones list from Lookup codes.
* getEnterpriseResources(type): To split the enterprise id and name.
* selectobjectType(value): This method is used to change the object type.
* getobjecttype(): This method is used to get object type list.
* selectobjectName(value): This method is used to change object type name.
* getObjectNameList(objectType): This method is used to get the object type name list.
* feedbackType(value): feedback type change.
* getfeedbackType(): This method is used to get feedback type list.
* status(value): This method is used to change the status.
* getstatustype(): This method is used to get status type list.
* createfeedback(): This method is used to create Feedback record.
* updatefeedback(): To update the feedback list.
* deleteFeedback(): This method is used to delete the feedback.
* clearmessage(): To clear the messages.
* hideChildModal(): To hide the popup modal.
* autocase(text): Auto capitalization for each word.
*/
import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, Inject, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import * as moment from 'moment/moment';
import { FeedbackpopupService } from './feedbackpopup.service';
import { FeedbacklistService } from '../feedbacklist/feedbacklist.service';

@Component({
  selector: 'app-feedback-popup',
  templateUrl: 'feedbackpopup.html',
  providers: [FeedbackpopupService, DatePipe]
})

export class FeedbackpopupComponent implements OnInit {
  updateaction: any;
  enterpriseid: any;
  objectNameList: any;
  reason: any;
  comment: any;
  error: any;
  checkbox: any;
  pagename: string;
  action: any;
  value: any[];
  enterpriseId: any;
  enterprisesName: any;
  enterprisesSize: any;
  enterprisesNames: any;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  startdate: any;
  enddate: any;
  error1: string;
  error2: string;
  error3: string;
  enterpriseIconFilePath: any;
  updateAt: any;
  createAt: any;
  timezoneCode: any;
  minDate: Date;
  isEnabled = true;
  maxDate: Date;
  public feedbackObj: any;
  utctimezone: any;
  utctimezonestring: any;
  timezoneCodes: any;
  timeZones: any[];
  enterpriseIcon: any;
  loginUserDateFormat: any;
  currentutc: any;
  errorstartdate: any;
  errorenddate: any;
  startdate1: any;
  enddate1: any;
  objecttype: any;
  objectname: any;
  displayStartDateTime: any;
  userfrom: any;
  notes: any = '';
  feedback: any = '';
  actionTaken: any = '';
  actionTakenDate: any = '';
  objectList: any;
  statusList: any;
  feedbackTypeList: any;
  objectNamesList: any;
  objecttypes: any;
  name: any;
  enterprise: any;
  user_Account: any;
  feedbacktype: any;
  feedbackstatus: any;
  object: any;
  feedbackupdate: any;
  actiontaken: any;
  editdate: any;
  feedlist: any;

  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  /* Constructor for Feedbackpopup Component */
  constructor(private feedbackpopupService: FeedbackpopupService,
    private feedbacklistService: FeedbacklistService,
    public toastr: ToastsManager,
    private datePipe: DatePipe,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /* Component Initalization */
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.getEnterpriselist();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    }
  }

  /*----- To view, edit, delete and create from the selected feedback information popup ----- */
  public showChildModal(updateaction, allfeedback): void {
    this.feedbackObj = allfeedback;
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';

    if (updateaction === 'VIEW') {
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.feedbackObj.actionTakenDate)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.feedbackObj.displayEndDateTime)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.feedbackObj.enterpriseObj.enterpriseIcon;
      this.enterpriseIconFilePath = this.feedbackObj.enterpriseObj.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.updateAt = moment(this.feedbackObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.feedbackObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'FEEDBACK.VIEW_FEEDBACK';
      this.actionType = 'View';

    } else if (updateaction === 'EDIT') {
      this.getEnterpriselist();
      this.childModal.show();
      this.actiontaken = '';
      this.feedbackupdate = allfeedback;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.minDate = new Date();
      this.editdate = moment(this.minDate)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.feedbackObj.enterpriseObj.enterpriseIcon;
      this.enterpriseIconFilePath = this.feedbackObj.enterpriseObj.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.startdate = new Date(this.feedbackObj.displayStartDateTime);
      this.enddate = new Date(this.feedbackObj.displayEndDateTime);
      this.maxDate = new Date(moment(moment(this.startdate).days((moment(this.startdate).days() + Number(7)))).format('YYYY-MM-DD HH:mm'));
      /**--- Convet User prefered time zone */
      this.gettimeZones();
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      /**---- Convet User prefered time zone ------ */

      this.updateAt = moment(this.feedbackObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.feedbackObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'FEEDBACK.EDIT_FEEDBACK';
      this.actionType = 'Edit';

    } else if (updateaction === 'DELETE') {
      this.enterpriseIcon = this.feedbackObj.enterpriseObj.enterpriseIcon;
      this.enterpriseIconFilePath = this.feedbackObj.enterpriseObj.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.updateAt = this.feedbackObj.updatedAt;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.feedbackObj.displayStartDateTime)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.feedbackObj.displayEndDateTime)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.updateAt = moment(this.feedbackObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.feedbackObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'FEEDBACK.DELETE_FEEDBACK';
      this.actionType = 'Delete';

    } else if (updateaction === 'CREATE') {
      this.enterprise = window.localStorage.getItem('enterPriseName');
      this.user_Account = window.localStorage.getItem('user_Account');
      this.enterpriseId = window.localStorage.getItem('enterpriseId');
      this.getobjecttype();
      this.getfeedbackType();
      this.getstatustype();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.getEnterpriselist();
      this.gettimeZones();
      this.isEnabled = true;
      this.pagename = 'FEEDBACK.CREATE_FEEDBACK';
      this.actionType = 'Create';
      this.feedback = '';
      this.notes = '';
    }
    this.childModal.show();
  }

  /*-- To get enterprise list from Enterprise table --*/
  getEnterpriselist() {
    this.feedbackpopupService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseId = data['result'][0]._id;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
            this.enterprisesName = data['result'][0].enterpriseName;
            this.enterprisesSize = true;
          } else {
            this.enterprisesNames = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }

  /* To split the enterprise id and name  */
  getEnterpriseResources(type) {
    this.value = type.split('$');
    this.enterpriseId = this.value[0];
    this.enterprisesName = this.value[1];
    this.enterpriseIcon = this.value[3];
    this.enterpriseIconFilePath = this.value[2] + '/' + this.enterpriseIcon;
    if (this.enterpriseId === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
  }

  /* To change the getTimezonesstartdate list */
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /* To get the timezones list from Lookup codes */
  public gettimeZones() {
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

  /* This method is used to change the object type */
  selectobjectType(value) {
    this.objecttype = value;
    this.getObjectNameList(this.objecttype);
  }

  /* This method is used to get object type list */
  getobjecttype() {
    this.feedbackpopupService.getobjecttypelist(this.userToken).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.objectList = data['result'];
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

  /* This method is used to change object type name */
  selectobjectName(value) {
    this.objectname = value;
  }

  /* This method is used to get the object type name list */
  getObjectNameList(objectType: any) {
    this.objectNameList = [];
    this.feedbackpopupService.objectNames(this.userToken, objectType, this.enterpriseId)
      .subscribe(objectName => {
        if (objectName.result.length > 0) {
          for (let i = 0; i < objectName.result.length; i++) {
            if (objectType === 'Fleet') {
              this.objectNameList[i] = objectName.result[i].fleetName;
            } else if (objectType === 'Page' || objectType === 'Other') {
              this.objectNameList[i] = objectName.result[i].lookupName;
            } else {
              this.objectNameList[i] = objectName.result[i].firstName + ' ' + objectName.result[i].lastName;
            }
          }
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

  /* feedback type change */
  feedbackType(value) {
    this.feedbacktype = value;
    this.feedbacktype = this.feedbacktype.split('$');
    this.feedbacktype = this.feedbacktype[1];
  }

  /* This method is used to get feedback type list*/
  getfeedbackType() {
    this.feedbackpopupService.feedbackType(this.userToken).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.feedbackTypeList = data['result'];
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

  /* This method is used to change the status  */
  status(value) {
    this.status = value;
  }

  /* This method is used to get status type list*/
  getstatustype() {
    this.feedbackpopupService.getstatustype(this.userToken).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.statusList = data['result'];
          this.feedbackstatus = this.statusList[1].lookupName;
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

  /* This method is used to create Feedback record*/
  createfeedback() {
    if (this.feedbacktype === '' || this.feedbacktype === null || this.feedbacktype === undefined) {
      this.error = 'FEEDBACK.VALID_NOBLANK_FEEDBACK_TYPE';
    } else if (this.objecttype === '' || this.objecttype === null || this.objecttype === undefined) {
      this.error = 'FEEDBACK.VALID_NOBLANK_OBJECT_TYPE';
    } else if (this.objectname === '' || this.objectname === null || this.objectname === undefined) {
      this.error = 'FEEDBACK.VALID_NOBLANK_OBJECT_NAME';
    } else if (this.feedback === '' || this.feedback === null || this.feedback === undefined) {
      this.error = 'FEEDBACK.VALID_NOBLANK_FEEDBACK';
    } else {
      const feedbackObj = {
        'enterprise': {
          'enterpriseId': this.enterpriseId,
          'enterpriseName': this.enterprise
        },
        'userFrom': this.user_Account,
        'objectType': this.objecttype,
        'objectName': {
          objName: this.objectname
        },
        'feedbackType': this.feedbacktype,
        'feedbackStatus': this.feedbackstatus,
        'notes': this.notes,
        'feedback': this.feedback
      };
      this.feedbackpopupService.createFeedback(feedbackObj, this.userToken)
        .subscribe(data => {
          this.hideChildModal();
          this.uploaded.emit('submit');
          this.clearmessage();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        }, error => {
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (JSON.parse(error['_body']).statusCode) {
            case '2033':
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
              break;
            case '9961':
              this.storage.removeItem('token');
              this.router.navigate(['']);
              break;
          }
        });
    }
  }

  /*---- To update the feedback list ----*/
  updatefeedback() {
    if (this.actiontaken !== '' && this.actiontaken !== null && this.actiontaken !== undefined) {
      this.feedbackstatus = 'Closed';
      const feedbackupdate = {
        'actionTaken': this.actiontaken,
        'feedbackStatus': this.feedbackstatus
      };
      this.feedbackpopupService.updateFeedback(this.feedbackupdate._id, feedbackupdate, this.userToken)
        .subscribe(data => {
          this.hideChildModal();
          this.feedlist = window.localStorage.getItem('feedbacksearch');
          if (window.localStorage.getItem('Advance') === 'AdvanceSearch') {
            window.localStorage.setItem('feedbackadvance', 'feedbackadvanceList');
          } else if (window.localStorage.getItem('normal') === 'normalSearch') {
            window.localStorage.setItem('simplesearch', 'searchsearchList');
          } else {
            this.uploaded.emit('submit');
          }
          window.localStorage.removeItem('Advance');
          window.localStorage.removeItem('normal');
          this.clearmessage();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        }, error => {
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (JSON.parse(error['_body']).statusCode) {
            case '2033':
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
              break;
            case '9961':
              this.storage.removeItem('token');
              this.router.navigate(['']);
              break;
          }
        });
    } else {
      this.error = 'FEEDBACK.VALID_NOBLANK_ACTION_TAKEN';
    }
  }

  /*---- This method is used to delete the feedback ----*/
  deleteFeedback() {
    this.feedbackpopupService.deletefeedback(this.userToken, this.feedbackObj._id)
      .subscribe(
      videoDetails => {
        this.hideChildModal();
        this.feedlist = window.localStorage.getItem('feedbacksearch');
        if (window.localStorage.getItem('Advance') === 'AdvanceSearch') {
          window.localStorage.setItem('feedbackadvance', 'feedbackadvanceList');
        } else if (window.localStorage.getItem('normal') === 'normalSearch') {
          window.localStorage.setItem('simplesearch', 'searchsearchList');
        } else {
          this.uploaded.emit('submit');
        }
        window.localStorage.removeItem('Advance');
        window.localStorage.removeItem('normal');

        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statuscode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['']);
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            }
            break;
        }
      });
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error2 = '';
    this.error3 = '';
    this.error1 = '';
    this.error = '';
  }

  /*----  This method is used to close feedback popup ----*/
  public hideChildModal(): void {
    this.enterpriseIconFilePath = '';
    this.enterpriseId = '';
    this.enterprisesName = '';
    this.comment = '';
    this.checkbox = false;
    this.childModal.hide();
    this.clearmessage();
  }

  /* ------- Inint capitalization ---*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

/* -- AutoFocus for view and delete popup --*/
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'VIEW') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.updateaction === 'DELETE') {
      if (key === 13) {
        this.deleteFeedback();
      }
    }
  }

}

export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}

