/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
*/
/**
 * All Events Component have below functionality:
 * ngOnInit(): To load the all fleets list at loading time.
 * ngAfterViewInit(): After view intilisation rendered.
 * ngAfterContentChecked(): To check the content.
 * singleEvents(selectedaction, selectedObj): To open the popup model.
 * checkFleets(): To check fleet availabity popup.
 * AdvancePopupModal(): To open the advance search popup model.
 * getservercurrentutctime(): To get the current UTc time.
 * eventDetailsList(eventId): To get event details.
 * getrecorddetails(): To get the record details.
 * getStatus(): To get Event status list.
 * getEventTypes(): To get Event Types list.
 * selectEventType(eventvalue): To get the selected event.
 * getCountries(): To get Countries list.
 * Changecountry(value): To get the changed country value.
 * gettimeZones(): To get Time zones list.
 * getTimezones(timezone): To change the getTimezonesstartdate list.
 * changeTimezones(timezone): To change the time zones.
 * getEnterprise(): To get Enterprise List.
 * getEnterpriseResources(type): To split the enterprise id and name.
 * getFleetTypes(enterPriseId): To get fleet types list.
 * getFleetTypesById(value): To get fleet types.
 * getFleetTypeAttributes(value): To get fleet typ attributes.
 * getFleetResources(values): To split the getFleetResources.
 * getFleetList(enterpriseId): To get the fleets.
 * fleets(fleet): To get changed fleet value.
 * getalleventsList(): To get all events list.
 * getEventsSeachList(searchstring): To search the events list by string.
 * advance(): Method for advance serach.
 * fleetsCheckSubmit(): To submit the fleets check method.
 * getUserlistByentId(entId): To get User list by Enterprise id.
 * selectUserInfo(uservalue): To split the user id and name.
 * daysChangedfirst(days): To change the days.
 * hoursChangedfirst(hours): To change the hours.
 * durationChangedfirst(duration): To change the duration.
 * startDateChangeGuidedFirst(value): To load when startdate changed at event creation.
 * endDateChangeGuidedFirst(endvalue): To load when end date changed at event creation.
 * fleetsSubmit(fleetsavailability): To submit the create fleets method.
 * hideGuideCreateModal(): To hide the guided create popup model.
 * fleetView(fleetObj): To view the fleet data.
 * viewFleet(id): To View fleets
 * daysChanged(days): To change the days.
 * hoursChanged(hours): To change the hours.
 * durationChanged(duration): To change the duration.
 * exportData(searchstring): To export exportData.
 * guidedCreateEvent(guidedcreateobj): Method for guided create submit.
 * autocase(text): Auto capitalization for each word.
 * clearMsg(): To clear all fields.
 * handleKeyPress(e): Method for handle key press.
 * method(event): This method is used to use event emitter.
 * clear(): To clear the input fields.
 * clearmessage(): To clear the messages.
 * hideAdvanceModal(): To hide the advance Model.
 * hideFleetModal(): To hide the modal.
 * clearFleetsModal(): To clear the data.
 * locates(locate): Method for locate.
 * singlelocate(locate, singleevent): Method for single locate.
 */

import {
  Component, ViewChild, OnInit, AfterContentChecked, ViewContainerRef, Inject,
  Output, AfterViewInit, ViewChildren, EventEmitter
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { EventService } from './events.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { EventComponent } from '../eventpopup/event.component';
import { NotificationsService } from '../../../notifications/notifications.service';
import { FleetsService } from '../../../enterprises/fleets/fleetslist/fleets.service';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'events.html',
  providers: [EventService, ConfirmationService, AdvertisementsService, FleetsService]
})

export class EventsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  alleventsDetails: any;
  events = '';
  eventviewstatus: any;
  fleetCommonName: any;
  eventaddstatus: any;
  eventeditstatus: any;
  eventliststatus: any;
  eventdeletedstatus: any;
  eventexportstatus: any;
  searchstring: string;
  stacked: boolean;
  userToken: any;
  rowsPerPage = 10;
  toastermessage: any;
  pagename: any;
  recordid: any;
  storage: Storage = window.localStorage;
  cancelstatus: any;
  checkinstatus: any;
  checkoutstatus: any;
  locatestatus: any;
  extendstatus: any;
  // time zones
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  timezoneCode: any;
  loginUserDateFormat: any;
  currentutc: any;
  enterpriseIconFilePath: any;
  eventvalobj: any;
  enterprisevalue: any = '';
  fleetvalue: any = '';
  eventvalue: any = '';
  ownervalue: any = '';
  statusvalue: any = '';
  eventtypevalue: any = '';
  startdatevalue: any = '';
  erroradvstartdate: any;
  erroradvenddate: any;
  enddatevalue: any = '';
  cityvalue: any = '';
  statevalue: any = '';
  countryvalue: any = '';
  timeZones: any[];
  paramadvancedFromDate: any = '';
  paramadvancedToDate: any = '';
  countries: any[];
  statusList: any;
  eventTypesList: any;
  userrole: any;
  enterpriseNames: any;
  /* fleets availability */
  eventList = [];
  value: any;
  enterpriseId: any;
  userId: any;
  fleetId: any;
  enterprisesName: any;
  actionType: any;
  fleetinfo: any;
  fleetsList: any[];
  reservationstartdate: any;
  reservationenddate: any;
  fleetTypes: any;
  usersList: any;
  fleetName: any;
  enterpriseNameslist: any;
  enterprisesSize: any;
  fleetsavailability: any;
  attributeList: any;
  addinfo: any;
  attributeId: any;
  minDate: Date;
  error: any;
  attributeText: any;
  advutctimezone: any;
  advutctimezonestring: any;
  advuserpreferedtimezone: any;
  // enterpriseNames: any;
  enterPriseId: any;
  check: any = false;
  createEnterPriseName: any;
  createFleetType: any;
  createAttributes: any;
  startdate: any;
  enddate: any;
  selecteddays: any;
  selectedhours: any;
  selectedduration: any;
  eventregistrationCloseDate: any;
  durationList = [];
  duration: any;
  daysList: any = [];
  hoursList: any = [];
  enddate1: any;
  startdate1: any;
  createFleetName: any;
  fleetNames: any;
  fleetValues: any;
  fleetvaluestatus = false;
  attributesarray: any[];
  galleryImages: any[];
  fleet: any;
  longitude: any;
  latitude: any;
  isTransactable: any;
  updatedAt: any;
  createdAt: any;
  worknumbercntrycode: any;
  worknumbercntrycodesplit: any[];
  worknumber: any;
  attributevalue: any;
  worknumext: any;
  registrationCloseDate: any;
  isMultiRegistartion: any;
  fleetValueId: any;
  timezoneCodes: any;
  guidedcreateobj: any;
  guidedcreateevent: any;
  errorstartdate: any;
  errorenddate: any;
  errorclosedate: any;
  lookupTypeName: any;
  eventValue: any;
  eventTypeId: any;
  userAccount: any;
  userValues: any;
  addStartdate: any;
  addEnddate: any;
  hiddenstartdate: any;
  hiddenenddate: any;
  hiddenselectedhours: any;
  hiddenselecteddays: any;
  hiddenselectedduration: any;
  error1: any;
  longitudee: any;
  latitudee: any;
  updateAt: any;
  createAt: any;
  fleetData: any;
  fleetViewParm = false;
  selectedent: any;
  maxActiveReservationsPerUser: any;
  advancedReservationWindowInDays: any;
  advancedReservationWindowInDays1: any;
  advancedReservationWindowInDays2: any;
  maxReservationWindowInHrs: any;
  maxReservationWindowInHrs1: any;
  maxReservationWindowInHrs2: any;
  time: any;
  useraccount: any;
  userRole: any;
  closedate1: any;
  timeZoneValue: any;
  guided: any;
  listuserpreferedtimezone: any;
  attributesList: any;
  fleetsCommonName: any;
  part1: any;
  part2: any;
  guidedcreatestatus: any;
  eventUserName: any;
  firstName: any;
  lastName: any;
  fleetname: any;
  countriesListLength = true;
  enterpriseselect = false;
  toCreateEventOnOtherUser: boolean;
  fleetSeatAttributeValue: any;
  fleetsList1: any[];
  selectedFleet = null;
  @ViewChild('mgModal') public childModal1: ModalDirective;
  @ViewChildren('input') vc;
  @ViewChild(EventComponent)
  private EventsModalComponent: EventComponent;
  @ViewChild('fleetModel') public fleetModel: ModalDirective;
  @ViewChild('createModel') public createModel: ModalDirective;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();

  /**---- Constructor for events component ----*/
  constructor(private router: Router,
    private vcr: ViewContainerRef,
    public toastr: ToastsManager,
    private notificationService: NotificationsService,
    public advertisementsService: AdvertisementsService,
    private translateService: TranslateService,
    private eventService: EventService,
    private confirmationService: ConfirmationService,
    private allfleetsService: FleetsService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultSeatLimit') public defaultSeatLimit: number,
    @Inject('defaultDuration') private defaultDuration: number,
    @Inject('defaultDays') private defaultDays: number, ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the all fleets list at loading time ----*/
  ngOnInit() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.userToken = window.localStorage.getItem('token');
    this.eventviewstatus = window.localStorage.getItem('eventviewstatus');
    this.eventaddstatus = window.localStorage.getItem('eventaddstatus');
    this.eventeditstatus = window.localStorage.getItem('eventeditstatus');
    this.eventliststatus = window.localStorage.getItem('eventliststatus');
    this.eventdeletedstatus = window.localStorage.getItem('eventdeletedstatus');
    this.eventexportstatus = window.localStorage.getItem('eventexportstatus');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    this.cancelstatus = window.localStorage.getItem('eventcancelstatus');
    this.checkinstatus = window.localStorage.getItem('eventcheckinstatus');
    this.checkoutstatus = window.localStorage.getItem('eventcheckoutstatus');
    this.locatestatus = window.localStorage.getItem('eventlocatestatus');
    this.extendstatus = window.localStorage.getItem('eventextendstatus');
    this.guidedcreatestatus = window.localStorage.getItem('eventguidedcreate');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.userRole = window.localStorage.getItem('userrole');
    this.useraccount = window.localStorage.getItem('user_Account');
    this.userId = window.localStorage.getItem('user_id');
    window.localStorage.removeItem('lcevents');
    window.localStorage.removeItem('lceventsdata');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    this.listuserpreferedtimezone = utcformat[0].trim();
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advutctimezone = utcval[0];
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.advutctimezonestring = utcval[0].toString();
    this.getCountries();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if (this.pagename === 'events') {
      this.getrecorddetails();
      this.storage.removeItem('notificationpage');
    } else if (this.storage.getItem('selectedEventscountry') !== undefined && this.storage.getItem('selectedEventscountry') !== null) {
      this.countryvalue = this.storage.getItem('selectedEventscountry');
      this.advance();
      this.storage.removeItem('selectedEventscountry');
    } else if (this.storage.getItem('dashbordStartDate') !== undefined && this.storage.getItem('dashbordStartDate') !== null
      && this.storage.getItem('dashbordEndDate') !== undefined && this.storage.getItem('dashbordEndDate') !== null) {
      this.startdatevalue = this.storage.getItem('dashbordStartDate');
      this.enddatevalue = this.storage.getItem('dashbordEndDate');
      if (this.storage.getItem('selecteddashboardenterpriseid') === 'undefined') {
        this.enterprisevalue = '';
      } else {
        this.enterprisevalue = this.storage.getItem('selecteddashboardenterpriseid');
      }
      this.advance();
    } else {
      this.getalleventsList();
    }
    this.fleetsavailability = {};
    this.guidedcreateobj = {};
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
    for (let j = 0; j <= 1500; j++) {
      this.daysList.push(j);
    }
    for (let k = 0; k <= 23; k++) {
      if (k < 10) {
        this.hoursList.push('0' + k);
      } else {
        this.hoursList.push(k);
      }
    }
  }

  /**---- After view intilisation rendered ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
    if (window.localStorage.getItem('createevent') === 'eventpopup') {
      this.EventsModalComponent.showChildModal('CREATE', '');
    }
    window.localStorage.removeItem('createpopup');
  }
  calendar(data) {
    window.localStorage.setItem('calendarfrom', 'Events');
    window.localStorage.setItem('eventfleet_id', data.fleetObj._id);
    window.localStorage.setItem('fleetstartdate', data.startDatetime);
    window.localStorage.setItem('eventenabled', data.fleetObj.isEventsEnabled);
    window.localStorage.removeItem('fleetreservaton_id');
    window.localStorage.removeItem('fleets_id');
    this.router.navigate(['/calendar']);
  }
  /*---- To check the content ----*/
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('eventedit') === 'Updated') {
      this.getalleventsList();
    }
    window.localStorage.removeItem('eventedit');
    if (window.localStorage.getItem('eventsadvance1')) {
      this.advance();
    }
    if (window.localStorage.getItem('simplesearch1') === 'search1') {
      this.getEventsSeachList(this.searchstring);
    }
    window.localStorage.removeItem('simplesearch1');
    window.localStorage.removeItem('eventsadvance1');
  }

  /*---- To open the popup model ----*/
  singleEvents(selectedaction, selectedObj) {
    this.EventsModalComponent.showChildModal(selectedaction, selectedObj);
  }

  fleetSelected(value) {
    this.selectedFleet = value;
  }

  /**---- To check fleet availabity popup */
  checkFleets() {
    this.duration = this.defaultDuration;
    this.fleetModel.show();
    this.getFleetTypeAttributes(this.fleetsavailability.fleetType);
    this.createModel.hide();
    this.gettimeZones();
    this.fleetsavailability.createFleetName = '';
    this.minDate = new Date();
    this.fleetinfo = false;
    this.actionType = 'advCreate';
    this.error = '';
    this.error1 = '';
    this.lookupTypeName = '';
    this.getEnterprise();
    this.selectedduration = this.defaultDuration;
    const time = 1000 * 60 * 5;
    const date = new Date();
    this.selecteddays = '0';
    this.selectedhours = '00';
    this.reservationstartdate = new Date(Math.ceil(date.getTime() / time) * time);
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
    this.eventregistrationCloseDate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() -
      Number(5)))).format('YYYY-MM-DD HH:mm');
    this.minDate = new Date();
  }


  /**---- To open the advance search popup model ----*/
  public AdvancePopupModal() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.pagename = 'COMMON_PAGE_TITLES.ADVANCED_SEARCH';
    this.error = '';
    this.getStatus();
    this.getEventTypes();
    this.getCountries();
    this.gettimeZones();
    this.childModal1.show();
  }
  /**--- To get the current UTc time ----*/
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /**---- To get event details ----*/
  eventDetailsList(eventId) {
    // this.selected_role = <HTMLInputElement>document.getElementById('selectrole');
    if (eventId !== undefined && eventId > 0 && eventId !== 'undefined') {
      // this.delerror = '';
      window.localStorage.setItem('eventId', eventId);
      window.localStorage.setItem('events', 'events');
      this.router.navigate(['/transactions/eventregistrations']);
    } else {
      // this.delerror = 'USER_ROLES.ROLE_SELECT_RENAME';
    }
  }

  /**------ To get the record details-------- */
  getrecorddetails() {
    this.getservercurrentutctime();
    window.localStorage.removeItem('lcevents');
    window.localStorage.removeItem('lceventsdata');
    this.notificationService.getNotification(this.recordid, this.pagename, this.userToken)
      .subscribe(
      data => {
        for (let i = 0; i < data['result'].length; i++) {
          if (data['result'][i].endDatetime > this.currentutc) {
            data['result'][i].recordstatus = 'active';
            if (data['result'][i].startDatetime > this.currentutc) {
              data['result'][i].startdatestatus = 'statdateactive';
            } else {
              data['result'][i].startdatestatus = 'statdateinactive';
            }
            if (data['result'][i].eventRegistrationCloseDate > this.currentutc) {
              data['result'][i].closedatestatus = 'closedateactive';
            } else {
              data['result'][i].closedatestatus = 'closedateinactive';
            }
          } else {
            data['result'][i].recordstatus = 'inactive';
          }
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().add(utctimesplit[0], 'hours');
            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
              add(utctimesplit[1], 'minutes');
            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
              .eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
            data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
              .eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
            data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
              .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');

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
            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().
              subtract(utctimesplit[0], 'hours');
            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
              subtract(utctimesplit[1], 'minutes');
            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).
              subtract(utctimesplit[1], 'minutes');
            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
              .eventRegistrationCloseDate).subtract(utctimesplit[0], 'hours');
            data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
              .eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
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
        this.alleventsDetails = data['result'];
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

  /*-- To get Event status list --*/
  getStatus() {
    this.eventService.getLookupsList(this.userToken, 'EVENT_STATUSES')
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

  /*-- To get Event Types list --*/
  getEventTypes() {
    this.eventService.getLookupsList(this.userToken, 'EVENT_TYPES')
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

  /**---- To get the selected event -----*/
  selectEventType(eventvalue) {
    this.eventValue = eventvalue.split('$');
    this.eventTypeId = this.eventValue[0];
    this.lookupTypeName = this.eventValue[1];
  }

  /*-- To get Countries list --*/
  public getCountries() {
    this.eventService.getLookupsList(this.userToken, 'COUNTRIES').subscribe(
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
    this.fleetsavailability.country = value;
  }

  /*-- Get Time zones list --*/
  public gettimeZones() {
    this.eventService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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
  /*--- To change the getTimezonesstartdate list ----*/
  getTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.advuserpreferedtimezone = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
  }

  /**---- To change the time zones ----*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.userpreferedtimezone = timevalue[0];
    this.timeZoneValue = timevalue;
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /*---- To get Enterprise List ----*/
  getEnterprise() {
    if (this.enterPriseId === null || this.enterpriseId === '' || this.enterpriseId === undefined) {
      this.enterpriseselect = false;
    }
    this.eventService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterpriseNameslist = data['result'];
            this.fleetsavailability.enterpriseNames = this.enterpriseNameslist[0].enterpriseName;
            this.guidedcreateobj.enterpriseNames = this.enterpriseNameslist[0].enterpriseName;
            this.guidedcreateobj.enterPriseId = this.enterpriseNameslist[0]._id;
            this.fleetsavailability.enterPriseId = this.enterpriseNameslist[0]._id;
            this.enterPriseId = this.enterpriseNameslist[0]._id;
            this.fleetsavailability.enterpriseId = this.enterpriseNameslist[0]._id;
            this.enterPriseId = this.fleetsavailability.enterpriseId;
            this.getCountriesbyEnterpriseId(this.enterPriseId);
            if (this.fleetsavailability.fleetType === '' || this.fleetsavailability.fleetType === undefined) {
              this.getFleetTypes(this.enterPriseId);
            }
            this.enterprisesSize = true;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
          } else {
            this.enterpriseNameslist = data['result'];
            if (this.enterPriseId === null || this.enterpriseId === '' || this.enterpriseId === undefined) {
              this.enterpriseselect = false;
            }
            this.enterprisesSize = false;
          }
        }
      });
    // this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }
  /**---- To get Countries by existing fleets, resources, enterprises ----*/
  public getCountriesbyEnterpriseId(enterPriseId) {
    this.eventService.getCountriesbyEnterpriseId(this.userToken, enterPriseId).subscribe(
      data => {
        this.enterpriseselect = true;
        if (data['result'].length > 0) {
          this.fleetsavailability.country = data['result'][0];
        }
        if (data['result'].length > 1) {
          this.countriesListLength = true;
        } else {
          this.countriesListLength = false;
        }
        this.countries = data['result'];
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

  /**-------   To split the enterprise id and name  -------- */
  getEnterpriseResources(type) {
    // this.fleetvaluestatus = false;
    this.value = type.split('$');
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
    }
  }

  /**---- To get fleet types list ----*/
  public getFleetTypes(enterPriseId) {
    this.eventService.getFleetTypesList(this.userToken, enterPriseId).subscribe(
      data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 0) {
            this.fleetTypes = data['result'];
            this.addinfo = false;
          } else {
            this.fleetTypes = data['result'][0].fleetTypes;
            this.getFleetTypeAttributes(this.fleetTypes[0].fleetTypeName);
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

  /**---- To get fleet types ----*/
  public getFleetTypesById(value) {
    const enterprise = value.split('$');
    this.enterPriseId = value[0];
    this.enterpriseIconFilePath = enterprise[2] + '/' + enterprise[3];
    window.localStorage.setItem('guided', this.enterPriseId);
    this.fleetsavailability.fleetType = '';
    this.getFleetTypes(this.enterPriseId);
    this.fleetsavailability.enterpriseNames = enterprise[1];
    this.fleetsavailability.enterpriseId = enterprise[0];
    this.selectedent = this.fleetsavailability.enterpriseNames;
    if (value !== 'Select') {
      this.getCountriesbyEnterpriseId(this.enterPriseId);
    } else {
      this.countriesListLength = true;
      this.enterpriseselect = false;
      this.fleetsavailability.country = '';
      this.getCountries();
      this.fleetsList1 = [];
    }
  }

  /**---- To get fleet typ attributes ---*/
  getFleetTypeAttributes(value) {
    this.fleetsavailability.fleetType = value;
    window.localStorage.setItem('fleettype', value);
    this.eventService.getfleetTypeAttributes(this.userToken, this.fleetsavailability.fleetType, this.enterPriseId)
      .subscribe(
      attributelist => {
        this.attributeList = attributelist['result'];
        if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList.length === 0) {
          this.addinfo = false;
        } else {
          this.addinfo = true;
        }
        this.fleetsCheckSubmit('onchange');
        this.selectedFleet = null;
        // this.getParentFleetList();
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

  /**-------   To split the getFleetResources  -------- */
  getFleetResources(values) {
    this.fleetValues = values.split('$');
    this.fleetId = this.fleetValues[0];
    this.fleetName = this.fleetValues[1];
    if (values === '') {
      this.fleetvaluestatus = false;
    } else {
      this.viewFleet(this.fleetId);
    }
  }

  /**--- To get the fleets ----*/
  getFleetList(enterpriseId) {
    this.eventService.getFleetNames(this.userToken, enterpriseId, this.createFleetType)
      .subscribe(data => {
        this.eventList = data['result'];
      });
  }

  /**--- To get changed fleet value ----*/
  fleets(fleet) {
    this.fleetsavailability.createFleetName = fleet._id + '$' + fleet.fleetName;
    this.error1 = '';
  }

  /*---- To get all events list ----*/
  getalleventsList() {
    this.getservercurrentutctime();
    window.localStorage.removeItem('lcevents');
    window.localStorage.removeItem('lceventsdata');
    window.localStorage.removeItem('searcheventsDetails');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.eventService.getMyAlleventsList(this.userToken)
      .subscribe(
      data => {
        if (data['result'].length > 0) {
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].eventOwner.userId.userName =
              data['result'][i].eventOwner.userId.enterpriseResourceObj.firstName + ' '
              + data['result'][i].eventOwner.userId.enterpriseResourceObj.lastName;
            if (data['result'][i].endDatetime > this.currentutc) {
              data['result'][i].recordstatus = 'active';
              if (data['result'][i].startDatetime > this.currentutc) {
                data['result'][i].startdatestatus = 'statdateactive';
              } else {
                data['result'][i].startdatestatus = 'statdateinactive';
              }
              if (data['result'][i].eventRegistrationCloseDate > this.currentutc) {
                data['result'][i].closedatestatus = 'closedateactive';
              } else {
                data['result'][i].closedatestatus = 'closedateinactive';
              }
            } else {
              data['result'][i].recordstatus = 'inactive';
            }
            const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
            const timezonevalue = defaulttimezoneCode.split('(UTC');
            const utcformat = timezonevalue[0].split('-');
            this.userpreferedtimezone = utcformat[0].trim();
            const utcval = timezonevalue[1].split(')');
            this.utctimezone = utcval[0];
            this.utctimezonestring = utcval[0].toString();
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
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
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
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
          this.alleventsDetails = data['result'];
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
              this.router.navigate(['']);
            } break;
        }
      });
  }

  /*---- To search the events list by string ----*/
  public getEventsSeachList(searchstring) {
    this.searchstring = searchstring;
    window.localStorage.removeItem('lcevents');
    window.localStorage.removeItem('lceventsdata');
    if (window.localStorage.removeItem('eventsadvance')) {
      window.localStorage.removeItem('eventsadvance');
    }
    if (searchstring) {
      this.getservercurrentutctime();
      this.eventService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        data => {
          window.localStorage.setItem('simplesearch', 'search');
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].eventOwner.userId.userName =
              data['result'][i].eventOwner.userId.enterpriseResourceObj.firstName + ' '
              + data['result'][i].eventOwner.userId.enterpriseResourceObj.lastName;
            if (data['result'][i].endDatetime > this.currentutc) {
              data['result'][i].recordstatus = 'active';
              if (data['result'][i].startDatetime > this.currentutc) {
                data['result'][i].startdatestatus = 'statdateactive';
              } else {
                data['result'][i].startdatestatus = 'statdateinactive';
              }
              if (data['result'][i].eventRegistrationCloseDate > this.currentutc) {
                data['result'][i].closedatestatus = 'closedateactive';
              } else {
                data['result'][i].closedatestatus = 'closedateinactive';
              }
            } else {
              data['result'][i].recordstatus = 'inactive';
            }
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
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
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
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
          } this.alleventsDetails = data['result'];
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
                this.router.navigate([' ']);
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
    } else {
      this.getalleventsList();
    }
  }

  /**---- Method for advance serach ----*/
  public advance() {
    this.storage.removeItem('dashbordStartDate');
    this.storage.removeItem('dashbordEndDate');
    this.storage.removeItem('selecteddashboardenterpriseid');
    this.erroradvstartdate = this.startdatevalue;
    this.erroradvenddate = this.enddatevalue;
    if (this.startdatevalue === '' || this.startdatevalue === null || this.startdatevalue === undefined) {
      this.startdatevalue = '';
    }
    if (this.enddatevalue === '' || this.enddatevalue === null || this.enddatevalue === undefined) {
      this.enddatevalue = '';
    }
    if (this.startdatevalue !== '' && this.startdatevalue > this.enddatevalue) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startdatevalue = this.erroradvstartdate;
      this.enddatevalue = this.erroradvenddate;
    } else {
      this.error = '';
      if (this.startdatevalue !== '') {
        if (this.advutctimezonestring.charAt(0) === '-') {
          const utctime = this.advutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedFromDate = moment(this.startdatevalue).add(utctimesplit[0], 'hours');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).add(utctimesplit[1], 'minutes');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).format('YYYY-MM-DD HH:mm');
        } else {
          const utctime = this.advutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedFromDate = moment(this.startdatevalue).subtract(utctimesplit[0], 'hours');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).subtract(utctimesplit[1], 'minutes');
          this.paramadvancedFromDate = moment(this.paramadvancedFromDate).format('YYYY-MM-DD HH:mm');
        }
      }
      if (this.enddatevalue !== '') {
        if (this.advutctimezonestring.charAt(0) === '-') {
          const utctime = this.advutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedToDate = moment(this.enddatevalue).add(utctimesplit[0], 'hours');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).add(utctimesplit[1], 'minutes');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).format('YYYY-MM-DD HH:mm');
        } else {
          const utctime = this.advutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.paramadvancedToDate = moment(this.enddatevalue).subtract(utctimesplit[0], 'hours');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).subtract(utctimesplit[1], 'minutes');
          this.paramadvancedToDate = moment(this.paramadvancedToDate).format('YYYY-MM-DD HH:mm');
        }
      }
      if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
        this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.fleetvalue !== '' && this.fleetvalue !== undefined) {
        this.fleetvalue = this.fleetvalue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.eventvalue !== '' && this.eventvalue !== undefined) {
        this.eventvalue = this.eventvalue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.ownervalue !== '' && this.ownervalue !== undefined) {
        this.ownervalue = this.ownervalue.trim().replace(/\s\s+/g, ' ');
        const eventowner = this.ownervalue.split(' ');
        this.firstName = eventowner[0];
        this.lastName = eventowner[1];
        if (this.lastName === undefined) {
          this.firstName = '';
          this.lastName = '';
          this.ownervalue = this.ownervalue.trim().replace(/\s\s+/g, ' ');
        }
      }
      if (this.statevalue !== '' && this.statevalue !== undefined) {
        this.statevalue = this.statevalue.trim().replace(/\s\s+/g, ' ');
      }
      if (this.cityvalue !== '' && this.cityvalue !== undefined) {
        this.cityvalue = this.cityvalue.trim().replace(/\s\s+/g, ' ');
      }
      this.eventvalobj = {
        'enterpriseName': this.enterprisevalue,
        'fleetName': this.fleetvalue,
        'eventName': this.eventvalue,
        'eventOwner': this.ownervalue,
        'eventType': this.eventtypevalue,
        'eventStatus': this.statusvalue,
        'firstName': this.firstName,
        'lastName': this.lastName,
        'state': this.statevalue,
        'city': this.cityvalue,
        'country': this.countryvalue,
        'startDatetime': this.paramadvancedFromDate,
        'endDatetime': this.paramadvancedToDate
      };
      this.eventService.advacncedSearch(this.userToken, this.eventvalobj).subscribe(
        data => {
          this.startdatevalue = this.erroradvstartdate;
          this.enddatevalue = this.erroradvenddate;
          window.localStorage.setItem('lcevents', 'lceventsdata');
          window.localStorage.setItem('lceventsdata', JSON.stringify(data));
          window.localStorage.setItem('eventsadvance', 'advance');
          for (let i = 0; i < data['result'].length; i++) {
            data['result'][i].eventOwner.userId.userName =
              data['result'][i].eventOwner.userId.enterpriseResourceObj.firstName + ' '
              + data['result'][i].eventOwner.userId.enterpriseResourceObj.lastName;
            if (data['result'][i].endDatetime > this.currentutc) {
              data['result'][i].recordstatus = 'active';
              if (data['result'][i].startDatetime > this.currentutc) {
                data['result'][i].startdatestatus = 'statdateactive';
              } else {
                data['result'][i].startdatestatus = 'statdateinactive';
              }
              if (data['result'][i].eventRegistrationCloseDate > this.currentutc) {
                data['result'][i].closedatestatus = 'closedateactive';
              } else {
                data['result'][i].closedatestatus = 'closedateinactive';
              }
            } else {
              data['result'][i].recordstatus = 'inactive';
            }
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                add(utctimesplit[1], 'minutes');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).utc().add(utctimesplit[0], 'hours');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).add(utctimesplit[1], 'minutes');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');

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
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().
                subtract(utctimesplit[0], 'hours');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].startDatetime = moment(data['result'][i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).
                subtract(utctimesplit[1], 'minutes');
              data['result'][i].endDatetime = moment(data['result'][i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).subtract(utctimesplit[1], 'minutes');
              data['result'][i].eventRegistrationCloseDate = moment(data['result'][i]
                .eventRegistrationCloseDate).format(this.loginUserDateFormat + ' HH:mm');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
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
          } this.alleventsDetails = data['result'];
          if (data['statusCode'] === '1001') {
            this.childModal1.hide();
          }
        },
        error => {
          this.startdatevalue = this.erroradvstartdate;
          this.enddatevalue = this.erroradvenddate;
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
                this.router.navigate([' ']);
              } else if (statuscode === '9995') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
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

  /**--- To submit the fleets check method ----*/
  fleetsCheckSubmit(action) {
    this.userId = '';
    this.lookupTypeName = 'Private';
    this.fleetsList = [];
    this.error1 = '';
    if (this.reservationstartdate != null && this.reservationenddate != null) {
      this.hiddenstartdate = this.reservationstartdate;
      this.hiddenenddate = this.reservationenddate;
      this.fleetsavailability.hiddenselectedhours = this.selectedhours;
      this.fleetsavailability.hiddenselecteddays = this.selecteddays;
      this.fleetsavailability.hiddenselectedduration = this.selectedduration;
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
      this.fleetsavailability.startdate = moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm');
      this.fleetsavailability.enddate = moment(this.reservationenddate).format('YYYY-MM-DD HH:mm');
    }
    if (this.fleetsavailability.enterpriseNames === '' || this.fleetsavailability.enterpriseNames === undefined ||
      this.fleetsavailability.enterpriseNames == null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.fleetsavailability.fleetType === '' || this.fleetsavailability.fleetType === undefined ||
      this.fleetsavailability.fleetType == null) {
      this.error = this.translateService.get('FLEETS.VALID_NOBLANK_FLEET_TYPE');
      this.error = this.fleetCommonName + this.error.value;
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.reservationstartdate === '' || this.reservationstartdate === undefined || this.reservationstartdate == null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate; // moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm');
    } else if (this.reservationenddate === '' || this.reservationenddate === undefined || this.reservationenddate == null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') > moment(this.reservationenddate).format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.fleetsavailability.country === '' || this.fleetsavailability.country === undefined ||
      this.fleetsavailability.country == null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else {
      // this.error = '';
      const array = [];
      if (action == 'submit') {
        if (this.attributeList) {
          for (let i = 0; i < this.attributeList.length; i++) {
            const itemInputID = <HTMLInputElement>document.getElementById('itemId' + i);
            const itemInputText = <HTMLInputElement>document.getElementById('itemText' + i);
            this.attributeId = parseInt(itemInputID.value, 10);
            this.attributeText = itemInputText.value.trim().replace(/\s\s+/g, ' ');
            array[i] = {
              'attributeValue': this.attributeText
            };
          }
        }
      }
      this.fleetsavailability.pageName = 'events';
      this.eventService.checkFleetsAvailabity(this.userToken, this.fleetsavailability).subscribe(
        data => {
          this.reservationstartdate = this.hiddenstartdate;
          this.reservationenddate = this.hiddenenddate;
          if (data['statusCode'] === '1001') {
            if (action == 'submit') {
              this.fleetinfo = true;
            } else {
              this.fleetinfo = false;
            }
            // this.createModel.hide();
            data['result'][0].fleetType = JSON.parse(data['result'][0].fleetType)[0]['fleetTypes'][0]['fleetTypeName'];
            if (this.selectedFleet == null || this.selectedFleet == 'null') {
              this.fleetsList = data['result'];
            } else {
              for (let i = 0; i <= data['result'].length; i++) {
                if (data['result'][i].fleetCode === this.selectedFleet)
                  this.fleetsList.push(data['result'][i]);
              }
            }
            this.fleetsList1 = data['result'];
          }
        },
        error => {
          this.fleetsList1 = [];
          this.reservationstartdate = this.hiddenstartdate;
          this.reservationenddate = this.hiddenenddate;
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (action == 'submit') {
                this.fleetinfo = true;
              } else {
                this.fleetinfo = false;
              }
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

  /** ---- To get User list by Enterprise id ----- */
  getUserlistByentId(entId) {
    this.eventService.getUserListByEntId(this.userToken, entId)
      .subscribe(
      userList => {
        if (userList.result.length === 1) {
          this.usersList = userList['result'];
          this.userAccount = userList['result'][0].userAccount;
          this.userId = userList['result'][0]._id;
          if (userList['result'][0].enterpriseResourceObj !== undefined) {
            this.eventUserName = userList['result'][0].enterpriseResourceObj.firstName + ' ' +
              userList['result'][0].enterpriseResourceObj.lastName;
          }
          if (userList['result'][0].settings !== undefined) {
            this.maxActiveReservationsPerUser = userList['result'][0].settings.maxActiveReservationsPerUser;
            this.advancedReservationWindowInDays = userList['result'][0].settings.advancedReservationWindowInDays;
            this.maxReservationWindowInHrs = userList['result'][0].settings.maxReservationWindowInHrs;
          }
        } else {
          this.usersList = userList['result'];
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

  /**---- To split the user id and name  -------- */
  selectUserInfo(uservalue) {
    this.userValues = uservalue.split('$');
    this.userId = this.userValues[0];
    this.userAccount = this.userValues[1];
    this.maxActiveReservationsPerUser = this.userValues[2];
    this.advancedReservationWindowInDays = this.userValues[3];
    this.maxReservationWindowInHrs = this.userValues[4];
  }


  /**---- To change the days ----*/
  daysChangedfirst(days) {
    const durationvalue = Math.floor(this.duration / (24 * 60));
    this.duration = this.duration - durationvalue * 24 * 60 + 24 * 60 * Number(days);
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To change the hours ----*/
  hoursChangedfirst(hours) {
    const durationvaluedays = Math.floor(this.duration / (24 * 60));
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = this.duration - (durationvaluehours - durationvaluedays * 24) * 60 + Number(hours) * 60;
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To change the duration ----*/
  durationChangedfirst(duration) {
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = durationvaluehours * 60 + Number(duration);
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
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
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.reservationstartdate = new Date(Math.ceil(this.reservationstartdate.getTime() / time) * time);
      this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment
        (this.reservationstartdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');

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
      const duration = moment.utc(moment(this.reservationenddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.reservationstartdate, 'YYYY-MM-DD HH:mm'))).format('m');
      if (Number(duration) < 10) {
        mins = '0' + Number(duration);
      } else {
        mins = Number(duration);
      }
      const durationhrs = moment.utc(moment(this.reservationenddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.reservationstartdate, 'YYYY-MM-DD HH:mm'))).format('H');
      if (Number(durationhrs) < 10) {
        hrs = '0' + Number(durationhrs);
      } else {
        hrs = Number(durationhrs);
      }
      const durationdays = moment.utc(moment(this.reservationenddate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.reservationstartdate, 'YYYY-MM-DD HH:mm')));
      this.selectedhours = hrs;
      this.selecteddays = Math.floor(Number(durationdays) / (24 * 60 * 60 * 1000));
      this.selectedduration = mins;
      this.duration = Math.floor(Number(durationdays) / (60 * 1000));
    }
  }

  /**---- To change the start date value ----*/
  startDateChange(value) {
    const stdate = moment(value).format('YYYY-MM-DD HH:mm');
    this.registrationCloseDate = value;
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
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
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
  /*---- To load when registerclosedate changed ----*/
  registerclosedatechanged(closevalue) {
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
      // this.registrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') < moment(this.registrationCloseDate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      // this.registrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      // this.registrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
      // this.registrationCloseDate = new Date(Math.ceil(this.registrationCloseDate.getTime() / time) * time);
    }
  }


  /**---- To submit the create fleets method ----*/
  fleetsSubmit(fleetsavailability) {
    if (this.fleetsavailability.createFleetName === '' || this.fleetsavailability.createFleetName === undefined ||
      this.fleetsavailability.createFleetName == null) {
      this.error1 = this.translateService.get('FLEET_RESERVATIONS.SELECT_FLEET');
      this.error1 = this.error1.value + this.fleetCommonName;
    } else {
      this.getUserlistByentId(fleetsavailability.enterpriseId);
      this.guidedcreateobj.seatLimit = this.defaultSeatLimit;
      this.guidedcreateobj.eventOwnerAutoRegister = true;
      this.enterpriseId = fleetsavailability.enterpriseId;
      this.getFleetList(fleetsavailability.enterpriseId);
      this.enterprisesName = fleetsavailability.enterpriseNames;
      this.createEnterPriseName = fleetsavailability.enterpriseNames;
      this.addStartdate = this.hiddenstartdate;
      this.addEnddate = this.hiddenenddate;
      this.createFleetType = fleetsavailability.fleetType;
      this.createAttributes = fleetsavailability.attributes;
      this.fleetNames = fleetsavailability.createFleetName;
      this.fleetname = this.fleetNames.split('$');
      this.fleetNames = this.fleetname[0];
      this.fleetname = this.fleetname[1];
      this.fleetValueId = this.fleetNames.split('$');
      this.fleetId = this.fleetValueId[0];
      this.fleetName = this.fleetValueId[1];
      this.viewFleet(this.fleetValueId[0]);
      this.gettimeZones();
      this.getEventTypes();
      this.hiddenselecteddays = fleetsavailability.hiddenselecteddays;
      this.hiddenselectedhours = fleetsavailability.hiddenselectedhours;
      this.selectedduration = fleetsavailability.hiddenselectedduration;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      if (this.timezoneCodes === this.userpreferedtimezone) {
        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcval = timezonevalue[1].split(')');
        this.utctimezone = utcval[0];
        this.utctimezonestring = utcval[0].toString();
      } else {
        const timezonevalue = this.timeZoneValue[1].split('(UTC');
        const utcval = timezonevalue[1].split(')');
        this.utctimezone = utcval[0];
        this.utctimezonestring = utcval[0].toString();
      }
      this.time = 1000 * 60 * 5;
      this.selecteddays = this.hiddenselecteddays;
      this.selectedhours = this.hiddenselectedhours;
      this.startdate = this.addStartdate;
      this.enddate = moment(moment(this.addEnddate).minutes((moment(this.addEnddate).minutes()))).format('YYYY-MM-DD HH:mm');
      this.minDate = new Date();
      this.registrationCloseDate = this.startdate;
      this.fleetModel.hide();
      this.createModel.show();
      this.error = '';
    }
    this.eventService.userDetails(this.userToken, window.localStorage.getItem('user_id'))
      .subscribe(data => {
        this.toCreateEventOnOtherUser = data['result'].settings.toCreateEventOnOtherUser;
        if (this.toCreateEventOnOtherUser) {
          this.getUserlistByentId(this.enterpriseId);
        } else {
          this.eventUserName = window.localStorage.getItem('first_name') + ' ' + window.localStorage.getItem('last_name');
        }
      });
  }

  /**---- To hide the guided create popup model ----*/
  public hideGuideCreateModal(): void {
    this.createModel.hide();
    this.userId = '';
  }

  /**---- To view the fleet data ----*/
  fleetView(fleetObj) {
    this.fleetViewParm ? this.fleetViewParm = false : this.fleetViewParm = true;
    this.fleetData = fleetObj;
    this.updateAt = moment(this.fleetData.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss');
    this.createAt = moment(this.fleetData.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss');
    this.worknumbercntrycode = this.fleetData.contactDetails.workNumberCountrycode;
    this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
    this.worknumext = this.fleetData.contactDetails.workNumberExtn;
    this.worknumber = this.fleetData.contactDetails.workNumber;
    this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetData.contactDetails.workNumber;
    if (this.fleetData.address !== undefined) {
      this.longitudee = this.fleetData.address.geoCoordinates[1].replace('%2B', '+');
      this.latitudee = this.fleetData.address.geoCoordinates[0].replace('%2B', '+');
    }
    if (this.worknumext) {
      this.worknumber = this.worknumber + ' x' + this.fleetData.contactDetails.workNumberExtn;
    }
  }

  /**-- To View fleets---- */
  viewFleet(id) {
    this.attributesarray = [];
    this.galleryImages = [];
    this.userToken = window.localStorage.getItem('token');
    this.eventService.getSingleFleetDetails(id, this.userToken)
      .subscribe(
      (data: any) => {
        this.fleetvaluestatus = true;
        this.fleet = data.result;
        this.isTransactable = this.fleet.isTransactable;
        this.updatedAt = moment(this.fleet.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        this.createdAt = moment(this.fleet.createdAt).format('YYYY-MM-DD HH:mm:ss');
        this.longitude = data.result.address.geoCoordinates[1].replace('%2B', '+');
        this.latitude = data.result.address.geoCoordinates[0].replace('%2B', '+');
        this.attributesList = data.result.attributes;
        this.worknumbercntrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.advancedReservationWindowInDays1 = this.fleet.settings.advancedReservationWindowInDays;
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
        if (JSON.stringify(this.attributesList) === '[]' || this.attributesList === null || this.attributesList === undefined) {
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

  /**---- To change the days ----*/
  daysChanged(days) {
    const durationvalue = Math.floor(this.duration / (24 * 60));
    this.duration = this.duration - durationvalue * 24 * 60 + 24 * 60 * Number(days);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To change the hours ----*/
  hoursChanged(hours) {
    const durationvaluedays = Math.floor(this.duration / (24 * 60));
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = this.duration - (durationvaluehours - durationvaluedays * 24) * 60 + Number(hours) * 60;
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**----- To change the duration ----*/
  durationChanged(duration) {
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = durationvaluehours * 60 + Number(duration);
    this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /*---- To export exportData ----*/
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('eventsadvance') === 'advance') {
      searchstring = JSON.stringify(this.eventvalobj);
      window.localStorage.removeItem('eventsadvance');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.eventService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;

  }

  /**---- To get seat capacity value ----*/
  seatLimitValidation() {
    for (let j = 0; j < this.attributesList.length; j++) {
      if (this.attributesList[j].attribute.attributeName === 'Seat Capacity') {
        this.fleetSeatAttributeValue = this.attributesList[j].attributeValue;
      }
    }
  }

  /**---- Method for guided create submit ----*/
  guidedCreateEvent(guidedcreateobj) {
    this.seatLimitValidation();
    this.guidedcreateobj.isMultiRegistartion = this.isMultiRegistartion;
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
    this.guidedcreateobj.startDatetime = this.startdate;
    this.guidedcreateobj.endDatetime = this.enddate;
    this.guidedcreateobj.eventRegistrationCloseDate = this.registrationCloseDate;
    if (this.enterpriseId === '' || this.enterpriseId === undefined || this.enterpriseId === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.guidedcreateobj.eventsName === '' || this.guidedcreateobj.eventsName === 'undefined' ||
      this.guidedcreateobj.eventsName === undefined || this.guidedcreateobj.eventsName === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_NAME';
    } else if (this.userId === '' || this.userId === undefined || this.userId === 'undefined' || this.userId === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_OWNER';
    } else if ((this.guidedcreateobj.seatLimit !== '' || this.guidedcreateobj.seatLimit !== undefined) &&
      (parseInt(this.guidedcreateobj.seatLimit, 0) > parseInt(this.fleetSeatAttributeValue, 0))) {
      this.error = 'EVENTS.EVENT_SEAT_LIMIT_MUST_LESS_SEAT_CAPACITY';
    } else if (this.guidedcreateobj.startDatetime === '' || this.guidedcreateobj.startDatetime === undefined ||
      this.guidedcreateobj.startDatetime === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
    } else if (this.guidedcreateobj.endDatetime === '' || this.guidedcreateobj.endDatetime === undefined ||
      this.guidedcreateobj.endDatetime === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
    } else if (moment(this.guidedcreateobj.startDatetime).format('YYYY-MM-DD HH:mm') >=
      moment(this.guidedcreateobj.endDatetime).format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.guidedcreateobj.eventRegistrationCloseDate === '' || this.guidedcreateobj.eventRegistrationCloseDate === undefined
      || this.guidedcreateobj.eventRegistrationCloseDate === null) {
      this.error = 'EVENTS.VALID_NOBLANK_REGISTRATION_CLOSE_DATE';
    } else if (moment(this.guidedcreateobj.startDatetime).format('YYYY-MM-DD HH:mm') <
      moment(this.guidedcreateobj.eventRegistrationCloseDate).format('YYYY-MM-DD HH:mm')) {
      this.error = 'EVENTS.VALID_REGISTRATION_CLOSE_DATE_EVENT_START_DATE';
    } else if (this.guidedcreateobj.purposes === '' || this.guidedcreateobj.purposes === undefined ||
      this.guidedcreateobj.purposes === null) {
      this.error = 'EVENTS.VALID_NOBLANK_EVENT_PURPOSE';
    } else {
      if (this.guidedcreateobj.eventsName !== undefined && this.guidedcreateobj.eventsName !== '') {
        this.guidedcreateobj.eventsName = this.guidedcreateobj.eventsName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.guidedcreateobj.notes1 !== undefined && this.guidedcreateobj.notes1 !== '') {
        this.guidedcreateobj.notes1 = this.guidedcreateobj.notes1.trim().replace(/\s\s+/g, ' ');
      }
      if (this.guidedcreateobj.purposes !== undefined && this.guidedcreateobj.purposes !== '') {
        this.guidedcreateobj.purposes = this.guidedcreateobj.purposes.trim().replace(/\s\s+/g, ' ');
      }
      if (this.guidedcreateobj.isMultiRegistartion === undefined || this.guidedcreateobj.isMultiRegistartion === 'undefined') {
        this.guidedcreateobj.isMultiRegistartion = false;
      }
      if (this.guidedcreateobj.seatLimit === '' || this.guidedcreateobj.seatLimit === undefined) {
        this.guidedcreateobj.seatLimit = this.defaultSeatLimit;
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
      /** ----- Convert prefered time zone to utc format start----- */
      this.errorstartdate = this.startdate;
      this.errorenddate = this.enddate;
      this.errorclosedate = this.registrationCloseDate;
      const checkdate = moment(this.currentutc).add(this.advancedReservationWindowInDays2, 'days');
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.guidedcreateobj.startDatetime = moment(this.guidedcreateobj.startDatetime).add(utctimesplit[0], 'hours');
        this.guidedcreateobj.startDatetime = moment(this.guidedcreateobj.startDatetime).add(utctimesplit[1], 'minutes');
        this.guidedcreateobj.endDatetime = moment(this.guidedcreateobj.endDatetime).add(utctimesplit[0], 'hours');
        this.guidedcreateobj.endDatetime = moment(this.guidedcreateobj.endDatetime).add(utctimesplit[1], 'minutes');
        this.guidedcreateobj.eventRegistrationCloseDate = moment(this.guidedcreateobj.eventRegistrationCloseDate).
          add(utctimesplit[0], 'hours');
        this.guidedcreateobj.eventRegistrationCloseDate = moment(this.guidedcreateobj.eventRegistrationCloseDate).
          add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.guidedcreateobj.startDatetime = moment(this.guidedcreateobj.startDatetime).subtract(utctimesplit[0], 'hours');
        this.guidedcreateobj.startDatetime = moment(this.guidedcreateobj.startDatetime).subtract(utctimesplit[1], 'minutes');
        this.guidedcreateobj.endDatetime = moment(this.guidedcreateobj.endDatetime).subtract(utctimesplit[0], 'hours');
        this.guidedcreateobj.endDatetime = moment(this.guidedcreateobj.endDatetime).subtract(utctimesplit[1], 'minutes');
        this.guidedcreateobj.eventRegistrationCloseDate = moment(this.guidedcreateobj.eventRegistrationCloseDate).
          subtract(utctimesplit[0], 'hours');
        this.guidedcreateobj.eventRegistrationCloseDate = moment(this.guidedcreateobj.eventRegistrationCloseDate).
          subtract(utctimesplit[1], 'minutes');
      }
      //
      if (moment(this.guidedcreateobj.startDatetime).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
      ) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
      } else if (moment(this.guidedcreateobj.endDatetime).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).
        utc().format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
      } else if (moment(this.guidedcreateobj.eventRegistrationCloseDate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc)
        .utc().format('YYYY-MM-DD HH:mm')) {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        this.registrationCloseDate = this.errorclosedate;
      } else if (moment(this.guidedcreateobj.startDatetime).format('YYYY-MM-DD HH:mm') > moment(checkdate).format('YYYY-MM-DD HH:mm')) {
        this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_ADVANCED_RESERVATION_WINDOW_IN_DAYS');
        this.error = this.error.value + this.fleetCommonName;
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
      } else if (this.duration > this.maxReservationWindowInHrs2) {
        this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
        this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
        this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
      } else {
        let register = {};
        if (this.guidedcreateobj.eventOwnerAutoRegister === true) {
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
        this.guidedcreateevent = {
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
          'eventName': this.autocase(this.guidedcreateobj.eventsName),
          'description': this.guidedcreateobj.descriptions,
          'eventType': this.lookupTypeName,
          'notes1': this.guidedcreateobj.notes1,
          'startDatetime': moment(this.guidedcreateobj.startDatetime).format('YYYY-MM-DD HH:mm'),
          'endDatetime': moment(this.guidedcreateobj.endDatetime).format('YYYY-MM-DD HH:mm'),
          'seatLimit': this.guidedcreateobj.seatLimit,
          'eventRegistrationCloseDate': moment(this.guidedcreateobj.eventRegistrationCloseDate).format('YYYY-MM-DD HH:mm'),
          'notes': this.guidedcreateobj.notes,
          'purpose': this.autocase(this.guidedcreateobj.purposes),
          'isEnabled': this.guidedcreateobj.isEnabled,
          'isMultiRegistration': this.guidedcreateobj.isMultiRegistartion,
          'isDeleted': this.guidedcreateobj.isDeleted,
          'eventOwnerAutoRegister': this.guidedcreateobj.eventOwnerAutoRegister,
          'registerObj': register,
          'duration': advDuration
        };
        this.eventService.guidedCreateEvent(this.guidedcreateevent, this.userToken)
          .subscribe(data => {
            this.createModel.hide();
            this.enterpriseIconFilePath = '';
            this.userId = '';
            this.method('');
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
              case '2063':
                this.error = this.translateService.get('COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode);
                this.error = this.error.value + this.fleetCommonName;
                break;
              case '9998':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
            }
          });
      }

    }
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

  /*--- To clear all fields ---*/
  public clearMsg() {
    this.enterpriseId = '';
    this.fleetName = '';
    this.userId = '';
    this.guidedcreateobj.eventsName = '';
    this.guidedcreateobj.eventOwner = '';
    this.guidedcreateobj.eventStatus = '';
    this.guidedcreateobj.eventType = '';
    this.guidedcreateobj.descriptions = '';
    this.guidedcreateobj.notes1 = '';
    this.guidedcreateobj.notes2 = '';
    this.guidedcreateobj.notes3 = '';
    this.guidedcreateobj.notes4 = '';
    this.guidedcreateobj.notes5 = '';
    this.guidedcreateobj.startDatetime = '';
    this.guidedcreateobj.endDatetime = '';
    this.guidedcreateobj.checkInDatetime = '';
    this.guidedcreateobj.checkOutDatetime = '';
    this.guidedcreateobj.seatLimit = '';
    this.guidedcreateobj.eventRegistrationCloseDate = '';
    this.guidedcreateobj.notes = '';
    this.guidedcreateobj.purposes = '';
    this.guidedcreateobj.isEnabled = '';
    this.guidedcreateobj.isDeleted = '';
    this.usersList = [];
    this.eventList = [];
    this.enterprisesName = [];
    window.localStorage.removeItem('lcevents');
    window.localStorage.removeItem('lceventsdata');
  }

  /**---- Method for handle key press ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getEventsSeachList(this.searchstring);
    }
  }

  /**--- This method is used to use event emitter ------*/
  method(event) {
    if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
      this.getEventsSeachList(this.searchstring);
    } else if (window.localStorage.getItem('eventsadvance')) {
      this.advance();
    } else {
      this.getalleventsList();
    }
  }

  /**---- To clear the input fields ----*/
  public clear() {
    this.getalleventsList();
    this.getStatus();
    this.getEventTypes();
    this.getCountries();
    this.gettimeZones();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.advuserpreferedtimezone = utcformat[0].trim();
    this.eventtypevalue = '';
    this.startdatevalue = '';
    this.enddatevalue = '';
    this.cityvalue = '';
    this.statevalue = '';
    this.countryvalue = '';
    this.paramadvancedFromDate = '';
    this.paramadvancedToDate = '';
    window.localStorage.removeItem('eventsadvance');
    this.enterprisevalue = '';
    this.fleetvalue = '';
    this.eventvalue = '';
    this.ownervalue = '';
    this.statusvalue = '';
    this.firstName = '';
    this.lastName = '';
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /**---- To hide the advance Model ----*/
  public hideAdvanceModal() {
    this.childModal1.hide();
  }

  /*---- To hide the modal ----*/
  public hideFleetModal(): void {
    this.fleetModel.hide();
  }

  /**---- To clear the data ----*/
  public clearFleetsModal(): void {
    if (!this.enterprisesSize) {
      this.getCountries();
    }
    this.fleetsList1 = [];
    this.fleetinfo = false;
    this.fleetsavailability.country = '';
    this.countriesListLength = true;
    this.enterpriseselect = false;
    this.fleetsavailability = {};
    this.countries = [];
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.fleetsavailability.enterpriseName = '';
    this.addinfo = false;
    this.selectedent = '';
    window.localStorage.removeItem('lcevents');
    window.localStorage.removeItem('lceventsdata');
    this.getEnterprise();
    this.selectedduration = this.defaultDuration;
    const time = 1000 * 60 * 5;
    const date = new Date();
    this.selecteddays = '0';
    this.selectedhours = '00';
    this.reservationstartdate = new Date(Math.ceil(date.getTime() / time) * time);
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
    this.eventregistrationCloseDate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() -
      Number(5)))).format('YYYY-MM-DD HH:mm');
    this.minDate = new Date();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    this.timezoneCodes = utcformat[0].trim();
  }

  /**---- Method for locate ---*/
  locates(locate) {
    this.eventService.locates(locate, this.userToken, this.searchstring);
  }

  /**---- Method for single locate ----*/
  singlelocate(locate, singleevent) {
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
          const builingName = '';
          this.eventService.singlelocateevent(locate, this.userToken, eventsInfo['result']._id,
            false, currentfloorName, currenteventid, cufloorId, currentfleetId, builingName);
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
  /** ---- Guided Create ----*/
  singlelocatefleet(locate, singlefleet) {
    if (singlefleet.floorPlanFleetObj !== null && singlefleet.floorPlanFleetObj !== undefined) {
      this.allfleetsService.getBuildingId(this.userToken, singlefleet.floorPlanFleetObj, 'fleet').subscribe(
        builingcode => {
          this.allfleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lcsinglefleet', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              // localStorage.setItem('fmapsettings', JSON.stringify(this.mapSettings));
              window.localStorage.setItem('fcurrentfloorname', builingcode.result.currentFloor)
              const currentFloorName = 'fcurrentfloorname';
              const currentfid = singlefleet._id;
              const cfleetid = singlefleet._id;
              const cufloorId = singlefleet.floorPlanFleetObj;
              this.allfleetsService.singlelocateFleet(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, currentfid, cufloorId, cfleetid, fleetInfo.fleetName);
            });
        }, error => {
          this.fleetsstatus(error);
        });
    } else {
      this.allfleetsService.getFleetInfoByfleetId(this.userToken, singlefleet._id).subscribe(
        fleetInfo => {
          if (fleetInfo['result'].reserveStartDatetime && fleetInfo['result'].reserveEndDatetime) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              fleetInfo['result'].reserveStartDatetime = moment(fleetInfo['result'].reserveStartDatetime).utc()
                .add(utctimesplit[0], 'hours');
              fleetInfo['result'].reserveStartDatetime = moment(fleetInfo['result'].reserveStartDatetime)
                .add(utctimesplit[1], 'minutes');
              fleetInfo['result'].reserveEndDatetime = moment(fleetInfo['result'].reserveEndDatetime).utc()
                .add(utctimesplit[0], 'hours');
              fleetInfo['result'].reserveEndDatetime = moment(fleetInfo['result'].reserveEndDatetime)
                .add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              fleetInfo['result'].reserveStartDatetime = moment(fleetInfo['result'].reserveStartDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              fleetInfo['result'].reserveStartDatetime = moment(fleetInfo['result'].reserveStartDatetime)
                .subtract(utctimesplit[1], 'minutes');
              fleetInfo['result'].reserveEndDatetime = moment(fleetInfo['result'].reserveEndDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              fleetInfo['result'].reserveEndDatetime = moment(fleetInfo['result'].reserveEndDatetime)
                .subtract(utctimesplit[1], 'minutes');
            }
            fleetInfo['result'].reserveStartDatetime = moment(fleetInfo['result'].reserveStartDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
            fleetInfo['result'].reserveEndDatetime = moment(fleetInfo['result'].reserveEndDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
          }
          localStorage.setItem('lcsinglefleet', JSON.stringify(fleetInfo['result']));
          localStorage.setItem('apiendpoint', this.apiEndPoint);
          //    localStorage.setItem('fmapsettings', JSON.stringify(mapSettings));
          const currentFloorName = null;
          const currentfid = singlefleet._id;
          const cufloorId = singlefleet.floorPlanFleetObj;
          const builingName = '';
          this.allfleetsService.singlelocateFleet(locate, this.userToken, fleetInfo['result']._id,
            false, currentFloorName, currentfid, cufloorId, singlefleet._id
            , builingName);
        }, error => {
          this.fleetsstatus(error);
        });
    }
  }
  fleetsstatus(error) {
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
}

export class AllEventsDetails {
  public eventName: string;
  public eventType1: string;
  public eventOwner: string;
  public eventStatus: string;

}
export class MenuItem {
}
