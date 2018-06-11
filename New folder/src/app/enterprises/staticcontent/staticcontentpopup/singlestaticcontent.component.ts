/**Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com */
/**
 * ngOnInit(): To load the user token at loading time.
 * showChildModal(selectedAction, enterpriseStaticContentObj): To show popup modal.
 * getEnterprise(): To get Enterprise List.
 * getList(type): To get fleet and parent menu list based on enterprise.
 * getFleetNameByEntId(enterpriseId): To get Fleets Details.
 * getMenuTypeList(): To get menu list.
 * getMenuListByEntId(enterpriseId): To get Menu list Details.
 * getMenuListByFleetId(fleetId): To get Menu list Details.
 * getPagesList(): To get pages list.
 * selectedParentMenuDetails(parentMenu): To get selected parent menu details.
 * electedMenuType(menuType): To get selected menu type details.
 * selectedPageDetails(page): To get selected page details.
 * openMenutype(menuType): To open selected menu type.
 * imageUploaded(event): To upload the image.
 * createEnterpriseStaticContent(): To create static content.
 * updateEnterpriseStaticContent(editObj): To update static content.
 * deleteEnterpriseStaticContent(): To delete static content.
 * autocase(text): Inint capitalization.
 * keyPress(e): Method for handle key press.
 * closePopupModal(): To close popup modal.
 * clearmessage(): To clear the messages.
*/
import {
  Component, ViewContainerRef, OnInit, AfterContentChecked,
  ViewChild, Inject, Output, EventEmitter, HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { SingleStaticContentService } from './singlestaticcontent.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-enterprisestaticcontent-popup',
  templateUrl: 'singlestaticcontent.html',
  providers: [SingleStaticContentService]
})

export class SingleStaticContentComponent implements OnInit, AfterContentChecked {
  userToken: any;
  toastermessage: any;
  actionType: any;
  pagename: any;
  enterpriseStaticContentAdd: any;
  enterpriseStaticContentAdd1: any;
  enterprisesName: any;
  enterprisesNames: any;
  enterprisesSize: any;
  error: any = '';
  entId: any = '';
  fleetNameList: any;
  fleetName: any = ' ';
  fleetId: any = 0;
  enterpriseStaticContentObj: any;
  menuTypeList: any;
  pagesList: any;
  enterpriseStaticContentData: any;
  enableDescription: any;
  enableURL: any;
  enableSubMenu: any;
  enablePage: any;
  menuList: any;
  parentMenuId: any = 0;
  parentMenuName: any = ' ';
  path: any = '';
  imagename: any;
  menuimg: any = false;
  menuType: any;
  menuName: any = '';
  menuDescription: any = '';
  enterpriseIconFilePath: any;
  url: any = '';
  page: any = '';
  subMenu: any = '';
  menuSequence: any;
  menuSequenceedit: any;
  notesedit: any;
  menuNameedit: any;
  notes: any = '';
  isEnabled: any;
  file: any = '';
  fullImagePath: any;
  imgSrc: any = '';
  APIendpoint: any = '';
  minsize: any = 4;
  maxsize: any = 10;
  createdAt: any;
  updatedAt: any;
  selectedAction: any;
  imagestatus: any = false;
  updateenterpriseStaticContentData: any;
  enterpriseIcon: any;
  imageTypeError: any = false;
  loginUserDateFormat: any;
  storage: Storage = window.localStorage;
  timezoneCode: any;
  errMsg1: any;
  errMsg2: any;
  fleetCommonName: any;
  emptyimg: any;

  private URL_PATTERN = '(?:(?:https?|ftp)://|www\\.)[-a-z0-9+&@#\\%?=~_|!:,.;]*[-a-z0-9+&@#\\%=~_|]+[\\.]{1}[a-z]{2,4}$';
  @ViewChild('infoModal') public infoModal: ModalDirective;
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  /**----- Constructor for static content component -----*/
  constructor(private singleEnterpriseStaticContentService: SingleStaticContentService,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    private router: Router, private vcr: ViewContainerRef,
    @Inject('footerPoweredByName') public footerPoweredByName: string,
    @Inject('defaultDisplaySequence') public defaultDisplaySequence: number,
    @Inject('imageMinSize') public imageMinSize: number,
    @Inject('imageMaxSize') public imageMaxSize: number,
    @Inject('apiEndPoint') public apiEndPoint: string) {
    this.APIendpoint = apiEndPoint;
    this.APIendpoint = this.APIendpoint + '/';
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*---- To load the user token at loading time ----*/
  ngOnInit() {
     this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
    this.userToken = window.localStorage.getItem('token');
  }
  ngAfterContentChecked() {
  this.fleetCommonName = window.localStorage.getItem('fleetTranslation');
  }
  /*---- To show popup modal ----*/
  public showChildModal(selectedAction, enterpriseStaticContentObj): void {
    this.selectedAction = selectedAction;
    this.enterpriseStaticContentObj = enterpriseStaticContentObj;
    this.timezoneCode = window.localStorage.getItem('loginUserTimezone');
    this.timezoneCode = this.timezoneCode.split('-');
    this.loginUserDateFormat = window.localStorage.getItem('loginUserDateFormat');
    this.createdAt = moment(this.enterpriseStaticContentObj['createdAt']).format(this.loginUserDateFormat + ' HH:mm:ss')
      + ' ' + this.timezoneCode[0];
    this.updatedAt = moment(this.enterpriseStaticContentObj['updatedAt']).format(this.loginUserDateFormat + ' HH:mm:ss')
      + ' ' + this.timezoneCode[0];
    if (selectedAction === 'VIEW') {
      this.pagename = 'COMMON_PAGE_TITLES.VIEW_STATIC_CONTENT';
      this.actionType = 'View';
      this.imgSrc = '';
      this.menuimg = enterpriseStaticContentObj.menuImageName;
      this.imagename = this.menuimg.split('.');
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.menuimg = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      this.imgSrc = this.APIendpoint + enterpriseStaticContentObj.menuImageFilePath;
      this.enterpriseIcon = enterpriseStaticContentObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = enterpriseStaticContentObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
    } else if (selectedAction === 'DELETE') {
      this.pagename = 'COMMON_PAGE_TITLES.DELETE_STATIC_CONTENT';
      this.imgSrc = '';
      this.menuimg = enterpriseStaticContentObj.menuImageName;
      this.imagename = this.menuimg.split('.');
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.menuimg = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      this.imgSrc = this.APIendpoint + enterpriseStaticContentObj.menuImageFilePath;
      this.enterpriseIcon = enterpriseStaticContentObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = enterpriseStaticContentObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.actionType = 'Delete';
    } else if (selectedAction === 'EDIT') {
      this.pagename = 'COMMON_PAGE_TITLES.EDIT_STATIC_CONTENT';
      this.enterpriseIcon = enterpriseStaticContentObj.enterprise.enterpriseId.enterpriseIcon;
      this.enterpriseIconFilePath = enterpriseStaticContentObj.enterprise.enterpriseId.enterpriseIconFilePath + '/' + this.enterpriseIcon;
      this.actionType = 'Edit';
      this.menuimg = enterpriseStaticContentObj.menuImageName;
      this.menuSequenceedit = enterpriseStaticContentObj.menuSequence;
      this.notesedit = enterpriseStaticContentObj.notes;
      this.menuNameedit = enterpriseStaticContentObj.menuName;
      this.imagename = this.menuimg.split('.');
      if (this.imagename[0].length > 20) {
        const imgname = this.imagename.toString();
        this.menuimg = imgname.substring(0, 20) + '...' + this.imagename[1];
      }
      this.imgSrc = '';
      this.getPagesList();
      this.enterpriseStaticContentAdd1 = enterpriseStaticContentObj;
      this.imgSrc = this.APIendpoint + enterpriseStaticContentObj.menuImageFilePath;
      const editstaticcontentimg = <HTMLInputElement>document.getElementById('editstaticcontentimg');
      if (editstaticcontentimg !== null) {
        editstaticcontentimg.innerHTML = '';
      }
    } else if (selectedAction === 'CREATE') {
      this.pagename = 'COMMON_PAGE_TITLES.CREATE_STATIC_CONTENT';
      this.actionType = 'Create';
      this.menuSequence = this.defaultDisplaySequence;
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.isEnabled = true;
      this.getEnterprise();
      this.getMenuTypeList();
      const createstaticcontentimg = <HTMLInputElement>document.getElementById('createstaticcontentimg');
      if (createstaticcontentimg !== null) {
        this.emptyimg = this.translateService.get('COMMON_FIELDS.NO_FILE_CHOSEN');
        createstaticcontentimg.innerHTML = this.emptyimg.value;
      }
    }
    this.infoModal.show();
  }

  /*---- To get Enterprise List ----*/
  getEnterprise() {
    this.singleEnterpriseStaticContentService.getEnterprises(this.userToken)
      .subscribe(data => {
        if (data.statusCode === '1001') {
          if (data.result.length === 1) {
            this.enterprisesNames = data['result'];
            this.entId = this.enterprisesNames[0]._id;
            this.enterpriseIconFilePath = data['result'][0].enterpriseIconFilePath + '/' + data['result'][0].enterpriseIcon;
            this.enterprisesName = this.enterprisesNames[0].enterpriseName;
            this.enterpriseIcon = this.enterprisesNames[0].enterpriseIcon;
            this.enterprisesSize = true;
            this.getFleetNameByEntId(this.entId);
            this.getMenuListByEntId(this.entId);
          } else {
            this.enterprisesNames = data['result'];
            this.enterprisesSize = false;
          }
        }
      });
  }

  /*---- To get fleet and parent menu list based on enterprise ----*/
  getList(type) {
    if (type === undefined || type === 'undefined') {
      this.entId = -1;
      this.enterprisesName = undefined;
      this.enterpriseIconFilePath = '';
      this.fleetId = 0;
      this.fleetName = ' ';
      this.parentMenuId = 0;
      this.parentMenuName = ' ';
      this.enterpriseIcon = '';
      this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
      this.path = '';
      this.getFleetNameByEntId(this.entId);
      this.getMenuListByEntId(this.entId);
    } else {
      const value = type.split('$');
      this.entId = value[0];
      this.enterprisesName = value[1];
      this.enterpriseIcon = value[3];
      this.enterpriseIconFilePath = value[2] + '/' + this.enterpriseIcon;
      this.getFleetNameByEntId(this.entId);
      this.getMenuListByEntId(this.entId);
    }
  }

  /* ----- To get Fleets Details ------ */
  getFleetNameByEntId(enterpriseId) {
    this.singleEnterpriseStaticContentService.getFleetNameByEntId(this.userToken, this.entId)
      .subscribe(
      data => {
        this.fleetNameList = data['result'];
      },
      error => {
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

  /*---- To get menu list   ---*/
  getMenuTypeList() {
    this.singleEnterpriseStaticContentService.getLookupsList(this.userToken, 'MENU_TYPES')
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.menuTypeList = data['result'];
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
            } break;
        }
      });
  }

  /* ----- To get Menu list Details ------ */
  getMenuListByEntId(enterpriseId) {
    this.singleEnterpriseStaticContentService.getMenuListByEntId(this.userToken, this.entId)
      .subscribe(
      data => {
        this.menuList = data['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } else if (statuscode === '1300') {
              this.menuList = [];
            } break;
        }
      });
  }

  /* ----- To get Menu list Details ------ */
  getMenuListByFleetId(fleetId) {
    if (fleetId !== 'undefined') {
      const fleet = fleetId.split('$');
      this.fleetId = fleet[0];
      this.fleetName = fleet[1];
      this.singleEnterpriseStaticContentService.getMenuListByFleetId(this.userToken, this.entId, this.fleetId)
        .subscribe(
        data => {
          this.menuList = data['result'];
        },
        error => {
          const status = JSON.parse(error['status']);
          const statuscode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 500:
              break;
            case 400:
              if (statuscode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } else if (statuscode === '9997') {
                this.menuList = [];
              } break;
          }
        });
    } else {
      this.fleetId = 0;
      this.fleetName = ' ';
      this.getMenuListByEntId(this.entId);
    }
  }

  /*---- To get pages list ----*/
  getPagesList() {
    this.singleEnterpriseStaticContentService.getLookupsList(this.userToken, 'PAGE_NAMES')
      .subscribe(data => {
        if (data.statusCode === '1001') {
          this.pagesList = data['result'];
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
            } break;
        }
      });
  }

  /*---- To get selected parent menu details ----*/
  selectedParentMenuDetails(parentMenu) {
    const menu = parentMenu.split('$');
    this.parentMenuId = menu[0];
    this.parentMenuName = menu[1];
    this.path = menu[2];
  }

  /*---- To get selected menu type details ----*/
  selectedMenuType(menuType) {
    this.menuType = menuType;
  }

  /*---- To get selected page details ----*/
  selectedPageDetails(page) {
    this.page = page;
  }

  /*---- To open selected menu type ----*/
  openMenutype(menuType) {
    if (menuType !== 'undefined') {
      this.menuDescription = '';
      this.url = '';
      this.page = '';
      this.parentMenuId = 0;
      this.parentMenuName = '';
      this.path = '';
      if (menuType === 'Text') {
        this.enableSubMenu = false;
        this.enableDescription = true;
        this.enablePage = false;
        this.enableURL = false;
      } else if (menuType === 'Page') {
        this.getPagesList();
        this.enableSubMenu = false;
        this.enableDescription = false;
        this.enablePage = true;
        this.enableURL = false;
      } else if (menuType === 'Sub Menu') {
        this.enableSubMenu = true;
        this.enableDescription = false;
        this.enablePage = false;
        this.enableURL = false;
      } else if (menuType === 'URL') {
        this.enableSubMenu = false;
        this.enableDescription = false;
        this.enablePage = false;
        this.enableURL = true;
      }
    } else {
      this.enableSubMenu = false;
      this.enableDescription = false;
      this.enablePage = false;
      this.enableURL = false;
    }
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
    if (this.selectedAction === 'CREATE') {
      const createstaticcontentimg = <HTMLInputElement>document.getElementById('createstaticcontentimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      createstaticcontentimg.innerHTML = img;
    } else if (this.selectedAction === 'EDIT') {
      const editstaticcontentimg = <HTMLInputElement>document.getElementById('editstaticcontentimg');
      let img = this.file.name;
      if (img !== null && img !== undefined && img !== '') {
        if (this.file.name.length > 10) {
          img = img.substring(0, 10) + '..' + this.file.name.split('.')[1];
        }
      }
      editstaticcontentimg.innerHTML = img;
    }
  }

  /*---- To create static content ----*/
  createEnterpriseStaticContent() {
    if (this.enterprisesName === '' || this.enterprisesName === undefined || this.enterprisesName === null) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_ENTERPRISE';
    } else if (this.menuName.trim().replace(/\s\s+/g, ' ') === undefined || this.menuName.trim().replace(/\s\s+/g, ' ') === ''
      || this.menuName.trim().replace(/\s\s+/g, ' ') === null) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_MENU_NAME';
    } else if (this.menuType === undefined || this.menuType === '' || this.menuType === null || this.menuType === 'undefined') {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_MENU_TYPE';
    } else if (this.menuType === 'Page' &&
      (this.page === undefined || this.page === '' || this.page === null || this.page === 'undefined')) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_PAGE';
    } else if (this.menuType === 'Text' && (this.menuDescription.trim() === undefined
      || this.menuDescription.trim() === '' || this.menuDescription.trim() === null)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (this.menuType === 'URL' && (this.url === undefined || this.url === '' || this.url === null)) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_URL';
    } else if (this.menuType === 'URL' && (!this.url.match(this.URL_PATTERN))) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_INCORRECT_URL_FORMAT';
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
    } else if (this.error === '') {
      if (this.menuSequence === undefined || this.menuSequence === '') {
        this.menuSequence = this.defaultDisplaySequence;
      }
      this.enterpriseStaticContentData = {
        'enterprise': { 'enterpriseId': this.entId, 'enterpriseName': this.enterprisesName },
        'fleet': { 'fleetId': this.fleetId, 'fleetName': this.fleetName },
        'parentMenu': { 'parentMenuId': this.parentMenuId, 'parentMenuName': this.parentMenuName },
        'path': this.path,
        'menuType': this.menuType,
        'menuName': this.autocase(this.menuName.trim().replace(/\s\s+/g, ' ')),
        'menuDescription': this.menuDescription.trim().replace(/\s\s+/g, ' '),
        'url': this.url,
        'page': this.page,
        'subMenu': this.autocase(this.subMenu.trim().replace(/\s\s+/g, ' ')),
        'menuSequence': this.menuSequence,
        'notes': this.notes.trim().replace(/\s\s+/g, ' '),
        'isEnabled': this.isEnabled,
      };
      this.singleEnterpriseStaticContentService.createEnterpriseStaticContent(this.enterpriseStaticContentData, this.userToken, this.file)
        .subscribe(data => {
          if (data.statusCode === '1011') {
            this.closePopupModal();
            this.deleted.emit('submit');
            this.clearmessage();
            this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_CREATE_SUCCESS');
            this.toastr.success(this.toastermessage.value);
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
              } else if (statuscode === '2033') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_DUPLICATE_RECORD';
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
    }
  }

  /*---- To update static content ----*/
  updateEnterpriseStaticContent(editObj) {
    if (this.menuNameedit.trim().replace(/\s\s+/g, ' ') === undefined
      || this.menuNameedit.trim().replace(/\s\s+/g, ' ') === '' || this.menuNameedit.trim().replace(/\s\s+/g, ' ') === null) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_MENU_NAME';
    } else if (editObj.menuType === 'Page' && (editObj.page === undefined || editObj.page === '' || editObj.page === null)) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_PAGE';
    } else if (editObj.menuType === 'Text' && (editObj.menuDescription.trim() === undefined
      || editObj.menuDescription.trim() === '' || editObj.menuDescription.trim() === null)) {
      this.error = 'COMMON_VALIDATION_MESSAGES.VALID_NOBLANK_DESCRIPTION';
    } else if (editObj.menuType === 'URL' && (editObj.url === undefined || editObj.url === '' || editObj.url === null)) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_NOBLANK_URL';
    } else if (this.menuType === 'URL' && (!this.url.match(this.URL_PATTERN))) {
      this.error = 'ENTERPRISE_STATIC_CONTENT.VALID_INCORRECT_URL_FORMAT';
    } else if (this.file !== '' && this.file.type === '') {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.file !== '' && this.file.type !== '' && this.imageTypeError === true) {
      this.error = 'COMMON_RECORD_ICON_BLOCK.VALID_IMAGE_FILENAME';
    } else if (this.file !== '' && this.imagestatus === false) {
      this.errMsg1 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART1');
      this.errMsg2 = this.translateService.get('COMMON_RECORD_ICON_BLOCK.ICON_SIZE_VALIDATION_PART2');
      this.error = this.errMsg1.value + ' ' + this.imageMinSize + ' & ' + this.imageMaxSize + ' ' + this.errMsg2.value;
    } else if (this.error === '') {
      if (this.menuSequenceedit === undefined || this.menuSequenceedit === '') {
        editObj.menuSequence = this.defaultDisplaySequence;
      } else {
        editObj.menuSequence = this.menuSequenceedit;
      }
      this.updateenterpriseStaticContentData = {
        'enterprise': { 'enterpriseId': editObj.enterprise.enterpriseId, 'enterpriseName': editObj.enterprise.enterpriseName },
        'fleet': { 'fleetId': editObj.fleet.fleetId, 'fleetName': editObj.fleet.fleetName },
        'parentMenu': { 'parentMenuId': editObj.parentMenu.parentMenuId, 'parentMenuName': editObj.parentMenu.parentMenuName },
        '_id': this.enterpriseStaticContentObj._id,
        'path': editObj.path,
        'parentPath': editObj.parentPath,
        'menuType': editObj.menuType,
        'menuName': this.autocase(this.menuNameedit.trim().replace(/\s\s+/g, ' ')),
        'menuDescription': editObj.menuDescription.trim().replace(/\s\s+/g, ' '),
        'url': editObj.url,
        'page': editObj.page,
        'subMenu': this.autocase(editObj.subMenu.trim().replace(/\s\s+/g, ' ')),
        'menuSequence': editObj.menuSequence,
        'notes': this.notesedit.trim().replace(/\s\s+/g, ' '),
        'isEnabled': editObj.isEnabled,
        'menuImageName': editObj.menuImageName,
        'menuImageFilePath': editObj.menuImageFilePath
      };
      this.singleEnterpriseStaticContentService.updateEnterpriseStaticContent(editObj._id,
        this.updateenterpriseStaticContentData, this.userToken, this.file)
        .subscribe(data => {
          this.closePopupModal();
          this.deleted.emit('submit');
          this.clearmessage();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_EDIT_SUCCESS');
          this.toastr.success(this.toastermessage.value);
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
              } else if (statuscode === '2033') {
                this.error = 'COMMON_VALIDATION_MESSAGES.VALID_DUPLICATE_RECORD';
              } else if (statuscode === '9998') {
                this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
                this.toastr.success(this.toastermessage.value);
              }
              break;
          }
        });
    }
  }

  /*---- To delete static content ----*/
  deleteEnterpriseStaticContent() {
    this.singleEnterpriseStaticContentService.deleteEnterpriseStaticContent(this.enterpriseStaticContentObj._id, this.userToken)
      .subscribe(
      data => {
        if (data['statusCode'] === '1013') {
          this.deleted.emit('submit');
          this.infoModal.hide();
          this.toastermessage = this.translateService.get('COMMON_TOAST_MESSAGES.TOAST_DELETE_SUCCESS');
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
            } else if (statuscode === '9998') {
              this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
              this.toastr.success(this.toastermessage.value);
            } else if (statuscode === '2013') {
              this.error = 'COMMON_STATUS_CODES.' + statuscode;
            }
            break;
        }
      });
  }

  /* ------- Inint capitalization ---*/
  autocase(text) {
    if (text) {
      return text.replace(/(&)?([a-z])([a-z]{0,})(;)?/ig, function (all, prefix, letter, word, suffix) {
        if (prefix && suffix) { return all; }
        return letter.toUpperCase() + word.toLowerCase();
      });
    } else { return ''; }
  }

  /**---- Method for handle key press ----*/
  @HostListener('keypress', ['$event'])
  keyPress(e) {
    const key = e.keyCode;
    if (this.selectedAction === 'VIEW') {
      if (key === 13) {
        this.infoModal.hide();
      }
    }
    if (this.selectedAction === 'DELETE') {
      if (key === 13) {
        this.deleteEnterpriseStaticContent();
      }
    }
  }

  /*---- To close popup modal ----*/
  closePopupModal() {
    this.enterpriseIconFilePath = '';
    this.enterprisesName = '';
    this.fleetNameList = [];
    this.path = '';
    this.menuType = '';
    this.menuName = '';
    this.menuList = [];
    this.menuTypeList = [];
    this.menuDescription = '';
    this.url = '';
    this.page = '';
    this.subMenu = '';
    this.menuSequence = '';
    this.notes = '';
    this.enableSubMenu = false;
    this.enableDescription = false;
    this.enablePage = false;
    this.enableURL = false;
    this.file = '';
    this.imgSrc = '';
    this.error = '';
    this.infoModal.hide();
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

}
