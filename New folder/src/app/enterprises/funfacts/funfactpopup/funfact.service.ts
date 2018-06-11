/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* Single fun facts services have below functionality:
* createFunfact(funfact, userToken): Method to create the fun facts.
* updateFunfact(funfactupdate, funfactsId, userToken): Method to update the fun facts.
* deletefunfact(userToken, funfactsid): Method to delete the fun facts.
* getLookupsList(token, lookupType): Method to get Lookup Data based on the Lookup Type.
* getEnterprices(token):Method to get enterprises list.
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FunfactService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To create the fun facts ----*/
    createFunfact(enterprise, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/funfacts', enterprise, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To update the fun facts ----*/
    updateFunfact(funfactupdate, funfactsid, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/funfacts/' + funfactsid, funfactupdate, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*------ To remove the fun fact from list ---*/
    deletefunfact(userToken, funfactsid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/funfacts/' + funfactsid, options)
            .map(this.extractData);
    }

    /*---- To get Lookup Data based on the Lookup Type ---*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*----  To get EnterprisesList -----*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
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

    /*----- To handle error message ----*/
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
