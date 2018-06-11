/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * SingleGroupMessageComponent has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * getEnterprisesList(): This method is used to get enterpriselist.
 * getEnterpriseName(value): This method is used to getEnterpriseName.
 * getUserlistByentId(entId): get User list by Enterprise id.
 * getUserlistByRecordId(recordId): get User list by selected recordId
 * viewChildModal(updateaction, imgObj): To view, edit, delete and create from the selected group message information popup.
 * createMessageGroup(groupData): To Create Goup Message.
 * editMessageGroup(groupEditData): To Edit Goup Message.
 * deleteGroupMessage(): This method is used to delete the group message
 * blockGroupMessage(): To block the Group Message from Group Message table.
 * deleteGroupMessage(): This method is used to  deletemessage.
 * hideuimageModal(): This method is used to close the popup.
 * clearmessage(): This method is used to clear the error messages.
 */

import { Component, OnInit, ViewChild, Inject, Output, EventEmitter, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';
import { MessageGroupService } from './messagegroup.service';

@Component({
  selector: 'app-message-groupspopup',
  templateUrl: './messagegroup.html',
  providers: [MessageGroupService]
})

export class MessageGroupComponent implements OnInit, AfterViewInit {
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
  useraccount: any;
  imgSrc: any = '';
  username: any;
  filepath: any;
  msgdate: any;
  timezoneCode: any;
  timezoneCodes: any;
  loginUserDateFormat: any;
  enterpriseIcon: any;
  updatedAt: any;
  createdAt: any;
  memberData: any;
  usersList: any;
  groupData: any;
  selectedAdmin: any[];
  selectedUsers: any[];
  selectedEditAdmin: any[];
  selectedEditUsers: any[];
  selectedEditNonAdmin: any[];
  selectedEditNonUsers: any[];
  userId: any;
  utctimezone: any;
  utctimezonestring: any;
  userListDetails: any;
  groupAdminMembers: any;
  groupMembers: any;
  groupNonAdminMembers: any;
  availableUsers: any;
  statusCondtion: any;
  fromUserId: any;

  @ViewChild('lgModal') public childModal: ModalDirective;
  @Output() updatedList: EventEmitter<string> = new EventEmitter();
  @Output() onMoveToTarget: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef,
    private singlemessagegroupservices: MessageGroupService, private router: Router,
    public toastr: ToastsManager, private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    @Inject('apiEndPoint') public apiEndPoint: string) {
  }

  /*---- To load the content st loading time ----*/
  ngOnInit() {
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else {
    }
  }

  ngAfterViewInit() {
  }

  /*---- To get the enterprise list ----*/
  getEnterprisesList() {
    this.singlemessagegroupservices.getEnterprices(this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath;
            this.enterpriseIcon = this.enterprisesName[0].enterpriseIcon;
            this.enterpriseid = this.enterprisesName[0]._id;
            this.enterprisename = this.enterprisesName[0].enterpriseName;
            this.enterpriseIconFilePath = this.enterpriseIconFilePath + '/' + this.enterpriseIcon;
            this.enterprisesSize = true;
            this.getUserlistByentId(this.enterpriseid);
          } else {
            this.enterprisesNames = data.result;
            this.enterprisesSize = false;
          }
        }
      });
  }

  /*---- To get the enterprise list ----*/
  getEnterpriseName(value) {
    this.enterprisesName = value.split('~');
    this.enterpriseid = this.enterprisesName[0];
    this.enterprisename = this.enterprisesName[1];
    this.enterpriseIcon = this.enterprisesName[3];
    const enterpriseIconPath = this.enterprisesName[2];
    if (this.enterpriseid === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    } else {
      this.enterpriseIconFilePath = enterpriseIconPath + '/' + this.enterpriseIcon;
    }
    if (this.actionName === 'CreateMessageGroup') {
      this.getUserlistByentId(this.enterpriseid);
    }
  }

  /** ---- get User list by Enterprise id ----- */
  getUserlistByentId(entId) {
    this.selectedAdmin = [];
    this.selectedUsers = [];
    this.singlemessagegroupservices.getUserListByEntId(this.token, entId)
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

  /** ---- get User list by selected recordId ----- */
  getUserlistByRecordId(recordId) {
    this.selectedEditAdmin = [];
    this.selectedEditUsers = [];
    this.selectedEditNonAdmin = [];
    this.selectedEditNonUsers = [];
    this.singlemessagegroupservices.getUserlistByRecordId(this.token, recordId)
      .subscribe(
      userListDetails => {
        this.userListDetails = userListDetails['result'];
        for (let i = 0; i < this.userListDetails.length; i++) {
          if (JSON.stringify(this.userListDetails[i].isUser) === 'false') {
            this.selectedEditUsers.push(this.userListDetails[i]);
          } else if (JSON.stringify(this.userListDetails[i].isAdmin) === 'true') {
            this.selectedEditAdmin.push(this.userListDetails[i]);
          } else if (JSON.stringify(this.userListDetails[i].isAdmin) === 'false') {
            this.selectedEditNonAdmin.push(this.userListDetails[i]);
          }
        }
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

  /*----- To view, edit, delete and create from the selected group message information popup ----- */
  public viewChildModal(updateaction, imgObj) {
    this.selectedObj = imgObj;
    this.actionName = updateaction;

    if (this.actionName === 'CreateMessageGroup') {
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_GROUP_MESSAGE';
      this.getEnterprisesList();
      this.groupData = {};
      this.groupData.groupStatus = 'Active';
      this.selectedAdmin = [];
      this.groupMembers = [];
      this.usersList = [];
      this.groupAdminMembers = [];

    } else if (this.actionName === 'Edit') {
      this.getUserlistByRecordId(this.selectedObj._id);
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.filepath = this.selectedObj.messageMediaFilePath;
      this.statusCondtion = this.selectedObj.groupStatus;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.msgdate = moment(this.selectedObj.messageDate).format(this.loginUserDateFormat + ' HH:mm') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_MESSAGE_GROUP';

    } else if (this.actionName === 'View') {
      this.getUserlistByRecordId(this.selectedObj._id);
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
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_MESSAGE_GROUP';

    } else if (this.actionName === 'Delete') {
      this.getUserlistByRecordId(this.selectedObj._id);
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_MESSAGE_GROUP';
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.timezoneCodes = this.timezoneCode[0];
      this.updatedAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createdAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];

    } else if (this.actionName === 'Block') {
      this.getUserlistByRecordId(this.selectedObj._id);
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
      this.pagename = 'MESSAGE_GROUP.BLOCK_GROUP';

    } else if (this.actionName === 'Unblock') {
      this.getUserlistByRecordId(this.selectedObj._id);
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
      this.pagename = 'MESSAGE_GROUP.UNBLOCK_GROUP';
    }
    this.childModal.show();
  }


  /**----To Create Goup Message----- */
  createMessageGroup(groupData) {
    if (this.enterprisename === '' || this.enterprisename === undefined || this.enterprisename === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.groupData.groupName === '' || this.groupData.groupName === undefined || this.groupData.groupName === null) {
      this.error = 'MESSAGE_GROUP.VALID_NOBLANK_GROUP_NAME';
    } else if (this.selectedAdmin.length === 0) {
      this.error = 'MESSAGE_GROUP.VALID_ATLEAST_ONE_MEMBER_GROUP';
    } else {
      this.groupAdminMembers = [];
      this.groupMembers = [];
      groupData.enterprise = {
        'enterpriseId': this.enterpriseid,
        'enterpriseName': this.enterprisename
      };
      for (let i = 0; i < this.selectedAdmin.length; i++) {
        this.groupAdminMembers.push({
          'userId': this.selectedAdmin[i]._id,
          'userAccount': this.selectedAdmin[i].enterpriseResourceObj.firstName + ' ' + this.selectedAdmin[i].enterpriseResourceObj.lastName,
        });
      }
      for (let i = 0; i < this.selectedUsers.length; i++) {
        this.groupMembers.push({
          'userId': this.selectedUsers[i]._id,
          'userAccount': this.selectedUsers[i].enterpriseResourceObj.firstName+' '+this.selectedUsers[i].enterpriseResourceObj.lastName,
        });
      }
      this.memberData = {};
      this.memberData.enterprise = {
        'enterpriseId': this.enterpriseid,
        'enterpriseName': this.enterprisename
      };
      this.memberData.groupAdminMembers = this.groupAdminMembers;
      this.memberData.groupMembers = this.groupMembers;
      this.singlemessagegroupservices.createGroup(groupData, this.token, this.memberData)
        .subscribe(data => {
          if (data['statusCode'] === '1011') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            this.updatedList.emit('submit');
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

  /**----To Edit Goup Message----- */
  editMessageGroup(groupEditData) {
    if (this.selectedObj.groupName === '' || this.selectedObj.groupName === undefined || this.selectedObj.groupName === null) {
      this.error = 'MESSAGE_GROUP.VALID_NOBLANK_GROUP_NAME';
    } else if (this.selectedEditAdmin.length === 0) {
      this.error = 'MESSAGE_GROUP.VALID_ATLEAST_ONE_MEMBER_GROUP';
    } else {
      this.groupAdminMembers = [];
      this.groupNonAdminMembers = [];
      this.availableUsers = [];
      groupEditData = {
        '_id': this.selectedObj._id,
        'groupName': this.selectedObj.groupName,
        'groupStatus': this.selectedObj.groupStatus,
        'enterprise': {
          'enterpriseId': this.selectedObj.enterprise.enterpriseId._id,
          'enterpriseName': this.selectedObj.enterprise.enterpriseName
        },
      };

      for (let i = 0; i < this.selectedEditUsers.length; i++) {
        if (this.selectedEditUsers[i]._id) {
          this.availableUsers.push({
            '_id': this.selectedEditUsers[i]._id,
            'status': 'Closed',
            'user': {
              'userId': this.selectedEditUsers[i].user.userId,
              'userName': this.selectedEditUsers[i].user.userName
            },
            'messageGroup': {
              'groupId': this.selectedEditUsers[i].messageGroup.groupId,
              'groupName': this.selectedEditUsers[i].messageGroup.groupName
            },
            'enterprise': {
              'enterpriseId': this.selectedEditUsers[i].enterprise.enterpriseId,
              'enterpriseName': this.selectedEditUsers[i].enterprise.enterpriseName
            }
          });
        }
      }
      for (let i = 0; i < this.selectedEditAdmin.length; i++) {
        if (this.selectedEditAdmin[i]._id) {
          this.groupAdminMembers.push({
            '_id': this.selectedEditAdmin[i]._id,
            'isAdmin': true,
            'user': {
              'userId': this.selectedEditAdmin[i].user.userId,
              'userName': this.selectedEditAdmin[i].user.userName
            },
            'messageGroup': {
              'groupId': this.selectedEditAdmin[i].messageGroup.groupId,
              'groupName': this.selectedEditAdmin[i].messageGroup.groupName
            },
            'enterprise': {
              'enterpriseId': this.selectedEditAdmin[i].enterprise.enterpriseId,
              'enterpriseName': this.selectedEditAdmin[i].enterprise.enterpriseName
            }
          });
        } else {
          this.groupAdminMembers.push(this.selectedEditAdmin[i]);
        }
      }

      for (let i = 0; i < this.selectedEditNonAdmin.length; i++) {
        if (this.selectedEditNonAdmin[i]._id) {
          this.groupNonAdminMembers.push({
            '_id': this.selectedEditNonAdmin[i]._id,
            'isAdmin': false,
            'user': {
              'userId': this.selectedEditNonAdmin[i].user.userId,
              'userName': this.selectedEditNonAdmin[i].user.userName
            },
            'messageGroup': {
              'groupId': this.selectedEditNonAdmin[i].messageGroup.groupId,
              'groupName': this.selectedEditNonAdmin[i].messageGroup.groupName
            },
            'enterprise': {
              'enterpriseId': this.selectedEditNonAdmin[i].enterprise.enterpriseId,
              'enterpriseName': this.selectedEditNonAdmin[i].enterprise.enterpriseName
            }
          });
        } else {
          this.groupNonAdminMembers.push(this.selectedEditNonAdmin[i]);
        }
      }
      this.memberData = {};
      this.memberData.availableUsers = this.availableUsers;
      this.memberData.groupAdminMembers = this.groupAdminMembers;
      this.memberData.groupNonAdminMembers = this.groupNonAdminMembers;
      this.singlemessagegroupservices.editGroup(groupEditData, this.memberData, this.token).subscribe(
        data => {
          if (data['statusCode'] === '1014') {
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
            this.toastr.success(this.toastermessage.value);
            this.updatedList.emit('submit');
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

  /*---- This method is used to delete the group message ----*/
  deleteGroupMessage() {
    this.singlemessagegroupservices.deleteGroupMessage(this.token, this.selectedObj)
      .subscribe(
      response => {
        this.childModal.hide();
        if (response['statusCode'] === '1013') {
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.updatedList.emit('submit');
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
      });
  }

  /* To block the Group Message from Group Message table */
  blockGroupMessage() {
    this.singlemessagegroupservices.blockGroupMessageInfo(this.selectedObj._id, this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_BLOCK_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.updatedList.emit('submit');
          this.childModal.hide();
        }
      }, error => {
        switch (JSON.parse(error['_body']).statusCode) {
          case '9998':
            break;
          case '9995':
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            break;
          case '9997':
            break;
          case '2016':
            this.error = 'COMMON_STATUS_CODES.' + JSON.parse(error['_body']).statusCode;
            break;
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /* To block the Group Message from Group Message table */
  unblockGroupMessage() {
    this.singlemessagegroupservices.unblockGroupInfo(this.selectedObj._id, this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_UNBLOCK_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          this.updatedList.emit('submit');
          this.childModal.hide();
        }
      }, error => {
        const status = JSON.parse(error['status']);
        switch (status) {
          case '9998':
            break;
          case '9995':
            this.error = 'COMMON_VALIDATION_MESSAGES.VALID_MISSING_MANDATORY_FIELDS';
            break;
          case '9997':
            break;
          case '9961':
            this.storage.removeItem('token');
            this.router.navigate(['/pages/login']);
            break;
        }
      });
  }

  /*--- To clear the messages ----*/
  clearmessage() {
    this.error = '';
  }

  /*--- To clear the messages ----*/
  clearMessageTarget(event: any) {
    this.error = '';
  }

  /*---- To hide the popup model ----*/
  public hideuimageModal() {
    this.childModal.hide();
    this.enterprisename = '';
    this.clearmessage();
    this.enterpriseIconFilePath = '';
    this.imgSrc = '';
    window.localStorage.removeItem('enterprisename');
    window.localStorage.removeItem('useraccount');
    window.localStorage.removeItem('userid');
    window.localStorage.removeItem('enterpriseid');
  }
}

