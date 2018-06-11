/**
 * FleetTypeComponent have below methods.
 * ngOnInit(): To load the content at loading time.
 *  showChildModal(updateaction, fleetObj): To open the popup model.
 * universalUploaded(event): To set the values from universal data.
 * getEnterprisesList(): To get the enterprises list.
 * getEnterpriseResources(type): To split the enterprise id and name.
 * createFleetType(): To create the fleet type.
 * updateFleetTypes(): To update the fleet type image.
 * deleteFleetType(): To update the fleet type image.
 * autocase(text): To auto capitailisation.
 * clearmessage(): To clear the error messages.
 * hideChildModal(): To hide the popup model.
 */
import {
    Component, OnInit, ViewChild, Inject, EventEmitter, Output, AfterContentChecked
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { TranslateService } from 'ng2-translate';
import { ToastsManager } from 'ng2-toastr';
import { Router } from '@angular/router';
import { FleetTypeService } from './fleettype.service';
import * as moment from 'moment/moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-fleettypes-popup',
    templateUrl: 'fleettype.html',
    providers: [FleetTypeService]
})
export class FleetTypeComponent implements OnInit, AfterContentChecked {
    updateaction: any;
    userToken: any;
    fleetCommonName: any;
    value: any;
    enterpriseId: any;
    enterprisesName: any = '';
    enterpriseIconFilePath: any;
    errMsg1: any;
    timezoneCode: any;
    errMsg2: any;
    imgStatus: any;
    imageTypeError: any;
    loginUserDateFormat: any;
    error: any;
    loggedinuserrole: any;
    enterprisesSize: any;
    pagename: any;
    enterpriseIcon: any;
    enterprisesNames: any;
    fleettypesData: any;
    enabled = true;
    fleetTypeValue: any;
    toastermessage: any;
    selectedObj: any;
    fleetid: any;
    fleetTypeIcon: any;
    universalid: any;
    universal = false;
    universalimg: any;
    universalfilename: any;
    storage: Storage = window.localStorage;
    imgSrc1: any;
    colorlist: any;
    displaycolor: any;
    count: any = 1;
    fleettypes: any;
    validfail: boolean;
    validcolor = false;
    validicon = false;
    validtype = false;
    row: any;
    fleetTypeLength = 100; // changed for increase fleet types
    fleetTypeArray = [true];
    availablefleetcolor: any = '';
    reservedfleetcolor: any = '';
    inactivefleetcolor: any = '';
    checkinfleetcolor: any = '';
    fleettransactablecolor: any = '';
    editfleetTypes: any;
    viewfleetTypes: any;
    universalimgs: any;
    count1: any = 0;
    lengthCheck: any = 1;
    updateAt: any;
    createAt: any;
    part1: any;
    part2: any;
    fleetAvaliableColorCode: any;
    fleettransactablecolorCode: any;
    checkinfleetcolorCode: any;
    reservedfleetcolorCode: any;
    @ViewChild('childModal') public childModal: ModalDirective;
    @Output() uploaded: EventEmitter<string> = new EventEmitter();

    /**---- Constructor for FleetTypeComponent ----*/
    constructor(private fleetTypeService: FleetTypeService,
        private translateService: TranslateService,
        private sanitizer: DomSanitizer,
        public toastr: ToastsManager,
        private router: Router,
        @Inject('apiEndPoint') public apiEndPoint: string,
        @Inject('imageMinSize') public imageMinSize: number,
        @Inject('imageMaxSize') public imageMaxSize: number) {
    }

    /**---- To load the content at loading time ----*/
    ngOnInit() {
        this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
        this.userToken = window.localStorage.getItem('token');
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.loggedinuserrole = window.localStorage.getItem('userrole');
    }
    ngAfterContentChecked() {
        this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    }
    /**---- To open the popup model ----*/
    public showChildModal(updateaction, fleetObj): void {
        this.updateaction = updateaction;
        if (updateaction === 'CREATE') {
            this.fleettypes = [];
            if (document.getElementById('test0') && document.getElementById('test0').style &&
                document.getElementById('test0').style.display && document.getElementById('test0').style.display === 'none') {
                document.getElementById('test0').style.display = 'flex';
            } else {
                this.fleetTypeArray = [true];
            }
            this.count = 1;
            // this.availablefleetcolor = window.localStorage.getItem('fleetAvaliableColor');
            // this.reservedfleetcolor = window.localStorage.getItem('fleetReservedColor');
            // this.inactivefleetcolor = window.localStorage.getItem('fleetInactiveColor');
            // this.checkinfleetcolor = window.localStorage.getItem('fleetCheckinColor');
            // this.fleettransactablecolor = window.localStorage.getItem('fleetNonTransactableColor');
            if (document.getElementById('fleetTypeId0')) {
                const fleetColor = <HTMLInputElement>document.getElementById('fleetTypeId0');
                fleetColor.value = '';
            }
            if (document.getElementById('imageIcon0')) {
                const imageIcon = <HTMLInputElement>document.getElementById('imageIcon0');
                imageIcon.className = '';
            }
            this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
            this.part1 = this.translateService.get('COMMON_PAGE_TITLES.CREATE_FLEET');
            this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
            this.pagename = this.part1.value + this.fleetCommonName + this.part2.value;
            if (window.localStorage.getItem('fleettypesaddstatus') === 'true' &&
                window.localStorage.getItem('userrole') === 'Super Admin') {
                this.getEnterprisesList();
            } else {
                this.enterprisesSize = true;
                this.enterpriseId = window.localStorage.getItem('enterpriseId');
                this.enterprisesName = window.localStorage.getItem('enterPriseName');
                this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
            }
            this.getFleetColors();
            this.getfleeticons();

        } else if (updateaction === 'EDIT') {
            this.editfleetTypes = fleetObj.fleetTypes;
            this.enterpriseId = fleetObj.enterprise.enterpriseId._id;
            for (let i = 0; i < this.editfleetTypes.length; i++) {
                if (this.editfleetTypes[i].isSpecial === 'true') {
                    this.editfleetTypes[i].isSpecial = true;
                } else if (this.editfleetTypes[i].isSpecial === 'false') {
                    this.editfleetTypes[i].isSpecial = false;
                }
            }
            this.fleetTypeNameEdit(this.editfleetTypes, this.enterpriseId);
            this.part1 = this.translateService.get('COMMON_PAGE_TITLES.EDIT_FLEET');
            this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
            this.pagename = this.part1.value + this.fleetCommonName + this.part2.value;
            this.selectedObj = fleetObj;
            this.fleetid = this.selectedObj._id;
            this.enterprisesName = this.selectedObj.enterprise.enterpriseName;
            this.enterpriseId = this.selectedObj.enterprise.enterpriseId._id;
            this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
            this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
            this.availablefleetcolor = fleetObj.enterprise.fleetAvaliableColor;
            this.reservedfleetcolor = fleetObj.enterprise.fleetReservedColor;
            this.inactivefleetcolor = fleetObj.enterprise.fleetInactiveColor;
            this.checkinfleetcolor = fleetObj.enterprise.fleetCheckinColor;
            this.fleettransactablecolor = fleetObj.enterprise.fleetNonTransactableColor;
            this.editfleetTypes = fleetObj.fleetTypes;
            this.fleetAvaliableColorCode = fleetObj.enterprise.fleetAvaliableColorCode;
            this.reservedfleetcolorCode = fleetObj.enterprise.fleetReservedColorCode;
            this.checkinfleetcolorCode = fleetObj.enterprise.fleetCheckinColorCode;
            this.fleettransactablecolorCode = fleetObj.enterprise.fleetNonTransactableColorCode;
            this.fleetTypeArray = [];
            this.count = fleetObj.fleetTypes.length;
            this.getFleetColors();
            this.getfleeticons();
            this.updateAt = moment(fleetObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss')
                + ' ' + this.timezoneCode.split('-')[0];
            this.createAt = moment(fleetObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss')
                + ' ' + this.timezoneCode.split('-')[0];
            this.childModal.show();
        } else if (updateaction === 'VIEW') {
            this.part1 = this.translateService.get('COMMON_PAGE_TITLES.VIEW_FLEET');
            this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
            this.pagename = this.part1.value + this.fleetCommonName + this.part2.value;
            this.editfleetTypes = fleetObj.fleetTypes;
            this.enterpriseId = fleetObj.enterprise.enterpriseId._id;
            for (let i = 0; i < this.editfleetTypes.length; i++) {
                if (this.editfleetTypes[i].isSpecial === 'true') {
                    this.editfleetTypes[i].isSpecial = true;
                } else if (this.editfleetTypes[i].isSpecial === 'false') {
                    this.editfleetTypes[i].isSpecial = false;
                }
            }
            this.selectedObj = fleetObj;
            this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
            this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
            this.availablefleetcolor = fleetObj.enterprise.fleetAvaliableColor;
            this.reservedfleetcolor = fleetObj.enterprise.fleetReservedColor;
            this.inactivefleetcolor = fleetObj.enterprise.fleetInactiveColor;
            this.checkinfleetcolor = fleetObj.enterprise.fleetCheckinColor;
            this.fleettransactablecolor = fleetObj.enterprise.fleetNonTransactableColor;
            this.viewfleetTypes = fleetObj.fleetTypes;
            this.updateAt = moment(fleetObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss')
                + ' ' + this.timezoneCode.split('-')[0];
            this.createAt = moment(fleetObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss')
                + ' ' + this.timezoneCode.split('-')[0];

        } else if (updateaction === 'DELETE') {
            this.part1 = this.translateService.get('COMMON_PAGE_TITLES.DELETE_FLEET');
            this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
            this.pagename = this.part1.value + this.fleetCommonName + this.part2.value;
            this.selectedObj = fleetObj;
            this.fleetid = this.selectedObj._id;
            this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
            this.enterpriseId = this.selectedObj.enterprise.enterpriseId._id;
            this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
            this.availablefleetcolor = fleetObj.enterprise.fleetAvaliableColor;
            this.reservedfleetcolor = fleetObj.enterprise.fleetReservedColor;
            this.inactivefleetcolor = fleetObj.enterprise.fleetInactiveColor;
            this.checkinfleetcolor = fleetObj.enterprise.fleetCheckinColor;
            this.fleettransactablecolor = fleetObj.enterprise.fleetNonTransactableColor;
            this.viewfleetTypes = fleetObj.fleetTypes;
            this.updateAt = moment(fleetObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss')
                + ' ' + this.timezoneCode.split('-')[0];
            this.createAt = moment(fleetObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss')
                + ' ' + this.timezoneCode.split('-')[0];
        }
        this.childModal.show();
    }

    /**---- To set the values from universal data ----*/
    universalUploaded(event) {
        this.imgSrc1 = event.split('$')[0];
        const i = event.split('$')[2];
        document.getElementById('imageIcon' + i).className = event.split('$')[0];
    }
    /**---- To set the values from universal data ----*/
    iconChange(event) {
        this.imgSrc1 = event.split('$')[0];
        const i = event.split('$')[2];
        document.getElementById('imageIcon1' + i).className = event.split('$')[0];
    }
    /**---- To get avaliable colorcode ----*/
    availablecolor(event) {
        this.availablefleetcolor = event.split('$')[0];
        this.fleetAvaliableColorCode = event.split('$')[1];
}
    /**---- To get avaliable colorcode ----*/
    checkincolor(event) {
        this.checkinfleetcolor = event.split('$')[0];
        this.checkinfleetcolorCode = event.split('$')[1];
    }
    /**---- To get avaliable colorcode ----*/
    reservedcolor(event) {
        this.reservedfleetcolor = event.split('$')[0];
        this.reservedfleetcolorCode = event.split('$')[1];
    }
    /**---- To get avaliable colorcode ----*/
    transactablecolor(event) {
        this.fleettransactablecolor = event.split('$')[0];
        this.fleettransactablecolorCode = event.split('$')[1];
    }
    disablingfield(i, checkedValue) {
        const eventEnablevalue = 'reservable' + i;
        const transctablevalue = 'istransctable' + i;
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        const transctable = <HTMLInputElement>document.getElementById(transctablevalue);
        if (checkedValue) {
            eventEnable.checked = false;
            transctable.checked = false;
            eventEnable.disabled = true;
            transctable.disabled = true;
        } else {
            eventEnable.checked = true;
            transctable.checked = true;
            eventEnable.disabled = false;
            transctable.disabled = false;
        }
    }

    disablingEnablefield(i, checkedValue) {
        const eventEnablevalue = 'reservable' + i;
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        if (checkedValue) {
            eventEnable.disabled = false;
        } else {
            eventEnable.checked = false;
            eventEnable.disabled = true;
        }
    }
    disablingeditExistfield(i, checkedValue) {
        const eventEnablevalue = 'reservable' + i;
        const transctablevalue = 'transctable' + i;
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        const transctable = <HTMLInputElement>document.getElementById(transctablevalue);
        if (checkedValue) {
            eventEnable.checked = false;
            transctable.checked = false;
            eventEnable.disabled = true;
            transctable.disabled = true;
        } else {
            eventEnable.checked = true;
            transctable.checked = true;
            eventEnable.disabled = false;
            transctable.disabled = false;
        }
    }
    disablingeditExistEnablefield(i, checkedValue) {
        const specialvalue = 'special' + i;
        const eventEnablevalue = 'reservable' + i;
        const transctablevalue = 'transctable' + i;
        const special = <HTMLInputElement>document.getElementById(specialvalue);
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        const transctable = <HTMLInputElement>document.getElementById(transctablevalue);
        if (special.checked) {
            eventEnable.disabled = true;
            transctable.disabled = true;
            eventEnable.checked = false;
            transctable.checked = false;
        } else {
            if (checkedValue) {
                eventEnable.disabled = false;
            } else {
                eventEnable.checked = false;
                eventEnable.disabled = true;
            }
        }
    }

    disablingEditfield(i, checkedValue) {
        const eventEnablevalue = 'editreservable' + i;
        const transctablevalue = 'editransctable' + i;
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        const transctable = <HTMLInputElement>document.getElementById(transctablevalue);
        if (checkedValue) {
            eventEnable.checked = false;
            transctable.checked = false;
            eventEnable.disabled = true;
            transctable.disabled = true;
        } else {
            eventEnable.checked = true;
            transctable.checked = true;
            eventEnable.disabled = false;
            transctable.disabled = false;
        }
    }

    disablingEditEnablefield(i, checkedValue) {
        const eventEnablevalue = 'editreservable' + i;
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        if (checkedValue) {
            eventEnable.disabled = false;
        } else {
            eventEnable.checked = false;
            eventEnable.disabled = true;
        }
    }
    disablingeditExistEventfield(i, checkedValue) {
        const specialvalue = 'special' + i;
        const eventEnablevalue = 'reservable' + i;
        const transctablevalue = 'transctable' + i;
        const special = <HTMLInputElement>document.getElementById(specialvalue);
        const eventEnable = <HTMLInputElement>document.getElementById(eventEnablevalue);
        const transctable = <HTMLInputElement>document.getElementById(transctablevalue);
        if (special.checked) {
            eventEnable.disabled = true;
            transctable.disabled = true;
            eventEnable.checked = false;
            transctable.checked = false;
        } else {
            if (transctable.checked) {
                eventEnable.disabled = false;
            } else {
                eventEnable.checked = false;
                eventEnable.disabled = true;
            }
        }
    }

    fleetTypeNameEdit(fleetTypesNamesObj, enterpriseId) {
        this.fleetTypeService.getUsedFleetTypeList(this.userToken, fleetTypesNamesObj, enterpriseId)
            .subscribe(data => {
                this.editfleetTypes = data.result;
            });
    }

    /**---- To get the enterprises list ----*/
    public getEnterprisesList() {
        this.fleetTypeService.getEnterprices(this.userToken)
            .subscribe(data => {
                if (data.statusCode === '1001') {
                    const list = window.localStorage.getItem('createtedenterpriselist');
                    this.enterprisesSize = false;
                    const enterpriseslist = data['result'];
                    for (let i = 0; i < list.length; i++) {
                        for (let j = 0; j < enterpriseslist.length; j++) {
                            if (parseInt(list[i]) === enterpriseslist[j]._id) {
                                enterpriseslist.splice(j, 1);
                            }
                        }
                    }
                    this.enterprisesNames = enterpriseslist;
                }
            });
    }

    /**---- To split the enterprise id and name  ----- */
    getEnterpriseResources(type) {
        this.value = type.split('~');
        this.enterpriseId = this.value[0];
        this.enterprisesName = this.value[1];
        this.enterpriseIconFilePath = this.value[2] + '/' + this.value[3];
        if (this.enterpriseId === '') {
            this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
        }
    }

    /**---- To get fleet colors from lookup data ----*/
    getFleetColors() {
        const userToken = window.localStorage.getItem('token');
        this.fleetTypeService.getLookupsList(userToken, 'FLEET_COLOR_CODES').subscribe(
            data => {
                this.colorlist = data['result'];
            });
    }

    /**----To add row ----*/
    addrow() {
        this.error = '';
        const fleetTypehtmlname = document.getElementsByName('fleetTypeName');
        const fleetIconhtmlname = document.getElementsByName('displayIconName');
        for (let i = 0; i < fleetTypehtmlname.length + 1; i++) {
            if (i < fleetTypehtmlname.length) {
                const fleetIcon = <HTMLInputElement>document.getElementById(fleetIconhtmlname[i].id);
                const fleetIconvalue = fleetIcon.value;
                const fleetType = <HTMLInputElement>document.getElementById(fleetTypehtmlname[i].id);
                const fleetTypevalue = fleetType.value;
                if (fleetTypevalue === '') {
                    this.error = 'ENTERPRISE_SETTINGS.FLEET_TYPES_FIELDS';
                    break;
                }
            }
            if (this.error === '' && i === fleetTypehtmlname.length) {
                if (this.count < this.fleetTypeLength) {
                    this.fleetTypeArray[this.lengthCheck] = true;
                    this.lengthCheck = this.lengthCheck + 1;
                    this.count += 1;
                } else {
                    this.error = 'FLEET_TYPES.VALID_ROW_ADD';
                }
            }
        }
    }

    /**---- To delete row ----*/
    removerow(i: number) {
        this.error = '';
        if (this.count > 1) {
            this.count = this.count - 1;
            // document.getElementById('test' + i).style.display = 'none';
            document.getElementById('test' + i).innerHTML = '';
        } else {
            this.part1 = this.translateService.get('FLEET_TYPES.VALID_ROW_REMOVE');
            this.part2 = this.translateService.get('FLEET_TYPES.TYPE_SHOULD_ATLEAST');
            this.error = this.part1.value + ' ' + this.fleetCommonName + '' + this.part2.value;
        }
    }

    /**---- To get fleet type icons from lookup data ----*/
    getfleeticons() {
        const userToken = window.localStorage.getItem('token');
        this.fleetTypeService.getLookupsList(userToken, 'FLEET_TYPE_ICONS').subscribe(
            data => {
                this.universalimgs = data['result'];
            });
    }

    /**----To add row ----*/
    editaddrow() {
        this.error = '';
        const existsFleetTypehtmlName = document.getElementsByName('editExistsFleetTypeName');
        const editExistsDisplayIconhtmlName = document.getElementsByName('editExistsDisplayIconName');
        const fleetTypehtmlname = document.getElementsByName('editFleetTypeName');
        const fleetIconhtmlname = document.getElementsByName('editDisplayIconName');
        let k = 0;
        let check;
        if (this.editfleetTypes.length === 0) {
            const length = 1;
            check = 1;
        } else {
            const length = 0;
            check = 1;
        }
        for (let i = 0 + length; i < fleetTypehtmlname.length + 2; i++) {
            if (k !== this.editfleetTypes.length) {
                for (k = 0; k < this.editfleetTypes.length; k++) {
                    const fleetIcon = <HTMLInputElement>document.getElementById(editExistsDisplayIconhtmlName[k].id);
                    const fleetIconvalue = fleetIcon.value;
                    const fleetType = <HTMLInputElement>document.getElementById(existsFleetTypehtmlName[k].id);
                    const fleetTypevalue = fleetType.value;
                    if (fleetTypevalue === '') {
                        this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.PLEASE_FILL');
                        this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
                        this.error = this.part1.value + ' ' + this.fleetCommonName + ' ' + this.part2.value;
                        break;
                    }
                }
            } else {
                const fleetIcon = <HTMLInputElement>document.getElementById(fleetIconhtmlname[i - check].id);
                const fleetIconvalue = fleetIcon.value;
                const fleetType = <HTMLInputElement>document.getElementById(fleetTypehtmlname[i - check].id);
                const fleetTypevalue = fleetType.value;
                if (fleetTypevalue === '') {
                    this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.PLEASE_FILL');
                    this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
                    this.error = this.part1.value + ' ' + this.fleetCommonName + ' ' + this.part2.value;
                    break;
                }
            }
            if (this.error === '' && i === fleetTypehtmlname.length) {
                if (this.count < this.fleetTypeLength) {
                    this.fleetTypeArray[this.count1] = true;
                    this.count1 += check;
                    this.count += check;
                } else {
                    this.error = 'FLEET_TYPES.VALID_ROW_ADD';
                }
            }
        }
    }

    /**---- To delete row ----*/
    editremoverow(i: number) {
        this.error = '';
        if (this.count > 1) {
            this.count1 -= 1;
            //this.fleetTypeArray[this.count1] = false;
            this.count = this.count - 1;
            // document.getElementById('testedit' + i).style.display = 'none';
            document.getElementById('testedit' + i).innerHTML = '';
        } else {
            this.part1 = this.translateService.get('FLEET_TYPES.VALID_ROW_REMOVE');
            this.part2 = this.translateService.get('FLEET_TYPES.TYPE_SHOULD_ATLEAST');
            this.error = this.part1.value + ' ' + this.fleetCommonName + '' + this.part2.value;
        }
    }

    /**---- To delete existed data row ----*/
    removeExistrow(i: number) {
        this.error = '';
        if (this.count > 1) {
            this.count = this.count - 1;
            this.editfleetTypes.splice(i, 1);
        } else {
            this.part1 = this.translateService.get('FLEET_TYPES.VALID_ROW_REMOVE');
            this.part2 = this.translateService.get('FLEET_TYPES.TYPE_SHOULD_ATLEAST');
            this.error = this.part1.value + ' ' + this.fleetCommonName + '' + this.part2.value;
        }
    }

    /**---- To create the fleet type ----*/
    createFleetType() {
        this.validcolor = false;
        let validfleettype = false;
        this.validtype = false;
        this.validicon = false;
        this.validfail = false;
        const fleetTypehtmlname = document.getElementsByName('fleetTypeName');
        const fleetIconhtmlname = document.getElementsByName('displayIconName');
        // const fleetColorhtmlname = document.getElementsByName('colorName');
        const specialcheckbox = document.getElementsByName('specialcheck');
        const reservablecheckbox = document.getElementsByName('reservablecheck');
        const istransctablecheckbox = document.getElementsByName('istransctablecheck');
        this.fleettypes = [];
        for (let i = 0; i < fleetTypehtmlname.length; i++) {
            // const fleetColor = <HTMLInputElement>document.getElementById(fleetColorhtmlname[i].id);
            // const fleetColorvalue = fleetColor.value;
            const fleetIcon = <HTMLInputElement>document.getElementById(fleetIconhtmlname[i].id);
            const fleetIconvalue = fleetIcon.value;
            const fleetType = <HTMLInputElement>document.getElementById(fleetTypehtmlname[i].id);
            const fleetTypevalue = fleetType.value;
            const specialcheck = <HTMLInputElement>document.getElementById(specialcheckbox[i].id);
            const specialcheckvalue = specialcheck.checked;
            const reservablecheck = <HTMLInputElement>document.getElementById(reservablecheckbox[i].id);
            const reservablecheckvalue = reservablecheck.checked;
            const istransctable = <HTMLInputElement>document.getElementById(istransctablecheckbox[i].id);
            const istransctablevalue = istransctable.checked;
            const level = fleetTypevalue.split('-')[0];
            let fleetTypeName = fleetTypevalue.split('-')[1];
            if (fleetTypevalue.split('-')[2]) {
                fleetTypeName = fleetTypevalue.split('-').slice(1).toString().replace(',', '');
            }
            if (document.getElementById('test' + i).style.display !== 'none') {
                if (fleetTypevalue !== '' && this.validcolor === false
                    && this.validtype === false && fleetTypeName !== ''
                    && fleetTypeName !== undefined && fleetTypeName !== null) {
                    this.fleettypes.push({ 'fleetTypeIconName': '', 'fleetTypeName': '', 'fleetTypeIcon': '', 'fleetTypeColor': '' });
                    if (this.fleettypes.length === 1) {
                        //  this.fleettypes[0].fleetTypeColor = fleetColorvalue;
                        this.fleettypes[0].fleetTypeIcon = fleetIconvalue.split('$')[0];
                        this.fleettypes[0].fleetTypeIconName = fleetIconvalue.split('$')[1];
                        this.fleettypes[0].fleetTypeName = fleetTypevalue;
                        this.fleettypes[0].isSpecial = specialcheckvalue.toString();
                        this.fleettypes[0].isEventsEnabled = reservablecheckvalue.toString();
                        this.fleettypes[0].isTransactable = istransctablevalue.toString();
                    } else {
                        for (let j = 0; j < this.fleettypes.length - 1; j++) {
                            const fleetTypeLevelvalue = this.fleettypes[j].fleetTypeName.split('-')[0];
                           let fleetTypeNamevalue = this.fleettypes[j].fleetTypeName.split('-')[1];
                            if ( this.fleettypes[j].fleetTypeName.split('-')[2]) {
                                fleetTypeNamevalue =  this.fleettypes[j].fleetTypeName.split('-').slice(1).toString().replace(',', '');
                            }
                            // if (fleetColorvalue !== '' && this.fleettypes[j].fleetTypeColor === fleetColorvalue) {
                            //     this.validcolor = true;
                            //     break;
                            // } else
                            if (fleetIconvalue !== '' && this.fleettypes[j].fleetTypeIcon === fleetIconvalue.split('$')[0]) {
                                this.validicon = true;
                                break;
                            } else if (fleetTypeLevelvalue === level || fleetTypeName.toLowerCase() === fleetTypeNamevalue.toLowerCase()) {
                                this.validtype = true;
                                break;
                            } else {
                                const index = this.fleettypes.length - 1;
                                // this.fleettypes[index].fleetTypeColor = fleetColorvalue;
                                this.fleettypes[index].fleetTypeIcon = fleetIconvalue.split('$')[0];
                                this.fleettypes[index].fleetTypeIconName = fleetIconvalue.split('$')[1];
                                this.fleettypes[index].fleetTypeName = fleetTypevalue;
                                this.fleettypes[index].isSpecial = specialcheckvalue.toString();
                                this.fleettypes[index].isEventsEnabled = reservablecheckvalue.toString();
                                this.fleettypes[index].isTransactable = istransctablevalue.toString();
                                this.validfail = false;
                            }
                        }
                    }
                } else if (fleetTypeName === '' || fleetTypeName === undefined || fleetTypeName === null) {
                    validfleettype = true;
                    break;
                } else {
                    this.validfail = true;
                    break;
                }
            }
        }
        if (this.enterprisesName === '' || this.enterprisesName === undefined || this.enterprisesName === null) {
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
            // } else if (this.validcolor) {
            //     this.error = 'ENTERPRISE_SETTINGS.INCORRECT_DISPLAY_ICON_SELECT';
        } else if (this.availablefleetcolor === '' || this.availablefleetcolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.AVAILABLE_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.checkinfleetcolor === '' || this.checkinfleetcolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.CHECKIN_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
            // } else if (this.availablefleetcolor === '' || this.availablefleetcolor === null) {
            //     this.error = 'ENTERPRISE_SETTINGS.VALID_NOBLANK_AVAILABLE_FLEET_COLOR'
        } else if (this.reservedfleetcolor === '' || this.reservedfleetcolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.RESERVED_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.fleettransactablecolor === '' || this.fleettransactablecolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.NONTRANSACTABLE_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.availablefleetcolor === this.reservedfleetcolor || this.availablefleetcolor === this.fleettransactablecolor ||
            this.availablefleetcolor === this.checkinfleetcolor || this.reservedfleetcolor === this.fleettransactablecolor ||
            this.reservedfleetcolor === this.checkinfleetcolor || this.fleettransactablecolor === this.checkinfleetcolor) {
            this.error = this.translateService.get('ENTERPRISE_SETTINGS.INCORRECT_COLOR_SELECT');
            this.error = this.fleetCommonName + this.error.value;
        } else if (this.validicon) {
            this.error = 'ENTERPRISE_SETTINGS.INCORRECT_DISPLAY_ICON_SELECT';
        } else if (validfleettype) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.INCORRECT_INVALID_FLEET_TYPES_FORMAT');
            this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.validtype) {
            this.part1 = this.translateService.get('FLEET_TYPES.SAME');
            this.part2 = this.translateService.get('FLEET_TYPES.TYPE_NAME_ALREADY_EXIST');
            this.error = this.part1.value + ' ' + this.fleetCommonName + '' + this.part2.value;
        } else {
            const fleettypesData = {
                'fleetTypes': this.fleettypes,
                'enterprise': {
                    'enterpriseId': this.enterpriseId,
                    'enterpriseName': this.autocase(this.enterprisesName.trim()),
                    'fleetAvaliableColor': this.availablefleetcolor,
                    'fleetNonTransactableColor': this.fleettransactablecolor,
                    'fleetReservedColor': this.reservedfleetcolor,
                    'fleetCheckinColor': this.checkinfleetcolor,
                    'fleetAvaliableColorCode': this.fleetAvaliableColorCode,
                    'fleetReservedColorCode': this.reservedfleetcolorCode,
                    'fleetCheckinColorCode': this.checkinfleetcolorCode,
                    'fleetNonTransactableColorCode': this.fleettransactablecolorCode
                },
            };
            this.fleetTypeService.createFleetType(fleettypesData, this.userToken)
                .subscribe(data => {
                    this.hideChildModal();
                    this.uploaded.emit();
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
                            } else if (statuscode === '2011') {
                                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                                this.toastr.success(this.toastermessage.value);
                            } else if (statuscode === '2033') {
                                this.error = 'COMMON_STATUS_CODES.' + statuscode;
                            }
                            break;
                    }
                });
        }
    }

    /**---- To update the fleet type image ----*/
    updateFleetTypes() {
        this.validcolor = false;
        this.validtype = false;
        this.validicon = false;
        this.validfail = false;
        let validfleettype = false;
        const existsFleetTypehtmlName = document.getElementsByName('editExistsFleetTypeName');
        const editExistsDisplayIconhtmlName = document.getElementsByName('editExistsDisplayIconName');
        // const editExistsColorhtmlName = document.getElementsByName('editExistsColorName');
        const editExistsSpecialcheckbox = document.getElementsByName('editExistsspecialcheckName');
        const editExistsreservablecheckbox = document.getElementsByName('editExistsreservablecheckName');
        const fleetTypehtmlname = document.getElementsByName('editFleetTypeName');
        const fleetIconhtmlname = document.getElementsByName('editDisplayIconName');
        // const fleetColorhtmlname = document.getElementsByName('editColorName');
        const editspecialcheckbox = document.getElementsByName('editspecialcheck');
        const editreservablecheckbox = document.getElementsByName('editreservablecheck');
        const editransctablecheckbox = document.getElementsByName('editransctablecheck');
        const editExisttransctablecheckbox = document.getElementsByName('editExisttransctablecheck');
        this.fleettypes = [];
        let k = 0;
        let check;
        if (this.editfleetTypes.length === 0) {
            const length = 1;
            check = 0;
        } else {
            const length = fleetTypehtmlname.length + 1;
            check = 1;
        }
        for (let i = 0; i < length; i++) {
            if (k !== this.editfleetTypes.length) {
                for (k = 0; k < this.editfleetTypes.length; k++) {
                    // const fleetColor = <HTMLInputElement>document.getElementById(editExistsColorhtmlName[k].id);
                    // const fleetColorvalue = fleetColor.value;
                    const fleetIcon = <HTMLInputElement>document.getElementById(editExistsDisplayIconhtmlName[k].id);
                    const fleetIconvalue = fleetIcon.value;
                    const fleetType = <HTMLInputElement>document.getElementById(existsFleetTypehtmlName[k].id);
                    const fleetTypevalue = fleetType.value;
                    const editspecialcheck = <HTMLInputElement>document.getElementById(editExistsSpecialcheckbox[k].id);
                    const editspecialcheckvalue = editspecialcheck.checked;
                    const editreservablecheck = <HTMLInputElement>document.getElementById(editExistsreservablecheckbox[k].id);
                    const editreservablecheckvalue = editreservablecheck.checked;
                    const editExisttransctablecheck = <HTMLInputElement>document.getElementById(editExisttransctablecheckbox[k].id);
                    const editExisttransctablecheckvalue = editExisttransctablecheck.checked;
                    const level = fleetTypevalue.split('-')[0];
                    let fleetTypeName = fleetTypevalue.split('-')[1];
                    if (fleetTypevalue.split('-')[2]) {
                        fleetTypeName = fleetTypevalue.split('-').slice(1).toString().replace(',', '');
                    }
                    if (fleetTypevalue !== '' && this.validcolor === false
                        && this.validtype === false
                        && fleetTypeName !== undefined && fleetTypeName !== null) {
                        this.fleettypes.push({ 'fleetTypeIconName': '', 'fleetTypeName': '', 'fleetTypeIcon': '', 'fleetTypeColor': '' });
                        if (this.fleettypes.length === 1) {
                            // this.fleettypes[0].fleetTypeColor = fleetColorvalue;
                            this.fleettypes[0].fleetTypeIcon = fleetIconvalue.split('$')[0];
                            this.fleettypes[0].fleetTypeIconName = fleetIconvalue.split('$')[1];
                            this.fleettypes[0].fleetTypeName = fleetTypevalue;
                            this.fleettypes[0].isSpecial = editspecialcheckvalue.toString();
                            this.fleettypes[0].isEventsEnabled = editreservablecheckvalue.toString();
                            this.fleettypes[0].isTransactable = editExisttransctablecheckvalue.toString();
                        } else {
                            for (let j = 0; j < this.fleettypes.length - 1; j++) {
                                const fleetTypeLevelvalue = this.fleettypes[j].fleetTypeName.split('-')[0];
                               let fleetTypeNamevalue = this.fleettypes[j].fleetTypeName.split('-')[1];
                                if ( this.fleettypes[j].fleetTypeName.split('-')[2]) {
                                    fleetTypeNamevalue =  this.fleettypes[j].fleetTypeName.split('-').slice(1).toString().replace(',', '');
                                }
                                if (fleetIconvalue !== '' && this.fleettypes[j].fleetTypeIcon === fleetIconvalue.split('$')[0]) {
                                    this.validicon = true;
                                    break;
                                } else if (fleetTypeLevelvalue === level
                                    || fleetTypeName.toLowerCase() === fleetTypeNamevalue.toLowerCase()) {
                                    this.validtype = true;
                                    break;
                                } else {
                                    const index = this.fleettypes.length - 1;
                                    // this.fleettypes[index].fleetTypeColor = fleetColorvalue;
                                    this.fleettypes[index].fleetTypeIcon = fleetIconvalue.split('$')[0];
                                    this.fleettypes[index].fleetTypeIconName = fleetIconvalue.split('$')[1];
                                    this.fleettypes[index].fleetTypeName = fleetTypevalue;
                                    this.fleettypes[index].isSpecial = editspecialcheckvalue.toString();
                                    this.fleettypes[index].isEventsEnabled = editreservablecheckvalue.toString();
                                    this.fleettypes[index].isTransactable = editExisttransctablecheckvalue.toString();
                                    this.validfail = false;
                                }
                            }
                        }
                    } else if (fleetTypeName === '' || fleetTypeName === undefined || fleetTypeName === null) {
                        validfleettype = true;
                        break;
                    } else {
                        this.validfail = true;
                        break;
                    }
                }
            } else {
                // const fleetColor = <HTMLInputElement>document.getElementById(fleetColorhtmlname[i - 1].id);
                // const fleetColorvalue = fleetColor.value;
                const fleetIcon = <HTMLInputElement>document.getElementById(fleetIconhtmlname[i - check].id);
                const fleetIconvalue = fleetIcon.value;
                const fleetType = <HTMLInputElement>document.getElementById(fleetTypehtmlname[i - check].id);
                const fleetTypevalue = fleetType.value;
                const editspecialcheck = <HTMLInputElement>document.getElementById(editspecialcheckbox[i - check].id);
                const editspecialcheckvalue = editspecialcheck.checked;
                const editreservablecheck = <HTMLInputElement>document.getElementById(editreservablecheckbox[i - check].id);
                const editreservablecheckvalue = editreservablecheck.checked;
                const editransctablecheck = <HTMLInputElement>document.getElementById(editransctablecheckbox[i - check].id);
                const editransctablecheckvalue = editransctablecheck.checked;
                const level = fleetTypevalue.split('-')[0];
                let fleetTypeName = fleetTypevalue.split('-')[1];
                if (fleetTypevalue.split('-')[2]) {
                    fleetTypeName = fleetTypevalue.split('-').slice(1).toString().replace(',', '');
                }
                if (this.fleetTypeArray[i - check]) {
                    if (fleetTypevalue !== '' && this.validcolor === false
                        && this.validtype === false && fleetTypeName !== ''
                        && fleetTypeName !== undefined && fleetTypeName !== null) {
                        this.fleettypes.push({ 'fleetTypeIconName': '', 'fleetTypeName': '', 'fleetTypeIcon': '', 'fleetTypeColor': '' });
                        for (let j = 0; j < this.fleettypes.length - check; j++) {
                            const fleetTypeLevelvalue = this.fleettypes[j].fleetTypeName.split('-')[0];
                           let fleetTypeNamevalue = this.fleettypes[j].fleetTypeName.split('-')[1];
                            if ( this.fleettypes[j].fleetTypeName.split('-')[2]) {
                                fleetTypeNamevalue =  this.fleettypes[j].fleetTypeName.split('-').slice(1).toString().replace(',', '');
                            }
                            if (this.fleettypes.length === 1) {
                                // this.fleettypes[0].fleetTypeColor = fleetColorvalue;
                                this.fleettypes[0].fleetTypeIcon = fleetIconvalue.split('$')[0];
                                this.fleettypes[0].fleetTypeIconName = fleetIconvalue.split('$')[1];
                                this.fleettypes[0].fleetTypeName = fleetTypevalue;
                                this.fleettypes[0].isSpecial = editspecialcheckvalue.toString();
                                this.fleettypes[0].isEventsEnabled = editreservablecheckvalue.toString();
                                this.fleettypes[0].isTransactable = editransctablecheckvalue.toString();
                            } else {
                                if (fleetIconvalue !== '' && this.fleettypes[j].fleetTypeIcon === fleetIconvalue.split('$')[0]) {
                                    this.validicon = true;
                                    break;
                                } else if (fleetTypeLevelvalue === level ||
                                    fleetTypeName.toLowerCase() === fleetTypeNamevalue.toLowerCase()) {
                                    this.validtype = true;
                                    break;
                                } else {
                                    const index = this.fleettypes.length - 1;
                                    // this.fleettypes[index].fleetTypeColor = fleetColorvalue;
                                    this.fleettypes[index].fleetTypeIcon = fleetIconvalue.split('$')[0];
                                    this.fleettypes[index].fleetTypeIconName = fleetIconvalue.split('$')[1];
                                    this.fleettypes[index].fleetTypeName = fleetTypevalue;
                                    this.fleettypes[index].isSpecial = editspecialcheckvalue.toString();
                                    this.fleettypes[index].isEventsEnabled = editreservablecheckvalue.toString();
                                    this.fleettypes[index].isTransactable = editransctablecheckvalue.toString();
                                    this.validfail = false;
                                }
                            }
                        }
                    } else if (fleetTypeName === '' || fleetTypeName === undefined || fleetTypeName === null) {
                        validfleettype = true;
                        break;
                    } else {
                        this.validfail = true;
                        this.row = i + 1;
                        break;
                    }
                }
            }
        }

        if (this.availablefleetcolor === '' || this.availablefleetcolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.AVAILABLE_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.checkinfleetcolor === '' || this.checkinfleetcolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.CHECKIN_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
            // } else if (this.availablefleetcolor === '' || this.availablefleetcolor === null) {
            //     this.error = 'ENTERPRISE_SETTINGS.VALID_NOBLANK_AVAILABLE_FLEET_COLOR'
        } else if (this.reservedfleetcolor === '' || this.reservedfleetcolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.RESERVED_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.fleettransactablecolor === '' || this.fleettransactablecolor === null) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.NONTRANSACTABLE_FLEET_COLOR');
            this.part2 = this.translateService.get('ENTERPRISE_SETTINGS.VALID_NOBLANK_FLEET_COLOR');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.availablefleetcolor === this.reservedfleetcolor || this.availablefleetcolor === this.fleettransactablecolor ||
            this.availablefleetcolor === this.checkinfleetcolor || this.reservedfleetcolor === this.fleettransactablecolor ||
            this.reservedfleetcolor === this.checkinfleetcolor || this.fleettransactablecolor === this.checkinfleetcolor) {
            this.error = this.translateService.get('ENTERPRISE_SETTINGS.INCORRECT_COLOR_SELECT');
            this.error = this.fleetCommonName + this.error.value;
        } else if (this.validicon) {
            this.error = 'ENTERPRISE_SETTINGS.INCORRECT_DISPLAY_ICON_SELECT';
        } else if (validfleettype) {
            this.part1 = this.translateService.get('ENTERPRISE_SETTINGS.INCORRECT_INVALID_FLEET_TYPES_FORMAT');
            this.part2 = this.translateService.get('FLEET_TYPES.FLEET_TYPE');
            this.error = this.part1.value + this.fleetCommonName + this.part2.value;
        } else if (this.validtype) {
            this.part1 = this.translateService.get('FLEET_TYPES.SAME');
            this.part2 = this.translateService.get('FLEET_TYPES.TYPE_NAME_ALREADY_EXIST');
            this.error = this.part1.value + ' ' + this.fleetCommonName + ' ' + this.part2.value;
        } else {
            const fleettypesData = {
                // 'isEnabled': this.enabled,
                'fleetTypes': this.fleettypes,
                'enterprise': {
                    'enterpriseId': this.enterpriseId,
                    'enterpriseName': this.autocase(this.enterprisesName.trim()),
                    'fleetAvaliableColor': this.availablefleetcolor,
                    'fleetNonTransactableColor': this.fleettransactablecolor,
                    'fleetReservedColor': this.reservedfleetcolor,
                    'fleetCheckinColor': this.checkinfleetcolor,
                    'fleetAvaliableColorCode': this.fleetAvaliableColorCode,
                    'fleetReservedColorCode': this.reservedfleetcolorCode,
                    'fleetCheckinColorCode': this.checkinfleetcolorCode,
                    'fleetNonTransactableColorCode': this.fleettransactablecolorCode
                },
            };
            this.fleetTypeService.updateFleetType(fleettypesData, this.userToken, this.fleetid)
                .subscribe(data => {
                    this.hideChildModal();
                    if (window.localStorage.getItem('fleettypeadvace') === ('fleettypeadvance')) {
                        (window.localStorage.setItem('fleettype', 'advanceupdate'));
                        window.localStorage.removeItem('fleettypeadvace');
                    } else if (window.localStorage.getItem('fleettypenormal') === ('fleettypenormal')) {
                        window.localStorage.setItem('fleettypesearch', 'fleettypenormalsearch');
                        window.localStorage.removeItem('fleettypenormal');
                    } else {
                        this.uploaded.emit();
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
                            } else if (statuscode === '2011') {
                                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                                this.toastr.success(this.toastermessage.value);
                            } else if (statuscode === '2033') {
                                this.error = 'COMMON_STATUS_CODES.' + statuscode;
                            }
                            break;
                    }
                });
        }
    }

    /**---- To delete the fleet type ----*/
    deleteFleetType() {
        const fleetTypeData = {
            'id': this.fleetid,
            'enterpriseId': this.enterpriseId,
            'fleetTypes': this.selectedObj.fleetTypes
        };
        this.fleetTypeService.deletefleettype(this.userToken, fleetTypeData)
            .subscribe(data => {
                const list = JSON.parse(window.localStorage.getItem('createtedenterpriselist'));
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === this.enterpriseId) {
                        list.splice(i, 1);
                    }
                }
                window.localStorage.setItem('createtedenterpriselist', JSON.stringify(list));
                this.hideChildModal();
                if (window.localStorage.getItem('fleettypeadvace') === ('fleettypeadvance')) {
                    (window.localStorage.setItem('fleettype', 'advanceupdate'));
                    window.localStorage.removeItem('fleettypeadvace');
                } else if (window.localStorage.getItem('fleettypenormal') === ('fleettypenormal')) {
                    window.localStorage.setItem('fleettypesearch', 'fleettypenormalsearch');
                } else {
                    this.uploaded.emit();
                }
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
                        } else if (statuscode === '2013') {
                            this.error = 'COMMON_STATUS_CODES.' + statuscode;
                        }
                }
            });
    }

    /**---- To auto capitailisation ----*/
    autocase(text) {
        if (text) {
            return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
                if (prefix && suffix) { return all; }
                return letter.toUpperCase() + word.toLowerCase();
            });
        } else { return ''; }
    }

    /**---- To clear the error messages ----*/
    clearmessage() {
        this.error = '';
        this.errMsg1 = '';
        this.errMsg2 = '';
    }

    /**---- To hide the popup model ----*/
    hideChildModal() {
        this.fleetTypeValue = '';
        this.enterprisesName = '';
        this.clearmessage();
        this.fleetTypeArray = [true];
        this.availablefleetcolor = '';
        this.inactivefleetcolor = '';
        this.fleettransactablecolor = '';
        this.reservedfleetcolor = '';
        this.checkinfleetcolor = '';
        this.count1 = 0;
        this.lengthCheck = 1;
        this.count = 1;
        if (this.updateaction === 'CREATE') {
            if (window.localStorage.getItem('fleettypeadvace') === ('fleettypeadvance')) {
                (window.localStorage.setItem('fleettype', 'advanceupdate'));
                window.localStorage.removeItem('fleettypeadvace');
            } else if (window.localStorage.getItem('fleettypenormal') === ('fleettypenormal')) {
                window.localStorage.setItem('fleettypesearch', 'fleettypenormalsearch');
                window.localStorage.removeItem('fleettypenormal');
            } else {
                this.uploaded.emit();
            }
        }
        this.childModal.hide();
    }
}
