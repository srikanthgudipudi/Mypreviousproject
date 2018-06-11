/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* getEnterprices(token): To get EnterprisesList.
* getLookupsList(token, lookupType): To get Lookup List.
* getMapListDetails(token, enterprise, page): To get Maplistdetails List.
* updateDistomapSettings(userToken, selectedObject): To update Display to Map Settings.
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MapSettingService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }

    /* --- To get EnterprisesList ----*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
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

    /* -- To get Maplistdetails List -- */
    getMapListDetails(token, enterprise, page) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/displaytomapsettings/' + page + '/' + enterprise, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- To update Display to Map Settings ---*/
    updateDistomapSettings(userToken, selectedObject) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('selectedObject', JSON.stringify(selectedObject));
        return this.http.put(this.apiEndPoint + '/api/v1/displaytomapsettings/', data, options)
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
