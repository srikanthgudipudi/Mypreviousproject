/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/* Singlelookupservices spec file is used to test the Singlelookupservices.
* Singlelookservices have below functionality:
* getEnterprices(token): Test to get enterprise list data.
* delete(lookup_id, userToken): Test to delete the lookup information.
* updateUserInfo(uid, updateStatus, comment, reason, userToken): Test to update the user status.
* createlookup(lookupdata, userToken): Test to create lookup data.
* getlookupType(userToken, selectedEnterprise): Test to get the lookup types.
* Edit(looksobj, lookupId, userToken): Test to edit the lookup data.
* lookuptypecategory(userToken, lookuptype): Test to get lookuptype category.
* extractData(): To extract the data.
* handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Lookupservice } from './lookup.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('SingleLookupservices', () => {
    let subject: Lookupservice;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Lookupservice,
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
    beforeEach(inject([Lookupservice, MockBackend], (SingleLookupservices, mockBackend) => {
        subject = SingleLookupservices;
        backend = mockBackend;
    }));
    /*---- Test to update Enterprise Info ----*/
    it('should be called with proper arguments to create the lookup', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createlookup('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to getEnterprices----*/
    it('should be called with proper arguments to getEnterprices', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update Enterprise Info ----*/
    it('should be called with proper arguments to delete the lookup', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.delete('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update Enterprise Info ----*/
    it('should be called with proper arguments to get lookup types', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookuptypes/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getlookupType('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get lookup type category ----*/
    it('should be called with proper arguments to get lookup type category', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.lookuptypecategory('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update Enterprise Info ----*/
    it('should be called with proper arguments to Edit lookup', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.Edit('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.delete('', '').subscribe(r => {
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
        subject.getlookupType('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
