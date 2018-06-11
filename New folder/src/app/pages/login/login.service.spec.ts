/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 *  Login Service spec file is used to test the Login Service.
 * Login Service spec have below methods:
 * getAuthorised(username: string, password: string, regToken: any): This method used to check whether the user name exist or not.
 * logout(token): This method is used to send request to logout.
 * extractData(res: Response): To extract data.
 * handleError(error: Response | any): To handle error in http calls.
 */

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*---- Test related module imports ----*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginService } from './login.service';
import * as config from '../../app.config';

/*---- In Jasmine we use the describe function to group our tests together ----*/
describe('LoginService', () => {
    let subject: LoginService;
    let backend: MockBackend;
    /*---- Jasmine runs the beforeEach function before each of the tests ----*/
    beforeEach(() => {
        /*---- Use TestBed to configure module for the tests below ----*/
        TestBed.configureTestingModule({
            providers: [
                LoginService,
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
    beforeEach(inject([LoginService, MockBackend], (changepassword, mockBackend) => {
        subject = changepassword;
        backend = mockBackend;
    }));
    /*---- To check logout----*/
    it('should be subscribed logout ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/logout');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.logout('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
      /*---- To check get Authorised----*/
    it('should be subscribed get Authorised ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/login');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getAuthorised('', '', '').subscribe((response) => {
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
        subject.logout('').subscribe(r => {
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
        subject.logout('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
