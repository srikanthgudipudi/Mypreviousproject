/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * FleetTypeService spec file have below methods:
 * getEnterprices(token): Test method to get the enterprises list.
 * createFleetType(fleettypesData, token): Test method to create the fleet type.
 * deletefleettype(token, deletefleettype): Test method to delete the fleet type.
 * getUniversalimgs(token, enterpriseId): Test method to get the universal image names.
 * updateFleetType(fleettypesData, token, fleetid): Test method to update the fleet type.
 * getLookupsList(token, lookupType): Test to get lookup list based on the lookup types.
 * extractData(res: Response): Test method to extract the data.
 * handleError(error: Response | any): Test method to handle the error page.
 */
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FleetTypeService } from './fleettype.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('FleetTypeService', () => {
    let subject: FleetTypeService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FleetTypeService,
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
    beforeEach(inject([FleetTypeService, MockBackend], (allfleettypelistingService, mockBackend) => {
        subject = allfleettypelistingService;
        backend = mockBackend;
    }));
    /*---- To get the enterprises list ----*/
    it('should be called with proper arguments to get the enterprises list', () => {
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
    /*---- To create the fleet type ----*/
    it('should be called with proper arguments to create the fleet type', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createFleetType('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To delete the fleet types ----*/
    it('should be called with proper arguments to delete the fleet type', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deletefleettype('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
        /*---- Test to verify update the fleet types ----*/
        it('should be called with proper arguments to update the fleet types', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/fleettypes/');
                expect(connection.request.method).toEqual(RequestMethod.Put);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.updateFleetType('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
        /*---- To get look up results based on lookup types ----*/
        it('should be called with proper arguments to get look up results based on lookup types', () => {
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
          /*---- Test to check fleetTypes used or not  ----*/
          it('should be called with proper arguments to check fleetTypes used or not ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/fleettypes/');
                expect(connection.request.method).toEqual(RequestMethod.Post);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getUsedFleetTypeList('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getLookupsList('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
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
        subject.getLookupsList('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
