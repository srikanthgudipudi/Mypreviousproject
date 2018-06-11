/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 *  Security Questions Component will ask questions when a user forgets his password.
 * Security Questions Component used to following functionality:
 * opensecurityquesPopupModal(): To open security questions pop up html page as pop up dialog.
 * getSecurityQuestionsByUserName(username): To get security questions based on Username in drop down box
   in forgot password pop up.html page.
 * nextSecurityQues(ques): To get next security question when we click on next button in forgot password pop up.html page.
 * ValidateAnsweredSecurityques(ques): To validate security question and answer in database.
 * clearText(): To clear text after change in questions list.
 * clearmessage(): To clear data in form.
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ForgotService } from '../forgotpassword/forgotpwd.service';

@Component({
    templateUrl: './securityq.html',
    providers: [ForgotService],
    encapsulation: ViewEncapsulation.None
})
export class SecurityQuestionsComponent {
    clickcount = 0;
    disabledUserName = false;
    answerMsgBlank = '';
    userMsgBlank = '';
    securityquesAnswered: any = {};
    secQues: any = {};
    quesCount = 1;
    securityFieldEnabled = true;
    wrongAnswerErrorMsg = '';
    noQuesErrorMsg = '';
    errorUserMsg = '';
    validateallfields = '';

    @ViewChild('securityQuesModal') public securityquesModal: ModalDirective;
    questions: Array<UserSecurityQuestions> = [];
    securityQuesForm: NgForm;
    @ViewChild('securityQuesForm') currentForm: NgForm;

    /*-----  To open securityquestionspopup html page as popup dialog----- */
    public opensecurityquesPopupModal(): void {
        this.disabledUserName = false;
        this.userMsgBlank = '';
        this.answerMsgBlank = '';
        this.quesCount = 1;
        this.questions.length = 0;
        this.securityFieldEnabled = true;
        this.securityquesModal.show();
    }

    /**---- Constructor for security questions service ----*/
    constructor(private forgotService: ForgotService, private router: Router) {
    }

    /*-----  To get security questions based on username ----- */
    getSecurityQuestionsByUserName(username) {
        if (this.securityquesAnswered.username === undefined || this.securityquesAnswered.username === '') {
            this.userMsgBlank = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
            this.questions.length = 0;
            this.securityquesAnswered.answer = '';
            this.errorUserMsg = '';
        } else {
            this.userMsgBlank = '';
            this.forgotService.getSecurityQuestionsByUserName(username)
                .subscribe(data => {
                    this.questions = data.result['secQustions'];
                    if (this.questions.length === 0) {
                        this.noQuesErrorMsg = 'COMMON_SECURITY_QUESTIONS_BLOCK.VALID_NOQUESTIONS_SET';
                    } else {
                        this.errorUserMsg = '';
                        this.securityquesAnswered.question = this.questions[0];
                    }
                },
                error => {
                    const status = JSON.parse(error['status']);
                    const statusCode = JSON.parse(error['_body']).statusCode;
                    switch (status) {
                        case 400:
                            if (statusCode === '9961') {
                                this.router.navigate(['/pages/login']);
                            }
                            if (statusCode === '9952') {
                                this.errorUserMsg = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_USERNAME';
                                this.questions.length = 0;
                            }
                            if (statusCode === '9997') {
                                this.errorUserMsg = 'COMMON_STATUS_CODES.' + statusCode;
                                this.questions.length = 0;
                            }
                            break;
                        case 500:
                            if (statusCode === '9999') {
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + statusCode;
                            }
                            break;
                    }
                });
        }
    }

    /*-----  To get next security question when we click on next button ---- */
    nextSecurityQues(ques) {
        this.wrongAnswerErrorMsg = '';
        this.answerMsgBlank = '';
        this.clickcount = 0;
        if (ques.question !== undefined && ques.answer !== undefined && ques.answer !== '') {
            this.validateallfields = '';
            this.forgotService.validateAnsweredSecQues(ques, this.quesCount)
                .subscribe(data => {
                    this.clickcount = this.clickcount + 1;
                    if (this.clickcount === 1) {
                        // if (data.securityQuestionValidation === 'true') {
                        this.securityquesAnswered.answer = '';
                        const arraycontainsturtles = (this.questions.indexOf(ques.question) > -1);
                        if (arraycontainsturtles && this.quesCount !== 4) {
                            for (let n = 0; n < this.questions.length; n++) {
                                if (this.questions[n] === ques.question) {
                                    let removedObject = this.questions.splice(n, 1);
                                    removedObject = null;
                                    break;
                                }
                            }
                            this.quesCount = this.quesCount + 1;
                            this.securityquesAnswered.question = this.questions[0];
                            if (this.quesCount === 3) {
                                this.securityFieldEnabled = false;
                            }
                        }
                        // }
                    }
                }, error => {
                    const errorStatus = JSON.parse(error['status']);
                    const errorStatusCode = JSON.parse(error['_body']).statusCode;

                    switch (errorStatus) {
                        case 400:
                            if (errorStatusCode === '9963') {
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + errorStatusCode;
                            }
                            if (errorStatusCode === '9962') {
                                // both question and answer wrong.
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + errorStatusCode;
                            }
                            if (errorStatusCode === '9952') {
                                // invalid user.
                                this.wrongAnswerErrorMsg = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_USERNAME';
                            }
                            if (errorStatusCode === '9961') {
                                window.localStorage.removeItem('favstatus');
                                window.localStorage.removeItem('commentStatus');
                                window.localStorage.removeItem('token');
                                window.localStorage.removeItem('userAccount');
                                window.localStorage.removeItem('loggedUserProfilePath');
                                window.localStorage.removeItem('userName');
                                window.localStorage.removeItem('username');
                                window.localStorage.removeItem('password');
                                this.router.navigate(['']);
                            }
                            break;
                        case 500:
                            if (errorStatusCode === '9999') {
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + errorStatusCode;
                            }
                            break;
                    }
                });
            if (this.quesCount === 1) {
                this.disabledUserName = true;
            }
        } else if (this.securityquesAnswered.username === undefined || this.securityquesAnswered.username === '') {
            this.userMsgBlank = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
            this.errorUserMsg = '';
        } else if (this.securityquesAnswered.answer === undefined || this.securityquesAnswered.answer === '') {
            this.answerMsgBlank = 'COMMON_SECURITY_QUESTIONS_BLOCK.VALID_NOBLANK_ANSWER';
        } else {
            this.validateallfields = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
        }
    }

    /*-----  To validate security question and answer in database  ----- */
    ValidateAnsweredSecurityques(ques) {
        if (this.securityquesAnswered.answer === undefined || this.securityquesAnswered.answer === '') {
            this.answerMsgBlank = 'COMMON_SECURITY_QUESTIONS_BLOCK.VALID_NOBLANK_ANSWER';
        } else {
            this.wrongAnswerErrorMsg = '';
            this.answerMsgBlank = '';
            this.secQues.username = ques.username;
            ques.questionslist = this.secQues;
            this.forgotService.validateAnsweredSecQues(ques, this.quesCount)
                .subscribe(data => {
                    this.router.navigate(['/pages/resetPassword/:spToken=' + data.result.token]);
                }, error => {
                    const errorStatus = JSON.parse(error['status']);
                    const errorStatusCode = JSON.parse(error['_body']).statusCode;
                    switch (errorStatus) {
                        case 400:
                            if (errorStatusCode === '9963') {
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + errorStatusCode;
                            }
                            if (errorStatusCode === '9962') {
                                // both question and answer wrong.
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + errorStatusCode;
                            }
                            if (errorStatusCode === '9952') {
                                // invalid user.
                                this.wrongAnswerErrorMsg = 'COMMON_VALIDATION_MESSAGES.VALID_INCORRECT_USERNAME';
                            }
                            if (errorStatusCode === '9961') {
                                window.localStorage.removeItem('favstatus');
                                window.localStorage.removeItem('commentStatus');
                                window.localStorage.removeItem('token');
                                window.localStorage.removeItem('userAccount');
                                window.localStorage.removeItem('loggedUserProfilePath');
                                window.localStorage.removeItem('userName');
                                window.localStorage.removeItem('username');
                                window.localStorage.removeItem('password');
                                this.router.navigate(['']);
                            }
                            break;
                        case 500:
                            if (errorStatusCode === '9999') {
                                this.wrongAnswerErrorMsg = 'COMMON_STATUS_CODES.' + errorStatusCode;
                            }
                            break;
                    }
                });
        }
    }

    /*---- To clear text after change in questions list ---*/
    clearText() {
        this.securityquesAnswered.answer = '';
    }

    /*---- To clear data in form ---*/
    clearmessage() {
        this.answerMsgBlank = '';
        this.validateallfields = '';
        this.wrongAnswerErrorMsg = '';
        this.userMsgBlank = '';
        this.errorUserMsg = '';
        this.noQuesErrorMsg = '';
    }
}
export class UserSecurityQuestions {
    public quesId: string;
    public question: string;
}
