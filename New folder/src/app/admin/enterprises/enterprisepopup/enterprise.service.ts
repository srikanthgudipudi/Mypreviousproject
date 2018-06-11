/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* Display single user details of front end users.
* Single user service are using to following functionality:
* reasons(action, userToken): To update the update information.
* updateUserInfo(uid, updateStatus, comment, reason, userToken): To update the user status.
* getEnterpriseDetails(enterpriseid, userToken): To call api to get enterprise details.
* getTimeZones(): This method is used to get timezones based on country.
* getLanguages(): This method is used to get languages based on country.
* getThemes(): This method is used to get themes based on country.
* getDateFormat(): This method is used to get date format based on country.
* getCurrency():This method is used to get currency based on country.
* getStates(countryName): This method is used to get states.
* getCountries():This method is used to get Countries based on country.
* getCountryCodesbyCountryName(countryName): This method is used to get country code by using countryname.
* getLookupsList(token, lookupType): To get Lookup List.
* getCurrencyFormat(): This method is used to get currency format based on country.
* deleteEnterprise(enterpriseid, userToken): This method is used to deleteEnterprise.
* addEnterprise(enterprise, userToken, file): To add enterprise details.
* EditEnterprise(enterpriseEdit, userToken, enterpriseId, file):To edit enterprise details.
* inactivateEnterprise(enterpriseId, loginUserToken, reason): TO inactive enterprise user.
* activateEnterprise(enterpriseId, loginUserToken, reason):  TO active enterprise user.
* updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken): To update enterprise details
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Enterpriseservice {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- Get selected Enterprise Details ----*/
    getEnterpriseDetails(enterpriseid, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprise/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- Delete Enterprise Details ----*/
    deleteEnterprise(enterpriseid, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/enterprises/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the country codes list based on country ---*/
    getCountryCodesbyCountryName(countryName) {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/states/' + countryName, options)
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

    /* -- To get Lookup List -- */
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- Add Enterprise Details ----*/
    addEnterprise(enterprise, userToken, file) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new FormData();
        data.append('enterprise', JSON.stringify(enterprise));
        data.append('imgfile', file);
        return this.http.post(this.apiEndPoint + '/api/v1/enterprises/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- Edit Enterprise Details ----*/
    EditEnterprise(enterpriseEdit, userToken, enterpriseId, file) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new FormData();
        data.append('enterprise', JSON.stringify(enterpriseEdit));
        data.append('imgfile', file);
        return this.http.put(this.apiEndPoint + '/api/v1/enterprises/' + enterpriseId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To update the update information ----*/
    public updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('EntId', uid);
        data.append('EntStatus', updateStatus);
        data.append('reason', reason);
        data.append('comment', comment);
        return this.http.put(this.apiEndPoint + '/v1/admin/enterprises/status', data, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }

    /*---- To Inactivate Enterprise ----*/
    inactivateEnterprise(enterpriseId, loginUserToken, reason) {
        const headers = new Headers();
        headers.append('token', loginUserToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reason', reason);
        return this.http.put(this.apiEndPoint + '/api/v1/enterprises/inactivate/' + enterpriseId, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To Activate Enterprise ----*/
    activateEnterprise(enterpriseId, loginUserToken, reason) {
        const headers = new Headers();
        headers.append('token', loginUserToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reason', reason);
        return this.http.put(this.apiEndPoint + '/api/v1/enterprises/activate/' + enterpriseId, data, options)
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

    /*---- To extract json data ----*/
    private extractData1(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body.data || {};
    }

    /*---- To handle error message ----*/
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
