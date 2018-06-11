/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
* The Users are the list of front end users.
* ngOnInit(): This is the initial method called when page is loading.
* ngAfterViewInit() : This method is called after a component's view has been fully initialized.
* showmessage(): This method is used to open create callhistory popup when click on message icon in user's list .
* getAllUsersList() component are using to following functionality.
* getSearchUsersList(): To display selected user details.
* userlocates(locate): This method is used to know the location of all the users.
* singlelocate(locate, singleuser): This method is used to know the location of selected user.
* ngAfterContentChecked(): To retrive user details after submition of changes.
* getrecorddetails(): To get the single notification record details.
* userDetailAction(rolenamelist): This method will executed after content checked or changed.
* getUserRoles(): To get UserRoles list.
* getChangeuserRoles(userRoles): This is onchange method of userRoles list.
* advancesubmit(): This method is used to get the advance search details.
* getUserStatus(status): This is onchange method called when status is changed.
* advancedSearch(): This method is used to call the advance search popup modal.
* selectedUser(): To get the selectd user information popup.
* getCountriesList(): This method is used to get the countries list.
* getStatus(): This method is used to get the status list.
* getAllUsersList(): This method is used to get alluserslist.
* getSearchUsersList(searchString): To get the list of search users details.
* handleKeyPress(e): This method is used to call when we click on the enter key.
* SelectType(): To open the selected user.
* callListMethod(event): To get the list of users.
* hideImportModal() : This method is used to hide the advance popup model.
* hideUserModal(): This method is used to hide the popup modal's.
* importPopup(): This method is used to import data.
* exportData(searchstring) : his method used to download data.
* excelUploaded(users): This method is used to upload the files.
* importUsersList(): This method is used to import userlist.
* clear(): This method is used to clear the input field's data.
*/

import {
  Component, OnInit, AfterContentChecked, AfterViewInit, ViewContainerRef,
  ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Userslistservice } from './userslist.service';
import { UserComponent } from '../userpopup/user.component';
import { Userservice } from '../userpopup/user.service';
import { FleetsService } from '../../../enterprises/fleets/fleetslist/fleets.service';
import { NotificationsService } from '../../../notifications/notifications.service';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'userslist.html',
  providers: [Userslistservice, Userservice, ConfirmationService, NotificationsService, FleetsService]
})

export class UsersComponent implements OnInit, AfterContentChecked, AfterViewInit {
  items: MenuItem[];
  import: MenuItem[];
  stacked: any;
  searchString: string;
  token: string;
  toastermessage: any;
  storage: Storage = window.localStorage;
  alluserDetails: Userlistdetails[];
  usersviewstatus: any;
  usersaddstatus: any;
  userseditstatus: any;
  usersliststatus: any;
  usersdeletedstatus: any;
  usersimporttatus: any;
  usersexportstatus: any;
  enterpriseName: any;
  rolenamelist: any;
  rowsPerPage = 10;
  pagename: any;
  recordid: any;
  blockstatus: any;
  unblockstatus: any;
  locatestatus: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  enterprisevalue: any;
  userNameValue: any;
  usrRole: any;
  usrRoles: any;
  resourceTypeValue: any;
  firstNameValue: any;
  lastNameValue: any;
  deptValue: any;
  designationValue: any;
  emailIdValue: any;
  cityValue: any;
  countryValue: any = '';
  stateValue: any = '';
  usersData: any;
  statusValue: any;
  enterpriseIconFilePath: any;
  statuslist: any;
  countries: any = [];
  userroles: any;
  enterpriseNames: any;
  public error: any;
  excelFile: any = '';
  excelFileSrc: any = '';
  searchuser: any;
  size: any;
  bytes: any;
  fileTypeError: any = false;
  useraccount: any;
  userRole = window.localStorage.getItem('userrole');
  userAccount = window.localStorage.getItem('user_Account');


  @ViewChild(UserComponent)
  private userpopuupcomponent: UserComponent;
  @ViewChildren('input') vc;
  @ViewChild('mgModal') public childModal: ModalDirective;
  @ViewChild('userImportModal') public usersImportModal: ModalDirective;
  listusers: Userlistdetails = new Userlistdetails();

  constructor(private userslistService: Userslistservice,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private singleuserservices: Userservice,
    public router: Router,
    public fleetsService: FleetsService,
    private notificationService: NotificationsService,
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private sanitizer: DomSanitizer,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /**----- This is the default  method called when page is loading------*/
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.usersviewstatus = window.localStorage.getItem('usersviewstatus');
    this.usersaddstatus = window.localStorage.getItem('usersaddstatus');
    this.userseditstatus = window.localStorage.getItem('userseditstatus');
    this.usersliststatus = window.localStorage.getItem('usersliststatus');
    this.usersdeletedstatus = window.localStorage.getItem('usersdeletedstatus');
    this.usersimporttatus = window.localStorage.getItem('usersimporttatus');
    this.usersexportstatus = window.localStorage.getItem('usersexportstatus');
    this.rolenamelist = window.localStorage.getItem('rolenamelists');
    this.token = window.localStorage.getItem('token');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    this.blockstatus = window.localStorage.getItem('usersblockstatus');
    this.unblockstatus = window.localStorage.getItem('usersunblockstatus');
    this.locatestatus = window.localStorage.getItem('userslocatestatus');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    localStorage.removeItem('searchStringuser');
    localStorage.removeItem('lcuser');
    localStorage.removeItem('lcuserdata');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.getUserRoles();
    this.getStatus();
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else if ((this.usersliststatus === 'false') && (this.token !== undefined)) {
      this.router.navigate(['']);
    } else if ((window.localStorage.getItem('rolesname') === 'rolenamelists')) {
      this.userDetailAction(this.rolenamelist);
      window.localStorage.removeItem('rolesname');
    } else if (this.pagename === 'users') {
      this.getrecorddetails();
      this.storage.removeItem('notificationpage');
    } else if (this.storage.getItem('selectedUserscountry') !== undefined && this.storage.getItem('selectedUserscountry') !== null) {
      this.countryValue = this.storage.getItem('selectedUserscountry');
      this.advancesubmit();
      this.storage.removeItem('selectedUserscountry');
    } else if (this.storage.getItem('status') !== undefined && this.storage.getItem('status') !== null) {
      if (this.storage.getItem('selecteddashboardenterpriseid') === 'undefined') {
        this.enterprisevalue = '';
      } else {
        this.enterprisevalue = this.storage.getItem('selecteddashboardenterpriseid');
      }
      this.statusValue = this.storage.getItem('status');
      this.advancesubmit();
    } else {
      this.getAllUsersList();
      this.items = [
        {
          label: 'User', icon: 'fa fa-user', command: () => {
            this.userpopuupcomponent.openUserInfoModal('', '');
          }
        },
      ];
      this.import = [
        { label: 'Import', icon: 'fa-upload', url: '#' },
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
    if (window.localStorage.getItem('mapmessageuser') === 'mapmessageuser') {
      window.localStorage.removeItem('mapmessageuser');
      this.userslistService.getUserInfoById(this.token, window.localStorage.getItem('id')).subscribe(
        userInfo => {
          this.showmessage(userInfo['result'].userAccount, userInfo['result'].enterpriseResourceObj.firstName + ' ' + userInfo['result'].enterpriseResourceObj.lastName, userInfo['result']._id, userInfo['result'].enterprise.enterpriseName, userInfo['result'].enterprise.enterpriseId);
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
  public displayMessage() {
    this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_PERFORM_ACTION_FROM_ENTERPRISE_RESOURCES_PAGE');
    this.toastr.success(this.toastermessage.value);
  }

  /** This method is used to open create callhistory popup when click on message icon in user's list  */
  showmessage(userAccount, username, userId, enterpriseName, enterpriseId) {
    this.router.navigate(['/history/messages']);
    window.localStorage.setItem('messageuser', 'messageuser');
    window.localStorage.setItem('useraccount', username);
    window.localStorage.setItem('tousernameacc', userAccount);
    window.localStorage.setItem('enterprisename', enterpriseName);
    window.localStorage.setItem('enterpriseid', enterpriseId);
    window.localStorage.setItem('userid', userId);
  }

  /*------ To get the selectd user information popup -------- */
  selectedUser(action, selectedUserObj) {
    this.userpopuupcomponent.openUserInfoModal(action, selectedUserObj);
  }

  /**----- This method is used to know the location of all the users-------  */
  userlocates(locate) {
    this.searchuser = localStorage.getItem('searchStringuser'); // normal search variable
    if (localStorage.getItem('lcuser') === 'lcuserdata') {
      // advance search user data
      this.userslistService.userlocatesAdvancedSearch(locate, localStorage.getItem('lcuser'));
    } else if (this.searchuser === null || this.searchuser === undefined || this.searchuser === '') {
      this.userslistService.userlocates(locate, this.token);
    } else {
      this.userslistService.userlocatessearch(locate, this.token, this.searchuser); // to get search user list
    }
  }

  /**---- This method is used to know the location of selected user---- */
 singlelocate(locate, singleuser) {
    this.fleetsService.getBuildingId(this.token, singleuser._id, 'user').subscribe(
      builingcode => {
        if (builingcode.result.buildingCode) {
          this.fleetsService.getbuildingFloorMapInfo(this.token, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lcuserinfo', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              localStorage.setItem('ucurrentfloorname', builingcode.result.currentFloor);
              const currentFloorName = 'ucurrentfloorname';
              const currentuid = singleuser._id;

              this.userslistService.singlelocateuser(locate, this.token, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, currentuid, builingcode.result.fleetId, builingcode.result.currentFloorId, fleetInfo.fleetName);
            });
        } else {
          this.userslistService.getUserInfoById(this.token, singleuser._id).subscribe(
            userInfo => {
              userInfo.result.presentlyLocated = '';
              delete userInfo.result.enterpriseResourceObj.firstName;
              delete userInfo.result.enterpriseResourceObj.lastName;
              delete userInfo.result.workNumber;
              delete userInfo.result.enterpriseResourceObj.contactDetails.email;
              //    window.localStorage.setItem('umapsettings', JSON.stringify(mapSettings));
              let temp = userInfo.result.mobileNumber;
              delete userInfo.result.mobileNumber;
              userInfo.result.resMobileNumber = temp;
              userInfo['result'] = JSON.parse((JSON.stringify({ enterpriseName: temp })
                + JSON.stringify(userInfo['result'])).replace(/}{/g, ','));
              temp = userInfo.result.email;
              delete userInfo.result.email;
              userInfo.result.email = temp;
              localStorage.setItem('lcuserinfo', JSON.stringify(userInfo['result']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              const currentFloorName = null;
              const currentuid = singleuser._id;
              const buildingName = null;
              const currentfloorid = null;
              const currentfleetid =  null;
              this.userslistService.singlelocateuser(locate, this.token, userInfo['result']._id,
                false, currentFloorName, currentuid, currentfleetid, currentfloorid, buildingName);
            });
        }
      }, error => {
        this.userlocatestatus(error);
      });

  }
  userlocatestatus(error) {
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
  }

  /**------ To get the single notification record details-------- */
  getrecorddetails() {
    this.notificationService.getNotification(this.recordid, this.pagename, this.token)
      .subscribe(
      data => {
        this.alluserDetails = data['result'];
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

  /*----- This method will executed after content checked or changed -----*/
  ngAfterContentChecked() {
    if (window.localStorage.getItem('goToSimple') === 'goToSimple') {
      window.localStorage.removeItem('goToSimple');
      this.getSearchUsersList(this.searchString);
    }
    if (window.localStorage.getItem('goToAdvance') === 'goToAdvance') {
      window.localStorage.removeItem('goToAdvance');
      this.advancesubmit();
    }
    this.token = window.localStorage.getItem('token');
  }

  /**---- This method is used to get the userlist based on the userroles -----*/
  userDetailAction(rolenamelist) {
    this.userslistService.rolesdetailaction(rolenamelist, window.localStorage.getItem('token'))
      .subscribe(
      alluserDetails => {
        this.alluserDetails = alluserDetails;
      },
      error => {
        const status = JSON.parse(error['status']);
        const statusCode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statusCode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statusCode === '9997') {
            }
            break;
          case 500:
        }
      });
  }

  /*---- To get UserRoles list   ---*/
  public getUserRoles() {
    this.singleuserservices.getUserRoles(this.token).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.usrRoles = data['result'].sort();
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


  /* -----This is onchange method of userRoles list --------*/
  getChangeuserRoles(userRoles) {
    this.usrRole = userRoles;
  }

  /**------- This method is used to get the advance search details------- */
  advancesubmit() {
    this.storage.removeItem('status');
    this.storage.removeItem('selecteddashboardenterpriseid');
    localStorage.removeItem('searchStringuser');
    window.localStorage.removeItem('advancedSearch');
    window.localStorage.removeItem('simpleSearch');
    if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
      this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.userNameValue !== '' && this.userNameValue !== undefined) {
      this.userNameValue = this.userNameValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.resourceTypeValue !== '' && this.resourceTypeValue !== undefined) {
      this.resourceTypeValue = this.resourceTypeValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.firstNameValue !== '' && this.firstNameValue !== undefined) {
      this.firstNameValue = this.firstNameValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.lastNameValue !== '' && this.lastNameValue !== undefined) {
      this.lastNameValue = this.lastNameValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.deptValue !== '' && this.deptValue !== undefined) {
      this.deptValue = this.deptValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.designationValue !== '' && this.designationValue !== undefined) {
      this.designationValue = this.designationValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.emailIdValue !== '' && this.emailIdValue !== undefined) {
      this.emailIdValue = this.emailIdValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.cityValue !== '' && this.cityValue !== undefined) {
      this.cityValue = this.cityValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.stateValue !== '' && this.stateValue !== undefined) {
      this.stateValue = this.stateValue.trim().replace(/\s\s+/g, ' ');
    }
    this.usersData = {
      'enterpriseName': this.enterprisevalue,
      'userName': this.userNameValue,
      'userRole': this.usrRole,
      'resourceType': this.resourceTypeValue,
      'firstName': this.firstNameValue,
      'lastname': this.lastNameValue,
      'status': this.statusValue,
      'department': this.deptValue,
      'designation': this.designationValue,
      'email': this.emailIdValue,
      'city': this.cityValue,
      'country': this.countryValue,
      'state': this.stateValue,
    };
    this.userslistService.usersAdvancedSearch(this.usersData, this.token)
      .subscribe(
      alluserDetails => {
        window.localStorage.setItem('advancedSearch', 'advancedSearch');
        localStorage.setItem('lcuserdata', JSON.stringify(alluserDetails));
        window.localStorage.setItem('lcuser', 'lcuserdata');
        for (let i = 0; i < alluserDetails.length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).add(utctimesplit[0], 'hours');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).add(utctimesplit[1], 'minutes');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).add(utctimesplit[0], 'hours');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).subtract(utctimesplit[0], 'hours');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).subtract(utctimesplit[1], 'minutes');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).subtract(utctimesplit[0], 'hours');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.alluserDetails = alluserDetails;
        this.childModal.hide();
      },
      error => {
        const status = JSON.parse(error['status']);
        const statusCode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statusCode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
          case 500:
        }
      });
  }

  /**---- This is onchange method called when status is changed----- */
  getUserStatus(status) {
    this.statusValue = status;
  }

  /**------- This method is used to call the advance search popup modal------ */
  advancedSearch() {
    this.getCountriesList();
    this.userroles = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    if (this.usrRole === undefined) {
      this.usrRole = '';
    }
    this.childModal.show();
  }

  /**--------- This method is used to get the countries list------ */
  public getCountriesList() {
    this.userslistService.getLookupsList(this.token, 'COUNTRIES').subscribe(
      data => {
        this.countries = data;
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

  /** -----This method is used to get the status list ----- */
  public getStatus() {
    this.userslistService.getLookupsList(this.token, 'USER_STATUSES').subscribe(
      data => {
        this.statuslist = data;
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

  /* ------To get the list of users -------------*/
  getAllUsersList() {
    localStorage.removeItem('lcuser');
    localStorage.removeItem('lcuserdata');
    this.userslistService.getAllUsersList(window.localStorage.getItem('token'))
      .subscribe(
      alluserDetails => {
        for (let i = 0; i < alluserDetails.length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).utc().add(utctimesplit[0], 'hours');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).add(utctimesplit[1], 'minutes');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).utc().add(utctimesplit[0], 'hours');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).subtract(utctimesplit[1], 'minutes');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.alluserDetails = alluserDetails;
      },
      error => {
        const status = JSON.parse(error['status']);
        const statusCode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statusCode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statusCode === '9997') {

            }
            break;
          case 500:
        }
      });
  }

  /* ----To get the list of search users details----- */
  getSearchUsersList(searchString) {
    window.localStorage.setItem('searchStringuser', searchString);
    window.localStorage.removeItem('advancedSearch');
    window.localStorage.removeItem('simpleSearch');
    localStorage.removeItem('lcuser');
    localStorage.removeItem('lcuserdata');
    if (searchString) {
      this.userslistService.getSearchUsersList(window.localStorage.getItem('token'), searchString)
        .subscribe(
        alluserDetails => {
          window.localStorage.setItem('simpleSearch', 'simpleSearch');
          for (let i = 0; i < alluserDetails.length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).utc().add(utctimesplit[0], 'hours');
              alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).add(utctimesplit[1], 'minutes');
              alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).utc().add(utctimesplit[0], 'hours');
              alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              alluserDetails[i].createdAt = moment(alluserDetails[i].createdAt).subtract(utctimesplit[1], 'minutes');
              alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              alluserDetails[i].updatedAt = moment(alluserDetails[i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.alluserDetails = alluserDetails;
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 400:
              if (statusCode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statusCode === '9997') {
              }
              break;
            case 500:
          }
        });
    } else {
      this.getAllUsersList();
    }
  }

  /**----export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advancedSearch') === 'advancedSearch') {
      searchstring = JSON.stringify(this.usersData);
      window.localStorage.removeItem('advancedSearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.userslistService.exportlist(searchstring, this.token);
    window.location.href = filePath;
  }

  /**---- This method is used to call when we click on the enter key ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getSearchUsersList(this.searchString);
    }
  }

  /*----- To open the selected user ------*/
  SelectType() {
    this.selectedUser('Create', '');
    this.userpopuupcomponent.createpopup();
  }

  /* ---To get the list of users----- */
  callListMethod(event) {
    this.getAllUsersList();
  }

  /**-------- Import Popup call -----*/
  importPopup() {
    this.usersImportModal.show();
  }

  /** -----This method is used to hide the advance popup model---- */
  hideImportModal() {
    this.usersImportModal.hide();
    this.error = '';
    this.excelFile = '';
  }

  /**--- This method is used to hide the popup--- */
  hideUserModal() {
    this.childModal.hide();
  }

  /**----- This method is used to upload the files -----*/
  excelUploaded(users) {
    const usersObj: MSInputMethodContext = <MSInputMethodContext>users;
    const target: HTMLInputElement = <HTMLInputElement>usersObj.target;
    const files: FileList = users.target.files;
    if (files.length > 0) {
      this.excelFile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.excelFile.size;
    this.excelFileSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.excelFile));
    setTimeout(() => {
      this.excelFileSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.excelFile));
    }, 500);
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    this.size = (Math.round(fSize * 100) / 100);
    this.bytes = fSExt[i];
    const filetype = this.excelFile.type;
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

  /**------ This method is used to import the user's list -----*/
  importUsersList() {
    if (this.excelFile === '' || this.excelFile === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FILE';
    } else if (this.excelFile !== '' && this.excelFile.type === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else if (this.excelFile !== '' && this.excelFile.type !== '' && this.fileTypeError === true) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else {
      this.userslistService.importUsersList(this.token, this.excelFile)
        .subscribe(data => {
          if (data.statusCode === '1001') {
            this.hideImportModal();
          }
        });
    }
  }

  /**------ This method is used to clear the input field's data-- */
  clear() {
    this.enterprisevalue = '';
    this.userNameValue = '';
    this.usrRole = '';
    this.resourceTypeValue = '';
    this.firstNameValue = '';
    this.lastNameValue = '';
    this.statusValue = '';
    this.deptValue = '';
    this.designationValue = '';
    this.emailIdValue = '';
    this.cityValue = '';
    this.countryValue = '';
    this.stateValue = '';
    this.getAllUsersList();
    this.getStatus();
    localStorage.removeItem('lcuser');
    localStorage.removeItem('lcuserdata');
  }
}

/*---- Model class for user account---- */
export class Userlistdetails {
  public enterpriseId: string;
  public enterpriseName: string;
  public organization: string;
  public userType: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public confirmPassword: string;
  public userId: string;
  public department: string;
  public position: string;
  public gender: string;
  public addressLine1: string;
  public addressLine2: string;
  public city: string;
  public state: string;
  public zip: string;
  public language: string;
  public timezone: string;
  public currency: string;
  public currencyFormat: string;
  public dateFormat: string;
  public hobbies: string;
  public imageUrl: string;
  public defaultTheme: string;
  public homepage: string;
  public createdBy: string;
  public createdAt: any;
  public lastlogin: string;
  public creditCount: string;
  public isEnabled: string;
  public isDeleted: string;
  public updatedBy: string;
  public updatedAt: any;
  public userrole: string;
  public email: string;
  public country: string;
  public mobile: string;
  public userStatus: string;
  public roleRightsId: string;
}
export class MenuItem {
}
