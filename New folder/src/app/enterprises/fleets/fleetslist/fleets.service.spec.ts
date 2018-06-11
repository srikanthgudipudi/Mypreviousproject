/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/*
* All fleets service spec file is used to test the all fleets service.
* All fleets service have below methods:
* getSearchResult(searchString, userToken): Test to get search the fleets by username.
* getMyAllfleetsList(userToken, fleetAssetName, enterpriseIds): Test to get all the fleets list.
* getInitalfleets(userToken): Test to get all initial fleets.
* getFleetTypesList(userToken, enterpriseid): Test to get fleet types list.
* getadvancedFleetSearch(advsearch, token): Test to get advanced search results.
* exportlist(searchString, userTOken): Test to export the file.
* locates(locate, userToken, search): Test to get locates list.
* singlelocateFleet(locate, userToken, fleetid, floorPlanAvailable, 
    currentFloorName, currentfleetId, cufloorId, cfleetid, buildingName) : Test  to locate single fleet list.
* getBuildingId(token, fleetId, pageName): Test to get building id.
* getbuildingFloorMapInfo(token, builingCode):Test to get building floor map information.
* importList(token, csvFile): Test to import resources data.
* getFleetTypeList(userToken, enterpriseid): Test to get fleet types list based on enterprise id.
* expTemplate(userToken, file): Test to get extemplate data.
* getselectedfleetinfo(token, enterpriseId, pageType): Test to get selected fleet information based on enterprise id.
* getEnterpriseNamesList(userToken): Test to get enterprise names list.
* getFleetInfoByfleetId(token, fleetId): Test to get fleet information using id.
* extractData(res: Response): To extract data.
* extractBuildingData(res: Response) : To extract data.
* handleError(error: Response | any): To handle the error page.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FleetsService } from './fleets.service';
import * as config from '../../../app.config';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('AllFleetssService', () => {
    let subject: FleetsService;
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
                FleetsService,
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
    beforeEach(inject([FleetsService, MockBackend], (allFleetssService, mockBackend) => {
        subject = allFleetssService;
        backend = mockBackend;
    }));
    /*---- Test to get My All fleets List ----*/
    it('should be called with proper arguments to get the all fleets list', () => {
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
        subject.getMyAllfleetsList('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to search the all fleets list by user name ----*/
    it('should be called with proper arguments to search the all fleets list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSearchResult('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to search the get advanced Fleet Search ----*/
    it('should be called with proper arguments to get advanced Fleet Search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getadvancedFleetSearch('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
         /*---- Test to get display to get import list ----*/
    it('should be called with proper arguments to get importList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/import');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
         subject.importList('', '').subscribe((data) => {
           expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to get All fleets List ----*/
    it('should be called with proper arguments to get the all fleets list', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/listing/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getInitalfleets('').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
      /*---- Test to get all selected fleet information ----*/
    it('should be called with proper arguments to get the all selected fleet information', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/displaytomapsetting/maplocate//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getselectedfleetinfo('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
       /*---- Test to get fleet information by fleet id ----*/
    it('should be called with proper arguments to get fleet information by fleet id', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetInfoByfleetId('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
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
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
    /*---- Test to get All fleets type list ----*/
    it('should be called with proper arguments to get all fleet type lists', () => {
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
        subject.getFleetTypesList('', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
           /*---- Test to get location list ----*/
    it('should be called with proper arguments to get all location lists', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
        });
        subject.locates('', '', '');
    });
    /*---- Test to get single locate fleets ----*/
    it('should be called with proper arguments to get single locate fleets', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
        });
        subject.singlelocateFleet('', '', '', '', '', '', '', '', '');
    });
          /*---- Test to get enterprise name list ----*/
          it('should be called with proper arguments to get enterprise name list', () => {
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
            subject.getselectedfleetinfo('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
                  /*---- Test to get buildingFloorMapInfo ----*/
                  it('should be called with proper arguments to get building floor map info', () => {
                    backend.connections.subscribe((connection: MockConnection) => {
                        expect(connection.request.url)
                            .toEqual('http://10.13.8.118:3000/assets/fleets/floorplan/B00001.json');
                        expect(connection.request.method).toEqual(RequestMethod.Get);
                        expect(connection.request.headers.get('Content-Type')).toEqual(null);
                        const options = new ResponseOptions({
                            body: JSON.stringify({ success: true })
                        });
                    });
                    subject.getbuildingFloorMapInfo('', '').subscribe((data) => {
                        expect(data).toEqual({ success: true });
                    });
                });
          /*---- Test to get building id ----*/
          it('should be called with proper arguments to get building id', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1//multifloor/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getBuildingId('', '', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
     /*---- Test to get enterprise names list ----*/
     it('should be called with proper arguments to get enterprise names list', () => {
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
                         /*---- Test to get import template data ----*/
          it('should be called with proper arguments to get import template data', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/importtemplate/data');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.expTemplate('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
        /*---- Test to get FleetTypeList ----*/
        it('should be called with proper arguments to get fleet type list', () => {
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
});
