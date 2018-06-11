/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * In ChangePasswordService have below methods.
 * getForgotPassword(userLogin: string): This method used to get the forgot password through email from
  post data and used in forgot password pop up.
 * getOtpValue(mobile): To get OTP value.
 * verify(address: any): This method is used to verify the token.
 * sendingOtp(otpnumber, mobile): To send OTP value.
 * resetPassword(newPassword: string, confirmPassword: string, sptoken): To reset password.
 * resetPassword(newPassword: string, confirmPassword: string, sptoken): This method used to get the reset password link from post data.
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
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class ChangePasswordService {

  /**---- Constructor for change password service ----*/
  constructor(private http: Http, @Inject('apiEndPoint') private apiEndPoint: string) { }

  /**---- To get forgot password ----- */
  getForgotPassword(userLogin: string) {
    const data = new URLSearchParams();
    data.append('userLogin', userLogin);
    return this.http.post(this.apiEndPoint + '/forgotUserPassword', data)
      .map(this.extractData).catch(this.handleError);
  }

  /**---- To verify token ----- */
  verify(address: any) {
    const headers = new Headers();
    headers.append('token', address);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiEndPoint + '/api/v1/users/verify/email', options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**----- To get OTP value --------**/
  getOtpValue(mobile) {
    const data = new URLSearchParams();
    data.append('mobile', mobile);
    data.append('channel', 'SMS');
    return this.http.post(this.apiEndPoint + '/sendOTP', data)
      .map(this.extractData);
  }

  /**-----To send OTP value--------**/
  sendingOtp(otpnumber, mobile) {
    const data = new URLSearchParams();
    data.append('mobile', mobile);
    data.append('encryptedOTP', otpnumber);
    return this.http.post(this.apiEndPoint + '/otpValidation', data)
      .map(this.extractData);
  }

  /**---- To reset password ----- */
  resetPassword(newPassword: string, confirmPassword: string, sptoken) {
    const headers = new Headers();
    headers.append('sptoken', sptoken);
    const options = new RequestOptions({ headers: headers });
    const data = new URLSearchParams();
    data.append('newPassword', newPassword);
    return this.http.post(this.apiEndPoint + '/api/v1/users/resetpassword', data, options)
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
    return this.http.post(this.apiEndPoint + '/forgotPasswordSecurityQuestionsSave', data)
      .map(this.extractData);
  }

  /** ----- To get security questions by Username ----- */
  getSecurityQuestionsByUserName(userName) {
    const data = new URLSearchParams();
    data.append('userName', userName);
    return this.http.post(this.apiEndPoint + '/forgotPasswordSecurityQuestions', data)
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
