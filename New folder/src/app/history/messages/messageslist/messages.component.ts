/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * MessageComponent has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * showmessage(updateaction, selectedImgObj): This method is used to call the selected popup.
 * emitChanges(event): This method is used to use event emitter.
 * getAllUniversalImages(): This method is used to getAllUniversalImages.
 * exportData(searchstring) : this method used to download data.
 * universalImageSearch(searchstring): This method is used to search universalImagelisting data.
 */
import {
    Component, OnInit, ViewContainerRef, ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { FleetsService } from '../../../enterprises/fleets/fleetslist/fleets.service';
import { MessagesService } from './messages.service';
import { MessageComponent } from '../messagepopup/message.component';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationService } from '../../../../custommodules/primeng/primeng';
import { AfterViewInit } from '@angular/core';
import * as moment from 'moment/moment';

@Component({
    templateUrl: 'messages.html',
    providers: [MessagesService, ConfirmationService, FleetsService]
})

// tslint:disable-next-line:component-class-suffix
export class MessagesComponent implements OnInit, AfterViewInit {
    token: any = window.localStorage.getItem('token');
    fromUserName: any;
    toUserName: any;
    searchstring: any;
    useraccount: any;
    toastermessage: any;
    messagedata: any;
    stacked = '';
    addstatus: any;
    viewstatus: any;
    deletestatus: any;
    liststatus: any;
    exportstatus: any;
    messageStatus: any;
    utctimezone: any;
    utctimezonestring: any;
    userpreferedtimezone: any;
    loginUserDateFormat: any;
    enterpriseNames: any;
    userrole: any;
    messageType: any;
    userAccount: any;
    userName: any;
    enterpriseName: any;
    historydata: any;
    timeZones: any;
    advuserpreferedtimezone: any;
    advanceutctimezone: any;
    advanceutctimezonestring: any;
    message: any;
    fromDate: any;
    toDate: any;
    advancefromDate: any;
    advancetoDate: any;
    enterpriseIconFilePath: any;
    messageto: any;
    messagetoId: any;
    mapSettings: any;
    @ViewChildren('input') vc;
    @ViewChild('mgModal') public childModal: ModalDirective;
    @ViewChild(MessageComponent)
    private singlemessageComponent: MessageComponent;
    userToken: any = '';
    storage: Storage = window.localStorage;
    constructor(public messageService: MessagesService, private router: Router,
        public toastr: ToastsManager, private vcr: ViewContainerRef,
        private translateService: TranslateService,
        @Inject('footerPoweredByName') public footerPoweredByName: string,
        @Inject('apiEndPoint') public apiEndPoint: string,
        public fleetsService: FleetsService,
        private confirmationService: ConfirmationService) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    /*---- To show the popup ----*/
    showmessage(updateaction, selectedImgObj) {
        this.singlemessageComponent.viewChildModal(updateaction, selectedImgObj);
    }
    /*---- To load the content ----*/
    ngOnInit() {
        this.viewstatus = window.localStorage.getItem('msghistoryviewstatus');
        this.addstatus = window.localStorage.getItem('msghistoryaddstatus');
        this.deletestatus = window.localStorage.getItem('msghistorydeletestatus');
        this.exportstatus = window.localStorage.getItem('msghistoryexportstatus');
        this.messageStatus = window.localStorage.getItem('msghistorymessagestatus');
        this.liststatus = window.localStorage.getItem('msghistoryliststatus');
        this.userToken = window.localStorage.getItem('token');
        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcformat = timezonevalue[0].split('-');
        this.userpreferedtimezone = utcformat[0];
        const utcval = timezonevalue[1].split(')');
        this.advuserpreferedtimezone = utcformat[0].trim();
        this.advanceutctimezonestring = utcval[0].toString();
        this.advanceutctimezone = utcval[0];
        this.utctimezone = utcval[0];
        this.useraccount = window.localStorage.getItem('user_Account');
        this.utctimezonestring = utcval[0].toString();
        if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
            this.router.navigate(['']);
            // }
            // else if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
            //     this.router.navigate(['']);
        } else {
            this.getAllMessagesList();
        }
        window.localStorage.removeItem('lcmhistory');
        window.localStorage.removeItem('lcmhistorydata');
        /*if (window.localStorage.getItem('mapmessageuser') === 'mapmessageuser') {
            window.localStorage.removeItem('mapmessageuser');
            this.messageService.getMessageHistoryInfoById(this.userToken, window.localStorage.getItem('id')).subscribe(
                messageCallHistoryInfo => {
                    if (messageCallHistoryInfo['result'].messageTo.userAccount === this.useraccount) {
                        this.messageto = messageCallHistoryInfo['result'].messageFrom.userId.enterpriseResourceObj.firstName + ' '
                            + messageCallHistoryInfo['result'].messageFrom.userId.enterpriseResourceObj.lastName;
                        this.messagetoId = messageCallHistoryInfo['result'].messageFrom.userId.enterpriseResourceObj._id;
                    } else {
                        this.messageto = messageCallHistoryInfo['result'].messageTo.userId.enterpriseResourceObj.firstName + ' '
                            + messageCallHistoryInfo['result'].messageTo.userId.enterpriseResourceObj.lastName;
                        this.messagetoId = messageCallHistoryInfo['result'].messageTo.userId.enterpriseResourceObj._id;
                    }
                    this.mapshowmessage(this.messageto, this.messagetoId, messageCallHistoryInfo['result'].enterprise.enterpriseName,
                        messageCallHistoryInfo['result'].enterprise.enterpriseId._id);
                }, error => {
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
        }*/
    }
    /** ---To navigate and open create message popup ----*/
    /* mapshowmessage(userAccount, userId, enterpriseName, enterpriseId) {
        this.router.navigate(['/history/messages']);
         window.localStorage.setItem('messageuser', 'messageuser');
         window.localStorage.setItem('useraccount', userAccount);
         window.localStorage.setItem('enterprisename', enterpriseName);
         window.localStorage.setItem('enterpriseid', enterpriseId);
         window.localStorage.setItem('userid', userId);
     }*/
    ngAfterViewInit() {
        this.vc.first.nativeElement.focus();
    }
    /*---- To search the data with empty string ----*/
    emitChanges(event) {
        if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
            this.allMessageSearch(this.searchstring);
        } else {
            if (window.localStorage.getItem('advancesearch') !== 'search') {
                this.getAllMessagesList();
            }
        }
    }
    /*---- To export the data---- */
    exportData(searchstring) {
        let searchdiff = '';
        if (window.localStorage.getItem('advancesearch') === 'search') {
            searchstring = JSON.stringify(this.historydata);
            window.localStorage.removeItem('advancesearch');
            searchdiff = 'Advancesearch';
            searchstring = searchstring + '~' + searchdiff;
        } else if (searchstring !== '' && searchstring !== undefined) {
            searchdiff = 'search';
            searchstring = searchstring + '~' + searchdiff;
        }
        const filePath = this.messageService.exportlist(searchstring, this.userToken);
        window.location.href = filePath;
    }
    /*---- To get the all messages list ----*/
    getAllMessagesList() {
        this.messageService.getMessages(this.token).subscribe(
            data => {
                if (data['statusCode'] === '1028') {
                    for (let i = 0; i < data['result'].length; i++) {
                        if (this.utctimezonestring.charAt(0) === '+') {
                            const utctime = this.utctimezone.split('+');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].messageDate = moment(data['result'][i].messageDate).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].messageDate = moment(data['result'][i].messageDate).add(utctimesplit[1], 'minutes');
                            data['result'][i].messageDate = moment(data['result'][i].messageDate)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                        } else {
                            const utctime = this.utctimezone.split('-');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].messageDate = moment(data['result'][i].messageDate).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].messageDate = moment(data['result'][i].messageDate).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].messageDate = moment(data['result'][i].messageDate)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                        }
                        if (data['result'][i].messageTo.userId !== null
                            && data['result'][i].messageTo.userId.enterpriseResourceObj !== null) {
                            const temp = data['result'][i].messageTo.userId.enterpriseResourceObj.firstName
                                + ' ' + data['result'][i].messageTo.userId.enterpriseResourceObj.lastName;
                            data['result'][i].messageTo.userAccount = temp;
                        } else if (data['result'][i].groupId !== null
                            && data['result'][i].groupId.groupName !== null) {
                            const temp = data['result'][i].groupId.groupName;
                            data['result'][i].messageTo.userAccount = temp;
                        }
                    }

                    this.messagedata = data['result'];
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
                            this.messagedata = [];
                        } break;
                }
            }

        );

    }
    handleKeyPress(e) {
        const key = e.keyCode;
        if (key === 13) {
            this.allMessageSearch(this.searchstring);
        }
    }
    /*---- To search the data by any field ----*/
    allMessageSearch(searchstring) {
        if (searchstring) {
            this.messageService.getSearchResult(this.token, searchstring).subscribe(
                data => {
                    if (data['statusCode'] === '1028') {
                        for (let i = 0; i < data['result'].length; i++) {
                            if (this.utctimezonestring.charAt(0) === '+') {
                                const utctime = this.utctimezone.split('+');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].messageDate = moment(data['result'][i].messageDate).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].messageDate = moment(data['result'][i].messageDate).add(utctimesplit[1], 'minutes');
                                data['result'][i].messageDate = moment(data['result'][i].messageDate)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                            } else {
                                const utctime = this.utctimezone.split('-');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].messageDate = moment(data['result'][i].messageDate).utc().
                                    subtract(utctimesplit[0], 'hours');
                                data['result'][i].messageDate = moment(data['result'][i].messageDate).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].messageDate = moment(data['result'][i].messageDate)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                            }
                            // const temp = data['result'][i].messageTo.userId.enterpriseResourceObj.firstName
                            //     + ' ' + data['result'][i].messageTo.userId.enterpriseResourceObj.lastName;
                            // data['result'][i].messageTo.userAccount = temp;
                            if (data['result'][i].messageTo.userName !== '') {
                                const temp = data['result'][i].messageTo.userId.enterpriseResourceObj.firstName
                                    + ' ' + data['result'][i].messageTo.userId.enterpriseResourceObj.lastName;
                                data['result'][i].messageTo.userAccount = temp;
                            } else if (data['result'][i].groupId !== null
                                && data['result'][i].groupId.groupName !== null) {
                                const temp = data['result'][i].groupId.groupName;
                                data['result'][i].messageTo.userAccount = temp;
                            }
                        }
                        this.messagedata = data['result'];
                    } else if (data['statusCode'] === '9997') {
                        this.messagedata = [];
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
                                this.messagedata = [];
                            } break;
                    }
                }
            );
        } else {
            this.getAllMessagesList();
        }
    }
    advanceSearch() {

        if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
            this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
        }
        if (this.userName !== '' && this.userName !== undefined) {
            this.userName = this.userName.trim().replace(/\s\s+/g, ' ');
        }
        if (this.userAccount !== '' && this.userAccount !== undefined) {
            this.userAccount = this.userAccount.trim().replace(/\s\s+/g, ' ');
        }
        if (this.messageType !== '' && this.messageType !== undefined) {
            this.messageType = this.messageType.trim().replace(/\s\s+/g, ' ');
        }
        if (this.message !== '' && this.message !== undefined) {
            this.message = this.message.trim().replace(/\s\s+/g, ' ');
        }
        /* ----- Convert prefered time zone to utc format start----- */
        if (this.fromDate) {
            if (this.advanceutctimezonestring.charAt(0) === '-') {
                const utctime = this.advanceutctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                this.advancefromDate = moment(this.fromDate).add(utctimesplit[0], 'hours');
                this.advancefromDate = moment(this.advancefromDate).add(utctimesplit[1], 'minutes');
                this.advancefromDate = moment(this.advancefromDate).format('YYYY-MM-DD HH:mm');
            } else {
                const utctime = this.advanceutctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                this.advancefromDate = moment(this.fromDate).subtract(utctimesplit[0], 'hours');
                this.advancefromDate = moment(this.advancefromDate).subtract(utctimesplit[1], 'minutes');
                this.advancefromDate = moment(this.advancefromDate).format('YYYY-MM-DD HH:mm');
            }
        }
        if (this.toDate) {
            if (this.advanceutctimezonestring.charAt(0) === '-') {
                const utctime = this.advanceutctimezone.split('-');
                const utctimesplit = utctime[1].split(':');
                this.advancetoDate = moment(this.toDate).add(utctimesplit[0], 'hours');
                this.advancetoDate = moment(this.advancetoDate).add(utctimesplit[1], 'minutes');
                this.advancetoDate = moment(this.advancetoDate).format('YYYY-MM-DD HH:mm');
            } else {
                const utctime = this.advanceutctimezone.split('+');
                const utctimesplit = utctime[1].split(':');
                this.advancetoDate = moment(this.toDate).subtract(utctimesplit[0], 'hours');
                this.advancetoDate = moment(this.advancetoDate).subtract(utctimesplit[1], 'minutes');
                this.advancetoDate = moment(this.advancetoDate).format('YYYY-MM-DD HH:mm');
            }
        }
        this.historydata = {
            'enterpriseName': this.enterpriseName,
            'messageFrom': this.userName,
            'messageTo': this.userAccount,
            'messageType': this.messageType,
            'message': this.message,
            'fromDate': this.advancefromDate,
            'toDate': this.advancetoDate
        };
        this.messageService.advanceSearchHistory(this.historydata, this.userToken)
            .subscribe(
            searchDetails => {
                window.localStorage.setItem('lcmhistory', 'lcmhistorydata');
                window.localStorage.setItem('lcmhistorydata', JSON.stringify(searchDetails));
                window.localStorage.setItem('advancesearch', 'search');
                for (let i = 0; i < searchDetails['result'].length; i++) {
                    if (this.utctimezonestring.charAt(0) === '+') {
                        const utctime = this.utctimezone.split('+');
                        const utctimesplit = utctime[1].split(':');
                        searchDetails['result'][i].messageDate =
                            moment(searchDetails['result'][i].messageDate).utc().add(utctimesplit[0], 'hours');
                        searchDetails['result'][i].messageDate =
                            moment(searchDetails['result'][i].messageDate).add(utctimesplit[1], 'minutes');
                        searchDetails['result'][i].messageDate =
                            moment(searchDetails['result'][i].messageDate)
                                .format(this.loginUserDateFormat + ' HH:mm');
                        searchDetails['result'][i].createdAt = moment(searchDetails['result'][i].createdAt).
                            utc().add(utctimesplit[0], 'hours');
                        searchDetails['result'][i].createdAt = moment(searchDetails['result'][i].createdAt).
                            add(utctimesplit[1], 'minutes');
                        searchDetails['result'][i].updatedAt = moment(searchDetails['result'][i].updatedAt).
                            utc().add(utctimesplit[0], 'hours');
                        searchDetails['result'][i].updatedAt = moment(searchDetails['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                    } else {
                        const utctime = this.utctimezone.split('-');
                        const utctimesplit = utctime[1].split(':');
                        searchDetails['result'][i].messageDate =
                            moment(searchDetails['result'][i].messageDate).utc().subtract(utctimesplit[0], 'hours');
                        searchDetails['result'][i].messageDate =
                            moment(searchDetails['result'][i].messageDate).subtract(utctimesplit[1], 'minutes');
                        searchDetails['result'][i].messageDate = moment(searchDetails['result'][i].messageDate)
                            .format(this.loginUserDateFormat + ' HH:mm');
                        searchDetails['result'][i].createdAt =
                            moment(searchDetails['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                        searchDetails['result'][i].createdAt =
                            moment(searchDetails['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                        searchDetails['result'][i].updatedAt =
                            moment(searchDetails['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                        searchDetails['result'][i].updatedAt =
                            moment(searchDetails['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                    }
                    // if (searchDetails['result'][i].messageTo.userId.enterpriseResourceObj !== null) {
                    if (searchDetails['result'][i].messageTo.userAccount !== '') {
                        const temp = searchDetails['result'][i].messageTo.userId.enterpriseResourceObj.firstName
                            + ' ' + searchDetails['result'][i].messageTo.userId.enterpriseResourceObj.lastName;
                        searchDetails['result'][i].messageTo.userAccount = temp;
                    } else {
                        const temp = searchDetails['result'][i].groupId.groupName;
                        searchDetails['result'][i].messageTo.userAccount = temp;
                    }
                }
                this.messagedata = searchDetails['result'];
                this.childModal.hide();
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
    clear() {
        this.messageType = '';
        this.userAccount = '';
        this.userName = '';
        this.enterpriseName = '';
        this.fromDate = '';
        this.toDate = '';
        this.message = '';
        this.getAllMessagesList();
        this.gettimeZones();
        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcformat = timezonevalue[0].split('-');
        this.advuserpreferedtimezone = utcformat[0].trim();
    }
    getadvancedsearch() {
        this.childModal.show();
        this.userrole = window.localStorage.getItem('userrole');
        this.enterpriseNames = window.localStorage.getItem('enterPriseName');
        this.gettimeZones();
    }
    /**---  To hide advance search popup     ----- */
    hideAdvanceModal() {
        this.childModal.hide();
    }
    gettimeZones() {
        const token = window.localStorage.getItem('token');
        this.messageService.getLookupsList(token, 'TIME_ZONES').subscribe(
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
    changeTimezones(timezone) {
        const advancetimevalue = timezone.split('$');
        this.advuserpreferedtimezone = advancetimevalue[0];
        const advancetimezonevalue = advancetimevalue[1].split('(UTC');
        const advanceutcval = advancetimezonevalue[1].split(')');
        this.advanceutctimezone = advanceutcval[0];
        this.advanceutctimezonestring = advanceutcval[0].toString();
    }
    locates(locate) {
        this.messageService.locates(locate, this.userToken, this.searchstring);
    }
      singlelocate(locate, singleMessageHistory) {
        this.fleetsService.getBuildingId(this.userToken, singleMessageHistory._id, 'messagehistory').subscribe(
            builingcode => {
                if (builingcode.result.buildingCode) {
                    this.fleetsService.getbuildingFloorMapInfo(this.userToken, builingcode.result.buildingCode).subscribe(
                        fleetInfo => {
                            localStorage.setItem('lcmessagehistoryinfo', JSON.stringify(fleetInfo['floorsData']));
                            localStorage.setItem('apiendpoint', this.apiEndPoint);
                            localStorage.setItem('mesurrentfloorname', builingcode.result.currentFloor);
                            const currentFloorName = 'mesurrentfloorname';
                            const currentumesid = singleMessageHistory._id;
                            this.messageService.singlelocateMessageHistory(locate, this.userToken, fleetInfo['floorsData'][0]._id,
                                true, currentFloorName, currentumesid,
                                builingcode.result.fleetId, builingcode.result.currentFloorId, fleetInfo.fleetName);
                        });
                } else {
                    this.messageService.getMessageHistoryInfoById(this.userToken, singleMessageHistory._id).subscribe(
                        messageCallHistoryInfo => {
                            let date = messageCallHistoryInfo['result'].messageDate;
                            if (this.utctimezonestring.charAt(0) === '+') {
                                const utctime = this.utctimezone.split('+');
                                const utctimesplit = utctime[1].split(':');
                                date = moment(date).utc().add(utctimesplit[0], 'hours');
                                date = moment(date).add(utctimesplit[1], 'minutes');
                                date = moment(date)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                            } else {
                                const utctime = this.utctimezone.split('-');
                                const utctimesplit = utctime[1].split(':');
                                date = moment(date).utc().
                                    subtract(utctimesplit[0], 'hours');
                                date = moment(date).subtract(utctimesplit[1], 'minutes');
                                date = moment(date)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                            }
                            delete messageCallHistoryInfo.result.workNumber;
                            delete messageCallHistoryInfo.result.mobileNumber;
                            if (window.localStorage.getItem('user_id') !== messageCallHistoryInfo.result.messageTo.userId._id.toString()) {
                                delete messageCallHistoryInfo.result.enterprise.enterpriseId.address;
                                const mesTo = messageCallHistoryInfo.result.messageTo.userId.enterpriseResourceObj;
                                const address2 = mesTo.address;
                                messageCallHistoryInfo.result.resDesignation = mesTo.designation;
                                messageCallHistoryInfo.result.resDepartment = mesTo.department;
                                messageCallHistoryInfo.result.imagePath = mesTo.enterpriseResourcesImageFilePath;
                                messageCallHistoryInfo.result.imageName = mesTo.enterpriseResourcesImageFileName;
                                messageCallHistoryInfo.result.resAddress = address2.addressLine1 + ', '
                                    + address2.addressLine2 + ', ' + address2.city + ', '
                                    + address2.state + ', ' + address2.ZIP + ', ' + address2.country;
                                messageCallHistoryInfo.result.presentlyLocated = '';
                                const mobileCountryCode = mesTo.contactDetails.mobileNumberCountrycode.split(' - ');
                                messageCallHistoryInfo.result.resMobileNumber = mobileCountryCode[0]
                                    + '-' + mesTo.contactDetails.mobileNumber;
                                messageCallHistoryInfo.result.resEmail = mesTo.contactDetails.email;
                                messageCallHistoryInfo.result.resmessageDate = date;
                            } else {
                                const msgFrom = messageCallHistoryInfo.result.messageFrom.userId.enterpriseResourceObj;
                                const address2 = msgFrom.address;
                                messageCallHistoryInfo.result.resDesignation = msgFrom.designation;
                                messageCallHistoryInfo.result.resDepartment = msgFrom.department;
                                messageCallHistoryInfo.result.imagePath = msgFrom.enterpriseResourcesImageFilePath;
                                messageCallHistoryInfo.result.imageName = msgFrom.enterpriseResourcesImageFileName;
                                messageCallHistoryInfo.result.resAddress = address2.addressLine1 + ', '
                                    + address2.addressLine2 + ', ' + address2.city + ', '
                                    + address2.state + ', ' + address2.ZIP + ', ' + address2.country;
                                messageCallHistoryInfo.result.presentlyLocated = '';
                                const mobileCountryCode = msgFrom.contactDetails.mobileNumberCountrycode.split(' - ');
                                messageCallHistoryInfo.result.resMobileNumber = mobileCountryCode[0]
                                    + '-' + msgFrom.contactDetails.mobileNumber;
                                messageCallHistoryInfo.result.resEmail = msgFrom.contactDetails.email;
                                messageCallHistoryInfo.result.resmessageDate = date;
                            }
                            localStorage.setItem('lcmessagehistoryinfo', JSON.stringify(messageCallHistoryInfo['result']));
                            localStorage.setItem('apiendpoint', this.apiEndPoint);
                            localStorage.removeItem('mesurrentfloorname');
                            const currentFloorName = '';
                            const currentumesid = singleMessageHistory._id;
                            const buildingName = null;
                            const currentfloorid = null;
                            const currentFleetId = null;
                            this.messageService.singlelocateMessageHistory(locate, this.userToken, messageCallHistoryInfo['result']._id,
                               false,
                                currentFloorName, currentumesid, currentfloorid, currentFleetId, buildingName);
                        });
                }
            });
    }

}
