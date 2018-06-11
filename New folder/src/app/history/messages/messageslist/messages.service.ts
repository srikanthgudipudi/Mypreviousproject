/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * MessageService has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * getMessages(): To get the all messages data list.
 * getSearchResult(token, searchstring):  To search the any field from list.
 * exportlist(searchstring, userToken):To export the data.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class MessagesService {
    stacked: boolean;
    constructor(private http: Http,
        private router: Router,
        @Inject('apiEndPoint') private apiendpoint: string,
        @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }
    /*-- To get All Enterprise Resources --*/
    getMessages(userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers }); // this.apiendpoint
        return this.http.get(this.apiendpoint + '/api/v1/messagehistory', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To search the any field from list ----*/
    getSearchResult(token, searchstring) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers }); // this.apiendpoint
        return this.http.get(this.apiendpoint + '/api/v1/messagehistory/search/' + searchstring, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- To export Data ----*/
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiendpoint + '/api/v1/messagehistory/export/' + userToken + '/' + searchstring;
        return filePath;
    }
    advanceSearchHistory(historydata, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new URLSearchParams();
        data.append('historydata', JSON.stringify(historydata));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiendpoint + '/api/v1/messagehistory/advancedsearch', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    locates(locate, userToken, search) {
        if (window.localStorage.getItem('lcmhistory') === 'lcmhistorydata') { // fleet reservations advance search url
            window.localStorage.setItem('messagemapURL', '?ut=' + locate + '&pn='
                + 'messagehistory'
                + '&ms=' + 'mhmapsettings' + '&cu=' + window.localStorage.getItem('lcmhistory'));
            this.router.navigate(['/map', 'message']);
        } else if (search !== undefined && search !== null && search !== '') {
            window.localStorage.setItem('messagemapURL', '?ut=' + locate + '&pn='
                + 'messagehistory'
                + '&ms=' + 'mhmapsettings' + '&cu=' + this.apiendpoint + '/api/v1/messagehistory/search/' + search);
            this.router.navigate(['/map', 'message']);
        } else {
            window.localStorage.setItem('messagemapURL', '?ut=' + locate + '&pn='
                + 'messagehistory'
                + '&ms=' + 'mhmapsettings' + '&cu=' + this.apiendpoint + '/api/v1/messagehistory');
            this.router.navigate(['/map', 'message']);
        }
    }
    getMessageHistoryInfoById(userToken, messagehistoryid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiendpoint + '/api/v1/messagehistory/' + messagehistoryid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // singlelocateMessageHistory(locate, userToken, messagehistoryid, floorPlanAvailable) {
    //     window.localStorage.setItem('messagemapURL', '?ut=' + locate + '&sr=' + 'lcmessagehistoryinfo' + '&pn='
    //         + 'messagehistory'
    //         + '&cfid=' + messagehistoryid
    //         + '&ms=' + 'mhmapsettings' + '&fp=' + floorPlanAvailable);
    //     this.router.navigate(['/map', 'message']);
    // }
    singlelocateMessageHistory(locate, userToken, messagehistoryid, floorPlanAvailable, currentFloorName,
        currentumesid, currentFleetId, currenntFloorId, buildingName) {
        window.localStorage.setItem('messagemapURL', '?ut=' + locate + '&sr=' + 'lcmessagehistoryinfo' + '&pn='
            + 'messagehistory'
            + '&ms=' + 'mhmapsettings' + '&fp=' + floorPlanAvailable
            + '&cfn=' + currentFloorName + '&cfid=' + currentumesid
            + '&cfleetid=' + currentFleetId + '&cufloorid=' + currenntFloorId + '&cbn=' + buildingName);
        this.router.navigate(['/map', 'message']);
    }
    getdisplaytomapsetting(token, enterpriseId, pageType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiendpoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
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
