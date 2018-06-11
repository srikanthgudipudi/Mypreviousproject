/**Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com */
/*
* EnterpriseStaticContentService spec file is used to test the enterprise static content service.
* Enterprise static content service have below methods:
* getEnterpriseStaticContent(userToken, searchTerm): Test to get enterprise static content search result list.
* getEnterpriseStaticContentList(userToken): Test to get enterprise static content list.
* advancedSearch(advSearch, userToken): Test to get an advanced search results.
* exportlist(searchstring, userToken): Test to export the data.
* extractData(res: Response): To extract data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StaticContentService } from './staticcontent.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('EnterpriseStaticContentService', () => {
    let subject: StaticContentService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StaticContentService,
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
    beforeEach(inject([StaticContentService, MockBackend], (enterpriseStaticContentService, mockBackend) => {
        subject = enterpriseStaticContentService;
        backend = mockBackend;
    }));
    /**---- Test to get static content Search List ---- */
    it('should be called with proper arguments to get the static content list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisestaticcontent/search/ ');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseStaticContent('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /**---- Test to get static content Search List ---- */
    it('should be called with proper arguments to get Enterprise Static Content List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisestaticcontent');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseStaticContentList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
      /**---- Test to get advance search lists ---- */
      it('should be called with proper arguments to get advance search lists', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisestaticcontent/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.advancedSearch('', '').subscribe((data) => {
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
        subject.getEnterpriseStaticContent('', '').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({});
        });
    });
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
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
        subject.getEnterpriseStaticContent('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
