/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/
/*
  * SingleAdvertisementservices spec is used to test SingleAdvertisementservices.
  * SingleAdvertisementservices spec has below functionality methods.
  * getEnterprices(token): Test to Get List of Enterprices
  * getLookupsList(token, lookupType): Test to Get Advertisement Types
  * createAdvertisement(userToken, createObject, file): Test to Create Advertisement
  * updateAdvertisement(userToken, univimag, file): Test to Update Advertisement
  * deleteAdvertisement(token, resourceId): Test to Delete Advertisement
  * getAdvancedSearch(token, advancedObj): Test to get advanced search.
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Advertisementservices } from './advertisement.service';
import * as config from '../../../app.config';
describe('SingleAdvertisementservices', () => {
    let subject: Advertisementservices;
    let backend: MockBackend;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Advertisementservices,
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
    beforeEach(inject([Advertisementservices, MockBackend], (advertisements, mockBackend) => {
        subject = advertisements;
        backend = mockBackend;
    }));
    /*---- Test to create Advertisement----*/
    it('should be called create Advertisement', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createAdvertisement('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to advance search method----*/
    it('should be called to get Advanced Search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements/advancedsearch/');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getAdvancedSearch('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to update Advertisement ----*/
    it('should be called update Advertisement', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateAdvertisement('', '', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get Lookups List ----*/
    it('should be called get Lookups List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsList('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
   /*---- Test to delete Advertisement----*/
    it('should be called delete Advertisement', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteAdvertisement('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get Enterprices ----*/
    it('should be called getEnterprices', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getEnterprices('').subscribe(r => {
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
        subject.getEnterprices('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
