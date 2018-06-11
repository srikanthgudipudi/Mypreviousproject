/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* HelpPopUpComponent have below methods:
* ngOnInit(): To load the userToken at loading time.
* showChildModal(updateaction, helpdata): To view, edit, delete and create from the selected help information popup.
* helpPageNameList(): To get page name list from Lookupcode table.
* helpPageFeaturusList(): To get features list from Lookupcode table.
* ChangeStatus(value): This method is used to change status.
* getfeaturedata(value): This method is used to change feature.
* getPagedata(value): This method is used to change page data.
* createSinglehelp(help): To Create single help.
* updateHelp(help): To update the help list.
* deleteHelp(): This method is used to delete the help.
* closePopupModal(): This method is used to close help popup.
* clearmessage(): To clear the messages.
* hideChildModal(): This method is used to close help popup.
* autocase(text): Auto capitalization for each word.
*/

import { Component, OnInit, Inject, ViewChild, ViewContainerRef, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import * as moment from 'moment/moment';
import { HelpPopupService } from './helppopup.service';

@Component({
  selector: 'app-fleets-popup',
  templateUrl: 'helppopup.html',
  providers: [HelpPopupService]
})

export class HelpPopUpComponent implements OnInit {
  selectedenterpriseId: any;
  galleryImages: any[];
  fleet: any;
  updateaction: any;
  enterpriseid: any;
  reason: any;
  comment: any;
  enabled: any;
  path: any;
  type: any;
  isEnabled: any;
  error: any;
  checkBoxValue: any;
  pagename: string;
  action: any;
  image: any;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  timeZone: any;
  minsize: any = 4;
  maxsize: any = 20;
  languages: any;
  value: any;
  defaultLanguage: any;
  attributeList = [];
  additionalInfo: any;
  myattribute: any;
  defaultLanguage1: any;
  defaultCurrency: any;
  currencyFormat: any;
  dateFormat: any;
  defaultTheme: any;
  defaultTimezone: any;
  attributeId: any;
  attributeText: any;
  state: any;
  enterpriseId: any;
  updatedAt: any;
  enterpriseIconFilePath: any;
  createdAt: any;
  imgSrc: any = '';
  timezoneCode: any;
  updateAt: any;
  createAt: any;
  rowsPerPage: any;
  perpagecount: any;
  worknumber: any;
  childfleetTypes: any;
  reasonValue: any;
  retext: any;
  reasonActivate: any;
  reasonInactivate: any;
  dafaultActive = 'Active';
  pagevalue: any;
  Featurevalue: any;
  Answervalue: any;
  questionvalue: any;
  notevalue: any;
  createhelp: any;
  helpFeaturusList: any;
  helpNameList: any;
  help: any;
  enabledaction = true;
  loginUserDateFormat: any;
  helpRec: any;
  userpreferedtimezone: any;
  utctimezone: any;
  utctimezonestring: any;

  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  /* Constructor for Feedbackpopup Component */
  constructor(private helpService: HelpPopupService,
    private sanitizer: DomSanitizer,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    private formBuilder: FormBuilder,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else {
      this.userToken = window.localStorage.getItem('token');
    }

  }
  /*----- To view, edit, delete and create from the selected help information popup ----- */
  public showChildModal(updateaction, helpdata): void {
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';

    if (updateaction === 'EDIT' || updateaction === 'VIEW' || updateaction === 'DELETE') {
      this.helpRec = helpdata;
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcformat = timezonevalue[0].split('-');
      this.userpreferedtimezone = utcformat[0].trim();
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      if (this.utctimezonestring.charAt(0) === '+') {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.createdAt = moment(this.helpRec.createdAt).utc().add(utctimesplit[0], 'hours');
        this.createdAt = moment(this.createdAt).add(utctimesplit[1], 'minutes');
        this.updatedAt = moment(this.helpRec.updatedAt).utc().add(utctimesplit[0], 'hours');
        this.updatedAt = moment(this.updatedAt).add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.createdAt = moment(this.helpRec.createdAt).utc().subtract(utctimesplit[0], 'hours');
        this.createdAt = moment(this.createdAt).subtract(utctimesplit[1], 'minutes');
        this.updatedAt = moment(this.helpRec.updatedAt).utc().subtract(utctimesplit[0], 'hours');
        this.updatedAt = moment(this.updatedAt).subtract(utctimesplit[1], 'minutes');
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    }
    switch (this.updateaction) {
      case 'VIEW':
        this.pagename = 'HELP.VIEW_HELP';
        this.actionType = 'View';
        break;
      case 'EDIT':
        this.pagename = 'HELP.EDIT_HELP';
        this.selectedenterpriseId = this.helpRec.enterprise.enterpriseId._id;
        this.reasonValue = '';
        this.actionType = 'Edit';
        this.helpRec = helpdata;
        this.retext = true;
        this.reasonActivate = helpdata.reasonActivate;
        this.reasonInactivate = helpdata.reasonInactivate;
        break;
      case 'DELETE':
        this.pagename = 'HELP.DELETE_HELP';
        this.actionType = 'Delete';
        this.galleryImages = [];
        this.helpRec = helpdata;
        this.retext = true;
        this.reasonActivate = helpdata.reasonActivate;
        this.reasonInactivate = helpdata.reasonInactivate;
        break;
      case 'create':
        this.helpPageNameList();
        this.helpPageFeaturusList();
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        this.imgSrc = this.apiEndPoint + '/' + window.localStorage.getItem('EnterpriseImage');
        this.pagename = 'HELP.CREATE_HELP';
        this.actionType = 'HelpSubmit';
        this.childModal.show();
        break;
     }
    this.childModal.show();
  }

  /*-- To get page name list from Lookupcode table --*/
  helpPageNameList() {
    this.helpService.helpPageNameList(this.userToken).subscribe(
      data => {
        this.helpNameList = data['result'];
        if (data.statusCode === '1001') {
          this.languages = data['result'];
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

  /*-- To get features list from Lookupcode table --*/
  helpPageFeaturusList() {
    this.helpService.helpPageFeaturusList(this.userToken).subscribe(
      data => {
        this.helpFeaturusList = data['result'];
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

  /* This method is used to change status */
  ChangeStatus(value) {
    this.dafaultActive = value;
  }

  /* This method is used to change feature */
  getfeaturedata(value) {
    this.Featurevalue = value;
  }

  /* This method is used to change page data */
  getPagedata(value) {
    this.pagevalue = value;
  }

  /**----To Create single help----- */
  createSinglehelp(help) {
    if (this.pagevalue === undefined || this.pagevalue === '' || this.pagevalue === null) {
      this.error = 'HELP.VALID_NOBLANK_PAGENAME';
    } else if (this.Featurevalue === undefined || this.Featurevalue === '' || this.Featurevalue === null) {
      this.error = 'HELP.VALID_NOBLANK_FEATURE';
    } else if (this.questionvalue === undefined || this.questionvalue === '' || this.questionvalue === null) {
      this.error = 'HELP.VALID_NOBLANK_QUESTION';
    } else if (this.Answervalue === undefined || this.Answervalue === '' || this.Answervalue === null) {
      this.error = 'HELP.VALID_NOBLANK_ANSWER';
    } else {
      this.createhelp = {
        'page': this.pagevalue,
        'feature': this.Featurevalue,
        'question': this.autocase(this.questionvalue),
        'answer': this.autocase(this.Answervalue),
        'notes': this.autocase(this.notevalue),
        'isEnabled': this.enabledaction
      };
      this.helpService.createSinglehelp(this.createhelp, this.userToken)
        .subscribe(
        (data: any) => {
          this.closePopupModal();
          this.childModal.hide();
          this.uploaded.emit('Create');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '2033') {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                if (statuscode === '9961') {
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                }
              } break;
          }
        });
    }
  }

  /*---- To update the help list ----*/
  updateHelp(help) {
    if (help.page === '' || help.page === undefined || help.page === null) {
      this.error = 'HELP.VALID_NOBLANK_PAGENAME';
    } else if (help.feature === undefined || help.feature === '' || help.feature === null) {
      this.error = 'HELP.VALID_NOBLANK_FEATURE';
    } else if (help.question === '' || help.question === undefined || help.question === null) {
      this.error = 'HELP.VALID_NOBLANK_QUESTION';
    } else if (help.answer === '' || help.answer === undefined || help.answer === null) {
      this.error = 'HELP.VALID_NOBLANK_ANSWER';
    } else {
      help.answer = this.autocase(help.answer);
      help.question = this.autocase(help.question);
      help.notes = this.autocase(help.notes);
      this.helpService.updateHelp(help, help._id, this.userToken,
      )
        .subscribe(
        (data: any) => {
          this.uploaded.emit('submit');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.childModal.hide();
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '2033') {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                if (statuscode === '9961') {
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                }
              } break;
          }
        });
    }
  }

  /*---- This method is used to delete the help ----*/
  deleteHelp() {
    this.helpService.deletehelpfromList(this.helpRec._id, this.userToken)
      .subscribe(
      data => {
        this.childModal.hide();
        this.closePopupModal();
        this.uploaded.emit('Delete');
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '2013') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              if (statuscode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              }
            } break;
        }
      });
  }

  /*----  This method is used to close help popup ----*/
  closePopupModal() {
    this.pagevalue = '';
    this.Featurevalue = '';
    this.questionvalue = '';
    this.Answervalue = '';
    this.notevalue = '';
    this.updateAt = '';
    this.childModal.hide();
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /*----  This method is used to close help popup ----*/
  public hideChildModal(): void {
    this.pagevalue = '';
    this.Featurevalue = '';
    this.questionvalue = '';
    this.Answervalue = '';
    this.notevalue = '';
    this.error = '';
    this.checkBoxValue = false;
    this.closePopupModal();
    this.childModal.hide();
  }
  /*---- Auto capitalization for each word ----*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

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
      }
    }
  }
}

