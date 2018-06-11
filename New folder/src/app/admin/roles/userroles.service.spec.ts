/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/*
* UserRolesService spec file  is used to test UserRolesService.
* UserRolesService spec have the following methods:
* getRolesList():Test to get the user roles  list on page loading.
* saveRoles(ROLE_ID, NAME, DISPLAY_NAME): Test to save the created role.
* getRoleById(ROLE_ID): Test to get the role by passing role id.
* renameRole(ROLE_ID, DISPLAY_NAME): Test to remane the role.
* deleteRole(ROLE_ID): Test to delete the role.
* saveUserRolesRights(userRoles, token): Test to save the user roles right.
* getUsersRolesRights(ROLE_ID): Test to get the user role rights.
* extractData(res: Response): To Extract the json data.
* handleError(error: Response | any): To handle the Error page.
*/

/* tslint:disable:no-unused-variable  */
import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserRolesService } from './userroles.service';
import * as config from '../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('UserRolesService', () => {
    let subject: UserRolesService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserRolesService,
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
                },
            ],
        });
    });
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(inject([UserRolesService, MockBackend], (userRolesService, mockBackend) => {
        subject = userRolesService;
        backend = mockBackend;
    }));
    /*---- Test to verify rolerights list ----*/
    it('should be called with proper arguments to get the role list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/rolerights');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getRolesList('').subscribe((data) => {
            expect(data).toEqual({success: true});
        });
    });

    /*---- Test to verify single rolerights ----*/
    it('should be called with proper arguments to get the role by Id', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/roleright/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getRoleById('').subscribe((data) => {
            expect(data).toEqual({success: true});
        });
    });
    /*---- Test to verify Categories list ----*/
    it('should be called with proper arguments to delete the role', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/rolerights/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteRole('', '').subscribe((data) => {
            expect(data).toEqual({success: true});
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response deleteRole', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            connection.mockRespond(new Response(options));
        });
        const reqOptions = new BaseRequestOptions();
        subject.deleteRole('', '').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({ });
        });
    });
     /*---- Test to verify the handle error with empty response ----*/
    it('should log an error to the console with empty response deleteRole', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options: any = new ResponseOptions({
                body: {},
                status: 404
            });
            const response: any = new Response(options);
            connection.mockError(response);
        });
        subject.deleteRole('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
     /*---- To save the user roles right ----*/
    it('should be called with proper arguments to save the user roles right', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/rolerights/undefined');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        this.userRoles = [];
        subject.saveUserRolesRights(this.userRoles, '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
       /*---- To get the user role rights ----*/
    it('should be called with proper arguments to get the user role rights', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/roleright/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getUsersRolesRights('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
     /*---- Test to save the created role ----*/
    it('should be called with proper arguments to save the created role', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/rolerights');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.saveRoles('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
      /*---- To remane the role ----*/
    it('should be called with proper arguments to remane the role ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/rolerights/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.renameRole('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
});

