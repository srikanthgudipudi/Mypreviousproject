/**
 * getMyAllenterprisesList(userToken, searchString): To get the enterprises settings list.
 * getLookupsList(token, lookupType): To get Lookup List.
 * advanceEnterpriseSettings(searchenterprisesDetails, userToken): To Search Enterprise settings.
 * exportlist(searchstring, userToken): To export  Data.
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MultiStopLocatorsService {
  stacked: boolean;
  /**---- Constructor for enterprise settings service ----*/
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiendpoint: string, @Inject('staticJsonFilesEndPoint')
    private staticendpoint: string) { }

  /**---- To get the enterprises settings list ----*/
  getMyAllenterprisesList(userToken, searchString) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    if (searchString === '') {
      return this.http.get(this.staticendpoint + 'multistoplocator.json')
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.get(this.apiendpoint + '/api/v1/enterprises/settings/search/' + searchString, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }
  // /* -- To get Lookup List -- */
  // getLookupsList(token, lookupType) {
  //   const headers = new Headers();
  //   headers.append('token', token);
  //   const options = new RequestOptions({ headers: headers });
  //   return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }
  /*----To Search Enterprise settings ----*/
  advanceEnterpriseSettings(searchenterprisesDetails, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/enterprises/settings/advancedsearch', searchenterprisesDetails, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**--- To export  Data---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/enterprises/settings/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  getFleetInfoByfleetId(token, fleetId) {
    return this.http.get(this.staticendpoint + 'fleetdata.json')
      .map(this.extractData)
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
  singlelocateFleet(locate, userToken, floorPlanAvailable) {
    window.localStorage.setItem('multistopURL', '?ut=' + locate + '&ms=' + 'fmapsettings' + '&sr=' + 'lcsinglefleet'
    + '&pn=' + 'pickticket' + '&fp=' + floorPlanAvailable);
    this.router.navigate(['/map', 'multistop']);
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
