/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/** LoginComponent has the following methods:
 * formValidations(): This method is used to validate the username.
 * getAuthorised(): This method is used to validate the password.
 * clearmessage(): This method is used to clear error messages.
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
 import { TranslateService } from 'ng2-translate';
import { LoginService } from './login.service';

@Component({
  templateUrl: 'login.html',
  providers: [LoginService]
})

export class LoginComponent {
  public isRequesting: boolean;
  model: Userd = new Userd();
  error = '';
  regToken = '';
  regMessage = 'false';
  redirectUrl = '/transactions/fleetreservations';
  storage: Storage = window.localStorage;
  public loginstatus: any = 'false';
  checkValue: string;
  userToken: string;
  errorMessage: string;
  checkedConfirm = false;
  userAccount: string;
testing123: any;
  /**---- Constructor for login component ----*/
  constructor(private loginService: LoginService,
  private translateService: TranslateService,
  private router: Router) {
    document.body.className = 'app flex-row align-items-center login-body';
  }

  /* ----- Get form Validations ----- */
  formValidations() {
    if (this.model.userName.trim() === undefined || this.model.userName.trim() === '' || this.model.userName.trim() === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
      return false;
    } else if (this.model.userName !== undefined) {
      this.error = '';
      return true;
    }
  }

  /**--- Authentication for login username and password ----*/
  getAuthorised() {
    if (this.formValidations()) {
      if (this.model.password.trim() === undefined || this.model.password.trim() === '' || this.model.password.trim() === null) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_PASSWORD';
      } else if (this.model.password !== '') {
        this.error = '';
        this.isRequesting = true;
      }
    }
    if ((this.model.userName.trim() !== undefined && this.model.password.trim() !== undefined && this.model.password.trim() !== null)
      && (this.model.userName.trim() !== '' && this.model.password.trim() !== '' && this.model.password.trim() !== null)) {
      this.loginService.getAuthorised(this.model.userName, this.model.password, this.regToken)
        .subscribe(
        data => {
          const payload = data.json();
          const headers = data.headers;
          const token = headers.get('token');
          this.loginstatus = true;
          window.localStorage.setItem('token', token);
          document.body.className = 'app sidebar-fixed header-fixed';
          if (this.redirectUrl !== '' && payload['statusCode'] === '1002') {
            this.router.navigate([this.redirectUrl]);
            this.redirectUrl = '';
          } else {
            this.router.navigate(['']);
          }
          this.userToken = headers.get('token');
          window.localStorage.setItem('loggedindata', JSON.stringify(payload['result']));
          window.localStorage.setItem('loginUserLanguage', payload['result']['preferences']['defaultLanguage']);
          window.localStorage.setItem('enterpriseId', payload['result'].enterprise.enterpriseId);
          /**------------------- Fleets listing----------- */
          window.localStorage.setItem('fleetviewstatus', payload['result']['roleRights']['fleets']['viewRights']);
          window.localStorage.setItem('fleetaddstatus', payload['result']['roleRights']['fleets']['addRights']);
          window.localStorage.setItem('fleeteditstatus', payload['result']['roleRights']['fleets']['editRights']);
          window.localStorage.setItem('fleetliststatus', payload['result']['roleRights']['fleets']['listRights']);
          window.localStorage.setItem('fleetdeletedstatus', payload['result']['roleRights']['fleets']['deleteRights']);
          window.localStorage.setItem('fleetimportstatus', payload['result']['roleRights']['fleets']['importRights']);
          window.localStorage.setItem('fleetexportstatus', payload['result']['roleRights']['fleets']['exportRights']);
          window.localStorage.setItem('fleetlocatestatus', payload['result']['roleRights']['fleets']['locateRights']);

          /**------------------- FleetType attribute  listing----------- */
          window.localStorage.setItem('fleetTypeAttributesviewstatus', payload['result']
          ['roleRights']['fleetTypeAttributes']['viewRights']);
          window.localStorage.setItem('fleetTypeAttributesaddstatus', payload['result']
          ['roleRights']['fleetTypeAttributes']['addRights']);
          window.localStorage.setItem('fleetTypeAttributeseditstatus', payload['result']
          ['roleRights']['fleetTypeAttributes']['editRights']);
          window.localStorage.setItem('fleetTypeAttributesliststatus', payload['result']
          ['roleRights']['fleetTypeAttributes']['listRights']);
          window.localStorage.setItem('fleetTypeAttributesdeletedstatus', payload['result']
          ['roleRights']['fleetTypeAttributes']['deleteRights']);
          window.localStorage.setItem('fleetTypeAttributesexportstatus', payload['result']
          ['roleRights']['fleetTypeAttributes']['exportRights']);

          /*----To set lookups in the localstorage  -----*/
          window.localStorage.setItem('lookupviewstatus', payload['result']['roleRights']['lookups']['viewRights']);
          window.localStorage.setItem('lookupaddstatus', payload['result']['roleRights']['lookups']['addRights']);
          window.localStorage.setItem('lookupeditstatus', payload['result']['roleRights']['lookups']['editRights']);
          window.localStorage.setItem('lookupliststatus', payload['result']['roleRights']['lookups']['listRights']);
          window.localStorage.setItem('lookupdeletedstatus', payload['result']['roleRights']['lookups']['deleteRights']);
          window.localStorage.setItem('lookupexportstatus', payload['result']['roleRights']['lookups']['exportRights']);

          /*----To set funfacts in the localstorage  -----*/
          window.localStorage.setItem('funfactsviewstatus', payload['result']['roleRights']['funfacts']['viewRights']);
          window.localStorage.setItem('funfactsaddstatus', payload['result']['roleRights']['funfacts']['addRights']);
          window.localStorage.setItem('funfactseditstatus', payload['result']['roleRights']['funfacts']['editRights']);
          window.localStorage.setItem('funfactsliststatus', payload['result']['roleRights']['funfacts']['listRights']);
          window.localStorage.setItem('funfactsdeletedstatus', payload['result']['roleRights']['funfacts']['deleteRights']);
          window.localStorage.setItem('funfactsimporttatus', payload['result']['roleRights']['funfacts']['importRights']);
          window.localStorage.setItem('funfactsexportstatus', payload['result']['roleRights']['funfacts']['exportRights']);

          /*---- To set rolerights for enterpriseResources ----*/
          window.localStorage.setItem('resourceviewstatus', payload['result']['roleRights']['enterpriseResources']['viewRights']);
          window.localStorage.setItem('resourceaddstatus', payload['result']['roleRights']['enterpriseResources']['addRights']);
          window.localStorage.setItem('resourceeditstatus', payload['result']['roleRights']['enterpriseResources']['editRights']);
          window.localStorage.setItem('resourceliststatus', payload['result']['roleRights']['enterpriseResources']['listRights']);
          window.localStorage.setItem('resourcedeletestatus', payload['result']['roleRights']['enterpriseResources']['deleteRights']);
          window.localStorage.setItem('resourceimportstatus', payload['result']['roleRights']['enterpriseResources']['importRights']);
          window.localStorage.setItem('resourceexportstatus', payload['result']['roleRights']['enterpriseResources']['exportRights']);
          window.localStorage.setItem('resourceblockstatus', payload['result']['roleRights']['enterpriseResources']['blockRights']);
          window.localStorage.setItem('resourceunblockstatus', payload['result']['roleRights']['enterpriseResources']['unblockRights']);
          window.localStorage.setItem('resourcelocatetstatus', payload['result']['roleRights']['enterpriseResources']['locateRights']);

          /*---- To set rolerights for enterpriseResources ----*/
          window.localStorage.setItem('notificationviewstatus', payload['result']['roleRights']['notifications']['viewRights']);
          window.localStorage.setItem('notificationreadstatus', payload['result']['roleRights']['notifications']['readRights']);
          window.localStorage.setItem('notificationunreadstatus', payload['result']['roleRights']['notifications']['unreadRights']);
          window.localStorage.setItem('notificationliststatus', payload['result']['roleRights']['notifications']['listRights']);
          window.localStorage.setItem('notificationdeletestatus', payload['result']['roleRights']['notifications']['deleteRights']);
          window.localStorage.setItem('notificationexportstatus', payload['result']['roleRights']['notifications']['exportRights']);

          /*---- To set rolerights for universalImages ----*/
          window.localStorage.setItem('universalimgviewstatus', payload['result']['roleRights']['universalImages']['viewRights']);
          window.localStorage.setItem('universalimgaddstatus', payload['result']['roleRights']['universalImages']['addRights']);
          window.localStorage.setItem('universalimgeditstatus', payload['result']['roleRights']['universalImages']['editRights']);
          window.localStorage.setItem('universalimgliststatus', payload['result']['roleRights']['universalImages']['listRights']);
          window.localStorage.setItem('universalimgdeletestatus', payload['result']['roleRights']['universalImages']['deleteRights']);
          window.localStorage.setItem('universalimgexportstatus', payload['result']['roleRights']['universalImages']['exportRights']);

          /*---- To set rolerights for advertisements ----*/
          window.localStorage.setItem('advtviewstatus', payload['result']['roleRights']['advertisements']['viewRights']);
          window.localStorage.setItem('advtsaddstatus', payload['result']['roleRights']['advertisements']['addRights']);
          window.localStorage.setItem('advtseditstatus', payload['result']['roleRights']['advertisements']['editRights']);
          window.localStorage.setItem('advtsliststatus', payload['result']['roleRights']['advertisements']['listRights']);
          window.localStorage.setItem('advtsdeletestatus', payload['result']['roleRights']['advertisements']['deleteRights']);
          window.localStorage.setItem('advtsexportstatus', payload['result']['roleRights']['advertisements']['exportRights']);

          /*---- To set rolerights for imports ----*/
          window.localStorage.setItem('importviewstatus', payload['result']['roleRights']['importHistory']['viewRights']);
          window.localStorage.setItem('importliststatus', payload['result']['roleRights']['importHistory']['listRights']);
          window.localStorage.setItem('importdeletestatus', payload['result']['roleRights']['importHistory']['deleteRights']);
          window.localStorage.setItem('importexportstatus', payload['result']['roleRights']['importHistory']['exportRights']);

          /*---- To set rolerights for callhistory ----*/
          window.localStorage.setItem('callhistoryviewstatus', payload['result']['roleRights']['callHistory']['viewRights']);
          window.localStorage.setItem('callhistoryliststatus', payload['result']['roleRights']['callHistory']['listRights']);
          window.localStorage.setItem('callhistorydeletestatus', payload['result']['roleRights']['callHistory']['deleteRights']);
          window.localStorage.setItem('callhistoryexportstatus', payload['result']['roleRights']['callHistory']['exportRights']);

          /*--- To set Role rights for Message history ---*/
          window.localStorage.setItem('msghistoryviewstatus', payload['result']['roleRights']['messageHistory']['viewRights']);
          window.localStorage.setItem('msghistoryliststatus', payload['result']['roleRights']['messageHistory']['listRights']);
          window.localStorage.setItem('msghistorydeletestatus', payload['result']['roleRights']['messageHistory']['deleteRights']);
          window.localStorage.setItem('msghistoryexportstatus', payload['result']['roleRights']['messageHistory']['exportRights']);
          window.localStorage.setItem('msghistoryaddstatus', payload['result']['roleRights']['messageHistory']['addRights']);

          /*--- To set roles rights for userroles page ---*/
          window.localStorage.setItem('roleRightsViewstatus', payload['result']['roleRights']['roleRights']['viewRights']);
          window.localStorage.setItem('roleRightsAddstatus', payload['result']['roleRights']['roleRights']['addRights']);
          window.localStorage.setItem('roleRightsEditstatus', payload['result']['roleRights']['roleRights']['editRights']);
          window.localStorage.setItem('roleRightsDeletestatus', payload['result']['roleRights']['roleRights']['deleteRights']);
          window.localStorage.setItem('roleRightsrenamestatus', payload['result']['roleRights']['roleRights']['renameRights']);

          /**---- To set role rights in  Users in the localstorage  -----*/
          window.localStorage.setItem('usersviewstatus', payload['result']['roleRights']['users']['viewRights']);
          window.localStorage.setItem('usersaddstatus', payload['result']['roleRights']['users']['addRights']);
          window.localStorage.setItem('userseditstatus', payload['result']['roleRights']['users']['editRights']);
          window.localStorage.setItem('usersliststatus', payload['result']['roleRights']['users']['listRights']);
          window.localStorage.setItem('usersdeletedstatus', payload['result']['roleRights']['users']['deleteRights']);
          window.localStorage.setItem('usersimporttatus', payload['result']['roleRights']['users']['importRights']);
          window.localStorage.setItem('usersexportstatus', payload['result']['roleRights']['users']['exportRights']);
          window.localStorage.setItem('usersblockstatus', payload['result']['roleRights']['users']['blockRights']);
          window.localStorage.setItem('usersunblockstatus', payload['result']['roleRights']['users']['unblockRights']);
          window.localStorage.setItem('userslocatestatus', payload['result']['roleRights']['users']['locateRights']);

          /** ---- To set Role rights for login history-----*/
          window.localStorage.setItem('loginhistoryviewstatus', payload['result']['roleRights']['loginHistory']['viewRights']);
          window.localStorage.setItem('loginhistoryliststatus', payload['result']['roleRights']['loginHistory']['listRights']);
          window.localStorage.setItem('loginhistorydeletedstatus', payload['result']['roleRights']['loginHistory']['deleteRights']);
          window.localStorage.setItem('loginhistoryexportstatus', payload['result']['roleRights']['loginHistory']['exportRights']);

          /** ----To set Enterprises in the localstorage  -----*/
          window.localStorage.setItem('enterprisesviewstatus', payload['result']['roleRights']['enterprises']['viewRights']);
          window.localStorage.setItem('enterprisesaddstatus', payload['result']['roleRights']['enterprises']['addRights']);
          window.localStorage.setItem('enterpriseseditstatus', payload['result']['roleRights']['enterprises']['editRights']);
          window.localStorage.setItem('enterprisesliststatus', payload['result']['roleRights']['enterprises']['listRights']);
          window.localStorage.setItem('enterprisesexportstatus', payload['result']['roleRights']['enterprises']['exportRights']);
          window.localStorage.setItem('enterprisesactivestatus', payload['result']['roleRights']['enterprises']['activateRights']);
          window.localStorage.setItem('enterprisesinactivestatus', payload['result']['roleRights']['enterprises']['inactivateRights']);
          window.localStorage.setItem('enterpriseslocatestatus', payload['result']['roleRights']['enterprises']['locateRights']);

          /** ----To set Events in the localstorage  -----*/
          window.localStorage.setItem('eventviewstatus', payload['result']['roleRights']['events']['viewRights']);
          window.localStorage.setItem('eventaddstatus', payload['result']['roleRights']['events']['addRights']);
          window.localStorage.setItem('eventeditstatus', payload['result']['roleRights']['events']['editRights']);
          window.localStorage.setItem('eventliststatus', payload['result']['roleRights']['events']['listRights']);
          window.localStorage.setItem('eventdeletedstatus', payload['result']['roleRights']['events']['deleteRights']);
          window.localStorage.setItem('eventextendstatus', payload['result']['roleRights']['events']['extendRights']);
          window.localStorage.setItem('eventexportstatus', payload['result']['roleRights']['events']['exportRights']);
          window.localStorage.setItem('eventcancelstatus', payload['result']['roleRights']['events']['cancelRights']);
          window.localStorage.setItem('eventcheckinstatus', payload['result']['roleRights']['events']['checkinRights']);
          window.localStorage.setItem('eventcheckoutstatus', payload['result']['roleRights']['events']['checkoutRights']);
          window.localStorage.setItem('eventlocatestatus', payload['result']['roleRights']['events']['locateRights']);
          window.localStorage.setItem('eventguidedcreate', payload['result']['roleRights']['events']['guidedCreateRights']);

          /** ----To set role rights to Event Registration in the localstorage  -----*/
          window.localStorage.setItem('eventregistrationviewstatus', payload['result']['roleRights']['registrations']['viewRights']);
          window.localStorage.setItem('eventregistrationaddstatus', payload['result']['roleRights']['registrations']['addRights']);
          window.localStorage.setItem('eventregistrationeditstatus', payload['result']['roleRights']['registrations']['editRights']);
          window.localStorage.setItem('eventregistrationliststatus', payload['result']['roleRights']['registrations']['listRights']);
          window.localStorage.setItem('eventregistrationdeletedstatus', payload['result']['roleRights']['registrations']['deleteRights']);
          window.localStorage.setItem('eventregistrationlocatestatus', payload['result']['roleRights']['registrations']['locateRights']);
          window.localStorage.setItem('eventregistrationexportstatus', payload['result']['roleRights']['registrations']['exportRights']);
          window.localStorage.setItem('eventregistrationcheckinstatus', payload['result']['roleRights']['registrations']['checkinRights']);
          window.localStorage.setItem('eventregistrationcheckoutstatus', payload['result']['roleRights']['registrations']
          ['checkoutRights']);
          window.localStorage.setItem('eventregistrationguidedcreatestatus', payload['result']['roleRights']['registrations']
          ['guidedCreateRights']);

          /** ----To set role rights to Fleet reservations in the localstorage  -----*/
          window.localStorage.setItem('fleetreservationviewstatus', payload['result']['roleRights']['reservations']['viewRights']);
          window.localStorage.setItem('fleetreservationaddstatus', payload['result']['roleRights']['reservations']['addRights']);
          window.localStorage.setItem('fleetreservationeditstatus', payload['result']['roleRights']['reservations']['editRights']);
          window.localStorage.setItem('fleetreservationliststatus', payload['result']['roleRights']['reservations']['listRights']);
          window.localStorage.setItem('fleetreservationdeletedstatus', payload['result']['roleRights']['reservations']['deleteRights']);
          window.localStorage.setItem('fleetreservationextendstatus', payload['result']['roleRights']['reservations']['extendRights']);
          window.localStorage.setItem('fleetreservationexportstatus', payload['result']['roleRights']['reservations']['exportRights']);
          window.localStorage.setItem('fleetreservationcheckinstatus', payload['result']['roleRights']['reservations']['checkinRights']);
          window.localStorage.setItem('fleetreservationcheckoutstatus', payload['result']['roleRights']['reservations']['checkoutRights']);
          window.localStorage.setItem('fleetreservationlocatestatus', payload['result']['roleRights']['reservations']['locateRights']);
          window.localStorage.setItem('fleetreservationcancelstatus', payload['result']['roleRights']['reservations']['cancelRights']);
          window.localStorage.setItem('fleetreservationguidedcreate', payload['result']['roleRights']['reservations']['guidedCreateRights']);

           /** ----To set role rights to pick tickets in the localstorage  -----*/
          //  window.localStorage.setItem('pickticketsviewstatus', payload['result']['roleRights']['pickTickets']['viewRights']);
          //  window.localStorage.setItem('pickticketsassignstatus', payload['result']['roleRights']['pickTickets']['assignRights']);
          //  window.localStorage.setItem('pickticketseditstatus', payload['result']['roleRights']['pickTickets']['editRights']);
          //  window.localStorage.setItem('pickticketsliststatus', payload['result']['roleRights']['pickTickets']['listRights']);
          //  window.localStorage.setItem('pickticketsdeletedstatus', payload['result']['roleRights']['pickTickets']['deleteRights']);
          //  window.localStorage.setItem('pickticketsexportstatus', payload['result']['roleRights']['pickTickets']['exportRights']);
          //  window.localStorage.setItem('pickticketslocatestatus', payload['result']['roleRights']['pickTickets']['locateRights']);
          //  window.localStorage.setItem('pickticketscancelstatus', payload['result']['roleRights']['pickTickets']['cancelRights']);
          
          /** ----To set role rights Static Content in the localstorage  -----*/
          window.localStorage.setItem('staticcontentviewstatus', payload['result']['roleRights']['enterpriseStaticContent']['viewRights']);
          window.localStorage.setItem('staticcontentaddstatus', payload['result']['roleRights']['enterpriseStaticContent']['addRights']);
          window.localStorage.setItem('staticcontenteditstatus', payload['result']['roleRights']['enterpriseStaticContent']['editRights']);
          window.localStorage.setItem('staticcontentliststatus', payload['result']['roleRights']['enterpriseStaticContent']['listRights']);
          window.localStorage.setItem('staticcontentdeletedstatus',
            payload['result']['roleRights']['enterpriseStaticContent']['deleteRights']);
          window.localStorage.setItem('staticcontentexportstatus',
            payload['result']['roleRights']['enterpriseStaticContent']['exportRights']);

          window.localStorage.setItem('EnterpriseImage', payload['result'].enterpriseIconFilePath);
          window.localStorage.setItem('fleetCommonName', payload['result']['settings']['fleetCommonName']);
           window.localStorage.setItem('fleetTranslation', payload['result']['settings']['fleetCommonName']);
          window.localStorage.setItem('fleetsTranslation', payload['result']['settings']['fleetCommonName'] + 's');
          const defaultTimezone = payload['result']['preferences']['defaultTimezone'].replace('%2B', '+');
          window.localStorage.setItem('loginUserTimezone', defaultTimezone);
          window.localStorage.setItem('loginUserTheme', payload['result']['preferences']['defaultTheme']);
          window.localStorage.setItem('favstatus', 'logged');
          window.localStorage.setItem('user_id', payload['result']._id);
          window.localStorage.setItem('user_Account', payload['result'].userAccount);
          window.localStorage.setItem('first_name', payload['result']['enterpriseResourceObj']['firstName']);
          window.localStorage.setItem('last_name', payload['result']['enterpriseResourceObj']['lastName']);
          window.localStorage.setItem('rowsPerPage', payload['result']['preferences']['rowsPerPage']);
          window.localStorage.setItem('userrole', payload['result']['userRole']);
          window.localStorage.setItem('enterPriseName', payload['result']['enterprise']['enterpriseName']);

          /** ---- To set role rights to settings page ----*/
          window.localStorage.setItem('advancedReservationWindowInDays', payload['result']['settings']['advancedReservationWindowInDays']);
          window.localStorage.setItem('earlyCheckinWindowInMins', payload['result']['settings']['earlyCheckinWindowInMins']);
          window.localStorage.setItem('expirationGracePeriodInMins', payload['result']['settings']['expirationGracePeriodInMins']);
          window.localStorage.setItem('longTermReservationPossible', payload['result']['settings']['longTermReservationPossible']);
          window.localStorage.setItem('maxActiveReservationsPerUser', payload['result']['settings']['maxActiveReservationsPerUser']);
          window.localStorage.setItem('maxReservationWindowInHrs', payload['result']['settings']['maxReservationWindowInHrs']);
          window.localStorage.setItem('reservationCanBeBumped', payload['result']['settings']['reservationCanBeBumped']);
          window.localStorage.setItem('reservationReminderWindowInMins', payload['result']['settings']['reservationReminderWindowInMins']);
          window.localStorage.setItem('sendReservationReminders', payload['result']['settings']['sendReservationReminders']);
          window.localStorage.setItem('fleetAvaliableColor', payload['result']['settings']['fleetAvaliableColor']);
          window.localStorage.setItem('fleetReservedColor', payload['result']['settings']['fleetReservedColor']);
          window.localStorage.setItem('fleetInactiveColor', payload['result']['settings']['fleetInactiveColor']);
          window.localStorage.setItem('fleetCheckinColor', payload['result']['settings']['fleetCheckinColor']);
         /**---- To set role rights to feedback page---- */
          window.localStorage.setItem('feedbackviewstatus', payload['result']['roleRights']['feedback']['viewRights']);
          window.localStorage.setItem('feedbackaddstatus', payload['result']['roleRights']['feedback']['addRights']);
          window.localStorage.setItem('feedbackeditstatus', payload['result']['roleRights']['feedback']['editRights']);
          window.localStorage.setItem('feedbackliststatus', payload['result']['roleRights']['feedback']['listRights']);
          window.localStorage.setItem('feedbackdeletedstatus', payload['result']['roleRights']['feedback']['deleteRights']);
          window.localStorage.setItem('feedbackexportstatus', payload['result']['roleRights']['feedback']['exportRights']);

          /**----- To set role rights to Help page ---- */
          window.localStorage.setItem('helpviewstatus', payload['result']['roleRights']['help']['viewRights']);
          window.localStorage.setItem('helpaddstatus', payload['result']['roleRights']['help']['addRights']);
          window.localStorage.setItem('helpeditstatus', payload['result']['roleRights']['help']['editRights']);
          window.localStorage.setItem('helpliststatus', payload['result']['roleRights']['help']['listRights']);
          window.localStorage.setItem('helpdeletedstatus', payload['result']['roleRights']['help']['deleteRights']);
          window.localStorage.setItem('helpexportstatus', payload['result']['roleRights']['help']['exportRights']);

          /**---- To set role rights to bill and payment history page ---*/
          window.localStorage.setItem('billpaymentviewstatus', payload['result']['roleRights']['billPaymentHistory']['viewRights']);
          window.localStorage.setItem('billpaymentaddstatus', payload['result']['roleRights']['billPaymentHistory']['addRights']);
          window.localStorage.setItem('billpaymenteditstatus', payload['result']['roleRights']['billPaymentHistory']['editRights']);
          window.localStorage.setItem('billpaymentliststatus', payload['result']['roleRights']['billPaymentHistory']['listRights']);
          window.localStorage.setItem('billpaymentdeletedstatus', payload['result']['roleRights']['billPaymentHistory']['deleteRights']);
          window.localStorage.setItem('billpaymentexportstatus', payload['result']['roleRights']['billPaymentHistory']['exportRights']);

          /**----- To set role rights to Enterprises contracts details page------ */
          window.localStorage.setItem('enterprisecontractsviewstatus', payload['result']['roleRights']['enterpriseContractDetails']
          ['viewRights']);
          window.localStorage.setItem('enterprisecontractsaddstatus', payload['result']['roleRights']['enterpriseContractDetails']
          ['addRights']);
          window.localStorage.setItem('enterprisecontractseditstatus', payload['result']['roleRights']['enterpriseContractDetails']
          ['editRights']);
          window.localStorage.setItem('enterprisecontractsliststatus', payload['result']['roleRights']['enterpriseContractDetails']
          ['listRights']);
          window.localStorage.setItem('enterprisecontractsdeletedstatus', payload['result']['roleRights']['enterpriseContractDetails']
          ['deleteRights']);
          window.localStorage.setItem('enterprisecontractsexportstatus', payload['result']['roleRights']['enterpriseContractDetails']
          ['exportRights']);

          /**--- To set role rights todisplay to map settings page ----*/
          window.localStorage.setItem('displaymapviewstatus', payload['result']['roleRights']['displayToMapSettings']['viewRights']);
          window.localStorage.setItem('displaymapeditstatus', payload['result']['roleRights']['displayToMapSettings']['editRights']);
          window.localStorage.setItem('displaymapliststatus', payload['result']['roleRights']['displayToMapSettings']['listRights']);
          window.localStorage.setItem('displaymapexportstatus', payload['result']['roleRights']['displayToMapSettings']['exportRights']);

          /*----To set rolerights for fleetTypes  -----*/
          window.localStorage.setItem('fleettypesviewstatus', payload['result']['roleRights']['fleetTypes']['viewRights']);
          window.localStorage.setItem('fleettypesaddstatus', payload['result']['roleRights']['fleetTypes']['addRights']);
          window.localStorage.setItem('fleettypeseditstatus', payload['result']['roleRights']['fleetTypes']['editRights']);
          window.localStorage.setItem('fleettypesliststatus', payload['result']['roleRights']['fleetTypes']['listRights']);
          window.localStorage.setItem('fleettypesdeletedstatus', payload['result']['roleRights']['fleetTypes']['deleteRights']);
          window.localStorage.setItem('fleettypesimporttatus', payload['result']['roleRights']['fleetTypes']['importRights']);
          window.localStorage.setItem('fleettypesexportstatus', payload['result']['roleRights']['fleetTypes']['exportRights']);

          /**---- To set role rights to dashboard ----*/
          window.localStorage.setItem('enterpriseresourcesallrights', payload['result']['roleRights']['dashboard']
          ['enterpriseResourcesAllRights']);
          window.localStorage.setItem('enterpriseresourcestotalactive', payload['result']['roleRights']['dashboard']
          ['enterpriseResourcesTotalActive']);
          window.localStorage.setItem('enterpriseresourcestotalinactive', payload['result']['roleRights']['dashboard']
          ['enterpriseResourcesTotalInactive']);
          window.localStorage.setItem('eventregistrationsall', payload['result']['roleRights']['dashboard']
          ['eventRegistrationsAll']);
          window.localStorage.setItem('eventregistrationsaverageperevent', payload['result']['roleRights']['dashboard']
          ['eventRegistrationsAveragePerEvent']);
          window.localStorage.setItem('eventregistrationsaverageperfleet', payload['result']['roleRights']['dashboard']
          ['eventRegistrationsAveragePerFleet']);
          window.localStorage.setItem('eventsaverageperfleet', payload['result']['roleRights']['dashboard']
          ['eventsAveragePerFleet']);
          window.localStorage.setItem('eventsall', payload['result']['roleRights']['dashboard']['eventsAll']);
          window.localStorage.setItem('fleetsall', payload['result']['roleRights']['dashboard']['fleetsAll']);
          window.localStorage.setItem('fleethoursaveragereservedperfleet', payload['result']['roleRights']['dashboard']
          ['fleetHoursAverageReservedPerFleet']);
          window.localStorage.setItem('fleethourstotalreservable', payload['result']['roleRights']['dashboard']
          ['fleetHoursTotalReservable']);
          window.localStorage.setItem('fleethourstotalreserved', payload['result']['roleRights']['dashboard']
          ['fleetHoursTotalReserved']);
          window.localStorage.setItem('fleetreservationsall', payload['result']['roleRights']['dashboard']['fleetReservationsAll']);
          window.localStorage.setItem('fleetreservationsaverageperfleet', payload['result']['roleRights']['dashboard']
          ['fleetReservationsAveragePerFleet']);
          window.localStorage.setItem('fleetstotalactive', payload['result']['roleRights']['dashboard']['fleetsTotalActive']);
          window.localStorage.setItem('fleetstotalinactive', payload['result']['roleRights']['dashboard']['fleetsTotalInactive']);
          window.localStorage.setItem('fleetstotalnontransactable', payload['result']['roleRights']['dashboard']
          ['fleetsTotalNonTransactable']);
          window.localStorage.setItem('fleetstotaltransactable', payload['result']['roleRights']['dashboard']['fleetsTotalTransactable']);
          window.localStorage.setItem('fleetusage', payload['result']['roleRights']['dashboard']['fleetUsage']);
          window.localStorage.setItem('piechartsbycountry', payload['result']['roleRights']['dashboard']['pieChartsByCountry']);
          window.localStorage.setItem('useractivity', payload['result']['roleRights']['dashboard']['userActivity']);
          window.localStorage.setItem('usersall', payload['result']['roleRights']['dashboard']['usersAll']);
          window.localStorage.setItem('userhourshctualaverageperuser', payload['result']['roleRights']['dashboard']
          ['userHoursActualAveragePerUser']);
          window.localStorage.setItem('userhourstotalactual', payload['result']['roleRights']['dashboard']['userHoursTotalActual']);
          window.localStorage.setItem('userhourstotalpotential', payload['result']['roleRights']['dashboard']['userHoursTotalPotential']);
          window.localStorage.setItem('userstotalactive', payload['result']['roleRights']['dashboard']['usersTotalActive']);
          window.localStorage.setItem('userstotalinactive', payload['result']['roleRights']['dashboard']['usersTotalInactive']);

          let usrName = '';
          if (usrName.length === 0) {
            usrName = usrName + ' ' + payload['result'].userAccount;
          }
          usrName = usrName.trim();
          let UserImage = '';
          if (payload['result'].enterpriseResourceObj.enterpriseResourcesImageFileName !== null) {
            UserImage = payload['result'].enterpriseResourceObj.enterpriseResourcesImageFilePath + '/'
              + payload['result'].enterpriseResourceObj.enterpriseResourcesImageFileName;
          } else {
            UserImage = payload['result'].enterpriseIconFilePath;
          }
          window.localStorage.setItem('loginUserDateFormat', payload['result']['preferences']['dateFormat']);
          window.localStorage.setItem('userName', usrName);
          window.localStorage.setItem('UserImage', UserImage);
          if (this.checkValue === 'Y') {
            const passEnc = window.btoa(this.model.password);
            window.localStorage.setItem('username', this.model.userName);
            window.localStorage.setItem('password', passEnc);
          }
          this.isRequesting = false;
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
              break;
            case 400:
              this.isRequesting = false;
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
              break;
          }
        });
    }
  }

  /* ------ Enter key Press ---- */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getAuthorised();
    }
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

}
export class Userd {
  public userName = '';
  public password = '';
  public msg: string;
}
