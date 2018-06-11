/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * NotificationService has the following methods:
 * getNotifications(userToken, searchTerm); To get the notifications.
 * changeStatus(notificationId: any, status: any, token: any): This method is used to Updates read status.
 * deleteNotification(notificationId: any, token: any): This method is used to Updates delete flag changes.
 * getNotification(recordId, pageName, token): To get notification in Detail.
 * exportlist(searchstring, userToken): To export data.
 * getLookupsList(token, lookupType): To get Lookup Data based on the Lookup Type.
 * advancedSearch(token, notificationsObj): To get Advanced search results.
 * extractData(res: Response): To extract the notification list Data.
 * handleError(error: Response | any): This method is used to handle errors.
*/

import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NotificationsComponent } from './notifications.component';

@Injectable()
export class NotificationsService {
  stacked: boolean;
  filePath: any;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiEndPoint: string,
    @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }

  /*-----To get Notifications ------ */
  getNotifications(userToken, searchTerm): Observable<NotificationsComponent[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    if (searchTerm === null || searchTerm === '') {
      return this.http.get(this.apiEndPoint + '/api/v1/notifications', options)
        .map(this.extractData)
        .catch(this.handleError);
    } else {
      return this.http.get(this.apiEndPoint + '/api/v1/notifications/search/' + searchTerm, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
  }

  /* ---- Function To Delete Notification ---- */
  deleteNotification(notificationid: any, token: any) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiEndPoint + '/api/v1/notifications/' + notificationid, options).map(this.extractData)
      .catch(this.handleError);
  }

  /* ---- Function To change read status of notification ---- */
  changeStatus(notificationId: any, status: any, token: any) {
    if (status === 'Read') {
       status = 'read';
    } else {
       status = 'unread';
    }
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    data.append('readStatus', status);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/notifications/' + status + '/' + notificationId, data, options).map(this.extractData)
      .catch(this.handleError);
  }

  /* ---- To get notification in Detail ---- */
  getNotification(recordId, pageName, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/notifications/detailactions/' + pageName + '/' + recordId, options)
      .map(this.extractData)
      .catch(this.handleError);

  }
  /**--- To export Data---- */
  exportlist(searchstring, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    if (searchstring === undefined || searchstring === '') {
      this.filePath = this.apiEndPoint + '/api/v1/notifications/export/' + userToken + '/' + ' ';
    } else {
      this.filePath = this.apiEndPoint + '/api/v1/notifications/export/' + userToken + '/' + searchstring;
    }
    return this.filePath;
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
  /**---- To get Advanced search results ----*/
  advancedSearch(token, notificationsObj) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    data.append('notificationsObj', JSON.stringify(notificationsObj));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndPoint + '/api/v1/notifications/advancedsearch', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /* To extract json data*/
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
