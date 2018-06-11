/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/**
 * FleetReservationsService file have below methods:
 * getFleetReservationSearchResult(searchString): To get Fleet Reservation Search Result.
 * getFleetReservationList(userToken): To get Fleet Reservation List.
 * getFleetReservationAdvSearchResult(userToken, searchobj): To get Advance search Fleet Reservation list.
 * checkFleetsAvailabity(userToken, fleetObj): To check Fleets Availabity.
 * getFleetReservationInfoById(userToken, fleetreservationId): To get fleet information.
 * locates(locate, userToken, search): To get map location.
 * singlelocateFleetReservation(locate, userToken, fleetid, floorPlanAvailable): To get map location for single locate.
 * getdisplaytomapsetting(token, enterpriseId, pageType): To get display map settings data.
 * getFleetReservationListForCalendar(userToken): To getFleetReservation for calendar.
 * exportlist(searchstring, userToken): To export  Data
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
 */

/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FleetReservationsModel } from './fleetreservations.component';

@Injectable()
export class FleetReservationsService {
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiendpoint: string,
    ) { }

  /*---- To get Fleet Reservation Search Result ----*/
  getFleetReservationSearchResult(userToken, searchstring) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleetreservations/search/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get Fleet Reservation List ----*/
  getFleetReservationList(userToken): Observable<FleetReservationsModel[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleetreservations', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To getFleetReservation for calendar ----*/
  getFleetReservationListForCalendar(userToken): Observable<FleetReservationsModel[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleetreservations/calendar', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  //  ----- To get FleetTypeList ----- 
  getFleetTypesList(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleettypes/transactable/' + enterpriseid, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

 getFleetsList(userToken, fleettype, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '' + enterpriseid, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**--- To export  Data ---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/fleetreservations/export/' + userToken + '/' + searchstring;
    return filePath;
  }

  /*---- To get Advance search Fleet Reservation list ----*/
  getFleetReservationAdvSearchResult(userToken, searchobj) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    data.append('fleetreservation', JSON.stringify(searchobj));
    return this.http.post(this.apiendpoint + '/api/v1/fleetreservations/advancedsearch', searchobj, options)
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
    return this.http.post(this.apiendpoint + '/api/v1/fleets/availability', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get map location ----*/
  locates(locate, userToken, search) {
    if (window.localStorage.getItem('lcfleetreservations') === 'lcfleetreservationsdata') { // fleet reservations advance search url
      window.localStorage.setItem('fleetreservationsmapURL', '?ut=' + locate + '&ms=' + 'frmapsettings' + '&pn=' + 'fleetreservations'
        + '&cu=' + window.localStorage.getItem('lcfleetreservations'));
      this.router.navigate(['/map', 'fleetreservations']);
    } else if (search !== undefined && search !== null && search !== '') { // fleet reservations search url
      window.localStorage.setItem('fleetreservationsmapURL', '?ut=' + locate + '&ms=' + 'frmapsettings' + '&pn=' + 'fleetreservations'
        + '&cu=' + this.apiendpoint + '/api/v1/fleetreservations/search/' + search);
      this.router.navigate(['/map', 'fleetreservations']);
    } else { // fleet reservations list url
      window.localStorage.setItem('fleetreservationsmapURL', '?ut=' + locate + '&ms=' + 'frmapsettings' + '&pn=' + 'fleetreservations'
        + '&cu=' + this.apiendpoint + '/api/v1/fleetreservations');
      this.router.navigate(['/map', 'fleetreservations']);
    }
  }

  /**---- To get fleet information ----*/
  getFleetReservationInfoById(userToken, fleetreservationId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleetreservations/locate/' + fleetreservationId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
//  To get Countries based on existng fleets, resources & eterprises
  getCountriesbyEnterpriseId(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprise-management/enterprises/' + enterpriseid + '/countries', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**---- To get map location for single locate -----*/
  // singlelocateFleetReservation(locate, userToken, fleetid, floorPlanAvailable) {
  //   window.localStorage.setItem('fleetreservationsmapURL', '?ut=' + locate
  //     + '&ms=' + 'frmapsettings' + '&sr=' + 'lcfleetreservationinfo' + '&pn=' + 'fleetreservations'
  //    + '&cfid=' + fleetid + '&fp=' + floorPlanAvailable);
  //   this.router.navigate(['/map', 'fleetreservations']);
  // }
  singlelocateFleetReservation(locate, userToken, fleetid, floorPlanAvailable, currentFloorName,
  currentfregid, cufloorid, cfleetid, buildingName) {
    window.localStorage.setItem('fleetreservationsmapURL', '?ut=' + locate
      + '&ms=' + 'frmapsettings' + '&sr=' + 'lcfleetreservationinfo' + '&pn=' + 'fleetreservations'
      + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName + '&cfid='
      + currentfregid + '&cufloorid=' + cufloorid + '&cfleetid=' + cfleetid + '&cbn=' + buildingName);
    this.router.navigate(['/map', 'fleetreservations']);
  }

  /**--- To get display map settings data ----*/
  getdisplaytomapsetting(token, enterpriseId, pageType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
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
