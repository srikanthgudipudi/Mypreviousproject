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
* getMyFunfactsList(userToken):Method to get the fun facts list details.
* getSearchResult(searchString): Method to get search results for fun facts.
* getAdvancedSearch(userToken, funfactSearchObj) : Method to get advanced search results for fun facts.
* importList(token, csvFile): Method to import resources data.
* exportlist(searchstring, userToken): Method to export data list.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/

/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FunfactsDetails } from './funfacts.component';

@Injectable()
export class FunfactsService {
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string) { }

  /*---- To get the all fun facts list ----*/
  getMyfunfactsList(userToken): Observable<FunfactsDetails[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/funfacts', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*------- To Get Simple Search Result -----*/
  getSearchResult(searchstring, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/funfacts/search/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* ------- To Get Advanced Search Result ------- */
  getAdvancedSearch(userToken, funfactSearchObj) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    data.append('funfactObj', JSON.stringify(funfactSearchObj));
    return this.http.post(this.apiendpoint + '/api/v1/funfacts/advancedsearch', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*------ To import resources data ----- */
  importList(token, csvFile) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new FormData();
    data.append('importFile', csvFile);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/funfacts/import', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To export data list -----*/
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/funfacts/export/' + userToken + '/' + searchstring;
    return filePath;
  }

  /*---- To Extract the data -----*/
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
