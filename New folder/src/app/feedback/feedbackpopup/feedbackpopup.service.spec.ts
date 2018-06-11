/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/* FeedbackpopupService spec file is used to test the Feedbackpopup Services.
* FeedbackpopupService services have below functionality:
* createFeedback(feedbackObj, userToken): Test to create the feedback list.
* deletefeedback(userToken, funfactsid): Test to delete the feedback from list.
* updateFeedback(feedbackid, object, userToken): Test to update the feedback list.
* getEnterprices(token): Test to get enterpriseslist.
* getLookupsList(token, lookupType): Test to get Lookup Data based on the Lookup Type.
* getobjecttypelist(token): Test to get object type list.
* getstatustype(token): Test to get status type list.
* feedbackType(token): Test to get feed back type list.
* objectNames(token, objecttype, entepriseName): Test to get object names.
* extractData(res: Response): To extract the data.
* handleError(error: Response | any): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FeedbackpopupService } from './feedbackpopup.service';
import * as config from '../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('FeedbackpopupService', () => {
    let subject: FeedbackpopupService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FeedbackpopupService,
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
    beforeEach(inject([FeedbackpopupService, MockBackend], (singleFleetservices, mockBackend) => {
        subject = singleFleetservices;
        backend = mockBackend;
    }));
 /*---- Test to create Fun facts ----*/
    it('should be called with proper arguments to createFeedback', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createFeedback('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update Fun fact ----*/
    it('should be called with proper arguments to updateFunfact', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/funfacts/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateFunfact('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
     /*---- Test to get object type list ----*/
    it('should be called with proper arguments to getobjecttypelist', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/FEEDBACK_OBJECT_TYPES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getobjecttypelist('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
     /*---- Test to get status ----*/
    it('should be called with proper arguments to getstatustype', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/FEEDBACK_STATUSES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getstatustype('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
     /*---- Test to get feedbacktype ----*/
    it('should be called with proper arguments to feedbackType', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/FEEDBACK_TYPES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.feedbackType('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
     /*---- Test to get objectNames ----*/
    it('should be called with proper arguments to objectNames', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback/objectname//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.objectNames('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
     /*---- Test to get objectNames ----*/
    it('should be called with proper arguments to updateFeedback', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateFeedback('', '', '').subscribe((data) => {
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
    /*---- Test to delete the fun fact ----*/
    it('should be called with proper arguments to deletefunfact', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/feedback/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.deletefeedback('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Enterprices list ----*/
    it('should be called with proper arguments to getEnterprices', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
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
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe(r => {
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
        subject.getEnterprices('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
