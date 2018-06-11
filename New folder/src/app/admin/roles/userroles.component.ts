/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = August 08, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com> <http://www.srisys.com>
 **/

/*
* All Users Roles Component have below functionality.
* getRolesList(): Is used to get List of Roles.
* deletecheckboxes(): This method is used to delete checkboxes
* getUsersRolesRights(): Is used to get Selected Role Rights.
* clearrenameclose(): This method used to clear rename.
* onChange(roleId): This method used to onchange roleId.
* onAddChange(roleId): This method used to  onchange add popup.
* onDeleteChange(roleId): This method used to change roleId in delete.
* deleteRole(): This method used delete role.
* addRoles(): This method used add roles.
* getRoleById(): This method used to get role by Id.
* renameRole():This method used to Rename Role.
* updateUserRoles(): This method used to update roles.
* analyticsCheck(): This method used to analyticsCheck.
* analyticsreCheck(): This method used to analyticsreCheck.
* enterpriseCheck(): This method used to enterpriseCheck.
* enterprisereCheck(): This method used to enterprisereCheck.
* usersCheck(): This method used to usersCheck.
* rolerightsCheck(): This method used to rolerightsCheck.
* rolerightsreCheck(): This methid used to rolerightsreCheck.
* flletsCheck(): This method used to flletsCheck.
* fleetsreCheck(): This method used to fleetsreCheck.
* lookupsCheck(): This method used to lookupsCheck.
* lookupsreCheck(): This method used to lookupsreCheck.
* eventsCheck(): This method used to  events Check box.
* eventsreCheck(): This method used to events re box .
* funfactsCheck(): This method used to funfacts Check box.
* funfactsreCheck(): This method used to funfacts re Check box.
* historyCheck(): This method used to history Check box.
* historysreCheck(): This method used to historysreCheck.
* reserveCheck(): This method used to reserveCheck.
* reservesreCheck(): This method used to reservesreCheck.
* enterpriseResourcesCheck(): This method used to enterpriseResourcesCheck.
* enterpriseResourcesreCheck(): This method used to enterpriseResourcesreCheck.
* fleetTypeAttributesCheck(): This method used to fleetTypeAttributesCheck.
* fleetTypeAttributesreCheck(): This method used to fleetTypeAttributesreCheck.
* registrationsCheck(): This method used to registrationsCheck.
* registrationsreCheck(): This methos used to registrationsreCheck.
*/
import { Component, ViewChild, OnInit, AfterContentChecked, ViewContainerRef, Inject } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { UserRolesService } from './userroles.service';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
@Component({
  templateUrl: 'userroles.html',
  providers: [UserRolesService],
})
export class UserrolesComponent implements OnInit, AfterContentChecked {
  @ViewChild('childModal') public childModal: ModalDirective;
  @ViewChild('infoModal') public infoModal: ModalDirective;
  @ViewChild('infoupdateModal') public infoupdateModal: ModalDirective;
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('infodeleteModal') public infodeleteModal: ModalDirective;
  @ViewChild('inforenameModal') public inforenameModal: ModalDirective;
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('smallModal') public smallModal: ModalDirective;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  @ViewChild('dangerModal') public dangerModal: ModalDirective;
  @ViewChild('infoRestpopModal') public infoRestpopModal: ModalDirective;
  // @ViewChild('childModal') public childModal: ModalDirective;
  enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  roleAddRight: any;
  roleEditRight: any;
  roleDeleteRight: any;
  roleViewRight: any;
  fleetCommonName: any;
  errorMessage: string;
  roleName: string;
  analytics: any;
  enterprises: any;
  alluserscheck: any;
  rolerightCheck: any;
  allfleets: any;
  alllookups: any;
  allevents: any;
  allfeedback: any;
  allfunfacts: any;
  allhelp: any;
  allhistory: any;
  allreserve: any;
  allUniversalImages: any;
  allStaticContents: any;
  allAdvertisements: any;
  allNotifications: any;
  allimportHistory: any;
  diplayRoleName: string;
  roleNameType: string;
  DISPLAY_NAME: string;
  userrolename: any;
  ROLE_ID: number;
  ROLE_IDs: any;
  deleteROLE_ID: number;
  NAME: string;
  ROLE_RIGHTS_ID: number;
  updateerror: string;
  addroleerror: string;
  roleerror: string;
  nameerror: string;
  delete_role: any;
  renameerror: string;
  selected_role: any;
  rolenamelists: any;
  rolenamelist: any;
  delerror: string;
  roledelete: any;
  rolenIdBasedon: any;
  public addUser: any;
  delerroruser: any;
  callhistory: any;
  messagehistory: any;
  renamestatus: any;
  dashboard: any;
  status: any;
  statuscode: any;
  fleetsCommonName: any;
  DISPLAY_NAME_VALUE: string;
  an_report1: any = false;
  an_report2: any = false;

  enterpriseResourcesAllRights_viewright: any = false;
  enterpriseResourcesTotalActive_viewright: any = false;
  enterpriseResourcesTotalInactive_viewright: any = false;
  eventRegistrationsAll_viewright: any = false;
  eventRegistrationsAveragePerEvent_viewright: any = false;
  eventRegistrationsAveragePerFleet_viewright: any = false;
  eventsAveragePerFleet_viewright: any = false;
  eventsAll_viewright: any = false;
  fleetsAll_viewright: any = false;
  fleetHoursAverageReservedPerFleet_viewright: any = false;
  fleetHoursTotalReservable_viewright: any = false;
  fleetHoursTotalReserved_viewright: any = false;
  fleetReservationsAll_viewright: any = false;
  fleetReservationsAveragePerFleet_viewright: any = false;
  fleetsTotalActive_viewright: any = false;
  fleetsTotalInactive_viewright: any = false;
  fleetsTotalNonTransactable_viewright: any = false;
  fleetsTotalTransactable_viewright: any = false;
  fleetUsage_viewright: any = false;
  pieChartsByCountry_viewright: any = false;
  userActivity_viewright: any = false;
  usersAll_viewright: any = false;
  userHoursActualAveragePerUser_viewright: any = false;
  userHoursTotalActual_viewright: any = false;
  userHoursTotalPotential_viewright: any = false;
  usersTotalActive_viewright: any = false;
  usersTotalInactive_viewright: any = false;

  callhistory_deleteright: any = false;
  callhistory_viewright: any = false;
  callhistory_listright: any = false;
  callhistory_exportright: any = false;

  enterprise_activateright: any = false;
  enterprise_inactivateright: any = false;
  enterprise_locateright: any = false;
  enterprise_viewright: any = false;
  enterprise_addright: any = false;
  enterprise_editright: any = false;
  enterprise_listright: any = false;
  enterprise_exportright: any = false;

  users_viewright: any = false;
  users_addright: any = false;
  users_editright: any = false;
  users_deleteright: any = false;
  users_listright: any = false;
  users_importright: any = false;
  users_exportright: any = false;
  users_blockright: any = false;
  users_unblockright: any = false;
  users_locateright: any = false;

  rolerights_viewright: any = false;
  rolerights_addright: any = false;
  rolerights_editright: any = false;
  rolerights_deleteright: any = false;
  rolerights_renameright: any = false;

  fleet_viewright: any = false;
  fleet_addright: any = false;
  fleet_editright: any = false;
  fleet_deleteright: any = false;
  fleet_listright: any = false;
  fleet_importright: any = false;
  fleet_exportright: any = false;
  fleet_locateright: any = false;

  assets_viewright: any = false;
  assets_addright: any = false;
  assets_editright: any = false;
  assets_deleteright: any = false;
  assets_listright: any = false;
  assets_importright: any = false;
  assets_exportright: any = false;

  lookups_viewright: any = false;
  lookups_addright: any = false;
  lookups_editright: any = false;
  lookups_deleteright: any = false;
  lookups_listright: any = false;
  lookups_exportright: any = false;

  events_viewright: any = false;
  events_addright: any = false;
  events_editright: any = false;
  events_deleteright: any = false;
  events_listright: any = false;
  events_exportright: any = false;
  events_extendright: any = false;
  events_cancelright: any = false;
  events_checkinright: any = false;
  events_checkoutright: any = false;
  events_locateright: any = false;
  events_guidedright: any = false;

  feedback_addright: any = false;
  feedback_deleteright: any = false;
  feedback_editright: any = false;
  feedback_exportright: any = false;
  feedback_listright: any = false;
  feedback_viewright: any = false;

  funfacts_viewright: any = false;
  funfacts_addright: any = false;
  funfacts_editright: any = false;
  funfacts_deleteright: any = false;
  funfacts_listright: any = false;
  funfacts_importright: any = false;
  funfacts_exportright: any = false;

  help_addright: any = false;
  help_deleteright: any = false;
  help_editright: any = false;
  help_exportright: any = false;
  help_listright: any = false;
  help_viewright: any = false;

  reserve_viewright: any = false;
  reserve_addright: any = false;
  reserve_editright: any = false;
  reserve_deleteright: any = false;
  reserve_listright: any = false;
  reserve_exportright: any = false;
  reserve_cancelright: any = false;
  reserve_checkinright: any = false;
  reserve_checkoutright: any = false;
  reserve_extendright: any = false;
  reserve_locateright: any = false;
  reserve_guidedright: any = false;

  taging_viewright: any = false;
  taging_addright: any = false;
  taging_editright: any = false;
  taging_deleteright: any = false;
  taging_listright: any = false;
  taging_importright: any = false;
  taging_exportright: any = false;

  loghistory_viewright: any = false;
  loghistory_deleteright: any = false;
  loghistory_listright: any = false;
  loghistory_exportright: any = false;

  message_addright: any = false;
  message_deleteright: any = false;
  message_exportright: any = false;
  message_listright: any = false;
  message_viewright: any = false;

  enterprise_resources_viewright: any = false;
  enterprise_resources_addright: any = false;
  enterprise_resources_editright: any = false;
  enterprise_resources_deleteright: any = false;
  enterprise_resources_listright: any = false;
  enterprise_resources_importright: any = false;
  enterprise_resources_exportright: any = false;
  enterprise_resources_blockright: any = false;
  enterprise_resources_locateright: any = false;
  enterprise_resources_unblockright: any = false;
  enterpriseResources: any = false;

  fleet_type_attributes_viewright: any = false;
  fleet_type_attributes_addright: any = false;
  fleet_type_attributes_editright: any = false;
  fleet_type_attributes_deleteright: any = false;
  fleet_type_attributes_listright: any = false;
  fleet_type_attributes_exportright: any = false;
  allfleetTypeAttributes: any = false;

  // fleet types
  fleet_types_viewright: any = false;
  fleet_types_addright: any = false;
  fleet_types_editright: any = false;
  fleet_types_deleteright: any = false;
  fleet_types_listright: any = false;
  fleet_types_exportright: any = false;
  allfleetTypes: any = false;

  registrations_viewright: any = false;
  registrations_addright: any = false;
  registrations_editright: any = false;
  registrations_deleteright: any = false;
  registrations_listright: any = false;
  registrations_exportright: any = false;
  registrations_checkinright: any = false;
  registrations_checkoutright: any = false;
  registrations_locateright: any = false;
  registrations_guidedright: any = false;

  importHistory_viewright: any = false;
  importHistory_deleteright: any = false;
  importHistory_listright: any = false;
  importHistory_exportright: any = false;

  notifctions_viewright: any = false;
  notifications_deleteright: any = false;
  notifications_listright: any = false;
  notifications_exportright: any = false;
  notifications_readright: any = false;
  notifications_unreadright: any = false;

  universalImages_viewright: any = false;
  universalImages_addright: any = false;
  universalImages_editright: any = false;
  universalImages_deleteright: any = false;
  universalImages_listright: any = false;
  universalImages_exportright: any = false;

  staticContents_viewright: any = false;
  staticContents_addright: any = false;
  staticContents_editright: any = false;
  staticContents_deleteright: any = false;
  staticContents_listright: any = false;
  staticContents_exportright: any = false;

  advertisements_viewright: any = false;
  advertisements_addright: any = false;
  advertisements_editright: any = false;
  advertisements_deleteright: any = false;
  advertisements_listright: any = false;
  advertisements_exportright: any = false;

  billpayment_viewright: any = false;
  billpayment_addright: any = false;
  billpayment_editright: any = false;
  billpayment_deleteright: any = false;
  billpayment_listright: any = false;
  billpayment_exportright: any = false;

  displaymap_viewright: any = false;
  displaymap_addright: any = false;
  displaymap_editright: any = false;
  displaymap_listright: any = false;
  displaymap_exportright: any = false;

  enterpriseContractDetails_addright: any = false;
  enterpriseContractDetails_deleteright: any = false;
  enterpriseContractDetails_editright: any = false;
  enterpriseContractDetails_exportright: any = false;
  enterpriseContractDetails_listright: any = false;
  enterpriseContractDetails_viewright: any = false;

  allPickTickets:any;
  pickTickets_viewright: any = false;
  pickTickets_assignright: any = false;
  pickTickets_editright: any = false;
  pickTickets_deleteright: any = false;
  pickTickets_listright: any = false;
  pickTickets_exportright: any = false;
  pickTickets_locateright: any = false;
  pickTickets_cancelright: any = false;
  
  allApplications: any;
  allAppTypeAttributes: any;
  allAudiences: any;
  allAuditTrail: any;
  allPlans: any;
  allDomains:any;
  allEmailTemplates:any;

  applications_viewright: any = false;
  applications_addright: any = false;
  applications_editright: any = false;
  applications_deleteright: any = false;
  applications_listright: any = false;
  applications_exportright: any = false;
  applications_activateright: any = false;
  applications_analyticsright: any = false;
  applications_cloneright: any = false;
  applications_implementright: any = false;
  applications_inactivateright: any = false;
  applications_previewright: any = false;

  appTypeAttributes_viewright: any = false;
  appTypeAttributes_addright: any = false;
  appTypeAttributes_editright: any = false;
  appTypeAttributes_deleteright: any = false;
  appTypeAttributes_listright: any = false;
  appTypeAttributes_exportright: any = false;

  audiences_viewright: any = false;
  audiences_deleteright: any = false;
  audiences_listright: any = false;
  audiences_exportright: any = false;

  auditTrail_viewright: any = false;
  auditTrail_listright: any = false;
  auditTrail_exportright: any = false;

  domains_addright: any = false;
  domains_deleteright: any = false;
  domains_listright: any = false;
  domains_exportright: any = false;
  domains_activateright: any = false;
  domains_addtoplanright: any = false;
  domains_analyticsright: any = false;
  domains_inactivateright: any = false;
  domains_removefromplanright: any = false;

  emailTemplates_viewright: any = false;
  emailTemplates_addright: any = false;
  emailTemplates_editright: any = false;
  emailTemplates_deleteright: any = false;
  emailTemplates_listright: any = false;
  emailTemplates_exportright: any = false;
  emailTemplates_activateright: any = false;
  emailTemplates_analyticsright: any = false;
  emailTemplates_inactivateright: any = false;

  plans_analyticsright: any = false;
  plans_addright: any = false;
  plans_editright: any = false;
  plans_deleteright: any = false;
  plans_listright: any = false;
  plans_exportright: any = false;
  plans_viewright: any = false;

  allregistrations: any = false;
  errordisplayname: any;
  errorrolename: any;
  public userRoles: any; // = new UserRolesRights();
  public rolesList: any;
  renamesuccess: any;
  rolesavesuccess: any;
  userToken: any;
  allbilpayments: any;
  alldisplaymap: any;
  allenterpriseContractDetails: any;

  public showChildModal(): void {
    this.childModal.show();
  }
  public hideChildModal(): void {
    this.childModal.hide();
  }
  public showInfoModal(): void {
    this.updateerror = '';
    this.infoModal.show();
  }

  public hideInfoModal(): void {
    this.infoModal.hide();
  }
  public showMymodalModal(): void {
    this.userrolename = '';
    this.DISPLAY_NAME = '';
    this.delerroruser = '';
    this.delete_role = <HTMLInputElement>document.getElementById('selectrole');
    if (this.delete_role.value !== undefined && this.delete_role.value > 0 && this.delete_role.value !== 'undefined') {
      this.ROLE_ID = this.delete_role.value;
    } else {
      this.ROLE_ID = 0;
    }
    this.myModal.show();
  }
  public hideMymodalModal(): void {
    this.myModal.hide();
    this.getRolesList();
    this.DISPLAY_NAME = '';
    this.userrolename = '';
    this.delerroruser = '';
  }
  addclosehideMymodalModal() {
    this.myModal.hide();
    this.addroleerror = '';
    this.DISPLAY_NAME = '';
    this.userrolename = '';
  }
  public showLargeModal(): void {
    this.largeModal.show();
  }
  showmodel() {
    this.delerroruser = '';
    if (this.rolenIdBasedon !== undefined && this.rolenIdBasedon !== 'undefined' && this.rolenIdBasedon !== '') {
      this.largeModal.show();
      this.renameerror = '';
      this.getRoleById();
    } else {
      this.DISPLAY_NAME = '';
      this.inforenameModal.show();
      this.getRoleById();
      this.renameerror = 'USER_ROLES.SELECT_ROLE';
    }
  }
  public hideLargeModal(): void {
    this.largeModal.hide();
  }
  public showSmallModal(): void {
    this.delete_role = <HTMLInputElement>document.getElementById('selectrole');
    if (this.delete_role.value !== undefined && this.delete_role.value > 0 && this.delete_role.value !== 'undefined') {
      this.deleteROLE_ID = this.delete_role.value;
      this.delerror = '';
      this.delerroruser = '';
      this.smallModal.show();
      this.getRoleById();
    } else {
      this.delerror = 'USER_ROLES.SELECT_ROLE';
      this.getRoleById();
      this.delerroruser = '';
      this.infodeleteModal.show();
    }
  }

  public hideSmallModal(): void {
    this.delerror = '';
    this.delerroruser = '';
    this.deleteROLE_ID = 0;
    this.smallModal.hide();
  }

  public showPrimaryModal(): void {
    this.primaryModal.show();
  }

  public hidePrimaryModal(): void {
    this.primaryModal.hide();
  }
  public showSuccessModal(): void {
    this.successModal.show();
  }

  public hideSuccessModal(): void {
    this.successModal.hide();
  }

  public showDangerModal(): void {
    this.dangerModal.show();
  }

  public hideDangerModal(): void {
    this.dangerModal.hide();
  }
  restpopupmodal() {
    if (this.rolenIdBasedon !== undefined && this.rolenIdBasedon !== 'undefined' && this.rolenIdBasedon !== '') {
      this.renameerror = '';
      this.delerroruser = '';
      this.Close();
      this.dangerModal.show();
    } else {
      this.renameerror = 'USER_ROLES.SELECT_ROLE';
      this.delerroruser = '';
      this.infoRestpopModal.show();
    }
  }
  infoRestpopclose() {
    this.deletecheckboxes();
    this.infoRestpopModal.hide();
  }
  updatedrolespopup() {
    if (this.rolenIdBasedon !== undefined && this.rolenIdBasedon !== 'undefined' && this.rolenIdBasedon !== '') {
      this.renameerror = '';
      this.delerroruser = '';
      this.Close();
      this.infoModal.show();
      this.getRoleById();
    } else {
      this.renameerror = 'USER_ROLES.SELECT_ROLE';
      this.delerroruser = '';
      this.infoupdateModal.show();
    }
  }
  constructor(private userRolesService: UserRolesService, private translateService: TranslateService,
    vcr: ViewContainerRef, public toastr: ToastsManager, @Inject('apiEndPoint') public apiEndPoint: string,
    private router: Router, @Inject('footerPoweredByName') public footerPoweredByName: string, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
     this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
     this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.roleAddRight = window.localStorage.getItem('roleRightsAddstatus');
    this.roleEditRight = window.localStorage.getItem('roleRightsEditstatus');
    this.roleDeleteRight = window.localStorage.getItem('roleRightsDeletestatus');
    this.roleViewRight = window.localStorage.getItem('roleRightsViewstatus');
    this.renamestatus = window.localStorage.getItem('roleRightsrenamestatus');
    this.userToken = window.localStorage.getItem('token');
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else {
      this.getUsersRolesRights();
      this.getRolesList();
    }
  }
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
     this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (localStorage.getItem('rolesave') === 'save') {
      this.getRolesList();
      localStorage.removeItem('rolesave');
    }
    if (localStorage.getItem('renamerole') === 'renamerole') {
      this.getRolesList();
      localStorage.removeItem('renamerole');
    }
  }
  Close() {
    this.updateerror = '';
    this.addroleerror = '';
    this.delerroruser = '';
    this.roleerror = '';
    this.renameerror = '';
    this.delerror = '';
    this.errordisplayname = '';
    this.errorrolename = '';
    this.DISPLAY_NAME = '';
    this.userrolename = '';
  }
  clearMessages() {
    this.addroleerror = '';
    this.roleerror = '';
    this.nameerror = '';
    this.renameerror = '';
    this.delerroruser = '';
    this.delerror = '';
    this.errordisplayname = '';
    this.errorrolename = '';
  }
  /*-- To get list of Roles --*/
  getRolesList() {
    this.ROLE_ID = 0;
    const token = window.localStorage.getItem('token');
    this.userRolesService.getRolesList(token)
      .subscribe(
      roles => {
        if (roles['statusCode'] === '1028') {
          this.rolesList = roles['result'];
        }
      },
      error => this.errorMessage = <any>error);
  }
  deletecheckboxes() {
    this.analytics = false;
    this.enterprises = false;
    this.alluserscheck = false;
    this.allfleets = false;
    this.alllookups = false;
    this.allevents = false;
    this.allfeedback = false;
    this.allfunfacts = false;
    this.allhelp = false;
    this.rolerightCheck = false;
    this.allreserve = false;
    this.allimportHistory = false;
    this.allNotifications = false;
    this.allUniversalImages = false;
    this.allStaticContents = false;
    this.allAdvertisements = false;
    this.allhistory = false;
    this.allfleetTypeAttributes = false;
    this.allfleetTypes = false;
    this.enterpriseResources = false;
    this.clearRoleRights();
    this.allregistrations = false;
    this.callhistory = false;
    this.messagehistory = false;
    this.allenterpriseContractDetails = false;
    this.alldisplaymap = false;
    this.allbilpayments = false;
    this.dashboard = false;
    this.allApplications = false;
    this.allAppTypeAttributes = false;
    this.allAudiences = false;
    this.allAuditTrail = false;
    this.allDomains = false;
    this.allEmailTemplates = false;
    this.allPlans = false;
    this.allPickTickets = false;
  }
  clearrenameclose() {
    this.clearRoleRights();
    this.analytics = false;
    this.enterprises = false;
    this.alluserscheck = false;
    this.rolerightCheck = false;
    this.allfleets = false;
    this.alllookups = false;
    this.allevents = false;
    this.allfeedback = false;
    this.allhelp = false;
    this.allhistory = false;
    this.allfunfacts = false;
    this.allenterpriseContractDetails = false;
    this.alldisplaymap = false;
    this.allbilpayments = false;
    this.dashboard = false;
  }
  onChange(roleId) {
    this.delerror = '';
    this.delerroruser = '';
    this.rolenIdBasedon = roleId;
    if (roleId === 'undefined') {
      this.an_report1 = false;
      this.an_report2 = false;
      this.analytics = false;
      this.enterprises = false;
      this.alluserscheck = false;
      this.enterpriseResources = false;
      this.allfleets = false;
      this.alllookups = false;
      this.allevents = false;
      this.allfeedback = false;
      this.allhelp = false;
      this.allfunfacts = false;
      this.allreserve = false;
      this.allimportHistory = false;
      this.allNotifications = false;
      this.allUniversalImages = false;
      this.allStaticContents = false;
      this.allAdvertisements = false;
      this.allhistory = false;
      this.allfleetTypeAttributes = false;
      this.allfleetTypes = false;
      this.rolerightCheck = false;
      this.allregistrations = false;
      this.userRoles.ONE_ANALYTICS_RIGHTS = false;
      this.userRoles.TWO_ANALYTICS_RIGHTS = false;
      this.userRoles.THREE_ANALYTICS_RIGHTS = false;
      this.userRoles.ROLEACCESS_USER_RIGHTS = false;
      this.userRoles.PROMOTE_USER_RIGHTS = false;
      this.userRoles.LIST_USERS_RIGHTS = false;
      this.userRoles.EDIT_USER_RIGHTS = false;
      this.userRoles.DELETE_USER_RIGHTS = false;
      this.userRoles.ADD_USER_RIGHTS = false;
      this.allenterpriseContractDetails = false;
      this.alldisplaymap = false;
      this.allbilpayments = false;
      this.ROLE_ID = 0;
      this.dashboard = false;
      this.allApplications = false;
      this.allAppTypeAttributes = false;
      this.allAudiences = false;
      this.allAuditTrail = false;
      this.allDomains = false;
      this.allEmailTemplates = false;
      this.allPlans = false;
      this.allPickTickets = false;
      this.deletecheckboxes();
    } else {
      this.ROLE_ID = roleId;
      this.getUsersRolesRights();
      this.getRoleName();
    }
  }
  onAddChange(roleId) {
    if (roleId !== 0 && roleId !== '0' && roleId !== undefined && roleId !== 'undefined') {
      this.ROLE_ID = roleId;
    } else {
      this.ROLE_ID = 0;
    }
  }
  public usersdetails() {
    this.selected_role = <HTMLInputElement>document.getElementById('selectrole');
    if (this.selected_role.value !== undefined && this.selected_role.value > 0 && this.selected_role.value !== 'undefined') {
      this.delerroruser = '';
      window.localStorage.setItem('rolenamelists', this.rolenamelist);
      window.localStorage.setItem('rolesname', 'rolenamelists');
      this.router.navigate(['/admin/users']);
    } else {
      this.delerroruser = 'USER_ROLES.SELECT_ROLE';
    }
  }
  getRoleName() {
    this.userRolesService.getRoleById(this.ROLE_ID)
      .subscribe(
      roles => {
        this.rolenamelist = roles.result.roleName;
      },
      error => {
        const status = JSON.parse(error['status']);
        this.statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            break;
        }
      });
  }
  onDeleteChange(roleId) {
    if (roleId !== 0 && roleId !== '0' && roleId !== undefined && roleId !== 'undefined') {
      this.deleteROLE_ID = roleId;
    } else {
      this.deleteROLE_ID = 0;
    }
  }
  deleteRole() {
    if (this.deleteROLE_ID !== undefined && this.deleteROLE_ID !== 0) {
      this.userRolesService.deleteRole(this.deleteROLE_ID, window.localStorage.getItem('token'))
        .subscribe(
        roles => {
          this.status = roles['statusCode'];
          this.roledelete = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.roledelete.value);
          this.hideSmallModal();
          this.onChange('undefined');
          this.getRolesList();
          this.clearRoleRights();
          this.analyticsreCheck();
          this.enterprisereCheck();
          this.dashboardreCheck();
          this.usersreCheck();
          this.rolerightsreCheck();
          this.fleetsreCheck();
          this.eventsreCheck();
          this.funfactsreCheck();
          this.reservesreCheck();
          this.importHistoryCheck();
          this.notificationsCheck();
          this.universalImagesCheck();
          this.staticContentsCheck();
          this.advertisementsCheck();
          this.lookupsreCheck();
          this.historysreCheck();
          this.registrationsreCheck();
          this.enterpriseResourcesreCheck();
          this.fleetTypeAttributesreCheck();
          this.fleetTypesreCheck();
          this.registrationsreCheck();
          this.displaymappingreCheck();
          this.billpaymentsreCheck();
          this.enterpriseContractDetailsreCheck();
          this.ROLE_IDs = 0;
          this.messagereCheck();
          this.callhistoryreCheck();
          this.applicationsCheck();
          this.appTypeAttributesCheck();
          this.audiencesCheck();
          this.auditTrailCheck();
          this.domainsCheck();
          this.emailTemplatesCheck();
          this.plansCheck();
          this.pickTicketsCheck();
        },
        error => {
          const statuscode = JSON.parse(error['_body']).statusCode;
          if (statuscode === '2013') {
            this.delerror = 'COMMON_VALIDATION_MESSAGES.VALID_DELETE_DEPENDENCY';
          }
        });
    } else if (this.ROLE_ID === 0) {
      this.delerror = 'USER_ROLES.SELECT_ROLE';
      this.delerroruser = '';
    } else {
      this.delerror = 'USER_ROLES.SELECT_ROLE';
      this.delerroruser = '';
    }
  }
  addRoles() {
    if (this.userrolename !== undefined && this.userrolename.trim().replace(/\s\s+/g, ' ') !== '' && this.userrolename !== null) {
      if (this.DISPLAY_NAME !== undefined && this.DISPLAY_NAME.trim().replace(/\s\s+/g, ' ') !== '' && this.DISPLAY_NAME !== null) {
        this.NAME = this.userrolename;
        if (this.ROLE_ID === undefined || this.ROLE_ID === 0) {
          this.deletecheckboxes();
          this.userrolename = this.autocase(this.userrolename.trim().replace(/\s\s+/g, ' '));
          this.DISPLAY_NAME = this.autocase(this.DISPLAY_NAME.trim().replace(/\s\s+/g, ' '));
          this.addUser = {
            'roleName': this.userrolename, 'roleDisplayName': this.DISPLAY_NAME,
            'enterprises': {
              'viewRights': this.enterprise_viewright, 'addRights': this.enterprise_addright,
              'editRights': this.enterprise_editright, 'listRights': this.enterprise_listright
              , 'activateRights': this.enterprise_activateright, 'inactivateRights': this.enterprise_inactivateright,
              'exportRights': this.enterprise_exportright, 'locateRights': this.enterprise_locateright
            },
            'callhistory': {
              'viewRights': this.callhistory_viewright, 'deleteRights': this.callhistory_deleteright,
              'exportRights': this.callhistory_exportright, 'listRights': this.callhistory_listright
            },
            'enterpriseResources': {
              'viewRights': this.enterprise_resources_viewright, 'addRights': this.enterprise_resources_addright,
              'editRights': this.enterprise_resources_editright, 'deleteRights': this.enterprise_resources_deleteright
              , 'listRights': this.enterprise_resources_listright, 'blockRights': this.enterprise_resources_blockright,
              'importRights': this.enterprise_resources_importright, 'unblockRights': this.enterprise_resources_unblockright,
              'exportRights': this.enterprise_resources_exportright, 'locateRights': this.enterprise_resources_locateright
            },
            'users': {
              'viewRights': this.users_viewright, 'addRights': this.users_addright,
              'editRights': this.users_editright, 'deleteRights': this.users_deleteright
              , 'listRights': this.users_listright, 'blockRights': this.users_blockright,
              'importRights': this.users_importright, 'unblockRights': this.users_unblockright,
              'exportRights': this.users_exportright, 'locateRights': this.users_locateright
            },
            'registrations': {
              'viewRights': this.registrations_viewright, 'addRights': this.registrations_addright,
              'editRights': this.registrations_editright, 'deleteRights': this.registrations_deleteright
              , 'listRights': this.registrations_listright, 'checkoutRights': this.registrations_checkoutright,
              'checkinRights': this.registrations_checkinright, 'locateRights': this.registrations_locateright,
              'exportRights': this.registrations_exportright, 'guidedCreateRights': this.registrations_guidedright
            },
            'importHistory': {
              'viewRights': this.importHistory_viewright, 'deleteRights': this.importHistory_deleteright
              , 'listRights': this.importHistory_listright,
              'exportRights': this.importHistory_exportright
            },
            'notifications': {
              'viewRights': this.notifctions_viewright, 'readRights': this.notifications_readright,
              'unreadRights': this.notifications_unreadright, 'deleteRights': this.notifications_deleteright
              , 'listRights': this.notifications_listright, 'exportRights': this.notifications_exportright
            },
            'universalImages': {
              'viewRights': this.universalImages_viewright, 'addRights': this.universalImages_addright,
              'editRights': this.universalImages_editright, 'deleteRights': this.universalImages_deleteright
              , 'listRights': this.universalImages_listright,
              'exportRights': this.universalImages_exportright
            },
            'enterpriseStaticContent': {
              'viewRights': this.staticContents_viewright, 'addRights': this.staticContents_addright,
              'editRights': this.staticContents_editright, 'deleteRights': this.staticContents_deleteright
              , 'listRights': this.staticContents_listright,
              'exportRights': this.staticContents_exportright
            },
            'advertisements': {
              'viewRights': this.advertisements_viewright, 'addRights': this.advertisements_addright,
              'editRights': this.advertisements_editright, 'deleteRights': this.advertisements_deleteright
              , 'listRights': this.advertisements_listright,
              'exportRights': this.advertisements_exportright
            },
            'roleRights': {
              'viewRights': this.rolerights_viewright, 'addRights': this.rolerights_addright,
              'editRights': this.rolerights_editright, 'deleteRights': this.rolerights_deleteright,
              'renameRights': this.rolerights_renameright
            },
            'fleets': {
              'viewRights': this.fleet_viewright, 'addRights': this.fleet_addright,
              'editRights': this.fleet_editright, 'deleteRights': this.fleet_deleteright
              , 'listRights': this.fleet_listright, 'locateRights': this.fleet_locateright,
              'importRights': this.fleet_importright,
              'exportRights': this.fleet_exportright
            },
            'fleetTypeAttributes': {
              'viewRights': this.fleet_type_attributes_viewright, 'addRights': this.fleet_type_attributes_addright,
              'editRights': this.fleet_type_attributes_editright, 'deleteRights': this.fleet_type_attributes_deleteright
              , 'listRights': this.fleet_type_attributes_listright,
              'exportRights': this.fleet_type_attributes_exportright
            },
            'fleetTypes': {
              'viewRights': this.fleet_types_viewright, 'addRights': this.fleet_types_addright,
              'editRights': this.fleet_types_editright, 'deleteRights': this.fleet_types_deleteright
              , 'listRights': this.fleet_types_listright,
              'exportRights': this.fleet_types_exportright
            },
            'lookups': {
              'viewRights': this.lookups_viewright, 'addRights': this.lookups_addright,
              'editRights': this.lookups_editright, 'deleteRights': this.lookups_deleteright
              , 'listRights': this.lookups_listright,
              'exportRights': this.lookups_exportright
            },
            'events': {
              'viewRights': this.events_viewright, 'addRights': this.events_addright,
              'editRights': this.events_editright, 'deleteRights': this.events_deleteright
              , 'listRights': this.events_listright, 'checkinRights': this.events_checkinright,
              'events_extendright': this.events_extendright, 'checkoutRights': this.events_checkoutright,
              'exportRights': this.events_exportright, 'locateRights': this.events_locateright,
              'cancelRights': this.events_cancelright, 'guidedCreateRights': this.events_guidedright
            },
            'feedback': {
              'addRights': this.feedback_addright, 'deleteRights': this.feedback_deleteright,
              'editRights': this.feedback_editright, 'exportRights': this.feedback_exportright,
              'listRights': this.feedback_listright, 'viewRights': this.feedback_viewright
            },
            'funfacts': {
              'viewRights': this.funfacts_viewright, 'addRights': this.funfacts_addright,
              'editRights': this.funfacts_editright, 'deleteRights': this.funfacts_deleteright
              , 'listRights': this.funfacts_listright,
              'importRights': this.funfacts_importright,
              'exportRights': this.funfacts_exportright
            },
            'help': {
              'addRights': this.help_addright, 'deleteRights': this.help_deleteright,
              'editRights': this.help_editright, 'exportRights': this.help_exportright,
              'listRights': this.help_listright, 'viewRights': this.help_viewright
            },
            'billPaymentHistory': {
              'viewRights': this.billpayment_viewright, 'addRights': this.billpayment_addright,
              'editRights': this.billpayment_editright, 'deleteRights': this.billpayment_deleteright,
              'listRights': this.billpayment_listright, 'exportRights': this.billpayment_exportright
            },
            'displayToMapSettings': {
              'viewRights': this.displaymap_viewright, 'addRights': this.displaymap_addright,
              'editRights': this.displaymap_editright,
              'listRights': this.displaymap_listright, 'exportRights': this.displaymap_exportright
            },
            'reservations': {
              'viewRights': this.reserve_viewright, 'addRights': this.reserve_addright,
              'editRights': this.reserve_editright, 'deleteRights': this.reserve_deleteright
              , 'listRights': this.reserve_listright, 'checkinRights': this.reserve_checkinright,
              'extendRights': this.reserve_extendright, 'checkoutRights': this.reserve_checkoutright,
              'exportRights': this.reserve_exportright, 'cancelRights': this.reserve_cancelright,
              'locateRights': this.reserve_locateright, 'guidedCreateRights': this.reserve_guidedright
            },
            'loginHistory': {
              'viewRights': this.loghistory_viewright, 'deleteRights': this.loghistory_deleteright,
              'listRights': this.loghistory_listright, 'exportRights': this.loghistory_exportright
            },
            'messageHistory': {
              'addRights': this.message_addright, 'deleteRights': this.message_deleteright,
              'exportRights': this.message_exportright, 'listRights': this.message_listright,
              'viewRights': this.message_viewright,
            },
            'enterpriseContractDetails': {
              'addRights': this.enterpriseContractDetails_addright, 'deleteRights': this.enterpriseContractDetails_deleteright,
              'editRights': this.enterpriseContractDetails_editright, 'exportRights': this.enterpriseContractDetails_exportright,
              'listRights': this.enterpriseContractDetails_listright, 'viewRights': this.enterpriseContractDetails_viewright
            },
            // 'analytics': {
            //   'report1': this.an_report1, 'report2': this.an_report2
            // },
            'pickTickets': {
              'viewRights': this.pickTickets_viewright, 'assignRights': this.pickTickets_assignright,
              'editRights': this.pickTickets_editright, 'deleteRights': this.pickTickets_deleteright,
              'listRights': this.pickTickets_listright, 'exportRights': this.pickTickets_exportright,
              'locateRights': this.pickTickets_locateright, 'cancelRights': this.pickTickets_cancelright
            },
            'dashboard': {
              'enterpriseResourcesAllRights': this.enterpriseResourcesAllRights_viewright,
              'enterpriseResourcesTotalActive': this.enterpriseResourcesTotalActive_viewright,
              'enterpriseResourcesTotalInactive': this.enterpriseResourcesTotalInactive_viewright,
              'eventRegistrationsAll': this.eventRegistrationsAll_viewright,
              'eventRegistrationsAveragePerEvent': this.eventRegistrationsAveragePerEvent_viewright,
              'eventRegistrationsAveragePerFleet': this.eventRegistrationsAveragePerFleet_viewright,
              'eventsAveragePerFleet': this.eventsAveragePerFleet_viewright,
              'eventsAll': this.eventsAll_viewright,
              'fleetsAll': this.fleetsAll_viewright,
              'fleetHoursAverageReservedPerFleet': this.fleetHoursAverageReservedPerFleet_viewright,
              'fleetHoursTotalReservable': this.fleetHoursTotalReservable_viewright,
              'fleetHoursTotalReserved': this.fleetHoursTotalReserved_viewright,
              'fleetReservationsAll': this.fleetReservationsAll_viewright,
              'fleetReservationsAveragePerFleet': this.fleetReservationsAveragePerFleet_viewright,
              'fleetsTotalActive': this.fleetsTotalActive_viewright,
              'fleetsTotalInactive': this.fleetsTotalInactive_viewright,
              'fleetsTotalNonTransactable': this.fleetsTotalNonTransactable_viewright,
              'fleetsTotalTransactable': this.fleetsTotalTransactable_viewright,
              'fleetUsage': this.fleetUsage_viewright,
              'pieChartsByCountry': this.pieChartsByCountry_viewright,
              'userActivity': this.userActivity_viewright,
              'usersAll': this.usersAll_viewright,
              'userHoursActualAveragePerUser': this.userHoursActualAveragePerUser_viewright,
              'userHoursTotalActual': this.userHoursTotalActual_viewright,
              'userHoursTotalPotential': this.userHoursTotalPotential_viewright,
              'usersTotalActive': this.usersTotalActive_viewright,
              'usersTotalInactive': this.usersTotalInactive_viewright
            }
            // 'applications': {
            //   'viewRights': this.applications_viewright, 'addRights': this.applications_addright,
            //   'editRights': this.applications_editright, 'deleteRights': this.applications_deleteright,
            //   'listRights': this.applications_listright, 'exportRights': this.applications_exportright,
            //   'activateRights': this.applications_activateright, 'inactivateRights': this.applications_inactivateright,
            //   'analyticsRights': this.applications_analyticsright, 'cloneRights': this.applications_cloneright,
            //   'implementRights': this.applications_implementright, 'previewRights': this.applications_previewright
            // },
            // 'appTypeAttributes': {
            //   'viewRights': this.appTypeAttributes_viewright, 'addRights': this.appTypeAttributes_addright,
            //   'editRights': this.appTypeAttributes_editright, 'deleteRights': this.appTypeAttributes_deleteright,
            //   'listRights': this.appTypeAttributes_listright, 'exportRights': this.appTypeAttributes_exportright
            // },
            // 'audiences': {
            //   'viewRights': this.audiences_viewright, 'deleteRights': this.audiences_deleteright,
            //   'listRights': this.audiences_listright, 'exportRights': this.audiences_exportright
            // },
            // 'auditTrail': {
            //   'viewRights': this.auditTrail_viewright,'listRights': this.auditTrail_listright,
            //   'exportRights': this.auditTrail_exportright
            // },
            // 'domains': {
            //   'addRights': this.domains_addright, 'deleteRights': this.domains_deleteright,
            //   'listRights': this.domains_listright, 'exportRights': this.domains_exportright,
            //   'activateRights': this.domains_activateright, 'inactivateRights': this.domains_inactivateright,
            //   'analyticsRights': this.domains_analyticsright, 'addtoplanRights': this.domains_addtoplanright,
            //   'removefromplanRights': this.domains_removefromplanright
            // },
            // 'emailTemplates': {
            //   'viewRights': this.emailTemplates_viewright, 'addRights': this.emailTemplates_addright,
            //   'editRights': this.emailTemplates_editright, 'deleteRights': this.emailTemplates_deleteright,
            //   'listRights': this.emailTemplates_listright, 'exportRights': this.emailTemplates_exportright,
            //   'activateRights': this.emailTemplates_activateright, 'inactivateRights': this.emailTemplates_inactivateright,
            //   'analyticsRights': this.emailTemplates_analyticsright
            // },
            // 'plans': {
            //   'viewRights': this.plans_viewright, 'addRights': this.plans_addright,
            //   'editRights': this.plans_editright, 'deleteRights': this.plans_deleteright,
            //   'listRights': this.plans_listright, 'exportRights': this.plans_exportright,
            //   'analyticsRights': this.plans_analyticsright
            // }
          };
          this.userRolesService.saveRoles(this.addUser, window.localStorage.getItem('token'))
            .subscribe(
            roles => {

              localStorage.setItem('rolesave', 'save');
              this.myModal.hide();
              this.rolesavesuccess = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
              this.toastr.success(this.rolesavesuccess.value);
              this.deletecheckboxes();
              this.NAME = undefined;
              this.DISPLAY_NAME = '';
              this.userrolename = '';
              this.delerroruser = '';
              this.rolesList.length = 0;
            },
            error => {
              switch (JSON.parse(error['_body']).statusCode) {
                case '2033':
                  this.addroleerror = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                  this.delerroruser = '';
                  break;
              }

            });
        } else if (this.ROLE_ID !== 0) {
          this.userRolesService.getUsersRolesRights(this.ROLE_ID, window.localStorage.getItem('token'))
            .subscribe(
            roles => {
              const a = roles;
              this.addUser = a['result'];
              this.addUser._id = '';
              this.addUser.roleName = this.userrolename;
              this.DISPLAY_NAME = this.autocase(this.DISPLAY_NAME);
              this.addUser.roleDisplayName = this.DISPLAY_NAME;
              this.userRolesService.saveRoles(this.addUser, window.localStorage.getItem('token'))
                .subscribe(
                data => {
                  localStorage.setItem('rolesave', 'save');
                  this.myModal.hide();
                  this.rolesavesuccess = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
                  this.toastr.success(this.rolesavesuccess.value);
                  this.deletecheckboxes();
                  this.NAME = undefined;
                  this.DISPLAY_NAME = '';
                  this.userrolename = '';
                  this.delerroruser = '';
                  this.rolesList.length = 0;
                },
                error => {
                  switch (JSON.parse(error['_body']).statusCode) {
                    case '2033':
                      this.addroleerror = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                      this.delerroruser = '';
                      break;

                  }

                });
            }, error => {

            });
        }
      } else {
        this.addroleerror = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
        this.delerroruser = '';
      }
    } else {
      this.addroleerror = 'USER_ROLES.VALID_NOBLANK_ROLE_NAME';
      this.delerroruser = '';
    }
  }
  getRoleById() {
    if (this.ROLE_ID !== 0 && this.ROLE_ID !== undefined) {
      this.renameerror = '';
      this.delerroruser = '';
      this.userRolesService.getRoleById(this.ROLE_ID)
        .subscribe(
        roles => {
          this.userrolename = roles.result.roleName;
          this.DISPLAY_NAME = roles.result.roleDisplayName;
          this.DISPLAY_NAME_VALUE = roles.result.roleDisplayName;
          this.ROLE_ID = roles.result._id;
        },
        error => {
          const status = JSON.parse(error['status']);
          this.statuscode = JSON.parse(error['_body']).status;
          switch (status) {
            case 500:
              break;
            case 400:
              break;
          }
        });
    } else {
      this.renameerror = 'USER_ROLES.SELECT_ROLE';
      this.delerroruser = '';
    }
  }
  closerenamepopup() {
    this.largeModal.hide();
    this.Close();
  }
  renameRole() {
    if (this.ROLE_ID !== undefined && this.ROLE_ID !== null && this.ROLE_ID !== 0) {
      this.renameerror = '';
      this.delerroruser = '';
      if (this.DISPLAY_NAME !== undefined &&
        this.DISPLAY_NAME.trim().replace(/\s\s+/g, ' ') !== '' && this.DISPLAY_NAME !== null) {
        this.DISPLAY_NAME = this.autocase(this.DISPLAY_NAME.trim().replace(/\s\s+/g, ' '));
        this.renameerror = '';
        this.userRolesService.renameRole(this.ROLE_ID, this.DISPLAY_NAME)
          .subscribe(
          roles => {
            localStorage.setItem('renamerole', 'renamerole');
            this.NAME = undefined;
            this.renamesuccess = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
            this.toastr.success(this.renamesuccess.value);
            this.largeModal.hide();
            this.clearRoleRights();
            this.analyticsreCheck();
            this.enterprisereCheck();
            this.usersreCheck();
            this.rolerightsreCheck();
            this.fleetsreCheck();
            this.eventsreCheck();
            this.funfactsreCheck();
            this.reservesreCheck();
            this.importHistoryCheck();
            this.notificationsCheck();
            this.universalImagesCheck();
            this.staticContentsCheck();
            this.advertisementsCheck();
            this.lookupsreCheck();
            this.historysreCheck();
            this.registrationsreCheck();
            this.enterpriseResourcesreCheck();
            this.fleetTypeAttributesreCheck();
            this.fleetTypesreCheck();
            this.registrationsreCheck();
            this.messagereCheck();
            this.callhistoryreCheck();
            this.deletecheckboxes();
            this.displaymappingreCheck();
            this.billpaymentsreCheck();
            this.enterpriseContractDetailsreCheck();
            this.dashboardreCheck();
            this.applicationsCheck();
            this.appTypeAttributesCheck();
            this.audiencesCheck();
            this.auditTrailCheck();
            this.domainsCheck();
            this.emailTemplatesCheck();
            this.plansCheck();
            this.pickTicketsCheck();
            this.NAME = undefined;
            this.DISPLAY_NAME = '';
            this.userrolename = '';
            this.delerroruser = '';
            this.rolesList.length = 0;
            this.getUsersRolesRights();
            this.userRolesService.getRoleById(this.ROLE_ID)
              .subscribe(
              roless => {
                this.userrolename = roless.result.roleName;
                this.DISPLAY_NAME = roless.result.roleDisplayName;
                this.ROLE_ID = roless.result._id;
              },
              error => {
                const status = JSON.parse(error['status']);
                this.statuscode = JSON.parse(error['_body']).status;
                switch (status) {
                  case 500:
                    break;
                  case 400:
                    // this.toastr.success('');
                    break;
                }
              });
          },
          error => {
            switch (JSON.parse(error['_body']).statusCode) {
              case '2033':
                this.renameerror = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                // this.errorrolename = '';
                break;
              case '9961':
                window.localStorage.removeItem('token');
                this.router.navigate(['/pages/login']);
                break;
            }
          });
      } else {
        this.renameerror = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
        this.delerroruser = '';
      }
    } else {
      this.renameerror = 'USER_ROLES.SELECT_ROLE';
      this.delerroruser = '';
    }
  }
  discardChanges() {
    this.clearRoleRights();
    this.analyticsreCheck();
    this.enterprisereCheck();
    this.usersreCheck();
    this.rolerightsreCheck();
    this.fleetsreCheck();
    this.eventsreCheck();
    this.funfactsreCheck();
    this.reservesreCheck();
    this.importHistoryCheck();
    this.notificationsCheck();
    this.universalImagesCheck();
    this.staticContentsCheck();
    this.advertisementsCheck();
    this.lookupsreCheck();
    this.historysreCheck();
    this.registrationsreCheck();
    this.enterpriseResourcesreCheck();
    this.fleetTypeAttributesreCheck();
    this.fleetTypesreCheck();
    this.registrationsreCheck();
    this.dangerModal.hide();
    this.getUsersRolesRights();
    this.messagereCheck();
    this.callhistoryreCheck();
    this.displaymappingreCheck();
    this.billpaymentsreCheck();
    this.enterpriseContractDetailsreCheck();
    this.dashboardreCheck();
  }

  updateUserRoles() {
    this.delete_role = <HTMLInputElement>document.getElementById('selectrole');
    this.ROLE_ID = this.delete_role.value;
    if (this.delete_role.value === undefined || this.delete_role.value === 0 || this.delete_role.value === 'undefined') {
      this.updateerror = 'USER_ROLES.SELECT_ROLE';

    } else {
      // this.userRoles.analytics.report1 = this.an_report1;
      // this.userRoles.analytics.report2 = this.an_report2;

      this.userRoles.callHistory.viewRights = this.callhistory_viewright;
      this.userRoles.callHistory.deleteRights = this.callhistory_deleteright;
      this.userRoles.callHistory.listRights = this.callhistory_listright;
      this.userRoles.callHistory.exportRights = this.callhistory_exportright;

      this.userRoles.enterprises.viewRights = this.enterprise_viewright;
      this.userRoles.enterprises.addRights = this.enterprise_addright;
      this.userRoles.enterprises.activateRights = this.enterprise_activateright;
      this.userRoles.enterprises.inactivateRights = this.enterprise_inactivateright;
      this.userRoles.enterprises.locateRights = this.enterprise_locateright;
      this.userRoles.enterprises.editRights = this.enterprise_editright;
      this.userRoles.enterprises.listRights = this.enterprise_listright;
      this.userRoles.enterprises.exportRights = this.enterprise_exportright;


      this.userRoles.enterpriseResources.viewRights = this.enterprise_resources_viewright;
      this.userRoles.enterpriseResources.addRights = this.enterprise_resources_addright;
      this.userRoles.enterpriseResources.editRights = this.enterprise_resources_editright;
      this.userRoles.enterpriseResources.deleteRights = this.enterprise_resources_deleteright;
      this.userRoles.enterpriseResources.listRights = this.enterprise_resources_listright;
      this.userRoles.enterpriseResources.importRights = this.enterprise_resources_importright;
      this.userRoles.enterpriseResources.exportRights = this.enterprise_resources_exportright;
      this.userRoles.enterpriseResources.blockRights = this.enterprise_resources_blockright;
      this.userRoles.enterpriseResources.unblockRights = this.enterprise_resources_unblockright;
      this.userRoles.enterpriseResources.locateRights = this.enterprise_resources_locateright;

      this.userRoles.users.viewRights = this.users_viewright;
      this.userRoles.users.addRights = this.users_addright;
      this.userRoles.users.editRights = this.users_editright;
      this.userRoles.users.deleteRights = this.users_deleteright;
      this.userRoles.users.listRights = this.users_listright;
      this.userRoles.users.importRights = this.users_importright;
      this.userRoles.users.exportRights = this.users_exportright;
      this.userRoles.users.blockRights = this.users_blockright;
      this.userRoles.users.unblockRights = this.users_unblockright;
      this.userRoles.users.locateRights = this.users_locateright;

      this.userRoles.roleRights.viewRights = this.rolerights_viewright;
      this.userRoles.roleRights.addRights = this.rolerights_addright;
      this.userRoles.roleRights.editRights = this.rolerights_editright;
      this.userRoles.roleRights.deleteRights = this.rolerights_deleteright;
      this.userRoles.roleRights.renameRights = this.rolerights_renameright;


      this.userRoles.fleets.viewRights = this.fleet_viewright;
      this.userRoles.fleets.addRights = this.fleet_addright;
      this.userRoles.fleets.editRights = this.fleet_editright;
      this.userRoles.fleets.deleteRights = this.fleet_deleteright;
      this.userRoles.fleets.listRights = this.fleet_listright;
      this.userRoles.fleets.importRights = this.fleet_importright;
      this.userRoles.fleets.exportRights = this.fleet_exportright;
      this.userRoles.fleets.locateRights = this.fleet_locateright;

      this.userRoles.lookups.viewRights = this.lookups_viewright;
      this.userRoles.lookups.addRights = this.lookups_addright;
      this.userRoles.lookups.editRights = this.lookups_editright;
      this.userRoles.lookups.deleteRights = this.lookups_deleteright;
      this.userRoles.lookups.listRights = this.lookups_listright;
      this.userRoles.lookups.exportRights = this.lookups_exportright;

      this.userRoles.events.viewRights = this.events_viewright;
      this.userRoles.events.addRights = this.events_addright;
      this.userRoles.events.editRights = this.events_editright;
      this.userRoles.events.deleteRights = this.events_deleteright;
      this.userRoles.events.listRights = this.events_listright;
      this.userRoles.events.extendRights = this.events_extendright;
      this.userRoles.events.checkinRights = this.events_checkinright;
      this.userRoles.events.checkoutRights = this.events_checkoutright;
      this.userRoles.events.locateRights = this.events_locateright;
      this.userRoles.events.exportRights = this.events_exportright;
      this.userRoles.events.cancelRights = this.events_cancelright;
      this.userRoles.events.guidedCreateRights = this.events_guidedright;

      this.userRoles.feedback.addRights = this.feedback_addright;
      this.userRoles.feedback.deleteRights = this.feedback_deleteright;
      this.userRoles.feedback.editRights = this.feedback_editright;
      this.userRoles.feedback.exportRights = this.feedback_exportright;
      this.userRoles.feedback.listRights = this.feedback_listright;
      this.userRoles.feedback.viewRights = this.feedback_viewright;

      this.userRoles.funfacts.viewRights = this.funfacts_viewright;
      this.userRoles.funfacts.addRights = this.funfacts_addright;
      this.userRoles.funfacts.editRights = this.funfacts_editright;
      this.userRoles.funfacts.deleteRights = this.funfacts_deleteright;
      this.userRoles.funfacts.listRights = this.funfacts_listright;
      this.userRoles.funfacts.importRights = this.funfacts_importright;
      this.userRoles.funfacts.exportRights = this.funfacts_exportright;

      this.userRoles.help.addRights = this.help_addright;
      this.userRoles.help.deleteRights = this.help_deleteright;
      this.userRoles.help.editRights = this.help_editright;
      this.userRoles.help.exportRights = this.help_exportright;
      this.userRoles.help.listRights = this.help_listright;
      this.userRoles.help.viewRights = this.help_viewright;

      this.userRoles.billPaymentHistory.viewRights = this.billpayment_viewright;
      this.userRoles.billPaymentHistory.addRights = this.billpayment_addright;
      this.userRoles.billPaymentHistory.editRights = this.billpayment_editright;
      this.userRoles.billPaymentHistory.deleteRights = this.billpayment_deleteright;
      this.userRoles.billPaymentHistory.listRights = this.billpayment_listright;
      this.userRoles.billPaymentHistory.exportRights = this.billpayment_exportright;

      this.userRoles.displayToMapSettings.viewRights = this.displaymap_viewright;
      this.userRoles.displayToMapSettings.editRights = this.displaymap_editright;
      this.userRoles.displayToMapSettings.listRights = this.displaymap_listright;
      this.userRoles.displayToMapSettings.exportRights = this.displaymap_exportright;

      this.userRoles.enterpriseContractDetails.addRights = this.enterpriseContractDetails_addright;
      this.userRoles.enterpriseContractDetails.deleteRights = this.enterpriseContractDetails_deleteright;
      this.userRoles.enterpriseContractDetails.editRights = this.enterpriseContractDetails_editright;
      this.userRoles.enterpriseContractDetails.exportRights = this.enterpriseContractDetails_exportright;
      this.userRoles.enterpriseContractDetails.listRights = this.enterpriseContractDetails_listright;
      this.userRoles.enterpriseContractDetails.viewRights = this.enterpriseContractDetails_viewright;

      this.userRoles.reservations.viewRights = this.reserve_viewright;
      this.userRoles.reservations.addRights = this.reserve_addright;
      this.userRoles.reservations.editRights = this.reserve_editright;
      this.userRoles.reservations.deleteRights = this.reserve_deleteright;
      this.userRoles.reservations.listRights = this.reserve_listright;
      this.userRoles.reservations.extendRights = this.reserve_extendright;
      this.userRoles.reservations.checkinRights = this.reserve_checkinright;
      this.userRoles.reservations.checkoutRights = this.reserve_checkoutright;
      this.userRoles.reservations.cancelRights = this.reserve_cancelright;
      this.userRoles.reservations.locateRights = this.reserve_locateright;
      this.userRoles.reservations.exportRights = this.reserve_exportright;
      this.userRoles.reservations.guidedCreateRights = this.reserve_guidedright;

      this.userRoles.registrations.viewRights = this.registrations_viewright;
      this.userRoles.registrations.addRights = this.registrations_addright;
      this.userRoles.registrations.editRights = this.registrations_editright;
      this.userRoles.registrations.deleteRights = this.registrations_deleteright;
      this.userRoles.registrations.listRights = this.registrations_listright;
      this.userRoles.registrations.checkinRights = this.registrations_checkinright;
      this.userRoles.registrations.exportRights = this.registrations_exportright;
      this.userRoles.registrations.checkoutRights = this.registrations_checkoutright;
      this.userRoles.registrations.locateRights = this.registrations_locateright;
      this.userRoles.registrations.guidedCreateRights = this.registrations_guidedright;

      this.userRoles.importHistory.viewRights = this.importHistory_viewright;
      this.userRoles.importHistory.deleteRights = this.importHistory_deleteright;
      this.userRoles.importHistory.listRights = this.importHistory_listright;
      this.userRoles.importHistory.exportRights = this.importHistory_exportright;

      this.userRoles.notifications.viewRights = this.notifctions_viewright;
      this.userRoles.notifications.readRights = this.notifications_readright;
      this.userRoles.notifications.unreadRights = this.notifications_unreadright;
      this.userRoles.notifications.deleteRights = this.notifications_deleteright;
      this.userRoles.notifications.listRights = this.notifications_listright;
      this.userRoles.notifications.exportRights = this.notifications_exportright;


      this.userRoles.universalImages.viewRights = this.universalImages_viewright;
      this.userRoles.universalImages.addRights = this.universalImages_addright;
      this.userRoles.universalImages.editRights = this.universalImages_editright;
      this.userRoles.universalImages.deleteRights = this.universalImages_deleteright;
      this.userRoles.universalImages.listRights = this.universalImages_listright;
      this.userRoles.universalImages.exportRights = this.universalImages_exportright;

      this.userRoles.enterpriseStaticContent.viewRights = this.staticContents_viewright;
      this.userRoles.enterpriseStaticContent.addRights = this.staticContents_addright;
      this.userRoles.enterpriseStaticContent.editRights = this.staticContents_editright;
      this.userRoles.enterpriseStaticContent.deleteRights = this.staticContents_deleteright;
      this.userRoles.enterpriseStaticContent.listRights = this.staticContents_listright;
      this.userRoles.enterpriseStaticContent.exportRights = this.staticContents_exportright;

      this.userRoles.advertisements.viewRights = this.advertisements_viewright;
      this.userRoles.advertisements.addRights = this.advertisements_addright;
      this.userRoles.advertisements.editRights = this.advertisements_editright;
      this.userRoles.advertisements.deleteRights = this.advertisements_deleteright;
      this.userRoles.advertisements.listRights = this.advertisements_listright;
      this.userRoles.advertisements.exportRights = this.advertisements_exportright;

      this.userRoles.fleetTypeAttributes.viewRights = this.fleet_type_attributes_viewright;
      this.userRoles.fleetTypeAttributes.addRights = this.fleet_type_attributes_addright;
      this.userRoles.fleetTypeAttributes.editRights = this.fleet_type_attributes_editright;
      this.userRoles.fleetTypeAttributes.deleteRights = this.fleet_type_attributes_deleteright;
      this.userRoles.fleetTypeAttributes.listRights = this.fleet_type_attributes_listright;
      this.userRoles.fleetTypeAttributes.exportRights = this.fleet_type_attributes_exportright;

      this.userRoles.fleetTypes.viewRights = this.fleet_types_viewright;
      this.userRoles.fleetTypes.addRights = this.fleet_types_addright;
      this.userRoles.fleetTypes.editRights = this.fleet_types_editright;
      this.userRoles.fleetTypes.deleteRights = this.fleet_types_deleteright;
      this.userRoles.fleetTypes.listRights = this.fleet_types_listright;
      this.userRoles.fleetTypes.exportRights = this.fleet_types_exportright;

      this.userRoles.loginHistory.viewRights = this.loghistory_viewright;
      this.userRoles.loginHistory.deleteRights = this.loghistory_deleteright;
      this.userRoles.loginHistory.listRights = this.loghistory_listright;
      this.userRoles.loginHistory.exportRights = this.loghistory_exportright;

      this.userRoles.messageHistory.viewRights = this.message_viewright;
      this.userRoles.messageHistory.deleteRights = this.message_deleteright;
      this.userRoles.messageHistory.listRights = this.message_listright;
      this.userRoles.messageHistory.exportRights = this.message_exportright;
      this.userRoles.messageHistory.addRights = this.message_addright;

      this.userRoles.pickTickets.viewRights = this.pickTickets_viewright;
      this.userRoles.pickTickets.assignRights = this.pickTickets_assignright;
      this.userRoles.pickTickets.editRights = this.pickTickets_editright;
      this.userRoles.pickTickets.deleteRights = this.pickTickets_deleteright;
      this.userRoles.pickTickets.listRights = this.pickTickets_listright;
      this.userRoles.pickTickets.cancelRights = this.pickTickets_cancelright;
      this.userRoles.pickTickets.exportRights = this.pickTickets_exportright;
      this.userRoles.pickTickets.locateRights = this.pickTickets_locateright;

      this.userRoles.dashboard.enterpriseResourcesAllRights = this.enterpriseResourcesAllRights_viewright;
      this.userRoles.dashboard.enterpriseResourcesTotalActive = this.enterpriseResourcesTotalActive_viewright;
      this.userRoles.dashboard.enterpriseResourcesTotalInactive = this.enterpriseResourcesTotalInactive_viewright;
      this.userRoles.dashboard.eventRegistrationsAll = this.eventRegistrationsAll_viewright;
      this.userRoles.dashboard.eventRegistrationsAveragePerEvent = this.eventRegistrationsAveragePerEvent_viewright;
      this.userRoles.dashboard.eventRegistrationsAveragePerFleet = this.eventRegistrationsAveragePerFleet_viewright;
      this.userRoles.dashboard.eventsAveragePerFleet = this.eventsAveragePerFleet_viewright;
      this.userRoles.dashboard.eventsAll = this.eventsAll_viewright;
      this.userRoles.dashboard.fleetsAll = this.fleetsAll_viewright;
      this.userRoles.dashboard.fleetHoursAverageReservedPerFleet = this.fleetHoursAverageReservedPerFleet_viewright;
      this.userRoles.dashboard.fleetHoursTotalReservable = this.fleetHoursTotalReservable_viewright;
      this.userRoles.dashboard.fleetHoursTotalReserved = this.fleetHoursTotalReserved_viewright;
      this.userRoles.dashboard.fleetReservationsAll = this.fleetReservationsAll_viewright;
      this.userRoles.dashboard.fleetReservationsAveragePerFleet = this.fleetReservationsAveragePerFleet_viewright;
      this.userRoles.dashboard.fleetsTotalActive = this.fleetsTotalActive_viewright;
      this.userRoles.dashboard.fleetsTotalInactive = this.fleetsTotalInactive_viewright;
      this.userRoles.dashboard.fleetsTotalNonTransactable = this.fleetsTotalNonTransactable_viewright;
      this.userRoles.dashboard.fleetsTotalTransactable = this.fleetsTotalTransactable_viewright;
      this.userRoles.dashboard.fleetUsage = this.fleetUsage_viewright;
      this.userRoles.dashboard.pieChartsByCountry = this.pieChartsByCountry_viewright;
      this.userRoles.dashboard.userActivity = this.userActivity_viewright;
      this.userRoles.dashboard.usersAll = this.usersAll_viewright;
      this.userRoles.dashboard.userHoursActualAveragePerUser = this.userHoursActualAveragePerUser_viewright;
      this.userRoles.dashboard.userHoursTotalActual = this.userHoursTotalActual_viewright;
      this.userRoles.dashboard.userHoursTotalPotential = this.userHoursTotalPotential_viewright;
      this.userRoles.dashboard.usersTotalActive = this.usersTotalActive_viewright;
      this.userRoles.dashboard.usersTotalInactive = this.usersTotalInactive_viewright;

      // this.userRoles.applications.viewRights = this.applications_viewright;
      // this.userRoles.applications.addRights = this.applications_addright;
      // this.userRoles.applications.editRights = this.applications_editright;
      // this.userRoles.applications.deleteRights = this.applications_deleteright;
      // this.userRoles.applications.listRights = this.applications_listright;
      // this.userRoles.applications.exportRights = this.applications_exportright;
      // this.userRoles.applications.activateRights = this.applications_activateright;
      // this.userRoles.applications.analyticsRights = this.applications_analyticsright;
      // this.userRoles.applications.cloneRights = this.applications_cloneright;
      // this.userRoles.applications.implementRights = this.applications_implementright;
      // this.userRoles.applications.inactivateRights = this.applications_inactivateright;
      // this.userRoles.applications.previewRights = this.applications_previewright;

      // this.userRoles.appTypeAttributes.viewRights = this.appTypeAttributes_viewright;
      // this.userRoles.appTypeAttributes.addRights = this.appTypeAttributes_addright;
      // this.userRoles.appTypeAttributes.editRights = this.appTypeAttributes_editright;
      // this.userRoles.appTypeAttributes.deleteRights = this.appTypeAttributes_deleteright;
      // this.userRoles.appTypeAttributes.listRights = this.appTypeAttributes_listright;
      // this.userRoles.appTypeAttributes.exportRights = this.appTypeAttributes_exportright;

      // this.userRoles.audiences.viewRights = this.audiences_viewright;
      // this.userRoles.audiences.deleteRights = this.audiences_deleteright;
      // this.userRoles.audiences.listRights = this.audiences_listright;
      // this.userRoles.audiences.exportRights = this.audiences_exportright;

      // this.userRoles.auditTrail.viewRights = this.auditTrail_viewright;
      // this.userRoles.auditTrail.listRights = this.auditTrail_listright;
      // this.userRoles.auditTrail.exportRights = this.auditTrail_exportright;

      // this.userRoles.domains.addRights = this.domains_addright;
      // this.userRoles.domains.deleteRights = this.domains_deleteright;
      // this.userRoles.domains.listRights = this.domains_listright;
      // this.userRoles.domains.exportRights = this.domains_exportright;
      // this.userRoles.domains.activateRights = this.domains_activateright;
      // this.userRoles.domains.analyticsRights = this.domains_analyticsright;
      // this.userRoles.domains.inactivateRights = this.domains_inactivateright;
      // this.userRoles.domains.addtoplanRights = this.domains_addtoplanright;
      // this.userRoles.domains.removefromplanRights = this.domains_removefromplanright;

      // this.userRoles.emailTemplates.viewRights = this.emailTemplates_viewright;
      // this.userRoles.emailTemplates.addRights = this.emailTemplates_addright;
      // this.userRoles.emailTemplates.editRights = this.emailTemplates_editright;
      // this.userRoles.emailTemplates.deleteRights = this.emailTemplates_deleteright;
      // this.userRoles.emailTemplates.listRights = this.emailTemplates_listright;
      // this.userRoles.emailTemplates.exportRights = this.emailTemplates_exportright;
      // this.userRoles.emailTemplates.activateRights = this.emailTemplates_activateright;
      // this.userRoles.emailTemplates.analyticsRights = this.emailTemplates_analyticsright;
      // this.userRoles.emailTemplates.inactivateRights = this.emailTemplates_inactivateright;

      // this.userRoles.plans.viewRights = this.plans_viewright;
      // this.userRoles.plans.addRights = this.plans_addright;
      // this.userRoles.plans.editRights = this.plans_editright;
      // this.userRoles.plans.deleteRights = this.plans_deleteright;
      // this.userRoles.plans.listRights = this.plans_listright;
      // this.userRoles.plans.exportRights = this.plans_exportright;
      // this.userRoles.plans.analyticsRights = this.plans_analyticsright;

      this.userRolesService.saveUserRolesRights(this.userRoles, window.localStorage.getItem('token'))
        .subscribe(
        roles => {
          this.infoModal.hide();
          this.renamesuccess = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.renamesuccess.value);
          // this.rolesList = roles;
        },
        error => this.errorMessage = <any>error);
    }
  }
  /*-- To get Single Role with Rights --*/
  getUsersRolesRights() {
    if (this.ROLE_ID === undefined) {

    } else {
      if (this.ROLE_ID > 0) {
        this.userRolesService.getUsersRolesRights(this.ROLE_ID, window.localStorage.getItem('token'))
          .subscribe(
          roles => {
            if (roles['statusCode'] === '1012') {
              this.userRoles = roles['result'];
              this.enterpriseResourcesAllRights_viewright = this.userRoles.dashboard.enterpriseResourcesAllRights;
              this.enterpriseResourcesTotalActive_viewright = this.userRoles.dashboard.enterpriseResourcesTotalActive;
              this.enterpriseResourcesTotalInactive_viewright = this.userRoles.dashboard.enterpriseResourcesTotalInactive;
              this.eventRegistrationsAll_viewright = this.userRoles.dashboard.eventRegistrationsAll;
              this.eventRegistrationsAveragePerEvent_viewright = this.userRoles.dashboard.eventRegistrationsAveragePerEvent;
              this.eventRegistrationsAveragePerFleet_viewright = this.userRoles.dashboard.eventRegistrationsAveragePerFleet;
              this.eventsAveragePerFleet_viewright = this.userRoles.dashboard.eventsAveragePerFleet;
              this.eventsAll_viewright = this.userRoles.dashboard.eventsAll;
              this.fleetsAll_viewright = this.userRoles.dashboard.fleetsAll;
              this.fleetHoursAverageReservedPerFleet_viewright = this.userRoles.dashboard.fleetHoursAverageReservedPerFleet;
              this.fleetHoursTotalReservable_viewright = this.userRoles.dashboard.fleetHoursTotalReservable;
              this.fleetHoursTotalReserved_viewright = this.userRoles.dashboard.fleetHoursTotalReserved;
              this.fleetReservationsAll_viewright = this.userRoles.dashboard.fleetReservationsAll;
              this.fleetReservationsAveragePerFleet_viewright = this.userRoles.dashboard.fleetReservationsAveragePerFleet;
              this.fleetsTotalActive_viewright = this.userRoles.dashboard.fleetsTotalActive;
              this.fleetsTotalInactive_viewright = this.userRoles.dashboard.fleetsTotalInactive;
              this.fleetsTotalNonTransactable_viewright = this.userRoles.dashboard.fleetsTotalNonTransactable;
              this.fleetsTotalTransactable_viewright = this.userRoles.dashboard.fleetsTotalTransactable;
              this.fleetUsage_viewright = this.userRoles.dashboard.fleetUsage;
              this.pieChartsByCountry_viewright = this.userRoles.dashboard.pieChartsByCountry;
              this.userActivity_viewright = this.userRoles.dashboard.userActivity;
              this.usersAll_viewright = this.userRoles.dashboard.usersAll;
              this.userHoursActualAveragePerUser_viewright = this.userRoles.dashboard.userHoursActualAveragePerUser;
              this.userHoursTotalActual_viewright = this.userRoles.dashboard.userHoursTotalActual;
              this.userHoursTotalPotential_viewright = this.userRoles.dashboard.userHoursTotalPotential;
              this.usersTotalActive_viewright = this.userRoles.dashboard.usersTotalActive;
              this.usersTotalInactive_viewright = this.userRoles.dashboard.usersTotalInactive;
              this.dashboardreCheck();
              // this.an_report1 = this.userRoles.analytics.report1;
              // this.an_report2 = this.userRoles.analytics.report2;
               this.analyticsreCheck();

              this.callhistory_viewright = this.userRoles.callHistory.viewRights;
              this.callhistory_deleteright = this.userRoles.callHistory.deleteRights;
              this.callhistory_listright = this.userRoles.callHistory.listRights;
              this.callhistory_exportright = this.userRoles.callHistory.exportRights;
              this.callhistoryreCheck();

              this.enterprise_viewright = this.userRoles.enterprises.viewRights;
              this.enterprise_addright = this.userRoles.enterprises.addRights;
              this.enterprise_editright = this.userRoles.enterprises.editRights;
              this.enterprise_activateright = this.userRoles.enterprises.activateRights;
              this.enterprise_listright = this.userRoles.enterprises.listRights;
              this.enterprise_inactivateright = this.userRoles.enterprises.inactivateRights;
              this.enterprise_exportright = this.userRoles.enterprises.exportRights;
              this.enterprise_locateright = this.userRoles.enterprises.locateRights;
              this.enterprisereCheck();

              this.enterprise_resources_viewright = this.userRoles.enterpriseResources.viewRights;
              this.enterprise_resources_addright = this.userRoles.enterpriseResources.addRights;
              this.enterprise_resources_editright = this.userRoles.enterpriseResources.editRights;
              this.enterprise_resources_deleteright = this.userRoles.enterpriseResources.deleteRights;
              this.enterprise_resources_listright = this.userRoles.enterpriseResources.listRights;
              this.enterprise_resources_importright = this.userRoles.enterpriseResources.importRights;
              this.enterprise_resources_exportright = this.userRoles.enterpriseResources.exportRights;
              this.enterprise_resources_blockright = this.userRoles.enterpriseResources.blockRights;
              this.enterprise_resources_unblockright = this.userRoles.enterpriseResources.unblockRights;
              this.enterprise_resources_locateright = this.userRoles.enterpriseResources.locateRights;
              this.enterpriseResourcesreCheck();

              this.users_viewright = this.userRoles.users.viewRights;
              this.users_addright = this.userRoles.users.addRights;
              this.users_editright = this.userRoles.users.editRights;
              this.users_deleteright = this.userRoles.users.deleteRights;
              this.users_listright = this.userRoles.users.listRights;
              this.users_importright = this.userRoles.users.importRights;
              this.users_exportright = this.userRoles.users.exportRights;
              this.users_blockright = this.userRoles.users.blockRights;
              this.users_unblockright = this.userRoles.users.unblockRights;
              this.users_locateright = this.userRoles.users.locateRights;
              this.usersreCheck();

              this.rolerights_viewright = this.userRoles.roleRights.viewRights;
              this.rolerights_addright = this.userRoles.roleRights.addRights;
              this.rolerights_editright = this.userRoles.roleRights.editRights;
              this.rolerights_deleteright = this.userRoles.roleRights.deleteRights;
              this.rolerights_renameright = this.userRoles.roleRights.renameRights;
              this.rolerightsreCheck();

              this.fleet_viewright = this.userRoles.fleets.viewRights;
              this.fleet_addright = this.userRoles.fleets.addRights;
              this.fleet_editright = this.userRoles.fleets.editRights;
              this.fleet_deleteright = this.userRoles.fleets.deleteRights;
              this.fleet_listright = this.userRoles.fleets.listRights;
              this.fleet_importright = this.userRoles.fleets.importRights;
              this.fleet_exportright = this.userRoles.fleets.exportRights;
              this.fleet_locateright = this.userRoles.fleets.locateRights;
              this.fleetsreCheck();

              this.lookups_viewright = this.userRoles.lookups.viewRights;
              this.lookups_addright = this.userRoles.lookups.addRights;
              this.lookups_editright = this.userRoles.lookups.editRights;
              this.lookups_deleteright = this.userRoles.lookups.deleteRights;
              this.lookups_listright = this.userRoles.lookups.listRights;
              this.events_viewright = this.userRoles.events.viewRights;
              this.events_addright = this.userRoles.events.addRights;
              this.events_editright = this.userRoles.events.editRights;
              this.events_deleteright = this.userRoles.events.deleteRights;
              this.events_checkinright = this.userRoles.events.checkinRights;
              this.events_checkoutright = this.userRoles.events.checkoutRights;
              this.events_cancelright = this.userRoles.events.cancelRights;
              this.events_locateright = this.userRoles.events.locateRights;
              this.events_listright = this.userRoles.events.listRights;
              this.events_extendright = this.userRoles.events.extendRights;
              this.events_exportright = this.userRoles.events.exportRights;
              this.events_guidedright = this.userRoles.events.guidedCreateRights;
              this.eventsreCheck();

              this.feedback_addright = this.userRoles.feedback.addRights;
              this.feedback_deleteright = this.userRoles.feedback.deleteRights;
              this.feedback_exportright = this.userRoles.feedback.exportRights;
              this.feedback_editright = this.userRoles.feedback.editRights;
              this.feedback_listright = this.userRoles.feedback.listRights;
              this.feedback_viewright = this.userRoles.feedback.viewRights;
              this.feedbackreCheck();

              this.funfacts_viewright = this.userRoles.funfacts.viewRights;
              this.funfacts_addright = this.userRoles.funfacts.addRights;
              this.funfacts_editright = this.userRoles.funfacts.editRights;
              this.funfacts_deleteright = this.userRoles.funfacts.deleteRights;
              this.funfacts_listright = this.userRoles.funfacts.listRights;
              this.funfacts_importright = this.userRoles.funfacts.importRights;
              this.funfacts_exportright = this.userRoles.funfacts.exportRights;
              this.funfactsreCheck();

              this.help_addright = this.userRoles.help.addRights;
              this.help_deleteright = this.userRoles.help.deleteRights;
              this.help_editright = this.userRoles.help.exportRights;
              this.help_exportright = this.userRoles.help.editRights;
              this.help_listright = this.userRoles.help.listRights;
              this.help_viewright = this.userRoles.help.viewRights;
              this.helpreCheck();

              this.reserve_viewright = this.userRoles.reservations.viewRights;
              this.reserve_addright = this.userRoles.reservations.addRights;
              this.reserve_editright = this.userRoles.reservations.editRights;
              this.reserve_deleteright = this.userRoles.reservations.deleteRights;
              this.reserve_listright = this.userRoles.reservations.listRights;
              this.reserve_cancelright = this.userRoles.reservations.cancelRights;
              this.reserve_exportright = this.userRoles.reservations.exportRights;
              this.reserve_checkinright = this.userRoles.reservations.checkinRights;
              this.reserve_checkoutright = this.userRoles.reservations.checkoutRights;
              this.reserve_extendright = this.userRoles.reservations.exportRights;
              this.reserve_locateright = this.userRoles.reservations.locateRights;
              this.reserve_guidedright = this.userRoles.reservations.guidedCreateRights;
              this.reservesreCheck();
              this.registrations_viewright = this.userRoles.registrations.viewRights;
              this.registrations_addright = this.userRoles.registrations.addRights;
              this.registrations_editright = this.userRoles.registrations.editRights;
              this.registrations_deleteright = this.userRoles.registrations.deleteRights;
              this.registrations_listright = this.userRoles.registrations.listRights;
              this.registrations_checkinright = this.userRoles.registrations.checkinRights;
              this.registrations_checkoutright = this.userRoles.registrations.checkoutRights;
              this.registrations_locateright = this.userRoles.registrations.locateRights;
              this.registrations_exportright = this.userRoles.registrations.exportRights;
              this.registrations_guidedright = this.userRoles.registrations.guidedCreateRights;
              this.registrationsreCheck();
              this.importHistory_viewright = this.userRoles.importHistory.viewRights;
              this.importHistory_deleteright = this.userRoles.importHistory.deleteRights;
              this.importHistory_listright = this.userRoles.importHistory.listRights;
              this.importHistory_exportright = this.userRoles.importHistory.exportRights;
              this.importHistoryCheck();
              this.notifctions_viewright = this.userRoles.notifications.viewRights;
              this.notifications_readright = this.userRoles.notifications.readRights;
              this.notifications_unreadright = this.userRoles.notifications.unreadRights;
              this.notifications_deleteright = this.userRoles.notifications.deleteRights;
              this.notifications_listright = this.userRoles.notifications.listRights;
              this.notifications_exportright = this.userRoles.notifications.exportRights;
              this.notificationsCheck();
              this.universalImages_viewright = this.userRoles.universalImages.viewRights;
              this.universalImages_addright = this.userRoles.universalImages.addRights;
              this.universalImages_editright = this.userRoles.universalImages.editRights;
              this.universalImages_deleteright = this.userRoles.universalImages.deleteRights;
              this.universalImages_listright = this.userRoles.universalImages.listRights;
              this.universalImages_exportright = this.userRoles.universalImages.exportRights;
              this.universalImagesCheck();
              this.staticContents_viewright = this.userRoles.enterpriseStaticContent.viewRights;
              this.staticContents_addright = this.userRoles.enterpriseStaticContent.addRights;
              this.staticContents_editright = this.userRoles.enterpriseStaticContent.editRights;
              this.staticContents_deleteright = this.userRoles.enterpriseStaticContent.deleteRights;
              this.staticContents_listright = this.userRoles.enterpriseStaticContent.listRights;
              this.staticContents_exportright = this.userRoles.enterpriseStaticContent.exportRights;
              this.staticContentsCheck();
              this.advertisements_viewright = this.userRoles.advertisements.viewRights;
              this.advertisements_addright = this.userRoles.advertisements.addRights;
              this.advertisements_editright = this.userRoles.advertisements.editRights;
              this.advertisements_deleteright = this.userRoles.advertisements.deleteRights;
              this.advertisements_listright = this.userRoles.advertisements.listRights;
              this.advertisements_exportright = this.userRoles.advertisements.exportRights;
              this.advertisementsCheck();

              this.fleet_type_attributes_viewright = this.userRoles.fleetTypeAttributes.viewRights;
              this.fleet_type_attributes_addright = this.userRoles.fleetTypeAttributes.addRights;
              this.fleet_type_attributes_editright = this.userRoles.fleetTypeAttributes.editRights;
              this.fleet_type_attributes_deleteright = this.userRoles.fleetTypeAttributes.deleteRights;
              this.fleet_type_attributes_listright = this.userRoles.fleetTypeAttributes.listRights;
              this.fleet_type_attributes_exportright = this.userRoles.fleetTypeAttributes.exportRights;
              this.fleetTypeAttributesreCheck();

              this.fleet_types_viewright = this.userRoles.fleetTypes.viewRights;
              this.fleet_types_addright = this.userRoles.fleetTypes.addRights;
              this.fleet_types_editright = this.userRoles.fleetTypes.editRights;
              this.fleet_types_deleteright = this.userRoles.fleetTypes.deleteRights;
              this.fleet_types_listright = this.userRoles.fleetTypes.listRights;
              this.fleet_types_exportright = this.userRoles.fleetTypes.exportRights;
              this.fleetTypesreCheck();

              this.loghistory_viewright = this.userRoles.loginHistory.viewRights;
              this.loghistory_deleteright = this.userRoles.loginHistory.deleteRights;
              this.loghistory_listright = this.userRoles.loginHistory.listRights;
              this.loghistory_exportright = this.userRoles.loginHistory.exportRights;
              this.historysreCheck();

              this.message_viewright = this.userRoles.messageHistory.viewRights;
              this.message_deleteright = this.userRoles.messageHistory.deleteRights;
              this.message_listright = this.userRoles.messageHistory.listRights;
              this.message_exportright = this.userRoles.messageHistory.exportRights;
              this.message_addright = this.userRoles.messageHistory.addRights;
              this.messagereCheck();

              this.billpayment_viewright = this.userRoles.billPaymentHistory.viewRights;
              this.billpayment_addright = this.userRoles.billPaymentHistory.addRights;
              this.billpayment_editright = this.userRoles.billPaymentHistory.editRights;
              this.billpayment_deleteright = this.userRoles.billPaymentHistory.deleteRights;
              this.billpayment_listright = this.userRoles.billPaymentHistory.listRights;
              this.billpayment_exportright = this.userRoles.billPaymentHistory.exportRights;
              this.billpaymentsreCheck();

              this.displaymap_viewright = this.userRoles.displayToMapSettings.viewRights;
              this.displaymap_editright = this.userRoles.displayToMapSettings.editRights;
              this.displaymap_listright = this.userRoles.displayToMapSettings.listRights;
              this.displaymap_exportright = this.userRoles.displayToMapSettings.exportRights;
              this.displaymappingreCheck();

              this.enterpriseContractDetails_addright = this.userRoles.enterpriseContractDetails.addRights;
              this.enterpriseContractDetails_deleteright = this.userRoles.enterpriseContractDetails.deleteRights;
              this.enterpriseContractDetails_editright = this.userRoles.enterpriseContractDetails.exportRights;
              this.enterpriseContractDetails_exportright = this.userRoles.enterpriseContractDetails.editRights;
              this.enterpriseContractDetails_listright = this.userRoles.enterpriseContractDetails.listRights;
              this.enterpriseContractDetails_viewright = this.userRoles.enterpriseContractDetails.viewRights;
              this.enterpriseContractDetailsreCheck();

              this.pickTickets_viewright = this.userRoles.pickTickets.viewRights;
              this.pickTickets_assignright = this.userRoles.pickTickets.assignRights;
              this.pickTickets_editright = this.userRoles.pickTickets.editRights; 
              this.pickTickets_deleteright = this.userRoles.pickTickets.deleteRights;
              this.pickTickets_listright = this.userRoles.pickTickets.listRights;
              this.pickTickets_cancelright = this.userRoles.pickTickets.cancelRights;
              this.pickTickets_exportright = this.userRoles.pickTickets.exportRights;
              this.pickTickets_locateright = this.userRoles.pickTickets.locateRights;
              this.pickTicketsCheck();

              // this.applications_viewright = this.userRoles.applications.viewRights;
              // this.applications_addright = this.userRoles.applications.addRights;
              // this.applications_editright = this.userRoles.applications.editRights;
              // this.applications_deleteright = this.userRoles.applications.deleteRights;
              // this.applications_listright = this.userRoles.applications.listRights;
              // this.applications_exportright = this.userRoles.applications.exportRights;
              // this.applications_activateright = this.userRoles.applications.activateRights;
              // this.applications_analyticsright = this.userRoles.applications.analyticsRights;
              // this.applications_cloneright = this.userRoles.applications.cloneRights;
              // this.applications_implementright = this.userRoles.applications.implementRights;
              // this.applications_inactivateright = this.userRoles.applications.inactivateRights;
              // this.applications_previewright = this.userRoles.applications.previewRights;
              // this.applicationsCheck();

              // this.appTypeAttributes_viewright = this.userRoles.appTypeAttributes.viewRights;
              // this.appTypeAttributes_addright = this.userRoles.appTypeAttributes.addRights;
              // this.appTypeAttributes_editright = this.userRoles.appTypeAttributes.editRights;
              // this.appTypeAttributes_deleteright = this.userRoles.appTypeAttributes.deleteRights;
              // this.appTypeAttributes_listright = this.userRoles.appTypeAttributes.listRights;
              // this.appTypeAttributes_exportright = this.userRoles.appTypeAttributes.exportRights;
              // this.appTypeAttributesCheck();

              // this.audiences_viewright = this.userRoles.audiences.viewRights;
              // this.audiences_deleteright = this.userRoles.audiences.deleteRights;
              // this.audiences_listright = this.userRoles.audiences.listRights;
              // this.audiences_exportright = this.userRoles.audiences.exportRights;
              // this.audiencesCheck();

              // this.auditTrail_viewright = this.userRoles.auditTrail.viewRights;
              // this.auditTrail_listright = this.userRoles.auditTrail.listRights;
              // this.auditTrail_exportright = this.userRoles.auditTrail.exportRights;
              // this.auditTrailCheck();

              // this.domains_addright = this.userRoles.domains.addRights;
              // this.domains_deleteright = this.userRoles.domains.deleteRights;
              // this.domains_listright = this.userRoles.domains.listRights;
              // this.domains_exportright = this.userRoles.domains.exportRights;
              // this.domains_activateright = this.userRoles.domains.activateRights;
              // this.domains_analyticsright = this.userRoles.domains.analyticsRights;
              // this.domains_inactivateright = this.userRoles.domains.inactivateRights;
              // this.domains_addtoplanright = this.userRoles.domains.addtoplanRights;
              // this.domains_removefromplanright = this.userRoles.domains.removefromplanRights;
              // this.domainsCheck();

              // this.emailTemplates_addright = this.userRoles.emailTemplates.addRights;
              // this.emailTemplates_deleteright = this.userRoles.emailTemplates.deleteRights;
              // this.emailTemplates_listright = this.userRoles.emailTemplates.listRights;
              // this.emailTemplates_exportright = this.userRoles.emailTemplates.exportRights;
              // this.emailTemplates_activateright = this.userRoles.emailTemplates.activateRights;
              // this.emailTemplates_analyticsright = this.userRoles.emailTemplates.analyticsRights;
              // this.emailTemplates_inactivateright = this.userRoles.emailTemplates.inactivateRights;
              // this.emailTemplates_viewright = this.userRoles.emailTemplates.viewRights;
              // this.emailTemplates_editright = this.userRoles.emailTemplates.editRights;
              // this.emailTemplatesCheck();

              // this.plans_viewright = this.userRoles.plans.viewRights;
              // this.plans_addright = this.userRoles.plans.addRights;
              // this.plans_editright = this.userRoles.plans.editRights;
              // this.plans_deleteright = this.userRoles.plans.deleteRights;
              // this.plans_listright = this.userRoles.plans.listRights;
              // this.plans_exportright = this.userRoles.plans.exportRights;
              // this.plans_analyticsright = this.userRoles.plans.analyticsRights;
              // this.plansCheck();
              this.ROLE_RIGHTS_ID = this.userRoles._id;

            }
          },
          error => {
            switch (JSON.parse(error['_body']).statusCode) {
              case '9961':
                window.localStorage.removeItem('token');
                this.router.navigate(['/pages/login']);
                break;
            }
          });
      }
    }
  }
  enterpriseContractDetailsCheck() {
    if (this.allenterpriseContractDetails === true) {
      this.enterpriseContractDetails_addright = true;
      this.enterpriseContractDetails_deleteright = true;
      this.enterpriseContractDetails_editright = true;
      this.enterpriseContractDetails_exportright = true;
      this.enterpriseContractDetails_listright = true;
      this.enterpriseContractDetails_viewright = true;
    } else if (this.allenterpriseContractDetails === false) {
      this.enterpriseContractDetails_addright = false;
      this.enterpriseContractDetails_deleteright = false;
      this.enterpriseContractDetails_editright = false;
      this.enterpriseContractDetails_exportright = false;
      this.enterpriseContractDetails_listright = false;
      this.enterpriseContractDetails_viewright = false;
    }
  }
  enterpriseContractDetailsreCheck() {
    if (this.enterpriseContractDetails_addright === false ||
      this.enterpriseContractDetails_deleteright === false ||
      this.enterpriseContractDetails_editright === false ||
      this.enterpriseContractDetails_exportright === false ||
      this.enterpriseContractDetails_listright === false ||
      this.enterpriseContractDetails_viewright === false) {
      this.allenterpriseContractDetails = false;
    } else if (this.enterpriseContractDetails_addright === true ||
      this.enterpriseContractDetails_deleteright === true ||
      this.enterpriseContractDetails_editright === true ||
      this.enterpriseContractDetails_exportright === true ||
      this.enterpriseContractDetails_listright === true ||
      this.enterpriseContractDetails_viewright === true) {
      this.allenterpriseContractDetails = true;
    }
  }
  analyticsCheck() {
    if (this.analytics === true) {
      this.an_report1 = true;
      this.an_report2 = true;
    } else if (this.analytics === false) {
      this.an_report1 = false;
      this.an_report2 = false;
    }
  }
  analyticsreCheck() {
    if (this.an_report1 === false || this.an_report2 === false) {
      this.analytics = false;
    } else if (this.an_report1 === true && this.an_report2 === true) {
      this.analytics = true;
    }
  }
  enterpriseCheck() {
    if (this.enterprises === true) {
      this.enterprise_viewright = true;
      this.enterprise_activateright = true;
      this.enterprise_editright = true;
      this.enterprise_listright = true;
      this.enterprise_addright = true;
      this.enterprise_exportright = true;
      this.enterprise_inactivateright = true;
      this.enterprise_locateright = true;
    } else if (this.enterprises === false) {
      this.enterprise_viewright = false;
      this.enterprise_activateright = false;
      this.enterprise_editright = false;
      this.enterprise_listright = false;
      this.enterprise_addright = false;
      this.enterprise_exportright = false;
      this.enterprise_inactivateright = false;
      this.enterprise_locateright = false;
    }
  }
  enterprisereCheck() {
    if (this.enterprise_viewright === false ||
      this.enterprise_activateright === false ||
      this.enterprise_editright === false || this.enterprise_listright === false || this.enterprise_locateright === false
      || this.enterprise_addright === false || this.enterprise_exportright === false || this.enterprise_inactivateright === false) {
      this.enterprises = false;
    } else if (this.enterprise_viewright === true &&
      this.enterprise_activateright === true &&
      this.enterprise_editright === true && this.enterprise_listright === true || this.enterprise_locateright === false
      && this.enterprise_addright === true && this.enterprise_exportright === true && this.enterprise_inactivateright === true) {
      this.enterprises = true;
    }
  }
  callhistoryCheck() {
    if (this.callhistory === true) {
      this.callhistory_deleteright = true;
      this.callhistory_exportright = true;
      this.callhistory_listright = true;
      this.callhistory_viewright = true;
    } else if (this.callhistory === false) {
      this.callhistory_deleteright = false;
      this.callhistory_exportright = false;
      this.callhistory_listright = false;
      this.callhistory_viewright = false;
    }
  }
  callhistoryreCheck() {
    if (this.callhistory_deleteright === false ||
      this.callhistory_exportright === false ||
      this.callhistory_listright === false || this.callhistory_viewright === false) {
      this.callhistory = false;
    } else if (this.callhistory_deleteright === true ||
      this.callhistory_exportright === true ||
      this.callhistory_listright === true || this.callhistory_viewright === true) {
      this.callhistory = true;
    }
  }
  usersCheck() {
    if (this.alluserscheck === true) {
      this.users_addright = true;
      this.users_deleteright = true;
      this.users_editright = true;
      this.users_blockright = true;
      this.users_unblockright = true;
      this.users_locateright = true;
      this.users_listright = true;
      this.users_viewright = true;
      this.users_exportright = true;
      this.users_importright = true;
    } else if (this.alluserscheck === false) {
      this.users_addright = false;
      this.users_deleteright = false;
      this.users_editright = false;
      this.users_blockright = false;
      this.users_unblockright = false;
      this.users_locateright = false;
      this.users_listright = false;
      this.users_viewright = false;
      this.users_exportright = false;
      this.users_importright = false;
    }
  }
  usersreCheck() {
    if (this.users_addright === false ||
      this.users_deleteright === false ||
      this.users_editright === false ||
      this.users_blockright === false ||
      this.users_unblockright === false ||
      this.users_locateright === false ||
      this.users_listright === false ||
      this.users_viewright === false ||
      this.users_exportright === false || this.users_importright === false) {
      this.alluserscheck = false;
    } else if (this.users_addright === true &&
      this.users_deleteright === true &&
      this.users_editright === true &&
      this.users_blockright === true &&
      this.users_unblockright === true &&
      this.users_locateright === true &&
      this.users_listright === true &&
      this.users_viewright === true &&
      this.users_exportright === true && this.users_importright === true) {
      this.alluserscheck = true;
    }
  }
  rolerightsCheck() {
    if (this.rolerightCheck === false) {
      this.rolerights_addright = false;
      this.rolerights_deleteright = false;
      this.rolerights_editright = false;
      this.rolerights_renameright = false;
      this.rolerights_viewright = false;
    } else if (this.rolerightCheck === true) {
      this.rolerights_addright = true;
      this.rolerights_deleteright = true;
      this.rolerights_editright = true;
      this.rolerights_renameright = true;
      this.rolerights_viewright = true;
    }
  }
  rolerightsreCheck() {
    if (this.rolerights_addright === false ||
      this.rolerights_deleteright === false ||
      this.rolerights_editright === false ||
      this.rolerights_viewright === false ||
      this.rolerights_renameright === false) {
      this.rolerightCheck = false;
    } else if (this.rolerights_addright === true &&
      this.rolerights_deleteright === true &&
      this.rolerights_editright === true &&
      this.rolerights_renameright === true &&
      this.rolerights_viewright === true) {
      this.rolerightCheck = true;
    }
  }
  flletsCheck() {
    if (this.allfleets === true) {
      this.fleet_addright = true;
      this.fleet_deleteright = true;
      this.fleet_editright = true;
      this.fleet_exportright = true;
      this.fleet_importright = true;
      this.fleet_listright = true;
      this.fleet_viewright = true;
      this.fleet_locateright = true;
    } else if (this.allfleets === false) {
      this.fleet_addright = false;
      this.fleet_deleteright = false;
      this.fleet_editright = false;
      this.fleet_exportright = false;
      this.fleet_importright = false;
      this.fleet_listright = false;
      this.fleet_viewright = false;
      this.fleet_locateright = true;
    }
  }
  fleetsreCheck() {
    if (this.fleet_addright === false ||
      this.fleet_deleteright === false ||
      this.fleet_editright === false ||
      this.fleet_exportright === false ||
      this.fleet_importright === false ||
      this.fleet_listright === false ||
      this.fleet_viewright === false ||
      this.fleet_locateright === false) {
      this.allfleets = false;
    } else if (this.fleet_addright === true &&
      this.fleet_deleteright === true &&
      this.fleet_editright === true &&
      this.fleet_exportright === true &&
      this.fleet_importright === true &&
      this.fleet_listright === true &&
      this.fleet_viewright === true &&
      this.fleet_locateright === true) {
      this.allfleets = true;
    }
  }
  lookupsCheck() {
    if (this.alllookups === true) {
      this.lookups_viewright = true;
      this.lookups_addright = true;
      this.lookups_editright = true;
      this.lookups_deleteright = true;
      this.lookups_listright = true;
      this.lookups_exportright = true;
    } else if (this.alllookups === false) {
      this.lookups_viewright = false;
      this.lookups_addright = false;
      this.lookups_editright = false;
      this.lookups_deleteright = false;
      this.lookups_listright = false;
      this.lookups_exportright = false;
    }
  }
  lookupsreCheck() {
    if (this.lookups_viewright === false ||
      this.lookups_addright === false ||
      this.lookups_editright === false ||
      this.lookups_deleteright === false ||
      this.lookups_exportright === false ||
      this.lookups_listright === false) {
      this.alllookups = false;
    } else if (this.lookups_addright === true &&
      this.lookups_deleteright === true &&
      this.lookups_editright === true &&
      this.lookups_exportright === true &&
      this.lookups_listright === true &&
      this.lookups_viewright === true) {
      this.alllookups = true;
    }
  }
  eventsCheck() {
    if (this.allevents === true) {
      this.events_viewright = true;
      this.events_addright = true;
      this.events_editright = true;
      this.events_deleteright = true;
      this.events_listright = true;
      this.events_cancelright = true;
      this.events_checkinright = true;
      this.events_checkoutright = true;
      this.events_locateright = true;
      this.events_extendright = true;
      this.events_exportright = true;
      this.events_guidedright = true;
    } else if (this.allevents === false) {
      this.events_viewright = false;
      this.events_addright = false;
      this.events_editright = false;
      this.events_deleteright = false;
      this.events_listright = false;
      this.events_cancelright = false;
      this.events_checkinright = false;
      this.events_checkoutright = false;
      this.events_locateright = false;
      this.events_extendright = false;
      this.events_exportright = false;
      this.events_guidedright = false;
    }
  }
  eventsreCheck() {
    if (this.events_viewright === false ||
      this.events_addright === false ||
      this.events_editright === false ||
      this.events_deleteright === false ||
      this.events_exportright === false ||
      this.events_listright === false ||
      this.events_cancelright === false || this.events_checkinright === false ||
      this.events_checkoutright === false || this.events_extendright === false ||
      this.events_locateright === false || this.events_guidedright === false) {
      this.allevents = false;
    } else if (this.events_addright === true &&
      this.events_deleteright === true &&
      this.events_editright === true &&
      this.events_exportright === true &&
      this.events_cancelright === true && this.events_checkinright === true &&
      this.events_listright === true && this.events_extendright === true &&
      this.events_viewright === true && this.events_locateright === true &&
      this.events_checkoutright === true && this.events_guidedright === true) {
      this.allevents = true;
    }
  }
  feedbackCheck() {
    if (this.allfeedback === true) {
      this.feedback_addright = true;
      this.feedback_deleteright = true;
      this.feedback_editright = true;
      this.feedback_exportright = true;
      this.feedback_listright = true;
      this.feedback_viewright = true;
    } else if (this.allfeedback === false) {
      this.feedback_addright = false;
      this.feedback_deleteright = false;
      this.feedback_editright = false;
      this.feedback_exportright = false;
      this.feedback_listright = false;
      this.feedback_viewright = false;
    }
  }
  feedbackreCheck() {
    if (this.feedback_addright === false ||
      this.feedback_deleteright === false ||
      this.feedback_editright === false ||
      this.feedback_exportright === false ||
      this.feedback_listright === false ||
      this.feedback_viewright === false) {
      this.allfeedback = false;
    } else if (this.feedback_addright === true ||
      this.feedback_deleteright === true ||
      this.feedback_editright === true ||
      this.feedback_exportright === true ||
      this.feedback_listright === true ||
      this.feedback_viewright === true) {
      this.allfeedback = true;
    }
  }
  helpCheck() {
    if (this.allhelp === true) {
      this.help_addright = true;
      this.help_deleteright = true;
      this.help_editright = true;
      this.help_exportright = true;
      this.help_listright = true;
      this.help_viewright = true;
    } else if (this.allhelp === false) {
      this.help_addright = false;
      this.help_deleteright = false;
      this.help_editright = false;
      this.help_exportright = false;
      this.help_listright = false;
      this.help_viewright = false;
    }
  }
  helpreCheck() {
    if (this.help_addright === false ||
      this.help_deleteright === false ||
      this.help_editright === false ||
      this.help_exportright === false ||
      this.help_listright === false ||
      this.help_viewright === false) {
      this.allhelp = false;
    } else if (this.help_addright === true ||
      this.help_deleteright === true ||
      this.help_editright === true ||
      this.help_exportright === true ||
      this.help_listright === true ||
      this.help_viewright === true) {
      this.allhelp = true;
    }
  }
  funfactsCheck() {
    if (this.allfunfacts === true) {
      this.funfacts_viewright = true;
      this.funfacts_addright = true;
      this.funfacts_editright = true;
      this.funfacts_deleteright = true;
      this.funfacts_listright = true;
      this.funfacts_importright = true;
      this.funfacts_exportright = true;
    } else if (this.allfunfacts === false) {
      this.funfacts_viewright = false;
      this.funfacts_addright = false;
      this.funfacts_editright = false;
      this.funfacts_deleteright = false;
      this.funfacts_listright = false;
      this.funfacts_importright = false;
      this.funfacts_exportright = false;
    }
  }
  funfactsreCheck() {
    if (this.funfacts_viewright === false ||
      this.funfacts_addright === false ||
      this.funfacts_editright === false ||
      this.funfacts_deleteright === false ||
      this.funfacts_exportright === false ||
      this.funfacts_listright === false ||
      this.funfacts_importright === false) {
      this.allfunfacts = false;
    } else if (this.funfacts_addright === true &&
      this.funfacts_deleteright === true &&
      this.funfacts_editright === true &&
      this.funfacts_exportright === true &&
      this.funfacts_importright === true &&
      this.funfacts_listright === true &&
      this.funfacts_viewright === true) {
      this.allfunfacts = true;
    }
  }
  historyCheck() {
    if (this.allhistory === true) {
      this.loghistory_listright = true;
      this.loghistory_exportright = true;
      this.loghistory_viewright = true;
      this.loghistory_deleteright = true;
    } else if (this.allhistory === false) {
      this.loghistory_listright = false;
      this.loghistory_exportright = false;
      this.loghistory_viewright = false;
      this.loghistory_deleteright = false;
    }
  }
  historysreCheck() {
    if (this.loghistory_viewright === false ||
      this.loghistory_deleteright === false ||
      this.loghistory_exportright === false ||
      this.loghistory_listright === false
    ) {
      this.allhistory = false;
    } else if (this.loghistory_deleteright === true &&
      this.loghistory_exportright === true &&
      this.loghistory_listright === true &&
      this.loghistory_viewright === true) {
      this.allhistory = true;
    }
  }
  messageCheck() {
    if (this.messagehistory === true) {
      this.message_addright = true;
      this.message_deleteright = true;
      this.message_exportright = true;
      this.message_listright = true;
      this.message_viewright = true;
    } else if (this.messagehistory === false) {
      this.message_addright = false;
      this.message_deleteright = false;
      this.message_exportright = false;
      this.message_listright = false;
      this.message_viewright = false;
    }
  }
  messagereCheck() {
    if (this.message_addright === false ||
      this.message_deleteright === false ||
      this.message_exportright === false ||
      this.message_listright === false ||
      this.message_viewright === false
    ) {
      this.messagehistory = false;
    } else if (this.message_addright === true &&
      this.message_deleteright === true &&
      this.message_exportright === true &&
      this.message_listright === true &&
      this.message_viewright === true) {
      this.messagehistory = true;
    }
  }
  reserveCheck() {
    if (this.allreserve === true) {
      this.reserve_viewright = true;
      this.reserve_addright = true;
      this.reserve_editright = true;
      this.reserve_deleteright = true;
      this.reserve_listright = true;
      this.reserve_cancelright = true;
      this.reserve_checkinright = true;
      this.reserve_checkoutright = true;
      this.reserve_extendright = true;
      this.reserve_locateright = true;
      this.reserve_guidedright = true;
    } else if (this.allreserve === false) {
      this.reserve_viewright = false;
      this.reserve_addright = false;
      this.reserve_editright = false;
      this.reserve_deleteright = false;
      this.reserve_listright = false;
      this.reserve_cancelright = false;
      this.reserve_checkinright = false;
      this.reserve_checkoutright = false;
      this.reserve_extendright = false;
      this.reserve_locateright = false;
      this.reserve_exportright = false;
      this.reserve_guidedright = false;
    }
  }
  importhistory() {
    if (this.allimportHistory === true) {
      this.importHistory_viewright = true;
      this.importHistory_deleteright = true;
      this.importHistory_listright = true;
      this.importHistory_exportright = true;
    } else if (this.allimportHistory === false) {
      this.importHistory_viewright = false;
      this.importHistory_deleteright = false;
      this.importHistory_listright = false;
      this.importHistory_exportright = false;
    }
  }
  notifications() {
    if (this.allNotifications === true) {
      this.notifctions_viewright = true;
      this.notifications_readright = true;
      this.notifications_unreadright = true;
      this.notifications_deleteright = true;
      this.notifications_listright = true;
      this.notifications_exportright = true;
    } else if (this.allNotifications === false) {
      this.notifctions_viewright = false;
      this.notifications_readright = false;
      this.notifications_unreadright = false;
      this.notifications_deleteright = false;
      this.notifications_listright = false;
      this.notifications_exportright = false;
    }
  }
  universalImages() {
    if (this.allUniversalImages === true) {
      this.universalImages_viewright = true;
      this.universalImages_addright = true;
      this.universalImages_editright = true;
      this.universalImages_deleteright = true;
      this.universalImages_listright = true;
      this.universalImages_exportright = true;
    } else if (this.allUniversalImages === false) {
      this.universalImages_viewright = false;
      this.universalImages_addright = false;
      this.universalImages_editright = false;
      this.universalImages_deleteright = false;
      this.universalImages_listright = false;
      this.universalImages_exportright = false;
    }
  }
  staticContents() {
    if (this.allStaticContents === true) {
      this.staticContents_viewright = true;
      this.staticContents_addright = true;
      this.staticContents_editright = true;
      this.staticContents_deleteright = true;
      this.staticContents_listright = true;
      this.staticContents_exportright = true;
    } else if (this.allStaticContents === false) {
      this.staticContents_viewright = false;
      this.staticContents_addright = false;
      this.staticContents_editright = false;
      this.staticContents_deleteright = false;
      this.staticContents_listright = false;
      this.staticContents_exportright = false;
    }
  }
  advertisements() {
    if (this.allAdvertisements === true) {
      this.advertisements_viewright = true;
      this.advertisements_addright = true;
      this.advertisements_editright = true;
      this.advertisements_deleteright = true;
      this.advertisements_listright = true;
      this.advertisements_exportright = true;
    } else if (this.allAdvertisements === false) {
      this.advertisements_viewright = false;
      this.advertisements_addright = false;
      this.advertisements_editright = false;
      this.advertisements_deleteright = false;
      this.advertisements_listright = false;
      this.advertisements_exportright = false;
    }
  }
  reservesreCheck() {
    if (this.reserve_viewright === false ||
      this.reserve_addright === false ||
      this.reserve_editright === false ||
      this.reserve_deleteright === false ||
      this.reserve_exportright === false ||
      this.reserve_listright === false ||
      this.reserve_cancelright === false ||
      this.reserve_checkinright === false ||
      this.reserve_checkoutright === false ||
      this.reserve_extendright === false ||
      this.reserve_locateright === false || this.reserve_guidedright === false) {
      this.allreserve = false;
    } else if (this.reserve_addright === true &&
      this.reserve_deleteright === true &&
      this.reserve_editright === true &&
      this.reserve_exportright === true &&
      this.reserve_cancelright === true &&
      this.reserve_checkinright === true &&
      this.reserve_checkoutright === true &&
      this.reserve_extendright === true &&
      this.reserve_locateright === true &&
      this.reserve_listright === true &&
      this.reserve_viewright === true && this.reserve_guidedright === true) {
      this.allreserve = true;
    }
  }
  importHistoryCheck() {
    if (this.importHistory_viewright === false ||
      this.importHistory_deleteright === false ||
      this.importHistory_exportright === false ||
      this.importHistory_listright === false) {
      this.allimportHistory = false;
    } else if (this.importHistory_deleteright === true &&
      this.importHistory_exportright === true &&
      this.importHistory_listright === true &&
      this.importHistory_viewright === true) {
      this.allimportHistory = true;
    }
  }
  notificationsCheck() {
    if (this.notifctions_viewright === false ||
      this.notifications_readright === false ||
      this.notifications_unreadright === false ||
      this.notifications_deleteright === false ||
      this.notifications_listright === false ||
      this.notifications_exportright === false) {
      this.allNotifications = false;
    } else if (this.notifications_readright === true &&
      this.notifications_deleteright === true &&
      this.notifications_unreadright === true &&
      this.notifications_exportright === true &&
      this.notifications_listright === true &&
      this.notifctions_viewright === true) {
      this.allNotifications = true;
    }
  }
  universalImagesCheck() {
    if (this.universalImages_viewright === false ||
      this.universalImages_addright === false ||
      this.universalImages_editright === false ||
      this.universalImages_deleteright === false ||
      this.universalImages_listright === false ||
      this.universalImages_exportright === false) {
      this.allUniversalImages = false;
    } else if (this.universalImages_addright === true &&
      this.universalImages_deleteright === true &&
      this.universalImages_editright === true &&
      this.universalImages_exportright === true &&
      this.universalImages_listright === true &&
      this.universalImages_viewright === true) {
      this.allUniversalImages = true;
    }
  }
  staticContentsCheck() {
    if (this.staticContents_viewright === false ||
      this.staticContents_addright === false ||
      this.staticContents_editright === false ||
      this.staticContents_deleteright === false ||
      this.staticContents_listright === false ||
      this.staticContents_exportright === false) {
      this.allStaticContents = false;
    } else if (this.universalImages_addright === true &&
      this.staticContents_deleteright === true &&
      this.staticContents_editright === true &&
      this.staticContents_exportright === true &&
      this.staticContents_listright === true &&
      this.staticContents_viewright === true) {
      this.allStaticContents = true;
    }
  }
  advertisementsCheck() {
    if (this.advertisements_viewright === false ||
      this.advertisements_addright === false ||
      this.advertisements_editright === false ||
      this.advertisements_deleteright === false ||
      this.advertisements_listright === false ||
      this.advertisements_exportright === false) {
      this.allAdvertisements = false;
    } else if (this.advertisements_addright === true &&
      this.advertisements_deleteright === true &&
      this.advertisements_editright === true &&
      this.advertisements_exportright === true &&
      this.advertisements_listright === true &&
      this.advertisements_viewright === true) {
      this.allAdvertisements = true;
    }
  }
  /** */
  enterpriseResourcesCheck() {
    if (this.enterpriseResources === true) {
      this.enterprise_resources_viewright = true;
      this.enterprise_resources_addright = true;
      this.enterprise_resources_editright = true;
      this.enterprise_resources_deleteright = true;
      this.enterprise_resources_listright = true;
      this.enterprise_resources_importright = true;
      this.enterprise_resources_exportright = true;
      this.enterprise_resources_blockright = true;
      this.enterprise_resources_unblockright = true;
      this.enterprise_resources_locateright = true;
    } else if (this.enterpriseResources === false) {
      this.enterprise_resources_viewright = false;
      this.enterprise_resources_addright = false;
      this.enterprise_resources_editright = false;
      this.enterprise_resources_deleteright = false;
      this.enterprise_resources_listright = false;
      this.enterprise_resources_importright = false;
      this.enterprise_resources_exportright = false;
      this.enterprise_resources_blockright = false;
      this.enterprise_resources_unblockright = false;
      this.enterprise_resources_locateright = false;
    }
  }
  enterpriseResourcesreCheck() {
    if (this.enterprise_resources_viewright === false ||
      this.enterprise_resources_addright === false ||
      this.enterprise_resources_editright === false ||
      this.enterprise_resources_deleteright === false ||
      this.enterprise_resources_exportright === false ||
      this.enterprise_resources_listright === false ||
      this.enterprise_resources_importright === false ||
      this.enterprise_resources_blockright === false ||
      this.enterprise_resources_unblockright === false ||
      this.enterprise_resources_locateright === false) {
      this.enterpriseResources = false;
    } else if (this.enterprise_resources_addright === true &&
      this.enterprise_resources_deleteright === true &&
      this.enterprise_resources_editright === true &&
      this.enterprise_resources_exportright === true &&
      this.enterprise_resources_importright === true &&
      this.enterprise_resources_listright === true &&
      this.enterprise_resources_blockright === true &&
      this.enterprise_resources_unblockright === true &&
      this.enterprise_resources_blockright === true &&
      this.enterprise_resources_locateright === true) {
      this.enterpriseResources = true;
    }
  }
  /** */

  fleetTypeAttributesCheck() {
    if (this.allfleetTypeAttributes === true) {
      this.fleet_type_attributes_viewright = true;
      this.fleet_type_attributes_addright = true;
      this.fleet_type_attributes_editright = true;
      this.fleet_type_attributes_deleteright = true;
      this.fleet_type_attributes_listright = true;
      this.fleet_type_attributes_exportright = true;
    } else if (this.allfleetTypeAttributes === false) {
      this.fleet_type_attributes_viewright = false;
      this.fleet_type_attributes_addright = false;
      this.fleet_type_attributes_editright = false;
      this.fleet_type_attributes_deleteright = false;
      this.fleet_type_attributes_listright = false;
      this.fleet_type_attributes_exportright = false;
    }
  }
  fleetTypeAttributesreCheck() {
    if (this.fleet_type_attributes_viewright === false ||
      this.fleet_type_attributes_addright === false ||
      this.fleet_type_attributes_editright === false ||
      this.fleet_type_attributes_deleteright === false ||
      this.fleet_type_attributes_exportright === false ||
      this.fleet_type_attributes_listright === false) {
      this.allfleetTypeAttributes = false;
    } else if (this.fleet_type_attributes_addright === true &&
      this.fleet_type_attributes_deleteright === true &&
      this.fleet_type_attributes_editright === true &&
      this.fleet_type_attributes_exportright === true &&
      this.fleet_type_attributes_listright === true &&
      this.fleet_type_attributes_viewright === true) {
      this.allfleetTypeAttributes = true;
    }
  }

  /**--- To check fleet types ---*/
  fleetTypesCheck() {
    if (this.allfleetTypes === true) {
      this.fleet_types_viewright = true;
      this.fleet_types_addright = true;
      this.fleet_types_editright = true;
      this.fleet_types_deleteright = true;
      this.fleet_types_listright = true;
      this.fleet_types_exportright = true;
    } else if (this.allfleetTypes === false) {
      this.fleet_types_viewright = false;
      this.fleet_types_addright = false;
      this.fleet_types_editright = false;
      this.fleet_types_deleteright = false;
      this.fleet_types_listright = false;
      this.fleet_types_exportright = false;
    }
  }

  /**--- To recheck fleet types ---*/
  fleetTypesreCheck() {
    if (this.fleet_types_viewright === false ||
      this.fleet_types_addright === false ||
      this.fleet_types_editright === false ||
      this.fleet_types_deleteright === false ||
      this.fleet_types_exportright === false ||
      this.fleet_types_listright === false) {
      this.allfleetTypes = false;
    } else if (this.fleet_types_addright === true &&
      this.fleet_types_deleteright === true &&
      this.fleet_types_editright === true &&
      this.fleet_types_exportright === true &&
      this.fleet_types_listright === true &&
      this.fleet_types_viewright === true) {
      this.allfleetTypes = true;
    }
  }

  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }
  /** */

  registrationsCheck() {
    if (this.allregistrations === true) {
      this.registrations_viewright = true;
      this.registrations_addright = true;
      this.registrations_editright = true;
      this.registrations_deleteright = true;
      this.registrations_listright = true;
      this.registrations_checkinright = true;
      this.registrations_checkoutright = true;
      this.registrations_locateright = true;
      this.registrations_exportright = true;
      this.registrations_guidedright = true;
    } else if (this.allregistrations === false) {
      this.registrations_viewright = false;
      this.registrations_addright = false;
      this.registrations_editright = false;
      this.registrations_deleteright = false;
      this.registrations_listright = false;
      this.registrations_checkinright = false;
      this.registrations_checkoutright = false;
      this.registrations_locateright = false;
      this.registrations_exportright = false;
      this.registrations_guidedright = false;
    }
  }
  registrationsreCheck() {
    if (this.registrations_viewright === false ||
      this.registrations_addright === false ||
      this.registrations_editright === false ||
      this.registrations_deleteright === false ||
      this.registrations_exportright === false ||
      this.registrations_listright === false ||
      this.registrations_locateright === false || this.registrations_checkinright === false ||
      this.registrations_checkoutright === false || this.registrations_guidedright === false) {
      this.allregistrations = false;
    } else if (this.registrations_addright === true &&
      this.registrations_deleteright === true &&
      this.registrations_editright === true &&
      this.registrations_exportright === true &&
      this.registrations_locateright === true &&
      this.registrations_listright === true && this.registrations_checkinright === true &&
      this.registrations_viewright === true && this.registrations_checkoutright === true
      && this.registrations_guidedright === true) {
      this.allregistrations = true;
    }
  }
  billpaymentsCheck() {
    if (this.allbilpayments === true) {
      this.billpayment_viewright = true;
      this.billpayment_addright = true;
      this.billpayment_editright = true;
      this.billpayment_deleteright = true;
      this.billpayment_listright = true;
      this.billpayment_exportright = true;
    } else if (this.allbilpayments === false) {
      this.billpayment_viewright = false;
      this.billpayment_addright = false;
      this.billpayment_editright = false;
      this.billpayment_deleteright = false;
      this.billpayment_listright = false;
      this.billpayment_exportright = false;
    }
  }
  displaymappingCheck() {
    if (this.alldisplaymap === true) {
      this.displaymap_viewright = true;
      this.displaymap_editright = true;
      this.displaymap_listright = true;
      this.displaymap_exportright = true;
    } else if (this.alldisplaymap === false) {
      this.displaymap_viewright = false;
      this.displaymap_editright = false;
      this.displaymap_listright = false;
      this.displaymap_exportright = false;
    }
  }
  billpaymentsreCheck() {
    if (this.billpayment_viewright === false ||
      this.billpayment_addright === false ||
      this.billpayment_editright === false ||
      this.billpayment_deleteright === false ||
      this.billpayment_listright === false ||
      this.billpayment_exportright === false) {
      this.allbilpayments = false;
    } else if (this.billpayment_addright === true &&
      this.billpayment_deleteright === true &&
      this.billpayment_editright === true &&
      this.billpayment_exportright === true &&
      this.billpayment_listright === true &&
      this.billpayment_viewright === true) {
      this.allbilpayments = true;
    }
  }
  displaymappingreCheck() {
    if (this.displaymap_viewright === false ||
      this.displaymap_editright === false ||
      this.displaymap_listright === false ||
      this.displaymap_exportright === false) {
      this.alldisplaymap = false;
    } else if (this.displaymap_editright === true &&
      this.displaymap_exportright === true &&
      this.displaymap_listright === true &&
      this.displaymap_viewright === true) {
      this.alldisplaymap = true;
    }
  }
  dashboardCheck() {
    if (this.dashboard === true) {
      this.enterpriseResourcesAllRights_viewright = true;
      this.enterpriseResourcesTotalActive_viewright = true;
      this.enterpriseResourcesTotalInactive_viewright = true;
      this.eventRegistrationsAll_viewright = true;
      this.eventRegistrationsAveragePerEvent_viewright = true;
      this.eventRegistrationsAveragePerFleet_viewright = true;
      this.eventsAveragePerFleet_viewright = true;
      this.eventsAll_viewright = true;
      this.fleetsAll_viewright = true;
      this.fleetHoursAverageReservedPerFleet_viewright = true;
      this.fleetHoursTotalReservable_viewright = true;
      this.fleetHoursTotalReserved_viewright = true;
      this.fleetReservationsAll_viewright = true;
      this.fleetReservationsAveragePerFleet_viewright = true;
      this.fleetsTotalActive_viewright = true;
      this.fleetsTotalInactive_viewright = true;
      this.fleetsTotalNonTransactable_viewright = true;
      this.fleetsTotalTransactable_viewright = true;
      this.fleetUsage_viewright = true;
      this.pieChartsByCountry_viewright = true;
      this.userActivity_viewright = true;
      this.usersAll_viewright = true;
      this.userHoursActualAveragePerUser_viewright = true;
      this.userHoursTotalActual_viewright = true;
      this.userHoursTotalPotential_viewright = true;
      this.usersTotalActive_viewright = true;
      this.usersTotalInactive_viewright = true;
    } else if (this.dashboard === false) {
      this.enterpriseResourcesAllRights_viewright = false;
      this.enterpriseResourcesTotalActive_viewright = false;
      this.enterpriseResourcesTotalInactive_viewright = false;
      this.eventRegistrationsAll_viewright = false;
      this.eventRegistrationsAveragePerEvent_viewright = false;
      this.eventRegistrationsAveragePerFleet_viewright = false;
      this.eventsAveragePerFleet_viewright = false;
      this.eventsAll_viewright = false;
      this.fleetsAll_viewright = false;
      this.fleetHoursAverageReservedPerFleet_viewright = false;
      this.fleetHoursTotalReservable_viewright = false;
      this.fleetHoursTotalReserved_viewright = false;
      this.fleetReservationsAll_viewright = false;
      this.fleetReservationsAveragePerFleet_viewright = false;
      this.fleetsTotalActive_viewright = false;
      this.fleetsTotalInactive_viewright = false;
      this.fleetsTotalNonTransactable_viewright = false;
      this.fleetsTotalTransactable_viewright = false;
      this.fleetUsage_viewright = false;
      this.pieChartsByCountry_viewright = false;
      this.userActivity_viewright = false;
      this.usersAll_viewright = false;
      this.userHoursActualAveragePerUser_viewright = false;
      this.userHoursTotalActual_viewright = false;
      this.userHoursTotalPotential_viewright = false;
      this.usersTotalActive_viewright = false;
      this.usersTotalInactive_viewright = false;
    }
  }
  dashboardreCheck() {
    if (this.enterpriseResourcesAllRights_viewright === false || this.enterpriseResourcesTotalActive_viewright === false ||
      this.enterpriseResourcesTotalInactive_viewright === false || this.eventRegistrationsAll_viewright === false ||
      this.eventRegistrationsAveragePerEvent_viewright === false || this.eventRegistrationsAveragePerFleet_viewright === false ||
      this.eventsAveragePerFleet_viewright === false || this.eventsAll_viewright === false || this.fleetsAll_viewright === false ||
      this.fleetHoursAverageReservedPerFleet_viewright === false || this.fleetHoursTotalReservable_viewright === false ||
      this.fleetHoursTotalReserved_viewright === false || this.fleetReservationsAll_viewright === false ||
      this.fleetReservationsAveragePerFleet_viewright === false || this.fleetsTotalActive_viewright === false ||
      this.fleetsTotalInactive_viewright === false || this.fleetsTotalNonTransactable_viewright === false ||
      this.fleetsTotalTransactable_viewright === false || this.fleetUsage_viewright === false ||
      this.pieChartsByCountry_viewright === false || this.userActivity_viewright === false || this.usersAll_viewright === false ||
      this.userHoursActualAveragePerUser_viewright === false || this.userHoursTotalActual_viewright === false ||
      this.userHoursTotalPotential_viewright === false || this.usersTotalActive_viewright === false ||
      this.usersTotalInactive_viewright === false) {
      this.dashboard = false;
    } else if (this.enterpriseResourcesAllRights_viewright === true && this.enterpriseResourcesTotalActive_viewright === true &&
      this.enterpriseResourcesTotalInactive_viewright === true && this.eventRegistrationsAll_viewright === true &&
      this.eventRegistrationsAveragePerEvent_viewright === true && this.eventRegistrationsAveragePerFleet_viewright === true &&
      this.eventsAveragePerFleet_viewright === true && this.eventsAll_viewright === true &&
      this.fleetsAll_viewright === true && this.fleetHoursAverageReservedPerFleet_viewright === true &&
      this.fleetHoursTotalReservable_viewright === true && this.fleetHoursTotalReserved_viewright === true &&
      this.fleetReservationsAll_viewright === true && this.fleetReservationsAveragePerFleet_viewright === true &&
      this.fleetsTotalActive_viewright === true && this.fleetsTotalInactive_viewright === true &&
      this.fleetsTotalNonTransactable_viewright === true && this.fleetsTotalTransactable_viewright === true &&
      this.fleetUsage_viewright === true && this.pieChartsByCountry_viewright === true && this.userActivity_viewright === true &&
      this.usersAll_viewright === true && this.userHoursActualAveragePerUser_viewright === true &&
      this.userHoursTotalActual_viewright === true && this.userHoursTotalPotential_viewright === true &&
      this.usersTotalActive_viewright === true &&
      this.usersTotalInactive_viewright === true) {
      this.dashboard = true;
    }
  }
  pickTickets() {
    if (this.allPickTickets === true) {
      this.pickTickets_assignright = true;
      this.pickTickets_deleteright = true;
      this.pickTickets_editright = true;
      this.pickTickets_exportright = true;
      this.pickTickets_cancelright = true;
      this.pickTickets_listright = true;
      this.pickTickets_viewright = true;
      this.pickTickets_locateright = true;
    } else if (this.allPickTickets === false) {
      this.pickTickets_assignright = false;
      this.pickTickets_deleteright = false;
      this.pickTickets_editright = false;
      this.pickTickets_exportright = false;
      this.pickTickets_cancelright = false;
      this.pickTickets_listright = false;
      this.pickTickets_viewright = false;
      this.pickTickets_locateright = false;
    }
  }
  pickTicketsCheck() {
    if (this.pickTickets_assignright === false ||
      this.pickTickets_deleteright === false ||
      this.pickTickets_editright === false ||
      this.pickTickets_exportright === false ||
      this.pickTickets_cancelright === false ||
      this.pickTickets_listright === false ||
      this.pickTickets_viewright === false ||
      this.pickTickets_locateright === false) {
      this.allPickTickets = false;
    } else if (this.pickTickets_assignright === true &&
      this.pickTickets_deleteright === true &&
      this.pickTickets_editright === true &&
      this.pickTickets_exportright === true &&
      this.pickTickets_cancelright === true &&
      this.pickTickets_listright === true &&
      this.pickTickets_viewright === true &&
      this.pickTickets_locateright === true) {
      this.allPickTickets = true;
    }
  }
  applications() {
    if (this.allApplications === true) {
      this.applications_viewright = true;
      this.applications_addright = true;
      this.applications_editright = true;
      this.applications_deleteright = true;
      this.applications_listright = true;
      this.applications_exportright = true;
      this.applications_analyticsright = true;
      this.applications_activateright = true;
      this.applications_cloneright = true;
      this.applications_implementright = true;
      this.applications_inactivateright = true;
      this.applications_previewright = true;
    } else if (this.allApplications === false) {
      this.applications_viewright = false;
      this.applications_addright = false;
      this.applications_editright = false;
      this.applications_deleteright = false;
      this.applications_listright = false;
      this.applications_exportright = false;
      this.applications_analyticsright = false;
      this.applications_activateright = false;
      this.applications_cloneright = false;
      this.applications_implementright = false;
      this.applications_inactivateright = false;
      this.applications_previewright = false;
    }
  }
  applicationsCheck() {
    if (this.applications_viewright === false ||
      this.applications_addright === false ||
      this.applications_editright === false ||
      this.applications_deleteright === false ||
      this.applications_listright === false ||
      this.applications_exportright === false ||
      this.applications_analyticsright === false ||
      this.applications_activateright === false ||
      this.applications_cloneright === false ||
      this.applications_implementright === false ||
      this.applications_inactivateright === false ||
      this.applications_previewright === false) {
      this.allApplications = false;
    } else if (this.applications_addright === true &&
      this.applications_deleteright === true &&
      this.applications_editright === true &&
      this.applications_exportright === true &&
      this.applications_listright === true &&
      this.applications_viewright === true &&
      this.applications_analyticsright === true &&
      this.applications_activateright === true &&
      this.applications_cloneright === true &&
      this.applications_implementright === true &&
      this.applications_inactivateright === true &&
      this.applications_previewright === true) {
      this.allApplications = true;
    }
  }
  appTypeAttributes() {
    if (this.allAppTypeAttributes === true) {
      this.appTypeAttributes_viewright = true;
      this.appTypeAttributes_addright = true;
      this.appTypeAttributes_editright = true;
      this.appTypeAttributes_deleteright = true;
      this.appTypeAttributes_listright = true;
      this.appTypeAttributes_exportright = true;
    } else if (this.allAppTypeAttributes === false) {
      this.appTypeAttributes_viewright = false;
      this.appTypeAttributes_addright = false;
      this.appTypeAttributes_editright = false;
      this.appTypeAttributes_deleteright = false;
      this.appTypeAttributes_listright = false;
      this.appTypeAttributes_exportright = false;
    }
  }
  appTypeAttributesCheck() {
    if (this.appTypeAttributes_viewright === false ||
      this.appTypeAttributes_addright === false ||
      this.appTypeAttributes_editright === false ||
      this.appTypeAttributes_deleteright === false ||
      this.appTypeAttributes_listright === false ||
      this.appTypeAttributes_exportright === false) {
      this.allAppTypeAttributes = false;
    } else if (this.appTypeAttributes_addright === true &&
      this.appTypeAttributes_deleteright === true &&
      this.appTypeAttributes_editright === true &&
      this.appTypeAttributes_exportright === true &&
      this.appTypeAttributes_listright === true &&
      this.appTypeAttributes_viewright === true) {
      this.allAppTypeAttributes = true;
    }
  }
  audiences() {
    if (this.allAudiences === true) {
      this.audiences_viewright = true;
      this.audiences_deleteright = true;
      this.audiences_listright = true;
      this.audiences_exportright = true;
    } else if (this.allAudiences === false) {
      this.audiences_viewright = false;
      this.audiences_deleteright = false;
      this.audiences_listright = false;
      this.audiences_exportright = false;
    }
  }
  audiencesCheck() {
    if (this.audiences_viewright === false ||
      this.audiences_deleteright === false ||
      this.audiences_listright === false ||
      this.audiences_exportright === false) {
      this.allAudiences = false;
    } else if (this.audiences_deleteright === true &&
      this.audiences_exportright === true &&
      this.audiences_listright === true &&
      this.audiences_viewright === true) {
      this.allAudiences = true;
    }
  }
  auditTrail() {
    if (this.allAuditTrail === true) {
      this.auditTrail_viewright = true;
      this.auditTrail_listright = true;
      this.auditTrail_exportright = true;
    } else if (this.allAuditTrail === false) {
      this.auditTrail_viewright = false;
      this.auditTrail_listright = false;
      this.auditTrail_exportright = false;
    }
  }
  auditTrailCheck() {
    if (this.auditTrail_viewright === false ||
      this.auditTrail_listright === false ||
      this.auditTrail_exportright === false) {
      this.allAuditTrail = false;
    } else if (this.auditTrail_exportright === true &&
      this.auditTrail_listright === true &&
      this.auditTrail_viewright === true) {
      this.allAuditTrail = true;
    }
  }
  domains() {
    if (this.allDomains === true) {
      this.domains_addright = true;
      this.domains_deleteright = true;
      this.domains_listright = true;
      this.domains_exportright = true;
      this.domains_analyticsright = true;
      this.domains_activateright = true;
      this.domains_inactivateright = true;
      this.domains_addtoplanright = true;
      this.domains_removefromplanright = true;
    } else if (this.allDomains === false) {
      this.domains_addright = false;
      this.domains_deleteright = false;
      this.domains_listright = false;
      this.domains_exportright = false;
      this.domains_analyticsright = false;
      this.domains_activateright = false;
      this.domains_inactivateright = false;
      this.domains_addtoplanright = false;
      this.domains_removefromplanright = false;
    }
  }
  domainsCheck() {
    if (this.domains_addright === false ||
      this.domains_deleteright === false ||
      this.domains_listright === false ||
      this.domains_exportright === false ||
      this.domains_analyticsright === false ||
      this.domains_activateright === false ||
      this.domains_inactivateright === false ||
      this.domains_addtoplanright === false ||
      this.domains_removefromplanright === false) {
      this.allDomains = false;
    } else if (this.domains_addright === true &&
      this.domains_deleteright === true &&
      this.domains_listright === true &&
      this.domains_exportright === true &&
      this.domains_analyticsright === true &&
      this.domains_activateright === true &&
      this.domains_inactivateright === true &&
      this.domains_addtoplanright === true &&
      this.domains_removefromplanright === true) {
      this.allDomains = true;
    }
  }
  emailTemplates() {
    if (this.allEmailTemplates === true) {
      this.emailTemplates_addright = true;
      this.emailTemplates_deleteright = true;
      this.emailTemplates_listright = true;
      this.emailTemplates_exportright = true;
      this.emailTemplates_analyticsright = true;
      this.emailTemplates_activateright = true;
      this.emailTemplates_inactivateright = true;
      this.emailTemplates_editright = true;
      this.emailTemplates_viewright = true;
    } else if (this.allEmailTemplates === false) {
      this.emailTemplates_addright = false;
      this.emailTemplates_deleteright = false;
      this.emailTemplates_listright = false;
      this.emailTemplates_exportright = false;
      this.emailTemplates_analyticsright = false;
      this.emailTemplates_activateright = false;
      this.emailTemplates_inactivateright = false;
      this.emailTemplates_editright = false;
      this.emailTemplates_viewright = false;
    }
  }
  emailTemplatesCheck() {
    if (this.emailTemplates_addright === false ||
      this.emailTemplates_deleteright === false ||
      this.emailTemplates_listright === false ||
      this.emailTemplates_exportright === false ||
      this.emailTemplates_analyticsright === false ||
      this.emailTemplates_activateright === false ||
      this.emailTemplates_inactivateright === false ||
      this.emailTemplates_editright === false ||
      this.emailTemplates_viewright === false) {
      this.allEmailTemplates = false;
    } else if (this.emailTemplates_addright === true &&
      this.emailTemplates_deleteright === true &&
      this.emailTemplates_listright === true &&
      this.emailTemplates_exportright === true &&
      this.emailTemplates_analyticsright === true &&
      this.emailTemplates_activateright === true &&
      this.emailTemplates_inactivateright === true &&
      this.emailTemplates_editright === true &&
      this.emailTemplates_viewright === true) {
      this.allEmailTemplates = true;
    }
  }
  plans() {
    if (this.allPlans === true) {
      this.plans_viewright = true;
      this.plans_addright = true;
      this.plans_editright = true;
      this.plans_deleteright = true;
      this.plans_listright = true;
      this.plans_exportright = true;
      this.plans_analyticsright = true;
    } else if (this.allPlans === false) {
      this.plans_viewright = false;
      this.plans_addright = false;
      this.plans_editright = false;
      this.plans_deleteright = false;
      this.plans_listright = false;
      this.plans_exportright = false;
      this.plans_analyticsright = false;
    }
  }
  plansCheck() {
    if (this.plans_viewright === false ||
      this.plans_addright === false ||
      this.plans_editright === false ||
      this.plans_deleteright === false ||
      this.plans_listright === false ||
      this.plans_exportright === false ||
      this.plans_analyticsright === false) {
      this.allPlans = false;
    } else if (this.plans_addright === true &&
      this.plans_deleteright === true &&
      this.plans_editright === true &&
      this.plans_exportright === true &&
      this.plans_listright === true &&
      this.plans_viewright === true &&
      this.plans_analyticsright === true) {
      this.allPlans = true;
    }
  }

  clearRoleRights() {

    this.an_report1 = false;
    this.an_report2 = false;

    this.callhistory_deleteright = false;
    this.callhistory_viewright = false;
    this.callhistory_listright = false;
    this.callhistory_exportright = false;

    this.enterprise_viewright = false;
    this.enterprise_addright = false;
    this.enterprise_editright = false;
    this.enterprise_activateright = false;
    this.enterprise_listright = false;
    this.enterprise_inactivateright = false;
    this.enterprise_locateright = false;
    this.enterprise_exportright = false;

    this.enterprise_resources_viewright = false;
    this.enterprise_resources_addright = false;
    this.enterprise_resources_editright = false;
    this.enterprise_resources_deleteright = false;
    this.enterprise_resources_listright = false;
    this.enterprise_resources_importright = false;
    this.enterprise_resources_blockright = false;
    this.enterprise_resources_unblockright = false;
    this.enterprise_resources_locateright = false;
    this.enterprise_resources_exportright = false;

    this.users_viewright = false;
    this.users_addright = false;
    this.users_editright = false;
    this.users_deleteright = false;
    this.users_listright = false;
    this.users_blockright = false;
    this.users_locateright = false;
    this.users_unblockright = false;
    this.users_importright = false;
    this.users_exportright = false;

    this.rolerights_viewright = false;
    this.rolerights_addright = false;
    this.rolerights_editright = false;
    this.rolerights_deleteright = false;
    this.rolerights_renameright = false;

    this.fleet_viewright = false;
    this.fleet_addright = false;
    this.fleet_editright = false;
    this.fleet_deleteright = false;
    this.fleet_listright = false;
    this.fleet_importright = false;
    this.fleet_exportright = false;
    this.fleet_locateright = false;

    this.fleet_type_attributes_viewright = false;
    this.fleet_type_attributes_addright = false;
    this.fleet_type_attributes_editright = false;
    this.fleet_type_attributes_deleteright = false;
    this.fleet_type_attributes_listright = false;
    this.fleet_type_attributes_exportright = false;

    this.fleet_types_viewright = false;
    this.fleet_types_addright = false;
    this.fleet_types_editright = false;
    this.fleet_types_deleteright = false;
    this.fleet_types_listright = false;
    this.fleet_types_exportright = false;

    this.lookups_viewright = false;
    this.lookups_addright = false;
    this.lookups_editright = false;
    this.lookups_deleteright = false;
    this.lookups_listright = false;
    this.lookups_exportright = false;

    this.events_viewright = false;
    this.events_addright = false;
    this.events_editright = false;
    this.events_deleteright = false;
    this.events_cancelright = false;
    this.events_checkinright = false;
    this.events_checkoutright = false;
    this.events_extendright = false;
    this.events_listright = false;
    this.events_locateright = false;
    this.events_exportright = false;
    this.events_guidedright = false;

    this.feedback_addright = false;
    this.feedback_deleteright = false;
    this.feedback_editright = false;
    this.feedback_exportright = false;
    this.feedback_listright = false;
    this.feedback_viewright = false;

    this.funfacts_viewright = false;
    this.funfacts_addright = false;
    this.funfacts_editright = false;
    this.funfacts_deleteright = false;
    this.funfacts_listright = false;
    this.funfacts_importright = false;
    this.funfacts_exportright = false;

    this.help_addright = false;
    this.help_deleteright = false;
    this.help_editright = false;
    this.help_exportright = false;
    this.help_listright = false;
    this.help_viewright = false;

    this.reserve_viewright = false;
    this.reserve_addright = false;
    this.reserve_editright = false;
    this.reserve_deleteright = false;
    this.reserve_listright = false;
    this.reserve_cancelright = false;
    this.reserve_checkinright = false;
    this.reserve_checkoutright = false;
    this.reserve_extendright = false;
    this.reserve_locateright = false;
    this.reserve_exportright = false;
    this.reserve_guidedright = false;

    this.registrations_viewright = false;
    this.registrations_addright = false;
    this.registrations_editright = false;
    this.registrations_deleteright = false;
    this.registrations_listright = false;
    this.registrations_checkinright = false;
    this.registrations_checkoutright = false;
    this.registrations_locateright = false;
    this.registrations_exportright = false;
    this.registrations_guidedright = false;

    this.importHistory_viewright = false;
    this.importHistory_deleteright = false;
    this.importHistory_listright = false;
    this.importHistory_exportright = false;

    this.notifctions_viewright = false;
    this.notifications_readright = false;
    this.notifications_unreadright = false;
    this.notifications_deleteright = false;
    this.notifications_listright = false;
    this.notifications_exportright = false;

    this.universalImages_viewright = false;
    this.universalImages_addright = false;
    this.universalImages_editright = false;
    this.universalImages_deleteright = false;
    this.universalImages_listright = false;
    this.universalImages_exportright = false;

    this.staticContents_viewright = false;
    this.staticContents_addright = false;
    this.staticContents_editright = false;
    this.staticContents_deleteright = false;
    this.staticContents_listright = false;
    this.staticContents_exportright = false;

    this.advertisements_viewright = false;
    this.advertisements_addright = false;
    this.advertisements_editright = false;
    this.advertisements_deleteright = false;
    this.advertisements_listright = false;
    this.advertisements_exportright = false;

    this.loghistory_viewright = false;
    this.loghistory_deleteright = false;
    this.loghistory_listright = false;
    this.loghistory_exportright = false;

    this.message_addright = false;
    this.message_deleteright = false;
    this.message_exportright = false;
    this.message_listright = false;
    this.message_viewright = false;

    this.enterpriseContractDetails_addright = false;
    this.enterpriseContractDetails_deleteright = false;
    this.enterpriseContractDetails_editright = false;
    this.enterpriseContractDetails_exportright = false;
    this.enterpriseContractDetails_listright = false;
    this.enterpriseContractDetails_viewright = false;

    this.displaymap_viewright = false;
    this.displaymap_addright = false;
    this.displaymap_editright = false;
    this.displaymap_listright = false;
    this.displaymap_exportright = false;

    this.billpayment_viewright = false;
    this.billpayment_addright = false;
    this.billpayment_editright = false;
    this.billpayment_deleteright = false;
    this.billpayment_listright = false;
    this.billpayment_exportright = false;

    this.enterpriseResourcesAllRights_viewright = false;
    this.enterpriseResourcesTotalActive_viewright = false;
    this.enterpriseResourcesTotalInactive_viewright = false;
    this.eventRegistrationsAll_viewright = false;
    this.eventRegistrationsAveragePerEvent_viewright = false;
    this.eventRegistrationsAveragePerFleet_viewright = false;
    this.eventsAveragePerFleet_viewright = false;
    this.eventsAll_viewright = false;
    this.fleetsAll_viewright = false;
    this.fleetHoursAverageReservedPerFleet_viewright = false;
    this.fleetHoursTotalReservable_viewright = false;
    this.fleetHoursTotalReserved_viewright = false;
    this.fleetReservationsAll_viewright = false;
    this.fleetReservationsAveragePerFleet_viewright = false;
    this.fleetsTotalActive_viewright = false;
    this.fleetsTotalInactive_viewright = false;
    this.fleetsTotalNonTransactable_viewright = false;
    this.fleetsTotalTransactable_viewright = false;
    this.fleetUsage_viewright = false;
    this.pieChartsByCountry_viewright = false;
    this.userActivity_viewright = false;
    this.usersAll_viewright = false;
    this.userHoursActualAveragePerUser_viewright = false;
    this.userHoursTotalActual_viewright = false;
    this.userHoursTotalPotential_viewright = false;
    this.usersTotalActive_viewright = false;
    this.usersTotalInactive_viewright = false;

    this.pickTickets_viewright = false;
    this.pickTickets_assignright = false;
    this.pickTickets_editright = false;
    this.pickTickets_deleteright = false;
    this.pickTickets_listright = false;
    this.pickTickets_exportright = false;
    this.pickTickets_locateright = false;
    this.pickTickets_cancelright = false;
    
    this.applications_viewright = false;
    this.applications_addright = false;
    this.applications_editright = false;
    this.applications_deleteright = false;
    this.applications_listright = false;
    this.applications_exportright = false;
    this.applications_analyticsright = false;
    this.applications_activateright = false;
    this.applications_cloneright = false;
    this.applications_implementright = false;
    this.applications_inactivateright = false;
    this.applications_previewright = false;

    this.appTypeAttributes_viewright = false;
    this.appTypeAttributes_addright = false;
    this.appTypeAttributes_editright = false;
    this.appTypeAttributes_deleteright = false;
    this.appTypeAttributes_listright = false;
    this.appTypeAttributes_exportright = false;

    this.audiences_viewright = false;
    this.audiences_deleteright = false;
    this.audiences_listright = false;
    this.audiences_exportright = false;

    this.auditTrail_viewright = false;
    this.auditTrail_listright = false;
    this.auditTrail_exportright = false;

    this.domains_addright = false;
    this.domains_deleteright = false;
    this.domains_listright = false;
    this.domains_exportright = false;
    this.domains_analyticsright = false;
    this.domains_activateright = false;
    this.domains_inactivateright = false;
    this.domains_addtoplanright = false;
    this.domains_removefromplanright = false;

    this.emailTemplates_addright = false;
    this.emailTemplates_deleteright = false;
    this.emailTemplates_listright = false;
    this.emailTemplates_exportright = false;
    this.emailTemplates_analyticsright = false;
    this.emailTemplates_activateright = false;
    this.emailTemplates_inactivateright = false;
    this.emailTemplates_editright = false;
    this.emailTemplates_viewright = false;

    this.plans_viewright = false;
    this.plans_addright = false;
    this.plans_editright = false;
    this.plans_deleteright = false;
    this.plans_listright = false;
    this.plans_exportright = false;
    this.plans_analyticsright = false;

  }

}
export class Roles {
  public ROLE_ID: number;
  public NAME: string;
  public DISPLAY_NAME: string;
  public STATUS: string;
}
