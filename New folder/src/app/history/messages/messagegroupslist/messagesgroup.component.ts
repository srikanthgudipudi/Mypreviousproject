/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * MessageGroupComponent has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * showmessage(updateaction, selectedImgObj): This method is used to call the selected popup.
 * emitChanges(event): This method is used to use event emitter.
 * getAllMessagesList() : To get the all messages list.
 * allMessageSearch(searchstring): To search the data by any field.
 * gettimeZones(): To get timezone list.
 * changeTimezones(timezone): To change the timezone.
 * exportData(searchstring) : this method used to download data.
 * handleKeyPress(e) : To Handle Key press.
 */

import {
    Component, OnInit, ViewContainerRef, ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment/moment';
import { MessageGroupComponent } from '../messagegroupspopup/messagegroup.component';
import { MessagesGroupService } from './messagesgroup.service';

@Component({
    templateUrl: 'messagesgroup.html',
    providers: [MessagesGroupService]
})

// tslint:disable-next-line:component-class-suffix
export class MessagesGroupComponent implements OnInit, AfterViewInit {
    token: any = window.localStorage.getItem('token');
    stacked: any;
    searchstring: any;
    toastermessage: any;
    messagedata: any;
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
    enterpriseName: any;
    historydata: any;
    timeZones: any;
    advuserpreferedtimezone: any;
    advanceutctimezone: any;
    advanceutctimezonestring: any;
    message: any;
    fromDate: any;
    readstatus: any;
    enterpriseIconFilePath: any;
    userToken: any = '';
    storage: Storage = window.localStorage;

    @ViewChildren('input') vc;
    @ViewChild('mgModal') public childModal: ModalDirective;
    @ViewChild(MessageGroupComponent)
    private singlemessagegroupComponent: MessageGroupComponent;

    constructor(public messageGroupService: MessagesGroupService, private router: Router,
        public toastr: ToastsManager, private vcr: ViewContainerRef,
        private translateService: TranslateService,
        @Inject('apiEndPoint') public apiEndPoint: string) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    /*---- To show the popup ----*/
    showmessage(updateaction, selectedImgObj) {
        this.singlemessagegroupComponent.viewChildModal(updateaction, selectedImgObj);
    }

    /*---- To load the content ----*/
    ngOnInit() {
        this.viewstatus = window.localStorage.getItem('msghistoryviewstatus');
        this.addstatus = window.localStorage.getItem('msghistoryaddstatus');
        this.deletestatus = window.localStorage.getItem('msghistorydeletestatus');
        this.exportstatus = window.localStorage.getItem('msghistoryexportstatus');
        this.messageStatus = window.localStorage.getItem('msghistorymessagestatus');
        this.liststatus = window.localStorage.getItem('msghistoryliststatus');
        this.readstatus = window.localStorage.getItem('msghistoryreadstatus');
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
        this.utctimezonestring = utcval[0].toString();
        this.getAllMessagesList();
    }

    ngAfterViewInit() {
        this.vc.first.nativeElement.focus();
    }

    /*---- To search the data with empty string ----*/
    emitMessageGroup(event) {
        if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
            this.allMessageSearch(this.searchstring);
        } else {
            this.getAllMessagesList();
        }
    }

    /*---- To get the all messages list ----*/
    getAllMessagesList() {
        this.messageGroupService.getGroupMessages(this.token).subscribe(
            data => {
                if (data['statusCode'] === '1028') {
                    for (let i = 0; i < data['result'].length; i++) {
                        if (this.utctimezonestring.charAt(0) === '+') {
                            const utctime = this.utctimezone.split('+');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate).add(utctimesplit[1], 'minutes');
                            data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                        } else {
                            const utctime = this.utctimezone.split('-');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].groupStartDate =
                                moment(data['result'][i].groupStartDate).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].groupStartDate =
                                moment(data['result'][i].groupStartDate).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate)
                                .format(this.loginUserDateFormat + ' HH:mm');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
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

    /*---- To search the data by any field ----*/
    allMessageSearch(searchstring) {
        if (searchstring) {
            this.messageGroupService.getSearchResult(this.token, searchstring).subscribe(
                data => {
                    if (data['statusCode'] === '1028') {
                        for (let i = 0; i < data['result'].length; i++) {
                            if (this.utctimezonestring.charAt(0) === '+') {
                                const utctime = this.utctimezone.split('+');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].groupStartDate =
                                    moment(data['result'][i].groupStartDate).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate).add(utctimesplit[1], 'minutes');
                                data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                            } else {
                                const utctime = this.utctimezone.split('-');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate).utc().
                                    subtract(utctimesplit[0], 'hours');
                                data['result'][i].groupStartDate =
                                    moment(data['result'][i].groupStartDate).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].groupStartDate = moment(data['result'][i].groupStartDate)
                                    .format(this.loginUserDateFormat + ' HH:mm');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
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

    /*---- To get timezone list ---- */
    gettimeZones() {
        const token = window.localStorage.getItem('token');
        this.messageGroupService.getLookupsList(token, 'TIME_ZONES').subscribe(
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

    /*---- To change the timezone---- */
    changeTimezones(timezone) {
        const advancetimevalue = timezone.split('$');
        this.advuserpreferedtimezone = advancetimevalue[0];
        const advancetimezonevalue = advancetimevalue[1].split('(UTC');
        const advanceutcval = advancetimezonevalue[1].split(')');
        this.advanceutctimezone = advanceutcval[0];
        this.advanceutctimezonestring = advanceutcval[0].toString();
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
        const filePath = this.messageGroupService.exportlist(searchstring, this.userToken);
        window.location.href = filePath;
    }

    /**---To Handle Key press --- */
    handleKeyPress(e) {
        const key = e.keyCode;
        if (key === 13) {
            this.allMessageSearch(this.searchstring);
        }
    }

}
