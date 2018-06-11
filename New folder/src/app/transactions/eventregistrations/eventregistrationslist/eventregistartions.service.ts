/* Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * All events service file have below methods:
 * getMyEventsregList(userToken, searchString): To get all Event Registration list.
 *  getLookupsList(token, lookupType): To get the lookup data.
 * getMyEventsSearchregList(userToken, searchString): To Search Registration list.
 * getMyEventsregistrationList(userToken, eventId): To get all event registartions list.
 * advancesearch(eventreg, userToken): To search the data in advance search.
 * geteventRegistrationById(userToken, eventregistrationId): To get the event registrations.
 * getEventTypes(userToken): To get the event types.
 * locates(locate, userToken, search): To get the map location.
 * singlelocateEventRegistrations(locate, userToken, fleetid, floorPlanAvailable): To get the single event location.
 * exportlist(searchstring, userToken): To Export Event Data.
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
 */

/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EventsregService {

  stacked: boolean;
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiendpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }

  /*---- To get all Event Registration list ----*/
  getMyEventsregList(userToken, searchString) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/eventregistrations', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*-- To get Lookup Data based on the Lookup Type --*/
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To Search Registration list ----*/
  getMyEventsSearchregList(userToken, searchString) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/eventregistrations/search/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To get all event registartions list ----*/
  getMyEventsregistrationList(userToken, eventId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/event/registered/' + eventId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*-----  To Export Event Data ----- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/eventregistrations/export/' + userToken + '/' + searchstring;
    return filePath;
  }

  /* --- To search the data in advance search ---- */
  advancesearch(eventreg, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/eventregistrations/advancedsearch', eventreg, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To get the event registrations ----*/
  geteventRegistrationById(userToken, eventregistrationId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/eventregistrations/locate/' + eventregistrationId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To get the display map settings data ----*/
  getdisplaytomapsetting(token, enterpriseId, pageType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To get the event types ----*/
  getEventTypes(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/EVENT_TYPES', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get map location ----*/
  locates(locate, userToken, search) {
    if (window.localStorage.getItem('lceventregistrations') === 'lceventregistrationsdata') { // event registrations advance search  url
      window.localStorage.setItem('eventregistrationsmapURL', '?ut=' +
        locate + '&ms=' + 'eventregmapsettings' + '&pn=' + 'eventregistrations'
        + '&cu=' + window.localStorage.getItem('lceventregistrations'));
      this.router.navigate(['/map', 'eventregistrations']);
    } else if (search !== undefined && search !== null && search !== '') { // event registrations search url
      window.localStorage.setItem('eventregistrationsmapURL', '?ut='
        + locate + '&ms=' + 'eventregmapsettings' + '&pn=' + 'eventregistrations'
        + '&cu=' + this.apiendpoint + '/api/v1/eventregistrations/search/' + search);
      this.router.navigate(['/map', 'eventregistrations']);
    } else { // event registrations list url
      window.localStorage.setItem('eventregistrationsmapURL', '?ut='
        + locate + '&ms=' + 'eventregmapsettings' + '&pn=' + 'eventregistrations'
        + '&cu=' + this.apiendpoint + '/api/v1/eventregistrations');
      this.router.navigate(['/map', 'eventregistrations']);
    }
  }

  /**---- To get the single event location ----*/
   singlelocateEventRegistrations(locate, userToken, fleetid, floorPlanAvailable, currentFloorName, currentregid, cfleetid, buildingName) {
    window.localStorage.setItem('eventregistrationsmapURL', '?ut=' + locate + '&ms=' +
      'eventregmapsettings' + '&sr=' + 'lceventregistrationsinfo' + '&pn=' + 'eventregistrations'
      + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName + '&cfid=' + currentregid
      + '&cfleetid=' + cfleetid + '&cbn=' + buildingName);
    this.router.navigate(['/map', 'eventregistrations']);
  }
  /*---- To get Enterprices list ----*/
  getEnterprices(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprisesbyuser', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*----- To get all look up data------- */
  getCountryList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*--- Get the Enterprise Name By FleetId list ---*/
  getUserListByEntId(userToken, enterpriseId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/users/' + enterpriseId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To Extract the data ----*/
  private extractData(res: Response) {
    const body = res.json();
    const userToken = res['headers'].get('token');
    window.localStorage.setItem('token', userToken);
    return body || {};
  }

  /*---- To handle the error page ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
