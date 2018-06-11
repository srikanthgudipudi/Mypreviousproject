/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 *  In Login Service have below methods:
 * getAuthorised(username: string, password: string, regToken: any): This method used to check whether the user name exist or not.
 * logout(token): This method is used to send request to logout.
 * extractData(res: Response): To extract data.
 * handleError(error: Response | any): To handle error in http calls.
 */

/* Service related module imports */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/interval';

@Injectable()
export class LoginService {
  private loginServiceUrl = '/api/v1/users/login';

  /**---- Constructor for login service ----*/
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiEndPoint: string) { }

  /**----- Get Authorised tokens----- */
  getAuthorised(username: string, password: string, regToken: any) {
    const data = new URLSearchParams();
    data.append('userId', username);
    data.append('password', password);
    return this.http.post(`${this.apiEndPoint}` + this.loginServiceUrl, data)
      // .map(this.extractData);
      .catch(this.handleError);
  }

  /**---- To logout from the application ----*/
  logout(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    const data = new FormData();
    return this.http.post(`${this.apiEndPoint}` + '/api/v1/users/logout', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  };

  /**---- To extract data -----*/
  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  /*----- To handle error in http calls  ------ */
  public handleError(error: Response | any) {
    return Observable.throw(error);
  }
}
