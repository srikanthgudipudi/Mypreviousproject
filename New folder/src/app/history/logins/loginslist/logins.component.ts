/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* HistoryComponent have below methods.
* ngOnInit(): This method is used to fetch login history list while loading page.
* ngAfterViewInit(): This should be called after a component's view.
* ngAfterContentChecked(): This method is called for any change in the component content.
* singleLoginHistoryDetails(selectedAction, loginHistoryObj): To open selected login history details popup.
* getLoginHistoryList(): To get all login history list.
* gettimeZones(): To get the timezones.
* onchangeTimezones(timezone): on change timezone value.
* delete(event): This is the method used for event emitter binding.
* advancedLoginhistorysearch(): To get the advance loginhistory search data.
* advancedLoginhistory(): To get advancesearch login history data.
* getLoginHistorySearchList(searchstring): To get login history search results list.
* handleKeyPress(e): This is called when we press enter key.
* hideAdvancedModal():  To hide the modal.
* clearAdvancedModal(): To clear the modal data.
* clearmessage(): To clear the error message.
* exportData(searchstring): This method used to download the data.
*/
import {
  Component, OnInit, AfterContentChecked, EventEmitter, ViewContainerRef, ViewChild, ViewChildren, Inject
  , AfterViewInit, Output
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Router } from '@angular/router';
import { LoginsService } from './logins.service';
import { SingleLoginComponent } from '../loginpopup/singlelogin.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import * as moment from 'moment/moment';
@Component({
  templateUrl: 'logins.html',
  providers: [LoginsService]
})
export class LoginsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  import: Menuitem[];
  historyDetails: Array<LoginsService> = [];
  userToken: any;
  stacked: boolean;
  searchString: any;
  status: any;
  toastermessage: any;
  logintime: any;
  logouttime: any;
  loginhistoryviewstatus: any;
  loginhistoryliststatus: any;
  loginhistorydeletedstatus: any;
  loginhistoryexportstatus: any;
  rowsPerPage = 10;
  // time zones
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  loginUserDateFormat: any;
  advanced: any;
  enterpriseName: any;
  userAccount: any;
  deviceType: any;
  OS: any;
  ipAddress: any;
  browserName: any;
  browserVersion: any;
  loginTime: any = '';
  logoutTime: any = '';
  error: any = '';
  timeZones: any[];
  timezoneCodes: any;
  timezoneCode: any;
  startdate: any = '';
  enddate: any = '';
  errorstartdate: any;
  errorenddate: any;
  enterpriseIconFilePath: any;
  userrole: any;
  enterpriseNames: any;
  advanceutctimezone: any;
  advanceutctimezonestring: any;

  @ViewChildren('input') vc;
  storage: Storage = window.localStorage;
  @ViewChild(SingleLoginComponent)
  private loginHistoryModalComponent: SingleLoginComponent;
  @ViewChild('advancedModel') public advancedModel: ModalDirective;
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  /**--- This is constructor for login history ---- */
  constructor(private historyService: LoginsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private router: Router, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /** ---This is the default method called when page is loading --- */
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.loginhistoryviewstatus = window.localStorage.getItem('loginhistoryviewstatus');
    this.loginhistoryliststatus = window.localStorage.getItem('loginhistoryliststatus');
    this.loginhistorydeletedstatus = window.localStorage.getItem('loginhistorydeletedstatus');
    this.loginhistoryexportstatus = window.localStorage.getItem('loginhistoryexportstatus');
    this.userToken = window.localStorage.getItem('token');
    // time zone convert code
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advanceutctimezone = utcval[0];
    this.advanceutctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.loginhistoryliststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getLoginHistoryList();
      this.import = [
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
  }

  /** This should be called after a component's view */
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /**---- This method is called for any change in the component content --- */
  ngAfterContentChecked() {
    if (window.localStorage.getItem('advancedDelete') === 'advancedDelete') {
      this.advancedLoginhistory();
      window.localStorage.removeItem('advancedDelete');
    } else if (window.localStorage.getItem('normalDelete') === 'normalDelete') {
      this.getLoginHistorySearchList(this.searchString);
      window.localStorage.removeItem('normalDelete');
    }

  }

  /* To open selected login history details popup */
  singleLoginHistoryDetails(selectedAction, loginHistoryObj) {
    this.loginHistoryModalComponent.showChildModal(selectedAction, loginHistoryObj);
  }

  /**---- To get the timezones----  */
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

  /**---- To get the advance loginhistory search data ----- */
  public advancedLoginhistorysearch(): void {
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
    this.advancedModel.show();
  }

  /* -- To change the getTimezonesstartdate list */
  onchangeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const advancetimezonevalue = timevalue[1].split('(UTC');
    const advanceutcval = advancetimezonevalue[1].split(')');
    this.advanceutctimezone = advanceutcval[0];
    this.advanceutctimezonestring = this.advanceutctimezone[0].toString();
  }

  /* To get the login history list */
  getLoginHistoryList() {
    this.historyService.getLoginHistoryList(this.userToken)
      .subscribe(
      data => {
        for (let i = 0; i < data['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            if (data['result'][i].loginTime !== null) {
              data['result'][i].logintime = moment(data['result'][i].loginTime).utc();
              data['result'][i].logintime = moment(data['result'][i].logintime).add(utctimesplit[0], 'hours');
              data['result'][i].logintime = moment(data['result'][i].logintime)
                .add(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logintime = data['result'][i].logintime + '  ' + this.userpreferedtimezone;
            }
            if (data['result'][i].loginTime !== null && data['result'][i].logoutTime !== null) {
              data['result'][i].logouttime = moment(data['result'][i].logoutTime).utc();
              data['result'][i].logouttime = moment(data['result'][i].logouttime).add(utctimesplit[0], 'hours');
              data['result'][i].logouttime = moment(data['result'][i].logouttime)
                .add(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logouttime = data['result'][i].logouttime + '  ' + this.userpreferedtimezone;
            }
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            if (data['result'][i].loginTime !== null) {
              data['result'][i].logintime = moment(data['result'][i].loginTime).utc();
              data['result'][i].logintime = moment(data['result'][i].logintime).subtract(utctimesplit[0], 'hours');
              data['result'][i].logintime = moment(data['result'][i].logintime)
                .subtract(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logintime = data['result'][i].logintime + '  ' + this.userpreferedtimezone;
            }
            if (data['result'][i].loginTime !== null && data['result'][i].logoutTime !== null) {
              data['result'][i].logouttime = moment(data['result'][i].logoutTime).utc();
              data['result'][i].logouttime = moment(data['result'][i].logouttime).subtract(utctimesplit[0], 'hours');
              data['result'][i].logouttime = moment(data['result'][i].logouttime)
                .subtract(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logouttime = data['result'][i].logouttime + '  ' + this.userpreferedtimezone;
            }
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

  /**--- This is the method used for event emitter binding --- */
  delete(event) {
    this.getLoginHistoryList();
  }

  /* To get the login history search results list */
  public getLoginHistorySearchList(searchstring) {
    window.localStorage.removeItem('Advance');
    if (searchstring) {
      this.historyService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        data => {
          window.localStorage.setItem('Normal', 'Normal');
          for (let i = 0; i < data['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].logintime = moment(data['result'][i].loginTime).utc();
              data['result'][i].logintime = moment(data['result'][i].logintime).add(utctimesplit[0], 'hours');
              data['result'][i].logintime = moment(data['result'][i].logintime)
                .add(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logintime = data['result'][i].logintime + '  ' + this.userpreferedtimezone;
              if (data['result'][i].loginTime !== null && data['result'][i].logoutTime !== null) {
                data['result'][i].logouttime = moment(data['result'][i].logoutTime).utc();
                data['result'][i].logouttime = moment(data['result'][i].logouttime).add(utctimesplit[0], 'hours');
                data['result'][i].logouttime = moment(data['result'][i].logouttime)
                  .add(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
                data['result'][i].logouttime = data['result'][i].logouttime + '  ' + this.userpreferedtimezone;
              }
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].logintime = moment(data['result'][i].loginTime).utc();
              data['result'][i].logintime = moment(data['result'][i].logintime).subtract(utctimesplit[0], 'hours');
              data['result'][i].logintime = moment(data['result'][i].logintime)
                .subtract(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logintime = data['result'][i].logintime + '  ' + this.userpreferedtimezone;
              if (data['result'][i].loginTime !== null && data['result'][i].logoutTime !== null) {
                data['result'][i].logouttime = moment(data['result'][i].logoutTime).utc();
                data['result'][i].logouttime = moment(data['result'][i].logouttime).subtract(utctimesplit[0], 'hours');
                data['result'][i].logouttime = moment(data['result'][i].logouttime)
                  .subtract(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
                data['result'][i].logouttime = data['result'][i].logouttime + '  ' + this.userpreferedtimezone;
              }
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
      this.getLoginHistoryList();
    }
  }

  /**---- To get advancesearch login history data ---- */
  advancedLoginhistory() {
    this.errorstartdate = this.startdate;
    this.errorenddate = this.enddate;
    if (this.startdate !== '' && this.enddate !== '' && this.startdate > this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
    } else {
      window.localStorage.setItem('Advance', 'Advance');
      /** ----- Convert prefered time zone to utc format start----- */
      if (this.startdate !== '' && this.startdate !== undefined && this.startdate !== null) {
        if (this.advanceutctimezonestring.charAt(0) === '-') {
          const advanceutctime = this.advanceutctimezone.split('-');
          const utctimesplit = advanceutctime[1].split(':');
          this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');

        } else {

          const advanceutctime = this.advanceutctimezone.split('+');
          const utctimesplit = advanceutctime[1].split(':');
          this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');

        }
        this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      }
      if (this.enddate !== '' && this.enddate !== undefined && this.enddate !== null) {
        if (this.advanceutctimezonestring.charAt(0) === '-') {
          const advanceutctime = this.advanceutctimezone.split('-');
          const utctimesplit = advanceutctime[1].split(':');

          this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
        } else {

          const advanceutctime = this.advanceutctimezone.split('+');
          const utctimesplit = advanceutctime[1].split(':');

          this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
        }
        this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
      }

      if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
        this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.userAccount !== '' && this.userAccount !== undefined) {
        this.userAccount = this.userAccount.trim().replace(/\s\s+/g, ' ');
      }
      if (this.deviceType !== '' && this.deviceType !== undefined) {
        this.deviceType = this.deviceType.trim().replace(/\s\s+/g, ' ');
      }
      if (this.OS !== '' && this.OS !== undefined) {
        this.OS = this.OS.trim().replace(/\s\s+/g, ' ');
      }
      if (this.ipAddress !== '' && this.ipAddress !== undefined) {
        this.ipAddress = this.ipAddress.trim().replace(/\s\s+/g, ' ');
      }
      if (this.browserName !== '' && this.browserName !== undefined) {
        this.browserName = this.browserName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.browserVersion !== '' && this.browserVersion !== undefined) {
        this.browserVersion = this.browserVersion.trim().replace(/\s\s+/g, ' ');
      }

      this.advanced = {
        'enterprise': this.enterpriseName,
        'userAccount': this.userAccount,
        'deviceType': this.deviceType,
        'OS': this.OS,
        'ipAddress': this.ipAddress,
        'browserName': this.browserName,
        'browserVersion': this.browserVersion,
        'loginTime': this.startdate,
        'logoutTime': this.enddate
      };
      this.historyService.searchLoginhistory(this.advanced, this.userToken).subscribe(
        data => {
          window.localStorage.setItem('exportAdvanceLoginHistorySearch', 'exportAdvanceSearch');
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          for (let i = 0; i < data['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].logintime = moment(data['result'][i].loginTime).utc();
              data['result'][i].logintime = moment(data['result'][i].logintime).add(utctimesplit[0], 'hours');
              data['result'][i].logintime = moment(data['result'][i].logintime)
                .add(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logintime = data['result'][i].logintime + '  ' + this.userpreferedtimezone;
              if (data['result'][i].loginTime !== null && data['result'][i].logoutTime !== null) {
                data['result'][i].logouttime = moment(data['result'][i].logoutTime).utc();
                data['result'][i].logouttime = moment(data['result'][i].logouttime).add(utctimesplit[0], 'hours');
                data['result'][i].logouttime = moment(data['result'][i].logouttime)
                  .add(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
                data['result'][i].logouttime = data['result'][i].logouttime + '  ' + this.userpreferedtimezone;
              }
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].logintime = moment(data['result'][i].loginTime).utc();
              data['result'][i].logintime = moment(data['result'][i].logintime).subtract(utctimesplit[0], 'hours');
              data['result'][i].logintime = moment(data['result'][i].logintime)
                .subtract(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].logintime = data['result'][i].logintime + '  ' + this.userpreferedtimezone;
              if (data['result'][i].loginTime !== null && data['result'][i].logoutTime !== null) {
                data['result'][i].logouttime = moment(data['result'][i].logoutTime).utc();
                data['result'][i].logouttime = moment(data['result'][i].logouttime).subtract(utctimesplit[0], 'hours');
                data['result'][i].logouttime = moment(data['result'][i].logouttime)
                  .subtract(utctimesplit[1], 'minutes').format(this.loginUserDateFormat + ' HH:mm');
                data['result'][i].logouttime = data['result'][i].logouttime + '  ' + this.userpreferedtimezone;
              }
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }

          this.historyDetails = data['result'];
          this.deleted.emit();
          this.advancedModel.hide();
        },
        error => {
          const status = JSON.parse(error['status']);
          switch (status) {
            case 500:
              // this.errorReg = 'HEADER.REGISTRATION_FAILED';
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

  /**----export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('exportAdvanceLoginHistorySearch') === 'exportAdvanceSearch') {
      searchstring = JSON.stringify(this.advanced);
      window.localStorage.removeItem('exportAdvanceLoginHistorySearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.historyService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /**---- This is called when we press enter key --- */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getLoginHistorySearchList(this.searchString);
    }
  }

  /*---- To hide the modal ----*/
  public hideAdvancedModal(): void {
    this.enterpriseName = '';
    this.userAccount = '';
    this.deviceType = '';
    this.OS = '';
    this.ipAddress = '';
    this.error = '';
    this.browserName = '';
    this.browserVersion = '';
    this.loginTime = '';
    this.logoutTime = '';
    this.advancedModel.hide();
  }

  /*---- To clear the modal ----*/
  public clearAdvancedModal(): void {
    this.enterpriseName = '';
    this.userAccount = '';
    this.deviceType = '';
    this.OS = '';
    this.startdate = '';
    this.enddate = '';
    this.ipAddress = '';
    this.browserName = '';
    this.browserVersion = '';
    this.loginTime = '';
    this.logoutTime = '';
    this.getLoginHistoryList();
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';

  }
}

export class Menuitem {

}
