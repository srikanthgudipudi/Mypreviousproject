/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* ImportHistory Component have below functionality.
* getSelectedImportHistory(actionName, importHistoryObj): This method is used to update import history status.
* ngOnInit(): All import history list will be loaded at loading time.
* ngAfterContentChecked(): To check the content.
* getImportHistoryList(): To get import history list.
* getAllImportHistorySeachList(searchstring): To get the all import history list by keyword.
* exportData(searchstring): This method used to download data.
*/

import {
  Component, ViewChild, OnInit, AfterContentChecked, Inject, ViewContainerRef,
  AfterViewInit, ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ImportsService } from './imports.service';
import { ImportComponent } from '../importpopup/import.component';
import { ConfirmationService } from '../.././../../custommodules/primeng/primeng';
import * as moment from 'moment/moment';

@Component({
  templateUrl: './imports.html',
  providers: [ConfirmationService, ImportsService]
})

export class ImportsComponent implements OnInit, AfterViewInit, AfterContentChecked {
  stacked = '';
  allImportHistory: Array<ImportHistoryModel> = [];
  selectedAction: String;
  userToken: any;
  viewstatus: any;
  liststatus: any;
  deletestatus: any;
  exportstatus: any;
  searchstring: any;
  rowsPerPage = 10;
  selectedimportHistoryObj = new ImportHistoryModel();
  ImportHistorylistingService: Array<ImportHistoryModel> = [];
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  loginUserDateFormat: any;
  enterpriseIconFilePath: any;
  enterpriseName: any = '';
  pageName: any = '';
  name: any = '';
  filePath: any = '';
  importHistoryObj: any;
  importHistoryListing: any;
  toastermessage: any;
  timeZones: any[];
  fromDate: any = '';
  toDate: any = '';
  paramadvancedFromDate: any = '';
  paramadvancedToDate: any = '';
  storage: Storage = window.localStorage;
  userrole: any;
  enterpriseNames: any;
  advuserpreferedtimezone: any;
  advutctimezone: any;
  advutctimezonestring: any;

  @ViewChildren('input') vc;
  @ViewChild('mgModal') public childModal: ModalDirective;
  @ViewChild(ImportComponent)
  private importHistoryModalComponent: ImportComponent;

  /**---- Constructor for import history list component ----*/
  constructor(private importHistorylistingService: ImportsService,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    public toastr: ToastsManager,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the content at loading time ----*/
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.viewstatus = window.localStorage.getItem('importviewstatus');
    this.liststatus = window.localStorage.getItem('importliststatus');
    this.deletestatus = window.localStorage.getItem('importdeletestatus');
    this.exportstatus = window.localStorage.getItem('importexportstatus');
    this.userToken = window.localStorage.getItem('token');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.advutctimezonestring = utcval[0].toString();
    this.advutctimezone = utcval[0];
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getImportHistoryList();
    }
  }

  /**---- After view intialisation is rendered ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /*---- To check the content ----*/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('imphistoryadvsearchdelete') === 'imphistoryadvsearchdelete') {
      this.AdvanceSearch();
    } if (window.localStorage.getItem('imphistorysearchdelete') === 'imphistorysearchdelete') {
      this.getAllImportHistorySeachList(this.searchstring);
    }
    window.localStorage.removeItem('imphistorysearchdelete');
    window.localStorage.removeItem('imphistoryadvsearchdelete');
  }

  /*---- To open the popup model ----*/
  getSelectedImportHistory(actionName, importHistoryObj) {
    this.selectedimportHistoryObj = importHistoryObj;
    this.selectedAction = actionName;
    this.importHistoryModalComponent.showChildModal(actionName, importHistoryObj);
  }

  /**---- To open the advance search popup model */
  openAdvanceImportHistoryModal() {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.childModal.show();
    this.gettimeZones();
  }

  /**---- To get time zones ----*/
  public gettimeZones() {
    const token = window.localStorage.getItem('token');
    this.importHistorylistingService.getLookupsList(token, 'TIME_ZONES').subscribe(
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

  /**---- To get selected getTimezones -----*/
  getTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.advuserpreferedtimezone = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
  }

  /**----- To call the list in child component ----*/
  emitChanges(event) {
    this.getImportHistoryList();
  }

  /*---- To get all import history list ----*/
  getImportHistoryList() {
    this.importHistorylistingService.getImportHistoryListing(this.userToken)
      .subscribe(
      allImportHistory => {
        if (allImportHistory['statusCode'] === '1001') {
          for (let i = 0; i < allImportHistory['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              allImportHistory['result'][i].createdAt = moment(allImportHistory['result'][i].createdAt).utc();
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).add(utctimesplit[0], 'hours');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              allImportHistory['result'][i].createdAt = allImportHistory['result']
              [i].createdAt.format(this.loginUserDateFormat + ' HH:mm:ss') + '  ' + this.userpreferedtimezone;
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result'][i].updatedAt).utc().
                add(utctimesplit[0], 'hours');
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt);
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              allImportHistory['result'][i].createdAt = allImportHistory['result']
              [i].createdAt.format(this.loginUserDateFormat + ' HH:mm:ss') + '  ' + this.userpreferedtimezone;
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result']
              [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result']
              [i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }


          this.allImportHistory = allImportHistory['result'];
        }
      },
      error => {
        const status = JSON.parse(error['statusCode']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9997') {
            } break;
        }
      });
  }

  /*---- To get search for import history list ----*/
  getAllImportHistorySeachList(searchstring) {
    window.localStorage.removeItem('imphistoryadvsearch');
    window.localStorage.setItem('imphistorysearch', 'imphistorysearch');
    if (searchstring) {
      this.importHistorylistingService.getImportHistorySeachList(this.searchstring, this.userToken)
        .subscribe(
        allImportHistory => {
          for (let i = 0; i < allImportHistory['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              allImportHistory['result'][i].createdAt = moment(allImportHistory['result'][i].createdAt).utc();
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).add(utctimesplit[0], 'hours');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              allImportHistory['result'][i].createdAt = allImportHistory['result']
              [i].createdAt.format(this.loginUserDateFormat + ' HH:mm:ss') + '  ' + this.userpreferedtimezone;
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result'][i].updatedAt).utc().
                add(utctimesplit[0], 'hours');
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt);
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              allImportHistory['result'][i].createdAt = allImportHistory['result']
              [i].createdAt.format(this.loginUserDateFormat + ' HH:mm:ss') + '  ' + this.userpreferedtimezone;
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result']
              [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result']
              [i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }

          this.allImportHistory = allImportHistory['result'];
          if (this.allImportHistory.length > 0) {
            for (let i = 0; i < this.allImportHistory.length; i++) {
              this.allImportHistory[i].enterpriseName = this.autocase(this.allImportHistory[i].enterpriseName);
              this.allImportHistory[i].filePath = this.allImportHistory[i].filePath;
              this.allImportHistory[i].name = this.allImportHistory[i].name;
              this.allImportHistory[i].status = this.autocase(this.allImportHistory[i].status);
              this.allImportHistory[i].page = this.autocase(this.allImportHistory[i].page);
            }
          }
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statusCode === '9997') {
                this.allImportHistory = [];
              } break;
          }
        });
    } else {
      this.getImportHistoryList();
    }
  }

  /*---- Advanced search method for import list ----*/
  AdvanceSearch() {
    window.localStorage.removeItem('imphistorysearch');
    /** ----- Convert prefered time zone to utc format start----- */
    if (this.fromDate !== '') {
      if (this.advutctimezonestring.charAt(0) === '-') {
        const utctime = this.advutctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.paramadvancedFromDate = moment(this.fromDate).add(utctimesplit[0], 'hours');
        this.paramadvancedFromDate = moment(this.paramadvancedFromDate).add(utctimesplit[1], 'minutes');
        this.paramadvancedFromDate = moment(this.paramadvancedFromDate).format('YYYY-MM-DD HH:mm');
      } else {
        const utctime = this.advutctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.paramadvancedFromDate = moment(this.fromDate).subtract(utctimesplit[0], 'hours');
        this.paramadvancedFromDate = moment(this.paramadvancedFromDate).subtract(utctimesplit[1], 'minutes');
        this.paramadvancedFromDate = moment(this.paramadvancedFromDate).format('YYYY-MM-DD HH:mm');
      }
    }
    if (this.toDate !== '') {
      if (this.advutctimezonestring.charAt(0) === '-') {
        const utctime = this.advutctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.paramadvancedToDate = moment(this.toDate).add(utctimesplit[0], 'hours');
        this.paramadvancedToDate = moment(this.paramadvancedToDate).add(utctimesplit[1], 'minutes');
        this.paramadvancedToDate = moment(this.paramadvancedToDate).format('YYYY-MM-DD HH:mm');
      } else {
        const utctime = this.advutctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.paramadvancedToDate = moment(this.toDate).subtract(utctimesplit[0], 'hours');
        this.paramadvancedToDate = moment(this.paramadvancedToDate).subtract(utctimesplit[1], 'minutes');
        this.paramadvancedToDate = moment(this.paramadvancedToDate).format('YYYY-MM-DD HH:mm');
      }
    }
    if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
      this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.pageName !== '' && this.pageName !== undefined) {
      this.pageName = this.pageName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.name !== '' && this.name !== undefined) {
      this.name = this.name.trim().replace(/\s\s+/g, ' ');
    }
    if (this.filePath !== '' && this.filePath !== undefined) {
      this.filePath = this.filePath.trim().replace(/\s\s+/g, ' ');
    }
    /** ----- Convert prefered time zone to utc format end----- */
    this.importHistoryObj = {
      'enterpriseName': this.enterpriseName,
      'pageName': this.pageName,
      'name': this.name,
      'filePath': this.filePath,
      'fromDate': this.paramadvancedFromDate,
      'toDate': this.paramadvancedToDate
    };
    this.importHistorylistingService.advancedSearch(this.userToken, this.importHistoryObj).subscribe(
      allImportHistory => {
        window.localStorage.setItem('imphistoryadvsearch', 'imphistoryadvsearch');
        if (allImportHistory['statusCode'] === '1001') {
          this.childModal.hide();
          for (let i = 0; i < allImportHistory['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              allImportHistory['result'][i].createdAt = moment(allImportHistory['result'][i].createdAt).utc();
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).add(utctimesplit[0], 'hours');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              allImportHistory['result'][i].createdAt = allImportHistory['result']
              [i].createdAt.format(this.loginUserDateFormat + ' HH:mm:ss') + '  ' + this.userpreferedtimezone;
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result'][i].updatedAt).utc().
                add(utctimesplit[0], 'hours');
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt);
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              allImportHistory['result'][i].createdAt =
                moment(allImportHistory['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              allImportHistory['result'][i].createdAt = allImportHistory['result']
              [i].createdAt.format(this.loginUserDateFormat + ' HH:mm:ss') + '  ' + this.userpreferedtimezone;
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result']
              [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              allImportHistory['result'][i].updatedAt = moment(allImportHistory['result']
              [i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }

          this.allImportHistory = allImportHistory['result'];
          if (this.allImportHistory.length > 0) {
            for (let i = 0; i < this.allImportHistory.length; i++) {
              this.allImportHistory[i].enterpriseName = this.autocase(this.allImportHistory[i].enterpriseName);
              this.allImportHistory[i].filePath = this.allImportHistory[i].filePath;
              this.allImportHistory[i].name = this.allImportHistory[i].name;
              this.allImportHistory[i].status = this.autocase(this.allImportHistory[i].status);
              this.allImportHistory[i].page = this.autocase(this.allImportHistory[i].page);
            }
          }
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
            } else if (statuscode === '9960') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '9997') {
              this.allImportHistory = [];
              this.hideAdvanceModal();
            } break;
        }
      });
  }

  /**---- To export selected History---- */
  exportSelectedHistory(importhistorylist) {
    this.importHistorylistingService.exportSelectedHistory(importhistorylist, this.userToken).subscribe(
      data => {
        new Angular2Csv(data['result'], importhistorylist.name, { headers: Object.keys(data['result'][0]) });
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

  /**---- To export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('imphistoryadvsearch') === 'imphistoryadvsearch') {
      searchstring = JSON.stringify(this.importHistoryObj);
      window.localStorage.removeItem('imphistoryadvsearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.importHistorylistingService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /*---- Auto capitalization for each word ----*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{2,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /**---- To hide advance popup model ----*/
  hideAdvanceModal() {
    this.childModal.hide();
  }

  /**---- To clear the advance popup model data ----*/
  clear() {
    this.enterpriseName = '';
    this.pageName = '';
    this.name = '';
    this.filePath = '';
    this.fromDate = '';
    this.toDate = '';
    this.paramadvancedFromDate = '';
    this.paramadvancedToDate = '';
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.getImportHistoryList();
  }
  /**---- Method for handle keypress -----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      if (this.searchstring === undefined) {
        this.searchstring = '';
      }
      this.getAllImportHistorySeachList(this.searchstring);
    }
  }
}

/* --- POJOs ---*/
export class ImportHistoryModel {
  public _id: string;
  public enterpriseName: string;
  public name: string;
  public page: string;
  public filePath: string;
  public status: string;
  public isMandatory: string;
  public isDeleted: string;
  public isEnabled: string;
  public createdBy: string;
  public createdAt: Date;
  public updatedBy: string;
  public updatedAt: Date;
}
