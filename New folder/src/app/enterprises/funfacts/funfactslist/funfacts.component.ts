/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* FunfactComponent have below functionality.
* ngOnInit(): Method for Component Initalization.
* ngAfterViewInit(): Method for Component views Intialization.
* ngAfterContentChecked():
* singleFunfacts(selectedaction, selectedObj): Method to update the funfacts status.
* Allfunfactslist(): Method to access the eventemitter.
* searchbyfield(searchvalue): Method to get search field info based on search value.
* changeTimezones(timezone): Method to change the getTimezonesstartdate list.
* exportData(searchstring): Method to get export data.
* csvUploaded(users): Method to upload the image file.
* getFunfactsList(): Method to get funfacts details list
* getFunfactsSeachList(searchstring): Method to get funfacts details using simple search.
* advanceSearch(): Method to get funfacts details using advance search.
* gettimeZones(): Method to get Time Zones from Lookup codes.
* importList(): Method to get import list.
* getservercurrentutctime(): Method to get current utc time.
* formatDate(date): Method for formating DOB function into "yyyy-mm-dd".
* advancedModal(): Method to open advance popup model.
* importPopup(): Method to open import modal popup.
* hideImportModal(): Method to hide import modal popup.
* handleKeyPress(e): Method used to call press enter key.
* clearmessages(): Method to clear error message.
* hideAdvanceModal(): Method to hide advanced search popup.
* clearAdvanced(): Method to clear advanced search popup.
*/

import {
  Component, ViewChild, OnInit, Inject, AfterContentChecked, ViewContainerRef,
  AfterViewInit, ViewChildren
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import * as moment from 'moment/moment';
import { FunfactComponent } from '../funfactpopup/funfact.component';
import { FunfactService } from '../funfactpopup/funfact.service';
import { FunfactsService } from './funfacts.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';


@Component({
  templateUrl: 'funfacts.html',
  providers: [FunfactsService, ConfirmationService, FunfactService, AdvertisementsService]
})

export class FunfactsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  cols: any[];
  items: MenuItem[];
  import: MenuItem[];
  funfactsDetails: Array<FunfactsDetails> = [];
  searchstring: string;
  userToken: any;
  toastermessage: any;
  searchfield: any;
  displayStartDateTime: any;
  displayEndDateTime: any;
  storage: Storage = window.localStorage;
  viewstatus: any;
  addststus: any;
  editstatus: any;
  liststatus: any;
  deletestatus: any;
  importstatus: any;
  exportstatus: any;
  rowsPerPage = 10;
  // time zones
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  currentutc: any;
  loginUserDateFormat: any;
  timezoneCodes: any;
  timeZones: any;
  enddate: any = '';
  errorstartdate: any;
  errorenddate: any;
  error: any;
  minDate: Date;
  funfactSearchObj: any;
  enterpriseName: any = '';
  funfact: any = '';
  startDate: any = '';
  endDate: any = '';
  enabled: any = true;
  timezoneCode: any;
  enterpriseIconFilePath: any;
  startdate: any = '';
  adverrefresh: any = 'true';
  check: any = false;
  enterpriseNameValue: any;
  search: any;
  @ViewChild('funfactImportModal') public funfactImportModal: ModalDirective;
  csvFile: any = '';
  csvSrc: any = '';
  fileTypeError: any = false;
  @ViewChildren('input') vc;
  userrole: any;
  utcformat: any;
  size: any;
  bytes: any;
  enterpriseNames: any;
  stacked: any;

  @ViewChild(FunfactComponent)
  private funfactModalComponent: FunfactComponent;
  @ViewChild('myModal') public myModal: ModalDirective;

  /*---- Constructor for Funfacts Component ----*/
  constructor(private funfactsService: FunfactsService,
    private confirmationService: ConfirmationService,
    public advertisementsService: AdvertisementsService,
    public toastr: ToastsManager,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private singlefunfactservice: FunfactService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*---- Component Initalization ---- */
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.viewstatus = window.localStorage.getItem('funfactsviewstatus');
    this.addststus = window.localStorage.getItem('funfactsaddstatus');
    this.editstatus = window.localStorage.getItem('funfactseditstatus');
    this.liststatus = window.localStorage.getItem('funfactsliststatus');
    this.deletestatus = window.localStorage.getItem('funfactsdeletedstatus');
    this.importstatus = window.localStorage.getItem('funfactsimporttatus');
    this.exportstatus = window.localStorage.getItem('funfactsexportstatus');
    this.userToken = window.localStorage.getItem('token');
    this.enterpriseNameValue = window.localStorage.getItem('enterPriseName');
    // time zone
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.timezoneCodes = utcformat[0].trim();
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getservercurrentutctime();
      this.getFunfactsList();
      this.items = [
        {
          label: 'Create fun facts', icon: 'fa fa-smile-o', command: () => {
            this.funfactModalComponent.showChildModal('CREAFUNFACT', '');
          }
        },
      ];
      this.import = [

        { label: 'Import', icon: 'fa-upload', url: '#' },
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
  }

  /*--- Component views intialisation ---*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /*----Checks the bindings of the external component which is used in to view at this time this event is raised.----*/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('funfactstatus') === 'Updated') {
      this.getFunfactsList();
      window.localStorage.removeItem('funfactstatus');
    }
    if (window.localStorage.getItem('funfactupdate') === 'advanceupdate') {
      this.advanceSearch();
      window.localStorage.removeItem('funfactupdate');
    }
    if (window.localStorage.getItem('searchupdate') === 'searchupdate') {
      this.getFunfactsSeachList(this.searchstring);
    }
    window.localStorage.removeItem('searchupdate');
  }

  /*---- To open advance popup model ----*/
  advancedModal() {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.myModal.show();
    this.gettimeZones();
  }

  /* ---- To open import modal popup ----*/
  importPopup() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.funfactImportModal.show();
  }

  /*----- Method used to update funfact status -----*/
  singleFunfacts(selectedaction, selectedObj) {
    this.funfactModalComponent.showChildModal(selectedaction, selectedObj);
  }

  /*--- This method is used to access the eventemitter --- */
  Allfunfactslist(event) {
    if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
      this.getservercurrentutctime();
      this.getFunfactsSeachList(this.searchstring);
    } else {
      this.getservercurrentutctime();
      this.getFunfactsList();
    }
  }

  /*--- To get Time Zones from Lookup codes --- */
  public gettimeZones() {
    this.singlefunfactservice.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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

  /*---- To change the getTimezonesstartdate list----*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }
  /*---- To get current utc time -----*/
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /* ----To upload the image file ----*/
  csvUploaded(users) {
    const usersObj: MSInputMethodContext = <MSInputMethodContext>users;
    const target: HTMLInputElement = <HTMLInputElement>usersObj.target;
    const files: FileList = users.target.files;
    if (files.length > 0) {
      this.csvFile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.csvFile.size;
    this.csvSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.csvFile));
    setTimeout(() => {
      this.csvSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.csvFile));
    }, 500);
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    this.size = (Math.round(fSize * 100) / 100);
    this.bytes = fSExt[i];
    const filetype = this.csvFile.type;
    const extension = filetype.substring(filetype.lastIndexOf('/'));
    const myObj = { 'fileTypes': ['/csv', '/xls', '/xlsx', '/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/vnd.ms-excel'] };
    for (let j = 0; j < myObj['fileTypes'].length; j++) {
      const index = myObj['fileTypes'][j].indexOf(extension);
      if (index > -1) {
        this.fileTypeError = false;
        this.error = '';
        break;
      } else {
        this.fileTypeError = true;
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
      }
    }
  }

  /*---- To get funfacts details list ----*/
  getFunfactsList() {
    this.funfactsService.getMyfunfactsList(this.userToken)
      .subscribe(
      FunfactsDetails => {
        if (FunfactsDetails['result'].length > 0) {
          for (let i = 0; i < FunfactsDetails['result'].length; i++) {
            if (FunfactsDetails['result'][i].displayEndDateTime > this.currentutc) {
              FunfactsDetails['result'][i].recordstatus = 'active';
              if (FunfactsDetails['result'][i].displayStartDateTime > this.currentutc) {
                FunfactsDetails['result'][i].startdatestatus = 'statdateactive';
              } else {
                FunfactsDetails['result'][i].startdatestatus = 'statdateinactive';
              }
            } else {
              FunfactsDetails['result'][i].recordstatus = 'inactive';
            }
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).utc().subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).utc().subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.funfactsDetails = FunfactsDetails['result'];
        }
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

  /*---- To get funfacts details using simple search ----*/
  public getFunfactsSeachList(searchstring) {
    window.localStorage.removeItem('advancesearch');
    if (searchstring) {
      this.funfactsService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        FunfactsDetails => {
          for (let i = 0; i < FunfactsDetails['result'].length; i++) {
            if (FunfactsDetails['result'][i].displayEndDateTime > this.currentutc) {
              FunfactsDetails['result'][i].recordstatus = 'active';
              if (FunfactsDetails['result'][i].displayStartDateTime > this.currentutc) {
                FunfactsDetails['result'][i].startdatestatus = 'statdateactive';
              } else {
                FunfactsDetails['result'][i].startdatestatus = 'statdateinactive';
              }
            } else {
              FunfactsDetails['result'][i].recordstatus = 'inactive';
            }
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).utc().subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).utc().subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');

            }
          }
          this.funfactsDetails = FunfactsDetails['result'];
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
      this.getFunfactsList();
    }
  }

  /*---- To get funfacts details using advanced search ----*/
  advanceSearch() {
    this.adverrefresh = 'false';
    this.errorstartdate = this.startdate;
    this.errorenddate = this.enddate;
    if (this.startdate !== '' && this.enddate !== '' && this.startdate > this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
    } else {
      window.localStorage.setItem('advancesearch', 'advancesearch');
      /** ----- Convert prefered time zone to utc format start----- */
      if (this.startdate !== '' && this.startdate !== undefined && this.startdate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');
        }
        this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      }
      if (this.enddate !== '' && this.enddate !== undefined && this.enddate !== null) {
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
        } else {

          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
        }
        this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
      }
      if (this.check === true) {
        this.enterpriseName = '';
      }
      if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
        this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.funfact !== '' && this.funfact !== undefined) {
        this.funfact = this.funfact.trim().replace(/\s\s+/g, ' ');
      }
      this.funfactSearchObj = {
        'enterpriseName': this.enterpriseName,
        'funfact': this.funfact,
        'displayStartDateTime': this.startdate,
        'displayEndDateTime': this.enddate,
        'isEnabled': this.enabled
      };
      this.funfactsService.getAdvancedSearch(this.userToken, this.funfactSearchObj)
        .subscribe(
        FunfactsDetails => {
          window.localStorage.setItem('exportAdvSearch', 'exportAdvSearch');
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
          const timezonevalue = defaulttimezoneCode.split('(UTC');
          this.utcformat = timezonevalue[0].split('-');
          const utcval = timezonevalue[1].split(')');
          this.utctimezone = utcval[0];
          this.utctimezonestring = utcval[0].toString();
          this.myModal.hide();
          for (let i = 0; i < FunfactsDetails['result'].length; i++) {
            if (FunfactsDetails['result'][i].displayEndDateTime > this.currentutc) {
              FunfactsDetails['result'][i].recordstatus = 'active';
              if (FunfactsDetails['result'][i].displayStartDateTime > this.currentutc) {
                FunfactsDetails['result'][i].startdatestatus = 'statdateactive';
              } else {
                FunfactsDetails['result'][i].startdatestatus = 'statdateinactive';
              }
            } else {
              FunfactsDetails['result'][i].recordstatus = 'inactive';
            }
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).utc().subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayStartDateTime = moment(FunfactsDetails['result'][i]
                .displayStartDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).utc().subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].displayEndDateTime = moment(FunfactsDetails['result'][i]
                .displayEndDateTime).format(this.loginUserDateFormat + ' HH:mm');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].createdAt = moment(FunfactsDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              FunfactsDetails['result'][i].updatedAt = moment(FunfactsDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.funfactsDetails = FunfactsDetails['result'];
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
                this.myModal.hide();
                this.funfactsDetails = FunfactsDetails['result'];
              } else if (statusCode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
    }
  }

  /*---- Export the data ---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('exportAdvSearch') === 'exportAdvSearch') {
      searchstring = JSON.stringify(this.funfactSearchObj);
      window.localStorage.removeItem('exportAdvSearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.funfactsService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /*------ Method to import list -----*/
  importList() {
    if (this.csvFile === '' || this.csvFile === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FILE';
    } else if (this.csvFile !== '' && this.csvFile.type === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else if (this.csvFile !== '' && this.csvFile.type !== '' && this.fileTypeError === true) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else {
      this.funfactsService.importList(this.userToken, this.csvFile)
        .subscribe(data => {
          if (data.statusCode === '1001') {
            this.hideImportModal();
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
        });
    }
  }

  /*--- To hide import modal popup ---*/
  hideImportModal() {
    this.funfactImportModal.hide();
    this.error = '';
    this.csvFile = '';
  }

  /*---- This method is used to call press Enter key ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getFunfactsSeachList(this.searchstring);
    }
  }

  /* --- To clear error message ---*/
  clearmessages() {
    this.error = '';
  }

  /*---- To hide advanced search popup ----*/
  hideAdvanceModal() {
    this.myModal.hide();
    this.error = '';
  }

  /*---- To clear advanced search popup ----*/
  clearAdvanced() {
    this.enterpriseName = '';
    this.funfact = '';
    this.enabled = true;
    this.error = '';
    this.startdate = '';
    this.enddate = '';
    this.getFunfactsList();
    this.gettimeZones();
    window.localStorage.removeItem('advancesearch');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    this.timezoneCodes = utcformat[0].trim();
  }
}

export class FunfactsDetails {
  public funfactId: number;
  public funfactName: string;
  public funfactType: string;
  public funFact: string;
  public isEnabled: boolean;
  public displayStartDateTime: any;
  public displayEndDateTime: any;
}

export class MenuItem {
}
