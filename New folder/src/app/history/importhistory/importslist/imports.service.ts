/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 *  ImportHistorylistingService file have below methods:
 * getImportHistorySeachList(searchString,userToken): To search import history list by keyword.
 * getImportHistoryListing(userToken): To get the import history list.
 * exportlist(searchstring, userToken): To export Data.
 * advancedSearch(userToken, importHistoryObj): To get the advanced import search list.
 * getLookupsList(token, lookupType): To get Lookup Data based on the Lookup Type.
 * exportSelectedHistory(importhistorylist, userToken):To export selected History
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ImportHistoryModel } from './imports.component';

@Injectable()
export class ImportsService {

    /**---- Constructor for import service ----*/
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To get the import history list ----*/
    getImportHistoryListing(userToken): Observable<ImportHistoryModel[]> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/importhistory/', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get the import search list ----*/
    getImportHistorySeachList(searchstring, userToken): Observable<ImportHistoryModel[]> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/importhistory/search/' + searchstring, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**--- To export Data---- */
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiEndPoint + '/api/v1/importhistory/export/' + userToken + '/' + searchstring;
        return filePath;
    }

    /*---- To get the advanced import search list ----*/
    advancedSearch(userToken, importHistoryObj) {
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new URLSearchParams();
        data.append('importHistoryObj', JSON.stringify(importHistoryObj));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/importhistory/advancedsearch', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get Lookup Data based on the Lookup Type --*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**--- To export selected History ---- */
    exportSelectedHistory(importhistorylist, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/importhistory/importfile/' + importhistorylist._id, options)
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
