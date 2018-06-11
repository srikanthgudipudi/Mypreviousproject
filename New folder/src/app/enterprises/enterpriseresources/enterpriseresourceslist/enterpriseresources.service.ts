/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All Enterprise Users service file have below methods:
* getJsondata(token): To get Sample Data from JSON file locally.
* getAllenterpriseResources(userToken): To get All Enterprise Resources.
* getEnterpriseResourcesSearch(userToken, searchString): To search records on Enterprise Resources.
* getLookupsList(userToken, lookupType): To get Lookup Data based on the Lookup Type.
* advancedSearch(userToken, entResourceObj): To get Advanced search results.
* exportlist(searchstring, userToken): This method is used to download the data.
* updateResource(userToken, selectedObject): To update the resources data.
* enterpriselocate(locate, userToken, searchString): To get Enterprise locate data.
* getenterpriseresourceById(userToken, enterpriseresourceId): To get enterprise resources by enterprise id.
* importEnterpriseResourcesList(token, csvFile): To import enterprise resources data.
* singleenterpriselocate(locate, userToken, fleetid, floorPlanAvailable): To get single enterprise locate datails.
* enterpriselocatesearch(locate, userToken, searchString): To get enerprise location search data.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
/*---- service related imports ----*/
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class EnterpriseResourceService {
  stacked: boolean;
  constructor(private http: Http,
    private router: Router,
    @Inject('apiEndPoint') private apiendpoint: string,
  ) { }

  /*-- To get All Enterprise Resources --*/
  getAllenterpriseResources(userToken) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterpriseresources', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*-- To search records on Enterprise Resources --*/
  getEnterpriseResourcesSearch(userToken, searchString) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterpriseresources/search/' + searchString, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /*-- To get Lookup Data based on the Lookup Type --*/
  getLookupsList(userToken, lookupType) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /* ---To get Advanced search results----*/
  advancedSearch(userToken, entResourceObj) {
    const headers = new Headers();
    headers.append('token', userToken);
    const data = new URLSearchParams();
    data.append('entResourceObj', JSON.stringify(entResourceObj));
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/enterpriseresources/advancedsearch', data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---locate button---- */
  enterpriselocate(locate, userToken, searchString) {
    // + '&auth=' + userToken
    window.localStorage.setItem('enterpriseresourcemapURL', '?ut=' + locate + '&pn='
      + 'enterpriseresource'
      + '&cu=' + this.apiendpoint + '/api/v1/enterpriseresources');
    this.router.navigate(['/map', 'enterpriseresource']);
  }

  /** ---To get enerprise location search data ----*/
  enterpriselocatesearch(locate, userToken, searchString) {
    window.localStorage.setItem('enterpriseresourcemapURL', '?ut=' + locate + '&pn='
      + 'enterpriseresource'
      + '&ms=' + 'ermapsettings' + '&cu=' + this.apiendpoint + '/api/v1/enterpriseresources/search/' + searchString);
    this.router.navigate(['/map', 'enterpriseresource']);
  }

  /** --To get enterprise resources by enterprise id ---- */
  getenterpriseresourceById(userToken, enterpriseresourceId) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/enterpriseresources/' + enterpriseresourceId, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /** ---To get single enterprise locate datails -----*/
  // singleenterpriselocate(locate, userToken, peopleid, floorPlanAvailable) {
  //   window.localStorage.setItem('enterpriseresourcemapURL', '?ut=' + locate +
  //     '&sr=' + 'lcenterpriseresourcesinfo' + '&ms=' + 'ermapsettings' + '&pn='
  //     + 'people'
  //     + '&cfid=' + peopleid
  //     + '&fp=' + floorPlanAvailable);
  //   this.router.navigate(['/map', 'enterpriseresource']);
  // }
  singleenterpriselocate(locate, userToken, fleetid, floorPlanAvailable, currentFloorName,
  currententerpriseresid, currentFleetId, currenntFloorId, buildingName) {
    window.localStorage.setItem('enterpriseresourcemapURL', '?ut=' + locate +
      '&sr=' + 'lcenterpriseresourcesinfo' + '&ms=' + 'ermapsettings' + '&pn='
      + 'people'
      + '&fp=' + floorPlanAvailable + '&cfn=' + currentFloorName + '&cfid=' + currententerpriseresid
       + '&cfleetid=' + currentFleetId + '&cufloorid=' + currenntFloorId + '&cbn=' + buildingName);
    this.router.navigate(['/map', 'enterpriseresource']);
  }

  /**----- To get enterprise locate advance search data ----- */
  enterpriselocateadvancesearch(locate, advanced) {
    window.localStorage.setItem('enterpriseresourcemapURL', '?ut=' + locate + + '&pn='
      + 'people' + '&ms=' + 'ermapsettings' + '&cu=' + advanced);
    this.router.navigate(['/map', 'enterpriseresource']);
  }

  /** ---Enterprises User Export data --- */
  exportlist(searchstring, userToken) {
    if (searchstring === undefined) {
      searchstring = '';
    }
    const headers = new Headers();
    headers.append('token', userToken);
    const filePath = this.apiendpoint + '/api/v1/enterpriseresources/export/' + userToken + '/' + searchstring;
    return filePath;
  }

  /** --- To import enterprise resources data --- */
  importEnterpriseResourcesList(token, csvFile) {
    const headers = new Headers();
    headers.append('token', token);
    const data = new FormData();
    data.append('importFile', csvFile);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiendpoint + '/api/v1/enterpriseresources/import', data, options)
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
