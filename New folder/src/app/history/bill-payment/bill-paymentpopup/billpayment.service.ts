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
* createBillhistory(createBillhistory, userToken): To create bill history details
* deleteBillhistory(billId, token): To get all list of deleted bill history
* updateBillhistory(editBill, billId, userToken): To update bill history data
* getLookupsList(token, lookupType): To get Lookup Data based on the Lookup Type
* getSearchResult(searchString, userToken): To display login history search results
* extractData(): To extract the data
* handleError(): To handle error messages.
   ----- */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class BillpaymentService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To create bill history details ----*/
    createBillhistory(createBillhistory, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new URLSearchParams();
        data.append('billhistoryObj', JSON.stringify(createBillhistory));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/billpaymenthistory', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*** To get enterprise details ***/
    getenterprisesdata(token, enterpriseid) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprise/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* To get all list of deleted bill history*/
    deleteBillhistory(Id, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/billpaymenthistory/' + Id, options)
            .map(this.extractData);
    }

    /*---- To update billing history details ----*/
    updateBillhistory(editBill, billId, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/billpaymenthistory/' + billId, editBill, options)
            .map(this.extractData)
            .catch(this.handleError);
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

    /* --- To get EnterprisesList ----*/
    getEnterprises(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the timezones list based on country ---*/
    getStates(countryName) {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/states/' + countryName, options)
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
