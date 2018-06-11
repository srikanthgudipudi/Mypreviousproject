/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * EnterpriseResourceService spec file is used to test EnterpriseResourceService.
  * EnterpriseResourceService has the following methods:
  * createResource(userToken, createObject): This method is used to test createResource method.
  * updateResource(userToken, selectedObject): This method is used to test updateResource method.
  * updateResourceRecord(userToken, selectedObject, action): This method is used to test updateResourceRecord method.
  * getLookupsByEnterprise(token, lookupType, enterpriseId): This method is used to test lookup data based on the enterprise.
  * getLookupsList(token, lookupType): This method is used to test lookup data based on the lookup type.
  * getCountriesList(token): This method is used to test getCountriesList method.
  * getStatesList(token, selectedCountry): This method is used to test getStatesList method.
  * deleteResource(token, resourceId) : This method is used to test deleteResource method.
  * getEnterprices(token): This  method is used to test get enterprices method.
  * extractData(): To extract the data.
  * handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*--- Test related module imports ----*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import * as config from '../../../app.config';
import { EnterpriseResourceService } from './enterpriseresource.service';
/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Single EnterpriseResource', () => {
    let subject: EnterpriseResourceService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EnterpriseResourceService,
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
                    provide: 'staticJsonFilesEndPoint',
                    useValue: config.STATIC_JSONFILES_END_POINT
                },
                {
                    provide: 'apiEndPoint',
                    useValue: config.API_END_POINT
                },
            ],
        });
    });
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(inject([EnterpriseResourceService, MockBackend], (singleuserservices, mockBackend) => {
        subject = singleuserservices;
        backend = mockBackend;
    }));
    /*---- To verify create resource ----*/
    it('should be called with proper arguments for create resource ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterpriseresources');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createResource('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify updateUserInfo ----*/
    it('should be called with proper arguments for updateUserInfo ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/undefined');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateResource('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify Resource Delete ----*/
    it('should be called with proper arguments for Resource Delete ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteResource('', '').subscribe((response) => {
            expect(response).toEqual(undefined);
        });
    });
    /*---- To verify Lookup Data ----*/
    it('should be called with proper arguments for Lookup data ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsList('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify Countries list ----*/
    it('should be called with proper arguments for countries ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/countries');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getCountriesList('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    it('should be called enterprise resource block unblock', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/' + '/' + undefined);
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateResourceRecord('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To verify Country states list ----*/
    it('should be called with proper arguments for states list ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/states/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getStatesList('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify Enterprises list ----*/
    it('should be called with proper arguments for enterprises list ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
       /*---- Test to get lookup values by enterprise ---*/
       it('should be called with proper arguments to get lookup values by enterprise ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookupsbyenterprise/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsByEnterprise('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
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
        subject.getCountriesList('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
