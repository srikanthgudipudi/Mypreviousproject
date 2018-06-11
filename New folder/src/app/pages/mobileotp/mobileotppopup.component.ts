/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/** MobileOtpPopupComponent is used to sent OTP to the registered mobile number to reset password
 * MobileOtpPopupComponent has the following methods:
 * openotpPopupModal: This method is used to show otp popup.
 * resendOtp(): This method is used to request for another OTP value.
 * otpValueQues() : This method is used to get entered OTP number and encrypted and sent to server
   by using response page is navigated.
 * hideotpPopupModal(): This method is used to hide the otppopupmodal.
 * clearmessage(); This method is used to clear the data after closing.
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ForgotService } from '../forgotpassword/forgotpwd.service';
import { Md5 } from 'ts-md5/dist/md5';
import { TranslateService } from 'ng2-translate';

@Component({
    selector: 'app-otp-popup',
    templateUrl: './mobileotppopup.html',
    providers: [],
    encapsulation: ViewEncapsulation.None
})

export class MobileOtpPopupComponent {
    failMsg = '';
    emailError = '';
    mailErrorMsg = '';
    invalidMsg = '';
    securityquesAnswered: any = {};
    secQues: any = {};
    quesCount = 1;
    securityFieldEnabled = true;
    wrongAnswerErrorMsg = '';
    noQuesErrorMsg = '';
    errorUserMsg = '';
    validateallfields = '';
    otpnumber = '';
    otpvalidate = '';
    md5: any;
    otpmobile: any;
    user: UserSecurityQuestions = new UserSecurityQuestions();
    @ViewChild('sendOtpModal') public otpModalPopup: ModalDirective;
    otpForm: NgForm;
    @ViewChild('sendOtpForm') currentotpForm: NgForm;
    constructor(private forgotService: ForgotService,
        private translateService: TranslateService,
        private router: Router) {
        document.body.className = 'app flex-row align-items-center login-body';
    }

    /*-----  To open otppopup page ----- */
    public openotpPopupModal(): void {
        this.otpModalPopup.show();
    }

    /*-----  To resend the OTP to the registered mobile number----- */
    public resendOtp() {
        this.otpvalidate = '';
        this.user.number = '';
        this.otpnumber = '';
        this.otpmobile = this.translateService.get('TOASTER.OTP_MOBILE');
        // this.toastr.success(this.otpmobile.value);
        const number = window.localStorage.getItem('mobilenumber');
        this.forgotService.getOtpValue(number)
            .subscribe(data => {
                if (data.OTPValidation === true) {
                    this.otpnumber = '';
                    this.otpModalPopup.hide();
                    this.router.navigate(['/resetPassword']);

                } else {
                    this.otpvalidate = 'LOGIN.OTP_INVALID';
                }
            }, error => {
            });
    }

    /*-----  To send the entered otp in encrypted----- */
    public otpValueQues() {
        const otpnumber = this.user.number;
        if (this.user.number === '' || this.user.number === null || this.user.number === undefined) {
            this.otpvalidate = 'LOGIN.VALID_NOBLANK_OTP';
        } else {
            const mobile = window.localStorage.getItem('mobilenumber');
            this.md5 = new Md5();
            const otp = Md5.hashStr(otpnumber);
            this.forgotService.sendingOtp(otp, mobile)
                .subscribe(data => {
                    if (data.statusCode === '1001') {
                        this.router.navigate(['/resetPassword']);
                        window.localStorage.setItem('smstoken', data.result.token);
                        window.localStorage.setItem('SMS', 'smsreset');
                        this.user.number = '';
                        this.otpModalPopup.hide();
                    }
                }, error => {
                    const status = JSON.parse(error.status);
                    const statusCode = JSON.parse(error['_body']).statusCode;
                    switch (status) {
                        case 400:
                            if (statusCode === '9964') {
                                this.otpvalidate = 'LOGIN.OTP_INVALID';
                            }
                            //    this.toastr.success(this.phneerror1.value);
                            break;
                        case 500:
                            this.otpvalidate = 'FORGOTPASSWORD.' + statusCode;
                            break;
                    }
                });

        }
    }

    /*----- To hide the otppopup dialog  ----- */
    public hideotpPopupModal(): void {
        this.user.number = '';
        this.otpModalPopup.hide();
    }

    /*----- To clear the entered number ----- */
    clearmessage() {
        this.otpvalidate = '';
    }
}
export class UserSecurityQuestions {
    public quesId: string;
    public question: string;
    otpnumber: any;
    number: any;
}
