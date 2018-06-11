/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All lookups service file have below methods:
* getSearchResult(searchString): To search the winning person by username.
* getMyAlllookupsList(): To get the all lookups list.
* extractData(res: Response): To Extract the data.
*  exportlist(searchstring, userToken): To download Data.
* handleError(error: Response | any): To handle the error page.
*/

/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AllLookupsDetails } from './lookups.component';
@Injectable()
export class LookupsService {
  stacked: boolean;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string, @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
  /*---- To get the all lookups list ----*/
  getMyAlllookupsList(userToken): Observable<AllLookupsDetails[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To search the lookups by username ----*/
  getSearchResult(search, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/search/' + search, options)
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
    const filePath = this.apiendpoint + '/api/v1/lookups/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  /*---- To advance search the  lookup information ----*/
  public advancesearchlookup(lookupdata, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const data = new URLSearchParams();
    data.append('lookupdata', JSON.stringify(lookupdata));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/lookups/advancedsearch', data, options)
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
