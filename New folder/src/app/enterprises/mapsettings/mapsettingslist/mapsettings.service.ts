/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* All MapsettingsService have below methods:
* getDisplayToMapList(userToken): To get the all display to map list.
* exportlist(userToken): To export the map settings data.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MapsettingsService {
  stacked: boolean;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string) { }

  /*---- To get the all display to map list ----*/
  getDisplayToMapList(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/displaytomapsettings', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
/*---- To get Advanced search results ----*/
  advacncedSearch(token, valobj) {
    if (valobj.enterpriseName === '' && valobj.pageName === '') {
      const headers = new Headers();
      headers.append('token', token);
      const options = new RequestOptions({ headers: headers });
      return this.http.get(this.apiendpoint + '/api/v1/displaytomapsettings', options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
    const headers = new Headers();
    headers.append('token', token);
    /* const data = new URLSearchParams();
    data.append('valobj', JSON.stringify(valobj)); */
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/displaytomapsettings/advancedsearch', valobj, options)
      .map(this.extractData)
      .catch(this.handleError);
    }
  }
  simpleSearch(token, searchstring) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/search/displaytomapsettings/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**---export  Data---- */
  exportlist(userToken) {
    const filePath = this.apiendpoint + '/api/v1/displaytomapsetting/export/' + userToken;
    return filePath;
  }

  /*---- To Extract the data ----*/
  private extractData(res: Response) {
    const body = res.json();
    const token = res['headers'].get('token');
    window.localStorage.setItem('token', token);
    return body || {};
  }

  /*---- To handle the error page ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
