/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* The Users are the list of front end users
* userlist Service are using to following functionality
* getAllUsersList(token): To display searched user detail.
* rolesdetailaction(ROLE_ID, token): To get all rolesdetailaction list.
* getSearchUsersList(token, searchString): To display single user details.
* singleUser(): To display single user details.
* getLookupsList(token, lookupType): This method is used to get lookuo list.
* usersAdvancedSearch(usersSearchData, token): This method is used to get data on advance search.
* importUsersList(token, excelFile): To import resources data.
* extractData(): To extract the data.
* getUserInfoById(userToken, userid): To get user information by id.
* exportlist(searchstring, userToken): To Download the data.
* handleError(): To handle error messages.
   ----- */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Userlistdetails } from './userslist.component';
@Injectable()
export class Userslistservice {
    constructor(private http: Http,
        @Inject('apiEndPoint') private apiEndPoint: string,
        private router: Router,
    ) { }

    /* To get all users list */
    getAllUsersList(token): Observable<Userlistdetails[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/users/', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* To get all rolesdetailaction list */
    rolesdetailaction(ROLE_ID, token) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        const data = new URLSearchParams();
        data.append('roleId', ROLE_ID);
        return this.http.get(this.apiEndPoint + '/api/v1/rolerightbyuser/' + ROLE_ID, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* To display single user details */
    getSearchUsersList(token, searchString): Observable<Userlistdetails[]> {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/users/search/' + searchString, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    /** This method is used to get lookuo list */
    getLookupsList(token, lookupType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/lookups/' + lookupType, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /* This method is used to get data on advance search */
    usersAdvancedSearch(usersSearchData, token): Observable<Userlistdetails[]> {
        const headers = new Headers();
        headers.append('token', token);
        const data = new URLSearchParams();
        data.append('usersSearchData', JSON.stringify(usersSearchData));
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/users/advancedsearch', data, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /** --- To import resources data --- */
    importUsersList(token, excelFile) {
        const headers = new Headers();
        headers.append('token', token);
        const data = new FormData();
        data.append('importFile', excelFile);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiEndPoint + '/api/v1/users/import', data, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }

    /**---export  Data---- */
    exportlist(searchstring, userToken) {
        if (searchstring === undefined) {
            searchstring = '';
        }
        const headers = new Headers();
        headers.append('token', userToken);
        const filePath = this.apiEndPoint + '/api/v1/users/export/' + userToken + '/' + searchstring;
        return filePath;
    }

    /**--- This api is called to get the users locate coordinates-- */
    userlocates(locate, userToken) {
        window.localStorage.setItem('usersmapURL', '?ut=' + locate
            + '&pn='
            + 'users'
            + '&cu=' + this.apiEndPoint + '/api/v1/users');
        this.router.navigate(['/map', 'users']);
    }

    /** ---This method is used to get selected user locate coordiates---- */
    userlocatessearch(locate, userToken, searchString) {
        window.localStorage.setItem('usersmapURL', '?ut=' + locate + '&pn='
            + 'users'
            + '&cu=' + this.apiEndPoint + '/api/v1/users/search/' + searchString);
        this.router.navigate(['/map', 'users']);
    }

    /** ---This method is used to get selected user locate coordiates by advance search---- */
    userlocatesAdvancedSearch(locate, advanced) {
        window.localStorage.setItem('usersmapURL', '?ut=' + locate + '&pn='
            + 'users'
            + '&cu=' + advanced);
        this.router.navigate(['/map', 'users']);
    }

    /** -----To get the single user locate coordinates--- */
    // singlelocateuser(locate, userToken, userid, floorPlanAvailable) {
    //     window.localStorage.setItem('usersmapURL', '?ut=' + locate + '&sr=' + 'lcuserinfo' + '&pn='
    //         + 'users' + '&ms=' + 'umapsettings'
    //         + '&cfid=' + userid
    //         + '&fp=' + floorPlanAvailable);
    //     this.router.navigate(['/map', 'users']);
    // }
     singlelocateuser(locate, userToken, userid, floorPlanAvailable, currentFloorName,
        currentuid, currentFleetId, currenntFloorId, buildingName) {
        window.localStorage.setItem('usersmapURL', '?ut=' + locate + '&sr=' + 'lcuserinfo' + '&pn='
            + 'users' + '&ms=' + 'umapsettings'
            + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName
            + '&cfid=' + currentuid + '&cfleetid='
            + currentFleetId + '&cufloorid=' + currenntFloorId + '&cbn=' + buildingName);
        this.router.navigate(['/map', 'users']);
    }

    /**----- To get the display map setting's data ---*/
    getselecteduserinfo(token, enterpriseId, pageType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }
    /**--- To get user inforation using Id----- */
    getUserInfoById(userToken, userid) {
        const headers = new Headers();
        headers.append('token', userToken);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/user/' + userid, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }

    /**------- This api is called to get the enteprise locate details.------ */
    getdisplaytomapsetting(token, enterpriseId, pageType) {
        const headers = new Headers();
        headers.append('token', token);
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiEndPoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
            .map(this.extractData1)
            .catch(this.handleError);
    }

    /* To extract the json data */
    private extractData(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body.result || {};
    }

    /* To extract the json data */
    private extractData1(res: Response) {
        const body = res.json();
        const userToken = res['headers'].get('token');
        window.localStorage.setItem('token', userToken);
        return body || {};
    }

    /* To handle error messages */
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }

}
