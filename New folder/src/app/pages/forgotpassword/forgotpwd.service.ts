/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * In forgot service have below methods
 * getForgotPassword(email: string): To get forgot password.
 * getOtpValue(mobile): This method is used to get otp to the registerd mobile number.
 * sendingOtp(otpnumber, mobile): This method is used to send encrypted otp number.
 * getForgotPassword(userLogin: string): This method used to get the forgot password through email from
  post data and used in forgot password pop up.
 * validateAnsweredSecQues(questions, qCount): This method used to get the validate answered Security questions from post data,
  this method used in security questions list.
 * getSecurityQuestionsByUserName(userName): This method used to get the security questions list by Username from post data,
  this method used in security questions list.
 * extractData(res: Response): To extract the data.
 * handleError(error: Response | any): To handle the error page.
 */

/* Service related module imports */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ForgotService {

  /**---- Constructor for forgot service ----*/
  constructor(private http: Http,
    @Inject('apiEndPoint') private apiEndPoint: string) { }


  /**---- To get forgot password ----- */
  getForgotPassword(email: string) {
    const data = new URLSearchParams();
    data.append('email', email);
    return this.http.post(this.apiEndPoint + '/api/v1/users/forgotpassword/sendemail', data)
      .map(this.extractData).catch(this.handleError);
  }

  /**----- To get OTP value --------**/
  getOtpValue(mobile) {
    const data = new URLSearchParams();
    data.append('mobileNumber', mobile);
    return this.http.post(this.apiEndPoint + '/api/v1/users/forgotpassword/sendotp', data)
      .map(this.extractData);
  }

  /**-----To send OTP value--------**/
  sendingOtp(otpnumber, mobile) {
    const data = new URLSearchParams();
    data.append('mobileNumber', mobile);
    data.append('encryptedOTP', otpnumber);
    return this.http.post(this.apiEndPoint + '/api/v1/users/verify/otp', data)
      .map(this.extractData);
  }
  /** ----- To validate answers and questions ------*/
  validateAnsweredSecQues(questions, qCount) {
    const data = new URLSearchParams();
    data.append('userName', questions.username);
    data.append('question', questions.question);
    data.append('answer', questions.answer);
    if (qCount === 3) {
      data.append('qCount', 'submit');
    } else {
      data.append('qCount', qCount);
    }
    return this.http.post(this.apiEndPoint + '/api/v1/users/verify/securityquestions', data)
      .map(this.extractData);
  }
  /** ----- To get security questions by Username ----- */
  getSecurityQuestionsByUserName(userName) {
    return this.http.get(this.apiEndPoint + '/api/v1/users/forgotpassword/securityquestions/' + userName)
      .map(this.extractData);
  }

  /**----- To extract data ----- */
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
