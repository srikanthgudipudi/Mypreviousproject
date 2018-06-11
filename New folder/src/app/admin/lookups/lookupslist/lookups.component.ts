/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All Lookups Component have below functionality.
*ngOnInit(): All fleets list will be loaded at loading time.
*ngAfterViewInit(): This method called when the component’s view has been fully initialized.
*ngAfterContentChecked(): This method called given component has been checked by the change detection.
*eventEmiter(event): This method is used to use event emmiter.
*singleLookups(selectedaction, selectedObj): To open Lookup create, Edit, View and Delete popups.
*getadvancedsearch(): To show advance search popup.
*advance(): To get Lookup Records using with Advanced Search.
*getalllookupsList(): To get all fleets list.
*exportData(searchstring): export the data.
*getalllookupsSeachList(searchstring): To get the all lookups list by passing username.
*handleKeyPress(e): This method is used to call press Enter key.
*hideAdvanceSearchPopup(): To hide advance search popup.
*clear(): To clear advance search popup input field data.
*autocase(text): Used for init caps.
*/

import { Component, ViewChild, OnInit, Inject, AfterContentChecked, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { LookupsService } from './lookups.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { LookupComponent } from '../lookuppopup/lookup.component';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { AfterViewInit, ViewChildren } from '@angular/core';
import * as moment from 'moment/moment';
@Component({
  templateUrl: 'lookups.html',
  providers: [LookupsService, ConfirmationService]
})

export class LookupsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  alllookupsDetails: AllLookupsDetails[];
  items: MenuItem[];
  import: MenuItem[];
  AllLookupService: Array<AllLookupsDetails> = [];
  searchstring: string;
  userToken: any;
  toastermessage: any;
  lookupviewstatus: any;
  lookupaddstatus: any;
  lookupeditstatus: any;
  lookupliststatus: any;
  lookupdeletedstatus: any;
  lookupexportstatus: any;
  storage: Storage = window.localStorage;
  stacked: any;
  rowsPerPage = 10;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  lookupdata: any;
  lookuptype: any;
  lookupvalue: any;
  lName: any = '';
  enterpriseId: any;
  enabledvalue = true;
  enterpriseIconFilePath: any;
  lookuptypecategory: any = '';
  enterprisevalue: any = '';
  @ViewChildren('input') vc;
  userrole: any;
  enterpriseNames: any;
  @ViewChild(LookupComponent)
  private LookupsModalComponent: LookupComponent;
  @ViewChild('mgModal') public childModal: ModalDirective;

  /* Constructor for Lookup Component */
  constructor(private alllookupsService: LookupsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    private router: Router, private vcr: ViewContainerRef, private confirmationService: ConfirmationService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the all fleets list at loading time ----*/
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.lookupviewstatus = window.localStorage.getItem('lookupviewstatus');
    this.lookupaddstatus = window.localStorage.getItem('lookupaddstatus');
    this.lookupeditstatus = window.localStorage.getItem('lookupeditstatus');
    this.lookupliststatus = window.localStorage.getItem('lookupliststatus');
    this.lookupdeletedstatus = window.localStorage.getItem('lookupdeletedstatus');
    this.lookupexportstatus = window.localStorage.getItem('lookupexportstatus');
    this.userToken = window.localStorage.getItem('token');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.lookupliststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getalllookupsList();
      this.items = [
        {
          label: 'Lookup', icon: 'fa fa-info', command: () => {
            this.LookupsModalComponent.showChildModal('', '');
          }
        },
      ];
      this.import = [
        {
          label: 'Import', icon: 'fa-upload', url: '#'
        },
        {
          label: 'Export', icon: 'fa-download', url: '#'
        },
      ];
    }
  }
  
  /* This method called when the component’s view has been fully initialized */
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }
  
  /* This method called given component has been checked by the change detection */
  ngAfterContentChecked() {
    if (window.localStorage.getItem('fleetstatus') === 'Updated') {
      this.getalllookupsList();
    }
    window.localStorage.removeItem('fleetstatus');
    if (window.localStorage.getItem('advance') === 'advance12') {
      this.advance();
    }
    if (window.localStorage.getItem('searchsimple') === 'searchsimple12') {
      this.getalllookupsSeachList(this.searchstring);
    }
    window.localStorage.removeItem('searchsimple');
    window.localStorage.removeItem('advance');
  }

  /** This method is used to use event emmiter */
  eventEmiter(event) {
    if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
      this.getalllookupsSeachList(this.searchstring);
    } else {
      this.getalllookupsList();
    }
  }
  
  /* To open Lookup create, Edit, View and Delete popups */
  singleLookups(selectedaction, selectedObj) {
    this.LookupsModalComponent.showChildModal(selectedaction, selectedObj);
  }

  /* To show advance search popup */
  getadvancedsearch() {
    this.childModal.show();
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
  }

  /*-- To get Lookup Records using with Advanced Search --*/
  advance() {
    if (this.lookupvalue !== '' && this.lookupvalue !== undefined) {
      this.lookupvalue = this.lookupvalue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.lookuptype !== '' && this.lookuptype !== undefined) {
      this.lookuptype = this.lookuptype.trim().replace(/\s\s+/g, ' ');
    }
    if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
      this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.lookuptypecategory !== '' && this.lookuptypecategory !== undefined) {
      this.lookuptypecategory = this.lookuptypecategory.trim().replace(/\s\s+/g, ' ');
    }
    this.lookupdata = {
      'lookupName': this.lookupvalue,
      'lookupTypeName': this.lookuptype,
      'isEnabled': this.enabledvalue,
      'enterprise': this.enterprisevalue,
      'lookupTypeCategory': this.lookuptypecategory
    };
    this.alllookupsService.advancesearchlookup(this.lookupdata, this.userToken)
      .subscribe(
      alllookupsDetails => {
        window.localStorage.setItem('advancesearch', 'search');
        for (let i = 0; i < alllookupsDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc()
              .subtract(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i]
              .createdAt).subtract(utctimesplit[1], 'minutes');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc()
              .subtract(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i]
              .updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.alllookupsDetails = alllookupsDetails['result'];
        this.childModal.hide();
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }
  /*---- To get all fleets list ----*/
  getalllookupsList() {
    this.alllookupsService.getMyAlllookupsList(this.userToken)
      .subscribe(
      alllookupsDetails => {
        for (let i = 0; i < alllookupsDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc()
              .subtract(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i]
              .createdAt).subtract(utctimesplit[1], 'minutes');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc()
              .subtract(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i]
              .updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.alllookupsDetails = alllookupsDetails['result'];

      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }
  /**----export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advancesearch') === 'search') {
      searchstring = JSON.stringify(this.lookupdata);
      window.localStorage.removeItem('advancesearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.alllookupsService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }
  
  /*---- To get the all lookups list by passing username ----*/
  public getalllookupsSeachList(searchstring) {
    window.localStorage.removeItem('advancesearch');
    if (searchstring) {
      this.alllookupsService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        alllookupsDetails => {
          window.localStorage.setItem('simplesearch', 'simplesearch');
          for (let i = 0; i < alllookupsDetails['result'].length; i++) {
            /** ----- Convert prefered time zone to utc format start----- */
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).
                utc().add(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc()
                .add(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt)
                .add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc()
                .subtract(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i]
                .createdAt).subtract(utctimesplit[1], 'minutes');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc()
                .subtract(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i]
                .updatedAt).subtract(utctimesplit[1], 'minutes');
            }
            /** ----- Code end for Convert prefered time zone to utc format end----- */
          }
          this.alllookupsDetails = alllookupsDetails.result;
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 400:
              if (statusCode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              }
              break;
            case 500:
          }
        }
        );
    } else {
      this.getalllookupsList();
    }
  }

/* This method is used to call press Enter key */
  handleKeyPress(e) {
    const key = e.keyCode; if (key === 13) {
      this.getalllookupsSeachList(this.searchstring);
    }
  }
  /**---  To hide advance search popup ----- */
  hideAdvanceSearchPopup() {
    this.childModal.hide();
  }

  /**---  To clear advance search popup input field data ----- */
  clear() {
    this.lookupvalue = '';
    this.lookuptype = '';
    this.enterprisevalue = '';
    this.enterprisevalue = '';
    this.lookuptypecategory = '';
    this.enabledvalue = true;
    this.getalllookupsList();
  }

  /* Used for init caps */
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{2,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }
}
export class AllLookupsDetails {
  public enterpriseId: string;
  public lookupTypeName: string;
  public lookupName: string;
  public description: string;
  public isEnabled: string;
  public createdBy: string;
  public isDeleted: string;
}
export class MenuItem {
}
