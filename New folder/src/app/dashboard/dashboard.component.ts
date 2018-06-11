import { Component, OnInit, Inject, ViewChild, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Dashboardservice } from './dashboard.service';
import { TranslateService } from 'ng2-translate';
import { FleetService } from './../enterprises/fleets/fleetpopup/fleet.service';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';
@Component({
  templateUrl: 'dashboard.component.html',
  providers: [Dashboardservice, FleetService]
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  public isRequesting: boolean;
  ltwobject: any;
  startDate: any;
  endDate: any;
  data: any;
  userToken: any;
  countries: any[];
  countrycounts: any[];
  options: any;
  colors: any[];
  dynamicoptions: any;
  legenddisplay: any;
  userpreferedtimezone: any;
  utctimezone: any;
  timezoneCodes: any;
  minDate: Date;

  fleetdata: any;
  fleetbycountryNames: any[];
  fleetbycountryCounts: any[];
  fleetoptions: any;
  fleetcolors: any[];

  eventdata: any;
  eventbycountryNames: any[];
  eventbycountryCounts: any[];
  eventoptions: any;
  eventcolors: any[];

  fleetreservationdata: any;
  fleetreservationbycountryNames: any[];
  fleetreservationbycountryCounts: any[];
  fleetreservationoptions: any;
  fleetreservationcolors: any[];

  usersdata: any;
  usersbycountryNames: any[];
  usersbycountryCounts: any[];
  usersoptions: any;
  userscolors: any[];

  monthLinedata: any;
  yearLineData: any;
  yearBarData: any;
  lifeLineData: any;
  lifeBarData: any;
  monthData: any;
  monthlyData: any;
  monthBardata: any;
  monthData1: any;
  monthData2: any;
  yearData: any;
  yearData1: any;
  yearData2: any;
  lifeTimeData: any;
  lifeTimeData1: any;
  lifeTimeData2: any;
  display = false;
  enterprisesSize: any;
  enterpriselist: any[];
  toastermessage: any;
  storage: Storage = window.localStorage;
  value: any;
  selectedenterpriseId: any;
  fleetsdisplay = false;
  eventsdisplay = false;
  fleetreservationdisplay = false;
  usersdisplay = false;
  data1: any;
  data2: any;
  totalfleetsmnth: any[];
  fleetsyearlyactive: any[];
  fleetsyearlyinactive: any[];
  totalyearlyfleets: any[];
  fleetslifeactive: any[];
  fleetslifeinactive: any[];
  totallifefleets: any[];
  mnth: any = [];
  year: any;
  day: any = '';
  enterprisesNames: any;
  enterprisesName: any;
  mnth1: any = [];
  date: any = [];
  msgs: any = [];
  monthsarray: any[];
  days: any[];
  monthdays: any[];
  yeardate: any[];
  ltddate: any[];
  weekslabel: any[];
  // Pie chart
  subheader: any;
  enterpriseresourceheader: any;
  fleetsheader: any;
  eventsheader: any;
  fleetreservationheader: any;
  usersheader: any;
  piechartmainheader: any;
  mainheader: any;
  enterpriseresourcesdata: any;
  dynamicgraphdata: any;
  dynamictype: any;
  fleetCommonName: any;
  fleetsCommonName: any;
  userrole: any;
  enterpriseId: any;
  enterpriseIcon: any;
  fleettypelist: any[];
  attributeFleettype: any;
  fleetValues: any;
  fleetNameList = [];
  advuserpreferedtimezone: any;
  advutctimezonestring: any;
  advutctimezone: any;
  timeZones: any;
  eventreg: any;
  enterprisevalue: any;
  startdate: any;
  enddate: any;
  dashboardDetails: any;
  enterpriseName: any;
  utctimezonestring: any;
  errorstartdate: any;
  errorenddate: any;
  dasboardadv: any;
  error: any;
  @ViewChild('mgModal') public advancedModel: ModalDirective;
  @ViewChild('dashboardModal') public dashboardModal: ModalDirective;

  // fleetusage
  fleetUsageHeader: any;
  fleetUsageYTD: any;
  fleetUsageYTDLine: any;
  fleetUsageLTD: any;
  fleetUsageLTDLine: any;
  fleetUsageLTW: any;
  fleetUsageLTWLine: any;
  fleetUsageMTD: any;
  fleetUsageMTDLine: any;
  fleetUsageMTDoptions: any;

  // user activity
  userActivityHeader: any;
  userActivityYTDLine: any;
  userActivityYTD: any;
  userActivityMTD: any;
  userActivityLineMTD: any;
  userActivityLineLTD: any;
  userActivityLTD: any;
  userActivityLineLTW: any;
  userActivityLTW: any;

  // Fleet Reservable Hours Total
  fleetReservableHoursTotalHeader: any;
  fleetReservableHoursTotalMTDArray: any[];
  fleetReservableHoursTotalMTD: any;
  fleetReservableHoursTotalMTDLine: any;
  fleetReservableHoursTotalYTDArray: any[];
  fleetReservableHoursTotalYTD: any;
  fleetReservableHoursTotalYTDLine: any;
  fleetReservableHoursTotalLTDArray: any[];
  fleetReservableHoursTotalLTD: any;
  fleetReservableHoursTotalLTDLine: any;
  fleetReservableHoursTotalLTWArray: any[];
  fleetReservableHoursTotalLTW: any;
  fleetReservableHoursTotalLTWLine: any;
  fleethourstotalreservable: any;

  // Fleet Reserved Hours Total
  fleetReservedHoursTotalMTDArray: any[];
  fleetReservedHoursTotalMTD: any;
  fleetReservedHoursTotalMTDLine: any;
  fleetReservedHoursTotalYTDArray: any[];
  fleetReservedHoursTotalYTD: any;
  fleetReservedHoursTotalYTDLine: any;
  fleetReservedHoursTotalLTDArray: any[];
  fleetReservedHoursTotalLTD: any;
  fleetReservedHoursTotalLTDLine: any;
  fleetReservedHoursTotalLTWArray: any[];
  fleetReservedHoursTotalLTW: any;
  fleetReservedHoursTotalLTWLine: any;
  fleetReservedHoursTotalHeader: any;

  // Fleet Reserved Hours Average Per Fleet
  fleetReservedHoursAveragePerFleetMTDArray: any[];
  fleetReservedHoursAveragePerFleetYTDArray: any[];
  fleetReservedHoursAveragePerFleetLTDArray: any[];
  fleetReservedHoursAveragePerFleetLTWArray: any[];
  fleetReservedHoursAveragePerFleetMTD: any;
  fleetReservedHoursAveragePerFleetMTDLine: any;
  fleetReservedHoursAveragePerFleetYTD: any;
  fleetReservedHoursAveragePerFleetYTDLine: any;
  fleetReservedHoursAveragePerFleetLTD: any;
  fleetReservedHoursAveragePerFleetLTDLine: any;
  fleetReservedHoursAveragePerFleetLTW: any;
  fleetReservedHoursAveragePerFleetLTWLine: any;
  fleetReservedHoursAveragePerFleetHeader: any;

  // User Hours Total Potential Active
  userHoursTotalPotentialActiveLTD: any;
  userHoursTotalPotentialActiveLTW: any;
  userHoursTotalPotentialActiveMTD: any;
  userHoursTotalPotentialActiveYTD: any;
  userHoursTotalPotentialActiveLTDLine: any;
  userHoursTotalPotentialActiveLTWLine: any;
  userHoursTotalPotentialActiveMTDLine: any;
  userHoursTotalPotentialActiveYTDLine: any;
  userHoursTotalPotentialActiveLTDArray: any;
  userHoursTotalPotentialActiveLTWArray: any;
  userHoursTotalPotentialActiveMTDArray: any;
  userHoursTotalPotentialActiveYTDArray: any;
  userHoursTotalPotentialHeader: any;
  userhourstotalpotential: any;

  // user hours-total actual
  userhourstotalactual: any;
  userHoursActualUnproductiveYTDArray: any[];
  userHoursActualProductiveYTDArray: any[];
  userHoursActualUnproductiveMTDArray: any[];
  userHoursActualProductiveMTDArray: any[];
  userHoursActualUnproductiveLTDArray: any[];
  userHoursActualProductiveLTDArray: any[];
  userHoursActualUnproductiveLTWArray: any[];
  userHoursActualProductiveLTWArray: any[];
  userHoursTotalActual: any;
  userhoursactualaverageperuser: any;

  // Fleet Reservations Total
  fleetReservationsTotalMTDArray: any[];
  fleetReservationsTotalMTD: any;
  fleetReservationsTotalMTDLine: any;
  fleetReservationsTotalYTDArray: any[];
  fleetReservationsTotalYTD: any;
  fleetReservationsTotalYTDLine: any;
  fleetReservationsTotalLTDArray: any[];
  fleetReservationsTotalLTD: any;
  fleetReservationsTotalLTDLine: any;
  fleetReservationsTotalLTWArray: any[];
  fleetReservationsTotalLTW: any;
  fleetReservationsTotalLTWLine: any;
  fleetReservationsTotalHeader: any;
  fleetreservationsall: any;

  // Fleet Reservations Average Per Fleet
  fleetReservationsAveragePerFleetLTD: any;
  fleetReservationsAveragePerFleetLTW: any;
  fleetReservationsAveragePerFleetMTD: any;
  fleetReservationsAveragePerFleetYTD: any;
  fleetReservationsAveragePerFleetLTDLine: any;
  fleetReservationsAveragePerFleetLTWLine: any;
  fleetReservationsAveragePerFleetMTDLine: any;
  fleetReservationsAveragePerFleetYTDLine: any;
  fleetReservationsAveragePerFleetLTDArray: any[];
  fleetReservationsAveragePerFleetLTWArray: any[];
  fleetReservationsAveragePerFleetMTDArray: any[];
  fleetReservationsAveragePerFleetYTDArray: any[];
  fleetReservationsAveragePerFleetHeader: any;
  fleetreservationsaverageperfleet: any;

  // Event Registrations Total
  eventRegistrationsTotalMTDArray: any[];
  eventRegistrationsTotalMTD: any;
  eventRegistrationsTotalMTDLine: any;
  eventRegistrationsTotalYTDArray: any[];
  eventRegistrationsTotalYTD: any;
  eventRegistrationsTotalYTDLine: any;
  eventRegistrationsTotalLTDArray: any[];
  eventRegistrationsTotalLTD: any;
  eventRegistrationsTotalLTDLine: any;
  eventRegistrationsTotalLabel: any;
  eventRegistrationsTotalLTWArray: any[];
  eventRegistrationsTotalLTW: any;
  eventRegistrationsTotalLTWLine: any;
  eventRegistrationsTotalHeader: any;
  eventregistrationsall: any;


  // Event Registrations Average Per Event
  eventRegistrationsAveragePerEventLTD: any;
  eventRegistrationsAveragePerEventLTW: any;
  eventRegistrationsAveragePerEventMTD: any;
  eventRegistrationsAveragePerEventYTD: any;
  eventRegistrationsAveragePerEventLTDLine: any;
  eventRegistrationsAveragePerEventLTWLine: any;
  eventRegistrationsAveragePerEventMTDLine: any;
  eventRegistrationsAveragePerEventYTDLine: any;
  eventRegistrationsAveragePerEventLTDArray: any;
  eventRegistrationsAveragePerEventLTWArray: any;
  eventRegistrationsAveragePerEventMTDArray: any;
  eventRegistrationsAveragePerEventYTDArray: any;
  eventRegistrationsAveragePerEventHeader: any;
  eventregistrationsaverageperevent: any;

  // Event Registrations Average PerFleet
  eventRegistrationsAveragePerFleetMTDArray: any[];
  eventRegistrationsAveragePerFleetMTD: any;
  eventRegistrationsAveragePerFleetMTDLine: any;
  eventRegistrationsAveragePerFleetYTDArray: any[];
  eventRegistrationsAveragePerFleetYTD: any;
  eventRegistrationsAveragePerFleetYTDLine: any;
  eventRegistrationsAveragePerFleetLTDArray: any[];
  eventRegistrationsAveragePerFleetLTD: any;
  eventRegistrationsAveragePerFleetLTDLine: any;
  eventRegistrationsAveragePerFleetLTWArray: any[];
  eventRegistrationsAveragePerFleetLTW: any;
  eventRegistrationsAveragePerFleetLTWLine: any;
  eventRegistrationsAveragePerFleetHeader: any;
  eventregistrationsaverageperfleet: any;

  // Events Total
  eventsTotalMTDArray: any[];
  eventsTotalMTD: any;
  eventsTotalMTDLine: any;
  eventsTotalYTDArray: any[];
  eventsTotalYTD: any;
  eventsTotalYTDLine: any;
  eventsTotalLTDArray: any[];
  eventsTotalLTD: any;
  eventsTotalLTDLine: any;
  eventsTotalLTWArray: any[];
  eventsTotalLTW: any;
  eventsTotalLTWLine: any;
  eventsTotalHeader: any;
  eventsall: any;

  // Events Average PerFleet
  eventsAveragePerFleetHeader: any;
  eventsaverageperfleet: any;
  eventsAveragePerFleetMTDArray: any[];
  eventsAveragePerFleetMTD: any;
  eventsAveragePerFleetMTDLine: any;
  eventsAveragePerFleetYTDArray: any[];
  eventsAveragePerFleetYTD: any;
  eventsAveragePerFleetYTDLine: any;
  eventsAveragePerFleetLTDArray: any[];
  eventsAveragePerFleetLTD: any;
  eventsAveragePerFleetLTDLine: any;
  eventsAveragePerFleetLTWArray: any[];
  eventsAveragePerFleetLTW: any;
  eventsAveragePerFleetLTWLine: any;

  // Fleets Total All
  fleetsTotalAllMTDArray: any[];
  fleetsTotalAllMTD: any;
  fleetsTotalAllMTDLine: any;
  fleetsTotalAllYTDArray: any[];
  fleetsTotalAllYTD: any;
  fleetsTotalAllYTDLine: any;
  fleetsTotalAllLTDArray: any[];
  fleetsTotalAllLTD: any;
  fleetsTotalAllLTDLine: any;
  fleetsTotalAllLTWArray: any[];
  fleetsTotalAllLTW: any;
  fleetsTotalAllLTWLine: any;
  fleetsTotalAllHeader: any;
  fleetsall: any;

  // Fleets Total Active
  fleetsTotalActiveMTDArray: any[];
  fleetsTotalActiveMTD: any;
  fleetsTotalActiveMTDLine: any;
  fleetsTotalActiveYTDArray: any[];
  fleetsTotalActiveYTD: any;
  fleetsTotalActiveYTDLine: any;
  fleetsTotalActiveLTDArray: any[];
  fleetsTotalActiveLTD: any;
  fleetsTotalActiveLTDLine: any;
  fleetsTotalActiveLTWArray: any[];
  fleetsTotalActiveLTW: any;
  fleetsTotalActiveLTWLine: any;
  fleetsTotalActiveHeader: any;
  fleetstotalactive: any;

  // Fleets Total InActive
  fleetsTotalInactiveMTDArray: any[];
  fleetsTotalInactiveMTD: any;
  fleetsTotalInactiveMTDLine: any;
  fleetsTotalInactiveYTDArray: any[];
  fleetsTotalInactiveYTD: any;
  fleetsTotalInactiveYTDLine: any;
  fleetsTotalInactiveLTDArray: any[];
  fleetsTotalInactiveLTD: any;
  fleetsTotalInactiveLTDLine: any;
  fleetsTotalInactiveLTWArray: any[];
  fleetsTotalInactiveLTW: any;
  fleetsTotalInactiveLTWLine: any;
  fleetsTotalInactiveHeader: any;
  fleetstotalinactive: any;

  // Fleets Total NonTransactable
  fleetsTotalNonTransactableMTDArray: any[];
  fleetsTotalNonTransactableYTDArray: any[];
  fleetsTotalNonTransactableLTDArray: any[];
  fleetsTotalNonTransactableLTWArray: any[];
  fleetsTotalNonTransactableLTW: any;
  fleetsTotalNonTransactableLTD: any;
  fleetsTotalNonTransactableMTD: any;
  fleetsTotalNonTransactableYTD: any;
  fleetsTotalNonTransactableMTDLine: any;
  fleetsTotalNonTransactableYTDLine: any;
  fleetsTotalNonTransactableLTDLine: any;
  fleetsTotalNonTransactableLTWLine: any;
  fleetsTotalNonTransactableHeader: any;
  fleetstotalnontransactable: any;

  // Fleets Total Transactable
  fleetsTotalTransactableMTDArray: any[];
  fleetsTotalTransactableYTDArray: any[];
  fleetsTotalTransactableLTDArray: any[];
  fleetsTotalTransactableLTWArray: any[];
  fleetsTotalTransactableLTW: any;
  fleetsTotalTransactableLTD: any;
  fleetsTotalTransactableMTD: any;
  fleetsTotalTransactableMTDLine: any;
  fleetsTotalTransactableYTD: any;
  fleetsTotalTransactableYTDLine: any;
  fleetsTotalTransactableLTWLine: any;
  fleetsTotalTransactableLTDLine: any;
  fleetsTotalTransactableHeader: any;
  fleetstotaltransactable: any;

  // Users Total All
  usersTotalAllMTDArray: any[];
  usersTotalAllMTD: any;
  usersTotalAllMTDLine: any;
  usersTotalAllYTDArray: any[];
  usersTotalAllYTD: any;
  usersTotalAllYTDLine: any;
  usersTotalAllLTDArray: any[];
  usersTotalAllLTD: any;
  usersTotalAllLTDLine: any;
  usersTotalAllLTWArray: any[];
  usersTotalAllLTW: any;
  usersTotalAllLTWLine: any;
  usersTotalAllHeader: any;
  usersall: any;

  //  Users Total Active
  usersTotalActiveMTDArray: any[];
  usersTotalActiveMTD: any;
  usersTotalActiveMTDLine: any;
  usersTotalActiveYTDArray: any[];
  usersTotalActiveYTD: any;
  usersTotalActiveYTDLine: any;
  usersTotalActiveLTDArray: any[];
  usersTotalActiveLTD: any;
  usersTotalActiveLTDLine: any;
  usersTotalActiveLTWArray: any[];
  usersTotalActiveLTW: any;
  usersTotalActiveLTWLine: any;
  usersTotalActiveHeader: any;
  userstotalactive: any;

  // Users Total Inactive
  usersTotalInactiveMTDArray: any[];
  usersTotalInactiveMTD: any;
  usersTotalInactiveMTDLine: any;
  usersTotalInactiveYTDArray: any[];
  usersTotalInactiveYTD: any;
  usersTotalInactiveYTDLine: any;
  usersTotalInactiveLTDArray: any[];
  usersTotalInactiveLTD: any;
  usersTotalInactiveLTDLine: any;
  usersTotalInactiveLTWArray: any[];
  usersTotalInactiveLTW: any;
  usersTotalInactiveLTWLine: any;
  usersTotalInactiveHeader: any;
  userstotalinactive: any;

  // Enterprise Resources Total All
  enterpriseResourcesTotalAllMTDArray: any[];
  enterpriseResourcesTotalAllYTDArray: any[];
  enterpriseResourcesTotalAllLTDArray: any[];
  enterpriseResourcesTotalAllLTWArray: any[];
  enterpriseResourceAllMTD: any;
  enterpriseResourceAllMTDLine: any;
  enterpriseresourceAllYTD: any;
  enterpriseresourceAllYTDLine: any;
  enterpriseAllResourceLTD: any;
  enterpriseAllResourceLTDLine: any;
  enterpriseAllResourceLTW: any;
  enterpriseAllResourceLTWLine: any;
  enterpriseResourceAllHeader: any;
  enterpriseresourcesallrights: any;

  // Enterprise Resources Total Active
  enterpriseResourcesTotalActiveHeader: any;
  enterpriseResourcesTotalActiveMTDArray: any[];
  enterpriseResourcesTotalActiveMTD: any;
  enterpriseResourcesTotalActiveMTDLine: any;
  enterpriseResourcesTotalActiveYTDArray: any[];
  enterpriseResourcesTotalActiveYTD: any;
  enterpriseResourcesTotalActiveYTDLine: any;
  enterpriseResourcesTotalActiveLTDArray: any[];
  enterpriseResourcesTotalActiveLTD: any;
  enterpriseResourcesTotalActiveLTDLine: any;
  enterpriseResourcesTotalActiveLTWArray: any[];
  enterpriseResourcesTotalActiveLTW: any;
  enterpriseResourcesTotalActiveLTWLine: any;
  enterpriseresourcestotalactive: any;

  // Enterprise Resources Total InActive
  enterpriseResourcesTotalInactiveMTDArray: any[];
  enterpriseResourcesTotalInactiveMTD: any;
  enterpriseResourcesTotalInactiveMTDLine: any;
  enterpriseResourcesTotalInactiveYTDArray: any[];
  enterpriseResourcesTotalInactiveYTD: any;
  enterpriseResourcesTotalInactiveYTDLine: any;
  enterpriseResourcesTotalInactiveLTDArray: any[];
  enterpriseResourcesTotalInactiveLTWArray: any[];
  enterpriseResourcesTotalInactiveLTW: any;
  enterpriseResourcesTotalInactiveLTWLine: any;
  enterpriseResourcesTotalInactiveLTD: any;
  enterpriseResourcesTotalInactiveLTDLine: any;
  enterpriseResourcesTotalInactiveHeader: any;
  enterpriseresourcestotalinactive: any;


  months: any;
  month: any;
  userHoursInactiveYTDArray: any[];
  userHoursInactiveMTDArray: any[];
  userHoursInactiveLTDArray: any[];
  userHoursInactiveLTWArray: any[];
  // User Hours Average Per User
  userHoursAveragePerUserMTDArray: any[];
  userHoursAveragePerUserYTDArray: any[];
  userHoursAveragePerUserLTDArray: any[];
  userHoursAveragePerUserLTWArray: any[];
  userHoursAveragePerUserMTD: any;
  userHoursAveragePerUserYTD: any;
  userHoursAveragePerUserLTD: any;
  userHoursAveragePerUserLTW: any;
  userHoursAveragePerUserMTDLine: any;
  userHoursAveragePerUserYTDLine: any;
  userHoursAveragePerUserLTDLine: any;
  userHoursAveragePerUserLTWLine: any;
  userHoursAveragePerUserHeader: any;
  // User Hours Total Active
  userHoursTotalActiveMTDArray: any[];
  userHoursTotalActiveMTD: any;
  userHoursTotalActiveMTDLine: any;
  userHoursTotalActiveYTDArray: any[];
  userHoursTotalActiveYTD: any;
  userHoursTotalActiveYTDLine: any;
  userHoursTotalActiveLTDArray: any[];
  userHoursTotalActiveLTD: any;
  userHoursTotalActiveLTWArray: any[];
  userHoursTotalActiveLTW: any;
  userHoursTotalActiveLTWLine: any;
  userHoursTotalActiveLTDLine: any;
  fleetHoursUsedTransactableMTDArray: any[];
  fleetHoursUnusedTransactableMTDArray: any[];
  unfleetHoursUsableTransactableMTDArray: any[];
  fleetHoursUsedTransactableYTDArray: any[];
  fleetHoursUnusedTransactableYTDArray: any[];
  unfleetHoursUsableTransactableYTD: any[];
  fleetHoursUsedTransactableLTDArray: any[];
  fleetHoursUnusedTransactableLTDArray: any[];
  unfleetHoursUsableTransactableLTDArray: any[];
  fleetHoursUsedTransactableLTWArray: any[];
  fleetHoursUnusedTransactableLTWArray: any[];
  unfleetHoursUsableTransactableLTWArray: any[];
  enterpriseIconFilePath: any; // Image icon
  // Enlarge
  commonHeaderMTD: any;
  commonHeaderYTD: any;
  commonHeaderLTD: any;
  commonHeaderLTW: any;
  show: any;
  ltdObj: any;
  mtdObj: any;
  ytdobject: any;
  loginUserDateFormat: any;

  fleethoursaveragereservedperfleet: any;
  fleethourstotalreserved: any;
  fleetusage: any;
  piechartsbycountry: any;
  useractivity: any;

  constructor(private dashboardService: Dashboardservice, private translateService: TranslateService,
    public toastr: ToastsManager,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    private singleEnterpriseService: FleetService,
    private router: Router) {
      this.isRequesting = true;
    }
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.userToken = window.localStorage.getItem('token');
    this.piechartmainheader = 'DASHBOARD.PIE_CHARTS_BY_COUNTRY';
    this.eventsAveragePerFleetHeader = 'DASHBOARD.EVENTS_AVERAGES';
    this.eventRegistrationsAveragePerFleetHeader = 'DASHBOARD.EVENT_REGISTRATIONS_PER_FLEET_AVERAGES';
    this.commonHeaderMTD = 'DASHBOARD.MTD';
    this.commonHeaderYTD = 'DASHBOARD.YTD';
    this.commonHeaderLTD = 'DASHBOARD.LTD-25M';
    this.commonHeaderLTW = 'DASHBOARD.LTD-25W';
    this.fleetReservedHoursAveragePerFleetHeader = 'DASHBOARD.FLEET_HOURS_RESERVED_AVERAGES';
    this.userHoursAveragePerUserHeader = 'DASHBOARD.USER_HOURS_ACTUAL_AVERAGES';
    this.fleetReservationsAveragePerFleetHeader = 'DASHBOARD.FLEET_RESERVATIONS_AVERAGES';
    this.eventRegistrationsAveragePerEventHeader = 'DASHBOARD.EVENT_REGISTRATIONS_PER_EVENT_AVERAGES';
    this.userActivityHeader = 'DASHBOARD.USER_ACTIVITY';
    this.fleetUsageHeader = 'DASHBOARD.FLEET_USAGE';
    this.enterpriseResourcesTotalActiveHeader = 'DASHBOARD.ENTERPRISE_RESOURCES_ACTIVE_COUNTS';
    this.fleetReservableHoursTotalHeader = 'DASHBOARD.FLEET_HOURS_RESERVABLE_COUNTS';
    this.fleetReservedHoursTotalHeader = 'DASHBOARD.FLEET_HOURS_RESERVED_COUNTS';
    this.userHoursTotalPotentialHeader = 'DASHBOARD.USER_HOURS_POTENTIAL_COUNTS';
    this.userHoursTotalActual = 'DASHBOARD.USER_HOURS_ACTUAL_COUNTS';
    this.fleetReservationsTotalHeader = 'DASHBOARD.FLEET_RESERVATIONS_COUNTS';
    this.eventRegistrationsTotalHeader = 'DASHBOARD.EVENT_REGISTRATIONS_COUNTS';
    this.eventsTotalHeader = 'DASHBOARD.EVENTS_COUNTS';
    this.fleetsTotalAllHeader = 'DASHBOARD.FLEETS_TOTAL_COUNTS';
    this.fleetsTotalActiveHeader = 'DASHBOARD.FLEETS_ACTIVE_COUNTS';
    this.fleetsTotalInactiveHeader = 'DASHBOARD.FLEETS_INACTIVE_COUNTS';
    this.fleetsTotalNonTransactableHeader = 'DASHBOARD.FLEETS_NONTRANSACTABLE_COUNTS';
    this.fleetsTotalTransactableHeader = 'DASHBOARD.FLEETS_TRANSACTABLE_COUNTS';
    this.usersTotalAllHeader = 'DASHBOARD.USERS_TOTAL_COUNTS';
    this.usersTotalActiveHeader = 'DASHBOARD.USERS_ACTIVE_COUNTS';
    this.usersTotalInactiveHeader = 'DASHBOARD.USERS_INACTIVE_COUNTS';
    this.enterpriseResourceAllHeader = 'DASHBOARD.ENTERPRISE_RESOURCES_TOTAL_COUNTS';
    this.enterpriseResourcesTotalInactiveHeader = 'DASHBOARD.ENTERPRISE_RESOURCES_INACTIVE_COUNTS';
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.getEnterpriseResourceCountryAndCount();
    this.getFleetByCountryAndCount();
    this.getEventsCountryAndCount();
    this.getFleetReservationCountryAndCount();
    this.getUsersByCountryAndCount();
    this.getEnterpriseNamesList();
    this.getCommonMTD(); // Get Month to date Information
    // this.getCommonYTD();
    // this.getCommonLTD();
    // this.getCommonLTW();
    this.enterpriseresourcesallrights = window.localStorage.getItem('enterpriseresourcesallrights');
    this.enterpriseresourcestotalactive = window.localStorage.getItem('enterpriseresourcestotalactive');
    this.enterpriseresourcestotalinactive = window.localStorage.getItem('enterpriseresourcestotalinactive');
    this.eventregistrationsall = window.localStorage.getItem('eventregistrationsall');
    this.eventregistrationsaverageperevent = window.localStorage.getItem('eventregistrationsaverageperevent');
    this.eventregistrationsaverageperfleet = window.localStorage.getItem('eventregistrationsaverageperfleet');
    this.eventsaverageperfleet = window.localStorage.getItem('eventsaverageperfleet');
    this.eventsall = window.localStorage.getItem('eventsall');
    this.fleetsall = window.localStorage.getItem('fleetsall');
    this.fleethoursaveragereservedperfleet = window.localStorage.getItem('fleethoursaveragereservedperfleet');
    this.fleethourstotalreservable = window.localStorage.getItem('fleethourstotalreservable');
    this.fleethourstotalreserved = window.localStorage.getItem('fleethourstotalreserved');
    this.fleetreservationsall = window.localStorage.getItem('fleetreservationsall');
    this.fleetreservationsaverageperfleet = window.localStorage.getItem('fleetreservationsaverageperfleet');
    this.fleetstotalactive = window.localStorage.getItem('fleetstotalactive');
    this.fleetstotalinactive = window.localStorage.getItem('fleetstotalinactive');
    this.fleetstotalnontransactable = window.localStorage.getItem('fleetstotalnontransactable');
    this.fleetstotaltransactable = window.localStorage.getItem('fleetstotaltransactable');
    this.fleetusage = window.localStorage.getItem('fleetusage');
    this.piechartsbycountry = window.localStorage.getItem('piechartsbycountry');
    this.useractivity = window.localStorage.getItem('useractivity');
    this.usersall = window.localStorage.getItem('usersall');
    this.userhoursactualaverageperuser = window.localStorage.getItem('userhourshctualaverageperuser');
    this.userhourstotalactual = window.localStorage.getItem('userhourstotalactual');
    this.userhourstotalpotential = window.localStorage.getItem('userhourstotalpotential');
    this.userstotalactive = window.localStorage.getItem('userstotalactive');
    this.userstotalinactive = window.localStorage.getItem('userstotalinactive');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
    this.advuserpreferedtimezone = utcformat[0].trim();
  }
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
  }
  /*---- To get EnterpriseResource based on country   ---*/
  public getEnterpriseResourceCountryAndCount() {
    this.countries = [];
    this.countrycounts = [];
    this.colors = [];
    this.enterpriseresourceheader = 'COMMON_PAGE_TITLES.LIST_ENTERPRISE_RESOURCES';
    this.dashboardService.getEnterpriseResourceCountryAndCount().subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            const ramdomcolors = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.countries.push(data['result'][i]._id.country);
            this.countrycounts.push(data['result'][i].countryCount);
            this.colors.push(ramdomcolors);
          }
          this.enterpriseresourcesdata = {
            labels: this.countries,
            datasets: [
              {
                data: this.countrycounts,
                backgroundColor: this.colors,
                hoverBackgroundColor: this.colors
              }]
          };
          this.options = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
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
            }
            if (statuscode === '9997') {
              this.data = {};
            }
            break;
        }
      }
    );
  }


  /*---- To get Fleets based on country   ---*/
  public getFleetByCountryAndCount() {
    this.fleetbycountryNames = [];
    this.fleetbycountryCounts = [];
    this.fleetcolors = [];
    this.fleetsheader = this.fleetsCommonName;
    this.dashboardService.getFleetByCountryAndCount().subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.fleetbycountryNames.push(data['result'][i]._id.country);
            this.fleetbycountryCounts.push(data['result'][i].countryCount);
            this.fleetcolors.push(hue);
          }
          this.fleetdata = {
            labels: this.fleetbycountryNames,
            datasets: [
              {
                data: this.fleetbycountryCounts,
                backgroundColor: this.fleetcolors,
                hoverBackgroundColor: this.fleetcolors
              }]
          };
          this.fleetoptions = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
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
            }
            if (statuscode === '9997') {
              this.fleetdata = {};
            } break;
        }
      }
    );
  }

  /*---- To get Events based on country   ---*/
  public getEventsCountryAndCount() {
    this.eventbycountryNames = [];
    this.eventbycountryCounts = [];
    this.eventcolors = [];
    this.eventsheader = 'COMMON_PAGE_TITLES.LIST_EVENTS';
    this.dashboardService.getEventsByCountryAndCount().subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.eventbycountryNames.push(data['result'][i]._id.country);
            this.eventbycountryCounts.push(data['result'][i].countryCount);
            this.eventcolors.push(hue);
          }
          this.eventdata = {
            labels: this.eventbycountryNames,
            datasets: [
              {
                data: this.eventbycountryCounts,
                backgroundColor: this.eventcolors,
                hoverBackgroundColor: this.eventcolors
              }]
          };
          this.eventoptions = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
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
            }
            if (statuscode === '9997') {
              this.eventdata = {};
            }
            break;
        }
      }
    );
  }

  /*---- To get Fleet Reservation based on country   ---*/
  public getFleetReservationCountryAndCount() {
    this.fleetreservationbycountryNames = [];
    this.fleetreservationbycountryCounts = [];
    this.fleetreservationcolors = [];
    this.fleetreservationheader = 'COMMON_PAGE_TITLES.LIST_FLEET_RESERVATIONS';
    this.dashboardService.getFleetReservationByCountryAndCount().subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.fleetreservationbycountryNames.push(data['result'][i]._id.country);
            this.fleetreservationbycountryCounts.push(data['result'][i].countryCount);
            this.fleetreservationcolors.push(hue);
          }
          this.fleetreservationdata = {
            labels: this.fleetreservationbycountryNames,
            datasets: [
              {
                data: this.fleetreservationbycountryCounts,
                backgroundColor: this.fleetreservationcolors,
                hoverBackgroundColor: this.fleetreservationcolors
              }]
          };
          this.fleetreservationoptions = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
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
            }
            if (statuscode === '9997') {
              this.fleetreservationdata = {};
            }
            break;
        }
      }
    );
  }

  /*---- To get users based on country   ---*/
  public getUsersByCountryAndCount() {
    this.usersbycountryNames = [];
    this.usersbycountryCounts = [];
    this.userscolors = [];
    this.usersheader = 'COMMON_PAGE_TITLES.LIST_USERS';
    this.dashboardService.getUsersByCountryAndCount().subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            const hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ','
              + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            this.usersbycountryNames.push(data['result'][i]._id.country);
            this.usersbycountryCounts.push(data['result'][i].countryCount);
            this.userscolors.push(hue);
          }
          this.usersdata = {
            labels: this.usersbycountryNames,
            datasets: [
              {
                data: this.usersbycountryCounts,
                backgroundColor: this.userscolors,
                hoverBackgroundColor: this.userscolors
              }]
          };
          this.usersoptions = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
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
            }
            if (statuscode === '9997') {
              this.usersdata = {};
            }
            break;
        }
      }
    );
  }
  selectLineData(event) {
    this.msgs = [];
    this.msgs.push({
      severity: 'info', summary: 'Data Selected',
      'detail': this.monthLinedata.datasets[event.element._datasetIndex].data[event.element._index].data[event.element._index]
    });
  }

  showDialog() {
    this.display = true;
  }
  /*---- To get Enterprise Name list   ---*/
  getEnterpriseNamesList() {
    this.userToken = window.localStorage.getItem('token');
    this.singleEnterpriseService.getEnterpriseNamesList(this.userToken)
      .subscribe(
      enterpriseList => {

        if (enterpriseList.statusCode === '1001') {
          if (enterpriseList.result.length === 1) {
            this.enterpriselist = enterpriseList['result'];
            this.enterprisesSize = true;
            const enterpriseid = enterpriseList['result'][0]._id + '$' + enterpriseList['result'][0].enterpriseName + '$' +
              enterpriseList['result'][0].enterpriseIconFilePath + '$' + enterpriseList['result'][0].address.addressLine1 + '$' +
              enterpriseList['result'][0].address.addressLine2 + '$' + enterpriseList['result'][0].address.city + '$' +
              enterpriseList['result'][0].address.country + '$' + enterpriseList['result'][0].address.state + '$' +
              enterpriseList['result'][0].address.geoCoordinates[0] + '$' + enterpriseList['result'][0].address.geoCoordinates[1] + '$' +
              enterpriseList['result'][0].preferences.defaultTimezone + '$' +
              enterpriseList['result'][0].preferences.defaultLanguage + '$' +
              enterpriseList['result'][0].preferences.dateFormat + '$' + enterpriseList['result'][0].preferences.defaultCurrency + '$' +
              enterpriseList['result'][0].preferences.currencyFormat + '$' + enterpriseList['result'][0].preferences.defaultTheme + '$' +
              enterpriseList['result'][0].address.ZIP + '$' + enterpriseList['result'][0].enterpriseIcon
              + '$' + enterpriseList['result'][0].preferences.defaultTheme + '$' + enterpriseList['result'][0].preferences.rowsPerPage +
              '$' + enterpriseList['result'][0].contactDetails.workNumberCountrycode
              + '$' + enterpriseList['result'][0].contactDetails.workNumber +
              '$' + enterpriseList['result'][0].contactDetails.workNumberExtn + '$' + enterpriseList['result'][0].contactDetails.email;
            this.getEnterprisepathById(enterpriseid);
          } else {
            this.enterpriselist = enterpriseList['result'];
            this.enterprisesSize = false;
          }
        }

        this.enterpriselist = enterpriseList['result'];
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
  /** --- To Get enterprise Path List--- */
  getEnterprisepathById(enterprise) {
    if (enterprise !== 'Select') {
      this.value = enterprise.split('$');
      this.selectedenterpriseId = parseInt(this.value[0], 10);
      this.enterpriseIconFilePath = this.value[2] + '/' + this.value[17];
      this.enterprisesName = this.value[1];
      this.getCommonMTD();
      // this.getCommonYTD();
      // this.getCommonLTD();
      // this.getCommonLTW();
    } else {
      this.selectedenterpriseId = '';
      this.getCommonMTD();
      // this.getCommonYTD();
      // this.getCommonLTD();
      // this.getCommonLTW();
    }
    // this.getMonthLineData();
    // this.getLifeTimeLineData();
    // this.getYearLineData();
  }
  showfleetsenlarge() {
    this.fleetsdisplay = true;
  }
  showeventsenlarge() {
    this.eventsdisplay = true;
  }
  showfleetreservationenlarge() {
    this.fleetreservationdisplay = true;
  }
  showusersenlarge() {
    this.usersdisplay = true;
  }

  /*---- code monthly users for bargraph  ---*/
  public getCommonMTD() {
    this.monthdays = [];
    // Events Total
    this.eventsTotalMTDArray = [];
    // Event Registrations Total
    this.eventRegistrationsTotalMTDArray = [];
    // Events Average Per Fleet
    this.eventsAveragePerFleetMTDArray = [];
    // Event Registrations Average Per Fleet
    this.eventRegistrationsAveragePerFleetMTDArray = [];
    // Fleet Reservations Total
    this.fleetReservationsTotalMTDArray = [];
    // Inactive User Hour
    this.userHoursInactiveMTDArray = [];
    // Actual Unproductive User Hours
    this.userHoursActualUnproductiveMTDArray = [];
    // Actual Productive User Hours
    this.userHoursActualProductiveMTDArray = [];
    // Fleet Reserved Hours Average Per Fleet
    this.fleetReservedHoursAveragePerFleetMTDArray = [];
    // User Hours Average Per User
    this.userHoursAveragePerUserMTDArray = [];
    // Fleets Total Transactable
    this.fleetsTotalTransactableMTDArray = [];
    // Fleets Total NonTransactable
    this.fleetsTotalNonTransactableMTDArray = [];
    // User Hours Total Active
    this.userHoursTotalActiveMTDArray = [];
    // Fleet Reservations Average Per Fleet
    this.fleetReservationsAveragePerFleetMTDArray = [];
    // Event Registrations Average Per Event
    this.eventRegistrationsAveragePerEventMTDArray = [];
    // User Hours Total Potential Active
    this.userHoursTotalPotentialActiveMTDArray = [];
    // Users Total All
    this.usersTotalAllMTDArray = [];
    // Fleets Total All
    this.fleetsTotalAllMTDArray = [];
    // Enterprise Resources Total All
    this.enterpriseResourcesTotalAllMTDArray = [];
    // Fleet Usage
    this.fleetHoursUsedTransactableMTDArray = [];
    this.fleetHoursUnusedTransactableMTDArray = [];
    this.unfleetHoursUsableTransactableMTDArray = [];
    // Fleet Reservable Hours Total
    this.fleetReservableHoursTotalMTDArray = [];
    // Users Total Active
    this.usersTotalActiveMTDArray = [];
    //  Users Total Inactive
    this.usersTotalInactiveMTDArray = [];
    // Enterprise Resource Total Active
    this.enterpriseResourcesTotalActiveMTDArray = [];
    // Enterprise Resource Total Inactive
    this.enterpriseResourcesTotalInactiveMTDArray = [];
    // Fleets Total Active
    this.fleetsTotalActiveMTDArray = [];
    // Fleets Total Inactive
    this.fleetsTotalInactiveMTDArray = [];
    // Fleets Reserved Hours Total MTD
    this.fleetReservedHoursTotalMTDArray = [];
    if (this.selectedenterpriseId === undefined || this.selectedenterpriseId === 'undefined' || this.selectedenterpriseId === '') {
      this.selectedenterpriseId = 0;
    }
    this.dashboardService.getMonthLineData(this.selectedenterpriseId).subscribe(
      data => {
        this.isRequesting = false;
        this.getCommonYTD();
        if (data['statusCode'] === '1001') {
          this.mtdObj = data['result'];

          for (let i = 0; i < data['result'].length; i++) {
            this.monthdays.push(data['result'][i]._id.period);
            this.eventsTotalMTDArray.push(data['result'][i].eventsTotal);
            this.eventRegistrationsTotalMTDArray.push(data['result'][i].eventRegistrationsTotal);
            this.eventsAveragePerFleetMTDArray.push(data['result'][i].eventsAveragePerFleet);
            this.eventRegistrationsAveragePerFleetMTDArray.push(data['result'][i].eventRegistrationsAveragePerFleet);
            this.fleetReservationsTotalMTDArray.push(data['result'][i].fleetReservationsTotal);
            this.userHoursInactiveMTDArray.push(data['result'][i].userHoursInactive);
            this.userHoursActualUnproductiveMTDArray.push(data['result'][i].userHoursActualUnproductive);
            this.userHoursActualProductiveMTDArray.push(data['result'][i].userHoursActualProductive);
            this.fleetReservedHoursAveragePerFleetMTDArray.push(data['result'][i].fleetReservedHoursAveragePerFleet);
            this.userHoursAveragePerUserMTDArray.push(data['result'][i].userHoursAveragePerUser);
            this.fleetsTotalTransactableMTDArray.push(data['result'][i].fleetsTotalTransactable);
            this.fleetsTotalNonTransactableMTDArray.push(data['result'][i].fleetsTotalNonTransactable);
            this.userHoursTotalActiveMTDArray.push(data['result'][i].userHoursTotalActive);
            this.fleetReservationsAveragePerFleetMTDArray.push(data['result'][i].fleetReservationsAveragePerFleet);
            this.eventRegistrationsAveragePerEventMTDArray.push(data['result'][i].eventRegistrationsAveragePerEvent);
            this.userHoursTotalPotentialActiveMTDArray.push(data['result'][i].userHoursTotalPotentialActive);
            this.usersTotalAllMTDArray.push(data['result'][i].usersTotalAll);
            this.fleetsTotalAllMTDArray.push(data['result'][i].fleetsTotalAll);
            this.enterpriseResourcesTotalAllMTDArray.push(data['result'][i].enterpriseResourcesTotalAll);
            this.fleetHoursUsedTransactableMTDArray.push(data['result'][i].fleetHoursUsedTransactable);
            this.fleetHoursUnusedTransactableMTDArray.push(data['result'][i].fleetHoursUnusedTransactable);
            this.unfleetHoursUsableTransactableMTDArray.push(data['result'][i].fleetHoursUnusableTransactable);
            this.fleetReservableHoursTotalMTDArray.push(data['result'][i].fleetReservableHoursTotal);
            this.usersTotalActiveMTDArray.push(data['result'][i].usersTotalActive);
            this.usersTotalInactiveMTDArray.push(data['result'][i].usersTotalInactive);
            this.enterpriseResourcesTotalInactiveMTDArray.push(data['result'][i].enterpriseResourcesTotalInactive);
            this.enterpriseResourcesTotalActiveMTDArray.push(data['result'][i].enterpriseResourcesTotalActive);
            this.fleetsTotalActiveMTDArray.push(data['result'][i].fleetsTotalActive);
            this.fleetsTotalInactiveMTDArray.push(data['result'][i].fleetsTotalInactive);
            this.fleetReservedHoursTotalMTDArray.push(data['result'][i].fleetReservedHoursTotal);
          }
          this.legenddisplay = {
            legend: {
              labels: {
                boxWidth: 10,
                fontSize: 11,
                padding: 5,
              },
              display: true,
              position: 'bottom'
            },
            tooltips: {
              titleFontFamily: 'Open Sans'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
          // Fleet Usage MTD
          this.fleetUsageMTD = {
            labels: this.monthdays,
            datasets: [
              {
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                // borderColor: '#9ccc65',
                data: this.unfleetHoursUsableTransactableMTDArray,
                label: 'Unusable'
              },
              {
                backgroundColor: '#009000',
                borderColor: '#009000',
                data: this.fleetHoursUsedTransactableMTDArray,
                label: 'Used'
              },
              {
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                data: this.fleetHoursUnusedTransactableMTDArray,
                label: 'Unused'
              },
            ]
          };
          this.fleetUsageMTDoptions = {
            tooltips: {
              titleFontFamily: 'Open Sans'
            },
            legend: {
              labels: {
                boxWidth: 10,
                fontSize: 11,
                padding: 5,
              },
              display: true
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
          // Fleet Usage MTD Line
          this.fleetUsageMTDLine = {
            labels: this.monthdays,
            datasets: [
              {
                fill: false,
                data: this.unfleetHoursUsableTransactableMTDArray,
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                label: 'Unusable'
              },
              {
                data: this.fleetHoursUsedTransactableMTDArray,
                fill: false,
                backgroundColor: '#009000',
                borderColor: '#009000',
                label: 'Used'
              },
              {
                data: this.fleetHoursUnusedTransactableMTDArray,
                fill: false,
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                label: 'Unused'
              },
            ],
          };
        }
      },
      error => {
        this.getCommonYTD(); // Get year to Date Information
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
            }
            if (statuscode === '9997') {
              this.usersdata = {};
            }
            break;
        }
      }
    );
  }

  /*---- code yearly users for bargraph  ---*/
  public getCommonYTD() {
    // Events Total
    this.eventsTotalYTDArray = [];
    // Event Registrations Total
    this.eventRegistrationsTotalYTDArray = [];
    // Events Average Per Fleet
    this.eventsAveragePerFleetYTDArray = [];
    // Event Registrations Average Per Fleet
    this.eventRegistrationsAveragePerFleetYTDArray = [];
    // Fleet Reservations Total
    this.fleetReservationsTotalYTDArray = [];
    // Actual Unproductive User
    this.userHoursActualUnproductiveYTDArray = [];
    this.userHoursActualProductiveYTDArray = [];
    this.userHoursInactiveYTDArray = [];
    // Fleet Reserved Hours Average Per Fleet
    this.fleetReservedHoursAveragePerFleetYTDArray = [];
    // User Hours Average Per User
    this.userHoursAveragePerUserYTDArray = [];
    // Fleets Total Transactable
    this.fleetsTotalTransactableYTDArray = [];
    // Fleets Total NonTransactable
    this.fleetsTotalNonTransactableYTDArray = [];
    // User Hours Total Active
    this.userHoursTotalActiveYTDArray = [];
    // FleetReservations Average Per Fleet
    this.fleetReservationsAveragePerFleetYTDArray = [];
    // EventRegistrations Average Per Event
    this.eventRegistrationsAveragePerEventYTDArray = [];
    // UserHours Total Potential Active
    this.userHoursTotalPotentialActiveYTDArray = [];
    // Users Total All
    this.usersTotalAllYTDArray = [];
    // Fleets Total All
    this.fleetsTotalAllYTDArray = [];
    // Enterprise Resources Total All
    this.enterpriseResourcesTotalAllYTDArray = [];
    // Fleet Usage
    this.fleetHoursUsedTransactableYTDArray = [];
    this.fleetHoursUnusedTransactableYTDArray = [];
    this.unfleetHoursUsableTransactableYTD = [];
    // Fleet Reservable Hours Total
    this.fleetReservableHoursTotalYTDArray = [];
    // Users Total Active
    this.usersTotalActiveYTDArray = [];
    // Users Total Inactive
    this.usersTotalInactiveYTDArray = [];
    // Enterprise Resources Total Inactive
    this.enterpriseResourcesTotalInactiveYTDArray = [];
    // Enterprise Resources Total Active
    this.enterpriseResourcesTotalActiveYTDArray = [];
    // Fleets Total Active
    this.fleetsTotalActiveYTDArray = [];
    // Fleets Total Inactive
    this.fleetsTotalInactiveYTDArray = [];
    // Fleet Reserved Hours Total
    this.fleetReservedHoursTotalYTDArray = [];
    this.monthsarray = [];
    this.yeardate = [];
    this.dashboardService.getYearLineData(this.selectedenterpriseId).subscribe(
      data => {
        this.getCommonLTD(); // Get life to date (25 Months) Information
        this.ytdobject = data['result'];

        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            this.yeardate.push(data['result'][i]._id.period);
            this.eventsTotalYTDArray.push(data['result'][i].eventsTotal);
            this.eventRegistrationsTotalYTDArray.push(data['result'][i].eventRegistrationsTotal);
            this.eventsAveragePerFleetYTDArray.push(data['result'][i].eventsAveragePerFleet);
            this.eventRegistrationsAveragePerFleetYTDArray.push(data['result'][i].eventRegistrationsAveragePerFleet);
            this.fleetReservationsTotalYTDArray.push(data['result'][i].fleetReservationsTotal);
            this.userHoursActualProductiveYTDArray.push(data['result'][i].userHoursActualProductive);
            this.userHoursActualUnproductiveYTDArray.push(data['result'][i].userHoursActualUnproductive);
            this.userHoursInactiveYTDArray.push(data['result'][i].userHoursInactive);
            this.fleetReservedHoursAveragePerFleetYTDArray.push(data['result'][i].fleetReservedHoursAveragePerFleet);
            this.userHoursAveragePerUserYTDArray.push(data['result'][i].userHoursAveragePerUser);
            this.fleetsTotalTransactableYTDArray.push(data['result'][i].fleetsTotalTransactable);
            this.fleetsTotalNonTransactableYTDArray.push(data['result'][i].fleetsTotalNonTransactable);
            this.userHoursTotalActiveYTDArray.push(data['result'][i].userHoursTotalActive);
            this.fleetReservationsAveragePerFleetYTDArray.push(data['result'][i].fleetReservationsAveragePerFleet);
            this.eventRegistrationsAveragePerEventYTDArray.push(data['result'][i].eventRegistrationsAveragePerEvent);
            this.userHoursTotalPotentialActiveYTDArray.push(data['result'][i].userHoursTotalPotentialActive);
            this.usersTotalAllYTDArray.push(data['result'][i].usersTotalAll);
            this.fleetsTotalAllYTDArray.push(data['result'][i].fleetsTotalAll);
            this.enterpriseResourcesTotalAllYTDArray.push(data['result'][i].enterpriseResourcesTotalAll);
            this.fleetHoursUsedTransactableYTDArray.push(data['result'][i].fleetHoursUsedTransactable);
            this.fleetHoursUnusedTransactableYTDArray.push(data['result'][i].fleetHoursUnusedTransactable);
            this.unfleetHoursUsableTransactableYTD.push(data['result'][i].fleetHoursUnusableTransactable);
            this.fleetReservableHoursTotalYTDArray.push(data['result'][i].fleetReservableHoursTotal);
            this.usersTotalActiveYTDArray.push(data['result'][i].usersTotalActive);
            this.usersTotalInactiveYTDArray.push(data['result'][i].usersTotalInactive);
            this.enterpriseResourcesTotalInactiveYTDArray.push(data['result'][i].enterpriseResourcesTotalInactive);
            this.enterpriseResourcesTotalActiveYTDArray.push(data['result'][i].enterpriseResourcesTotalActive);
            this.fleetsTotalActiveYTDArray.push(data['result'][i].fleetsTotalActive);
            this.fleetsTotalInactiveYTDArray.push(data['result'][i].fleetsTotalInactive);
            this.fleetReservedHoursTotalYTDArray.push(data['result'][i].fleetReservedHoursTotal);
          }
          this.legenddisplay = {
            legend: {
              labels: {
                boxWidth: 10,
                fontSize: 11,
                padding: 5,
              },
              display: true,
              position: 'bottom'
            },
            tooltips: {
              titleFontFamily: 'Open Sans'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
          // Fleet Usage YTD
          this.fleetUsageYTD = {
            labels: this.yeardate,
            datasets: [
              {
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                data: this.unfleetHoursUsableTransactableYTD,
                label: 'Unusable'
              },
              {
                backgroundColor: '#009000',
                borderColor: '#009000',
                data: this.fleetHoursUsedTransactableYTDArray,
                label: 'Used'
              },
              {
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                data: this.fleetHoursUnusedTransactableYTDArray,
                label: 'Unused'
              },
            ]
          };
          // Fleet Usage YTD Line
          this.fleetUsageYTDLine = {
            labels: this.yeardate,
            datasets: [
              {
                data: this.unfleetHoursUsableTransactableYTD,
                borderColor: '#FF0700',
                backgroundColor: '#FF0700',
                label: 'Unusable',
                fill: false,
              },
              {
                data: this.fleetHoursUsedTransactableYTDArray,
                fill: false,
                backgroundColor: '#009000',
                borderColor: '#009000',
                label: 'Used'
              },
              {
                data: this.fleetHoursUnusedTransactableYTDArray,
                fill: false,
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                label: 'Unused'
              },
            ]
          };
          this.options = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
        }
      },
      error => {
        this.getCommonLTD(); // Get life to date (25 Months) Information
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
            }
            if (statuscode === '9997') {
              this.usersdata = {};
            }
            break;
        }
      }
    );
  }

  /*---- code getCommonLTD bargraph  ---*/
  public getCommonLTD() {
    // Events Total
    this.eventsTotalLTDArray = [];
    // Event Registrations Total
    this.eventRegistrationsTotalLTDArray = [];
    // EVents Average Per Fleet LTD
    this.eventsAveragePerFleetLTDArray = [];
    // Event Registrations Average Per Fleet LTD
    this.eventRegistrationsAveragePerFleetLTDArray = [];
    // Fleet Reservations Total LTD
    this.fleetReservationsTotalLTDArray = [];
    // Actual Unproductive User Hours
    this.userHoursActualUnproductiveLTDArray = [];
    this.userHoursActualProductiveLTDArray = [];
    this.userHoursInactiveLTDArray = [];
    // Fleet Reserved Hours Average Per Fleet
    this.fleetReservedHoursAveragePerFleetLTDArray = [];
    // User Hours Average Per User
    this.userHoursAveragePerUserLTDArray = [];
    // Fleets Total Transactable
    this.fleetsTotalTransactableLTDArray = [];
    // Fleets Total NonTransactable
    this.fleetsTotalNonTransactableLTDArray = [];
    // User Hours Total Active LTD
    this.userHoursTotalActiveLTDArray = [];
    // Fleet Reservations Average Per Fleet LTD
    this.fleetReservationsAveragePerFleetLTDArray = [];
    // Event Registrations Average Per Event LTD
    this.eventRegistrationsAveragePerEventLTDArray = [];
    // User Hours Total Potential Active LTD
    this.userHoursTotalPotentialActiveLTDArray = [];
    // Users Total All
    this.usersTotalAllLTDArray = [];
    // Fleets Total All
    this.fleetsTotalAllLTDArray = [];
    // Enterprise Resources Total All
    this.enterpriseResourcesTotalAllLTDArray = [];
    // Fleet Usage
    this.fleetHoursUsedTransactableLTDArray = [];
    this.fleetHoursUnusedTransactableLTDArray = [];
    this.unfleetHoursUsableTransactableLTDArray = [];
    // Fleet Reservable Hours Total
    this.fleetReservableHoursTotalLTDArray = [];
    // Users Total Active
    this.usersTotalActiveLTDArray = [];
    // Users Total Inactive
    this.usersTotalInactiveLTDArray = [];
    // Enterprise Resource Total Active
    this.enterpriseResourcesTotalActiveLTDArray = [];
    // Enterprise Resources Total Inactive
    this.enterpriseResourcesTotalInactiveLTDArray = [];
    // Fleets Total Active
    this.fleetsTotalActiveLTDArray = [];
    // Fleets Total Inactive
    this.fleetsTotalInactiveLTDArray = [];
    // Fleet Reserved Hours Total
    this.fleetReservedHoursTotalLTDArray = [];
    this.ltddate = [];
    this.dashboardService.getLifeTimeLineData(this.selectedenterpriseId).subscribe(
      data => {
        this.getCommonLTW(); // Get life to date (25 Weeks) Information
        this.ltdObj = data['result'];
        if (data['statusCode'] === '1001') {
          for (let i = 0; i < data['result'].length; i++) {
            this.ltddate.push(data['result'][i]._id.period);
            this.eventsTotalLTDArray.push(data['result'][i].eventsTotal);
            this.eventRegistrationsTotalLTDArray.push(data['result'][i].eventRegistrationsTotal);
            this.eventsAveragePerFleetLTDArray.push(data['result'][i].eventsAveragePerFleet);
            this.eventRegistrationsAveragePerFleetLTDArray.push(data['result'][i].eventRegistrationsAveragePerFleet);
            this.fleetReservationsTotalLTDArray.push(data['result'][i].fleetReservationsTotal);
            this.userHoursActualProductiveLTDArray.push(data['result'][i].userHoursActualProductive);
            this.userHoursActualUnproductiveLTDArray.push(data['result'][i].userHoursActualUnproductive);
            this.userHoursInactiveLTDArray.push(data['result'][i].userHoursInactive);
            this.fleetReservedHoursAveragePerFleetLTDArray.push(data['result'][i].fleetReservedHoursAveragePerFleet);
            this.userHoursAveragePerUserLTDArray.push(data['result'][i].userHoursAveragePerUser);
            this.fleetsTotalTransactableLTDArray.push(data['result'][i].fleetsTotalTransactable);
            this.fleetsTotalNonTransactableLTDArray.push(data['result'][i].fleetsTotalNonTransactable);
            this.userHoursTotalActiveLTDArray.push(data['result'][i].userHoursTotalActive);
            this.fleetReservationsAveragePerFleetLTDArray.push(data['result'][i].fleetReservationsAveragePerFleet);
            this.eventRegistrationsAveragePerEventLTDArray.push(data['result'][i].eventRegistrationsAveragePerEvent);
            this.userHoursTotalPotentialActiveLTDArray.push(data['result'][i].userHoursTotalPotentialActive);
            this.usersTotalAllLTDArray.push(data['result'][i].usersTotalAll);
            this.fleetsTotalAllLTDArray.push(data['result'][i].fleetsTotalAll);
            this.enterpriseResourcesTotalAllLTDArray.push(data['result'][i].enterpriseResourcesTotalAll);
            this.fleetHoursUsedTransactableLTDArray.push(data['result'][i].fleetHoursUsedTransactable);
            this.fleetHoursUnusedTransactableLTDArray.push(data['result'][i].fleetHoursUnusedTransactable);
            this.unfleetHoursUsableTransactableLTDArray.push(data['result'][i].fleetHoursUnusableTransactable);
            this.fleetReservableHoursTotalLTDArray.push(data['result'][i].fleetReservableHoursTotal);
            this.usersTotalActiveLTDArray.push(data['result'][i].usersTotalActive);
            this.usersTotalInactiveLTDArray.push(data['result'][i].usersTotalInactive);
            this.enterpriseResourcesTotalActiveLTDArray.push(data['result'][i].enterpriseResourcesTotalActive);
            this.enterpriseResourcesTotalInactiveLTDArray.push(data['result'][i].enterpriseResourcesTotalInactive);
            this.fleetsTotalActiveLTDArray.push(data['result'][i].fleetsTotalActive);
            this.fleetsTotalInactiveLTDArray.push(data['result'][i].fleetsTotalInactive);
            this.fleetReservedHoursTotalLTDArray.push(data['result'][i].fleetReservedHoursTotal);

          }
          this.legenddisplay = {
            legend: {
              labels: {
                boxWidth: 10,
                fontSize: 11,
                padding: 5,
              },
              display: true,
              position: 'bottom'
            },
            tooltips: {
              titleFontFamily: 'Open Sans',
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
          // Fleet Usage LTD
          this.fleetUsageLTD = {
            labels: this.ltddate,
            datasets: [
              {
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                data: this.unfleetHoursUsableTransactableLTDArray,
                label: 'Unusable'
              },
              {
                backgroundColor: '#009000',
                borderColor: '#009000',
                data: this.fleetHoursUsedTransactableLTDArray,
                label: 'Used'
              },
              {
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                data: this.fleetHoursUnusedTransactableLTDArray,
                label: 'Unused'
              },
            ],
          };
          // Flee tUsage LTD
          this.fleetUsageLTDLine = {
            labels: this.ltddate,
            datasets: [
              {
                fill: false,
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                data: this.unfleetHoursUsableTransactableLTDArray,
                label: 'Unusable'
              },
              {
                fill: false,
                backgroundColor: '#009000',
                borderColor: '#009000',
                data: this.fleetHoursUsedTransactableLTDArray,
                label: 'Used'
              },
              {
                fill: false,
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                data: this.fleetHoursUnusedTransactableLTDArray,
                label: 'Unused'
              },
            ],
          };
          this.options = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
        }
      },
      error => {
        this.getCommonLTW();  // Get life to date (25 Weeks) Information
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
            }
            if (statuscode === '9997') {
              this.usersdata = {};
            }
            break;
        }
      }
    );
  }
  /*---- code get 25weeks bargraph and line graph ------*/
  public getCommonLTW() {
    // Events Total
    this.eventsTotalLTWArray = [];
    // Event Registrations Total
    this.eventRegistrationsTotalLTWArray = [];
    // EVents Average Per Fleet LTW
    this.eventsAveragePerFleetLTWArray = [];
    // Event Registrations Average Per Fleet LTW
    this.eventRegistrationsAveragePerFleetLTWArray = [];
    // Fleet Reservations Total LTW
    this.fleetReservationsTotalLTWArray = [];
    // Actual Unproductive User Hours
    this.userHoursActualUnproductiveLTWArray = [];
    this.userHoursActualProductiveLTWArray = [];
    this.userHoursInactiveLTWArray = [];
    // Fleet Reserved Hours Average Per Fleet
    this.fleetReservedHoursAveragePerFleetLTWArray = [];
    // User Hours Average Per User
    this.userHoursAveragePerUserLTWArray = [];
    // Fleets Total Transactable
    this.fleetsTotalTransactableLTWArray = [];
    // Fleets Total NonTransactable
    this.fleetsTotalNonTransactableLTWArray = [];
    // User Hours Total Active LTW
    this.userHoursTotalActiveLTWArray = [];
    // Fleet Reservations Average Per Fleet LTW
    this.fleetReservationsAveragePerFleetLTWArray = [];
    // Event Registrations Average Per Event LTW
    this.eventRegistrationsAveragePerEventLTWArray = [];
    // User Hours Total Potential Active LTD
    this.userHoursTotalPotentialActiveLTWArray = [];
    // Users Total All
    this.usersTotalAllLTWArray = [];
    // Fleets Total All
    this.fleetsTotalAllLTWArray = [];
    // Enterprise Resources Total All
    this.enterpriseResourcesTotalAllLTWArray = [];
    // Fleet Usage
    this.fleetHoursUsedTransactableLTWArray = [];
    this.fleetHoursUnusedTransactableLTWArray = [];
    this.unfleetHoursUsableTransactableLTWArray = [];
    // Fleet Reservable Hours Total
    this.fleetReservableHoursTotalLTWArray = [];
    // Users Total Active
    this.usersTotalActiveLTWArray = [];
    // Users Total Inactive
    this.usersTotalInactiveLTWArray = [];
    // Enterprise Resource Total Active
    this.enterpriseResourcesTotalActiveLTWArray = [];
    // Enterprise Resources Total Inactive
    this.enterpriseResourcesTotalInactiveLTWArray = [];
    // Fleets Total Active
    this.fleetsTotalActiveLTWArray = [];
    // Fleets Total Inactive
    this.fleetsTotalInactiveLTWArray = [];
    // Fleet Reserved Hours Total
    this.fleetReservedHoursTotalLTWArray = [];
    this.ltddate = [];
    this.weekslabel = [];
    this.dashboardService.getLifeTimeWeekData(this.selectedenterpriseId).subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          this.ltwobject = data['result'];
          for (let i = 0; i < data['result'].length; i++) {
            this.weekslabel.push(data['result'][i]._id.period);
            this.eventsTotalLTWArray.push(data['result'][i].eventsTotal);
            this.eventRegistrationsTotalLTWArray.push(data['result'][i].eventRegistrationsTotal);
            this.eventsAveragePerFleetLTWArray.push(data['result'][i].eventsAveragePerFleet);
            this.eventRegistrationsAveragePerFleetLTWArray.push(data['result'][i].eventRegistrationsAveragePerFleet);
            this.fleetReservationsTotalLTWArray.push(data['result'][i].fleetReservationsTotal);
            this.userHoursActualProductiveLTWArray.push(data['result'][i].userHoursActualProductive);
            this.userHoursActualUnproductiveLTWArray.push(data['result'][i].userHoursActualUnproductive);
            this.userHoursInactiveLTWArray.push(data['result'][i].userHoursInactive);
            this.fleetReservedHoursAveragePerFleetLTWArray.push(data['result'][i].fleetReservedHoursAveragePerFleet);
            this.userHoursAveragePerUserLTWArray.push(data['result'][i].userHoursAveragePerUser);
            this.fleetsTotalTransactableLTWArray.push(data['result'][i].fleetsTotalTransactable);
            this.fleetsTotalNonTransactableLTWArray.push(data['result'][i].fleetsTotalNonTransactable);
            this.userHoursTotalActiveLTWArray.push(data['result'][i].userHoursTotalActive);
            this.fleetReservationsAveragePerFleetLTWArray.push(data['result'][i].fleetReservationsAveragePerFleet);
            this.eventRegistrationsAveragePerEventLTWArray.push(data['result'][i].eventRegistrationsAveragePerEvent);
            this.userHoursTotalPotentialActiveLTWArray.push(data['result'][i].userHoursTotalPotentialActive);
            this.usersTotalAllLTWArray.push(data['result'][i].usersTotalAll);
            this.fleetsTotalAllLTWArray.push(data['result'][i].fleetsTotalAll);
            this.enterpriseResourcesTotalAllLTWArray.push(data['result'][i].enterpriseResourcesTotalAll);
            this.fleetHoursUsedTransactableLTWArray.push(data['result'][i].fleetHoursUsedTransactable);
            this.fleetHoursUnusedTransactableLTWArray.push(data['result'][i].fleetHoursUnusedTransactable);
            this.unfleetHoursUsableTransactableLTWArray.push(data['result'][i].fleetHoursUnusableTransactable);
            this.fleetReservableHoursTotalLTWArray.push(data['result'][i].fleetReservableHoursTotal);
            this.usersTotalActiveLTWArray.push(data['result'][i].usersTotalActive);
            this.usersTotalInactiveLTWArray.push(data['result'][i].usersTotalInactive);
            this.enterpriseResourcesTotalActiveLTWArray.push(data['result'][i].enterpriseResourcesTotalActive);
            this.enterpriseResourcesTotalInactiveLTWArray.push(data['result'][i].enterpriseResourcesTotalInactive);
            this.fleetsTotalActiveLTWArray.push(data['result'][i].fleetsTotalActive);
            this.fleetsTotalInactiveLTWArray.push(data['result'][i].fleetsTotalInactive);
            this.fleetReservedHoursTotalLTWArray.push(data['result'][i].fleetReservedHoursTotal);

          }
          this.legenddisplay = {
            legend: {
              labels: {
                boxWidth: 10,
                fontSize: 11,
                padding: 5,
              },
              display: true,
              position: 'bottom'
            },
            tooltips: {
              titleFontFamily: 'Open Sans'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };

          // Fleet Usage LTW
          this.fleetUsageLTW = {
            labels: this.weekslabel,
            datasets: [
              {
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                data: this.unfleetHoursUsableTransactableLTWArray,
                label: 'Unusable'
              },
              {
                backgroundColor: '#009000',
                borderColor: '#009000',
                data: this.fleetHoursUsedTransactableLTWArray,
                label: 'Used'
              },
              {
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                data: this.fleetHoursUnusedTransactableLTWArray,
                label: 'Unused'
              },
            ],
          };
          // Flee tUsage LTW
          this.fleetUsageLTWLine = {
            labels: this.weekslabel,
            datasets: [
              {
                fill: false,
                backgroundColor: '#FF0700',
                borderColor: '#FF0700',
                data: this.unfleetHoursUsableTransactableLTWArray,
                label: 'Unusable'
              },
              {
                fill: false,
                backgroundColor: '#009000',
                borderColor: '#009000',
                data: this.fleetHoursUsedTransactableLTWArray,
                label: 'Used'
              },
              {
                fill: false,
                backgroundColor: '#FF9700',
                borderColor: '#FF9700',
                data: this.fleetHoursUnusedTransactableLTWArray,
                label: 'Unused'
              },
            ],
          };
          this.options = {
            legend: {
              display: false,
              position: 'right'
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                    beginAtZero: true
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }],
              xAxes: [
                {
                  ticks: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  },
                  pointLabels: {
                    fontFamily: 'Open Sans',
                    fontSize: 10,
                  }
                }]
            }
          };
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
            }
            if (statuscode === '9997') {
              this.usersdata = {};
            }
            break;
        }
      }
    );
  }

  // Dril down for pie chart
  selectFleetData(event) {
    this.storage.setItem('selectedcountry', this.fleetdata.labels[event.element._index]);
    this.router.navigate(['/enterprises/fleets']);
  }

  selectedEnterprisesresourcesData(event) {
    this.storage.setItem('selectedEresourcescountry', this.enterpriseresourcesdata.labels[event.element._index]);
    this.router.navigate(['/enterprises/enterprisesresourses']);
  }

  selectedEventsData(event) {
    this.storage.setItem('selectedEventscountry', this.eventdata.labels[event.element._index]);
    this.router.navigate(['/transactions/events']);
  }

  selectedFleetReservationData(event) {
    this.storage.setItem('selectedFreservationcountry', this.fleetreservationdata.labels[event.element._index]);
    this.router.navigate(['/transactions/fleetreservations']);
  }

  selectedUsersData(event) {
    this.storage.setItem('selectedUserscountry', this.usersdata.labels[event.element._index]);
    this.router.navigate(['/admin/users']);
  }
  selectedEnterprisesresourcesTotalInactiveMTData(event) {
    if (event.element._index === this.enterpriseResourcesTotalInactiveMTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalInactiveYTData(event) {
    if (event.element._index === this.enterpriseResourcesTotalInactiveYTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalInactiveLTData(event) {
    if (event.element._index === this.enterpriseResourcesTotalInactiveLTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalInactiveLTWData(event) {
    if (event.element._index === this.enterpriseResourcesTotalInactiveLTWArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalActiveMTDData(event) {
    if (event.element._index === this.enterpriseResourcesTotalActiveMTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalActiveYTDData(event) {
    if (event.element._index === this.enterpriseResourcesTotalActiveYTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalActiveLTDData(event) {
    if (event.element._index === this.enterpriseResourcesTotalActiveLTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedEnterprisesresourcesTotalActiveLTWData(event) {
    if (event.element._index === this.enterpriseResourcesTotalActiveLTWArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedUsersTotalActiveYTDData(event) {
    if (event.element._index === this.usersTotalActiveYTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalActiveMTDData(event) {
    if (event.element._index === this.usersTotalActiveMTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalActiveLTDData(event) {
    if (event.element._index === this.usersTotalActiveLTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalActiveLTWData(event) {
    if (event.element._index === this.usersTotalActiveLTWArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalInActiveMTDData(event) {
    if (event.element._index === this.usersTotalInactiveMTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalInActiveYTDData(event) {
    if (event.element._index === this.usersTotalInactiveYTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalInActiveLTDData(event) {
    if (event.element._index === this.usersTotalInactiveLTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedUsersTotalInActiveLTWData(event) {
    if (event.element._index === this.usersTotalInactiveLTWArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Blocked');
      this.router.navigate(['/admin/users']);
    }
  }
  selectedFleetsTotalActiveMTDData(event) {
    if (event.element._index === this.fleetsTotalActiveMTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalActiveYTDData(event) {
    if (event.element._index === this.fleetsTotalActiveYTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalActiveLTDData(event) {
    if (event.element._index === this.fleetsTotalActiveLTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalActiveLTWData(event) {
    if (event.element._index === this.fleetsTotalActiveLTWArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Active');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalInActiveMTDData(event) {
    if (event.element._index === this.fleetsTotalInactiveMTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Inactive');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalInActiveYTDData(event) {
    if (event.element._index === this.fleetsTotalInactiveYTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Inactive');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalInActiveLTDData(event) {
    if (event.element._index === this.fleetsTotalInactiveLTDArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Inactive');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsTotalInActiveLTWData(event) {
    if (event.element._index === this.fleetsTotalInactiveLTWArray.length - 1) {
      this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
      this.storage.setItem('status', 'Inactive');
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsMTDData(event) {
    if (event.element._index === this.fleetsTotalAllMTDArray.length - 1) {
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsYTDData(event) {
    if (event.element._index === this.fleetsTotalAllYTDArray.length - 1) {
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsLTDData(event) {
    if (event.element._index === this.fleetsTotalAllLTDArray.length - 1) {
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedFleetsLTWData(event) {
    if (event.element._index === this.fleetsTotalAllLTWArray.length - 1) {
      this.router.navigate(['/enterprises/fleets']);
    }
  }
  selectedDashboardUsersMTDData(event) {
    if (event.element._index === this.usersTotalAllMTDArray.length - 1) {
      this.router.navigate(['/admin/users']);
    }
  }
  selectedDashboardUsersYTDData(event) {
    if (event.element._index === this.usersTotalAllYTDArray.length - 1) {
      this.router.navigate(['/admin/users']);
    }
  }
  selectedDashboardUsersLTDData(event) {
    if (event.element._index === this.usersTotalAllLTDArray.length - 1) {
      this.router.navigate(['/admin/users']);
    }
  }
  selectedDashboardUsersLTWData(event) {
    if (event.element._index === this.usersTotalAllLTWArray.length - 1) {
      this.router.navigate(['/admin/users']);
    }
  }
  selectedAllEnterpriseResourcesMTDData(event) {
    if (event.element._index === this.enterpriseResourcesTotalAllMTDArray.length - 1) {
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedAllEnterpriseResourcesYTDData(event) {
    if (event.element._index === this.enterpriseResourcesTotalAllYTDArray.length - 1) {
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedAllEnterpriseResourcesLTDData(event) {
    if (event.element._index === this.enterpriseResourcesTotalAllLTDArray.length - 1) {
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedAllEnterpriseResourcesLTWData(event) {
    if (event.element._index === this.enterpriseResourcesTotalAllLTWArray.length - 1) {
      this.router.navigate(['/enterprises/enterprisesresourses']);
    }
  }
  selectedeventsAveragePerFleetMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsAveragePerFleetYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsAveragePerFleetLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsAveragePerFleetLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsTotalMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsTotalYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsTotalLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventsTotalLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/events']);
  }
  selectedeventRegistrationsAveragePerFleetMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerFleetYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerFleetLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerFleetLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerEventMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerEventYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerEventLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsAveragePerEventLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsTotalMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsTotalYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsTotalLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedeventRegistrationsTotalLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/eventregistrations']);
  }
  selectedfleetReservationsAveragePerFleetMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsAveragePerFleetYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsAveragePerFleetLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsAveragePerFleetLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsTotalMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsTotalYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsTotalLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }


  selecteduserHoursAveragePerUserMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selecteduserHoursAveragePerUserYTDData(event) {
    const startDate = new Date(1 + '' + this.userHoursAveragePerUserYTD.labels[event.element._index]);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59);
    this.storage.setItem('dashbordStartDate', startDate.toString());
    this.storage.setItem('dashbordEndDate', endDate.toString());
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selecteduserHoursAveragePerUserLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }

  selecteduserHoursTotalActiveMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selecteduserHoursTotalActiveYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selecteduserHoursTotalActiveLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }

  selectedfleetReservedHoursAveragePerFleetMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservedHoursAveragePerFleetYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservedHoursAveragePerFleetLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }

  selectedfleetReservedHoursTotalMTDData(event) {
    this.startDate = moment.utc(this.mtdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.mtdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservedHoursTotalYTDData(event) {
    this.startDate = moment.utc(this.ytdobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ytdobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservedHoursTotalLTDData(event) {
    this.startDate = moment.utc(this.ltdObj[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltdObj[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservationsTotalLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selecteduserHoursAveragePerUserLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selecteduserHoursTotalActiveLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservedHoursTotalLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  selectedfleetReservedHoursAveragePerFleetLTWData(event) {
    this.startDate = moment.utc(this.ltwobject[event.element._index]._id.periodStartDate).toDate().toString();
    this.endDate = moment.utc(this.ltwobject[event.element._index]._id.periodEndDate).toDate().toString();
    this.storage.setItem('dashbordStartDate', this.startDate);
    this.storage.setItem('dashbordEndDate', this.endDate);
    this.storage.setItem('selecteddashboardenterpriseid', this.enterprisesName);
    this.router.navigate(['/transactions/fleetreservations']);
  }
  // Enlarge popup open
  showdashboardChartModal(mainheader, header, type, data, options) {
    this.mainheader = mainheader;
    this.subheader = header;
    this.dynamictype = type;
    this.dynamicgraphdata = data;
    this.dynamicoptions = options;
    this.dashboardModal.show();
  }
  // Enlarge popup close
  closedashboard() {
    this.dashboardModal.hide();
  }
  userActivity() {
    // User Activity MTD
    if (this.mtdObj.length !== 0) {
      this.userActivityMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursInactiveMTDArray,
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive'
          },
          {
            data: this.userHoursActualProductiveMTDArray,
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive'
          },
          {
            data: this.userHoursActualUnproductiveMTDArray,
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive'
          }
        ]
      };
      // User Ativity Line MTD
      this.userActivityLineMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursInactiveMTDArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive',
            fill: false,
          },
          {
            data: this.userHoursActualProductiveMTDArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive',
            fill: false,
          },
          {
            data: this.userHoursActualUnproductiveMTDArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive',
            fill: false,
          }
        ]
      };
    }
    if (this.ytdobject.length !== 0) {
      // User Activity YTD
      this.userActivityYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursInactiveYTDArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive'
          },
          {
            data: this.userHoursActualProductiveYTDArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive'
          },
          {
            data: this.userHoursActualUnproductiveYTDArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive'
          }]
      };
      // User Activity YTD Line
      this.userActivityYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursInactiveYTDArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive',
            fill: false,
          },
          {
            data: this.userHoursActualProductiveYTDArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive',
            fill: false,
          },
          {
            data: this.userHoursActualUnproductiveYTDArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive',
            fill: false,
          }]
      };
    }
    if (this.ltdObj.length !== 0) {
      this.userActivityLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursInactiveLTDArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive'
          },
          {
            data: this.userHoursActualProductiveLTDArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive'
          },
          {
            data: this.userHoursActualUnproductiveLTDArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive'
          }]
      };
      // User Activity Line LTD
      this.userActivityLineLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursInactiveLTDArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive',
            fill: false,
          },
          {
            data: this.userHoursActualProductiveLTDArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive',
            fill: false,
          },
          {
            data: this.userHoursActualUnproductiveLTDArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive',
            fill: false,
          }]
      };
    }
    // User Activity LTW
    if (this.ltwobject.length !== 0) {
      this.userActivityLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursInactiveLTWArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive'
          },
          {
            data: this.userHoursActualProductiveLTWArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive'
          },
          {
            data: this.userHoursActualUnproductiveLTWArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive'
          }]
      };
      // User Activity Line LTW
      this.userActivityLineLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursInactiveLTWArray,
            // backgroundColor: '#42A5F5',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF0700',
            borderColor: '#FF0700',
            label: 'Inactive',
            fill: false
          },
          {
            data: this.userHoursActualProductiveLTWArray,
            // backgroundColor: '#cc61b6',
            // borderColor: '#7CB342',
            backgroundColor: '#009000',
            borderColor: '#009000',
            label: 'Productive',
            fill: false
          },
          {
            data: this.userHoursActualUnproductiveLTWArray,
            // backgroundColor: '#9CCC65',
            // borderColor: '#1E88E5',
            backgroundColor: '#FF9700',
            borderColor: '#FF9700',
            label: 'Unproductive',
            fill: false
          }]
      };
    }
  }
  eventsAllBlock() {
    // Events Total MTD
    if (this.mtdObj.length !== 0) {
      this.eventsTotalMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventsTotalMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Events Total MTD Line
      this.eventsTotalMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventsTotalMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    if (this.ytdobject.length !== 0) {
      // Events Total YTD
      this.eventsTotalYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventsTotalYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Events Total YTD Line
      this.eventsTotalYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventsTotalYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Events Total LTD
    if (this.ltdObj.length !== 0) {
      this.eventsTotalLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventsTotalLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Events Total LTD Line
      this.eventsTotalLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventsTotalLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Events Total LTW
    if (this.ltwobject.length !== 0) {
      this.eventsTotalLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventsTotalLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Events Total LTW Line
      this.eventsTotalLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventsTotalLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  eventRegistrationsBlock() {
    // Event Registrations Total MTD
    if (this.mtdObj.length !== 0) {
      this.eventRegistrationsTotalMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventRegistrationsTotalMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Total MTD Line
      this.eventRegistrationsTotalMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventRegistrationsTotalMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Event Registrations Total YTD
    if (this.ytdobject.length !== 0) {
      this.eventRegistrationsTotalYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventRegistrationsTotalYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Total YTD Line
      this.eventRegistrationsTotalYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventRegistrationsTotalYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Event Registrations Total LTD
    if (this.ltdObj.length !== 0) {
      this.eventRegistrationsTotalLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventRegistrationsTotalLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Event Registrations Total LTD Line
      this.eventRegistrationsTotalLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventRegistrationsTotalLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Event Registrations Total LTW
    if (this.ltwobject.length !== 0) {
      this.eventRegistrationsTotalLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventRegistrationsTotalLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Event Registrations Total LTW Line
      this.eventRegistrationsTotalLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventRegistrationsTotalLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  eventsAverageFleetBlock() {
    // Events Average Per Fleet MTD
    if (this.mtdObj.length !== 0) {
      this.eventsAveragePerFleetMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventsAveragePerFleetMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Events Average Per Fleet MTD Line
      this.eventsAveragePerFleetMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventsAveragePerFleetMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Events Average Per Fleet YTD
    if (this.ytdobject.length !== 0) {
      this.eventsAveragePerFleetYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventsAveragePerFleetYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Events Average Per Fleet YTD Line
      this.eventsAveragePerFleetYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventsAveragePerFleetYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Events Average Per Fleet LTD
    if (this.ltdObj.length !== 0) {
      this.eventsAveragePerFleetLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventsAveragePerFleetLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Events Average Per Fleet LTD Line
      this.eventsAveragePerFleetLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventsAveragePerFleetLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Events Average Per Fleet LTW
    if (this.ltwobject.length !== 0) {
      this.eventsAveragePerFleetLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventsAveragePerFleetLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Events Average Per Fleet LTW Line
      this.eventsAveragePerFleetLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventsAveragePerFleetLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
  }
  eventRegistrationsAverageFleetBlock() {
    // Event Registrations Average Per Fleet MTD
    if (this.mtdObj.length !== 0) {
      this.eventRegistrationsAveragePerFleetMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Average Per Fleet MTD Line
      this.eventRegistrationsAveragePerFleetMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Event Registrations Average Per Fleet YTD
    if (this.ytdobject.length !== 0) {
      this.eventRegistrationsAveragePerFleetYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Average Per Fleet YTD Line
      this.eventRegistrationsAveragePerFleetYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Event Registrations Average Per Fleet LTD
    if (this.ltdObj.length !== 0) {
      this.eventRegistrationsAveragePerFleetLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Average Per Fleet LTD Line
      this.eventRegistrationsAveragePerFleetLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }

    // Event Registrations Average Per Fleet LTW
    if (this.ltwobject.length !== 0) {
      this.eventRegistrationsAveragePerFleetLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Average Per Fleet LTW Line
      this.eventRegistrationsAveragePerFleetLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerFleetLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
  }
  fleetReservationsAllBlock() {
    // Fleet Reservations Total MTD
    if (this.mtdObj.length !== 0) {
      this.fleetReservationsTotalMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservationsTotalMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Fleet Reservations Total MTD Line
      this.fleetReservationsTotalMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservationsTotalMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Fleet Reservation YTD
    if (this.ytdobject.length !== 0) {
      this.fleetReservationsTotalYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservationsTotalYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Fleet Reservations Total YTD Line
      this.fleetReservationsTotalYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservationsTotalYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Fleet Reservations Total LTD
    if (this.ltdObj.length !== 0) {
      this.fleetReservationsTotalLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservationsTotalLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Fleet Reservations Total LTD Line
      this.fleetReservationsTotalLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservationsTotalLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
    // Fleet Reservations Total LTW
    if (this.ltwobject.length !== 0) {
      this.fleetReservationsTotalLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservationsTotalLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Fleet Reservations Total LTW Line
      this.fleetReservationsTotalLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservationsTotalLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          },
        ]
      };
    }
  }
  fleetReservedHoursAverageFleetBlock() {
    // Fleet Reserved Hours Average Per Fleet MTD
    if (this.mtdObj.length !== 0) {
      this.fleetReservedHoursAveragePerFleetMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reserved Hours Average Per Fleet MTD Line
      this.fleetReservedHoursAveragePerFleetMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleet Reserved Hours Average Per Fleet YTD
    if (this.ytdobject.length !== 0) {
      this.fleetReservedHoursAveragePerFleetYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reserved Hours Average Per Fleet YTD Line
      this.fleetReservedHoursAveragePerFleetYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Reserved Hours Average Per Fleet LTD
    if (this.ltdObj.length !== 0) {
      this.fleetReservedHoursAveragePerFleetLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reserved Hours Average Per Fleet LTD Line
      this.fleetReservedHoursAveragePerFleetLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reserved Hours Average Per Fleet LTW
    if (this.ltwobject.length !== 0) {
      this.fleetReservedHoursAveragePerFleetLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reserved Hours Average Per Fleet LTW Line
      this.fleetReservedHoursAveragePerFleetLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservedHoursAveragePerFleetLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  userHoursAverageUserBlock() {
    // User Hours Average Per User MTD
    if (this.mtdObj.length !== 0) {
      this.userHoursAveragePerUserMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursAveragePerUserMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // User Hours Average Per User MTD Line
      this.userHoursAveragePerUserMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursAveragePerUserMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // User Hours Average Per User YTD
    if (this.ytdobject.length !== 0) {
      this.userHoursAveragePerUserYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursAveragePerUserYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // User Hours Average Per User YTD Line
      this.userHoursAveragePerUserYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursAveragePerUserYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // User Hours Average Per User LTD
    if (this.ltdObj.length !== 0) {
      this.userHoursAveragePerUserLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursAveragePerUserLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // User Hours Average Per User LTD Line
      this.userHoursAveragePerUserLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursAveragePerUserLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // User Hours Average Per User LTW
    if (this.ltwobject.length !== 0) {
      this.userHoursAveragePerUserLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursAveragePerUserLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // User Hours Average Per User LTW Line
      this.userHoursAveragePerUserLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursAveragePerUserLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetsTransactableBlock() {
    // Fleets Total Transactable MTD
    if (this.mtdObj.length !== 0) {
      this.fleetsTotalTransactableMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalTransactableMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total Transactable MTD Line
      this.fleetsTotalTransactableMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalTransactableMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleets Total Transactable YTD
    if (this.ytdobject.length !== 0) {
      this.fleetsTotalTransactableYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalTransactableYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Transactable YTD Line
      this.fleetsTotalTransactableYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalTransactableYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Transactable LTD
    if (this.ltdObj.length !== 0) {
      this.fleetsTotalTransactableLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalTransactableLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Transactable LTD Line
      this.fleetsTotalTransactableLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalTransactableLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Transactable LTW
    if (this.ltwobject.length !== 0) {
      this.fleetsTotalTransactableLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalTransactableLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Transactable LTW Line
      this.fleetsTotalTransactableLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalTransactableLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetsNonTransactableBlock() {
    // Fleets Total NonTransactable MTD
    if (this.mtdObj.length !== 0) {
      this.fleetsTotalNonTransactableMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total NonTransactable MTD Line
      this.fleetsTotalNonTransactableMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleets Total Non Transactable YTD
    if (this.ytdobject.length !== 0) {
      this.fleetsTotalNonTransactableYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total NonTransactable YTD Line
      this.fleetsTotalNonTransactableYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Non Transactable LTD
    if (this.ltdObj.length !== 0) {
      this.fleetsTotalNonTransactableLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Non Transactable LTD Line
      this.fleetsTotalNonTransactableLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Non Transactable LTW
    if (this.ltwobject.length !== 0) {
      this.fleetsTotalNonTransactableLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Non Transactable LTW Line
      this.fleetsTotalNonTransactableLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalNonTransactableLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  userHoursAllActiveBlock() {
    // User Hours Total Active MTD
    if (this.ltdObj.length !== 0) {
      this.userHoursTotalActiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursTotalActiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // User Hours Total Active MTD Line

      this.userHoursTotalActiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursTotalActiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // User Hours Total Active YTD
    if (this.ytdobject.length !== 0) {
      this.userHoursTotalActiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursTotalActiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // User Hours Total Active YTD Line
      this.userHoursTotalActiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursTotalActiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // User Hours Total Active LTD
    if (this.ltdObj.length !== 0) {
      this.userHoursTotalActiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursTotalActiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // User Hours Total Active LTD Line
      this.userHoursTotalActiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursTotalActiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // User Hours Total Active LTW
    if (this.ltwobject.length !== 0) {
      this.userHoursTotalActiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursTotalActiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // User Hours Total Active LTW Line
      this.userHoursTotalActiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursTotalActiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetReservationsAveragePerFleetBlock() {
    // Fleet Reservations Average Per Fleet MTD
    if (this.mtdObj.length !== 0) {
      this.fleetReservationsAveragePerFleetMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Fleet Reservations Average Per Fleet MTD Line
      this.fleetReservationsAveragePerFleetMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleet Reservations Average Per Fleet YTD
    if (this.ytdobject.length !== 0) {
      this.fleetReservationsAveragePerFleetYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reservations Average Per Fleet YTD Line
      this.fleetReservationsAveragePerFleetYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reservations Average Per Fleet LTD
    if (this.ltdObj.length !== 0) {
      this.fleetReservationsAveragePerFleetLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reservations Average Per Fleet LTD Line
      this.fleetReservationsAveragePerFleetLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reservations Average Per Fleet LTW
    if (this.ltwobject.length !== 0) {
      this.fleetReservationsAveragePerFleetLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reservations Average Per Fleet LTW Line
      this.fleetReservationsAveragePerFleetLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservationsAveragePerFleetLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  eventRegistrationsAveragePerEventBlock() {
    // Event Registrations Average Per Event MTD
    if (this.mtdObj.length !== 0) {
      this.eventRegistrationsAveragePerEventMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // Event Registrations Average PerEvent MTD Line
      this.eventRegistrationsAveragePerEventMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Event Registrations Average Per Event YTD
    if (this.ytdobject.length !== 0) {
      this.eventRegistrationsAveragePerEventYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Event Registrations Average Per Event YTD Line

      this.eventRegistrationsAveragePerEventYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Event Registrations Average Per Event LTD
    if (this.ltdObj.length !== 0) {
      this.eventRegistrationsAveragePerEventLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Event Registrations Average Per Event LTD Line
      this.eventRegistrationsAveragePerEventLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Event Registrations Average Per Event LTW
    if (this.ltwobject.length !== 0) {
      this.eventRegistrationsAveragePerEventLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Event Registrations Average Per Event LTW Line
      this.eventRegistrationsAveragePerEventLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.eventRegistrationsAveragePerEventLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  userHoursTotalPotentialActiveBlock() {
    // User Hours Total Potential Active MTD
    if (this.mtdObj.length !== 0) {
      this.userHoursTotalPotentialActiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          },
        ]
      };
      // User Hours Total Potential Active MTD Line
      this.userHoursTotalPotentialActiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // User Hours Total Potential Active YTD
    if (this.ytdobject.length !== 0) {
      this.userHoursTotalPotentialActiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // User Hours Total Potential Active YTD Line
      this.userHoursTotalPotentialActiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // User Hours Total Potential Active LTD
    if (this.ltdObj.length !== 0) {
      this.userHoursTotalPotentialActiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // User Hours Total Potential Active LTD Line
      this.userHoursTotalPotentialActiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // User Hours Total Potential Active LTW
    if (this.ltwobject.length !== 0) {
      this.userHoursTotalPotentialActiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // User Hours Total Potential Active LTW Line
      this.userHoursTotalPotentialActiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.userHoursTotalPotentialActiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  usersTotalAllBlock() {
    // Users Total All MTD
    if (this.mtdObj.length !== 0) {
      this.usersTotalAllMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.usersTotalAllMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Users Total All MTD Line
      this.usersTotalAllMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.usersTotalAllMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Users Total All YTD
    if (this.ytdobject.length !== 0) {
      this.usersTotalAllYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.usersTotalAllYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total All Line YTD
      this.usersTotalAllYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.usersTotalAllYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Users Total All LTD
    if (this.ltdObj.length !== 0) {
      this.usersTotalAllLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.usersTotalAllLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total All LTD Line
      this.usersTotalAllLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.usersTotalAllLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Users Total All LTW
    if (this.ltwobject.length !== 0) {
      this.usersTotalAllLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.usersTotalAllLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total All LTW Line
      this.usersTotalAllLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.usersTotalAllLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetsTotalAllBlock() {
    // Fleets Total All MTD
    if (this.mtdObj.length !== 0) {
      this.fleetsTotalAllMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalAllMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total All MTD Line
      this.fleetsTotalAllMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalAllMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleets Total All YTD
    if (this.ytdobject.length !== 0) {
      this.fleetsTotalAllYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalAllYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total All Line YTD
      this.fleetsTotalAllYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalAllYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total All LTD
    if (this.ltdObj.length !== 0) {
      this.fleetsTotalAllLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalAllLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total All Line LTD
      this.fleetsTotalAllLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalAllLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total All LTW
    if (this.ltwobject.length !== 0) {
      this.fleetsTotalAllLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalAllLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total All Line LTW
      this.fleetsTotalAllLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalAllLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  enterpriseResourceAllBlock() {
    // Enterprise Resource All MTD
    if (this.mtdObj.length !== 0) {
      this.enterpriseResourceAllMTD = {
        labels: this.monthdays,
        datasets: [
          {
            label: 'All Enterprise Resources',
            data: this.enterpriseResourcesTotalAllMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Enterprise Resource All MTD Line
      this.enterpriseResourceAllMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Enterprise Resource All YTD
    if (this.ytdobject.length !== 0) {
      this.enterpriseresourceAllYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise Resource All YTD line
      this.enterpriseresourceAllYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Enterprise All Resource LTD
    if (this.ltdObj.length !== 0) {
      this.enterpriseAllResourceLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise All Resource LTD Line
      this.enterpriseAllResourceLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Enterprise All Resource LTW
    if (this.ltwobject.length !== 0) {
      this.enterpriseAllResourceLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise All Resource LTW Line
      this.enterpriseAllResourceLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.enterpriseResourcesTotalAllLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetReservedHoursTotalBlock() {
    // Fleet Reserved Hours Total MTD
    if (this.mtdObj.length !== 0) {
      this.fleetReservedHoursTotalMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservedHoursTotalMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reserved Hours Total MTD Line
      this.fleetReservedHoursTotalMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservedHoursTotalMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleet Reserved Hours Total YTD
    if (this.ytdobject.length !== 0) {
      this.fleetReservedHoursTotalYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservedHoursTotalYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reserved Hours Total YTD Line
      this.fleetReservedHoursTotalYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservedHoursTotalYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reserved Hours Total LTD
    if (this.ltdObj.length !== 0) {
      this.fleetReservedHoursTotalLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservedHoursTotalLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reserved Hours Total LTD Line
      this.fleetReservedHoursTotalLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservedHoursTotalLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reserved Hours Total LTW
    if (this.ltwobject.length !== 0) {
      this.fleetReservedHoursTotalLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservedHoursTotalLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reserved Hours Total LTW Line
      this.fleetReservedHoursTotalLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservedHoursTotalLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetReservableHoursTotalBlock() {
    // Fleet Reservable Hours Total MTD
    if (this.mtdObj.length !== 0) {
      this.fleetReservableHoursTotalMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservableHoursTotalMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleet Reservable Hours Total MTD Line
      this.fleetReservableHoursTotalMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetReservableHoursTotalMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleet Reservable Hours Total YTD
    if (this.ytdobject.length !== 0) {
      this.fleetReservableHoursTotalYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservableHoursTotalYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reservable Hours Total YTD Line
      this.fleetReservableHoursTotalYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetReservableHoursTotalYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reservable Hours Total LTD
    if (this.ltdObj.length !== 0) {
      this.fleetReservableHoursTotalLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservableHoursTotalLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reservable Hours Total LTD Line
      this.fleetReservableHoursTotalLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetReservableHoursTotalLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleet Reservable Hours Total LTW
    if (this.ltwobject.length !== 0) {
      this.fleetReservableHoursTotalLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservableHoursTotalLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleet Reservable Hours Total LTW Line
      this.fleetReservableHoursTotalLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetReservableHoursTotalLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetsTotalActiveBlock() {
    // Fleets Total Active MTD
    if (this.mtdObj.length !== 0) {
      this.fleetsTotalActiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalActiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total Active MTD Line
      this.fleetsTotalActiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalActiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleets Total Active YTD
    if (this.ytdobject.length !== 0) {
      this.fleetsTotalActiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalActiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total Active YTD Line
      this.fleetsTotalActiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalActiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Active LTD
    if (this.ltdObj.length !== 0) {
      this.fleetsTotalActiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalActiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Active LTD Line
      this.fleetsTotalActiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalActiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Active LTW
    if (this.ltwobject.length !== 0) {
      this.fleetsTotalActiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalActiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Active LTW Line
      this.fleetsTotalActiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalActiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  fleetsTotalInactiveBlock() {
    // Fleets Total Inactive MTD
    if (this.mtdObj.length !== 0) {
      this.fleetsTotalInactiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalInactiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total Inactive MTD Line
      this.fleetsTotalInactiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.fleetsTotalInactiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Fleets Total Inactive YTD
    if (this.ytdobject.length !== 0) {
      this.fleetsTotalInactiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalInactiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Fleets Total Inactive YTD Line
      this.fleetsTotalInactiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.fleetsTotalInactiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Inactive LTD
    if (this.ltdObj.length !== 0) {
      this.fleetsTotalInactiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalInactiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Inactive LTD Line
      this.fleetsTotalInactiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.fleetsTotalInactiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Fleets Total Inactive LTW
    if (this.ltwobject.length !== 0) {
      this.fleetsTotalInactiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalInactiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Fleets Total Inactive LTW Line
      this.fleetsTotalInactiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.fleetsTotalInactiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  usersTotalActiveBlock() {
    // Users Total Active MTD
    if (this.mtdObj.length !== 0) {
      this.usersTotalActiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.usersTotalActiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Users Total Active MTD Line
      this.usersTotalActiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.usersTotalActiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Users Total Active YTD
    if (this.ytdobject.length !== 0) {
      this.usersTotalActiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.usersTotalActiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total Active YTD Line
      this.usersTotalActiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.usersTotalActiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Users Total Active LTD
    if (this.ltdObj.length !== 0) {
      this.usersTotalActiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.usersTotalActiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total Active LTD Line
      this.usersTotalActiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.usersTotalActiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Users Total Active LTW
    if (this.ltwobject.length !== 0) {
      this.usersTotalActiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.usersTotalActiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total Active LTW Line
      this.usersTotalActiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.usersTotalActiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  usersTotalInactiveBlock() {
    // Users Total Inactive MTD
    if (this.mtdObj.length !== 0) {
      this.usersTotalInactiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.usersTotalInactiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Users Total Inactive MTD Line
      this.usersTotalInactiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.usersTotalInactiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Users Total Inactive YTD
    if (this.ytdobject.length !== 0) {
      this.usersTotalInactiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.usersTotalInactiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total Inactive YTD Line
      this.usersTotalInactiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.usersTotalInactiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Users Total Inactive LTD
    if (this.ltdObj.length !== 0) {
      this.usersTotalInactiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.usersTotalInactiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total Inactive LTD Line
      this.usersTotalInactiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.usersTotalInactiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Users Total Inactive LTW
    if (this.ltwobject.length !== 0) {
      this.usersTotalInactiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.usersTotalInactiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Users Total Inactive LTW Line
      this.usersTotalInactiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.usersTotalInactiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  enterpriseResourcesTotalInactiveBlock() {
    // Enterprise Resources Total Inactive MTD
    if (this.mtdObj.length !== 0) {
      this.enterpriseResourcesTotalInactiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Enterprise Resources Total Inactive MTD Line
      this.enterpriseResourcesTotalInactiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            label: 'InActive Enterprise Resources',
            data: this.enterpriseResourcesTotalInactiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Enterprise Resources Total Inactive YTD
    if (this.ytdobject.length !== 0) {
      this.enterpriseResourcesTotalInactiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Enterprise Resources Total Inactive YTD Line
      this.enterpriseResourcesTotalInactiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Enterprise Resources Total InActive LTD
    if (this.ltdObj.length !== 0) {
      this.enterpriseResourcesTotalInactiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise Resources Total Inactive Line LTD
      this.enterpriseResourcesTotalInactiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Enterprise Resources Total InActive LTW
    if (this.ltwobject.length !== 0) {
      this.enterpriseResourcesTotalInactiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise Resources Total Inactive Line LTW
      this.enterpriseResourcesTotalInactiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.enterpriseResourcesTotalInactiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  enterpriseResourcesTotalActiveBlock() {
    // Enterprise Resources Total Active MTD
    if (this.mtdObj.length !== 0) {
      this.enterpriseResourcesTotalActiveMTD = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveMTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };

      // Enterprise Resources Total Active MTD Line
      this.enterpriseResourcesTotalActiveMTDLine = {
        labels: this.monthdays,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveMTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }
        ]
      };
    }
    // Enterprise Resources Total Active YTD
    if (this.ytdobject.length !== 0) {
      this.enterpriseResourcesTotalActiveYTD = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveYTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }
        ]
      };
      // Enterprise Resources Total Active YTD Line
      this.enterpriseResourcesTotalActiveYTDLine = {
        labels: this.yeardate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveYTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }

    // Enterprise Resources Total Active LTD
    if (this.ltdObj.length !== 0) {
      this.enterpriseResourcesTotalActiveLTD = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveLTDArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise Resources Total Active LTD Line
      this.enterpriseResourcesTotalActiveLTDLine = {
        labels: this.ltddate,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveLTDArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
    // Enterprise Resources Total Active LTW
    if (this.ltwobject.length !== 0) {
      this.enterpriseResourcesTotalActiveLTW = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveLTWArray,
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5'
          }]
      };
      // Enterprise Resources Total Active LTW Line
      this.enterpriseResourcesTotalActiveLTWLine = {
        labels: this.weekslabel,
        datasets: [
          {
            data: this.enterpriseResourcesTotalActiveLTWArray,
            fill: false,
            borderColor: '#1E88E5'
          }]
      };
    }
  }
  ///  Code consolidate By Kalyan Emani  // 

  /**---- To show the advance model popup ----*/
  advancedDashboard() {
    this.gettimeZones();
    this.minDate = new Date();
    this.enddate = this.minDate;
    this.startdate = new Date();
    this.startdate = new Date(moment(moment(this.startdate).days((moment(this.startdate).months()
      - Number(773)))).format('YYYY-MM-DD'));
    this.advancedModel.show();
  }
  /**---- To hide the advance Model ----*/
  public hideAdvanceModal() {
    this.advancedModel.hide();
  }
  /*---- To get the enterpriseresources info bases on the changed value ------*/
  getEnterpriseResources(type) {
    this.value = type.split('$');
    this.enterpriseId = this.value[0];
    this.enterprisesName = this.value[1];
    this.enterpriseIcon = this.value[3];
    this.enterpriseIconFilePath = this.value[2] + '/' + this.enterpriseIcon;

    if (this.enterpriseId === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
  }
  /** ------To get fleet type list ---- */
  getFleettypeList(enterpriseid) {
    this.userToken = window.localStorage.getItem('token');
    this.dashboardService.getFleetTypeList(this.userToken, enterpriseid)
      .subscribe(
      fleettypelist => {
        this.fleettypelist = fleettypelist['result'][0].fleetTypes;
      },
      error => {
      });
  }
  /**----To get  On change fleet type value ----- */
  selectedFleettype(value) {
    this.attributeFleettype = value;
  }

  /*--- To change the getTimezonesstartdate list ----*/
  changeTimezones(timezone) {

    const timevalue = timezone.split('$');
    this.advuserpreferedtimezone = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.advutctimezone = utcval[0];
    this.advutctimezonestring = utcval[0].toString();
  }
  /**---- To get the time zones ----*/
  public gettimeZones() {
    this.dashboardService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
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
  /**---- To search the data by using advance search  -----*/
  advancesearch() {
    this.monthdays = [];
    this.yeardate = [];
    this.ltddate = [];
    this.weekslabel = [];
    const errorstartdate = this.startdate;
    const errorenddate = this.enddate;
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
      if (this.enterprisesName !== '' && this.enterprisesName !== undefined) {
        this.enterprisesName = this.enterprisesName.trim().replace(/\s\s+/g, ' ');
      }
      /** ----- Convert prefered time zone to utc format start----- */
      if (this.startdate == undefined) {
        this.startdate = '';
      }
      if (this.enddate == undefined) {
        this.enddate = '';
      }
      this.dasboardadv = {
        'enterpriseValue': this.enterprisesName,
        'startDatetime': this.startdate,
        'endDatetime': this.enddate
      };
      this.dashboardService.advancesearch(this.dasboardadv, this.userToken).subscribe(
        data => {
          this.advancedModel.hide();
          this.startdate = this.errorstartdate;
          this.enddate = this.errorenddate;
          if (data['statusCode'] === '1001') {
            this.mtdObj = data['result']['MTDData'];
            if (data['result']['MTDData'].length === 0) {
              this.mtdObj = data['result']['MTDData'];

              this.fleetUsageMTD = {};
              this.fleetUsageMTDLine = {};

              this.userActivityMTD = {};
              this.userActivityLineMTD = {};

              this.fleetReservableHoursTotalMTD = {};
              this.fleetReservableHoursTotalMTDLine = {};

              this.fleetReservedHoursTotalMTD = {};
              this.fleetReservableHoursTotalMTDLine = {};

              this.fleetReservedHoursAveragePerFleetMTD = {};
              this.fleetReservedHoursAveragePerFleetMTDLine = {};

              this.userHoursTotalPotentialActiveMTD = {};
              this.userHoursTotalPotentialActiveMTDLine = {};

              this.userHoursTotalActiveMTD = {};
              this.userHoursTotalActiveMTDLine = {};

              this.userHoursAveragePerUserMTD = {};
              this.userHoursAveragePerUserMTDLine = {};

              this.fleetReservationsTotalMTD = {};
              this.fleetReservationsTotalMTDLine = {};

              this.fleetReservationsAveragePerFleetMTD = {};
              this.fleetReservationsAveragePerFleetMTDLine = {};

              this.eventRegistrationsTotalMTD = {};
              this.eventRegistrationsTotalMTDLine = {};

              this.eventRegistrationsAveragePerEventMTD = {};
              this.eventRegistrationsAveragePerEventMTDLine = {};


              this.eventRegistrationsAveragePerFleetMTD = {};
              this.eventRegistrationsAveragePerFleetMTDLine = {};

              this.eventsTotalMTD = {};
              this.eventsTotalMTDLine = {};

              this.eventsAveragePerFleetMTD = {};
              this.eventsAveragePerFleetMTDLine = {};

              this.fleetsTotalAllMTD = {};
              this.fleetsTotalAllMTDLine = {};

              this.fleetsTotalActiveMTD = {};
              this.fleetsTotalActiveMTDLine = {};

              this.fleetsTotalInactiveMTD = {};
              this.fleetsTotalInactiveMTDLine = {};

              this.fleetsTotalNonTransactableMTD = {};
              this.fleetsTotalNonTransactableMTDLine = {};

              this.fleetsTotalTransactableMTD = {};
              this.fleetsTotalTransactableMTDLine = {};

              this.usersTotalAllMTD = {};
              this.usersTotalAllMTDLine = {};

              this.usersTotalActiveMTD = {};
              this.usersTotalActiveMTDLine = {};

              this.usersTotalInactiveMTD = {};
              this.usersTotalInactiveMTDLine = {};

              this.enterpriseResourceAllMTD = {};
              this.enterpriseResourceAllMTDLine = {};

              this.enterpriseResourcesTotalActiveMTD = {};
              this.enterpriseResourcesTotalActiveMTDLine = {};

              this.enterpriseResourcesTotalInactiveMTD = {};
              this.enterpriseResourcesTotalInactiveMTDLine = {};
            } else if (data['result']['MTDData'].length !== 0) {
              this.mtdObj = data['result']['MTDData'];
              for (let i = 0; i < data['result']['MTDData'].length; i++) {
                this.monthdays.push(data['result']['MTDData'][i]._id.period);
                this.eventsTotalMTDArray.push(data['result']['MTDData'][i].eventsTotal);
                this.eventRegistrationsTotalMTDArray.push(data['result']['MTDData'][i].eventRegistrationsTotal);
                this.eventsAveragePerFleetMTDArray.push(data['result']['MTDData'][i].eventsAveragePerFleet);
                this.eventRegistrationsAveragePerFleetMTDArray.push(data['result']['MTDData'][i].eventRegistrationsAveragePerFleet);
                this.fleetReservationsTotalMTDArray.push(data['result']['MTDData'][i].fleetReservationsTotal);
                this.userHoursInactiveMTDArray.push(data['result']['MTDData'][i].userHoursInactive);
                this.userHoursActualUnproductiveMTDArray.push(data['result']['MTDData'][i].userHoursActualUnproductive);
                this.userHoursActualProductiveMTDArray.push(data['result']['MTDData'][i].userHoursActualProductive);
                this.fleetReservedHoursAveragePerFleetMTDArray.push(data['result']['MTDData'][i].fleetReservedHoursAveragePerFleet);
                this.userHoursAveragePerUserMTDArray.push(data['result']['MTDData'][i].userHoursAveragePerUser);
                this.fleetsTotalTransactableMTDArray.push(data['result']['MTDData'][i].fleetsTotalTransactable);
                this.fleetsTotalNonTransactableMTDArray.push(data['result']['MTDData'][i].fleetsTotalNonTransactable);
                this.userHoursTotalActiveMTDArray.push(data['result']['MTDData'][i].userHoursTotalActive);
                this.fleetReservationsAveragePerFleetMTDArray.push(data['result']['MTDData'][i].fleetReservationsAveragePerFleet);
                this.eventRegistrationsAveragePerEventMTDArray.push(data['result']['MTDData'][i].eventRegistrationsAveragePerEvent);
                this.userHoursTotalPotentialActiveMTDArray.push(data['result']['MTDData'][i].userHoursTotalPotentialActive);
                this.usersTotalAllMTDArray.push(data['result']['MTDData'][i].usersTotalAll);
                this.fleetsTotalAllMTDArray.push(data['result']['MTDData'][i].fleetsTotalAll);
                this.enterpriseResourcesTotalAllMTDArray.push(data['result']['MTDData'][i].enterpriseResourcesTotalAll);
                this.fleetHoursUsedTransactableMTDArray.push(data['result']['MTDData'][i].fleetHoursUsedTransactable);
                this.fleetHoursUnusedTransactableMTDArray.push(data['result']['MTDData'][i].fleetHoursUnusedTransactable);
                this.unfleetHoursUsableTransactableMTDArray.push(data['result']['MTDData'][i].fleetHoursUnusableTransactable);
                this.fleetReservableHoursTotalMTDArray.push(data['result']['MTDData'][i].fleetReservableHoursTotal);
                this.usersTotalActiveMTDArray.push(data['result']['MTDData'][i].usersTotalActive);
                this.usersTotalInactiveMTDArray.push(data['result']['MTDData'][i].usersTotalInactive);
                this.enterpriseResourcesTotalInactiveMTDArray.push(data['result']['MTDData'][i].enterpriseResourcesTotalInactive);
                this.enterpriseResourcesTotalActiveMTDArray.push(data['result']['MTDData'][i].enterpriseResourcesTotalActive);
                this.fleetsTotalActiveMTDArray.push(data['result']['MTDData'][i].fleetsTotalActive);
                this.fleetsTotalInactiveMTDArray.push(data['result']['MTDData'][i].fleetsTotalInactive);
                this.fleetReservedHoursTotalMTDArray.push(data['result']['MTDData'][i].fleetReservedHoursTotal);
              }
              this.legenddisplay = {
                legend: {
                  labels: {
                    boxWidth: 10,
                    fontSize: 11,
                    padding: 5,
                  },
                  display: true,
                  position: 'bottom'
                },
                tooltips: {
                  titleFontFamily: 'Open Sans'
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }],
                  xAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }]
                }
              };
              // Fleet Usage MTD
              this.fleetUsageMTD = {
                labels: this.monthdays,
                datasets: [
                  {
                    backgroundColor: '#FF0700',
                    // borderColor: '#7CB342',
                    borderColor: '#FF0700',
                    data: this.unfleetHoursUsableTransactableMTDArray,
                    label: 'UnUsable'
                  },
                  {
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    data: this.fleetHoursUsedTransactableMTDArray,
                    label: 'Used'
                  },
                  {
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    data: this.fleetHoursUnusedTransactableMTDArray,
                    label: 'Unused'
                  },
                ]
              };
              this.fleetUsageMTDoptions = {
                tooltips: {
                  titleFontFamily: 'Open Sans'
                },
                legend: {
                  labels: {
                    boxWidth: 10,
                    fontSize: 11,
                    padding: 5,
                  },
                  display: true
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }],
                  xAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }]
                }
              };
              // Fleet Usage MTD Line
              this.fleetUsageMTDLine = {
                labels: this.monthdays,
                datasets: [
                  {
                    fill: false,
                    data: this.unfleetHoursUsableTransactableMTDArray,
                    backgroundColor: '#FF0700',
                    borderColor: '#FF0700',
                    label: 'UnUsable'
                  },
                  {
                    data: this.fleetHoursUsedTransactableMTDArray,
                    fill: false,
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    label: 'Used'
                  },
                  {
                    data: this.fleetHoursUnusedTransactableMTDArray,
                    fill: false,
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    label: 'Unused'
                  },
                ],
              };
              this.legenddisplay = {
                legend: {
                  labels: {
                    boxWidth: 10,
                    fontSize: 11,
                    padding: 5,
                  },
                  display: true,
                  position: 'bottom'
                },
                tooltips: {
                  titleFontFamily: 'Open Sans'
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }],
                  xAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }]
                }
              };
            }

            if (data['result']['YTDData'].length === 0) {
              this.ytdobject = data['result']['YTDData'];
              this.fleetUsageYTD = {};
              this.fleetUsageYTDLine = {};

              this.userActivityYTD = {};
              this.userActivityYTDLine = {};

              this.fleetReservableHoursTotalYTD = {};
              this.fleetReservableHoursTotalYTDLine = {};

              this.fleetReservedHoursTotalYTD = {};
              this.fleetReservableHoursTotalYTDLine = {};

              this.fleetReservedHoursAveragePerFleetYTD = {};
              this.fleetReservedHoursAveragePerFleetYTDLine = {};

              this.userHoursTotalPotentialActiveYTD = {};
              this.userHoursTotalPotentialActiveYTDLine = {};

              this.userHoursTotalActiveYTD = {};
              this.userHoursTotalActiveYTDLine = {};

              this.userHoursAveragePerUserYTD = {};
              this.userHoursAveragePerUserYTDLine = {};

              this.fleetReservationsTotalYTD = {};
              this.fleetReservationsTotalYTDLine = {};

              this.fleetReservationsAveragePerFleetYTD = {};
              this.fleetReservationsAveragePerFleetYTDLine = {};

              this.eventRegistrationsTotalYTD = {};
              this.eventRegistrationsTotalYTDLine = {};

              this.eventRegistrationsAveragePerEventYTD = {};
              this.eventRegistrationsAveragePerEventYTDLine = {};


              this.eventRegistrationsAveragePerFleetYTD = {};
              this.eventRegistrationsAveragePerFleetYTDLine = {};

              this.eventsTotalYTD = {};
              this.eventsTotalYTDLine = {};

              this.eventsAveragePerFleetYTD = {};
              this.eventsAveragePerFleetYTDLine = {};

              this.fleetsTotalAllYTD = {};
              this.fleetsTotalAllYTDLine = {};

              this.fleetsTotalActiveYTD = {};
              this.fleetsTotalActiveYTDLine = {};

              this.fleetsTotalInactiveYTD = {};
              this.fleetsTotalInactiveYTDLine = {};

              this.fleetsTotalNonTransactableYTD = {};
              this.fleetsTotalNonTransactableYTDLine = {};

              this.fleetsTotalTransactableYTD = {};
              this.fleetsTotalTransactableYTDLine = {};

              this.usersTotalAllYTD = {};
              this.usersTotalAllYTDLine = {};

              this.usersTotalActiveYTD = {};
              this.usersTotalActiveYTDLine = {};

              this.usersTotalInactiveYTD = {};
              this.usersTotalInactiveYTDLine = {};

              this.enterpriseresourceAllYTD = {};
              this.enterpriseresourceAllYTDLine = {};

              this.enterpriseResourcesTotalActiveYTD = {};
              this.enterpriseResourcesTotalActiveYTDLine = {};

              this.enterpriseResourcesTotalInactiveYTD = {};
              this.enterpriseResourcesTotalInactiveYTDLine = {};
            } else if (data['result']['YTDData'].length !== 0) {


              this.ytdobject = data['result']['YTDData'];
              for (let i = 0; i < data['result']['YTDData'].length; i++) {

                this.yeardate.push(data['result']['YTDData'][i]._id.period);
                this.eventsTotalYTDArray.push(data['result']['YTDData'][i].eventsTotal);
                this.eventRegistrationsTotalYTDArray.push(data['result']['YTDData'][i].eventRegistrationsTotal);
                this.eventsAveragePerFleetYTDArray.push(data['result']['YTDData'][i].eventsAveragePerFleet);
                this.eventRegistrationsAveragePerFleetYTDArray.push(data['result']['YTDData'][i].eventRegistrationsAveragePerFleet);
                this.fleetReservationsTotalYTDArray.push(data['result']['YTDData'][i].fleetReservationsTotal);
                this.userHoursActualProductiveYTDArray.push(data['result']['YTDData'][i].userHoursActualProductive);
                this.userHoursActualUnproductiveYTDArray.push(data['result']['YTDData'][i].userHoursActualUnproductive);
                this.userHoursInactiveYTDArray.push(data['result']['YTDData'][i].userHoursInactive);
                this.fleetReservedHoursAveragePerFleetYTDArray.push(data['result']['YTDData'][i].fleetReservedHoursAveragePerFleet);
                this.userHoursAveragePerUserYTDArray.push(data['result']['YTDData'][i].userHoursAveragePerUser);
                this.fleetsTotalTransactableYTDArray.push(data['result']['YTDData'][i].fleetsTotalTransactable);
                this.fleetsTotalNonTransactableYTDArray.push(data['result']['YTDData'][i].fleetsTotalNonTransactable);
                this.userHoursTotalActiveYTDArray.push(data['result']['YTDData'][i].userHoursTotalActive);
                this.fleetReservationsAveragePerFleetYTDArray.push(data['result']['YTDData'][i].fleetReservationsAveragePerFleet);
                this.eventRegistrationsAveragePerEventYTDArray.push(data['result']['YTDData'][i].eventRegistrationsAveragePerEvent);
                this.userHoursTotalPotentialActiveYTDArray.push(data['result']['YTDData'][i].userHoursTotalPotentialActive);
                this.usersTotalAllYTDArray.push(data['result']['YTDData'][i].usersTotalAll);
                this.fleetsTotalAllYTDArray.push(data['result']['YTDData'][i].fleetsTotalAll);
                this.enterpriseResourcesTotalAllYTDArray.push(data['result']['YTDData'][i].enterpriseResourcesTotalAll);
                this.fleetHoursUsedTransactableYTDArray.push(data['result']['YTDData'][i].fleetHoursUsedTransactable);
                this.fleetHoursUnusedTransactableYTDArray.push(data['result']['YTDData'][i].fleetHoursUnusedTransactable);
                this.unfleetHoursUsableTransactableYTD.push(data['result']['YTDData'][i].fleetHoursUnusableTransactable);
                this.fleetReservableHoursTotalYTDArray.push(data['result']['YTDData'][i].fleetReservableHoursTotal);
                this.usersTotalActiveYTDArray.push(data['result']['YTDData'][i].usersTotalActive);
                this.usersTotalInactiveYTDArray.push(data['result']['YTDData'][i].usersTotalInactive);
                this.enterpriseResourcesTotalInactiveYTDArray.push(data['result']['YTDData'][i].enterpriseResourcesTotalInactive);
                this.enterpriseResourcesTotalActiveYTDArray.push(data['result']['YTDData'][i].enterpriseResourcesTotalActive);
                this.fleetsTotalActiveYTDArray.push(data['result']['YTDData'][i].fleetsTotalActive);
                this.fleetsTotalInactiveYTDArray.push(data['result']['YTDData'][i].fleetsTotalInactive);
                this.fleetReservedHoursTotalYTDArray.push(data['result']['YTDData'][i].fleetReservedHoursTotal);
              }
              this.legenddisplay = {
                legend: {
                  labels: {
                    boxWidth: 10,
                    fontSize: 11,
                    padding: 5,
                  },
                  display: true,
                  position: 'bottom'
                },
                tooltips: {
                  titleFontFamily: 'Open Sans'
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }],
                  xAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }]
                }
              };
              // Fleet Usage YTD
              this.fleetUsageYTD = {
                labels: this.yeardate,
                datasets: [
                  {
                    backgroundColor: '#FF0700',
                    borderColor: '#FF0700',
                    data: this.unfleetHoursUsableTransactableYTD,
                    label: 'UnUsable'
                  },
                  {
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    data: this.fleetHoursUsedTransactableYTDArray,
                    label: 'Used'
                  },
                  {
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    data: this.fleetHoursUnusedTransactableYTDArray,
                    label: 'Unused'
                  },
                ]
              };
              // Fleet Usage YTD Line
              this.fleetUsageYTDLine = {
                labels: this.yeardate,
                datasets: [
                  {
                    data: this.unfleetHoursUsableTransactableYTD,
                    borderColor: '#FF0700',
                    backgroundColor: '#FF0700',
                    label: 'UnUsable',
                    fill: false,
                  },
                  {
                    data: this.fleetHoursUsedTransactableYTDArray,
                    fill: false,
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    label: 'Used'
                  },
                  {
                    data: this.fleetHoursUnusedTransactableYTDArray,
                    fill: false,
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    label: 'Unused'
                  },
                ]
              };
              this.options = {
                legend: {
                  display: false,
                  position: 'right'
                }
              };
            }
            if (data['result']['LTDData'].length === 0) {
              this.ltdObj = data['result']['LTDData'];
              this.fleetUsageLTD = {};
              this.fleetUsageLTDLine = {};

              this.userActivityLTD = {};
              this.userActivityLineLTD = {};

              this.fleetReservableHoursTotalLTD = {};
              this.fleetReservableHoursTotalLTDLine = {};

              this.fleetReservedHoursTotalLTD = {};
              this.fleetReservableHoursTotalLTDLine = {};

              this.fleetReservedHoursAveragePerFleetLTD = {};
              this.fleetReservedHoursAveragePerFleetLTDLine = {};

              this.userHoursTotalPotentialActiveLTD = {};
              this.userHoursTotalPotentialActiveLTDLine = {};

              this.userHoursTotalActiveLTD = {};
              this.userHoursTotalActiveLTDLine = {};

              this.userHoursAveragePerUserLTD = {};
              this.userHoursAveragePerUserLTDLine = {};

              this.fleetReservationsTotalLTD = {};
              this.fleetReservationsTotalLTDLine = {};

              this.fleetReservationsAveragePerFleetLTD = {};
              this.fleetReservationsAveragePerFleetLTDLine = {};

              this.eventRegistrationsTotalLTD = {};
              this.eventRegistrationsTotalLTDLine = {};

              this.eventRegistrationsAveragePerEventLTD = {};
              this.eventRegistrationsAveragePerEventLTDLine = {};


              this.eventRegistrationsAveragePerFleetLTD = {};
              this.eventRegistrationsAveragePerFleetLTDLine = {};

              this.eventsTotalLTD = {};
              this.eventsTotalLTDLine = {};

              this.eventsAveragePerFleetLTD = {};
              this.eventsAveragePerFleetLTDLine = {};

              this.fleetsTotalAllLTD = {};
              this.fleetsTotalAllLTDLine = {};

              this.fleetsTotalActiveLTD = {};
              this.fleetsTotalActiveLTDLine = {};

              this.fleetsTotalInactiveLTD = {};
              this.fleetsTotalInactiveLTDLine = {};

              this.fleetsTotalNonTransactableLTD = {};
              this.fleetsTotalNonTransactableLTDLine = {};

              this.fleetsTotalTransactableLTD = {};
              this.fleetsTotalTransactableLTDLine = {};

              this.usersTotalAllLTD = {};
              this.usersTotalAllLTDLine = {};

              this.usersTotalActiveLTD = {};
              this.usersTotalActiveLTDLine = {};

              this.usersTotalInactiveLTD = {};
              this.usersTotalInactiveLTDLine = {};


              this.enterpriseResourcesTotalActiveLTD = {};
              this.enterpriseResourcesTotalActiveLTDLine = {};

              this.enterpriseResourcesTotalInactiveLTD = {};
              this.enterpriseResourcesTotalInactiveLTDLine = {};
            } else if (data['result']['LTDData'].length !== 0) {
              this.ltdObj = data['result']['LTDData'];
              for (let i = 0; i < data['result']['LTDData'].length; i++) {

                this.ltddate.push(data['result']['LTDData'][i]._id.period);
                this.eventsTotalLTDArray.push(data['result']['LTDData'][i].eventsTotal);
                this.eventRegistrationsTotalLTDArray.push(data['result']['LTDData'][i].eventRegistrationsTotal);
                this.eventsAveragePerFleetLTDArray.push(data['result']['LTDData'][i].eventsAveragePerFleet);
                this.eventRegistrationsAveragePerFleetLTDArray.push(data['result']['LTDData'][i].eventRegistrationsAveragePerFleet);
                this.fleetReservationsTotalLTDArray.push(data['result']['LTDData'][i].fleetReservationsTotal);
                this.userHoursActualProductiveLTDArray.push(data['result']['LTDData'][i].userHoursActualProductive);
                this.userHoursActualUnproductiveLTDArray.push(data['result']['LTDData'][i].userHoursActualUnproductive);
                this.userHoursInactiveLTDArray.push(data['result']['LTDData'][i].userHoursInactive);
                this.fleetReservedHoursAveragePerFleetLTDArray.push(data['result']['LTDData'][i].fleetReservedHoursAveragePerFleet);
                this.userHoursAveragePerUserLTDArray.push(data['result']['LTDData'][i].userHoursAveragePerUser);
                this.fleetsTotalTransactableLTDArray.push(data['result']['LTDData'][i].fleetsTotalTransactable);
                this.fleetsTotalNonTransactableLTDArray.push(data['result']['LTDData'][i].fleetsTotalNonTransactable);
                this.userHoursTotalActiveLTDArray.push(data['result']['LTDData'][i].userHoursTotalActive);
                this.fleetReservationsAveragePerFleetLTDArray.push(data['result']['LTDData'][i].fleetReservationsAveragePerFleet);
                this.eventRegistrationsAveragePerEventLTDArray.push(data['result']['LTDData'][i].eventRegistrationsAveragePerEvent);
                this.userHoursTotalPotentialActiveLTDArray.push(data['result']['LTDData'][i].userHoursTotalPotentialActive);
                this.usersTotalAllLTDArray.push(data['result']['LTDData'][i].usersTotalAll);
                this.fleetsTotalAllLTDArray.push(data['result']['LTDData'][i].fleetsTotalAll);
                this.enterpriseResourcesTotalAllLTDArray.push(data['result']['LTDData'][i].enterpriseResourcesTotalAll);
                this.fleetHoursUsedTransactableLTDArray.push(data['result']['LTDData'][i].fleetHoursUsedTransactable);
                this.fleetHoursUnusedTransactableLTDArray.push(data['result']['LTDData'][i].fleetHoursUnusedTransactable);
                this.unfleetHoursUsableTransactableLTDArray.push(data['result']['LTDData'][i].fleetHoursUnusableTransactable);
                this.fleetReservableHoursTotalLTDArray.push(data['result']['LTDData'][i].fleetReservableHoursTotal);
                this.usersTotalActiveLTDArray.push(data['result']['LTDData'][i].usersTotalActive);
                this.usersTotalInactiveLTDArray.push(data['result']['LTDData'][i].usersTotalInactive);
                this.enterpriseResourcesTotalActiveLTDArray.push(data['result']['LTDData'][i].enterpriseResourcesTotalActive);
                this.enterpriseResourcesTotalInactiveLTDArray.push(data['result']['LTDData'][i].enterpriseResourcesTotalInactive);
                this.fleetsTotalActiveLTDArray.push(data['result']['LTDData'][i].fleetsTotalActive);
                this.fleetsTotalInactiveLTDArray.push(data['result']['LTDData'][i].fleetsTotalInactive);
                this.fleetReservedHoursTotalLTDArray.push(data['result']['LTDData'][i].fleetReservedHoursTotal);

              }
              this.legenddisplay = {
                legend: {
                  labels: {
                    boxWidth: 10,
                    fontSize: 11,
                    padding: 5,
                  },
                  display: true,
                  position: 'bottom'
                },
                tooltips: {
                  titleFontFamily: 'Open Sans',
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }],
                  xAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }]
                }
              };
              // Fleet Usage LTD
              this.fleetUsageLTD = {
                labels: this.ltddate,
                datasets: [
                  {
                    backgroundColor: '#FF0700',
                    borderColor: '#FF0700',
                    data: this.unfleetHoursUsableTransactableLTDArray,
                    label: 'UnUsable'
                  },
                  {
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    data: this.fleetHoursUsedTransactableLTDArray,
                    label: 'Used'
                  },
                  {
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    data: this.fleetHoursUnusedTransactableLTDArray,
                    label: 'Unused'
                  },
                ],
              };
              // Flee tUsage LTD
              this.fleetUsageLTDLine = {
                labels: this.ltddate,
                datasets: [
                  {
                    fill: false,
                    backgroundColor: '#FF0700',
                    borderColor: '#FF0700',
                    data: this.unfleetHoursUsableTransactableLTDArray,
                    label: 'UnUsable'
                  },
                  {
                    fill: false,
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    data: this.fleetHoursUsedTransactableLTDArray,
                    label: 'Used'
                  },
                  {
                    fill: false,
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    data: this.fleetHoursUnusedTransactableLTDArray,
                    label: 'Unused'
                  },
                ],
              };
              this.options = {
                legend: {
                  display: false,
                  position: 'right'
                },
              };
            }
            if (data['result']['WLTDData'].length === 0) {
              this.ltwobject = data['result']['WLTDData'];

              this.fleetUsageLTW = {};
              this.fleetUsageLTWLine = {};

              this.userActivityLTW = {};
              this.userActivityLineLTW = {};

              this.fleetReservableHoursTotalLTW = {};
              this.fleetReservableHoursTotalLTWLine = {};

              this.fleetReservedHoursTotalLTW = {};
              this.fleetReservableHoursTotalLTWLine = {};

              this.fleetReservedHoursAveragePerFleetLTW = {};
              this.fleetReservedHoursAveragePerFleetLTWLine = {};

              this.userHoursTotalPotentialActiveLTW = {};
              this.userHoursTotalPotentialActiveLTWLine = {};

              this.userHoursTotalActiveLTW = {};
              this.userHoursTotalActiveLTWLine = {};

              this.userHoursAveragePerUserLTW = {};
              this.userHoursAveragePerUserLTWLine = {};

              this.fleetReservationsTotalLTW = {};
              this.fleetReservationsTotalLTWLine = {};

              this.fleetReservationsAveragePerFleetLTW = {};
              this.fleetReservationsAveragePerFleetLTWLine = {};

              this.eventRegistrationsTotalLTW = {};
              this.eventRegistrationsTotalLTWLine = {};

              this.eventRegistrationsAveragePerEventLTW = {};
              this.eventRegistrationsAveragePerEventLTWLine = {};


              this.eventRegistrationsAveragePerFleetLTW = {};
              this.eventRegistrationsAveragePerFleetLTWLine = {};

              this.eventsTotalLTW = {};
              this.eventsTotalLTWLine = {};

              this.eventsAveragePerFleetLTW = {};
              this.eventsAveragePerFleetLTWLine = {};

              this.fleetsTotalAllLTW = {};
              this.fleetsTotalAllLTWLine = {};

              this.fleetsTotalActiveLTW = {};
              this.fleetsTotalActiveLTWLine = {};

              this.fleetsTotalInactiveLTW = {};
              this.fleetsTotalInactiveLTWLine = {};

              this.fleetsTotalNonTransactableLTW = {};
              this.fleetsTotalNonTransactableLTWLine = {};

              this.fleetsTotalTransactableLTW = {};
              this.fleetsTotalTransactableLTWLine = {};

              this.usersTotalAllLTW = {};
              this.usersTotalAllLTWLine = {};

              this.usersTotalActiveLTW = {};
              this.usersTotalActiveLTWLine = {};

              this.usersTotalInactiveLTW = {};
              this.usersTotalInactiveLTWLine = {};


              this.enterpriseResourcesTotalActiveLTW = {};
              this.enterpriseResourcesTotalActiveLTWLine = {};

              this.enterpriseResourcesTotalInactiveLTW = {};
              this.enterpriseResourcesTotalInactiveLTWLine = {};
            } else if (data['result']['WLTDData'].length !== 0) {


              this.ltwobject = data['result']['WLTDData'];
              for (let i = 0; i < data['result']['WLTDData'].length; i++) {
                this.weekslabel.push(data['result']['WLTDData'][i]._id.period);
                this.eventsTotalLTWArray.push(data['result']['WLTDData'][i].eventsTotal);
                this.eventRegistrationsTotalLTWArray.push(data['result']['WLTDData'][i].eventRegistrationsTotal);
                this.eventsAveragePerFleetLTWArray.push(data['result']['WLTDData'][i].eventsAveragePerFleet);
                this.eventRegistrationsAveragePerFleetLTWArray.push(data['result']['WLTDData'][i].eventRegistrationsAveragePerFleet);
                this.fleetReservationsTotalLTWArray.push(data['result']['WLTDData'][i].fleetReservationsTotal);
                this.userHoursActualProductiveLTWArray.push(data['result']['WLTDData'][i].userHoursActualProductive);
                this.userHoursActualUnproductiveLTWArray.push(data['result']['WLTDData'][i].userHoursActualUnproductive);
                this.userHoursInactiveLTWArray.push(data['result']['WLTDData'][i].userHoursInactive);
                this.fleetReservedHoursAveragePerFleetLTWArray.push(data['result']['WLTDData'][i].fleetReservedHoursAveragePerFleet);
                this.userHoursAveragePerUserLTWArray.push(data['result']['WLTDData'][i].userHoursAveragePerUser);
                this.fleetsTotalTransactableLTWArray.push(data['result']['WLTDData'][i].fleetsTotalTransactable);
                this.fleetsTotalNonTransactableLTWArray.push(data['result']['WLTDData'][i].fleetsTotalNonTransactable);
                this.userHoursTotalActiveLTWArray.push(data['result']['WLTDData'][i].userHoursTotalActive);
                this.fleetReservationsAveragePerFleetLTWArray.push(data['result']['WLTDData'][i].fleetReservationsAveragePerFleet);
                this.eventRegistrationsAveragePerEventLTWArray.push(data['result']['WLTDData'][i].eventRegistrationsAveragePerEvent);
                this.userHoursTotalPotentialActiveLTWArray.push(data['result']['WLTDData'][i].userHoursTotalPotentialActive);
                this.usersTotalAllLTWArray.push(data['result']['WLTDData'][i].usersTotalAll);
                this.fleetsTotalAllLTWArray.push(data['result']['WLTDData'][i].fleetsTotalAll);
                this.enterpriseResourcesTotalAllLTWArray.push(data['result']['WLTDData'][i].enterpriseResourcesTotalAll);
                this.fleetHoursUsedTransactableLTWArray.push(data['result']['WLTDData'][i].fleetHoursUsedTransactable);
                this.fleetHoursUnusedTransactableLTWArray.push(data['result']['WLTDData'][i].fleetHoursUnusedTransactable);
                this.unfleetHoursUsableTransactableLTWArray.push(data['result']['WLTDData'][i].fleetHoursUnusableTransactable);
                this.fleetReservableHoursTotalLTWArray.push(data['result']['WLTDData'][i].fleetReservableHoursTotal);
                this.usersTotalActiveLTWArray.push(data['result']['WLTDData'][i].usersTotalActive);
                this.usersTotalInactiveLTWArray.push(data['result']['WLTDData'][i].usersTotalInactive);
                this.enterpriseResourcesTotalActiveLTWArray.push(data['result']['WLTDData'][i].enterpriseResourcesTotalActive);
                this.enterpriseResourcesTotalInactiveLTWArray.push(data['result']['WLTDData'][i].enterpriseResourcesTotalInactive);
                this.fleetsTotalActiveLTWArray.push(data['result']['WLTDData'][i].fleetsTotalActive);
                this.fleetsTotalInactiveLTWArray.push(data['result']['WLTDData'][i].fleetsTotalInactive);
                this.fleetReservedHoursTotalLTWArray.push(data['result']['WLTDData'][i].fleetReservedHoursTotal);

              }
              this.legenddisplay = {
                legend: {
                  labels: {
                    boxWidth: 10,
                    fontSize: 11,
                    padding: 5,
                  },
                  display: true,
                  position: 'bottom'
                },
                tooltips: {
                  titleFontFamily: 'Open Sans'
                },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }],
                  xAxes: [
                    {
                      ticks: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      },
                      pointLabels: {
                        fontFamily: 'Open Sans',
                        fontSize: 10,
                      }
                    }]
                }
              };

              // Fleet Usage LTW
              this.fleetUsageLTW = {
                labels: this.weekslabel,
                datasets: [
                  {
                    backgroundColor: '#FF0700',
                    borderColor: '#FF0700',
                    data: this.unfleetHoursUsableTransactableLTWArray,
                    label: 'UnUsable'
                  },
                  {
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    data: this.fleetHoursUsedTransactableLTWArray,
                    label: 'Used'
                  },
                  {
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    data: this.fleetHoursUnusedTransactableLTWArray,
                    label: 'Unused'
                  },
                ],
              };
              // Flee tUsage LTW
              this.fleetUsageLTWLine = {
                labels: this.weekslabel,
                datasets: [
                  {
                    fill: false,
                    backgroundColor: '#FF0700',
                    borderColor: '#FF0700',
                    data: this.unfleetHoursUsableTransactableLTWArray,
                    label: 'UnUsable'
                  },
                  {
                    fill: false,
                    backgroundColor: '#009000',
                    borderColor: '#009000',
                    data: this.fleetHoursUsedTransactableLTWArray,
                    label: 'Used'
                  },
                  {
                    fill: false,
                    backgroundColor: '#FF9700',
                    borderColor: '#FF9700',
                    data: this.fleetHoursUnusedTransactableLTWArray,
                    label: 'Unused'
                  },
                ],
              };
              this.options = {
                legend: {
                  display: false,
                  position: 'right'
                },
              };
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
              }
              if (statuscode === '9997') {
                this.usersdata = {};
              }
              break;
          }
        });
    }
  }
  clear() {
    this.enterpriselist = [];
    this.startdate = '';
    this.enddate = '';
    this.enterprisesName = '';
    this.getEnterpriseResourceCountryAndCount();
    this.getFleetByCountryAndCount();
    this.getEventsCountryAndCount();
    this.getFleetReservationCountryAndCount();
    this.getUsersByCountryAndCount();
    this.getEnterpriseNamesList();
    this.getCommonMTD();
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.startdate = '';
    this.enddate = '';
    this.error = '';
  }

}

