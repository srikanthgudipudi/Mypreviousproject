/*
  * user service are using following functionality
  * deleteUserInfo(): To delete user info.
  * blockUserInfo(userId, token, reason): The api called to block the user.
  * unblockUserInfo(userId, token, reason): To api called to unblock the user.
  * updateUser(selectedUser, imgfile, token): To update user information.
  * getCurrencyFormat(): To get the currency formats.
  * getUserRoles(token): To get the user roles list.
  * createUser(token, enterprise, resource, userName,
    usrRole, enabled, email, prefernces, syncCalendar, settings, imgfile,
    enterpriseResourcesImageFilePath, enterpriseResourcesImageFileName): Called to create user.
  * createSecurityQuestions(userAccount, createsecurityQuestionsDetails, token):To create security questions.
  * updateSecurityQuestions(userAccount, sequrityQuestions, token): To update security questions.
  * getEnterprices(token): To get the enterprises list.
  * getLookupsList(token, lookupType): To get the lookup list.
  * getResourcesData(token, resourceId): To get the ResourcesData.
  * getResources(token, enterpriseId): To get Resources data by resource_id.
  * securityQuestion(userAccount, token): To get the security questions based on useraccount.
  * getsocialnetworkcalendars(token): To get the calendar sync modes.
  * saveProfilePic(img, useraccount, token): To update the profile picture.
  * updateSecurityQuestionsprofile(userAccount, sequrityQuestions, token): To update security questions.
  * updateUserProfile(selectedUser, imgfile, token): To update the userprofile.
  * reasons(): To get reasons
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class Userservice {
  constructor(private http: Http, @Inject('apiEndPoint') private apiEndPoint: string,
    @Inject('staticJsonFilesEndPoint') private staticJsonFilesEndPoint: string) { }

  /*--- To delete user info ---*/
  deleteUserInfo(userId, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiEndPoint + '/api/v1/users/' + userId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*--- To block user info ---*/
  blockUserInfo(userId, token, reason) {
    const headers = new Headers();
    const data = new URLSearchParams();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    data.append('reason', reason);
    return this.http.put(this.apiEndPoint + '/api/v1/users/block/' + userId, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*--- To unblock user info ---*/
  unblockUserInfo(userId, token, reason) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new URLSearchParams();
    const options = new RequestOptions({ headers: headers });
    data.append('reason', reason);
    return this.http.put(this.apiEndPoint + '/api/v1/users/unblock/' + userId, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*--- To update the user info ---*/
  updateUser(selectedUser, imgfile, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    const data = new FormData();
    data.append('userImage', imgfile);
    data.append('selectedUser', JSON.stringify(selectedUser));
    return this.http.put(this.apiEndPoint + '/api/v1/users/' + selectedUser._id, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To get the user roles list---*/
  getUserRoles(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/user/roles', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**-----------To update the security questions------------ */
  updateSecurityQuestions(userAccount, sequrityQuestions, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/users/securityquestions/' + userAccount, sequrityQuestions, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** ----The api called to create secuirty questions---- */
  createSecurityQuestions(userAccount, createsecurityQuestionsDetails, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndPoint + '/api/v1/users/securityquestions/' + userAccount, createsecurityQuestionsDetails, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** -----This api is called for creating the user -----  */
  createUser(token, enterprise, resource, userName,
    usrRole, enabled, email, prefernces, syncCalendar, settings, imgfile,
    enterpriseResourcesImageFilePath, enterpriseResourcesImageFileName) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    const data = new FormData();
    data.append('enterprise', JSON.stringify(enterprise));
    data.append('preferences', JSON.stringify(prefernces));
    data.append('settings', JSON.stringify(settings));
    data.append('enterpriseResourceId', resource);
    data.append('enterpriseResourcesImageFilePath', enterpriseResourcesImageFilePath);
    data.append('enterpriseResourcesImageFileName', enterpriseResourcesImageFileName);
    data.append('userAccount', userName);
    data.append('email', email);
    data.append('isEnabled', enabled);
    data.append('userRole', usrRole);
    data.append('userImage', imgfile);
    data.append('syncCalendar', JSON.stringify(syncCalendar));
    return this.http.post(this.apiEndPoint + '/api/v1/users', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** -------To get the enterprises list ------ */
  getEnterprices(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/enterprisesbyuser', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** ----To get the lookuplist --- */
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** ----To get the enterprise resource data -----*/
  getResourcesData(token, resourceId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/enterpriseresourcedata/' + resourceId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**----- To get the enterpriseresource ---- */
  getResources(token, enterpriseId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/enterpriseresource/' + enterpriseId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**--- To get the security questions based on useraccount ---*/
  securityQuestion(userAccount, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/users/securityquestions/' + userAccount, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To upload the profile pic in profile.html page---*/
  saveProfilePic(img, useraccount, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    const formData: any = new FormData();
    formData.append('uploadFileName', img, img.name);
    return this.http.post(this.apiEndPoint + '/v1/user/profile/image', formData, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* To get user Profile */
  userProfile(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/user/profile', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** ----To get the calendar sync modes------ */
  getsocialnetworkcalendars(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/CALENDAR_SYNC_MODES/0', options)
      .map(this.extractData)
      ._catch(this.handleError);
  }

  /** ----To update the user profile ----- */
  updateUserProfile(selectedUser, imgfile, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    const data = new FormData();
    data.append('userImage', imgfile);
    data.append('selectedUser', JSON.stringify(selectedUser));
    return this.http.put(this.apiEndPoint + '/api/v1/users/profile/' + selectedUser._id, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**--- To update the security questions---- */
  updateSecurityQuestionsprofile(userAccount, sequrityQuestions, token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/users/profile/securityquestions/' + userAccount, sequrityQuestions, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
     /* To get Fleet Common Name Translation */
  FleetCommonNameTranslation(token, data, lang) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/language/' + lang, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*-----To extract json data ----*/
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
