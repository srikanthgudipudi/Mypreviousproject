/**Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com */
/**
 * EnterpriseStaticContentComponent has the following methods:
 *  ngOnInit(): To get Entity Menu List while loading page.
 * ngAfterViewInit(): After view intialisation is rendered.
 * enterpriseStaticContentPopup(action, entitymenuObj): To open the Pop-Up.
 * advancePopup(): To open the advance search model popup.
 * getMenuTypeList(): To get menu list.
 * getMenuTypeList(): To get menu list.
 * selectedMenuType(menuType): To get selected menu type details.
 * delete(event): To call the list in child component.
 * getEnterpriseStaticContentList(): To get Enterprise Static Contents List.
 * getEnterpriseStaticContent(searchString): To search Enterprise Static Contents List.
 * handleKeyPress(e): Method for handle keypress.
 * exportData(searchstring): To export the data.
 * hideAdvanceModal(): To hide advance search popup.
 * advanceSearch(): To get the advance search results.
 * clearAdvanced(): To clear the model data.
 */

import {
  Component, ElementRef, ViewChild, OnInit, ViewContainerRef, Inject,
  AfterViewInit, ViewChildren, AfterContentChecked
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { SingleStaticContentComponent } from '../staticcontentpopup/singlestaticcontent.component';
import { SingleStaticContentService } from '../staticcontentpopup/singlestaticcontent.service';
import { StaticContentService } from './staticcontent.service';
import { Http } from '@angular/http';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'staticcontent.html',
  providers: [StaticContentService, SingleStaticContentService]
})

export class StaticContentComponent implements OnInit, AfterViewInit, AfterContentChecked {
  stacked = '';
  storage: Storage = window.localStorage;
  errors = '';
  viewstatus: any;
  editstatus: any;
  liststatus: any;
  deletestatus: any;
  addstatus: any;
  exportstatus: any;
  searchString: any;
  rowsPerPage = 10;
  enterprisestaticcontent: any;
  singleEnterpriseStaticContent: any;
  errorMessage: string;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  error: any;
  userToken: any;
  menuTypeList: any;
  toastermessage: any;
  userrole: any;
  advsearch: any = {};
  searchString1: any = '';
  enterpriseIconFilePath: any;
  fleetCommonName: any;

  @ViewChildren('input') vc;
  @ViewChild(SingleStaticContentComponent)
  private enterpriseStaticContentModalComponent: SingleStaticContentComponent;
  @ViewChild('myModal') public myModal: ModalDirective;

  /**---- Constructor for static content ----*/
  constructor(private element: ElementRef,
    private http: Http, private router: Router,
    public route: ActivatedRoute,
    private translateService: TranslateService,
    private singleEnterpriseStaticContentService: SingleStaticContentService,
    private enterpriseStaticContentService: StaticContentService,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {

  }

  /*----- To get Entity Menu List while loading page ------ */
  ngOnInit() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.viewstatus = window.localStorage.getItem('staticcontentviewstatus');
    this.addstatus = window.localStorage.getItem('staticcontentaddstatus');
    this.editstatus = window.localStorage.getItem('staticcontenteditstatus');
    this.deletestatus = window.localStorage.getItem('staticcontentdeletedstatus');
    this.exportstatus = window.localStorage.getItem('staticcontentexportstatus');
    this.liststatus = window.localStorage.getItem('staticcontentliststatus');
    const userToken = window.localStorage.getItem('token');
    this.userToken = window.localStorage.getItem('token');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.advsearch.enabled = true;
    this.getMenuTypeList();
    // time zone
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (userToken === undefined || userToken === null || userToken === '') {
      this.router.navigate(['']);
    } else if ((this.liststatus === 'false') && (userToken !== undefined)) {
      this.router.navigate(['']);
    } else {
      this.getEnterpriseStaticContentList();
    }
  }
  ngAfterContentChecked() {
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
}
  /**---- After view intialisation is rendered ----*/
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /* ----- To open the Pop-Up -----*/
  enterpriseStaticContentPopup(action, entitymenuObj) {
    this.enterpriseStaticContentModalComponent.showChildModal(action, entitymenuObj);
  }

  /**---- To open the advance search model popup ----*/
  advancePopup() {
    this.userrole = window.localStorage.getItem('userrole');
    this.myModal.show();
  }

  /*---- To get menu list  ---*/
  getMenuTypeList() {
    this.singleEnterpriseStaticContentService.getLookupsList(this.userToken, 'MENU_TYPES')
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.menuTypeList = data['result'];
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
      });
  }

  /*---- To get selected menu type details ----*/
  selectedMenuType(menuType) {
    this.advsearch.menuType = menuType;
  }

  /**---- To call the list in child component ----*/
  delete(event) {
    if (window.localStorage.getItem('advance') === 'advance') {
      this.advanceSearch();
    } else if (window.localStorage.getItem('simplesearch') === 'search') {
      this.getEnterpriseStaticContent(this.searchString1);
    } else {
      this.getEnterpriseStaticContentList();
    }
  }

  /**----- To get Enterprise Static Contents List ------  */
  getEnterpriseStaticContentList() {
    window.localStorage.removeItem('simplesearch');
    window.localStorage.removeItem('advance');
    const userToken = window.localStorage.getItem('token');
    this.enterpriseStaticContentService.getEnterpriseStaticContentList(userToken).subscribe(
      enterprisestaticcontent => {
        for (let i = 0; i < enterprisestaticcontent['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.enterprisestaticcontent = enterprisestaticcontent['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.enterprisestaticcontent = [];
            }
            break;
          case 500:
            break;
        } this.errorMessage = <any>error;
      });
  }

  /*----- To search Enterprise Static Contents List ------ */
  getEnterpriseStaticContent(searchString) {
    const userToken = window.localStorage.getItem('token');
    window.localStorage.setItem('simplesearch', 'search');
    window.localStorage.removeItem('advance');
    this.searchString1 = searchString;
    this.enterpriseStaticContentService.getEnterpriseStaticContent(userToken, searchString).subscribe(
      enterprisestaticcontent => {
        for (let i = 0; i < enterprisestaticcontent['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.enterprisestaticcontent = enterprisestaticcontent['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.enterprisestaticcontent = [];
            }
            break;
          case 500:
            break;
        } this.errorMessage = <any>error;
      });
  }

  /**---- Method for handle keypress ----*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getEnterpriseStaticContent(this.searchString);
    }
  }

  /**---- To export the data ---- */
  exportData(searchstring) {
    if (window.localStorage.getItem('advance') === 'advance') {
      searchstring = JSON.stringify(this.advsearch);
      searchstring = searchstring + '~' + 'Advancesearch';
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchstring = searchstring + '~' + 'search';
    }
    const userToken = window.localStorage.getItem('token');
    const filePath = this.enterpriseStaticContentService.exportlist(searchstring, userToken);
    window.location.href = filePath;
  }

  /**---- To hide advance search popup ----*/
  hideAdvanceModal() {
    this.myModal.hide();
    this.error = '';
  }

  /**----  To get the advance search results -----*/
  advanceSearch() {
    window.localStorage.removeItem('simplesearch');
    this.enterpriseStaticContentService.advancedSearch(this.advsearch, this.userToken).subscribe(
      enterprisestaticcontent => {
        for (let i = 0; i < enterprisestaticcontent['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].createdAt =
              moment(enterprisestaticcontent['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            enterprisestaticcontent['result'][i].updatedAt =
              moment(enterprisestaticcontent['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.enterprisestaticcontent = enterprisestaticcontent['result'];
        window.localStorage.setItem('advance', 'advance');
        this.hideAdvanceModal();
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.enterprisestaticcontent = [];
            }
            break;
          case 500:
            break;
        } this.errorMessage = <any>error;
      });
  }

  /**---- To clear the model data ----*/
  clearAdvanced() {
    this.advsearch = {};
    this.advsearch.enabled = true;
    this.getMenuTypeList();
    this.getEnterpriseStaticContentList();
  }
}

export class EnterpriseStaticContent {
  public enterpriseName: string;
  public fleetName: string;
  public menuName: string;
  public menuDescription: string;
  public menuType: string;
  public parentMenuId: string;
  public menuImageName: string;
  public menuImageFilePath: string;
  public menuSequence: string;
  public notes: string;
}

export class MenuItem {
}
