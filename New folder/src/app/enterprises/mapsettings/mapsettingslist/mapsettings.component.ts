/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* All MapsettingsComponent have below functionality.
* ngOnInit(): This is the initial method called when page is loading.
* mapsettingsDetails(updateaction, mapsettingdata): This method is used to call particular popup.
* ngAfterContentChecked(): To check the content.
* getDisplayToMapList(): To display Mapsettings list.
* exportData(): To Export Event Data.
*/

import {
  Component, ViewChild, OnInit, Inject, AfterContentChecked, Output, ViewContainerRef, ViewChildren, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { MapsettingsService } from './mapsettings.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { MapSettingComponent } from '../mapsettingpopup/mapsetting.component';
import { Enterpriseservice } from '../../../admin/enterprises/enterprisepopup/enterprise.service';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';

@Component({
  templateUrl: 'mapsettings.html',
  providers: [ConfirmationService, Enterpriseservice, MapsettingsService]
})

export class MapsettingsComponent implements OnInit, AfterContentChecked {
  allmapsettingsDetails: Array<FleetsDetails> = [];
  userToken: any;
  stacked: any;
  rowsPerPage = 10;
  toastermessage: any;
  enterPriseName: string;
  storage: Storage = window.localStorage;
  enabled: any;
  error: any;
  viewstatus: any;
  editstatus: any;
  exportstatus: any;
  enterpriseIconFilePath: any;
  userrole: any;
  enterpriseNames: any;
  pagename: any;
  enterprisevalue: any = '';
  pagevalue: any = '';
  valobj: any;
  searchstring: any;
  @ViewChildren('input') vc;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  @ViewChild('fleetImportModal') public fleetImportModal: ModalDirective;
  @ViewChild('mgModal') public childModal1: ModalDirective;
  @ViewChild(MapSettingComponent)
  private mapsettingsModalComponent: MapSettingComponent;
  @ViewChild('advancedModel') public advancedModel: ModalDirective;

  /**------ Constructor for map settings component ------*/
  constructor(private mapsettingsService: MapsettingsService,
    private confirmationService: ConfirmationService,
    private singleEnterpriseService: Enterpriseservice,
    public singleFleetservices: MapsettingsService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /**-----  This is the initial method called when page is loading---- */
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.getDisplayToMapList();
    this.viewstatus = window.localStorage.getItem('displaymapviewstatus');
    this.editstatus = window.localStorage.getItem('displaymapeditstatus');
    this.exportstatus = window.localStorage.getItem('displaymapexportstatus');
  }
  ngAfterContentChecked() {
    if (window.localStorage.getItem('mapsetting') === 'advanceupdate') {
      this.advance();
      window.localStorage.removeItem('mapsetting');
    }
    if (window.localStorage.getItem('searchupdate') === 'searchupdate') {
      this.getSimpleSearch(this.searchstring);
    }
    window.localStorage.removeItem('searchupdate');
  }
  /**--------- This is used to call and open popup's------ */
  mapsettingsDetails(updateaction, mapsettingdata) {
    this.mapsettingsModalComponent.showChildModal(updateaction, mapsettingdata);
  }

  /** --This is used to call listing display to map setting ------- */
  getdisplaysettingsList(event) {
    this.getDisplayToMapList();
  }

  /*---- To display Mapsettings list ----*/
  getDisplayToMapList() {
    this.mapsettingsService.getDisplayToMapList(this.userToken)
      .subscribe(
      allmapsettingsDetails => {
        this.allmapsettingsDetails = allmapsettingsDetails['result'];
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

  /**---- To open the advance search popup model ----*/
  public AdvancePopupModal() {
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.pagename = 'COMMON_PAGE_TITLES.ADVANCED_SEARCH';
    this.error = '';
    this.childModal1.show();
  }
  /**---- To clear the input fields ----*/
  public clear() {
    this.enterprisevalue = '';
    this.pagevalue = '';
  }
  /**---- To hide the advance Model ----*/
  public hideAdvanceModal() {
    this.childModal1.hide();
  }
  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }
  /**---- Method for advance serach ----*/
  public advance() {
    window.localStorage.removeItem('mapsettingssearch');
    this.error = '';
    if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
      this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.pagevalue !== '' && this.pagevalue !== undefined) {
      this.pagevalue = this.pagevalue.trim().replace(/\s\s+/g, ' ');
    }
    window.localStorage.setItem('advancesearch', 'advancesearch');
    this.valobj = {
      'enterpriseName': this.enterprisevalue,
      'pageName': this.pagevalue
    };
    this.mapsettingsService.advacncedSearch(this.userToken, this.valobj).subscribe(
      data => {
        this.allmapsettingsDetails = data['result'];
        this.childModal1.hide();
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
  /**--- To call the search details default when enter key is used---- */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getSimpleSearch(this.searchstring);
    }
  }

  getSimpleSearch(searchstring) {
    window.localStorage.removeItem('advancesearch');
    window.localStorage.setItem('mapsettingssearch', 'mapsettingssearch')
    if (searchstring) {
      this.mapsettingsService.simpleSearch(this.userToken, searchstring).subscribe(
        data => {
          this.allmapsettingsDetails = data['result'];
        });
    } else {
      this.getDisplayToMapList();
    }
  }
  /*-----  To Export Event Data ----- */
  exportData() {
    const filePath = this.mapsettingsService.exportlist(this.userToken);
    window.location.href = filePath;
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
