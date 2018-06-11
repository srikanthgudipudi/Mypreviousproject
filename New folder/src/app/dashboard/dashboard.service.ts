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

* updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken): To update enterprise details
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Dashboardservice {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }


    /*--- Get the getEnterpriseResourceCountryAndCount ---*/
    getEnterpriseResourceCountryAndCount(): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/enterpriseresources/country', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- Get the getFleetByCountryAndCount ---*/
    getFleetByCountryAndCount(): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/fleets/country', options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /*--- Get the getEventsByCountryAndCount ---*/
    getEventsByCountryAndCount(): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/events/country', options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /*--- Get the getFleetReservationByCountryAndCount ---*/
    getFleetReservationByCountryAndCount(): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/fleetreservations/country', options)
            .map(this.extractData)
            .catch(this.handleError);
    }


    /*--- Get the getUsersByCountryAndCount ---*/
    getUsersByCountryAndCount(): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/users/country', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get the getMonthLineData ---*/
    getMonthLineData(enterpriseid): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/mtd/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get the getYearLineData ---*/
    getYearLineData(enterpriseid): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/ytd/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get the getYearLineData ---*/
    getLifeTimeLineData(enterpriseid): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/ltd/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get the 25Week data for both ---*/
    getLifeTimeWeekData(enterpriseid): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/dashboard/wltd/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* --- To search the data in advance search ---- */
    advancesearch(dasboardadv, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/dashboard/advancedsearch', dasboardadv, options)
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
     /* ----- To get FleetTypeList ----- */
     getFleetTypeList(userToken, enterpriseid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        if (enterpriseid) {
            return this.http.get(this.apiEndPoint + '/api/v1/fleettypes/' + enterpriseid, options)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            return this.http.get(this.apiEndPoint + '/api/v1/fleettypes/0', options)
                .map(this.extractData)
                .catch(this.handleError);
        }
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
