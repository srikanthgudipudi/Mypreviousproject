/**Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com */
/**
 * EnterpriseStaticContentService has the following methods:
 * getEnterpriseStaticContent(userToken, searchTerm): To get Static Content search List.
 * getEnterpriseStaticContent(userToken):  This method is used to fetch static content list.
 * advancedSearch(advSearch, userToken): To get advanced search results.
 * exportlist(searchstring, userToken): To export the data.
 * extractData(res: Response): To extract the notification list Data.
 * handleError(error: Response | any): This method is used to handle errors.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { StaticContentComponent } from './staticcontent.component';

@Injectable()
export class StaticContentService {

  /**---- Constructor for static content service ----*/
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiEndPoint: string) { }

  /*----- To get Static Content search List ------ */
  getEnterpriseStaticContent(userToken, searchTerm): Observable<StaticContentComponent[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    if (searchTerm == null || searchTerm === '') {
      searchTerm = ' ';
    }
    return this.http.get(this.apiEndPoint + '/api/v1/enterprisestaticcontent/search/' + searchTerm, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**----- To get Static Content List ------ */
  getEnterpriseStaticContentList(userToken): Observable<StaticContentComponent[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/enterprisestaticcontent', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To get advanced search results ---*/
  advancedSearch(advSearch, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndPoint + '/api/v1/enterprisestaticcontent/advancedsearch', advSearch, options)
      .map(this.extractData)
      .catch(this.handleError);

  }

  /**--- To export the data ---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiEndPoint + '/api/v1/enterprisestaticcontent/export/' + userToken + '/' + searchstring;
    return filePath;
  }

  /**---- To extract json data  ----*/
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  /**---- To handle error message ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
