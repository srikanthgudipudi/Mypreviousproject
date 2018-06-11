/**
 * FleetTypeService have below methods:
 * getEnterprices(token): To get the enterprises list.
 * createFleetType(fleettypesData, token): To create the fleet type.
 * deletefleettype(token, deletefleettype): To delete the fleet type.
 * getUniversalimgs(token, enterpriseId): To get the universal image names.
 * updateFleetType(fleettypesData, token, fleetid): To update the fleet type.
 * getLookupsList(token, lookupType): To get the lookup types.
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FleetTypeService {
    stacked: boolean;
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiendpoint: string) { }

    /**--- To get the enterprises list ----*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiendpoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**--- To create the fleet type ----*/
    createFleetType(fleettypesData, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiendpoint + '/api/v1/fleettypes', fleettypesData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

     /**---- To delete the fleet type ----*/
     deletefleettype(token, fleetTypeData) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiendpoint + '/api/v1/fleettypes', fleetTypeData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- To update the fleet type ----*/
    updateFleetType(fleettypesData, token, fleettypeid) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiendpoint + '/api/v1/fleettypes/' + fleettypeid, fleettypesData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* -- To get Lookup List -- */
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* -- To check fleetTypes used or not -- */
    getUsedFleetTypeList(token, fleetTypesNamesObj, enterpriseId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiendpoint + '/api/v1/fleettypes/' + enterpriseId, fleetTypesNamesObj, options)
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
