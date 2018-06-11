/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/* SingleEnterpriseservices spec file is used to test the SingleEnterpriseservices.
* SingleEnterpriseservices have below functionality:
* EditEnterprise(): Test to get enterprises List.
* getEnterpriseDetails(): To verify to get selected enterprise details.
* deleteEnterprise(): To verify delete enterprise details.
* getStates(): To verify states get method.
* getCountryCodesbyCountryName(countryName) : To verify the country codes list based on country.
* getLookupsList(token, lookupType):Test to get lookups list.
* addEnterprise(): To verify add enterprise details.
* EditEnterprise(): To verify edit enterprise details.
* updateEnterpriseInfo(uid, updateStatus, comment, reason, userToken): To update the enterprise information.
* inactivateEnterprise(enterpriseId, loginUserToken, reason) : To verify inactivate enterprise method.
* activateEnterprise(enterpriseId, loginUserToken, reason): To verify activate enterprise method.
* extractData(): To extract the data.
* handleError(): To handle error messages.
*/
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
// Test related module imports
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Enterpriseservice } from './enterprise.service';
import * as config from '../../../app.config';

/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('SingleEnterpriseservices', () => {
    let subject: Enterpriseservice;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Enterpriseservice,
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
    beforeEach(inject([Enterpriseservice, MockBackend], (Enterpriseservice, mockBackend) => {
        subject = Enterpriseservice;
        backend = mockBackend;
    }));
     /*---- Test to get My Special enterprises List ----*/
   /* it('should be called with proper arguments to EditEnterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
        });
        subject.reasons('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });*/

     /*---- To update individual user status  ----*/
   /* it('should be called with proper arguments for reasons ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual('/assets/staticjsonfiles/.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
        });
        subject.reasons('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    }); */
   /*---- Get selected Enterprise Details ----*/
    it('should be called with proper arguments for getEnterpriseDetails', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT +  '/api/v1/enterprise/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterpriseDetails('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
     /*---- Delete Enterprise Details ----*/
    it('should be called with proper arguments for deleteEnterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT + '/api/v1/enterprises/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteEnterprise('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- To verify getTimeZones get method ----*/
  /*  it('should be called with proper arguments for TimeZones ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'TIME_ZONES',
                        'values': [
                            'Australian Central Daylight Time (UTC+10:30)',
                            'Australian Central Standard Time (UTC+09:30)',
                            'ASEAN Common Time (UTC+08:00)',
                            'Atlantic Daylight Time (UTC-03:00)']
                    }]
                }
            });
        });
        subject.getTimeZones().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'TIME_ZONES',
                values: [
                    'Australian Central Daylight Time (UTC+10:30)',
                    'Australian Central Standard Time (UTC+09:30)',
                    'ASEAN Common Time (UTC+08:00)',
                    'Atlantic Daylight Time (UTC-03:00)']
            }]);
        });
    });*/
    /*---- To verify States get method ----*/
    it('should be called with proper arguments for getStates ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/states/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getStates('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify Get the country codes list based on country ----*/
    it('should be called with proper arguments for get Country Codes by Country Name ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookups/states/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getCountryCodesbyCountryName('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify Get the inactivate Enterprise ----*/
    it('should be called with proper arguments for inactivate Enterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprises/inactivate/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.inactivateEnterprise('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify Get the activate Enterprise ----*/
    it('should be called with proper arguments for activate Enterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprises/activate/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.activateEnterprise('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getTheme get method ----*/
   /* it('should be called with proper arguments for Theme ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'UI_THEMES',
                        'values': [
                            'Army-Green',
                            'Bazaar']
                    }]
                }
            });
            
        });
        subject.getTheme().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'UI_THEMES',
                values: [
                    'Army-Green',
                    'Bazaar']
            }]);
        });
    });*/
    /*---- To verify Countries get method ----*/
    /*it('should be called with proper arguments for Countries ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'COUNTRIES',
                        'values': [
                            'United States',
                            'United Kingdom']
                    }]
                }
            });
            
        });
        subject.getCountries().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'COUNTRIES',
                values: [
                    'United States',
                    'United Kingdom']
            }]);
        });
    });*/
    /*---- To verify getLanguages get method ----*/
  /*  it('should be called with proper arguments for getLanguages ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'LANGUAGES',
                        'values': [
                            'English',
                            'Telugu']
                    }]
                }
            });
            
        });
        subject.getLanguages().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'LANGUAGES',
                values: [
                    'English',
                    'Telugu']
            }]);
        });
    });*/
    /*---- To verify getCurrency get method ----*/
    /*it('should be called with proper arguments for getCurrency ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'CURRENCIES',
                        'values': [
                            'Afghanistan Afghani',
                            'Albania Lek',
                            'Australia Dollar',
                            'Aruba Guilder']
                    }]
                }
            });
            
        });
        subject.getCurrency().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'CURRENCIES',
                values: [
                    'Afghanistan Afghani',
                    'Albania Lek',
                    'Australia Dollar',
                    'Aruba Guilder']
            }]);
        });
    }); */
    /*---- To verify getCurrencyFormat get method ----*/
  /*  it('should be called with proper arguments for getCurrencyFormat ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'AMOUNT_FORMATS',
                        'values': [
                            '# ###,##',
                            '# ###.##',
                            '#, ###.##',
                            '#,###.##',
                            '#.###,##']
                    }]
                }
            });
            
        });
        subject.getCurrencyFormat().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'AMOUNT_FORMATS',
                values: [
                    '# ###,##',
                    '# ###.##',
                    '#, ###.##',
                    '#,###.##',
                    '#.###,##']
            }]);
        });
    });*/
    /*---- To verify DateFormat get method ----*/
   /* it('should be called with proper arguments for DateFormat ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: {
                    'data': [{
                        '_id': 'DATE_FORMATS',
                        'values': [
                            'DD/MM/YY',
                            'MM/DD/YY']
                    }]
                }
            });
            
        });
        subject.getDateFormat().subscribe((response) => {
            expect(response).toEqual([{
                _id: 'DATE_FORMATS',
                'values': [
                    'DD/MM/YY',
                    'MM/DD/YY']
            }]);
        });
    });*/

 /*---- Add Enterprise Details ----*/
    it('should be called with proper arguments for addEnterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT +  '/api/v1/enterprises/');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.addEnterprise('', '', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- Edit Enterprise Details ----*/
    it('should be called with proper arguments for EditEnterprise', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT +  '/api/v1/enterprises/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.EditEnterprise('', '', '', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    /*---- To update the update information ----*/
    it('should be called with proper arguments for updateEnterpriseInfo', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT +  '/v1/admin/enterprises/status');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateEnterpriseInfo('', '', '', '', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
    it('should be called with proper arguments for LookupsList', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url)
                .toEqual(config.API_END_POINT +  '/api/v1/lookups/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getLookupsList('', '').subscribe((data) => {
            expect(data).toEqual({  });
        });
    });
        /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.getLookupsList('', '').subscribe(r => {
            const out: any = r;
            expect(out).toEqual({ });
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
        subject.getLookupsList('', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});

