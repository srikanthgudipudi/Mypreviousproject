/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* Dashboardservice spec file is used to test Dashboardservice.
* Dashboardservice has the following methods:
* getEnterpriseResourceCountryAndCount(): Test to getEnterpriseResourceCountryAndCount.
* getFleetByCountryAndCount(): Test to getFleetByCountryAndCount.
* getEventsByCountryAndCount(): Test to getEventsByCountryAndCount.
* getFleetReservationByCountryAndCount(): Test to getFleetReservationByCountryAndCount.
* getUsersByCountryAndCount(): Test to getUsersByCountryAndCount.
* getMonthLineData(enterpriseid): Test to getMonthLineData based on enterpriseid.
* getYearLineData(enterpriseid): Test to getYearLineData based on enterpriseid.
* getLifeTimeLineData(enterpriseid): Test to getLifeTimeLineData based on enterpriseid.
* getLifeTimeWeekData(enterpriseid): Test to getLifeTimeWeekData based on enterpriseid.
* advancesearch(dasboardadv, userToken): Test to get search results data in advance search.
* getLookupsList(token, lookupType): Test to get lookup data based on the lookup type.
* getFleetTypeList(userToken, enterpriseid): Test to get fleet type list.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Dashboardservice } from './dashboard.service';
import * as config from '../app.config';
describe('Dashboardservice', () => {
    let subject: Dashboardservice;
    let backend: MockBackend;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Dashboardservice,
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
    beforeEach(inject([Dashboardservice, MockBackend], (enterpriseResource, mockBackend) => {
        subject = enterpriseResource;
        backend = mockBackend;
    }));
    /*---- Test to get EnterpriseResourceCountryAndCount ----*/
    it('should be called enterprise resource country and count', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/enterpriseresources/country');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseResourceCountryAndCount().subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });

     /*---- Test to get FleetByCountryAndCount ----*/
    it('should be called fleet by country and count', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/fleets/country');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetByCountryAndCount().subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });

     /*---- Test to get EventsByCountryAndCount ----*/
    it('should be called events by country and count', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/events/country');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEventsByCountryAndCount().subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });

     /*---- Test to get FleetReservationByCountryAndCount ----*/
    it('should be called fleet reservation by country and count', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/fleetreservations/country');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetReservationByCountryAndCount().subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });

     /*---- Test to get UsersByCountryAndCount ----*/
    it('should be called users by country and count', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/users/country');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getUsersByCountryAndCount().subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            
        });
        subject.getEnterpriseResourceCountryAndCount().subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
      /*---- Test to get MonthlyData ----*/
    it('should be called to get MonthlyData', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/mtd/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMonthLineData('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });

         /*---- Test to get YearlyData ----*/
    it('should be called to get YearlyData', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/ytd/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getYearLineData('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get LifeTimeData ----*/
    it('should be called to get LifeTimeData', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/ltd/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLifeTimeLineData('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });

    /*---- Test to get LifeTimeWeekData ----*/
    it('should be called to get LifeTimeWeekData', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/dashboard/wltd/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLifeTimeWeekData('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
        /*---- Test to search the data in advance search  ----*/
        it('should be called to search the data in advance search', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/dashboard/advancedsearch');
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
            /*---- Test to get Lookup Data based on the Lookup Type ----*/
    it('should be called to get Lookup Data based on the Lookup Type', () => {
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
        /*---- Test to get FleetTypeList----*/
        it('should be called to get FleetTypeList', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/fleettypes/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getFleetTypeList('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
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
        subject.getEnterpriseResourceCountryAndCount().subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
      /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getEnterpriseResourceCountryAndCount().subscribe(r => {
            const out: any = r;
            expect(out).toEqual({});
        });
    });
}
);
