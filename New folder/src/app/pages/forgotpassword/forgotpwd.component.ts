/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * Forgot password pop up component is used to show dialog modal sending link to mail for to
  get forget password
 * Forgot password pop up component used to following functionality:
 * ngOnInit(): To load the content at loading time.
 * sendOtpClicked(): To open the popup model to send the otp.
 * radioemailcheck(): To select the option to change the password.
 * radiophnumbercheck(): To change the password through mobile number.
 * getForgotPassword(): To get forgot password.
 * hyphen_generate(): To generate the hyphen to set the mobile number formate.
 * reset(): To reset the mobile number.
 * clearmessage(): To clear the message.
 * clearMesages(): To clear the radio button check.
 */

import { Component, ViewContainerRef, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { SecurityQuestionsComponent } from '../securityquestions/securityquestions.component';
import { MobileOtpPopupComponent } from '../mobileotp/mobileotppopup.component';
import { ForgotService } from '../forgotpassword/forgotpwd.service';

@Component({
    templateUrl: 'forgotpwd.html',
    providers: [ForgotService],
    encapsulation: ViewEncapsulation.None
})

export class ForgotpwdComponent implements OnInit {
    private pattern = '[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[\\.]{1}[a-zA-Z]{2,4}$';
    failMsg = '';
    emailError = '';
    mailErrorMsg = '';
    email: any;
    inactiveMsg = '';
    invalidMsg = '';
    fieldsMsg = '';
    holdMsg = '';
    cancelledMsg = '';
    mobile: any;
    emailstatus: boolean;
    phonestatus: boolean;
    mobileForm: FormGroup;
    emaildispaly = true;
    phneerror: any;
    phneerror1: any;
    phneerror2: any;
    phneerror3: any;
    emailtome: any;
    mobiledisplay: any;
    sendotp: any;
    otpmobile: any;
    phone: any;
    emailme: any;
    number: any;
    forgot: Forgotlink = new Forgotlink();

    @ViewChild('forgotModal') public forgotpasswordmodal: ModalDirective;
    @ViewChild('forgotForm1') forgotForm: NgForm;
    @ViewChild(SecurityQuestionsComponent)
    @ViewChild(MobileOtpPopupComponent)
    private mobileOtpPopupComponent: MobileOtpPopupComponent;
    mobilenumber: Array<Forgotlink> = [];

    /**---- Constructor for forgot password component ---*/
    constructor(private forgotService: ForgotService, private router: Router,
        private translateService: TranslateService, private vcr: ViewContainerRef,
        public toastr: ToastsManager
    ) {
        this.toastr.setRootViewContainerRef(vcr);
        document.body.className = 'app flex-row align-items-center login-body';
    }

    /**---- To load the content at loading time ----*/
    ngOnInit() {
        this.radioemailcheck();
    }

    /**---- To open the popup model to send the otp ----*/
    sendOtpClicked() {
        this.mobileOtpPopupComponent.openotpPopupModal();
    }

    /**---- To select the option to change the password ----*/
    radioemailcheck() {
        this.phneerror = '';
        this.email = <HTMLInputElement>document.getElementById('email');
        this.phonestatus = false;
        this.emailstatus = true;
        this.emaildispaly = true;
        this.emailtome = true;
        this.mobiledisplay = false;
        this.sendotp = false;
        this.phneerror = '';
        this.phneerror1 = '';
        this.phneerror2 = '';
        this.forgot.phonenumber = '';
    }

    /**---- To change the password through mobile number ----*/
    radiophnumbercheck() {
        this.phonestatus = true;
        this.phneerror = '';
        this.failMsg = '';
        this.emailError = '';
        this.mailErrorMsg = '';
        this.inactiveMsg = '';
        this.invalidMsg = '';
        this.fieldsMsg = '';
        this.holdMsg = '';
        this.emaildispaly = false;
        this.emailtome = false;
        this.mobiledisplay = true;
        this.sendotp = true;
        this.forgot.userLogin = '';
    }

    /*----  To get forgot password ----- */
    getForgotPassword() {
        this.phone = <HTMLInputElement>document.getElementById('forgot_popupPhone_button');
        this.emailme = <HTMLInputElement>document.getElementById('forgot_popup_button');
        this.number = <HTMLInputElement>document.getElementById('mobile');
        this.otpmobile = this.translateService.get('TOASTER.OTP_MOBILE');
        let mobilenumber = this.forgot.phonenumber;
        if (mobilenumber !== undefined && mobilenumber !== null && mobilenumber !== '') {
            const mobile = mobilenumber.split('-');
            mobilenumber = mobile[0] + mobile[1] + mobile[2];
        }
        if (this.phonestatus === true) {
            if (mobilenumber !== undefined && mobilenumber !== null && mobilenumber !== '') {
                if (this.forgot.phonenumber.length < 12) {
                    this.phneerror = 'LOGIN.MOBILENO_INVALID';
                    this.phneerror1 = '';
                    this.phneerror2 = '';
                } else {
                    window.localStorage.setItem('mobilenumber', mobilenumber);
                    this.forgotService.getOtpValue(mobilenumber)
                        .subscribe(data => {
                            if (data.statusCode === '1001') {
                                this.toastr.success(this.otpmobile.value);
                                (<HTMLInputElement>document.getElementById('phone')).checked = false;
                                (<HTMLInputElement>document.getElementById('email')).checked = true;
                                this.sendOtpClicked();
                                // this.forgotpasswordmodal.hide();
                            }
                        }, error => {
                            const status = JSON.parse(error.status);
                            const statusCode = JSON.parse(error['_body']).statusCode;
                            switch (status) {
                                case 400:
                                    if (statusCode === '9952') {
                                        this.phneerror3 = 'COMMON_STATUS_CODES.' + statusCode;
                                    } else if (statusCode === '9997') {
                                        this.phneerror1 = 'LOGIN.MOBILENO_NOT_REGISTERED';
                                    } else if (statusCode === '9995') {
                                        this.phneerror1 = '';
                                    }
                                    break;
                                case 500:
                                    this.sendOtpClicked();
                                    break;
                            }
                        });
                }
            } else {
                this.phneerror2 = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_MOBILE#';
            }
        } else {
            if ((this.forgot.userLogin) !== undefined && (this.forgot.userLogin) !== null && (this.forgot.userLogin) !== '') {
                this.phneerror1 = '';
                if ((this.forgot.userLogin).match(this.pattern)) {
                    this.forgotService.getForgotPassword(this.forgot.userLogin)
                        .subscribe(data => {
                            if (data['statusCode'] === '1028') {
                                this.router.navigate(['']);
                            }
                        },
                        error => {
                            const status = JSON.parse(error['status']);
                            switch (status) {
                                case 500:
                                    break;
                                case 400:
                                    const statusCode = JSON.parse(error['_body']).statusCode;
                                    switch (statusCode) {
                                        case '9995':
                                            this.fieldsMsg = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
                                            break;
                                        case '9952':
                                            this.inactiveMsg = 'COMMON_STATUS_CODES.' + statusCode;
                                            break;
                                        case '2054':
                                            this.mailErrorMsg = 'COMMON_STATUS_CODES.' + statusCode;
                                            break;
                                        case '2052':
                                            this.invalidMsg = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
                                            break;
                                        default:
                                            break;
                                    }
                                    break;
                            }
                        });
                } else {
                    this.failMsg = 'COMMON_VALIDATION_MESSAGES.VALID_EMAIL_ID_FORMAT';
                    this.cancelledMsg = '';
                    this.mailErrorMsg = '';
                    this.holdMsg = '';
                    this.inactiveMsg = '';
                    this.invalidMsg = '';
                    this.fieldsMsg = '';
                }
            } else {
                this.emailError = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_EMAIL_ID';
                this.cancelledMsg = '';
                this.mailErrorMsg = '';
                this.holdMsg = '';
                this.failMsg = '';
                this.inactiveMsg = '';
                this.invalidMsg = '';
                this.fieldsMsg = '';
            }
        }
    }

    /**--- To generate the hyphen to set the mobile number formate ----*/
    hyphen_generate() {
        const number = <HTMLInputElement>document.getElementById('mobile');
        if (number.value.length === 3) {
            (<HTMLInputElement>document.getElementById('mobile')).value = number.value.concat('-');
        } if (number.value.length === 7) {
            (<HTMLInputElement>document.getElementById('mobile')).value = number.value.concat('-');
        }
    }

    /**--- To reset the mobile number ----*/
    reset() {
        this.phneerror = '';
        this.mobileForm.reset();
    }

    /**----- To clear the message ---- */
    clearmessage() {
        this.emailError = '';
        this.failMsg = '';
        const number = <HTMLInputElement>document.getElementById('mobile');
        if (number) {
            number.checked = false;
        }
        this.phneerror = '';
        this.phneerror1 = '';
        this.phneerror2 = '';
        this.mailErrorMsg = '';
        this.holdMsg = '';
        this.cancelledMsg = '';
        this.invalidMsg = '';
    }

    /**---- To clear the radio button check ----*/
    clearMesages() {
        (<HTMLInputElement>document.getElementById('email')).checked = true;
        // (<HTMLInputElement>document.getElementById('mobile')).value = 'none';
        (<HTMLInputElement>document.getElementById('phone')).checked = false;
    }
}
export class Forgotlink {
    public userLogin: string;
    public msg: string;
    public other: boolean;
    phonenumber: any;
    mobile: any;
}
