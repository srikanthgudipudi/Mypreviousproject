/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * HelpPopupService spec file is used to test the HelpPopupService service.
  * HelpPopupService service have below methods:
  * helpPageNameList(token): Test to get help name list.
  * helpPageFeaturusList(token): Test to get help page feature list.
  * createSinglehelp(help, userToken): Test to create single help list.
  * deletehelpfromList(helpid, token): Test to delete single help list.
  * updateHelp(helpdata, helpid, userToken): Test to update single help list.
  * extractData(): To extract the data
  * handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HelpPopupService } from '../helppopup/helppopup.service';
import * as config from '../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('HelpPopupService', () => {
    let subject: HelpPopupService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HelpPopupService,
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
    beforeEach(inject([HelpPopupService, MockBackend], (singleFleetservices, mockBackend) => {
        subject = singleFleetservices;
        backend = mockBackend;
    }));
 /*---- Test to get help page name list ----*/
    it('should be called with proper arguments to get help page name list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/PAGE_NAMES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.helpPageNameList('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get help page featurus list ----*/
    it('should be called with proper arguments to get help page featurus list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/PAGE_FEATURES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.helpPageFeaturusList('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to create single help data ----*/
    it('should be called with proper arguments to createSinglehelp', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/help');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createSinglehelp('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to delete help from list ----*/
    it('should be called with proper arguments to deletehelpfromList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/help/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.deletehelpfromList('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get update help ----*/
    it('should be called with proper arguments to updateHelp', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/help/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateHelp('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get reasons list ----*/
    // it('should be called with proper arguments to get reasons list', () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         expect(connection.request.method).toEqual(RequestMethod.Get);
    //         expect(connection.request.headers.get('Content-Type')).toEqual(null);
    //         const options = new ResponseOptions({
    //             body: JSON.stringify({ success: true })
    //         });
    //         
    //     });
    //     subject.reasons('', '');
    // });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            connection.mockRespond(new Response(options));
        });
        subject.deletehelpfromList('', '').subscribe(r => {
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
        subject.deletehelpfromList('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
