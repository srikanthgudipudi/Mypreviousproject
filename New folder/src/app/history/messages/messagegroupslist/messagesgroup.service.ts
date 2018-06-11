/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * MessageGroupService has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * getGroupMessages(): To get the all messages data list.
 * getSearchResult(token, searchstring):  To search the any field from list.
 * exportlist(searchstring, userToken):To export the data.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class MessagesGroupService {
    stacked: boolean;
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiendpoint: string,
        @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
    /*-- To get All Enterprise Resources --*/
    getGroupMessages(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers }); // this.apiendpoint
        return this.http.get(this.apiendpoint + '/api/v1/messagegroups', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To search the any field from list ----*/
    getSearchResult(token, searchstring) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers }); // this.apiendpoint
        return this.http.get(this.apiendpoint + '/api/v1/messagegroups/search/' + searchstring, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- To export Data ----*/
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiendpoint + '/api/v1/messagehistory/export/' + userToken + '/' + searchstring;
        return filePath;
    }

    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
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
