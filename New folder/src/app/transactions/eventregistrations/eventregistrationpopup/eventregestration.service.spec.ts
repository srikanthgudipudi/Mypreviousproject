/* Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/* EventRegistrationService spec file is used to test the EventRegistrationService.
* EventRegistrationService have below functionality:
* getEnterprices(token):Test method to get enterprises list.
* getFleetNameByEntId(userToken, enterpriseId): Test method to get fleets details.
* getEventNameByFleetId(userToken, fleetId):Test method to get event details.
* getFleetDataByFleetId(userToken, fleetId): Test method to get the fleets data by fleet list.
* getEventDataByEventId(userToken, eventId): Test method to get the events data by fleet list.
* getStatus(): Test method to get the status.
* getEventType(): Test method to get the EventType.
* getLookupsList(token, lookupType): Test method to get the lookup list based on the lookup types.
* addEventReg(eventReg, userToken): Test method to add event registration details.
* unRegEventReg(eventReg, userToken): Test method to unregister event registration details.
* deleteEventReg(enterpriseid, userToken): Test method to delete event registration details.
* checkinEvent(eventRegistrationId, loginUserToken): Test method to check in action for event.
* checkoutEvent(eventRegistrationId, loginUserToken): Test method to check out action for event.
* extractData(res: Response): Test method to extract the data.
* extractData1(res: Response): Test method to extract the data.
* handleError(error: Response | any): Test method to handle error messages.

*/

import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EventRegistrationService } from './eventregistration.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('EventRegistrationService', () => {
    let subject: EventRegistrationService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EventRegistrationService,
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
    beforeEach(inject([EventRegistrationService, MockBackend], (eventRegistrationService, mockBackend) => {
        subject = eventRegistrationService;
        backend = mockBackend;
    }));
        /*---- Test To get enterprises list----*/
    it('should be called with proper arguments to get enterprises list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
        /*---- Test to get fleets details ----*/
    it('should be called with proper arguments to get fleets details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/eventsenabled/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetNameByEntId('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- Test to get Check In Event Registration list ----*/
    it('should be called with proper arguments to get checkinEvent', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/checkin/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkinEvent('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get get Lookups List ----*/
    it('should be called with proper arguments to get Lookups List', () => {
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
    /*---- Test to get Check Out Event Registration list ----*/
    it('should be called with proper arguments to get checkoutEvent', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/checkout/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkoutEvent('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
        /*---- Test to get event details ----*/
    it('should be called with proper arguments to get event details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventsbyfleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventNameByFleetId('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
            /*---- Test to add event registration details----*/
    it('should be called with proper arguments to add event registration details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.addEventReg('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- Test to Unregister Event Registration Details----*/
    it('should be called with proper arguments to Unregister Event Registration Details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/unregister/undefined');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.unRegEventReg('', '', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- Test to Delete Event Registration Details----*/
    it('should be called with proper arguments to Delete Event Registration Details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteEventReg('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
     /*--- Get the Status ---*/
      it('should be called with proper arguments to add event registration details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                 body: {
                    'data': [{
                        '_id': 'REGISTRATION_STAUSES',
                        'values': [
                            'Closed',
                            'Open']
                    }]
                }
            });
        });
        subject.getStatus().subscribe((data) => {
            expect(data).toEqual([{
                _id: 'REGISTRATION_STAUSES',
                values: [
                    'Closed',
                    'Open']
            }]);
        });
    });
     /*--- Get Event Type ---*/
      it('should be called with proper arguments to add event registration details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                 body: {
                    'data': [{
                        '_id': 'EVENT_TYPES',
                        'values': [
                            'Private',
                            'Public']
                    }]
                }
            });
        });
        subject.getEventType().subscribe((data) => {
            expect(data).toEqual([{
                _id: 'EVENT_TYPES',
                values: [
                    'Private',
                    'Public']
            }]);
        });
    });
    /*---- Get the Fleets data by fleet list ----*/
    it('should be called with proper arguments to get the Fleets data', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetDataByFleetId('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- Get the Fleets data by fleet list ----*/
    it('should be called with proper arguments to get the Events data', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/events/locate/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventDataByEventId('', '').subscribe((data) => {
            expect(data).toEqual({  });
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
            /*---- Test to get event registrations by id ----*/
    it('should be called with proper arguments to get event regitrations by id', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/eventregistrations/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.geteventRegistrationById('', '').subscribe((data) => {
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
        subject.unRegEventReg('', '', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
        /*---- Test to verify the handle error with null response ----*/
        it('should extract mocked data with null response', async () => {
            backend.connections.subscribe((connection: MockConnection) => {
                const options = new ResponseOptions({
                });
            });
            subject.unRegEventReg('', '', '').subscribe(r => {
                const out: any = r;
                expect(out).toEqual({});
            });
        });
});

