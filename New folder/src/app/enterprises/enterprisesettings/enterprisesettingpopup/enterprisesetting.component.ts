/**
 * ngOnInit(): To load the content at loading time.
 * showChildModal(updateaction, enterpriseobj): To open the popup model.
 * getFleetColors(): To get fleet colors from lookup data.
 * getLookupType(enterpriseid): To get Lookup type list.
 * editEnterpriseSettings(): Submit methods for edit enterprise settings.
 * autocase(text): To auto capitalization.
 * clearmessage(): To clear messages.
 * hideChildModal(): To hide the popup model.
 */
import {
    Component, OnInit, ViewChild, Inject, EventEmitter, Output
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { EnterpriseSettingService } from './enterprisesetting.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-enterprisesettings-popup',
    templateUrl: 'enterprisesetting.html',
    providers: [EnterpriseSettingService]
})

export class EnterpriseSettingComponent implements OnInit {
    @Output() uploaded: EventEmitter<string> = new EventEmitter();
    updateaction: any;
    selectedObj: any;
    enterpriseName: any;
    enterpriseid: any;
    imgSrc: any;
    imagename: any;
    enterpriseIcon: any;
    enterpriseIconFilePath: any;
    APIendpoint: any = '';
    disableCaptcha: any;
    sso: any;
    disablePasswordRes: any;
    fleetCommonName: any;
    advancedReservationWindowInDays: any;
    reservationCanBeBumped: any;
    expirationGracePeriodInMins: any;
    longTermReservationPossible: any;
    maxActiveReservationsPerUser: any;
    maxReservationWindowInHrs: any;
    reservationReminderWindowInMins: any;
    sendReservationReminders: any;
    appTitle: any;
    expiryHours: any;
    adminEmail: any;
    inactiveTimeOut: any;
    earlyCheckinWindowInMins: any;
    pagename: any;
    colorlist: any;
    availablefleetcolor: any = '';
    reservedfleetcolor: any = '';
    inactivefleetcolor: any = '';
    checkinfleetcolor: any = '';
    error: any;
    userToken: any;
    enterpriseIconpath: any;
    fleetTypes: any;
    timezoneCode: any;
    loginUserDateFormat: any;
    enablePasswordReset: any;
    enableCaptcha: any;

    @ViewChild('childModal') public childModal: ModalDirective;
    constructor(private enterpriseSettingService: EnterpriseSettingService,
        private translateService: TranslateService,
        private sanitizer: DomSanitizer, private router: Router,
        @Inject('apiEndPoint') public apiEndPoint: string,
        @Inject('imageMinSize') public imageMinSize: number,
        @Inject('imageMaxSize') public imageMaxSize: number) {
    }

    /**----- To load the content at loading time ----*/
    ngOnInit() {
        this.userToken = window.localStorage.getItem('token');
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.getFleetColors();
    }

    /**---- To open the popup model ----*/
    public showChildModal(updateaction, enterpriseobj): void {
        this.updateaction = updateaction;
        if (this.updateaction === 'EDIT') {
            this.pagename = 'ENTERPRISE_SETTINGS.EDIT_ENTERPRISE_SETTING';
            this.selectedObj = enterpriseobj;
            this.enterpriseName = enterpriseobj.enterpriseName;
            this.enterpriseid = this.selectedObj._id;
            this.getLookupType(this.enterpriseid);
            // settings block
            this.disableCaptcha = this.selectedObj.enableCaptcha;
            this.sso = this.selectedObj.SSO;
            this.disablePasswordRes = this.selectedObj.enablePasswordReset;
            this.fleetCommonName = this.selectedObj.fleetCommonName;
            this.advancedReservationWindowInDays = this.selectedObj.advancedReservationWindowInDays;
            this.reservationCanBeBumped = this.selectedObj.reservationCanBeBumped;
            this.expirationGracePeriodInMins = this.selectedObj.expirationGracePeriodInMins;
            this.longTermReservationPossible = this.selectedObj.longTermReservationPossible;
            this.maxActiveReservationsPerUser = this.selectedObj.maxActiveReservationsPerUser;
            this.maxReservationWindowInHrs = this.selectedObj.maxReservationWindowInHrs;
            this.reservationReminderWindowInMins = this.selectedObj.reservationReminderWindowInMins;
            this.sendReservationReminders = this.selectedObj.sendReservationReminders;
            this.appTitle = this.selectedObj.appTitle;
            this.expiryHours = this.selectedObj.fleetExpiryHours;
            this.adminEmail = this.selectedObj.adminEmail;
            this.inactiveTimeOut = this.selectedObj.inactivityTimeoutInMins;
            this.earlyCheckinWindowInMins = this.selectedObj.earlyCheckinWindowInMins;
            this.availablefleetcolor = this.selectedObj.fleetAvaliableColor;
            this.reservedfleetcolor = this.selectedObj.fleetReservedColor;
            this.inactivefleetcolor = this.selectedObj.fleetInactiveColor;
            this.checkinfleetcolor = this.selectedObj.fleetCheckinColor;
            this.enterpriseIconFilePath = this.selectedObj.enterpriseId.enterpriseIconFilePath + '/'
                + this.selectedObj.enterpriseId.enterpriseIcon;

        } else if (this.updateaction === 'VIEW') {
            this.pagename = 'ENTERPRISE_SETTINGS.VIEW_ENTERPRISE_SETTING';
            this.selectedObj = enterpriseobj;
            this.enterpriseIconFilePath = enterpriseobj.enterpriseId.enterpriseIconFilePath
                + '/' + enterpriseobj.enterpriseId.enterpriseIcon;
        }
        this.childModal.show();
    }

    /**---- To get fleet colors from lookup data ----*/
    getFleetColors() {
        const userToken = window.localStorage.getItem('token');
        this.enterpriseSettingService.getLookupsList(userToken, 'FLEET_COLOR_CODES').subscribe(
            data => {
                this.colorlist = data['result'];
            });
    }
    /*--  To get Lookup type list --*/
    public getLookupType(enterpriseid) {
        this.enterpriseSettingService.getFleetTypeList(this.userToken, enterpriseid).subscribe(
            data => {
                if (data.statusCode === '1001') {
                    this.fleetTypes = data['result'];
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
                            window.localStorage.removeItem('token');
                            this.router.navigate(['/pages/login']);
                        } break;
                }
            }
        );
    }

    /**---- Submit methods for edit enterprise settings ----*/
    editEnterpriseSettings() {
        if (this.appTitle === undefined || this.appTitle.trim() === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_APP_TITLE';
        } else if (this.fleetCommonName === undefined || this.fleetCommonName.trim() === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_FLEET_COMMON_NAME';
        } else if (this.maxActiveReservationsPerUser === undefined || this.maxActiveReservationsPerUser === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_MAX_LIMIT_ACTIVE_RESERVATIONS_PER_USER';
        } else if (this.advancedReservationWindowInDays === undefined ||
            this.advancedReservationWindowInDays === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_ADVANCED_RESERVATION_WINDOW_IN_DAYS';
        } else if (this.maxReservationWindowInHrs === undefined || this.maxReservationWindowInHrs === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_MAX_RESERVATION_WINDOW_IN_HRS';
        } else if (this.reservationReminderWindowInMins === undefined ||
            this.reservationReminderWindowInMins === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_RESERVATION_REMINDER_WINDOW_IN_MINS';
        } else if (this.expiryHours === undefined || this.expiryHours === ''
            || Number(this.expiryHours) === 0) {
            this.error = 'ENTERPRISES.VALID_VALUE_FLEET_RESERVATION_AUTO_EXPIRES_IN_HOURS';
        } else if (this.expirationGracePeriodInMins === undefined || this.expirationGracePeriodInMins === '') {
            this.error = 'ENTERPRISES.VALID_NOBLANK_EXPIRATION_GRACE_PERIOD_IN_MINS';
        } else if (this.inactiveTimeOut === undefined || this.inactiveTimeOut === ''
            || Number(this.inactiveTimeOut) === 0) {
            this.error = 'ENTERPRISES.VALID_VALUE_INACTIVE_TIMEOUT_IN_MINS';
        } else if (this.earlyCheckinWindowInMins === undefined || this.earlyCheckinWindowInMins === ''
            || Number(this.earlyCheckinWindowInMins) === 0) {
            this.error = 'ENTERPRISES.VALID_VALUE_CHECKIN_PRIOR_IN_MINS';
        } else if (this.availablefleetcolor === this.reservedfleetcolor || this.availablefleetcolor === this.inactivefleetcolor ||
            this.availablefleetcolor === this.checkinfleetcolor || this.reservedfleetcolor === this.inactivefleetcolor ||
            this.reservedfleetcolor === this.checkinfleetcolor || this.inactivefleetcolor === this.checkinfleetcolor) {
            this.error = 'Fleet status colors are not same';
        } else {
            this.selectedObj = {
                'appTitle': this.autocase(this.appTitle).trim().replace(/\s\s+/g, ' '),
                'fleetExpiryHours': this.expiryHours,
                'adminEmail': this.adminEmail,
                'enableCaptcha': this.disableCaptcha,
                'inactivityTimeoutInMins': this.inactiveTimeOut,
                'enablePasswordReset': this.disablePasswordRes,
                'earlyCheckinWindowInMins': this.earlyCheckinWindowInMins,
                'fleetCommonName': this.autocase(this.fleetCommonName).trim().replace(/\s\s+/g, ' '),
                'advancedReservationWindowInDays': this.advancedReservationWindowInDays,
                'reservationCanBeBumped': this.reservationCanBeBumped,
                'expirationGracePeriodInMins': this.expirationGracePeriodInMins,
                'longTermReservationPossible': this.longTermReservationPossible,
                'maxActiveReservationsPerUser': this.maxActiveReservationsPerUser,
                'maxReservationWindowInHrs': this.maxReservationWindowInHrs,
                'reservationReminderWindowInMins': this.reservationReminderWindowInMins,
                'sendReservationReminders': this.sendReservationReminders,
                'fleetAvaliableColor': this.availablefleetcolor,
                'fleetReservedColor': this.reservedfleetcolor,
                'fleetInactiveColor': this.inactivefleetcolor,
                'fleetCheckinColor': this.checkinfleetcolor,
            };
            this.enterpriseSettingService.updateEnterpriseSettings(this.userToken, this.enterpriseid, this.selectedObj)
                .subscribe(data => {
                    this.uploaded.emit();
                    this.childModal.hide();
                },
                error => {
                    const status = JSON.parse(error['status']);
                    const statuscode = JSON.parse(error['_body']).status;
                    switch (status) {
                        case 500:
                            break;
                        case 400:
                            if (statuscode === '9961') {
                                window.localStorage.removeItem('token');
                                this.router.navigate(['/pages/login']);
                            } break;
                    }
                });
        }

    }

    /**---- To auto capitalization ----*/
    autocase(text) {
        if (text) {
            return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
                if (prefix && suffix) { return all; }
                return letter.toUpperCase() + word.toLowerCase();
            });
        } else { return ''; }
    }

    /**---- To clear messages ----*/
    clearmessage() {
        this.error = '';
    }

    /**---- To hide the popup model ----*/
    hideChildModal() {
        this.childModal.hide();
        this.imgSrc = '';
    }

}
