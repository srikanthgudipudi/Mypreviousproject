/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 *  ImportHistoryModalComponent provider i.e., ImportHistoryServices have below methods:
 * deleteRecordHistoryList(userToken, importHistoryRecordId): This method is used to delete import history record.
 * extractData(res: Response): To extract the data.
 * handleError(error: Response | any): To handle error messages.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ImportService {

    /**---- Constructor for import service ----*/
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To delete the record ----*/
    deleteRecordHistoryList(userToken, importHistoryRecordId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/importhistory/' + importHistoryRecordId, options)
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
