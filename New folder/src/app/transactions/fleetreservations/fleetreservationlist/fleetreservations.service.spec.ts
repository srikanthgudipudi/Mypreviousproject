/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/**
 * FleetReservationsService spec file is used to test the FleetReservationsService.
 * FleetReservationsService have below functionality methods
 * getFleetReservationSearchResult(searchString): Test method to get fleet reservation search result.
 * getFleetReservationList(userToken): Test method to get fleet reservation list.
 * getFleetReservationAdvSearchResult(userToken, searchobj): Test method to get advance search fleet reservation list.
 * checkFleetsAvailabity(userToken, fleetObj): Test method to check fleets availabity.
 * getFleetReservationInfoById(userToken, fleetreservationId): Test method to get fleet information.
 * locates(locate, userToken, search): Test method to get map location.
 * singlelocateFleetReservation(locate, userToken, fleetid, floorPlanAvailable): Test method to get map location for single locate.
 * getdisplaytomapsetting(token, enterpriseId, pageType): To get display map settings data.
 * getFleetReservationListForCalendar(userToken): Test method to getFleetReservation for calendar.
 * exportlist(searchstring, userToken): Test method to export  data.
 * extractData(res: Response): Test method to extract the data.
 * handleError(error: Response | any): Test method to handle the error page.
 */
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FleetReservationsService } from './fleetreservations.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('FleetReservationsService', () => {
    let subject: FleetReservationsService;
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
                FleetReservationsService,
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
    beforeEach(inject([FleetReservationsService, MockBackend], (FleetReservationsService, mockBackend) => {
        subject = FleetReservationsService;
        backend = mockBackend;
    }));
    /*---- Test to get My getFleetReservationList----*/
    it('should be called with proper arguments to get My getFleetReservationList List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetReservationList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get My getFleetReservationList----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
    /*---- Test to search the all fleets list by fields name ----*/
    it('should be called with proper arguments to getFleetReservationSearchResult list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetReservationSearchResult('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to search fleet reservations list ----*/
    it('should be called with proper arguments to get Fleet Reservation Advance Search Result', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetReservationAdvSearchResult('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to check fleets availabity ----*/
    it('should be called with proper arguments to check fleets availabity', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/availability');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkFleetsAvailabity('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get single fleet reservation location list ----*/
    it('should be called with proper arguments get single fleet reservation location list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.singlelocateFleetReservation('', '', '', '', '', '', '', '', '');
    });
    /*---- Test to get map location list----*/
    it('should be called with proper arguments to get map location list', () => {
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
        /*---- Test to get Fleet types list----*/
        it('should be called with proper arguments to get Fleet types list', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/fleettypes/transactable/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getFleetTypesList('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
        /*---- Test to get Fleets list----*/
        it('should be called with proper arguments to get Fleets list', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getFleetsList('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
            /*---- Test to get fleet reservation information by id ----*/
            it('should be called with proper arguments to get fleet reservation information by id', () => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.url)
                        .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/locate/');
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    expect(connection.request.headers.get('Content-Type')).toEqual(null);
                    const options = new ResponseOptions({
                        body: JSON.stringify({ success: true })
                    });
                    connection.mockRespond(new Response(options));
                });
                subject.getFleetReservationInfoById('', '').subscribe((data) => {
                    expect(data).toEqual({ success: true });
                });
            });
           /*---- Test to get countries information by enterprise id ----*/
           it('should be called with proper arguments to get countries information by enterprise id ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/enterprise-management/enterprises/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getCountriesbyEnterpriseId('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
           /*---- Test to get the display map settings data ---*/
           it('should be called with proper arguments to get the display map settings data', () => {
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
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getFleetReservationSearchResult('', '').subscribe(r => {
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
        subject.getFleetReservationSearchResult('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
    /*---- Test to get fleet reservation for calendar ----*/
    it('should be called with proper arguments to get Fleet Reservation Calendar Result', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/calendar');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetReservationListForCalendar('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
});
