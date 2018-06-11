/*
* EventsModalComponent have below methods:
* showChildModal(updateaction, eventRegid): To show the child modal.
* ngOnInit():  To load Content at lloading time.
* showChildModal(updateaction, eventReg): To open the popup.
* getFleetNameByEntId(enterpriseid): Get Fleets Details.
* getEventNames(fleetvalues): Get Event Name.
* getEventDataonchange(eventvalues): To Select get Fleet Names on change.
* getEnterprise(): To get Enterprise List.
* getStatus(): To get Status.
* getEventType(): To get Event Type.
* getEventRegDetails(evenRegId): Get Event Registration Details.
* getReasons(): To get the reasons list.
* selectUserInfo(uservalue): To split the user id and name.
* updateUserInfo(uservalues): To split the user id and name.
* getreason(reason): To change the reason list.
* addEventReg(): Add Event Registration.
* unRegEventReg(eventRegViewData): To Un Register Event Register.
* checkinEvent(enterpriseId): To Check in Event.
* checkoutEvent(enterpriseId): To Check out Event.
* deleteEventReg(enterpriId: string): To delete Event Registration.
* @HostListener('keypress', ['$event']): This method for handle the keypreesing.
* clearmessage(): To clear the messages.
* hideChildModal(): To hide the modal.
* closeView(): To close child modal.
*/

import {
  Component, OnInit, ViewChild, ViewContainerRef, AfterContentChecked,
  Output, Inject, AfterViewInit, EventEmitter, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { EventRegistrationService } from './eventregistration.service';
import { FleetReservationServices } from '../../fleetreservations/fleetreservationpopup/fleetreservation.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-eventsreg-popup',
  templateUrl: 'eventregistration.html',
  providers: [EventRegistrationService, FleetReservationServices]
})

export class EventRegistrationComponent implements OnInit, AfterViewInit, AfterContentChecked {
  updateaction: any;
  enterpriseid: any;
  userAccount: any;
  reason: any;
  comment: any;
  error: any;
  deleteerror: any;
  action: any;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  enterpriseNameslist: any;
  enterprisesSize: any;
  fleetNameList: any;
  eventRegAdd: any;
  entId: any = '';
  status: any;
  eventType: any;
  enterprisesName = [];
  errorMessage: string;
  enterprise: any;
  eventRegistration: any;
  entNameAdd: any;
  fleetNameAdd: any;
  eventNameAdd: any;
  fleetId: any;
  eventNameList: any;
  eventRegViewData: any;
  enabled: any;
  description: any;
  createdAt: any;
  updatedAt: any;
  fleetNameData: any;
  eventNameData: any;
  fleetValues: any;
  updatefleetId: any;
  updateeventId: any;
  fleetNames: any;
  fleetName: any;
  showfleets: any;
  showevent: any;
  eventId: any;
  eventName: any;
  eventValues: any;
  startdate: any;
  enddate: any;
  registrationCloseDate: any;
  enterpriseIconFilePath: any;
  attributeList: any;
  attributevalue: any;
  userId: any;
  usersList: any;
  userValues: any;
  updateduserValues: any;
  updateuserId: any;
  updateuserAccount: any;
  userrole: any;
  retext: any;
  reasons: any;
  reasonValue: any;
  oldreasonValue: any;
  timezoneCode: any;
  worknumber: any;
  worknumbercntrycode: any;
  worknumext: any;
  utctimezone: any;
  utctimezonestring: any;
  timeZones: any[];
  timezoneCodes: any;
  worknumbercntrycodesplit: any[];
  enterpriseIcon: any;
  loginUserDateFormat: any;
  workNumberExtn: any;
  userAccountName: any;
  enterprisenames: any;
  fleet: any;
  enterName: any;
  fleetname: any;
  fleetCommonName: any;
  userName: any;
  checkOutDate: any;
  checkInDate: any;
  @Output()
  deleted: EventEmitter<string> = new EventEmitter();
  @ViewChild('childModal') public childModal: ModalDirective;

  /**---- Constructor for  Event Registration Component ----*/
  constructor(private eventRegistrationService: EventRegistrationService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    public singleFleetReservationServices: FleetReservationServices,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('enterpriseEndUser') private enterpriseEndUser) { }

  /*---- To load Content at lloading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userToken = window.localStorage.getItem('token');
    this.userrole = window.localStorage.getItem('userrole');
    this.eventRegistration = {};
    this.eventRegistration.enterprise = {};
    this.eventRegistration.fleet = {};
    this.eventRegistration.event = {};
    this.description = '';
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();

  }
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
  }
  ngAfterViewInit() {
    window.localStorage.setItem('eventRegCreate', 'eventRegCreate');
    if (window.localStorage.getItem('eventRegCreate') === ('eventRegCreate')) {
      this.eventRegistrationService.getEventsInfoByeventId(this.userToken, Number(window.localStorage.getItem('eventIdValue')))
        .subscribe(
        eventData => {
          this.showChildModal('MAPSCREATE', eventData['result']);
          window.localStorage.removeItem('eventRegCreate');
          window.localStorage.removeItem('eventIdValue');
        });
    }
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (window.localStorage.getItem('eventregisterationid') !== undefined && window.localStorage.getItem('eventregisterationid') !== null) {
      this.eventRegistrationService.geteventRegistrationById(this.userToken, Number(window.localStorage.getItem('eventregisterationid')))
        .subscribe(data => {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            data['result'][0].eventObj.startDatetime = moment(data['result'][0].eventObj.startDatetime).utc().add(utctimesplit[0], 'hours');
            data['result'][0].eventObj.startDatetime = moment(data['result'][0].eventObj.startDatetime).
              add(utctimesplit[1], 'minutes');
            data['result'][0].eventObj.startDatetime = moment(data['result'][0]
              .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][0].eventObj.endDatetime = moment(data['result'][0].eventObj.endDatetime).utc().add(utctimesplit[0], 'hours');
            data['result'][0].eventObj.endDatetime = moment(data['result'][0].eventObj.endDatetime).add(utctimesplit[1], 'minutes');
            data['result'][0].eventObj.endDatetime = moment(data['result'][0]
              .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][0].createdAt = moment(data['result'][0].createdAt).utc().add(utctimesplit[0], 'hours');
            data['result'][0].createdAt = moment(data['result'][0].createdAt).add(utctimesplit[1], 'minutes');
            data['result'][0].updatedAt = moment(data['result'][0].updatedAt).utc().add(utctimesplit[0], 'hours');
            data['result'][0].updatedAt = moment(data['result'][0].updatedAt).add(utctimesplit[1], 'minutes');
            data['result'][0].eventObj.eventRegistrationCloseDate = moment(data['result'][0]
              .eventObj.eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
            data['result'][0].eventObj.eventRegistrationCloseDate = moment(data['result'][0]
              .eventObj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            data['result'][0].eventObj.startDatetime = moment(data['result'][0].eventObj.startDatetime).utc().
              subtract(utctimesplit[0], 'hours');
            data['result'][0].eventObj.startDatetime = moment(data['result'][0].eventObj.startDatetime).
              subtract(utctimesplit[1], 'minutes');
            data['result'][0].eventObj.startDatetime = moment(data['result'][0]
              .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][0].eventObj.endDatetime = moment(data['result'][0].eventObj.endDatetime).utc().
              subtract(utctimesplit[0], 'hours');
            data['result'][0].eventObjendDatetime = moment(data['result'][0].eventObj.endDatetime).
              subtract(utctimesplit[1], 'minutes');
            data['result'][0].eventObj.endDatetime = moment(data['result'][0]
              .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][0].createdAt = moment(data['result'][0].createdAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][0].createdAt = moment(data['result'][0].createdAt).subtract(utctimesplit[1], 'minutes');
            data['result'][0].updatedAt = moment(data['result'][0].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][0].updatedAt = moment(data['result'][0].updatedAt).subtract(utctimesplit[1], 'minutes');
            data['result'][0].eventObj.eventRegistrationCloseDate = moment(data['result'][0]
              .eventObj.eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
            data['result'][0].eventObj.eventRegistrationCloseDate = moment(data['result'][0]
              .eventObj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
          }
          if (window.localStorage.getItem('eventregistrationscheckin') === 'eventregistrationscheckin') {
            this.showChildModal('CHECKIN', data['result'][0]);
            window.localStorage.removeItem('eventregistrationscheckin');
          } else if (window.localStorage.getItem('eventregistrationscheckout') === 'eventregistrationscheckout') {
            this.showChildModal('CHECKOUT', data['result'][0]);
            window.localStorage.removeItem('eventregistrationscheckout');
          } else if (window.localStorage.getItem('eventregistrationCancel') === 'eventregistrationCancel') {
            this.showChildModal('UNREGISTER', data['result'][0]);
            window.localStorage.removeItem('eventregistrationCancel');
          }

          window.localStorage.removeItem('eventregisterationid');
        });
    }
  }
  /*---- To show child modal ----*/
  public showChildModal(updateaction, eventReg): void {
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';
    if (updateaction === 'VIEW' || updateaction === 'CHECKIN' || updateaction === 'CHECKOUT') {
      this.eventRegViewData = eventReg;
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.worknumbercntrycode = this.eventRegViewData.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== null && this.worknumbercntrycode !== undefined) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.eventRegViewData.fleetObj.contactDetails.workNumberExtn;
      this.attributeList = this.eventRegViewData.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.createdAt = moment(this.eventRegViewData['createdAt'])
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.eventRegViewData['updatedAt'])
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enabled = this.eventRegViewData.isEnabled;
      this.startdate = moment(this.eventRegViewData['eventObj']
        .startDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventRegViewData['eventObj']
        .endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventRegViewData['eventObj'].eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.action = 'View';
      this.retext = true;
      if (this.eventRegViewData.checkInDatetime) {
        this.checkInDate = moment(this.eventRegViewData.checkInDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkInDate = '';
      }
      if (this.eventRegViewData.checkOutDatetime) {
        this.checkOutDate = moment(this.eventRegViewData.checkOutDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkOutDate = '';
      }
      this.reasonValue = this.eventRegViewData.reasonUnregister;
      this.enterpriseIcon = this.eventRegViewData.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventRegViewData.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      if (this.eventRegViewData.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventRegViewData.fleetObj.contactDetails.workNumber;
        this.workNumberExtn = this.eventRegViewData.fleetObj.contactDetails.workNumberExtn;
        if (this.workNumberExtn === '' && this.workNumberExtn === null && this.workNumberExtn === undefined) {
          this.workNumberExtn = '';
        }
        if (this.worknumbercntrycode) {
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventRegViewData.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'UNREGISTER') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.description = '';
      this.eventRegViewData = eventReg;
      this.attributeList = this.eventRegViewData.fleetObj.attributes;
      this.worknumbercntrycode = this.eventRegViewData.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== null && this.worknumbercntrycode !== undefined) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.workNumberExtn = this.eventRegViewData.fleetObj.contactDetails.workNumberExtn;
      if (this.workNumberExtn === '' && this.workNumberExtn === null && this.workNumberExtn === undefined) {
        this.workNumberExtn = '';
      }
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.createdAt = moment(this.eventRegViewData['createdAt'])
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.eventRegViewData['updatedAt'])
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enabled = this.eventRegViewData.isEnabled;
      this.startdate = moment(this.eventRegViewData['eventObj']
        .startDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventRegViewData['eventObj']
        .endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventRegViewData['eventObj'].eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.action = 'Unregister';
      this.retext = false;
      if (this.eventRegViewData.checkInDatetime) {
        this.checkInDate = moment(this.eventRegViewData.checkInDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkInDate = '';
      }
      if (this.eventRegViewData.checkOutDatetime) {
        this.checkOutDate = moment(this.eventRegViewData.checkOutDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkOutDate = '';
      }
      this.getReasons();
      this.oldreasonValue = this.eventRegViewData.reasonUnregister;
      this.enterpriseIcon = this.eventRegViewData.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventRegViewData.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      if (this.eventRegViewData.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventRegViewData.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== null && this.worknumbercntrycode !== undefined) {
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventRegViewData.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventRegViewData.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'DELETE') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.eventRegViewData = eventReg;
      this.attributeList = this.eventRegViewData.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.createdAt = moment(this.eventRegViewData['createdAt'])
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.eventRegViewData['updatedAt'])
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enabled = this.eventRegViewData.isEnabled;
      this.startdate = moment(this.eventRegViewData['eventObj']
        .startDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventRegViewData['eventObj'].endDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventRegViewData['eventObj'].eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      if (this.eventRegViewData.checkInDatetime) {
        this.checkInDate = moment(this.eventRegViewData.checkInDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkInDate = '';
      }
      if (this.eventRegViewData.checkOutDatetime) {
        this.checkOutDate = moment(this.eventRegViewData.checkOutDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkOutDate = '';
      }
      this.action = 'Delete';
      this.retext = true;
      this.reasonValue = this.eventRegViewData.reasonUnregister;
      this.enterpriseIcon = this.eventRegViewData.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventRegViewData.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.worknumbercntrycode = this.eventRegViewData.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== null && this.worknumbercntrycode !== undefined) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.eventRegViewData.fleetObj.contactDetails.workNumberExtn;
      if (this.worknumext === null) {
        this.worknumext = '';
      }
      if (this.eventRegViewData.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventRegViewData.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventRegViewData.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.worknumext;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'CREATE') {
      if (window.localStorage.getItem('userrole') === this.enterpriseEndUser) {
        this.userId = window.localStorage.getItem('user_id');
        this.userAccount = window.localStorage.getItem('user_Account');
        this.userName = window.localStorage.getItem('first_name') + ' ' + window.localStorage.getItem('last_name');
      }
      this.getEnterprise();
      this.getEventType();
      this.getStatus();
      this.fleetNameList = null;
      this.eventNameList = null;
      this.usersList = null;
      this.showfleets = 'false';
      this.showevent = 'false';
      this.eventRegAdd = new EventRegisDetails();
      this.eventRegAdd.entName = '';
      this.userAccountName = '';
      this.eventRegAdd.fleetName = '';
      this.eventRegAdd.eventName = '';
      this.eventRegAdd.status = 'Registered';
      this.eventRegAdd.enabled = true;
      this.action = 'Create';
      this.startdate = '';
      this.enddate = '';
      this.registrationCloseDate = '';
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      // this.userpreferedtimezone = utcformat[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.enterprisenames = true;
      this.fleet = true;
    } else if (updateaction === 'MAPSCREATE') {
      this.enterprisenames = false;
      this.fleet = false;
      this.enterName = eventReg.enterprise.enterpriseName;
      if (window.localStorage.getItem('userrole') === this.enterpriseEndUser) {
        this.userId = window.localStorage.getItem('user_id');
        this.userAccount = window.localStorage.getItem('user_Account');
      }
      this.getEnterprise();
      this.getEventType();
      this.getStatus();
      this.fleetNameList = null;
      this.eventNameList = null;
      this.usersList = null;
      this.showfleets = 'false';
      this.showevent = 'false';
      this.eventRegAdd = new EventRegisDetails();
      this.eventRegAdd.entName = eventReg.enterprise.enterpriseId._id + '$' + this.enterName + '$' +
        eventReg.enterprise.enterpriseId.enterpriseIconFilePath + '$' + eventReg.enterprise.enterpriseId.enterpriseIcon;
      this.fleetname = eventReg.fleetObj.fleetName;
      this.getFleetNameByEntId(eventReg.enterprise.enterpriseId._id + '$' + this.enterName + '$' +
        eventReg.enterprise.enterpriseId.enterpriseIconFilePath + '$' + eventReg.enterprise.enterpriseId.enterpriseIcon);
      this.getFleetNamesonchange(eventReg.fleetObj._id + '$' + this.fleetname);
      this.getEventNames(eventReg.fleetObj._id + '$' + this.fleetname);
      this.userAccountName = '';
      this.eventRegAdd.fleetName = eventReg.fleetObj._id + '$' + this.fleetname;
      this.eventRegAdd.eventName = eventReg.eventName;
      this.eventName = eventReg._id + '$' + eventReg.eventName;
      this.getEventDataonchange(this.eventName);
      this.eventRegAdd.status = 'Registered';
      this.eventRegAdd.enabled = true;
      this.action = 'Create';
      this.startdate = '';
      this.enddate = '';
      this.registrationCloseDate = '';
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      // this.userpreferedtimezone = utcformat[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
    this.childModal.show();
  }

  /*---- To get Status ----*/
  getStatus() {
    this.eventRegistrationService.getStatus()
      .subscribe(timeZoneValues => {
        this.status = timeZoneValues[0].values;
      },
      error => this.errorMessage = <any>error);
  }

  /*---- To get Event Type ----*/
  getEventType() {
    this.eventRegistrationService.getEventType()
      .subscribe(timeZoneValues => {
        this.eventType = timeZoneValues[0].values;
      },
      error => this.errorMessage = <any>error);
  }

  /* ----- Get Fleets Details ------ */
  getFleetNameByEntId(enterpriseid) {
    const enterprise = enterpriseid.split('$');
    this.entId = enterprise[0];
    this.enterpriseIcon = enterprise[3];
    this.enterpriseIconFilePath = enterprise[2] + '/' + this.enterpriseIcon;
    if (this.entId === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
    this.userToken = window.localStorage.getItem('token');
    this.showfleets = 'false';
    this.showevent = 'false';
    if (this.entId === '') {
      this.eventRegAdd.fleetName = '';
      this.fleetNameList = null;
      this.eventRegAdd.eventName = '';
      this.eventNameList = null;
      this.usersList = [];
      this.userAccountName = '';
      this.usersList = null;
    } else {
      this.getUserlistByentId(this.entId);
      this.eventRegistrationService.getFleetNameByEntId(this.userToken, this.entId)
        .subscribe(
        enterprisePathList => {
          this.fleetNameList = enterprisePathList['result'];
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
              } else if (statuscode === '9995') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              }
              break;
          }
        });
    }
  }

  /**---- To Select getFleetNamesonchange ----*/
  getFleetNamesonchange(fleetvalues) {
    this.eventRegAdd.eventName = '';
    this.showevent = 'false';
    if (fleetvalues === undefined || fleetvalues === 'undefined') {
      this.fleetId = undefined;
    } else {
      this.fleetValues = fleetvalues.split('$');
      this.fleetId = this.fleetValues[0];
      this.updatefleetId = this.fleetValues[0];
      this.fleetName = this.fleetValues[1];
    }
    this.eventRegistrationService.getFleetDataByFleetId(this.userToken, this.fleetId)
      .subscribe(
      eventsList => {
        this.fleetNameData = eventsList['result'];
        this.showfleets = 'true';
        this.worknumbercntrycode = this.fleetNameData.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleetNameData.contactDetails.workNumberExtn;
        if (this.fleetNameData.contactDetails.workNumber) {
          this.worknumber = this.fleetNameData.contactDetails.workNumber;
          if (this.worknumbercntrycode) {
            this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetNameData.contactDetails.workNumber;
          }
          if (this.worknumext) {
            this.worknumber = this.worknumber + ' x' + this.fleetNameData.contactDetails.workNumberExtn;
          }
        } else {
          this.worknumber = '';
        }
        this.attributeList = eventsList.result.attributes;
        if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
          this.attributevalue = false;

        } else {
          this.attributevalue = true;
        }

      },
      error => {
        switch (JSON.parse(error['_body']).statusCode) {
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /**---- To Select getFleetNamesonchange ----*/
  getEventDataonchange(eventvalues) {
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (eventvalues === undefined || eventvalues === 'undefined' || eventvalues === '') {
      this.eventId = undefined;
      this.showevent = 'false';
    } else {
      this.eventValues = eventvalues.split('$');
      this.eventId = this.eventValues[0];
      this.updateeventId = this.eventValues[0];
      this.eventName = this.eventValues[1];
    }
    this.eventRegistrationService.getEventDataByEventId(this.userToken, this.eventId)
      .subscribe(
      eventsList => {
        this.eventNameData = eventsList['result'];
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime).utc().subtract(utctimesplit[0], 'hours');
          this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime).subtract(utctimesplit[1], 'minutes');
          this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
          this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime).utc().subtract(utctimesplit[0], 'hours');
          this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime).subtract(utctimesplit[1], 'minutes');
          this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
          this.eventNameData.eventRegistrationCloseDate = moment(this.eventNameData.eventRegistrationCloseDate).utc()
            .subtract(utctimesplit[0], 'hours');
          this.eventNameData.eventRegistrationCloseDate = moment(this.eventNameData.eventRegistrationCloseDate)
            .subtract(utctimesplit[1], 'minutes');

        } else {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime).utc().add(utctimesplit[0], 'hours');
          this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime).add(utctimesplit[1], 'minutes');
          this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
          this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime).utc().add(utctimesplit[0], 'hours');
          this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime).add(utctimesplit[1], 'minutes');
          this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
          this.eventNameData.eventRegistrationCloseDate = moment(this.eventNameData.eventRegistrationCloseDate).utc()
            .add(utctimesplit[0], 'hours');
          this.eventNameData.eventRegistrationCloseDate = moment(this.eventNameData.eventRegistrationCloseDate)
            .add(utctimesplit[1], 'minutes');
        }
        this.eventNameData.startDatetime = moment(this.eventNameData.startDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
        this.eventNameData.endDatetime = moment(this.eventNameData.endDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
        this.registrationCloseDate = moment(this.eventNameData.eventRegistrationCloseDate).
          format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
        this.showevent = 'true';
      },
      error => {
        switch (JSON.parse(error['_body']).statusCode) {
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /* ----- Get Event Name ----- */
  getEventNames(fleetvalues) {
    const enterprise = fleetvalues.split('$');
    this.fleetId = enterprise[0];
    if (this.fleetId === '') {
      this.eventRegAdd.eventName = '';
      this.eventNameList = null;
      this.showfleets = 'false';
      this.showevent = 'false';
    } else {
      this.eventRegistrationService.getEventNameByFleetId(this.userToken, this.fleetId)
        .subscribe(
        eventsList => {
          this.eventNameList = eventsList['result'];
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
              } else if (statuscode === '9995') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              }
              break;
          }
        });
    }
  }

  /*---- To get Enterprise List ----*/
  getEnterprise() {
    this.eventRegistrationService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'][0].enterpriseName;
            this.getFleetNameByEntId(data['result'][0]._id +
              '$' + data['result'][0].enterpriseName + '$' + data['result'][0].enterpriseIconFilePath
              + '$' + data['result'][0].enterpriseIcon);
            this.eventRegAdd.entName = data['result'][0]._id
              + '$' + data['result'][0].enterpriseName + '$'
              + data['result'][0].enterpriseIconFilePath + '$' + data['result'][0].enterpriseIcon;
            this.enterpriseNameslist = data['result'];
            if (window.localStorage.getItem('userrole') === this.enterpriseEndUser) {
              this.userId = window.localStorage.getItem('user_id');
              this.userAccount = window.localStorage.getItem('user_Account');
            } else {
              this.getUserlistByentId(data['result'][0]._id);
            }
            this.enterprisesSize = true;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
          } else {
            this.enterpriseNameslist = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }

  /** ---- get User list by Enterprise id ----- */
  getUserlistByentId(entId) {
    this.singleFleetReservationServices.getUserListByEntId(this.userToken, entId)
      .subscribe(
      userList => {
        this.usersList = userList['result'];
      },
      error => {
        switch (JSON.parse(error['_body']).statusCode) {
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /*---- To get reasons list   ---*/
  public getReasons() {
    this.eventRegistrationService.getLookupsByEnterprise(this.userToken, 'EVENT_UNREGISTER_REASONS',
    this.eventRegViewData.enterprise.enterpriseId).subscribe(
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

  /**-------   To split the user id and name  -------- */
  selectUserInfo(uservalue) {
    this.userValues = uservalue.split('$');
    this.userId = this.userValues[0];
    this.userAccount = this.userValues[1];
  }

  /**----- To split the user id and name ------- */
  updateUserInfo(uservalues) {
    this.updateduserValues = uservalues.split('$');
    this.updateuserId = this.userValues[0];
    this.updateuserAccount = this.updateduserValues[1];
  }

  /*---- To change the reason list  ----*/
  getreason(reason) {
    this.reasonValue = reason;
  }

  /* ---- Add Event Registration ---- */
  addEventReg() {
    if (this.eventRegAdd.entName === undefined || this.eventRegAdd.entName === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.eventRegAdd.fleetName === undefined || this.eventRegAdd.fleetName === '') {
      this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.eventRegAdd.eventName === undefined || this.eventRegAdd.eventName === '') {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_NAME';
    } else if (this.userId === '' || this.userId === undefined || this.userId === 'undefined' || this.userId === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
    } else {
      if (this.eventRegAdd.notes !== undefined && this.eventRegAdd.notes !== '') {
        this.eventRegAdd.notes = this.eventRegAdd.notes.trim().replace(/\s\s+/g, ' ');
      }
      this.entNameAdd = this.eventRegAdd.entName.split('$');
      this.fleetNameAdd = this.eventRegAdd.fleetName.split('$');
      this.eventNameAdd = this.eventRegAdd.eventName.split('$');
      this.eventRegistration.enterprise = { 'enterpriseId': this.entNameAdd[0], 'enterpriseName': this.entNameAdd[1] };
      this.eventRegistration.fleetId = this.fleetNameAdd[0];
      this.eventRegistration.eventId = this.eventNameAdd[0];
      this.eventRegistration.status = this.eventRegAdd.status;
      this.eventRegistration.userAccount = this.userAccount;
      this.eventRegistration.isEnabled = this.eventRegAdd.enabled;
      this.eventRegistrationService.addEventReg(this.eventRegistration, this.userToken).subscribe(
        data => {
          const condition = window.localStorage.getItem('advance1');
          if (condition !== 'advance' && window.localStorage.getItem('listFeature') !== 'listFeature') {
            window.localStorage.setItem('Callsimplesearch', 'CallEventsimple');
            this.deleted.emit();
            window.localStorage.removeItem('advance1');
            window.localStorage.removeItem('listFeature');
          } else if (window.localStorage.getItem('listFeature') === 'listFeature') {
            window.localStorage.setItem('detailList', 'detailList');
          } else {
            window.localStorage.setItem('advancecheckin', 'advancecheckin');
          }
          this.childModal.hide();
          this.enterpriseIconFilePath = '';
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        },
        error => {
          const status = JSON.parse(error['status']);
          switch (status) {
            case 500:
              break;
            case 400:
              const statuscode = JSON.parse(error['_body']).statusCode;
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9995') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              } else if (statuscode === '2055') {
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              } else if (statuscode === '2056') {
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              } else if (statuscode === '2064') {
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              }
              break;
          }
        }
      );
    }
  }

  /* ---- To Un Register Event Register ---- */
  unRegEventReg(eventRegViewData) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      this.eventRegistrationService.unRegEventReg(this.eventRegViewData, this.userToken, this.reasonValue).subscribe(
        data => {
          const condition = window.localStorage.getItem('advance1');
          if (condition !== 'advance' && window.localStorage.getItem('listFeature') !== 'listFeature') {
            window.localStorage.setItem('Callsimplesearch', 'CallEventsimple');
            this.deleted.emit();
            window.localStorage.removeItem('advance1');
            window.localStorage.removeItem('listFeature');
          } else if (window.localStorage.getItem('listFeature') === 'listFeature') {
            window.localStorage.setItem('detailList', 'detailList');
          } else {
            window.localStorage.setItem('advancecheckin', 'advancecheckin');
          }
          this.childModal.hide();
          this.description = '';
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CANCEL_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        },
        error => {
          const status = JSON.parse(error['status']);
          switch (status) {
            case 500:
              break;
            case 400:
              const statuscode = JSON.parse(error['_body']).statusCode;
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9995') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              }
              break;
          }
        }
      );
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*-----  To Check in Event ----- */
  checkinEvent(enterpriseId) {
    const loginUserToken = window.localStorage.getItem('token');
    this.eventRegistrationService.checkinEvent(enterpriseId, loginUserToken)
      .subscribe(
      followObj => {
        window.localStorage.removeItem('Eventsimplesearch');
        const condition = window.localStorage.getItem('advance1');
        if (condition !== 'advance' && window.localStorage.getItem('listFeature') !== 'listFeature') {
          window.localStorage.setItem('Callsimplesearch', 'CallEventsimple');
          this.deleted.emit();
          window.localStorage.removeItem('advance1');
          window.localStorage.removeItem('listFeature');
        } else if (window.localStorage.getItem('listFeature') === 'listFeature') {
          window.localStorage.setItem('detailList', 'detailList');
        } else {
          window.localStorage.setItem('advancecheckin', 'advancecheckin');
        }
        this.childModal.hide();
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CHECK_IN_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statusCode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statusCode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
            } else if (statusCode === '2026') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            } else if (statusCode === '9997') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            } else if (statusCode === '1023') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            } else if (statusCode === '9995') {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            }
            break;
          case 500:
            break;
        }
      });
  }

  /*-----  To Check out Event ----- */
  checkoutEvent(enterpriseId) {
    const loginUserToken = window.localStorage.getItem('token');
    this.eventRegistrationService.checkoutEvent(enterpriseId, loginUserToken)
      .subscribe(
      followObj => {
        const condition = window.localStorage.getItem('advance1');
        if (condition !== 'advance' && window.localStorage.getItem('listFeature') !== 'listFeature') {
          window.localStorage.setItem('Callsimplesearch', 'CallEventsimple');
          this.deleted.emit();
          window.localStorage.removeItem('advance1');
          window.localStorage.removeItem('listFeature');
        } else if (window.localStorage.getItem('listFeature') === 'listFeature') {
          window.localStorage.setItem('detailList', 'detailList');
        } else {
          window.localStorage.setItem('advancecheckin', 'advancecheckin');
        }
        this.childModal.hide();
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CHECK_OUT_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statusCode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statusCode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
              this.toastr.success(this.toastermessage.value);
            } else if (statusCode === '2017') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            } else if (statusCode === '9995') {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            }
            break;
          case 500:
            break;
        }
      });
  }

  /*-----  To delete Event Registration  ----- */
  deleteEventReg(enterpriId: string) {
    this.eventRegistrationService.deleteEventReg(enterpriId, this.userToken)
      .subscribe(
      enterpriseDetails => {
        const condition = window.localStorage.getItem('advance1');
        if (condition !== 'advance' && window.localStorage.getItem('listFeature') !== 'listFeature') {
          window.localStorage.setItem('Callsimplesearch', 'CallEventsimple');
          this.deleted.emit();
          window.localStorage.removeItem('advance1');
          window.localStorage.removeItem('listFeature');
        } else if (window.localStorage.getItem('listFeature') === 'listFeature') {
          window.localStorage.setItem('detailList', 'detailList');
        } else {
          window.localStorage.setItem('advancecheckin', 'advancecheckin');
        }
        this.childModal.hide();
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
        this.toastr.success(this.toastermessage.value);
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
            } else if (statuscode === '2013') {
              this.deleteerror = 'COMMON_VALIDATION_MESSAGES.VALID_DELETE_DEPENDENCY';
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '9995') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
              this.toastr.success(this.toastermessage.value);
            }
            break;
        }
      });
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /*---- To close child modal ----*/
  closeView() {
    this.childModal.hide();
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.error = '';
    this.enterpriseIconFilePath = '';
    this.comment = '';
    this.deleteerror = '';
    this.description = '';
    this.childModal.hide();
  }

  /**---- method for handle key press ----*/
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'VIEW') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.updateaction === 'DELETE') {
      if (key === 13) {
        this.deleteEventReg(this.eventRegViewData['_id']);
      }
    }
  }
}

export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}

export class EventRegisDetails {
  public entName: string;
  public fleetName: string;
  public eventType: string;
  public eventName: string;
  public status: string;
  public seatNumber: string;
  public description: string;
  public notes: string;
  public enabled: string;
}
