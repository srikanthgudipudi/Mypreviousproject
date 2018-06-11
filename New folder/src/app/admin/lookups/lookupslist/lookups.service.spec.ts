/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All lookups service spec file is used to test the all lookups service.
* All lookups service have below methods:
* getSearchResult(searchString, userToken): Test to search the enterprises by username.
* getMyAlllookupsList(userToken): To get the all lookups list.
* advancesearchlookup(lookupdata, userToken):Test to get advance search the lookup information.
* exportlist(searchString, userTOken): Test to export the file.
* extractData(res: Response): To extract data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LookupsService } from './lookups.service';
import * as config from '../../../app.config';
/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('AllLookupService', () => {
    let subject: LookupsService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LookupsService,
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
    beforeEach(inject([LookupsService, MockBackend], (allLookupsService, mockBackend) => {
        subject = allLookupsService;
        backend = mockBackend;
    }));
    /*---- Test to get My All lookups List ----*/
    it('should be called with proper arguments to  getMyAlllookupsList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyAlllookupsList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to search the all lookups list by user name ----*/
    it('should be called with proper arguments to getSearchResult of lookups', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/search/');
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
     /*---- Test to advance search the all lookup data----*/

it('should be called with proper arguments to getAdvanceSearchResult of lookups', () => {
    backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.url)
            .toEqual(config.API_END_POINT + '/api/v1/lookups/advancedsearch');
        expect(connection.request.method).toEqual(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual(null);
        const options = new ResponseOptions({
            body: JSON.stringify({ success: true })
        });
        connection.mockRespond(new Response(options));
    });
    subject.advancesearchlookup('', '').subscribe((data) => {
        expect(data).toEqual({ success: true });
    });
});
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
});
