/**
 * ngOnInit(): To load the content at loading time.
 * showChildModal(updateaction, enterpriseobj): To open the popup model.
 * getFleetColors(): To get fleet colors from lookup data.
 * editEnterpriseSettings(): Submit methods for edit enterprise settings.
 * clearmessage(): To clear messages.
 * hideChildModal(): To hide the popup model.
 */
import {
    Component, OnInit, ViewChild, Inject, EventEmitter, Output, ViewContainerRef
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { MultiStopLocatorService } from './multistoplocator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-pickups-popup',
    templateUrl: 'multistoplocator.html',
    providers: [MultiStopLocatorService]
})

export class MultiStopLocatorComponent implements OnInit {
    @Output() uploaded: EventEmitter<string> = new EventEmitter();
    toastermessage: any;
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
    userpreferedtimezone: any;
    validicon = false;

    @ViewChild('childModal') public childModal: ModalDirective;
    constructor(private multiStopLocatorService: MultiStopLocatorService,
        private translateService: TranslateService,
        public toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private sanitizer: DomSanitizer, private router: Router,
        @Inject('apiEndPoint') public apiEndPoint: string) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    /**----- To load the content at loading time ----*/
    ngOnInit() {
        this.userToken = window.localStorage.getItem('token');
        this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
        this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
        this.userpreferedtimezone = this.timezoneCode.split('-')[0];
    }

    /**---- To open the popup model ----*/
    public showChildModal(updateaction, enterpriseobj): void {
        this.updateaction = updateaction;
        this.selectedObj = enterpriseobj;
        this.enterpriseIconFilePath = enterpriseobj.enterprise.enterpriseId.enterpriseIconFilePath
            + '/' + enterpriseobj.enterprise.enterpriseId.enterpriseIcon;
        if (this.updateaction === 'VIEW') {
            this.pagename = 'View Pick Ticket';
        } else if (this.updateaction === 'CANCEL') {
            this.pagename = 'Cancel Pick Ticket';
        } else if (this.updateaction === 'DELETE') {
            this.pagename = 'Delete Pick Ticket';
        } else if (this.updateaction === 'EDIT') {
            this.pagename = 'Edit Pick Ticket';
        } else if (this.updateaction === 'ASSIGN') {
            this.pagename = 'Assign Pick Ticket';
            this.selectedObj.status = 'Assigned';
            this.selectedObj.assignedTo = window.localStorage.getItem('first_name') + '  ' + window.localStorage.getItem('last_name');
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_ASSIGN_SUCCESS');
            this.toastr.success(this.toastermessage.value);
        }
        if (this.updateaction !== 'ASSIGN') {
            this.childModal.show();
        }
    }
    deletePickTicket(pickTicketId) {
        this.childModal.hide();
    }
    cancelPickTicket(pickTicketId) {
        this.childModal.hide();
    }
    editPickTicket(pickTicketObj) {
        let k = 0;
        for (let i = 0; i < pickTicketObj.deliveries.length; i++) {
            const pickedQty = <HTMLInputElement>document.getElementById('pickedQtyId' + [i]);
            const pickedQtyvalue = pickedQty.value;
            if (pickTicketObj.deliveries[i].pickQty < pickedQtyvalue) {
                this.validicon = true;
                k = i + 1;
                break;
            } else {
                pickTicketObj.deliveries[i].pickedQty = pickedQtyvalue;
            }
        }
        if (this.validicon) {
            this.error = 'please enter Picked Quantity less or equal to Pick Quantity in row' + k;
        } else {
            this.childModal.hide();
        }
    }

    /**---- To clear messages ----*/
    clearmessage() {
        this.error = '';
    }

    /**---- To hide the popup model ----*/
    hideChildModal() {
        this.childModal.hide();
    }

}
