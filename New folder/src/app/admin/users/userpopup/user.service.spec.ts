/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/
/*
* Singleuserservices spec file is used to test Singleuserservices.
* Singleuserservices  has the following method:
* deleteUserInfo(userId, token): To verify deleteUserInfo Put method.
* createUser(): To verify create Info post method.
* updateUser(): VTo verify updateUser put method.
* getEnterprices(): To verify getEnterprices get method.
* getResourcesData(): To verify getResourcesData get method.
* getResources(): To verify getResources get method.
* getLookupsList(): To verify getstaticdetails get method.
* securityQuestion(): To verify securityQuestion get method.
* updateSecurityQuestions(): To verify updateSecurityQuestions get method.
* getTimeZones(): To verify getTimeZones get method.
* getCurrencyFormat(): To verify getCurrencyFormat get method.
* saveProfilePic(): To verify saveProfilePic get method.
* userProfile(): To verify user Profile Method.
* extractData(res: Response): This method is used to extract json data.
* handleError(error: Response | any): This method is used to handle error.
*/
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*--- Test related module imports ----*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import * as config from '../../../app.config';
import { Userservice } from './user.service';
/*---- We initialise the components and services we are using ----*/
/*---- TestBed is used to create angular testing module ----*/
describe('Singleuserservices', () => {
    let subject: Userservice;
    let backend: MockBackend;
    /*---- Jasmine runs beforeEach() before each of the tests ----*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Userservice,
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
    beforeEach(inject([Userservice, MockBackend], (singleuserservices, mockBackend) => {
        subject = singleuserservices;
        backend = mockBackend;
    }));
    /*---- To verify deleteUserInfo Put method ----*/
    it('should be called with proper arguments for deleteUserInfo ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/');
            expect(connection.request.method).toEqual(RequestMethod.Delete);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.deleteUserInfo('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify blockUserInfo Put method ----*/
    it('should be called with proper arguments for blockUserInfo ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/block/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.blockUserInfo('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify unblockUserInfo Put method ----*/
    it('should be called with proper arguments for unblockUserInfo ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/unblock/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.unblockUserInfo('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify get User Roles Put method ----*/
    it('should be called with proper arguments for get User Roles ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/user/roles');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getUserRoles('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify create Info post method ----*/
    it('should be called with proper arguments for createUser ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createUser('', '', '', '', '', '', '', '', '', '', '', '','').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });


    /*----To verify updateUser put method ----*/
    it('should be called with proper arguments for updateUser ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/' + 'undefined');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateUser('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getEnterprices get method ----*/
    it('should be called with proper arguments for getEnterprices ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterprisesbyuser');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getEnterprices('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
     /*---- To verify userProfile get method ----*/
    it('should be called with proper arguments for userProfile ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/user/profile');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.userProfile('').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getResourcesData get method ----*/
    it('should be called with proper arguments for getResourcesData ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterpriseresourcedata/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getResourcesData('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getResources get method ----*/
    it('should be called with proper arguments for getResources ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/enterpriseresource/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.getResources('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getstaticdetails get method ----*/
    it('should be called with proper arguments for getLookupsList ', () => {
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
    /*---- To verify getstaticdetails get method ----*/
   /* it('should be called with proper arguments for getstaticdetails ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ data: true })
            });
            
        });
        subject.getstaticdetails().subscribe((response) => {
            expect(response).toEqual(true);
        });
    });*/
    /*---- To verify securityQuestion get method ----*/
    it('should be called with proper arguments for securityQuestion ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/securityquestions/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.securityQuestion('', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify updateSecurityQuestions get method ----*/
    it('should be called with proper arguments for updateSecurityQuestions ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/securityquestions/');
            expect(connection.request.method).toEqual(RequestMethod.Put);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateSecurityQuestions('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify createSecurityQuestions get method ----*/
    it('should be called with proper arguments for createSecurityQuestions ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/securityquestions/');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.createSecurityQuestions('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
    /*---- To verify getTimeZones get method ----*/
    // it('should be called with proper arguments for getTimeZones ', () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
    //         expect(connection.request.method).toEqual(RequestMethod.Get);
    //         expect(connection.request.headers.get('Content-Type')).toEqual(null);
    //         const options = new ResponseOptions({
    //             body: {
    //                 'data': [{
    //                     '_id': 'TIME_ZONES',
    //                     'values': [
    //                         'Australian Central Daylight Time (UTC+10:30)',
    //                         'Australian Central Standard Time (UTC+09:30)',
    //                         'ASEAN Common Time (UTC+08:00)',
    //                         'Atlantic Daylight Time (UTC-03:00)']
    //                 }]
    //             }
    //         });
    //         
    //     });
    //     subject.getTimeZones().subscribe((response) => {
    //         expect(response).toEqual([{
    //             _id: 'TIME_ZONES',
    //             values: [
    //                 'Australian Central Daylight Time (UTC+10:30)',
    //                 'Australian Central Standard Time (UTC+09:30)',
    //                 'ASEAN Common Time (UTC+08:00)',
    //                 'Atlantic Daylight Time (UTC-03:00)']
    //         }]);
    //     });
    // });
    // /*---- To verify getCurrencyFormat get method ----*/
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
    // /*---- To verify getCurrencyFormat get method ----*/
    // it('should be called with proper arguments for getCurrency ', () => {
    //     backend.connections.subscribe((connection: MockConnection) => {
    //         expect(connection.request.url).toEqual(config.STATIC_JSONFILES_END_POINT + 'staticlookupdata.json');
    //         expect(connection.request.method).toEqual(RequestMethod.Get);
    //         expect(connection.request.headers.get('Content-Type')).toEqual(null);
    //         const options = new ResponseOptions({
    //             body: {
    //                 'data': [{
    //                     '_id': 'CURRENCIES',
    //                     'values': [
    //                         'Afghanistan Afghani',
    //                         'Albania Lek',
    //                         'Australia Dollar',
    //                         'Aruba Guilder']
    //                 }]
    //             }
    //         });
    //         
    //     });
    //     subject.getCurrency().subscribe((response) => {
    //         expect(response).toEqual([{
    //             _id: 'CURRENCIES',
    //             values: [
    //                 'Afghanistan Afghani',
    //                 'Albania Lek',
    //                 'Australia Dollar',
    //                 'Aruba Guilder']
    //         }]);
    //     });
    // });
    /*---- To verify saveProfilePic get method ----*/
    it('should be called with proper arguments for saveProfilePic ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/v1/user/profile/image');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.saveProfilePic('', '', '').subscribe((response) => {
            expect(response).toEqual({ success: true });
        });
    });
          /*----Test to get the calendar sync modes ----*/
          it('should be called with proper arguments to get the calendar sync modes', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/lookupsbyenterprise/CALENDAR_SYNC_MODES/0');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ result: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.getsocialnetworkcalendars('').subscribe((response) => {
                expect(response).toEqual(true);
            });
        });
      /*----Test to update the user profile  ----*/
      it('should be called with proper arguments to update the user profile', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/profile/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateUserProfile('', '', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
       /*----Test to update the security questions ----*/
       it('should be called with proper arguments to update the security questions', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/users/profile/securityquestions/');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({ result: true })
            });
            connection.mockRespond(new Response(options));
        });
        subject.updateSecurityQuestionsprofile('', '', '').subscribe((response) => {
            expect(response).toEqual(true);
        });
    });
          /*----Test to get Fleet Common Name Translation----*/
          it('should be called with proper arguments to get Fleet Common Name Translation', () => {
            backend.connections.subscribe((connection: MockConnection) => {
                expect(connection.request.url).toEqual(config.API_END_POINT + '/api/v1/language/');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('Content-Type')).toEqual(null);
                const options = new ResponseOptions({
                    body: JSON.stringify({ result: true })
                });
                connection.mockRespond(new Response(options));
            });
            subject.FleetCommonNameTranslation('', '', '').subscribe((response) => {
                expect(response).toEqual(true);
            });
        });
    /*---- Test to verify the handle error with null response ----*/
    it('should extract mocked data with null response', async () => {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = new ResponseOptions({
            });
        });
        subject.saveProfilePic('', '', '').subscribe(r => {
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
        subject.saveProfilePic('', '', '').subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
