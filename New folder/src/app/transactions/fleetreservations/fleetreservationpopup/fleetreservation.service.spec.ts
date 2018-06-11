/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/**
 * SingleFleetReservationServices spec file is used to test the SingleFleetReservationServices.
 * SingleFleetReservationServices have below functionality
 * createFleetReservation(createfleetReservation, userToken): Test method to create the fleet reservations.
 * getEnterprices(token): Test method to get enterprise list.
 * updateFleetReservation(fleetreservationId, UpdatefleetReservation, userToken): Test method to update fleet reservation.
 * extendFleetReservation(updateenterpriseid, UpdatefleetReservation, userToken): Test method to extend fleet reservation.
 * cancelfleetreservation(userToken, fleetreservationid, reason):Test method to cancel fleet reservation list.
 * getLookupsList(token, lookupType): Test method to get lookuplist.
 * getReservationStatus(): Test method to get reservation status list
 * updateFleetReservation(UpdatefleetReservation, userToken): Test method to update the fleet reservations.
 * deletefleetreservation(userToken, fleetreservationId): Test method to delete fleet reservations.
 * checkinfleetreservation(userToken, fleetreservationId): Test method to check in fleet reservations.
 * checkOutfleetreservation(userToken, fleetreservationId): Test method to check out fleet reservations.
 * getReservationStatus(): Test method to get reservation status.
 * cancelfleetreservation(userToken, fleetreservationId): Test method to cancel fleet reservation.
 * getFleetNameByEntId(userToken, enterpriseId): Test method to get fleet name by enterpriseId.
 * getEventNameByFleetId(userToken, fleetId): Test method to get event name by fleet id.
 * getUserListByEntId(userToken, enterpriseId): Test method to get user list by enterpriseId.
 * extendFleetReservation(UpdatefleetReservation, userToken): Test method to extend fleet reservation data.
 * extractData1(res: Response): Test method to extract data.
 * extractData(res: Response): Test method to extract data.
 * handleError(error: Response | any): Test method to handle error messages.
 */
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FleetReservationServices } from './fleetreservation.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Single Fleet Reservation Services', () => {
    let subject: FleetReservationServices;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FleetReservationServices,
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
    beforeEach(inject([FleetReservationServices, MockBackend], (singleFleetservices, mockBackend) => {
        subject = singleFleetservices;
        backend = mockBackend;
    }));
    /*---- Test to get Enterprices ----*/
    it('should be called with proper arguments to get Enterprices', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
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
    /*---- Test to create Fleet Reservation ----*/
    it('should be called with proper arguments to create Fleet Reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createFleetReservation('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Lookups List ----*/
    it('should be called with proper arguments to get Lookups List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/');
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
    /*---- Test to update Fleet Reservation ----*/
    it('should be called with proper arguments to update fleet reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateFleetReservation('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to Extend Fleet Reservation ----*/
    it('should be called with proper arguments to Extend fleet reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/extend/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.extendFleetReservation('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to delete Fleet Reservation ----*/
    it('should be called with proper arguments to delete fleet reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.deletefleetreservation('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to Cancel Fleet Reservation ----*/
    it('should be called with proper arguments to Cancel fleet reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/cancel/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.cancelfleetreservation('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to Check-In Fleet Reservation ----*/
    it('should be called with proper arguments to Cancel fleet reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/checkin/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkinfleetreservation('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to Check Out Fleet Reservation ----*/
    it('should be called with proper arguments to Cancel fleet reservation', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/checkout/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.checkOutfleetreservation('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Reservation Status ----*/
    // it('should be called with proper arguments to get Reservation Status', () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         expect(connection.request.url)
    //             .toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
    //         expect(connection.request.method).toEqual(RequestMethod.Get);
    //         expect(connection.request.headers.get('Content-Type')).toEqual(null);
    //         const options = new ResponseOptions({
    //             body: {
    //                 'data': [{
    //                     '_id': 'RESERVATION_TYPES',
    //                     'values': [
    //                         'Closed',
    //                         'Reserved']
    //                 }]
    //             }
    //         });
    //         
    //     });
    //     subject.getReservationStatus().subscribe((data) => {
    //         expect(data).toEqual([{
    //             _id: 'RESERVATION_TYPES',
    //             values: [
    //                 'Closed',
    //                 'Reserved']
    //         }]);
    //     });
    // });
    /*---- Test to get Fleet Name By EntId ----*/
    it('should be called with proper arguments to get Fleet Name By EntId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/istransactable//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetNameByEntId('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Event Name By FleetId ----*/
    it('should be called with proper arguments to get Event Name By FleetId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventNameByFleetId('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
            /*---- Test to get fleet information using reservation id ---*/
            it('should be called with proper arguments get fleet information using reservation id ', () => {
                backend.connections.subscribe((connection: MockConnection) => {
                    expect(connection.request.url)
                        .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/');
                    expect(connection.request.method).toEqual(RequestMethod.Get);
                    expect(connection.request.headers.get('Content-Type')).toEqual(null);
                    const options = new ResponseOptions({
                        body: JSON.stringify({ success: true })
                    });
                    connection.mockRespond(new Response(options));
                });
                subject.getfleetsInfoByfleetreservationId('', '').subscribe((data) => {
                    expect(data).toEqual({ success: true });
                });
            });
       /*---- Test to get lookup values by enterprise ---*/
        it('should be called with proper arguments to get lookup values by enterprise ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/lookupsbyenterprise/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getLookupsByEnterprise('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
          /*---- Test to get fleet reservation detail by id ---*/
          it('should be called with proper arguments to get fleet reservation detail by id  ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getFleetReservationDetailsById('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getUserListByEntId('', '').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({});
        });
    });
    /*---- Test to get User List By EntId ----*/
    it('should be called with proper arguments to get User List By EntId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/users/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getUserListByEntId('', '').subscribe((data) => {
            expect(data).toEqual({});
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
        subject.getUserListByEntId('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});

