/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * getResourcesData(token, resourceId): To get the users data.
  * getResources(token, enterpriseId): To get the users under the enterprise.
  * getmessagetypes(token, messagetype): To get the message types.
  * getEnterprices(token): This method is used to get enterprises.
  * createGroup(messageObj, token, file):  To create a Group Message.
  * editGroup(messageObj, token, file):  To create a Group Message.
  * deleteGroupMessage(token, messagingid): Delete Group message.
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MessageGroupService {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }

    /*--- Get the EnterpriseNameByFleetId list ---*/
    getUserListByEntId(userToken, enterpriseId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/messagegroup/users/' + enterpriseId, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- Get the EnterpriseNameByFleetId list ---*/
    getUserlistByRecordId(userToken, recordId) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/messagegroups/' + recordId, options)
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
    /*-- To get List of Enterprises --*/
    getEnterprices(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To create a group message ----*/
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
     /*---- To edit a group message ----*/
    editGroup(messageObj, memberData, token) {
        const headers = new Headers();
        headers.append('token', token);
        const data = new URLSearchParams();
        data.append('groupEditData', JSON.stringify(messageObj));
        data.append('memberData', JSON.stringify(memberData));
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/messagegroup/' + messageObj._id, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*-- Delete Group Message  --*/
     deleteGroupMessage(userToken, groupData) {
        const headers = new Headers();
        headers.append('token', userToken);
        const data = new URLSearchParams();
        data.append('groupData', JSON.stringify(groupData));
        const options = new RequestOptions({ headers: headers });
        // const enterpriseId = 1;
        return this.http.delete(this.apiEndPoint + '/api/v1/messagegroup/' + groupData._id, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
     /*--- To block Group Message  info ---*/
  blockGroupMessageInfo(groupId, token) {
     const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/messagegroup/close/' + groupId, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

/*--- To unblock Group Message  info ---*/
   unblockGroupInfo(groupId, token) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/messagegroup/active/' + groupId, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
    /*To extract json data*/
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body || {};
    }
    /* To handle error message */
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        return Observable.throw(error);
    }
}

