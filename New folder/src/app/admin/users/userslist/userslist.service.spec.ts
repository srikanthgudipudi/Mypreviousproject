/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/*
* Userslistservices spec file is used to test Userslistservices.
* Userslistservices has the following method:
* getAllUsersList(searchString): To display searched user details.
* rolesdetailaction(ROLE_ID, token): To dispaly roles detailed action.
* getSearchUsersList(token, searchString):Test to display single user details list.
* getLookupsList(token, lookupType): To verify getLookupsList  method.
* usersAdvancedSearch(usersSearchData, token):Test to verify advanced search results for users.
* importUsersList(token, excelFile): Test method to verify import resources data.
* exportlist(searchString, userTOken): Test method to export the file.
* userlocates(locate, userToken): Test method to get the users locate coordinates.
* userlocatessearch(locate, userToken, searchString): Test method to get selected user locate coordiates.
* userlocatesAdvancedSearch(locate, advanced): Test method to get selected user locate coordiates by advance search.
* singlelocateuser(locate, userToken, userid, floorPlanAvailable, currentFloorName,
currentuid, currentFleetId, currenntFloorId, buildingName) : Test method to get single locate for any user.
* getselecteduserinfo(token, enterpriseId, pageType): Test method to get users display map setting's data.
* getUserInfoById(userToken, userid): Test method to get user information using id.
* getdisplaytomapsetting(token, enterpriseId, pageType): Test to get the enteprise locate details.
* extractData(): To extract the data.
* handleError(): To handle error messages.
   ----- */
/*---- Service related module imports ----*/
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*--- Test related module imports ----*/
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Userslistservice } from './userslist.service';
import * as config from '../../../../app/app.config';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Userslistservices', () => {
    let subject: Userslistservice;
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
                Userslistservice,
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
    beforeEach(inject([Userslistservice, MockBackend], (singleuserservices, mockBackend) => {
        subject = singleuserservices;
        backend = mockBackend;
    }));
    /*---- To verify getAllUsersList get method ----*/
    it('should be called with proper arguments for getAllUsersList ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
        });
        subject.getAllUsersList('').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
    /*---- To verify roles detail action method ----*/
    it('should be called with proper arguments for rolesdetailaction method ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/rolerightbyuser/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.rolesdetailaction('', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
    /*---- To verify users Advanced Search ----*/
    it('should be called with proper arguments for users Advanced Search method ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/advancedsearch');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.usersAdvancedSearch('', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
    /*---- To verify getSearchList get method ----*/
    it('should be called with proper arguments for getSearchList ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/search/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSearchUsersList('', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
      /*---- To verify importUsersList get method ----*/
    it('should be called with proper arguments for importUsersList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/import');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.importUsersList('', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
          /*---- Test to get location list ----*/
    it('should be called with proper arguments to get single user locate', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.singlelocateuser('', '', '', '', '', '', '', '', '');
    });
      /*---- Test to get the display map setting's data ----*/
      it('should be called with proper arguments to get the display map settings data', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/displaytomapsetting/maplocate/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getselecteduserinfo('', '', '');
    });
          /*---- Test to get user inforation using Id ----*/
          it('should be called with proper arguments to get the display map settings data', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/user/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getUserInfoById('', '');
        });
                  /*---- Test to get the enteprise locate details ----*/
                  it('should be called with proper arguments to get the display map settings data', () => {
                    backend.connections.subscribe((connection: MockConnection) => {
                        expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/displaytomapsetting/maplocate/');
                        expect(connection.request.method).toEqual(RequestMethod.Get);
                        expect(connection.request.headers.get('Content-Type')).toEqual(null);
                        const options = new ResponseOptions({
                            body: JSON.stringify({ success: true })
                        });
                        connection.mockRespond(new Response(options));
                    });
                    subject.getdisplaytomapsetting('', '', '');
                });
        /*---- Test to get location list ----*/
    it('should be called with proper arguments to get user locate advance search', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.userlocatesAdvancedSearch('', '');
    });
     /*---- Test to get map location list----*/
    it('should be called with proper arguments to locate user', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.userlocates('', '');
    });
        /*---- Test to get map location list----*/
    it('should be called with proper arguments to search user locates', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.userlocatessearch('', '', '');
    });
    /*---- Test to get Export List ----*/
    it('should be called with  Export Data', () => {
        subject.exportlist(undefined, '');
    });
     /*---- To verify getLookupsList  method ----*/
    it('should be called with proper arguments for getLookupsList ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsList('', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
      /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getSearchUsersList('', '').subscribe(r => {
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
        subject.getSearchUsersList('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
