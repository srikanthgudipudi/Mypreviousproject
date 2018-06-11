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
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class ContractDetailService {
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
  getLookupsList(userToken, lookupType) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getPaymentLookup(userToken, lookupType) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getContractLookup(userToken, lookupType) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*-- To get List of Licensing lookup types --*/
  getLicensingLookup(userToken, lookupType) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*-- To get List of Enterprises --*/
  getEnterprices(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprisesbyuser', options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  deleteDetails(token, id) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiendpoint + '/api/v1/enterprisecontracts/' + id, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateDetails(token, id, isEnabled, enddate) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    data.append('isEnabled', isEnabled);
    data.append('contractPeriodEndDate', enddate);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiendpoint + '/api/v1/enterprisecontracts/' + id, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDetails(token, contractDetailObj) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/enterprisecontracts', contractDetailObj, options)
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
