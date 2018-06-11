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
import {
  Component, ViewChild, OnInit, Inject, Output, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import * as moment from 'moment/moment';
import { ContractDetailService } from './contractdetail.service';
import { AdvertisementsService } from '../../../admin/advertisements/advertisementslist/advertisements.service';
@Component({
  selector: 'app-contractdetails-popup',
  templateUrl: 'contractdetail.html',
  providers: [ContractDetailService, AdvertisementsService]
})
export class ContractDetailComponent implements OnInit {
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  contractDetails: any;
  actionName: any;
  userToken: any;
  timeZones: any;
  enterprizesNames: any;
  enterprizesName: any;
  enterprizesSize: any;
  isEnabled: any;
  enddate: any;
  timezoneCode: any;
  timezoneCodes: any;
  createAt: any;
  updateAt: any;
  startdate: any;
  loginUserDateFormat: any;
  toastermessage: any;
  paymentTerms: any;
  contractTypes: any;
  licensingMode: any;
  value: any;
  enterprizeId: any;
  payment: any;
  pagename: String;
  contract: any;
  licensing: any;
  enabled: any;
  contractNumber: any;
  contractDetailObj: any;
  error: any;
  utctimezone: any;
  utctimezonestring: any;
  contractPeriodStartDate: any;
  contractPeriodEndDate: any;
  notes: any;
  currentutc: any;
  enterprizeName: any;
  enterpriseIconFilePath: any;
  periodAmount: any;
  @ViewChild('childModal') public childModal: ModalDirective;
  constructor(private contractDetailService: ContractDetailService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    public advertisementsService: AdvertisementsService,
    private translateService: TranslateService,
    public toastr: ToastsManager,
    private router: Router) { }
  ngOnInit() {
    this.userToken = window.localStorage.getItem('token');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.getEnterpriselist();
    this.getTimeZones();
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.timezoneCodes = this.timezoneCode[0];
    this.timezoneCodes = this.timezoneCode[0].trim();
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }
  public showchildModal(updateaction, alldetails): void {
    this.contractDetails = alldetails;
    if (updateaction === 'CREATE') {
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_CONTRACT_DETAILS';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = new Date();
      this.enddate = new Date();
      this.updateAt = moment(this.contractDetails.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.contractDetails.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.getPaymentTerms();
      this.getContractTypes();
      this.getLicensingMode();
      this.actionName = 'Create';
      this.enabled = true;
      this.childModal.show();
    } else if (updateaction === 'VIEW') {
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_CONTRACT_DETAILS';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.contractDetails.contractPeriodStartDate)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.contractDetails.contractPeriodEndDate)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updateAt = moment(this.contractDetails.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.contractDetails.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.isEnabled = this.contractDetails.isEnabled;
      const enterpriseIcon = this.contractDetails.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.contractDetails.enterprise.enterpriseId.enterpriseIconFilePath + '/' + enterpriseIcon;
      this.actionName = 'View';
      this.childModal.show();
    } else if (updateaction === 'DELETE') {
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_CONTRACT_DETAILS';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.startdate = moment(this.contractDetails.contractPeriodStartDate)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = moment(this.contractDetails.contractPeriodEndDate).
        format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.updateAt = moment(this.contractDetails.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.contractDetails.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      const enterpriseIcon = this.contractDetails.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.contractDetails.enterprise.enterpriseId.enterpriseIconFilePath + '/' + enterpriseIcon;
      this.actionName = 'Delete';
      this.childModal.show();
    } else if (updateaction === 'EDIT') {
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_CONTRACT_DETAILS';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      const enterpriseIcon = this.contractDetails.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.contractDetails.enterprise.enterpriseId.enterpriseIconFilePath + '/' + enterpriseIcon;
      this.startdate = moment(this.contractDetails.contractPeriodStartDate)
        .format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enddate = new Date(this.contractDetails.contractPeriodEndDate);
      this.updateAt = moment(this.contractDetails.updatedAt).
        format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.contractDetails.createdAt).
        format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.actionName = 'Edit';
      this.isEnabled = this.contractDetails.isEnabled;
      this.childModal.show();
    }
  }
  hidechildModal() {
    this.contractNumber = '';
    this.notes = '';
    this.payment = '';
    this.contract = '';
    this.licensing = '';
    this.enterprizesName = '';
    this.periodAmount = '';
    this.clearmessage();
    this.childModal.hide();
    this.getEnterpriselist();
    this.getTimeZones();
  }
  getTimeZones() {
    this.contractDetailService.getLookupsList(this.userToken, 'TIME_ZONES')
      .subscribe(data => {
        this.timeZones = data['result'];
      },
      error => {
      });
  }
  getPaymentTerms() {
    this.contractDetailService.getPaymentLookup(this.userToken, 'BILLING_CYCLES')
      .subscribe(paymentTerms => {
        this.paymentTerms = paymentTerms['result'];
      });
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
  changeTimezones(timezone) {
    const timevalue = timezone.split('$');
    this.timezoneCodes = timevalue[0];
    const timezonevalue = timevalue[1].split('(UTC');
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
  }
  getEnterpriseResources(type) {
    this.value = type.split('$');
    this.enterprizeId = this.value[0];
    this.enterprizeName = this.value[1];
    this.enterpriseIconFilePath = this.value[2] + '/' + this.value[3];
  }
  getPaymet(event) {
    this.payment = event;
  }
  getContract(event) {
    this.contract = event;
  }
  getLicensing(event) {
    this.licensing = event;
  }
  getservercurrentutctime() {
    this.advertisementsService.getservercurrentutctime(this.userToken).subscribe(
      data => {
        this.currentutc = data.result;
      },
      error => { });
  }
  getEnterpriselist() {
    this.contractDetailService.getEnterprices(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprizesSize = true;
            this.enterprizesName = data['result'];
            this.enterprizeId = this.enterprizesName[0]._id;
            this.enterprizeName = this.enterprizesName[0].enterpriseName;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
          } else if (data.result.length > 1) {
            this.enterprizesNames = data['result'];
            this.enterprizesSize = false;
          }
        }
      },
      error => {
      });
  }
  deleteContractDetail() {
    this.contractDetailService.deleteDetails(this.userToken, this.contractDetails._id)
      .subscribe(data => {
        this.hidechildModal();
        this.uploaded.emit();
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
              window.localStorage.removeItem('token');
              this.router.navigate(['']);
            } else if (statuscode === '2013') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            } else {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            }
            break;
        }
      });
  }
  updateContractDetail() {
    this.currentutc = moment(this.currentutc).format('YYYY-MM-DD');
    this.enddate = moment(this.enddate).format('YYYY-MM-DD');
    if (this.currentutc >= this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else {
      this.enddate = this.enddate + ' ' + '23:59';
      this.contractDetailService.updateDetails(this.userToken, this.contractDetails._id, this.isEnabled, this.enddate)
        .subscribe(data => {
          this.hidechildModal();
          this.uploaded.emit();
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
                window.localStorage.removeItem('token');
                this.router.navigate(['']);
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
    }
  }
  clearmessage() {
    this.error = '';
  }
  createContractDetail() {
    this.startdate = moment(this.startdate).format('YYYY-MM-DD');
    this.enddate = moment(this.enddate).format('YYYY-MM-DD');
    if (this.enterprizeName === '' || this.enterprizeName === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.payment === '' || this.payment === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_PAYMENT_TERMS';
    } else if (this.periodAmount === '' || this.periodAmount === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_PERIOD_AMOUNT';
    } else if (this.startdate < moment(this.currentutc).utc().
      format('YYYY-MM-DD')) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.startdate >= this.enddate) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
    } else if (this.contract === '' || this.contract === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_CONTRACT_TYPE';
    } else if (this.licensing === '' || this.licensing === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_LICENSING_MODE';
    } else {
      this.startdate = this.startdate + ' ' + '00:00';
      this.enddate = this.enddate + ' ' + '23:59';
      this.contractDetailObj = {
        'contractPeriodStartDate': this.startdate,
        'contractPeriodEndDate': this.enddate,
        'enterprise': {
          'enterpriseId': this.enterprizeId,
          'enterpriseName': this.enterprizeName
        },
        'paymentTerms': this.payment,
        'contractType': this.contract,
        'licensingMode': this.licensing,
        'isEnabled': this.enabled,
        'contractPeriodAmount': this.periodAmount,
        'notes': this.notes
      };
      this.contractDetailService.createDetails(this.userToken, this.contractDetailObj)
        .subscribe(data => {
          this.hidechildModal();
          this.uploaded.emit();
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
                window.localStorage.removeItem('token');
                this.router.navigate(['']);
              } else if (statuscode === '2033') {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              } else {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
    }
  }
}
