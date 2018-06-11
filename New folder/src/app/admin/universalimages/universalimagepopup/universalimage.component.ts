/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/

/**
 * SingleImageComponent has the following methods:
 * ngOnInit(): This is the default method called when page is loading.
 * getEnterprisesList(): This method is used to get enterpriselist.
 * viewChildModal(updateaction, imgObj): This method is used to call selected popup.
 * imageUploaded(event): This method is used to upload the image.
 * getEnterpriseName(value): This method is used to getEnterpriseName.
 * createResource(): This method is used to create resoure.
 * updateUniversalImage(): This method is used to updateUniversalImage.
 * deleteImage(): This method is used to  deleteImage.
 * autocase(): This method is used to convert lowercase to uppercase.
 * closePopupModal(): This method is used to close the popup.
 * clearmessage(): This method is used to clear the error messages.
 */

import {
  Component, OnInit, ViewChild, Inject, Output, EventEmitter, ElementRef, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { UniversalImageservice } from './universalimage.service';
import { ToastsManager } from 'ng2-toastr';
import * as moment from 'moment/moment';
@Component({
  selector: 'app-universalimg-popup',
  templateUrl: './universalimage.html',
  providers: [UniversalImageservice]
})
export class UniversalImageComponent implements OnInit {
  token: any = '';
  storage: Storage = window.localStorage;
  toastermessage: any;
  timezoneCode: any;
  updateAt: any;
  createAt: any;
  enterprisesSize: any;
  record_id: any = '';
  enterprisesName: any;
  enterprisesNames: any = [];
  selectedObj: any;
  enterpriseid: any;
  enterprisename: any = '';
  pagename: any;
  actionName: any;
  enterpriseIconFilePath: any;
  enabled: any = true;
  ext: any = '';
  comments: any = '';
  addressLine1: any = '';
  addressLine2: any = '';
  country: any;
  state: any;
  city: any = '';
  zip: any = '';
  error: any;
  selectCountry: any;
  resourceObj: any = '';
  universalimgname: any = '';
  imagename: any;
  imgSrc: any = '';
  file: any = '';
  imageName: any = '';
  imagedesc: any = '';
  APIendpoint: any = '';
  minsize: any = 4;
  maxsize: any = 10;
  imagestatus: any = false;
  imageTypeError: any = false;
  public fullImagePath: any;
  enterpriseIcon: any;
  universalImageName: any;
  description: any;
  isEnabled: any;
  note: any;
  loginUserDateFormat: any;
  errMsg1: any;
  errMsg2: any;
  emptyimg: any;
  img_part1: any = this.translateService.get('COMMON.IMAGE_VALIDATION_PART1');
  img_part2: any = this.translateService.get('COMMON.IMAGE_VALIDATION_PART2');
  img_part3: any = this.translateService.get('COMMON.IMAGE_VALIDATION_PART3');
  @ViewChild('lgModal') public childModal: ModalDirective;
  @Output() updatedList: EventEmitter<string> = new EventEmitter();
  constructor(private el: ElementRef,
    private singleimageservices: UniversalImageservice, private router: Router,
    public toastr: ToastsManager, private translateService: TranslateService,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    @Inject('defaultCountry') private defaultCountry: string,
    @Inject('defaultState') private defaultState: string,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    @Inject('apiEndPoint') public apiEndPoint: string,
    private sanitizer: DomSanitizer) {
    this.state = defaultState;
    this.selectCountry = defaultCountry;
    this.APIendpoint = apiEndPoint;
    this.APIendpoint = this.APIendpoint + '/';
  }

  /** This is the default method called when page is loading. */
  ngOnInit() {
    this.token = window.localStorage.getItem('token');
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else {
    }
  }

  /*-- This method is used to get the Enterprise list --*/
  getEnterprisesList() {
    this.singleimageservices.getEnterprices(this.token)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesName = data['result'];
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterpriseid = this.enterprisesName[0]._id;
            this.enterprisename = this.enterprisesName[0].enterpriseName;
            this.enterpriseIcon = data['result'][0].enterpriseIcon;
            this.enterprisesSize = true;
          } else {
            this.enterprisesNames = data.result;
            this.enterprisesSize = false;
          }
        }
      });
  }

  /**-------- This method is used to open the popup -------*/
  public viewChildModal(updateaction, imgObj) {
    this.selectedObj = imgObj;
    this.actionName = updateaction;
    if (this.actionName === 'Create') {
      this.getEnterprisesList();
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_UNIVERSAL_IMAGE';
      this.getEnterprisesList();
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      const universalimg = <HTMLInputElement>document.getElementById('createuniversalimg');
      if (universalimg !== null) {
        this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
        universalimg.innerHTML = this.emptyimg.value;
      }
    } else if (this.actionName === 'Edit') {
      this.universalimgname = imgObj.universalImageFilePath;
      this.universalImageName = imgObj.universalImageName;
      this.description = imgObj.description;
      this.isEnabled = imgObj.isEnabled;
      this.note = imgObj.notes;
      this.imagename = imgObj.universalImageFileName;
      if (this.imagename[0].length > 30) {
        const imgname = this.imagename.toString();
        this.universalimgname = imgname.substring(0, 30) + '...' + this.imagename[1];
      } else {
        this.universalimgname = imgObj.universalImageFileName;
      }

      this.getEnterprisesList();
      this.imgSrc = this.APIendpoint + this.selectedObj.universalImageFilePath;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_UNIVERSAL_IMAGE';
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      const edituniversalimg = <HTMLInputElement>document.getElementById('edituniversalimg');
      if (edituniversalimg !== null) {
        edituniversalimg.innerHTML = '';
      }
    } else if (this.actionName === 'View') {
      this.universalimgname = imgObj.universalImageFilePath;
      this.imagename = imgObj.universalImageFileName;
      if (this.imagename[0].length > 30) {
        const imgname = this.imagename.toString();
        this.universalimgname = imgname.substring(0, 30) + '...' + this.imagename[1];
      } else {
        this.universalimgname = imgObj.universalImageFileName;
      }

      this.pagename = 'COMMON_PAGE_TITLES.VIEW_UNIVERSAL_IMAGE';
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
    } else if (this.actionName === 'Delete') {
      this.universalimgname = imgObj.universalImageFilePath;
      this.imagename = imgObj.universalImageFileName;
      if (this.imagename[0].length > 30) {
        const imgname = this.imagename.toString();
        this.universalimgname = imgname.substring(0, 30) + '...' + this.imagename[1];
      } else {
        this.universalimgname = imgObj.universalImageFileName;
      }

      this.pagename = 'COMMON_PAGE_TITLES.DELETE_UNIVERSAL_IMAGE';
      this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
      this.timezoneCode = this.timezoneCode.split('-');
      this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
      this.updateAt = moment(this.selectedObj.updatedAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.createAt = moment(this.selectedObj.createdAt).format(this.loginUserDateFormat + ' HH:mm:ss') + ' ' + this.timezoneCode[0];
      this.enterpriseIcon = this.selectedObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = this.selectedObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
    }
    this.childModal.show();
  }

  /**------- This method is called when Enterprises name changes in drop down box------*/
  getEnterpriseName(value) {
    this.enterprisesName = value.split('~');
    this.enterpriseid = this.enterprisesName[0];
    this.enterprisename = this.enterprisesName[1];
    this.enterpriseIconFilePath = this.enterprisesName[2] + '/' + this.enterprisesName[3];
    if (this.enterpriseid === '') {
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
    }
  }

  /**----- This method is used to focus on view and delete button ----*/
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.actionName === 'View') {
      if (key === 13) {
        this.childModal.hide();
      }
    }
    if (this.actionName === 'Delete') {
      if (key === 13) {
        this.deleteImage();
      }
    }
  }

  /*-- Used to create Enterprise Resource record --*/
  public createResource() {
    if (this.enterprisename === '' || this.enterprisename === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.imageName.trim().replace(/\s\s+/g, ' ') === '' || this.imageName.trim().replace(/\s\s+/g, ' ') === undefined) {
      this.error = 'UNIVERSAL_IMAGES.VALID_NOBLANK_UNIVERSAL_IMAGE_NAME';
    } else if (this.imagedesc.trim() === '' || this.imagedesc.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.file === '' || this.file === undefined) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_NOBLANK_IMAGE';
    } else if (this.file.type === '' || this.file.type === undefined) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.file !== '' && this.file.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.file !== '' && this.imagestatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else {
      let comments = '';
      if (this.comments === '' || this.comments === undefined) {
        this.comments = null;
        comments = this.comments;
        this.comments = '';
      } else {
        comments = this.comments.trim().replace(/\s\s+/g, ' ');
      }
      if (this.record_id === '') {
        this.resourceObj = {
          'enterprise': {
            'enterpriseId': parseInt(this.enterpriseid, 0), 'enterpriseName': this.enterprisename
          }, 'universalImageName': this.autocase(this.imageName.trim().replace(/\s\s+/g, ' ')),
          'description': this.imagedesc.trim().replace(/\s\s+/g, ' '),
          'notes': comments,
          'isEnabled': this.enabled
        };
        /*-- Calling Insertion Service*/
        this.singleimageservices.createUniversalImage(this.token, this.resourceObj, this.file).subscribe(
          data => {
            if (data['statusCode'] === '1011') {
              this.updatedList.emit('submit');
              this.hideuimageModal();
              this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
              this.toastr.success(this.toastermessage.value);
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
                }
                if (statuscode === '2033') {
                  this.error = 'COMMON_STATUS_CODES.' + statuscode;
                } break;
            }
          }
        );

      } else if (this.record_id !== '' || this.record_id !== undefined) {
      }
    }
  }

  /* --------This method is used to Update Universal image -------*/
  updateUniversalImage() {
    if (this.universalImageName.trim() === '' || this.universalImageName.trim() === undefined) {
      this.error = 'UNIVERSAL_IMAGES.VALID_NOBLANK_UNIVERSAL_IMAGE_NAME';
    } else if (this.description.trim() === ''
      || this.description.trim() === undefined) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else {
      if (this.file !== '' && this.file.type === '') {
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      } else if (this.file !== '' && this.file.type !== '' && this.imageTypeError === true) {
        this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
      } else if (this.file !== '' && this.imagestatus === false) {
        this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
        this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
        this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
      } else {
        this.error = '';
        let comments = '';
        if (this.note === null) {
          comments = this.note;
        } else {
          comments = this.note.trim().replace(/\s\s+/g, ' ');
        }
        this.resourceObj = {
          '_id': this.selectedObj._id,
          'enterprise': {
            'enterpriseId': parseInt(this.selectedObj.enterprise.enterpriseId._id, 0),
            'enterpriseName': this.selectedObj.enterprise.enterpriseName
          }, 'universalImageName': this.autocase(this.universalImageName.trim().replace(/\s\s+/g, ' ')),
          'description': this.description.trim().replace(/\s\s+/g, ' '),
          'universalImageFilePath': this.selectedObj.universalImageFilePath,
          'notes': comments,
          'isEnabled': this.isEnabled
        };
        this.singleimageservices.updateUniversalImage(this.token, this.resourceObj, this.file)
          .subscribe(
          response => {
            if (response['statusCode'] === '1014') {
              this.closePopupModal();
              this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
              this.toastr.success(this.toastermessage.value);
              if (window.localStorage.getItem('universalimagesadvance')) {
                this.updatedList.emit('submit');
              } else if (window.localStorage.getItem('simplesearch') === 'search') {
                window.localStorage.setItem('simplesearch1', 'search1');
              } else {
                window.localStorage.setItem('universalimagesadvance1', 'advance');
              }
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
                } if (statuscode === '2033') {
                  this.error = 'COMMON_STATUS_CODES.' + statuscode;
                } break;
            }
            this.updatedList.emit('submit');
          });
      }
    }
  }

  /*-- Used to Delete the Enterprise Universal Image --*/
  deleteImage() {
    this.singleimageservices.deleteUniversalImage(this.token, this.selectedObj._id).subscribe(
      data => {
        if (data['statusCode'] === '1013') {
          this.childModal.hide();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
          this.toastr.success(this.toastermessage.value);
          if (window.localStorage.getItem('universalimagesadvance')) {
            this.updatedList.emit('submit');
          } else if (window.localStorage.getItem('simplesearch') === 'search') {
            window.localStorage.setItem('simplesearch1', 'search1');
          } else {
            window.localStorage.setItem('universalimagesadvance1', 'advance');
          }
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

  /*---- To method is used to upload the image ----*/
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
      const createuniversalimg = <HTMLInputElement>document.getElementById('createuniversalimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      createuniversalimg.innerHTML = img;
    } else if (this.actionName === 'Edit') {
      const edituniversalimg = <HTMLInputElement>document.getElementById('edituniversalimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      edituniversalimg.innerHTML = img;
    }
  }


  /*---- Close childModal popup ----*/
  closePopupModal() {
    this.enterpriseIconFilePath = '';
    this.error = '';
    this.imgSrc = '';
    this.file = '';
    this.updatedList.emit('submit');
    this.childModal.hide();
  }

  /**---- This method is used to clear the error message-- */
  clearmessage() {
    this.error = '';
  }

  /** ------  This method is used to hide the popup's ---------*/
  public hideuimageModal() {
    this.enterpriseIconFilePath = '';
    this.enterprisename = '';
    this.imgSrc = '';
    this.file = '';
    this.imageName = '';
    this.imagedesc = '';
    this.comments = '';
    this.error = '';
    this.childModal.hide();
  }

  /** This method is used to remove spaces and convert lowercase to uppercase */
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }
}

export class Address {
  public addressline1: any;
  public addressline2: any;
  public state = '';
  public city: string;
  public country: string;
  public zip: string;
}

