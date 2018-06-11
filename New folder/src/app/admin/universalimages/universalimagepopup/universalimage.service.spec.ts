/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * Singleimageservice spec is used to test Singleimageservices.
  * Singleimageservices are using following functionality
  * createUniversalImage(userToken, createObject, file): This method is used to test create universal image.
  * updateUniversalImage(userToken, univimag, file): This method is used to test update universal image.
  * getLookupsList(token, lookupType): This method is used to test getLookupsList.
  * deleteUniversalImage(token, univImageId): Test to Delete UniversalImage.
  * getEnterprices(token): This method is used to test get enterprises.
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UniversalImageservice } from './universalimage.service';
import * as config from '../../../app.config';
describe('Singleimageservices', () => {
    let subject: UniversalImageservice;
    let backend: MockBackend;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UniversalImageservice,
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
    beforeEach(inject([UniversalImageservice, MockBackend], (advertisements, mockBackend) => {
        subject = advertisements;
        backend = mockBackend;
    }));
    /*---- Test to create Universal Image ----*/
    it('should be called create Universal Image', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/universalimages');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createUniversalImage('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to update Universal Image----*/
    it('should be called update Universal Image', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/universalimages/undefined');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateUniversalImage('', '', '').subscribe((data) => {
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
       /*---- Test to delete Universal Image----*/
    it('should be called delete Universal Image', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/universalimages/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteUniversalImage('', '').subscribe((data) => {
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
            connection.mockRespond(new Response(options));
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
