/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/**
 * Single Fleet Reservations services have below functionality:
 * createFleetReservation(createfleetReservation, userToken): To create the fleet reservations.
 * getEnterprices(token): Get Enterprise list.
 * updateFleetReservation(fleetreservationId, UpdatefleetReservation, userToken): To Update Fleet Reservation.
 * extendFleetReservation(updateenterpriseid, UpdatefleetReservation, userToken): To extend Fleet Reservation.
 * cancelfleetreservation(userToken, fleetreservationid, reason):To cancel fleet reservation list.
 * getLookupsList(token, lookupType): To get LookupList.
 * getReservationStatus(): To get the Reservation Status list
 * updateFleetReservation(UpdatefleetReservation, userToken): To update the fleet reservations.
 * deletefleetreservation(userToken, fleetreservationId): To delete fleet reservations.
 * checkinfleetreservation(userToken, fleetreservationId): To Check-In fleet reservations.
 * checkOutfleetreservation(userToken, fleetreservationId): To Check Out fleet reservations.
 * getReservationStatus(): To get reservation status.
 * cancelfleetreservation(userToken, fleetreservationId): To cancelfleetreservation.
 * getFleetNameByEntId(userToken, enterpriseId): To get fleet name by enterpriseId.
 * getEventNameByFleetId(userToken, fleetId): To get Event Name by Fleet Id.
 * getUserListByEntId(userToken, enterpriseId): To get user list by enterpriseId.
 * extendFleetReservation(UpdatefleetReservation, userToken): To Extend Fleet Reservation data.
 * extractData1(res: Response): To extract Data1.
 * extractData(res: Response): To extract the data.
 * handleError(error: Response | any): To handle error messages.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FleetReservationServices {

    /**---- Constructor for fleet reservation service ----*/
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To get Enterprices ----*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**---- To get fleet information ----*/
    getfleetsInfoByfleetreservationId(userToken, fleetreservationid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleetreservations/' + fleetreservationid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To create Fleet Reservation ----*/
    createFleetReservation(createfleetReservation, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/fleetreservations', createfleetReservation, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To Update Fleet Reservation ----*/
    updateFleetReservation(fleetreservationId, UpdatefleetReservation, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/fleetreservations/' + fleetreservationId, UpdatefleetReservation, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To extend Fleet Reservation ----*/
    extendFleetReservation(updateenterpriseid, UpdatefleetReservation, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/fleetreservations/extend/' + updateenterpriseid, UpdatefleetReservation, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To delete fleet reservation list ----*/
    deletefleetreservation(userToken, fleetreservationid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/fleetreservations/' + fleetreservationid, options)
            .map(this.extractData);
    }

    /*---- To checkinfleetreservation list ----*/
    checkinfleetreservation(userToken, fleetreservationid) {
        const data = new URLSearchParams();
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/fleetreservations/checkin/' + fleetreservationid, data, options)
            .map(this.extractData);
    }

    /*---- To checkOutfleetreservation list ----*/
    checkOutfleetreservation(userToken, fleetreservationid) {
        const data = new URLSearchParams();
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/fleetreservations/checkout/' + fleetreservationid, data, options)
            .map(this.extractData);
    }

    /*---- To cancel fleet reservation list ----*/
    cancelfleetreservation(userToken, fleetreservationid, reason) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reason', reason);
        return this.http.put(this.apiEndPoint + '/api/v1/fleetreservations/cancel/' + fleetreservationid, data, options)
            .map(this.extractData);
    }
    /* --------To get LookupList ---------*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* --------To get LookupList ---------*/
    getLookupsByEnterprise(token, lookupType, enterpriseId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/' + lookupType + '/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
        // /*--- Get the FleetNameByEntId list ---*/
    getFleetNameByEntId(userToken, fleettype, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/istransactable/' + enterpriseId + '/' + fleettype, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the EnterpriseNameByFleetId list ---*/
    getEventNameByFleetId(userToken, fleetId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleet/' + fleetId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get the EnterpriseNameByFleetId list ---*/
    getUserListByEntId(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/users/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get Fleet Reservation Details --*/
    getFleetReservationDetailsById(userToken, fleetreservationId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleetreservations/' + fleetreservationId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To extract json data ----*/
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body || {};
    }
    /*---- To handle error message ----*/
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
