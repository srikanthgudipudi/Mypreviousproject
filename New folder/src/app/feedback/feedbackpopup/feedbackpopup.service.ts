/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* Single fun facts services have below functionality:
* reasons(action, userToken): To update individual user status.
* createFunfact(funfact, userToken): To create the fun facts.
* updateFunfact(funfactupdate, funfactsId, userToken): To update the fun facts.
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class FeedbackpopupService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }
    /*---- To create the fun facts ----*/
    createFeedback(feedbackObj, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/feedback', feedbackObj, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To update the fun facts ----*/
    updateFunfact(funfactupdate, funfactsid, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/funfacts/' + funfactsid, funfactupdate, options)
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
    // object type
    getobjecttypelist(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + 'FEEDBACK_OBJECT_TYPES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // status
    getstatustype(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + 'FEEDBACK_STATUSES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // feedback type
    feedbackType(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + 'FEEDBACK_TYPES', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    // object names
    objectNames(token, objecttype, entepriseName) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/feedback/objectname/' + entepriseName + '/' + objecttype, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To remove the feedback from list ----*/
    deletefeedback(userToken, funfactsid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/feedback/' + funfactsid, options)
            .map(this.extractData);
    }
    /*---- To update the feedback from list ----*/
    updateFeedback(feedbackid, object, userToken) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/feedback/' + feedbackid, object, options)
            .map(this.extractData);
    }
    /* --- To get EnterprisesList ----*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
       return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
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
