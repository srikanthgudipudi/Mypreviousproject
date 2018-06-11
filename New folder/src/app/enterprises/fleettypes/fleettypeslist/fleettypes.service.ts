/**
 * FleetTypesService have below methods
 * getMyAlllookupsList(token): To get the all fleet types.
 * searchFleettypeadvance(advancedObj, token): To search the fields in advance search.
 * searchfleettypes(searchString, token): To search the fleet types.
 * exportlist(searchstring, userToken): To download the fleettype data.
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FleetTypesService {
  stacked: boolean;
  /**--- Constructor for  FleetTypesService ---*/
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string) {
  }

  /**---- To get the all fleet types ----*/
  getMyAlllookupsList(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleettypes', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To search the fields in advance search ----*/
  searchFleettypeadvance(advancedObj, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/fleettypes/advancedsearch', advancedObj, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To search the fleet types ----*/
  searchfleettypes(searchString, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/fleettypes/search/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* -- To get Lookup List -- */
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---export  Data---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/fleettypes/export/' + userToken + '/' + searchstring;
    return filePath;
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
