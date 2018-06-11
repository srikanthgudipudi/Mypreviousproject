/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * ngOnInit(): To load the content st loading time.
 * ngAfterViewInit(): After viw intialisation is rendered.
 * viewChildModal(updateaction, imgObj): To open the popup.
 * getEnterprisesList(): To get the enterprise list.
 * getResourcesData(resourceId): To get selected  the ResourcesData.
 * getUserlistByentId(entId): To get User list by Enterprise id.
 * getMessageTypes(): To get the message types.
 * messagetypeChange(event): To get selcted the message type.
 * imageUploaded(event): To upload the image.
 * createMessage():  To create and send a message to the user.
 * readMessage(: Used to Read the message.
 * deleteMessage(): Used to Delete the message.
 * clearmessage(): To clear the messages.
 * hideuimageModal(): To hide the popup model.
 */

import { Component, OnInit, ViewChild, Inject, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageService } from './message.service';
import { FleetReservationServices } from '../../../transactions/fleetreservations/fleetreservationpopup/fleetreservation.service';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-message-popup',
  templateUrl: './message.html',
  providers: [MessageService, FleetReservationServices]
})

export class MessageComponent implements OnInit, AfterViewInit {
  token: any = window.localStorage.getItem('token');
  storage: Storage = window.localStorage;
  toastermessage: any;
  enterprisesSize: any;
  enterprisesName: any;
  enterpriseIconFilePath: any;
  enterprisesNames: any = [];
  selectedObj: any;
  enterpriseid: any;
  enterprisename: any = '';
  pagename: any;
  actionName: any;
  error: any;
  message: any;
  resourcesList: any[];
  resource: any;
  messagetype: any;
  msgtypes: any;
  useraccount: any;
  file: any;
  imgSrc: any = '';
  imagestatus: any = false;
  addmsg: any;
  firstname: any;
  lastname: any;
  accountName: any;
  username: any;
  useraccount2: any;
  userdata: any;
  filepath: any;
  msgdate: any;
  touserId: any;
  fromUserId: any;
  timezoneCode: any;
  timezoneCodes: any;
  loginUserDateFormat: any;
  public fullImagePath: any;
  enterpriseIcon: any;
  updatedAt: any;
  createdAt: any;
  imageTypeError: any = false;
  errMsg1: any;
  errMsg2: any;
  usersList: any;
  available: any[];
  selected: any[];
  useraccountTo: any;
  enterpriseNameUser: any;
  enterpriseIduser: any;
  userId: any;
  messageUser = false;
  selectedUserAccountTo: any[];
  isGroup: any;
  messageObj: any;
  messageto: any;
  messagetoId: any;
  tousername: any;
  messagetoaccnt: any;
  msgFname: any;
  msgLname: any;
  @ViewChild('lgModal') public childModal: ModalDirective;
  @Output() updatedList: EventEmitter<string> = new EventEmitter();

  constructor(private el: ElementRef,
    private singlemessageservices: MessageService, private router: Router,
    public toastr: ToastsManager, private translateService: TranslateService,
    private singleFleetReservationServices: FleetReservationServices,
    private sanitizer: DomSanitizer,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number) {
  }

  /*---- To load the content st loading time ----*/
  ngOnInit() {
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else {
    }
    this.useraccount = window.localStorage.getItem('user_Account');
  }

  /**----- After viw intialisation is rendered ---*/
  ngAfterViewInit() {
    if (window.localStorage.getItem('messageuser') === ('messageuser')) {
      this.messageUser = true;
      this.viewChildModal('Create', '');
    }
    if (window.localStorage.getItem('mapmessageuser') === 'mapmessageuser') {
      this.messageUser = true;
      this.singlemessageservices.getMessageHistoryInfoById(this.token, window.localStorage.getItem('id')).subscribe(
        messageCallHistoryInfo => {
          if (messageCallHistoryInfo['result'].messageTo.userAccount === this.useraccount) {
            this.messageto = messageCallHistoryInfo['result'].messageFrom.userId.enterpriseResourceObj.firstName + ' '
              + messageCallHistoryInfo['result'].messageFrom.userId.enterpriseResourceObj.lastName;
            this.messagetoId = messageCallHistoryInfo['result'].messageFrom.userId.enterpriseResourceObj._id;
            this.messagetoaccnt = messageCallHistoryInfo['result'].messageFrom.userAccount;
          } else {
            this.messageto = messageCallHistoryInfo['result'].messageTo.userId.enterpriseResourceObj.firstName + ' '
              + messageCallHistoryInfo['result'].messageTo.userId.enterpriseResourceObj.lastName;
            this.messagetoId = messageCallHistoryInfo['result'].messageTo.userId.enterpriseResourceObj._id;
            this.messagetoaccnt = messageCallHistoryInfo['result'].messageTo.userAccount;
          }
          window.localStorage.setItem('useraccount', this.messageto);
          window.localStorage.setItem('tousernameacc', this.messagetoaccnt);
          window.localStorage.setItem('enterprisename', messageCallHistoryInfo['result'].enterprise.enterpriseName);
          window.localStorage.setItem('enterpriseid', messageCallHistoryInfo['result'].enterprise.enterpriseId._id);
          window.localStorage.setItem('userid', this.messagetoId);
          this.viewChildModal('Create', '');
        }, error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
          }
        });
    }
  }

  /*---- To open the popup ----*/
  public viewChildModal(updateaction, imgObj) {
    this.selectedObj = imgObj;
    this.actionName = updateaction;

    if (this.actionName === 'Create') {
      this.fromUserId = window.localStorage.getItem('user_id');
      this.useraccount = window.localStorage.getItem('user_Account');
      this.firstname = window.localStorage.getItem('first_name');
      this.lastname = window.localStorage.getItem('last_name');
      this.accountName = this.firstname + ' ' + this.lastname + ' ' + '(' + this.useraccount + ')';
      this.getMessageTypes();
      this.messagetype = 'undefined';
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_MESSAGE';
      if (this.messageUser === true) {
        this.tousername = window.localStorage.getItem('useraccount');
        this.enterpriseNameUser = window.localStorage.getItem('enterprisename');
        this.enterpriseIduser = window.localStorage.getItem('enterpriseid');
        this.userId = window.localStorage.getItem('userid');
        this.useraccount2 = window.localStorage.getItem('tousernameacc');
        this.enterprisename = this.enterpriseNameUser;
        this.enterpriseid = this.enterpriseIduser;
        this.touserId = this.userId;
      } else {
        this.getEnterprisesList();
      }
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');

    } else if (this.actionName === 'Edit') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0].trim();
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.getEnterprisesList();
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_MESSAGE';
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (this.actionName === 'View' && this.selectedObj.messageStatus === 'Received') {
      this.readMessage();
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');

      this.filepath = this.selectedObj.messageMediaFilePath;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

      this.msgdate = moment(this.selectedObj.messageDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_MESSAGE_HISTORY';

    } else if (this.actionName === 'View') {
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.filepath = this.selectedObj.messageMediaFilePath;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.msgdate = moment(this.selectedObj.messageDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_MESSAGE_HISTORY';

    } else if (this.actionName === 'Delete') {
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_MESSAGE_HISTORY';
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (this.actionName === 'Read') {
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'Read';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.msgdate = moment(this.selectedObj.messageDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.filepath = this.selectedObj.messageMediaFilePath;
    }
    this.childModal.show();
  }

  /*---- To get the enterprise list ----*/
  getEnterprisesList() {
    this.singlemessageservices.getEnterprices(this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseIcon = this.enterprisesName[0].enterpriseIcon;
            this.enterpriseid = this.enterprisesName[0]._id;
            this.enterprisename = this.enterprisesName[0].enterpriseName;
            this.enterprisesSize = true;
            this.singlemessageservices.getResources(this.token, this.enterpriseid)
              .subscribe(resources => {
                if (resources['statusCode'] === '1028') {
                  this.resourcesList = resources['result'];
                  this.selectedUserAccountTo = [];
                  for (let i = 0; i < this.resourcesList.length; i++) {
                    if (JSON.stringify(this.resourcesList[i].isGroup) === 'false') {
                      this.selectedUserAccountTo.push(this.resourcesList[i]);
                    } else if (JSON.stringify(this.resourcesList[i].isGroup) === 'true') {
                      this.resourcesList[i].enterpriseResourceObj = {};
                      this.resourcesList[i].enterpriseResourceObj.firstName = this.resourcesList[i].userAccount;
                      this.resourcesList[i].enterpriseResourceObj.lastName = '';
                      this.selectedUserAccountTo.push(this.resourcesList[i]);
                    }
                  }
                }
              });
          } else {
            this.enterprisesNames = data.result;
            this.enterprisesSize = false;
          }
        }
      });
  }
  /*---- To get selected  enterprise name ----*/
  getEnterpriseName(value) {
    this.enterprisesName = value.split('~');
    this.enterpriseid = this.enterprisesName[0];
    this.enterprisename = this.enterprisesName[1];
    this.enterpriseIcon = this.enterprisesName[3];
    this.enterpriseIconFilePath = this.enterprisesName[2] + '/' + this.enterpriseIcon;
    this.useraccount2 = '';
    this.selectedUserAccountTo = [];
    if (this.enterpriseid === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.resourcesList = null;
      this.useraccount2 = '';
    }
    this.singlemessageservices.getResources(this.token, this.enterpriseid)
      .subscribe(resources => {
        if (resources['statusCode'] === '1028') {
          this.resourcesList = resources['result'];
          for (let i = 0; i < this.resourcesList.length; i++) {
            if (JSON.stringify(this.resourcesList[i].isGroup) === 'false') {
              this.selectedUserAccountTo.push(this.resourcesList[i]);
            } else if (JSON.stringify(this.resourcesList[i].isGroup) === 'true') {
              this.resourcesList[i].enterpriseResourceObj = {};
              this.resourcesList[i].enterpriseResourceObj.firstName = this.resourcesList[i].userAccount;
              this.resourcesList[i].enterpriseResourceObj.lastName = '';
              this.selectedUserAccountTo.push(this.resourcesList[i]);
            }
          }
        }
      });
    if (this.actionName === 'CreateMessageGroup') {
      this.getUserlistByentId(this.enterpriseid);
    }
  }

  /**---- To get selected  the ResourcesData ----*/
  getResourcesData(resourceId) {
    this.userdata = resourceId.split('$');
    this.touserId = this.userdata[0];
    this.useraccount2 = this.userdata[1];
    const firstname = this.userdata[2];
    const lastname = this.userdata[3];
    this.tousername = firstname + ' ' + lastname;
    this.isGroup = this.userdata[4];
    this.resource = resourceId;
    this.messagetype = '';
  }

  /** ---- To get User list by Enterprise id ----- */
  getUserlistByentId(entId) {
    this.selected = [];
    this.available = [];
    this.singleFleetReservationServices.getUserListByEntId(this.token, entId)
      .subscribe(
      userList => {
        this.usersList = userList['result'];
      },
      error => {
        switch (JSON.parse(error['_body']).statusCode) {
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /*---- To get the message types ----*/
  getMessageTypes() {
    this.singlemessageservices.getmessagetypes(this.token, 'MESSAGE_TYPES')
      .subscribe(data => {
        this.msgtypes = data['result'];
      }, error => {
      }
      );
  }

  /*---- To get selcted the message type ----*/
  messagetypeChange(event) {
    this.messagetype = event;
    this.file = '';
    this.message = '';
  }

  /*---- To upload the image ----*/
  imageUploaded(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.fullImagePath = files[0];
    }
    const fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = this.file.size;
    let i = 0;
    while (fSize > 900) {
      fSize /= 1024;
      i++;
    }
    const size = (Math.round(fSize * 100) / 100);
    const bytes = fSExt[i];
    this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    setTimeout(() => {
      this.imgSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.file));
    }, 500);
    const pictype = this.file.type;
    const extension = pictype.substring(pictype.lastIndexOf('/'));
    const myObj = { 'imageTypes': ['/jpg', '/jpeg', '/gif', '/bmp', '/png'] };
    for (let j = 0; j < myObj['imageTypes'].length; j++) {
      const index = myObj['imageTypes'][j].indexOf(extension);
      if (index > -1) {
        this.imageTypeError = false;
        this.error = '';
        if (this.imageMinSize > size || bytes !== 'KB') {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else if (size > this.imageMaxSize || bytes !== 'KB') {
          this.imagestatus = false;
          this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
          this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
          this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
        } else {
          this.imagestatus = true;
        }
        break;
      } else {
        this.imageTypeError = true;
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      }

    }
    if (this.actionName === 'Create') {
      const createmhistoryimg = <HTMLInputElement>document.getElementById('createmhistoryimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      createmhistoryimg.innerHTML = img;
    }
  }

  /*---- To create and send a message to the user ----*/
  createMessage() {
    if (this.enterprisename === '' || this.enterprisename === undefined || this.enterprisename === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.useraccount2 === '' || this.useraccount2 === undefined || this.useraccount2 === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_USERNAME';
    } else if (this.messagetype === '' || this.messagetype === undefined || this.messagetype === null || this.messagetype === 'undefined') {
      this.error = 'MESSAGE_HISTORY.VALID_NOBLANK_MESSAGE_TYPE';
    } else if ((this.messagetype !== 'Text') && (this.file === '' || this.file === undefined || this.file === null)) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_NOBLANK_IMAGE';
    } else if ((this.messagetype === 'Text') && (this.message === '' || this.message === undefined || this.message === null)) {
      this.error = 'MESSAGE_HISTORY.VALID_NOBLANK_MESSAGE';
    } else if (this.file !== '' && this.imagestatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else {
      if (this.isGroup === 'true') {
        this.messageObj = {
          'enterprise': {
            'enterpriseId': this.enterpriseid,
            'enterpriseName': this.enterprisename
          },
          'messageFrom': {
            'userId': this.fromUserId,
            'userAccount': this.useraccount,
            'userName': this.firstname + ' ' + this.lastname,
          },
          'messageTo': {
            'groupId': this.touserId,
            'groupName': this.useraccount2,
          },
          'messageType': this.messagetype,
          'message': this.message,
        };
      } else {
        this.messageObj = {
          'enterprise': {
            'enterpriseId': this.enterpriseid,
            'enterpriseName': this.enterprisename
          },
          'messageFrom': {
            'userId': this.fromUserId,
            'userAccount': this.useraccount,
            'userName': this.firstname + ' ' + this.lastname,
          },
          'messageTo': {
            'userId': this.touserId,
            'userAccount': this.useraccount2,
            'userName': this.tousername,
          },
          'messageType': this.messagetype,
          'message': this.message,
        };
      }
      this.singlemessageservices.addmessage(this.messageObj, this.token, this.file)
        .subscribe(data => {
          if (data['statusCode'] === '1011') {
            this.hideuimageModal();
            this.addmsg = data['result'];
            window.localStorage.removeItem('useraccount');
            window.localStorage.removeItem('enterprisename');
            window.localStorage.removeItem('messageuser');
            window.localStorage.removeItem('userid');
            window.localStorage.removeItem('enterpriseid');
             window.localStorage.removeItem('tousernameacc');
            this.updatedList.emit('submit');
          }
        }, error => {
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (JSON.parse(error['_body']).statusCode) {
            case '9961':
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
              break;
          }
        });
    }
  }

  /*-- Used to Read the message --*/
  readMessage() {
    this.useraccount = window.localStorage.getItem('user_Account');
    const fname = window.localStorage.getItem('first_name');
    const lname = window.localStorage.getItem('last_name');
    if (this.selectedObj.messageTo.userName !== '') {
    this.msgFname = this.selectedObj.messageTo.userId.enterpriseResourceObj.firstName;
    this.msgLname = this.selectedObj.messageTo.userId.enterpriseResourceObj.lastName;
    }
    if (fname + ' ' + lname === this.msgFname + ' ' + this.msgLname) {
      this.singlemessageservices.readMessages(this.token, this.selectedObj._id)
        .subscribe(data => {
          if (data['statusCode'] === '1024') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_MESSAGEREAD_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            this.updatedList.emit('submit');
          }
          if (this.pagename === 'COMMON_PAGE_TITLES.VIEW_MESSAGE_HISTORY') {

          } else {
            this.childModal.hide();
          }
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else {
                this.error = 'COMMON_STATUS_CODES.' + statuscode;
              }
              break;
          }
        }
        );
    }
  }

  /*-- Used to Delete the message  --*/
  deleteMessage() {
    this.singlemessageservices.deleteMessages(this.token, this.selectedObj._id)
      .subscribe(data => {
        if (data['statusCode'] === '1013') {
          this.childModal.hide();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.updatedList.emit('submit');
        }
      }, error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
            break;
        }
      }
      );
  }

  /*--- To clear the messages ----*/
  clearmessage() {
    this.error = '';
  }

  /*---- To hide the popup model ----*/
  public hideuimageModal() {
    this.childModal.hide();
    this.enterprisename = '';
    this.clearmessage();
    this.file = '';
    this.useraccount2 = '';
    this.selectedUserAccountTo = null;
    this.enterpriseIconFilePath = '';
    this.resourcesList = null;
    this.imgSrc = '';
    this.messageUser = false;
    window.localStorage.removeItem('enterprisename');
    window.localStorage.removeItem('useraccount');
    window.localStorage.removeItem('messageuser');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('enterpriseid');
  }
}

