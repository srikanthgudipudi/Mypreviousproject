/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* LookupsModalComponent have below methods:
* ngOnInit(): Component Initalization.
*showChildModal(updateaction, alllookups): To open Lookup create, Edit, View and Delete popups.
*getEnterpriceList(): This method used for to get Enterprice List.
*NewlookupName(value): This method is used to get the value from onchange.
*getEnterpriseResources(type): To split the enterprise id and name.
*createUserInfo(): Follwoing method is used to create lookup.
*Deletelookup(lookup_id): To delete single lookup record.
*editlookupdetails(editobj): To edit lookup data.
*getlookupTypeCategory(userToken, value): This method is used to get the lookuptypes.
*getlookupType(userToken, selectedEnterprise): This method is used to get the lookuptypes.
*Boolean(value): This method is used to get the value from onchange.
*clearmessage(): To clear validation messages.
*/

import { Component, OnInit, ViewChild, HostListener, ViewContainerRef, Inject, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Lookupservice } from './lookup.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Userservice } from '../../../admin/users/userpopup/user.service';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-lookups-popup',
  templateUrl: 'lookup.html',
  providers: [Lookupservice, Userservice]
})

export class LookupComponent implements OnInit {
  public looksobj: any;
  actionType: any;
  updateaction: any;
  lookupTypeName: any;
  isEnabled: any;
  comment: any = '';
  error: any;
  checkBoxValue = true;
  pagename: any;
  userToken: any;
  toastermessage: any;
  status: any;
  lTypeName: any = '';
  Newltypename: any;
  value: any;
  Enterprise: any;
  countries: any = [];
  lName: any = '';
  editobj: any = '';
  descriptions: any;
  enterprisesName: any = '';
  createlookup: any;
  enterprisesSize: any;
  enterprisesNames: any = '';
  enterpriseId: any;
  lookupdata: any;
  updatedAt: any;
  createdAt: any;
  lTypeCategory: any = '';
  enterpriseIconFilePath: any;
  lookupName: any = '';
  timezoneCode: any;
  loggedinuserrole: any;
  enterpriseIcon: any;
  storage: Storage = window.localStorage;
  loginUserDateFormat: any;
  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();

  /* Constructor for Lookup Component */
  constructor(private singleEnterpriseService: Lookupservice,
    public toastr: ToastsManager,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    private translateService: TranslateService, private singleuserservices: Userservice,
    private router: Router, private vcr: ViewContainerRef) { }

  /* Component Initalization */
  ngOnInit() {
    this.status = '';
    this.loggedinuserrole = window.localStorage.getItem('userrole');
    this.userToken = window.localStorage.getItem('token');
    this.getEnterpriceList();
  }

  /* To open Lookup create, Edit, View and Delete popups */
  public showChildModal(updateaction, alllookups): void {
    this.getEnterpriceList();
    this.looksobj = alllookups;
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';

    if (updateaction === 'VIEW') {
      this.looksobj = alllookups;
      this.editobj = alllookups;
      this.enterpriseIcon = this.looksobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.looksobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_LOOKUP';
      this.actionType = 'View';
      this.descriptions = this.looksobj.description;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updatedAt = moment(this.editobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.editobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (updateaction === 'EDIT') {
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_LOOKUP';
      this.actionType = 'Edit';
      this.editobj = alllookups;
      this.descriptions = alllookups.description;
      this.isEnabled = this.editobj.isEnabled;
      this.enterpriseIcon = this.looksobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.looksobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updatedAt = moment(this.editobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.editobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (updateaction === 'DELETE') {
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_LOOKUP';
      this.actionType = 'Delete';
      this.enterpriseIcon = this.looksobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.looksobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;

    } else if (updateaction === 'CREATE') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.lTypeCategory = '';
      if (this.loggedinuserrole !== 'Super Admin' || this.enterprisesSize === true) {
        this.getlookupType(this.userToken, this.enterpriseId);
      }
      this.checkBoxValue = true;
      this.lTypeName = '';
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_LOOKUP';
      this.actionType = 'Create';
    }
    this.childModal.show();
  }

  /* This method used for to get Enterprice List */
  public getEnterpriceList() {
    this.singleEnterpriseService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'][0].enterpriseName;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
            this.enterpriseId = data['result'][0]._id;
            this.enterprisesSize = true;
          } else {
            this.enterprisesSize = false;
            this.enterprisesNames = data['result'];
          }
        }
      });

  }

  /**-------To split the enterprise id and name-------- */
  getEnterpriseResources(type) {
    this.value = type.split('~');
    this.enterpriseId = this.value[0];
    this.enterprisesName = this.value[1];
    this.enterpriseIconFilePath = this.value[2] + '/' + this.value[3];
    this.lTypeCategory = '';
    this.lTypeName = '';
    if (this.enterpriseId !== '') {
      this.getlookupType(this.userToken, this.enterpriseId);
    } else {
      this.Newltypename = '';
      this.lTypeName = '';
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');

    }
  }

  /*-- Follwoing method is used to create lookup -- */
  createUserInfo() {
    if (this.enterprisesName === '' ||
      this.enterprisesName === undefined || this.enterprisesName === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.Newltypename === '' || this.Newltypename === undefined || this.Newltypename === null) {
      this.error = 'LOOKUPS.VALID_NOBLANK_LOOKUP_TYPE';
    } else if (this.lName.trim() === undefined || this.lName.trim() === '' || this.lName.trim() === null) {
      this.error = 'LOOKUPS.VALID_NOBLANK_LOOKUP_VALUE';
    } else if (this.comment.trim() === undefined || this.comment.trim() === '' || this.comment.trim() === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else {
      this.lookupdata = {
        'description': this.comment.trim().replace(/\s\s+/g, ' '),
        'lookupName': this.autocase(this.lName.trim().replace(/\s\s+/g, ' ')),
        'lookupTypeName': this.Newltypename,
        'isEnabled': this.checkBoxValue,
        'enterprise': { 'enterpriseId': this.enterpriseId, 'enterpriseName': this.autocase(this.enterprisesName.trim()) },
        'lookupTypeCategory': this.lTypeCategory
      };
      this.singleEnterpriseService.createlookup(this.lookupdata, this.userToken)
        .subscribe(data => {
          this.hideChildModal();
          this.enterpriseIconFilePath = '';
          this.uploaded.emit('submit');
          window.localStorage.setItem('lookupstatus', 'Updated');
        }, error => {
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
              } else if (statuscode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '2011') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '2033') {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              }
              break;
          }
        });
    }
  }

  /** To delete single lookup record */
  Deletelookup(lookup_id) {
    this.singleEnterpriseService.delete(lookup_id, this.userToken)
      .subscribe(
      data => {
        this.childModal.hide();
        const condition = window.localStorage.getItem('advancesearch');
        const simplesearch = window.localStorage.getItem('simplesearch');
        if (condition === 'search') {
          window.localStorage.setItem('advance', 'advance12');
        } else if (simplesearch === 'simplesearch') {
          window.localStorage.setItem('searchsimple', 'searchsimple12');
        } else {
          this.uploaded.emit('submit');
        }
        window.localStorage.removeItem('simplesearch');
        window.localStorage.setItem('lookupstatus', 'Updated');
        window.localStorage.removeItem('advancesearch');
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      }, error => {
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
            } else if (statuscode === '9995') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '2014') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            }
            break;
        }
      });
  }

  /** To edit lookup data */
  editlookupdetails(editobj) {
    editobj.description = this.autocase(this.descriptions).trim().replace(/\s\s+/g, ' ');
    this.editobj.isEnabled = this.isEnabled;
    if (editobj.enterprise.enterpriseName === '' ||
      editobj.enterprise.enterpriseName === undefined || editobj.enterprise.enterpriseName === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (editobj.lookupTypeName.trim() === '' || editobj.lookupTypeName.trim() === undefined ||
      editobj.lookupTypeName.trim() === null) {
      this.error = 'LOOKUPS.VALID_NOBLANK_LOOKUP_TYPE';
    } else if (editobj.lookupName.trim() === '' || editobj.lookupName.trim() === undefined || editobj.lookupName.trim() === null) {
      this.error = 'LOOKUPS.VALID_NOBLANK_LOOKUP_VALUE';
    } else if (editobj.description.trim() === '' || editobj.description.trim() === undefined || editobj.description.trim() === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else {
      this.editobj.lookupName = this.autocase(this.editobj.lookupName).trim().replace(/\s\s+/g, ' ');
      this.singleEnterpriseService.Edit(editobj, editobj._id, this.userToken)
        .subscribe(
        data => {
          this.childModal.hide();
          const condition = window.localStorage.getItem('advancesearch');
          const simplesearch = window.localStorage.getItem('simplesearch');
          if (condition === 'search') {
            window.localStorage.setItem('advance', 'advance12');
          } else if (simplesearch === 'simplesearch') {
            window.localStorage.setItem('searchsimple', 'searchsimple12');
          } else {
            this.uploaded.emit('submit');
          }
          window.localStorage.removeItem('simplesearch');
          window.localStorage.setItem('lookupstatus', 'Updated');
          window.localStorage.removeItem('advancesearch');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        }, error => {
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
              } else if (statuscode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '2014') {
                this.childModal.hide();
              }
              break;
          }
        });
    }
  }

  /**---- This method is used to get the lookuptypes---- */
  public getlookupTypeCategory(userToken, value) {
    this.singleEnterpriseService.lookuptypecategory(this.userToken, value)
      .subscribe(
      data => {
        this.lTypeCategory = data['result'][0].lookupTypeCategory;
      }, error => {
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
            } else if (statuscode === '9995') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '2014') {
            }
            break;
        }
      });
  }

  /** This method is used to get the lookuptypes */
  public getlookupType(userToken, selectedEnterprise) {
    this.singleEnterpriseService.getlookupType(this.userToken, selectedEnterprise)
      .subscribe(
      data => {
        this.countries = data['result'];
      }, error => {
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
            } else if (statuscode === '9995') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '2014') {
            }
            break;
        }
      });
  }

  /* This method is used to get the value from onchange */
  Boolean(value) {
    this.value = value;
    this.error = '';
  }

  /**---This method is used to get the value from onchange -----*/
  public NewlookupName(value) {
    this.Newltypename = value;
    this.getlookupTypeCategory(this.userToken, value);
  }

  /* To clear validation messages*/
  clearmessage() {
    this.error = '';
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.enterpriseIconFilePath = '';
    this.error = '';
    this.comment = '';
    this.Enterprise = '';
    this.lName = '';
    this.Newltypename = '';
    this.value = '';
    this.countries = [];
    this.lTypeName = '';
    this.childModal.hide();
    this.comment = '';
  }

  /* This method to open childModal */
  popup() {
    this.childModal.show();
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

  /* Autofocus for Cancel and Delete button */
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'VIEW') {
      if (key === 13) {
        this.hideChildModal();
      }
    }
    if (this.updateaction === 'DELETE') {
      if (key === 13) {
        this.Deletelookup(this.looksobj._id);
      }
    }
  }
}

export class Lookupdetails {
  public _id: any;
  public createdAt: any;
  public description: '';
  public enterpriseId: any;
  public isDeleted: any;
  public lookupName: '';
  public lookupTypeName: any;
  public isEnabled: any;
  public enterpriseName: any;
  public enterprise: any;

}
