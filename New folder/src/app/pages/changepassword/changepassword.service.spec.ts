/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 *  Changepassword spec file is used to test the Changepassword.
 * Changepassword service Spec have below methods
 * getForgotPassword(userLogin: string): Test  method used to get the forgot password through email from
  post data and used in forgot password pop up.
 * getOtpValue(mobile): Test method to get OTP value.
 * verify(address: any): Test method to verify the token.
 * sendingOtp(otpnumber, mobile): Test method to send OTP value.
 * resetPassword(newPassword: string, confirmPassword: string, sptoken): Test method used to get the reset password link from post data.
 * validateAnsweredSecQues(questions, qCount): Test method used to get the validate answered Security questions from post data,
  this method used in security questions list.
 * getSecurityQuestionsByUserName(userName): Test method used to get the security questions list by Username from post data,
  this method used in security questions list.
 * extractData(res: Response): Test method to extract the data.
 * handleError(error: Response | any): Test method to handle the error page.
 */


import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*---- Test related module imports ----*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ChangePasswordService } from './changepassword.service';
import * as config from '../../app.config';
/*---- In Jasmine we use the describe function to group our tests together ----*/
describe('ChangePasswordService', () => {
    let subject: ChangePasswordService;
    let backend: MockBackend;
    /*---- Jasmine runs the beforeEach function before each of the tests ----*/
    beforeEach(() => {
        /*---- Use TestBed to configure module for the tests below ----*/
        TestBed.configureTestingModule({
            providers: [
                ChangePasswordService,
                BaseRequestOptions,
                MockBackend,
                {
                    provide: Http,
                    useFactory: (backend1: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend1, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions],
                },
                {
                    provide: 'apiEndPoint',
                    useValue: config.API_END_POINT
                },
                {
                    provide: 'staticJsonFilesEndPoint',
                    useValue: config.STATIC_JSONFILES_END_POINT
                }
            ],
        });
    });
    /*---- Jasmine runs the beforeEach function before each of the tests ----*/
    beforeEach(inject([ChangePasswordService, MockBackend], (changepassword, mockBackend) => {
        subject = changepassword;
        backend = mockBackend;
    }));
    /*---- To get Change Password ----*/
    it('should be subscribed get Change Password ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/forgotUserPassword');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getForgotPassword('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To get verify ----*/
    it('should be subscribed get verify ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/verify/email');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.verify('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To get Otp Value ----*/
    it('should be subscribed get Otp Value ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/sendOTP');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getOtpValue('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To get sending Otp ----*/
    it('should be subscribed get sending Otp ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/otpValidation');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.sendingOtp('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify change password ----*/
    it('should be subscribed change password ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/resetpassword');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.resetPassword('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To get validateAnsweredSecQues ----*/
    it('should be subscribed validateAnsweredSecQues ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/forgotPasswordSecurityQuestionsSave');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.validateAnsweredSecQues('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
        subject.validateAnsweredSecQues('', 3).subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To get security questions ----*/
    it('should be subscribed get security questions ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/forgotPasswordSecurityQuestions');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSecurityQuestionsByUserName('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            connection.mockRespond(new Response(options));
        });
        subject.getForgotPassword('').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({});
        });
    });
    /*---- Test to verify the handle error with empty response ----*/
    it('should log an error to the console with empty response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options: any = new ResponseOptions({
                body: {},
                status: 404
            });
            const response: any = new Response(options);
            connection.mockError(response);
        });
        subject.verify('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
    /*---- Test to verify the handle error with empty response ----*/
    it('should log an error to the console with empty response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options: any = new ResponseOptions({
                body: {},
                status: 404
            });
            const response: any = new Response(options);
            connection.mockError(response);
        });
        subject.getForgotPassword('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
