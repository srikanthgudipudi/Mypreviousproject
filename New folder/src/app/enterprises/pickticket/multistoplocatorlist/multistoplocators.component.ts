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

import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment/moment';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { MultiStopLocatorsService } from './multistoplocators.service';
import { MultiStopLocatorComponent } from '../multistoplocatorpopup/multistoplocator.component';

@Component({
    templateUrl: 'multistoplocators.html',
    providers: [MultiStopLocatorsService]
})
export class MultiStopLocatorsComponent implements OnInit {
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
    loginUserDateFormat: any;

    @ViewChild('advancedModel') public advancedModel;
    @ViewChild(MultiStopLocatorComponent)
    private multiStopLocatorComponent: MultiStopLocatorComponent;

    /**---- Constructor for enterprise setting component ----*/
    constructor(private router: Router,
        private multiStopLocatorsService: MultiStopLocatorsService,
        public toastr: ToastsManager, private translateService: TranslateService,
        @Inject('apiEndPoint') public apiEndPoint: string, ) {
    }

    /**---- To load the content at loading time ----*/
    ngOnInit() {
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
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
    }

    /**---- To open the popup model ---*/
    singleEnterprisesetting(updateaction, enterpriseobj) {
        this.multiStopLocatorComponent.showChildModal(updateaction, enterpriseobj);
    }

    /**----- To recall the list and search methods ----*/
    getallList(event) {
        if (localStorage.getItem('settingSearchObj') === 'search') {
            this.getEnterprisesSettings(this.searchstring);
        }
    }

    singlelocateFleet(locate, singlefleet) {
        const fleetInfo = {
            'statusCode': '1001',
            'message': 'General Success',
            'result': {
                '_id': 7,
                'createdAt': '2016-01-01T00:00:00.000Z',
                'createdBy': 'superadmin',
                'fleetCode': 'F00S046',
                'fleetImageFilePath': 'assets/fleets/6',
                'fleetName': 'F00S046',
                'fleetType': 'L90-Seat',
                'floorPlanFleetObj': 6,
                'isEnabled': 'Active',
                'notes': '',
                'reasonActivate': '',
                'reasonInactivate': '',
                'updatedAt': '2016-01-01T00:00:00.000Z',
                'updatedBy': 'superadmin',
                'isDeleted': false,
                'isTransactable': true,
                'settings': {
                    'reservationCanBeBumped': false,
                    'maxReservationWindowInHrs': 10,
                    'longTermReservationEligible': false,
                    'expirationGracePeriodInMins': 15,
                    'earlyCheckinWindowInMins': 15,
                    'configurable': false,
                    'checkinRequired': true,
                    'advancedReservationWindowInDays': 5
                },
                'visuals': [],
                'attributes': [
                    {
                        'attribute': {
                            '_id': 13,
                            'attributeName': 'Wheeled?'
                        },
                        'attributeValue': 'false'
                    },
                    {
                        'attribute': {
                            '_id': 14,
                            'attributeName': 'Ergonomic?'
                        },
                        'attributeValue': 'true'
                    },
                    {
                        'attribute': {
                            '_id': 15,
                            'attributeName': 'With Hand Rests?'
                        },
                        'attributeValue': 'true'
                    },
                    {
                        'attribute': {
                            '_id': 16,
                            'attributeName': 'High Back?'
                        },
                        'attributeValue': 'false'
                    }
                ],
                'preferences': {
                    'rowsPerPage': 25,
                    'defaultTheme': 'Dark-Sea-Green',
                    'dateFormat': 'MMM D, YY',
                    'currencyFormat': '#,###.##',
                    'defaultCurrency': 'USD - United States Dollar',
                    'defaultTimezone': 'IST - Indian Standard Time (UTC+05:30)',
                    'defaultLanguage': 'English (EN)'
                },
                'contactDetails': {
                    'workNumberCountrycode': '+91 - India',
                    'workNumber': '707-506-2833',
                    'workNumberExtn': null,
                    'email': 'info@vedicsys.com'
                },
                'address': {
                    'addressLine1': '4-1-17, Street 11',
                    'addressLine2': 'Snehapuri Colony, Nacharam',
                    'city': 'Hyderabad',
                    'state': 'Telangana',
                    'country': 'India',
                    'ZIP': '500076',
                    'geoCoordinates': [
                        '+17.4227368257379',
                        '+78.5448152013123'
                    ]
                },
                'floorPlanDetails': {
                    'floorPlanAvailable': true,
                    'floorEntryCoordinates': [
                        '+17.42277849195138',
                        '+78.54506582021713'
                    ],
                    'floorNorthEastCoordinates': [
                        '+17.422721710736894',
                        '+78.5447789914906'
                    ],
                    'floorSouthEastCoordinates': [
                        '',
                        ''
                    ],
                    'floorSouthWestCoordinates': [
                        '+17.422726669097184',
                        '+78.54502994567157'
                    ],
                    'floorNorthWestCoordinates': [
                        '+17.42284598959744',
                        '+78.54490756988527'
                    ],
                    'floorPlanJSONFileName': 'vedicsnehapurif0paths.json',
                    'floorPlanImageFileName': 'vedic-snehapuri-f00.png'
                },
                'fleetImageFileName': 'vedicsys.jpg',
                'path': 'VI0001 => VT0001 => VH0001 => VSC001 => SCB001 => SFG001 => SH1001',
                'enterprise': {
                    'enterpriseId': 1,
                    'enterpriseName': 'Vedic Systems'
                },
                'type': 'Feature',
                'fleetId': 70,
                'eventId': '',
                'fleetReservationId': '',
                'fleetReservationStatus': '',
                'eventStatus': '',
                'fleetStatus': 'Active',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [
                        '78.5448152013123',
                        '17.4227368257379'
                    ]
                },
                'features': [
                    {
                        'type': 'Feature',
                        'fleetId': 32,
                        'eventId': '',
                        'fleetReservationId': '',
                        'fleetReservationUserId': '',
                        'reservedResourceId': '',
                        'fleetReservationStatus': '',
                        'eventStatus': '',
                        'fleetStatus': 'Active',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [
                                '78.5448986850679',
                                '17.4226829235591'
                            ]
                        },
                        'properties': {
                            'level': 'SCB Floor Ground',
                            'fleetid': 'F00S008',
                            'fleetname': 'F00S008, Hyderabad',
                            'enterpriseid': 1,
                            'geometry/type': 'Point',
                            'special': 'false',
                            'fleetType': 'L90-Seat',
                            'iconcolor': 'Green',
                            'iconname': 'Seat'
                        }
                    }
                ]
            }
        };

        const deliveriesobj = [];
        for (let i = 0; i < singlefleet.deliveries.length; i++) {
            const deliveriesobj1 =  {
                'type': 'Feature',
                'fleetId': 169,
                'eventId': '',
                'fleetReservationId': '',
                'fleetReservationUserId': '',
                'reservedResourceId': '',
                'fleetReservationStatus': '',
                'eventStatus': '',
                'fleetStatus': 'Active',
                'geometry': {
                    'type': 'Point',
                    'coordinates': singlefleet.deliveries[i].coordinates
                },
                'properties': {
                    'level': 'SCB Floor Ground',
                    'fleetid': 'FEF001',
                    'fleetname': 'F00S017, Hyderabad',
                    'enterpriseid': 1,
                    'geometry/type': 'Point',
                    'special': 'true',
                    'fleetType': 'Fireexit',
                    'iconcolor': 'Grey',
                    'iconname': 'Fireexit'
                }
            };
            deliveriesobj.push(deliveriesobj1);
        }
        fleetInfo.result.features = deliveriesobj;
        localStorage.setItem('lcsinglefleet', JSON.stringify(fleetInfo['result']));
        localStorage.setItem('apiendpoint', this.apiEndPoint);
        this.multiStopLocatorsService.singlelocateFleet(locate, this.userToken, true);
    }

    /**---- Method for enterprise settings search ----*/
    getEnterprisesSettings(searchString) {
        if (searchString === undefined) {
            searchString = '';
        }
        this.searchstring = searchString;
        localStorage.setItem('settingSearchObj', 'search');
        localStorage.removeItem('settingAdvanceObj');
        const token = window.localStorage.getItem('token');
        this.multiStopLocatorsService.getMyAllenterprisesList(this.userToken, searchString)
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
                        AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
                        [i].createdAt).format(this.loginUserDateFormat + ' HH:mm');
                        AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
                        [i].updatedAt).utc().add(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
                        [i].updatedAt).add(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
                        [i].createdAt).format(this.loginUserDateFormat + ' HH:mm');
                        AllenterprisesDetails['result'][i].pickSlipDate = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).utc().add(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].pickSlipDate = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).add(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].pickSlipDate = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).format(this.loginUserDateFormat + ' HH:mm');
                        AllenterprisesDetails['result'][i].orderDate = moment(AllenterprisesDetails['result']
                        [i].orderDate).utc().add(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].orderDate = moment(AllenterprisesDetails['result']
                        [i].orderDate).add(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].orderDate = moment(AllenterprisesDetails['result']
                        [i].orderDate).format(this.loginUserDateFormat + ' HH:mm');
                    } else {
                        const utctime = this.utctimezone.split('-');
                        const utctimesplit = utctime[1].split(':');
                        AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
                        [i].createdAt).utc().subtract(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
                        [i].createdAt).subtract(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].createdAt = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).format(this.loginUserDateFormat + ' HH:mm');
                        AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
                        [i].updatedAt).utc().subtract(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
                        [i].updatedAt).subtract(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].updatedAt = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).format(this.loginUserDateFormat + ' HH:mm');
                        AllenterprisesDetails['result'][i].pickSlipDate = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).utc().subtract(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].pickSlipDate = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).subtract(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].pickSlipDate = moment(AllenterprisesDetails['result']
                        [i].pickSlipDate).format(this.loginUserDateFormat + ' HH:mm');
                        AllenterprisesDetails['result'][i].orderDate = moment(AllenterprisesDetails['result']
                        [i].orderDate).utc().subtract(utctimesplit[0], 'hours');
                        AllenterprisesDetails['result'][i].orderDate = moment(AllenterprisesDetails['result']
                        [i].orderDate).subtract(utctimesplit[1], 'minutes');
                        AllenterprisesDetails['result'][i].orderDate = moment(AllenterprisesDetails['result']
                        [i].orderDate).format(this.loginUserDateFormat + ' HH:mm');
                    }
                }
                this.allenterprisesDetails = AllenterprisesDetails['result'];
                window.localStorage.setItem('token', token);
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
