/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
*/
/**
 * EventsModalComponent have below methods.
 * ngOnInit(): To load the userToken at loading time.
 * showChildModal(updateaction, events): This method is used to show the child modal.
 * gettimeZones(): To get the time zones.
 * getTimezones(timezone): To change the getTimezones list.
 * getEnterprise(): This method is used to get enterprises list.
 * getEnterpriseResources(type): This method is used to split the enterprise id and name.
 * getFleetResources(values): This method is used to split the fleet id and name.
 * getStatus(): To get the status list.
 * getreason(reason):  To change the reason list.
 * getEventTypes(): To get event types.
 * getUserlistByentId(entId): This method is used to get users list.
 * getFleetTypeAttributes(fleetType, enterpriseId): Get Fleet Type Attributes.
 * getcancelReasons(): To get the cancel reasons.
 * getextendReasons(): To get the extend reasons.
 * getUserDetails(userId): To get the user details.
 * getMultipleRegistations(editobj): Method for multiregistrations.
 * eventregisterclosedatechanged(): To load when registerclosedate changed.
 * durationChanged(): To load load when duration changed.
 * selectUserInfo(uservalue): This method is used to split the user id and name.
 * updateUserInfo(uservalues): This method is used to split the user id and name.
 * updategetFleetResources(updatevalues): This method is Update used to split the fleet id and name.
 * selectStatus(statusvalue): To get changed status value.
 * updateselectStatus(updatestatusvalue): To select the status value.
 * selectEventType(eventvalue): To get changed event value.
 * updateselectEventType(updateeventvalue): To update changed event type.
 * startdatechanged(): To load when startdate changed at event creation.
 * daysChanged(days): To change the days.
 * hoursChanged(hours): To change the hours.
 * durationChanged(duration): To change the duraion.
 * getservercurrentutctime(): To get the current UTC time.
 * startDateChange(value): To change the start date.
 * enddatechanged(): To load when enddate changed at event creation.
 * eventregisterclosedatechanged(closevalue): To load when registerclosedate changed.
 * extenddurationChanged(duration): To load when duration changed at event extend.
 * extendenddatechanged(extendendvalue):To load when enddate changed at event extend.
 * createEvent(createobj): This method is used to send event status to service.
 * editEvent(editobj): This method is used to edit event details.
 * editeventsvalid(editobj, advDuration): To edit event validation.
 * deleteEvent(eventId): This method is used to delete event details.
 * extendEvent(eventId): This method is used to extend event details.
 * checkInEvent(eventId): To checkin into the event.
 * checkOutEvent(eventId): To checkout from the event.
 * cancelEvent(eventId): To cancel the event.
 * viewFleet(id): To view the fleet data.
 * autocase(text): Auto capitalization for each word.
 * closeView(): This method is used to close child modal.
 * keyPress(e): Method for handle key press.
 * clearmessage(): To clear the messages.
 * hideChildModal(): To hide the popup modal.
 * clearMsg(): This method is used to clear all fields in modal.
 */

import {
  Component, OnInit, ViewChild, ViewContainerRef, AfterContentChecked,
  Output, EventEmitter, Inject, HostListener, AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { Eventservice } from './event.service';
import { Userservice } from '../../../admin/users/userpopup/user.service';
import { EventService } from '../eventslist/events.service';
import { Enterpriseservice } from '../../../admin/enterprises/enterprisepopup/enterprise.service';
import { FleetReservationServices } from '../../fleetreservations/fleetreservationpopup/fleetreservation.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
import { FleetService } from '../../../enterprises/fleets/fleetpopup/fleet.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-events-popup',
  templateUrl: 'event.html',
  providers: [Eventservice, FleetService, Userservice, Enterpriseservice, AdvertisementsService, FleetReservationServices, EventService]
})

export class EventComponent implements OnInit, AfterViewInit, AfterContentChecked {
  public eventobj: any;
  eventList = [];
  value: any;
  userId: any;
  checkInDate: any;
  enterpriseId: any;
  updateaction: any;
  actionType: any;
  enterprisesName = [];
  enterprisesNames: any;
  enterprisesSize: any;
  editobject: any;
  updateuserselect: any;
  timezoneCode: any;
  updateuserId: any;
  updateuserAccount: any;
  editeventname: any;
  userrole: any;
  enterpriseid: any;
  userAccount: any;
  reason: any;
  comment: any;
  error: any;
  pagename: any;
  action: any;
  userToken: any;
  eventName: any;
  toastermessage: any;
  createevent: any;
  fleetValues: any;
  userValues: any;
  fleetId: any;
  fleetName: any;
  startdate: any;
  checkOutDate: any;
  registrationCloseDate: any;
  enddate: any;
  usersList: any;
  updatedAt: any;
  createdAt: any;
  statusValue: any;
  statusId: any;
  lookupName: any;
  statusList: any;
  eventTypesList: any;
  eventValue: any;
  selectedduration: any;
  durationList = [];
  eventTypeId: any;
  lookupTypeName: any;
  minDate: Date;
  extendreasons: any;
  eventRegistrationCloseDate: any;
  createobj: Eventdetails = new Eventdetails();
  storage: Storage = window.localStorage;
  updateenddate: any;
  updatestartdate: any;
  updateenabled: any;
  updatepurpose: any;
  updateeventName: any;
  updateDescription: any;
  updatenotes1: any;
  updatenotes2: any;
  updatenotes3: any;
  updatenotes4: any;
  updatenotes5: any;
  updateseatLimit: any;
  updateenterpriseId: any;
  updateenterpriseName: any;
  updatenotes: any;
  updateeventStatus: any;
  editevent: any;
  updatefleetId: any;
  fleetnamesselect: any;
  updatefleetName: any;
  updatelookupName: any;
  updatestatusValue: any;
  updatestatusId: any;
  updatelookupTypeName: any;
  updateeventValue: any;
  updateeventTypeId: any;
  updatefleetValues: any;
  attributesarray: any[];
  galleryImages: any[];
  fleet: any;
  longitude: any;
  latitude: any;
  fleetvaluestatus = false;
  defaultTimezone: any;
  dateFormat: any;
  attributeList: any;
  attributevalue: any;
  enterpriseIconFilePath: any;
  updateMultiRegistartion: any;
  isTransactable: any;
  flag: any;
  duration: any;
  selecteddays: any;
  selectedhours: any;
  daysList: any = [];
  hoursList: any = [];
  retext: any;
  reasons: any;
  reasonValue: any;
  oldreasonValue: any;
  updatedAt1: any;
  createdAt1: any;
  worknumber: any;
  worknumbercntrycode: any;
  worknumext: any;
  utctimezone: any;
  utctimezonestring: any;
  timeZones: any[];
  timezoneCodes: any;
  userpreferedtimezone: any;
  enterpriseIcon: any;
  worknumbercntrycodesplit: any[];
  loginUserDateFormat: any;
  eventregistrationCloseDate: any;
  currentutc: any;
  enddate1: any;
  closedate1: any;
  startdate1: any;
  errorstartdate: any;
  errorenddate: any;
  errorclosedate: any;
  extendenddate1: any;
  multipledata: any;
  multipleObj: boolean;
  maxActiveReservationsPerUser: any;
  advancedReservationWindowInDays: any;
  advancedReservationWindowInDays1: any;
  advancedReservationWindowInDays2: any;
  userData: any;
  maxReservationWindowInHrs: any;
  maxReservationWindowInHrs1: any;
  maxReservationWindowInHrs2: any;
  earlyCheckinWindowInMins: any;
  enterprisenames: any;
  fleets: any;
  fleetname: any;
  eventOwnerAutoRegister: any;
  stdate: any;
  fleetsCommonName: any;
  fleetCommonName: any;
  part1: any;
  part2: any;
  userName: any;
  fleetTypes: any;
  fleetslist: any;
  fleettype: any;
  fleettypename: any;
  errortype: any;
  toCreateEventOnOtherUser: any;
  fleetSeatAttributesValue: any;
  settime: any;
  currenttime: any;
  time: any;
  date: any;
  fleetid: any;
  enterprise: any;
  type: any;
  asset: any;
  fleetName1: any;
  defaulteventtype: any;
  @ViewChild('childModal') public childModal: ModalDirective;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();

  /**---- Constructor for event component ----*/
  constructor(private router: Router,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private vcr: ViewContainerRef,
    private eventslistservice: EventService,
    private eventservice: Eventservice,
    private singleEnterpriseService: Enterpriseservice,
    public advertisementsService: AdvertisementsService,
    private singleuserservices: Userservice,
    private singleFleetReservationServices: FleetReservationServices,
    private fleetService: FleetService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultSeatLimit') public defaultSeatLimit: number,
    @Inject('defaultDuration') private defaultDuration: number,
    @Inject('defaultDays') private defaultDays: number,
    @Inject('defaultDurationRange') private defaultDurationRange: number,
    @Inject('footerPoweredByName') public footerPoweredByName: string) {
  }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.createobj.isEnabled = true;
    this.userrole = window.localStorage.getItem('userrole');
    this.userToken = window.localStorage.getItem('token');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    // this.timezoneCodes = utcformat[0].trim();
    const num = 0;
    let i: number;
    for (i = num; i <= 11; i++) {
      if (i === 0) {
        this.durationList.push('00');
      } else if (i === 1) {
        this.durationList.push('0' + i * this.defaultDuration);
      } else {
        this.durationList.push(i * this.defaultDuration);
      }
    }
    this.selectedduration = this.defaultDuration;
    this.duration = this.defaultDuration;
    for (let j = 0; j <= this.defaultDays; j++) {
      this.daysList.push(j);
    }
    for (let k = 0; k <= 23; k++) {
      if (k < 10) {
        this.hoursList.push('0' + k);
      } else {
        this.hoursList.push(k);
      }
    }
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.getEnterprise();
    this.getStatus();
    this.getEventTypes();
  }
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
  }
  ngAfterViewInit() {
    /* if (window.localStorage.getItem('eventscheckin') === ('eventscheckin')) {
       this.eventservice.getEventsInfoByeventId(this.userToken, Number(window.localStorage.getItem('checkineventid')))
         .subscribe(
         eventData => {
           this.showChildModal('CHECK-IN', eventData['result']);
           window.localStorage.removeItem('eventscheckin');
           window.localStorage.removeItem('checkineventid');
         });
     }
     if (window.localStorage.getItem('eventscheckout') === ('eventscheckout')) {
       this.eventservice.getEventsInfoByeventId(this.userToken, Number(window.localStorage.getItem('checkouteventid')))
         .subscribe(
         eventData => {
           this.showChildModal('CHECKOUT', eventData['result']);
           window.localStorage.removeItem('eventscheckout');
           window.localStorage.removeItem('checkouteventid');
         });
     }
     if (window.localStorage.getItem('eventsextent') === ('eventsextent')) {
       this.eventservice.getEventsInfoByeventId(this.userToken, Number(window.localStorage.getItem('extendeventid')))
         .subscribe(
         eventData => {
           this.showChildModal('EXTEND', eventData['result']);
           window.localStorage.removeItem('eventsextent');
           window.localStorage.removeItem('extendeventid');
         });
     }
     if (window.localStorage.getItem('eventsCancel') === 'eventsCancel') {
       this.eventservice.getEventsInfoByeventId(this.userToken, Number(window.localStorage.getItem('cancelEventId')))
         .subscribe(
         eventData => {
           this.showChildModal('CANCEL', eventData['result']);
         });
       window.localStorage.removeItem('eventsCancel');
       window.localStorage.removeItem('cancelEventId');
     }*/
    if (window.localStorage.getItem('eventsCreate') === ('eventsCreate')) {
      this.showChildModal('MAPSCREATE', '');
    }
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.eventservice.getEventsInfoByeventId(this.userToken, Number(window.localStorage.getItem('eventreservationid')))
      .subscribe(
      data => {
        if (data['result'].endDatetime > this.currentutc) {
          data['result'].recordstatus = 'active';
          if (data['result'].startDatetime > this.currentutc) {
            data['result'].startdatestatus = 'statdateactive';
          } else {
            data['result'].startdatestatus = 'statdateinactive';
          }
          if (data['result'].eventRegistrationCloseDate > this.currentutc) {
            data['result'].closedatestatus = 'closedateactive';
          } else {
            data['result'].closedatestatus = 'closedateinactive';
          }
        } else {
          data['result'].recordstatus = 'inactive';
        }
        if (this.utctimezonestring.charAt(0) === '+') {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          data['result'].startDatetime = moment(data['result'].startDatetime).utc().add(utctimesplit[0], 'hours');
          data['result'].startDatetime = moment(data['result'].startDatetime).
            add(utctimesplit[1], 'minutes');
          data['result'].startDatetime = moment(data['result'].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
          data['result'].endDatetime = moment(data['result'].endDatetime).utc().add(utctimesplit[0], 'hours');
          data['result'].endDatetime = moment(data['result'].endDatetime).add(utctimesplit[1], 'minutes');
          data['result'].endDatetime = moment(data['result'].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
          data['result'].eventRegistrationCloseDate = moment(data['result']
            .eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
          data['result'].eventRegistrationCloseDate = moment(data['result']
            .eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
          data['result'].eventRegistrationCloseDate = moment(data['result']
            .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
          data['result'].createdAt = moment(data['result'].createdAt).utc().add(utctimesplit[0], 'hours');
          data['result'].createdAt = moment(data['result'].createdAt).add(utctimesplit[1], 'minutes');
          data['result'].updatedAt = moment(data['result'].updatedAt).utc().add(utctimesplit[0], 'hours');
          data['result'].updatedAt = moment(data['result'].updatedAt).add(utctimesplit[1], 'minutes');
          if (data['result'].checkInDatetime !== undefined &&
            data['result'].checkInDatetime !== 'undefined' &&
            data['result'].checkInDatetime !== null) {
            data['result'].checkInDatetime = moment(data['result']
              .checkInDatetime).utc().add(utctimesplit[0], 'hours');
            data['result'].checkInDatetime = moment(data['result']
              .checkInDatetime).add(utctimesplit[1], 'minutes');
          }
          if (data['result'].checkOutDatetime !== undefined &&
            data['result'].checkOutDatetime !== 'undefined'
            && data['result'].checkOutDatetime !== null) {
            data['result'].checkOutDatetime = moment(data['result']
              .checkOutDatetime).utc().add(utctimesplit[0], 'hours');
            data['result'].checkOutDatetime = moment(data['result']
              .checkOutDatetime).add(utctimesplit[1], 'minutes');
          }
        } else {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          data['result'].startDatetime = moment(data['result'].startDatetime).utc().
            subtract(utctimesplit[0], 'hours');
          data['result'].startDatetime = moment(data['result'].startDatetime).
            subtract(utctimesplit[1], 'minutes');
          data['result'].startDatetime = moment(data['result'].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
          data['result'].endDatetime = moment(data['result'].endDatetime).utc().subtract(utctimesplit[0], 'hours');
          data['result'].endDatetime = moment(data['result'].endDatetime).
            subtract(utctimesplit[1], 'minutes');
          data['result'].endDatetime = moment(data['result'].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
          data['result'].eventRegistrationCloseDate = moment(data['result']
            .eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
          data['result'].eventRegistrationCloseDate = moment(data['result']
            .eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
          data['result'].eventRegistrationCloseDate = moment(data['result']
            .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
          data['result'].createdAt = moment(data['result'].createdAt).utc().subtract(utctimesplit[0], 'hours');
          data['result'].createdAt = moment(data['result'].createdAt).subtract(utctimesplit[1], 'minutes');
          data['result'].updatedAt = moment(data['result'].updatedAt).utc().subtract(utctimesplit[0], 'hours');
          data['result'].updatedAt = moment(data['result'].updatedAt).subtract(utctimesplit[1], 'minutes');
          if (data['result'].checkInDatetime !== undefined &&
            data['result'].checkInDatetime !== 'undefined' &&
            data['result'].checkInDatetime !== null) {
            data['result'].checkInDatetime = moment(data['result']
              .checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
            data['result'].checkInDatetime = moment(data['result']
              .checkInDatetime).subtract(utctimesplit[1], 'minutes');
          }
          if (data['result'].checkOutDatetime !== undefined &&
            data['result'].checkOutDatetime !== 'undefined'
            && data['result'].checkOutDatetime !== null) {
            data['result'].checkOutDatetime = moment(data['result']
              .checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
            data['result'].checkOutDatetime = moment(data['result']
              .checkOutDatetime).subtract(utctimesplit[1], 'minutes');
          }
        }
        if (window.localStorage.getItem('eventscheckin') === ('eventscheckin')) {
          this.showChildModal('CHECK-IN', data['result']);
          window.localStorage.removeItem('eventscheckin');
        }
        if (window.localStorage.getItem('eventscheckout') === ('eventscheckout')) {
          this.showChildModal('CHECKOUT', data['result']);
          window.localStorage.removeItem('eventscheckout');
        }
        if (window.localStorage.getItem('eventsextent') === ('eventsextent')) {
          this.showChildModal('EXTEND', data['result']);
          window.localStorage.removeItem('eventsextent');
        }
        if (window.localStorage.getItem('eventsCancel') === 'eventsCancel') {
          this.showChildModal('CANCEL', data['result']);
          window.localStorage.removeItem('eventsCancel');
        }
        window.localStorage.removeItem('eventreservationid');
      });
  }
  /*---- To show child modal ----*/
  public showChildModal(updateaction, events): void {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.eventobj = events;
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';
    if (updateaction === 'VIEW') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_EVENT';
      this.actionType = 'View';
      this.retext = true;
      this.updateeventStatus = this.eventobj.eventStatus;
      if (this.updateeventStatus === 'Created' || this.updateeventStatus === 'Started') {
        this.reasonValue = this.eventobj.reasonExtend;
      } else {
        this.reasonValue = this.eventobj.reasonCancel;
      }
      this.attributeList = this.eventobj.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.startdate = moment(this.eventobj.startDatetime).format(this.loginUserDateFormat + ' HH:mm'); // + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventobj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventobj.eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      if (this.eventobj.checkInDatetime) {
        this.checkInDate = moment(this.eventobj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkInDate = '';
      }
      if (this.eventobj.checkOutDatetime) {
        this.checkOutDate = moment(this.eventobj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkOutDate = '';
      }
      this.updatedAt = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.eventobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'CHECK-IN') {
      if (this.eventobj.eventOwner.userId.userName === undefined) {
        this.eventobj.eventOwner.userId.userName = this.eventobj.eventOwner.userId.enterpriseResourceObj.firstName + ' ' + this.eventobj.eventOwner.userId.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.attributeList = this.eventobj.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.selectedduration = this.eventobj.duration;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== null && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== '') {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.pagename = 'COMMON_PAGE_TITLES.CHECKIN_EVENT';
      this.actionType = 'Check-In';
      this.retext = null;
      this.earlyCheckinWindowInMins = this.eventobj.fleetObj.settings.earlyCheckinWindowInMins;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.startdate = moment(this.eventobj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.enddate = moment(this.eventobj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventobj.eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      if (this.eventobj.checkInDatetime) {
        this.checkInDate = moment(this.eventobj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkInDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkInDate = '';
      }
      if (this.eventobj.checkOutDatetime) {
        this.checkOutDate = moment(this.eventobj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkOutDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkOutDate = '';
      }
      this.updatedAt = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.eventobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'CHECKOUT') {
      if (this.eventobj.eventOwner.userId.userName === undefined) {
        this.eventobj.eventOwner.userId.userName = this.eventobj.eventOwner.userId.enterpriseResourceObj.firstName + ' ' + this.eventobj.eventOwner.userId.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.attributeList = this.eventobj.fleetObj.attributes;
      this.selectedduration = this.eventobj.duration;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.pagename = 'COMMON_PAGE_TITLES.CHECKOUT_EVENT';
      this.actionType = 'Check Out';
      this.retext = null;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.startdate = moment(this.eventobj.startDatetime).format(this.loginUserDateFormat + ' HH:mm'); // + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventobj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventobj.eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      if (this.eventobj.checkInDatetime) {
        this.checkInDate = moment(this.eventobj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkInDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkInDate = '';
      }
      if (this.eventobj.checkOutDatetime) {
        this.checkOutDate = moment(this.eventobj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkOutDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkOutDate = '';
      }
      this.updatedAt = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.eventobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'CANCEL') {
      if (this.eventobj.eventOwner.userId.userName === undefined) {
        this.eventobj.eventOwner.userId.userName = this.eventobj.eventOwner.userId.enterpriseResourceObj.firstName + ' ' + this.eventobj.eventOwner.userId.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.flag = false;
      this.eventobj.reason = '';
      this.attributeList = this.eventobj.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.pagename = 'COMMON_PAGE_TITLES.CANCEL_EVENT';
      this.actionType = 'Cancel';
      this.retext = false;
      this.getcancelReasons();
      this.oldreasonValue = this.eventobj.reasonCancel;
      this.selectedduration = this.eventobj.duration;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.startdate = moment(this.eventobj.startDatetime).format(this.loginUserDateFormat + ' HH:mm'); // + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventobj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventobj.eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      if (this.eventobj.checkInDatetime) {
        this.checkInDate = moment(this.eventobj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkInDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkInDate = '';
      }
      if (this.eventobj.checkOutDatetime) {
        this.checkOutDate = moment(this.eventobj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkOutDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkOutDate = '';
      }
      this.updatedAt = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.eventobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'EDIT') {
      this.fleettypename = this.eventobj.fleetObj.fleetType;
      this.fleetname = this.eventobj.fleetObj.fleetName;
      this.getservercurrentutctime();
      this.getMultipleRegistations(this.eventobj);
      this.advancedReservationWindowInDays1 = this.eventobj.fleetObj.settings.advancedReservationWindowInDays;
      this.maxReservationWindowInHrs1 = this.eventobj.fleetObj.settings.maxReservationWindowInHrs;
      this.getUserDetails(this.eventobj.eventOwner.userId._id);
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.getUserlistByentId(this.eventobj.enterprise.enterpriseId._id);
      this.getFleetTypes(this.eventobj.enterprise.enterpriseId._id);
      this.eventservice.getFleetNames(this.userToken, this.eventobj.enterprise.enterpriseId._id, this.eventobj.fleetObj.fleetType)
        .subscribe(data => {
          this.eventList = data['result'];
        });
      this.viewFleet(this.eventobj.fleetObj._id);
      this.updatefleetId = this.eventobj.fleetObj._id;
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_EVENT';
      this.selectedduration = this.eventobj.duration;
      this.actionType = 'Edit';
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.updateuserId = this.eventobj.eventOwner.userId._id;
      this.updateuserAccount = this.eventobj.eventOwner.userAccount;
      this.updateuserAccount = this.eventobj.eventOwner.userId.enterpriseResourceObj.firstName + ' ' +
        this.eventobj.eventOwner.userId.enterpriseResourceObj.lastName;
      this.updateuserselect = this.eventobj.eventOwner.userId + '$' + this.eventobj.eventOwner.userAccount;
      this.editobject = updateaction;
      this.minDate = new Date();
      this.updatestartdate = new Date(this.eventobj.startDatetime);
      this.stdate = new Date(this.eventobj.startDatetime);
      this.updateenddate = new Date(this.eventobj.endDatetime);
      this.startdate = this.updatestartdate;
      this.enddate = this.updateenddate;
      this.registrationCloseDate = new Date(this.eventobj.eventRegistrationCloseDate);
      this.checkInDate = new Date(this.eventobj.checkInDatetime);
      this.checkOutDate = new Date(this.eventobj.checkOutDatetime);
      this.updateeventStatus = this.eventobj.eventStatus;
      // time zones code
      this.gettimeZones();
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      this.updatedAt1 = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt1 = moment(this.eventobj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updatefleetName = this.eventobj.fleetObj.fleetName;
      this.fleetnamesselect = this.eventobj.fleetObj._id + '$' + this.eventobj.fleetObj.fleetName;
      this.updateenterpriseId = this.eventobj.enterprise.enterpriseId._id;
      this.updateenterpriseName = this.eventobj.enterprise.enterpriseName;
      this.updatepurpose = this.eventobj.purpose;
      this.updateeventName = this.eventobj.eventName;
      this.updateDescription = this.eventobj.description;
      this.updatenotes1 = this.eventobj.notes1;
      this.updateseatLimit = this.eventobj.seatLimit;
      this.updatenotes = this.eventobj.notes;
      this.updateenabled = this.eventobj.isEnabled;
      this.updatelookupName = this.eventobj.eventStatus;
      this.updatelookupTypeName = this.eventobj.eventType;
      this.updateMultiRegistartion = this.eventobj.isMultiRegistration;
      this.eventOwnerAutoRegister = this.eventobj.eventOwnerAutoRegister;
      const duration = this.eventobj.duration.split(' ');
      if (duration[0] !== undefined && duration[1] !== undefined && duration[2] !== undefined) {
        this.selecteddays = duration[0].split('D')[0];
        this.selectedhours = duration[1].split('H')[0];
        this.selectedduration = duration[2].split('M')[0];
      }
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'DELETE') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.flag = true;
      this.eventobj.reason = '';
      this.attributeList = this.eventobj.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_EVENT';
      this.actionType = 'Delete';
      this.retext = true;
      this.updateeventStatus = this.eventobj.eventStatus;
      if (this.updateeventStatus === 'Created' || this.updateeventStatus === 'Started') {
        this.reasonValue = this.eventobj.reasonExtend;
      } else {
        this.reasonValue = this.eventobj.reasonCancel;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.selectedduration = this.eventobj.duration;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.startdate = moment(this.eventobj.startDatetime).format(this.loginUserDateFormat + ' HH:mm'); // + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.eventobj.endDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.registrationCloseDate = moment(this.eventobj.eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.eventobj.createdAt).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      if (this.eventobj.checkInDatetime) {
        this.checkInDate = moment(this.eventobj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkInDate = '';
      }
      if (this.eventobj.checkOutDatetime) {
        this.checkOutDate = moment(this.eventobj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      } else {
        this.checkOutDate = '';
      }

      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'EXTEND') {
      if (this.eventobj.eventOwner.userId.userName === undefined) {
        this.eventobj.eventOwner.userId.userName = this.eventobj.eventOwner.userId.enterpriseResourceObj.firstName + ' ' + this.eventobj.eventOwner.userId.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.reasonValue = '';
      this.flag = false;
      this.eventobj.reason = '';
      this.attributeList = this.eventobj.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.gettimeZones();
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;

      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.pagename = 'COMMON_PAGE_TITLES.EXTEND_EVENT';
      this.actionType = 'Extend';
      this.maxReservationWindowInHrs1 = this.eventobj.fleetObj.settings.maxReservationWindowInHrs;
      this.getUserDetails(this.eventobj.eventOwner.userId._id);
      this.retext = false;
      this.getextendReasons();
      this.oldreasonValue = this.eventobj.reasonExtend;
      this.selectedduration = this.eventobj.duration;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      this.startdate = moment(this.eventobj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.minDate = new Date();
      this.enddate = new Date(this.eventobj.endDatetime);
      this.registrationCloseDate = moment(this.eventobj.eventRegistrationCloseDate)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.updatedAt = moment(this.eventobj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.eventobj.checkInDatetime) {
        this.checkInDate = moment(this.eventobj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkInDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkInDate = '';
      }
      if (this.eventobj.checkOutDatetime) {
        this.checkOutDate = moment(this.eventobj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
        // moment(this.eventobj.checkOutDatetime).format('YYYY-MM-DD HH:mm');
      } else {
        this.checkOutDate = '';
      }
      const duration = this.eventobj.duration.split(' ');
      this.selecteddays = duration[0].split('D')[0];
      this.selectedhours = duration[1].split('H')[0];
      this.selectedduration = duration[2].split('M')[0];
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }

    } else if (updateaction === 'CREATE') {
      this.getservercurrentutctime();
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_EVENT';
      this.actionType = 'Create';
      this.selectedduration = this.defaultDuration;
      this.createobj.seatLimit = this.defaultSeatLimit;
      if (window.localStorage.getItem('userrole') === 'Enterprise End User') {
        this.userId = window.localStorage.getItem('user_id');
        this.userAccount = window.localStorage.getItem('user_Account');
        this.userName = window.localStorage.getItem('first_name') + ' ' + window.localStorage.getItem('last_name');
      }
      this.duration = this.defaultDuration;
      this.gettimeZones();
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.selecteddays = '0';
      this.selectedhours = '00';
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.stdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      this.eventregistrationCloseDate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() -
        Number(5)))).format('YYYY-MM-DD HH:mm');

      if (window.localStorage.getItem('createevent') === 'eventpopup') {
        if (window.localStorage.getItem('eventfleet_id')) {
          this.fleetid = window.localStorage.getItem('eventfleet_id');
        } else if (window.localStorage.getItem('fleetreservaton_id')) {
          this.fleetid = window.localStorage.getItem('fleetreservaton_id');
        } else {
          this.fleetid = window.localStorage.getItem('fleets_id');
        }
        this.getFleetsdata(this.fleetid);
        this.settime = window.localStorage.getItem('time');

        // this.settime = moment(this.settime).format('YYYY-MM-DD HH:mm');
        this.currenttime = moment(new Date()).format('YYYY-MM-DD HH:mm');

        if (this.settime < this.currenttime) {
          // this.startdate = new Date(Math.ceil(this.date.getTime() / this.time) * this.time);
          this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
          this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
            Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
          this.eventregistrationCloseDate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() -
            Number(5)))).format('YYYY-MM-DD HH:mm');
        } else {
          this.startdate = this.settime;
          this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
            Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
          this.eventregistrationCloseDate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() -
            Number(5)))).format('YYYY-MM-DD HH:mm');
        }
      }
      window.localStorage.removeItem('createevent');

      this.createobj.isEnabled = true;
      this.createobj.eventOwnerAutoRegister = true;
      this.eventRegistrationCloseDate = this.startdate;
      this.checkInDate = new Date();
      this.checkOutDate = new Date();
      this.minDate = new Date();
      this.getEnterprise();
      this.getStatus();
      this.getEventTypes();
      this.enterprisenames = true;
      this.fleets = true;
    } else if (updateaction === 'MAPSCREATE') {
      this.enterprisenames = false;
      this.fleets = false;
      this.getservercurrentutctime();
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_EVENT';
      this.actionType = 'Create';
      this.selectedduration = this.defaultDuration;
      this.createobj.seatLimit = this.defaultSeatLimit;
      // if (window.localStorage.getItem('userrole') === 'Enterprise End User') {
      //   this.userId = window.localStorage.getItem('user_id');
      //   this.userAccount = window.localStorage.getItem('user_Account');
      //   this.userName = window.localStorage.getItem('first_name') + ' ' + window.localStorage.getItem('last_name');
      // }
      this.fleetname = window.localStorage.getItem('fleetNameValue');
      this.getEnterpriseResources(window.localStorage.getItem('entIdValue') + '~' + window.localStorage.getItem('entNamValue'));
      this.getFleetResources(window.localStorage.getItem('fleetIdValue') + '$' + window.localStorage.getItem('fleetNameValue'));
      this.fleetId = window.localStorage.getItem('fleetIdValue');
      this.fleettype = window.localStorage.getItem('fleettypevalue');
      this.duration = this.defaultDuration;
      this.gettimeZones();
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.selecteddays = '0';
      this.selectedhours = '00';
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      this.eventregistrationCloseDate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() -
        Number(5)))).format('YYYY-MM-DD HH:mm');
      this.createobj.isEnabled = true;
      this.eventRegistrationCloseDate = this.startdate;
      this.checkInDate = new Date();
      this.checkOutDate = new Date();
      this.minDate = new Date();
      this.getEnterprise();
      this.getStatus();
      this.getEventTypes();
    }
    else if (updateaction === 'REBOOK') {
      this.pagename = 'COMMON_PAGE_TITLES.REBOOK_EVENT';
      this.actionType = 'Rebook';
      this.enterpriseId = this.eventobj.enterprise.enterpriseId._id;
      this.enterprisesName = this.eventobj.enterprise.enterpriseName;
      this.fleettype = this.eventobj.fleetObj.fleetType;
      this.fleetName = this.eventobj.fleetObj.fleetName;
      this.getservercurrentutctime();
      this.getMultipleRegistations(this.eventobj);
      this.advancedReservationWindowInDays1 = this.eventobj.fleetObj.settings.advancedReservationWindowInDays;
      this.maxReservationWindowInHrs1 = this.eventobj.fleetObj.settings.maxReservationWindowInHrs;
      this.getUserDetails(this.eventobj.eventOwner.userId._id);
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.getUserlistByentId(this.eventobj.enterprise.enterpriseId._id);
      this.getFleetTypes(this.eventobj.enterprise.enterpriseId._id);
      this.eventservice.getFleetNames(this.userToken, this.eventobj.enterprise.enterpriseId._id, this.eventobj.fleetObj.fleetType)
        .subscribe(data => {
          this.eventList = data['result'];
        });
      this.viewFleet(this.eventobj.fleetObj._id);
      this.fleetId = this.eventobj.fleetObj._id;
      this.createobj.eventName = this.eventobj.eventName;
      this.userId = this.eventobj.eventOwner.userId._id;
      this.userAccount = this.eventobj.eventOwner.userAccount;
      this.userName = this.eventobj.eventOwner.userId.enterpriseResourceObj.firstName + ' ' +
        this.eventobj.eventOwner.userId.enterpriseResourceObj.lastName;
      this.lookupTypeName = this.eventobj.eventType;
      this.createobj.seatLimit = this.eventobj.seatLimit;
      this.createobj.isMultiRegistartion = this.eventobj.isMultiRegistration;
      this.createobj.eventOwnerAutoRegister = this.eventobj.eventOwnerAutoRegister;
      this.createobj.purpose = this.eventobj.purpose;
      this.createobj.description = this.eventobj.description;
      this.createobj.notes1 = this.eventobj.notes1;
      this.worknumbercntrycode = this.eventobj.fleetObj.contactDetails.workNumberCountrycode;
      this.worknumext = this.eventobj.fleetObj.contactDetails.workNumberExtn;
      this.enterpriseIcon = this.eventobj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.eventobj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.longitude = this.eventobj.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.eventobj.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
      // time zones code
      this.gettimeZones();
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      const duration = this.eventobj.duration.split(' ');
      if (duration[0] !== undefined && duration[1] !== undefined && duration[2] !== undefined) {
        this.selecteddays = duration[0].split('D')[0];
        this.selectedhours = duration[1].split('H')[0];
        this.selectedduration = duration[2].split('M')[0];
      }
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      this.minDate = new Date();
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.stdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
      this.eventRegistrationCloseDate = this.startdate;
      if (this.eventobj.fleetObj.contactDetails.workNumber) {
        this.worknumber = this.eventobj.fleetObj.contactDetails.workNumber;
        if (this.worknumbercntrycode) {
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventobj.fleetObj.contactDetails.workNumber;
        }
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.eventobj.fleetObj.contactDetails.workNumberExtn;
        }
      } else {
        this.worknumber = '';
      }
    }
    this.childModal.show();
    window.localStorage.removeItem('entNamValue');
    window.localStorage.removeItem('entIdValue');
    window.localStorage.removeItem('fleetIdValue');
    window.localStorage.removeItem('fleetNameValue');
    window.localStorage.removeItem('eventsCreate');
  }

  /**---- To get the time zones ----*/
  public gettimeZones() {
    this.eventservice.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.timeZones = data['result'];
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
      }
    );
  }


  /*--- To change the getTimezones list ---*/
  getTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*---- To get Enterprise List ----*/
  getEnterprise() {
    this.eventservice.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'][0].enterpriseName;
            this.enterpriseId = data['result'][0]._id;
            this.getFleetTypes(this.enterpriseId);
            if (window.localStorage.getItem('userrole') === 'Enterprise End User') {
              this.userId = window.localStorage.getItem('user_id');
              this.userAccount = window.localStorage.getItem('user_Account');
              this.userName = window.localStorage.getItem('first_name') + ' ' + window.localStorage.getItem('last_name');
              this.getUserDetails(this.userId);
              if (this.userData !== undefined) {
                if (this.userData.toCreateEventOnOtherUser) {
                  this.getUserlistByentId(this.enterpriseId);
                }
              }
            } else {
              this.getUserlistByentId(this.enterpriseId);
            }
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
            this.enterprisesSize = true;
          } else {
            this.enterprisesNames = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }
  /**-------   To split the enterprise id and name  -------- */
  getEnterpriseResources(type) {
    this.fleetvaluestatus = false;
    this.value = type.split('~');
    this.enterpriseId = this.value[0];
    this.enterprisesName = this.value[1];
    this.fleetId = '';
    this.userId = '';
    this.enterpriseIconFilePath = this.value[2] + '/' + this.value[3];
    this.usersList = [];
    if (type === '') {
      this.eventList = [];
      this.fleetName = '';
      this.usersList = [];
    } else {
      this.getUserlistByentId(this.enterpriseId);
      this.getFleetTypes(this.enterpriseId);
    }
  }

  /**---- To get the status list ----*/
  getStatus() {
    this.eventservice.getStatus(this.userToken)
      .subscribe(
      statusList => {
        this.statusList = statusList['result'];
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
  public getFleetTypes(enterPriseId) {
    this.eventslistservice.getFleetTypesList(this.userToken, enterPriseId).subscribe(
      data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 0) {
            this.fleetTypes = data['result'];
            // this.addinfo = false;
          } else {
            this.fleetTypes = data['result'][0].fleetTypes;
            // this.getFleetTypeAttributes(this.fleetTypes[0].fleetTypeName);
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
            } break;
        }
      }
    );
  }

  fleettypechane(fleettype) {
    this.fleettype = fleettype;
    this.eventslistservice.getFleetNames(this.userToken, this.enterpriseId, this.fleettype).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.fleetName = '';
          this.fleetvaluestatus = false;
          this.eventList = data['result'];
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
  getFleets(fleetType, enterpriseId) {
    this.eventslistservice.getFleetNames(this.userToken, this.enterpriseId, this.fleettype).subscribe(
      fleets => {
        this.fleetslist = fleets['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }

  /*--- To change the reason list ---*/
  getreason(reason) {
    this.reasonValue = reason;
  }

  /**-------   To split the fleet id and name  -------- */
  getFleetResources(values) {
    this.fleetValues = values.split('$');
    this.fleetId = this.fleetValues[0];
    this.fleetName = this.fleetValues[1];
    if (values === '' || values === 'undefined') {
      this.fleetvaluestatus = false;
    } else {
      this.viewFleet(this.fleetId);
    }
    if (this.enterpriseId === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
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

  /**---- To get the event types ----*/
  getEventTypes() {
    this.eventservice.getEventTypes(this.userToken)
      .subscribe(
      eventTypesList => {
        this.eventTypesList = eventTypesList['result'];
         this.defaulteventtype = eventTypesList['result'][0].lookupName;
        this.lookupTypeName = eventTypesList['result'][0].lookupName;
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

  /** --- Get Fleet Type Attributes--- */
  getFleetTypeAttributes(fleetType, enterpriseId) {
    this.eventservice.getfleetTypeAttributes(this.userToken, fleetType,
      enterpriseId)
      .subscribe(
      attributelist => {
        this.attributeList = attributelist['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }

  /* ---- To get cancel reasons list   ---*/
  public getcancelReasons() {
    this.eventservice.getLookupsByEnterprise(this.userToken, 'EVENT_CANCEL_REASONS', this.eventobj.enterprise.enterpriseId._id).subscribe(
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

  /*---- To get extend reasons list   ---*/
  public getextendReasons() {
    this.eventservice.getLookupsByEnterprise(this.userToken, 'EVENT_EXTEND_REASONS', this.eventobj.enterprise.enterpriseId._id).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.extendreasons = data['result'];
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

  /**---- To get the user details ----*/
  getUserDetails(userId) {
    this.eventservice.userDetails(this.userToken, userId)
      .subscribe(data => {
        if (data !== undefined) {
          this.userData = data['result'].settings;
          this.advancedReservationWindowInDays = this.userData.advancedReservationWindowInDays;
          this.maxReservationWindowInHrs = this.userData.maxReservationWindowInHrs;
          this.maxActiveReservationsPerUser = this.userData.maxActiveReservationsPerUser;
          this.toCreateEventOnOtherUser = this.userData.toCreateEventOnOtherUser;
          if (this.earlyCheckinWindowInMins > this.userData.earlyCheckinWindowInMins) {
            this.earlyCheckinWindowInMins = this.userData.earlyCheckinWindowInMins;
          }
        }
      });
  }

  /**---- Method for multiregistrations ----*/
  getMultipleRegistations(editobj) {
    this.eventservice.getMultipleRegister(editobj._id, this.userToken)
      .subscribe(data => {
        this.multipledata = data['result'];
        if (this.multipledata === false) {
          this.multipleObj = true;
        } else {
          this.multipleObj = false;
        }
      });
  }
  /**-------   To split the user id and name  -------- */
  selectUserInfo(uservalue) {
    this.userValues = uservalue.split('$');
    this.userId = this.userValues[0];
    this.userAccount = this.userValues[1];
    this.maxActiveReservationsPerUser = this.userValues[2];
    this.advancedReservationWindowInDays = this.userValues[3];
    this.maxReservationWindowInHrs = this.userValues[4];
  }

  /**----- To split the user id and name ------- */
  updateUserInfo(uservalues) {
    this.userValues = uservalues.split('$');
    this.updateuserId = this.userValues[0];
    this.updateuserAccount = this.userValues[1];
  }

  /**-------   To split the updategetFleetResources  -------- */
  updategetFleetResources(updatevalues) {
    this.updatefleetValues = updatevalues.split('$');
    this.updatefleetId = this.updatefleetValues[0];
    this.updatefleetName = this.updatefleetValues[1];
    if (updatevalues === '') {
      this.fleetvaluestatus = false;
    } else {
      this.viewFleet(this.updatefleetId);
    }
  }

  /**----- To get the changed status value ----*/
  selectStatus(statusvalue) {
    this.statusValue = statusvalue.split('$');
    this.statusId = this.statusValue[0];
    this.lookupName = this.statusValue[1];
  }

  /**--- To select the status value ----*/
  updateselectStatus(updatestatusvalue) {
    if (updatestatusvalue === undefined || updatestatusvalue === 'undefined') {
      this.updatelookupName = this.updatelookupName;
    } else {
      this.updatestatusValue = updatestatusvalue.split('$');
      this.updatestatusId = this.updatestatusValue[0];
      this.updatelookupName = this.updatestatusValue[1];
    }
  }

  /**---- To get the changed event value ----*/
  selectEventType(eventvalue) {
    this.eventValue = eventvalue.split('$');
    this.eventTypeId = this.eventValue[0];
    this.lookupTypeName = this.eventValue[1];
  }

  /**---- To update changed event type ----*/
  updateselectEventType(updateeventvalue) {
    if (updateeventvalue === undefined || updateeventvalue === 'undefined') {
      this.updatelookupTypeName = this.updatelookupTypeName;
    } else {
      this.updateeventValue = updateeventvalue.split('$');
      this.updateeventTypeId = this.updateeventValue[0];
      this.updatelookupTypeName = this.updateeventValue[1];
    }
  }

  /**---- To change the days ----*/
  daysChanged(days) {
    const durationvalue = Math.floor(this.duration / (24 * 60));
    this.duration = this.duration - durationvalue * 24 * 60 + 24 * 60 * Number(days);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To change hours ----*/
  hoursChanged(hours) {
    const durationvaluedays = Math.floor(this.duration / (24 * 60));
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = this.duration - (durationvaluehours - durationvaluedays * 24) * 60 + Number(hours) * 60;
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /** To change the duration ----*/
  durationChanged(duration) {
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = durationvaluehours * 60 + Number(duration);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To get the current UTC time ----*/
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /*---- To load when startdate changed at event creation ----*/
  startDateChange(value) {
    this.eventRegistrationCloseDate = value;
    const stdate = moment(value).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.startdate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.startdate1 = moment(this.startdate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.startdate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.startdate1 = moment(this.startdate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.startdate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      this.error = '';
    }
    const time = 1000 * 60 * 5;
    this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
    this.stdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
    if (this.actionType === 'Create') {
      this.eventRegistrationCloseDate = this.startdate;
    }
    if (this.actionType === 'Edit') {
      let stdate = this.startdate;
      this.registrationCloseDate = stdate;
    }
  }

  /**---- To change the end date value ----*/
  endDateChange(endvalue) {
    const stdate = moment(endvalue).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.enddate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.enddate1 = moment(this.enddate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.enddate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.enddate1 = moment(this.enddate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.enddate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') >= moment(this.enddate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      let hrs: any;
      let mins: any;
      const time = 1000 * 60 * 5;
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      const duration = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm'))).format('m');
      if (Number(duration) < 10) {
        mins = '0' + Number(duration);
      } else {
        mins = Number(duration);
      }
      const durationhrs = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm'))).format('H');
      if (Number(durationhrs) < 10) {
        hrs = '0' + Number(durationhrs);
      } else {
        hrs = Number(durationhrs);
      }
      const durationdays = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm')));
      this.selectedhours = hrs;
      this.selecteddays = Math.floor(Number(durationdays) / (24 * 60 * 60 * 1000));
      this.selectedduration = mins;
      this.duration = Math.floor(Number(durationdays) / (60 * 1000));
    }
  }

  /*---- To load when registerclosedate changed in Edit ----*/
  eventregisterclosedatechangedInEdit(closevalue) {
    this.getservercurrentutctime();
    this.registrationCloseDate = closevalue;
    const stdate = moment(closevalue).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.closedate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.closedate1 = moment(this.closedate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.closedate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.closedate1 = moment(this.closedate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.closedate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.registrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.stdate).format('YYYY-MM-DD HH:mm') < moment(this.registrationCloseDate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.registrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      this.error = '';
    }
    this.startdate = this.stdate;
  }

  /*---- To load when registerclosedate changed ----*/
  eventregisterclosedatechanged(closevalue) {
    this.getservercurrentutctime();
    this.registrationCloseDate = closevalue;
    const stdate = moment(closevalue).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.closedate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.closedate1 = moment(this.closedate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.closedate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.closedate1 = moment(this.closedate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.closedate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.eventRegistrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.stdate).format('YYYY-MM-DD HH:mm') < moment(this.registrationCloseDate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.eventRegistrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      this.error = '';
    }
    this.startdate = this.stdate;
  }



  /*---- To load when duration changed at event extend ----*/
  extenddurationChanged(duration) {
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(duration)))).format('YYYY-MM-DD HH:mm');
  }

  /*---- To load when enddate changed at event extend ----*/
  extendenddatechanged(extendendvalue) {
    const stdate = moment(extendendvalue).format('YYYY-MM-DD HH:mm');
    if (this.utctimezonestring.charAt(0) === '-') {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.extendenddate1 = moment(stdate).add(utctimesplit[0], 'hours');
      this.extendenddate1 = moment(this.extendenddate1).add(utctimesplit[1], 'minutes');
    } else {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.extendenddate1 = moment(stdate).subtract(utctimesplit[0], 'hours');
      this.extendenddate1 = moment(this.extendenddate1).subtract(utctimesplit[1], 'minutes');
    }
    if (moment(this.extendenddate1).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      let hrs: any;
      let mins: any;
      const time = 1000 * 60 * 5;
      this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      this.enddate = new Date(Math.ceil(this.enddate.getTime() / time) * time);
      const duration = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm'))).format('m');
      if (Number(duration) < 10) {
        mins = '0' + Number(duration);
      } else {
        mins = Number(duration);
      }
      const durationhrs = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm'))).format('H');
      if (Number(durationhrs) < 10) {
        hrs = '0' + Number(durationhrs);
      } else {
        hrs = Number(durationhrs);
      }
      const durationdays = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.startdate, 'YYYY-MM-DD HH:mm')));
      this.selectedhours = hrs;
      this.selecteddays = Math.floor(Number(durationdays) / (24 * 60 * 60 * 1000));
      this.selectedduration = mins;
      this.duration = Math.floor(Number(durationdays) / (60 * 1000));
    }
  }

  /*-- follwoing method is used to send event status to service -- */
  createEvent(createobj) {
    if (this.fleetName1 !== '' && this.fleetName1 !== undefined && this.fleetName1 !== 'undefined') {
      this.fleetName = this.fleetName1;
    }
    this.seatLimitValidation();
    if (this.advancedReservationWindowInDays1 < this.advancedReservationWindowInDays) {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays1;
    } else {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays;
    }
    this.createobj.startDatetime = this.startdate;
    this.createobj.endDatetime = this.enddate;
    this.createobj.eventRegistrationCloseDate = this.eventRegistrationCloseDate;
    if (this.enterpriseId === '' || this.enterpriseId === undefined || this.enterpriseId === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.fleettype === '' || this.fleettype === undefined || this.fleettype === null) {
      this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
      this.errortype = this.translateService.get('ENTERPRISE_STATIC_CONTENT.MENU_TYPE');
      this.error = this.fleetCommonName + this.errortype.value + this.error.value;
    } else if (this.fleetName === '' || this.fleetName === undefined || this.fleetName === null) {
      this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.createobj.eventName === '' || this.createobj.eventName === undefined || this.createobj.eventName === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_NAME';
    } else if (this.userId === '' || this.userId === undefined || this.userId === 'undefined' || this.userId === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_OWNER';
    } else if (this.lookupTypeName === '' || this.lookupTypeName === undefined || this.lookupTypeName === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_TYPE';
    } else if ((this.createobj.seatLimit !== '' || this.createobj.seatLimit !== undefined) &&
      (parseInt(this.createobj.seatLimit, 0) > parseInt(this.fleetSeatAttributesValue, 0))) {
      this.error = 'EVENTS.EVENT_SEAT_LIMIT_MUST_LESS_SEAT_CAPACITY';
    } else if (this.createobj.startDatetime === '' || this.createobj.startDatetime === undefined ||
      this.createobj.startDatetime === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
    } else if (this.createobj.endDatetime === '' || this.createobj.endDatetime === undefined || this.createobj.endDatetime === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
    } else if (moment(this.createobj.startDatetime).format('YYYY-MM-DD HH:mm') >=
      moment(this.createobj.endDatetime).format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.createobj.eventRegistrationCloseDate === '' || this.createobj.eventRegistrationCloseDate === undefined
      || this.createobj.eventRegistrationCloseDate === null) {
      this.error = 'EVENTS.VALID_NOBLANK_REGISTRATION_CLOSE_DATE';
    } else if (moment(this.createobj.startDatetime).format('YYYY-MM-DD HH:mm') <
      moment(this.createobj.eventRegistrationCloseDate).format('YYYY-MM-DD HH:mm')) {
      this.error = 'EVENTS.VALID_REGISTRATION_CLOSE_DATE_EVENT_START_DATE';
    } else if (this.createobj.purpose === '' || this.createobj.purpose === undefined || this.createobj.purpose === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_PURPOSE';
    } else {

      if (this.createobj.eventName !== undefined && this.createobj.eventName !== '') {
        this.createobj.eventName = this.createobj.eventName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.createobj.notes1 !== undefined && this.createobj.notes1 !== '') {
        this.createobj.notes1 = this.createobj.notes1.trim().replace(/\s\s+/g, ' ');
      }
      if (this.createobj.purpose !== undefined && this.createobj.purpose !== '') {
        this.createobj.purpose = this.createobj.purpose.trim().replace(/\s\s+/g, ' ');
      }
      if (this.createobj.isMultiRegistartion === undefined || this.createobj.isMultiRegistartion === 'undefined') {
        this.createobj.isMultiRegistartion = false;
      }
      if (this.createobj.seatLimit === '' || this.createobj.seatLimit === undefined) {
        this.createobj.seatLimit = this.defaultSeatLimit;
      }
      let hrs: any;
      let mins: any;
      const selecteddays = Math.floor(this.duration / (24 * 60));
      const selectedhours = Math.floor(this.duration / 60) - selecteddays * 24;
      const selectedduration = this.duration - Math.floor(this.duration / 60) * 60;
      if (Number(selectedhours) < 10) {
        hrs = '0' + Number(selectedhours);
      } else {
        hrs = Number(selectedhours);
      }
      if (Number(selectedduration) < 10) {
        mins = '0' + Number(selectedduration);
      } else {
        mins = Number(selectedduration);
      }
      const advDuration = selecteddays + 'D' + ' ' + hrs + 'H' + ' ' + mins + 'M';
      const checkdate = moment(this.currentutc).add(this.advancedReservationWindowInDays2, 'days');
      /** ----- Convert prefered time zone to utc format start----- */
      this.errorstartdate = this.startdate;
      this.errorenddate = this.enddate;
      this.errorclosedate = this.registrationCloseDate;
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.createobj.startDatetime = moment(this.createobj.startDatetime).add(utctimesplit[0], 'hours');
        this.createobj.startDatetime = moment(this.createobj.startDatetime).add(utctimesplit[1], 'minutes');
        this.createobj.endDatetime = moment(this.createobj.endDatetime).add(utctimesplit[0], 'hours');
        this.createobj.endDatetime = moment(this.createobj.endDatetime).add(utctimesplit[1], 'minutes');
        this.createobj.eventRegistrationCloseDate = moment(this.createobj.eventRegistrationCloseDate).add(utctimesplit[0], 'hours');
        this.createobj.eventRegistrationCloseDate = moment(this.createobj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.createobj.startDatetime = moment(this.createobj.startDatetime).subtract(utctimesplit[0], 'hours');
        this.createobj.startDatetime = moment(this.createobj.startDatetime).subtract(utctimesplit[1], 'minutes');
        this.createobj.endDatetime = moment(this.createobj.endDatetime).subtract(utctimesplit[0], 'hours');
        this.createobj.endDatetime = moment(this.createobj.endDatetime).subtract(utctimesplit[1], 'minutes');
        this.createobj.eventRegistrationCloseDate = moment(this.createobj.eventRegistrationCloseDate).subtract(utctimesplit[0], 'hours');
        this.createobj.eventRegistrationCloseDate = moment(this.createobj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
      }
      if (moment(this.createobj.startDatetime).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
      ) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
      } else if (moment(this.createobj.endDatetime).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
      } else if (moment(this.createobj.eventRegistrationCloseDate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc)
        .utc().format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
      } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') > moment(checkdate).format('YYYY-MM-DD HH:mm')) {
        this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_ADVANCED_RESERVATION_WINDOW_IN_DAYS');
        this.error = this.error.value + this.fleetCommonName;
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
          this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
        } else {
          this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
        }
      } else if (this.duration > this.maxReservationWindowInHrs2) {
        this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
        this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
        this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
      } else {
        let register = {};
        if (this.createobj.eventOwnerAutoRegister === true) {
          register = {
            'enterprise': {
              'enterpriseId': this.enterpriseId,
              'enterpriseName': this.enterprisesName
            },
            'fleetId': this.fleetId,
            'status': 'Registered',
            'userAccount': this.userAccount,
            'isEnabled': true
          };
        }
        this.createevent = {
          'enterprise': {
            'enterpriseId': this.enterpriseId,
            'enterpriseName': this.enterprisesName
          },
          'fleetId': this.fleetId,
          'eventOwner': {
            'userId': this.userId,
            'userAccount': this.userAccount,
            'maxActiveReservationsPerUser': this.maxActiveReservationsPerUser
          },
          'eventName': this.autocase(this.createobj.eventName),
          'description': this.createobj.description,
          'eventType': this.lookupTypeName,
          'notes1': this.createobj.notes1,
          'startDatetime': moment(this.createobj.startDatetime).format('YYYY-MM-DD HH:mm'),
          'endDatetime': moment(this.createobj.endDatetime).format('YYYY-MM-DD HH:mm'),
          'seatLimit': this.createobj.seatLimit,
          'eventRegistrationCloseDate': moment(this.createobj.eventRegistrationCloseDate).format('YYYY-MM-DD HH:mm'),
          'notes': this.createobj.notes,
          'purpose': this.autocase(this.createobj.purpose),
          'isEnabled': this.createobj.isEnabled,
          'isMultiRegistration': this.createobj.isMultiRegistartion,
          'isDeleted': this.createobj.isDeleted,
          'eventOwnerAutoRegister': this.createobj.eventOwnerAutoRegister,
          'registerObj': register,
          'duration': advDuration
        };
        this.eventservice.createEvent(this.createevent, this.userToken)
          .subscribe(data => {
            this.childModal.hide();
            this.enterpriseIconFilePath = '';
            this.userId = '';
            this.uploaded.emit('submit');
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            this.clearmessage();
            this.clearMsg();
          }, error => {
            this.startdate = this.errorstartdate;
            this.enddate = this.errorenddate;
            this.registrationCloseDate = this.errorclosedate;
            const statuscode = JSON.parse(error['_body']).statusCode;
            switch (JSON.parse(error['_body']).statusCode) {
              case '9961':
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
                break;
              case '9995':
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
                break;
              case '2057':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
              case '2060':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
              case '2059':
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                break;
              case '2062':
                this.error = this.translateService.get('COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode);
                this.error = this.fleetCommonName + this.error.value;
                break;
              case '9998':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
              case '2063':
                this.error = this.translateService.get('COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode);
                this.error = this.error.value + this.fleetCommonName;
                break;
            }
          });
      }
    }
  }
  /**---- To get seat capacity value -----*/
  seatLimitValidation() {
    if (this.attributeList) {
      for (let j = 0; j < this.attributeList.length; j++) {
        if (this.attributeList[j].attribute.attributeName === 'Seat Capacity') {
          this.fleetSeatAttributesValue = this.attributeList[j].attributeValue;
        }
      }
    }
  }

  /**-----------   To edit event details --------*/
  editEvent(editobj) {
    this.seatLimitValidation();
    if (this.advancedReservationWindowInDays1 < this.advancedReservationWindowInDays) {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays1;
    } else {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays;
    }
    if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
      this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
    } else {
      this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
    }
    this.updatestartdate = this.startdate;
    this.updateenddate = this.enddate;
    if (this.updateenterpriseName === '' ||
      this.updateenterpriseName === undefined || this.updateenterpriseName === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.fleetnamesselect === '' || this.fleetnamesselect === 'undefined'
      || this.fleetnamesselect === undefined || this.fleetnamesselect === null) {
      this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.updateeventName === '' || this.updateeventName === undefined ||
      this.updateeventName === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_NAME';
    } else if (this.updateuserId === '' || this.updateuserId === undefined || this.updateuserId === 'undefined'
      || this.updateuserId === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_OWNER';
    } else if (this.updatelookupTypeName === '' || this.updatelookupTypeName === undefined || this.updatelookupTypeName === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_TYPE';
    } else if ((this.updateseatLimit !== '' || this.updateseatLimit !== undefined) &&
      (parseInt(this.updateseatLimit, 0) > parseInt(this.fleetSeatAttributesValue, 0))) {
      this.error = 'EVENTS.EVENT_SEAT_LIMIT_MUST_LESS_SEAT_CAPACITY';
    } else if (editobj.startDatetime === '' || editobj.startDatetime === undefined || editobj.startDatetime === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
    } else if (editobj.endDatetime === '' || editobj.endDatetime === undefined || editobj.endDatetime === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
    } else if (this.registrationCloseDate === '' || this.registrationCloseDate === undefined
      || this.registrationCloseDate === null) {
      this.error = 'EVENTS.VALID_NOBLANK_REGISTRATION_CLOSE_DATE';
    } else if (this.updatepurpose === '' || this.updatepurpose === undefined || this.updatepurpose === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_PURPOSE';
    } else {
      if (this.updateeventName !== undefined && this.updateeventName !== '') {
        this.updateeventName = this.updateeventName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.updatenotes1 !== undefined && this.updatenotes1 !== '') {
        this.updatenotes1 = this.updatenotes1.trim().replace(/\s\s+/g, ' ');
      }
      if (this.updatepurpose !== undefined && this.updatepurpose !== '') {
        this.updatepurpose = this.updatepurpose.trim().replace(/\s\s+/g, ' ');
      }
      if (this.updateseatLimit === '' || this.updateseatLimit === undefined) {
        this.updateseatLimit = this.defaultSeatLimit;
      }
      let hrs: any;
      let mins: any;
      const selecteddays = Math.floor(this.duration / (24 * 60));
      const selectedhours = Math.floor(this.duration / 60) - selecteddays * 24;
      const selectedduration = this.duration - Math.floor(this.duration / 60) * 60;
      if (Number(selectedhours) < 10) {
        hrs = '0' + Number(selectedhours);
      } else {
        hrs = Number(selectedhours);
      }
      if (Number(selectedduration) < 10) {
        mins = '0' + Number(selectedduration);
      } else {
        mins = Number(selectedduration);
      }
      const advDuration = selecteddays + 'D' + ' ' + hrs + 'H' + ' ' + mins + 'M';
      this.errorstartdate = this.startdate;
      this.errorenddate = this.enddate;
      this.errorclosedate = this.registrationCloseDate;
      const checkdate = moment(this.currentutc).add(this.advancedReservationWindowInDays2, 'days');
      /** ----- Convert prefered time zone to utc format start----- */
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.updatestartdate = moment(this.updatestartdate).add(utctimesplit[0], 'hours');
        this.updatestartdate = moment(this.updatestartdate).add(utctimesplit[1], 'minutes');
        this.updateenddate = moment(this.updateenddate).add(utctimesplit[0], 'hours');
        this.updateenddate = moment(this.updateenddate).add(utctimesplit[1], 'minutes');
        this.registrationCloseDate = moment(this.registrationCloseDate).add(utctimesplit[0], 'hours');
        this.registrationCloseDate = moment(this.registrationCloseDate).add(utctimesplit[1], 'minutes');

      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.updatestartdate = moment(this.updatestartdate).subtract(utctimesplit[0], 'hours');
        this.updatestartdate = moment(this.updatestartdate).subtract(utctimesplit[1], 'minutes');
        this.updateenddate = moment(this.updateenddate).subtract(utctimesplit[0], 'hours');
        this.updateenddate = moment(this.updateenddate).subtract(utctimesplit[1], 'minutes');
        this.registrationCloseDate = moment(this.registrationCloseDate).subtract(utctimesplit[0], 'hours');
        this.registrationCloseDate = moment(this.registrationCloseDate).subtract(utctimesplit[1], 'minutes');
      }
      if (this.eventobj.startdatestatus === 'statdateactive') {
        if (moment(this.updatestartdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
        ) {
          this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
          this.updatestartdate = this.errorstartdate;
          this.updateenddate = this.errorenddate;
          this.registrationCloseDate = this.errorclosedate;
        } else if (moment(this.updateenddate).format('YYYY-MM-DD HH:mm') < moment(this.updatestartdate).format('YYYY-MM-DD HH:mm')
        ) {
          this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
          this.updatestartdate = this.errorstartdate;
          this.updateenddate = this.errorenddate;
          this.registrationCloseDate = this.errorclosedate;
        } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') > moment(checkdate).format('YYYY-MM-DD HH:mm')) {
          this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_ADVANCED_RESERVATION_WINDOW_IN_DAYS');
          this.error = this.error.value + this.fleetCommonName;
          this.updatestartdate = this.errorstartdate;
          this.updateenddate = this.errorenddate;
        } else if (this.duration > this.maxReservationWindowInHrs2) {
          this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
          this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
          this.error = this.part1.value + this.fleetCommonName + this.part2.value;
          this.updatestartdate = this.errorstartdate;
          this.updateenddate = this.errorenddate;
        } else if (this.error === '') {
          this.editeventsvalid(editobj, advDuration);
        }
      } else {
        if (moment(this.updateenddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
        ) {
          this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
          this.updatestartdate = this.errorstartdate;
          this.updateenddate = this.errorenddate;
          this.registrationCloseDate = this.errorclosedate;
        } else if (this.error === '') {
          this.editeventsvalid(editobj, advDuration);
        }
      }
    }
  }

  /**---- edit events function ----*/
  editeventsvalid(editobj, advDuration) {
    this.errorstartdate = this.updatestartdate;
    this.errorenddate = this.updateenddate;
    this.editeventname = {
      'enterprise': {
        'enterpriseId': this.updateenterpriseId,
        'enterpriseName': this.updateenterpriseName
      },
      'fleetObj': this.updatefleetId,
      'eventOwner': {
        'userId': this.updateuserId,
        'userAccount': this.eventobj.eventOwner.userAccount
      },
      '_id': editobj._id,
      'eventName': this.autocase(this.updateeventName),
      'description': this.updateDescription,
      'eventStatus': this.updateeventStatus,
      'eventType': this.updatelookupTypeName,
      'notes1': this.updatenotes1,
      'notes2': this.updatenotes2,
      'notes3': this.updatenotes3,
      'notes4': this.updatenotes4,
      'notes5': this.updatenotes5,
      'startDatetime': moment(this.updatestartdate).format('YYYY-MM-DD HH:mm:ss'),
      'endDatetime': moment(this.updateenddate).format('YYYY-MM-DD HH:mm:ss'),
      'seatLimit': this.updateseatLimit,
      'eventRegistrationCloseDate': moment(this.registrationCloseDate).format('YYYY-MM-DD HH:mm:ss'),
      'notes': this.updatenotes,
      'purpose': this.autocase(this.updatepurpose),
      'isEnabled': this.updateenabled,
      'isMultiRegistration': this.updateMultiRegistartion,
      'eventOwnerAutoRegister': this.eventOwnerAutoRegister,
      'duration': advDuration
    };
    this.eventservice.updateEvent(this.editeventname, editobj._id, this.userToken)
      .subscribe(
      data => {
        this.updatestartdate = this.errorstartdate;
        this.updateenddate = this.errorenddate;
        const condition = window.localStorage.getItem('searcheventsDetails');
        if (condition !== 'advanced') {
          window.localStorage.setItem('eventedit', 'Updated');
        } else {
          window.localStorage.setItem('advance', 'advanced');
        }
        this.childModal.hide();
        this.hideChildModal();
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
        this.toastr.success(this.toastermessage.value);
        this.clearmessage();
        this.clearMsg();
      }, error => {
        this.updatestartdate = this.errorstartdate;
        this.updateenddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (JSON.parse(error['_body']).statusCode) {
          case '1005':
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
          case '9995':
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            break;
          case '2057':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '2060':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '2059':
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            break;
          case '9998':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9997':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '2061':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '2062':
            this.error = this.translateService.get('COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode);
            this.error = this.fleetCommonName + this.error.value;
            break;
          case '2063':
            this.error = this.translateService.get('COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode);
            this.error = this.error.value + this.fleetCommonName;
            break;
        }
      });
  }

  /**-----------   To delete event details --------*/
  deleteEvent(eventId) {
    this.eventservice.deleteEvent(eventId, this.userToken)
      .subscribe(
      data => {
        if (window.localStorage.getItem('eventsadvance')) {
          this.uploaded.emit('submit');
        } else if (window.localStorage.getItem('simplesearch') === 'search') {
          window.localStorage.setItem('simplesearch1', 'search1');
        } else if (window.localStorage.getItem('eventsadvance') == null || window.localStorage.getItem('simplesearch') == null) {
          this.uploaded.emit('submit');
        } else {
          window.localStorage.setItem('eventsadvance1', 'advance');
        }
        this.childModal.hide();
        // this.uploaded.emit('submit');
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
        this.toastr.success(this.toastermessage.value);
      }, error => {
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (JSON.parse(error['_body']).statusCode) {
          case '9961':
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
          case '2013':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9997':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9998':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
        }
      });
  }

  /**---- To extend the event ----*/
  extendEvent(eventId) {
    let hrs: any;
    let mins: any;
    const selecteddays = Math.floor(this.duration / (24 * 60));
    const selectedhours = Math.floor(this.duration / 60) - selecteddays * 24;
    const selectedduration = this.duration - Math.floor(this.duration / 60) * 60;
    if (Number(selectedhours) < 10) {
      hrs = '0' + Number(selectedhours);
    } else {
      hrs = Number(selectedhours);
    }
    if (Number(selectedduration) < 10) {
      mins = '0' + Number(selectedduration);
    } else {
      mins = Number(selectedduration);
    }
    const advDuration = selecteddays + 'D' + ' ' + hrs + 'H' + ' ' + mins + 'M';
    this.errorenddate = this.enddate;
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      /** ----- Convert prefered time zone to utc format start----- */
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
        this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
        this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');

      }
      if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
        this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
      } else {
        this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
      }
      if (moment(this.enddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
      ) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.enddate = this.errorenddate;
      }else if (this.duration > this.maxReservationWindowInHrs2) {
        this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
        this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
        this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        this.enddate = this.errorenddate;
      } else {
        this.eventservice.extendEvent(eventId, this.userToken,
          this.eventobj.notes5, moment(this.enddate).format('YYYY-MM-DD HH:mm'), advDuration, this.reasonValue)
          .subscribe(
          data => {
            if (window.localStorage.getItem('eventsadvance')) {
              this.uploaded.emit('submit');
            } else if (window.localStorage.getItem('simplesearch') === 'search') {
              window.localStorage.setItem('simplesearch1', 'search1');
            } else if (window.localStorage.getItem('eventsadvance') == null || window.localStorage.getItem('simplesearch') == null) {
              this.uploaded.emit('submit');
            } else {
              window.localStorage.setItem('eventsadvance1', 'advance');
            }
            this.childModal.hide();
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EXTEND_SUCCESS');
            this.toastr.success(this.toastermessage.value);
          }, error => {
            this.enddate = this.errorenddate;
            const statuscode = JSON.parse(error['_body']).statusCode;
            switch (JSON.parse(error['_body']).statusCode) {
              case '9961':
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
                break;
              case '2020':
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
                break;
              case '9997':
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
                break;
              case '9995':
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
                break;
              case '2027':
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
                break;
            }
          });
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }


  /*-- To checkIn into event --*/
  checkInEvent(eventId) {
    this.getservercurrentutctime();
    let startdate = eventId.startDatetime;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (startdate !== '' && startdate !== undefined && startdate !== null) {
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezonestring.split('-');
        const utctimesplit = utctime[1].split(':');
        startdate = moment(startdate).add(utctimesplit[0], 'hours');
        startdate = moment(startdate).add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.utctimezonestring.split('+');
        const utctimesplit = utctime[1].split(':');
        startdate = moment(startdate).subtract(utctimesplit[0], 'hours');
        startdate = moment(startdate).subtract(utctimesplit[1], 'minutes');
      }
      startdate = moment(startdate).format('YYYY-MM-DD HH:mm');
    }
    const checkdateadd = moment(startdate).add(this.earlyCheckinWindowInMins, 'minutes');
    const checkdatesub = moment(startdate).subtract(this.earlyCheckinWindowInMins, 'minutes');
    if (moment(checkdatesub).format('YYYY-MM-DD HH:mm') <= moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
      && moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm') <= moment(checkdateadd).format('YYYY-MM-DD HH:mm')) {
      this.userToken = window.localStorage.getItem('token');
      this.eventservice.checkInEvent(eventId._id, this.userToken)
        .subscribe(
        data => {
          if (window.localStorage.getItem('eventsadvance')) {
            this.uploaded.emit('submit');
          } else if (window.localStorage.getItem('simplesearch') === 'search') {
            window.localStorage.setItem('simplesearch1', 'search1');
          } else if (window.localStorage.getItem('eventsadvance') == null || window.localStorage.getItem('simplesearch') == null) {
            this.uploaded.emit('submit');
          } else {
            window.localStorage.setItem('eventsadvance1', 'advance');
          }
          this.childModal.hide();
          // this.uploaded.emit('submit');
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
                this.storage.removeItem('token');
                this.router.navigate(['pages/login']);
              } else if (statusCode === '2027') {
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
              } else if (statusCode === '2026') {
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
              } else if (statusCode === '9995') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              } else if (statusCode === '9997') {
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
              }
              break;
            case 500:
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EARLY_CHECK_IN_WINDOW_IN_MINS';
    }
  }

  /*-- To checkout from event --*/
  checkOutEvent(eventId) {
    this.userToken = window.localStorage.getItem('token');

    this.eventservice.checkOutEvent(eventId, this.userToken)
      .subscribe(
      data => {
        if (window.localStorage.getItem('eventsadvance')) {
          this.uploaded.emit('submit');
        } else if (window.localStorage.getItem('simplesearch') === 'search') {
          window.localStorage.setItem('simplesearch1', 'search1');
        } else if (window.localStorage.getItem('eventsadvance') == null || window.localStorage.getItem('simplesearch') == null) {
          this.uploaded.emit('submit');
        } else if (window.localStorage.getItem('eventsadvance') == null || window.localStorage.getItem('simplesearch') == null) {
          this.uploaded.emit('submit');
        } else {
          window.localStorage.setItem('eventsadvance1', 'advance');
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
            if (statusCode === '2014') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            } else if (statusCode === '9961') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            } else if (statusCode === '9995') {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            } else if (statusCode === '9997') {
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
            }
            break;
          case 500:
        }
      });
  }

  /*-- To cancel event --*/
  cancelEvent(eventId) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      this.userToken = window.localStorage.getItem('token');
      this.eventservice.cancelEvent(eventId, this.userToken, this.reasonValue)
        .subscribe(
        data => {
          if (window.localStorage.getItem('eventsadvance')) {
            this.uploaded.emit('submit');
          } else if (window.localStorage.getItem('simplesearch') === 'search') {
            window.localStorage.setItem('simplesearch1', 'search1');
          } else if (window.localStorage.getItem('eventsadvance') == null || window.localStorage.getItem('simplesearch') == null) {
            this.uploaded.emit('submit');
          } else {
            window.localStorage.setItem('eventsadvance1', 'advance');
          }
          this.childModal.hide();
          this.uploaded.emit('submit');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CANCEL_SUCCESS');
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
                this.storage.removeItem('token');
                this.router.navigate(['pages/login']);
              } else if (statusCode === '9995') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
              } else if (statusCode === '9997') {
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
              } else if (statusCode === '2015') {
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
              }
              break;

            case 500:
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /**----View fleets-data--- */
  viewFleet(id) {
    this.attributesarray = [];
    this.galleryImages = [];
    this.userToken = window.localStorage.getItem('token');
    this.eventservice.getSingleFleetDetails(id, this.userToken)
      .subscribe(
      (data: any) => {
        this.fleetvaluestatus = true;
        this.fleet = data.result;
        this.isTransactable = this.fleet.isTransactable;
        this.updatedAt = moment(this.fleet.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        this.createdAt = moment(this.fleet.createdAt).format('YYYY-MM-DD HH:mm:ss');
        this.longitude = data.result.address.geoCoordinates[1].replace('%2B', '+');
        this.latitude = data.result.address.geoCoordinates[0].replace('%2B', '+');
        this.attributeList = data.result.attributes;
        this.advancedReservationWindowInDays1 = this.fleet.settings.advancedReservationWindowInDays;
        this.worknumbercntrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.maxReservationWindowInHrs1 = this.fleet.settings.maxReservationWindowInHrs;
        if (this.fleet.contactDetails.workNumber) {
          this.worknumber = this.fleet.contactDetails.workNumber;
          if (this.worknumbercntrycode) {
            this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleet.contactDetails.workNumber;
          }
          if (this.worknumext) {
            this.worknumber = this.worknumber + ' x' + this.fleet.contactDetails.workNumberExtn;
          }
        } else {
          this.worknumber = '';
        }
        if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
          this.attributevalue = false;

        } else {
          this.attributevalue = true;
        }
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }

  /*--- To close child modal ---*/
  closeView() {
    this.childModal.hide();
  }

  /**---- Method for handle key press ----*/
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
        this.deleteEvent(this.eventobj._id);
      }
    }
  }

  /*--- To clear all fields ---*/
  public clearMsg() {
    this.enterpriseId = '';
    this.fleetName = '';
    this.userId = '';
    this.createobj.eventName = '';
    this.createobj.eventOwner = '';
    this.createobj.eventStatus = '';
    this.createobj.eventType = '';
    this.createobj.description = '';
    this.createobj.notes1 = '';
    this.createobj.notes2 = '';
    this.createobj.notes3 = '';
    this.createobj.notes4 = '';
    this.createobj.notes5 = '';
    this.createobj.startDatetime = '';
    this.createobj.endDatetime = '';
    this.createobj.checkInDatetime = '';
    this.createobj.checkOutDatetime = '';
    this.createobj.seatLimit = '';
    this.createobj.eventRegistrationCloseDate = '';
    this.createobj.notes = '';
    this.createobj.purpose = '';
    this.createobj.isEnabled = '';
    this.createobj.isDeleted = '';
    this.usersList = [];
    this.eventList = [];
    this.enterprisesName = [];
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.enterpriseIconFilePath = '';
    this.error = '';
    this.comment = '';
    this.createobj.isMultiRegistartion = false;
    this.fleetvaluestatus = false;
    this.childModal.hide();
    this.clearmessage();
    this.clearMsg();
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
  getFleetsdata(fleetid) {
    this.singleFleetReservationServices.getEventNameByFleetId(this.userToken, fleetid)
    .subscribe(
      allFleetReservationsList => {
       this.enterprise = allFleetReservationsList['result'].enterprise.enterpriseName;
         this.enterprisesName = this.enterprise;
         this.enterpriseId = allFleetReservationsList['result'].enterprise.enterpriseId;
         this.getFleetTypes(this.enterpriseId);
         this.getUserlistByentId(this.enterpriseId);
         this.type = allFleetReservationsList['result'].fleetType;
         this.fleettype = this.type;
         this.fleettypechane(this.type);
         this.fleetId = allFleetReservationsList['result']._id;
         this.asset = allFleetReservationsList['result'].fleetName;
         this.fleetName = this.asset;
         this.fleetName1 = this.asset;
       },
       error => {
         const status = JSON.parse(error['status']);
         const statuscode = JSON.parse(error['_body']).status;
         switch (status) {
           case 500:
             break;
           case 400:
             if (statuscode === '9961') {
               this.router.navigate(['/pages/login']);
             } break;
         }
       }
       );
   }
}

export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}

export class Eventdetails {
  public _id: any;
  public createdAt: any;
  public createdBy: any;
  public updatedAt: any;
  public updatedBy: any;
  public description: any;
  public enterpriseId: any;
  public isDeleted: any;
  public eventName: any;
  public eventOwner: any;
  public eventStatus: any;
  public eventType: any;
  public isMultiRegistartion: any;
  public eventOwnerAutoRegister: any;
  public registerObj: any;
  public notes1: any;
  public notes2: any;
  public notes3: any;
  public notes4: any;
  public notes5: any;
  public isEnabled: any;
  public enterpriseName: any;
  public enterprise: any;
  public fleet: any;
  public fleetId: any;
  public fleetName: any;
  public startDatetime: any;
  public endDatetime: any;
  public checkInDatetime: any;
  public checkOutDatetime: any;
  public seatLimit: any;
  public eventRegistrationCloseDate: any;
  public notes: any;
  public purpose: any;
}
