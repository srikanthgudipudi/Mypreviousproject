/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/
/**
 * NotificationService spec file is used to test the NotificationService service.
 * NotificationService service spec have below methods:
 * NotificationService has the following methods:
 * getNotifications(userToken, searchTerm); Test method to get the notifications.
 * changeStatus(notificationId: any, status: any, token: any): Test method to used to Updates read status.
 * deleteNotification(notificationId: any, token: any): Test method used to Updates delete flag changes.
 * getNotification(recordId, pageName, token): Test method to get notification in detail.
 * exportlist(searchstring, userToken): Test method to export data.
 * getLookupsList(token, lookupType): Test method to  get Lookup Data based on the Lookup Type.
 * advancedSearch(token, notificationsObj): Test method to  get Advanced search results.
 * extractData(res: Response): Test method to extract the notification list Data.
 * handleError(error: Response | any): Test method is used to handle errors.
*/
import * as config from '../app.config';
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('NotificationService', () => {
    let subject: NotificationsService = null;
    let backend: MockBackend = null;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                NotificationsService,
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
    beforeEach(inject([NotificationsService, MockBackend], (NotificationService, mockBackend) => {
        subject = NotificationService;
        backend = mockBackend;
    }));
    /*---- To verify getNotification  ----*/
    it('To verify getNotifications ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getNotifications('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getNotification  ----*/
    it('To verify getNotifications ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications/search/text');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getNotifications('', 'text').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify deleteNotification  ----*/
    it('should be deleteNotification ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteNotification('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify changeStatus  ----*/
    it('should be changeStatus ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications/' + 'unread' + '/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.changeStatus('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify changeStatus  ----*/
    it('should be changeStatus ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications/' + 'read' + '/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.changeStatus('', 'Read', '').subscribe((response) => {
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
        subject.changeStatus('', '', '').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({});
        });
    });
    /*---- To verify getNotification  ----*/
    it('To verify getNotification ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications/detailactions//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getNotification('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- Test to get Lookups List ----*/
    it('should be called get Lookups List', () => {
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
    /*---- To verify advanced search  ----*/
    it('should call advancedSearch ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/notifications/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.advancedSearch('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
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
        subject.changeStatus('', '', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
        subject.exportlist('test', '');
    });
});
