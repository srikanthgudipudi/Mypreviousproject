/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
*  MessagesHistoryService spec file is used to test the messageshistory service.
*  MessagesHistory service have below methods:
 * getMessages(): Test to get the all messages data list.
 * getSearchResult(token, searchstring):  Test to search any field from list.
 * advanceSearchHistory(historydata, userToken):Test to display message history advanced search results.
 * exportlist(searchstring, userToken):Test to export the data.
 * getLookupsList(token, lookupType): Test to get lookup data based on the lookup type.
 * getdisplaytomapsetting(token, enterpriseId, pageType): Test to get display to map settings data.
 * locates(locate, userToken, search): Test to get map using locate.
 * singlelocateMessageHistory(locate, userToken, messagehistoryid, floorPlanAvailable, currentFloorName,
        currentumesid, currentFleetId, currenntFloorId, buildingName): Test method to get single locate record.
 * getMessageHistoryInfoById(userToken, messagehistoryid): Test method to get message history information by id.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MessagesService } from './messages.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('MessagesService', () => {
    let subject: MessagesService;
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
                MessagesService,
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
    beforeEach(inject([MessagesService, MockBackend], (historyService, mockBackend) => {
        subject = historyService;
        backend = mockBackend;
    }));
       /*---- Test to get messages history List----*/
    it('should be called with proper arguments to get messages history List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/messagehistory');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMessages('').subscribe((data) => {
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
        /*---- Test to get messages history search results ----*/
    it('should be called with proper arguments to get messages history search results', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/messagehistory/search/');
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
        /*---- Test to get advanced search results for messages history----*/
    it('should be called with proper arguments to get advanced search results for messages history', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/messagehistory/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.advanceSearchHistory('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
         /*---- Test to get messages history informaton using id ----*/
         it('should be called with proper arguments to get messages history informaton using id ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/messagehistory/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getMessageHistoryInfoById('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
               /*---- Test to get display to map settings data ----*/
               it('should be called with proper arguments to get display to map settings data ', () => {
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
                /*---- Test to get location list ----*/
    it('should be called with proper arguments to get location list', () => {
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
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
    /* ---- Test to get single locate for message history list ----*/
    it('should be called with proper arguments to get single locate for message history list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.singlelocateMessageHistory('', '', '', '', '', '', '', '', '');
    });
      /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getSearchResult('', '').subscribe(res => {
            const out: any = res;
            expect(out).toEqual({ });
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
});
