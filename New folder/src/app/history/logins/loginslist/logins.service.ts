/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* HistoryComponent have below methods.
* getLoginHistoryList(token): To display all login history list
* getSingleLoginHistoryList(loginHistoryId, token): To display single login history details
* deleteLoginHistory(loginHistoryId, token): To delete login history
* getSearchResult(searchString, userToken): To display login history search results.
* searchLoginhistory(advancedObj, token): To get single login history list.
* getLookupsList(token, lookupType): To get Lookup Data based on the Lookup Type .
* extractData(): To extract the data
* exportlist(searchstring, userToken): TO Download the data
* handleError(): To handle error messages.
   ----- */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginsComponent } from './logins.component';

@Injectable()
export class LoginsService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /* To get all login history list */
    getLoginHistoryList(token): Observable<LoginsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/loginhistory', options)
            .map(this.extractData);
    }

    /* To get single login history list */
    getSingleLoginHistoryList(loginHistoryId, token): Observable<LoginsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/loginhistory/' + loginHistoryId, options)
            .map(this.extractData);
    }

    /* To delete login history */
    deleteLoginHistory(loginhistoryid, token): Observable<LoginsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/loginhistory/' + loginhistoryid, options)
            .map(this.extractData);
    }

    /**---export  Data---- */
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiEndPoint + '/api/v1/loginhistory/export/' + userToken + '/' + searchstring;
        return filePath;
    }

    /*---- To get login history search results ----*/
    getSearchResult(searchstring, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/loginhistory/search/' + searchstring, options)
            .map(this.extractData).catch(this.handleError);
    }

    /* To get single login history list */
    searchLoginhistory(advancedObj, token): Observable<LoginsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('advancedObj', JSON.stringify(advancedObj));
        return this.http.post(this.apiEndPoint + '/api/v1/loginhistory/advancedsearch', data, options)
            .map(this.extractData);
    }

    /*-- To get Lookup Data based on the Lookup Type --*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* To extract the json data */
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body || {};
    }

    /*-----  To handle the Error page ----- */
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
