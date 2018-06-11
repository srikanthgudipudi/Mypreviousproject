/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * UniversalImagesService has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * getAllUniversalImages(): This method is used to getAllUniversalImages.
 * getAllAdvertisements(userToken): This method is used to call an api to getalladvertisement list.
 * getSearchResult(token, searchstring): This method is used to call an api to for search string.
 * exportlist(searchstring, userToken): This method is used to download the data
 * extractData(res: Response): This method is used to extract json data.
 * exportlist(searchString, userTOken): To Download the file.
 * handleError(error: Response | any): This method is used to handle error.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UniversalImagesService {
  stacked: boolean;

  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string) { }

  /*-- To get All Enterprise Resources --*/
  getAllUniversalImages(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers }); // this.apiendpoint
    return this.http.get(this.apiendpoint + '/api/v1/universalimages', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**--- This method  is used to get the search details----- */
  getSearchResult(token, searchstring) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers }); // this.apiendpoint
    return this.http.get(this.apiendpoint + '/api/v1/universalimages/search/' + searchstring, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* To get Advanced search results*/
  advacncedSearch(token, imagevalobj) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/universalimages/advancedsearch', imagevalobj, options)
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
    const filePath = this.apiendpoint + '/api/v1/universalimages/export/' + userToken + '/' + searchstring;
    return filePath;
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
