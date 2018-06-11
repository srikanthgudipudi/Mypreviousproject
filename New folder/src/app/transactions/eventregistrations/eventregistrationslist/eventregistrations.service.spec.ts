/* Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* AllEventRegistration spec file is used to test the AllEventRegistration Service.
* AllEventRegistration service file have below methods:
* getMyEventsregList(userToken, searchString): Test method to get all event registration list.
* getMyEventsSearchregList(userToken, searchString): Test method to get events search registration list.
* getMyEventsregistrationList(userToken, eventId): Test method to get all registered events list.
* exportlist(undefined, '' ): Test method to get export event registration data.
* advancesearch(eventreg, userToken): Test method to get advance search results.
* locates(locate, userToken, search): Test method to get map location.
* singlelocateEventRegisteration(locate, userToken, eventregid): Test method to get single locate list for event registration.
* getEventTypes(userToken): Test method to get event types.
* extractData(res: Response): Test method to extract the data.
* handleError(error: Response | any): Test method to handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EventsregService } from './eventregistartions.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('EventsregService', () => {
    let subject: EventsregService;
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
                EventsregService,
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
    beforeEach(inject([EventsregService, MockBackend], (importhistorylistingService, mockBackend) => {
        subject = importhistorylistingService;
        backend = mockBackend;
    }));
    /*---- Test to get all Event Registrations list----*/
    it('should be called with proper arguments to get all Event Registrations list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyEventsregList('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get Search Event Registrations list----*/
    it('should be called with proper arguments to get all Event Registrations list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyEventsSearchregList('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get My Event Registration list ----*/
    it('should be called with proper arguments to get getMyEventsregistrationList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/event/registered/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyEventsregistrationList('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
     /*---- Test to get advancesearch----*/
     it('should be called with proper arguments to get advancesearch', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.advancesearch('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
       /*---- Test to get event types----*/
     it('should be called with proper arguments to getEventTypes', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/EVENT_TYPES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventTypes('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
           /*---- Test to get enterprises list ----*/
           it('should be called with proper arguments to get enterprises list', () => {
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
            /*---- Test to get countries list ----*/
            it('should be called with proper arguments to get countries list', () => {
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
                subject.getCountryList('', '').subscribe((data) => {
                    expect(data).toEqual({ success: true });
                });
            });
                /*---- Test to get enterprise name by fleet id ----*/
           it('should be called with proper arguments to get enterprise name by fleet id ', () => {
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
            subject.getUserListByEntId('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
    /*---- Test to get location list ----*/
    it('should be called with proper arguments to get all location lists', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.singlelocateEventRegistrations('', '', '', '', '', '', '', '');
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
         /*---- Test to get Lookup Data based on the Lookup Type---*/
         it('should be called with proper arguments to get Lookup Data based on the Lookup Type', () => {
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
             /*---- Test to get the event registrations----*/
     it('should be called with proper arguments to get the event registrations', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/locate/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.geteventRegistrationById('', '').subscribe((data) => {
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
    /*---- Test to get Export Event Reg List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
           /*---- Test to verify the handle error with null response ----*/
           it('should extract mocked data with null response', async () => {
            backend.connections.subscribe((connection: MockConnection) => {
                const options = new ResponseOptions({
                });
            });
            subject.advancesearch('', '').subscribe(r => {
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
            subject.advancesearch('', '').subscribe(res => {
                expect(res).toHaveBeenCalledWith('404 - {}');
            });
        });
});
