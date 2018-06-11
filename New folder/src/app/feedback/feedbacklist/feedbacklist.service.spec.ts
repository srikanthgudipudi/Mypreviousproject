/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/* FeedbacklistService spec file is used to test the FeedbacklistService.
* FeedbacklistService file have below methods:
* getMyfeedbackList(): Test to get feedbackList.
* getSearchResult(searchString): Test to search the feedback list.
* exportlist(searchstring, userToken): Test to download the data.
* getAdvancedSearch(): Test to advance search method.
* extractData(res: Response): Test to extract the data.
* handleError(error: Response | any): Test to handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FeedbacklistService } from './feedbacklist.service';
import * as config from '../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('FeedbacklistService', () => {
    let subject: FeedbacklistService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FeedbacklistService,
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
    beforeEach(inject([FeedbacklistService, MockBackend], (funfactsService, mockBackend) => {
        subject = funfactsService;
        backend = mockBackend;
    }));
    /*---- Test to get My feedbackList----*/
    it('should be called with proper arguments to get My feedbacklist', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyfeedbackList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to search the all fleets list by user name ----*/
    it('should be called with proper arguments to search feedback list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSearchResult('', '').subscribe((data) => {
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
        subject.getSearchResult('', '').subscribe(r => {
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
        subject.getSearchResult('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
    /*---- Test to advance search method ----*/
    it('should be called with proper arguments to advancedsearch any field', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback/advancedsearch');
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
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
});
