/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/**
 * EventService spec file is used to test the EventService.
 * getMyAlleventsList(userToken): Test method to get the all events list.
 * getSearchResult(searchstring, userToken): Test method to search the events.
 * advacncedSearch(token, eventvalobj): Test method to get Advanced search results.
 * getLookupsList(token, lookupType): Test method to get all look up data.
 * exportlist(searchstring, userToken): Test method to get is used to export service.
 * getEnterprices(token): Test method to get Enterprises list.
 * getFleetTypesList(userToken, enterpriseid): Test method to get fleet type list.
 * getfleetTypeAttributes(token, fleetType, enterprise): Test method to get fleet type attributes.
 * getFleetNames(userToken, enterpriseId): Test method to get the fleet names.
 * getUserListByEntId(userToken, enterpriseId):Test method to get the enterprise name By fleetId list.
 * getSingleFleetDetails(fleetId, userToken): Test method to get the all fleets list.
 * guidedCreateEvent(createevent, userToken): Test method to get guided create event.
 * checkFleetsAvailabity(userToken, fleetObj): Test method to check fleets availability.
 * locates(locate, userToken, search): Test method to get map location.
 * getEventsInfoByevntsId(userToken, eventid): Test method to get event information by id.
 * singlelocateevent(locate, userToken, evnetid, floorPlanAvailable): Test method for single locate record for the event.
 * getdisplaytomapsetting(token, enterpriseId, pageType): Test method to get display map settings.
 * extractData(res: Response): Test method is used to extract the data.
 * handleError(error: Response | any): Test method is used to handle the error page.
 */
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EventService } from './events.service';
import * as config from '../../../app.config';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('AllEventService', () => {
    let subject: EventService;
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
                EventService,
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
    beforeEach(inject([EventService, MockBackend], (allEventsService, mockBackend) => {
        subject = allEventsService;
        backend = mockBackend;
    }));
    /*---- Test to get My All events List ----*/
    it('should be called with proper arguments to get the all asset list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyAlleventsList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to search the all events list by user name ----*/
    it('should be called with proper arguments to search the all events list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/search/');
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
    /*---- Test to advanced search the events ----*/
    it('should be called with proper arguments to advanced search the events list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/advancedsearch');
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
    /*---- Test to get lookups ----*/
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
    /*---- Test to get Export  List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
    /*---- Test to get enterprices ----*/
    it('should be called with proper arguments to getEnterprices', () => {
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
    /* ----- Test to get FleetTypeList ----- */
    it('should be called with proper arguments to getFleetTypesList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes/eventsenabled/');
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
    /* ----- Test to Get fleet type attributes ----- */
    it('should be called with proper arguments to getfleetTypeAttributes', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/fleettypeattributes//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getfleetTypeAttributes('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /* ----- Test to get fleetnames list----- */
    it('should be called with proper arguments to getFleetNames', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/eventsenabled//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetNames('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /* ----- Test to get userlist by EntId ----- */
    it('should be called with proper arguments to getUserListByEntId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/users/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getUserListByEntId('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /* ----- Test to get single fleet details list ----- */
    it('should be called with proper arguments to getSingleFleetDetails', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSingleFleetDetails('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /* ----- Test to get guided create event ----- */
    it('should be called with proper arguments to guidedCreateEvent', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.guidedCreateEvent('', '').subscribe((data) => {
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
      /*---- Test to get map location list for single event ----*/
      it('should be called with proper arguments to get map location list for single event', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.singlelocateevent('', '', '', '', '', '', '', '', '');
    });
      /*---- Test to get events information by event id ----*/
      it('should be called with proper arguments to get events information by event id ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/locate/');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventsInfoByevntsId('', '').subscribe((data) => {
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
       /*---- Test to get guided create event result list ----*/
       it('should be called with proper arguments get guided create event result list ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/guidedcreateevents');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.guidedevents('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
           /*---- Test to get user details list ----*/
           it('should be called with proper arguments get user details list ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/user/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.userDetails('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
          /*---- Test to get display to map settings data ----*/
          it('should be called with proper arguments  to get display to map settings data ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/displaytomapsetting/maplocate/');
                expect(connection.request.method).toEqual(RequestMethod.Post);
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
});
