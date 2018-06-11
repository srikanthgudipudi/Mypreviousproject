/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/


import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FleetService } from '../enterprises/fleets/fleetpopup/fleet.service';


import * as moment from 'moment/moment';

import 'fullcalendar';
import { FleetReservationsService } from '../transactions/fleetreservations/fleetreservationlist/fleetreservations.service';

@Component({
    templateUrl: 'calendar.html',
    providers: [FleetReservationsService, FleetService]
})
export class CalendarComponent implements OnInit, AfterContentChecked {
    stacked = '';
    events: any = [];
    headerConfig: any;
    userToken: any;
    utctimezone: any;
    utctimezonestring: any;
    userpreferedtimezone: any;
    date: any;
    options: any;
    CalendarStartDate: any;
    CalendarEndDate: any;
    fleetid: any;
    eventsenabled: any;
    calendartime: any;
    hours: any;
    minutes: any;
    clickeddate: any;
    tosplit: any;
    currenttime: any;
    @ViewChild('fc') fullCal: any;
    constructor(private fleetReservationsService: FleetReservationsService, private fleetService: FleetService,
        private router: Router) {

    }

    /*----- Getting Notifications while loading page------ */
    ngOnInit() {
        window.localStorage.removeItem('calendarDate');
        this.userToken = window.localStorage.getItem('token');
        const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
        const timezonevalue = defaulttimezoneCode.split('(UTC');
        const utcformat = timezonevalue[0].split('-');
        this.userpreferedtimezone = utcformat[0].trim();
        const utcval = timezonevalue[1].split(')');
        this.utctimezone = utcval[0];
        this.utctimezonestring = utcval[0].toString();
        if (window.localStorage.getItem('calendarfrom') !== 'Events' &&
            window.localStorage.getItem('calendarfrom') !== 'Fleetreservation' &&
            window.localStorage.getItem('calendarfrom') !== 'Fleetscalendar') {
            this.getFleetReservationsList();
        }
        this.date = window.localStorage.getItem('clickedDate');
        this.options = {
            customButtons: {
                myCustomButton: {
                    text: 'List',
                    click: function () {
                        this.goToFleetreservations();
                    }
                }
            }
        };

        this.headerConfig = {
            left: 'month,agendaWeek,agendaDay',
            center: 'prev,title,next',
            right: ''
        };
    }
    loadEvents(event) {
        this.CalendarStartDate = event.view.start;
        this.CalendarEndDate = event.view.end;
        window.localStorage.setItem('schduledStartDate', this.CalendarStartDate.format('YYYY-MM-DD HH:mm'));
        window.localStorage.setItem('schduledEndDate', this.CalendarEndDate.format('YYYY-MM-DD HH:mm'));

    }
    goToFleetreservations() {
        this.router.navigate(['/transactions/fleetreservations']);
    }
    changeView() {
        this.fullCal.gotoDate(this.date);
    }
    ngAfterContentChecked() {
        if (window.localStorage.getItem('calendarDate') === 'clicked') {
            this.date = window.localStorage.getItem('clickedDate');
            this.changeView();
            this.getFleetReservationsList();
        }
        if (window.localStorage.getItem('calendarfrom') === 'Events') {
            this.currenttime = moment(new Date()).format('YYYY-MM-DD HH:mm');
            this.date = moment(window.localStorage.getItem('fleetstartdate')).format('YYYY-MM-DD HH:mm');
            if (this.date < this.currenttime) {
                this.date = new Date();
            } else {
                this.date = window.localStorage.getItem('fleetstartdate');
            }
            this.fleetid = window.localStorage.getItem('eventfleet_id');
            this.getFleetsdata(this.fleetid);
            window.localStorage.removeItem('calendarfrom');
            window.localStorage.setItem('calendar', 'calendar');
        } else if (window.localStorage.getItem('calendarfrom') === 'Fleetreservation') {
            // this.date = new Date();
            this.currenttime = moment(new Date()).format('YYYY-MM-DD HH:mm');
            this.date = moment(window.localStorage.getItem('fleetstartdate')).format('YYYY-MM-DD HH:mm');
            if (this.date < this.currenttime) {
                this.date = new Date();
            } else {
                this.date = window.localStorage.getItem('fleetstartdate');
            }
            this.fleetid = window.localStorage.getItem('fleetreservaton_id');
            this.getFleetsdata(this.fleetid);
            window.localStorage.removeItem('calendarfrom');
            window.localStorage.setItem('calendar', 'calendar');
        } else if (window.localStorage.getItem('calendarfrom') === 'Fleetscalendar') {
            // this.date = new Date();
            this.fleetid = window.localStorage.getItem('fleets_id');
            this.getFleetsdata(this.fleetid);
            window.localStorage.removeItem('calendarfrom');
            window.localStorage.setItem('calendar', 'calendar');
        }
        window.localStorage.removeItem('calendarDate');
        window.localStorage.removeItem('fleetstartdate');

    }
    handleEventClick(event) {
        window.localStorage.setItem('schduledStartDate', event.calEvent.start.format('YYYY-MM-DD HH:mm'));
        window.localStorage.setItem('schduledEndDate', event.calEvent.end.format('YYYY-MM-DD HH:mm'));
        if (event.calEvent.titleType === 'fleetName') {
            window.localStorage.setItem('schduledEventTitle', '');
        } else if (event.calEvent.titleType === 'eventName') {
            window.localStorage.setItem('schduledEventTitle', event.calEvent.title);
        }
        this.router.navigate(['/transactions/fleetreservations']);
    }
    handleDayClick(event) {
        if (window.localStorage.getItem('calendar') === 'calendar') {
            this.calendartime = event.date._d;
            this.hours = this.calendartime.getHours();
            this.calendartime = this.calendartime.toString().split('GMT');
            this.hours = this.calendartime[1].substring(1, 3);
            this.minutes = this.calendartime[1].substring(3, 5);

            if (this.calendartime[1].charAt(0) === '+') {
                this.clickeddate = moment(event.date._d).utc().subtract(this.hours, 'hours');
                this.clickeddate = moment(event.date._d).utc().subtract(this.minutes, 'minutes');
                this.clickeddate = moment(this.clickeddate).format('YYYY-MM-DD HH:mm');
            } else {
                this.clickeddate = moment(event.date._d).utc().add(this.hours, 'hours');
                this.clickeddate = moment(event.date._d).utc().add(this.minutes, 'minutes');
                this.clickeddate = moment(this.clickeddate).format('YYYY-MM-DD HH:mm');
            }
            window.localStorage.setItem('time', this.clickeddate);

            if (this.eventsenabled === 'true') {
                this.router.navigate(['/transactions/events']);
                window.localStorage.setItem('createevent', 'eventpopup');
            } else {
                this.router.navigate(['/transactions/fleetreservations']);
                window.localStorage.setItem('createfleetreserve', 'reservepopup');
            }
        } else {
            this.router.navigate(['/transactions/fleetreservations']);
        }
        window.localStorage.setItem('onClickday', event.date._d);
        window.localStorage.removeItem('calendarfrom');
        window.localStorage.removeItem('calendar');
    }
    getFleetsdata(fleetid) {
        this.fleetService.getFleetDetailsByFleetid(fleetid, this.userToken)
            .subscribe(
            allFleetReservationsList => {
                this.eventsenabled = window.localStorage.getItem('eventenabled');
                const eventObjList = [];
                for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
                    if (this.utctimezonestring.charAt(0) === '+') {
                        const utctime = this.utctimezone.split('+');
                        const utctimesplit = utctime[1].split(':');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).utc().add(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).add(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).format('YYYY-MM-DD HH:mm');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).utc().add(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).add(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).format('YYYY-MM-DD HH:mm');
                    } else {
                        const utctime = this.utctimezone.split('-');
                        const utctimesplit = utctime[1].split(':');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).utc().subtract(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).subtract(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).format('YYYY-MM-DD HH:mm');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).subtract(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).format('YYYY-MM-DD HH:mm');
                    }
                    const eventObj = {
                        titleType: '', title: '', start: allFleetReservationsList['result'][i].startDatetime,
                        end: allFleetReservationsList['result'][i].endDatetime
                    };
                    if (allFleetReservationsList['result'][i].eventName) {
                        eventObj.title = allFleetReservationsList['result'][i].eventName.eventName;
                        eventObj.titleType = 'eventName';
                    } else {
                        eventObj.title = '@' + allFleetReservationsList['result'][i].fleetObj.fleetName;
                        eventObj.titleType = 'fleetName';
                    }
                    eventObjList.push(eventObj);
                }
                this.events = eventObjList;
            },
            error => {
                const status = error['status'];
                const statuscode = error['_body'].status;
                switch (status) {
                    case 500:
                        break;
                    case 400:
                        if (statuscode === '9961') {
                            this.router.navigate(['/pages/login']);
                        } break;
                }
            }
            );
    }

    getFleetReservationsList() {
        this.fleetReservationsService.getFleetReservationList(this.userToken)
            .subscribe(
            allFleetReservationsList => {
                const eventObjList = [];
                for (let i = 0; i < allFleetReservationsList['result'].length; i++) {
                    if (this.utctimezonestring.charAt(0) === '+') {
                        const utctime = this.utctimezone.split('+');
                        const utctimesplit = utctime[1].split(':');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).utc().add(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).add(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).format('YYYY-MM-DD HH:mm');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).utc().add(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).add(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).format('YYYY-MM-DD HH:mm');
                    } else {
                        const utctime = this.utctimezone.split('-');
                        const utctimesplit = utctime[1].split(':');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).utc().subtract(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).subtract(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].startDatetime = moment(allFleetReservationsList['result']
                        [i].startDatetime).format('YYYY-MM-DD HH:mm');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).utc().subtract(utctimesplit[0], 'hours');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).subtract(utctimesplit[1], 'minutes');
                        allFleetReservationsList['result'][i].endDatetime = moment(allFleetReservationsList['result']
                        [i].endDatetime).format('YYYY-MM-DD HH:mm');
                    }
                    const eventObj = {
                        titleType: '', title: '', start: allFleetReservationsList['result'][i].startDatetime,
                        end: allFleetReservationsList['result'][i].endDatetime
                    };
                    if (allFleetReservationsList['result'][i].eventName) {
                        eventObj.title = allFleetReservationsList['result'][i].eventName.eventName;
                        eventObj.titleType = 'eventName';
                    } else {
                        eventObj.title = '@' + allFleetReservationsList['result'][i].fleetObj.fleetName;
                        eventObj.titleType = 'fleetName';
                    }
                    eventObjList.push(eventObj);
                }
                this.events = eventObjList;
            },
            error => {
                const status = JSON.parse(error['status']);
                const statuscode = JSON.parse(error['_body']).status;
                switch (status) {
                    case 500:
                        break;
                    case 400:
                        if (statuscode === '9961') {
                            this.router.navigate(['/pages/login']);
                        } break;
                }
            }
            );
    }

}
