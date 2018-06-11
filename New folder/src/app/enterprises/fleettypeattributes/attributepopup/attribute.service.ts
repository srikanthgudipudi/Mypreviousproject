/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/*
* Fleet Attributes Modal Component provider i.e., SingleFleetAttributeService have below methods:
* updateFleetAttributes(userToken, fleetAttribute): This method is used to update fleet attribute.
* deleteFleetAttributes(userToken, fleetAttributeId): This method is used to delete fleet attribute.
* createFleetAttribute(userToken, fleetattributeObj): This method is used to create fleet attribute.
* getEnterpriseNamesList(userToken): This method is used to get Enterprise Names List.
* getFleettypeList(userToken): This method is used to get Fleet Types List.
* getlookUpNameList(userToken, value, enterpriseid): To get AttributeTypeList.
* getAttributeTypeList(userToken): This method is used to get Attribute Types List.
* getEnterprisepathById(userToken, enterpriseId): To get EnterprisepathById.
* getLookupTypeList(userToken): This method is used to get Lookup Types List.
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AttributeService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /* ----- To get EnterpriseNamesList ----- */
    getEnterpriseNamesList(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
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

    /* ----- To get AttributeTypeList ----- */
    getlookUpNameList(userToken, value, enterpriseid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/' + value + '/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- To get AttributeTypeList ----- */
    getAttributeTypeList(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + 'FLEET_ATTRIBUTE_TYPES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- To get LookupTypeList ----- */
    getLookupTypeList(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookuptypesbycategory', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* ----- To get EnterprisepathById ----- */
    getEnterprisepathById(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- Create Fleet Attribute----*/
    createFleetAttribute(userToken, fleetattributeObj) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('fleetAttributeObj', JSON.stringify(fleetattributeObj));
        return this.http.post(this.apiEndPoint + '/api/v1/fleettypeattributes/', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To delete singlefleet ----*/
    deleteFleetAttributes(userToken, fleetAttributeId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        // const enterpriseId = 1;
        return this.http.delete(this.apiEndPoint + '/api/v1/fleettypeattributes/' + fleetAttributeId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To update singlefleet ----*/
    updateFleetAttributes(userToken, fleetAttribute) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/fleettypeattributes/' + fleetAttribute._id, fleetAttribute, options)
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
