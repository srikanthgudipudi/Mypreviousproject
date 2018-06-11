/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * UniversalImages components has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * ngAfterViewInit(): This method is called after a component's view has been fully initialized.
 * ngAfterContentChecked(): This method is called after every check of a directive's content.
 * viewImage(updateaction, selectedImgObj): This method is used to call the selected popup.
 * emitChanges(event): This method is used to use event emitter.
 * getAllUniversalImages(): This method is used to getAllUniversalImages.
 * handleKeyPress(e): This method is used to call when we press Enter key.
 * AdvancePopupModal(): This method is used to show the advance popup model.
 * hideAdvanceModal(): This method is used to hide the advance popup model.
 * universalImageSearch(searchstring): This method is used to search universalImagelisting data.
 * advance(): This method is used to get the advance search details.
 * clear(): This method is used to clear all the input fields in advance search.
 * exportData(searchstring) : This method used to download data.
 */

import {
    Component, OnInit, AfterContentChecked,
    ViewContainerRef, ViewChild, ViewChildren, Inject
} from '@angular/core';
import { Router } from '@angular/router';
import { UniversalImagesService } from './universalimages.service';
import { UniversalImageComponent } from './universalimagepopup/universalimage.component';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ConfirmationService } from '../../../custommodules/primeng/primeng';
import { AfterViewInit } from '@angular/core';
import * as moment from 'moment/moment';
@Component({
    templateUrl: 'universalimages.html',
    providers: [UniversalImagesService, ConfirmationService]
})

// tslint:disable-next-line:component-class-suffix
export class UniversalImages implements OnInit, AfterViewInit, AfterContentChecked {
    stacked = '';
    token: any = window.localStorage.getItem('token');
    toastermessage: any = '';
    universalImages: any;
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
    enterprisevalue: any = '';
    searchterm: any;
    imagevalue: any = '';
    enabledvalue: any = true;
    imagevalobj: any;
    enterpriseIconFilePath: any;
    pagename: any;
    userrole: any;
    enterpriseNames: any;
    @ViewChildren('input') vc;
    @ViewChild(UniversalImageComponent)
    private universalimageModalComponent: UniversalImageComponent;
    @ViewChild('mgModal') public childModal1: ModalDirective;
    userToken: any = '';
    storage: Storage = window.localStorage;
    constructor(public universalImageService: UniversalImagesService, private router: Router,
        @Inject('apiEndPoint') public apiEndPoint: string,
        public toastr: ToastsManager, private vcr: ViewContainerRef, private translateService: TranslateService,
        private confirmationService: ConfirmationService) {
        this.toastr.setRootViewContainerRef(vcr);
    }
    /**------ This method is used to open popup's -----*/
    viewImage(updateaction, selectedImgObj) {
        this.universalimageModalComponent.viewChildModal(updateaction, selectedImgObj);
    }

    /**  This method is called after a component's view has been fully initialized */
    ngAfterViewInit() {
        this.vc.first.nativeElement.focus();
    }

    /** This method is called after every check of a directive's content */
    ngAfterContentChecked() {
        if (window.localStorage.getItem('universalimagesadvance1')) {
            this.advance();
        }
        if (window.localStorage.getItem('simplesearch1') === 'search1') {
            this.universalImageSearch(this.searchterm);
        }
        window.localStorage.removeItem('simplesearch1');
        window.localStorage.removeItem('universalimagesadvance1');
    }

    /**----- This is the initial method that is called when page is loading -----*/
    ngOnInit() {
        this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
        this.viewstatus = window.localStorage.getItem('universalimgviewstatus');
        this.addstatus = window.localStorage.getItem('universalimgaddstatus');
        this.editstatus = window.localStorage.getItem('universalimgeditstatus');
        this.deletestatus = window.localStorage.getItem('universalimgdeletestatus');
        this.exportstatus = window.localStorage.getItem('universalimgexportstatus');
        this.liststatus = window.localStorage.getItem('universalimgliststatus');
        this.userToken = window.localStorage.getItem('token');
        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcformat = timezonevalue[0].split('-');
        this.userpreferedtimezone = utcformat[0];
        const utcval = timezonevalue[1].split(')');
        this.utctimezone = utcval[0];
        this.utctimezonestring = utcval[0].toString();
        if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
            this.router.navigate(['']);
        } else if ((this.liststatus === 'false') && (this.userToken !== undefined)) {
            this.router.navigate(['']);
        } else {
            this.getAllUniversalImages();
        }
    }

    /**---   This method is used to call for every event  ---- */
    emitChanges(event) {
        if (this.searchstring !== '' && this.searchstring !== null && this.searchstring !== undefined) {
            this.universalImageSearch(this.searchstring);
        } else if (window.localStorage.getItem('universalimagesadvance')) {
            this.advance();
        } else {
            this.getAllUniversalImages();
        }
    }

    /**----export the data---- */
    exportData(searchstring) {
        let searchdiff = '';
        if (window.localStorage.getItem('universalimagesadvance') === 'advance') {
            searchstring = JSON.stringify(this.imagevalobj);
            window.localStorage.removeItem('universalimagesadvance');
            searchdiff = 'Advancesearch';
            searchstring = searchstring + '~' + searchdiff;
        } else if (searchstring !== '' && searchstring !== undefined) {
            searchdiff = 'search';
            searchstring = searchstring + '~' + searchdiff;
        }
        const filePath = this.universalImageService.exportlist(searchstring, this.userToken);
        window.location.href = filePath;
    }

    /**----------- This method is used to get all the universal images list -----*/
    getAllUniversalImages() {
        this.universalImageService.getAllUniversalImages(this.token).subscribe(
            data => {
                if (data['statusCode'] === '1028') {
                    for (let i = 0; i < data['result'].length; i++) {
                        if (this.utctimezonestring.charAt(0) === '+') {
                            const utctime = this.utctimezone.split('+');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                        } else {
                            const utctime = this.utctimezone.split('-');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                        }
                    }
                    this.universalImages = data['result'];
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
                            this.universalImages = [];
                        } break;
                }
            }

        );

    }

    /**------- This method is used to call when we press Enter key -----*/
    handleKeyPress(e) {
        const key = e.keyCode;
        if (key === 13) {
            this.universalImageSearch(this.searchstring);
        }
    }

    /**----- This method is used to get the search details ------*/
    universalImageSearch(searchstring) {
        this.searchterm = searchstring;
        if (window.localStorage.removeItem('universalimagesadvance')) {
            window.localStorage.removeItem('universalimagesadvance');
        }
        if (searchstring) {
            this.universalImageService.getSearchResult(this.token, searchstring).subscribe(
                data => {
                    window.localStorage.setItem('simplesearch', 'search');
                    if (data['statusCode'] === '1028') {
                        for (let i = 0; i < data['result'].length; i++) {
                            if (this.utctimezonestring.charAt(0) === '+') {
                                const utctime = this.utctimezone.split('+');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                            } else {
                                const utctime = this.utctimezone.split('-');
                                const utctimesplit = utctime[1].split(':');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                                data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                            }
                        }
                        this.universalImages = data['result'];
                    } else if (data['statusCode'] === '9997') {
                        this.universalImages = [];
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
                                this.universalImages = [];
                            } break;
                    }
                }
            );
        } else {
            this.getAllUniversalImages();
        }
    }

    /**------- This method is used to show the advance popup model -----*/
    public AdvancePopupModal() {
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        this.userrole = window.localStorage.getItem('userrole');
        this.enterpriseNames = window.localStorage.getItem('enterPriseName');
        this.pagename = 'COMMON_PAGE_TITLES.ADVANCED_SEARCH';
        this.childModal1.show();
    }

    /**------- This method is used to hide the advance popup model --------- */
    public hideAdvanceModal() {
        this.childModal1.hide();
    }

    /**------ This method is used to get the advance search details ------*/
    advance() {
        if (this.enterprisevalue !== '' && this.enterprisevalue !== undefined) {
            this.enterprisevalue = this.enterprisevalue.trim().replace(/\s\s+/g, ' ');
        }
        if (this.imagevalue !== '' && this.imagevalue !== undefined) {
            this.imagevalue = this.imagevalue.trim().replace(/\s\s+/g, ' ');
        }
        this.imagevalobj = {
            'enterprisevalue': this.enterprisevalue,
            'imagevalue': this.imagevalue,
            'enabledvalue': this.enabledvalue
        };
        this.universalImageService.advacncedSearch(this.token, this.imagevalobj).subscribe(
            data => {
                if (data['statusCode'] === '1028') {
                    for (let i = 0; i < data['result'].length; i++) {
                        if (this.utctimezonestring.charAt(0) === '+') {
                            const utctime = this.utctimezone.split('+');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).add(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().add(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).add(utctimesplit[1], 'minutes');
                        } else {
                            const utctime = this.utctimezone.split('-');
                            const utctimesplit = utctime[1].split(':');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].createdAt = moment(data['result'][i].createdAt).subtract(utctimesplit[1], 'minutes');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                            data['result'][i].updatedAt = moment(data['result'][i].updatedAt).subtract(utctimesplit[1], 'minutes');
                        }
                    }
                    this.universalImages = data['result'];
                    window.localStorage.setItem('universalimagesadvance', 'advance');
                    this.childModal1.hide();
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
                        } else if (statuscode === '9998') {
                            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                            this.toastr.success(this.toastermessage.value);
                        } else if (statuscode === '9997') {
                            this.universalImages = [];
                        } break;
                }
            });
    }

    /**------ This method is used to clear all the input fields in advance search -----*/
    clear() {
        this.getAllUniversalImages();
        this.imagevalue = '';
        this.enterprisevalue = '';
        this.enabledvalue = true;
        window.localStorage.removeItem('universalimagesadvance');
    }
}

