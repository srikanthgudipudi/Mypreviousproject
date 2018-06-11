/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */
/* SingleFleetservices spec file is used to test the SingleFleetservices.
* SingleFleetservices have below functionality:leet details
* reasons(action, userToken): This method is used to test update individual user status.
* getFleetDetails(fleetid, enterpriseId, userToken):This method is used to test getFleetDetails method.
* updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken): This method is used to test updateEnterpriseInfo method.
* deleteFleetsfromList(fleetId): This method is used to test deleteFleetsfromList method.
* getSingleFleetDetails(fleetId, enterpriseId, userToken): This method is used to test getSingleFleetDetails method.
* getChildFleetTypeList(userToken, enterpriseid, fleettype): This method is used to test getChildFleetTypeList method.
* getCountriesList(token): This method is used to test getCountriesList method.
* getFleetTypeList(userToken, enterpriseid): This method is used to test getFleetTypeList method.
* getStatesList(token, selectedCountry):This method is used to test getStatesList method.
* getCurrencyFormat(): This method is used to test getCurrencyFormat method.
* getEnterpriseNamesList(userToken): This method is used to test getEnterpriseNamesList method.
* getEnterprisepathById(userToken, enterpriseId): This method is used to test getEnterprisepathById method.
* getLookupsList(token, lookupType): This method is used to test getLookupsList method.
* getfleetTypeAttributes(token, fleetType, enterprise): This method is used to test getfleetTypeAttributes method.
* getParentFleetList(userToken, enterpriseId, fleettype): This method is used to test getParentFleetList method.
* createSingleFleet(fleet, userToken, fleetimgfile, fleetfloorimg, fleetjsonfile): This method is used to test createSingleFleet method.
* deleteFleetsfromList(fleetId): This method is used to test deleteFleetsfromList method.
* updateFleet(fleet, fleetid, userToken, fleetimgfile, fleetfloorimg, fleetjsonfile):This method is used to test updateFleet method.
* getStates(countryName): This method is used to test getStates method.
* updateResourceRecord(userToken, _id, reason, parentfleet, enterpriseid): This method is used to test updateResourceRecord method.
* inactivatefleet(userToken, _id, reason, parentfleet, enterpriseid): This method is used to test inactivatefleet method.
* getFleetDetailsByFleetid(fleetid, userToken) : This method is used to test getFleetDetailsByFleetid method.
* getfloorvalue(userToken, data1):This method is used to test getfloorvalue method.
* extractData(): To extract the data.
* handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { FleetService } from './fleet.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('FleetService', () => {
    let subject: FleetService;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FleetService,
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
    beforeEach(inject([FleetService, MockBackend], (singleFleetservices, mockBackend) => {
        subject = singleFleetservices;
        backend = mockBackend;
    }));
    /*---- Test to get My Special fleets List ----*/
 /*   it('should be called with proper arguments to getMySpecialfleetsList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            
        });
        subject.reasons('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });*/
    /*---- Test to get My Special fleets List ----*/
    it('should be called with proper arguments to getfleetTypeAttributes', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getfleetTypeAttributes('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update Enterprise Info ----*/
    it('should be called with proper arguments to update Enterprise Info', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/v1/admin/status');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateEnterpriseInfo('', '', '', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Child Fleet Type List ----*/
    it('should be called with proper arguments to get Child Fleet Type List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/childfleettypes/1/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getChildFleetTypeList('', 1, '');
    });
    /*---- Test to get Fleet Details Info ----*/
    it('should be called with proper arguments to get Fleet Details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetDetails('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Fleet Type List ----*/
    it('should be called with proper arguments to get Fleet Type List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes/2');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetTypeList('', 2).subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Fleet Type List ----*/
    it('should be called with proper arguments to get Fleet Type List', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleettypes/0');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getFleetTypeList('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to Delete single fleet Details Info ----*/
    it('should be called with proper arguments to Delete Fleet Details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteFleetsfromList('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to Get single fleet Details Info ----*/
    it('should be called with proper arguments to get fleet Details', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleet/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getSingleFleetDetails('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Enterprise path By Id ----*/
    it('should be called with proper arguments to get Enterprise path By Id', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/listing/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprisepathById('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to enter prises Details Info ----*/
    it('should be called with proper arguments to get enterprises', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseNamesList('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Lookups List ----*/
    it('should be called with proper arguments to get Lookups Lists', () => {
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
    /*---- Test to Create single fleet Info ----*/
    it('should be called with proper arguments to create fleet ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.createSingleFleet('', '', '', '', '','','').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to update single fleet Info ----*/
    it('should be called with proper arguments to update fleet ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateFleet('', '', '', '', '', '', '', '', '', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get States ----*/
    it('should be called with proper arguments to get States ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/states/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getStates('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get CountriesList ----*/
    it('should be called with proper arguments to getCountriesList ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/countries');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getCountriesList('').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get Parent Fleet List ----*/
    it('should be called with proper arguments to get Parent Fleet List ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/parent//');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getParentFleetList('', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to  activate the enterprise ----*/
    it('should be called with proper arguments to the activate enterprise ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/activate/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateResourceRecord('', '', '', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
      /*---- Test to get lookup values by enterprise ---*/
      it('should be called with proper arguments to get lookup values by enterprise ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookupsbyenterprise/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsByEnterprise('', '', '').subscribe((data) => {
            expect(data).toEqual({ success: true });
        });
    });
        /*---- Test to get selected fleet details by using fleet id ---*/
        it('should be called with proper arguments to get selected fleet details by using fleet id ', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url)
                    .toEqual(config.API_END_POINT + '/api/v1/fleetreservations/calendar/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ success: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getFleetDetailsByFleetid('', '').subscribe((data) => {
                expect(data).toEqual({ success: true });
            });
        });
    /*---- Test to  inactivate the enterprise ----*/
    it('should be called with proper arguments to the inactivate enterprise ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/inactivate/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.inactivatefleet('', '', '', '', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to get StatesList ----*/
    it('should be called with proper arguments to getStatesList ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/lookups/states/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getStatesList('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- To verify getCurrencyFormat get method ----*/
    // it('should be called with proper arguments for CurrencyFormat ', () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
    //         expect(connection.request.method).toEqual(RequestMethod.Get);
    //         expect(connection.request.headers.get('Content-Type')).toEqual(null);
    //         const options = new ResponseOptions({
    //             body: {
    //                 'data': [{
    //                     '_id': 'AMOUNT_FORMATS',
    //                     'values': [
    //                         '# ###,##',
    //                         '# ###.##',
    //                         '#, ###.##',
    //                         '#,###.##',
    //                         '#.###,##']
    //                 }]
    //             }
    //         });
    //         
    //     });
    //     subject.getCurrencyFormat().subscribe((response) => {
    //         expect(response).toEqual([{
    //             _id: 'AMOUNT_FORMATS',
    //             values: [
    //                 '# ###,##',
    //                 '# ###.##',
    //                 '#, ###.##',
    //                 '#,###.##',
    //                 '#.###,##']
    //         }]);
    //     });
    // });
    /*---- Test to verify the handle error with null response ----*/
    // it('should extract mocked data with null response', async () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         const options = new ResponseOptions({
    //         });
    //         
    //     });
    //     subject.reasons('', '').subscribe(r => {
    //         const out: any = r;
    //         expect(out).toEqual({});
    //     });
    // });
    /*----  Test to Check fleet floor plan details ----*/
    it('should be called with proper arguments to Check fleet floor plan details ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/fleets/checkfloorplan');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getfloorvalue('', '').subscribe((data) => {
            expect(data).toEqual({});
        });
    });
    /*---- Test to verify the handle error with empty response ----*/
    // it('should log an error to the console with empty response', async () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         const options: any = new ResponseOptions({
    //             body: {},
    //             status: 404
    //         });
    //         const response: any = new Response(options);
    //         connection.mockError(response);
    //     });
    //     subject.reasons('', '').subscribe(res => {
    //         expect(res).toHaveBeenCalledWith('404 - {}');
    //     });
    // });
});
