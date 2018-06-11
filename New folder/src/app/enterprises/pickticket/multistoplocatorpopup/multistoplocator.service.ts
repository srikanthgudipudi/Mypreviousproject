/**
 * getLookupsList(token, lookupType): To get Lookup List.
 * updateEnterpriseSettings(token, enterpriseid, selectedObj): To update the enterprise settings.
 * getFleetTypeList(userToken, enterpriseid): To get the fleet types list.
 * extractData(res: Response): To Extract the data.
 * handleError(error: Response | any): To handle the error page.
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MultiStopLocatorService {
  stacked: boolean;
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiendpoint: string, @Inject('staticJsonFilesEndPoint') private staticendpoint: string) { }

  /* -- To get Lookup List -- */
  getLookupsList(token, lookupType) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiendpoint + '/api/v1/lookups/' + lookupType, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To update the enterprise settings ----*/
  updateEnterpriseSettings(token, enterpriseid, selectedObj) {
    const headers = new Headers();
    headers.append('token', token);
    const options = new RequestOptions({ headers: headers });
    return this.http.put(this.apiendpoint + '/api/v1/enterprises/settings/' + enterpriseid, selectedObj, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**---- To get the fleet types list ----*/
  getFleetTypeList(userToken, enterpriseid) {
    const headers = new Headers();
    headers.append('token', userToken);
    const options = new RequestOptions({ headers: headers });
    if (enterpriseid) {
        return this.http.get(this.apiendpoint + '/api/v1/lookupsbyenterprise/FLEET_TYPES/' + enterpriseid, options)
            .map(this.extractData)
            .catch(this.handleError);
    } else {
        return this.http.get(this.apiendpoint + '/api/v1/lookupsbyenterprise/FLEET_TYPES/0', options)
            .map(this.extractData)
            .catch(this.handleError);
    }
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
