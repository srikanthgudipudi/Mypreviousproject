/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
*/
import { Component, ViewChild, OnInit, Inject, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import * as moment from 'moment/moment';
import { ViewChildren } from '@angular/core';
import { ContractDetailComponent } from '../contractdetailspopup/contractdetail.component';
import { ContractDetailsService } from './contractdetails.service';
import { ContractDetailService } from '../contractdetailspopup/contractdetail.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
@Component({
  templateUrl: 'contractdetails.html',
  providers: [ContractDetailsService, AdvertisementsService, ContractDetailService]
})
export class ContractDetailsComponent implements OnInit, AfterViewInit {
  userToken: any;
  contractDetails: any;
  userpreferedtimezone: any;
  utctimezone: any;
  utctimezonestring: any;
  timezoneCodes: any;
  loginUserDateFormat: any;
  currentutc: any;
  toastermessage: any;
  searchstring: any;
  isEnabled: any = true;
  contractTypes: any;
  licensingMode: any;
  timeZones: any;
  licenseMode: any = '';
  contractNumber: any;
  contractType: any;
  advancesearchData: any;
  advancefromDate: any;
  advancetoDate: any;
  fromDate: any;
  toDate: any;
  enterpriseName: any;
  userrole: any;
  enterpriseNames: any;
  viewstatus: any;
  addstatus: any;
  editstatus: any;
  deletestatus: any;
  exportstatus: any;
  stacked: '';
  enterpriseIconFilePath: any;
  @ViewChildren('input') vc;
  @ViewChild(ContractDetailComponent)
  public contractDetailModalComponent: ContractDetailComponent;
  @ViewChild('myModal') public myModal: ModalDirective;
  constructor(private contractDetailsService: ContractDetailsService,
    private contractDetailService: ContractDetailService,
    public advertisementsService: AdvertisementsService,
    private translateService: TranslateService,
    public toastr: ToastsManager,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private router: Router) { }
  ngOnInit() {
    this.viewstatus = window.localStorage.getItem('enterprisecontractsviewstatus');
    this.addstatus = window.localStorage.getItem('enterprisecontractsaddstatus');
    this.editstatus = window.localStorage.getItem('enterprisecontractseditstatus');
    this.deletestatus = window.localStorage.getItem('enterprisecontractsdeletedstatus');
    this.exportstatus = window.localStorage.getItem('enterprisecontractsexportstatus');
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    this.userToken = window.localStorage.getItem('token');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.timezoneCodes = utcformat[0].trim();
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.getcontractList();
    this.getLicensingMode();
    this.getContractTypes();
  }
  singleContractDetails(selectedaction, selectedObj) {
    this.contractDetailModalComponent.showchildModal(selectedaction, selectedObj);
  }
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });

  }
  getContractDetailsList(event) {
    if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
      this.getservercurrentutctime();
      this.getSearchlist(this.searchstring);
    } else {
      this.getservercurrentutctime();
      this.getcontractList();
    }
  }
  getcontractList() {
    this.contractDetailsService.getContractDetailsList(this.userToken)
      .subscribe(contractDetails => {
        if (contractDetails['result'].length > 0) {
          for (let i = 0; i < contractDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).utc();
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate);
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).utc();
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate);
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).utc();
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate);
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).utc();
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate);
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
            }
          }
          this.contractDetails = contractDetails['result'];
        }
      },
      error => {
      });
  }
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getSearchlist(this.searchstring);
    }
  }
  getSearchlist(searchstring) {
    if (searchstring !== '' && searchstring !== undefined && searchstring !== null) {
      this.contractDetailsService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        contractDetails => {
          for (let i = 0; i < contractDetails['result'].length; i++) {
            if (this.utctimezonestring.charAt(0) === '+') {
              const utctime = this.utctimezone.split('+');
              const utctimesplit = utctime[1].split(':');
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).utc();
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate);
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).utc();
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate);
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
            } else {
              const utctime = this.utctimezone.split('-');
              const utctimesplit = utctime[1].split(':');
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).utc();
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate);
              contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
                .contractPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).utc();
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate);
              contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
                .contractPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).utc().
                subtract(utctimesplit[0], 'hours');
              contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).utc().
                subtract(utctimesplit[0], 'hours');
              contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');

            }
          }
          this.contractDetails = contractDetails['result'];
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statusCode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
                window.localStorage.removeItem('token');
                this.router.navigate(['']);
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statusCode);
                this.toastr.success(this.toastermessage.value);
              } break;
          }
        });
    } else {
      this.getcontractList();
    }
  }
  advancedModal() {
    this.myModal.show();
    this.userrole = window.localStorage.getItem('userrole');
    this.enterpriseNames = window.localStorage.getItem('enterPriseName');
    this.getTimeZones();
  }
  hideAdvanceModal() {
    this.myModal.hide();
  }
  getContract(event) {
    this.contractType = event;
  }
  getLicensing(event) {
    this.licenseMode = event;
  }
  getContractTypes() {
    this.contractDetailService.getContractLookup(this.userToken, 'CONTRACT_TYPES')
      .subscribe(contractTypes => {
        this.contractTypes = contractTypes['result'];
      });
  }
  getLicensingMode() {
    this.contractDetailService.getLicensingLookup(this.userToken, 'LICENSING_MODES')
      .subscribe(licensingMode => {
        this.licensingMode = licensingMode['result'];
      });
  }
  getTimeZones() {
    this.contractDetailService.getLookupsList(this.userToken, 'TIME_ZONES')
      .subscribe(data => {
        this.timeZones = data['result'];
      },
      error => {
      });
  }
  clearAdvanced() {
    this.enterpriseName = '';
    this.licenseMode = '';
    this.contractNumber = '';
    this.contractType = '';
    this.isEnabled = true;
    this.fromDate = '';
    this.toDate = '';
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0].trim();
    this.timezoneCodes = utcformat[0].trim();
    this.getContractTypes();
    this.getLicensingMode();
    this.getcontractList();
  }
  advanceSearch() {
    if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
      this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
    }
    if (this.contractNumber !== '' && this.contractNumber !== undefined) {
      this.contractNumber = this.contractNumber.trim().replace(/\s\s+/g, ' ');
    }
    /* ----- Convert prefered time zone to utc format start----- */
    if (this.fromDate) {
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.advancefromDate = moment(this.fromDate).add(utctimesplit[0], 'hours');
        this.advancefromDate = moment(this.advancefromDate).add(utctimesplit[1], 'minutes');
        this.advancefromDate = moment(this.advancefromDate).format('YYYY-MM-DD HH:mm');
      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.advancefromDate = moment(this.fromDate).subtract(utctimesplit[0], 'hours');
        this.advancefromDate = moment(this.advancefromDate).subtract(utctimesplit[1], 'minutes');
        this.advancefromDate = moment(this.advancefromDate).format('YYYY-MM-DD HH:mm');
      }
    }
    if (this.toDate) {
      if (this.utctimezonestring.charAt(0) === '-') {
        const utctime = this.utctimezone.split('-');
        const utctimesplit = utctime[1].split(':');
        this.advancetoDate = moment(this.toDate).add(utctimesplit[0], 'hours');
        this.advancetoDate = moment(this.advancetoDate).add(utctimesplit[1], 'minutes');
        this.advancetoDate = moment(this.advancetoDate).format('YYYY-MM-DD HH:mm');
      } else {
        const utctime = this.utctimezone.split('+');
        const utctimesplit = utctime[1].split(':');
        this.advancetoDate = moment(this.toDate).subtract(utctimesplit[0], 'hours');
        this.advancetoDate = moment(this.advancetoDate).subtract(utctimesplit[1], 'minutes');
        this.advancetoDate = moment(this.advancetoDate).format('YYYY-MM-DD HH:mm');
      }
    }
    this.advancesearchData = {
      'enterpriseName': this.enterpriseName,
      'contractType': this.contractType,
      'contractNumber': this.contractNumber,
      'licensingMode': this.licenseMode,
      'isEnabled': this.isEnabled,
      'contractPeriodStartDate': this.advancefromDate,
      'contractPeriodEndDate': this.advancetoDate
    };
    this.contractDetailsService.advancecontractDetails(this.advancesearchData, this.userToken)
      .subscribe(
      contractDetails => {
        window.localStorage.setItem('advancesearch', 'search');
        for (let i = 0; i < contractDetails['result'].length; i++) {
          if (this.utctimezonestring.charAt(0) === '+') {
            const utctime = this.utctimezone.split('+');
            const utctimesplit = utctime[1].split(':');
            contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
              .contractPeriodStartDate).utc();
            contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
              .contractPeriodStartDate);
            contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
              .contractPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');
            contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
              .contractPeriodEndDate).utc();
            contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
              .contractPeriodEndDate);
            contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
              .contractPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm');
            contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
            contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).add(utctimesplit[1], 'minutes');
            contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
            contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
          } else {
            const utctime = this.utctimezone.split('-');
            const utctimesplit = utctime[1].split(':');
            contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
              .contractPeriodStartDate).utc();
            contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
              .contractPeriodStartDate);
            contractDetails['result'][i].contractPeriodStartDate = moment(contractDetails['result'][i]
              .contractPeriodStartDate).format(this.loginUserDateFormat + ' HH:mm');
            contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
              .contractPeriodEndDate).utc();
            contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
              .contractPeriodEndDate);
            contractDetails['result'][i].contractPeriodEndDate = moment(contractDetails['result'][i]
              .contractPeriodEndDate).format(this.loginUserDateFormat + ' HH:mm');
            contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).utc().
              subtract(utctimesplit[0], 'hours');
            contractDetails['result'][i].createdAt = moment(contractDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
            contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).utc().
              subtract(utctimesplit[0], 'hours');
            contractDetails['result'][i].updatedAt = moment(contractDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
          }
        }
        this.contractDetails = contractDetails['result'];
        this.myModal.hide();
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
              window.localStorage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '9995') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS');
              this.toastr.success('Missing mandatory fields');
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '2028') {
              this.toastermessage = this.translateService.get('COMMON_VALIDATION_MESSAGES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } break;
        }
      });
  }
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('advancesearch') === 'search') {
      searchstring = JSON.stringify(this.advancesearchData);
      window.localStorage.removeItem('advancesearch');
      searchdiff = 'Advancesearch';
      searchstring = searchstring + '~' + searchdiff;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchstring + '~' + searchdiff;
    }
    const filePath = this.contractDetailsService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }
}
