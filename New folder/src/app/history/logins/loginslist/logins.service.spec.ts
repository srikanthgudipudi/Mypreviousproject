/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/*
* HistoryService spec file is used to test the history service.
* History service have below methods:
* getLoginHistoryList(token): Test to display all login history list
* getSingleLoginHistoryList(loginHistoryId, token): Test to display single login history details
* getSearchResult(searchString, searchBy, userToken): Test to display login history search results.
* getLookupsList(token, lookupType): Test to get lookup data based on the lookup type.
* searchLoginhistory(advancedObj, token): Test to get single login history list.
* deleteLoginHistory(loginhistoryid, token): Test to delete login history list.
* exportlist(searchstring, userToken): Test to download the data.
* extractData(res: Response): To extract data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginsService } from './logins.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Login History Service', () => {
    let subject: LoginsService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LoginsService,
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
    beforeEach(inject([LoginsService, MockBackend], (historyService, mockBackend) => {
        subject = historyService;
        backend = mockBackend;
    }));
    /*---- Test to verify all login history list ----*/
    it('should be called with proper arguments to get all login history list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/loginhistory');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'statusCode': '0',
                    'message': 'Success',
                    'result': [{
                        '_id': 1, 'enterpriseId': 1,
                        'userId': 'testuser',
                        'ipAddress': '10.13.11.14', 'deviceType': 'Desktop',
                        'remarks': 'Login Success', 'createdBy': 'dsudheer@mailinateor.com',
                        'createdAt': '2017-07-14T11:23:09.000Z', 'updatedBy': 'dsudheer@mailinateor.com',
                        'updatedAt': '2017-07-14T11:23:09.000Z', 'loginTime': '2017-07-14T11:23:09.000Z',
                        'browserName': 'Chrome', 'browserVersion': '1.3'
                    }]
                }
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLoginHistoryList('').subscribe((data) => {
            expect(data).toEqual({
                statusCode: '0', message: 'Success', result: [({
                    _id: 1, enterpriseId: 1,
                    userId: 'testuser', ipAddress: '10.13.11.14', deviceType: 'Desktop',
                    remarks: 'Login Success', createdBy: 'dsudheer@mailinateor.com',
                    createdAt: '2017-07-14T11:23:09.000Z', updatedBy: 'dsudheer@mailinateor.com',
                    updatedAt: '2017-07-14T11:23:09.000Z', loginTime: '2017-07-14T11:23:09.000Z',
                    browserName: 'Chrome', browserVersion: '1.3'
                })]
            });
        });
    });
    /*---- Test to verify single login history list ----*/
    it('should be called with proper arguments to get single login history list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/loginhistory/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'statusCode': '0',
                    'message': 'Success',
                    'result': [{
                        '_id': 1, 'enterpriseId': 1,
                        'userId': 'testuser',
                        'ipAddress': '10.13.11.14', 'deviceType': 'Desktop',
                        'remarks': 'Login Success', 'createdBy': 'dsudheer@mailinateor.com',
                        'createdAt': '2017-07-14T11:23:09.000Z', 'updatedBy': 'dsudheer@mailinateor.com',
                        'updatedAt': '2017-07-14T11:23:09.000Z', 'loginTime': '2017-07-14T11:23:09.000Z',
                        'browserName': 'Chrome', 'browserVersion': '1.3'
                    }]
                }
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSingleLoginHistoryList('', '').subscribe((data) => {
            expect(data).toEqual({
                statusCode: '0', message: 'Success', result: [({
                    _id: 1, enterpriseId: 1,
                    userId: 'testuser', ipAddress: '10.13.11.14', deviceType: 'Desktop',
                    remarks: 'Login Success', createdBy: 'dsudheer@mailinateor.com',
                    createdAt: '2017-07-14T11:23:09.000Z', updatedBy: 'dsudheer@mailinateor.com',
                    updatedAt: '2017-07-14T11:23:09.000Z', loginTime: '2017-07-14T11:23:09.000Z',
                    browserName: 'Chrome', browserVersion: '1.3'
                })]
            });
        });
    });
    /*---- Test to verify delete login history list ----*/
    it('should be called with proper arguments to delete login history list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/loginhistory/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteLoginHistory('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify search Login history ----*/
    it('should be called with proper arguments to search Login history', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/loginhistory/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.searchLoginhistory('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
     /*---- Test to verify search Login history ----*/
    it('should be called with proper arguments to search Login history', () => {
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
    /*---- Test to verify login history search results ----*/
    it('should be called with proper arguments to get login history search results list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/loginhistory/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'statusCode': '0',
                    'message': 'Success',
                    'result': [{
                        '_id': 1, 'enterpriseId': 1,
                        'userId': 'testuser',
                        'ipAddress': '10.13.11.14', 'deviceType': 'Desktop',
                        'remarks': 'Login Success', 'createdBy': 'dsudheer@mailinateor.com',
                        'createdAt': '2017-07-14T11:23:09.000Z', 'updatedBy': 'dsudheer@mailinateor.com',
                        'updatedAt': '2017-07-14T11:23:09.000Z', 'loginTime': '2017-07-14T11:23:09.000Z',
                        'browserName': 'Chrome', 'browserVersion': '1.3'
                    }]
                }
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSearchResult('', '').subscribe((data) => {
            expect(data).toEqual({
                statusCode: '0', message: 'Success', result: [({
                    _id: 1, enterpriseId: 1,
                    userId: 'testuser', ipAddress: '10.13.11.14', deviceType: 'Desktop',
                    remarks: 'Login Success', createdBy: 'dsudheer@mailinateor.com',
                    createdAt: '2017-07-14T11:23:09.000Z', updatedBy: 'dsudheer@mailinateor.com',
                    updatedAt: '2017-07-14T11:23:09.000Z', loginTime: '2017-07-14T11:23:09.000Z',
                    browserName: 'Chrome', browserVersion: '1.3'
                })]
            });
        });
    });
      /*---- Test to get Export List ----*/
      it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            connection.mockRespond(new Response(options));
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
