/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

import {
    Component, OnInit, AfterContentChecked
} from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
// import { TranslateService } from 'ng2-translate';
// import { ModalDirective } from 'ngx-bootstrap/modal';
// import { ToastsManager } from 'ng2-toastr';


@Component({
    selector: 'map-page',
    templateUrl: './map.html',
    providers: []
})

export class MapComponent implements OnInit, AfterContentChecked {
    iFrameURL: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/map/pigeonmap/pigeonmap.html');
    /* Constructor for Advertisement Component */
    constructor(
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    /* Component Initalization */
    ngOnInit() {
        this.route.params.subscribe(param => {
            // let's say you want to get id parameter.
            switch (param['name']) {
                case 'enterprises': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('enterprisesmapURL'));
                    break;
                case 'users': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('usersmapURL'));
                    break;
                case 'enterpriseresource': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('enterpriseresourcemapURL'));
                    break;
                case 'fleets': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('fleetsmapURL'));
                    break;
                case 'events': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('eventsmapURL'));
                    break;
                case 'eventregistrations': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('eventregistrationsmapURL'));
                    break;
                case 'fleetreservations': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('fleetreservationsmapURL'));
                    break;
                case 'calls': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('callsmapURL'));
                    break;
                case 'message': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('messagemapURL'));
                    break;
                case 'multistop': this.iFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl
                    ('assets/map/pigeonmap/pigeonmap.html' + window.localStorage.getItem('multistopURL'));
                    break;
            }
        });
    }
    ngAfterContentChecked() {
        if (window.localStorage.getItem('pageevents') === 'events') {
            this.router.navigate(['/transactions/events']);
            window.localStorage.removeItem('pageevents');
        } else if (window.localStorage.getItem('pagefleets') === 'fleets') {
            this.router.navigate(['/enterprises/fleets']);
            window.localStorage.removeItem('pagefleets');
        } else if (window.localStorage.getItem('pageeventregistrations') === 'eventregistrations') {
            this.router.navigate(['/transactions/eventregistrations']);
            window.localStorage.removeItem('pageeventregistrations');
        } else if (window.localStorage.getItem('pagefleetreservations') === 'fleetreservations') {
            this.router.navigate(['/transactions/fleetreservations']);
            window.localStorage.removeItem('pagefleetreservations');
        } else if (window.localStorage.getItem('pageenterpriseresource') === 'enterpriseresource') {
            this.router.navigate(['/enterprises/enterprisesresourses']);
            window.localStorage.removeItem('pageenterpriseresource');
        } else if (window.localStorage.getItem('pagecallhistory') === 'callhistory') {
            this.router.navigate(['/history/calls']);
            window.localStorage.removeItem('pagecallhistory');
        } else if (window.localStorage.getItem('pagemessagehistory') === 'messagehistory') {
            this.router.navigate(['/history/messages']);
            window.localStorage.removeItem('pagemessagehistory');
        } else if (window.localStorage.getItem('pageusers') === 'users') {
            this.router.navigate(['/admin/users']);
            window.localStorage.removeItem('pageusers');
        } else if (window.localStorage.getItem('reservefleet') === 'reservefleet') {
            this.router.navigate(['/transactions/fleetreservations']);
            window.localStorage.removeItem('reservefleet');
        }
    }

}
