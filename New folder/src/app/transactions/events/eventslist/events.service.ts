/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
*/
/**
 * All events service file have below methods:
 * getMyAlleventsList(userToken): To get the all events list.
 * getSearchResult(searchstring, userToken): To search the events.
 * advacncedSearch(token, eventvalobj): To get Advanced search results.
 * getLookupsList(token, lookupType): To get all look up data.
 * exportlist(searchstring, userToken): This method is used to export service.
 * getEnterprices(token): To get Enterprices list.
 * getFleetTypesList(userToken, enterpriseid): To get Fleet Type List.
 * getfleetTypeAttributes(token, fleetType, enterprise): To Get fleet type attributes.
 * getFleetNames(userToken, enterpriseId): To get the fleet names.
 * getUserListByEntId(userToken, enterpriseId):Get the Enterprise Name By FleetId list.
 * getSingleFleetDetails(fleetId, userToken): To get the all fleets list.
 * guidedCreateEvent(createevent, userToken): To guided create Event.
 * checkFleetsAvailabity(userToken, fleetObj): To check Fleets Availabity.
 * locates(locate, userToken, search): To get map location.
 * getEventsInfoByevntsId(userToken, eventid): To get event information.
 * singlelocateevent(locate, userToken, evnetid, floorPlanAvailable): Method for single locate.
 * getdisplaytomapsetting(token, enterpriseId, pageType): Method to get display map settings.
 * extractData(res: Response): This method is used to extract the data.
 * handleError(error: Response | any): This method is used to handle the error page.
 */
/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AllEventsDetails } from './events.component';

@Injectable()
export class EventService {
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiEndpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }

  /*---- To get the all events list ----*/
  getMyAlleventsList(userToken): Observable<AllEventsDetails[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/events', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To search the events ----*/
  getSearchResult(searchstring, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/events/search/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
   /*---- To get User Details ----*/
   userDetails(token, userId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/user/' + userId, options)
        .map(this.extractData)
        .catch(this.handleError);
  }
  /*---- To get guided events results ----*/
  guidedevents(token, eventvalobj) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    data.append('eventvalobj', JSON.stringify(eventvalobj));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndpoint + '/api/v1/eventregistrations/guidedcreateevents', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get Advanced search results ----*/
  advacncedSearch(token, eventvalobj) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    data.append('eventvalobj', JSON.stringify(eventvalobj));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndpoint + '/api/v1/events/advancedsearch', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*----- To get all look up data------- */
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**----Export service---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiEndpoint + '/api/v1/events/export/' + userToken + '/' + searchstring;
    return filePath;
  }

  /*---- To get Enterprices list ----*/
  getEnterprices(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/enterprisesbyuser', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
//  To get Countries based on existng fleets, resources & eterprises
  getCountriesbyEnterpriseId(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/enterprise-management/enterprises/' + enterpriseid + '/countries', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /* ----- To get Fleet Type List ----- */
  getFleetTypesList(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/fleettypes/eventsenabled/' + enterpriseid, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* ----- To Get fleet type attributes ------- */
  getfleetTypeAttributes(token, fleetType, enterprise) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/fleets/fleettypeattributes/' + fleetType + '/' + enterprise, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To get the fleet names ----*/
 getFleetNames(userToken, enterpriseId, fleettype) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/fleets/eventsenabled/' + enterpriseId + '/' + fleettype, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*--- Get the Enterprise Name By FleetId list ---*/
  getUserListByEntId(userToken, enterpriseId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/users/' + enterpriseId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get the all fleets list ----*/
  getSingleFleetDetails(fleetId, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/fleet/' + fleetId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To guided create Event ----*/
  guidedCreateEvent(createevent, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const data = new URLSearchParams();
    data.append('eventObj', JSON.stringify(createevent));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndpoint + '/api/v1/events', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To check Fleets Availabity ----*/
  checkFleetsAvailabity(userToken, fleetObj) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    data.append('fleetreservation', JSON.stringify(fleetObj));
    return this.http.post(this.apiEndpoint + '/api/v1/fleets/availability', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get map location ----*/
  locates(locate, userToken, search) {
    if (window.localStorage.getItem('lcevents') === 'lceventsdata') { // events advance search url
      window.localStorage.setItem('eventsmapURL', '?ut=' + locate + '&ms=' + 'eventmapsettings' + '&pn=' + 'events'
        + '&cu=' + window.localStorage.getItem('lcevents'));
      this.router.navigate(['/map', 'events']);
    } else if (search !== undefined && search !== null && search !== '') { // events search url
      window.localStorage.setItem('eventsmapURL', '?ut=' + locate + '&ms=' + 'eventmapsettings' + '&pn=' + 'events'
        + '&cu=' + this.apiEndpoint + '/api/v1/events/search/' + search);
      this.router.navigate(['/map', 'events']);
    } else { // events list url
      window.localStorage.setItem('eventsmapURL', '?ut=' + locate + '&ms=' + 'eventmapsettings' + '&pn=' + 'events'
        + '&cu=' + this.apiEndpoint + '/api/v1/events');
      this.router.navigate(['/map', 'events']);
    }
  }

  /**---- To get event information ----*/
  getEventsInfoByevntsId(userToken, eventid) {
    const headers = new Headers();
    headers.append('token', userToken);
    headers.append('feature', 'locate');
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/events/locate/' + eventid, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- Method for single locate ----*/
  // singlelocateevent(locate, userToken, evnetid, floorPlanAvailable) {
  //   window.localStorage.setItem('eventsmapURL', '?ut='
  // + locate + '&ms=' + 'eventmapsettings' + '&sr=' + 'lceventinfo' + '&pn=' + 'events'
  //     + '&cfid=' + evnetid + '&fp=' + floorPlanAvailable);
  //   this.router.navigate(['/map', 'events']);
  // }

 singlelocateevent(locate, userToken, evnetid, floorPlanAvailable, currentFloorName, eventid, cufloorId, currentfleetId, builingName) {
    window.localStorage.setItem('eventsmapURL', '?ut=' + locate + '&ms=' + 'eventmapsettings' + '&sr=' + 'lceventinfo' + '&pn=' + 'events'
      + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName + '&cfid='
      + eventid + '&cufloorid=' + cufloorId + '&cfleetid=' + currentfleetId + '&cbn=' + builingName);
    this.router.navigate(['/map', 'events']);
  }
  /**---- Method to get display map settings ----*/
  getdisplaytomapsetting(token, enterpriseId, pageType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndpoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
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
