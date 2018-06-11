import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class SocialService {
  constructor(private http: Http) { }
 /*---- To handle error message ----*/
    private handleError(error: Response | any) {
        return Observable.throw(error);
    }
  /* ----- To Save Social Fields Details ----- */
  saveSocialFields(fnRadio_1, fnRadio_2, lnRadio_1, lnRadio_2, ppRadio_1, ppRadio_2, elRadio_1, elRadio_2) {
    const data = new URLSearchParams();
    data.append('firstname1', fnRadio_1);
    data.append('firstname2', fnRadio_2);
    data.append('lastname1', lnRadio_1);
    data.append('lastname2', lnRadio_2);
    data.append('profilepc1', ppRadio_1);
    data.append('profilepc2', ppRadio_2);
    data.append('email1', elRadio_1);
    data.append('email2', elRadio_2);
    return this.http.post('http://192.168.0.108:3009/socialFieldsApplicationSettings/', data)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }
  /* ----- To Save Social Login Providers Details ----- */
  saveSocialLogin(fnRadio_1, fnRadio_2, lnRadio_1, lnRadio_2, ppRadio_1, ppRadio_2, elRadio_1, elRadio_2) {
    const data = new URLSearchParams();
    data.append('facebook1', fnRadio_1);
    data.append('facebook2', fnRadio_2);
    data.append('twitter1', lnRadio_1);
    data.append('twitter2', lnRadio_2);
    data.append('google1', ppRadio_1);
    data.append('google2', ppRadio_2);
    data.append('linkedin1', elRadio_1);
    data.append('linkedin2', elRadio_2);
    return this.http.post('http://192.168.0.108:3009/socialLoginApplicationSettings/', data)
      .map((response: Response) =>
        response.json());
  }
}
