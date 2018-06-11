/**
 * ngOnInit(): To load the content at loading time.
 * singleEnterprisesetting(updateaction, enterpriseobj): To open the popup model.
 * getFleetColors(): To get fleet colors.
 * getallList(event): To recall the list and search methods.
 * advancedEnterprisesettings(): Advance search enterprise settings method.
 * advancedEnterprise(): To get enterprise settings list.
 * getEnterprisesSettings(searchString): Method for enterprise settings search.
 * exportData(searchstring): To export the data.
 * handleKeyPress(e): To Handle Key press.
 * hideAdvancedModal(): To hide the advanced model.
 * clearAdvancedModal(): To clear the data in popup model.
 */

import { Component, OnInit, ViewChild, Inject, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { EnterpriseSettingsService } from './enterprisesettings.service';
import { EnterpriseSettingComponent } from '../enterprisesettingpopup/enterprisesetting.component';

@Component({
    templateUrl: 'enterprisesettings.html',
    providers: [EnterpriseSettingsService]
})
export class EnterpriseSettingsComponent implements OnInit, AfterContentChecked {
    userToken: any;
    utctimezonestring: any;
    utctimezone: any;
    allenterprisesDetails: any[];
    toastermessage: any;
    storage: any;
    userpreferedtimezone: any;
    rowsPerPage = 10;
    stacked: any;
    userrole: any;
    enterpriseNames: any;
    enterpriseIconFilePath: any;
    enterpriseName: any;
    searchenterprisesDetails: any;
    availablefleetcolor: any = '';
    reservedfleetcolor: any = '';
    inactivefleetcolor: any = '';
    checkinfleetcolor: any = '';
    colorlist: any;
    searchstring: any = '';
    enterprisesexportstatus: any;
    fleetCommonName: any;

    @ViewChild('advancedModel') public advancedModel;
    @ViewChild(EnterpriseSettingComponent)
    private enterpriseSettingComponent: EnterpriseSettingComponent;

    /**---- Constructor for enterprise setting component ----*/
    constructor(private router: Router,
        private enterpriseSettingsService: EnterpriseSettingsService,
        public toastr: ToastsManager, private translateService: TranslateService,
        @Inject('apiEndPoint') public apiEndPoint: string, ) {
    }

    /**---- To load the content at loading time ----*/
    ngOnInit() {
        this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
        this.userToken = window.localStorage.getItem('token');
        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
        this.enterprisesexportstatus = window.localStorage.getItem('enterprisesexportstatus');
        this.getEnterprisesSettings('');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcformat = timezonevalue[0].split('-');
        this.userpreferedtimezone = utcformat[0];
        const utcval = timezonevalue[1].split(')');
        this.utctimezone = utcval[0];
        this.utctimezonestring = utcval[0].toString();
        this.getFleetColors();
    }
    ngAfterContentChecked() {
        this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    }
    /**---- To open the popup model ---*/
    singleEnterprisesetting(updateaction, enterpriseobj) {
        this.enterpriseSettingComponent.showChildModal(updateaction, enterpriseobj);
    }

    /**---- To get fleet colors ----*/
    getFleetColors() {
        const userToken = window.localStorage.getItem('token');
        this.enterpriseSettingsService.getLookupsList(userToken, 'COLORS').subscribe(
            data => {
                this.colorlist = data['result'];
            });
    }

    /**----- To recall the list and search methods ----*/
    getallList(event) {
        if (localStorage.getItem('settingSearchObj') === 'search') {
            this.getEnterprisesSettings(this.searchstring);
        }
        if (localStorage.getItem('settingAdvanceObj') === 'advance') {
            this.advancedEnterprise();
        }
    }

    /**---- Advance search enterprise settings method ---*/
    advancedEnterprisesettings() {
        this.userrole = window.localStorage.getItem('userrole');
        this.enterpriseNames = window.localStorage.getItem('enterPriseName');
        this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        this.advancedModel.show();
    }

    /**---- To get enterprise settings list ----*/
    advancedEnterprise() {
        localStorage.removeItem('settingSearchObj');
        localStorage.setItem('settingAdvanceObj', 'advance');
        if (this.enterpriseName !== '' && this.enterpriseName !== undefined) {
            this.enterpriseName = this.enterpriseName.trim().replace(/\s\s+/g, ' ');
        }
        this.searchenterprisesDetails = {
            'enterpriseName': this.enterpriseName,
            'fleetAvaliableColor': this.availablefleetcolor,
            'fleetReservedColor': this.reservedfleetcolor,
            'fleetInactiveColor': this.inactivefleetcolor,
            'fleetCheckinColor': this.checkinfleetcolor,
        };
        this.enterpriseSettingsService.advanceEnterpriseSettings(this.searchenterprisesDetails, this.userToken).subscribe(
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
                this.advancedModel.hide();
            });
    }

    /**---- Method for enterprise settings search ----*/
    getEnterprisesSettings(searchString) {
        if (searchString === undefined) {
            searchString = '';
        }
        this.searchstring = searchString;
        localStorage.setItem('settingSearchObj', 'search');
        localStorage.removeItem('settingAdvanceObj');
        this.enterpriseSettingsService.getMyAllenterprisesList(this.userToken, searchString)
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

    /**----To export the data---- */
    exportData(searchstring) {
        let searchdiff = '';
        if (window.localStorage.getItem('settingAdvanceObj') === 'advance') {
            searchstring = JSON.stringify(this.searchenterprisesDetails);
            //   window.localStorage.removeItem('settingAdvanceObj');
            searchdiff = 'Advancesearch';
            searchstring = searchstring + '~' + searchdiff;
        } else if (this.searchstring !== '' && this.searchstring !== undefined) {
            searchdiff = 'search';
            searchstring = this.searchstring + '~' + searchdiff;
        }
        const filePath = this.enterpriseSettingsService.exportlist(searchstring, this.userToken);
        window.location.href = filePath;
    }

    /**---To Handle Key press --- */
    handleKeyPress(e) {
        const key = e.keyCode;
        if (key === 13) {
            this.getEnterprisesSettings(this.searchstring);
        }
    }

    /**---- To hide the advanced model ----*/
    hideAdvancedModal() {
        this.advancedModel.hide();
    }

    /**---- To clear the data in popup model ----*/
    clearAdvancedModal() {
        this.enterpriseName = '';
        this.availablefleetcolor = '';
        this.reservedfleetcolor = '';
        this.inactivefleetcolor = '';
        this.checkinfleetcolor = '';
        this.getEnterprisesSettings('');
    }

}
