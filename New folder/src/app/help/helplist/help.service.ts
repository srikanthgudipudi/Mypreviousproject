/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* getMyAllHelpList(userToken): To get the all help list.
* helpPageNameList(token): To get the all page name list.
* helpPageFeaturusList(token): To get the all feature list.
* getSearchResult(searchString, userToken): To search the help by string.
* getadvancedHelpSearch(advsearch, token): Advance search.
* exportlist(searchstring, userToken): export  Data.
* extractData(res: Response): To Extract the data.
* handleError(error): To handle the error page.
*/

/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HelpService {
  stacked: boolean;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string) {
  }

  /*---- To get the all help list ----*/
  getMyAllHelpList(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/help/', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get the all page name list ----*/
  helpPageNameList(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + 'PAGE_NAMES', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get the all feature list ----*/
  helpPageFeaturusList(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + 'PAGE_FEATURES', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To search the help by string ----*/
  getSearchResult(searchString, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/help/search/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*----Advance search------*/
  getadvancedHelpSearch(advsearch, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/help/advancedsearch', advsearch, options)
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
    const filePath = this.apiendpoint + '/api/v1/help/export/' + userToken + '/' + searchstring;
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
