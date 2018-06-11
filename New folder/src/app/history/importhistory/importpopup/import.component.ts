/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 *  ImportHistoryModalComponent have below methods:
 * showChildModal(actionName, selectedimportHistoryObj): To show the child modal.
 * ngOnInit(): To load the userToken at loading time.
 * deleteRecordHistory(): To delete the import history records.
 * closePopupModal(): To close the popup modal.
 * clearmessage(): To clear the messages.
 * hideChildModal(): To hide the popup modal.
*/

import { Component, OnInit, ViewChild, ViewContainerRef, Output, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ImportHistoryModel } from '../importslist/imports.component';
import { ImportService } from './import.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-importhistorylisting-popup',
  templateUrl: 'import.html',
  providers: [ImportService]
})

export class ImportComponent implements OnInit {
  updateaction: any;
  pagename: string;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  startdate: any;
  enddate: any;
  enterpriseIconFilePath: any;
  timezoneCode: any;
  enterpriseIcon: any;
  loginUserDateFormat: any;
  importHistoryObj: ImportHistoryModel;

  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() updatedList: EventEmitter<string> = new EventEmitter();
  @Output() uploaded: EventEmitter<string> = new EventEmitter();

  /**----- Constructor for import history component ----*/
  constructor(private router: Router, private vcr: ViewContainerRef,
    public toastr: ToastsManager,
    private singleimportHisoryservice: ImportService,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string) { }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
  }

  /*---- To show child modal ----*/
  public showChildModal(actionName, selectedimportHistoryObj): void {
    this.importHistoryObj = selectedimportHistoryObj;
    this.updateaction = actionName;

    if (actionName === 'View') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.startdate = moment(this.importHistoryObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.importHistoryObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_IMPORT_HISTORY';
      this.actionType = 'View';
      this.enterpriseIcon = selectedimportHistoryObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = selectedimportHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;

    } else if (actionName === 'Delete') {
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.startdate = moment(this.importHistoryObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.importHistoryObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_IMPORT_HISTORY';
      this.actionType = 'Delete';
      this.enterpriseIcon = selectedimportHistoryObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = selectedimportHistoryObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;

    }
    this.childModal.show();
  }

  /*---- To delete import history record ----*/
  deleteRecordHistory() {
    this.singleimportHisoryservice.deleteRecordHistoryList(this.userToken, this.importHistoryObj._id)
      .subscribe(
      videoDetails => {
        if (window.localStorage.getItem('imphistoryadvsearch') !== 'imphistoryadvsearch') {
          this.uploaded.emit('Delete');
          window.localStorage.removeItem('imphistoryadvsearch');
        }
        if (window.localStorage.getItem('imphistorysearch') === 'imphistorysearch') {
          window.localStorage.setItem('imphistorysearchdelete', 'imphistorysearchdelete');
          window.localStorage.removeItem('imphistorysearch');
        } else {
          window.localStorage.setItem('imphistoryadvsearchdelete', 'imphistoryadvsearchdelete');
        }
        this.hideChildModal();
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
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.error(this.toastermessage.value);
            }
            break;
        }
      });
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.enterpriseIconFilePath = '';
    this.childModal.hide();
  }
}

