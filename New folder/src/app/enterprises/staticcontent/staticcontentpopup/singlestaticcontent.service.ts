/**Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com */
/**
 * SingleEnterpriseStaticContentService have below methods.
 * getEnterprises(userToken): To Get Enterprises list
 * getFleetNameByEntId(userToken, enterpriseId): To Get Fleets Details
 * getMenuListByEntId(userToken, enterpriseId): To Get parent menu details by enterprise
 * getMenuListByFleetId(userToken, enterpriseId, fleetId): To Get parent menu details by fleet
 * getLookupsList(token, lookupType): To get Lookup Data based on the Lookup Type
 * createEnterpriseStaticContent(enterpriseStaticContentData, userToken, imageFile): To create the static content
 * updateEnterpriseStaticContent(id, editObj, userToken): To update the static content
 * deleteEnterpriseStaticContent(staticContentId, token): To delete static content
 * extractData(): To extract the data
 * handleError(): To handle error messages.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SingleStaticContentService {

    /**---- Construstor for ststic content service -----*/
    constructor(private http: Http,
        @Inject('apiEndPoint') public apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }

    /* --- To get Enterprises list ---- */
    getEnterprises(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesByUser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- To get Fleets Details ------ */
    getFleetNameByEntId(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/listing/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- To get parent menu details by enterprise------ */
    getMenuListByEntId(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/parent/enterprisestaticcontent/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- To get parent menu details by fleet ------ */
    getMenuListByFleetId(userToken, enterpriseId, fleetId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/parent/enterprisestaticcontent/' + enterpriseId + '/' + fleetId, options)
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

    /*---- To create the static content ----*/
    public createEnterpriseStaticContent(enterpriseStaticContentData, userToken, imageFile) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new FormData();
        data.append('entityMenuObj', JSON.stringify(enterpriseStaticContentData));
        data.append('imageFile', imageFile);
        return this.http.post(this.apiEndPoint + '/api/v1/enterprisestaticcontent', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To update the static content ----*/
    public updateEnterpriseStaticContent(id, editObj, userToken, imageFile) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new FormData();
        data.append('entityMenuObj', JSON.stringify(editObj));
        data.append('imageFile', imageFile);
        return this.http.put(this.apiEndPoint + '/api/v1/enterprisestaticcontent/' + id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* To delete static content */
    deleteEnterpriseStaticContent(staticContentId, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/enterprisestaticcontent/' + staticContentId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* To extract the json data */
    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    /* To handle error message */
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}
