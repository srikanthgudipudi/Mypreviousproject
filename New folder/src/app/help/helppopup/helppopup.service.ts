/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* helpPageNameList(token): To helpPageNameList.
* helpPageFeaturusList(token): To helpPageFeaturusList.
* createSinglehelp(help, userToken): To create singlehelp.
* deletehelpfromList(helpid, token) : To Delete singlehelp.
* updateHelp(helpdata, helpid, userToken): To Update singlehelp.
* extractData(res: Response): To extract json data.
* handleError(error) : To handle error message.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HelpPopupService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To helpPageNameList ----*/
    helpPageNameList(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + 'PAGE_NAMES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To helpPageFeaturusList ----*/
    helpPageFeaturusList(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + 'PAGE_FEATURES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To create singlehelp ----*/
    createSinglehelp(help, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/help', help, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To Delete singlehelp ----*/
    deletehelpfromList(helpid, token) {
        const headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/help/' + helpid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To Update singlehelp----*/
    updateHelp(helpdata, helpid, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/help/' + helpid, helpdata, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To extract json data ----*/
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body || {};
    }

    /*---- To handle error message ----*/
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
