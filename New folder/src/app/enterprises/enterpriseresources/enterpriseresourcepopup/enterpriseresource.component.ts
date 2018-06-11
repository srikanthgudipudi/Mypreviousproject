/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/
/**
 * SingleuserComponent has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * getEnterprisesList(): This method is used to get enterpriselist.
 * getGenderList(): This method is used to get gender list.
 * getDepartmentsList(): This method is used to get department list.
 * getStatesList(selectedCountry: any): This method is used to get stateslist.hyphen_generate_mobile(value)
 * getEnterpriseName(value): This method is used to get enterprise names.
 * createResource(): This  method is used to create resources.
 * updateResource(selectedObject: any): This  method is used to update resources.
 * deleteUser(): This  method is used to delete resources.
 * getResourceTypeList(): To get resource type list.
 * getMobileCountryCode(countryCode): To get Moblie Country Code values in Add.
 * getMobileCountryCodeEdit(countryCode): To get Moblie Country Code values in Edit.
 * getCountriesList(): To get the countries list.
 * getreason(reason): To change the reason list.
 * getgender(value): To get the gender name from the gender dropdown list.
 * getresourcetype(value): To get the resources type from the resourcetype list.
 * showChildModal(updateaction, enterpriseresource): To call the selected popup's.
 * viewChildModal(updateaction, enterpriseresource): To call the selected popup's.
 * getStatesList(selectedCountry: any): To get the states list.
 * getselectCountry(value): To get the country from countries list on change.
 * getselectState(value): To get state oon change of states list.
 * selectedUser(action, selectedUserObj: any): To get the selectd user information popup.
 * hyphen_generate_mobile(value): This method is used to generate hyphen between numbers.
 * hyphen_generate_worknum(value): This method is used to generate hyphen between numbers.
 * hyphen_generateEdit(value): This method is used to generate hyphen between numbers.
 * getCountryCode(countryCode): To get Work Country Code values in Add.
 * getactivateReasons(): To get the active reasons list.
 * getinactivateReasons(): To get the inactive reasons list.
 * getselectDepartment(value): To get the selected department from the dropdown list.
 * exportlist(searchstring, userToken): This method is used to download the data
 * updatResource(): To update the enterprise resources details.
 * getStatusList(): To get the status list.
 * imageUploaded(event): To upload the image.
 * autocase(text): To captilise the each word.
 * clearmessage(): This method is used to clear the error messages.
 * getCountryCodes(): To get the country codes.
 * hideUserModal(): To remove the data in the variables.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 */
import {
  Component, OnInit, ViewChild, Inject, ElementRef, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EnterpriseResourceService } from './enterpriseresource.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-entdetails-popup',
  templateUrl: './enterpriseresource.html',
  providers: [EnterpriseResourceService]
})
export class EnterpriseResourceComponent implements OnInit {
  @ViewChild('lgModal') public childModal: ModalDirective;
  token: any = window.localStorage.getItem('token');
  storage: Storage = window.localStorage;
  toastermessage: any;
  enterprisesSize: any;
  record_id: any = '';
  enterprisesName: any;
  enterprisesNames: any = [];
  selectedObj: any;
  enterpriseid: any;
  file: any;
  timezoneCode: any;
  updateAt: any;
  createAt: any;
  enterprisename: any = '';
  pagename: any;
  countries: any = [];
  staticjson: any = [];
  gender: any = [];
  usrType: any = [];
  mydepartment: any = [];
  designations: any = [];
  actionName: any;
  firstname: any = '';
  lastname: any = '';
  ssn: any = '';
  supemail: any = '';
  designation: any = '';
  enabled: any;
  worknumber: any = '';
  ext: any = '';
  mobile: any = '';
  email: any = '';
  comments: any = '';
  addressLine1: any = '';
  addressLine2: any = '';
  country: any;
  state: any;
  states: any = [];
  city: any = '';
  zip: any = '';
  error: any = '';
  selectedGender: any;
  selectResourceType: any;
  selectDepartment: any;
  selectCountry: any;
  resourceObj: any;
  imgfile: any = '';
  minsize: any = 4;
  maxsize: any = 10;
  imgSrc: any = '';
  imgStatus: any = false;
  star = false;
  retext: any;
  reason: any;
  reasons: any;
  reasonValue: any;
  oldreasonValue: any;
  selectDefaultCountry: any;
  enterpriseResourceIcon: any = '';
  imagename: any;
  longitude: any;
  latitude: any;
  status: any;
  enterpriseIconFilePath: any;
  enterpriseResourcesImageFileName: any = '';
  reasonActivate: any;
  reasonInactivate: any;
  oldreasonActive: any;
  oldreasonInactive: any;
  countryCodeEdit: any;
  mobileCountryCodeEdit: any;
  addLong: any = '';
  addLat: any = '';
  value: any;
  value1: any;
  editLong: any = '';
  editLat: any = '';
  countryCode: any;
  mobileCountryCode: any;
  unblockreasons: any;
  countryCodes: any;
  tempresourceIcon: any;
  worknumbercntrycode: any;
  mobilenumcuntrycode: any;
  worknumext: any;
  worknumbercntrycodesplit: any[];
  mobilenumbercntrycode: any;
  mobilenumbercntrycodesplit: any[];
  mobilecode: any;
  enterpriseresourceimagename: any;
  imageTypeError: any = false;
  loginUserDateFormat: any;
  errMsg1: any;
  errMsg2: any;
  resourceemail: any;
  emptyimg: any;
  private LONG_LAT_PAT1 = '^[-+](?:[0-9]|[1-9][0-9]|1[0-7][0-9])(\\.\\d{1,13})?$';
  private LONG_LAT_PAT = '^([-+](?:180(?:(?:\.0{1,13})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,13})?)?)?)$';
  constructor(private el: ElementRef,
    private singleuserservices: EnterpriseResourceService, private router: Router,
    public toastr: ToastsManager, private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultCountry') private defaultCountry: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    @Inject('defaultState') private defaultState: string) {
    this.state = '';
    this.selectCountry = defaultCountry;
    this.selectDefaultCountry = defaultCountry;
  }

  /*--- This is the default method called when page is loading--- */
  ngOnInit() {
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else {
    }
    this.getStatusList();
    this.getCountryCodes();
  }

  /*-- enterprise list --*/
  getEnterprisesList() {
    this.singleuserservices.getEnterprices(this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseid = this.enterprisesName[0]._id;
            this.enterpriseIconFilePath = this.enterprisesName[0].enterpriseIconFilePath + '/' + this.enterprisesName[0].enterpriseIcon;
            this.imgSrc = this.apiEndPoint + '/' +
              this.enterprisesName[0].enterpriseIconFilePath + '/' + this.enterprisesName[0].enterpriseIcon;
            this.enterpriseResourcesImageFileName = this.enterprisesName[0].enterpriseIcon;
            this.enterprisename = this.enterprisesName[0].enterpriseName;
            this.selectCountry = this.enterprisesName[0].address['country'];
            this.state = this.enterprisesName[0].address['state'];
            this.addressLine1 = this.enterprisesName[0].address['addressLine1'];
            this.addressLine2 = this.enterprisesName[0].address['addressLine2'];
            this.city = this.enterprisesName[0].address['city'];
            this.zip = this.enterprisesName[0].address['ZIP'];
            this.email = this.enterprisesName[0].contactDetails['email'];
            this.worknumber = this.enterprisesName[0].contactDetails['workNumber'];
            this.countryCode = this.enterprisesName[0].contactDetails['workNumberCountrycode'];
            this.ext = this.enterprisesName[0].contactDetails['workNumberExtn'];
            this.longitude = this.enterprisesName[0].address['geoCoordinates'][1];
            this.latitude = this.enterprisesName[0].address['geoCoordinates'][0];
            this.getStatesList(this.selectCountry);
            this.enterprisesSize = true;
            this.getDepartmentsList();
          } else {
            this.enterprisesNames = data.result;
            this.enterprisesSize = false;
          }
        }
      });
  }

  /*-- Get Gender list --*/
  public getGenderList() {
    this.singleuserservices.getLookupsList(this.token, 'GENDER').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.gender = data['result'];
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
            } break;
        }
      }
    );
  }

  /*-- Get Departments list --*/
  public getDepartmentsList() {
    let enterpriseid;
    if (this.actionName === 'Create') {
     enterpriseid = this.enterpriseid;
    } else if (this.actionName === 'Edit') {
      enterpriseid = this.selectedObj.enterprise.enterpriseId._id;
    }
    this.singleuserservices.getLookupsByEnterprise(this.token, 'DEPARTMENTS', enterpriseid).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.mydepartment = data['result'];
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
            } break;
        }
      }
    );
  }

  /*-- Get Resource Types list --*/
  public getResourceTypeList() {
    this.singleuserservices.getLookupsList(this.token, 'RESOURCE_TYPES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.usrType = data['result'];
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
            } break;
        }
      }
    );
  }

  /*-- Get Countries list --*/
  public getCountriesList() {
    this.singleuserservices.getLookupsList(this.token, 'COUNTRIES').subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          this.countries = data['result'];
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
            } break;
        }
      }
    );
  }

  /*-- Get List of States --*/
  getStatesList(selectedCountry: any) {
    this.singleuserservices.getStatesList(this.token, selectedCountry).subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          this.states = data['result'];
        }
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
            } break;
        }
      }
    );
  }

  /**---- To call the selected popup's---- */
  public showChildModal(updateaction, enterpriseresource): void {
    this.selectedObj = enterpriseresource;
    this.actionName = updateaction;
    if (this.actionName === 'Create') {
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_ENTERPRISE_RESOURCE';
      this.getGenderList();
      this.getResourceTypeList();
      this.getCountriesList();
      this.getStatesList(this.selectCountry);
      this.getEnterprisesList();
      this.getStatusList();
      this.getCountryCodes();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');

    } else if (this.actionName === 'Edit') {
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_ENTERPRISE_RESOURCE';
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath;
      this.imgSrc = this.apiEndPoint + '/' + this.selectedObj.enterpriseResourcesImageFilePath;
      this.reasonActivate = this.selectedObj.reasonUnblock;
      this.reasonInactivate = this.selectedObj.reasonBlock;

    } else if (this.actionName === 'View') {
      this.reasonValue = '';
      this.retext = true;
      this.enabled = this.selectedObj.isEnabled;
      this.reasonActivate = this.selectedObj.reasonUnblock;
      this.reasonInactivate = this.selectedObj.reasonBlock;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath;
      this.imgSrc = this.apiEndPoint + '/' + this.selectedObj.enterpriseResourcesImageFilePath;
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_ENTERPRISE_RESOURCE';
      this.getStatusList();

    } else if (this.actionName === 'Delete') {
      this.reasonValue = '';
      this.retext = true;
      this.enabled = this.selectedObj.isEnabled;
      this.reasonActivate = this.selectedObj.reasonUnblock;
      this.reasonInactivate = this.selectedObj.reasonBlock;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath;
      this.imgSrc = this.apiEndPoint + '/' + this.selectedObj.enterpriseResourcesImageFilePath;
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_ENTERPRISE_RESOURCE';
    }
    this.childModal.show();
  }

   /**---- To call the selected popup's---- */
  public viewChildModal(updateaction, enterpriseresource) {
    this.selectedObj = enterpriseresource;
    this.actionName = updateaction;
    if (this.actionName !== 'Create') {
      this.selectedObj.address.geoCoordinates[0] = this.selectedObj.address.geoCoordinates[0].replace('%2B', '+');
      this.selectedObj.address.geoCoordinates[1] = this.selectedObj.address.geoCoordinates[1].replace('%2B', '+');
    }

    if (this.actionName !== 'Create') {
      this.enterpriseresourceimagename = this.selectedObj.enterpriseResourcesImageFileName;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath
        + '/' + this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      if (this.enterpriseresourceimagename === null) {
        this.enterpriseResourceIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
        this.imgSrc = this.apiEndPoint + '/' + this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath
          + '/' + this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
        this.imagename = this.enterpriseResourceIcon.split('.');
        if (this.imagename[0].length > 20) {
          const imgname = this.imagename.toString();
          this.enterpriseResourceIcon = imgname.substring(0, 20) + '...' + this.imagename[1];
        }
      } else {
        this.enterpriseResourceIcon = this.enterpriseresourceimagename;
        this.imgSrc = this.apiEndPoint + '/' + this.selectedObj.enterpriseResourcesImageFilePath
          + '/' + this.selectedObj.enterpriseResourcesImageFileName;
        this.enterpriseResourceIcon = this.selectedObj.enterpriseResourcesImageFileName;
        this.imagename = this.enterpriseResourceIcon.split('.');
        if (this.imagename[0].length > 20) {
          const imgname = this.imagename.toString();
          this.enterpriseResourceIcon = imgname.substring(0, 20) + '...' + this.imagename[1];
        }
      }
    }

    if (this.actionName === 'Create') {
      this.mobile = '';
      this.worknumber = '';
      this.getGenderList();
      this.getResourceTypeList();
      this.getCountriesList();
      this.getStatesList(this.selectCountry);
      this.getEnterprisesList();
      this.getStatusList();
      this.getCountryCodes();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_ENTERPRISE_RESOURCE';
      const createenterpriseresourceimg = <HTMLInputElement>document.getElementById('createenterpriseresourceimg');
      if (createenterpriseresourceimg !== null) {
        this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
        createenterpriseresourceimg.innerHTML = this.emptyimg.value;
      }

    } else if (this.actionName === 'Edit') {
      this.reasonActivate = this.selectedObj.reasonUnblock;
      this.reasonInactivate = this.selectedObj.reasonBlock;
      this.updateResource(this.selectedObj);
      this.getGenderList();
      this.getDepartmentsList();
      this.getResourceTypeList();
      this.getCountriesList();
      this.getCountryCodes();
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_ENTERPRISE_RESOURCE';
      this.resourceemail = this.selectedObj.contactDetails.email;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      const editenterpriseresourceimg = <HTMLInputElement>document.getElementById('editenterpriseresourceimg');
      if (editenterpriseresourceimg !== null) {
        editenterpriseresourceimg.innerHTML = '';
      }

    } else if (this.actionName === 'View') {
      this.retext = true;
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_ENTERPRISE_RESOURCE';
      this.mobilenumbercntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      if (this.mobilenumbercntrycode !== undefined && this.mobilenumbercntrycode !== null && this.mobilenumbercntrycode !== '') {
        this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
      }
      this.mobilecode = this.mobilenumbercntrycodesplit[0];
      this.worknumbercntrycode = this.selectedObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.selectedObj.contactDetails.workNumberExtn;
      this.mobilenumcuntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      this.mobile = this.mobilenumcuntrycode + '-' + this.selectedObj.contactDetails.mobileNumber;
      if (this.selectedObj.contactDetails.workNumber) {
        this.worknumber = this.selectedObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.selectedObj.contactDetails.workNumber;
        } if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.selectedObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
      this.reasonActivate = this.selectedObj.reasonUnblock;
      this.reasonInactivate = this.selectedObj.reasonBlock;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (this.actionName === 'Delete') {
      this.retext = true;
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_ENTERPRISE_RESOURCE';
      this.mobilenumbercntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      if (this.mobilenumbercntrycode !== undefined && this.mobilenumbercntrycode !== null && this.mobilenumbercntrycode !== '') {
        this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
      }
      this.mobilecode = this.mobilenumbercntrycodesplit[0];
      this.worknumbercntrycode = this.selectedObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.selectedObj.contactDetails.workNumberExtn;
      this.mobilenumcuntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      this.mobile = this.mobilenumcuntrycode + '-' + this.selectedObj.contactDetails.mobileNumber;
      if (this.selectedObj.contactDetails.workNumber) {
        this.worknumber = this.selectedObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.selectedObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.selectedObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
      this.reasonActivate = this.selectedObj.reasonUnblock;
      this.reasonInactivate = this.selectedObj.reasonBlock;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (this.actionName === 'Block') {
      this.reasonValue = '';
      this.retext = false;
      this.getactivateReasons();
      this.oldreasonActive = this.selectedObj.reasonUnblock;
      this.oldreasonValue = this.selectedObj.activateReason;
      this.pagename = 'COMMON_PAGE_TITLES.BLOCK_ENTERPRISE_RESOURCE';
      this.mobilenumbercntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      if (this.mobilenumbercntrycode !== undefined && this.mobilenumbercntrycode !== null && this.mobilenumbercntrycode !== '') {
        this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
      }
      this.mobilecode = this.mobilenumbercntrycodesplit[0];
      this.worknumbercntrycode = this.selectedObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.selectedObj.contactDetails.workNumberExtn;
      this.mobilenumcuntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      this.mobile = this.mobilenumcuntrycode + '-' + this.selectedObj.contactDetails.mobileNumber;
      if (this.selectedObj.contactDetails.workNumber) {
        this.worknumber = this.selectedObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.selectedObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.selectedObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (this.actionName === 'Unblock') {
      this.reasonValue = '';
      this.retext = false;
      this.getinactivateReasons();
      this.oldreasonInactive = this.selectedObj.reasonBlock;
      this.oldreasonValue = this.selectedObj.inactivateReason;
      this.pagename = 'COMMON_PAGE_TITLES.UNBLOCK_ENTERPRISE_RESOURCE';
      this.mobilenumbercntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      if (this.mobilenumbercntrycode !== undefined && this.mobilenumbercntrycode !== null && this.mobilenumbercntrycode !== '') {
        this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
      }
      this.mobilecode = this.mobilenumbercntrycodesplit[0];
      this.worknumbercntrycode = this.selectedObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.selectedObj.contactDetails.workNumberExtn;
      this.mobilenumcuntrycode = this.selectedObj.contactDetails.mobileNumberCountrycode;
      this.mobile = this.mobilenumcuntrycode + '-' + this.selectedObj.contactDetails.mobileNumber;
      if (this.selectedObj.contactDetails.workNumber) {
        this.worknumber = this.selectedObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.selectedObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.selectedObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    }
    this.childModal.show();
  }
  /*--- Block Unblock Resource ---*/

  /*---- To get the selectd user information popup ----- */
  selectedUser(action, selectedUserObj: any) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      selectedUserObj.reason = this.reasonValue;
      if (action === 'Block' || action === 'Unblock') {
        this.reason = '';
        if (action === 'Block') {
          this.singleuserservices.updateResourceRecord(this.token, selectedUserObj, 'block')
            .subscribe(data => {
              if (data.statusCode === '1001') {
                selectedUserObj.isEnabled = 'Blocked';
                if (localStorage.getItem('enterpriseAdvanced') === 'enterpriseAdvanced') {
                  localStorage.setItem('advancedEdit', 'advancedEdit');
                  localStorage.removeItem('enterpriseAdvanced');
                  this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_BLOCK_SUCCESS');
                  this.toastr.success(this.toastermessage.value);
                  this.childModal.hide();
                  this.imgfile = '';
                } else {
                  window.localStorage.setItem('resourceUpdate', 'Updated');
                  localStorage.setItem('generalEdit', 'generalEdit');
                  localStorage.removeItem('enterpriseGeneral');
                  this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_BLOCK_SUCCESS');
                  this.toastr.success(this.toastermessage.value);
                  this.childModal.hide();
                  this.imgfile = '';
                }
              } else {
                this.toastr.error(data.message);
              }
            }, error => {
              const status = JSON.parse(error['status']);
              const statuscode = JSON.parse(error['_body']).statusCode;
              switch (status) {
                case 500:
                  break;
                case 400:
                  if (statuscode === '2014') {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_DELETE_DEPENDENCY';
                  } else if (statuscode === '2016') {
                    this.error = 'COMMON_STATUS_CODES.' + statuscode;
                  }
                  break;
              }
            });

        } else if (action === 'Unblock') {
          this.singleuserservices.updateResourceRecord(this.token, selectedUserObj, 'unblock')
            .subscribe(data => {
              if (data.statusCode === '1001') {
                selectedUserObj.isEnabled = 'Active';
                if (localStorage.getItem('enterpriseAdvanced') === 'enterpriseAdvanced') {
                  localStorage.setItem('advancedEdit', 'advancedEdit');
                  localStorage.removeItem('enterpriseAdvanced');
                  this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_UNBLOCK_SUCCESS');
                  this.toastr.success(this.toastermessage.value);
                  this.childModal.hide();
                  this.imgfile = '';
                } else {
                  window.localStorage.setItem('resourceUpdate', 'Updated');
                  localStorage.setItem('generalEdit', 'generalEdit');
                  localStorage.removeItem('enterpriseGeneral');
                  this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_UNBLOCK_SUCCESS');
                  this.toastr.success(this.toastermessage.value);
                  this.childModal.hide();
                  this.imgfile = '';
                }
              } else {
                this.toastr.error(data.message);
              }
            }, error => {
              this.toastr.error(error);
            });
        }
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*---- To get Moblie Country Code values in Add ----*/
  getMobileCountryCode(countryCode) {
    this.mobileCountryCode = countryCode;
  }

  /*---- To get Moblie Country Code values in Edit ----*/
  getMobileCountryCodeEdit(countryCode) {
    this.mobileCountryCodeEdit = countryCode;
  }

  /*---- To get Work Country Code values in Add ----*/
  getCountryCode(countryCode) {
    this.countryCode = countryCode;
  }

  /*---- To get Work Country Code values in Edit ----*/
  getCountryCodeEdit(countryCode) {
    this.countryCodeEdit = countryCode;
  }

  /* To change the reason list */
  getreason(reason) {
    this.reasonValue = reason;
  }

  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.actionName === 'View') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.actionName === 'Delete') {
      if (key === 13) {
        this.deleteUser();
      }
    }
  }

  /**----- To get the gender name from the gender dropdown list ----- */
  getgender(value) {
    if (value !== '') {
      this.selectedGender = value;
    } else {
      this.selectedGender = '';
    }
  }

  /**---  To get the resources type from the resourcetype list --- */
  getresourcetype(value) {
    if (value !== '') {
      this.selectResourceType = value;
    } else {
      this.selectResourceType = '';
    }
  }

  /** ---To get the selected department from the dropdown list ---- */
  getselectDepartment(value) {
    if (value !== '') {
      this.selectDepartment = value;
    } else {
      this.selectDepartment = '';
    }
  }

  /** --- To get the country from countries list on change ----- */
  getselectCountry(value) {
    if (value !== '') {
      this.selectCountry = value;
      this.state = '';
      this.states = [];
      this.star = true;
      this.getStatesList(this.selectCountry);
    } else {
      this.states = [];
      this.state = '';
      this.star = true;
    }
  }

  /** ---To get state oon change of states list ----- */
  getselectState(value) {
    if (value !== '') {
      this.state = value;
    } else {
      this.state = '';
    }
  }

  /**--- To get user status on change---- */
  getUserStatus(status) {
    this.enabled = status;
  }

  /**---- To get enterprise name on change ----- */
  getEnterpriseName(value) {
    if (value !== '') {
      this.enterprisesName = value.split('~');
      this.enterpriseid = this.enterprisesName[0];
      this.enterprisename = this.enterprisesName[1];
      this.enterpriseIconFilePath = this.enterprisesName[2] + '/' + this.enterprisesName[11];
      this.selectCountry = this.enterprisesName[3];
      this.imgSrc = this.apiEndPoint + '/' + this.enterprisesName[2] + '/' + this.enterprisesName[11];
      this.enterpriseResourcesImageFileName = this.enterprisesName[11];
      this.state = this.enterprisesName[4];
      this.addressLine1 = this.enterprisesName[5];
      this.addressLine2 = this.enterprisesName[6];
      this.city = this.enterprisesName[7];
      this.zip = this.enterprisesName[8];
      this.longitude = this.enterprisesName[10];
      this.latitude = this.enterprisesName[9];
      this.countryCode = this.enterprisesName[12];
      this.worknumber = this.enterprisesName[13];
      this.ext = this.enterprisesName[14];
      if (this.ext === null || this.ext === 'null') {
        this.ext = '';
      }
      this.email = this.enterprisesName[15];
      this.getStatesList(this.selectCountry);
      this.getDepartmentsList();
    } else {
      this.getStatesList(this.selectCountry);
      this.state = '';
      this.addressLine1 = '';
      this.addressLine2 = '';
      this.city = '';
      this.zip = '';
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.enterprisename = '';
      this.longitude = '';
      this.latitude = '';
      this.imgSrc = '';
      this.selectCountry = this.selectDefaultCountry;
      this.getStatesList(this.selectCountry);
      this.getDepartmentsList();
    }
  }

  /*-- Used to create Enterprise Resource record --*/
  public createResource() {
    if (this.longitude !== '' && this.longitude !== undefined) {
      this.value = this.longitude.split('.');
    }
    if (this.latitude !== '' && this.latitude !== undefined) {
      this.value1 = this.latitude.split('.');
    }
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.enterprisename === '' || this.enterprisename === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.selectResourceType === '' || this.selectResourceType === undefined) {
      this.error = 'ENTERPRISE_RESOURCES.VALID_NOBLANK_RESOURCE_TYPE';
    } else if (this.firstname.trim().replace(/\s\s+/g, ' ') === '' || this.firstname.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FIRST_NAME';
    } else if (this.lastname.trim().replace(/\s\s+/g, ' ') === '' || this.lastname.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LAST_NAME';
    } else if (this.designation.trim().replace(/\s\s+/g, ' ') === '' || this.designation.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'ENTERPRISE_RESOURCES.VALID_NOBLANK_DESIGNATION';
    } else if (this.selectDepartment === '' || this.selectDepartment === undefined) {
      this.error = 'ENTERPRISE_RESOURCES.VALID_NOBLANK_DEPARTMENT';
    } else if (this.imgfile !== '' && this.imgfile.type === '') {
      this.error = ' COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgfile.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgStatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else if (this.selectedGender === '' || this.selectedGender === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_GENDER';
    } else if (this.mobileCountryCode === '' || this.mobileCountryCode === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE_COUNTRY_CODE';
    } else if ((this.mobile === '' || this.mobile === undefined) &&
      (this.mobileCountryCode !== '' && this.mobileCountryCode !== undefined)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE#';
    } else if (this.mobile.length < 12) {
      this.error = 'LOGIN.MOBILENO_INVALID';
    } else if (this.supemail !== '' && !EMAIL_REGEXP.test(this.supemail)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if ((this.countryCode !== '' && this.countryCode !== undefined) && (this.worknumber === '' || this.worknumber === undefined)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.email === '' || this.email === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (this.email !== '' && !EMAIL_REGEXP.test(this.email)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.addressLine1.trim().replace(/\s\s+/g, ' ') === '' || this.addressLine1.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.city.trim().replace(/\s\s+/g, ' ') === '' || this.city.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.selectCountry === '' || this.selectCountry === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
    } else if (this.state === '' || this.state === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.zip.trim().replace(/\s\s+/g, ' ') === '' || this.zip.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.latitude === undefined || this.latitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LATITUDE';
    } else if (!this.latitude.match(this.LONG_LAT_PAT) || this.value1[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (!this.latitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (this.longitude === undefined || this.longitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LONGITUDE';
    } else if (!this.longitude.match(this.LONG_LAT_PAT) || this.value[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (!this.longitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else {
      let supemail = '';
      let comments = '';
      let ssn = '';
      let worknumber = '';
      let ext = '';
      let addressLine2 = '';
      if (this.comments === '' || this.comments === undefined) {
        this.comments = null;
        comments = this.comments;
        this.comments = '';
      } else {
        comments = this.comments.trim().replace(/\s\s+/g, ' ');
      }
      if (this.ssn === '' || this.ssn === undefined) {
        ssn = null;
      } else {
        ssn = this.ssn.trim().replace(/\s\s+/g, ' ');
      }
      if (this.worknumber === '' || this.worknumber === undefined) {
        worknumber = null;
      } else {
        worknumber = this.worknumber.trim().replace(/\s\s+/g, ' ');
      }
      if (this.ext === '' || this.ext === null || this.ext === undefined) {
        ext = null;
      } else {
        ext = this.ext.trim().replace(/\s\s+/g, ' ');
      }
      if (this.supemail === '' || this.supemail === undefined) {
        this.supemail = null;
        supemail = this.supemail;
        this.supemail = '';
      } else {
        supemail = this.supemail.trim().replace(/\s\s+/g, ' ');
      }
      if (this.addressLine2 === '' || this.addressLine2 === undefined) {
        addressLine2 = null;
      } else {
        addressLine2 = this.addressLine2.trim().replace(/\s\s+/g, ' ');
      }
      this.addLong = this.longitude.trim().replace(/\s\s+/g, ' ');
      // this.addLong = this.addLong.replace('+', '%2B');
      this.addLat = this.latitude.trim().replace(/\s\s+/g, ' ');
      // this.addLat = this.addLat.replace('+', '%2B');

      if (this.record_id === '') {
        this.resourceObj = {
          'enterpriseResourcesImageFilePath': this.enterpriseIconFilePath,
          'firstName': this.autocase(this.firstname.trim().replace(/\s\s+/g, ' ')),
          'lastName': this.autocase(this.lastname.trim().replace(/\s\s+/g, ' ')), 'resourceType': this.selectResourceType,
          'department': this.selectDepartment,
          'designation': this.autocase(this.designation.trim().replace(/\s\s+/g, ' ')), 'gender': this.selectedGender,
          'SSN': ssn, 'supervisorEmail': supemail, 'notes': comments, 'isEnabled': this.enabled,
          'contactDetails': {
            'workNumberCountrycode': this.countryCode,
            'workNumber': worknumber, 'workNumberExtn': ext,
            'mobileNumberCountrycode': this.mobileCountryCode,
            'mobileNumber': this.mobile.trim().replace(/\s\s+/g, ' '), 'email': this.email.trim().replace(/\s\s+/g, ' ')
          },
          'address': {
            'addressLine1': this.autocase(this.addressLine1.trim().replace(/\s\s+/g, ' ')),
            'addressLine2': this.autocase(addressLine2), 'city': this.autocase(this.city.trim().replace(/\s\s+/g, ' ')),
            'state': this.state, 'country': this.selectCountry, 'ZIP': this.zip.trim().replace(/\s\s+/g, ' '),
            'geoCoordinates': [this.latitude, this.longitude]
          }, 'enterprise': {
            'enterpriseId': parseInt(this.enterpriseid, 10),
            'enterpriseName': this.enterprisename.trim().replace(/\s\s+/g, ' ')
          }
        };
        /*-- Calling Insertion Service*/
        this.singleuserservices.createResource(this.token, this.resourceObj, this.imgfile).subscribe(
          data => {
            if (data['statusCode'] === '1001') {
              window.localStorage.setItem('resourceAdd', 'Added');
              this.childModal.hide();
              this.hideUserModal();
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
    }
  }

  /** ------To create the enterprise resources data --- */
  public updatResource() {
    this.value = this.longitude.split('.');
    this.value1 = this.latitude.split('.');
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.enterprisename === '' || this.enterprisename === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.selectResourceType === '' || this.selectResourceType === undefined) {
      this.error = 'ENTERPRISE_RESOURCES.VALID_NOBLANK_RESOURCE_TYPE';
    } else if (this.firstname.trim().replace(/\s\s+/g, ' ') === '' || this.firstname.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FIRST_NAME';
    } else if (this.lastname.trim().replace(/\s\s+/g, ' ') === '' || this.lastname.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LAST_NAME';
    } else if (this.designation.trim().replace(/\s\s+/g, ' ') === '' || this.designation.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'ENTERPRISE_RESOURCES.VALID_NOBLANK_DESIGNATION';
    } else if (this.selectDepartment === '' || this.selectDepartment === undefined) {
      this.error = 'ENTERPRISE_RESOURCES.VALID_NOBLANK_DEPARTMENT';
    } else if (this.imgfile !== '' && this.imgfile.type === '') {
      this.error = ' COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgfile.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.imgfile !== '' && this.imgStatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else if (this.selectedGender === '' || this.selectedGender === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_GENDER';
    } else if (this.supemail !== '' && !EMAIL_REGEXP.test(this.supemail)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.mobileCountryCodeEdit === '' || this.mobileCountryCodeEdit === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE_COUNTRY_CODE';
    } else if ((this.mobile === '' || this.mobile === undefined) &&
      (this.mobileCountryCodeEdit !== '' && this.mobileCountryCodeEdit !== undefined)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE#';
    } else if (this.mobile.length < 12) {
      this.error = 'LOGIN.MOBILENO_INVALID';
    } else if ((this.countryCodeEdit !== '' && this.countryCodeEdit !== undefined) &&
      (this.worknumber === '' || this.worknumber === undefined)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.resourceemail === '' || this.resourceemail === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (this.resourceemail !== '' && !EMAIL_REGEXP.test(this.resourceemail)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.addressLine1.trim() === '' || this.addressLine1.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.city.trim() === '' || this.city.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.selectCountry === '' || this.selectCountry === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
    } else if (this.state === '' || this.state === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.zip.trim() === '' || this.zip.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.latitude === undefined || this.latitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LATITUDE';
    } else if (!this.latitude.match(this.LONG_LAT_PAT) || this.value1[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (!this.latitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (this.longitude === undefined || this.longitude.trim() === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LONGITUDE';
    } else if (!this.longitude.match(this.LONG_LAT_PAT) || this.value[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (!this.longitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (this.error === '') {
      let supemail = '';
      let comments = '';
      let ssn = '';
      let worknumber = '';
      let ext = '';
      let addressLine2 = '';
      if (this.comments === '' || this.comments === undefined) {
        this.comments = null;
        comments = this.comments;
        this.comments = '';
      } else {
        comments = this.comments.trim().replace(/\s\s+/g, ' ');
      }
      if (this.ssn === '' || this.ssn === undefined) {
        ssn = null;
      } else {
        ssn = this.ssn.trim().replace(/\s\s+/g, ' ');
      }
      if (this.worknumber === '' || this.worknumber === undefined) {
        worknumber = null;
      } else {
        worknumber = this.worknumber.trim().replace(/\s\s+/g, ' ');
      }
      if (this.ext === undefined || this.ext === '' || this.ext === null) {
        ext = null;
      } else {
        ext = this.ext.trim().replace(/\s\s+/g, ' ');
      }
      if (this.supemail === '' || this.supemail === undefined) {
        this.supemail = null;
        supemail = this.supemail;
        this.supemail = '';
      } else {
        supemail = this.supemail.trim().replace(/\s\s+/g, ' ');
      }
      if (this.addressLine2 === '' || this.addressLine2 === undefined) {
        addressLine2 = null;
      } else {
        addressLine2 = this.addressLine2.trim().replace(/\s\s+/g, ' ');
      }
      this.editLong = this.longitude.trim().replace(/\s\s+/g, ' ');
      this.editLat = this.latitude.trim().replace(/\s\s+/g, ' ');
      if (this.record_id !== '' || this.record_id !== undefined) {
        this.resourceObj = {
          '_id': this.record_id,
          'enterpriseResourcesImageFilePath': this.selectedObj.enterpriseResourcesImageFilePath,
          'enterpriseResourcesImageFileName': this.enterpriseresourceimagename,
          'firstName': this.autocase(this.firstname.trim().replace(/\s\s+/g, ' ')),
          'lastName': this.autocase(this.lastname.trim().replace(/\s\s+/g, ' ')), 'resourceType': this.selectResourceType,
          'department': this.selectDepartment,
          'designation': this.autocase(this.designation.trim().replace(/\s\s+/g, ' ')), 'gender': this.selectedGender,
          'SSN': ssn, 'supervisorEmail': supemail, 'notes': comments, 'isEnabled': this.enabled,
          'contactDetails': {
            'workNumberCountrycode': this.countryCodeEdit,
            'workNumber': worknumber, 'workNumberExtn': ext,
            'mobileNumberCountrycode': this.mobileCountryCodeEdit,
            'mobileNumber': this.mobile.trim().replace(/\s\s+/g, ' '), 'email': this.resourceemail.trim().replace(/\s\s+/g, ' ')
          },
          'address': {
            'addressLine1': this.autocase(this.addressLine1.trim().replace(/\s\s+/g, ' ')),
            'addressLine2': this.autocase(addressLine2),
            'city': this.autocase(this.city.trim().replace(/\s\s+/g, ' ')),
            'state': this.state, 'country': this.selectCountry, 'ZIP': this.zip.trim().replace(/\s\s+/g, ' '),
            'geoCoordinates': [this.editLat, this.editLong]
          }
        };
        /*-- Calling Update Service*/
        this.singleuserservices.updateResource(this.token, this.resourceObj, this.imgfile).subscribe(
          data => {
            if (data['statusCode'] === '1001') {
              if (localStorage.getItem('enterpriseAdvanced') === 'enterpriseAdvanced') {
                localStorage.setItem('advancedEdit', 'advancedEdit');
                this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
                this.toastr.success(this.toastermessage.value);
                this.childModal.hide();
                this.imgfile = '';
              } else {
                window.localStorage.setItem('resourceUpdate', 'Updated');
                localStorage.setItem('generalEdit', 'generalEdit');
                this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
                this.toastr.success(this.toastermessage.value);
                this.childModal.hide();
                this.imgfile = '';
              }
            }
            localStorage.removeItem('enterpriseGeneral');
            localStorage.removeItem('enterpriseAdvanced');
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
    }
  }

  /** ------To update the enterprise resources ------ */
  updateResource(selectedObject: any) {
    this.getStatesList(selectedObject.address.country);
    this.record_id = selectedObject._id;
    this.firstname = selectedObject.firstName;
    this.lastname = selectedObject.lastName;
    this.selectResourceType = selectedObject.resourceType;
    this.selectDepartment = selectedObject.department;
    this.designation = selectedObject.designation;
    this.selectedGender = selectedObject.gender;
    if (selectedObject.SSN === null || selectedObject.SSN === 'null') {
      this.ssn = '';
    } else {
      this.ssn = selectedObject.SSN;
    }
    if (selectedObject.supervisorEmail === null || selectedObject.supervisorEmail === 'null') {
      this.supemail = '';
    } else {
      this.supemail = selectedObject.supervisorEmail;
    }
    if (selectedObject.notes === null) {
      this.comments = '';
    } else {
      this.comments = selectedObject.notes;
    }
    this.enabled = selectedObject.isEnabled;
    if (selectedObject.contactDetails.workNumber === null) {
      this.worknumber = '';
    } else {
      this.worknumber = selectedObject.contactDetails.workNumber;
    }
    if (selectedObject.contactDetails.workNumberExtn === null) {
      this.ext = '';
    } else {
      this.ext = selectedObject.contactDetails.workNumberExtn;
    }
    this.countryCodeEdit = selectedObject.contactDetails.workNumberCountrycode;
    this.mobileCountryCodeEdit = selectedObject.contactDetails.mobileNumberCountrycode;
    this.mobile = selectedObject.contactDetails.mobileNumber;
    this.resourceemail = selectedObject.contactDetails.email;
    this.addressLine1 = selectedObject.address.addressLine1;
    if (selectedObject.address.addressLine2 === null) {
      this.addressLine2 = '';
    } else {
      this.addressLine2 = selectedObject.address.addressLine2;
    }
    this.city = selectedObject.address.city;
    this.selectCountry = selectedObject.address.country;
    this.state = selectedObject.address.state;
    this.enterprisename = selectedObject.enterprise.enterpriseName;
    this.enterpriseid = selectedObject.enterprise.enterpriseId;
    this.zip = selectedObject.address.ZIP;
    this.longitude = selectedObject.address.geoCoordinates[1];
    this.latitude = selectedObject.address.geoCoordinates[0];
  }

  /*-- Used to Delete the Enterprise Resource --*/
  deleteUser() {
    this.singleuserservices.deleteResource(this.token, this.selectedObj._id).subscribe(
      data => {
        if (localStorage.getItem('enterpriseAdvanced') === 'enterpriseAdvanced') {
          localStorage.setItem('advancedDelete', 'advancedDelete');
          localStorage.removeItem('enterpriseAdvanced');
          window.localStorage.setItem('resourceDelete', 'Deleted');
          this.childModal.hide();
        } else {
          localStorage.setItem('generalDelete', 'generalDelete');
          localStorage.removeItem('enterpriseGeneral');
          window.localStorage.setItem('resourceDelete', 'Deleted');
          this.childModal.hide();
        }
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
            } else if (statuscode === '2013') {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_DELETE_DEPENDENCY';
            } break;
        }
      }
    );
  }

  /* ---- To get activate reasons list   ---*/
  public getactivateReasons() {
    this.singleuserservices.getLookupsByEnterprise(this.token, 'ENT_RESOURCE_BLOCK_REASONS', this.selectedObj.enterprise.enterpriseId._id).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.reasons = data['result'];
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

  /*---- To get inactivate reasons list   ---*/
  public getinactivateReasons() {
    this.singleuserservices.getLookupsByEnterprise(this.token, 'ENT_RESOURCE_UNBLOCK_REASONS', this.selectedObj.enterprise.enterpriseId._id).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.unblockreasons = data['result'];
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

  /*---- To get status list   ---*/
  public getStatusList() {
    this.singleuserservices.getLookupsList(this.token, 'ENTERPRISE_RESOURCE_STATUSES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.status = data['result'];
          this.enabled = data['result'][0].lookupName;
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

  /*-- Mobile number --*/
  hyphen_generate_mobile(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('mobile_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('mobile_id')).value = value.concat('-');
    }
  }

  /**----- To generate the hyphen between the number --- */
  hyphen_generate_worknum(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('worknumber_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('worknumber_id')).value = value.concat('-');
    }
  }

  /**----- To generate the hyphen between the number --- */
  hyphen_generateEdit(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('enterprise_edit_mobile_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('enterprise_edit_mobile_id')).value = value.concat('-');
    }
  }

  /*---- To upload the image ----*/
  imageUploaded(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.imgfile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.imgfile.size;
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgfile));
    setTimeout(() => {
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.imgfile));
    }, 500);
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    const size = (Math.round(fSize * 100) / 100);
    const bytes = fSExt[i];

    const pictype = this.imgfile.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/jpg', '/jpeg', '/gif', '/bmp', '/png'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      const index = myObj['imageTypes'][j].indexOf(extension);
      if (index > -1) {
        this.imageTypeError = false;
        this.error = '';
        if (this.imageMinSize > size || bytes !== 'KB') {
          this.imgStatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else if (size > this.imageMaxSize || bytes !== 'KB') {
          this.imgStatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else {
          this.imgStatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }

    if (this.actionName === 'Create') {
      const createenterpriseresourceimg = <HTMLInputElement>document.getElementById('createenterpriseresourceimg');
      let img = this.imgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.imgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.imgfile.name.split('.')[1];
        }
      }
      createenterpriseresourceimg.innerHTML = img;

    } else if (this.actionName === 'Edit') {
      const editenterpriseresourceimg = <HTMLInputElement>document.getElementById('editenterpriseresourceimg');
      let img = this.imgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.imgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.imgfile.name.split('.')[1];
        }
      }
      editenterpriseresourceimg.innerHTML = img;
    }
  }

  /**----- To captilize the each word ----- */
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /**---- To clear the error message---- */
  clearmessage() {
    this.error = '';
  }

  /*--- To Get Country Code list ---*/
  public getCountryCodes() {
    this.singleuserservices.getLookupsList(this.token, 'COUNTRY_CODES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.countryCodes = data['result'];
          this.mobileCountryCode = data['result'][0].lookupName;
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

  /** ---To empty the data in the variables ----- */
  public hideUserModal() {
    this.imgSrc = '';
    this.imgfile = '';
    this.file = '';
    this.enterpriseresourceimagename = '';
    this.enterpriseIconFilePath = '';
    this.firstname = '';
    this.enterprisename = '';
    this.selectResourceType = '';
    this.selectDepartment = '';
    this.lastname = '';
    this.designation = '';
    this.supemail = '';
    this.mobile = '';
    this.selectedGender = '';
    this.ssn = '';
    this.comments = '';
    this.worknumber = '';
    this.ext = '';
    this.email = '';
    this.addressLine1 = '';
    this.addressLine2 = '';
    this.state = '';
    this.city = '';
    this.zip = '';
    this.countryCode = '';
    this.mobileCountryCode = '';
    this.latitude = '';
    this.longitude = '';
    this.error = '';
    this.countries = [];
    this.selectCountry = this.defaultCountry;
    this.states = [];
    this.state = '';
    this.childModal.hide();
  }
}

export class Address {
  public addressline1: any;
  public addressline2: any;
  public state: string;
  public city: string;
  public country: string;
  public zip: string;
  public longitude: string;
  public latitude: string;
}
