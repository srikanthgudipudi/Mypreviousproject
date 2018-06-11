/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/*
* Fleet Attribute service file have below methods:
* getAttributesListing(userToken): To get the all fleets list.
* getAttributesSearchListing(searchstring, userToken): To search the winning person by username.
* searchAttributes(userToken, advancedObj): This method is used to get advance search details.
* exportlist(searchstring, userToken):This method used download the data.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FleetAttributesModel } from './attributes.component';
@Injectable()
export class AttributesService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To get the all fleet attribute list ----*/
    getAttributesListing(userToken): Observable<FleetAttributesModel[]> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleettypeattributes', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get the fleet attribute list by search keyword ----*/
    getAttributesSearchListing(searchstring, userToken): Observable<FleetAttributesModel[]> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleettypeattributes/search/' + searchstring, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- This method is used to get advance search details ----- */
    searchAttributes(userToken, advancedObj) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('advancedObj', JSON.stringify(advancedObj));
        return this.http.post(this.apiEndPoint + '/api/v1/fleettypeattributes/advancedsearch', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /** ---This method is used to download fleettypeattributes data ----  */
    exportlist(searchstring, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiEndPoint + '/api/v1/fleettypeattributes/export/' + userToken + '/' + searchstring;
        return filePath;
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
