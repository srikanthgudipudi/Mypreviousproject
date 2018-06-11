/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * Singleimageservices are using following functionality:
 * deleteMessages(token, messagingid): To Delete message.
 * readMessages(token, messagingid): To read message.
 *  getResourcesData(token, resourceId): To get the users data.
 * getResources(token, enterpriseId): To get the users under the enterprise.
 * getmessagetypes(token, messagetype): To get the message types.
 * getEnterprices(token): This method is used to get enterprises.
 * addmessage(messageObj, token, file):  To create a message.
 * extractData(): To extract the data
 * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessageService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*---- To Delete message --*/
    deleteMessages(token, messagingid) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.delete(this.apiEndPoint + '/api/v1/messagehistory/' + messagingid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*-- To read message --*/
    readMessages(token, messagingid) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        return this.http.put(this.apiEndPoint + '/api/v1/messagehistory/read/' + messagingid, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- To get the users data ----*/
    getResourcesData(token, resourceId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterpriseresourcedata/' + resourceId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*--- To get the users under the enterprise ----*/
    getResources(token, enterpriseId) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/users/messageto/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To get the message types ----*/
    getmessagetypes(token, messagetype) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + messagetype, options)
            .map(this.extractData)
            .catch(this.handleError);

    }

    getMessageHistoryInfoById(userToken, messagehistoryid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/messagehistory/' + messagehistoryid, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*-- To get List of Enterprises --*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /*---- To create a message ----*/
    addmessage(messageObj, token, file) {
        const headers = new Headers();
        headers.append('token', token);
        const formData: any = new FormData();
        formData.append('msgFile', file);
        formData.append('msgData', JSON.stringify(messageObj));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/messagehistory', formData, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- To create group message ----*/
    createGroup(messageObj, token, memberData) {
        const headers = new Headers();
        headers.append('token', token);
        const data = new URLSearchParams();
        data.append('groupData', JSON.stringify(messageObj));
        data.append('memberData', JSON.stringify(memberData));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/messagegroup', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**---- To extract json data ----*/
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body || {};
    }
    /* To handle error message */
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
}

