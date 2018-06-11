/* Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 *  All Events Component have below functionality.
 * ngOnInit(): All fleets list will be loaded at loading time.
 * ngAfterViewInit(): After the View intialisation rendered.
 * ngAfterContentChecked(): Method to call the Content check Every time.
 * singleEventsreg(updateaction, eventid): Following method is used to display Eventsreg popup.
 * openMap(eventRegObj): To locate the map.
 * AdvancePopupModal(): To open the advanced popup model.
 * gettimeZones(): To get the time zones.
 * changeTimezones(timezone): To change the getTimezonesstartdate list.
 * getstatus(): To change the getTimezonesstartdate list.
 * getEventTypes(): To get the event types.
 * getstatusonchange(status): On changing the status for advance search.
 * advanEndDateChange(): To get the on change event value.
 * getrecorddetails(): To get the event registation record details.
 * getSearcheventsregList(searchString): To search the event registrations.
 * geteventsregList(searchString): To search all Event Registration list.
 * eventDetailAction(eventId): To get the event details.
 * advanceSearch(): To search the data by using advance search.
 * exportData(searchstring): To Export Event Data.
 * clearinput(): To clear the advance search input data.
 * handleKeyPress(e): Method for handle key press.
 * locates(locate): Method for locate action.
 * singlelocate(locate, singleeventreg): Method for single locate.
 */

import {
  Component, ViewChild, OnInit, Inject, AfterContentChecked, ViewContainerRef,
  AfterViewInit, ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { EventRegistrationComponent } from '../eventregistrationpopup/eventregistration.component';
import { NotificationsService } from '../../../notifications/notifications.service';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { EventsregService } from './eventregistartions.service';
import { EventService } from '../../events/eventslist/events.service';
import { FleetsService } from '../../../enterprises/fleets/fleetslist/fleets.service';
import { EventRegistrationService } from '../eventregistrationpopup/eventregistration.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
import * as moment from 'moment/moment';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: 'eventregistrations.html',
  providers: [EventsregService, ConfirmationService, EventService, FleetsService, EventRegistrationService, AdvertisementsService]
})

export class EventRegistrationsComponent implements OnInit, AfterViewInit, AfterContentChecked {
  eventsregDetails: EventsregDetails[];
  items: MenuItem[];
  EventsregService: Array<EventsregDetails> = [];
  searchstring: string;
  stacked: boolean;
  userToken: any;
  toastermessage: any;
  eventId: any;
  pagename: any;
  recordid: any;
  storage: Storage = window.localStorage;
  eventregistrationviewstatus: any;
  eventregistrationaddstatus: any;
  eventregistrationeditstatus: any;
  eventregistrationliststatus: any;
  eventregistrationdeletedstatus: any;
  fleetCommonName: any;
  eventregistrationexportstatus: any;
  rowsPerPage = 10;
  checkinstatus: any;
  checkoutstatus: any;
  locatestatus: any;
  cancelstatus: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  loginUserDateFormat: any;
  enterprisevalue: any = '';
  fleetname: any = '';
  eventtype: any = '';
  username: any = '';
  seatcount: any = '';
  status: any = '';
  startdate: any = '';
  enddate: any = '';
  eventreg: any = '';
  timeZones: any;
  enterpriseIconFilePath: any;
  eventowner: any = '';
  preferedtimezone: any;
  timezoneCode: any;
  timezoneCodes: any;
  status1: any;
  error: any;
  errorenddate: any;
  errorstartdate: any;
  userrole: any;
  enterpriseNames: any;
  eventTypesList: any;
  eventname: any;
  advutctimezone: any;
  advutctimezonestring: any;
  advuserpreferedtimezone: any;
  // event guided create and event locate
  enterpriseNameslist: any;
  enterprisesSize: any;
  enterPriseId: any;
  reservationstartdate: any;
  reservationenddate: any;
  fleetsList: any;
  error1: any;
  guidedcreateobj: any;
  fleetsavailability: any;
  hiddenstartdate: any;
  hiddenenddate: any;
  currentutc: any;
  longitude: any;
  latitude: any;
  fleetData: any;
  fleetViewParm = false;
  fleetinfo = false;
  eventList: any[];
  usersList: any[];
  enterpriseId: any;
  enterprisesName: any;
  createEnterPriseName: any;
  countries: any;
  country: any;
  fleetId: any;
  enddate1: any;
  startdate1: any;
  enterpriseName: any;
  fleetvalue: any;
  eventvalue: any;
  ownervalue: any;
  eventtypevalue: any;
  statevalue: any;
  cityvalue: any;
  countryvalue: any;
  retext: any;
  updateeventStatus: any;
  reasonValue: any;
  attributeList: any[];
  attributevalue: any;
  worknumbercntrycode: any;
  worknumext: any;
  enterpriseIcon: any;
  registrationCloseDate: any;
  checkInDate: any;
  checkOutDate: any;
  worknumber: any;
  worknumbercntrycodesplit: any;
  eventsObjData: any;
  eventNames: any;
  eventRegistration: any;
  regStartDatetime: any;
  regEndDatetime: any;
  regCloseDatetime: any;
  userAccount: any;
  endUserAccount: any;
  guidedcreatestatus: any;
  userName: any;
  eventownername: any;
  userfn: any;
  userln: any;
  firstName: any;
  lastName: any;
  eventOwner: any;
  eventRegValue: any;
  countriesListLength = true;
  enterpriseselect = false;
  minDate: Date;
  @ViewChildren('input') vc;
  @ViewChild('mgModal') public childModal1: ModalDirective;
  @ViewChild(EventRegistrationComponent)
  private EventsModalComponent: EventRegistrationComponent;
  @ViewChild('eventRegModel') public eventRegModel: ModalDirective;
  @ViewChild('createModel') public createModel: ModalDirective;
  /**---- Constructor for event registrations component */
  constructor(public toastr: ToastsManager,
    private router: Router, private vcr: ViewContainerRef,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private notificationService: NotificationsService,
    private eventsregService: EventsregService,
    private eventRegistrationService: EventRegistrationService,
    public advertisementsService: AdvertisementsService,
    private eventService: EventService,
    private allfleetsService: FleetsService,
    @Inject('apiEndPoint') public apiEndPoint: string, @Inject('enterpriseEndUser') private enterpriseEndUser) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  /*--- To load the all list at loading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.userToken = window.localStorage.getItem('token');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.eventregistrationviewstatus = window.localStorage.getItem('eventregistrationviewstatus');
    this.eventregistrationaddstatus = window.localStorage.getItem('eventregistrationaddstatus');
    this.eventregistrationeditstatus = window.localStorage.getItem('eventregistrationeditstatus');
    this.eventregistrationliststatus = window.localStorage.getItem('eventregistrationliststatus');
    this.eventregistrationdeletedstatus = window.localStorage.getItem('eventregistrationdeletedstatus');
    this.checkinstatus = window.localStorage.getItem('eventregistrationcheckinstatus');
    this.checkoutstatus = window.localStorage.getItem('eventregistrationcheckoutstatus');
    this.locatestatus = window.localStorage.getItem('eventregistrationlocatestatus');
    this.cancelstatus = window.localStorage.getItem('eventcancelstatus');
    this.eventregistrationexportstatus = window.localStorage.getItem('eventregistrationexportstatus');
    this.guidedcreatestatus = window.localStorage.getItem('eventregistrationguidedcreatestatus');
    this.eventId = window.localStorage.getItem('eventId');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    window.localStorage.removeItem('lceventregistrationsdata');
    window.localStorage.removeItem('lceventregistrations');
    this.getstatus();
    this.getEventTypes();
    this.getCountries();
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    this.eventRegValue = window.localStorage.getItem('loginUserTimezone');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advutctimezone = utcval[0];
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.advutctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.eventregistrationliststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else if ((window.localStorage.getItem('events') === 'events')) {
      this.eventDetailAction(this.eventId);
      window.localStorage.removeItem('events');
    } else if (this.pagename === 'eventregistrations') {
      this.getrecorddetails();
      this.storage.removeItem('notificationpage');
    } else if (this.storage.getItem('dashbordStartDate') !== undefined && this.storage.getItem('dashbordStartDate') !== null
      && this.storage.getItem('dashbordEndDate') !== undefined && this.storage.getItem('dashbordEndDate') !== null) {
      this.startdate = this.storage.getItem('dashbordStartDate');
      this.enddate = this.storage.getItem('dashbordEndDate');
      if (this.storage.getItem('selecteddashboardenterpriseid') === 'undefined') {
        this.enterprisevalue = '';
      } else {
        this.enterprisevalue = this.storage.getItem('selecteddashboardenterpriseid');
      }
      this.advanceSearch();
    } else {
      this.geteventsregList('');
      this.items = [
        {
          label: 'Event Registration', icon: 'fa fa-calendar',
          command: () => { this.EventsModalComponent.showChildModal('Create Event ', ''); }
        },
      ];
    }

  }

  /**---- After the View intialisation rendered ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /**---- Method to call the Content check Every time ----*/
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('advancecheckin') === 'advancecheckin') {
      this.advanceSearch();
    }
    if (window.localStorage.getItem('Callsimplesearch') === 'CallEventsimple') {
      this.getSearcheventsregList(this.searchstring);
    }
    if (window.localStorage.getItem('detailList') === 'detailList') {
      this.eventDetailAction(this.eventId);
    }
    window.localStorage.removeItem('advancecheckin');
    window.localStorage.removeItem('Callsimplesearch');
    window.localStorage.removeItem('detailList');
  }

  /*-- Following method is used to display Eventsreg popup */
  singleEventsreg(updateaction, eventid) {
    this.EventsModalComponent.showChildModal(updateaction, eventid);
  }

  /**---- To locate the map ----*/
  openMap(eventRegObj) {
    const x = eventRegObj.fleetObj.address.geoCoordinates[0];
    const y = eventRegObj.fleetObj.address.geoCoordinates[1];
    const win = window.open('https://www.google.com/maps/@' + x + ',' + y + ',15z', '_blank');
    win.focus();
  }

  /**-------- Advanced search open popup ----------- */
  public AdvancePopupModal() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.pagename = 'COMMON_PAGE_TITLES.ADVANCED_SEARCH';
    this.gettimeZones();
    this.childModal1.show();
  }

  /**---- To get the time zones ----*/
  public gettimeZones() {
    this.eventsregService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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
      });
  }

  /*--- To change the getTimezonesstartdate list ----*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.eventRegValue = timezone.split('$');
    this.advuserpreferedtimezone = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /**------- To get status from lookups --------- */
  public getstatus() {
    this.status1 = [];
    this.eventsregService.getLookupsList(this.userToken, 'REGISTRATION_STAUSES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.status1 = data['result'];
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

  /*---- getEvent Types --- */
  getEventTypes() {
    this.eventsregService.getEventTypes(this.userToken)
      .subscribe(
        eventTypesList => {
          this.eventTypesList = eventTypesList['result'];
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

  /**---- On changing the status for advance search ----*/
  getstatusonchange(status) {
    this.status = status;
  }

  /**---- To change the end date ----*/
  advanEndDateChange() {
    this.error = '';
  }

  /**---- To get the on change event value ----*/
  geteventtypechange(eventtype) {
    this.eventtype = eventtype;
  }

  /**------ To get the event registation record details ----- */
  getrecorddetails() {
    window.localStorage.removeItem('lceventregistrationsdata');
    window.localStorage.removeItem('lceventregistrations');
    this.notificationService.getNotification(this.recordid, this.pagename, this.userToken)
      .subscribe(
        data => {
          for (let i = 0; i < data['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined && data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).add(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined && data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result'][i].checkOutDatetime).utc()
                  .add(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result'][i].checkOutDatetime)
                  .add(utctimesplit[1], 'minutes');
              }
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObjendDatetime = moment(data['result'][i].eventObj.endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
              }
            }
          }
          this.eventsregDetails = data['result'];
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

  /**---- To search the event registrations ----*/
  getSearcheventsregList(searchString) {
    window.localStorage.removeItem('advance1');
    window.localStorage.removeItem('lceventregistrationsdata');
    window.localStorage.removeItem('listFeature');
    window.localStorage.removeItem('lceventregistrations');
    this.eventsregService.getMyEventsSearchregList(this.userToken, searchString)
      .subscribe(
        data => {
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].userDetails = data['result'][i].userDetails.firstName + ' ' + data['result'][i].userDetails.lastName;
            data['result'][i].eventObj.eventOwner.userName = data['result'][i].eventObj.eventOwner.userName.firstName + ' ' +
              data['result'][i].eventObj.eventOwner.userName.lastName;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).add(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
              }
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObjendDatetime = moment(data['result'][i].eventObj.endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
              }
            }
          }
          window.localStorage.setItem('Eventsimplesearch', 'Eventsimple');
          this.eventsregDetails = data['result'];
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
                window.localStorage.clear();
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
  }

  /*---- To search all Event Registration list ----*/
  geteventsregList(searchString) {
    window.localStorage.removeItem('lceventregistrationsdata');
    window.localStorage.removeItem('lceventregistrations');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.eventsregService.getMyEventsregList(this.userToken, searchString)
      .subscribe(
        data => {
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].userDetails = data['result'][i].userDetails.firstName + ' ' + data['result'][i].userDetails.lastName;
            data['result'][i].eventObj.eventOwner.userName = data['result'][i].eventObj.eventOwner.userName.firstName + ' ' +
              data['result'][i].eventObj.eventOwner.userName.lastName;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).add(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
              }
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObjendDatetime = moment(data['result'][i].eventObj.endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
              }
            }
          }
          this.eventsregDetails = data['result'];
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
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
  }

  /**---- To get the events details ----*/
  public eventDetailAction(eventId) {
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.eventsregService.getMyEventsregistrationList(this.userToken, eventId)
      .subscribe(
        data => {
          window.localStorage.setItem('listFeature', 'listFeature');
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].userDetails = data['result'][i].userDetails.firstName + ' ' + data['result'][i].userDetails.lastName;
            data['result'][i].eventObj.eventOwner.userName = data['result'][i].eventObj.eventOwner.userName.firstName + ' ' +
              data['result'][i].eventObj.eventOwner.userName.lastName;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).add(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
              }
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObjendDatetime = moment(data['result'][i].eventObj.endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
              }
            }
          }
          this.eventsregDetails = data['result'];
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

  /**---- To search the data by using advance search  -----*/
  advanceSearch() {
    this.errorstartdate = this.startdate;
    this.errorenddate = this.enddate;
    this.storage.removeItem('dashbordStartDate');
    this.storage.removeItem('dashbordEndDate');
    window.localStorage.removeItem('listFeature');
    this.storage.removeItem('selecteddashboardenterpriseid');
    if (this.startdate !== '' && this.enddate && this.startdate >= this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
    } else {
      if (this.startdate !== '') {
        if (this.advutctimezonestring.charAt(0) === '-') {
          const utctime = this.advutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');
          this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
        } else {
          const utctime = this.advutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');
          this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
        }
      }
      if (this.enddate !== '') {
        if (this.advutctimezonestring.charAt(0) === '-') {
          const utctime = this.advutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
          this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
        } else {
          const utctime = this.advutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
          this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
        }
      }
      if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
        this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.fleetname !== '' && this.fleetname !== undefined) {
        this.fleetname = this.fleetname.trim().replace(/\s\s+/g, ' ');
      }
      if (this.eventowner !== '' && this.eventowner !== undefined) {
        this.eventowner = this.eventowner.trim().replace(/\s\s+/g, ' ');
        const event = this.eventowner.split(' ');
        this.firstName = event[0];
        this.lastName = event[1];
        if (this.lastName === undefined) {
          this.firstName = '';
          this.lastName = '';
          this.eventowner = this.eventowner.trim().replace(/\s\s+/g, ' ');
        }
      }
      if (this.eventname !== '' && this.eventname !== undefined) {
        this.eventname = this.eventname.trim().replace(/\s\s+/g, ' ');
      }
      if (this.username !== '' && this.username !== undefined) {
        this.username = this.username.trim().replace(/\s\s+/g, ' ');
        const user = this.username.split(' ');
        this.userfn = user[0];
        this.userln = user[1];
        if (user[1] === undefined) {
          this.userfn = '';
          this.userln = '';
          this.username = this.username.trim().replace(/\s\s+/g, ' ');
        }
      }
      /** ----- Convert prefered time zone to utc format start----- */
      this.eventreg = {
        'enterpriseName': this.enterprisevalue,
        'fleetName': this.fleetname,
        'eventtype': this.eventtype,
        'eventName': this.eventname,
        'userName': this.username,
        'userFirstName': this.userfn,
        'userLastName': this.userln,
        'ownerFn': this.firstName,
        'ownerLn': this.lastName,
        'eventOwner': this.eventowner,
        'fromDate': this.startdate, // moment(this.startdate).format('YYYY-MM-DD HH:mm'),
        'toDate': this.enddate,  // moment(this.enddate).format('YYYY-MM-DD HH:mm'),
        'status': this.status,
      };
      this.eventsregService.advancesearch(this.eventreg, this.userToken).subscribe(
        data => {
          this.childModal1.hide();
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          window.localStorage.setItem('lceventregistrationsdata', JSON.stringify(data));
          window.localStorage.setItem('lceventregistrations', 'lceventregistrationsdata');
          window.localStorage.setItem('advance1', 'advance');
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].userDetails = data['result'][i].userDetails.firstName + ' ' + data['result'][i].userDetails.lastName;
            data['result'][i].eventObj.eventOwner.userName = data['result'][i].eventObj.eventOwner.userName.firstName +
              ' ' + data['result'][i].eventObj.eventOwner.userName.lastName;
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result']
              [i].eventObj.startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).add(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
              }
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i].eventObj.startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.startDatetime = moment(data['result'][i]
                .eventObj.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i].eventObj.endDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObjendDatetime = moment(data['result'][i].eventObj.endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.endDatetime = moment(data['result'][i]
                .eventObj.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventObj.eventRegistrationCloseDate = moment(data['result']
              [i].eventObj.eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              if (data['result'][i].checkInDatetime !== undefined &&
                data['result'][i].checkInDatetime !== 'undefined' &&
                data['result'][i].checkInDatetime !== null) {
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkInDatetime = moment(data['result']
                [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
              }
              if (data['result'][i].checkOutDatetime !== undefined &&
                data['result'][i].checkOutDatetime !== 'undefined'
                && data['result'][i].checkOutDatetime !== null) {
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                data['result'][i].checkOutDatetime = moment(data['result']
                [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
              }
            }
          }
          this.eventsregDetails = data['result'];
        },
        error => {
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                window.localStorage.clear();
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
                this.toastr.success(this.toastermessage.value);
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
    }
  }

  /*-----  To Export Event Data ----- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advance1') === 'advance') {
      searchstring = JSON.stringify(this.eventreg);
      window.localStorage.removeItem('advance1');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.eventsregService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /**---- To clear the advanced popup data ----*/
  clearinput() {
    this.enterprisevalue = '';
    this.eventsregDetails = [];
    this.fleetname = '';
    this.eventtype = '';
    this.username = '';
    this.seatcount = '';
    this.status = '';
    this.startdate = '';
    this.enddate = '';
    this.eventname = '';
    this.eventowner = '';
    this.status1 = '';
    this.error = '';
    this.firstName = '';
    this.lastName = '';
    this.userfn = '';
    this.userln = '';
    this.gettimeZones();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.advutctimezonestring = utcval[0].toString();
    window.localStorage.removeItem('lceventregistrationsdata');
    window.localStorage.removeItem('lceventregistrations');
    this.geteventsregList('');
    this.getstatus();
    this.getEventTypes();
  }

  /**---- method for handle key press ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getSearcheventsregList(this.searchstring);
    }
  }

  /**---- To hide advanced popup model ----*/
  public hideAdvanceModal() {
    this.childModal1.hide();
    this.error = '';
  }

  /**--- method for locate action ----*/
  locates(locate) {
    this.eventsregService.locates(locate, this.userToken, this.searchstring);
  }

  /**---- Method for single locate ----*/
  singlelocate(locate, singleeventreg) {
    if (singleeventreg.fleetObj.floorPlanFleetObj !== null && singleeventreg.fleetObj.floorPlanFleetObj !== undefined) {
      this.allfleetsService.getBuildingId(this.userToken, singleeventreg.fleetObj.floorPlanFleetObj, 'fleet').subscribe(
        builingcode => {
          this.allfleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lceventregistrationsinfo', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              //  window.localStorage.setItem('eventregmapsettings', JSON.stringify(this.mapSettings));
              localStorage.setItem('eregcurrentfloorname', builingcode.result.currentFloor);
              const currentfloorName = 'eregcurrentfloorname';
              const currentregid = singleeventreg._id;
              const cfleetid = singleeventreg.fleetObj._id;
              this.eventsregService.singlelocateEventRegistrations(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentfloorName, currentregid, cfleetid, fleetInfo.fleetName);
            });
        }, error => {
          this.eventRegistrationStatus(error);
        });
    } else {
      this.eventsregService.geteventRegistrationById(this.userToken, singleeventreg._id).subscribe(
        eventRegistrations => {
          const features = eventRegistrations['result'];
          const address = eventRegistrations['result']['fleetAddress'];
          if (address !== undefined) {
            const address1 = address.addressLine1 + ', ' + address.addressLine2 + ', ' + address.city + ', '
              + address.state + ', ' + address.ZIP + ', ' + address.country;
            eventRegistrations['result']['fleetAddress'] = address1;
          }
          if (eventRegistrations['result'].reserveStartDatetime && eventRegistrations['result'].reserveEndDatetime) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              eventRegistrations['result'].reserveStartDatetime = moment(eventRegistrations['result'].reserveStartDatetime).utc()
                .add(utctimesplit[0], 'hours');
              eventRegistrations['result'].reserveStartDatetime = moment(eventRegistrations['result'].reserveStartDatetime)
                .add(utctimesplit[1], 'minutes');
              eventRegistrations['result'].reserveEndDatetime = moment(eventRegistrations['result'].reserveEndDatetime).utc()
                .add(utctimesplit[0], 'hours');
              eventRegistrations['result'].reserveEndDatetime = moment(eventRegistrations['result'].reserveEndDatetime)
                .add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              eventRegistrations['result'].reserveStartDatetime = moment(eventRegistrations['result'].reserveStartDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              eventRegistrations['result'].reserveStartDatetime = moment(eventRegistrations['result'].reserveStartDatetime)
                .subtract(utctimesplit[1], 'minutes');
              eventRegistrations['result'].reserveEndDatetime = moment(eventRegistrations['result'].reserveEndDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              eventRegistrations['result'].reserveEndDatetime = moment(eventRegistrations['result'].reserveEndDatetime)
                .subtract(utctimesplit[1], 'minutes');
            }
            eventRegistrations['result'].reserveStartDatetime = moment(eventRegistrations['result'].reserveStartDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
            eventRegistrations['result'].reserveEndDatetime = moment(eventRegistrations['result'].reserveEndDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
          }
          localStorage.setItem('lceventregistrationsinfo', JSON.stringify(eventRegistrations['result']));
          localStorage.setItem('apiendpoint', this.apiEndPoint);
          const currentfloorName = null;
          const currentregid = singleeventreg._id;
          const cfleetid = null;
          const buildingName = null;
          this.eventsregService.singlelocateEventRegistrations(locate, this.userToken, eventRegistrations['result']._id,
            false, currentfloorName, currentregid, cfleetid, buildingName);
        }, error => {
          this.eventRegistrationStatus(error);
        });
    }
  }
  eventRegistrationStatus(error) {
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
  /**---- Method for Guided Create ----*/
  checkEvents() {
    this.eventRegModel.show();
    this.getEnterprise();
    // this.getCountries();
    this.gettimeZones();
    this.minDate = new Date();
    this.fleetinfo = false;
    const time = 1000 * 60 * 5;
    const date = new Date();
    this.reservationstartdate = new Date(Math.ceil(date.getTime() / time) * time);
    this.reservationenddate = new Date(this.reservationstartdate);
    this.reservationenddate.setDate(this.reservationenddate.getDate() + 7);
    const timezonevalue = this.eventRegValue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }
  hideEventModal() {
    this.eventRegModel.hide();
  }

  /*---- To load when startdate changed at event creation ----*/
  startDateChangeGuidedFirst(value) {
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
      const time = 1000 * 60 * 5;
      this.reservationstartdate = new Date(Math.ceil(this.reservationstartdate.getTime() / time) * time);
      this.enddate = new Date(this.reservationstartdate);
      this.enddate.setDate(this.enddate.getDate() + 7);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.reservationstartdate = new Date(Math.ceil(this.reservationstartdate.getTime() / time) * time);
      this.enddate = new Date(this.reservationstartdate);
      this.enddate.setDate(this.enddate.getDate() + 7);
    }
  }

  /*---- To load when end date changed at event creation ----*/
  endDateChangeGuidedFirst(endvalue) {
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
      this.reservationenddate = new Date(Math.ceil(this.reservationenddate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') >= moment(this.reservationenddate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.reservationenddate = new Date(Math.ceil(this.reservationenddate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      let hrs: any;
      let mins: any;
      const time = 1000 * 60 * 5;
      this.reservationenddate = new Date(Math.ceil(this.reservationenddate.getTime() / time) * time);
      const duration = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.reservationstartdate, 'YYYY-MM-DD HH:mm'))).format('m');
      if (Number(duration) < 10) {
        mins = '0' + Number(duration);
      } else {
        mins = Number(duration);
      }
      const durationhrs = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.reservationstartdate, 'YYYY-MM-DD HH:mm'))).format('H');
      if (Number(durationhrs) < 10) {
        hrs = '0' + Number(durationhrs);
      } else {
        hrs = Number(durationhrs);
      }
      const durationdays = moment.utc(moment(this.enddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.reservationstartdate, 'YYYY-MM-DD HH:mm')));
    }
  }
  /*---- To get Enterprise List ----*/
  getEnterprise() {
    if (this.enterPriseId === null || this.enterpriseId === '' || this.enterpriseId === undefined) {
      this.enterpriseselect = false;
    }
    this.eventsregService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterpriseNameslist = data['result'];
            this.enterprisevalue = this.enterpriseNameslist[0].enterpriseName;
            this.enterPriseId = this.enterpriseNameslist[0]._id;
            this.getUserlistByentId(this.enterPriseId);
            this.getCountriesbyEnterpriseId(this.enterPriseId);
            this.enterprisesSize = true;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
          } else {
            if (this.enterPriseId === null || this.enterpriseId === '' || this.enterpriseId === undefined) {
              this.enterpriseselect = false;
            }
            this.enterpriseNameslist = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }
  /**--- To get the current UTc time ----*/
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /**---- To view the fleet data ----*/
  fleetView(fleetObj) {
    this.fleetViewParm ? this.fleetViewParm = false : this.fleetViewParm = true;
    this.fleetData = fleetObj;
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.pagename = 'COMMON_PAGE_TITLES.VIEW_EVENT';
    this.retext = true;
    if (this.utctimezonestring.charAt(0) === '+') {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.fleetData.startDatetime = moment(this.fleetData.startDatetime).utc().add(utctimesplit[0], 'hours');
      this.fleetData.startDatetime = moment(this.fleetData.startDatetime).add(utctimesplit[1], 'minutes');
      this.fleetData.startDatetime = moment(this.fleetData.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.endDatetime = moment(this.fleetData.endDatetime).utc().add(utctimesplit[0], 'hours');
      this.fleetData.endDatetime = moment(this.fleetData.endDatetime).add(utctimesplit[1], 'minutes');
      this.fleetData.endDatetime = moment(this.fleetData.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.eventRegistrationCloseDate = moment(this.fleetData
        .eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
      this.fleetData.eventRegistrationCloseDate = moment(this.fleetData
        .eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
      this.fleetData.eventRegistrationCloseDate = moment(this.fleetData
        .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.createdAt = moment(this.fleetData.createdAt).utc().add(utctimesplit[0], 'hours');
      this.fleetData.createdAt = moment(this.fleetData.createdAt).add(utctimesplit[1], 'minutes');
      this.fleetData.createdAt = moment(this.fleetData.createdAt).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.updatedAt = moment(this.fleetData.updatedAt).utc().add(utctimesplit[0], 'hours');
      this.fleetData.updatedAt = moment(this.fleetData.updatedAt).add(utctimesplit[1], 'minutes');
      this.fleetData.updatedAt = moment(this.fleetData.updatedAt).format(this.loginUserDateFormat + ' HH:mm');

      if (this.fleetData.checkInDatetime !== undefined && this.fleetData.checkInDatetime !== 'undefined' &&
        this.fleetData.checkInDatetime !== null) {
        this.fleetData.checkInDatetime = moment(this.fleetData.checkInDatetime).utc().add(utctimesplit[0], 'hours');
        this.fleetData.checkInDatetime = moment(this.fleetData.checkInDatetime).add(utctimesplit[1], 'minutes');
        this.fleetData.checkInDatetime = moment(this.fleetData.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm')
          + ' ' + this.timezoneCode[0];
      }
      if (this.fleetData.checkOutDatetime !== undefined && this.fleetData.checkOutDatetime !== 'undefined'
        && this.fleetData.checkOutDatetime !== null) {
        this.fleetData.checkOutDatetime = moment(this.fleetData.checkOutDatetime).utc().add(utctimesplit[0], 'hours');
        this.fleetData.checkOutDatetime = moment(this.fleetData.checkOutDatetime).add(utctimesplit[1], 'minutes');
        this.fleetData.checkOutDatetime = moment(this.fleetData.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm')
          + ' ' + this.timezoneCode[0];
      }
    } else {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.fleetData.startDatetime = moment(this.fleetData.startDatetime).utc().subtract(utctimesplit[0], 'hours');
      this.fleetData.startDatetime = moment(this.fleetData.startDatetime).subtract(utctimesplit[1], 'minutes');
      this.fleetData.startDatetime = moment(this.fleetData.startDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.endDatetime = moment(this.fleetData.endDatetime).utc().subtract(utctimesplit[0], 'hours');
      this.fleetData.endDatetime = moment(this.fleetData.endDatetime).subtract(utctimesplit[1], 'minutes');
      this.fleetData.endDatetime = moment(this.fleetData.endDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.eventRegistrationCloseDate = moment(this.fleetData
        .eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
      this.fleetData.eventRegistrationCloseDate = moment(this.fleetData
        .eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
      this.fleetData.eventRegistrationCloseDate = moment(this.fleetData
        .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.createdAt = moment(this.fleetData.createdAt).utc().subtract(utctimesplit[0], 'hours');
      this.fleetData.createdAt = moment(this.fleetData.createdAt).subtract(utctimesplit[1], 'minutes');
      this.fleetData.createdAt = moment(this.fleetData.createdAt).format(this.loginUserDateFormat + ' HH:mm');
      this.fleetData.updatedAt = moment(this.fleetData.updatedAt).utc().subtract(utctimesplit[0], 'hours');
      this.fleetData.updatedAt = moment(this.fleetData.updatedAt).subtract(utctimesplit[1], 'minutes');
      this.fleetData.updatedAt = moment(this.fleetData.updatedAt).format(this.loginUserDateFormat + ' HH:mm');
      if (this.fleetData.checkInDatetime !== undefined && this.fleetData.checkInDatetime !== 'undefined' &&
        this.fleetData.checkInDatetime !== null) {
        this.fleetData.checkInDatetime = moment(this.fleetData.checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
        this.fleetData.checkInDatetime = moment(this.fleetData.checkInDatetime).subtract(utctimesplit[1], 'minutes');
        this.fleetData.checkInDatetime = moment(this.fleetData.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm')
          + ' ' + this.timezoneCode[0];
      }
      if (this.fleetData.checkOutDatetime !== undefined &&
        this.fleetData.checkOutDatetime !== 'undefined'
        && this.fleetData.checkOutDatetime !== null) {
        this.fleetData.checkOutDatetime = moment(this.fleetData.checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
        this.fleetData.checkOutDatetime = moment(this.fleetData.checkOutDatetime).subtract(utctimesplit[1], 'minutes');
        this.fleetData.checkOutDatetime = moment(this.fleetData.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm')
          + ' ' + this.timezoneCode[0];
      }
    }
    this.updateeventStatus = this.fleetData.eventStatus;
    if (this.updateeventStatus === 'Created' || this.updateeventStatus === 'Started') {
      this.reasonValue = this.fleetData.reasonExtend;
    } else {
      this.reasonValue = this.fleetData.reasonCancel;
    }
    this.attributeList = this.fleetData.fleetObj.attributes;
    if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
      this.attributevalue = false;
    } else {
      this.attributevalue = true;
    }
    this.eventOwner = this.fleetData.eventOwner.userId.enterpriseResourceObj.firstName + ' ' +
      this.fleetData.eventOwner.userId.enterpriseResourceObj.lastName;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.worknumbercntrycode = this.fleetData.fleetObj.contactDetails.workNumberCountrycode;
    this.worknumext = this.fleetData.fleetObj.contactDetails.workNumberExtn;
    this.enterpriseIcon = this.fleetData.enterprise.enterpriseId.enterpriseIcon;
    this.enterpriseIconFilePath = this.fleetData.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
    this.longitude = this.fleetData.fleetObj.address.geoCoordinates[1].replace('%2B', '+');
    this.latitude = this.fleetData.fleetObj.address.geoCoordinates[0].replace('%2B', '+');
    this.registrationCloseDate = moment(this.fleetData.eventRegistrationCloseDate)
      .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
    if (this.fleetData.fleetObj.contactDetails.workNumber) {
      this.worknumber = this.fleetData.fleetObj.contactDetails.workNumber;
      if (this.worknumbercntrycode) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetData.fleetObj.contactDetails.workNumber;
      }
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetData.fleetObj.contactDetails.workNumberExtn;
      }
    }
  }
  /** ---- To get User list by Enterprise id ----- */
  getUserlistByentId(entId) {
    this.eventsregService.getUserListByEntId(this.userToken, entId)
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
  /**---- To submit the create events method ----*/
  eventsSubmit() {
    this.worknumbercntrycode = this.eventsObjData.fleetObj.contactDetails.workNumberCountrycode;
    this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
    this.worknumext = this.eventsObjData.fleetObj.contactDetails.workNumberExtn;
    this.worknumber = this.eventsObjData.fleetObj.contactDetails.workNumber;
    this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventsObjData.fleetObj.contactDetails.workNumber;
    if (this.eventsObjData === undefined || this.eventsObjData === 'null' || this.eventsObjData === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EVENT_NAME';
    } else {
      this.eventRegModel.hide();
      this.createModel.show();
      if (window.localStorage.getItem('userrole') === this.enterpriseEndUser) {
        // this.userId = window.localStorage.getItem('user_id');
        this.userAccount = window.localStorage.getItem('user_Account');
        this.userName = window.localStorage.getItem('first_name') + ' ' + window.localStorage.getItem('last_name');
      }
      this.eventownername = this.eventsObjData.eventOwner.userId.enterpriseResourceObj.firstName + ' ' +
        this.eventsObjData.eventOwner.userId.enterpriseResourceObj.lastName;
    }
    if (this.worknumext) {
      this.worknumber = this.worknumber + ' x' + this.eventsObjData.fleetObj.contactDetails.workNumberExtn;
    }
  }
  clearmessage() {
    this.error = '';
  }
  getGuide() {
    this.createModel.hide();
    this.eventRegModel.show();
    this.fleetinfo = false;
    this.eventNames = false;
    this.eventsObjData = '';
    this.clearmessage();
    this.userAccount = '';
  }
  /*-- To get Countries list --*/
  public getCountries() {
    this.eventsregService.getCountryList(this.userToken, 'COUNTRIES').subscribe(
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
  /** To get the changed country value ----*/
  Changecountry(value) {
    this.countryvalue = value;
  }
  /**---- To get fleet types list ----*/
  getFleetNameByEntId(enterpriseid) {
    const enterprise = enterpriseid.split('$');
    this.enterPriseId = enterprise[0];
    this.enterprisevalue = enterprise[1];
    this.getUserlistByentId(this.enterPriseId);
    if (enterpriseid !== 'Select') {
      this.getCountriesbyEnterpriseId(this.enterPriseId);
    } else {
      this.countriesListLength = true;
      this.enterpriseselect = false;
      this.fleetsavailability.country = '';
      this.getCountries();
    }
  }
  /**-------   To split the user id and name  -------- */
  selectUserInfo(uservalue) {
    this.userAccount = uservalue;
  }
  /** clear method for events availabity ----*/
  clearEventssModal() {
    this.enterprisevalue = '';
    this.ownervalue = '';
    this.countryvalue = '';
    this.eventtypevalue = '';
    this.statevalue = '';
    this.cityvalue = '';
    this.eventvalue = '';
    this.countries = [];
    this.fleetinfo = false;
    if (!this.enterprisesSize) {
      this.getCountries();
    }
    this.countriesListLength = true;
    this.enterpriseselect = false;
    this.getEnterprise();
    this.getEventTypes();
  }
  selectEventType(value) {
    this.eventtypevalue = value;
  }
  /** submit method for fleet availabity ----*/
  eventsCheckSubmit() {
    this.error = '';
    if (this.enterprisevalue === undefined || this.enterprisevalue === '' || this.enterprisevalue === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
      this.fleetinfo = false;
    } else if (this.countryvalue === undefined || this.countryvalue === '' || this.countryvalue === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
    } else {
      this.fleetsList = [];
      this.error1 = '';
      if (this.reservationstartdate != null && this.reservationenddate != null) {
        this.hiddenstartdate = this.reservationstartdate;
        this.hiddenenddate = this.reservationenddate;
        if (this.utctimezonestring.charAt(0) === '-') {
          const utctime = this.utctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.reservationstartdate = moment(this.reservationstartdate).add(utctimesplit[0], 'hours');
          this.reservationstartdate = moment(this.reservationstartdate).add(utctimesplit[1], 'minutes');
          this.reservationenddate = moment(this.reservationenddate).add(utctimesplit[0], 'hours');
          this.reservationenddate = moment(this.reservationenddate).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.utctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.reservationstartdate = moment(this.reservationstartdate).subtract(utctimesplit[0], 'hours');
          this.reservationstartdate = moment(this.reservationstartdate).subtract(utctimesplit[1], 'minutes');
          this.reservationenddate = moment(this.reservationenddate).subtract(utctimesplit[0], 'hours');
          this.reservationenddate = moment(this.reservationenddate).subtract(utctimesplit[1], 'minutes');
        }
        this.reservationstartdate = moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm');
        this.reservationenddate = moment(this.reservationenddate).format('YYYY-MM-DD HH:mm');
      }
      if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.reservationstartdate = this.hiddenstartdate;
        this.reservationenddate = this.hiddenenddate;
      } else if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') > moment(this.reservationenddate).format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.reservationstartdate = this.hiddenstartdate;
        this.reservationenddate = this.hiddenenddate;
      } else {
        const eventvalobj = {
          'enterpriseName': this.enterprisevalue,
          'fleetName': '',
          'eventName': this.eventvalue,
          'eventOwner': this.ownervalue,
          'eventType': this.eventtypevalue,
          'eventStatus': '',
          'state': this.statevalue,
          'city': this.cityvalue,
          'country': this.countryvalue,
          'startDatetime': this.reservationstartdate,
          'endDatetime': this.reservationenddate,
          'source': 'mobile'
        };
        this.eventService.guidedevents(this.userToken, eventvalobj).subscribe(
          data => {
            if (data['statusCode'] === '1001') {
              this.reservationstartdate = this.hiddenstartdate;
              this.reservationenddate = this.hiddenenddate;
              this.fleetinfo = true;
              this.fleetViewParm = false;
              this.fleetsList = data['result'];
            }
          },
          error => {
            this.reservationstartdate = this.hiddenstartdate;
            this.reservationenddate = this.hiddenenddate;
            const status = JSON.parse(error['status']);
            const statuscode = JSON.parse(error['_body']).statusCode;
            switch (status) {
              case 500:
                break;
              case 400:
                this.fleetinfo = true;
                if (statuscode === '9961') {
                  this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                  this.toastr.success(this.toastermessage.value);
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                } break;
            }
          });
      }
    }
  }
  events(data) {
    this.regStartDatetime = data.startDatetime;
    this.regEndDatetime = data.endDatetime;
    this.regCloseDatetime = data.eventRegistrationCloseDate;
    if (this.utctimezonestring.charAt(0) === '+') {
      const utctime = this.utctimezone.split('+');
      const utctimesplit = utctime[1].split(':');
      this.regStartDatetime = moment(this.regStartDatetime).utc().add(utctimesplit[0], 'hours');
      this.regStartDatetime = moment(this.regStartDatetime).add(utctimesplit[1], 'minutes');
      this.regStartDatetime = moment(this.regStartDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.regEndDatetime = moment(this.regEndDatetime).utc().add(utctimesplit[0], 'hours');
      this.regEndDatetime = moment(this.regEndDatetime).add(utctimesplit[1], 'minutes');
      this.regEndDatetime = moment(this.regEndDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.regCloseDatetime = moment(this.regCloseDatetime).utc().add(utctimesplit[0], 'hours');
      this.regCloseDatetime = moment(this.regCloseDatetime).add(utctimesplit[1], 'minutes');
      this.regCloseDatetime = moment(this.regCloseDatetime).format(this.loginUserDateFormat + ' HH:mm');
    } else {
      const utctime = this.utctimezone.split('-');
      const utctimesplit = utctime[1].split(':');
      this.regStartDatetime = moment(this.regStartDatetime).utc().subtract(utctimesplit[0], 'hours');
      this.regStartDatetime = moment(this.regStartDatetime).subtract(utctimesplit[1], 'minutes');
      this.regStartDatetime = moment(this.regStartDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.regEndDatetime = moment(this.regEndDatetime).utc().subtract(utctimesplit[0], 'hours');
      this.regEndDatetime = moment(this.regEndDatetime).subtract(utctimesplit[1], 'minutes');
      this.regEndDatetime = moment(this.regEndDatetime).format(this.loginUserDateFormat + ' HH:mm');
      this.regCloseDatetime = moment(this.regCloseDatetime).utc().subtract(utctimesplit[0], 'hours');
      this.regCloseDatetime = moment(this.regCloseDatetime).subtract(utctimesplit[1], 'minutes');
      this.regCloseDatetime = moment(this.regCloseDatetime).format(this.loginUserDateFormat + ' HH:mm');
    }
    this.userrole = window.localStorage.getItem('userrole');
    this.endUserAccount = window.localStorage.getItem('user_Account');
    if (this.userrole !== 'Enterprise End User') {
      this.eventsObjData = data;
      this.eventNames = true;
    } else {
      this.eventsObjData = data;
      this.eventNames = true;
      this.userAccount = this.endUserAccount;
    }
  }
  addEventReg(eventRegistationObj) {
    if (this.userAccount === undefined || this.userAccount === '' || this.userAccount === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_USER_ACCOUNT';
    } else {
      this.eventRegistration = {
        'enterprise': {
          'enterpriseId': eventRegistationObj.enterprise.enterpriseId,
          'enterpriseName': eventRegistationObj.enterprise.enterpriseName
        },
        'userAccount': this.userAccount,
        'fleetId': eventRegistationObj.fleetObj._id,
        'eventId': eventRegistationObj._id,
        'status': 'Registered'
      };
      this.eventRegistrationService.addEventReg(this.eventRegistration, this.userToken).subscribe(
        data => {
          this.createModel.hide();
          this.geteventsregList('');
          this.userAccount = '';
          this.eventsObjData = '';
          this.eventNames = false;
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
        });
    }
  }
  getEventDataonchange(value) {
    this.eventvalue = value;
  }
  hideCreateModel() {
    this.createModel.hide();
  }
  /**---- Method for Event locate ----*/
  singlelocateevent(locate, singleevent) {
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    if (singleevent.fleetObj.floorPlanFleetObj !== null && singleevent.fleetObj.floorPlanFleetObj !== undefined) {
      this.allfleetsService.getBuildingId(this.userToken, singleevent.fleetObj.floorPlanFleetObj, 'fleet').subscribe(
        builingcode => {
          const cufloorId = singleevent.fleetObj.floorPlanFleetObj;
          const currentfleetId = singleevent.fleetObj._id;
          this.allfleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lceventinfo', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              // window.localStorage.setItem('eventmapsettings', JSON.stringify(this.mapSettings));
              localStorage.setItem('ecurrentfloorname', builingcode.result.currentFloor);
              const currentFloorName = 'ecurrentfloorname';
              this.eventService.singlelocateevent(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, singleevent._id, cufloorId, currentfleetId, fleetInfo.fleetName);
            });
        }, error => {
          this.fleetstatus(error);
        });
    } else {
      this.eventService.getEventsInfoByevntsId(this.userToken, singleevent._id).subscribe(
        eventsInfo => {
          const features = eventsInfo['result'];
          let address = eventsInfo['result']['fleetAddress'];
          if (address !== undefined) {
            let address1 = address.addressLine1 + ', ' + address.addressLine2 + ', ' + address.city + ', '
              + address.state + ', ' + address.ZIP + ', ' + address.country;
            eventsInfo['result']['fleetAddress'] = address1;
          }

          if (eventsInfo['result'].reserveStartDatetime && eventsInfo['result'].reserveEndDatetime) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');

              eventsInfo['result'].reserveStartDatetime = moment(eventsInfo['result'].reserveStartDatetime).utc()
                .add(utctimesplit[0], 'hours');
              eventsInfo['result'].reserveStartDatetime = moment(eventsInfo['result'].reserveStartDatetime)
                .add(utctimesplit[1], 'minutes');
              eventsInfo['result'].reserveEndDatetime = moment(eventsInfo['result'].reserveEndDatetime).utc()
                .add(utctimesplit[0], 'hours');
              eventsInfo['result'].reserveEndDatetime = moment(eventsInfo['result'].reserveEndDatetime)
                .add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              eventsInfo['result'].reserveStartDatetime = moment(eventsInfo['result'].reserveStartDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              eventsInfo['result'].reserveStartDatetime = moment(eventsInfo['result'].reserveStartDatetime)
                .subtract(utctimesplit[1], 'minutes');
              eventsInfo['result'].reserveEndDatetime = moment(eventsInfo['result'].reserveEndDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              eventsInfo['result'].reserveEndDatetime = moment(eventsInfo['result'].reserveEndDatetime)
                .subtract(utctimesplit[1], 'minutes');
            }
            eventsInfo['result'].reserveStartDatetime = moment(eventsInfo['result'].reserveStartDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
            eventsInfo['result'].reserveEndDatetime = moment(eventsInfo['result'].reserveEndDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
          }
          localStorage.setItem('apiendpoint', this.apiEndPoint);
          localStorage.setItem('lceventinfo', JSON.stringify(eventsInfo['result']));
          const currentfleetId = null;
          // window.localStorage.setItem('eventmapsettings', JSON.stringify(this.mapSettings));
          const currentfloorName = null;
          const currenteventid = null;
          const cufloorId = null;
          const buildingName = null;
          this.eventService.singlelocateevent(locate, this.userToken, eventsInfo['result']._id,
            false,
            currentfloorName, currenteventid, cufloorId, currentfleetId, buildingName);
        }, error => {
          this.fleetstatus(error);
        });
    }
  }
  fleetstatus(error) {
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

  /**---- To get Countries by existing fleets, resources, enterprises ----*/
  public getCountriesbyEnterpriseId(enterPriseId) {
    this.eventService.getCountriesbyEnterpriseId(this.userToken, enterPriseId).subscribe(
      data => {
        this.enterpriseselect = true;
        this.countries = data['result'];
        if (data['result'].length > 0) {
          this.countryvalue = data['result'][0];
        }
        if (data['result'].length > 1) {
          this.countriesListLength = true;
        } else {
          this.countriesListLength = false;
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
}

export class EventsregDetails {
  public enterpriseId: string;
  public fleetAssetId: string;
  public userId: string;
  public eventId: string;
  public seatNumber: string;
  public waitingList: string;
  public notes: string;
  public isEnabled: string;
  public createdBy: string;
  public isDeleted: string;
  public createdAt: string;
  public updatedBy: string;
  public updatedAt: string;
}

export class MenuItem {

}

