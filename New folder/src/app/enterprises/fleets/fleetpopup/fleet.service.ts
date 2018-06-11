/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* Display single user details of front end users.
* Single user service are using to following functionality:
* reasons(action, userToken): To update the update information.
* getFleetDetails(fleetid, userToken): Get selected Fleet Details.
* updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken):To update the user status
* updateUserInfo(uid, updateStatus, comment, reason, userToken): To update the user status.
*  getSingleFleetDetails(fleetId, userToken): To get the all fleets list.
* getCountriesList(token): To get the all countries list.
* getStatesList(token, selectedCountry): To get the all State list.
* getCurrencyFormat(): Get currency Format list.
* getEnterpriseNamesList(userToken): To Enterprise Name list.
* getEnterprisepathById(userToken, enterpriseId): To Enterprise Path list.
* getLookupsList(token, lookupType): To all look up data.
* getfleetTypeAttributes(token, fleetType, enterprise): To Get fleet type attributes.
* createSingleFleet(fleet, userToken): To create singlefleet.
* deleteFleetsfromList(fleetId): To Delete singlefleet.
* updateFleet(fleet, fleetid, userToken): To Update singlefleet.
* getStates(countryName): To get state list
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import { Reasons } from './fleet.component';
import { FleetsDetails } from '../fleetslist/fleets.component';
@Injectable()
export class FleetService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }
    /*---- Get selected Fleet Details ----*/
    getFleetDetails(fleetid, userToken): Observable<FleetsDetails[]> {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleet/' + fleetid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To update the enterprise information ----*/
    public updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('entId', uid);
        data.append('entStatus', updateStatus);
        data.append('reason', reason);
        data.append('comment', comment);
        return this.http.put(this.apiEndPoint + '/v1/admin/status', data, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }
    /*---- To get the all fleets list ----*/
    getSingleFleetDetails(fleetId, userToken) {
        // const enterpriseId = 1;
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleet/' + fleetId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*----- To get child fleetTypeList ----- */
    getChildFleetTypeList(userToken, enterpriseid, fleettype) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        if (enterpriseid) {
            return this.http.get(this.apiEndPoint + '/api/v1/fleets/childfleettypes/' + enterpriseid + '/' + fleettype, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }
    /*---- To get the all countries list ----*/
    getCountriesList(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/countries', options)
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
    /*---- To get the all State list ----*/
    getStatesList(token, selectedCountry) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/states/' + selectedCountry, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* -----To Enterprise Name list------- */
    getEnterpriseNamesList(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* -----To Enterprise Path list------- */
    getEnterprisepathById(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/listing/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* -----To all look up data------- */
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getLookupsByEnterprise(token, lookupType, enterpriseId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/' + lookupType + '/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* -----To Get fleet type attributes------- */
    getfleetTypeAttributes(token, fleetType, enterprise) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/fleettypeattributes/' + fleetType + '/' + enterprise, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /* --- Get Parents Fleets List --- */
    getParentFleetList(userToken, enterpriseId, fleettype) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/fleets/parent/' + enterpriseId + '/' + fleettype, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To create singlefleet ----*/
    createSingleFleet(fleet, userToken, fleetimgfile, fleetfloorimg, fleetjsonfile, metajsonfile, boundjsonfile) {
        const temp = [1, 1, 1];
        if (fleetimgfile === null || fleetimgfile === undefined || fleetimgfile === '') {
            temp[0] = 0;
        } if (fleetfloorimg === null || fleetfloorimg === undefined || fleetfloorimg === '') {
            temp[1] = 0;
        }
        if (fleetjsonfile === null || fleetjsonfile === undefined || fleetjsonfile === '') {
            temp[2] = 0;
        }
        if (fleetjsonfile === null || fleetjsonfile === undefined || fleetjsonfile === '') {
            temp[2] = 0;
        }

        const headers = new Headers();
        headers.append('token', userToken);
        const data = new FormData();
        data.append('fileparm', temp.toString());
        data.append('fleet', JSON.stringify(fleet));
        data.append('fleetimgfile', fleetimgfile);
        data.append('fleetimgfile', fleetfloorimg);
        data.append('fleetimgfile', fleetjsonfile);
        data.append('fleetimgfile', metajsonfile);
        data.append('fleetimgfile', boundjsonfile);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/fleets', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To Delete singlefleet ----*/
    deleteFleetsfromList(fleetId) {
        const headers = new Headers();
        headers.append('token', localStorage.getItem('token'));
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/fleets/' + fleetId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To Update singlefleet ----*/
    updateFleet(fleet, fleetid, userToken, fleetimgfile, fleetfloorimg, fleetsVisual, oldFiles, removedFiles, fleetjsonfile,
        metadatajsonfile, PathBoundariesjsonfile) {
        const temp = [1, 1, 1, 1];
        if (fleetfloorimg === null || fleetfloorimg === undefined || fleetfloorimg === '') {
            temp[0] = 0;
        }
        if (fleetjsonfile === null || fleetjsonfile === undefined || fleetjsonfile === '') {
            temp[1] = 0;
        }
        if (metadatajsonfile === null || metadatajsonfile === undefined || metadatajsonfile === '') {
            temp[2] = 0;
        }
        if (PathBoundariesjsonfile === null || PathBoundariesjsonfile === undefined || PathBoundariesjsonfile === '') {
            temp[3] = 0;
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new FormData();
        data.append('fileparm', temp.toString());
        data.append('fleet', JSON.stringify(fleet));
        // data.append('fleetimgfile', fleetimgfile);
        data.append('fleetimgfile', fleetfloorimg);
        data.append('fleetimgfile', fleetjsonfile);
        data.append('fleetimgfile', metadatajsonfile);
        data.append('fleetimgfile', PathBoundariesjsonfile);
        if (fleetsVisual) {
            for (let i = 0; i < fleetsVisual.length; i++) {
                data.append('fleetimgfile', fleetsVisual[i], 'fleetsVisual_' + fleetsVisual[i].name);
            }
        }
        if (oldFiles !== undefined && oldFiles.length > 0) {
            for (let j = 0; j < oldFiles.length; j++) {
                oldFiles[j] = JSON.stringify(oldFiles[j]);
                data.append('oldFileName', oldFiles[j]);

            }
        }
        if (removedFiles !== undefined && removedFiles.length > 0) {
            for (let k = 0; k < removedFiles.length; k++) {
                data.append('removedFiles', removedFiles[k]);
            }
        }
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/fleets/' + fleetid, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**-----get state list------ */
    getStates(countryName): Observable<any[]> {
        const userToken = window.localStorage.getItem('token');
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/states/' + countryName, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    updateResourceRecord(userToken, _id, reason, parentfleet, enterpriseid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reasonActivate', reason);
        data.append('path', parentfleet);
        data.append('_id', enterpriseid);
        return this.http.put(this.apiEndPoint + '/api/v1/fleets/activate/' + _id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    inactivatefleet(userToken, _id, reason, parentfleet, enterpriseid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('reasonInactivate', reason);
        data.append('path', parentfleet);
        data.append('_id', enterpriseid);
        return this.http.put(this.apiEndPoint + '/api/v1/fleets/inactivate/' + _id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getfloorvalue(userToken, data1) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/fleets/checkfloorplan', data1, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
     /*---- Get selected Fleet Details ----*/
     getFleetDetailsByFleetid(fleetid, userToken) {
        const headers = new Headers();
         headers.append('token', userToken);
         const options = new RequestOptions({ headers: headers });
         return this.http.get(this.apiEndPoint + '/api/v1/fleetreservations/calendar/' + fleetid, options)
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
