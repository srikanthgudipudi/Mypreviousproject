/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* FleetsModalComponent have below methods:
* ngOnInit(): To load the userToken at loading time.
* showChildModal(updateaction, fleetdata): To show the child modal.
* viewfile(fileSrc, filename): To view multiple files.
* getEnterpriseNamesList(): To get Enterprise Name list.
* getCountries():To Get Countries list.
* getStatesList(selectedCountry: any): To Get List of States.
* getTimeZones(): To get timezones based on country.
* getCountryCodes(): To get country code list.
* getAmountFormates(): To get currency format based on country.
* getLookupType(): Get Lookup type list.
* getDateFormates(): To Get Dateformate  list.
* getLanguages(): To get Languages.
* getCurrencys():To Get Currency List.
* getThemes(): To Get Themes  list.
* getactivateReasons(): To get activate reasons.
* getinactivateReasons(): To get inactivate reasons.
* getRowsperPage(): to Get Rows Per page list.
* getStatusList(): To get status list.
* getCountryStates(countryName) : To get states based on country.
* getCountryStatesEdit(countryName): To get states based on country.
* createSingleFleet(fleet): To Create single fleet.
* imageUploadedFleet(event): To upload the fleet image.
* imageUploaded(event): To upload json image.
* getfloorvalue(parentpath, fleetcode): To check floor plan is present or not for praent fleet.
* getfleetType(value):To Get Fleet Type.
* getFleetTypeAttributes(fleetType, enterpriseId): To Get Fleet Type Attributes.
* getEnterpriseType(value): To Get Enterprise Type.
* hyphen_generate_mobile(value): hyphen_generate_mobile.
* updateFleet(fleet): Single Fleet Update.
* fleetsVisuals(event): To upload  images in the fleetvisuals.
* removeFile(index): To remove the new uploading images.
* removeOldFile(index): To remove the oldfile images.
* setDisplayDates(filesList: any): To display multiple files uploade date.
* deleteFleets(): To delete single fleet.
* activatefleet(fleet_id): To Activate fleet.
* inactivateFleet(fleet_id): To Inactivate fleet.
* getChildType(): To get child type list.
* viewFleet(id, enterpriseId): View Fleets.
* ChangeStatus(value): To get selected status.
* getreason(reason): To get selected reason.
* changetheme(theme): To get selected theme.
* keyPress(e): To Handle Key press.
* getMobileCountryCode(countryCode): To get selected moblie country code values in Add.
* getMobileCountryCodeEdit(countryCode): To get selected moblie country code values in Edit.
* changechildpaths(changechildpath): To get selected path
* validAttributes(): To Check valid attribute in add.
* editvalidAttributes(): To Check valid attribute in edit.
* getEnterprisepathById(enterprise): To Get enterprise Path List.
* getTimezone(value):  Get Timezone.
* fleetpath(value): To get selected fleet path.
* getParentFleetList(): To get Parent fleets list.
* getFleetDetails(fleetid): To Get selected Fleet Details.
* changerowsperpage(rowperpage): To get selected rowperpage.
* getLanguage(value): Get Selected language.
* getupdaterowsperpage(updaterowperpage): To get updated rows per page.
* getDateFormat(value):Get Selected Date Format.
* getCurrency(value): Get Selected Curreny.
* getCurrencyformat(value):  Get Selected Curreny Format.
* gettheme(value): Get Selected theme.
* getTimezones(value): To Get Timezone.
* getselectCountry(value): To Get Selected Country.
* getselectState(value): Get Selected State.
* autocase(text): Auto capitalization for each word.
* closePopupModal(): Close childModal popup.
* clearmessage(): To clear the messages.
* hideChildModal(): To hide the popup modal.
*/
import {
  Component, OnInit, Inject, ViewChild, ViewContainerRef,
  AfterContentChecked, Output, EventEmitter, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { FleetsDetails } from '../fleetslist/fleets.component';
import { FleetService } from './fleet.service';
import { Enterpriseservice } from '../../../admin/enterprises/enterprisepopup/enterprise.service';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-fleets-popup',
  templateUrl: 'fleet.html',
  providers: [FleetService, Enterpriseservice]
})
export class FleetComponent implements OnInit, AfterContentChecked {
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  newfleetvisualsImages: any[];
  fleetvisualsImages: any[];
  fleetenterpriseId: any;
  selectedenterpriseId: any;
  countries: any[];
  galleryImages: any[];
  accessibility: any[];
  fleet: any;
  createfleet: any;
  parentpath: any;
  childpath: any;
  attributesarray: any[];
  updateaction: any;
  enterpriseid: any;
  fleetassetid: any;
  currencies: any;
  fleetid: any;
  userAccount: any;
  enterpriseStatus: any;
  reasonsList: any;
  reason: any;
  comment: any;
  enabled: any;
  transactable: boolean;
  eventsenabled: boolean;
  special: boolean;
  path: any;
  fleetimg: any;
  name: any;
  type: any;
  fleetTypes: any;
  isTaggable: any;
  isTransactable: any;
  isSpecial: any;
  isEventsEnabled: any;
  isEnabled: any;
  longitude: any;
  latitude: any;
  error: any;
  checkBoxValue: any;
  pagename: string;
  action: any;
  imgName: any;
  image: any;
  josnfile: any;
  josnfilename: any;
  userToken: any;
  toastermessage: any;
  themes: any;
  storage: Storage = window.localStorage;
  actionType: any;
  fleetData: FleetsDetails;
  errorMessage: string;
  timeZone: any;
  enterpriselist: any[];
  enterprisepathlist: any[];
  errorpass: string;
  errorReg: string;
  dummy: any;
  minsize: any = 4;
  maxsize: any = 20;
  enterprisesSize: any;
  states: any;
  languages: any;
  amountformats: any;
  datefomat: any;
  value: any;
  enterpriseName: any;
  fleetName: any;
  error1: any;
  defaultLanguage: any;
  attributeList = [];
  additionalInfo: any;
  myattribute: any;
  defaultLanguage1: any;
  defaultCurrency: any;
  currencyFormat: any;
  dateFormat: any;
  defaultTheme: any;
  defaultTimezone: any;
  attributeId: any;
  attributeText: any;
  state: any;
  selectCountry: any;
  enterpriseId: any;
  fleetType: any;
  updatedAt: any;
  enterpriseIconFilePath: any;
  createdAt: any;
  value1: any;
  fleetimgfile: any = '';
  imgSrc: any = '';
  attributesarray1: any;
  imageName: any;
  addinfo: any;
  timezoneCode: any;
  updateAt: any;
  createAt: any;
  rowsPerPage: any;
  perpagecount: any;
  rowsPerpages: any;
  editlookup: any = [];
  worknumbercntrycode: any;
  worknumext: any;
  worknumber: any;
  childfleetTypes: any;
  reasonValue: any;
  retext: any;
  reasons: any;
  inactivereasons: any;
  statuslist: any;
  reasonActivate: any;
  reasonInactivate: any;
  editfleetname: any;
  dafaultActive = 'Active';
  imagestatus: any = false;
  imageTypeError: any = false;
  jsonTypeError: any = false;
  constimage: any;
  value2: any;
  floorPlanAvailable: any;
  floorplanavilable: boolean;
  constimagepath: any;
  parentfleet: any;
  loginUserDateFormat: any;
  fleetfloorimg: any = '';
  fleetjsonfile: any = '';
  fleetPathBoundaiesjsonfile: any = '';
  floorMetaDatajsonfile: any = '';
  worknumbercntrycodesplit: any[];
  worknumbercountrycode: any;
  email: any;
  addressLine1: any;
  addressLine2: any;
  city: any;
  country: any;
  addresszip: any;
  notes: any;
  newAttributeId: any;
  newAttributeText: any;
  nelatitude: any;
  nelongitude: any;
  nwlatitude: any;
  nwlongitude: any;
  selatitude: any;
  selongitude: any;
  swlatitude: any;
  swlongitude: any;
  floorPlanDetails: any;
  floorcheck: any;
  floormapimageMaxSize = 2048;
  floormapimageMinSize = 4;
  emptyimg: any;
  emptyfloorimg: any;
  emptyjsonfile: any;
  array: any;
  size: any;
  bytes: any;
  index: any;
  private LONG_LAT_PAT1 = '^[-+](?:[0-9]|[1-9][0-9]|1[0-7][0-9])(\\.\\d{1,13})?$';
  private LONG_LAT_PAT = '^([-+](?:180(?:(?:\.0{1,13})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,13})?)?)?)$';
  registerForm: FormGroup;
  mobileCountryCode: any;
  countryCodes: any;
  errMsg1: any;
  errMsg2: any;
  errMsg3: any;
  advancedReservationWindowInDays: any;
  earlyCheckinWindowInMins: any;
  expirationGracePeriodInMins: any;
  maxActiveReservationsPerUser: any;
  maxReservationWindowInHrs: any;
  reservationCanBeBumped: boolean;
  reservationReminderWindowInMins: any;
  sendReservationReminders: any;
  checkinRequired: any;
  longTermReservationEligible: any;
  configurable: any;
  fleetsVisual: File[] = [];
  oldFiles = [];
  removedFiles = [];
  fileSrc = '';
  fleetVisualsImageTypeError: any = false;
  currentutc: any;
  visualFilename = '';
  floorImageName: any;
  entrylatitude: any;
  entrylongitude: any;
  floorPlanFleetObj: any;
  fleetCommonName: any;
  selectedfleettypevalues: any;
  specialvalue: boolean;
  transactablevalue: boolean;
  eventsenabledvalue: boolean;
  startZoomValue: any;
  finalZoomValue: any;
  @ViewChild('childModal') public childModal: ModalDirective;

  /**---- Constructor for fleet ----*/
  constructor(private singleEnterpriseService: FleetService,
    private enterpriseService: Enterpriseservice,
    private sanitizer: DomSanitizer,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private router: Router, private vcr: ViewContainerRef, private formBuilder: FormBuilder,
    @Inject('defaultCountry') public defaultCountry: string,
    @Inject('defaultState') public defaultState: string, @Inject('defaultCurrency') private defaultCurrency1: string,
    @Inject('defaultLanguage') public defaultLanguage2: string, @Inject('defaultTimezone') private defaultTimezone2: string,
    @Inject('defaultTheme') public defaultTheme2: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    @Inject('dateFormat') public dateFormat2: string, @Inject('currencyFormat') private currencyFormat2: string) {
    this.selectCountry = defaultCountry;
  }
  /**---- To load the user token at loading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userToken = window.localStorage.getItem('token');
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else {
      this.userToken = window.localStorage.getItem('token');
      this.getEnterpriseNamesList();
      this.getLanguages();
      this.getDateFormates();
      this.getCurrencys();
      this.getAmountFormates();
      this.getThemes();
      this.getCountryCodes();
      this.fleet = {};
      this.fleet.type = {};
      this.fleet.contactDetails = {};
      this.fleet.address = {};
      this.fleet.preferences = {};
      this.fleet.settings = {};
      this.fleet.attributes = {};
      this.fleet.geoCoordinates = [];
      this.fleet.attributes = {};
      this.createfleet = {};
      this.createfleet.contactDetails = {};
      this.createfleet.address = {};
      this.createfleet.preferences = {};
      this.createfleet.settings = {};
      this.createfleet.enterprise = {};
      this.createfleet.address.geoCoordinates = [];
      this.createfleet.attributes = [];
      this.getStatusList();
    }
  }
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
  }

  /**---- To show child modal ----*/
  public showChildModal(updateaction, fleetdata): void {
    this.updateaction = updateaction;
    this.error = '';
    this.comment = '';
    if (fleetdata) {
      this.fleetassetid = fleetdata;
      this.fleetid = fleetdata._id;
      this.fleetenterpriseId = fleetdata.enterprise.enterpriseId;
      this.parentpath = '';
    }
    this.getCountries();
    this.getTimeZones();
    this.attributesarray = [];
    if (updateaction === 'EDIT' || updateaction === 'VIEW' || updateaction === 'DELETE'
      || updateaction === 'Active' || updateaction === 'Inactive') {
      this.fleetvisualsImages = [];
      this.floorPlanDetails = {};
      this.fleet = fleetdata;
      this.floorPlanDetails = fleetdata.floorPlanDetails;
      this.enterpriseName = this.fleet.enterprise.enterpriseName;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.timezoneCode = this.timezoneCode.split('-');
      this.updateAt = moment(this.fleet.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.fleet.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.longitude = this.fleet.address.geoCoordinates[1].replace('%2B', '+');
      this.latitude = this.fleet.address.geoCoordinates[0].replace('%2B', '+');
      this.oldFiles = this.fleet.visuals;
      for (let i = 0; i < this.oldFiles.length; i++) {
        let img = this.oldFiles[i].visualFileName;
        if (img !== null &&
          img !== undefined && img !== '') {
          if (img.length > 19) {
            img = img.substring(0, 19) + '..' + img.split('.')[1];
          }
        }
        this.fleetvisualsImages.push(img);
      }
      this.setDisplayDates(this.oldFiles);
      this.fileSrc = '';
      this.removedFiles = [];
      this.fleetsVisual = [];
      this.imgSrc = this.apiEndPoint + '/' + this.fleet.fleetImageFilePath + '/' + this.fleet.fleetImageFileName;
      this.imageName = this.fleet.fleetImageFileName;
      let img = this.imageName;
      if (img !== null && img !== undefined && img !== '') {
        if (img.length > 20) {
          img = img.substring(0, 20) + '..' + img.split('.')[1];
        }
      }
      this.imageName = img;
      this.image = this.apiEndPoint + '/' + this.fleet.fleetImageFilePath;
      this.imgName = this.fleet.floorPlanImageFileName;
      this.floorImageName = this.floorPlanDetails.floorPlanImageFileName;
      if (this.floorImageName !== null && this.floorImageName !== undefined && this.floorImageName !== '') {
        if (this.floorImageName.length > 8) {
          this.floorImageName = this.floorImageName.substring(0, 8) + '..' + this.floorImageName.split('.')[1];
        }
      }
      if (this.imgName !== null) {
        this.image = this.image + '/' + this.imgName;
      }
      this.josnfile = this.apiEndPoint + '/' + this.fleet.fleetImageFilePath;
      this.josnfilename = this.fleet.floorPlanDetails.floorPlanJSONFileName;
      if (this.josnfilename !== null) {
        this.josnfile = this.josnfile + '/' + this.josnfilename;
      }
      this.enterpriseIconFilePath = fleetdata.enterprise.enterpriseId.enterpriseIconFilePath + '/'
        + fleetdata.enterprise.enterpriseId.enterpriseIcon;
      for (const key of Object.keys(this.fleet.attributes)) {
        this.attributesarray.push({ 'key': key, 'value': this.fleet.attributes[key] });
      }
    }
    switch (updateaction) {
      case 'VIEW':
        this.pagename = 'COMMON_PAGE_TITLES.VIEW_FLEET';
        this.actionType = 'View';
        this.galleryImages = [];
        this.fleet = fleetdata;
        this.retext = true;
        this.reasonActivate = fleetdata.reasonActivate;
        this.reasonInactivate = fleetdata.reasonInactivate;
        this.worknumbercntrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.worknumber = this.fleet.contactDetails.workNumber;
        this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleet.contactDetails.workNumber;
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.fleet.contactDetails.workNumberExtn;
        }
        this.getFleetTypeAttributes(this.fleet.fleetType, this.fleet.enterprise.enterpriseId._id);
        this.advancedReservationWindowInDays = fleetdata.settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = fleetdata.settings.earlyCheckinWindowInMins;
        this.expirationGracePeriodInMins = fleetdata.settings.expirationGracePeriodInMins;
        this.maxReservationWindowInHrs = fleetdata.settings.maxReservationWindowInHrs;
        this.reservationCanBeBumped = fleetdata.settings.reservationCanBeBumped;
        this.checkinRequired = fleetdata.settings.checkinRequired;
        this.longTermReservationEligible = fleetdata.settings.longTermReservationEligible;
        this.configurable = fleetdata.settings.configurable;
        // this.viewFleet(this.fleetid, this.fleetenterpriseId);
        break;
      case 'CRECHILD':
        // in this create child fleet method we are using flletassetId as createfleet object
        this.pagename = 'COMMON_PAGE_TITLES.CREATE_CHILD_FLEET';
        this.getLanguages();
        this.getDateFormates();
        this.getCurrencys();
        this.getAmountFormates();
        this.getThemes();
        this.getStatesList(this.selectCountry);
        this.getCountries();
        this.getTimeZones();
        this.getLookupType();
        this.getStatusList();
        this.reasonActivate = fleetdata.reasonActivate;
        this.reasonInactivate = fleetdata.reasonInactivate;
        this.actionType = 'ChildSubmit';
        this.createfleet.enterprise = {};
        this.createfleet = {};
        this.createfleet.contactDetails = {};
        this.createfleet.address = {};
        this.createfleet.preferences = {};
        this.createfleet.settings = {};
        this.createfleet.enterprise = {};
        this.createfleet.address.geoCoordinates = [];
        this.createfleet.attributes = [];
        this.createfleet.floorPlanDetails = {};
        this.createfleet.floorPlanDetails.floorEntryCoordinates = [];
        this.createfleet.floorPlanDetails.floorNorthEastCoordinates = [];
        this.createfleet.floorPlanDetails.floorSouthWestCoordinates = [];
        this.createfleet.floorPlanDetails.floorSouthEastCoordinates = [];
        this.createfleet.floorPlanDetails.floorNorthWestCoordinates = [];
        if (fleetdata.floorPlanFleetObj) { this.floorPlanFleetObj = Number(fleetdata.floorPlanFleetObj); }
        else { this.floorPlanFleetObj = null; }
        this.floorplanavilable = false;
        if (fleetdata.path === '') {
          this.parentpath = fleetdata.fleetCode;
        } else if (fleetdata.path === null) {
          this.parentpath = fleetdata.fleetCode;
        } else {
          this.parentpath = fleetdata.path + ' => ' + fleetdata.fleetCode;
        }
        this.fleetType = fleetdata.fleetType;
        this.selectedenterpriseId = fleetdata.enterprise.enterpriseId._id;
        this.getChildType();
        this.createfleet.fleetImageFilePath = fleetdata.fleetImageFilePath;
        this.createfleet.fleetImageFileName = fleetdata.fleetImageFileName;
        this.imageName = fleetdata.fleetImageFileName;
        this.imgSrc = this.apiEndPoint + '/' + fleetdata.fleetImageFilePath;
        this.createfleet.enterprise = fleetdata.enterprise;
        this.createfleet.fleetType = fleetdata.fleetType;  // here we are getting fleettype in childpath for this childfleet method only
        this.fleetType = fleetdata.fleetType;
        this.getEnterpriseType(fleetdata.fleetType);
        this.enterpriseIconFilePath = fleetdata.enterprise.enterpriseId.enterpriseIconFilePath + '/'
          + fleetdata.enterprise.enterpriseId.enterpriseIcon;
        this.getFleetTypeAttributes(fleetdata.fleetType, fleetdata.enterprise.enterpriseId._id);
        this.getFleetDetails(fleetdata._id);
        this.imgSrc = this.apiEndPoint + '/' + fleetdata.fleetImageFilePath;
        this.childModal.show();
        const createchildfleetimg = <HTMLInputElement>document.getElementById('createchildfleetimg');
        if (createchildfleetimg !== null) {
          this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          createchildfleetimg.innerHTML = this.emptyimg.value;
        }
        const childfleetfloorimg = <HTMLInputElement>document.getElementById('childfleetfloorimg');
        if (createchildfleetimg !== null) {
          this.emptyfloorimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          childfleetfloorimg.innerHTML = this.emptyfloorimg.value;
        }
        const childfleetjsonfile = <HTMLInputElement>document.getElementById('childfleetjsonfile');
        if (childfleetjsonfile !== null) {
          this.emptyjsonfile = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          childfleetjsonfile.innerHTML = this.emptyjsonfile.value;
        }
        const childfleetPathBoundaiesjsonfile = <HTMLInputElement>document.getElementById('childfleetjsonfile');
        if (childfleetPathBoundaiesjsonfile !== null) {
          this.emptyjsonfile = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          childfleetPathBoundaiesjsonfile.innerHTML = this.emptyjsonfile.value;
        }
        const childfloorMetaDatajsonfile = <HTMLInputElement>document.getElementById('childfleetjsonfile');
        if (childfloorMetaDatajsonfile !== null) {
          this.emptyjsonfile = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          childfloorMetaDatajsonfile.innerHTML = this.emptyjsonfile.value;
        }
        this.createfleet.fleetType = '';
        break;
      case 'EDIT':
        this.pagename = 'COMMON_PAGE_TITLES.EDIT_FLEET';
        this.getLanguages();
        this.getDateFormates();
        this.getCurrencys();
        this.getAmountFormates();
        this.getRowsperPage();
        this.getThemes();
        this.getStatesList(this.selectCountry);
        this.getCountries();
        this.getTimeZones();
        this.editfleetname = this.fleet.fleetName;
        this.selectedenterpriseId = this.fleet.enterprise.enterpriseId._id;
        this.getStatusList();
        this.reasonValue = '';
        this.actionType = 'Edit';
        this.galleryImages = [];
        this.fleet = fleetdata;
        this.getStatesList(this.fleet.address.country);
        this.fleetType = this.fleet.fleetType;
        this.getfloorvalue(this.fleet.path, this.fleet.fleetCode);
        this.getFleetTypeAttributes(this.fleet.fleetType, this.fleet.enterprise.enterpriseId._id);
        this.retext = true;
        this.reasonActivate = fleetdata.reasonActivate;
        this.reasonInactivate = fleetdata.reasonInactivate;
        this.floorplanavilable = this.fleet.floorPlanDetails.floorPlanAvailable;
        this.notes = this.fleet.notes;
        // settings block
        this.advancedReservationWindowInDays = fleetdata.settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = fleetdata.settings.earlyCheckinWindowInMins;
        this.expirationGracePeriodInMins = fleetdata.settings.expirationGracePeriodInMins;
        this.maxReservationWindowInHrs = fleetdata.settings.maxReservationWindowInHrs;
        this.reservationCanBeBumped = fleetdata.settings.reservationCanBeBumped;
        this.checkinRequired = fleetdata.settings.checkinRequired;
        this.longTermReservationEligible = fleetdata.settings.longTermReservationEligible;
        this.configurable = fleetdata.settings.configurable;
        // contact details block
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.worknumber = this.fleet.contactDetails.workNumber;
        this.worknumbercountrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.email = this.fleet.contactDetails.email;
        // address block
        this.addressLine1 = this.fleet.address.addressLine1;
        this.addressLine2 = this.fleet.address.addressLine2;
        this.city = this.fleet.address.city;
        this.country = this.fleet.address.country;
        this.state = this.fleet.address.state;
        this.addresszip = this.fleet.address.ZIP;
        // preferences block
        this.defaultTimezone = this.fleet.preferences.defaultTimezone;
        this.defaultLanguage1 = this.fleet.preferences.defaultLanguage;
        this.defaultTheme = this.fleet.preferences.defaultTheme;
        this.dateFormat = this.fleet.preferences.dateFormat;
        this.defaultCurrency = this.fleet.preferences.defaultCurrency;
        this.timeZone = this.fleet.preferences.timeZone;
        this.isTransactable = this.fleet.isTransactable;
        this.isSpecial = this.fleet.isSpecial;
        this.isEventsEnabled = this.fleet.isEventsEnabled;
        this.currencyFormat = this.fleet.preferences.currencyFormat;
        // floor plan details
        this.startZoomValue = this.fleet.floorPlanDetails.startZoom;
        this.finalZoomValue = this.fleet.floorPlanDetails.finalZoom;
        if (fleetdata.floorPlanFleetObj) { this.floorPlanFleetObj = Number(fleetdata.floorPlanFleetObj); }
        else { this.floorPlanFleetObj = null; }
        const editfleetimg = <HTMLInputElement>document.getElementById('editfleetimg');
        if (editfleetimg !== null) {
          editfleetimg.innerHTML = '';
        }
        const editfleetvisualsimg = <HTMLInputElement>document.getElementById('fleetvisualsimg');
        if (editfleetvisualsimg !== null) {
          editfleetvisualsimg.innerHTML = '';
        }
        break;
      case 'DELETE':
        this.pagename = 'COMMON_PAGE_TITLES.DELETE_FLEET';
        this.actionType = 'Delete';
        this.galleryImages = [];
        this.fleet = fleetdata;
        this.retext = true;
        this.reasonActivate = fleetdata.reasonActivate;
        this.reasonInactivate = fleetdata.reasonInactivate;
        this.advancedReservationWindowInDays = fleetdata.settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = fleetdata.settings.earlyCheckinWindowInMins;
        this.expirationGracePeriodInMins = fleetdata.settings.expirationGracePeriodInMins;
        this.maxReservationWindowInHrs = fleetdata.settings.maxReservationWindowInHrs;
        this.reservationCanBeBumped = fleetdata.settings.reservationCanBeBumped;
        this.checkinRequired = fleetdata.settings.checkinRequired;
        this.longTermReservationEligible = fleetdata.settings.longTermReservationEligible;
        this.configurable = fleetdata.settings.configurable;
        // this.enterpriseIconFilePath = fleetdata.enterprise.enterpriseId.enterpriseIconFilePath;
        this.worknumbercntrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.worknumber = this.fleet.contactDetails.workNumber;
        this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleet.contactDetails.workNumber;
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.fleet.contactDetails.workNumberExtn;
        }
        this.getFleetTypeAttributes(this.fleet.fleetType, this.fleet.enterprise.enterpriseId._id);
        break;
      case 'create':
        this.getEnterpriseNamesList();
        this.getLanguages();
        this.getDateFormates();
        this.getCurrencys();
        this.getAmountFormates();
        this.getRowsperPage();
        this.getThemes();
        this.getStatesList(this.selectCountry);
        this.getCountries();
        this.getTimeZones();
        this.getCountryStatesEdit(this.defaultCountry);
        this.getStatusList();
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        this.imgSrc = this.apiEndPoint + '/' + window.localStorage.getItem('EnterpriseImage');
        this.pagename = 'COMMON_PAGE_TITLES.CREATE_FLEET';
        this.actionType = 'FleetSubmit';
        this.createfleet = {};
        this.createfleet.contactDetails = {};
        this.createfleet.address = {};
        this.createfleet.preferences = {};
        this.createfleet.settings = {};
        this.createfleet.enterprise = {};
        this.createfleet.address.geoCoordinates = [];
        this.createfleet.attributes = [];
        this.createfleet.floorPlanDetails = {};
        this.createfleet.floorPlanDetails.floorEntryCoordinates = [];
        this.createfleet.floorPlanDetails.floorNorthEastCoordinates = [];
        this.createfleet.floorPlanDetails.floorSouthWestCoordinates = [];
        this.createfleet.floorPlanDetails.floorSouthEastCoordinates = [];
        this.createfleet.floorPlanDetails.floorNorthWestCoordinates = [];
        this.defaultLanguage1 = this.defaultLanguage2;
        this.defaultTimezone = this.defaultTimezone2;
        this.defaultCurrency = this.defaultCurrency1;
        this.defaultTheme = this.defaultTheme2;
        this.dateFormat = this.dateFormat2;
        this.currencyFormat = this.currencyFormat2;
        this.createfleet.address.country = this.defaultCountry;
        // this.createfleet.address.state = this.defaultState;
        this.createfleet.preferences.defaultTimezone = this.defaultTimezone;
        this.createfleet.preferences.defaultLanguage = this.defaultLanguage1;
        this.createfleet.preferences.defaultTheme = this.defaultTheme;
        this.createfleet.preferences.rowsPerPage = this.rowsPerPage;
        this.createfleet.preferences.dateFormat = this.dateFormat;
        this.floorcheck = 'false';
        this.advancedReservationWindowInDays = window.localStorage.getItem('advancedReservationWindowInDays');
        this.earlyCheckinWindowInMins = window.localStorage.getItem('earlyCheckinWindowInMins');
        this.expirationGracePeriodInMins = window.localStorage.getItem('expirationGracePeriodInMins');
        this.maxActiveReservationsPerUser = window.localStorage.getItem('maxActiveReservationsPerUser');
        this.maxReservationWindowInHrs = window.localStorage.getItem('maxReservationWindowInHrs');
        this.reservationCanBeBumped = JSON.parse(window.localStorage.getItem('reservationCanBeBumped'));
        this.reservationReminderWindowInMins = window.localStorage.getItem('reservationReminderWindowInMins');
        this.sendReservationReminders = window.localStorage.getItem('sendReservationReminders');
        this.enabled = true;
        this.transactable = false;
        this.eventsenabled = false;
        this.special = false;
        this.transactablevalue = false;
        this.eventsenabledvalue = false;
        this.specialvalue = false;
        this.getStatesList(this.selectCountry);
        this.state = this.defaultState;
        this.childModal.show();
        const fleetimg = <HTMLInputElement>document.getElementById('createfleetimg');
        if (fleetimg !== null) {
          this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          fleetimg.innerHTML = this.emptyimg.value;
        }
        const fleetjsonfile = <HTMLInputElement>document.getElementById('fleetjsonfile');
        if (fleetjsonfile !== null) {
          this.emptyjsonfile = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          fleetjsonfile.innerHTML = this.emptyjsonfile.value;
        }
        const fleetPathBoundaiesjsonfile = <HTMLInputElement>document.getElementById('fleetPathBoundaiesjsonfile');
        if (fleetPathBoundaiesjsonfile !== null) {
          this.emptyjsonfile = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          fleetPathBoundaiesjsonfile.innerHTML = this.emptyjsonfile.value;
        }
        const floorMetaDatajsonfile = <HTMLInputElement>document.getElementById('floorMetaDatajsonfile');
        if (floorMetaDatajsonfile !== null) {
          this.emptyjsonfile = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          floorMetaDatajsonfile.innerHTML = this.emptyjsonfile.value;
        }

        const fleetfloorimg = <HTMLInputElement>document.getElementById('fleetfloorimg');
        if (fleetfloorimg !== null) {
          this.emptyfloorimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
          fleetfloorimg.innerHTML = this.emptyfloorimg.value;
        }
        break;
      case 'export':
        this.pagename = 'FLEETS.FLEET_EXPORT';
        this.actionType = 'FleetSubmit';
        this.createfleet = {};
        this.createfleet.contactDetails = {};
        this.createfleet.address = {};
        this.createfleet.preferences = {};
        this.createfleet.settings = {};
        this.createfleet.enterprise = {};
        this.createfleet.address.geoCoordinates = [];
        this.createfleet.enterprise = {};
        this.createfleet.attributes = [];
        this.childModal.show();
        break;
      case 'Inactive':
        this.actionType = 'Inactive';
        this.pagename = 'COMMON_PAGE_TITLES.INACTIVATE_FLEET';
        this.galleryImages = [];
        this.fleet = fleetdata;
        this.enterpriseid = this.fleet.enterprise.enterpriseId._id;
        this.parentfleet = this.fleet.path;
        this.retext = false;
        this.reasonValue = '';
        this.getinactivateReasons();
        this.advancedReservationWindowInDays = fleetdata.settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = fleetdata.settings.earlyCheckinWindowInMins;
        this.expirationGracePeriodInMins = fleetdata.settings.expirationGracePeriodInMins;
        this.maxReservationWindowInHrs = fleetdata.settings.maxReservationWindowInHrs;
        this.reservationCanBeBumped = fleetdata.settings.reservationCanBeBumped;
        this.checkinRequired = fleetdata.settings.checkinRequired;
        this.longTermReservationEligible = fleetdata.settings.longTermReservationEligible;
        this.configurable = fleetdata.settings.configurable;
        this.getFleetTypeAttributes(this.fleet.fleetType, this.fleet.enterprise.enterpriseId._id);
        this.reasonActivate = fleetdata.reasonActivate;
        this.reasonInactivate = fleetdata.reasonInactivate;
        this.worknumbercntrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.worknumber = this.fleet.contactDetails.workNumber;
        this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleet.contactDetails.workNumber;
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.fleet.contactDetails.workNumberExtn;
        }
        this.childModal.show();
        break;
      case 'Active':
        this.actionType = 'Active';
        this.pagename = 'COMMON_PAGE_TITLES.ACTIVATE_FLEET';
        this.galleryImages = [];
        this.fleet = fleetdata;
        this.enterpriseid = this.fleet.enterprise.enterpriseId._id;
        this.parentfleet = this.fleet.path;
        this.retext = false;
        this.reasonValue = '';
        this.getactivateReasons();
        this.advancedReservationWindowInDays = fleetdata.settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = fleetdata.settings.earlyCheckinWindowInMins;
        this.expirationGracePeriodInMins = fleetdata.settings.expirationGracePeriodInMins;
        this.maxReservationWindowInHrs = fleetdata.settings.maxReservationWindowInHrs;
        this.reservationCanBeBumped = fleetdata.settings.reservationCanBeBumped;
        this.checkinRequired = fleetdata.settings.checkinRequired;
        this.longTermReservationEligible = fleetdata.settings.longTermReservationEligible;
        this.configurable = fleetdata.settings.configurable;
        // this.enterpriseIconFilePath = fleetdata.enterprise.enterpriseId.enterpriseIconFilePath;
        this.getFleetTypeAttributes(this.fleet.fleetType, this.fleet.enterprise.enterpriseId._id);
        this.reasonActivate = fleetdata.reasonActivate;
        this.reasonInactivate = fleetdata.reasonInactivate;
        this.worknumbercntrycode = this.fleet.contactDetails.workNumberCountrycode;
        this.worknumbercntrycodesplit = this.worknumbercntrycode.split(' -');
        this.worknumext = this.fleet.contactDetails.workNumberExtn;
        this.worknumber = this.fleet.contactDetails.workNumber;
        this.worknumber = this.worknumbercntrycodesplit[0] + '-' + this.fleet.contactDetails.workNumber;
        if (this.worknumext) {
          this.worknumber = this.worknumber + ' x' + this.fleet.contactDetails.workNumberExtn;
        }
        this.childModal.show();
    }
    this.childModal.show();
  }

  /**---- To view multiple files ----*/
  viewfile(fileSrc, filename) {
    this.visualFilename = filename;
    this.value = this.visualFilename.split('.');
    this.visualFilename = this.value[0];
    this.fileSrc = this.apiEndPoint + '/' + fileSrc;
    const imgRex = new RegExp('(.*?)\.(jpg|bmp|jpeg|png)$');
    const audioRex = new RegExp('(.*?)\.(flac|wav|mp3)$');
    const videoRex = new RegExp('(.*?)\.(webm|mp4|ogg)$');
    if (imgRex.test(this.fileSrc)) {
      document.getElementById('fileImageId').style.display = 'block';
      document.getElementById('fileAudioId').style.display = 'none';
      document.getElementById('fileVideoId').style.display = 'none';
      document.getElementById('fileOtherId').style.display = 'none';
    } else if (audioRex.test(this.fileSrc)) {
      document.getElementById('fileImageId').style.display = 'none';
      document.getElementById('fileAudioId').style.display = 'block';
      document.getElementById('fileVideoId').style.display = 'none';
      document.getElementById('fileOtherId').style.display = 'none';
    } else if (videoRex.test(this.fileSrc)) {
      document.getElementById('fileImageId').style.display = 'none';
      document.getElementById('fileAudioId').style.display = 'none';
      document.getElementById('fileVideoId').style.display = 'block';
      document.getElementById('fileOtherId').style.display = 'none';
    } else {
      document.getElementById('fileImageId').style.display = 'none';
      document.getElementById('fileAudioId').style.display = 'none';
      document.getElementById('fileVideoId').style.display = 'none';
      document.getElementById('fileOtherId').style.display = 'block';
    }
    document.getElementById('filePopupId').style.display = 'block';
  }

  /**---- To get enterprise list   ----*/
  getEnterpriseNamesList() {
    this.userToken = window.localStorage.getItem('token');
    this.singleEnterpriseService.getEnterpriseNamesList(this.userToken)
      .subscribe(
      enterpriseList => {
        if (enterpriseList.statusCode === '1001') {
          if (enterpriseList.result.length === 1) {
            this.enterpriselist = enterpriseList['result'];
            this.createfleet.enterprise = enterpriseList['result'][0];
            this.createfleet.enterprise.enterpriseId = enterpriseList['result'][0]._id;
            this.enterpriseIconFilePath = enterpriseList['result'][0].enterpriseIconFilePath;
            this.imgSrc = this.apiEndPoint + '/' + enterpriseList['result'][0].enterpriseIconFilePath;
            this.constimage = this.imgSrc;
            this.constimagepath = enterpriseList['result'][0].enterpriseIconFilePath;
            this.createfleet.fleetImageFilePath = enterpriseList['result'][0].enterpriseIconFilePath;
            this.createfleet.fleetImageFileName = enterpriseList['result'][0].enterpriseIcon;
            this.longitude = enterpriseList['result'][0].address.geoCoordinates[1];
            this.latitude = enterpriseList['result'][0].address.geoCoordinates[0];
            this.createfleet.address.addressLine1 = enterpriseList['result'][0].address.addressLine1;
            this.createfleet.address.addressLine2 = enterpriseList['result'][0].address.addressLine2;
            this.createfleet.address.city = enterpriseList['result'][0].address.city;
            this.createfleet.address.country = enterpriseList['result'][0].address.country;
            this.createfleet.address.state = enterpriseList['result'][0].address.state;
            this.createfleet.address.ZIP = enterpriseList['result'][0].address.ZIP;
            this.selectCountry = enterpriseList['result'][0].address.country;
            this.state = enterpriseList['result'][0].address.state;
            this.defaultLanguage1 = enterpriseList['result'][0].preferences.defaultLanguage;
            this.defaultTimezone = enterpriseList['result'][0].preferences.defaultTimezone;
            this.defaultCurrency = enterpriseList['result'][0].preferences.defaultCurrency;
            this.dateFormat = enterpriseList['result'][0].preferences.dateFormat;
            this.currencyFormat = enterpriseList['result'][0].preferences.currencyFormat;
            this.defaultTheme = enterpriseList['result'][0].preferences.defaultTheme;
            this.createfleet.preferences.defaultTimezone = enterpriseList['result'][0].preferences.defaultTimezone;
            this.createfleet.preferences.defaultLanguage = enterpriseList['result'][0].preferences.defaultLanguage;
            this.createfleet.preferences.dateFormat = enterpriseList['result'][0].preferences.dateFormat;
            this.createfleet.preferences.defaultCurrency = enterpriseList['result'][0].preferences.defaultCurrency;
            this.createfleet.preferences.currencyFormat = enterpriseList['result'][0].preferences.currencyFormat;
            // this.defaultTheme = enterpriseList['result'][0].preferences.defaultLanguage;
            this.advancedReservationWindowInDays = enterpriseList['result'][0].settings.advancedReservationWindowInDays;
            this.earlyCheckinWindowInMins = enterpriseList['result'][0].settings.earlyCheckinWindowInMins;
            this.expirationGracePeriodInMins = enterpriseList['result'][0].settings.expirationGracePeriodInMins;
            this.maxActiveReservationsPerUser = enterpriseList['result'][0].settings.maxActiveReservationsPerUser;
            this.maxReservationWindowInHrs = enterpriseList['result'][0].settings.maxReservationWindowInHrs;
            this.reservationCanBeBumped = enterpriseList['result'][0].settings.reservationCanBeBumped;
            this.reservationReminderWindowInMins = enterpriseList['result'][0].settings.reservationReminderWindowInMins;
            this.checkinRequired = enterpriseList['result'][0].settings.checkinRequired;
            this.longTermReservationEligible = enterpriseList['result'][0].settings.longTermReservationEligible;
            this.configurable = enterpriseList['result'][0].settings.configurable;
            this.getStatesList(this.selectCountry);
            this.enterprisesSize = true;
            this.singleEnterpriseService.getEnterprisepathById(this.userToken, enterpriseList['result'][0]._id)
              .subscribe(
              enterprisePathList => {
                this.enterprisepathlist = enterprisePathList['result'];
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
            const enterpriseid = this.createfleet.enterprise.enterpriseId + '$' + enterpriseList['result'][0].enterpriseName + '$' +
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
              '$' + enterpriseList['result'][0].contactDetails.workNumberExtn + '$' + enterpriseList['result'][0].contactDetails.email
              + '$' + enterpriseList['result'][0].settings.advancedReservationWindowInDays
              + '$' + enterpriseList['result'][0].settings.earlyCheckinWindowInMins
              + '$' + enterpriseList['result'][0].settings.expirationGracePeriodInMins
              + '$' + enterpriseList['result'][0].settings.maxReservationWindowInHrs
              + '$' + enterpriseList['result'][0].settings.reservationCanBeBumped
              + '$' + enterpriseList['result'][0].settings.checkinRequired
              + '$' + enterpriseList['result'][0].settings.longTermReservationEligible
              + '$' + enterpriseList['result'][0].settings.configurable;
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

  /**---- To get countries list --*/
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

  /**---- To get states list ----*/
  getStatesList(selectedCountry: any) {
    this.singleEnterpriseService.getStatesList(this.userToken, selectedCountry).subscribe(
      data => {
        if (data['statusCode'] === '1001') {
          this.states = data['result'];
        }
      }, error => {
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

  /**---- To get timezones list ----*/
  public getTimeZones() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'TIME_ZONES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.timeZone = data['result'];
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

  /**---- To get country code list ----*/
  public getCountryCodes() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'COUNTRY_CODES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.countryCodes = data['result'];
          this.mobileCountryCode = data['result'][0].lookupName;
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

  /**---- To get currency format list ----*/
  getAmountFormates() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'AMOUNT_FORMATS')
      .subscribe(currencyFormatValues => {
        this.amountformats = currencyFormatValues['result'];
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

  /*-- Get Lookup type list --*/
  public getLookupType() {
    this.singleEnterpriseService.getFleetTypeList(this.userToken, this.selectedenterpriseId).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.fleetTypes = data['result'][0].fleetTypes;
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

  /*-- To get dateformate  list ----*/
  public getDateFormates() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'DATE_FORMATS').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.datefomat = data['result'];
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

  /**---- To get languages list ----*/
  public getLanguages() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'LANGUAGES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.languages = data['result'];
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

  /**---- To get currency list ----*/
  public getCurrencys() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'CURRENCIES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.currencies = data['result'];
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

  /**---- To get themes list ----*/
  public getThemes() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'UI_THEMES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.themes = data['result'];
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

  /**---- to Get Rows Per page list ----*/
  public getRowsperPage() {
    this.singleEnterpriseService.getLookupsList(window.localStorage.getItem('token'), 'ROWS_PER_PAGE').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.rowsPerpages = data['result'];
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

  /**---- To get activate reasons ----*/
  public getactivateReasons() {
    this.singleEnterpriseService.getLookupsByEnterprise(this.userToken, 'FLEET_ACTIVATE_REASONS', this.enterpriseid)
      .subscribe(data => {
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

  /**---- To get inActivate reasons ---*/
  public getinactivateReasons() {
    this.singleEnterpriseService.getLookupsByEnterprise(this.userToken, 'FLEET_INACTIVATE_REASONS', this.enterpriseid).subscribe(
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

  /*---- To get status list ---*/
  public getStatusList() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'FLEET_STATUSES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.value = data['result'];
          this.enabled = data['result'][0].lookupName;
          this.statuslist = data['result'];
          this.fleet.isEnabled = data['result'][0].lookupName;
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

  // /*---- To get status list---*/
  // public getStatus() {
  //   this.singleEnterpriseService.getLookupsList(this.userToken, 'ENTERPRISE_STATUSES').subscribe(
  //     data => {
  //     },
  //     error => {
  //       const status = JSON.parse(error['status']);
  //       const statuscode = JSON.parse(error['_body']).status;
  //       switch (status) {
  //         case 500:
  //           break;
  //         case 400:
  //           if (statuscode === '9961') {
  //             this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
  //             this.toastr.success(this.toastermessage.value);
  //             this.storage.removeItem('token');
  //             this.router.navigate(['/pages/login']);
  //           } break;
  //       }
  //     }
  //   );
  // }

  /**---- To get states based on country   ----*/
  getCountryStates(countryName) {
    this.createfleet.address.state = '';
    this.fleet.address.state = '';
    this.createfleet.address.country = countryName;
    this.singleEnterpriseService.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
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

  /**---- To get states based on country   ----*/
  getCountryStatesEdit(countryName) {
    this.createfleet.address.state = '';
    this.createfleet.address.country = countryName;
    this.singleEnterpriseService.getStates(countryName)
      .subscribe(statesValues => {
        this.states = statesValues['result'];
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

  /**---- To create single fleet ----- */
  createSingleFleet(fleet) {
    let count = 0;
    let neValue = 0;
    let nwValue = 0;
    let swValue = 0;
    let seValue = 0;
    let value3 = 0;
    let value4 = 0;
    let value5 = 0;
    let value6 = 0;
    let value7 = 0;
    let value8 = 0;
    let value9 = 0;
    let value10 = 0;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.longitude !== '' && this.longitude !== undefined) {
      this.value = this.longitude.split('.');
    }
    if (this.latitude !== '' && this.latitude !== undefined) {
      this.value1 = this.latitude.split('.');
    }
    if (this.nelatitude !== '' && this.nelatitude !== undefined) {
      value3 = this.nelatitude.split('.');
      neValue = neValue + 1;
    }
    if (this.nelongitude !== '' && this.nelongitude !== undefined) {
      value4 = this.nelongitude.split('.');
      neValue = neValue + 1;
    }
    if (this.nelatitude !== '' && this.nelatitude !== undefined && this.nelongitude !== '' && this.nelongitude !== undefined) {
      count++;
    }
    if (this.nwlatitude !== '' && this.nwlatitude !== undefined) {
      value5 = this.nwlatitude.split('.');
      nwValue = nwValue + 1;
    }
    if (this.nwlongitude !== '' && this.nwlongitude !== undefined) {
      value6 = this.nwlongitude.split('.');
      nwValue = nwValue + 1;
    }
    if (this.nwlatitude !== '' && this.nwlatitude !== undefined && this.nwlongitude !== '' && this.nwlongitude !== undefined) {
      count++;
    }
    if (this.swlatitude !== '' && this.swlatitude !== undefined) {
      value7 = this.swlatitude.split('.');
      swValue = swValue + 1;
    }
    if (this.swlongitude !== '' && this.swlongitude !== undefined) {
      value8 = this.swlongitude.split('.');
      swValue = swValue + 1;
    }
    if (this.swlatitude !== '' && this.swlatitude !== undefined && this.swlongitude !== '' && this.swlongitude !== undefined) {
      count++;
    }
    if (this.selatitude !== '' && this.selatitude !== undefined) {
      value9 = this.selatitude.split('.');
      seValue = seValue + 1;
    }
    if (this.selongitude !== '' && this.selongitude !== undefined) {
      value10 = this.selongitude.split('.');
      seValue = seValue + 1;
    }
    if (this.selatitude !== '' && this.selatitude !== undefined && this.selongitude !== '' && this.selongitude !== undefined) {
      count++;
    }
    if (fleet.isTransactable === true) {
      this.createfleet.isTransactable = true;
    } else {
      this.createfleet.isTransactable = false;
      this.createfleet.eventsenabled = false;
    }
    if (fleet.isSpecial === true) {
      this.createfleet.isSpecial = true;
    } else {
      this.createfleet.isSpecial = false;
    }
    if (fleet.isEventsEnabled === true) {
      this.createfleet.isEventsEnabled = true;
    } else {
      this.createfleet.isEventsEnabled = false;
    }
    if (fleet.floorPlanAvailable === true) {
      this.createfleet.floorPlanAvailable = true;
    } else {
      this.createfleet.floorPlanAvailable = false;
    }
    this.createfleet.isEnabled = this.dafaultActive;
    this.createfleet.isTransactable = this.transactable;
    this.createfleet.isSpecial = this.special;
    this.createfleet.isEventsEnabled = this.eventsenabled;
    this.createfleet.floorPlanDetails.floorPlanAvailable = this.floorplanavilable;
    const array = [];
    if (this.attributeList) {
      for (let i = 0; i < this.attributeList.length; i++) {
        const itemInputID = <HTMLInputElement>document.getElementById('itemId' + i);
        const itemInputText = <HTMLInputElement>document.getElementById('itemText' + i);
        this.attributeId = parseInt(itemInputID.value, 10);
        this.attributeText = itemInputText.value.trim().replace(/\s\s+/g, ' ');
        array[i] = {
          'attribute': this.attributeId,
          'attributeValue': this.attributeText
        };
      }
      this.createfleet.attributes = array;
    }
    if (this.createfleet.enterprise.enterpriseName === '' || this.createfleet.enterprise.enterpriseName === undefined ||
      this.createfleet.enterprise.enterpriseName === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.createfleet.fleetName === ''
      || this.createfleet.fleetName === undefined || this.createfleet.fleetName === null) {
      this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.createfleet.fleetType === '' || this.createfleet.fleetType === undefined ||
      this.createfleet.fleetType === null) {
      this.error = this.translateService.get('FLEETS.VALID_NOBLANK_FLEET_TYPE');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.floorplanavilable && (this.startZoomValue === '' || this.startZoomValue === undefined || this.startZoomValue === null)) {
      this.error = 'FLEETS.VALID_NOBLANK_START_ZOOM';
    } else if (this.floorplanavilable && (this.finalZoomValue === '' || this.finalZoomValue === undefined || this.finalZoomValue === null)) {
      this.error = 'FLEETS.VALID_NOBLANK_FINAL_ZOOM';
    } else if (this.floorplanavilable && (parseInt(this.startZoomValue) > parseInt(this.finalZoomValue))) {
      this.error = 'FLEETS.VALID_FINAL_ZOOM_GREATER_THAN_STARTZOOM';
    } else if (this.floorplanavilable && this.fleetfloorimg === '') {
      this.error = 'Please choose valid Floor plan image file';
    } else if (this.floorplanavilable && this.fleetfloorimg !== '' && this.imagestatus == false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.errMsg3 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART3');
      this.error = this.errMsg1.value + ' ' + this.floormapimageMinSize + ' ' + this.errMsg2.value + ' & ' + (this.floormapimageMaxSize / 1024) + ' ' + this.errMsg3.value;
    } else if (this.floorplanavilable && (this.fleetjsonfile.name !== '' && this.fleetjsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_NAVPATH_FILENAME';
    } else if (this.floorplanavilable && (this.fleetjsonfile.name !== '' && this.fleetjsonfile.type !== 'application/json' && this.jsonTypeError === true)) {
      this.error = 'FLEETS.VALID_NAVPATH_FILENAME';
    } else if (this.floorplanavilable && ((this.fleetjsonfile.name !== '' && this.fleetjsonfile === undefined || this.fleetjsonfile === null))) {
      this.error = 'FLEETS.VALID_NAVPATH_FILENAME';
    } else if (this.floorplanavilable && (this.floorMetaDatajsonfile.name !== '' && this.floorMetaDatajsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_METADATA_JSON_FILENAMEe';
    } else if (this.floorplanavilable && (this.floorMetaDatajsonfile.name !== '' && this.floorMetaDatajsonfile.type !== 'application/json' && this.jsonTypeError === true)) {
      this.error = 'FLEETS.VALID_METADATA_JSON_FILENAME';
    } else if (this.floorplanavilable && (this.floorMetaDatajsonfile && (this.floorMetaDatajsonfile.name !== '' && this.floorMetaDatajsonfile.type !== 'application/json'))) {
      this.error = 'FLEETS.VALID_METADATA_JSON_FILENAME';
    } else if (this.floorplanavilable && (this.fleetPathBoundaiesjsonfile.name !== '' && this.fleetPathBoundaiesjsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_BOUDARIES_JSON_FILENAME';
    } else if (this.floorplanavilable && (this.fleetPathBoundaiesjsonfile.name !== '' && this.fleetPathBoundaiesjsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_BOUDARIES_JSON_FILENAME';
    } else if (this.floorplanavilable && (this.fleetjsonfile.name === this.floorMetaDatajsonfile.name)) {
      this.error = 'FLEETS.PLEASE_MAKE_SURE_THAT_UPLOADED_FILE_NAME_MUST_BE_DIFFERENT';
    } else if (this.floorplanavilable && (this.fleetjsonfile.name === this.fleetPathBoundaiesjsonfile.name)) {
      this.error = 'FLEETS.PLEASE_MAKE_SURE_THAT_UPLOADED_FILE_NAME_MUST_BE_DIFFERENT';
    } else if (this.floorplanavilable && (this.floorMetaDatajsonfile.name === this.fleetPathBoundaiesjsonfile.name)) {
      this.error = 'FLEETS.PLEASE_MAKE_SURE_THAT_UPLOADED_FILE_NAME_MUST_BE_DIFFERENT';
    } else if (this.fleetimgfile !== '' && this.fleetimgfile.type === '') {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.fleetimgfile !== '' && this.fleetimgfile.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.mobileCountryCode === '' || this.mobileCountryCode === undefined) {
      this.error = 'FLEETS.PLESE_SELECT_MOBILE_COUNTRY_CODE';
    } else if (this.createfleet.contactDetails.mobile === ''
      || this.createfleet.contactDetails.mobile === undefined ||
      this.createfleet.contactDetails.mobile === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.createfleet.contactDetails.mobile.length < 12) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_WORKNUMBER';
    } else if (this.createfleet.contactDetails.email === ''
      || this.createfleet.contactDetails.email === undefined ||
      this.createfleet.contactDetails.email === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!(re.test(this.createfleet.contactDetails.email))) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.createfleet.address.addressLine1 === ''
      || this.createfleet.address.addressLine1 === undefined ||
      this.createfleet.address.addressLine1 === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.createfleet.address.city === '' || this.createfleet.address.city === undefined ||
      this.createfleet.address.city === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.createfleet.address.country === '' || this.createfleet.address.country === undefined ||
      this.createfleet.address.country === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
    } else if (this.createfleet.address.state === '' || this.createfleet.address.state === undefined ||
      this.createfleet.address.state === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.createfleet.address.ZIP === '' || this.createfleet.address.ZIP === undefined ||
      this.createfleet.address.ZIP === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.latitude === undefined || this.latitude === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LATITUDE';
    } else if (!this.latitude.match(this.LONG_LAT_PAT) || this.value1[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (!this.latitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (this.longitude === undefined || this.longitude === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LONGITUDE';
    } else if (!this.longitude.match(this.LONG_LAT_PAT) || this.value[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (!this.longitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (this.validAttributes() === true) {
      this.error = this.error1;
    } else {
      if (this.createfleet.fleetName !== undefined && this.createfleet.fleetName !== '') {
        this.createfleet.fleetName = this.autocase(this.createfleet.fleetName.trim().replace(/\s\s+/g, ' '));
      }
      if (this.createfleet.address.addressLine1 !== undefined && this.createfleet.address.addressLine1 !== '') {
        this.createfleet.address.addressLine1 = this.autocase(this.createfleet.address.addressLine1.trim().replace(/\s\s+/g, ' '));
      }
      if (this.createfleet.address.city !== undefined && this.createfleet.address.city !== '') {
        this.createfleet.address.city = this.autocase(this.createfleet.address.city.trim().replace(/\s\s+/g, ' '));
      }
      if (this.createfleet.address.ZIP !== undefined && this.createfleet.address.ZIP !== '') {
        this.createfleet.address.ZIP = this.createfleet.address.ZIP.trim().replace(/\s\s+/g, ' ');
      }
      if (this.longitude !== undefined && this.longitude !== '') {
        this.createfleet.address.geoCoordinates[0] = this.latitude.replace('+', '%2B');
      }
      if (this.longitude !== undefined && this.longitude !== '') {
        this.createfleet.address.geoCoordinates[1] = this.longitude.replace('+', '%2B');
      }
      if (this.createfleet.contactDetails.email !== undefined && this.createfleet.contactDetails.email !== '') {
        this.createfleet.contactDetails.email = this.createfleet.contactDetails.email.trim().replace(/\s\s+/g, ' ');
      }
      if (this.entrylatitude !== undefined && this.entrylatitude !== '' && this.entrylongitude !== undefined
        && this.entrylongitude !== '') {
        this.createfleet.floorPlanDetails.floorEntryCoordinates[1] = this.entrylongitude.replace('+', '%2B');
        this.createfleet.floorPlanDetails.floorEntryCoordinates[0] = this.entrylatitude.replace('+', '%2B');
      }
      if (this.nelatitude !== undefined && this.nelatitude !== '' && this.nelongitude !== undefined && this.nelongitude !== '') {
        this.createfleet.floorPlanDetails.floorNorthEastCoordinates[1] = this.nelongitude.replace('+', '%2B');
        this.createfleet.floorPlanDetails.floorNorthEastCoordinates[0] = this.nelatitude.replace('+', '%2B');
      }
      if (this.selatitude !== undefined && this.selatitude !== '' && this.selongitude !== undefined && this.selongitude !== '') {
        this.createfleet.floorPlanDetails.floorSouthEastCoordinates[1] = this.selongitude.replace('+', '%2B');
        this.createfleet.floorPlanDetails.floorSouthEastCoordinates[0] = this.selatitude.replace('+', '%2B');
      }
      if (this.nwlatitude !== undefined && this.nwlatitude !== '' && this.nwlongitude !== undefined && this.nwlongitude !== '') {
        this.createfleet.floorPlanDetails.floorNorthWestCoordinates[1] = this.nwlongitude.replace('+', '%2B');
        this.createfleet.floorPlanDetails.floorNorthWestCoordinates[0] = this.nwlatitude.replace('+', '%2B');
      }
      if (this.swlatitude !== undefined && this.swlatitude !== '' && this.swlongitude !== undefined && this.swlongitude !== '') {
        this.createfleet.floorPlanDetails.floorSouthWestCoordinates[1] = this.swlongitude.replace('+', '%2B');
        this.createfleet.floorPlanDetails.floorSouthWestCoordinates[0] = this.swlatitude.replace('+', '%2B');
      }
      // this.createfleet.path = this.parentpath;
      this.createfleet.floorPlanDetails.startZoom = this.startZoomValue;
      this.createfleet.floorPlanDetails.finalZoom = this.finalZoomValue;
      this.createfleet.preferences.defaultTheme = this.defaultTheme;
      this.createfleet.preferences.rowsPerPage = this.rowsPerPage;
      this.createfleet.contactDetails.workNumberCountrycode = this.mobileCountryCode;
      this.createfleet.contactDetails.workNumber = this.createfleet.contactDetails.mobile.trim().replace(/\s\s+/g, ' ');
      this.createfleet.contactDetails.workNumberExtn = this.createfleet.contactDetails.ext;
      this.createfleet.address.addressLine2 = this.autocase(this.createfleet.address.addressLine2);
      this.createfleet.path = this.parentpath;
      this.createfleet.floorPlanFleetObj = this.floorPlanFleetObj;
      this.createfleet.description = this.createfleet.description;
      this.createfleet.settings.advancedReservationWindowInDays = this.advancedReservationWindowInDays;
      this.createfleet.settings.reservationCanBeBumped = this.reservationCanBeBumped;
      this.createfleet.settings.earlyCheckinWindowInMins = this.earlyCheckinWindowInMins;
      this.createfleet.settings.expirationGracePeriodInMins = this.expirationGracePeriodInMins;
      this.createfleet.settings.maxReservationWindowInHrs = this.maxReservationWindowInHrs;
      this.createfleet.settings.checkinRequired = this.checkinRequired;
      this.createfleet.settings.configurable = this.configurable;
      this.createfleet.settings.longTermReservationEligible = this.longTermReservationEligible;
      this.singleEnterpriseService.createSingleFleet(this.createfleet, this.userToken,
        this.fleetimgfile, this.fleetfloorimg, this.fleetjsonfile, this.floorMetaDatajsonfile, this.fleetPathBoundaiesjsonfile)
        .subscribe(
        (data: any) => {
          this.closePopupModal();
          this.childModal.hide();
          this.uploaded.emit('Create');
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '2033') {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                if (statuscode === '9961') {
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                }
              } break;
          }
        });
    }
  }

  /*---- To upload the fleet image ----*/
  imageUploadedFleet(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {

      this.fleetimgfile = files[0];

    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.fleetimgfile.size;
    // this.imgSrc = this.imgfile.src;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fleetimgfile));
    setTimeout(() => {
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fleetimgfile));
    }, 500);
    const size = (Math.round(fSize * 100) / 100);
    const bytes = fSExt[i];
    const pictype = this.fleetimgfile.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/jpg', '/jpeg', '/gif', '/bmp', '/png'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      const index = myObj['imageTypes'][j].indexOf(extension);
      if (index > -1) {
        this.imageTypeError = false;
        this.error = '';
        if (this.imageMinSize > size || bytes !== 'KB') {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else if (size > this.imageMaxSize || bytes !== 'KB') {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else {
          this.imagestatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }
    if (this.actionType === 'FleetSubmit') {
      const fleetimg = <HTMLInputElement>document.getElementById('createfleetimg');
      let img = this.fleetimgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.fleetimgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.fleetimgfile.name.split('.')[1];
        }
      }
      fleetimg.innerHTML = img;
    } else if (this.actionType === 'Edit') {
      const editfleetimg = <HTMLInputElement>document.getElementById('editfleetimg');
      let img = this.fleetimgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.fleetimgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.fleetimgfile.name.split('.')[1];
        }
      }
      editfleetimg.innerHTML = img;
    } else if (this.actionType === 'ChildSubmit') {
      const createchildfleetimg = <HTMLInputElement>document.getElementById('createchildfleetimg');
      let img = this.fleetimgfile.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.fleetimgfile.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.fleetimgfile.name.split('.')[1];
        }
      }
      createchildfleetimg.innerHTML = img;
    }

  }

  /**---- To upload json image ----*/
  imageUploaded(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.fleetfloorimg = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.fleetfloorimg.size;
    // this.imgSrc = this.imgfile.src;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    setTimeout(() => {
    }, 500);
    let size = (Math.round(fSize * 100) / 100);
    const bytes = fSExt[i];
    if (bytes == 'MB') {
      size *= 1024;
    }
    const pictype = this.fleetfloorimg.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/jpg', '/jpeg', '/gif', '/bmp', '/png'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      const index = myObj['imageTypes'][j].indexOf(extension);
      if (index > -1) {
        this.imageTypeError = false;
        this.error = '';
        if (this.floormapimageMinSize > size && (bytes !== 'KB' || 'MB')) {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.errMsg3 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART3');
          this.error = this.errMsg1.value + ' ' + this.floormapimageMinSize + ' ' + this.errMsg2.value + ' & ' + (this.floormapimageMaxSize / 1024) + ' ' + this.errMsg3.value;
        } else if (size > this.floormapimageMaxSize && (bytes !== 'KB' || 'MB')) {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.errMsg3 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART3');
          this.error = this.errMsg1.value + ' ' + this.floormapimageMinSize + ' ' + this.errMsg2.value + ' & ' + (this.floormapimageMaxSize / 1024) + ' ' + this.errMsg3.value;
        } else {
          this.imagestatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }
    if (this.actionType === 'FleetSubmit') {
      const fleetfloorimg = <HTMLInputElement>document.getElementById('fleetfloorimg');
      let floorimg = this.fleetfloorimg.name;
      if (floorimg !== null && floorimg !== undefined && floorimg !== '') {
        if (this.fleetfloorimg.name.length > 10) {
          floorimg = floorimg.substring(0, 10) + '..' + this.fleetfloorimg.name.split('.')[1];
        }
      }
      fleetfloorimg.innerHTML = floorimg;
    } else if (this.actionType === 'Edit') {
      const fleetfloorimg = <HTMLInputElement>document.getElementById('editfleetfloorimg');
      let floorimg = this.fleetfloorimg.name;
      if (floorimg !== null && floorimg !== undefined && floorimg !== '') {
        if (this.fleetfloorimg.name.length > 10) {
          floorimg = floorimg.substring(0, 10) + '..' + this.fleetfloorimg.name.split('.')[1];
        }
      }
      fleetfloorimg.innerHTML = floorimg;
    } else if (this.actionType === 'ChildSubmit') {
      const fleetfloorimg = <HTMLInputElement>document.getElementById('childfleetfloorimg');
      let floorimg = this.fleetfloorimg.name;
      if (floorimg !== null && floorimg !== undefined && floorimg !== '') {
        if (this.fleetfloorimg.name.length > 10) {
          floorimg = floorimg.substring(0, 10) + '..' + this.fleetfloorimg.name.split('.')[1];
        }
      }
      fleetfloorimg.innerHTML = floorimg;
    }
  }

  /**---- To check floor plan is present or not for praent fleet ----*/
  getfloorvalue(parentpath, fleetcode) {
    const data1 = parentpath.split(' => ');
    const data = { 'parentpath': data1, 'fleetcode': fleetcode };
    this.singleEnterpriseService.getfloorvalue(this.userToken, data)
      .subscribe(floorplan => {
        this.floorcheck = floorplan.result;
        if (this.floorcheck === 'true') {
          this.floorplanavilable = false;
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

  /**---- To get fleetType --- */
  getfleetType(value) {
    this.createfleet.fleetType = value;
  }

  /**---- To get fleetTypeAttributes ----*/
  getFleetTypeAttributes(fleetType, enterpriseId) {
    this.singleEnterpriseService.getfleetTypeAttributes(this.userToken, fleetType,
      enterpriseId)
      .subscribe(
      attributelist => {
        this.attributeList = attributelist['result'];
        if (this.actionType === 'View' || this.actionType === 'Delete') {

          for (let m = 0; m < this.fleet.attributes.length; m++) {
            for (let n = 0; n < this.attributeList.length; n++) {
              if (this.fleet.attributes[m].attribute.attributeName === this.attributeList[n].attributeName) {
                let removedObject = this.attributeList.splice(n, 1);
                removedObject = null;
                break;
              }
            }
          }
        } else if (this.actionType === 'Edit') {
          for (let i = 0; i < this.fleet.attributes.length; i++) {
            for (let j = 0; j < this.attributeList.length; j++) {
              if (this.attributeList[j].lookupsData !== '' || this.attributeList[j].lookupsData !== null
                || this.attributeList[j].lookupsData !== undefined) {
                if (this.fleet.attributes[i].attribute.attributeName === this.attributeList[j].attributeName) {
                  this.fleet.attributes[i].lookupdata = [];
                  this.fleet.attributes[i].lookupdata.push.apply(this.fleet.attributes[i].lookupdata, this.attributeList[j].lookupsData);
                  let removedObject = this.attributeList.splice(j, 1);
                  removedObject = null;
                }
              }
            }
          }
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

  /**---- To get fleetTypeAttributes based on fleet type ----*/
  getEnterpriseType(value) {
    this.selectedfleettypevalues = value.split('~');
    if (this.selectedfleettypevalues[1] === 'true') {
      this.special = true;
      this.specialvalue = true;
    } else {
      this.special = false;
      this.specialvalue = false;
    }
    if (this.selectedfleettypevalues[2] === 'true') {
      this.transactable = true;
      this.transactablevalue = true;
    } else {
      this.transactable = false;
      this.transactablevalue = false;
    }
    if (this.selectedfleettypevalues[3] === 'true') {
      this.eventsenabled = true;
      this.eventsenabledvalue = true;
    } else {
      this.eventsenabled = false;
      this.eventsenabledvalue = false;
    }
    this.imgSrc = this.apiEndPoint + '/' + this.enterpriseIconFilePath;
    if (value === 'select') {
      this.enterprisepathlist = [];
      this.createfleet.fleetImageFilePath = this.constimagepath;
      this.createfleet.fleetType = '';
    } else {
      this.createfleet.fleetType = this.selectedfleettypevalues[0];
    }
    this.singleEnterpriseService.getfleetTypeAttributes(this.userToken, this.createfleet.fleetType,
      this.createfleet.enterprise.enterpriseId)
      .subscribe(
      attributelist => {
        this.attributeList = attributelist['result'];
        if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList.length === 0) {
          this.addinfo = false;
        } else {
          this.addinfo = true;
        }
        this.getParentFleetList();
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

  /**---- Mobile number ----*/
  hyphen_generate_mobile(value) {
    if (value.length === 3) {
      (<HTMLInputElement>document.getElementById('mobile_id')).value = value.concat('-');
    } if (value.length === 7) {
      (<HTMLInputElement>document.getElementById('mobile_id')).value = value.concat('-');
    }
  }

  /**----- To edit fleet -----*/
  updateFleet(fleet) {
    let count = 0;
    let neValue = 0;
    let nwValue = 0;
    let swValue = 0;
    let seValue = 0;
    let value3 = 0;
    let value4 = 0;
    let value5 = 0;
    let value6 = 0;
    let value7 = 0;
    let value8 = 0;
    let value9 = 0;
    let value10 = 0;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.value = this.longitude.split('.');
    this.value1 = this.latitude.split('.');
    if (this.isTransactable === true) {
      this.isTransactable = true;
    } else {
      this.isTransactable = false;
    }
    if (fleet.floorPlanAvailable === true) {
      this.fleet.floorPlanAvailable = true;
    } else {
      this.fleet.floorPlanAvailable = false;
    }
    this.fleet.floorPlanDetails.floorPlanAvailable = this.floorplanavilable;
    if (this.nelatitude !== '' && this.nelatitude !== undefined) {
      value3 = this.nelatitude.split('.');
      neValue = neValue + 1;
    }
    if (this.nelongitude !== '' && this.nelongitude !== undefined) {
      value4 = this.nelongitude.split('.');
      neValue = neValue + 1;
    }
    if (this.nelatitude !== '' && this.nelatitude !== undefined && this.nelongitude !== '' && this.nelongitude !== undefined) {
      count++;
    }
    if (this.nwlatitude !== '' && this.nwlatitude !== undefined) {
      value5 = this.nwlatitude.split('.');
      nwValue = nwValue + 1;
    }
    if (this.nwlongitude !== '' && this.nwlongitude !== undefined) {
      value6 = this.nwlongitude.split('.');
      nwValue = nwValue + 1;
    }
    if (this.nwlatitude !== '' && this.nwlatitude !== undefined && this.nwlongitude !== '' && this.nwlongitude !== undefined) {
      count++;
    }
    if (this.swlatitude !== '' && this.swlatitude !== undefined) {
      value7 = this.swlatitude.split('.');
      swValue = swValue + 1;
    }
    if (this.swlongitude !== '' && this.swlongitude !== undefined) {
      value8 = this.swlongitude.split('.');
      swValue = swValue + 1;
    }
    if (this.swlatitude !== '' && this.swlatitude !== undefined && this.swlongitude !== '' && this.swlongitude !== undefined) {
      count++;
    }
    if (this.selatitude !== '' && this.selatitude !== undefined) {
      value9 = this.selatitude.split('.');
      seValue = seValue + 1;
    }
    if (this.selongitude !== '' && this.selongitude !== undefined) {
      value10 = this.selongitude.split('.');
      seValue = seValue + 1;
    }
    if (this.selatitude !== '' && this.selatitude !== undefined && this.selongitude !== '' && this.selongitude !== undefined) {
      count++;
    }
    this.fleet.isTransactable = this.isTransactable;
    for (let n = 0; n < this.attributesarray.length; n++) {
      this.fleet.attributes[this.attributesarray[n].key] = this.attributesarray[n].value;
    }
    this.createfleet.isEnabled = this.dafaultActive;

    if (this.editfleetname === '' || this.editfleetname === undefined || this.editfleetname === null) {
      this.error = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FLEET');
      this.error = this.fleetCommonName + this.error.value;
    } else if (this.floorplanavilable && (this.startZoomValue === '' || this.startZoomValue === undefined || this.startZoomValue === null)) {
      this.error = 'FLEETS.VALID_NOBLANK_START_ZOOM';
    } else if (this.floorplanavilable && (this.finalZoomValue === '' || this.finalZoomValue === undefined || this.finalZoomValue === null)) {
      this.error = 'FLEETS.VALID_NOBLANK_FINAL_ZOOM';
    } else if (this.floorplanavilable && (parseInt(this.startZoomValue) > parseInt(this.finalZoomValue))) {
      this.error = 'FLEETS.VALID_FINAL_ZOOM_GREATER_THAN_STARTZOOM';
    } else if (this.fleetfloorimg !== '' && (this.fleetfloorimg.type.toLowerCase() !== 'image/png' && this.fleetfloorimg.type.toLowerCase() !== 'image/jpg')) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.floorplanavilable && (this.fleetjsonfile !== '' && this.fleetjsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_NAVPATH_FILENAME';
    } else if (this.floorplanavilable && (this.floorMetaDatajsonfile !== '' && this.floorMetaDatajsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_METADATA_JSON_FILENAME';
    } else if (this.floorplanavilable && (this.fleetPathBoundaiesjsonfile !== '' && this.fleetPathBoundaiesjsonfile.type !== 'application/json')) {
      this.error = 'FLEETS.VALID_BOUDARIES_JSON_FILENAME';
    } else if (this.floorplanavilable && (this.fleetjsonfile !== '' && this.floorMetaDatajsonfile !== '' && this.fleetjsonfile.name === this.floorMetaDatajsonfile.name)) {
      this.error = 'FLEETS.PLEASE_MAKE_SURE_THAT_UPLOADED_FILE_NAME_MUST_BE_DIFFERENT';
    } else if (this.floorplanavilable && (this.fleetjsonfile !== '' && this.fleetPathBoundaiesjsonfile !== '' && this.fleetjsonfile.name === this.fleetPathBoundaiesjsonfile.name)) {
      this.error = 'FLEETS.PLEASE_MAKE_SURE_THAT_UPLOADED_FILE_NAME_MUST_BE_DIFFERENT';
    } else if (this.floorplanavilable && (this.floorMetaDatajsonfile !== '' && this.fleetPathBoundaiesjsonfile !== '' && this.floorMetaDatajsonfile.name === this.fleetPathBoundaiesjsonfile.name)) {
      this.error = 'FLEETS.PLEASE_MAKE_SURE_THAT_UPLOADED_FILE_NAME_MUST_BE_DIFFERENT';
    } else if (this.worknumbercountrycode === '' || this.worknumbercountrycode === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE_COUNTRY_CODE';
    } else if (this.worknumber === '' || this.worknumber === undefined || this.worknumber === null) {

      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_WORK#';
    } else if (this.worknumber.length < 12) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_WORKNUMBER';
    } else if (this.email === '' || this.email === undefined || this.email === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
    } else if (!(re.test(this.email))) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
    } else if (this.addressLine1 === '' || this.addressLine1 === undefined || this.addressLine1 === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ADDRESSLINE1';
    } else if (this.city === '' || this.city === undefined || this.city === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CITY';
    } else if (this.country === '' || this.country === undefined || this.country === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_COUNTRY';
    } else if (this.state === '' || this.state === undefined || this.state === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_STATE';
    } else if (this.addresszip === '' || this.addresszip === undefined || this.addresszip === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ZIP';
    } else if (this.defaultTimezone === undefined || this.defaultTimezone === '' || this.defaultTimezone === null) {
      this.error = 'COMMON_DEFAULT_FIELDS.DEFAULT_TIME_ZONE';
    } else if ((this.latitude === undefined || this.latitude === '' || this.latitude === null)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LATITUDE';
    } else if (!this.latitude.match(this.LONG_LAT_PAT) || this.value1[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if (!this.latitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LATITUDE_FORMAT';
    } else if ((this.longitude === undefined || this.longitude === '' || this.longitude === null)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LONGITUDE';
    } else if (!this.longitude.match(this.LONG_LAT_PAT) || this.value[1].length < 6) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (!this.longitude.match(this.LONG_LAT_PAT1)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_LONGITUDE_FORMAT';
    } else if (this.editvalidAttributes() === true) {
      this.error = this.error1;
    } else if (this.worknumber !== '') {
      this.fleet.address.geoCoordinates[0] = this.latitude.replace('+', '%2B').trim().replace(/\s\s+/g, ' ');
      this.fleet.contactDetails.workNumberCountrycode = this.worknumbercountrycode;
      this.fleet.address.geoCoordinates[1] = this.longitude.replace('+', '%2B').trim().replace(/\s\s+/g, ' ');
      this.fleet.contactDetails.workNumber = this.worknumber.trim().replace(/\s\s+/g, ' ');
      this.fleet.contactDetails.email = this.email.trim().replace(/\s\s+/g, ' ');
      this.fleet.address.ZIP = this.addresszip.trim().replace(/\s\s+/g, ' ');
      this.fleet.fleetName = this.autocase(this.editfleetname.trim().replace(/\s\s+/g, ' '));
      this.fleet.address.addressLine1 = this.autocase(this.addressLine1.trim().replace(/\s\s+/g, ' '));
      this.fleet.address.addressLine2 = this.autocase(this.addressLine2);
      this.fleet.address.city = this.autocase(this.city.trim().replace(/\s\s+/g, ' '));
      this.fleet.address.country = this.country;
      this.fleet.address.state = this.state;
      this.fleet.notes = this.notes;
      this.fleet.preferences.defaultTheme = this.defaultTheme;
      this.fleet.preferences.rowsPerPage = this.rowsPerPage;
      this.fleet.preferences.defaultCurrency = this.defaultCurrency;
      //  this.fleet.preferences.timeZone = this.timeZone;
      this.fleet.preferences.currencyFormat = this.currencyFormat;
      this.fleet.preferences.dateFormat = this.dateFormat;
      this.fleet.settings.advancedReservationWindowInDays = this.advancedReservationWindowInDays;
      this.fleet.settings.reservationCanBeBumped = this.reservationCanBeBumped;
      this.fleet.settings.earlyCheckinWindowInMins = this.earlyCheckinWindowInMins;
      this.fleet.settings.expirationGracePeriodInMins = this.expirationGracePeriodInMins;
      this.fleet.settings.maxReservationWindowInHrs = this.maxReservationWindowInHrs;
      this.fleet.settings.checkinRequired = this.checkinRequired;
      this.fleet.settings.configurable = this.configurable;
      this.fleet.settings.longTermReservationEligible = this.longTermReservationEligible;
      this.fleet.contactDetails.workNumberExtn = this.worknumext;
      delete this.fleet.type;
      delete this.fleet.geometry;
      delete this.fleet.properties;
      this.fleet.floorPlanFleetObj = this.floorPlanFleetObj;
      this.fleet.floorPlanDetails.startZoom = this.startZoomValue;
      this.fleet.floorPlanDetails.finalZoom = this.finalZoomValue;
      // this.fleet.isEventsEnabled = this.isEventsEnabled;
      // this.fleet.isTransactable = this.isTransactable;
      
      this.array = [];
      if (this.fleet.attributes) {
        for (let i = 0; i < this.fleet.attributes.length; i++) {
          const itemInputID = <HTMLInputElement>document.getElementById('edititemId' + i);
          const itemInputText = <HTMLInputElement>document.getElementById('edititemText' + i);
          this.attributeId = parseInt(itemInputID.value, 10);
          this.attributeText = itemInputText.value.trim().replace(/\s\s+/g, ' ');
          this.fleet.attributes[i].attributeValue = this.attributeText;
        }
      }
      for (let j = 0; j < this.attributeList.length; j++) {
        const itemInputID1 = <HTMLInputElement>document.getElementById('editnewitemId' + j);
        const itemInputText1 = <HTMLInputElement>document.getElementById('editattritemText' + j);
        this.newAttributeId = parseInt(itemInputID1.value, 10);
        this.newAttributeText = itemInputText1.value;
        this.fleet.attributes.push({
          'attribute': this.newAttributeId,
          'attributeValue': this.newAttributeText
        });
      }
      this.singleEnterpriseService.updateFleet(this.fleet, this.fleetid, this.userToken,
        this.fleetimgfile, this.fleetfloorimg, this.fleetsVisual, this.oldFiles, this.removedFiles, this.fleetjsonfile, this.floorMetaDatajsonfile, this.fleetPathBoundaiesjsonfile)
        .subscribe(
        (data: any) => {
          const fleetsadvancedsearch = window.localStorage.getItem('fleetsadvsearch');
          if (fleetsadvancedsearch !== 'fleetsadvsearch') {
            this.uploaded.emit('Edit');
          } else {
            window.localStorage.setItem('fleetsalllist', 'fleetsalllist');
          }
          if (localStorage.getItem('searchFleet') === 'searchFleet') {
            localStorage.setItem('editSearch', 'editSearch');
          } else {
            this.uploaded.emit('Edit');
          }
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.closePopupModal();
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '2033') {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                if (statuscode === '9961') {
                  this.storage.removeItem('token');
                  this.router.navigate(['/pages/login']);
                }
              } break;
          }
        });
    }
  }

  /*---- To upload the multiple files ----*/
  fleetsVisuals(event) {
    this.newfleetvisualsImages = [];
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    const fleetimg = <HTMLInputElement>document.getElementById('fleetvisualsimg');
    let img = files[0].name;
    if (img !== null && img !== undefined && img !== '') {
      if (img.length > 15) {
        img = img.substring(0, 15) + '..' + img.split('.')[1];
      }
    }
    fleetimg.innerHTML = img;
    for (let j = 0; j < files.length; j++) {
      this.fleetVisualsImageTypeError = false;
      this.error = '';
      if (files[j].type.indexOf('video') !== -1 || files[j].type.indexOf('audio') !== -1 || files[j].type.indexOf('image') !== -1) {
        files[j]['displayDate'] = moment(files[j]['lastModifiedDate'])
          .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
        this.fleetsVisual.push(files[j]);

      } else {
        this.fleetVisualsImageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }
    }
    for (let i = 0; i < this.fleetsVisual.length; i++) {
      if (this.fleetsVisual[i].name !== null &&
        this.fleetsVisual[i].name !== undefined && this.fleetsVisual[i].name !== '') {
        if (this.fleetsVisual[i].name.length > 19) {
          this.newfleetvisualsImages.push(this.fleetsVisual[i].name.substring(0, 19)
            + '..' + this.fleetsVisual[i].name.split('.')[1]);
        }
      }
    }
  }

  /**---- To removefiles selcted files ----*/
  removeFile(index) {
    this.fleetsVisual.splice(index, 1);
  }

  /**---- To remove previously uploaded files ----*/
  removeOldFile(index) {
    this.removedFiles.push(this.oldFiles[index].visualFilePath);
    this.oldFiles.splice(index, 1);
  }

  /**---- To display multiple files uploade date ----*/
  setDisplayDates(filesList: any) {
    if (filesList !== undefined && filesList.length > 0) {
      for (let i = 0; i < filesList.length; i++) {
        filesList[i]['displayDate'] = moment(filesList[i]['visualCreatedAt'])
          .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      }
    }
  }

  /**---- Delete fleet ----*/
  deleteFleets() {
    this.singleEnterpriseService.deleteFleetsfromList(this.fleetid)
      .subscribe(
      data => {
        if (data.statusCode === '1001') {
          const fleetsadvancedsearch = window.localStorage.getItem('fleetsadvsearch');
          if (fleetsadvancedsearch !== 'fleetsadvsearch') {
            this.uploaded.emit('Delete');
          } else {
            window.localStorage.setItem('fleetsalllist', 'fleetsalllist');
          }
          if (localStorage.getItem('searchFleet') === 'searchFleet') {
            localStorage.setItem('deleteSearch', 'deleteSearch');
          } else {
            this.uploaded.emit('Delete');
          }
          this.closePopupModal();
        }
        // this.getAllfleetsList(null);
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '2013') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              if (statuscode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              }
            } break;
        }
      });
  }

  /*-----  To Activate fleet -----*/
  activatefleet(fleet_id) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null) {
      this.singleEnterpriseService.updateResourceRecord(this.userToken,
        this.fleet._id, this.reasonValue, this.parentfleet, this.enterpriseid)
        .subscribe(
        followObj => {
          const fleetsadvancedsearch = window.localStorage.getItem('fleetsadvsearch');
          if (fleetsadvancedsearch !== 'fleetsadvsearch') {
            this.uploaded.emit('Active');
            window.localStorage.removeItem('fleetsadvsearch');
          } else {
            window.localStorage.setItem('fleetsallactivelist', 'fleetsallactivelist');
          }
          if (localStorage.getItem('searchFleet') === 'searchFleet') {
            localStorage.setItem('activateSearch', 'activateSearch');
          } else {
            this.uploaded.emit();
          }
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_ACTIVATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.childModal.hide();
        },
        error => {
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (statusCode) {
            case '2018':
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
              break;
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /*-----  To Inactivate fleet ----- */
  inactivateFleet(fleet_id) {
    if (this.reasonValue !== '' && this.reasonValue !== undefined && this.reasonValue !== null) {
      this.singleEnterpriseService.inactivatefleet(this.userToken, this.fleet._id, this.reasonValue, this.parentfleet, this.enterpriseid)
        .subscribe(
        followObj => {
          const fleetsadvancedsearch = window.localStorage.getItem('fleetsadvsearch');
          if (fleetsadvancedsearch !== 'fleetsadvsearch') {
            this.uploaded.emit('Inactive');
          } else {
            window.localStorage.setItem('fleetsInactivealllist', 'fleetsInactivealllist');
          }
          if (localStorage.getItem('searchFleet') === 'searchFleet') {
            localStorage.setItem('inactivateSearch', 'inactivateSearch');
          } else {
            this.uploaded.emit();
          }
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_INACTIVATE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.childModal.hide();
        },
        error => {
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (statusCode) {
            case '2019':
              this.error = 'COMMON_STATUS_CODES.' + statusCode;
              break;
          }
        });
    } else {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_REASON';
    }
  }

  /**---- To get child type list ----*/
  public getChildType() {
    this.singleEnterpriseService.getChildFleetTypeList(this.userToken, this.selectedenterpriseId, this.fleetType).subscribe(
      data => {
        if (data.statusCode === '1001') {
          const fleetsadvancedsearch = window.localStorage.getItem('fleetsadvsearch');
          if (fleetsadvancedsearch !== 'fleetsadvsearch') {
            this.uploaded.emit('Create');
          } else {
            window.localStorage.setItem('fleetsalllist', 'fleetsalllist');
          }
          this.childfleetTypes = data['result'];
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

  /**---- View fleets ---- */
  viewFleet(id, enterpriseId) {
    this.attributesarray = [];
    this.galleryImages = [];
    this.userToken = window.localStorage.getItem('token');
    // --- Start of code defaulting values ---//
    this.fleet.enterpriseId = '';
    this.fleet.name = '';
    this.fleet.type = {};
    this.fleet.path = '';
    this.fleet.isTransactable = false;
    this.fleet.isEnabled = false;
    this.fleet.isFloorplanavilable = false;
    this.fleet.description = '';
    this.fleet.isEnabled = '';
    this.fleet.address = {};
    this.fleet.preferences = {};
    this.fleet.settings = {};
    this.fleet.attributes = [{}];
    this.fleet.defaultTheme = '';
    this.fleet.homePageUrl = '';
    this.fleet.thumbnailUrl = '';
    this.fleet.remarks = '';
    this.fleet.gallery = {};
    this.fleet.createdBy = '';
    this.fleet.createdAt = '';
    this.floorplanavilable = false;
    if (this.fleet.enterpriseName) {
      this.fleet.enterpriseName = '';
    }
    // --- End of code defaulting values ---//
    this.singleEnterpriseService.getSingleFleetDetails(id, this.userToken)
      .subscribe(
      (data: any) => {
        this.fleet = data.result;
        this.imgSrc = this.apiEndPoint + '/' + this.fleet.fleetImageFilePath;
        this.imageName = this.fleet.fleetImageFileName;
        this.enterpriseName = this.fleet.enterprise.enterpriseName;
        this.fleetimg = this.imageName.split('.');
        if (this.fleetimg[0].length > 30) {
          const imgname = this.fleetimg.toString();
          this.imageName = imgname.substring(0, 30) + '...' + this.fleetimg[1];
        }
        this.updatedAt = moment(this.fleet.updatedAt).format('YYYY-MM-DD HH:mm:ss');
        this.createdAt = moment(this.fleet.createdAt).format('YYYY-MM-DD HH:mm:ss');
        if (this.actionType === 'Edit' || this.actionType === 'FleetSubmit' || this.actionType === 'ChildSubmit') {
          this.fleetName = this.fleet.fleetName;
          this.getStatesList(this.fleet.address.country);
        }
        this.longitude = data.result.address.geoCoordinates[1].replace('%2B', '+');
        this.latitude = data.result.address.geoCoordinates[0].replace('%2B', '+');
        for (const key of Object.keys(this.fleet.attributes)) {
          this.attributesarray.push({ 'key': key, 'value': this.fleet.attributes[key] });
        }
        this.parentpath = this.fleet.path;
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

  /**---- To get selected status ----*/
  ChangeStatus(value) {
    this.dafaultActive = value;
  }

  /**---- To get selected reason ----*/
  getreason(reason) {
    this.reasonValue = reason;
  }

  /**---- To get selected theme ----*/
  changetheme(theme) {
    this.defaultTheme = theme;
  }

  @HostListener('keypress', ['$event'])
  /**---- To Handle Key press ----*/
  keyPress(e) {
    const key = e.keyCode;
    if (this.updateaction === 'VIEW') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.updateaction === 'DELETE') {
      if (key === 13) {
        this.deleteFleets();
      }
    }
  }

  /**---- To get selected moblie country code values in Add ----*/
  getMobileCountryCode(countryCode) {
    this.mobileCountryCode = countryCode;
  }

  /*---- To get selected moblie country code values in Edit ----*/
  getMobileCountryCodeEdit(countryCode) {
    this.fleet.contactDetails.mobileNumberCountrycode = countryCode;
  }

  /**---- To get selected path ----*/
  changechildpaths(changechildpath) {
    this.childpath = changechildpath;
  }

  /**---- To check attributes validations -----*/
  validAttributes() {
    for (let i = 0; i < this.attributeList.length; i++) {
      const itemInputID = <HTMLInputElement>document.getElementById('itemId' + i);
      const itemInputText = <HTMLInputElement>document.getElementById('itemText' + i);
      this.attributeId = parseInt(itemInputID.value, 10);
      this.attributeText = itemInputText.value;
      if (this.attributeList[i].isMandatory) {
        if (this.attributeText.trim() === '' || this.attributeText.trim() === undefined || this.attributeText.trim() === null) {
          this.error1 = this.attributeList[i].attributeName + ' can not be blank';
          return true;
        }

      }
    }
    return false;
  }

  /**---- To Check attribute validations in edit -----*/
  editvalidAttributes() {
    for (let i = 0; i < this.fleet.attributes.length; i++) {
      if (this.fleet.attributes[i].attribute.attributeType === 'Text Field') {
        const itemInputText = <HTMLInputElement>document.getElementById('edititemText' + i);
        this.attributeText = itemInputText.value;
        if (this.fleet.attributes[i].attribute.isMandatory) {
          if (this.attributeText.trim() === '' || this.attributeText.trim() === undefined || this.attributeText === null) {
            this.error1 = this.fleet.attributes[i].attribute.attributeName + ' can not be blank';
            return true;
          }
        }
      } if (this.fleet.attributes[i].attribute.attributeType === 'List Field') {
        const itemInputID = <HTMLInputElement>document.getElementById('edititemId' + i);
        if (this.fleet.attributes[i].attribute.isMandatory) {
          if (itemInputID.value.trim() === '' || itemInputID.value.trim() === undefined || itemInputID.value === null) {
            this.error1 = this.fleet.attributes[i].attribute.attributeName + ' can not be blank';
            return true;
          }
        }
      }
    }
    for (let j = 0; j < this.attributeList.length; j++) {
      if (this.attributeList[j].attributeType === 'Text Field') {
        const itemInputText = <HTMLInputElement>document.getElementById('editattritemText' + j);
        this.attributeText = itemInputText.value;
        if (this.attributeList[j].isMandatory) {
          if (this.attributeText.trim() === '' || this.attributeText.trim() === undefined || this.attributeText.trim() === null) {
            this.error1 = this.attributeList[j].attributeName + ' can not be blank';
            return true;
          }
        }
      } if (this.attributeList[j].attributeType === 'List Field') {
        const itemInputID = <HTMLInputElement>document.getElementById('editattritem' + j);
        if (this.attributeList[j].isMandatory) {
          if (itemInputID.value.trim() === '' || itemInputID.value.trim() === undefined || itemInputID.value.trim() === null) {
            this.error1 = this.attributeList[j].attributeName + ' can not be blank';
            return true;
          }
        }
      }
    }
  }

  /**----  To get selected enterprise ----*/
  getEnterprisepathById(enterprise) {
    if (enterprise !== 'Select') {
      this.parentpath = '';
      this.value = enterprise.split('$');
      this.createfleet.enterprise.enterpriseId = parseInt(this.value[0], 10);
      this.createfleet.enterprise.enterpriseName = this.value[1];
      this.selectedenterpriseId = parseInt(this.value[0], 10);
      this.enterpriseIconFilePath = this.value[2] + '/' + this.value[17];
      this.imgSrc = this.apiEndPoint + '/' + this.value[2] + '/' + this.value[17];
      this.constimage = this.apiEndPoint + '/' + this.value[2] + '/' + this.value[17];
      this.createfleet.fleetImageFilePath = this.value[2];
      this.createfleet.fleetImageFileName = this.value[17];
      this.constimagepath = this.value[2];
      this.createfleet.address.addressLine1 = this.value[3];
      this.createfleet.address.addressLine2 = this.value[4];
      this.createfleet.address.city = this.value[5];
      this.createfleet.address.state = this.value[7];
      this.createfleet.address.country = this.value[6];
      this.getStatesList(this.value[6]);
      this.createfleet.address.ZIP = this.value[16];
      this.selectCountry = this.value[6];
      this.state = this.value[7];
      this.latitude = this.value[8];
      this.longitude = this.value[9];
      this.defaultLanguage1 = this.value[11];
      this.defaultTimezone = this.value[10];
      this.defaultCurrency = this.value[13];
      this.dateFormat = this.value[12];
      this.currencyFormat = this.value[14];
      this.createfleet.preferences.defaultTimezone = this.value[10];
      this.createfleet.preferences.defaultLanguage = this.value[11];
      this.createfleet.preferences.dateFormat = this.value[12];
      this.createfleet.preferences.defaultCurrency = this.value[13];
      this.createfleet.preferences.currencyFormat = this.value[14];
      this.createfleet.preferences.defaultTheme = this.value[18];
      this.createfleet.preferences.rowsPerPage = this.value[19];
      this.defaultTheme = this.value[18];
      this.rowsPerPage = this.value[19];
      this.mobileCountryCode = this.value[20];
      this.createfleet.contactDetails.mobile = this.value[21];
      this.advancedReservationWindowInDays = this.value[24];
      this.earlyCheckinWindowInMins = this.value[25];
      this.expirationGracePeriodInMins = this.value[26];
      this.maxReservationWindowInHrs = this.value[27];
      this.reservationCanBeBumped = JSON.parse(this.value[28]);
      this.longTermReservationEligible = this.value[30];
      this.configurable = this.value[31];
      if (this.value[22] === 'null') {
        this.createfleet.contactDetails.ext = '';
      } else {
        this.createfleet.contactDetails.ext = this.value[22];
      }
      this.createfleet.contactDetails.email = this.value[23];
      this.getLookupType();
    } else {
      this.getEnterpriseNamesList();
      this.getLanguages();
      this.getDateFormates();
      this.getCurrencys();
      this.getAmountFormates();
      this.getRowsperPage();
      this.getThemes();
      this.getStatesList(this.selectCountry);
      this.getCountries();
      this.getTimeZones();
      this.getCountryStatesEdit(this.defaultCountry);
      this.fleetTypes = [];
      this.childfleetTypes = [];
      this.enterprisepathlist = [];
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.imgSrc = this.apiEndPoint + '/' + window.localStorage.getItem('EnterpriseImage');
      this.createfleet = {};
      this.createfleet.contactDetails = {};
      this.createfleet.address = {};
      this.createfleet.preferences = {};
      this.createfleet.settings = {};
      this.createfleet.enterprise = {};
      this.createfleet.address.geoCoordinates = [];
      this.createfleet.attributes = [];
      this.defaultLanguage1 = this.defaultLanguage2;
      this.defaultTimezone = this.defaultTimezone2;
      this.defaultCurrency = this.defaultCurrency1;
      this.defaultTheme = this.defaultTheme2;
      this.dateFormat = this.dateFormat2;
      this.currencyFormat = this.currencyFormat2;
      this.createfleet.address.country = this.defaultCountry;
      this.createfleet.preferences.defaultTimezone = this.defaultTimezone;
      this.createfleet.preferences.defaultLanguage = this.defaultLanguage1;
      this.createfleet.preferences.defaultTheme = this.defaultTheme;
      this.createfleet.preferences.rowsPerPage = this.rowsPerPage;
      this.createfleet.preferences.dateFormat = this.dateFormat;
      this.advancedReservationWindowInDays = window.localStorage.getItem('advancedReservationWindowInDays');
      this.earlyCheckinWindowInMins = window.localStorage.getItem('earlyCheckinWindowInMins');
      this.expirationGracePeriodInMins = window.localStorage.getItem('expirationGracePeriodInMins');
      this.maxActiveReservationsPerUser = window.localStorage.getItem('maxActiveReservationsPerUser');
      this.maxReservationWindowInHrs = window.localStorage.getItem('maxReservationWindowInHrs');
      this.reservationCanBeBumped = JSON.parse(window.localStorage.getItem('reservationCanBeBumped'));
      this.reservationReminderWindowInMins = window.localStorage.getItem('reservationReminderWindowInMins');
      this.sendReservationReminders = window.localStorage.getItem('sendReservationReminders');
      this.enabled = true;
      this.transactable = true;
      this.floorplanavilable = true;
      this.getStatesList(this.selectCountry);
      this.state = this.defaultState;
      this.mobileCountryCode = '+1';
      this.createfleet.contactDetails.mobile = '';
      this.createfleet.contactDetails.ext = '';
      this.createfleet.contactDetails.email = '';
    }
  }

  /** ---Get Timezone--- */
  getTimezone(value) {
    this.createfleet.preferences.defaultTimezone = value;
  }

  /**---- To get selected fleet path ----*/
  fleetpath(value) {
    this.imgSrc = '';
    this.value1 = value.split('$');
    if (this.value1[0] !== '') {
      this.parentpath = this.value1[0] + ' => ';
      this.parentpath = this.parentpath + this.value1[1];
      this.getfloorvalue(this.parentpath, '');
    } else {
      this.parentpath = this.value1[1];
      this.getfloorvalue(this.parentpath, '');
    }
    if (this.value1[2] !== undefined) {
      if (this.value1[3]) {
        this.floorPlanFleetObj = Number(this.value1[3]);
      } else {
        this.floorPlanFleetObj = null;
      }
      this.getFleetDetails(this.value1[2]);
    } else {
      this.parentpath = '';
      this.floorPlanFleetObj = '';
      this.imgSrc = this.apiEndPoint + '/' + this.enterpriseIconFilePath;
      this.createfleet.fleetImageFilePath = this.constimagepath;
    }
  }

  /**---- TO get parent fleets ----*/
  public getParentFleetList() {
    this.singleEnterpriseService.getParentFleetList(this.userToken, this.createfleet.enterprise.enterpriseId,
      this.createfleet.fleetType)
      .subscribe(
      enterprisePathList => {
        if (enterprisePathList.statusCode === '1001') {
          this.enterprisepathlist = enterprisePathList['result'];
          // this.state = this.value[7];
          // this.createfleet.address.state = this.value[7];
          // this.getLookupType();
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
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '9995') {
              this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            } else if (statuscode === '9997') {
              const result = JSON.parse(error['_body']).result;
              if (result.length === 0) {
                this.enterprisepathlist.length = 0;
              }
            } break;
        }
      });
  }

  /*---- Get selected Fleet Details ----*/
  getFleetDetails(fleetid) {
    this.userToken = window.localStorage.getItem('token');
    this.singleEnterpriseService.getFleetDetails(fleetid, this.userToken)
      .subscribe(
      AllfleetsDetails => {
        this.fleetData = AllfleetsDetails['result'].result;
        this.transactable = AllfleetsDetails['result'].isTransactable;
        this.createfleet.fleetImageFilePath = AllfleetsDetails['result'].fleetImageFilePath;
        this.createfleet.fleetImageFileName = AllfleetsDetails['result'].fleetImageFileName;
        if (AllfleetsDetails['result'].fleetImageFileName !== null) {
          this.imgSrc = this.apiEndPoint + '/' + AllfleetsDetails['result'].fleetImageFilePath
            + '/' + AllfleetsDetails['result'].fleetImageFileName;
        }
        this.constimage = this.imgSrc;
        this.longitude = AllfleetsDetails['result'].address.geoCoordinates[1];
        this.latitude = AllfleetsDetails['result'].address.geoCoordinates[0];
        this.createfleet.address.addressLine1 = AllfleetsDetails['result'].address.addressLine1;
        this.createfleet.address.addressLine2 = AllfleetsDetails['result'].address.addressLine2;
        this.createfleet.address.city = AllfleetsDetails['result'].address.city;
        this.createfleet.address.country = AllfleetsDetails['result'].address.country;
        this.createfleet.address.state = AllfleetsDetails['result'].address.state;
        this.createfleet.address.ZIP = AllfleetsDetails['result'].address.ZIP;
        this.selectCountry = AllfleetsDetails['result'].address.country;
        this.state = AllfleetsDetails['result'].address.state;
        this.defaultLanguage1 = AllfleetsDetails['result'].preferences.defaultLanguage;
        this.defaultTimezone = AllfleetsDetails['result'].preferences.defaultTimezone;
        this.defaultCurrency = AllfleetsDetails['result'].preferences.defaultCurrency;
        this.dateFormat = AllfleetsDetails['result'].preferences.dateFormat;
        this.rowsPerPage = AllfleetsDetails['result'].preferences.rowsPerPage;
        this.defaultTheme = AllfleetsDetails['result'].preferences.defaultTheme;
        this.currencyFormat = AllfleetsDetails['result'].preferences.currencyFormat;
        this.createfleet.preferences.defaultTimezone = AllfleetsDetails['result'].preferences.defaultTimezone;
        this.createfleet.preferences.defaultLanguage = AllfleetsDetails['result'].preferences.defaultLanguage;
        this.createfleet.preferences.dateFormat = AllfleetsDetails['result'].preferences.dateFormat;
        this.createfleet.preferences.defaultCurrency = AllfleetsDetails['result'].preferences.defaultCurrency;
        this.createfleet.preferences.currencyFormat = AllfleetsDetails['result'].preferences.currencyFormat;
        this.mobileCountryCode = AllfleetsDetails['result'].contactDetails.workNumberCountrycode;
        this.createfleet.contactDetails.mobile = AllfleetsDetails['result'].contactDetails.workNumber;
        this.advancedReservationWindowInDays = AllfleetsDetails['result'].settings.advancedReservationWindowInDays;
        this.earlyCheckinWindowInMins = AllfleetsDetails['result'].settings.earlyCheckinWindowInMins;
        this.expirationGracePeriodInMins = AllfleetsDetails['result'].settings.expirationGracePeriodInMins;
        this.maxActiveReservationsPerUser = AllfleetsDetails['result'].settings.maxActiveReservationsPerUser;
        this.maxReservationWindowInHrs = AllfleetsDetails['result'].settings.maxReservationWindowInHrs;
        this.reservationCanBeBumped = AllfleetsDetails['result'].settings.reservationCanBeBumped;
        this.reservationReminderWindowInMins = AllfleetsDetails['result'].settings.reservationReminderWindowInMins;
        this.checkinRequired = AllfleetsDetails['result'].settings.checkinRequired;
        this.longTermReservationEligible = AllfleetsDetails['result'].settings.longTermReservationEligible;
        this.configurable = AllfleetsDetails['result'].settings.configurable;
        this.getStatesList(this.selectCountry);
        if (AllfleetsDetails['result'].contactDetails.workNumberExtn === 'null') {
          this.createfleet.contactDetails.ext = '';
        } else {
          this.createfleet.contactDetails.ext = AllfleetsDetails['result'].contactDetails.workNumberExtn;
        }
        this.createfleet.contactDetails.email = AllfleetsDetails['result'].contactDetails.email;
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

  /**----  To get selected rowperpage ----*/
  changerowsperpage(rowperpage) {
    this.rowsPerPage = rowperpage;
  }

  /**---- getupdaterowsperpage(updaterowperpage): To get updated rows per page ----*/
  getupdaterowsperpage(updaterowperpage) {
    // this.singleentEdit.rowsperpage = updaterowperpage;
  }

  fleetjsonfileUpload(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.fleetjsonfile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.fleetjsonfile.size;
    // this.imgSrc = this.imgfile.src;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    setTimeout(() => {
    }, 500);
    this.size = (Math.round(fSize * 100) / 100);
    this.bytes = fSExt[i];
    const pictype = this.fleetjsonfile.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/json'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      this.index = myObj['imageTypes'][j].indexOf(extension);
      if (extension === '/json') {
        this.jsonTypeError = false;
        this.error = '';
        break;
      } else {
        this.jsonTypeError = true;
        this.error = 'FLEETS.VALID_FLOOR_PLAN_JSON_FILENAME';
      }
    }
    if (this.actionType === 'FleetSubmit') {
      const fleetjsonfile = <HTMLInputElement>document.getElementById('fleetjsonfile');
      const fleetjson = this.fleetjsonfile.name;
      fleetjsonfile.innerHTML = fleetjson;
    } else if (this.actionType === 'Edit') {
      const fleetjsonfile = <HTMLInputElement>document.getElementById('editfleetjsonfile');
      const fleetjson = this.fleetjsonfile.name;
      fleetjsonfile.innerHTML = fleetjson;
    } else if (this.actionType === 'ChildSubmit') {
      const fleetjsonfile = <HTMLInputElement>document.getElementById('childfleetjsonfile');
      const fleetjson = this.fleetjsonfile.name;
      fleetjsonfile.innerHTML = fleetjson;
    }
  }
  /*========fleetPathBoundaiesjsonfileUpload======*/
  fleetPathBoundaiesjsonfileUpload(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.fleetPathBoundaiesjsonfile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.fleetPathBoundaiesjsonfile.size;
    // this.imgSrc = this.imgfile.src;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    setTimeout(() => {
    }, 500);
    this.size = (Math.round(fSize * 100) / 100);
    this.bytes = fSExt[i];
    const pictype = this.fleetPathBoundaiesjsonfile.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/json'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      this.index = myObj['imageTypes'][j].indexOf(extension);
      if (extension === '/json') {
        this.jsonTypeError = false;
        this.error = '';
        break;
      } else {
        this.jsonTypeError = true;
        this.error = 'FLEETS.VALID_FLOOR_PLAN_JSON_FILENAME';
      }
    }
    if (this.actionType === 'FleetSubmit') {
      const fleetPathBoundaiesjsonfile = <HTMLInputElement>document.getElementById('fleetPathBoundaiesjsonfile');
      const fleetjson = this.fleetPathBoundaiesjsonfile.name;
      fleetPathBoundaiesjsonfile.innerHTML = fleetjson;
    } else if (this.actionType === 'Edit') {
      const fleetPathBoundaiesjsonfile = <HTMLInputElement>document.getElementById('editfleetPathBoundaiesjsonfile');
      const fleetjson = this.fleetPathBoundaiesjsonfile.name;
      fleetPathBoundaiesjsonfile.innerHTML = fleetjson;
    } else if (this.actionType === 'ChildSubmit') {
      const fleetPathBoundaiesjsonfile = <HTMLInputElement>document.getElementById('childfleetPathBoundaiesjsonfile');
      const fleetjson = this.fleetPathBoundaiesjsonfile.name;
      fleetPathBoundaiesjsonfile.innerHTML = fleetjson;
    }
  }

  /*========floorMetaDatajsonfile======*/
  floorMetaDatajsonfileUpload(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.floorMetaDatajsonfile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.floorMetaDatajsonfile.size;
    // this.imgSrc = this.imgfile.src;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    setTimeout(() => {
    }, 500);
    this.size = (Math.round(fSize * 100) / 100);
    this.bytes = fSExt[i];
    const pictype = this.floorMetaDatajsonfile.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/json'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      this.index = myObj['imageTypes'][j].indexOf(extension);
      if (extension === '/json') {
        this.jsonTypeError = false;
        this.error = '';
        break;
      } else {
        this.jsonTypeError = true;
        this.error = 'FLEETS.VALID_FLOOR_PLAN_JSON_FILENAME';
      }
    }
    if (this.actionType === 'FleetSubmit') {
      const floorMetaDatajsonfile = <HTMLInputElement>document.getElementById('floorMetaDatajsonfile');
      const fleetjson = this.floorMetaDatajsonfile.name;
      floorMetaDatajsonfile.innerHTML = fleetjson;
    } else if (this.actionType === 'Edit') {
      const floorMetaDatajsonfile = <HTMLInputElement>document.getElementById('editfloorMetaDatajsonfile');
      const fleetjson = this.floorMetaDatajsonfile.name;
      floorMetaDatajsonfile.innerHTML = fleetjson;
    } else if (this.actionType === 'ChildSubmit') {
      const floorMetaDatajsonfile = <HTMLInputElement>document.getElementById('childfloorMetaDatajsonfile');
      const fleetjson = this.floorMetaDatajsonfile.name;
      floorMetaDatajsonfile.innerHTML = fleetjson;
    }
  }
  /** Get Selected language */
  getLanguage(value) {
    this.createfleet.preferences.defaultLanguage = value;
    this.fleet.preferences.defaultLanguage = value;
  }

  /** Get Selected Date Format */
  getDateFormat(value) {
    this.createfleet.preferences.dateFormat = value;
    this.dateFormat = value;
  }

  /** Get Selected Curreny */
  getCurrency(value) {
    this.createfleet.preferences.defaultCurrency = value;
    this.defaultCurrency = value;
  }

  /** Get Selected Curreny Format */
  getCurrencyformat(value) {
    this.createfleet.preferences.currencyFormat = value;
    this.currencyFormat = value;
  }

  /** Get Selected theme */
  gettheme(value) {
    this.createfleet.preferences.defaultLanguage = value;
    this.defaultLanguage = value;
  }

  /* To Get Selected Timezone */
  getTimezones(value) {
    this.createfleet.preferences.defaultTimezone = value;
    this.defaultTimezone = value;
  }

  /** Get Selected Country */
  getselectCountry(value) {
    this.createfleet.address.state = '';
    if (value !== '') {
      this.selectCountry = value;
      this.createfleet.address.country = value;
      this.state = '';
      this.states = [];
      this.getStatesList(this.selectCountry);
    } else {
      this.states = [];
      this.state = '';
    }
  }

  /** Get Selected State */
  getselectState(value) {
    if (value !== '') {
      this.state = value;
      this.createfleet.address.state = value;
    } else {
      this.state = '';
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

  /*---- Close childModal popup ----*/
  closePopupModal() {
    this.getCountryCodes();
    this.imgSrc = '';
    this.startZoomValue = '';
    this.finalZoomValue = '';
    this.fleetimgfile = '';
    this.imageName = '';
    this.fleetTypes = [];
    this.fleetfloorimg = '';
    this.fleetjsonfile = '';
    this.fleetPathBoundaiesjsonfile = '';
    this.floorMetaDatajsonfile = '';
    this.floorplanavilable = false;
    this.childfleetTypes = [];
    this.fleet = {};
    this.fleet.type = {};
    this.fleet.contactDetails = {};
    this.fleet.address = {};
    this.fleet.preferences = {};
    this.fleet.settings = {};
    this.fleet.geoCoordinates = [];
    this.fleet.attributes = [];
    this.selectCountry = this.defaultCountry;
    this.createfleet = {};
    this.createfleet.contactDetails = {};
    this.createfleet.address = {};
    this.createfleet.preferences = {};
    this.createfleet.settings = {};
    this.createfleet.enterprise = {};
    this.createfleet.address.geoCoordinates = [];
    this.createfleet.attributes = [];
    this.enterprisepathlist = [];
    this.latitude = '';
    this.longitude = '';
    this.nelatitude = '';
    this.nelongitude = '';
    this.nwlatitude = '';
    this.nwlongitude = '';
    this.selatitude = '';
    this.selongitude = '';
    this.swlatitude = '';
    this.swlongitude = '';
    this.enterpriseIconFilePath = '';
    this.attributeList = [];
    this.oldFiles = [];
    this.fleetsVisual = [];
    if (this.updateaction !== 'create' && this.updateaction !== 'CRECHILD') {
      document.getElementById('filePopupId').style.display = 'none';
    }
    this.childModal.hide();
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
    this.fleetsVisual = [];
  }
  public clearmessage1() {
    this.error = '';
    this.startZoomValue = '';
    this.finalZoomValue = '';
    this.fleetfloorimg = '';
    this.fleetjsonfile = '';
    this.fleetPathBoundaiesjsonfile = '';
    this.floorMetaDatajsonfile = '';
  }

  /*---- To hide the modal ----*/
  public hideChildModal(): void {
    this.childModal.hide();
    this.error = '';
    this.imgSrc = '';
    this.fleetimgfile = '';
    this.imageName = '';
    this.comment = '';
    this.latitude = '';
    this.longitude = '';
    this.startZoomValue = '';
    this.finalZoomValue = ''
    this.fleetfloorimg = '';
    this.fleetjsonfile = '';
    this.fleetPathBoundaiesjsonfile = '';
    this.floorMetaDatajsonfile = '';
    this.imgName = '';
    this.checkBoxValue = false;
    this.closePopupModal();
  }

}
export class Reasons {
  public reason_id: 1;
  public reason_name: string;
  public reason_desc: string;
  public reason_source: string;
}
