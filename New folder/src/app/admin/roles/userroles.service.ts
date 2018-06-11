/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/*
* UserRolesService have below methods:
* getRolesList():  To get the roles list.
* saveRoles(ROLE_ID, NAME, DISPLAY_NAME): To save the created role.
* getRoleById(ROLE_ID): To get the role by passing role id.
* renameRole(ROLE_ID, DISPLAY_NAME): To remane the role.
* deleteRole(ROLE_ID): To delete the role.
* saveUserRolesRights(userRoles, token): To save the user roles right.
* getUsersRolesRights(ROLE_ID):  To get the user role rights.
* extractData(res: Response): To Extract the json data.
* handleError(error: Response | any): To handle the error page.
*/
/*---- Service related module imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UserRolesService {
    storage: Storage = window.localStorage;
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string) { }
    /*---- To get the roles list---*/
    getRolesList(token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/rolerights', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- To save the created role ----*/
    saveRoles(addUser, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/rolerights', addUser, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*--- To get the role by passing role id ----*/
    /*--- To get the role by passing role id ----*/
    getRoleById(ROLE_ID) {
        const headers = new Headers();
        headers.append('token', window.localStorage.getItem('token'));
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/roleright/' + ROLE_ID, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To remane the role ----*/
    renameRole(ROLE_ID, DISPLAY_NAME) {
        const headers = new Headers();
        headers.append('token', window.localStorage.getItem('token'));
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('roleId', ROLE_ID);
        // data.append('roleName', '');
        data.append('roleDisplayName', DISPLAY_NAME);
        return this.http.put(this.apiEndPoint + '/api/v1/rolerights/' + ROLE_ID, data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To delete the role ----*/
    deleteRole(ROLE_ID, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('roleId', ROLE_ID);
        return this.http.delete(this.apiEndPoint + '/api/v1/rolerights/' + ROLE_ID, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To save the user roles right ----*/
    saveUserRolesRights(userRoles, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndPoint + '/api/v1/rolerights/' + userRoles._id, userRoles, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*---- To get the user role rights ----*/
    getUsersRolesRights(ROLE_ID, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/roleright/' + ROLE_ID, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /*----To Extract the json data ---*/
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
