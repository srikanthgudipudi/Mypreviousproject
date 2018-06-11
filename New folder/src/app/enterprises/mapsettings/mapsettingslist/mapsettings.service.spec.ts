/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* getDisplayToMapList(userToken): Test to get all the map details list.
* exportlist(searchString, userTOken): Test to export the file.
* advacncedSearch(token, valobj): Test to get advanced search results.
* simpleSearch(token, searchstring): Test to get simple search results.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MapsettingsService } from './mapsettings.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('MapsettingsService', () => {
    let subject: MapsettingsService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MapsettingsService,
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
    beforeEach(inject([MapsettingsService, MockBackend], (allFleetssService, mockBackend) => {
        subject = allFleetssService;
        backend = mockBackend;
    }));
    /*---- Test to get My Map Settings List ----*/
    it('should be called with proper arguments to get the all map settings list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/displaytomapsettings');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
             subject.getDisplayToMapList('').subscribe((data) => {
             expect(data).toEqual({ success: true });
         });
    });

        /*---- Test to get advanced search results ----*/
        it('should be called with proper arguments to get advanced search results', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/displaytomapsettings/advancedsearch');
                expect(connection.request.method).toEqual(RequestMethod.Post);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
                 subject.advacncedSearch('', '').subscribe((data) => {
                 expect(data).toEqual({ success: true });
             });
        });
                /*---- Test to get simple search results ----*/
                it('should be called with proper arguments to get simple search results', () => {
                    backend.connections.subscribe((connection: MockConnection) => {
                        expect(connection.request.url)
                            .toEqual(config.API_END_POINT + '/api/v1/search/displaytomapsettings/');
                        expect(connection.request.method).toEqual(RequestMethod.Post);
                        expect(connection.request.headers.get('Content-Type')).toEqual(null);
                        const options = new ResponseOptions({
                            body: JSON.stringify({ success: true })
                        });
                        connection.mockRespond(new Response(options));
                    });
                         subject.simpleSearch('', '').subscribe((data) => {
                         expect(data).toEqual({ success: true });
                     });
                });
        /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getDisplayToMapList('').subscribe(r => {
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
        subject.getDisplayToMapList('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
        /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined);
    });
});
