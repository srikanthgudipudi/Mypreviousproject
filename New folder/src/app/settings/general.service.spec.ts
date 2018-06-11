/*
* GeneralService spec file is used to test GeneralService.
* GeneralService method has the following methods.
* saveImage(name, description, image, profileType, maxsize, minsize, avatarminsize1, avatarmaxsize1, avatarType,
  categoryminsize1, categorymaxsize1, categoryType): This method is used to test Call API End point to save General Setting Block.
* getGeneralblockdetails(): This method is used to test get general block details.
*/
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
/*--- Test related module imports ---*/
import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import * as config from '../app.config';
import { GeneralService } from './general.service';
/*---  We initialise the components and services we are using
TestBed is used to create angular testing module ---*/
describe('GeneralService', () => {
    let subject: GeneralService;
    let backend: MockBackend;
    /**--- Jasmine runs beforeEach() before each of the tests ---*/
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GeneralService,
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
            ],
        });
    });
    beforeEach(inject([GeneralService, MockBackend], (generalService, mockBackend) => {
        subject = generalService;
        backend = mockBackend;
    }));
    /*--- To verify savecomments post method ---*/
    it('should be called with proper arguments for GeneralService ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT +  'generalSettings');
            expect(connection.request.method).toEqual(RequestMethod.Post);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({success: true})
            });
            connection.mockRespond(new Response(options));
        });
        const image = {name: 'index.jpg'};
        subject.saveImage('', '', image, '', '', '', '', '', '', '', '', '').subscribe((response) => {
            expect(response).toEqual({success: true});
        });
    });
    /*--- To verify Get General Block Details ---*/
    it('should be called with proper arguments for getGeneralblockdetails ', () => {
        backend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.url).toEqual(config.API_END_POINT +  'generalSettings');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.headers.get('Content-Type')).toEqual(null);
            const options = new ResponseOptions({
                body: JSON.stringify({success: true})
            });
            connection.mockRespond(new Response(options));
        });
        subject.getGeneralblockdetails().subscribe((response) => {
            expect(response).toEqual({success: true});
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
        subject.getGeneralblockdetails().subscribe(res => {
            expect(res).toHaveBeenCalledWith('404 - {}');
        });
    });
});
