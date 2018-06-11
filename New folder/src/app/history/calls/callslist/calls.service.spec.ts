/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
 * CallHistoryService spec file is used to test the callhistory service.
 * CallsService have below methods.
 * getCallHistoryList(token): Test to get call history list.
 * getLookupsList(token, lookupType): Test to get call status and type from lookups.
 *  deleteCallHistory(loginhistoryid, token): Test to delete call history.
 * callsAdvancedSearch(callsSearchData, token): Test to get advanced search result.
 * getSearchResult(searchstring, userToken): Test to get call history search results.
 * locates(locate, userToken, search): Test to locate map based on supplied parameters.
 * singlelocateCallHistory(locate, userToken, callhistoryid, floorPlanAvailable): Test to locate map single record.
 * getCallHistoryInfoById(userToken, callhistoryid): Test to get call history information using id.
 * getdisplaytomapsetting(token, enterpriseId, pageType): Test to get display to map settings data.
 * exportlist(searchstring, userToken): Test method to export the data
 * extractData(): Test method to extract the data.
 * handleError(): Test method to handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { CallsService } from './calls.service';
import * as config from '../../../app.config';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('CallHistoryService', () => {
    let subject: CallsService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
            ])],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                CallsService,
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
    beforeEach(inject([CallsService, MockBackend], (historyService, mockBackend) => {
        subject = historyService;
        backend = mockBackend;
    }));
    /*---- Test to get My call history List----*/
    it('should be called with proper arguments to get My call history List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/callhistory');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getCallHistoryList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to delete call history----*/
    it('should be called with proper arguments to delete call history', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/callhistory/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteCallHistory('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get lookups list ----*/
    it('should be called with proper arguments to get lookups list', () => {
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
    /*---- Test to get login history search results ----*/
    it('should be called with proper arguments to get login history search results', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/callhistory/search/');
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
    /*---- Test to get search results for call history----*/
    it('should be called with proper arguments to get search results for call history', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/callhistory/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.callsAdvancedSearch('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
        /*---- Test to get display to map settings data ----*/
        it('should be called with proper arguments to get display to map settings data', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/displaytomapsetting/maplocate/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getdisplaytomapsetting('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
          /*---- Test to get call history info ----*/
          it('should be called with proper arguments to get call history info', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/callhistory/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getCallHistoryInfoById('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });

        /*---- Test to get map location ----*/
        it('should be called with proper arguments to get call history info', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.locates('', '', '');
        });
             /*---- Test  to get map single record  ----*/
             it('should be called with proper arguments to get call history info', () => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    expect(connection.request.headers.get('Content-Type')).toEqual(null);
                    const options = new ResponseOptions({
                        body: JSON.stringify({ success: true })
                    });
                    connection.mockRespond(new Response(options));
                });
                subject.singlelocateCallHistory('', '', '', '', '', '', '', '', '');
            });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getSearchResult('', '').subscribe(res => {
            const out: any = res;
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
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
});
