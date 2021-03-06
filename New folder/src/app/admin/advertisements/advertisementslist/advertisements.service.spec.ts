/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/
/**
 * AdvertisementsService spec is used to test AdvertisementsService
 * AdvertisementsService has the following methods:
 * getAllAdvertisements(userToken): This method is used to test call an api to getalladvertisement list.
 * getSearchResult(token, searchstring): This method is used to test call an api to for search string.
 * exportlist(searchstring, userToken): This method is used to test download the data
 * getservercurrentutctime(token): This method is used to test current utc time.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 */
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AdvertisementsService } from './advertisements.service';
import * as config from '../../../app.config';
describe('AdvertisementsService', () => {
    let subject: AdvertisementsService;
    let backend: MockBackend;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AdvertisementsService,
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
    beforeEach(inject([AdvertisementsService, MockBackend], (advertisements, mockBackend) => {
        subject = advertisements;
        backend = mockBackend;
    }));
    /*---- Test to get Universal Images List ----*/
    it('should be called universal images List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getAllAdvertisements('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
     /*---- Test to get Universal Images List ----*/
    it('should be called universal images List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getAllAdvertisements('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
     /*---- Test to get Universal Images Search ----*/
    it('should be called universal Images search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/advertisements/search/');
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
    /*---- Test to get Export List ----*/
      it('should be called with  Export Data', () => {
          subject.exportlist(undefined, '' );
    });

    it('should be called utc', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/utc');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getservercurrentutctime('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract utc mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getservercurrentutctime('').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({});
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getSearchResult('', '').subscribe(r => {
            const out: any = r;
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
