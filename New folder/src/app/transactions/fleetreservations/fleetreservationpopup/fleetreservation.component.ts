/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/**
 * FleetModalComponent have below methods:
 * ngAfterContentChecked(): To check the content.
 * showChildModal(updateaction, allfleetreservation): To show child modal.
 * gettimeZones(): To get time zones.
 * changeTimezones(timezone): To change the Timezone list.
 * getEnterpriseList(): To get the enterprise list.
 * getEnterpriseResources(type): To split enterprise name and id.
 *  getcancelReasons(): To get cancel reasons.
 * getextendReasons(): To get extend reason.
 * getreason(reason): To change the reason list.
 * getservercurrentutctime(): To get current utc time.
 * reservationstatusInfo(reservationvalue): To get selected reservation.
 * getFleetNamesonchange(fleetvalues): To get selected Fleet value.
 * selectUserInfo(uservalue): To Select select User Info.
 * getFleetNamesonchange1(fleetvalues): To get Fleet types.
 * getFleetlistByentId(entId): To get Fleet types  by Enterprise Id.
 * getUserlistByentId(entId): To get User list by Enterprise id.
 * getReservationStatus(): To get status.
 * eventchangeInfo(eventvalue): To Select event change Info.
 * extendfleetreservation(advDuration): To extend fleet reservations.
 * editfleetreservation(advDuration): To edit fleet reservations.
 * formatDate(date): DOB Formating function into "yyyy-mm-dd".
 * daysChanged(days): To Select Duration.
 * hoursChanged(hours): To change the hours.
 * durationChanged(duration): To change the duration.
 * startDateChange(value): To Select start Date.
 * endDateChange(endvalue): To Select endDate.
 * extendendDateChange(extendendvalue): To Select end Date.
 * createFleetReservation(): Submit method for create Fleet Reservation.
 * updateFleetReservation(): Submit method for Update Fleet Reservation list.
 * cancelFleetreseravation(): Submit method for cancel fleet reservation.
 * eletefleetreservation(): Submit method for delete fleet reservation.
 * checkInFleetreseravation(): Submit method for checkIn into Fleet reseravation.
 * checkOutfleetreservation(): Submit method for checkOut from fleet reservation.
 * extendFleetReservation(): Submit method for extend FleetReservation list.
 * keyPress(e): Method for key press.
 * clearmessage(): To clear the messages.
 * hideChildModal(): To hide the modal.
 * closePopupModal(): Close childModal popup.
 * autocase(text): Auto capitalization for each word
 */

import {
  Component, OnInit, ViewChild, ViewContainerRef, AfterContentChecked,
  Output, EventEmitter, Inject, AfterViewInit, HostListener
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { FleetReservationServices } from './fleetreservation.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FleetReservationsService } from '../fleetreservationlist/fleetreservations.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
import { FleetService } from '../../../enterprises/fleets/fleetpopup/fleet.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-fleet-reservation-popup',
  templateUrl: 'fleetreservation.html',
  providers: [FleetReservationServices, AdvertisementsService, DatePipe, FleetService]
})
export class FleetReservationComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  updateaction: any;
  enterpriseid: any;
  fleetid: any;
  userAccount: any;
  comment: any;
  error: any;
  retext: any;
  reasons: any;
  reasonValue: any;
  oldreasonValue: any;
  pagename: string;
  action: any;
  userToken: any;
  toastermessage: any;
  storage: Storage = window.localStorage;
  actionType: any;
  startdate: any;
  enddate: any;
  selectedduration: Number;
  error1: string;
  error2: string;
  error3: string;
  enterpriseName: any;
  fleetName: any;
  attributes: any;
  isEnabled: any;
  extendreasons: any;
  reservationstatus: any;
  enterprisesSize: any;
  enterpriseNames: any;
  enterpriseIconFilePath: any;
  enterpriseNameslist: any;
  value: any;
  attributeList: any;
  attributevalue: any;
  enterpriseId: any;
  public fleetreservationObj: any;
  reservationstatuslist: any;
  fleetNameList: any[];
  fleetValues: any;
  fleetId: any;
  fleetNames: any;
  eventId: any;
  createdFleetReservation: any;
  UpdatefleetReservation: any;
  eventNameList: any;
  usersList = [];
  userId: any;
  notes: any;
  updateenterpriseName: any;
  updateenterpriseId: any;
  enterprisedetails: any;
  updatefleetId: any;
  updatefleetName: any;
  updateeventName: any;
  updateuserName: any;
  updatereservationstatus: any;
  updateEnabled: any;
  updateNotes: any;
  updateuserId: any;
  updateeventId: any;
  updateenddate: any;
  updatestartdate: any;
  updatedcreatedby: any;
  updateduration: any;
  updatedBy: any;
  viewfleet: any;
  fleetreservationId: any;
  viewstartdate: any;
  viewenddate: any;
  durationList = [];
  viewupdatedate: any;
  viewcreatedate: any;
  viewcheckIndate: any;
  viewcheckoutdate: any;
  fleetNamess: any;
  oldenddate: any;
  minDate: any;
  daysList: any = [];
  hoursList: any = [];
  selecteddays: any;
  selectedhours: any;
  duration: any;
  timezoneCode: any;
  timezoneCodes: any;
  utctimezone: any;
  utctimezonestring: any;
  timeZones: any[];
  worknumbercntrycode: any;
  worknumbercntrycodesplit: any[];
  worknumext: any;
  worknumber: any;
  enterpriseIcon: any;
  loginUserDateFormat: any;
  errorstartdate: any;
  errorenddate: any;
  currentutc: any;
  enddate1: any;
  startdate1: any;
  maxActiveReservationsPerUser: any;
  advancedReservationWindowInDays: any;
  advancedReservationWindowInDays1: any;
  advancedReservationWindowInDays2: any;
  maxReservationWindowInHrs: any;
  maxReservationWindowInHrs1: any;
  maxReservationWindowInHrs2: any;
  earlyCheckinWindowInMins: any;
  userpreferedtimezone: any;
  userlength: any;
  enterprisename: any;
  enterprisenames: any;
  fleetname: any;
  fleet: any;
  fleetReservationId: any;
  reservationId: any;
  fleetCommonName: any;
  fleetsCommonName: any;
  part1: any;
  part2: any;
  userdetail: any;
  fleetTypes: any;
  fleettype: any;
  fleettypename: any;
  errortype: any;
  settime: any;
  currenttime: any;
  enterprise: any;
  type: any;
  asset: any;
  fleetId1: any;
  @ViewChild('childModal') public childModal: ModalDirective;

  /**---- Constructor for fleet Reservations Component */
  constructor(private singleFleetReservationServices: FleetReservationServices,
    private fleetReservationsService: FleetReservationsService,
    public toastr: ToastsManager,
    private datePipe: DatePipe,
    private translateService: TranslateService,
    public advertisementsService: AdvertisementsService,
    private fleetService: FleetService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('defaultDuration') public defaultDuration: number,
    @Inject('defaultDurationRange') public maximumMinutes: number,
    @Inject('defaultDays') public defaultDays: number,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.minDate = new Date();
  }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.userToken = window.localStorage.getItem('token');
    this.getEnterpriseList();
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
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.timezoneCodes = utcformat[0].trim();
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
  }
  ngAfterViewInit() {
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.singleFleetReservationServices.getfleetsInfoByfleetreservationId(this.userToken,
      Number(window.localStorage.getItem('fleetreservationid')))
      .subscribe(
        fleetReservationData => {
          if (fleetReservationData['result'].endDatetime > this.currentutc) {
            fleetReservationData['result'].recordstatus = 'active';
            if (fleetReservationData['result'].startDatetime > this.currentutc) {
              fleetReservationData['result'].startdatestatus = 'statdateactive';
            } else {
              fleetReservationData['result'].startdatestatus = 'statdateinactive';
            }
          } else {
            fleetReservationData['result'].recordstatus = 'inactive';
          }
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            fleetReservationData['result'].startDatetime = moment(fleetReservationData['result']
              .startDatetime).utc().add(utctimesplit[0], 'hours');
            fleetReservationData['result'].startDatetime = moment(fleetReservationData['result']
              .startDatetime).add(utctimesplit[1], 'minutes');
            fleetReservationData['result'].startDatetime = moment(fleetReservationData['result']
              .startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            fleetReservationData['result'].endDatetime = moment(fleetReservationData['result']
              .endDatetime).utc().add(utctimesplit[0], 'hours');
            fleetReservationData['result'].endDatetime = moment(fleetReservationData['result']
              .endDatetime).add(utctimesplit[1], 'minutes');
            fleetReservationData['result'].endDatetime = moment(fleetReservationData['result']
              .endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            fleetReservationData['result'].createdAt = moment(fleetReservationData['result']
              .createdAt).utc().add(utctimesplit[0], 'hours');
            fleetReservationData['result'].createdAt = moment(fleetReservationData['result']
              .createdAt).add(utctimesplit[1], 'minutes');
            fleetReservationData['result'].updatedAt = moment(fleetReservationData['result']
              .updatedAt).utc().add(utctimesplit[0], 'hours');
            fleetReservationData['result'].updatedAt = moment(fleetReservationData['result']
              .updatedAt).add(utctimesplit[1], 'minutes');
            if (fleetReservationData['result'].checkInDatetime !== undefined &&
              fleetReservationData['result'].checkInDatetime !== 'undefined' &&
              fleetReservationData['result'].checkInDatetime !== null) {
              fleetReservationData['result'].checkInDatetime = moment(fleetReservationData['result']
                .checkInDatetime).utc().add(utctimesplit[0], 'hours');
              fleetReservationData['result'].checkInDatetime = moment(fleetReservationData['result']
                .checkInDatetime).add(utctimesplit[1], 'minutes');
            }
            if (fleetReservationData['result'].checkOutDatetime !== undefined &&
              fleetReservationData['result'].checkOutDatetime !== 'undefined'
              && fleetReservationData['result'].checkOutDatetime !== null) {
              fleetReservationData['result'].checkOutDatetime = moment(fleetReservationData['result']
                .checkOutDatetime).utc().add(utctimesplit[0], 'hours');
              fleetReservationData['result'].checkOutDatetime = moment(fleetReservationData['result']
                .checkOutDatetime).add(utctimesplit[1], 'minutes');
            }
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            fleetReservationData['result'].startDatetime = moment(fleetReservationData['result']
              .startDatetime).utc().subtract(utctimesplit[0], 'hours');
            fleetReservationData['result'].startDatetime = moment(fleetReservationData['result']
              .startDatetime).subtract(utctimesplit[1], 'minutes');
            fleetReservationData['result'].startDatetime = moment(fleetReservationData['result']
              .startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            fleetReservationData['result'].endDatetime = moment(fleetReservationData['result']
              .endDatetime).utc().subtract(utctimesplit[0], 'hours');
            fleetReservationData['result'].endDatetime = moment(fleetReservationData['result']
              .endDatetime).subtract(utctimesplit[1], 'minutes');
            fleetReservationData['result'].endDatetime = moment(fleetReservationData['result']
              .endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            fleetReservationData['result'].createdAt = moment(fleetReservationData['result']
              .createdAt).utc().subtract(utctimesplit[0], 'hours');
            fleetReservationData['result'].createdAt = moment(fleetReservationData['result']
              .createdAt).subtract(utctimesplit[1], 'minutes');
            fleetReservationData['result'].updatedAt = moment(fleetReservationData['result']
              .updatedAt).utc().subtract(utctimesplit[0], 'hours');
            fleetReservationData['result'].updatedAt = moment(fleetReservationData['result']
              .updatedAt).subtract(utctimesplit[1], 'minutes');
            if (fleetReservationData['result'].checkInDatetime !== undefined &&
              fleetReservationData['result'].checkInDatetime !== 'undefined' &&
              fleetReservationData['result'].checkInDatetime !== null) {
              fleetReservationData['result'].checkInDatetime = moment(fleetReservationData['result']
                .checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
              fleetReservationData['result'].checkInDatetime = moment(fleetReservationData['result']
                .checkInDatetime).subtract(utctimesplit[1], 'minutes');
            }
            if (fleetReservationData['result'].checkOutDatetime !== undefined &&
              fleetReservationData['result'].checkOutDatetime !== 'undefined'
              && fleetReservationData['result'].checkOutDatetime !== null) {
              fleetReservationData['result'].checkOutDatetime = moment(fleetReservationData['result']
                .checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
              fleetReservationData['result'].checkOutDatetime = moment(fleetReservationData['result']
                .checkOutDatetime).subtract(utctimesplit[1], 'minutes');
            }
          }
          if (window.localStorage.getItem('fleetreservationsextent') === ('fleetreservationsextent')) {
            this.showChildModal('EXTEND', fleetReservationData['result']);
            window.localStorage.removeItem('fleetreservationsextent');
          } else if (window.localStorage.getItem('fleetreserveCreate') === ('fleetreserveCreate')) {
            var fleetData = JSON.parse(window.localStorage.getItem('fleetDeatailsdata'));
            this.showChildModal('MAPCREATE', fleetData);
            window.localStorage.removeItem('fleetreserveCreate');
          } else if (window.localStorage.getItem('reservationCancel') === 'reservationCancel') {
            this.showChildModal('CANCEL', fleetReservationData['result']);
            window.localStorage.removeItem('reservationCancel');
          } else if (window.localStorage.getItem('fleetreservationcheckin') === ('fleetreservationcheckin')) {
            this.showChildModal('CHECKIN', fleetReservationData['result']);
            window.localStorage.removeItem('fleetreservationcheckin');
          } else if (window.localStorage.getItem('fleetreservationcheckout') === ('fleetreservationcheckout')) {
            this.showChildModal('CHECKOUT', fleetReservationData['result']);
            window.localStorage.removeItem('fleetreservationcheckout');
          }
          window.localStorage.removeItem('fleetreservationid');
        });
  }

  /*---- To check the content ----*/
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
  }
  /*---- To show child modal ----*/
  public showChildModal(updateaction, allfleetreservation): void {
    this.fleetreservationObj = allfleetreservation;
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';
    if (updateaction === 'VIEW') {
      this.reasonValue = '';
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.attributeList = this.fleetreservationObj.fleetObj.attributes;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.viewstartdate = moment(this.fleetreservationObj.startDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewenddate = moment(this.fleetreservationObj.endDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewcreatedate = moment(this.fleetreservationObj.createdAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' '
        + this.timezoneCode[0];
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.fleetreservationObj.eventName = '';
      } else {
      }
      this.part1 = this.translateService.get('COMMON_PAGE_TITLES.VIEW_FLEET');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'View';
      this.retext = true;
      this.updatereservationstatus = this.fleetreservationObj.reservationStatus;
      if (this.updatereservationstatus === 'Created' || this.updatereservationstatus === 'Started') {
        this.reasonValue = this.fleetreservationObj.reasonExtend;
      } else {
        this.reasonValue = this.fleetreservationObj.reasonCancel;
      }
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
    } else if (updateaction === 'EDIT') {
      this.fleettypename = this.fleetreservationObj.fleetObj.fleetType;
      this.enterpriseId = this.fleetreservationObj.enterprise.enterpriseId;
      this.getFleetTypeAttributes(this.fleettypename);
      this.getservercurrentutctime();
      this.advancedReservationWindowInDays1 = this.fleetreservationObj.fleetObj.settings.advancedReservationWindowInDays;
      this.advancedReservationWindowInDays = this.fleetreservationObj.userName.settings.advancedReservationWindowInDays;
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.attributeList = this.fleetreservationObj.fleetObj.attributes;
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.getFleetTypes(this.fleetreservationObj.enterprise.enterpriseId);
      this.getFleetNamesonchange1(this.fleetreservationObj.fleetObj._id);
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.updateeventName = '';
        this.updateeventId = null;
      } else {
        this.updateeventName = this.fleetreservationObj.eventName.eventName;
        this.updateeventId = this.fleetreservationObj.eventName.eventId;
      }
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm');
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm');
      }
      this.fleetreservationId = this.fleetreservationObj._id;
      this.startdate = new Date(this.fleetreservationObj.startDatetime);
      this.enddate = new Date(this.fleetreservationObj.endDatetime);
      const duration = this.fleetreservationObj.duration.split(' ');
      if (duration[0] !== undefined && duration[1] !== undefined && duration[2] !== undefined) {
        this.selecteddays = duration[0].split('D')[0];
        this.selectedhours = duration[1].split('H')[0];
        this.selectedduration = duration[2].split('M')[0];
      }
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      // this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      // this.timezoneCode = this.timezoneCode.split('-');

      /**--- Convet User prefered time zone */
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
      /**---- Convet User prefered time zone ------ */

      this.viewcreatedate = moment(this.fleetreservationObj.createdAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updateenterpriseName = this.fleetreservationObj.enterprise.enterpriseName;
      this.updateenterpriseId = this.fleetreservationObj.enterprise.enterpriseId;
      this.updatefleetId = this.fleetreservationObj.fleetId;
      this.updatefleetName = this.fleetreservationObj.fleetObj.fleetName;
      this.updateuserId = this.fleetreservationObj.userId;
      this.updateuserName = this.fleetreservationObj.userDetails;
      this.updatereservationstatus = this.fleetreservationObj.reservationStatus;
      this.updateEnabled = this.fleetreservationObj.isEnabled;
      this.updateNotes = this.fleetreservationObj.notes;
      this.updatedBy = this.fleetreservationObj.updatedBy;
      this.updatedcreatedby = this.fleetreservationObj.createdBy;
      this.maxReservationWindowInHrs1 = this.fleetreservationObj.fleetObj.settings.maxReservationWindowInHrs;
      this.maxReservationWindowInHrs = this.fleetreservationObj.userName.settings.maxReservationWindowInHrs;
      this.fleetNamess = this.fleetreservationObj.fleetId + '$' + this.fleetreservationObj.fleetObj.fleetName;
      this.part1 = this.translateService.get('COMMON_PAGE_TITLES.EDIT_FLEET');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Edit';
    } else if (updateaction === 'DELETE') {
      this.oldreasonValue = this.fleetreservationObj.reasonExtend;
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.reasonValue = '';
      this.attributeList = this.fleetreservationObj.fleetObj.attributes;
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.part1 = this.translateService.get('COMMON_PAGE_TITLES.DELETE_FLEET');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Delete';
      this.retext = true;
      this.updatereservationstatus = this.fleetreservationObj.reservationStatus;
      if (this.updatereservationstatus === 'Created' || this.updatereservationstatus === 'Started') {
        this.reasonValue = this.fleetreservationObj.reasonExtend;
      } else {
        this.reasonValue = this.fleetreservationObj.reasonCancel;
      }
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.viewstartdate = moment(this.fleetreservationObj.startDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewenddate = moment(this.fleetreservationObj.endDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewcreatedate = moment(this.fleetreservationObj.createdAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.fleetreservationObj.eventName = '';
      } else {
      }
    } else if (updateaction === 'CREATE') {
      this.getEnterpriseList();
      this.getservercurrentutctime();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.isEnabled = true;
      this.selecteddays = '0';
      this.selectedhours = '00';
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.selectedduration = this.defaultDuration;
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      if (window.localStorage.getItem('createfleetreserve') === 'reservepopup') {
        if (window.localStorage.getItem('eventfleet_id')) {
          this.fleetid = window.localStorage.getItem('eventfleet_id');
        } else if (window.localStorage.getItem('fleetreservaton_id')) {
          this.fleetid = window.localStorage.getItem('fleetreservaton_id');
        } else {
          this.fleetid = window.localStorage.getItem('fleets_id');
        }
        this.getFleetsdata(this.fleetid);
        this.settime = window.localStorage.getItem('time');
        this.currenttime = moment(new Date()).format('YYYY-MM-DD HH:mm');
        if (this.settime < this.currenttime) {
          this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
          this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
            Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
        } else {
          this.startdate = this.settime;
          this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
            Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
        }
      }
      window.localStorage.removeItem('createfleetreserve');
      this.gettimeZones();
      this.duration = this.defaultDuration;
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      /**--- Convet User prefered time zone */
      this.part1 = this.translateService.get('COMMON_PAGE_TITLES.CREATE_FLEET');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Create';
      this.enterprisenames = true;
      this.fleet = true;
    } else if (updateaction === 'MAPCREATE') {
      this.enterprisenames = false;
      this.fleet = false;
      if (this.fleetreservationObj !== null) {
        this.enterpriseNames = this.fleetreservationObj.enterpriseName;
        this.fleetname = this.fleetreservationObj.fleetName;
        this.enterpriseId = this.fleetreservationObj.enterpriseId;
        this.fleetId = this.fleetreservationObj._id;
        this.fleettype = this.fleetreservationObj.fleetType;
        //  this.getFleetlistByentId(this.fleetreservationObj.enterpriseId);
        this.getFleetTypes(this.fleetreservationObj.enterpriseId);
        this.getFleetNamesonchange(this.fleetId + '$' + this.fleetname);
      }
      this.getservercurrentutctime();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.isEnabled = true;
      this.selecteddays = '0';
      this.selectedhours = '00';
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.selectedduration = this.defaultDuration;
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
      this.gettimeZones();
      this.duration = this.defaultDuration;
      /**--- Convet User prefered time zone */
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      /**--- Convet User prefered time zone */
      this.part1 = this.translateService.get('COMMON_PAGE_TITLES.CREATE_FLEET');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Create';
      this.getEnterpriseList();
      // this.getUserlistByentId(this.fleetreservationObj.enterprise.enterpriseId);
      this.getUserlistByentId(this.enterpriseId);
    } else if (updateaction === 'CANCEL') {
      if (this.fleetreservationObj.userDetails === undefined) {
        this.fleetreservationObj.userDetails = this.fleetreservationObj.enterpriseResourceObj.firstName
          + ' ' + this.fleetreservationObj.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.reasonValue = '';
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.viewstartdate = moment(this.fleetreservationObj.startDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewenddate = moment(this.fleetreservationObj.endDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewcreatedate = moment(this.fleetreservationObj.createdAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime).format(this.loginUserDateFormat + ' HH:mm');
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime).format(this.loginUserDateFormat + ' HH:mm');
      }
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.fleetreservationObj.eventName = '';
      } else {
      }
      this.part1 = this.translateService.get('COMMON_BUTTONS.BUTTON_CANCEL');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Cancel';
      this.retext = false;
      this.getcancelReasons();
      this.oldreasonValue = this.fleetreservationObj.reasonCancel;
    } else if (updateaction === 'CHECKIN') {
      if (this.fleetreservationObj.userDetails === undefined) {
        this.fleetreservationObj.userDetails = this.fleetreservationObj.enterpriseResourceObj.firstName
        + ' ' + this.fleetreservationObj.enterpriseResourceObj.lastName;
      }
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.earlyCheckinWindowInMins = this.fleetreservationObj.fleetObj.settings.earlyCheckinWindowInMins;
      if (this.earlyCheckinWindowInMins > this.fleetreservationObj.userName.settings.earlyCheckinWindowInMins) {
        this.earlyCheckinWindowInMins = this.fleetreservationObj.userName.settings.earlyCheckinWindowInMins;
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.viewstartdate = moment(this.fleetreservationObj.startDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewenddate = moment(this.fleetreservationObj.endDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewcreatedate = moment(this.fleetreservationObj.createdAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.fleetreservationObj.eventName = '';
      } else {
      }
      this.part1 = this.translateService.get('COMMON_BUTTONS.BUTTON_CHECKIN');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Check-In';
      this.retext = null;
    } else if (updateaction === 'CHECKOUT') {
      if (this.fleetreservationObj.userDetails === undefined) {
        this.fleetreservationObj.userDetails = this.fleetreservationObj.enterpriseResourceObj.firstName + ' ' + this.fleetreservationObj.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.viewstartdate = moment(this.fleetreservationObj.startDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewenddate = moment(this.fleetreservationObj.endDatetime)
        .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.viewcreatedate = moment(this.fleetreservationObj.createdAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime)
          .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.fleetreservationObj.eventName = '';
      } else {
      }
      this.part1 = this.translateService.get('COMMON_BUTTONS.BUTTON_CHECKOUT');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Check Out';
      this.retext = null;
    } else if (updateaction === 'EXTEND') {
      if (this.fleetreservationObj.userDetails === undefined) {
        this.fleetreservationObj.userDetails = this.fleetreservationObj.enterpriseResourceObj.firstName + ' ' + this.fleetreservationObj.enterpriseResourceObj.lastName;
      }
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.reasonValue = '';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      if (this.fleetreservationObj.eventName === undefined ||
        this.fleetreservationObj.eventName === 'undefined' || this.fleetreservationObj.eventName === '' ||
        this.fleetreservationObj.eventName === null) {
        this.updateeventName = '';
        this.updateeventId = null;
      } else {
        this.updateeventName = this.fleetreservationObj.eventName.eventName;
        this.updateeventId = this.fleetreservationObj.eventName.eventId;
      }
      if (this.fleetreservationObj.checkInDatetime === undefined ||
        this.fleetreservationObj.checkInDatetime === 'undefined' || this.fleetreservationObj.checkInDatetime === null) {
        this.viewcheckIndate = '';
      } else {
        this.viewcheckIndate = moment(this.fleetreservationObj.checkInDatetime).format('YYYY-MM-DD HH:mm') + ' ' + this.timezoneCode[0];
      }
      if (this.fleetreservationObj.checkOutDatetime === undefined ||
        this.fleetreservationObj.checkOutDatetime === 'undefined' || this.fleetreservationObj.checkOutDatetime === null) {
        this.viewcheckoutdate = '';
      } else {
        this.viewcheckoutdate = moment(this.fleetreservationObj.checkOutDatetime).format('YYYY-MM-DD HH:mm') + ' ' + this.timezoneCode[0];
      }
      this.fleetreservationId = this.fleetreservationObj._id;
      const duration = this.fleetreservationObj.duration.split(' ');
      this.selecteddays = duration[0].split('D')[0];
      this.selectedhours = duration[1].split('H')[0];
      this.selectedduration = duration[2].split('M')[0];
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.startdate = moment(this.fleetreservationObj.startDatetime)
        .format(this.loginUserDateFormat + ' HH:mm'); // + ' ' + this.timezoneCode[0];
      // this.startdate = moment(this.fleetreservationObj.startDatetime).format('YYYY-MM-DD HH:mm');
      this.enddate = new Date(this.fleetreservationObj.endDatetime);
      this.gettimeZones();
      /**--- Convet User prefered time zone */

      this.timezoneCodes = this.timezoneCode[0].trim();
      const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
      const timezonevalue = defaulttimezoneCode.split('(UTC');
      const utcval = timezonevalue[1].split(')');
      this.utctimezone = utcval[0];
      this.utctimezonestring = utcval[0].toString();
      /**--- Convet User prefered time zone */

      this.oldenddate = moment(this.fleetreservationObj.endDatetime).format('YYYY-MM-DD HH:mm');
      this.viewcreatedate = moment(this.fleetreservationObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss');
      this.viewupdatedate = moment(this.fleetreservationObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss');
      this.updateduration = this.fleetreservationObj.duration;
      this.updateenterpriseName = this.fleetreservationObj.enterprise.enterpriseName;
      this.updateenterpriseId = this.fleetreservationObj.enterprise.enterpriseId;
      this.updatefleetId = this.fleetreservationObj.fleetId;
      this.updatefleetName = this.fleetreservationObj.fleetObj.fleetName;
      this.updateuserId = this.fleetreservationObj.userId;
      this.updateuserName = this.fleetreservationObj.userDetails;
      this.updatereservationstatus = this.fleetreservationObj.reservationStatus;
      this.updateEnabled = this.fleetreservationObj.isEnabled;
      this.maxReservationWindowInHrs1 = this.fleetreservationObj.fleetObj.settings.maxReservationWindowInHrs;
      this.maxReservationWindowInHrs = this.fleetreservationObj.userName.settings.maxReservationWindowInHrs;
      this.updateNotes = this.fleetreservationObj.notes;
      this.updatedBy = this.fleetreservationObj.updatedBy;
      this.updatedcreatedby = this.fleetreservationObj.createdBy;
      this.getEnterpriseList();
      this.part1 = this.translateService.get('COMMON_BUTTONS.BUTTON_EXTEND');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Extend';
      this.retext = false;
      this.getextendReasons();
      this.oldreasonValue = this.fleetreservationObj.reasonExtend;
    } else if (updateaction === 'REBOOK') {
      this.part1 = this.translateService.get('COMMON_BUTTON_TOOLTIPS.TOOLTIP_REBOOK_ACTION');
      this.part2 = this.translateService.get('COMMON_FIELDS.FLEET_RESERVATION');
      this.pagename = this.part1.value + ' ' + this.fleetCommonName + this.part2.value;
      this.actionType = 'Rebook';
      this.enterpriseNames = this.fleetreservationObj.enterprise.enterpriseName;
      this.enterpriseId = this.fleetreservationObj.enterprise.enterpriseId;
      this.fleettype = this.fleetreservationObj.fleetObj.fleetType;
      this.fleetId = this.fleetreservationObj.fleetId;
      this.fleetName = this.fleetreservationObj.fleetObj.fleetName;
      this.userId = this.fleetreservationObj.userId;
      this.isEnabled = this.fleetreservationObj.isEnabled;
      this.notes = this.fleetreservationObj.notes;
      this.maxReservationWindowInHrs1 = this.fleetreservationObj.fleetObj.settings.maxReservationWindowInHrs;
      this.maxReservationWindowInHrs = this.fleetreservationObj.userName.settings.maxReservationWindowInHrs;
     this.maxActiveReservationsPerUser = this.fleetreservationObj.userName.settings.maxActiveReservationsPerUser;
      this.fleettypename = this.fleetreservationObj.fleetObj.fleetType;
      this.singleFleetReservationServices.getFleetNameByEntId(this.userToken,
      this.fleetreservationObj.fleetObj.fleetType, this.enterpriseId)
        .subscribe(data => {
          this.fleetNameList = data['result'];
        });
      this.getservercurrentutctime();
      this.advancedReservationWindowInDays1 = this.fleetreservationObj.fleetObj.settings.advancedReservationWindowInDays;
      this.advancedReservationWindowInDays = this.fleetreservationObj.userName.settings.advancedReservationWindowInDays;
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.worknumbercntrycode = this.fleetreservationObj.fleetObj.contactDetails.workNumberCountrycode;
      if (this.worknumbercntrycode !== '' && this.worknumbercntrycode !== undefined && this.worknumbercntrycode !== null) {
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
      }
      this.worknumext = this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      this.worknumber = this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleetreservationObj.fleetObj.contactDetails.workNumber;
      if (this.worknumext) {
        this.worknumber = this.worknumber + ' x' + this.fleetreservationObj.fleetObj.contactDetails.workNumberExtn;
      }
      this.attributeList = this.fleetreservationObj.fleetObj.attributes;
      this.enterpriseIcon = this.fleetreservationObj.enterprises.enterpriseIcon;
      this.enterpriseIconFilePath = this.fleetreservationObj.enterprises.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList === undefined) {
        this.attributevalue = false;
      } else {
        this.attributevalue = true;
      }
      this.getFleetTypes(this.fleetreservationObj.enterprise.enterpriseId);
      this.getFleetNamesonchange1(this.fleetreservationObj.fleetObj._id);
      this.getUserlistByentId(this.fleetreservationObj.enterprise.enterpriseId);
      const duration = this.fleetreservationObj.duration.split(' ');
      if (duration[0] !== undefined && duration[1] !== undefined && duration[2] !== undefined) {
        this.selecteddays = duration[0].split('D')[0];
        this.selectedhours = duration[1].split('H')[0];
        this.selectedduration = duration[2].split('M')[0];
      }
      this.duration = Number(this.selecteddays) * 24 * 60 + Number(this.selectedhours) * 60 + Number(this.selectedduration);
      const time = 1000 * 60 * 5;
      const date = new Date();
      this.startdate = new Date(Math.ceil(date.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
      /**--- Convet User prefered time zone */
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
      /**---- Convet User prefered time zone ------ */
    }

    this.childModal.show();
  }

  /**---- To get time zones ----*/
  public gettimeZones() {
    this.singleFleetReservationServices.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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

  /*--- To change the Timezone list ----*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /**---- To get the enterprise list ----*/
  getEnterpriseList() {
    this.singleFleetReservationServices.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterpriseNameslist = data['result'];
            this.enterpriseId = this.enterpriseNameslist[0]._id;
            this.enterpriseNames = this.enterpriseNameslist[0].enterpriseName;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = this.enterpriseNameslist[0].enterpriseIcon;
            this.enterprisesSize = true;
            this.userlength = true;
            this.getFleetTypes(this.enterpriseId);
            this.getUserlistByentId(this.enterpriseId);
          } else {
            this.enterpriseNameslist = data['result'];
            this.enterprisesSize = false;
            this.userlength = false;
          }
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
  public getFleetTypes(enterPriseId) {
    this.fleetReservationsService.getFleetTypesList(this.userToken, enterPriseId).subscribe(
      data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 0) {
            this.fleetTypes = data['result'];
            //  this.addinfo = false;
          } else {
            this.fleetTypes = data['result'][0].fleetTypes;
            //  this.getFleetTypeAttributes(this.fleetTypes[0].fleetTypeName);
          }
        }
      },
      error => {
        const status = error['status'];
        const statuscode = error['_body'].status;
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
  getFleetTypeAttributes(fleettype) {
    this.fleettype = fleettype;
    this.singleFleetReservationServices.getFleetNameByEntId(this.userToken, fleettype, this.enterpriseId).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.fleetId = '';
          this.fleetName = '';
          this.viewfleet = false;
          this.fleetNameList = data['result'];
        }
      },
      error => {
        const status = error['status'];
        const statuscode = error['_body'].status;
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
  /**---- To split enterprise name and id ----*/
  getEnterpriseResources(type) {
    this.viewfleet = 'false';
    this.fleetId = '';
    this.userId = '';
    if (type === undefined || type === 'undefined') {
      this.enterpriseId = '';
      this.viewfleet = 'false';
      this.fleetNameList = [];
      this.usersList = [];
      this.getFleetTypes(this.enterpriseId);
    } else {
      this.value = type.split('~');
      this.enterpriseId = this.value[0];
      this.enterpriseNames = this.value[1];
      this.enterpriseIconFilePath = this.value[2] + '/' + this.value[3];
      this.getFleetTypes(this.enterpriseId);
      this.getUserlistByentId(this.enterpriseId);
    }
    if (this.enterpriseId === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
  }

  /*---- To get cancel reasons ---*/
  public getcancelReasons() {
    this.singleFleetReservationServices.getLookupsByEnterprise(this.userToken,
      'FLEET_RESERVATION_CANCEL_REASONS', this.fleetreservationObj.enterprise.enterpriseId).subscribe(
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

  /**---- To get extend reason ----*/
  public getextendReasons() {
    this.singleFleetReservationServices.getLookupsByEnterprise(this.userToken, 'FLEET_RESERVATION_EXTEND_REASONS', this.fleetreservationObj.enterprise.enterpriseId).subscribe(
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

  /**---- To change the reason list ----*/
  getreason(reason) {
    this.reasonValue = reason;
  }

  /** ----- To get current utc time ------ */
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /**---- To get selected reservation ----*/
  reservationstatusInfo(reservationvalue) {
    this.reservationstatus = reservationvalue;
  }

  /**---- To get selected Fleet value ----*/
  getFleetNamesonchange(fleetvalues) {
    if (fleetvalues === undefined || fleetvalues === 'undefined') {
      this.fleetId = undefined;
      this.viewfleet = 'false';
      this.eventNameList = [];
    } else {
      this.fleetValues = fleetvalues.split('$');
      this.fleetId = this.fleetValues[0];
      this.updatefleetId = this.fleetValues[0];
      this.fleetName = this.fleetValues[1];
    }
    this.singleFleetReservationServices.getEventNameByFleetId(this.userToken, this.fleetId)
      .subscribe(
        eventsList => {
          this.viewfleet = 'true';
          this.eventNameList = eventsList['result'];
          this.worknumbercntrycode = this.eventNameList.contactDetails.workNumberCountrycode;
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumext = this.eventNameList.contactDetails.workNumberExtn;
          this.worknumber = this.eventNameList.contactDetails.workNumber;
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventNameList.contactDetails.workNumber;
          this.advancedReservationWindowInDays1 = this.eventNameList.settings.advancedReservationWindowInDays;
          this.maxReservationWindowInHrs1 = this.eventNameList.settings.maxReservationWindowInHrs;
          if (this.worknumext) {
            this.worknumber = this.worknumber + ' x' + this.eventNameList.contactDetails.workNumberExtn;
          }
          this.attributeList = this.eventNameList.attributes;
          if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null) {
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

  /**---- To Select select User Info ----*/
  selectUserInfo(uservalue) {
    const value = uservalue.split('$');
    this.userId = value[0];
    this.maxActiveReservationsPerUser = value[1];
    this.advancedReservationWindowInDays = value[2];
    this.maxReservationWindowInHrs = value[3];
  }

  /**---- To get Fleet types ----*/
  getFleetNamesonchange1(fleetvalues) {
    if (fleetvalues === null || fleetvalues === '' || fleetvalues === 'undefined') {
      this.viewfleet = 'false';
    }
    this.singleFleetReservationServices.getEventNameByFleetId(this.userToken, fleetvalues)
      .subscribe(
        eventsList => {
          this.viewfleet = 'true';
          this.eventNameList = eventsList['result'];
          this.worknumbercntrycode = this.eventNameList.contactDetails.workNumberCountrycode;
          this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
          this.worknumext = this.eventNameList.contactDetails.workNumberExtn;
          this.worknumber = this.eventNameList.contactDetails.workNumber;
          this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.eventNameList.contactDetails.workNumber;
          if (this.worknumext) {
            this.worknumber = this.worknumber + ' x' + this.eventNameList.contactDetails.workNumberExtn;
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


  /** ---- To get User list by Enterprise id ----- */
  getUserlistByentId(entId) {
    this.singleFleetReservationServices.getUserListByEntId(this.userToken, entId)
      .subscribe(
        userList => {
          if (userList.result.length === 1) {
            this.usersList = userList['result'][0].userAccount;
            this.userlength = true;
            this.userId = userList['result'][0]._id;
            this.userdetail = userList['result'][0].enterpriseResourceObj.firstName
              + ' ' + userList['result'][0].enterpriseResourceObj.lastName;
            this.maxActiveReservationsPerUser = userList['result'][0].settings.maxActiveReservationsPerUser;
            this.advancedReservationWindowInDays = userList['result'][0].settings.advancedReservationWindowInDays;
            this.maxReservationWindowInHrs = userList['result'][0].settings.maxReservationWindowInHrs;
          } else {
            this.userlength = false;
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

  // /*---- To get status ---*/
  // getReservationStatus() {
  //   this.singleFleetReservationServices.getReservationStatus()
  //     .subscribe(reservationStatusValues => {
  //       this.reservationstatuslist = reservationStatusValues[0].values;
  //     },
  //     error => {
  //       const status = JSON.parse(error['status']);
  //       const statuscode = JSON.parse(error['_body']).status;
  //       switch (status) {
  //         case 500:
  //           break;
  //         case 400:
  //           if (statuscode === '9961') {
  //             this.storage.removeItem('token');
  //             this.router.navigate(['/pages/login']);
  //           } break;
  //       }
  //     });
  // }

  /**---- To Select event change Info ----*/
  eventchangeInfo(eventvalue) {
    this.eventId = eventvalue;
  }

  /**--- To extend fleet reservations ---- */
  extendfleetreservation(advDuration) {
    this.UpdatefleetReservation = {
      'enterprise': {
        'enterpriseId': this.updateenterpriseId,
        'enterpriseName': this.updateenterpriseName
      },
      '_id': this.fleetreservationId,
      'fleetId': this.updatefleetId,
      'userId': this.updateuserId,
      'oldenddate': this.oldenddate,
      'startDatetime': moment(this.updatestartdate).format('YYYY-MM-DD HH:mm:ss'),
      'endDatetime': moment(this.updateenddate).format('YYYY-MM-DD HH:mm:ss'),
      'duration': advDuration,
      'eventId': this.updateeventId,
      'isEnabled': this.updateEnabled,
      'notes': this.updateNotes,
      'reason': this.reasonValue,
    };
    this.singleFleetReservationServices.extendFleetReservation(this.fleetreservationId,
      this.UpdatefleetReservation, this.userToken)
      .subscribe(data => {
        this.hideChildModal();
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
        this.toastr.success(this.toastermessage.value);
        const conditioncheck = window.localStorage.getItem('advancesearch');
        if (conditioncheck === 'search') {
          window.localStorage.setItem('advancesearch1', 'search1');
        } else if (window.localStorage.getItem('simplesearch') === 'search') {
          window.localStorage.setItem('simplesearch1', 'search1');
        } else {
          window.localStorage.setItem('createfleet', 'Create');
        }
        this.clearmessage();
      }, error => {
        switch (JSON.parse(error['_body']).statusCode) {
          case '2020':
            this.error = 'FLEET_RESERVATIONS.VALID_FLEET_RESERVATION_EXTEND';
            break;
          case '2014':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9998':
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
            break;
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /**--- To edit fleet reservations ----*/
  editfleetreservation(advDuration) {
    this.UpdatefleetReservation = {
      'enterprise': {
        'enterpriseId': this.updateenterpriseId,
        'enterpriseName': this.updateenterpriseName
      },
      '_id': this.fleetreservationId,
      'fleetId': this.updatefleetId,
      'userId': this.updateuserId,
      'startDatetime': moment(this.updatestartdate).format('YYYY-MM-DD HH:mm:ss'),
      'endDatetime': moment(this.updateenddate).format('YYYY-MM-DD HH:mm:ss'),
      'duration': advDuration,
      'eventId': this.updateeventId,
      'isEnabled': this.updateEnabled,
      'notes': this.updateNotes,
    };
    this.singleFleetReservationServices.updateFleetReservation(this.fleetreservationId,
      this.UpdatefleetReservation, this.userToken)
      .subscribe(data => {
        this.hideChildModal();
        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
        this.toastr.success(this.toastermessage.value);
        const conditioncheck = window.localStorage.getItem('advancesearch');
        if (conditioncheck === 'search') {
          window.localStorage.setItem('advancesearch1', 'search1');
        } else if (window.localStorage.getItem('simplesearch') === 'search') {
          window.localStorage.setItem('simplesearch1', 'search1');
        } else {
          window.localStorage.setItem('createfleet', 'Create');
        }
        this.clearmessage();
      }, error => {
        this.startdate = this.errorstartdate;
        this.enddate = this.errorenddate;
        switch (JSON.parse(error['_body']).statusCode) {
          case '2014':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9998':
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
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /*---- DOB Formating function into "yyyy-mm-dd" ----*/
  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1), day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  /**---- To Select Duration ----*/
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

  /**---- To Select startDate ----*/
  startDateChange(value) {
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
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.startdate = new Date(Math.ceil(this.startdate.getTime() / time) * time);
      this.enddate = moment(moment(this.startdate).minutes((moment(this.startdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
    }
  }

  /**---- To Select endDate ----*/
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

  /**---- To Select end Date ----*/
  extendendDateChange(extendendvalue) {
    const stdate = moment(extendendvalue).format('YYYY-MM-DD HH:mm');
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
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') >= moment(this.enddate).format('YYYY-MM-DD HH:mm')) {
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

  /**----- Submit method for create Fleet Reservation -----*/
  createFleetReservation() {
     if (this.fleetId1 !== '' && this.fleetId1 !== undefined && this.fleetId1 !== 'undefined') {
      this.fleetId = this.fleetId1;
    }
    if (this.advancedReservationWindowInDays1 < this.advancedReservationWindowInDays) {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays1;
    } else {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays;
    }
    if (this.enterpriseId !== '' && this.enterpriseId !== undefined && this.enterpriseId !== null) {
      this.error = '';
      if (this.fleettype !== '' && this.fleettype !== undefined && this.fleettype !== null) {
        this.error = '';
        if (this.fleetId !== '' && this.fleetId !== undefined && this.fleetId !== 'undefined' && this.fleetId !== null) {
          this.error = '';
          if (this.userId !== undefined &&
            this.userId !== 'undefined' && this.userId !== '' && this.userId !== null) {
            this.error = '';
            if (this.startdate !== '' && this.startdate !== undefined && this.startdate !== null) {
              this.error = '';
              if (this.enddate !== '' && this.enddate !== undefined && this.enddate !== null) {
                this.error = '';
                if (moment(this.startdate).format('YYYY-MM-DD HH:mm') < moment(this.enddate).format('YYYY-MM-DD HH:mm')) {
                  this.error = '';
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
                  const checkdate = moment(this.currentutc).add(this.advancedReservationWindowInDays2, 'days');
                  /** ----- Convert prefered time zone to utc format start----- */
                  if (this.utctimezonestring.charAt(0) === '-') {
                    const utctime = this.utctimezone.split('-');
                    const utctimesplit = utctime[1].split(':');
                    this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
                    this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');
                    this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
                    this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
                  } else {
                    const utctime = this.utctimezone.split('+');
                    const utctimesplit = utctime[1].split(':');
                    this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
                    this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');
                    this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
                    this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
                  }
                  if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
                    this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
                  } else {
                    this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
                  }
                  /** ----- Convert prefered time zone to utc format end----- */
                  if (moment(this.startdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (moment(this.enddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (moment(this.startdate).format('YYYY-MM-DD HH:mm') > moment(checkdate).format('YYYY-MM-DD HH:mm')) {
                    this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_ADVANCED_RESERVATION_WINDOW_IN_DAYS');
                    this.error = this.error.value + this.fleetCommonName;
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (this.duration > this.maxReservationWindowInHrs2) {
                    this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
                    this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
                    this.error = this.part1.value + this.fleetCommonName + this.part2.value;
                  } else {
                    this.createdFleetReservation = {
                      'enterprise': {
                        'enterpriseId': this.enterpriseId,
                        'enterpriseName': this.enterpriseNames
                      },
                      'fleetId': this.fleetId,
                      'userId': this.userId,
                      'startDatetime': moment(this.startdate).format('YYYY-MM-DD HH:mm'),
                      'duration': advDuration,
                      'endDatetime': moment(this.enddate).format('YYYY-MM-DD HH:mm'),
                      'eventId': this.eventId,
                      'isEnabled': this.isEnabled,
                      'notes': this.notes,
                      'maxActiveReservationsPerUser': this.maxActiveReservationsPerUser,
                    };
                    this.singleFleetReservationServices.createFleetReservation(this.createdFleetReservation, this.userToken)
                      .subscribe(data => {
                        this.hideChildModal();
                        // this.uploaded.emit('submit');
                        this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
                        this.toastr.success(this.toastermessage.value);
                        window.localStorage.setItem('createfleet', 'Create');
                        this.clearmessage();
                      }, error => {
                        this.startdate = this.errorstartdate;
                        this.enddate = this.errorenddate;
                        switch (JSON.parse(error['_body']).statusCode) {
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
                          case '9961':
                            this.storage.removeItem('token');
                            this.router.navigate(['/pages/login']);
                            break;
                        }
                      });
                  }
                } else {
                  this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                }
              } else {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
              }
            } else {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
            }
          } else {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
          }
        } else {
          this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
          this.error = this.fleetCommonName + this.error.value;
        }
      } else {
        this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
        this.errortype = this.translateService.get('ENTERPRISE_STATIC_CONTENT.MENU_TYPE');
        this.error = this.fleetCommonName + this.errortype.value + this.error.value;
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    }
  }

  /*---- Submit method for Update Fleet Reservation list ---- */
  updateFleetReservation() {
    if (this.advancedReservationWindowInDays1 < this.advancedReservationWindowInDays) {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays1;
    } else {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays;
    }
    this.updatestartdate = this.startdate;
    this.updateenddate = this.enddate;
    if (this.updateenterpriseName !== '' && this.updateenterpriseName !== undefined && this.updateenterpriseName !== null) {
      this.error = '';
      if (this.updatefleetId !== '' && this.updatefleetId !== undefined && this.updatefleetId !== null) {
        this.error = '';
        if (this.updatestartdate !== '' && this.updatestartdate !== undefined && this.updatestartdate !== null) {
          this.error = '';
          if (this.updateenddate !== '' && this.updateenddate !== undefined && this.updateenddate !== null) {
            this.error = '';
            if (moment(this.updatestartdate).format('YYYY-MM-DD HH:mm') < moment(this.updateenddate).format('YYYY-MM-DD HH:mm')) {
              this.error = '';
              if (this.updateuserId !== undefined &&
                this.updateuserId !== 'undefined' && this.updateuserId !== '' && this.updateuserId !== null) {
                this.error = '';
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
                const checkdate = moment(this.currentutc).add(this.advancedReservationWindowInDays2, 'days');
                /** ----- Convert prefered time zone to utc format start----- */
                if (this.utctimezonestring.charAt(0) === '-') {
                  const utctime = this.utctimezone.split('-');
                  const utctimesplit = utctime[1].split(':');
                  this.updatestartdate = moment(this.updatestartdate).add(utctimesplit[0], 'hours');
                  this.updatestartdate = moment(this.updatestartdate).add(utctimesplit[1], 'minutes');
                  this.updateenddate = moment(this.updateenddate).add(utctimesplit[0], 'hours');
                  this.updateenddate = moment(this.updateenddate).add(utctimesplit[1], 'minutes');
                } else {
                  const utctime = this.utctimezone.split('+');
                  const utctimesplit = utctime[1].split(':');
                  this.updatestartdate = moment(this.updatestartdate).subtract(utctimesplit[0], 'hours');
                  this.updatestartdate = moment(this.updatestartdate).subtract(utctimesplit[1], 'minutes');
                  this.updateenddate = moment(this.updateenddate).subtract(utctimesplit[0], 'hours');
                  this.updateenddate = moment(this.updateenddate).subtract(utctimesplit[1], 'minutes');
                }
                if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
                  this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
                } else {
                  this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
                }
                /** ----- Convert prefered time zone to utc format end----- */
                if (this.fleetreservationObj.startdatestatus === 'statdateactive') {
                  if (moment(this.updatestartdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (moment(this.updateenddate).format('YYYY-MM-DD HH:mm') < moment(this.updatestartdate).format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (moment(this.updatestartdate).format('YYYY-MM-DD HH:mm') > moment(checkdate).format('YYYY-MM-DD HH:mm')) {
                    this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_ADVANCED_RESERVATION_WINDOW_IN_DAYS');
                    this.error = this.error.value + this.fleetCommonName;
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;

                  } else if (this.duration > this.maxReservationWindowInHrs2) {
                    this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
                    this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
                    this.error = this.part1.value + this.fleetCommonName + this.part2.value;
                  } else {
                    this.editfleetreservation(advDuration);
                  }
                } else {
                  if (moment(this.updateenddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (this.duration > this.maxReservationWindowInHrs2) {
                    this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
                    this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
                    this.error = this.part1.value + this.fleetCommonName + this.part2.value;
                  } else {
                    this.editfleetreservation(advDuration);
                  }
                }
              } else {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
              }
            } else {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            }
          } else {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
          }
        } else {
          this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
        }
      } else {
        this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
        this.error = this.fleetCommonName + this.error.value;
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    }
  }

  /*---- Submit method for cancel fleet reservation ----*/
  cancelFleetreseravation() {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      if (this.fleetreservationObj.reservationStatus === 'Canceled' || this.fleetreservationObj.reservationStatus === 'Closed') {
        this.error = 'FLEET_RESERVATIONS.ALREADY_CLOSED';
      } else {
        this.singleFleetReservationServices.cancelfleetreservation(this.userToken, this.fleetreservationObj._id, this.reasonValue)
          .subscribe(
            videoDetails => {
              this.hideChildModal();
              const conditioncheck = window.localStorage.getItem('advancesearch');
              if (conditioncheck === 'search') {
                window.localStorage.setItem('advancesearch1', 'search1');
              } else if (window.localStorage.getItem('simplesearch') === 'search') {
                window.localStorage.setItem('simplesearch1', 'search1');
              } else {
                window.localStorage.setItem('createfleet', 'Create');
              }
              this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CANCEL_SUCCESS');
              this.toastr.success(this.toastermessage.value);
            },
            error => {
              switch (JSON.parse(error['_body']).statusCode) {
                case '9998':
                  this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                  break;
                case '2015':
                  this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                  break;
                case '9961':
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                  break;
              }
            });
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*---- Submit method for delete fleet reservation ----*/
  deletefleetreservation() {
    this.singleFleetReservationServices.deletefleetreservation(this.userToken, this.fleetreservationObj._id)
      .subscribe(
        videoDetails => {
          this.hideChildModal();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          const conditioncheck = window.localStorage.getItem('advancesearch');
          if (conditioncheck === 'search') {
            window.localStorage.setItem('advancesearch1', 'search1');
          } else if (window.localStorage.getItem('simplesearch') === 'search') {
            window.localStorage.setItem('simplesearch1', 'search1');
          } else {
            window.localStorage.setItem('createfleet', 'Create');
          }
        },
        error => {
          switch (JSON.parse(error['_body']).statusCode) {
            case '9998':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
            case '9961':
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
            case '2013':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
          }
        });
  }

  /*---- Submit method for checkIn into Fleet reseravation ----*/
  checkInFleetreseravation() {
    this.getservercurrentutctime();
    let startdate = this.fleetreservationObj.startDatetime;
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

      this.singleFleetReservationServices.checkinfleetreservation(this.userToken, this.fleetreservationObj._id)
        .subscribe(
          videoDetails => {
            this.hideChildModal();
            const conditioncheck = window.localStorage.getItem('advancesearch');
            if (conditioncheck === 'search') {
              window.localStorage.setItem('advancesearch1', 'search1');
            } else if (window.localStorage.getItem('simplesearch') === 'search') {
              window.localStorage.setItem('simplesearch1', 'search1');
            } else {
              window.localStorage.setItem('createfleet', 'Create');
            }
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CHECK_IN_SUCCESS');
            this.toastr.success(this.toastermessage.value);
          },
          error => {
            switch (JSON.parse(error['_body']).statusCode) {
              // case '2015':
              //   this.error = 'FLEET_RESERVATIONS.DATE_CHECKIN_ERROR';
              //   break;
              // case '2026':
              //   this.error = 'FLEET_RESERVATIONS.FLEET_CHECK_IN_ERROR';
              //   break;
              // case '2026':
              //   this.error = 'FLEET_RESERVATIONS.FLEET_CHECK_IN_EXCEED_ERROR';
              //   break;
              case '2026':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
              case '9998':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
              case '9997':
                this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
                break;
              case '9961':
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
                break;
            }
          });

    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EARLY_CHECK_IN_WINDOW_IN_MINS';
    }
  }

  /*---- Submit method for checkOut from fleet reservation ----*/
  checkOutfleetreservation() {
    this.singleFleetReservationServices.checkOutfleetreservation(this.userToken, this.fleetreservationObj._id)
      .subscribe(
        videoDetails => {
          this.hideChildModal();
          const conditioncheck = window.localStorage.getItem('advancesearch');
          if (conditioncheck === 'search') {
            window.localStorage.setItem('advancesearch1', 'search1');
          } else if (window.localStorage.getItem('simplesearch') === 'search') {
            window.localStorage.setItem('simplesearch1', 'search1');
          } else {
            window.localStorage.setItem('createfleet', 'Create');
          }
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CHECK_OUT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        },
        error => {
          switch (JSON.parse(error['_body']).statusCode) {
            case '9998':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
            case '2017':
              this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
              break;
            case '9961':
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
          }
        });
  }

  /*---- Submit method for extend FleetReservation list ---- */
  extendFleetReservation() {
    this.getservercurrentutctime();
    this.updatestartdate = this.startdate;
    this.updateenddate = this.enddate;
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null && this.reasonValue !== 'undefined') {
      if (this.updateenterpriseName !== '' && this.updateenterpriseName !== undefined && this.updateenterpriseName !== null) {
        this.error = '';
        if (this.updatefleetId !== '' && this.updatefleetId !== undefined && this.updatefleetId !== null) {
          this.error = '';
          if (this.updatestartdate !== '' && this.updatestartdate !== undefined && this.updatestartdate !== null) {
            this.error = '';
            if (this.updateenddate !== '' && this.updateenddate !== undefined && this.updateenddate !== null) {
              this.error = '';
              if (this.updateuserId !== undefined &&
                this.updateuserId !== 'undefined' && this.updateuserId !== '' && this.updateuserId !== null) {
                this.error = '';
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
                /** ----- Convert prefered time zone to utc format start----- */
                if (this.utctimezonestring.charAt(0) === '-') {
                  const utctime = this.utctimezone.split('-');
                  const utctimesplit = utctime[1].split(':');
                  this.updatestartdate = moment(this.updatestartdate).add(utctimesplit[0], 'hours');
                  this.updatestartdate = moment(this.updatestartdate).add(utctimesplit[1], 'minutes');
                  this.updateenddate = moment(this.updateenddate).add(utctimesplit[0], 'hours');
                  this.updateenddate = moment(this.updateenddate).add(utctimesplit[1], 'minutes');
                } else {
                  const utctime = this.utctimezone.split('+');
                  const utctimesplit = utctime[1].split(':');
                  this.updatestartdate = moment(this.updatestartdate).subtract(utctimesplit[0], 'hours');
                  this.updatestartdate = moment(this.updatestartdate).subtract(utctimesplit[1], 'minutes');
                  this.updateenddate = moment(this.updateenddate).subtract(utctimesplit[0], 'hours');
                  this.updateenddate = moment(this.updateenddate).subtract(utctimesplit[1], 'minutes');
                }
                /** ----- Convert prefered time zone to utc format end----- */
               if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
                  this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
                } else {
                  this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
                }
                if (this.fleetreservationObj.startdatestatus === 'statdateactive') {
                  if (moment(this.updatestartdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (moment(this.updateenddate).format('YYYY-MM-DD HH:mm') < moment(this.updatestartdate).format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (this.duration > this.maxReservationWindowInHrs2) {
                    this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
                    this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
                    this.error = this.part1.value + this.fleetCommonName + this.part2.value;
                  } else {
                    this.extendfleetreservation(advDuration);
                  }
                } else {
                  if (moment(this.updateenddate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
                  ) {
                    this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                    this.startdate = this.errorstartdate;
                    this.enddate = this.errorenddate;
                  } else if (this.duration > this.maxReservationWindowInHrs2) {
                    this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
                    this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
                    this.error = this.part1.value + this.fleetCommonName + this.part2.value;
                  } else {
                    this.extendfleetreservation(advDuration);
                  }
                }
              } else {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
              }
            } else {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
            }
          } else {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
          }
        } else {
          this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
          this.error = this.fleetCommonName + this.error.value;
        }
      } else {
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
      }
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /**---- Method for key press ----*/
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
        this.deletefleetreservation();
      }
    }
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error2 = '';
    this.error3 = '';
    this.error1 = '';
    this.error = '';
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.comment = '';
    this.enterpriseIconFilePath = '';
    this.childModal.hide();
    this.closePopupModal();
    this.clearmessage();
  }

  /*---- Close childModal popup ----*/
  closePopupModal() {
    this.enterpriseNameslist.length = 0;
    this.notes = '';
    this.fleetNameList = [];
    this.usersList = [];
    this.enterpriseIconFilePath = '';
    this.viewfleet = 'false';
    this.startdate = '';
    this.enterpriseId = '';
    this.enddate = '';
    this.fleetId = '';
    this.userId = undefined;
    this.fleetNamess = undefined;
    this.childModal.hide();
  }
 getFleetsdata(fleetid) {
   this.singleFleetReservationServices.getEventNameByFleetId(this.userToken, fleetid)
    .subscribe(
      allFleetReservationsList => {
              this.enterprise = allFleetReservationsList['result'].enterprise.enterpriseName;
              this.enterpriseNames = this.enterprise;
              this.enterpriseId = allFleetReservationsList['result'].enterprise.enterpriseId;
              this.getFleetTypes(this.enterpriseId);
              this.getUserlistByentId(this.enterpriseId);
              this.type = allFleetReservationsList['result'].fleetType;
              this.getFleetTypeAttributes(this.type);
              this.asset = allFleetReservationsList['result'].fleetName;
              this.fleetId1 = allFleetReservationsList['result']._id;

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

  /*---- Auto capitalization for each word ----*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }
}
