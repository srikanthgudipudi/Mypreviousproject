/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* EnterpriseResourceService spec file is used to test EnterpriseResourceService.
* EnterpriseResourceService has the following methods:
* getAllenterpriseResources(userToken): This method is used to test getAllenterpriseResources method.
* getEnterpriseResourcesSearch(userToken, searchString): This method is used to test getEnterpriseResourcesSearch method.
* getLookupsList(userToken, lookupType):This method is used to test lookup data based on the lookup type.
* advancedSearch(userToken, entResourceObj): This method is used to test advancedSearch method.
* enterpriselocate(locate, userToken, searchString): This method is used to test enterprise locate.
* enterpriselocatesearch(locate, userToken, searchString): This method is used to test to get enerprise location search data. 
*  singleenterpriselocate(locate, userToken, fleetid, floorPlanAvailable, currentFloorName,
  currententerpriseresid, currentFleetId, currenntFloorId, buildingName) : This method is used for test to get single enterprise locate datails.
* enterpriselocateadvancesearch(locate, advanced): This method is used for test to get enterprise locate advance search data.
* exportlist(searchstring, userToken): This method is used to test the download data.
* importEnterpriseResourcesList(token, csvFile): Test to import enterprise resources list.
* extractData(res: Response): To Extract the data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EnterpriseResourceService } from './enterpriseresources.service';
import * as config from '../../../app.config';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('EnterpriseResourceService', () => {
    let subject: EnterpriseResourceService;
    let backend: MockBackend;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
            ])],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            providers: [
                EnterpriseResourceService,
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
    beforeEach(inject([EnterpriseResourceService, MockBackend], (enterpriseResource, mockBackend) => {
        subject = enterpriseResource;
        backend = mockBackend;
    }));
    /*---- Test to get My All enterprise resource List ----*/
    it('should be called enterprise resource List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterpriseresources');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getAllenterpriseResources('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get enterpriseresources search list  ----*/
    it('should be called enterprise resource search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseResourcesSearch('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
     /*------ Test to get enterprise resource advanced search ----------*/
    it('should be called enterprise resource advanced search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.advancedSearch('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*------ Test to get enterprise resource lookups list ----------*/
    it('should be called enterprise resource get Lookups List', () => {
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
     /** ---Test to import resources data --- */
        it('should be called for test to import resources data', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/import');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.importEnterpriseResourcesList('', '').subscribe((data) => {
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
        subject.singleenterpriselocate('', '', '', '', '', '', '', '', '');
    });
        /*---- Test to get location list ----*/
    it('should be called with proper arguments to get enterprise locate advance search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.enterpriselocateadvancesearch('', '');
    });
     /*---- Test to get map location list----*/
    it('should be called with proper arguments to locate enterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.enterpriselocate('', '', '');
    });
        /*---- Test to get map location list----*/
    it('should be called with proper arguments to search enterprise locates', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.enterpriselocatesearch('', '', '');
    });
         /*---- Test to get enterprise resources by enterprise id ---*/
         it('should be called with proper arguments to get enterprise resources by enterprise id ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/enterpriseresources/');
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
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getAllenterpriseResources('').subscribe(res => {
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
        subject.getAllenterpriseResources('').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
});
