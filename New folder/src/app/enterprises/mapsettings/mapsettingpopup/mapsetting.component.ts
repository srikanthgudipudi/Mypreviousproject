/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* MapSettingComponent have below methods:
* showChildModal(updateaction, enterpriseid, userAccount, videoTitle, enterpriseStatus): To show the child modal.
* ngOnInit(): To load the userToken at loading time.
* getEnterprisesList(): Get Enterprises List.
* getPageList(): To get PageList.
* getMapListDetails(enterpriId, page): getMapListDetails(enterpriId, page).
* updateDistomapSettings(): Update To Display Map Settings Page.
* hideChildModal(): This method is used to hide the popup model.
*/

import { Component, OnInit, Inject, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment/moment';
import { MapSettingService } from './mapsetting.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mapsetting-popup',
  templateUrl: 'mapsetting.html',
  providers: [MapSettingService]
})

export class MapSettingComponent implements OnInit {
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  updateaction: any;
  enterpriseid: any;
  error: any;
  pagename: string;
  userToken: any;
  enterpriselist: any[];
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  timeZone: any;
  enterprisesSize: any;
  enterpriseName: any;
  enterpriseIconFilePath: any;
  imgSrc: any = '';
  pageList: any;
  pageValue: any;
  enterpriseValue: any;
  mapdetailsDetails: any;
  available: any[];
  selected: any[];
  mapSettings: any;
  createdBy: any;
  createdAt: any;
  updatedBy: any;
  updatedAt: any;
  loginUserDateFormat: any;
  timezoneCode: any;
  timezoneCodes: any;
  userpreferedtimezone: any;
  utctimezone: any;
  utctimezonestring: any;

  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(
    private mapsettingService: MapSettingService,
    private sanitizer: DomSanitizer,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private router: Router, private vcr: ViewContainerRef, private formBuilder: FormBuilder,
    @Inject('defaultCountry') public defaultCountry: string,
    @Inject('defaultState') public defaultState: string, @Inject('defaultCurrency') private defaultCurrency1: string,
    @Inject('defaultLanguage') public defaultLanguage2: string, @Inject('defaultTimezone') private defaultTimezone2: string,
    @Inject('defaultTheme') public defaultTheme2: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    @Inject('dateFormat') public dateFormat2: string,
    @Inject('currencyFormat') private currencyFormat2: string) {
  }

  /**---- To load the content at loading time */
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*---- Toi show child modal ----*/
  public showChildModal(updateaction, mapsettingdata): void {
    this.updateaction = updateaction;
    switch (updateaction) {
      case 'EDIT':
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.timezoneCode = this.timezoneCode.split('-');
        this.timezoneCodes = this.timezoneCode[0].trim();
        this.pagename = 'DISPLAY_MAP_SETTINGS.EDIT_MAP_SETTINGS';
        this.actionType = 'Edit';
        this.getEnterprisesList(mapsettingdata);
        this.getPageList();
        this.selected = [];
        this.available = [];
        this.enterpriseValue = mapsettingdata['_id'].enterpriseId;
        this.pageValue = mapsettingdata['_id'].page;
        this.getMapListDetails(this.enterpriseValue, this.pageValue);
        break;
      case 'VIEW':
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.timezoneCode = this.timezoneCode.split('-');
        this.timezoneCodes = this.timezoneCode[0].trim();
        this.pagename = 'DISPLAY_MAP_SETTINGS.VIEW_MAP_SETTINGS';
        this.actionType = 'View';
        this.getEnterprisesList(mapsettingdata);
        this.getPageList();
        this.selected = [];
        this.available = [];
        this.enterpriseValue = mapsettingdata['_id'].enterpriseId;
        this.enterpriseName = mapsettingdata['_id'].enterpriseName;
        this.pageValue = mapsettingdata['_id'].page;
        this.getMapListDetails(this.enterpriseValue, this.pageValue);
        break;
    }
    this.childModal.show();
  }

  /* ---- Get Enterprises List ---- */
  getEnterprisesList(mapsettingdata) {
    this.mapsettingService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterpriselist = data['result'];
            this.enterpriseid = this.enterpriselist[0]._id;
            this.enterpriseIconFilePath = this.enterpriselist[0].enterpriseIconFilePath + '/' + this.enterpriselist[0].enterpriseIcon;
            this.imgSrc = this.apiEndPoint + '/' +
              this.enterpriselist[0].enterpriseIconFilePath + '/' + this.enterpriselist[0].enterpriseIcon;
          } else {
            this.enterpriselist = data.result;
            this.enterprisesSize = false;
          }
        }
      });
  }

  /*---- To get PageList ---*/
  public getPageList() {
    this.mapsettingService.getLookupsList(this.userToken, 'DISPLAY_TO_MAP_PAGES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.pageList = data['result'];
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

  /*---- To get Map List Details ---*/
  getMapListDetails(enterpriId, page) {
    this.selected = [];
    this.available = [];
    this.mapsettingService.getMapListDetails(this.userToken, enterpriId, page)
      .subscribe(
      mapdetailsDetails => {
        if (this.utctimezonestring.charAt(0) === '+') {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.createdAt = moment(mapdetailsDetails['result'][0].createdAt).utc().add(utctimesplit[0], 'hours');
          this.createdAt = moment(this.createdAt).add(utctimesplit[1], 'minutes');
          this.updatedAt = moment(mapdetailsDetails['result'][0].updatedAt).utc().add(utctimesplit[0], 'hours');
          this.updatedAt = moment(this.updatedAt).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.createdAt = moment(mapdetailsDetails['result'][0].createdAt).utc().subtract(utctimesplit[0], 'hours');
          this.createdAt = moment(this.createdAt).subtract(utctimesplit[1], 'minutes');
          this.updatedAt = moment(mapdetailsDetails['result'][0].updatedAt).utc().subtract(utctimesplit[0], 'hours');
          this.updatedAt = moment(this.updatedAt).subtract(utctimesplit[1], 'minutes');
        }
        this.updatedAt = moment(this.updatedAt).
          format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
        this.createdAt = moment(this.createdAt).
          format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
        for (let i = 0; i < mapdetailsDetails['result'].length; i++) {
          this.createdBy = mapdetailsDetails['result'][0].createdBy;
          this.updatedBy = mapdetailsDetails['result'][0].updatedBy;
          if (JSON.stringify(mapdetailsDetails['result'][i].isSelected) === 'true') {
            this.selected.push(mapdetailsDetails['result'][i]);
          } if (JSON.stringify(mapdetailsDetails['result'][i].isSelected) === 'false') {
            this.available.push(mapdetailsDetails['result'][i]);
          }
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
              break;
            } else if (statuscode === '9997') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              break;
            }
        }
      });
  }

  /* ---- Update To Display Map Settings Page ----- */
  public updateDistomapSettings() {
    for (let i = 0; i < this.available.length; i++) {
      this.available[i].isSelected = false;
    }
    for (let i = 0; i < this.selected.length; i++) {
      this.selected[i].isSelected = true;
    }
    this.mapSettings = {
      'enterpriseId': this.enterpriseValue,
      'pageName': this.pageValue,
      'availableCol': this.available,
      'selectedCol': this.selected
    };
    /*-- Calling Insertion Service*/
    this.mapsettingService.updateDistomapSettings(this.userToken, this.mapSettings).subscribe(
      data => {
        if (data['statusCode'] === '1001') {
        this.childModal.hide();
          if (window.localStorage.getItem('advancesearch') === 'advancesearch') {
            window.localStorage.setItem('mapsetting', 'advanceupdate');
          } else if (window.localStorage.getItem('mapsettingssearch') === 'mapsettingssearch'){
            window.localStorage.setItem('searchupdate', 'searchupdate');
          } else {
          window.localStorage.setItem('resourceAdd', 'Added');
          this.uploaded.emit();
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
            } else if (statuscode === '2051') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } break;
        }
      }
    );
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.createdAt = '';
    this.updatedAt = '';
    this.childModal.hide();
  }
}

export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}
