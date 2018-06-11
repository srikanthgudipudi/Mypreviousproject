/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All Enterprises Component have below functionality.
* singleEnterprises(updateaction, enterprisesid):
   This method is used to u[pdate the enterprises status.
* ngOnInit(): All enterprises list will be loaded at loading time.
* ngAfterContentChecked(): To check the content.
* getAllenterprisesList(): To get all enterprises list.
* activateEnterprise(enterpriseName, enterpriseId): This method is used to activateEnterprise.
* inactivateEnterprise(enterpriseName, enterpriseId): This method is used to inactivateEnterprise.
* exportData(searchstring): This method used to download the data.
* getAllEnterprisesSeachList(searchstring): To get the all enterprises list by passing username.
*/
import {
  Component, ViewChild, OnInit, AfterContentChecked,
  ViewContainerRef, EventEmitter, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { EnterprisesService } from './enterprises.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { EnterpriseComponent } from '../enterprisepopup/enterprise.component';
import { NotificationsService } from '../../../notifications/notifications.service';
import { AfterViewInit, ViewChildren } from '@angular/core';
import { EnterprisesDetails } from './enterprisesdetails';
import { error } from 'util';
import * as moment from 'moment/moment';

@Component({
  templateUrl: 'enterprises.html',
  providers: [EnterprisesService, NotificationsService]
})

export class EnterprisesComponent implements OnInit, AfterContentChecked, AfterViewInit {
  items: MenuItem[];
  import: MenuItem[];
  allenterprisesDetails: EnterprisesDetails[];
  searchstring: string;
  stacked: boolean;
  userToken: any;
  toastermessage: any;
  fleetCommonName: any;
  storage: Storage = window.localStorage;
  enterpriseeditstatus: any;
  enterpriseimporttatus: any;
  enterpriseaddstatus: any;
  enterpriseviewstatus: any;
  enterprisedeletedstatus: any;
  enterpriseexportstatus: any;
  enterprisesviewstatus: any;
  enterprisesaddstatus: any;
  enterpriseseditstatus: any;
  enterprisesliststatus: any;
  enterprisesdeletedstatus: any;
  enterprisesexportstatus: any;
  rowsPerPage = 10;
  pagename: any;
  recordid: any;
  activestatus: any;
  inactivestatus: any;
  locatestatus: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  enterpriseValue: any;
  advanced: any;
  emailValue: any;
  countryValue: any = '';
  city: any;
  Email: any;
  country: any;
  state: any;
  isEnabledValue: any = '';
  stateValue: any;
  status: any;
  searchenterprisesDetails: any;
  statuslist: any;
  cityValue: any;
  error: any;
  enterpriseIconFilePath: any;
  countries: any = [];
  userrole: any;
  enterpriseNames: any;
  ssoenable: any;
  fleetsCommonName: any;
  @ViewChildren('input') vc;
  @ViewChild(EnterpriseComponent)
  private enterprisesModalComponent: EnterpriseComponent;
  deleted: EventEmitter<string> = new EventEmitter();
  @ViewChild('advancedModel') public advancedModel: ModalDirective;

  constructor(private allenterprisesService: EnterprisesService,
    public toastr: ToastsManager,
    private notificationService: NotificationsService,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }
  /*--- To load the all enterprises list at loading time ----*/
  ngOnInit() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.enterprisesviewstatus = window.localStorage.getItem('enterprisesviewstatus');
    this.enterprisesaddstatus = window.localStorage.getItem('enterprisesaddstatus');
    this.enterpriseseditstatus = window.localStorage.getItem('enterpriseseditstatus');
    this.enterprisesliststatus = window.localStorage.getItem('enterprisesliststatus');
    this.enterprisesdeletedstatus = window.localStorage.getItem('enterprisesdeletedstatus');
    this.enterprisesexportstatus = window.localStorage.getItem('enterprisesexportstatus');
    this.userToken = window.localStorage.getItem('token');
    this.pagename = window.localStorage.getItem('notificationpage');
    this.recordid = window.localStorage.getItem('notificationId');
    this.activestatus = window.localStorage.getItem('enterprisesactivestatus');
    this.inactivestatus = window.localStorage.getItem('enterprisesinactivestatus');
    this.locatestatus = window.localStorage.getItem('enterpriseslocatestatus');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    localStorage.removeItem('lcenterprise');
    localStorage.removeItem('lcenterprisedata');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else if ((this.enterprisesliststatus === 'false') && (this.userToken !== undefined)) {
      this.router.navigate(['']);
    } else if (this.pagename === 'enterprises') {
      this.getrecorddetails();
      this.storage.removeItem('notificationpage');
    } else {
      this.getAllenterprisesList('');
      this.items = [
        {
          label: 'Enterprise', icon: 'fa fa-building', command: () => {
            this.enterprisesModalComponent.showChildModal('CREATE', '');
          }
        },
      ];
      this.import = [
        { label: 'Import', icon: 'fa-upload', url: '#' },
        { label: 'Export', icon: 'fa-download', url: '#' },
      ];
    }
    this.getStatus();
  }

  /*---- To check the content ----*/
  ngAfterContentChecked() {
    this.fleetsCommonName = window.localStorage.getItem('fleetsTranslation');
    this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    if (window.localStorage.getItem('enterprisestatus') === 'Updated') {
      this.getAllenterprisesList('');
    }
    window.localStorage.removeItem('enterprisestatus');
    if (window.localStorage.getItem('advance') === 'advanced') {
      this.advancedEnterprise();
    }
    window.localStorage.removeItem('advance');
    if (window.localStorage.getItem('simpleEnterprise') === 'simpleEnterprise') {
      this.getAllenterprisesList(this.searchstring);
      window.localStorage.removeItem('simpleEnterprise');
    }
    if (window.localStorage.getItem('inactiveSearch') === 'inactiveSearch') {
      this.getAllenterprisesList(this.searchstring);
      window.localStorage.removeItem('inactiveSearch');
    }
    if (window.localStorage.getItem('activeSearch') === 'activeSearch') {
      this.getAllenterprisesList(this.searchstring);
      window.localStorage.removeItem('activeSearch');
    }
  }

  /*-- Following method is used to update the enterprises status */
  singleEnterprises(updateaction, enterprisesid) {
    this.enterprisesModalComponent.showChildModal(updateaction, enterprisesid);
  }

  /**---- advance search popup model ----*/
  advancedEnterprises() {
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.getStatus();
    this.getCountriesList();
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.advancedModel.show();
  }

  /*---- To get Enterprise status based on country   ---*/
  public getStatus() {
    this.allenterprisesService.getLookupsList(this.userToken, 'ENTERPRISE_STATUSES').subscribe(
      data => {
        this.statuslist = data['result'];
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

  /**------ This method is used to get the countries list ------ */
  public getCountriesList() {
    this.allenterprisesService.getLookupsList(this.userToken, 'COUNTRIES').subscribe(
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

  /**------ To get the single notification record details-------- */
  getrecorddetails() {
    localStorage.removeItem('lcenterprise');
    localStorage.removeItem('lcenterprisedata');
    this.notificationService.getNotification(this.recordid, this.pagename, this.userToken)
      .subscribe(
      AllenterprisesDetails => {
        for (let i = 0; i < AllenterprisesDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).add(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).subtract(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.allenterprisesDetails = AllenterprisesDetails['result'];
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

  /*---- To get all enterprises list ----*/
  getAllenterprisesList(searchString) {
    localStorage.setItem('searchString', searchString);
    window.localStorage.removeItem('searchenterprisesDetails');
    localStorage.removeItem('lcenterprise');
    localStorage.removeItem('lcenterprisedata');
    if (searchString === undefined) {
      searchString = '';
    }
    this.allenterprisesService.getMyAllenterprisesList(this.userToken, searchString)
      .subscribe(
      AllenterprisesDetails => {
        localStorage.setItem('enterpriseSearch', 'enterpriseSearch');
        for (let i = 0; i < AllenterprisesDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).add(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).subtract(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.allenterprisesDetails = AllenterprisesDetails['result'];

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
      });
  }

  /**---- This method is used to get advance search details------ */
  advancedEnterprise() {
    localStorage.removeItem('searchString');
    if (this.enterpriseValue !== '' && this.enterpriseValue !== undefined) {
      this.enterpriseValue = this.enterpriseValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.cityValue !== '' && this.cityValue !== undefined) {
      this.cityValue = this.cityValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.stateValue !== '' && this.stateValue !== undefined) {
      this.stateValue = this.stateValue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.emailValue !== '' && this.emailValue !== undefined) {
      this.emailValue = this.emailValue.trim().replace(/\s\s+/g, ' ');
    }
    this.searchenterprisesDetails = {
      'enterpriseName': this.enterpriseValue,
      'city': this.cityValue,
      'state': this.stateValue,
      'email': this.emailValue,
      'country': this.countryValue,
      'isEnabled': this.isEnabledValue,
      'ssoEnable': this.ssoenable,
    };
    this.allenterprisesService.searchEnterprise(this.searchenterprisesDetails, this.userToken).subscribe(
      AllenterprisesDetails => {
        window.localStorage.setItem('searchenterprisesDetails', 'advanced');
        window.localStorage.setItem('lcenterprisedata', JSON.stringify(AllenterprisesDetails));
        window.localStorage.setItem('lcenterprise', 'lcenterprisedata');
        for (let i = 0; i < AllenterprisesDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).add(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().add(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
            [i].createdAt).subtract(utctimesplit[1], 'minutes');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
            AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
            [i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.allenterprisesDetails = AllenterprisesDetails['result'];
        this.deleted.emit();
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
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '9960') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '9997') {
              this.allenterprisesDetails = [];
            } break;
        }
      }
    );

  }

  /** -----This method is used to get the export data------ */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('searchenterprisesDetails') === 'advanced') {
      searchstring = JSON.stringify(this.searchenterprisesDetails);
      window.localStorage.removeItem('searchenterprisesDetails');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.allenterprisesService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /**---- method for handle keypress ---*/
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getAllenterprisesList(this.searchstring);
    }
  }

  /*---- Function to handle initcaps ----*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /*---- To hide the modal ----*/
  public hideAdvancedModal(): void {
    this.advancedModel.hide();
  }

  /*---- To clear the modal ----*/
  public clearAdvancedModal(): void {
    this.enterpriseValue = '';
    this.cityValue = '';
    this.stateValue = '';
    this.emailValue = '';
    this.countryValue = '';
    this.isEnabledValue = '';
    this.ssoenable = '';
    localStorage.removeItem('lcenterprise');
    localStorage.removeItem('lcenterprisedata');
    this.getAllenterprisesList('');
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /** locate  */
  locates(locate) {
    const enterprisesearch = localStorage.getItem('searchString');
    if (localStorage.getItem('lcenterprise') === 'lcenterprisedata') {
      this.allenterprisesService.advancedlocates(locate, localStorage.getItem('lcenterprise'));
    } else {
      this.allenterprisesService.locates(locate, this.userToken, enterprisesearch);
    }

  }

  /**----- Method for single locate -----*/
  singlelocate(locate, singleenterprise) {
    this.allenterprisesService.getenterpriseresourceById(this.userToken, singleenterprise._id)
      .subscribe(data => {
        delete data['result'].billToDetails;
        delete data['result'].workNumber;
        window.localStorage.setItem('lcenterpriseinfo', JSON.stringify(data['result']));
        this.allenterprisesService.singlelocateenterprise(locate, this.userToken, data['result']._id,
          'false');
      }, error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '9997') {
            } break;
          case 500:
            break;
        }
      });
  }

}
export class MenuItem {
}
