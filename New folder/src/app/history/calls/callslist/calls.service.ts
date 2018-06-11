/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * CallsService have below methods.
 * getCallHistoryList(token): To get call history list.
 * getLookupsList(token, lookupType): To get call status and type from lookups.
 *  deleteCallHistory(loginhistoryid, token): To delete call history.
 * callsAdvancedSearch(callsSearchData, token): To get Advanced Search result.
 * getSearchResult(searchstring, userToken): To get call history search results.
 * locates(locate, userToken, search): To map locate.
 * singlelocateCallHistory(locate, userToken, callhistoryid, floorPlanAvailable): To map single record.
 * getCallHistoryInfoById(userToken, callhistoryid): To get call history info.
 * getdisplaytomapsetting(token, enterpriseId, pageType): To get display to map settings data.
 * extractData(): To extract the data
 * exportlist(searchstring, userToken): To export the data
 * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CallsComponent } from './calls.component';

@Injectable()
export class CallsService {
    /**---- Constructor for call history service -----*/
    constructor(private http: Http,
        private router: Router,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
    /**--- To get call history list ----*/
    getCallHistoryList(token): Observable<CallsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/callhistory', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- To delete call history ----*/
    deleteCallHistory(loginhistoryid, token): Observable<CallsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/callhistory/' + loginhistoryid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /**--- To export  Data ----*/
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiEndPoint + '/api/v1/callhistory/export/' + userToken + '/' + searchstring;
        return filePath;
    }

    /**---- To get call status and type from lookups ----*/
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**----- To get Advanced Search result ----*/
    callsAdvancedSearch(callsSearchData, token): Observable<CallsComponent[]> {
        const headers = new Headers();
        headers.append('token', token);
        const data = new URLSearchParams();
        data.append('callHistoryObj', JSON.stringify(callsSearchData));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/callhistory/advancedsearch', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get call history search results ----*/
    getSearchResult(searchstring, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/callhistory/search/' + searchstring, options)
            .map(this.extractData).catch(this.handleError);
    }

    /**---- To map locate ----*/
    locates(locate, userToken, search) {
        if (window.localStorage.getItem('lccallhistory') === 'lccallhistorydata') { // call history advance search url
            window.localStorage.setItem('callsmapURL', '?ut=' + locate + '&pn='
                + 'callhistory'
                + '&ms=' + 'chmapsettings' + '&cu=' + window.localStorage.getItem('lccallhistory'));
            this.router.navigate(['/map', 'calls']);
        } else if (search !== undefined && search !== null && search !== '') {
            window.localStorage.setItem('callsmapURL', '?ut=' + locate + '&pn='
                + 'callhistory'
                + '&ms=' + 'chmapsettings' + '&cu=' + this.apiEndPoint + '/api/v1/callhistory/search/' + search);
            this.router.navigate(['/map', 'calls']);
        } else {
            window.localStorage.setItem('callsmapURL', '?ut=' + locate + '&pn='
                + 'callhistory'
                + '&ms=' + 'chmapsettings' + '&cu=' + this.apiEndPoint + '/api/v1/callhistory');
        }
        this.router.navigate(['/map', 'calls']);
    }

    /**---- To map single record ----*/
    singlelocateCallHistory(locate, userToken, callhistoryid, floorPlanAvailable, currentFloorName,
    currentucallsid, currentFleetId, currenntFloorId, buildingName) {
        window.localStorage.setItem('callsmapURL', '?ut=' + locate + '&sr=' + 'lccallhistoryinfo' + '&pn='
            + 'callhistory' + '&ms=' + 'chmapsettings'
            + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName + '&cfid=' + currentucallsid
           + '&cfleetid=' + currentFleetId + '&cufloorid=' + currenntFloorId + '&cbn=' + buildingName);
        this.router.navigate(['/map', 'calls']);
    }

    /**---- To get call history info ---*/
    getCallHistoryInfoById(userToken, callhistoryid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/callhistory/' + callhistoryid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- To get display to map settings data -----*/
    getdisplaytomapsetting(token, enterpriseId, pageType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- To extract the json data ----*/
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
