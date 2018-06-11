/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* SingleLookupservices has the following methods.
* updateEnterpriseInfo(lookupdata, userToken) : To create the  lookup information.
* Single user service are using to following functionality:
* reasons(action, userToken): To update the update information.
* createlookup(lookupdata, userToken): To update the user status.
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class Lookupservice {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData1)
            .catch(this.handleError);
    }
    /*---- To create the  lookup information ----*/
    public createlookup(lookupdata, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/lookups', lookupdata, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**--------- To get lookup types -----------*/
    public getlookupType(userToken, selectedEnterprise) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookuptypes/' + selectedEnterprise, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }
    /* ----- To get lookuptype category ----- */
    lookuptypecategory(userToken, lookuptype) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookuptype, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }
    /**--------- The delete lookup  -----------*/
    public delete(lookup_id, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/lookups/' + lookup_id, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**--------- The edit lookup -----------*/
    public Edit(looksobj, lookupId, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/lookups/' + lookupId, looksobj, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To extract json data ----*/
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body.data || {};
    }
    /*---- To extract json data ----*/
    private extractData1(res: Response) {
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
