/**
 * FleetTypesComponent have below methods:
 * ngOnInit(): Content should be loaded at loading time.
 *  ngAfterContentChecked(): To check the content very time.
 * singlefleettype(updateaction, selectedObj): To open the popup model.
 * advancedFleetTypes(): To open the advanced popup model.
 * handleKeyPress(e):  To get the value when key is pressed.
 * getallfleettypesList(): To get all fleet types list.
 * searchFleettypes(searchString): To search the fleet types.
 * advancedFleetTypesSearch: To search the fields in  advance search.
 * getallListFleetTypes(event): To recall the list.
 * exportData(searchstring): To download the fleet types.
 * hideadvancedModel(): To hide the advance popup model.
 * clearAdvancedModal(): To clear the data in advance popup.
 */
import {
  Component, OnInit, ViewChild, AfterContentChecked, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { FleetTypesService } from './fleettypes.service';
import { FleetTypeComponent } from '../fleettypespopup/fleettype.component';

@Component({
  templateUrl: 'fleettypes.html',
  providers: [FleetTypesService]
})

export class FleetTypesComponent implements OnInit, AfterContentChecked {
  userToken: any;
  utctimezonestring: any;
  utctimezone: any;
  stacked: any;
  fleetCommonName: any;
  allenterprisesDetails: any[];
  toastermessage: any;
  storage: any;
  userpreferedtimezone: any;
  rowsPerPage = 10;
  alllookupsDetails: any;
  enterpriseIconFilePath: any;
  enterpriseName: any;
  enterpriseNames: any;
  userrole: any;
  searchfleettypeDetails: any;
  fleetTypeValue: any;
  enabled = true;
  searchString: string;
  colorlist: any;
  availablefleetcolor: any = '';
  reservedfleetcolor: any = '';
  inactivefleetcolor: any = '';
  checkinfleetcolor: any = '';
  fleettransactablecolor: any = '';
  enterpriseList: any = [];
  viewstatus: any;
  addstatus: any;
  editstatus: any;
  liststatus: any;
  deletestatus: any;
  exportstatus: any;
  admincreate: any;

  @ViewChild(FleetTypeComponent)
  private fleetTypeComponent: FleetTypeComponent;
  @ViewChild('advancedModel') public advancedModel;

  constructor(private router: Router,
    private fleetTypesService: FleetTypesService,
    public toastr: ToastsManager, private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string) {
  }

  /**--- Content should be loaded at loading time ----*/
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userToken = window.localStorage.getItem('token');
    this.viewstatus = window.localStorage.getItem('fleettypesviewstatus');
    this.addstatus = window.localStorage.getItem('fleettypesaddstatus');
    this.editstatus = window.localStorage.getItem('fleettypeseditstatus');
    this.liststatus = window.localStorage.getItem('fleettypesliststatus');
    this.deletestatus = window.localStorage.getItem('fleettypesdeletedstatus');
    this.exportstatus = window.localStorage.getItem('fleettypesexportstatus');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.getallfleettypesList();
  }

  /**---- To check the content very time ----*/
  ngAfterContentChecked() {
     this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('fleettype') === 'advanceupdate') {
      this.advancedFleetTypesSearch();
      window.localStorage.removeItem('fleettype');
    } if (window.localStorage.getItem('fleettypesearch') === 'fleettypenormalsearch') {
      this.searchFleettypes(this.searchString);
    }
    window.localStorage.removeItem('fleettypesearch');
  }

  /**---- To open the popup model ----*/
  singlefleettype(updateaction, selectedObj) {
    this.fleetTypeComponent.showChildModal(updateaction, selectedObj);
  }

  /**---- To open the advanced popup model ---*/
  advancedFleetTypes() {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.getFleetColors();
    this.advancedModel.show();
  }

  /**---- To get the value when key is pressed ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.searchFleettypes(this.searchString);
    }
  }

  /**---- To get fleet colors ----*/
  getFleetColors() {
    const userToken = window.localStorage.getItem('token');
    this.fleetTypesService.getLookupsList(userToken, 'FLEET_COLOR_CODES').subscribe(
      data => {
        this.colorlist = data['result'];
      });
  }

  /*---- To get all fleet types list ----*/
  getallfleettypesList() {
    this.fleetTypesService.getMyAlllookupsList(this.userToken)
      .subscribe(
      alllookupsDetails => {
        this.enterpriseList = [];
        for (let i = 0; i < alllookupsDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc()
              .subtract(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i]
              .createdAt).subtract(utctimesplit[1], 'minutes');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc()
              .subtract(utctimesplit[0], 'hours');
            alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i]
              .updatedAt).subtract(utctimesplit[1], 'minutes');
          }
          this.enterpriseList.push(alllookupsDetails['result'][i].enterprise.enterpriseId._id);
          if (alllookupsDetails['result'][i].enterprise.enterpriseId._id == 0) {
            window.localStorage.setItem('fleetAvaliableColor', alllookupsDetails['result'][i].enterprise.fleetAvaliableColor);
            window.localStorage.setItem('fleetReservedColor', alllookupsDetails['result'][i].enterprise.fleetReservedColor);
            window.localStorage.setItem('fleetInactiveColor', alllookupsDetails['result'][i].enterprise.fleetInactiveColor);
            window.localStorage.setItem('fleetNonTransactableColor', alllookupsDetails['result'][i].enterprise.fleetNonTransactableColor);
            window.localStorage.setItem('fleetCheckinColor', alllookupsDetails['result'][i].enterprise.fleetCheckinColor);
          }
        }
        if (window.localStorage.getItem('userrole') !== 'Super Admin' && alllookupsDetails['result'].length > 0) {
          this.admincreate = 'disablecreate';
        }
        this.alllookupsDetails = alllookupsDetails['result'];
        window.localStorage.setItem('createtedenterpriselist', JSON.stringify(this.enterpriseList));
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }

  /**---- To search the fleet types ----*/
  public searchFleettypes(searchString) {
    window.localStorage.removeItem('fleettypeadvace');
    if (searchString) {
      this.fleetTypesService.searchfleettypes(searchString, this.userToken)
        .subscribe(
        alllookupsDetails => {
          window.localStorage.setItem('fleettypenormal', 'fleettypenormal');
          for (let i = 0; i < alllookupsDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc()
                .add(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt)
                .add(utctimesplit[1], 'minutes');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt)
                .utc().add(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i].createdAt).utc()
                .subtract(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].createdAt = moment(alllookupsDetails['result'][i]
                .createdAt).subtract(utctimesplit[1], 'minutes');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i].updatedAt).utc()
                .subtract(utctimesplit[0], 'hours');
              alllookupsDetails['result'][i].updatedAt = moment(alllookupsDetails['result'][i]
                .updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.alllookupsDetails = alllookupsDetails['result'];

        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
          }
        });
    } else {
      this.getallfleettypesList();
    }
  }

  /**---- To search the fields in  advance search ----*/
  advancedFleetTypesSearch() {
    window.localStorage.removeItem('fleettypenormal');
    window.localStorage.setItem('fleettypeadvace', 'fleettypeadvance');
    if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
      this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
    } else if (this.fleetTypeValue !== '' && this.fleetTypeValue !== undefined) {
      this.fleetTypeValue = this.fleetTypeValue.trim().replace(/\s\s+/g, ' ');
    }
    this.searchfleettypeDetails = {
      'enterpriseName': this.enterpriseName,
      'fleetAvaliableColor': this.availablefleetcolor,
      'fleetReservedColor': this.reservedfleetcolor,
      // 'fleetInactiveColor': this.inactivefleetcolor,
      'fleetNonTransactableColor': this.fleettransactablecolor,
      'fleetCheckinColor': this.checkinfleetcolor
    };
    this.fleetTypesService.searchFleettypeadvance(this.searchfleettypeDetails, this.userToken).subscribe(
      AllenterprisesDetails => {
        window.localStorage.setItem('advancesearch', 'advancesearch');
        for (let i = 0; i < AllenterprisesDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result'][i]
              .createdAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result'][i]
              .createdAt).add(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result'][i]
              .updatedAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result'][i]
              .updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result'][i].createdAt).utc()
              .subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result'][i]
              .createdAt).subtract(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result'][i].updatedAt).utc()
              .subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result'][i]
              .updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.alllookupsDetails = AllenterprisesDetails['result'];
        this.advancedModel.hide();
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

  /**----export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advancesearch') === 'advancesearch') {
      searchstring = JSON.stringify(this.searchfleettypeDetails);
      window.localStorage.removeItem('advancesearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.fleetTypesService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }
  /**--- To recall the list -----*/
  getallListFleetTypes(event) {
    this.getallfleettypesList();
  }
  /**---- To hide the advance popup model ----*/
  hideadvancedModel() {
    this.advancedModel.hide();
  }

  /*---- To clear the data in advance popup ----*/
  clearAdvancedModal() {
    this.enterpriseName = '';
    this.fleetTypeValue = '';
    this.enabled = true;
    this.getallfleettypesList();
    this.availablefleetcolor = '';
    this.reservedfleetcolor = '';
    this.inactivefleetcolor = '';
    this.checkinfleetcolor = '';
    // this.fleettransactablecolor = '';
  }

}
