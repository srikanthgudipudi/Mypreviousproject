/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* Following methods are available to Perform Openrations on Enterprise Resources.
* ngOnInit(): This is the default method called when page is loading.
* ngAfterViewInit() : This method is called after a component's view has been fully initialized.
* showmessage(userAccount, userId, enterpriseName, enterpriseId): To navigate and open create message popup.
* getallResources(): Used to get list of all Enterprise resources.
* ngAfterContentChecked(): To retrive user details after submission of changes.
* singleenterpriselocate(locate, singleenterpriseuser): To get single enterprise locate  coordinates.
* enterpriselocate(locate): To get enterprise locate details.
* getrecorddetails(): To get the single notification record details.
* handleKeyPress(e): This method is used to call when enter key is pressed.
* singleEnterprises(updateaction, enterprisesresource): To Open Enterprise Resources Create Popup
* viewResource(updateaction, enterprisesresource): To Open Enterprise Resource Delete, Update, View Popups
* getAllResourcesSearch(searchstring): To get Search result.
* openAdvanceModal(): This method is used to call all popup's.
* selectedUser(action, selectedUserObj: any): To get the selectd user information popup.
* getCountriesList(): To get countries list.
* hideAdvanceModal(): To hide the popup modal.
* getUserStatus(status): This method is used to get the userstatus.
* AdvanceSearch(): This method is used to get advance search details.
* getStatusList(): This method is used to get status list.
* clear(): To clear all the input field's data.
* exportData(searchstring): This method is used to download the data.
* autocase(text): To auto capitilize the each word.
* csvUploaded(resources): This method is used to upload the files.
* importEnterpriseResourcesList(): To download the enterprise resourcelist.
* hideImportModal(): To hide the import model.
* singleUser(userid, username, firstname, lastName, email, mobile, country, userStatus, cancelType): To edit single user details.
*/
import {
  Component, OnInit, AfterContentChecked,
  ViewContainerRef, ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { FleetsService } from '../../fleets/fleetslist/fleets.service';
import { EnterpriseResourceService } from './enterpriseresources.service';
import { EnterpriseResourceComponent } from '../enterpriseresourcepopup/enterpriseresource.component';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationsService } from '../../../notifications/notifications.service';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { AfterViewInit } from '@angular/core';
import * as moment from 'moment/moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: 'enterpriseresources.html',
  providers: [EnterpriseResourceService, ConfirmationService, NotificationsService, FleetsService]
})

export class EnterprisesResourcesComponent implements OnInit, AfterContentChecked, AfterViewInit {
  @ViewChild('mgModal') public childModal: ModalDirective;
  userToken = window.localStorage.getItem('token');
  storage: Storage = window.localStorage;
  toastermessage: any;
  @ViewChild(EnterpriseResourceComponent)
  private enterprisesModalComponent: EnterpriseResourceComponent;
  allResources: any;
  stacked: any;
  city: any = '';
  enabled: any = '';
  state: any = '';
  rowsPerPage = 10;
  country: any = '';
  mobileNum: any = '';
  email: any = '';
  ext: any;
  searchstring: any;
  viewstatus: any;
  addstatus: any;
  deletestatus: any;
  importstatus: any;
  exportstatus: any;
  liststatus: any;
  editstatus: any;
  pagename: any;
  recordid: any;
  blockstatus: any;
  unblockstatus: any;
  locatestatus: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  mobilenumbercntrycodesplit: any[];
  mobilenumbercntrycode: any;
  // advance search
  status: any;
  enterpriseName: any;
  firstName: any;
  lastName: any;
  emailValue: any;
  mobileNumber: any;
  statusValue: any = '';
  userName: any;
  entResourceObj: any;
  enterpriseIconFilePath: any;
  error: any;
  enterpriseNames: any;
  countries: any = [];
  designation: any;
  department: any;
  userrole: any;
  searchententerpriseresource: any;
  csvFile: any = '';
  csvSrc: any = '';
  size: any;
  bytes: any;
  fileTypeError: any = false;
  mapSettings: any;
  userRole = window.localStorage.getItem('userrole');
  userAccount = window.localStorage.getItem('user_Account');
  @ViewChild('resourceImportModal') public resourceImportModal: ModalDirective;
  @ViewChildren('input') vc;
  blockmessage = this.translateService.get('ENTERPRISE_RESOURCES.RESOURCE_INACTIVATE_MESSAGE');
  constructor(public resourceService: EnterpriseResourceService, private router: Router,
    public toastr: ToastsManager, private translateService: TranslateService,
    private notificationService: NotificationsService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    public fleetsService: FleetsService,
    private confirmationService: ConfirmationService, private vcr: ViewContainerRef,
    private sanitizer: DomSanitizer) {
    this.toastr.setRootViewContainerRef(vcr);

  }

  /**----- This method is used to call popup's---- */
  viewResource(updateaction, enterprisesresource) {
    this.enterprisesModalComponent.viewChildModal(updateaction, enterprisesresource);
  }

  /**----- This is the default method called when page is loading----- */
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.viewstatus = window.localStorage.getItem('resourceviewstatus');
    this.addstatus = window.localStorage.getItem('resourceaddstatus');
    this.editstatus = window.localStorage.getItem('resourceeditstatus');
    this.liststatus = window.localStorage.getItem('resourceliststatus');
    this.importstatus = window.localStorage.getItem('resourceimportstatus');
    this.exportstatus = window.localStorage.getItem('resourceexportstatus');
    this.deletestatus = window.localStorage.getItem('resourcedeletestatus');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    this.blockstatus = window.localStorage.getItem('resourceblockstatus');
    this.unblockstatus = window.localStorage.getItem('resourceunblockstatus');
    this.locatestatus = window.localStorage.getItem('resourcelocatetstatus');
    // time zone
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    localStorage.removeItem('searchStringenterprise');
    localStorage.removeItem('lcenterpriseresource');
    localStorage.removeItem('lcenterpriseresourcedata');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else if (this.pagename === 'enterpriseresources') {
      this.getrecorddetails();
      this.getStatusList();
      this.storage.removeItem('notificationpage');
    } else if
    (this.storage.getItem('selectedEresourcescountry') !== undefined && this.storage.getItem('selectedEresourcescountry') !== null) {
      this.country = this.storage.getItem('selectedEresourcescountry');
      this.AdvanceSearch();
      this.storage.removeItem('selectedEresourcescountry');
    } else if (this.storage.getItem('status') !== undefined && this.storage.getItem('status') !== null) {
      if (this.storage.getItem('selecteddashboardenterpriseid') === 'undefined') {
        this.enterpriseName = '';
      } else {
        this.enterpriseName = this.storage.getItem('selecteddashboardenterpriseid');
      }
      this.statusValue = this.storage.getItem('status');
      this.AdvanceSearch();
    } else {
      this.getallResources();
      this.getStatusList();
    }
    if (window.localStorage.getItem('mapmessageuser') === 'mapmessageuser') {
      window.localStorage.removeItem('mapmessageuser');
      this.resourceService.getenterpriseresourceById(this.userToken,
        window.localStorage.getItem('id')).subscribe(
        enterpriseresources => {
          this.showmessage(enterpriseresources['result'].firstName + ' ' + enterpriseresources['result'].lastName,
            enterpriseresources['result'].userAccount,
            enterpriseresources['result']._id, enterpriseresources['result'].enterprise.enterpriseName,
            enterpriseresources['result'].enterprise.enterpriseId);
        }, error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
          }
        });
    }
  }

  /** This method is called after a component's view has been fully initialized. */
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /*---- To check the content ----*/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('resourceDelete') === 'Deleted') {
      window.localStorage.removeItem('resourceDelete');
      this.getallResources();
    }
    if (window.localStorage.getItem('resourceAdd') === 'Added') {
      window.localStorage.removeItem('resourceAdd');
      this.getallResources();
    }
    if (window.localStorage.getItem('resourceUpdate') === 'Updated') {
      window.localStorage.removeItem('resourceUpdate');
      this.getallResources();
    }
    if (window.localStorage.getItem('advancedEdit') === 'advancedEdit') {
      this.AdvanceSearch();
      localStorage.removeItem('advancedEdit');
    }
    if (window.localStorage.getItem('advancedDelete') === 'advancedDelete') {
      this.AdvanceSearch();
      localStorage.removeItem('advancedDelete');
    }
    if (window.localStorage.getItem('generalEdit') === 'generalEdit') {
      this.getAllResourcesSearch(this.searchstring);
    }
    localStorage.removeItem('generalEdit');
    if (window.localStorage.getItem('generalDelete') === 'generalDelete') {
      this.getAllResourcesSearch(this.searchstring);
    }
    localStorage.removeItem('generalDelete');
  }

  /** ---To navigate and open create message popup ----*/
  showmessage(username, userAccount, userId, enterpriseName, enterpriseId) {
    this.router.navigate(['/history/messages']);
    window.localStorage.setItem('messageuser', 'messageuser');
    window.localStorage.setItem('useraccount', username);
    window.localStorage.setItem('tousernameacc', userAccount);
    window.localStorage.setItem('enterprisename', enterpriseName);
    window.localStorage.setItem('enterpriseid', enterpriseId);
    window.localStorage.setItem('userid', userId);
  }

  /*---- To get all Locate  ----*/
  enterpriselocate(locate) {
    this.searchententerpriseresource = localStorage.getItem('searchStringenterprise');
    if (localStorage.getItem('lcenterpriseresource') === 'lcenterpriseresourcedata') { // enterprise resource advance search
      this.resourceService.enterpriselocateadvancesearch(locate, 'lcenterpriseresourcedata');
    } else if (this.searchententerpriseresource === null
      || this.searchententerpriseresource === undefined || this.searchententerpriseresource === '') { // enterprise resource list
      this.resourceService.enterpriselocate(locate, this.userToken, this.searchententerpriseresource);
    } else {
      this.resourceService.enterpriselocatesearch(locate, this.userToken,
        this.searchententerpriseresource); // enterprise resource search
    }
  }

  /**---- To get single enterprise locate  coordinates ----*/
 singleenterpriselocate(locate, singleenterpriseuser) {
    this.fleetsService.getBuildingId(this.userToken, singleenterpriseuser._id, 'enterpriseresources').subscribe(
      builingcode => {
        if (builingcode.result.buildingCode) {
          this.fleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lcenterpriseresourcesinfo', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              localStorage.setItem('eprcurrentfloorname', builingcode.result.currentFloor);
              const currentFloorName = 'eprcurrentfloorname';
              const currententerpriseresid = singleenterpriseuser._id;
              this.resourceService.singleenterpriselocate(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, currententerpriseresid,
                builingcode.result.fleetId, builingcode.result.currentFloorId, fleetInfo.fleetName);
            });
        } else {
          const enterpriseicon = singleenterpriseuser.enterprise.enterpriseId.enterpriseIconFilePath
            + '/' + singleenterpriseuser.enterprise.enterpriseId.enterpriseIcon;
          window.localStorage.setItem('enterpriseicon', enterpriseicon);
          this.resourceService.getenterpriseresourceById(this.userToken, singleenterpriseuser._id).subscribe(
            enterpriseresources => {
              enterpriseresources.result.presentlyLocated = '';
              delete enterpriseresources.result.workNumber;
              delete enterpriseresources.result.mobileNumber;
              localStorage.setItem('lcenterpriseresourcesinfo', JSON.stringify(enterpriseresources['result']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              localStorage.removeItem('eprcurrentfloorname');
              const currentFloorName = '';
              const currententerpriseresid = singleenterpriseuser._id;
              const buildingName = null;
              const currentfloorid = null;
              const currentFleetId = null;
              this.resourceService.singleenterpriselocate(locate, this.userToken, enterpriseresources['result']._id,
                false,
                currentFloorName, currententerpriseresid, currentfloorid, currentFleetId, buildingName);
            }, error => {
              this.enterpriseResourceStatus(error);
            });
        }
      });
  }

  enterpriseResourceStatus(error) {
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
        } break;
      case 500:
        break;
    }
  }
  /**------ To get the single notification record details-------- */
  getrecorddetails() {
    localStorage.removeItem('lcenterpriseresource');
    localStorage.removeItem('lcenterpriseresourcedata');
    this.notificationService.getNotification(this.recordid, this.pagename, this.userToken)
      .subscribe(
      data => {
        for (let i = 0; i < data['result'].length; i++) {
          this.mobilenumbercntrycode = data['result'][i].contactDetails.mobileNumberCountrycode;
          this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
          data['result'][i].mobilecode = this.mobilenumbercntrycodesplit[0] + '-' + data['result'][i].contactDetails.mobileNumber;
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.allResources = data['result'];
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
              this.router.navigate(['']);
            } break;
        }
      });
  }

  /**--- To get all enterprise resources list ------*/
  getallResources() {
    localStorage.removeItem('lcenterpriseresource');
    localStorage.removeItem('lcenterpriseresourcedata');
    localStorage.removeItem('searchStringenterprise');
    this.resourceService.getAllenterpriseResources(this.userToken).subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            this.mobilenumbercntrycode = data['result'][i].contactDetails.mobileNumberCountrycode;
            this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
            data['result'][i].mobilecode = this.mobilenumbercntrycodesplit[0] + '-' + data['result'][i].contactDetails.mobileNumber;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.allResources = data['result'];
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
      });
  }

  /**--- To call the search details default when enter key is used---- */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getAllResourcesSearch(this.searchstring);
    }
  }

  /*-- Get Resources by search --*/
  getAllResourcesSearch(searchstring) {
    localStorage.setItem('searchStringenterprise', searchstring);
    localStorage.removeItem('lcenterpriseresource');
    localStorage.removeItem('lcenterpriseresourcedata');
    if (searchstring) {
      this.resourceService.getEnterpriseResourcesSearch(this.userToken, searchstring).subscribe(
        data => {
          localStorage.setItem('enterpriseGeneral', 'enterpriseGeneral');
          if (data['statusCode'] === '1001') {
            for (let i = 0; i < data['result'].length; i++) {
              this.mobilenumbercntrycode = data['result'][i].contactDetails.mobileNumberCountrycode;
              this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
              data['result'][i].mobilecode = this.mobilenumbercntrycodesplit[0] + '-' + data['result'][i].contactDetails.mobileNumber;
              if (this.utctimezonestring.charAt(0) === '+') {
                const utctime = this.utctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              } else {
                const utctime = this.utctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              }
            }
            this.allResources = data['result'];
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
              } if (statuscode === '9997') {
                this.allResources.length = 0;
              }
              break;
          }
        }
      );
    } else {
      this.getallResources();
    }
  }

  /**---- To open advance popup model ----*/
  openAdvanceModal() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.getCountriesList();
    this.getStatusList();
    this.childModal.show();
  }

  /** -----To get the countrie list -----*/
  public getCountriesList() {
    this.resourceService.getLookupsList(this.userToken, 'COUNTRIES').subscribe(
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

  /** ----To hide the popup model---- */
  hideAdvanceModal() {
    this.childModal.hide();
  }

  /**---To get user status from on change method----*/
  getUserStatus(status) {
    this.enabled = status;
  }

  /*--Hyphen generate between Mobile number --*/
  hyphen_generate_mobile(value) {
    if (value.length > 0) {
      if (value.length === 3) {
        (<HTMLInputElement>document.getElementById('mobileNumberId')).value = value.concat('-');
      } if (value.length === 7) {
        (<HTMLInputElement>document.getElementById('mobileNumberId')).value = value.concat('-');
      }
    }
  }

  /*---- To get status list   ---*/
  public getStatusList() {
    this.resourceService.getLookupsList(this.userToken, 'ENTERPRISE_RESOURCE_STATUSES').subscribe(
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

  /** ----To get the advance search data ----*/
  AdvanceSearch() {
    this.storage.removeItem('status');
    this.storage.removeItem('selecteddashboardenterpriseid');
    localStorage.removeItem('searchStringenterprise');
    if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
      this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.firstName !== '' && this.firstName !== undefined) {
      this.firstName = this.firstName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.lastName !== '' && this.lastName !== undefined) {
      this.lastName = this.lastName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.emailValue !== '' && this.emailValue !== undefined) {
      this.emailValue = this.emailValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.emailValue !== '' && this.emailValue !== undefined) {
      this.emailValue = this.emailValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.mobileNumber !== '' && this.mobileNumber !== undefined) {
      this.mobileNumber = this.mobileNumber.trim().replace(/\s\s+/g, ' ');
    }
    if (this.userName !== '' && this.userName !== undefined) {
      this.userName = this.userName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.designation !== '' && this.designation !== undefined) {
      this.designation = this.designation.trim().replace(/\s\s+/g, ' ');
    }
    if (this.department !== '' && this.department !== undefined) {
      this.department = this.department.trim().replace(/\s\s+/g, ' ');
    }
    if (this.city !== '' && this.city !== undefined) {
      this.city = this.city.trim().replace(/\s\s+/g, ' ');
    }
    if (this.state !== '' && this.state !== undefined) {
      this.state = this.state.trim().replace(/\s\s+/g, ' ');
    }
    this.entResourceObj = {
      'enterpriseName': this.enterpriseName,
      'firstName': this.firstName,
      'lastName': this.lastName,
      'emailValue': this.emailValue,
      'mobileNumber': this.mobileNumber,
      'userName': this.userName,
      'statusValue': this.statusValue,
      'designation': this.designation,
      'department': this.department,
      'city': this.city,
      'state': this.state,
      'country': this.country
    };
    this.resourceService.advancedSearch(this.userToken, this.entResourceObj).subscribe(
      data => {
        localStorage.setItem('enterpriseAdvanced', 'enterpriseAdvanced');
        localStorage.setItem('lcenterpriseresource', 'lcenterpriseresourcedata');
        localStorage.setItem('lcenterpriseresourcedata', JSON.stringify(data));
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            this.mobilenumbercntrycode = data['result'][i].contactDetails.mobileNumberCountrycode;
            this.mobilenumbercntrycodesplit = this.mobilenumbercntrycode.split(' -');
            data['result'][i].mobilecode = this.mobilenumbercntrycodesplit[0] + '-' + data['result'][i].contactDetails.mobileNumber;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.allResources = data['result'];
          this.hideAdvanceModal();
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
              this.allResources = [];
              this.hideAdvanceModal();
              this.getStatusList();
            } break;
        }
      });
  }

  /** -------To clear the Input fields data----- */
  clear() {
    this.getStatusList();
    this.getallResources();
    this.enterpriseName = '';
    this.firstName = '';
    this.lastName = '';
    this.emailValue = '';
    this.mobileNumber = '';
    this.userName = '';
    this.statusValue = '';
    this.country = '';
    this.designation = '';
    this.department = '';
    this.city = '';
    this.state = '';
    localStorage.removeItem('searchStringenterprise');
    localStorage.removeItem('lcenterpriseresource');
    localStorage.removeItem('lcenterpriseresourcedata');
  }

  /**------ To export the data ---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('enterpriseAdvanced') === 'enterpriseAdvanced') {
      searchstring = JSON.stringify(this.entResourceObj);
      window.localStorage.removeItem('enterpriseAdvanced');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.resourceService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /*---- To auto capitalization of each word ----*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{2,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /*---- To open import popup ----*/
  importPopup() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.resourceImportModal.show();
  }

  /*---- To hide import popup ----*/
  hideImportModal() {
    this.resourceImportModal.hide();
    this.error = '';
    this.csvFile = '';
  }

  /** ----To upload the image file -----*/
  csvUploaded(resources) {
    const resourcesObj: MSInputMethodContext = <MSInputMethodContext>resources;
    const target: HTMLInputElement = <HTMLInputElement>resourcesObj.target;
    const files: FileList = resources.target.files;
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

  /** ----To download the enterprise resources list ---- */
  importEnterpriseResourcesList() {
    if (this.csvFile === '' || this.csvFile === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FILE';
    } else if (this.csvFile !== '' && this.csvFile.type === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else if (this.csvFile !== '' && this.csvFile.type !== '' && this.fileTypeError === true) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else {
      this.resourceService.importEnterpriseResourcesList(this.userToken, this.csvFile)
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
}

/* Model class for user account */
export class EnterprisesResourceDetails {
  public _id: any;
  public enterpriseId: any;
  public enterpriseName: any;
  public resourceFirstName: any;
  public resourceLastName: any;
  public designation: any;
  public gender: any;
  public ssn: any;
  public supervisorEmail: any;
  public isEnabled: any;
  public notes: any;
}
