/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/* BillpaymentService spec file is used to test the Billpayment Services.
* Billpayment services have below functionality:
* createBillhistory(createBillhistory, userToken): Test to create bill history details
* deleteBillhistory(billId, token): Test to get all list of deleted bill history
* updateBillhistory(editBill, billId, userToken): Test to update bill history data.
* getLookupsList(token, lookupType): Test to get Lookup Data based on the lookup type.
* getEnterprices(token): Test to get enterprises list.
* getenterprisesdata(token, enterpriseid): Test to display enterprises list data details.
* getStates(countryName): Test to get timezones list based on country.
* getPeriodTypeNames(userToken, enterpriseId): Test to get the period type names.
* extractData(): To extract the data
* handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BillpaymentService } from '../bill-paymentpopup/billpayment.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Bill payment Service', () => {
    let subject: BillpaymentService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BillpaymentService,
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
    beforeEach(inject([BillpaymentService, MockBackend], (singleFleetservices, mockBackend) => {
        subject = singleFleetservices;
        backend = mockBackend;
    }));
 /*---- Test to create Bill History ----*/
    it('should be called with proper arguments to createBillhistory', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/billpaymenthistory');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createBillhistory('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update bill history ----*/
    it('should be called with proper arguments to updateBillhistory', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/billpaymenthistory/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateBillhistory('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Lookups List ----*/
    it('should be called with proper arguments to getLookupsList', () => {
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
    /*---- Test to delete the bill history ----*/
    it('should be called with proper arguments to deletebillhistory', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/billpaymenthistory/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteBillhistory('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Enterprices list ----*/
    it('should be called with proper arguments to getEnterprises', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprises('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
        /*---- Test to get enterprises list data ----*/
    it('should be called with proper arguments to getenterprisesdata', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprise/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getenterprisesdata('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get states list data ----*/
    it('should be called with proper arguments to getstates', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/states/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getStates('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
        /*---- Test to verify the handle error with null response ----*/
        it('should extract mocked data with null response', async () => {
            backend.connections.subscribe((connection: MockConnection) => {
                const options = new ResponseOptions({
                });
                connection.mockRespond(new Response(options));
            });
            subject.getStates('').subscribe(r => {
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
            subject.getStates('').subscribe(res => {
                expect(res).toHaveBeenCalledWith('404 - {}');
            });
        });
});
