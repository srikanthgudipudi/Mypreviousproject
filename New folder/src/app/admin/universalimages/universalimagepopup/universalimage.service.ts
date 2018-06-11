/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * Singleimageservices are using following functionality
  * createUniversalImage(userToken, createObject, file): This method is used to create universal image.
  * updateUniversalImage(userToken, univimag, file): This method is used to update universal image.
  * getLookupsList(token, lookupType): This method is used to getLookupsList.
  * getCountriesList(token): This method is used to get getCountriesList.
  * deleteUniversalImage(token, univImageId): To Delete UniversalImage.
  * getEnterprices(token): This method is used to get enterprises.
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UniversalImageservice {

  constructor(private http: Http,
    @Inject('apiEndPoint') private apiEndPoint: string) { }

  /**----- This Api is used to for create the universal images -----*/
  createUniversalImage(userToken, createObject, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    const formData: any = new FormData();
    formData.append('imageFile', file);
    formData.append('imageData', JSON.stringify(createObject));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiEndPoint + '/api/v1/universalimages', formData, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*---- To update universal image ----*/
  updateUniversalImage(userToken, univimag, file) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    const formData: any = new FormData();
    formData.append('imageFile', file);
    formData.append('imageData', JSON.stringify(univimag));
    return this.http.put(this.apiEndPoint + '/api/v1/universalimages/' + univimag._id, formData, options)
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

  /*-- Delete Enterprise Universal Image --*/
  deleteUniversalImage(token, univImageId) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.apiEndPoint + '/api/v1/universalimages/' + univImageId, options)
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
    return Observable.throw(error);
  }

}
