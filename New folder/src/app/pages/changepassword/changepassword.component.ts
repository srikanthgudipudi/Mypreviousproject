/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 *Forgot password component is used to reset the password.
 * Forgot password component is used following functionality:
 * ngOnInit(): To load the content at loading time.
 * MatchPassword(AC: AbstractControl): Method to check matching of password and confirmPassword.
 * checkWithNewPassword(confirmPassword): To compare confirm password with new password.
 * resetPassword(reset): To Reset password.
 * linkVerify(sptoken): To verify the link.
 * clearmessage(): To clear the messages.
*/

import { Component, ViewEncapsulation, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { ChangePasswordService } from './changepassword.service';

@Component({
    templateUrl: './changepassword.html',
    providers: [ChangePasswordService],
    encapsulation: ViewEncapsulation.None
})

export class ChangePasswordComponent implements OnInit {
    private pattern = '(?=.*[!@#$%^&*()])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$';
    reset: ResetLink = new ResetLink();
    resetErrorMsg = '';
    errorMsg = '';
    sptoken: string;
    invalidPassword = '';
    checkConfirmPassword = false;
    validateNewPassword = '';
    validateConfirmPassword = '';
    checkPassword = '';
    resetpswd: any;
    tokenexpired_msg: any;
    invalidtoken_msg: any;
    status: any;
    linkexpired: any;

    /**---- Constructor for change password component ----*/
    constructor(private changePasswordService: ChangePasswordService,
        private router: Router,
        private translateService: TranslateService,
        vcr: ViewContainerRef,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder) {
        this.resetpswd = translateService.get('TOASTER.RESET_PASSWORD');
        this.tokenexpired_msg = translateService.get('TOASTER.TOKEN');
        this.invalidtoken_msg = translateService.get('TOASTER.INVALID_TOKEN');
        document.body.className = 'app flex-row align-items-center login-body';
    }

    /**---- To load the content at loading time ----*/
    ngOnInit() {
        const smsToken = window.localStorage.getItem('smstoken');
        const smscheck = window.localStorage.getItem('SMS');
        const url1 = window.location.href;
        const link = url1.split('?sptoken=');
        this.sptoken = link[1];
        this.linkVerify(this.sptoken);
        if (url1.includes('?sptoken=')) {
            window.localStorage.removeItem('smstoken');
            window.localStorage.removeItem('SMS');
            this.linkVerify(this.sptoken);
        } else if (smscheck === 'smsreset') {
            this.sptoken = smsToken;
            this.status = '0';
        } else {
            const url = window.location.href;
            const token = url.split(':spToken%3D');
            this.sptoken = token[1];
            this.status = '0';
        }
    }

    /*----  Method to check matching of password and confirmPassword  ----*/
    MatchPassword(AC: AbstractControl) {
        const password = AC.get('password').value;
        // to get value in input tag
        const confirmPassword = AC.get('confirmPassword').value;
        // to get value in input tag
        if (confirmPassword === undefined || confirmPassword === '' || confirmPassword === null) {
            AC.get('confirmPassword').hasError('required');
        } else if (password !== confirmPassword) {
            AC.get('confirmPassword').setErrors({ MatchPassword: true });
        } else {
            AC.get('confirmPassword').setErrors(null);
            return null;
        }
    }

    /*---- To compare confirm password with new password ----*/
    checkWithNewPassword(confirmPassword) {
        if (confirmPassword !== undefined || confirmPassword !== '') {
            if (this.reset.newPassword === confirmPassword) {
                this.checkConfirmPassword = false;
            } else {
                this.checkConfirmPassword = true;
            }
        }
    }

    /** ----- To Reset password ----- */
    resetPassword(reset) {
        if (reset.newPassword === undefined || reset.newPassword === '' || reset.newPassword === null) {
            this.validateNewPassword = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_PASSWORD';
        }
        if ((reset.newPassword !== undefined || reset.newPassword !== '' || reset.newPassword !== null)) {
            if ((reset.newPassword).match(this.pattern)) {

                if (reset.confirmPassword === undefined || reset.confirmPassword === null) {
                    this.validateConfirmPassword = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_PASSWORD';
                }
                if (reset.newPassword !== undefined && reset.confirmPassword !== undefined) {
                    if ((reset.newPassword !== undefined && reset.confirmPassword !== undefined) &&
                        (this.reset.newPassword === this.reset.confirmPassword)) {
                        this.changePasswordService.resetPassword(this.reset.newPassword, this.reset.confirmPassword, this.sptoken)
                            .subscribe(data => {
                                if (data['statusCode'] === '1011') {
                                    this.router.navigate(['/pages/login']);
                                }
                            }, error => {
                                const status = JSON.parse(error['status']);
                                switch (status) {
                                    case 500:
                                        break;
                                    case 400:
                                        const statusCode = JSON.parse(error['_body']).statusCode;
                                        switch (statusCode) {
                                            case '9995':
                                                this.errorMsg = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
                                                break;
                                            case '9959':
                                                this.errorMsg = 'COMMON_STATUS_CODES.' + statusCode;
                                                break;
                                            case '9953':
                                                this.errorMsg = 'COMMON_STATUS_CODES.' + statusCode;
                                                break;
                                            default:
                                                break;
                                        }
                                        break;
                                }
                            });

                    } else {
                        this.checkConfirmPassword = true;
                        this.checkPassword = 'LOGIN.PASSWORD_MISMATCH';
                    }
                } else {
                    this.resetErrorMsg = 'PAGES_CHANGE_PASSWORD.PASSWORD_UPDATE_FAILED';
                }
            } else {
                this.invalidPassword = 'LOGIN.VALID_MESSAGE_PASSWORD';
            }
        }
    }

    /**--- To verify the link ----*/
    linkVerify(sptoken) {
        this.changePasswordService.verify(this.sptoken).subscribe(data => {
            this.status = '0';
            this.router.navigate(['/resetPassword']);
        }, error => {
            const status = JSON.parse(error['status']);
            switch (status) {
                case 500: this.linkexpired = 'COMMON_STATUS_CODES.9999';
                    break;
                case 400:
                    const statusCode = JSON.parse(error['_body']).statusCode;
                    switch (statusCode) {
                        case '9957':
                            this.linkexpired = 'COMMON_STATUS_CODES.' + statusCode;
                            break;
                        case '9958':
                            this.linkexpired = 'COMMON_STATUS_CODES.' + statusCode;
                            this.status = 1;
                            break;
                        default:
                            this.linkexpired = 'COMMON_STATUS_CODES.9999';
                            break;
                    }
                    break;
            }
        });
    }

    /**---- To clear the messages ----*/
    clearmessage() {
        this.resetErrorMsg = '';
        this.invalidPassword = '';
        this.checkPassword = '';
    }
}
export class ResetLink {
    public newPassword: string;
    public confirmPassword: string;
    public msg: string;
}
