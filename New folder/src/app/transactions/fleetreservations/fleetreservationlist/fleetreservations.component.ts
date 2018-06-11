/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/**
 *  FleetReservationsComponent have below functionality.
 * ngOnInit(): To load the list at loading time.
 * ngAfterViewInit(): After view intialisation rendered.
 * ngAfterContentChecked(): To check the content.
 * singleReservation(selectedaction, selectedObj): To open the popup model.
 * advancedFleetReservation(): To show the advance model popup.
 * checkFleets(): To check fleet availabity popup.
 * gettimeZones(): To get the time zones.
 * changeTimezones(timezone): To change the time zones list.
 * advcreateTimezones(timezone): Method to get the selected time zone.
 * getstatus(): To get status from lookups.
 * getstatusonchange(status): To get selected status value.
 * getFleetTypes(enterPriseId): To get fleet data.
 * getFleetTypesById(value): To get fleet types.
 * getCountries(): To get Countries list.
 * Changecountry(value): To get selected country value.
 * getFleetTypeAttributes(value): To get fleet typ attributes.
 * getFleetName(fleet): To get selected fleet name.
 * getFleetlistByentId(entId): To get fleetlist by Enterprise Id.
 * getFleetsandUsers(value): To get the selected value.
 * getUserlistByentId(entId): To get User list by Enterprise id.
 * selectUserInfo(uservalue): To Select selectUserInfo.
 * getservercurrentutctime(): To get current UTC time.
 * getrecorddetails(): To get the single notification record details.
 * getFleetReservationsList(): To getFleetReservationsList.
 * fleetView(fleetObj): To get the selected fleet.
 * fleetsSubmit(): Advance create fleet reservation popup.
 * getfleetinfo(fleetId):  Method to get fleet information.
 * daysChanged(days): To change the days.
 * hoursChanged(hours): To change the hours.
 * durationChanged(duration):  To change the duration.
 * startDateChange(value): To get Selected startDate.
 * endDateChange(endvalue): To get Selected endDate.
 * startDateChangeGuidedFirst(value): To change the duration field.
 * endDateChangeGuidedFirst(endvalue): To change the end date.
 * createStartDateChange(value): To change the start date.
 * createEndDateChange(endvalue): To Select end Date.
 * getFleetReservationSeachList(searchString): To get fleet reservation search list.
 * createFleetReservation(): Method for guided create submit.
 * advancedFleetReservationSubmit(search): Method for advance search.
 * fleetsCheckSubmit(): Method for guided create submit.
 * handleKeyPress(e): Method for handle key press.
 * autocase(text): Auto capitalization for each word.
 * exportData(searchstring): To export the data.
 * clearAdvancedModal(): To clear the dat in modal.
 * clearmessage(): To clear the messages.
 * hideCreateModal(): Method for hide popup model.
 * clearFleetsModal(): To clear the data.
 * hideFleetModal(): To hide the modal.
 * hideAdvancedModal(): To hide the advance modal.
 * locates(locate): Method for locate.
 * singlelocate(locate, singlefleetreservation): Method for single locate.
 */

import { Component, ViewChild, OnInit, Inject, AfterContentChecked, ViewContainerRef, AfterViewInit, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { FleetReservationsService } from './fleetreservations.service';
import { NotificationsService } from '../../../notifications/notifications.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
import { FleetReservationServices } from '../fleetreservationpopup/fleetreservation.service';
import { Enterpriseservice } from '../../../admin/enterprises/enterprisepopup/enterprise.service';
import { FleetsService } from '../../../enterprises/fleets/fleetslist/fleets.service';
import { FleetService } from '../../../enterprises/fleets/fleetpopup/fleet.service';
import { FleetReservationComponent } from '../fleetreservationpopup/fleetreservation.component';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'fleetreservations.html',
  providers: [FleetReservationsService, ConfirmationService, AdvertisementsService, FleetsService, FleetService, FleetReservationServices]
})

export class FleetReservationsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  stacked = '';
  fleetCommonName: any;
  import: MenuItem[];
  fleetReservationsDetails: Array<FleetReservationsModel> = [];
  searchstring: string;
  userToken: any;
  searchfield: any;
  storage: Storage = window.localStorage;
  viewstatus: any;
  addststus: any;
  editstatus: any;
  liststatus: any;
  deletestatus: any;
  exportstatus: any;
  cancelstatus: any;
  extendstatus: any;
  checkinstatus: any;
  checkoutstatus: any;
  locatestatus: any;
  pagename: any;
  toastermessage: any;
  recordid: any;
  rowsPerPage = 10;
  userpreferedtimezone: any;
  utctimezone: any;
  utctimezonestring: any;
  loginUserDateFormat: any;
  currentutc: any;
  error: any;
  enterpriseIconFilePath: any;
  search: any;
  duration: any;
  selectedduration: Number;
  timezoneCode: any;
  timezoneCodes: any;
  timeZones: any[];
  searchterm: any;
  minDate: Date;
  startdate: any = '';
  enddate: any = '';
  errorstartdate: any;
  errorenddate: any;
  status1: any;
  status: any;
  enterpriseName: any;
  /* fleets availability */
  actionType: any;
  fleetinfo: any;
  fleetsList: any[];
  reservationstartdate: any;
  reservationenddate: any;
  fleetTypes: any;
  countries: any;
  enterpriseNameslist: any;
  enterprisesSize: any;
  fleetsavailability: any;
  attributeList: any;
  addinfo: any;
  attributeId: any;
  attributeText: any;
  enterpriseNames: any;
  enterPriseId: any;
  check: any = false;
  userrole: any;
  advtimezoneCodes: any;
  advutctimezonestring: any;
  advutctimezone: any;
  addenterpriseName: any;
  addStartDate: any;
  addEndDate: any;
  fleetname: any;
  addFleetName: any;
  enterprise: any;
  fleetNameList: any;
  usersList: any;
  fleetId: any;
  viewfleet: any;
  eventNameList: any;
  worknumbercntrycode: any;
  worknumbercntrycodesplit: any;
  worknumext: any;
  worknumber: any;
  attributevalue: any;
  hiddenstartdate: any;
  hiddenenddate: any;
  error1: any;
  selecteddays: any;
  selectedhours: any;
  enddate1: any;
  startdate1: any;
  durationList = [];
  daysList: any = [];
  hoursList: any = [];
  userId: any;
  createdFleetReservation: any;
  isEnabled: any;
  notes: any;
  enterpriseId: any;
  fleetViewParm = false;
  fleetData: any;
  updateAt: any;
  createAt: any;
  longitudee: any;
  latitudee: any;
  selectedent: any;
  maxActiveReservationsPerUser: any;
  advancedReservationWindowInDays: any;
  advancedReservationWindowInDays1: any;
  advancedReservationWindowInDays2: any;
  maxReservationWindowInHrs: any;
  maxReservationWindowInHrs1: any;
  maxReservationWindowInHrs2: any;
  userlength: any;
  timeZoneValue: any;
  hiddenselecteddays: any;
  hiddenselectedhours: any;
  time: any;
  attributesList: any;
  fleetsCommonName: any;
  part1: any;
  part2: any;
  guidedcreatestatus: any;
  userdetail: any;
  userAccount: any;
  fleettype: any;
  FleetName: any;
  countriesListLength = true;
  enterpriseselect = false;
  fleetsList1: any[];
  selectedFleet = null;
  settime: any;
  @ViewChildren('input') vc;
  @ViewChild(FleetReservationComponent)
  private reservationModalComponent: FleetReservationComponent;
  @ViewChild('fleetModel') public fleetModel: ModalDirective;
  @ViewChild('advancedModel') public advancedModel: ModalDirective;
  @ViewChild('createModel') public createModel: ModalDirective;

  /**---- Constructor for fleet reservations component ----*/
  constructor(private fleetReservationsService: FleetReservationsService,
    private singleFleetReservationServices: FleetReservationServices,
    private confirmationService: ConfirmationService,
    public advertisementsService: AdvertisementsService,
    public toastr: ToastsManager,
    private notificationService: NotificationsService,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    private allfleetsService: FleetsService,
    private singleEnterpriseService: Enterpriseservice,
    private singleFleetservices: FleetService,
    @Inject('defaultDays') private defaultDays: number,
    @Inject('defaultDuration') public defaultDuration: number,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the list at loading time ----*/
  ngOnInit() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.viewstatus = window.localStorage.getItem('fleetreservationviewstatus');
    this.addststus = window.localStorage.getItem('fleetreservationaddstatus');
    this.editstatus = window.localStorage.getItem('fleetreservationeditstatus');
    this.liststatus = window.localStorage.getItem('fleetreservationliststatus');
    this.deletestatus = window.localStorage.getItem('fleetreservationdeletedstatus');
    this.exportstatus = window.localStorage.getItem('fleetreservationexportstatus');
    this.userToken = window.localStorage.getItem('token');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    this.cancelstatus = window.localStorage.getItem('fleetreservationcancelstatus');
    this.extendstatus = window.localStorage.getItem('fleetreservationextendstatus');
    this.checkinstatus = window.localStorage.getItem('fleetreservationcheckinstatus');
    this.checkoutstatus = window.localStorage.getItem('fleetreservationcheckoutstatus');
    this.locatestatus = window.localStorage.getItem('fleetreservationlocatestatus');
    this.guidedcreatestatus = window.localStorage.getItem('fleetreservationguidedcreate');
    this.enterpriseName = window.localStorage.getItem('enterPriseName');
    localStorage.removeItem('lcfleetreservationsdata');
    localStorage.removeItem('lcfleetreservations');
    // time zone
    this.search = {};
    this.getservercurrentutctime();
    this.getstatus();
    this.getCountries();
    this.duration = this.defaultDuration;
    // time zone
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advtimezoneCodes = this.timezoneCode[0].trim();
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();

    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else if (this.pagename === 'fleetreservations') {
      this.getrecorddetails();
      this.storage.removeItem('notificationpage');
    } else if (this.storage.getItem('dashbordStartDate') !== undefined && this.storage.getItem('dashbordStartDate') !== null
      && this.storage.getItem('dashbordEndDate') !== undefined && this.storage.getItem('dashbordEndDate') !== null) {
      this.startdate = this.storage.getItem('dashbordStartDate');
      this.enddate = this.storage.getItem('dashbordEndDate');
      if (this.storage.getItem('selecteddashboardenterpriseid') === 'undefined') {
        this.search.enterpriseValue = '';
      } else {
        this.search.enterpriseValue = this.storage.getItem('selecteddashboardenterpriseid');
      }
      this.advancedFleetReservationSubmit(this.search);
    } else if (this.storage.getItem('schduledStartDate') !== undefined && this.storage.getItem('schduledStartDate') !== null
      && this.storage.getItem('schduledEndDate') !== undefined && this.storage.getItem('schduledEndDate') !== null) {
      this.startdate = new Date(this.storage.getItem('schduledStartDate'));
      this.enddate = new Date(this.storage.getItem('schduledEndDate'));
      if (this.storage.getItem('schduledEventTitle') === '') {
        this.search.eventName = '';
      } else {
        this.search.eventName = this.storage.getItem('schduledEventTitle');
      }
      this.advancedFleetReservationSubmit(this.search);
    } else {
      this.getFleetReservationsList();
    }
    this.fleetsavailability = {};
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

  /**----- After view intialisation rendered ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
    /* ---- for calendar drill down ---*/
    if (this.storage.getItem('schduledStartDate') !== undefined && this.storage.getItem('schduledStartDate') !== null
      && this.storage.getItem('schduledEndDate') !== undefined && this.storage.getItem('schduledEndDate') !== null) {
      this.startdate = new Date(this.storage.getItem('schduledStartDate'));
      this.enddate = new Date(this.storage.getItem('schduledEndDate'));
      if (this.storage.getItem('schduledEventTitle') === '') {
        this.search.eventName = '';
      } else {
        this.search.eventName = this.storage.getItem('schduledEventTitle');
      }
      this.advancedFleetReservationSubmit(this.search);
    }
    if (window.localStorage.getItem('createfleetreserve') === 'reservepopup') {
      this.reservationModalComponent.showChildModal('CREATE', '');
    }
  }
  calendar(data) {
    window.localStorage.setItem('calendarfrom', 'Fleetreservation');
    window.localStorage.removeItem('eventfleet_id');
    window.localStorage.setItem('fleetreservaton_id', data.fleetObj._id);
    window.localStorage.setItem('fleetstartdate', data.startDatetime);
    window.localStorage.setItem('eventenabled', data.fleetObj.isEventsEnabled);
    window.localStorage.removeItem('fleets_id');
    this.router.navigate(['/calendar']);
  }
  /*---- To check the content ----*/
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('createfleet') === 'Create') {
      this.getFleetReservationsList();
    }
    if (window.localStorage.getItem('advancesearch1') === 'search1') {
      this.advancedFleetReservationSubmit(this.search);
    }
    if (window.localStorage.getItem('simplesearch1') === 'search1') {
      this.getFleetReservationSeachList(this.searchterm);
    }
    window.localStorage.removeItem('simplesearch1');
    window.localStorage.removeItem('createfleet');
    window.localStorage.removeItem('advancesearch1');

  }

  /*-- To open the popup model ----*/
  singleReservation(selectedaction, selectedObj) {
    this.reservationModalComponent.showChildModal(selectedaction, selectedObj);
  }

  /**---- To show the advance model popup ----*/
  advancedFleetReservation() {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.gettimeZones();
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.advancedModel.show();
    this.minDate = new Date();
  }
  /**---- To show the click popup ----*/
  public displayMessage() {
    this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_PERFORM_ACTION_FROM_EVENTS_PAGE');
    this.toastr.success(this.toastermessage.value);
  }

  fleetSelected(value) {
    this.selectedFleet = value;
  }

  /**--- To check fleet availabity popup ---*/
  checkFleets() {
    this.fleetModel.show();
    this.getFleetTypeAttributes(this.fleetsavailability.fleetType);
    this.createModel.hide();
    this.gettimeZones();
    this.duration = this.defaultDuration;
    this.fleetname = '';
    this.minDate = new Date();
    this.fleetinfo = false;
    this.actionType = 'advCreate';
    this.error = '';
    this.error1 = '';
    const time = 1000 * 60 * 5;
    const date = new Date();
    this.selecteddays = '0';
    this.selectedhours = '00';
    this.selectedduration = this.defaultDuration;
    this.reservationstartdate = new Date(Math.ceil(date.getTime() / time) * time);
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
    this.minDate = new Date();

    this.singleFleetReservationServices.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterpriseNameslist = data['result'];
            this.fleetsavailability.enterpriseNames = this.enterpriseNameslist[0].enterpriseName;
            this.enterPriseId = this.enterpriseNameslist[0]._id;
            this.fleetsavailability.enterPriseId = this.enterpriseNameslist[0]._id;
            this.getCountriesbyEnterpriseId(this.enterPriseId);
            if (this.fleetsavailability.fleetType === '' || this.fleetsavailability.fleetType === undefined) {
              this.getFleetTypes(this.enterPriseId);
            }
            this.enterprisesSize = true;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
          } else {
            this.enterpriseNameslist = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
    // this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }

  /**---- To get the time zones ----*/
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

  /*--- To change the time zones list ---*/
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.advtimezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
  }

  /**---- Method to get the selected time zone ---*/
  advcreateTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timeZoneValue = timevalue;
    this.advtimezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }

  /**------- To get status from lookups --------- */
  public getstatus() {
    // this.status1 = [];
    this.singleFleetReservationServices.getLookupsList(this.userToken, 'RESERVATION_STATUSES').subscribe(
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

  /**--- To get selected status value ----*/
  getstatusonchange(status) {
    this.status = status;
  }

  /**---- To get fleet data ----*/
  public getFleetTypes(enterPriseId) {
    this.fleetReservationsService.getFleetTypesList(this.userToken, enterPriseId).subscribe(
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

  /*---- To get fleet types ----*/
  public getFleetTypesById(value) {
    const enterprise = value.split('$');
    this.enterPriseId = value[0];
    this.fleetsavailability.fleetType = '';
    this.getFleetTypes(this.enterPriseId);
    this.enterpriseIconFilePath = enterprise[2] + '/' + enterprise[3];
    if (value !== 'Select') {
      this.getCountriesbyEnterpriseId(this.enterPriseId);
    } else {
      this.countriesListLength = true;
      this.enterpriseselect = false;
      this.fleetsavailability.country = '';
      this.getCountries();
    }
    this.fleetsList1 = [];
    this.fleetsavailability.enterpriseNames = enterprise[1];
    this.fleetsavailability.enterPriseId = enterprise[0];
    this.selectedent = this.fleetsavailability.enterpriseNames;
  }
  /**---- To get Countries by existing fleets, resources, enterprises ----*/
  public getCountriesbyEnterpriseId(enterPriseId) {
    this.fleetReservationsService.getCountriesbyEnterpriseId(this.userToken, enterPriseId).subscribe(
      data => {
        this.enterpriseselect = true;
        this.countries = data['result'];
        if (data['result'].length > 0) {
          this.fleetsavailability.country = data['result'][0];
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
  /*-- To get Countries list --*/
  public getCountries() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'COUNTRIES').subscribe(
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

  /**---- To get selected country value ----*/
  Changecountry(value) {
    this.fleetsavailability.country = value;
  }

  /**--- To get fleet typ attributes ----*/
  getFleetTypeAttributes(fleettype) {
    this.fleetsList1 = [];
    this.fleettype = fleettype;
    this.fleetsavailability.fleetType = fleettype;
    this.singleFleetReservationServices.getFleetNameByEntId(this.userToken, fleettype, this.enterPriseId).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.fleetNameList = data['result'];
        }
        this.selectedFleet = null;
        this.fleetsCheckSubmit('onchange');
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

  /**--- To get selected fleet name ----*/
  getFleetName(fleet) {
    this.fleetname = fleet._id + '$' + fleet.fleetName;
    this.error1 = '';
  }


  /**---- To get the selected value ----*/
  getFleetsandUsers(value) {
    this.enterprise = value.split('$');
    this.enterpriseId = this.enterprise[0];
    this.enterpriseNames = this.enterprise[1];
    this.enterpriseIconFilePath = this.enterprise[2] + '/' + this.enterprise[3];
    this.getUserlistByentId(this.enterpriseId);
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
          this.userdetail = userList['result'][0].enterpriseResourceObj.firstName + ' '
            + userList['result'][0].enterpriseResourceObj.lastName;
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
  /**---- To Select selectUserInfo ----*/
  selectUserInfo(uservalue) {
    const value = uservalue.split('$');
    this.userId = value[0];
    this.maxActiveReservationsPerUser = value[1];
    this.advancedReservationWindowInDays = value[2];
    this.maxReservationWindowInHrs = value[3];
  }

  /**---- To get current UTC time ----*/
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }

  /**------ To get the single notification record details-------- */
  getrecorddetails() {
    this.getservercurrentutctime();
    localStorage.removeItem('lcfleetreservationsdata');
    localStorage.removeItem('lcfleetreservations');
    this.notificationService.getNotification(this.recordid, this.pagename, this.userToken)
      .subscribe(
      allFleetReservationsList => {
        for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
          if (allFleetReservationsList['result'][i].endDatetime > this.currentutc) {
            allFleetReservationsList['result'][i].recordstatus = 'active';
            if (allFleetReservationsList['result'][i].startDatetime > this.currentutc) {
              allFleetReservationsList['result'][i].startdatestatus = 'statdateactive';
            } else {
              allFleetReservationsList['result'][i].startdatestatus = 'statdateinactive';
            }
          } else {
            allFleetReservationsList['result'][i].recordstatus = 'inactive';
          }
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).add(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).add(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).add(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).add(utctimesplit[1], 'minutes');
            if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
              allFleetReservationsList['result'][i].checkInDatetime !== null) {
              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).add(utctimesplit[1], 'minutes');
            }
            if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
              && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
            }
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).subtract(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).subtract(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).subtract(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).subtract(utctimesplit[1], 'minutes');
            if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
              allFleetReservationsList['result'][i].checkInDatetime !== null) {

              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
            }
            if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
              && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
            }
          }
        }

        this.fleetReservationsDetails = allFleetReservationsList['result'];
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

  /*---- To getFleetReservationsList ----*/
  getFleetReservationsList() {
    this.getservercurrentutctime();
    localStorage.removeItem('lcfleetreservationsdata');
    localStorage.removeItem('lcfleetreservations');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.fleetReservationsService.getFleetReservationList(this.userToken)
      .subscribe(
      allFleetReservationsList => {
        console.log(JSON.stringify(allFleetReservationsList['result'][0]['userName']['userDetails']['firstName']));
        for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
          allFleetReservationsList['result'][i].userDetails = allFleetReservationsList['result'][i].userName.userDetails.firstName + ' ' +
            allFleetReservationsList['result'][i].userName.userDetails.lastName;
          if (allFleetReservationsList['result'][i].userName.userDetails) {
            allFleetReservationsList['result'][i].userDetails = allFleetReservationsList['result'][i].userName.userDetails.firstName
              + ' ' + allFleetReservationsList['result'][i].userName.userDetails.lastName;
          }
          if (allFleetReservationsList['result'][i].endDatetime > this.currentutc) {
            allFleetReservationsList['result'][i].recordstatus = 'active';
            if (allFleetReservationsList['result'][i].startDatetime > this.currentutc) {
              allFleetReservationsList['result'][i].startdatestatus = 'statdateactive';
            } else {
              allFleetReservationsList['result'][i].startdatestatus = 'statdateinactive';
            }
          } else {
            allFleetReservationsList['result'][i].recordstatus = 'inactive';
          }
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).add(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).add(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).add(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).utc().add(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).add(utctimesplit[1], 'minutes');
            if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
              allFleetReservationsList['result'][i].checkInDatetime !== null) {
              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).add(utctimesplit[1], 'minutes');
            }
            if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
              && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
            }
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).subtract(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
            [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).subtract(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
            [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
            [i].createdAt).subtract(utctimesplit[1], 'minutes');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
            [i].updatedAt).subtract(utctimesplit[1], 'minutes');
            if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
              allFleetReservationsList['result'][i].checkInDatetime !== null) {

              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
              [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
            }
            if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
              allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
              && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
              allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
              [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
            }
          }
        }
        this.fleetReservationsDetails = allFleetReservationsList['result'];
      },
      error => {
        if (JSON.parse(error['_body']).statusCode === '9961') {
          this.storage.removeItem('token');
          this.router.navigate(['/pages/login']);
        }
      });
  }

  /**---- To get the selected fleet ----*/
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

  /**-----  Advance create fleet reservation popup ----*/
  fleetsSubmit() {
    if (this.fleetname === '' || this.fleetname === undefined || this.fleetname === null) {
      this.error1 = this.translateService.get('FLEET_RESERVATIONS.SELECT_FLEET');
      this.error1 = this.error1.value + this.fleetCommonName;
    } else {
      this.fleetModel.hide();
      this.addenterpriseName = this.fleetsavailability.enterpriseNames;
      this.enterpriseId = this.fleetsavailability.enterPriseId;
      this.addStartDate = this.hiddenstartdate;
      this.addEndDate = this.hiddenenddate;
      this.getUserlistByentId(this.fleetsavailability.enterPriseId);
      this.addFleetName = this.fleetname;
      this.FleetName = this.addFleetName.split('$');
      this.addFleetName = this.FleetName[0];
      this.FleetName = this.FleetName[1];
      const fleetssplit = this.addFleetName.split('$');
      this.fleetId = fleetssplit[0];
      this.getfleetinfo(this.fleetId);
      this.hiddenselecteddays = this.fleetsavailability.hiddenselecteddays;
      this.hiddenselectedhours = this.fleetsavailability.hiddenselectedhours;
      this.selectedduration = this.fleetsavailability.hiddenselectedduration;
      this.selecteddays = this.hiddenselecteddays;
      this.selectedhours = this.hiddenselectedhours;
      if (this.timezoneCodes === this.advtimezoneCodes) {
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
      this.createModel.show();
      this.error = '';
    }
  }

  /**---- Method to get fleet information ----*/
  getfleetinfo(fleetId) {
    this.singleFleetReservationServices.getEventNameByFleetId(this.userToken, fleetId)
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
        this.attributesList = this.eventNameList.attributes;
        if (JSON.stringify(this.attributesList) === '[]' || this.attributesList === null) {
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

  /**--- To change the days ----*/
  daysChanged(days) {
    const durationvalue = Math.floor(this.duration / (24 * 60));
    this.duration = this.duration - durationvalue * 24 * 60 + 24 * 60 * Number(days);
    this.addEndDate = moment(moment(this.addStartDate).minutes((moment(this.addStartDate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To change the hours ----*/
  hoursChanged(hours) {
    const durationvaluedays = Math.floor(this.duration / (24 * 60));
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = this.duration - (durationvaluehours - durationvaluedays * 24) * 60 + Number(hours) * 60;
    this.addEndDate = moment(moment(this.addStartDate).minutes((moment(this.addStartDate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /**---- To change the duration ----*/
  durationChanged(duration) {
    const durationvaluehours = Math.floor(this.duration / (60));
    this.duration = durationvaluehours * 60 + Number(duration);
    this.addEndDate = moment(moment(this.addStartDate).minutes((moment(this.addStartDate).minutes() +
      Number(this.duration)))).format('YYYY-MM-DD HH:mm');
  }

  /*--- To change the duration field ----*/
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
      this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
    }
  }

  /**---- To change the end date ----*/
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

  /**---- To change the start date ---*/
  createStartDateChange(value) {
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
      this.addStartDate = new Date(Math.ceil(this.addStartDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      const time = 1000 * 60 * 5;
      this.addStartDate = new Date(Math.ceil(this.addStartDate.getTime() / time) * time);
      this.addEndDate = moment(moment(this.addStartDate).minutes((moment(this.addStartDate).minutes() +
        Number(this.duration)))).format('YYYY-MM-DD HH:mm');
    }
  }

  /**---- To Select end Date ----*/
  createEndDateChange(endvalue) {
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
      this.addEndDate = new Date(Math.ceil(this.addEndDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (moment(this.addStartDate).format('YYYY-MM-DD HH:mm') >= moment(this.addEndDate).format('YYYY-MM-DD HH:mm')) {
      const time = 1000 * 60 * 5;
      this.addEndDate = new Date(Math.ceil(this.addEndDate.getTime() / time) * time);
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      let hrs: any;
      let mins: any;
      const time = 1000 * 60 * 5;
      this.addEndDate = new Date(Math.ceil(this.addEndDate.getTime() / time) * time);
      const duration = moment.utc(moment(this.addEndDate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.addStartDate, 'YYYY-MM-DD HH:mm'))).format('m');
      if (Number(duration) < 10) {
        mins = '0' + Number(duration);
      } else {
        mins = Number(duration);
      }
      const durationhrs = moment.utc(moment(this.addEndDate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.addStartDate, 'YYYY-MM-DD HH:mm'))).format('H');
      if (Number(durationhrs) < 10) {
        hrs = '0' + Number(durationhrs);
      } else {
        hrs = Number(durationhrs);
      }
      const durationdays = moment.utc(moment(this.addEndDate, 'YYYY-MM-DD HH:mm').
        diff(moment(this.addStartDate, 'YYYY-MM-DD HH:mm')));
      this.selectedhours = hrs;
      this.selecteddays = Math.floor(Number(durationdays) / (24 * 60 * 60 * 1000));
      this.selectedduration = mins;
      this.duration = Math.floor(Number(durationdays) / (60 * 1000));
    }
  }

  /**----- To get fleet reservation search list ------ */
  getFleetReservationSeachList(searchString) {
    searchString = searchString.trim().replace(/\s\s+/g, ' ');
    window.localStorage.removeItem('advancesearch');
    localStorage.removeItem('lcfleetreservationsdata');
    localStorage.removeItem('lcfleetreservations');
    this.searchterm = searchString;
    if (searchString === '' || searchString === undefined) {
      this.getservercurrentutctime();
      this.getFleetReservationsList();
    } else {
      window.localStorage.setItem('simplesearch', 'search');
      this.getservercurrentutctime();
      this.fleetReservationsService.getFleetReservationSearchResult(this.userToken, searchString)
        .subscribe(
        allFleetReservationsList => {
          if (allFleetReservationsList['statusCode'] === '1001') {
            for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
              allFleetReservationsList['result'][i].userDetails = allFleetReservationsList['result'][i].userName.userDetails.firstName +
                ' ' + allFleetReservationsList['result'][i].userName.userDetails.lastName;
              if (allFleetReservationsList['result'][i].endDatetime > this.currentutc) {
                allFleetReservationsList['result'][i].recordstatus = 'active';
                if (allFleetReservationsList['result'][i].startDatetime > this.currentutc) {
                  allFleetReservationsList['result'][i].startdatestatus = 'statdateactive';
                } else {
                  allFleetReservationsList['result'][i].startdatestatus = 'statdateinactive';
                }
              } else {
                allFleetReservationsList['result'][i].recordstatus = 'inactive';
              }
              if (this.utctimezonestring.charAt(0) === '+') {
                const utctime = this.utctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).add(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).add(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).add(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).add(utctimesplit[1], 'minutes');
                if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
                  allFleetReservationsList['result'][i].checkInDatetime !== null) {
                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).add(utctimesplit[1], 'minutes');
                }
                if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
                  && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
                }
              } else {
                const utctime = this.utctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).subtract(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).subtract(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).subtract(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).subtract(utctimesplit[1], 'minutes');
                if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
                  allFleetReservationsList['result'][i].checkInDatetime !== null) {

                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
                }
                if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
                  && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
                }
              }
            }
            this.fleetReservationsDetails = allFleetReservationsList['result'];
          }
        },
        error => {
          if (JSON.parse(error['_body']).statusCode === '9961') {
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
          }
        });
    }

  }


  /**---- Method for guided create submit ---*/
  createFleetReservation() {
    if (this.advancedReservationWindowInDays1 < this.advancedReservationWindowInDays) {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays1;
    } else {
      this.advancedReservationWindowInDays2 = this.advancedReservationWindowInDays;
    }
    if (this.enterpriseId !== '' && this.enterpriseId !== undefined && this.enterpriseId !== null) {
      this.error = '';
      if (this.fleetId !== '' && this.fleetId !== undefined && this.fleetId !== 'undefined' && this.fleetId !== null) {
        this.error = '';
        if (this.userId !== undefined &&
          this.userId !== 'undefined' && this.userId !== '' && this.userId !== null) {
          this.error = '';
          if (this.addStartDate !== '' && this.addStartDate !== undefined && this.addStartDate !== null) {
            this.error = '';
            if (this.addEndDate !== '' && this.addEndDate !== undefined && this.addEndDate !== null) {
              this.error = '';
              if (moment(this.addStartDate).format('YYYY-MM-DD HH:mm') < moment(this.addEndDate).format('YYYY-MM-DD HH:mm')) {
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
                this.errorstartdate = this.addStartDate;
                this.errorenddate = this.addEndDate;
                const checkdate = moment(this.currentutc).add(this.advancedReservationWindowInDays2, 'days');
                /** ----- Convert prefered time zone to utc format start----- */
                if (this.utctimezonestring.charAt(0) === '-') {
                  const utctime = this.utctimezone.split('-');
                  const utctimesplit = utctime[1].split(':');
                  this.addStartDate = moment(this.addStartDate).add(utctimesplit[0], 'hours');
                  this.addStartDate = moment(this.addStartDate).add(utctimesplit[1], 'minutes');
                  this.addEndDate = moment(this.addEndDate).add(utctimesplit[0], 'hours');
                  this.addEndDate = moment(this.addEndDate).add(utctimesplit[1], 'minutes');
                } else {
                  const utctime = this.utctimezone.split('+');
                  const utctimesplit = utctime[1].split(':');
                  this.addStartDate = moment(this.addStartDate).subtract(utctimesplit[0], 'hours');
                  this.addStartDate = moment(this.addStartDate).subtract(utctimesplit[1], 'minutes');
                  this.addEndDate = moment(this.addEndDate).subtract(utctimesplit[0], 'hours');
                  this.addEndDate = moment(this.addEndDate).subtract(utctimesplit[1], 'minutes');
                }
                if (this.maxReservationWindowInHrs1 < this.maxReservationWindowInHrs) {
                  this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs1 * 60;
                } else {
                  this.maxReservationWindowInHrs2 = this.maxReservationWindowInHrs * 60;
                }
                /** ----- Convert prefered time zone to utc format end----- */
                if (moment(this.addStartDate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')
                ) {
                  this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                  this.addStartDate = this.errorstartdate;
                  this.addEndDate = this.errorenddate;
                } else if (moment(this.addEndDate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
                  this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
                  this.addStartDate = this.errorstartdate;
                  this.addEndDate = this.errorenddate;
                } else if (moment(this.addStartDate).format('YYYY-MM-DD HH:mm') > moment(checkdate).format('YYYY-MM-DD HH:mm')) {
                  this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_ADVANCED_RESERVATION_WINDOW_IN_DAYS');
                  this.error = this.error.value + this.fleetCommonName;
                  this.addStartDate = this.errorstartdate;
                  this.addEndDate = this.errorenddate;
                } else if (this.duration > this.maxReservationWindowInHrs2) {
                  this.part1 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE');
                  this.part2 = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_CANNOT_RESERVE_FOR_LONG_DURATION');
                  this.error = this.part1.value + this.fleetCommonName + this.part2.value;
                  this.addStartDate = this.errorstartdate;
                  this.addEndDate = this.errorenddate;
                } else {
                  this.isEnabled = true;
                  this.createdFleetReservation = {
                    'enterprise': {
                      'enterpriseId': this.enterpriseId,
                      'enterpriseName': this.addenterpriseName
                    },
                    'fleetId': this.fleetId,
                    'userId': this.userId,
                    'startDatetime': moment(this.addStartDate).format('YYYY-MM-DD HH:mm'),
                    'duration': advDuration,
                    'endDatetime': moment(this.addEndDate).format('YYYY-MM-DD HH:mm'),
                    'isEnabled': this.isEnabled,
                    'notes': this.notes,
                    'maxActiveReservationsPerUser': this.maxActiveReservationsPerUser
                  };
                  this.singleFleetReservationServices.createFleetReservation(this.createdFleetReservation, this.userToken)
                    .subscribe(data => {
                      this.createModel.hide();
                      this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
                      this.toastr.success(this.toastermessage.value);
                      window.localStorage.setItem('createfleet', 'Create');
                      this.clearmessage();
                    }, error => {
                      this.addStartDate = this.errorstartdate;
                      this.addEndDate = this.errorenddate;
                      switch (JSON.parse(error['_body']).statusCode) {
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
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    }
  }

  /**---- Method for advance search ---*/
  advancedFleetReservationSubmit(search) {
    this.storage.removeItem('dashbordStartDate');
    this.storage.removeItem('dashbordEndDate');
    this.storage.removeItem('selecteddashboardenterpriseid');
    this.storage.removeItem('schduledStartDate');
    this.storage.removeItem('schduledEndDate');
    this.storage.removeItem('schduledEventTitle');
    this.errorstartdate = this.startdate;
    this.errorenddate = this.enddate;
    if (this.startdate !== '' && this.enddate !== '' && this.startdate > this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.startdate = this.errorstartdate;
      this.enddate = this.errorenddate;
    } else {
      window.localStorage.setItem('advancesearch', 'advancesearch');
      if (this.startdate !== '' && this.startdate !== undefined && this.startdate !== null) {
        if (this.advutctimezonestring.charAt(0) === '-') {
          const utctime = this.advutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).add(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).add(utctimesplit[1], 'minutes');
        } else {
          const utctime = this.advutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.startdate = moment(this.startdate).subtract(utctimesplit[0], 'hours');
          this.startdate = moment(this.startdate).subtract(utctimesplit[1], 'minutes');
        }
        this.startdate = moment(this.startdate).format('YYYY-MM-DD HH:mm');
      }
      if (this.enddate !== '' && this.enddate !== undefined && this.enddate !== null) {
        if (this.advutctimezonestring.charAt(0) === '-') {
          const utctime = this.advutctimezone.split('-');
          const utctimesplit = utctime[1].split(':');
          this.enddate = moment(this.enddate).add(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).add(utctimesplit[1], 'minutes');
        } else {

          const utctime = this.advutctimezone.split('+');
          const utctimesplit = utctime[1].split(':');
          this.enddate = moment(this.enddate).subtract(utctimesplit[0], 'hours');
          this.enddate = moment(this.enddate).subtract(utctimesplit[1], 'minutes');
        }
        this.enddate = moment(this.enddate).format('YYYY-MM-DD HH:mm');
      }
      search.startDatetime = this.startdate;
      search.endDatetime = this.enddate;
      search.reservationStatus = this.status;
      if (this.check === true) {
        search.enterpriseValue = '';
      }
      if (search.enterpriseValue !== '' && search.enterpriseValue !== undefined && search.enterpriseValue !== null) {
        search.enterpriseValue = search.enterpriseValue.trim().replace(/\s\s+/g, ' ');
      }
      if (search.fleetName !== '' && search.fleetName !== undefined && search.fleetName !== null) {
        search.fleetName = search.fleetName.trim().replace(/\s\s+/g, ' ');
      }
      if (search.eventName !== '' && search.eventName !== undefined && search.eventName !== null) {
        search.eventName = search.eventName.trim().replace(/\s\s+/g, ' ');
      }
      if (this.userAccount !== '' && this.userAccount !== undefined && this.userAccount !== null) {
        this.userAccount = this.userAccount.trim().replace(/\s\s+/g, ' ');
        const userAccount = this.userAccount.split(' ');
        search.firstName = userAccount[0];
        search.lastName = userAccount[1];
        if (search.lastName === undefined) {
          search.userAccount = this.userAccount.trim().replace(/\s\s+/g, ' ');
          search.firstName = '';
          search.lastName = '';
        }
      }
      this.search = search;
      this.fleetReservationsService.getFleetReservationAdvSearchResult(this.userToken, search)
        .subscribe(
        allFleetReservationsList => {
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          localStorage.setItem('lcfleetreservations', 'lcfleetreservationsdata');
          localStorage.setItem('lcfleetreservationsdata', JSON.stringify(allFleetReservationsList));
          if (allFleetReservationsList['statusCode'] === '1001') {
            this.advancedModel.hide();
            window.localStorage.setItem('advancesearch', 'search');
            for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
              allFleetReservationsList['result'][i].userDetails = allFleetReservationsList['result'][i].userName.userDetails.firstName +
                ' ' + allFleetReservationsList['result'][i].userName.userDetails.lastName;
              if (allFleetReservationsList['result'][i].endDatetime > this.currentutc) {
                allFleetReservationsList['result'][i].recordstatus = 'active';
                if (allFleetReservationsList['result'][i].startDatetime > this.currentutc) {
                  allFleetReservationsList['result'][i].startdatestatus = 'statdateactive';
                } else {
                  allFleetReservationsList['result'][i].startdatestatus = 'statdateinactive';
                }
              } else {
                allFleetReservationsList['result'][i].recordstatus = 'inactive';
              }
              if (this.utctimezonestring.charAt(0) === '+') {
                const utctime = this.utctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).add(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).add(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).add(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).utc().add(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).add(utctimesplit[1], 'minutes');
                if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
                  allFleetReservationsList['result'][i].checkInDatetime !== null) {
                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).utc().add(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).add(utctimesplit[1], 'minutes');
                }
                if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
                  && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).utc().add(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).add(utctimesplit[1], 'minutes');
                }
              } else {
                const utctime = this.utctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).subtract(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                [i].startDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).subtract(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                [i].endDatetime).format(this.loginUserDateFormat + ' HH:mm');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].createdAt = moment(allFleetReservationsList['result']
                [i].createdAt).subtract(utctimesplit[1], 'minutes');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                allFleetReservationsList['result'][i].updatedAt = moment(allFleetReservationsList['result']
                [i].updatedAt).subtract(utctimesplit[1], 'minutes');
                if (allFleetReservationsList['result'][i].checkInDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkInDatetime !== 'undefined' &&
                  allFleetReservationsList['result'][i].checkInDatetime !== null) {

                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).utc().subtract(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkInDatetime = moment(allFleetReservationsList['result']
                  [i].checkInDatetime).subtract(utctimesplit[1], 'minutes');
                }
                if (allFleetReservationsList['result'][i].checkOutDatetime !== undefined &&
                  allFleetReservationsList['result'][i].checkOutDatetime !== 'undefined'
                  && allFleetReservationsList['result'][i].checkOutDatetime !== null) {
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).utc().subtract(utctimesplit[0], 'hours');
                  allFleetReservationsList['result'][i].checkOutDatetime = moment(allFleetReservationsList['result']
                  [i].checkOutDatetime).subtract(utctimesplit[1], 'minutes');
                }
              }
            }
            this.fleetReservationsDetails = allFleetReservationsList['result'];
          }

        },
        error => {
          if (JSON.parse(error['_body']).statusCode === '9961') {
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
          }
        });
    }
  }

  /**---- Method for guided create submit ----*/
  fleetsCheckSubmit(action) {
    this.fleetsList = [];
    this.error1 = '';
    this.hiddenstartdate = this.reservationstartdate;
    this.hiddenenddate = this.reservationenddate;
    this.fleetsavailability.hiddenselectedhours = this.selectedhours;
    this.fleetsavailability.hiddenselecteddays = this.selecteddays;
    this.fleetsavailability.hiddenselectedduration = this.selectedduration;
    if (this.reservationstartdate != null && this.reservationenddate != null) {
      if (this.advutctimezonestring.charAt(0) === '-') {
        const utctime = this.advutctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.reservationstartdate = moment(this.reservationstartdate).add(utctimesplit[0], 'hours');
        this.reservationstartdate = moment(this.reservationstartdate).add(utctimesplit[1], 'minutes');
        this.reservationenddate = moment(this.reservationenddate).add(utctimesplit[0], 'hours');
        this.reservationenddate = moment(this.reservationenddate).add(utctimesplit[1], 'minutes');
      } else {
        const utctime = this.advutctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.reservationstartdate = moment(this.reservationstartdate).subtract(utctimesplit[0], 'hours');
        this.reservationstartdate = moment(this.reservationstartdate).subtract(utctimesplit[1], 'minutes');
        this.reservationenddate = moment(this.reservationenddate).subtract(utctimesplit[0], 'hours');
        this.reservationenddate = moment(this.reservationenddate).subtract(utctimesplit[1], 'minutes');
      }
    }
    if (this.fleetsavailability.enterpriseNames === '' || this.fleetsavailability.enterpriseNames === undefined
      || this.fleetsavailability.enterpriseNames == null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.fleetsavailability.fleetType === '' || this.fleetsavailability.fleetType === 'select'
      || this.fleetsavailability.fleetType === undefined || this.fleetsavailability.fleetType === null) {
      this.error = this.translateService.get('FLEETS.VALID_NOBLANK_FLEET_TYPE');
      this.error = this.fleetCommonName + this.error.value;
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.reservationstartdate === '' || this.reservationstartdate === undefined || this.reservationstartdate === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.reservationenddate === '' || this.reservationenddate === undefined || this.reservationenddate === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_END_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') < moment(this.currentutc).utc().format('YYYY-MM-DD HH:mm')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm') > this.reservationenddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else if (this.fleetsavailability.country === ''
      || this.fleetsavailability.country === undefined || this.fleetsavailability.country === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
    } else {
      this.error = '';
      const array = [];
      if (action == 'submit') {
        if (this.attributeList) {
          for (let i = 0; i < this.attributeList.length; i++) {
            const itemInputID = <HTMLInputElement>document.getElementById('itemId' + i);
            const itemInputText = <HTMLInputElement>document.getElementById('itemText' + i);
            this.attributeId = parseInt(itemInputID.value, 10);
            this.attributeText = itemInputText.value.trim().replace(/\s\s+/g, ' ');
            array[i] = {
              // 'attribute': this.attributeId,
              'attributeValue': this.attributeText
            };
          }
          this.fleetsavailability.attributes = array;
        }
      }
      this.fleetsavailability.pageName = 'fleetreservations';
      this.fleetsavailability.startdate = moment(this.reservationstartdate).format('YYYY-MM-DD HH:mm');
      this.fleetsavailability.enddate = moment(this.reservationenddate).format('YYYY-MM-DD HH:mm');
      this.reservationstartdate = this.hiddenstartdate;
      this.reservationenddate = this.hiddenenddate;
      this.fleetReservationsService.checkFleetsAvailabity(this.userToken, this.fleetsavailability).subscribe(
        data => {
          this.reservationstartdate = this.hiddenstartdate;
          this.reservationenddate = this.hiddenenddate;
          if (data['statusCode'] === '1001') {
            if (action == 'submit') {
              this.fleetinfo = true;
            } else {
              this.fleetinfo = false;
            }
            this.createModel.hide();
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
        }
      );
    }
  }

  /**--- Method for handle key press ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getFleetReservationSeachList(this.searchstring);
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

  /**--- To export the data ---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advancesearch') === 'search') {
      searchstring = JSON.stringify(this.search);
      window.localStorage.removeItem('advancesearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.fleetReservationsService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /*---- To clear the dat in modal ----*/
  public clearAdvancedModal(): void {
    this.userAccount = '';
    this.search = {};
    this.startdate = '';
    this.enddate = '';
    this.status = '';
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = this.timezoneCode.split('(UTC');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    this.advtimezoneCodes = this.timezoneCode[0].trim();
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.advutctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advutctimezonestring = utcval[0].toString();
    localStorage.removeItem('lcfleetreservationsdata');
    localStorage.removeItem('lcfleetreservations');
    this.gettimeZones();
    this.getstatus();
    this.getFleetReservationsList();
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /**---- Method for hide popup model ----*/
  public hideCreateModal(): void {
    this.createModel.hide();
  }

  /** --- To clear the data ---*/
  public clearFleetsModal(): void {
    this.fleetsList1 = [];
    this.countries = [];
    this.fleetinfo = false;
    this.fleetsavailability = {};
    this.fleetsavailability.enterpriseName = '';
    this.addinfo = false;
    this.selectedent = '';
    if (!this.enterprisesSize) {
      this.getCountries();
    }
    this.fleetsavailability.country = '';
    this.countriesListLength = true;
    this.enterpriseselect = false;
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.singleFleetReservationServices.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterpriseNameslist = data['result'];
            this.fleetsavailability.enterpriseNames = this.enterpriseNameslist[0].enterpriseName;
            this.fleetsavailability.enterPriseId = this.enterpriseNameslist[0]._id;
            this.enterPriseId = this.enterpriseNameslist[0]._id;
            this.getCountriesbyEnterpriseId(this.enterPriseId);
            this.getFleetTypes(this.enterPriseId);
            this.enterprisesSize = true;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
          } else {
            this.enterpriseNameslist = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
    const time = 1000 * 60 * 5;
    const date = new Date();
    this.selecteddays = '0';
    this.selectedhours = '00';
    this.selectedduration = this.defaultDuration;
    this.reservationstartdate = new Date(Math.ceil(date.getTime() / time) * time);
    this.reservationenddate = moment(moment(this.reservationstartdate).minutes((moment(this.reservationstartdate).minutes() +
      Number(this.selectedduration)))).format('YYYY-MM-DD HH:mm');
    this.minDate = new Date();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advtimezoneCodes = this.timezoneCode[0].trim();
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
  }


  /*---- To hide the modal ----*/
  public hideFleetModal(): void {
    this.fleetModel.hide();
  }

  /*---- To hide the advance modal ----*/
  public hideAdvancedModal(): void {
    this.advancedModel.hide();
  }

  /**---- Method for locate ----*/
  locates(locate) {
    this.fleetReservationsService.locates(locate, this.userToken, this.searchterm);
  }

  /**---- Method for locate from guided create ----*/
  singlelocatefleet(locate, singlefleetreservation) {
    if (singlefleetreservation.floorPlanFleetObj !== null && singlefleetreservation.floorPlanFleetObj !== undefined) {
      this.allfleetsService.getBuildingId(this.userToken, singlefleetreservation.floorPlanFleetObj, 'fleet').subscribe(
        builingcode => {
          this.allfleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lcsinglefleet', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              // localStorage.setItem('fmapsettings', JSON.stringify(this.mapSettings));
              window.localStorage.setItem('fcurrentfloorname', builingcode.result.currentFloor)
              const currentFloorName = 'fcurrentfloorname';
              const currentfid = singlefleetreservation._id;
              const cfleetid = singlefleetreservation._id;
              const cufloorId = singlefleetreservation.floorPlanFleetObj;
              this.allfleetsService.singlelocateFleet(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, currentfid, cufloorId, cfleetid, fleetInfo.fleetName);
            });
        }, error => {
          this.fleetsstatus(error);
        });
    } else {
      this.allfleetsService.getFleetInfoByfleetId(this.userToken, singlefleetreservation._id).subscribe(
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
          const currentfid = singlefleetreservation._id;
          const cufloorId = singlefleetreservation.floorPlanFleetObj;
          const buidingName = '';
          this.allfleetsService.singlelocateFleet(locate, this.userToken, fleetInfo['result']._id,
            fleetInfo['result'].floorPlanDetails.floorPlanAvailable,
            currentFloorName, currentfid, cufloorId, singlefleetreservation._id, buidingName);

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
  /**---- Method for single locate ----*/
  singlelocate(locate, singlefleetreservation) {
    if (singlefleetreservation.fleetObj.floorPlanFleetObj !== null && singlefleetreservation.fleetObj.floorPlanFleetObj !== undefined) {
      this.allfleetsService.getBuildingId(this.userToken, singlefleetreservation.fleetObj.floorPlanFleetObj, 'fleet').subscribe(
        builingcode => {
          this.allfleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              localStorage.setItem('lcfleetreservationinfo', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              // window.localStorage.setItem('frmapsettings', JSON.stringify(this.mapSettings));
              localStorage.setItem('frcurrentfloorname', builingcode.result.currentFloor);
              const currentFloorName = 'frcurrentfloorname'; // builingcode.result.currentFloor;
              // const cufloorId = singlefleetreservation.fleetObj.floorPlanFleetObj;
              const currentfregid = singlefleetreservation._id;
              const cfleetid = singlefleetreservation.fleetObj._id;
              this.fleetReservationsService.singlelocateFleetReservation(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                true, currentFloorName, currentfregid, singlefleetreservation.fleetObj.floorPlanFleetObj, cfleetid, fleetInfo.fleetName);
            });
        }, error => {
          this.fleetsFeservationStatus(error);
        });
    } else {
      this.fleetReservationsService.getFleetReservationInfoById(this.userToken, singlefleetreservation._id).subscribe(
        fleetReservationInfo => {
          const features = fleetReservationInfo['result'];
          let address = fleetReservationInfo['result']['fleetAddress'];
          if (address !== undefined) {
            let address1 = address.addressLine1 + ', ' + address.addressLine2 + ', ' + address.city + ', '
              + address.state + ', ' + address.ZIP + ', ' + address.country;
            fleetReservationInfo['result']['fleetAddress'] = address1;
          }
          if (fleetReservationInfo['result'].reserveStartDatetime && fleetReservationInfo['result'].reserveEndDatetime) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');

              fleetReservationInfo['result'].reserveStartDatetime = moment(fleetReservationInfo['result'].reserveStartDatetime).utc()
                .add(utctimesplit[0], 'hours');
              fleetReservationInfo['result'].reserveStartDatetime = moment(fleetReservationInfo['result'].reserveStartDatetime)
                .add(utctimesplit[1], 'minutes');
              fleetReservationInfo['result'].reserveEndDatetime = moment(fleetReservationInfo['result'].reserveEndDatetime).utc()
                .add(utctimesplit[0], 'hours');
              fleetReservationInfo['result'].reserveEndDatetime = moment(fleetReservationInfo['result'].reserveEndDatetime)
                .add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              fleetReservationInfo['result'].reserveStartDatetime = moment(fleetReservationInfo['result'].reserveStartDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              fleetReservationInfo['result'].reserveStartDatetime = moment(fleetReservationInfo['result'].reserveStartDatetime)
                .subtract(utctimesplit[1], 'minutes');
              fleetReservationInfo['result'].reserveEndDatetime = moment(fleetReservationInfo['result'].reserveEndDatetime).utc()
                .subtract(utctimesplit[0], 'hours');
              fleetReservationInfo['result'].reserveEndDatetime = moment(fleetReservationInfo['result'].reserveEndDatetime)
                .subtract(utctimesplit[1], 'minutes');
            }

            fleetReservationInfo['result'].reserveStartDatetime = moment(fleetReservationInfo['result'].reserveStartDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
            fleetReservationInfo['result'].reserveEndDatetime = moment(fleetReservationInfo['result'].reserveEndDatetime)
              .format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCodes;
          }
          localStorage.setItem('lcfleetreservationinfo', JSON.stringify(fleetReservationInfo['result']));
          localStorage.setItem('apiendpoint', this.apiEndPoint);
          const currentFloorName = null;
          const currentfregid = singlefleetreservation._id;
          const cfleetid = null;
          const buidingName = null;
          this.fleetReservationsService.singlelocateFleetReservation(locate, this.userToken, fleetReservationInfo['result']._id,
            false, currentFloorName, currentfregid,
            singlefleetreservation.fleetObj.floorPlanFleetObj, cfleetid, buidingName);
        }, error => {
          this.fleetsFeservationStatus(error);
        });
    }
  }
  fleetsFeservationStatus(error) {
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

export class FleetReservationsModel {
  public _id: string;
  public fleetType: string;
  public attributeName: string;
  public attributeDescription: string;
  public attributeType: string;
  public lookupType: string;
  public isMandatory: string;
  public sequenceOrder: number;
  public isDeleted: string;
  public isEnabled: string;
  public createdBy: string;
  public createdAt: Date;
  public updatedBy: string;
  public updatedAt: Date;
}
export class MenuItem {
}
