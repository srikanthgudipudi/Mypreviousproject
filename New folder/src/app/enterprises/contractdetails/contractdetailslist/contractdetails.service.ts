/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*

/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ContractDetailsService {
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
  getContractDetailsList(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprisecontracts', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/enterprisecontracts/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  getSearchResult(searchstring, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprisecontracts/search/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  advancecontractDetails(advancesearchData, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post( this.apiendpoint + '/api/v1/enterprisecontracts/advancedsearch', advancesearchData, options)
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
