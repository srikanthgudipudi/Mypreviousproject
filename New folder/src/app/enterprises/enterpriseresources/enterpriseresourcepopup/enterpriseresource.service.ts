/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/
/*
* Singleuserservices are using following functionality
  * createResource(userToken, createObject): This method is used to call api to create resource.
  * updateResource(userToken, selectedObject): This method is used to call api to update resource.
  * getLookupsList(token, lookupType): This method is used to to call api to get lookuplist.
  * getCountriesList(token): This method is used to to call api to get countrieslist.
  * getStatesList(token, selectedCountry): This method is used to to call api to get stateslist.
  * deleteResource(token, resourceId) : This  method is used to delete resources.
  * getEnterprices(token): This  method is used to get enterprices resources.
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EnterpriseResourceService {
  constructor(private http: Http, @Inject('apiEndPoint') private apiEndPoint: string) { }

  /**---- To create eneterprise resources ----*/
  createResource(userToken, createObject, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    const data = new FormData();
    data.append('resourceImage', file);
    data.append('createObject', JSON.stringify(createObject));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndPoint + '/api/v1/enterpriseresources', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*--- To update the user info ---*/
  updateResource(userToken, selectedObject, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const data = new FormData();
    data.append('resourceImage', file);
    data.append('selectedObject', JSON.stringify(selectedObject));
    return this.http.put(this.apiEndPoint + '/api/v1/enterpriseresources/' + selectedObject._id, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**--- To update Resource record id ---- */
  updateResourceRecord(userToken, selectedObject, action) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiEndPoint + '/api/v1/enterpriseresources/' + action + '/' + selectedObject._id, selectedObject, options)
      .map(this.extractData)
      .catch(this.handleError);
  }
 /* --------To get LookupList ---------*/
 getLookupsByEnterprise(token, lookupType, enterpriseId) {
  const headers = new Headers();
  headers.append('token', token);
  const options = new RequestOptions({ headers: headers });
  return this.http.get(this.apiEndPoint + '/api/v1/lookupsbyenterprise/' + lookupType + '/' + enterpriseId, options)
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

  /**---- To get the countries list ---- */
  getCountriesList(token) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/lookups/countries', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**--- To get stateslist based on country----*/
  getStatesList(token, selectedCountry) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/lookups/states/' + selectedCountry, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*-- Delete Enterprise Resource --*/
  deleteResource(token, resourceId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiEndPoint + '/api/v1/enterpriseresources/' + resourceId, options)
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
