/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/*
* Fleet Attributes Modal Component have below methods:

* ngOnInit(): To load the userToken at loading time.
* selectedEnterprise(value): This method is used to get the enterprise from from enrerprise list.
* getFleettypeList(enterpriseid): To get fleet type list.
* getEnterpriseNamesList(): This method is used to get Enterprise Names List.
* getAttributeTypeList(): This method is used to get Attribute Types List.
* updateFleetAttribute(): This method is used to update fleet attribute.
* getLookupTypeList(enterpriseid): To get the lookup type list.
* selectedFleettype(value): To get  On change fleet type value.
* selectedattributetype(value): To get on change fleet type atrributevalue.
* selectedLookuptype(value, enterpriseid): To get on change lookup type value.
* deleteFleetAttribute(): This method is used to delete fleet attribute.
* createFleetAttribute(): This method is used to create fleet attribute.
* showChildModal(actionName, selectedFleetAttributeObj): To show the child modal.
* getFleettypeList(): This method is used to get Fleet Types List.
* keyPress(e): To done the particular action.
* getLookupTypeList(): This method is used to get Lookup Types List.
* clearmessage(): To clear the messages.
* hideChildModal(): To hide the popup modal.
*/
import {
  Component, OnInit, ViewChild, AfterContentChecked,
  ViewContainerRef, Output, EventEmitter, Inject, HostListener
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { AttributeService } from './attribute.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { FleetAttributesModel } from '../attributeslist/attributes.component';
import { Enterpriseservice } from '../../../admin/enterprises/enterprisepopup/enterprise.service';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-attributeslisting-popup',
  templateUrl: 'attribute.html',
  providers: [AttributeService, Enterpriseservice]
})
export class AttributeComponent implements OnInit, AfterContentChecked {
  actionName: any;
  enterpriseid: any;
  fleetCommonName: any;
  error: any;
  pageName: string;
  action: any;
  createddate: any;
  updateddate: any;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  fleetAttributeData: FleetAttributesModel;
  enterpriselist: any[];
  fleettypelist: any[];
  lookuptypelist: any[];
  attributeTypelist: any[];
  attributessequenceorder: any;
  attributename: any;
  enabled: any = true;
  mandatory: any = false;
  attributeEnterprisename: any;
  attributeFleettype: any;
  fleetattributetype: any;
  fleetattributelookuptype: any;
  attributeCreatedata: any;
  attributedescription: any;
  enterprisesSize: any;
  enterprisesName: any;
  enterprisename: any;
  enterpriseIconFilePath: any;
  tosterMessage: any;
  userRoll: any;
  createdAt: any;
  updatedAt: any;
  timezoneCode: any;
  defaultValueerror: any;
  lookupnamelist: any[];
  updatefleetAttributeData: any;
  defaultValue: any;
  enterpriseIcon: any;
  loginUserDateFormat: any;
  attributeEnable: any;
  attributeMandatory: any;
  attributeType: any;
  attributeName: any;
  lookupType: any;
  sequenceOrder: any;
  attributeDescription: any;
  fleetType: any;
  part1: any;
  part2: any;
  @ViewChild('lgModal') public childModal: ModalDirective;
  @Output() updatedList: EventEmitter<string> = new EventEmitter();
  constructor(private singleFleetAttributeService: AttributeService,
    private enterpriseService: Enterpriseservice,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('defaultDisplaySequence') public defaultDisplaySequence: number,
    @Inject('apiEndPoint') public apiEndPoint: string) { }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userToken = window.localStorage.getItem('token');
    window.localStorage.removeItem('advanceattribute');
  }
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
  }
  /*---- To show modal ----*/
  public showChildModal(actionName, selectedFleetAttributeObj): void {
    this.actionName = actionName;
    this.error = '';
    this.actionType = 'Create';
    this.fleetAttributeData = selectedFleetAttributeObj;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.attributessequenceorder = this.defaultDisplaySequence;
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.updatedAt = moment(this.fleetAttributeData.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    this.createdAt = moment(this.fleetAttributeData.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    switch (actionName) {

      case 'View':
        this.createddate = this.formatDate(this.fleetAttributeData.createdAt);
        this.updateddate = this.formatDate(this.fleetAttributeData.updatedAt);
        this.enterpriseIcon = selectedFleetAttributeObj.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = selectedFleetAttributeObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
        this.part1 = this.translateService.get('COMMON_PAGE_TITLES.VIEW_FLEET');
        this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_TYPE_ATTRIBUTE');
        this.pageName = this.part1.value + this.fleetCommonName + this.part2.value;
        this.actionType = 'View';
        this.selectedLookuptype(this.fleetAttributeData.lookupType, this.enterpriseid);
        break;

      case 'Edit':
        this.createddate = this.formatDate(this.fleetAttributeData.createdAt);
        this.updateddate = this.formatDate(this.fleetAttributeData.updatedAt);
        this.fleetAttributeData = selectedFleetAttributeObj;
        this.attributeEnable = this.fleetAttributeData.isEnabled;
        this.attributeMandatory = this.fleetAttributeData.isMandatory;
        this.enterpriseid = selectedFleetAttributeObj.enterprise.enterpriseId._id;
        this.enterpriseIcon = selectedFleetAttributeObj.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = selectedFleetAttributeObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
        this.part1 = this.translateService.get('COMMON_PAGE_TITLES.EDIT_FLEET');
        this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_TYPE_ATTRIBUTE');
        this.pageName = this.part1.value + this.fleetCommonName + this.part2.value;
        this.selectedLookuptype(this.fleetAttributeData.lookupType, this.enterpriseid);
        this.defaultValue = this.fleetAttributeData.defaultValue;
        this.sequenceOrder = this.fleetAttributeData.sequenceOrder;
        this.lookupType = this.fleetAttributeData.lookupType;
        this.attributeType = this.fleetAttributeData.attributeType;
        this.attributeName = this.fleetAttributeData.attributeName;
        this.fleetType = this.fleetAttributeData.fleetType;
        this.attributeDescription = this.fleetAttributeData.attributeDescription;
        this.actionType = 'Edit';
        break;

      case 'Delete':
        this.createddate = this.formatDate(this.fleetAttributeData.createdAt);
        this.updateddate = this.formatDate(this.fleetAttributeData.updatedAt);
        this.enterpriseIcon = selectedFleetAttributeObj.enterprise.enterpriseId.enterpriseIcon;
        this.enterpriseIconFilePath = selectedFleetAttributeObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
        this.part1 = this.translateService.get('COMMON_PAGE_TITLES.DELETE_FLEET');
        this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_TYPE_ATTRIBUTE');
        this.pageName = this.part1.value + this.fleetCommonName + this.part2.value;
        this.selectedLookuptype(this.fleetAttributeData.lookupType, this.enterpriseid);
        this.actionType = 'Delete';
        break;

      case 'Create':
        this.part1 = this.translateService.get('COMMON_PAGE_TITLES.CREATE_FLEET');
        this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_TYPE_ATTRIBUTE');
        this.pageName = this.part1.value + this.fleetCommonName + this.part2.value;
        this.actionType = 'Create';
        this.mandatory = false;
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        this.getEnterpriseNamesList();
        break;
    }
    this.childModal.show();
  }

  /**--- To get the enterprise name list ---- */
  getEnterpriseNamesList() {
    this.userToken = window.localStorage.getItem('token');
    this.userRoll = window.localStorage.getItem('userrole');
    this.singleFleetAttributeService.getEnterpriseNamesList(this.userToken)
      .subscribe(
      enterpriseList => {
        if (enterpriseList.statusCode === '1001') {
          if (enterpriseList.result.length === 1) {
            this.enterprisesName = enterpriseList.result[0].enterpriseName;
            this.enterprisename = enterpriseList.result[0].enterpriseName;
            this.attributeEnterprisename = enterpriseList.result[0].enterpriseName;
            this.enterpriseid = enterpriseList.result[0]._id;
            this.enterpriseIconFilePath = enterpriseList.result[0].enterpriseIconFilePath + '/' + enterpriseList.result[0].enterpriseIcon;
            this.enterpriseIcon = enterpriseList.result[0].enterpriseIcon;
            this.enterprisesSize = true;
          } else {
            this.enterpriselist = enterpriseList.result;
            this.enterprisesSize = false;
          }
        }
        // this.getFleettypeList(this.enterpriseid);
        // this.getLookupTypeList(this.enterpriseid);
      },
      error => {
      });
  }

  /**---- This method is used to get the enterprise from from enrerprise list---- */
  selectedEnterprise(value) {
    this.attributeEnterprisename = value;
    this.enterprisesName = value.split('~');
    this.enterprisename = this.enterprisesName[1];
    this.enterpriseIconFilePath = this.enterprisesName[2] + '/' + this.enterprisesName[3];
    if (this.enterprisesName[0] === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
    this.enterpriseid = this.enterprisesName[0];
    if (this.enterpriseid === '' || this.enterpriseid === undefined || this.enterpriseid === null) {
      this.fleettypelist = [];
      this.lookuptypelist = [];
      this.attributeTypelist = [];
      this.lookupnamelist = [];
      this.fleetattributetype = '';
    } else {
      this.getAttributeTypeList();
      this.getLookupTypeList(this.enterpriseid);
      this.getFleettypeList(this.enterpriseid);
    }
    // this.selectedLookuptype(this.fleetattributelookuptype, this.enterpriseid);

    // if (value === '') {
    //   this.attributeFleettype = '';
    // }
  }

  /** ------To get fleet type list ---- */
  getFleettypeList(enterpriseid) {
    this.userToken = window.localStorage.getItem('token');
    this.singleFleetAttributeService.getFleetTypeList(this.userToken, enterpriseid)
      .subscribe(
      fleettypelist => {
        this.fleettypelist = fleettypelist['result'][0].fleetTypes;
      },
      error => {
      });
  }

  /**--- To get the attribute type list --- */
  getAttributeTypeList() {
    this.userToken = window.localStorage.getItem('token');
    this.singleFleetAttributeService.getAttributeTypeList(this.userToken)
      .subscribe(
      attributeTypelist => {
        this.attributeTypelist = attributeTypelist['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
        }
      });
  }

  /** ---To get the lookup type list --- */
  getLookupTypeList(enterpriseid) {
    this.userToken = window.localStorage.getItem('token');
    this.singleFleetAttributeService.getLookupTypeList(this.userToken)
      .subscribe(
      lookuptypelist => {
        this.lookuptypelist = lookuptypelist['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
        }
      });
  }

  /**----To get  On change fleet type value ----- */
  selectedFleettype(value) {
    this.attributeFleettype = value;
  }

  /** ---To get on change fleet type atrributevalue----  */
  selectedattributetype(value) {
    this.defaultValue = '';
    this.fleetattributetype = value;
  }

  /**---- To get on change lookup type value  --- */
  selectedLookuptype(value, enterpriseid) {
    this.lookupnamelist = [];
    this.defaultValue = '';
    this.fleetattributelookuptype = value;
    if (value !== '' && value !== undefined) {
      this.singleFleetAttributeService.getlookUpNameList(this.userToken, value, this.enterpriseid)
        .subscribe(
        lookupnamelist => {
          this.lookupnamelist = lookupnamelist['result'];
        },
        error => {
        });
    }
  }


  @HostListener('keypress', ['$event'])

  /**---- To done the below action when we press enter Key ---*/
  keyPress(e) {
    const key = e.keyCode;
    if (this.actionName === 'View') {
      if (key === 13) {
        this.childModal.hide();
      }
    }

    /**---- To done the below action when we press enter Key ---*/
    if (this.actionName === 'Delete') {
      if (key === 13) {
        this.deleteFleetAttribute();
      }
    }
  }

  /* Create Fleet Attribute */
  public createFleetAttribute() {
    if (this.attributeEnterprisename === '' || this.attributeEnterprisename === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.attributeFleettype === '' || this.attributeFleettype === undefined || this.attributeFleettype === 'undefined') {
      this.error = this.translateService.get('FLEETS.VALID_NOBLANK_FLEET_TYPE');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.attributename === undefined || this.attributename.trim() === '') {
      this.error = 'FLEET_TYPE_ATTRIBUTES.VALID_NOBLANK_ATTRIBUTE_NAME';
    } else if (this.fleetattributetype === '' || this.fleetattributetype === undefined) {
      this.error = 'FLEET_TYPE_ATTRIBUTES.VALID_NOBLANK_ATTRIBUTE_TYPE';
    } else if (this.fleetattributetype === 'List Field' &&
      (this.fleetattributelookuptype === '' || this.fleetattributelookuptype === undefined ||
        this.fleetattributelookuptype === 'undefined')) {
      this.error = 'LOOKUPS.VALID_NOBLANK_LOOKUP_TYPE';
    } else if (this.attributedescription === undefined || this.attributedescription.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.mandatory === true && (this.defaultValue === undefined || this.defaultValue === '')) {
      this.defaultValueerror = 'FLEET_TYPE_ATTRIBUTES.VALID_NOBLANK_DEFAULT_VALUE';
    } else {
      if (this.attributessequenceorder === undefined || this.attributessequenceorder === '') {
        this.attributessequenceorder = this.defaultDisplaySequence;
      }
      this.error = '';
      this.defaultValueerror = '';
      if (this.fleetattributetype === 'Text Field') {
        this.fleetattributelookuptype = '';
      }

      this.attributeCreatedata = {
        'enterprise': {
          'enterpriseId': parseInt(this.enterpriseid, 0),
          'enterpriseName': this.enterprisename
        },
        'fleetType': this.attributeFleettype,
        'attributeName': this.autocase(this.attributename).trim().replace(/\s\s+/g, ' '),
        'attributeDescription': this.attributedescription.trim().replace(/\s\s+/g, ' '),
        'attributeType': this.fleetattributetype,
        'lookupType': this.fleetattributelookuptype,
        'sequenceOrder': this.attributessequenceorder,
        'isMandatory': this.mandatory,
        'isEnabled': this.enabled,
        'defaultValue': this.defaultValue
      };
      this.singleFleetAttributeService.createFleetAttribute(this.userToken, this.attributeCreatedata)
        .subscribe(
        response => {
          if (response['statusCode'] === '1011') {
            this.closePopupModal();
            this.tosterMessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
            this.toastr.success(this.tosterMessage.value);
            this.updatedList.emit('submit');
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
              } else {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              }
              break;
          }

        });
    }
  }

  /* Update Fleet Attribute */
  updateFleetAttribute() {
    if (this.attributeName === undefined || this.attributeName.trim() === '') {
      this.error = 'FLEET_TYPE_ATTRIBUTES.VALID_NOBLANK_ATTRIBUTE_NAME';
    } else if (this.attributeDescription === undefined || this.attributeDescription.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (Boolean(this.attributeMandatory) === Boolean('true') && (this.defaultValue === undefined ||
      this.defaultValue === '')) {
      this.defaultValueerror = 'FLEET_TYPE_ATTRIBUTES.VALID_NOBLANK_DEFAULT_VALUE';
    } else {
      if (this.sequenceOrder === undefined || this.sequenceOrder === null || this.sequenceOrder.toString() === '') {
        this.sequenceOrder = this.defaultDisplaySequence;
      }
      this.error = '';
      this.defaultValueerror = '';
      this.updatefleetAttributeData = {
        'enterprise': {
          'enterpriseId': this.fleetAttributeData.enterprise.enterpriseId,
          'enterpriseName': this.fleetAttributeData.enterprise.enterpriseName
        },
        '_id': this.fleetAttributeData._id,
        'fleetType': this.fleetType,
        'attributeName': this.autocase(this.attributeName).trim().replace(/\s\s+/g, ' '),
        'attributeDescription': this.attributeDescription.trim().replace(/\s\s+/g, ' '),
        'attributeType': this.attributeType,
        'lookupType': this.lookupType,
        'sequenceOrder': this.sequenceOrder,
        'isMandatory': this.attributeMandatory,
        'isEnabled': this.attributeEnable,
        'defaultValue': this.defaultValue
      };
      this.singleFleetAttributeService.updateFleetAttributes(this.userToken, this.updatefleetAttributeData)
        .subscribe(
        response => {
          if (response['statusCode'] === '1014') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            if (window.localStorage.getItem('advanceattribute') === 'attributeadvance') {
              window.localStorage.setItem('fleettypeupdate', 'fleetattribute');
            } else {
              this.updatedList.emit('submit');
            }
            window.localStorage.removeItem('advanceattribute');
            this.childModal.hide();
            this.lookupType = '';
            this.lookupnamelist = [];
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
              } else if (statuscode === '9997') {
                this.closePopupModal();
              } else {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              }
              break;
          }
        });
    }
  }

  /* Delete  Fleet Attribute */
  deleteFleetAttribute() {
    this.singleFleetAttributeService.deleteFleetAttributes(this.userToken, this.fleetAttributeData._id)
      .subscribe(
      response => {
        this.childModal.hide();
        if (response['statusCode'] === '1013') {
          this.tosterMessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.tosterMessage.value);
          if (window.localStorage.getItem('advanceattribute') === 'attributeadvance') {
            window.localStorage.setItem('fleettypeupdate', 'fleetattribute');
          } else {
            this.updatedList.emit('submit');
          }
          window.localStorage.removeItem('advanceattribute');
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
            } else {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
            break;
        }
      });
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
    this.defaultValueerror = '';
  }

  /**---- To edit the checkbox ---*/
  editcheckbox() {
    if (Boolean(this.fleetAttributeData.isMandatory) === Boolean('false')) {
      this.defaultValueerror = '';
    }
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.error = '';
    this.childModal.hide();
  }

  /*---- DOB Formating function into "yyyy-mm-dd" ----*/
  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1), day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }

    return [year, month, day].join('-');
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

  /*---- Close childModal popup ----*/
  closePopupModal() {
    this.error = '';
    this.defaultValueerror = '';
    this.enterprisename = '';
    this.attributeFleettype = '';
    this.enterpriseIconFilePath = '';
    this.attributename = '';
    this.attributedescription = '';
    this.fleetattributetype = '';
    this.fleetattributelookuptype = '';
    this.attributessequenceorder = '';
    this.enabled = false;
    this.mandatory = false;
    this.lookupType = '';
    this.fleettypelist = [];
    this.lookuptypelist = [];
    this.attributeTypelist = [];
    this.lookupnamelist = [];
    this.childModal.hide();
  }
}
