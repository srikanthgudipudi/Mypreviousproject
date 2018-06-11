/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* All Fleets Component have below functionality.
* ngOnInit(): All fleets list will be loaded at loading time.
* ngAfterViewInit() : This method is called after a component's view has been fully initialized.
* ngAfterContentChecked(): To check the content every time after changes done.
* fleetDetails(updateaction, fleetdata): To open the popup.
* advancedSearchFleets(): To open advanced search popup.
* importPopup(): To open Import Popup.
* getStatusList(): To get staus list.
* getCountries(): Get Countries list.
* getFleetType(): get fleet types.
* ChangeFleetTypes(value): To get selected Fleettype.
* ChangeStatus(value): To get selected status.
* Changecountry(value): To get selected country.
* getfleetvalue(value, indexvlaue): To get fleet Values.
* getparentchildsrelation(fleetAssetId, path, enterPriseName, enterpriseId): To get parent childs relations.
* getAllfleetsList(fleetAssetName): To get all fleets list.
* handleKeyPress(e): To Handle Key press.
* getAllFleetssSearchList(searchstring): To get the all fleets list by passing searchstring.
* getFleetList(event): To Get Fleet List.
* advancedFleets(): To get advance search result.
* csvUploaded(users): To upload csv files.
* importList(): import submit method:
* exportData(searchstring): To export the data.
* clearmessage(): To clear the messages.
* hideAdvancedModal(): To hide the modal.
* hideImportModal(): To hide import popup.
* clearAdvancedModal(): To clear the modal.
* locates(locate): To locate multiple fleets.
* singlelocate(locate, singlefleet): To locate single fleet
*/

import {
  Component, ViewChild, OnInit, AfterContentChecked, Inject, ViewContainerRef,
  EventEmitter, Output, AfterViewInit, ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { FleetComponent } from '../fleetpopup/fleet.component';
import { Enterpriseservice } from '../../../admin/enterprises/enterprisepopup/enterprise.service';
import { FleetsService } from './fleets.service';
import { FleetService } from '../fleetpopup/fleet.service';
import * as moment from 'moment/moment';
import { jsonpFactory } from '@angular/http/src/http_module';
@Component({
  templateUrl: 'fleets.html',
  providers: [FleetsService, ConfirmationService, Enterpriseservice, FleetService]
})
export class FleetsComponent implements OnInit, AfterContentChecked, AfterViewInit {
  import: MenuItem[];
  allfleetsDetails: Array<FleetsDetails> = [];
  searchstring: string;
  stacked: boolean;
  userToken: any;
  fleetCommonName: any;
  toastermessage: any;
  fleetsCommonName: any;
  fleetAssetName: string;
  AllFeetNames = [];
  AllEnterPriseName = [];
  enterPriseName: string;
  childpaths = [];
  fleeteditstatus: any;
  fleetaddstatus: any;
  fleetviewstatus: any;
  fleetdeletedstatus: any;
  fleetexportstatus: any;
  fleetimportstatus: any;
  fleetsregionarry = [];
  loginstatuview = [];
  selectcreatetype: any;
  fleetType: any;
  rowsPerPage = 10;
  storage: Storage = window.localStorage;
  fleetlocatestatus: any;
  // time zones
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  enterpriseIconFilePath: any;
  // advancedSearchFleets
  statuslist: any;
  enabled: any;
  error: any;
  fleetTypes: any;
  countries: any;
  advsearch: any;
  attributeList: any;
  addinfo: any;
  attributeId: any;
  attributeText: any;
  fleetid: any;
  csvFile: any = '';
  csvSrc: any = '';
  fleetsDetails: any;
  EnterPriseNames: any;
  indexvalue: any;
  size: any;
  bytes: any;
  fileTypeError: any = false;
  userrole: any;
  enterpriseNames: any;
  loginUserDateFormat: any;
  timezoneCode: any;
  timezoneCodes: any;
  timeZones: any[];
  enterpriselist: any;
  enterprisesSize: any;
  selectedenterpriseId: any;
  value: any;
  enterpriseValue: any = '';
  @ViewChildren('input') vc;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  @ViewChild('fleetImportModal') public fleetImportModal: ModalDirective;
  @ViewChild(FleetComponent)
  private fleetsModalComponent: FleetComponent;
  @ViewChild('advancedModel') public advancedModel: ModalDirective;

  /**---- Constructor for fleets ----*/
  constructor(private allfleetsService: FleetsService,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private confirmationService: ConfirmationService,
    private singleEnterpriseService: Enterpriseservice,
    public singleFleetservices: FleetService,
    public toastr: ToastsManager,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /**---- To load the all fleets list at loading time ----*/
  ngOnInit() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.userToken = window.localStorage.getItem('token');
    // time zone
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0].trim();
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    localStorage.removeItem('lcfleetsdata');
    localStorage.removeItem('lcfleets');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advsearch = {};
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else {
      this.getEnterpriseNamesList();
      this.fleetaddstatus = window.localStorage.getItem('fleetaddstatus');
      this.fleeteditstatus = window.localStorage.getItem('fleeteditstatus');
      this.fleetviewstatus = window.localStorage.getItem('fleetviewstatus');
      this.fleetdeletedstatus = window.localStorage.getItem('fleetdeletedstatus');
      this.fleetexportstatus = window.localStorage.getItem('fleetexportstatus');
      this.fleetlocatestatus = window.localStorage.getItem('fleetlocatestatus');
      this.fleetimportstatus = window.localStorage.getItem('fleetimportstatus');
      if (this.storage.getItem('selectedcountry') !== undefined && this.storage.getItem('selectedcountry') !== null) {
        this.advsearch.country = this.storage.getItem('selectedcountry');
        this.advancedFleets();
        this.storage.removeItem('selectedcountry');
      } else if (this.storage.getItem('status') !== undefined && this.storage.getItem('status') !== null) {
        if (this.storage.getItem('selecteddashboardenterpriseid') === 'undefined') {
          this.advsearch.enterprise = '';
        } else {
          this.advsearch.enterprise = this.storage.getItem('selecteddashboardenterpriseid');
        }
        this.advsearch.status = this.storage.getItem('status');
        this.advancedFleets();
      } else {
        this.getAllfleetsList(null);
      }
      this.import = [

        { label: 'Import', icon: 'fa-upload', url: '#' },
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
  }

  /**---- This method is called after a component's view has been fully initialized ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /**---- To check the content every time after changes done ----*/
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('fleetstatus') === 'Updated') {
      this.getAllfleetsList(this.fleetAssetName);
    }
    if (window.localStorage.getItem('fleetsInactivealllist') === 'fleetsInactivealllist') {
      this.advancedFleets();
    }
    if (window.localStorage.getItem('fleetsallactivelist') === 'fleetsallactivelist') {
      this.advancedFleets();
    }
    if (window.localStorage.getItem('fleetsalllist') === 'fleetsalllist') {
      this.advancedFleets();
    }
    if (window.localStorage.getItem('deleteSearch') === 'deleteSearch') {
      this.getAllFleetssSearchList(this.searchstring);
      window.localStorage.removeItem('deleteSearch');
    }
    if (window.localStorage.getItem('activateSearch') === 'activateSearch') {
      this.getAllFleetssSearchList(this.searchstring);
      window.localStorage.removeItem('activateSearch');
    }
    if (window.localStorage.getItem('inactivateSearch') === 'inactivateSearch') {
      this.getAllFleetssSearchList(this.searchstring);
      window.localStorage.removeItem('inactivateSearch');
    }
    window.localStorage.removeItem('fleetstatus');
    window.localStorage.removeItem('fleetsInactivealllist');
    window.localStorage.removeItem('fleetsallactivelist');
    window.localStorage.removeItem('fleetsalllist');
  }
  /**----  To get selected enterprise ----*/
  getEnterprisepathById(enterprise) {
    if (enterprise !== '') {
      this.value = enterprise.split('$');

      this.selectedenterpriseId = this.value[0];
      this.advsearch.enterprise = this.value[1];
      this.advsearch.fleetType = '';
      this.attributeList = [];
      this.getLookupType();
    } else {
      this.fleetTypes = [];
      this.attributeList = [];
      this.advsearch = {};
    }
  }

  /*-- Get Lookup type list --*/
  public getLookupType() {
    this.allfleetsService.getFleetTypeList(this.userToken, this.selectedenterpriseId).subscribe(
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
  /*---- To get enterprise list   ----*/
  getEnterpriseNamesList() {
    this.userToken = window.localStorage.getItem('token');
    this.allfleetsService.getEnterpriseNamesList(this.userToken)
      .subscribe(
      enterpriseList => {
        if (enterpriseList.statusCode === '1001') {
          if (enterpriseList.result.length === 1) {
            this.enterpriselist = enterpriseList['result'];


          } else {
            this.enterpriselist = enterpriseList['result'];
            ///   this.enterprisesSize = false;
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
  /**---- To open the popup ----*/
  fleetDetails(updateaction, fleetdata) {
    this.fleetsModalComponent.showChildModal(updateaction, fleetdata);
  }

  /**---- To open advanced search popup ----*/
  advancedSearchFleets() {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.advancedModel.show();
    this.getStatusList();
    this.getCountries();
    this.getFleetType();
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }

  /**---- To open import Popup ----*/
  importPopup() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.fleetImportModal.show();
  }

  /**---- To get staus list ----*/
  public getStatusList() {
    this.singleEnterpriseService.getLookupsList(this.userToken, 'FLEET_STATUSES').subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.statuslist = data['result'];
          this.enabled = data['result'][0].lookupName;
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

  /**---- Get Countries list ----*/
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

  /**---- get fleet types ----*/
  public getFleetType() {
    const enterPriseId = localStorage.getItem('enterpriseId');
    this.allfleetsService.getFleetTypesList(this.userToken, enterPriseId).subscribe(
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

  /**---- To get selected Fleettype ----*/
  ChangeFleetTypes(value) {
    this.advsearch.fleetType = value;
    const enterPriseId = localStorage.getItem('enterpriseId');
    if (this.advsearch.fleetType === '') {
      this.attributeList = [];
    } else {
      this.singleFleetservices.getfleetTypeAttributes(this.userToken, this.advsearch.fleetType, enterPriseId)
        .subscribe(
        attributelist => {
          this.attributeList = attributelist['result'];
          if (JSON.stringify(this.attributeList) === '[]' || this.attributeList === null || this.attributeList.length === 0) {
            this.addinfo = false;
          } else {
            this.addinfo = true;
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
  }

  /**---- To get selected status ----*/
  ChangeStatus(value) {
    this.advsearch.status = value;
  }

  /**---- To get selected country ----*/
  Changecountry(value) {
    this.advsearch.country = value;
  }

  /**--- To get fleet Values ----*/
  getfleetvalue(value, indexvlaue) {
    this.indexvalue = indexvlaue;
    const enterPriseId = localStorage.getItem('enterpriseId');
    this.allfleetsService.getMyAllfleetsList(this.userToken, value, enterPriseId)
      .subscribe(
      AllfleetsDetails => {
        const fleetsDetails = [];
        const EnterPriseNames = [];
        this.childpaths.length = indexvlaue + 1; // careate childrens array
        this.fleetsregionarry.length = indexvlaue + 1; // careate fleetsregionarry array
        for (let i = 0; i < AllfleetsDetails['result']['childs'].length; ++i) {
          try {
            const x = AllfleetsDetails['result']['parent'][0].name;
            EnterPriseNames.push(this.enterPriseName);
            fleetsDetails.push(x);
          } catch (e) {
          }
        }
        this.AllFeetNames = fleetsDetails;
        this.AllEnterPriseName = EnterPriseNames;
        this.allfleetsDetails = AllfleetsDetails['result']['childs'];
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

  /**--- To get parent childs relations ----*/
  getparentchildsrelation(fleetAssetId, path, enterPriseName, enterpriseId) {
    if (path === null) {
      path = ',';
      this.enterPriseName = enterPriseName;
      const enterpriseIds = enterpriseId;
      localStorage.setItem('enterpriseId', enterpriseIds);
      const fleetregion = path + fleetAssetId + ',';
      this.allfleetsService.getMyAllfleetsList(this.userToken, fleetregion, enterpriseIds)
        .subscribe(
        AllfleetsDetails => {
          const fleetsDetails = [];
          const EnterPriseNames = [];
          this.childpaths.push(enterPriseName);
          this.fleetsregionarry.push(fleetregion);
          for (let i = 0; i < AllfleetsDetails['result']['childs'].length; ++i) {
            try {
              const x = this.enterPriseName;
              EnterPriseNames.push(this.enterPriseName);
              fleetsDetails.push(x);
            } catch (e) {
            }
          }
          this.AllFeetNames = fleetsDetails;
          this.AllEnterPriseName = EnterPriseNames;
          this.allfleetsDetails = AllfleetsDetails['result']['childs'];
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
    } else {
      const fleetregion = path + fleetAssetId + ',';
      const enterpriseIds = enterpriseId;
      this.allfleetsService.getMyAllfleetsList(this.userToken, fleetregion, enterpriseIds)
        .subscribe(
        AllfleetsDetails => {
          const fleetsDetails = [];
          const EnterPriseNames = [];
          this.childpaths.push(AllfleetsDetails['result']['parent'][0].name);
          this.fleetsregionarry.push(fleetregion);
          for (let i = 0; i < AllfleetsDetails['result']['childs'].length; ++i) {
            try {
              const x = AllfleetsDetails['result']['parent'][0].name;
              EnterPriseNames.push(this.enterPriseName);
              fleetsDetails.push(x);
            } catch (e) {
            }
          }
          this.AllFeetNames = fleetsDetails;
          this.AllEnterPriseName = EnterPriseNames;
          this.allfleetsDetails = AllfleetsDetails['result']['childs'];
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
  }

  /**---- To get all fleets list ----*/
  getAllfleetsList(fleetAssetName) {
    localStorage.removeItem('lcfleetsdata');
    localStorage.removeItem('lcfleets');
    const enterPriseId = localStorage.getItem('enterpriseId');
    this.allfleetsService.getMyAllfleetsList(this.userToken, fleetAssetName, enterPriseId)
      .subscribe(
      AllfleetsDetails => {
        const fleetsadvancedsearch = window.localStorage.getItem('fleetsadvsearch');
        if (fleetsadvancedsearch !== 'fleetsadvsearch') {
          this.uploaded.emit('Create');
        } else {
          window.localStorage.setItem('fleetsalllist', 'fleetsalllist');
        }
        for (let i = 0; i < AllfleetsDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).utc()
              .subtract(utctimesplit[0], 'hours');
            AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).utc()
              .subtract(utctimesplit[0], 'hours');
            AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.fleetsDetails = [];
        this.EnterPriseNames = [];
        const loginstatuss = [];
        this.loginstatuview = loginstatuss;
        this.AllFeetNames.length = 0;
        this.childpaths.length = 0; // careate childrens array
        this.fleetsregionarry.length = 0; // careate fleetsregionarry array
        this.allfleetsDetails = AllfleetsDetails['result'];
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
            } break;
        }
      });
  }

  /**--- To Handle Key press ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getAllFleetssSearchList(this.searchstring);
    }
  }

  /*---- To get the all fleets list by passing searchstring ----*/
  getAllFleetssSearchList(searchstring) {
    localStorage.removeItem('lcfleetsdata');
    localStorage.removeItem('lcfleets');
    window.localStorage.removeItem('fleetsadvsearch');
    if (searchstring) {
      this.searchstring = searchstring;
      this.allfleetsService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        AllfleetsDetails => {
          localStorage.setItem('searchFleet', 'searchFleet');
          for (let i = 0; i < AllfleetsDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).
                subtract(utctimesplit[1], 'minutes');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).
                subtract(utctimesplit[1], 'minutes');
            }
          }
          this.allfleetsDetails = AllfleetsDetails.result;
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 400:
              if (statusCode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
            case 500:
          }
        }
        );
    } else {
      this.getAllfleetsList(this.fleetAssetName);
    }
  }

  /**---- Get Fleet List ----*/
  getFleetList(event) {
    this.getAllfleetsList(null);
  }

  /**---- To get advance search result ----*/
  advancedFleets() {
    this.storage.removeItem('status');
    this.storage.removeItem('selecteddashboardenterpriseid');
    const array = [];
    if (this.attributeList && this.addinfo) {
      for (let i = 0; i < this.attributeList.length; i++) {
        const itemInputID = <HTMLInputElement>document.getElementById('itemId' + i);
        const itemInputText = <HTMLInputElement>document.getElementById('itemText' + i);
        this.attributeId = parseInt(itemInputID.value, 10);
        this.attributeText = itemInputText.value.trim().replace(/\s\s+/g, ' ');
        array[i] = {
          'attributeValue': this.attributeText
        };
      }
      this.advsearch.attributes = array;
      if (this.advsearch.attributes === undefined ||
        JSON.stringify(this.advsearch.attributes) === '[]' || this.advsearch.attributes === null) {

        delete this.advsearch.attributes;
      } else {
        this.advsearch.attributes = array;
      }
    }
    // for (const key of Object.keys(this.advsearch)) {
    //   if (this.advsearch[key] !== '' && this.advsearch[key] !== undefined) {
    //     this.advsearch[key] = this.advsearch[key].toString().trim().replace(/\s\s+/g, ' ');
    //   }
    // }
    this.allfleetsService.getadvancedFleetSearch(this.advsearch, this.userToken).subscribe(
      AllfleetsDetails => {
        localStorage.setItem('lcfleetsdata', JSON.stringify(AllfleetsDetails));
        localStorage.setItem('lcfleets', 'lcfleetsdata');
        window.localStorage.setItem('fleetsadvsearch', 'fleetsadvsearch');
        if (AllfleetsDetails.statusCode === '1001') {
          for (let i = 0; i < AllfleetsDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].createdAt = moment(AllfleetsDetails['result'][i].createdAt).
                subtract(utctimesplit[1], 'minutes');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              AllfleetsDetails['result'][i].updatedAt = moment(AllfleetsDetails['result'][i].updatedAt).
                subtract(utctimesplit[1], 'minutes');
            }
          }
          this.allfleetsDetails = AllfleetsDetails['result'];
          delete this.advsearch.attributes;
          this.advancedModel.hide();
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
            } else if (statuscode === '9997') {
              this.advancedModel.hide();
              this.allfleetsDetails = [];
            } break;
        }
      }
    );
  }

  /**---- To upload csv files ----*/
  csvUploaded(users) {
    const usersObj: MSInputMethodContext = <MSInputMethodContext>users;
    const target: HTMLInputElement = <HTMLInputElement>usersObj.target;
    const files: FileList = users.target.files;
    if (files.length > 0) {
      this.csvFile = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.csvFile.size;
    this.csvSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.csvFile));
    setTimeout(() => {
      this.csvSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.csvFile));
    }, 500);
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    this.size = (Math.round(fSize * 100) / 100);
    this.bytes = fSExt[i];
    const filetype = this.csvFile.type;
    const extension = filetype.substring(filetype.lastIndexOf('/'));
    const myObj = { 'fileTypes': ['/csv', '/xls', '/xlsx', '/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '/vnd.ms-excel'] };
    for (let j = 0; j < myObj['fileTypes'].length; j++) {
      const index = myObj['fileTypes'][j].indexOf(extension);
      if (index > -1) {
        this.fileTypeError = false;
        this.error = '';
        break;
      } else {
        this.fileTypeError = true;
        this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
      }
    }
  }

  /**---- importList(): import submit method ----*/
  importList() {
    if (this.csvFile === '' || this.csvFile === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_FILE';
    } else if (this.csvFile !== '' && this.csvFile.type === '') {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else if (this.csvFile !== '' && this.csvFile.type !== '' && this.fileTypeError === true) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_FILETYPE';
    } else {
      this.allfleetsService.importList(this.userToken, this.csvFile)
        .subscribe(data => {
          if (data.statusCode === '1001') {
            this.hideImportModal();
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
  }

  /**----To export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('fleetsadvsearch') === 'fleetsadvsearch') {
      searchstring = JSON.stringify(this.advsearch);
      window.localStorage.removeItem('fleetsadvsearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.allfleetsService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /*---- To hide the modal ----*/
  public hideAdvancedModal(): void {
    this.advancedModel.hide();
  }

  /**---- To hide import popup ----*/
  hideImportModal() {
    this.fleetImportModal.hide();
    this.error = '';
    this.csvFile = '';
  }

  /*---- To clear the modal ----*/
  public clearAdvancedModal(): void {
    this.advsearch = {};
    this.addinfo = false;
    localStorage.removeItem('lcfleetsdata');
    localStorage.removeItem('lcfleets');
    window.localStorage.removeItem('fleetsadvsearch');
    this.getAllfleetsList(null);
    this.enterpriseValue = '';
    this.fleetTypes = [];
  }

  /**---- To locate multiple fleets ----*/
  locates(locate) {
    this.allfleetsService.locates(locate, this.userToken, this.searchstring);
  }

  /**---- To locate single fleet ----*/
  singlelocate(locate, singlefleet) {
    if (singlefleet.floorPlanFleetObj !== null && singlefleet.floorPlanFleetObj !== undefined) {
      this.allfleetsService.getBuildingId(this.userToken, singlefleet.floorPlanFleetObj, 'fleet').subscribe(
        builingcode => {
          this.allfleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
            fleetInfo => {
              // localStorage.setItem('lcbuildingName', fleetInfo.fleetName);
              localStorage.setItem('lcsinglefleet', JSON.stringify(fleetInfo['floorsData']));
              localStorage.setItem('apiendpoint', this.apiEndPoint);
              // localStorage.setItem('fmapsettings', JSON.stringify(this.mapSettings));
              window.localStorage.setItem('fcurrentfloorname', builingcode.result.currentFloor);
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
          const buildingName = '';
          this.allfleetsService.singlelocateFleet(locate, this.userToken, fleetInfo['result']._id,
            false,
            currentFloorName, currentfid, cufloorId, singlefleet._id, buildingName);

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
  template(filePath: any) {
    this.allfleetsService.expTemplate(window.localStorage.getItem('token'), filePath)
      .subscribe(data => {
        window.location.href = data['result'];
        // window.open('assets/imports/Srisys-Pigeon-ImportTemplate-Fleets.xlsx');
      });
  }
  calendar(data) {
    window.localStorage.setItem('calendarfrom', 'Fleetscalendar');
    window.localStorage.setItem('fleets_id', data._id);
     window.localStorage.setItem('eventenabled', data.isEventsEnabled);
    this.router.navigate(['/calendar']);
    window.localStorage.removeItem('fleetreservaton_id');
    window.localStorage.removeItem('eventfleet_id');
  }
}
export class FleetsDetails {
  public fleetId: number;
  public fleetName: string;
  public type: string;
  public taggable: string;
  public bookable: string;
  public enabled: string;
  public enterprisesname: string;
  public parentfleetName: string;
}
export class MenuItem {
}
