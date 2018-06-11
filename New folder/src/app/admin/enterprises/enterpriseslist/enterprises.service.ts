/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All enterprises service file have below methods:
* getSearchResult(searchString): To search the winning person by username.
* getMyAllenterprisesList(): To get the all enterprises list.
* inactivateEnterprise(enterpriseId, loginUserToken): This method is used to inactivateEnterprise resources.
* activateEnterprise(enterpriseId, loginUserToken):  This method is used to activateEnterprise resources.
* exportlist(searchstring, userToken): This method is used to download the data.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { EnterprisesDetails } from './enterprisesdetails';
@Injectable()
export class EnterprisesService {
  stacked: boolean;
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiendpoint: string) { }
  /*---- To get the all enterprises list ----*/
  getMyAllenterprisesList(userToken, searchString): Observable<EnterprisesDetails[]> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprises/search/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To search the enterprises by username ----*/
  getSearchResult(searchString, userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/v1/admin/enterprises/searchBy/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To Inactivate Enterprise ----*/
  inactivateEnterprise(enterpriseId, loginUserToken): Observable<any> {
    const headers = new Headers();
    headers.append('token', loginUserToken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    return this.http.put(this.apiendpoint + '/api/v1/enterprises/inactivate/' + enterpriseId, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- To Activate Enterprise ----*/
  activateEnterprise(enterpriseId, loginUserToken): Observable<any> {
    const headers = new Headers();
    headers.append('token', loginUserToken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    return this.http.put(this.apiendpoint + '/api/v1/enterprises/activate/' + enterpriseId, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /*---- Search Enterprise Details ----*/
  searchEnterprise(searchenterprisesDetails, userToken): Observable<EnterprisesDetails> {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/enterprises/advancedsearch', searchenterprisesDetails, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /* -- To get Lookup List -- */
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /**---export  Data---- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/enterprises/export/' + userToken + '/' + searchstring;
    return filePath;
  }
  /**---locate button---- */
  locates(locate, userToken, searchString) {
    window.localStorage.setItem('enterprisesmapURL', '?ut=' + locate + '&pn=' + 'enterprises'
      + '&cu=' + this.apiendpoint + '/api/v1/enterprises/search/' + searchString);
    this.router.navigate(['/map', 'enterprises']);
  }
  singlelocateenterprise(locate, userToken, enterpriseid, floorPlanAvailable) {
    window.localStorage.setItem('enterprisesmapURL', '?ut=' + locate + '&pn=' + 'enterprises'
      + '&sr=' + 'lcenterpriseinfo' + '&ms=' + 'emapsettings' + '&fp=' + floorPlanAvailable);
    this.router.navigate(['/map', 'enterprises']);
  }
  getdisplaytomapsetting(token, enterpriseId, pageType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/displaytomapsetting/maplocate/' + enterpriseId + '/' + pageType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
  advancedlocates(locate, advanced) {
    window.localStorage.setItem('enterprisesmapURL', '?ut=' + locate + '&pn=' + 'enterprises' +
      + '&cu=' + advanced);
    this.router.navigate(['/map', 'enterprises']);
  }
  /** --To get enterprise resources by enterprise id ---- */
  getenterpriseresourceById(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterprise/' + enterpriseid, options)
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
