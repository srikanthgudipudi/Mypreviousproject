/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
*/
/**
 * SingleEventservices has the following methods.
 * getLookupsList(token, lookupType): To get Lookup List.
 * getEnterprices(token): Get Enterprises list.
 * getStatus(userToken): To get status.
 * getfleetTypeAttributes(token, fleetType, enterprise): To Get fleet type attributes
 * getEventTypes(userToken): To get event types from lookups.
 * getMultipleRegister(eventId, userToken): To get multiple Regestrations.
 * userDetails(token, userId): To get User Details.
 * extendEvent(eventId, userToken, notes, enddatetime, duration, reason): To extend Event from list.
 * updateEvent(editEvent, eventId, userToken): To update Event.
 * checkOutEvent(eventId, userToken): To CheckOut from Event.
 * checkInEvent(eventId, userToken): To CheckIn into event.
 * getSingleFleetDetails(fleetId, userToken): To get the all fleets list.
 * cancelEvent(eventId, userToken, reason): To Cancel Event.
 * createEvent(createevent, userToken): This method is used to create event.
 * updateEvent(eventobj, eventId, userToken): This method is used to update event.
 * deleteEvent(eventId, userToken): This method is used to delete event.
 * getEnterprices(token): This method is used to get enterprises.
 * extendEvent(eventId, userToken): This method is used to extend event.
 * getFleetNames(userToken, enterpriseId): This method is used to get fleet list.
 * getUserListByEntId(userToken, enterpriseId): This method is used to get user list.
 * extractData(res: Response): To extract the data.
 * handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Eventservice {

    /**---- Constructor for event service ----*/
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To get LookupList  ---*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* --- Get Enterprises list ---- */
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesByUser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
     /*---- To get the fleet names ----*/
    getFleetNames(userToken, enterpriseId, fleettype) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/eventsenabled/' + enterpriseId + '/' + fleettype, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
   
    /*---- To get status from lookups ----*/
    getStatus(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/EVENT_STATUSES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* ----- To Get fleet type attributes------- */
    getfleetTypeAttributes(token, fleetType, enterprise) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/fleettypeattributes/' + fleetType + '/' + enterprise, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To get event types from lookups ----*/
    getEventTypes(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/EVENT_TYPES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get multiple Regestrations ----*/
    getMultipleRegister(eventId, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/events/mutipleregistrations/' + eventId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get User Details ----*/
    userDetails(token, userId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/user/' + userId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To create Event ----*/
    createEvent(createevent, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new URLSearchParams();
        data.append('eventObj', JSON.stringify(createevent));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/events', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To extend Event from list ----*/
    extendEvent(eventId, userToken, notes, enddatetime, duration, reason) {
        const data = new URLSearchParams();
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        data.append('notes5', notes);
        data.append('extEndDate', enddatetime);
        data.append('duration', duration);
        data.append('reason', reason);
        return this.http.put(this.apiEndPoint + '/api/v1/events/extend/' + eventId, data, options)
            .map(this.extractData);
    }

    /*---- To update Event ----*/
    updateEvent(editEvent, eventId, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new URLSearchParams();
        data.append('eventObj', JSON.stringify(editEvent));
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/events/' + eventId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To remove Event from list ----*/
    deleteEvent(eventId, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/events/' + eventId, options)
            .map(this.extractData);
    }

    /*---- To CheckOut from Event ----*/
    checkOutEvent(eventId, userToken): Observable<any> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        return this.http.put(this.apiEndPoint + '/api/v1/events/checkout/' + eventId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To CheckIn into event ----*/
    checkInEvent(eventId, userToken): Observable<any> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        return this.http.put(this.apiEndPoint + '/api/v1/events/checkin/' + eventId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get the all fleets list ----*/
    getSingleFleetDetails(fleetId, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleet/' + fleetId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To Cancel Event ----*/
    cancelEvent(eventId, userToken, reason): Observable<any> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reason', reason);
        return this.http.put(this.apiEndPoint + '/api/v1/events/cancel/' + eventId, data, options)
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
       /*--------To get LookupList ---------*/
       getLookupsByEnterprise(token, lookupType, enterpriseId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/' + lookupType + '/' + enterpriseId, options)
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
