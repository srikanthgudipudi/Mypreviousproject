/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* All fleets service file have below methods:
* getSearchResult(searchString): To search the winning person by username.
* getMyAllfleetsList(): To get the all fleets list.
* getInitalfleets(userToken): To get the all fleets list.
* getSearchResult(searchString, userToken): To search the fleets by username.
* exportlist(searchString, userTOken): To Export the file.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FleetsDetails } from './fleets.component';
@Injectable()
export class FleetsService {
  stacked: boolean;
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiendpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
  /*---- To get the all fleets list ----*/
  getMyAllfleetsList(userToken, fleetAssetName, enterpriseIds): Observable<FleetsDetails[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleets/', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To get the all fleets list ----*/
  getInitalfleets(userToken): Observable<FleetsDetails[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleets/listing/', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /* ----- To get FleetTypeList ----- */
  getFleetTypesList(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleettypes/' + enterpriseid, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To search the fleets by username ----*/
  getSearchResult(searchString, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleets/search/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*----Advance search------*/
  getadvancedFleetSearch(advsearch, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/fleets/advancedsearch', advsearch, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**---locate button---- */

  locates(locate, userToken, search) {
    if (window.localStorage.getItem('lcfleets') === 'lcfleetsdata') { // fleet reservations advance search url
      window.localStorage.setItem('fleetsmapURL', '?ut=' + locate + '&pn=' + 'fleets' + '&ms=' + 'fmapsettings'
        + '&cu=' + window.localStorage.getItem('lcfleets'));
      this.router.navigate(['/map', 'fleets']);
    } else if (search !== undefined && search !== null && search !== '') {
      window.localStorage.setItem('fleetsmapURL', '?ut=' + locate + '&pn=' + 'fleets' + '&ms=' + 'fmapsettings'
        + '&cu=' + this.apiendpoint + '/api/v1/fleets/search/' + search);
      this.router.navigate(['/map', 'fleets']);
    } else {
      window.localStorage.setItem('fleetsmapURL', '?ut=' + locate + '&pn=' + 'fleets' + '&ms=' + 'fmapsettings'
        + '&cu=' + this.apiendpoint + '/api/v1/fleets');
      this.router.navigate(['/map', 'fleets']);
    }
  }
 singlelocateFleet(locate, userToken, fleetid, floorPlanAvailable, currentFloorName, currentfleetId, cufloorId, cfleetid, buildingName) {
    window.localStorage.setItem('fleetsmapURL', '?ut=' + locate + '&ms=' + 'fmapsettings' + '&sr=' + 'lcsinglefleet' + '&pn=' + 'fleets'
      + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName + '&cfid=' + currentfleetId + '&cfleetid='
      + cfleetid + '&cufloorid=' + cufloorId + '&cbn=' + buildingName);
    this.router.navigate(['/map', 'fleets']);
}
   getBuildingId(token, fleetId, pageName) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/' + pageName + '/multifloor/' + fleetId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getbuildingFloorMapInfo(token, builingCode) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/assets/fleets/floorplan/' + builingCode + '.json')
      .map(this.extractBuildingData)
      .catch(this.handleError);
  }
  getselectedfleetinfo(token, enterpriseId, pageType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /* ----- To get FleetTypeList ----- */
  getFleetTypeList(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    if (enterpriseid) {
      return this.http.get(this.apiendpoint + '/api/v1/fleettypes/' + enterpriseid, options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.get(this.apiendpoint + '/api/v1/fleettypes/0', options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }
  /* -----To Enterprise Name list------- */
  getEnterpriseNamesList(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprisesbyuser', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*----Advance search------*/
  getFleetInfoByfleetId(token, fleetId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleet/' + fleetId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
   expTemplate(userToken, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    headers.append('filepath', file);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/importtemplate/data', options)
      .map(this.extractData);
  }
  /**---export  Data---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';

    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/fleets/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  /** --- To import resources data --- */
  importList(token, csvFile) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new FormData();
    data.append('importFile', csvFile);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/fleets/import', data, options)
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
   private extractBuildingData(res: Response) {
    const body = res.json();
    return body || {};
  }
  /*---- To handle the error page ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
