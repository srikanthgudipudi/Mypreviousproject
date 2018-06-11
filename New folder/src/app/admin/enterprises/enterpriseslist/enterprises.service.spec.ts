/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* All enterprises service spec file is used to test the all enterprises service.
* All enterprises service have below methods:
* getSearchResult(searchString): To search the enterprises by username.
* getMyAllenterprisesList(): To get the all enterprises list.
* inactivateEnterprise(enterpriseId, loginUserToken): This method is used to inactivateEnterprise resources.
* activateEnterprise(enterpriseId, loginUserToken):  This method is used to activateEnterprise resources.
* searchEnterprise(searchenterprisesDetails, userToken): Test method to search for enterprise.
* getLookupsList(token, lookupType): Test to get lookup values based on lookup types.
* exportlist(searchstring, userToken): This method is used to download the data.
* locates(locate, userToken, searchString):Test to get map location list.
* singlelocateenterprise(locate, userToken, enterpriseid, floorPlanAvailable) : Test method to get single enterprise locate.
* getdisplaytomapsetting(token, enterpriseId, pageType): Test method to get the display map settings data.
* advancedlocates(locate, advanced): Test to get  advance locates .
* getenterpriseresourceById(userToken, enterpriseid): Test to get enterprise resources by enterprise id.
* extractData(res: Response): To extract data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { EnterprisesService } from './enterprises.service';
import * as config from '../../../app.config';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('AllEnterprisessService', () => {
    let subject: EnterprisesService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
            ])],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                EnterprisesService,
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
    beforeEach(inject([EnterprisesService, MockBackend], (allEnterprisessService, mockBackend) => {
        subject = allEnterprisessService;
        backend = mockBackend;
    }));
    /*---- Test to get My All enterprises List ----*/
    it('should be called with proper arguments to get the all enterprises lists', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprises/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getMyAllenterprisesList('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*
     it('should be return addUserInfo ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/v1/admin/user/create');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
        });
        subject.addUserInfo('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To Inactivate Enterprise ----*/
    it('should be called with proper arguments to search the all activate Enterprise list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprises/inactivate/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.inactivateEnterprise('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To Activate Enterprise ----*/
    it('should be called with proper arguments to search the all activate Enterprise list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprises/activate/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.activateEnterprise('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To search Enterprise ----*/
    it('should be called with proper arguments to  search Enterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprises/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.searchEnterprise('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- To search Enterprise ----*/
    it('should be called with proper arguments to  get Lookups List', () => {
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
             /*---- Test to get location list ----*/
    it('should be called with proper arguments to get single enterprise locate', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.singlelocateenterprise('', '', '', '');
    });
        /*---- Test to get location list ----*/
    it('should be called with proper arguments to get advance locates', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.advancedlocates('', '');
    });
        /*---- Test to get enterprise resources by enterprise id ---*/
        it('should be called with proper arguments to get enterprise resources by enterprise id ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/enterprise/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getenterpriseresourceById('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
          /*---- Test to get the display map settings data ---*/
          it('should be called with proper arguments to get the display map settings data', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/displaytomapsetting/maplocate/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getdisplaytomapsetting('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
     /*---- Test to get map location list----*/
    it('should be called with proper arguments to get locates', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.locates('', '', '');
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getMyAllenterprisesList('', '').subscribe(r => {
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
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
});
