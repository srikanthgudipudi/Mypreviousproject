/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * Display single Advertisement details in front end
  * getEnterprices(token): To Get List of Enterprices
  * getLookupsList(token, lookupType): To Get Advertisement Types
  * createAdvertisement(userToken, createObject, file): To Create Advertisement
  * updateAdvertisement(userToken, univimag, file): To Update Advertisement
  * reasons(): To get reasons
  * deleteAdvertisement(token, resourceId): To Delete Advertisement
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import { Reasons } from './singleuser.component';
@Injectable()
export class Advertisementservices {
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiEndPoint: string,
    @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }
  createAdvertisement(userToken, createObject, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    const data = new FormData();
    data.append('advData', JSON.stringify(createObject));
    data.append('advFile', file);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndPoint + '/api/v1/advertisements', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To update universal image ----*/
  updateAdvertisement(advertisementid, userToken, univimag, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const data = new FormData();
    data.append('advData', JSON.stringify(univimag));
    data.append('advFile', file);
    return this.http.put(this.apiEndPoint + '/api/v1/advertisements/' + advertisementid, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*-- To get Lookup Data based on the Lookup Type --*/
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*-- To submit Advanced search data --*/
  getAdvancedSearch(token, advancedObj) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    data.append('advancedObj', JSON.stringify(advancedObj));
    return this.http.post(this.apiEndPoint + '/api/v1/advertisements/advancedsearch/', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*-- Delete Enterprise Universal Image --*/
  deleteAdvertisement(token, advertisementId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiEndPoint + '/api/v1/advertisements/' + advertisementId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*-- To get List of Enterprises --*/
  getEnterprices(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*To extract json data*/
  private extractData(res: Response) {
    const body = res.json();
    const token = res['headers'].get('token');
    window.localStorage.setItem('token' , token);
    return body || {};
  }
  /* To handle error message */
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
