/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/*
* All Fleets Attributes Component have below functionality.
* getSelectedFleetAttribute(actionName, fleetAttributeObj): This method is used to update the fleets status.
* ngOnInit(): All fleets list will be loaded at loading time.
* ngAfterViewInit(): This method is called after a component's view has been fully initialized.
* emitChanges(event): This method used to use event emitor.
* ngAfterContentChecked(): To check the content.
* advancedAttributes(): The data to be stored while we used advance search.
* This method is called after a component's view has been fully initialized.
* getFleetAttributesList(): To get all fleet attributes list.
* hideAdvancedModal(): To hide the advance modal popup's.
* handleKeyPress(e): This method is called when we press Enter key.
* advancedAttributesSearch(): To get advance search detail's.
* clearAdvancedModal(): To clear the input field's data.
* clearmessage(): To remove error message.
* getAllFleetssSeachList(searchstring): To get the all fleet attributes list by keyword.
* exportData(searchstring): This method is used to download the data
*/
import {
  Component, ViewChild, OnInit, AfterContentChecked,
  ViewContainerRef, EventEmitter, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { AttributesService } from './attributes.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { AttributeComponent } from '../attributepopup/attribute.component';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { AfterViewInit, ViewChildren } from '@angular/core';
import * as moment from 'moment/moment';
@Component({
  templateUrl: './attributes.html',
  providers: [ConfirmationService, AttributesService]
})
export class AttributesComponent implements OnInit, AfterViewInit, AfterContentChecked {
  stacked = '';
  allFleetAttributes: Array<FleetAttributesModel> = [];
  selectedAction: String;
  userToken: any = window.localStorage.getItem('token');
  selectedFleetAttributeObj = new FleetAttributesModel();
  AttributeslistingService: Array<FleetAttributesModel> = [];
  toastermessage: any;
  storage: Storage = window.localStorage;
  searchstring: any = '';
  fleetTypeAttributesviewstatus: any;
  fleetTypeAttributesaddstatus: any;
  fleetTypeAttributeseditstatus: any;
  fleetTypeAttributesdeletedstatus: any;
  fleetTypeAttributesexportstatus: any;
  fleetTypeAttributesliststatus: any;
  rowsPerPage = 10;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  fleetCommonName: any;
  // advance search
  advanced: any;
  error: any = '';
  enterpriseValue: any;
  fleettypeValue: any;
  attributeNameValue: any;
  attributetypeValue: any;
  enabledfleet: any = true;
  mandatoryfleet: any = true;
  enterpriseIconFilePath: any;
  adverrefresh: any = true;
  userrole: any;
  enterpriseName: any;
  deleted: EventEmitter<string> = new EventEmitter();
  @ViewChildren('input') vc;
  @ViewChild(AttributeComponent)
  private fleetsAttributeModalComponent: AttributeComponent;
  @ViewChild('advancedModel') public advancedModel: ModalDirective;
  constructor(private attributeslistingService: AttributesService,
    private confirmationService: ConfirmationService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private router: Router, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the all  list at loading time ----*/
  ngOnInit() {
     this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.fleetTypeAttributesaddstatus = window.localStorage.getItem('fleetTypeAttributesaddstatus');
    this.fleetTypeAttributeseditstatus = window.localStorage.getItem('fleetTypeAttributeseditstatus');
    this.fleetTypeAttributesviewstatus = window.localStorage.getItem('fleetTypeAttributesviewstatus');
    this.fleetTypeAttributesdeletedstatus = window.localStorage.getItem('fleetTypeAttributesdeletedstatus');
    this.fleetTypeAttributesexportstatus = window.localStorage.getItem('fleetTypeAttributesexportstatus');
    this.fleetTypeAttributesliststatus = window.localStorage.getItem('fleetTypeAttributesliststatus');
    // time zone
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.fleetTypeAttributesliststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getFleetAttributesList();
    }
  }

  /** This method is called after a component's view has been fully initialized.  */
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /**--- This method is called after every change in it's component -- */
  ngAfterContentChecked() {
     this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('fleettypeupdate') === 'fleetattribute') {
      this.advancedAttributesSearch();
      window.localStorage.removeItem('fleettypeupdate');
    }
  }

  /**--- This method is called for every pop action is done---- */
  emitChanges(event) {
    if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
      this.getAllFleetssSeachList(this.searchstring);
    } else {
      this.getFleetAttributesList();
    }
  }

  /*---- To get fleet attribute popup ----*/
  getSelectedFleetAttribute(actionName, fleetAttributeObj) {
    this.selectedFleetAttributeObj = fleetAttributeObj;
    this.selectedAction = actionName;
    this.fleetsAttributeModalComponent.showChildModal(actionName, fleetAttributeObj);
  }

  /** ----The data to be stored while we used advance search ---*/
  advancedAttributes() {
    this.advancedModel.show();
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseName = window.localStorage.getItem('enterPriseName');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }

  /*---- To get all fleet attributes list ----*/
  getFleetAttributesList() {
    this.attributeslistingService.getAttributesListing(this.userToken)
      .subscribe(
      allFleetAttributes => {
        if (allFleetAttributes['statusCode'] === '1028') {
          for (let i = 0; i < allFleetAttributes['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              allFleetAttributes['result'][i].createdAt = moment(allFleetAttributes['result'][i].createdAt).
                utc().add(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].createdAt = moment(allFleetAttributes['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              allFleetAttributes['result'][i].updatedAt = moment(allFleetAttributes['result'][i].updatedAt).
                utc().add(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].updatedAt = moment(allFleetAttributes['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              allFleetAttributes['result'][i].createdAt =
                moment(allFleetAttributes['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].createdAt =
                moment(allFleetAttributes['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              allFleetAttributes['result'][i].updatedAt =
                moment(allFleetAttributes['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].updatedAt =
                moment(allFleetAttributes['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.allFleetAttributes = allFleetAttributes['result'];
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
              this.toastr.error(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '9997') {
              this.allFleetAttributes = [];
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.error(this.toastermessage.value);
            }
        }
      });
  }

  /*---- To get search for all fleet attributes list ----*/
  getAllFleetssSeachList(searchstring) {
    window.localStorage.removeItem('advanceattribute');
    if (searchstring) {
      this.attributeslistingService.getAttributesSearchListing(searchstring, this.userToken)
        .subscribe(
        allFleetAttributes => {
          for (let i = 0; i < allFleetAttributes['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              allFleetAttributes['result'][i].createdAt = moment(allFleetAttributes['result'][i].createdAt).utc().
                add(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].createdAt = moment(allFleetAttributes['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              allFleetAttributes['result'][i].updatedAt = moment(allFleetAttributes['result'][i].updatedAt).utc().
                add(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].updatedAt = moment(allFleetAttributes['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              allFleetAttributes['result'][i].createdAt =
                moment(allFleetAttributes['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].createdAt =
                moment(allFleetAttributes['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              allFleetAttributes['result'][i].updatedAt =
                moment(allFleetAttributes['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
              allFleetAttributes['result'][i].updatedAt =
                moment(allFleetAttributes['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.allFleetAttributes = allFleetAttributes['result'];
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9997') {
                this.allFleetAttributes = [];
              } break;
          }
        });
    } else {
      this.getFleetAttributesList();
    }
  }

  /**--- To get advance attribute search details ---- */
  advancedAttributesSearch() {
    this.adverrefresh = 'false';
    if (this.enterpriseValue !== '' && this.enterpriseValue !== undefined) {
      this.enterpriseValue = this.enterpriseValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.fleettypeValue !== '' && this.fleettypeValue !== undefined) {
      this.fleettypeValue = this.fleettypeValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.attributeNameValue !== '' && this.attributeNameValue !== undefined) {
      this.attributeNameValue = this.attributeNameValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.attributetypeValue !== '' && this.attributetypeValue !== undefined) {
      this.attributetypeValue = this.attributetypeValue.trim().replace(/\s\s+/g, ' ');
    }
    this.advanced = {
      'enterprise': this.enterpriseValue,
      'fleetType': this.fleettypeValue,
      'attributeName': this.attributeNameValue,
      'attributeType': this.attributetypeValue,
      'isEnabled': this.enabledfleet,
      'isMandatory': this.mandatoryfleet
    };
    this.attributeslistingService.searchAttributes(this.userToken, this.advanced).subscribe(
      allFleetAttributes => {
        window.localStorage.setItem('advanceattribute', 'attributeadvance');
        for (let i = 0; i < allFleetAttributes['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            allFleetAttributes['result'][i].createdAt = moment(allFleetAttributes['result'][i].createdAt).utc().
              add(utctimesplit[0], 'hours');
            allFleetAttributes['result'][i].createdAt = moment(allFleetAttributes['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            allFleetAttributes['result'][i].updatedAt = moment(allFleetAttributes['result'][i].updatedAt).utc().
              add(utctimesplit[0], 'hours');
            allFleetAttributes['result'][i].updatedAt = moment(allFleetAttributes['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            allFleetAttributes['result'][i].createdAt =
              moment(allFleetAttributes['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            allFleetAttributes['result'][i].createdAt =
              moment(allFleetAttributes['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            allFleetAttributes['result'][i].updatedAt =
              moment(allFleetAttributes['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            allFleetAttributes['result'][i].updatedAt =
              moment(allFleetAttributes['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.allFleetAttributes = allFleetAttributes['result'];
        this.advancedModel.hide();
      },
      error => {
        const status = JSON.parse(error['status']);
        switch (status) {
          case 500:
            break;
          case 400:
            const statusCode = JSON.parse(error['_body']).statusCode;
            switch (statusCode) {
              case '2033':
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
                break;
              default:
                this.error = 'COMMON_STATUS_CODES.' + statusCode;
                break;
            }
            break;
        }
      }
    );

  }

  /*---- To hide the modal ----*/
  public hideAdvancedModal(): void {
    this.advancedModel.hide();
  }

  /** ---This is called when we press Enter key --- */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getAllFleetssSeachList(this.searchstring);
    }
  }

   /*---- To clear the modal ----*/
   public clearAdvancedModal(): void {
    this.enterpriseValue = '';
    this.fleettypeValue = '';
    this.attributeNameValue = '';
    this.attributetypeValue = '';
    this.enabledfleet = true;
    this.mandatoryfleet = true;
    this.getFleetAttributesList();
  }

  /** -----To clear the error message ---- */
  public clearmessage() {
    this.error = '';
  }

  /**----Export data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advanceattribute') === 'attributeadvance') {
      searchstring = JSON.stringify(this.advanced);
      window.localStorage.removeItem('advanceattribute');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.attributeslistingService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }
}

/* --- POJOs ---*/
export class FleetAttributesModel {
  public _id: string;
  public enterprise: Enterprise;
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
  public defaultValue: string;
  public createdAt: Date;
  public updatedBy: string;
  public updatedAt: Date;
}

export class Enterprise {
  public enterpriseName: string;
  public enterpriseId: number;
}
