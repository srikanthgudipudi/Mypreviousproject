
/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
  * ContractDetailService spec file is used to test ContractDetailService.
  * ContractDetailService has the following methods:
  * createDetails(token, contractDetailObj): This method is used to test createDetails method.
  * updateDetails(token, id, isEnabled, enddate): This method is used to test updateDetails method.
  * deleteDetails(token, id) : This method is used to test deleteDetails method.
  * getLookupsList(token, lookupType): This method is used to test lookup data based on the lookup type.
  * getPaymentLookup(userToken, lookupType):This method is used to test payment lookup data based on the lookup type.
  * getContractLookup(userToken, lookupType): This method is used to test contract lookup data based on the lookup type.
  * getLicensingLookup(userToken, lookupType): This method is used to test licensing lookup data based on the lookup type.
  * getEnterprices(token): This  method is used to test get enterprices method.
  * extractData(): To extract the data.
  * handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*--- Test related module imports ----*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import * as config from '../../../app.config';
import { ContractDetailService } from './contractdetail.service';
/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('ContractDetailService', () => {
    let subject: ContractDetailService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContractDetailService,
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
                    provide: 'staticJsonFilesEndPoint',
                    useValue: config.STATIC_JSONFILES_END_POINT
                },
                {
                    provide: 'apiEndPoint',
                    useValue: config.API_END_POINT
                },
            ],
        });
    });
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(inject([ContractDetailService, MockBackend], (singleuserservices, mockBackend) => {
        subject = singleuserservices;
        backend = mockBackend;
    }));
    /*---- To verify create contract details ----*/
    it('should be called with proper arguments for create contract details ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisecontracts');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createDetails('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify update contract details ----*/
    it('should be called with proper arguments for update contract details ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
           expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisecontracts/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateDetails('', '', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify for enterprise contract delete ----*/
    it('should be called with proper arguments for enterprise contract delete ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisecontracts/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteDetails('', '').subscribe((response) => {
            expect(response).toEqual(undefined);
        });
    });
    /*---- To verify Lookup Data ----*/
    it('should be called with proper arguments for Lookup data ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsList('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
      /*---- To verify licensing lookup data ----*/
    it('should be called with proper arguments for licensing lookup data ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLicensingLookup('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
          /*---- To verify Contract lookup data ----*/
    it('should be called with proper arguments for Contract lookup data ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getContractLookup('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
            /*---- To verify get enterprises list ----*/
    it('should be called with proper arguments get enterprises list  ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
              /*---- To verify Payment lookup data ----*/
    it('should be called with proper arguments for Payment lookup data ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getPaymentLookup('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
        /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getContractLookup('', '').subscribe(res => {
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
        subject.getContractLookup('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});


