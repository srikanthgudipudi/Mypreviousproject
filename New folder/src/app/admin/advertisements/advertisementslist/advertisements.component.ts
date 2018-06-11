/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * Advertisements component has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * ngAfterViewInit(): This method called when the component’s view has been fully initialized.
 * ngAfterContentChecked(): This method called given component has been checked by the change detection.
 * singleAdvertisement(updateaction, selectedImgObj): This method is used to select the popup.
 * viewImage(updateaction, selectedImgObj): ViewImage in Advertisement create, Edit, View and Delete popups.
 * getAdvertisementTypes(): To get AdvertisementTypes list from Lookup codes.
 * gettimeZones(): To get the timezones list from Lookup codes.
 * advanceEndDateChange(): This method to clear validation message for advanceEndDateChange.
 * advanStartDateChange(): To get Advanced start date.
 * advanEndDateChange(): To get Advanced end date.
 * getTimezones(timezone): To change the getTimezonesstartdate list.
 * submitAdvanced(): To submit Advanced search data.
 * advanceSearch(): To get Advertisement Records using with Advanced Search.
 * getservercurrentutctime(): To get current utc time from server.
 * getAllAdvertisements(): To get Advertisements List.
 * emitChanges(event): This method is used to access the eventemitter.
 * handleKeyPress(e): This method is used to call press Enter key.
 * exportData(searchstring): export the data.
 * showAdvancedModal(): To open Advance search popup.
 * advertisementSearch(searchstring): To get the Advertisement Records using with simple Search.
 * closeAdvanced(): To close Advanced search popup.
 * clearAdvanced(): To clear details on Advanced search popup.
 */

import {
    Component, OnInit, AfterContentChecked,
    ViewContainerRef, ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementComponent } from '../advertisementpopup/advertisement.component';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Advertisementservices } from '../advertisementpopup/advertisement.service';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { AfterViewInit } from '@angular/core';
import * as moment from 'moment/moment';
@Component({
    templateUrl: 'advertisements.html',
    providers: [AdvertisementsService, ConfirmationService, Advertisementservices]
})

export class Advertisements implements OnInit, AfterViewInit, AfterContentChecked {
    stacked = '';
    toastermessage: any = '';
    advertisements: any;
    searchstring: any = '';
    viewstatus: any;
    editstatus: any;
    deletestatus: any;
    addstatus: any;
    exportstatus: any;
    liststatus: any;
    rowsPerPage = 10;
    utctimezone: any;
    utctimezonestring: any;
    userpreferedtimezone: any;
    currentutc: any;
    loginUserDateFormat: any;
    advancedObj: any = '';
    advancedEnterprise: any = '';
    advancedAdvertisementName: any = '';
    advancedAdvertisementType = '';
    advancedStartdate: any;
    finaladvancedStartdate: any = '';
    advancedEnddate: any;
    finaladvancedEnddate: any = '';
    advertisetypes: any;
    advancedIsEnabled: any = true;
    timeZones: any[];
    timezoneCode: any;
    timezoneCodes: any;
    adverrefresh: any = 'true';
    error: any;
    enterpriseIconFilePath: any;
    advanceenddate: any = '';
    advancestartdate: any = '';
    errorstartdate: any;
    errorenddate: any;
    userrole: any;
    token: any = '';
    enterpriseNames: any;
    advanceutctimezone: any;
    advanceutctimezonestring: any;
    @ViewChild('advancedModal') public advancedModal: ModalDirective;
    @ViewChildren('input') vc;
    @ViewChild(AdvertisementComponent)
    private advertisementModalComponent: AdvertisementComponent;
    storage: Storage = window.localStorage;

    /* Constructor for AdvertisementList Component */
    constructor(public advertisementService: AdvertisementsService,
        private singleAdvertisementservices: Advertisementservices,
        private router: Router, @Inject('apiEndPoint') public apiEndPoint: string,
        @Inject('footerPoweredByName') public footerPoweredByName: string,
        public toastr: ToastsManager, private vcr: ViewContainerRef, private translateService: TranslateService,
        private confirmationService: ConfirmationService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

   /* Component Initalization */
    ngOnInit() {
        this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
        this.viewstatus = window.localStorage.getItem('advtviewstatus');
        this.addstatus = window.localStorage.getItem('advtsaddstatus');
        this.editstatus = window.localStorage.getItem('advtseditstatus');
        this.deletestatus = window.localStorage.getItem('advtsdeletestatus');
        this.exportstatus = window.localStorage.getItem('advtsexportstatus');
        this.liststatus = window.localStorage.getItem('advtsliststatus');
        this.token = window.localStorage.getItem('token');
        this.getservercurrentutctime();
        // time zone
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.timezoneCode = this.timezoneCode.split('-');
        this.timezoneCodes = this.timezoneCode[0].trim();

        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcformat = timezonevalue[0].split('-');
        this.userpreferedtimezone = utcformat[0];
        const utcval = timezonevalue[1].split(')');
        this.utctimezone = utcval[0];
        this.utctimezonestring = utcval[0].toString();
        this.advanceutctimezonestring = this.utctimezonestring;
        this.advanceutctimezone = utcval[0];
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
        if (this.token === undefined || this.token === null || this.token === '') {
            this.router.navigate(['']);
        } else if ((this.liststatus === 'false') && (this.token !== undefined)) {
            this.router.navigate(['']);
        } else {
            this.getAllAdvertisements();
        }
    }

 /* This method called when the component’s view has been fully initialized */
    ngAfterViewInit() {
        this.vc.first.nativeElement.focus();
    }

    /* This method called given component has been checked by the change detection */
    ngAfterContentChecked() {
        if (window.localStorage.getItem('advertisementaction') === 'advance') {
            this.advanceSearch();
            window.localStorage.removeItem('advertisementaction');
        }
        if (window.localStorage.getItem('editAdvertisement') === 'editAdvertisement') {
            this.advertisementSearch(this.searchstring);
            window.localStorage.removeItem('editAdvertisement');
        }
        if (window.localStorage.getItem('deletedAdvertisement') === 'deletedAdvertisement') {
            this.advertisementSearch(this.searchstring);
            window.localStorage.removeItem('deletedAdvertisement');
        }
    }

     /* To open Advertisement create, Edit, View and Delete popups */
    singleAdvertisement(updateaction, selectedImgObj) {
        this.advertisementModalComponent.showChildModal(updateaction, selectedImgObj);
    }

    /* ViewImage in Advertisement create, Edit, View and Delete popups */
    viewImage(updateaction, selectedImgObj) {
        this.advertisementModalComponent.showChildModal(updateaction, selectedImgObj);
    }

    /* To get AdvertisementTypes list from Lookup codes */
    getAdvertisementTypes() {
        this.singleAdvertisementservices.getLookupsList(this.token, 'ADVERTISE_TYPES')
            .subscribe(data => {
                if (data.statusCode === '1001') {
                    this.advertisetypes = data['result'];
                }
            }, error => {
                const status = JSON.parse(error['status']);
                const statuscode = JSON.parse(error['_body']).statusCode;
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

    /* To get the timezones list from Lookup codes */
    public gettimeZones() {
        this.singleAdvertisementservices.getLookupsList(this.token, 'TIME_ZONES').subscribe(
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
            }
        );
    }

    /* This method to clear validation message for advanceEndDateChange ----*/
    advanceEndDateChange() {
        this.error = '';
    }

    /* ----- To get Advanced start date ----*/
    advanStartDateChange() {
        const time = 1000 * 60 * 15;
        this.advancedStartdate = new Date(Math.ceil(this.advancedStartdate.getTime() / time) * time);
        this.finaladvancedStartdate = this.advancedStartdate;
    }

    /* ----- To get Advanced end date ----*/
    advanEndDateChange() {
        const time = 1000 * 60 * 15;
        this.advancedEnddate = new Date(Math.ceil(this.advancedEnddate.getTime() / time) * time);
        this.finaladvancedEnddate = this.advancedEnddate;
    }

    /* To change the getTimezonesstartdate list */
    getTimezones(timezone) {
        const timevalue = timezone.split('$');
        this.timezoneCodes = timevalue[0];
        const advancetimezonevalue = timevalue[1].split('(UTC');
        const advanceutcval = advancetimezonevalue[1].split(')');
        this.advanceutctimezone = advanceutcval[0];
        this.advanceutctimezonestring = advanceutcval[0].toString();
    }

    /* ----- To submit Advanced search data ----*/
    submitAdvanced() {
        this.adverrefresh = 'false';
        this.errorstartdate = this.advancestartdate;
        this.errorenddate = this.advanceenddate;
        if (this.advancestartdate !== '' && this.advanceenddate && this.advancestartdate >= this.advanceenddate) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_START_END_DATE';
            this.advancestartdate = this.errorstartdate;
            this.advanceenddate = this.errorenddate;
        } else {
            /** ----- Convert prefered time zone to utc format start----- */
            if (this.advancestartdate !== '' && this.advancestartdate !== undefined && this.advancestartdate !== null) {
                if (this.advanceutctimezonestring.charAt(0) === '-') {
                    const utctime = this.advanceutctimezone.split('-');
                    const utctimesplit = utctime[1].split(':');
                    this.advancestartdate = moment(this.advancestartdate).add(utctimesplit[0], 'hours');
                    this.advancestartdate = moment(this.advancestartdate).add(utctimesplit[1], 'minutes');
                } else {
                    const utctime = this.advanceutctimezone.split('+');
                    const utctimesplit = utctime[1].split(':');
                    this.advancestartdate = moment(this.advancestartdate).subtract(utctimesplit[0], 'hours');
                    this.advancestartdate = moment(this.advancestartdate).subtract(utctimesplit[1], 'minutes');
                }
                this.advancestartdate = moment(this.advancestartdate).format('YYYY-MM-DD HH:mm');
            }
            if (this.advanceenddate !== '' && this.advanceenddate !== undefined && this.advanceenddate !== null) {
                if (this.advanceutctimezonestring.charAt(0) === '-') {
                    const utctime = this.advanceutctimezone.split('-');
                    const utctimesplit = utctime[1].split(':');
                    this.advanceenddate = moment(this.advanceenddate).add(utctimesplit[0], 'hours');
                    this.advanceenddate = moment(this.advanceenddate).add(utctimesplit[1], 'minutes');
                } else {
                    const utctime = this.advanceutctimezone.split('+');
                    const utctimesplit = utctime[1].split(':');
                    this.advanceenddate = moment(this.advanceenddate).subtract(utctimesplit[0], 'hours');
                    this.advanceenddate = moment(this.advanceenddate).subtract(utctimesplit[1], 'minutes');
                }
                this.advanceenddate = moment(this.advanceenddate).format('YYYY-MM-DD HH:mm');
            }
            /** ----- Convert prefered time zone to utc format start----- */
            if (this.advancedEnterprise !== '' && this.advancedEnterprise !== undefined) {
                this.advancedEnterprise = this.advancedEnterprise.trim().replace(/\s\s+/g, ' ');
            }
            if (this.advancedAdvertisementName !== '' && this.advancedAdvertisementName !== undefined) {
                this.advancedAdvertisementName = this.advancedAdvertisementName.trim().replace(/\s\s+/g, ' ');
            }
            this.advancedObj = {
                'enterpriseName': this.advancedEnterprise,
                'advertisementName': this.advancedAdvertisementName,
                'advertisementType': this.advancedAdvertisementType,
                'isEnabled': this.advancedIsEnabled,
                'startDatetime': this.advancestartdate,
                'endDatetime': this.advanceenddate
            };
            this.singleAdvertisementservices.getAdvancedSearch(this.token, this.advancedObj).subscribe(
                data => {
                    this.advancestartdate = this.errorstartdate;
                    this.advanceenddate = this.errorenddate;
                    if (data['statusCode'] === '1028') {
                        window.localStorage.setItem('advertisementadvance', 'advance');
                        this.advancedModal.hide();
                        for (let i = 0; i < data['result'].length; i++) {
                            if (data['result'][i].endDatetime > this.currentutc) {
                                data['result'][i].recordstatus = 'active';
                                if (data['result'][i].startDatetime > this.currentutc) {
                                    data['result'][i].startdatestatus = 'statdateactive';
                                } else {
                                    data['result'][i].startdatestatus = 'statdateinactive';
                                }
                            } else {
                                data['result'][i].recordstatus = 'inactive';
                            }
                            if (this.utctimezonestring.charAt(0) === '+') {
                                const utctime = this.utctimezone.split('+');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc()
                                    .add(utctimesplit[0], 'hours');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).add(utctimesplit[1], 'minutes');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                            } else {
                                const utctime = this.utctimezone.split('-');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc()
                                    .subtract(utctimesplit[0], 'hours');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                    .subtract(utctimesplit[1], 'minutes');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc()
                                    .subtract(utctimesplit[0], 'hours');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                            }
                        }
                        this.advertisements = data['result'];
                    }
                }, error => {
                    this.advancestartdate = this.errorstartdate;
                    this.advanceenddate = this.errorenddate;
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
                            } else {
                                this.error = 'COMMON_STATUS_CODES.' + statuscode;
                            }
                            break;
                    }
                }
            );
        }
    }

     /*-- To get Advertisement Records using with Advanced Search --*/
    advanceSearch() {
        this.getservercurrentutctime();
        this.submitAdvanced();
    }

    // To get current utc time from server
    getservercurrentutctime() {
        this.advertisementService.getservercurrentutctime(this.token).subscribe(
            data => {
                this.currentutc = data.result;
            },
            error => { });

    }

    /* To get Advertisements List*/
    getAllAdvertisements() {
        this.advertisementService.getAllAdvertisements(this.token).subscribe(
            data => {
                if (data['statusCode'] === '1028') {
                    for (let i = 0; i < data['result'].length; i++) {
                        if (data['result'][i].endDatetime > this.currentutc) {
                            data['result'][i].recordstatus = 'active';
                            if (data['result'][i].startDatetime > this.currentutc) {
                                data['result'][i].startdatestatus = 'statdateactive';
                            } else {
                                data['result'][i].startdatestatus = 'statdateinactive';
                            }
                        } else {
                            data['result'][i].recordstatus = 'inactive';
                        }
                         /** ----- Convert prefered time zone to utc format start----- */
                        if (this.utctimezonestring.charAt(0) === '+') {
                            const utctime = this.utctimezone.split('+');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).add(utctimesplit[1], 'minutes');
                            data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
                            data['result'][i].endDatetime = moment(data['result'][i].endDatetime)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                        } else {
                            const utctime = this.utctimezone.split('-');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc()
                                .subtract(utctimesplit[0], 'hours');
                            data['result'][i].startDatetime = moment(data['result'][i].startDatetime).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].endDatetime = moment(data['result'][i].endDatetime).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].endDatetime = moment(data['result'][i].endDatetime)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                        }
                        /** ----- Code end for Convert prefered time zone to utc format end----- */
                    }
                    this.advertisements = data['result'];
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
                        } else if (statuscode === '9997') {
                            this.advertisements = [];
                        } break;
                }
            }

        );

    }

    /* This method is used to access the eventemitter */
    emitChanges(event) {
        if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
            this.getservercurrentutctime();
            this.advertisementSearch(this.searchstring);
        } else {
            this.getservercurrentutctime();
            this.getAllAdvertisements();
        }
    }

    /* This method is used to call press Enter key */
    handleKeyPress(e) {
        const key = e.keyCode;
        if (key === 13) {
            this.advertisementSearch(this.searchstring);
        }
    }
    /**----export the data---- */
    exportData(searchstring) {
        let searchdiff = '';
        if (window.localStorage.getItem('advertisementadvance') === 'advance') {
            searchstring = JSON.stringify(this.advancedObj);
            window.localStorage.removeItem('advertisementadvance');
            searchdiff = 'Advancesearch';
            searchstring = searchstring + '~' + searchdiff;
        } else if (searchstring !== '' && searchstring !== undefined) {
            searchdiff = 'search';
            searchstring = searchstring + '~' + searchdiff;
        }
        const filePath = this.advertisementService.exportlist(searchstring, this.token);
        window.location.href = filePath;
    }

    /* To open Advance search popup */
    showAdvancedModal() {
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        this.userrole = window.localStorage.getItem('userrole');
        this.enterpriseNames = window.localStorage.getItem('enterPriseName');
        this.getAdvertisementTypes();
        this.gettimeZones();
        this.advancedModal.show();
    }

    /*-- To get the Advertisement Records using with simple Search --*/
    advertisementSearch(searchstring) {
        if (searchstring) {
            this.advertisementService.getSearchResult(this.token, searchstring).subscribe(
                data => {
                    localStorage.setItem('advertisementSearch', 'advertisementSearch');
                    if (data['statusCode'] === '1028') {
                        for (let i = 0; i < data['result'].length; i++) {
                            if (data['result'][i].endDatetime > this.currentutc) {
                                data['result'][i].recordstatus = 'active';
                                if (data['result'][i].startDatetime > this.currentutc) {
                                    data['result'][i].startdatestatus = 'statdateactive';
                                } else {
                                    data['result'][i].startdatestatus = 'statdateinactive';
                                }
                            } else {
                                data['result'][i].recordstatus = 'inactive';
                            }
                             /** ----- Convert prefered time zone to utc format start----- */
                            if (this.utctimezonestring.charAt(0) === '+') {
                                const utctime = this.utctimezone.split('+');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc().
                                add(utctimesplit[0], 'hours');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).add(utctimesplit[1], 'minutes');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).add(utctimesplit[1], 'minutes');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                            } else {
                                const utctime = this.utctimezone.split('-');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).utc()
                                    .subtract(utctimesplit[0], 'hours');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime).
                                subtract(utctimesplit[1], 'minutes');
                                data['result'][i].startDatetime = moment(data['result'][i].startDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).utc().
                                subtract(utctimesplit[0], 'hours');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].endDatetime = moment(data['result'][i].endDatetime)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                            }
                            /** ----- Code end for Convert prefered time zone to utc format end----- */
                        }
                        this.advertisements = data['result'];
                    } else if (data['statusCode'] === '9997') {
                        this.advertisements = [];
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
                            } if (statuscode === '9997') {
                                this.advertisements = [];
                            } break;
                    }
                }
            );
        } else {
            this.getAllAdvertisements();
        }
    }
     /* ----- To close Advanced search popup ----*/
    closeAdvanced() {
        this.advancedModal.hide();
        if (this.adverrefresh === 'true') {
            this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
            this.timezoneCode = this.timezoneCode.split('-');
            this.timezoneCodes = this.timezoneCode[0].trim();
            this.getAllAdvertisements();
        }
    }
    /* ----- To clear details on Advanced search popup ----*/
    clearAdvanced() {
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.timezoneCode = this.timezoneCode.split('-');
        this.timezoneCodes = this.timezoneCode[0].trim();
        this.advancedEnterprise = '';
        this.advancestartdate = '';
        this.advanceenddate = '';
        this.advancedAdvertisementName = '';
        this.advancedAdvertisementType = '';
        this.advancedStartdate = '';
        this.advancedEnddate = '';
        this.advancedIsEnabled = true;
        this.finaladvancedStartdate = '';
        this.finaladvancedEnddate = '';
        this.adverrefresh = 'true';
        this.getAllAdvertisements();
        this.error = '';
    }
}
