/**Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com */

/**
 * SingleEnterpriseStaticContentService spec file is used to test the SingleEnterpriseStaticContentService.
 * SingleEnterpriseStaticContentService spec have below methods.
 * getEnterprises(userToken): To Get Enterprises list
 * getFleetNameByEntId(userToken, enterpriseId): To Get Fleets Details
 * getMenuListByEntId(userToken, enterpriseId): To Get parent menu details by enterprise
 * getMenuListByFleetId(userToken, enterpriseId, fleetId): To Get parent menu details by fleet
 * getLookupsList(token, lookupType): To get Lookup Data based on the Lookup Type
 * createEnterpriseStaticContent(enterpriseStaticContentData, userToken, imageFile): To create the static content
 * updateEnterpriseStaticContent(id, editObj, userToken): To update the static content
 * deleteEnterpriseStaticContent(staticContentId, token): To delete static content
 * extractData(): To extract the data
 * handleError(): To handle error messages.
*/
import * as config from '../../../app.config';
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { SingleStaticContentService } from './singlestaticcontent.service';
import { Router } from '@angular/router';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('SingleStaticContentService', () => {
    let subject: SingleStaticContentService = null;
    let backend: MockBackend = null;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SingleStaticContentService,
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
                    provide: 'geoEndPoint',
                    useValue: config.GEO_END_POINT
                },
                {
                    provide: 'staticJsonFilesEndPoint',
                    useValue: config.STATIC_JSONFILES_END_POINT
                },
                {
                    provide: 'staticJsonFilesEndPoint',
                    useValue: config.STATIC_JSONFILES_END_POINT
                },
                {
                    provide: 'apiEndPoint',
                    useValue: config.API_END_POINT
                },
                {
                    provide: Router,
                    useValue: null
                },
                {
                    provide: 'geoEndPoint',
                    useValue: config.GEO_END_POINT
                }
            ],
        });
    });
    /*---- Jasmine runs the beforeEach function before each of the tests ----*/
    beforeEach(inject([SingleStaticContentService, MockBackend], (NotificationService, mockBackend) => {
        subject = NotificationService;
        backend = mockBackend;
    }));
    /*---- To verify getEnterprises  ----*/
    it('To verify getEnterprises ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesByUser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprises('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getFleetNameByEntId ----*/
    it('To verify getFleetNameByEntId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/fleets/listing/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetNameByEntId('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getMenuListByEntId ----*/
    it('To verify getMenuListByEntId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/parent/enterprisestaticcontent/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMenuListByEntId('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getMenuListByFleetId ----*/
    it('To verify getMenuListByFleetId', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/parent/enterprisestaticcontent/' + '/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMenuListByFleetId('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getLookupsList  ----*/
    it('should be getLookupsList ', () => {
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
    /*---- To verify createEnterpriseStaticContent  ----*/
    it('should be createEnterpriseStaticContent ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisestaticcontent');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createEnterpriseStaticContent('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify updateEnterpriseStaticContent  ----*/
    it('should be updateEnterpriseStaticContent ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisestaticcontent/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateEnterpriseStaticContent('', '', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify deleteEnterpriseStaticContent  ----*/
    it('should be deleteEnterpriseStaticContent ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisestaticcontent/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteEnterpriseStaticContent('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            connection.mockRespond(new Response(options));
        });
        subject.createEnterpriseStaticContent('', '', '').subscribe(r => {
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
        subject.createEnterpriseStaticContent('', '', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
