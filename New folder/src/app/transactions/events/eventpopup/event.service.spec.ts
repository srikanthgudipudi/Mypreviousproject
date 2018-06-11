/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/**
 * SingleEventservices spec file is used to test the SingleEventservices.
 * SingleEventservices have below functionality:
 * getLookupsList(token, lookupType): Test method get lookup list based on the lookup types.
 * getEnterprices(token): Test method to get enterprises list.
 * getStatus(userToken): Test method to get status.
 * getfleetTypeAttributes(token, fleetType, enterprise): Test method to get fleet type attributes.
 * getEventTypes(userToken): Test method to get event types from lookups.
 * getMultipleRegister(eventId, userToken): Test method to get multiple registrations.
 * userDetails(token, userId): Test method to get user details.
 * extendEvent(eventId, userToken, notes, enddatetime, duration, reason): Test method to extend event from list.
 * updateEvent(editEvent, eventId, userToken): Test method to  update event from the list.
 * checkOutEvent(eventId, userToken): Test method to Checkout from event.
 * checkInEvent(eventId, userToken): Test method to Checkin into event.
 * getSingleFleetDetails(fleetId, userToken): Test method to get the all fleets list.
 * cancelEvent(eventId, userToken, reason): Test method to cancel event.
 * createEvent(createevent, userToken): Test method is used to create event.
 * updateEvent(eventobj, eventId, userToken): Test method is used to update event.
 * deleteEvent(eventId, userToken): Test method is used to delete event.
 * getEnterprices(token): Test method is used to get enterprises.
 * getFleetNames(userToken, enterpriseId): Test method is used to get fleet list.
 * getUserListByEntId(userToken, enterpriseId): Test method is used to get user list.
 * extractData(res: Response): Test method to extract the data.
 * handleError(error: Response | any): Test method to handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Eventservice } from './event.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('SingleEventservices', () => {
    let subject: Eventservice;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Eventservice,
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
    beforeEach(inject([Eventservice, MockBackend], (SingleEventservices, mockBackend) => {
        subject = SingleEventservices;
        backend = mockBackend;
    }));
    /*---- Test to create event----*/
    it('should be called with proper arguments to create event', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createEvent('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to verify check out event ----*/
    it('should be called with proper arguments to verify the checkOutEvent method', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/checkout/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkOutEvent('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify check in event ----*/
    it('should be called with proper arguments to verify the checkInEvent method', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/checkin/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkInEvent('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify cancel event ----*/
    it('should be called with proper arguments to verify the cancelEvent method', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/cancel/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.cancelEvent('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to update event ----*/
    it('should be called with proper arguments to update event', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateEvent('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to extend event ----*/
    it('should be called with proper arguments to extend event', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.extendEvent('', '', '', '', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to remove event from list ----*/
    it('should be called with proper arguments to remove event from list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteEvent('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get the fleet names ----*/
    it('should be called with proper arguments to get the fleet names', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetNames('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to getEnterprices names ----*/
    it('should be called with proper arguments to getEnterprices names', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesByUser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get the Status ----*/
    it('should be called with proper arguments to get the Status', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/EVENT_STATUSES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getStatus('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Lookups List ----*/
    it('should be called with proper arguments to get Lookups List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsList('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get user details list ----*/
    it('should be called with proper arguments to get user details list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/user/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.userDetails('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get fleet Type Attributes ----*/
    it('should be called with proper arguments to get fleet Type Attributes', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/fleets/fleettypeattributes//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getfleetTypeAttributes('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Single Fleet Details ----*/
    it('should be called with proper arguments to get Single Fleet Details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSingleFleetDetails('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get the EventTypes ----*/
    it('should be called with proper arguments to get the EventTypes', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/EVENT_TYPES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventTypes('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get multiple Regestrations ----*/
    it('should be called with proper arguments to getmultiple Regestrations', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/events/mutipleregistrations/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMultipleRegister('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
           /*---- Test to get the events information by using event id ----*/
           it('should be called with proper arguments to get the events data by id', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/events/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getEventsInfoByeventId('', '').subscribe((data) => {
                expect(data).toEqual({  });
            });
        });
    /*---- Test to get lookups  by enterprise ----*/
    it('should be called with proper arguments to get lookups  by enterprise ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookupsbyenterprise/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsByEnterprise('', '', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getMultipleRegister('', '').subscribe(r => {
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
        subject.getMultipleRegister('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
