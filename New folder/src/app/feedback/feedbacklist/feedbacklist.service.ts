/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* FunfactsService file have below methods:
* getSearchResult(searchString): To search the fun facts.
* getMyFunfactsList(userToken): To get the all fun facts list.
* deletefunfact(userToken, funfactsId): To remove the fun fact from list.
* getActivelist(userToken): To get the active fun facts list.
* extractData(res: Response): To Extract the data.
* exportlist(searchstring, userToken): To download the data.
* handleError(error: Response | any): To handle the error page.
*/
/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class FeedbacklistService {
  stacked: boolean;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
  /*---- To get the all fun facts list ----*/
  getMyfeedbackList(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/feedback', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To search the fun facts ----*/
  getSearchResult(searchstring, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/feedback/search/' + searchstring, options)
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
  /* ---- To Get Advanced Search Result ---- */
  getAdvancedSearch(userToken, feedbacktSearchObj) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    data.append('advancedObj', JSON.stringify(feedbacktSearchObj));
    return this.http.post(this.apiendpoint + '/api/v1/feedback/advancedsearch', data, options)
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
    const filePath = this.apiendpoint + '/api/v1/feedback/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  /*---- To handle the error page ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
