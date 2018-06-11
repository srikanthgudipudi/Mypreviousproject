import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GeneralPojo } from './general.component';
@Injectable()
export class GeneralService {
  constructor(private http: Http, @Inject('apiEndPoint') private apiEndPoint: string) { }
  /*---- To handle error message ----*/
  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
  /* ----- Call API End point to save General Setting Block ----- */
  saveImage(name, description, image, profileType, maxsize, minsize,
    avatarminsize1, avatarmaxsize1, avatarType, categoryminsize1, categorymaxsize1, categoryType) {
    const formData: any = new FormData();
    formData.append('desc', description);
    formData.append('image', image);
    formData.append('profilePicTypes', profileType);
    formData.append('profilePicMax', maxsize);
    formData.append('profilePicMin', minsize);
    if (image !== '' && image !== undefined) {
      formData.append('imageName', image.name);
    }
    formData.append('avatarMinSize', avatarminsize1);
    formData.append('avatarMaxSize', avatarmaxsize1);
    formData.append('avatarTypes', avatarType);
    formData.append('categoryMinSize', categoryminsize1);
    formData.append('categoryMaxSize', categorymaxsize1);
    formData.append('categoryTypes', categoryType);
    return this.http.post(this.apiEndPoint + 'generalSettings', formData)
      .map(this.extractData)
      .catch(this.handleError);
  }
  /* ---------- Get General Block Details ---------- */
  getGeneralblockdetails(): Observable<GeneralPojo> {
    return this.http.get(this.apiEndPoint + 'generalSettings')
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
}
