/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com <http://www.srisys.com>
 **/

/* SingleFleetAttributeService spec file is used to test the SingleFleetAttributeService.
* SingleFleetAttributeService have below functionality:
* getEnterpriseNamesList(userToken): This method is used to test get enterprise names list.
* getFleettypeList(userToken): This method is used to test get fleet types list.
* getlookUpNameList(userToken, value, enterpriseid): This method is used to test get lookup name list.
* getAttributeTypeList(userToken): This method is used to test get attribute types list.
* getLookupTypeList(userToken): This method is used to test get lookup types list.
* getEnterprisepathById(): This method is used to test getEnterprisepathById method.
* updateFleetAttributes(userToken, fleetAttribute): This method is used to test updateFleetAttributes method.
* createFleetAttribute(userToken, fleetattributeObj): This method is used  test createFleetAttribute method.
* deleteFleetAttributes(userToken, fleetAttributeId): This method is used to test deleteFleetAttributes method.
* extractData(): To extract the data.
* handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AttributeService } from './attribute.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Fleet Attribute Service listing popup', () => {
    let subject: AttributeService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AttributeService,
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
    beforeEach(inject([AttributeService, MockBackend], (SingleFleetAttributeService, mockBackend) => {
        subject = SingleFleetAttributeService;
        backend = mockBackend;
    }));
    /*---- To get Enterprises ----*/
    it('should be called with proper arguments to get the enterprises', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseNamesList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To get Fleet Type list ----*/
    it('should be called with proper arguments to get fleet types', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes/0');
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
    /*---- To get Fleet Type list ----*/
    it('should be called with proper arguments to get fleet types', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes/0');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetTypeList('', 0).subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To get Attribute Type list ----*/
    it('should be called with proper arguments to get fleet type attributes', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/' + 'FLEET_ATTRIBUTE_TYPES');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getAttributeTypeList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To get Lookup Type list ----*/
    it('should be called with proper arguments to get fleet lookup types', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookuptypesbycategory');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupTypeList('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To get enterprisepath by Id ----*/
    it('should be called with proper arguments to get enterprisepath by Id', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprisepathById('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To create fleet attribute ----*/
    it('should be called with proper arguments to create the fleet attribute', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypeattributes/');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createFleetAttribute('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To get lookUp Name List ----*/
    it('should be called with proper arguments to get lookUp Name List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookupsbyenterprise//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getlookUpNameList('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To delete fleet attribute ----*/
    it('should be called with proper arguments to delete the fleet attribute', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypeattributes/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteFleetAttributes('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To update fleet attribute ----*/
    it('should be called with proper arguments to update the fleet attribute', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypeattributes/' + undefined);
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateFleetAttributes('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.updateFleetAttributes('', '').subscribe(res => {
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
        subject.updateFleetAttributes('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
