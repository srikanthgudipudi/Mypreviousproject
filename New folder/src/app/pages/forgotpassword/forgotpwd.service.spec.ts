/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * ForgotService spec file is used to test the ForgotService.
 * ForgotService file have below methods:
 * getForgotPassword(email: string): Test method to get forgot password.
 * getOtpValue(mobile): Test method to get otp to the registerd mobile number.
 * sendingOtp(otpnumber, mobile): Test method to is used to send encrypted otp number.
 * getForgotPassword(userLogin: string): Test method to used to get the forgot password through email from
  post data and used in forgot password pop up.
 * validateAnsweredSecQues(questions, qCount): Test method to get the validate answered Security questions from post data,
  this method used in security questions list.
 * getSecurityQuestionsByUserName(userName): Test method to get the security questions list by Username from post data,
  this method used in security questions list.
 * extractData(res: Response): Test method to extract the data.
 * handleError(error: Response | any): Test method to handle the error page.
 */
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*----    Test related module imports   ----*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ForgotService } from './forgotpwd.service';
import * as config from '../../../app/app.config';

/*---- In Jasmine we use the describe function to group our tests together ----*/
describe('forgot service', () => {
    let subject: ForgotService = null;
    let backend: MockBackend = null;
    /*----   Jasmine runs the beforeEach function before each of the tests   ----*/
    beforeEach(() => {
        /*----   Use TestBed to configure module for the tests below   ----*/
        TestBed.configureTestingModule({
            providers: [
                ForgotService,
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
            ],
        });
    });
    beforeEach(inject([ForgotService, MockBackend], (forgotService, mockBackend) => {
        subject = forgotService;
        backend = mockBackend;
    }));
    /**---- To get forgot password ----- */
    it('should verify the getForgotPassword ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).
                toEqual(config.API_END_POINT + '/api/v1/users/forgotpassword/sendemail');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: { status: 200 }
            });
            connection.mockRespond(new Response(options));
        });
        subject.getForgotPassword('').subscribe((response) => {
            expect(response).toEqual({ status: 200 });
        });
    });
    /**-----To get OTP value--------**/
    it('should verify the get OtpValue ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).
                toEqual(config.API_END_POINT + '/api/v1/users/forgotpassword/sendotp');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: { status: 200 }
            });
            connection.mockRespond(new Response(options));
        });
        subject.getOtpValue('').subscribe((response) => {
            expect(response).toEqual({ status: 200 });
        });
    });
    /**-----To send OTP value--------**/
    it('should verify the sending Otp ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).
                toEqual(config.API_END_POINT + '/api/v1/users/verify/otp');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: { status: 200 }
            });
            connection.mockRespond(new Response(options));
        });
        subject.sendingOtp('', '').subscribe((response) => {
            expect(response).toEqual({ status: 200 });
        });
    });
    /** ----- To validate answers and questions ------*/
    it('should validate AnsweredSecQues ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).
                toEqual(config.API_END_POINT + '/api/v1/users/verify/securityquestions');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: { status: 200 }
            });
            connection.mockRespond(new Response(options));
        });
        subject.validateAnsweredSecQues('', '').subscribe((response) => {
            expect(response).toEqual({ status: 200 });
        });
        subject.validateAnsweredSecQues('', 3).subscribe((response) => {
            expect(response).toEqual({ status: 200 });
        });
    });

    /** ----- To get security questions by Username ----- */
    it('should validate getSecurityQuestionsByUserName ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).
                toEqual(config.API_END_POINT + '/api/v1/users/forgotpassword/securityquestions/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: { status: 200 }
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSecurityQuestionsByUserName('').subscribe((response) => {
            expect(response).toEqual({ status: 200 });
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
    /*---- Test to verify getOtpValue----*/
    it('test to verify methods', () => {
        subject.getOtpValue('');
        subject.sendingOtp('', '');
    });
});
