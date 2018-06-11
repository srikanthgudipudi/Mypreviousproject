/* Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* Display Event Registration details of front end users.
* Event Registration Service are using to following functionality:
* getEnterprices(token): Get Enterprises list.
* getFleetNameByEntId(userToken, enterpriseId): Get Fleets Details.
* getEventNameByFleetId(userToken, fleetId): Get Event Details.
* getFleetDataByFleetId(userToken, fleetId): Get the fleets data by fleet list.
* getEventDataByEventId(userToken, eventId): Get the Events data by fleet list.
* getStatus(): Get the Status.
* getEventType(): Get the EventType.
* getLookupsList(token, lookupType): To get the lookup list.
* addEventReg(eventReg, userToken): Add Event Registration Details.
* unRegEventReg(eventReg, userToken): Unregister Event Registration Details.
* deleteEventReg(enterpriseid, userToken): Delete Event Registration Details.
* checkinEvent(eventRegistrationId, loginUserToken): To CheckinEvent.
* checkoutEvent(eventRegistrationId, loginUserToken): To CheckoutEvent.
* extractData(res: Response): To extract the data.
* extractData1(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EventRegistrationService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }

    /* --- Get Enterprises list ---- */
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- Get Fleets Details ------ */
    getFleetNameByEntId(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/eventsenabled/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- Get Event Details ------ */
    getEventNameByFleetId(userToken, fleetId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/eventsbyfleet/' + fleetId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the Fleets data by fleet list ---*/
    getFleetDataByFleetId(userToken, fleetId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleet/' + fleetId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the Events data by fleet list ---*/
    getEventDataByEventId(userToken, eventId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/events/locate/' + eventId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the Status ---*/
    getStatus(): Observable<any[]> {
        return this.http.get(this.staticJsonFilesEndPoint + 'staticlookupdata.json')
            .map(this.extractData1)
            .map(data => {
                return data.filter(data1 => data1._id === 'REGISTRATION_STAUSES');
            })
            .catch(this.handleError);
    }

    /*--- Get the EventType ---*/
    getEventType(): Observable<any[]> {
        return this.http.get(this.staticJsonFilesEndPoint + 'staticlookupdata.json')
            .map(this.extractData1)
            .map(data => {
                return data.filter(data1 => data1._id === 'EVENT_TYPES');
            })
            .catch(this.handleError);
    }

    /*--------To get LookupList ---------*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
     /*--------To get LookupList ---------*/
    getLookupsByEnterprise(token, lookupType, enterpriseId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/' + lookupType + '/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- Add Event Registration Details ----*/
    addEventReg(eventReg, userToken): Observable<any> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('eventRegistration', JSON.stringify(eventReg));
        return this.http.post(this.apiEndPoint + '/api/v1/eventregistrations', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- Unregister Event Registration Details ----*/
    unRegEventReg(eventReg, userToken, reason): Observable<any> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reason', reason);
        data.append('eventRegistration', JSON.stringify(eventReg));
        return this.http.put(this.apiEndPoint + '/api/v1/eventregistrations/unregister/' + eventReg._id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- Delete Event Registration Details ----*/
    deleteEventReg(enterpriseid, userToken): Observable<any> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/eventregistrations/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*-----  To CheckinEvent ----- */
    checkinEvent(eventRegistrationId, loginUserToken): Observable<any> {
        const headers = new Headers();
        headers.append('token', loginUserToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        return this.http.put(this.apiEndPoint + '/api/v1/eventregistrations/checkin/' + eventRegistrationId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*-----  To CheckoutEvent ----- */
    checkoutEvent(eventRegistrationId, loginUserToken): Observable<any> {
        const headers = new Headers();
        headers.append('token', loginUserToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        return this.http.put(this.apiEndPoint + '/api/v1/eventregistrations/checkout/' + eventRegistrationId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
/**---- To get event information ----*/
    getEventsInfoByeventId(userToken, eventid) {
        const headers = new Headers();
        headers.append('token', userToken);
        headers.append('feature', 'locate');
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/events/' + eventid, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
     /**---- To get the event registrations ----*/
  geteventRegistrationById(userToken, eventregistrationId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/eventregistrations/' + eventregistrationId, options)
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

    /*---- To extract json data ----*/
    private extractData1(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body.data || {};
    }

    /*---- To handle error message ----*/
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
