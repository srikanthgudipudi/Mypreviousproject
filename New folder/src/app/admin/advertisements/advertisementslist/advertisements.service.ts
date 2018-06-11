/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * AdvertisementsService has the following methods:
 * getAllAdvertisements(userToken): This method is used to call an api to getalladvertisement list.
 * getSearchResult(token, searchstring): This method is used to call an api to for search string.
 * exportlist(searchstring, userToken): This method is used to download the data
 * exportlist(searchString, userTOken): To Export the file.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 *
 */

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AdvertisementsService {
  stacked: boolean;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
  /*-- To get All Enterprise Resources --*/
  getAllAdvertisements(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers }); // this.apiendpoint
    return this.http.get(this.apiendpoint + '/api/v1/advertisements', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getSearchResult(token, searchstring) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers }); // this.apiendpoint
    return this.http.get(this.apiendpoint + '/api/v1/advertisements/search/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getservercurrentutctime(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers }); // this.apiendpoint
    return this.http.get(this.apiendpoint + '/api/v1/utc', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**---export  api---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/advertisements/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  /*---- To Extract the data ----*/
  private extractData(res: Response) {
    const body = res.json();
    const token = res['headers'].get('token');
    window.localStorage.setItem('token' , token);
    return body || {};
  }
  /*---- To handle the error page ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
