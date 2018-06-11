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
* getSearchResult(searchString, userToken): To display login history search results
* extractData(): To extract the data
* exportlist(searchstring, userToken): TO Download the data
* handleError(): To handle error messages.
   ----- */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BillpaymentsComponent } from './billpayments.component';
@Injectable()
export class BillpaymentsService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
    /* To get all Bill Payment history list */
    getBillPaymentHistoryList(token): Observable<BillpaymentsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/billpaymenthistory', options)
            .map(this.extractData);
    }
    /**---export  Data---- */
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiEndPoint + '/api/v1/billpaymenthistory/export/' + userToken + '/' + searchstring;
        return filePath;
    }
    /*---- To get Bill Payment history search results ----*/
    getSearchResult(searchstring, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/billpaymenthistory/search/' + searchstring, options)
            .map(this.extractData).catch(this.handleError);
    }
    /*---- To get advance search data ----*/
    billpaymentSearchAdvance(advancedObj, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('advanced', JSON.stringify(advancedObj));
        return this.http.post(this.apiEndPoint + '/api/v1/billpaymenthistory/advancedsearch', data, options)
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
