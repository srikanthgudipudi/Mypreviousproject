import { Component, OnInit } from '@angular/core';
import { GeneralService } from './general.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: 'general.component.html',
  providers: [GeneralService]
})
export class GeneralComponent implements OnInit {
  file: File;
  errors = '';
  general: GeneralDetails = new GeneralDetails();
  generalPojo: GeneralPojo = new GeneralPojo();
  errorMessage: string;
  imgSizeErr = '';
  fileType: any = {};
  profileType: any = [];
  logoType: any = {};
  selelogoType: any = [];
  avatarType: any = {};
  seleavatarType: any = [];
  categoryType: any = {};
  selecategoryType: any = [];
  charCode: any;
  constructor(private generalService: GeneralService, private router: Router) { }
  ngOnInit() {
    this.getGeneralblockdetails();
  }
  /* ----- Image Upload ----- */
  imageUploaded(event) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    const target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    const files: FileList = target.files;
    if (files.length > 0) {
      this.file = files[0];
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
    if (4 >= size || size >= 10 || bytes !== 'KB') {
      this.errors = 'Image size shuld be greater than 4 kb and less than 10 kb';
      this.imgSizeErr = this.errors;
    } else {
      this.imgSizeErr = '';
    }
  }
  /* ----- Save General Settings ----- */
  addImage() {
    const image = <HTMLInputElement>document.getElementById('file-input');
    const image1 = image.value;
    const desc = <HTMLInputElement>document.getElementById('textarea-input');
    const desc1 = desc.value;
    const minsize = <HTMLInputElement>document.getElementById('minsize');
    const minsize1 = minsize.value;
    const maxsize = <HTMLInputElement>document.getElementById('maxsize');
    const maxsize1 = maxsize.value;
    const avatarminsize = <HTMLInputElement>document.getElementById('avatarminsize');
    const avatarminsize1 = avatarminsize.value;
    const avatarmaxsize = <HTMLInputElement>document.getElementById('avatarmaxsize');
    const avatarmaxsize1 = avatarmaxsize.value;
    const categoryminsize = <HTMLInputElement>document.getElementById('categoryminsize');
    const categoryminsize1 = categoryminsize.value;
    const categorymaxsize = <HTMLInputElement>document.getElementById('categorymaxsize');
    const categorymaxsize1 = categorymaxsize.value;
    if (this.imgSizeErr !== '') {
      this.errors = 'Image size shuld be greater than 4 kb and less than 10 kb  ';
    } else if (desc1.trim() === undefined || desc1.trim() === '' || desc1.trim() === null) {
      this.errors = 'Description can not be blank';
    } else if (avatarminsize1.trim() === undefined || avatarminsize1.trim() === '' || avatarminsize1.trim() === null) {
      this.errors = 'Avatar Minsize can not be blank';
    } else if (Number(avatarminsize1) === Number('0')) {
      this.errors = 'Avatar Minimum size must be greater than zero';
    } else if (avatarmaxsize1.trim() === undefined || avatarmaxsize1.trim() === '' || avatarmaxsize1.trim() === null) {
      this.errors = 'Avatar Maxsize can not be blank';
    } else if (Number(avatarmaxsize1) === Number('0')) {
      this.errors = 'Avatar Maximum size must be greater than zero';
    } else if (Number(avatarminsize1) > Number(avatarmaxsize1)) {
      this.errors = 'Avatar Minimum size must be lesser than Avatar Maximum size';
    } else if (this.generalPojo.avatarFileTypes.jpgType !== true && this.generalPojo.avatarFileTypes.pngType !== true &&
      this.generalPojo.avatarFileTypes.gifType !== true && this.generalPojo.avatarFileTypes.bmpType !== true) {
      this.errors = 'Please select File types for Avatar picture';
    } else if (categoryminsize1.trim() === undefined || categoryminsize1.trim() === '' || categoryminsize1.trim() === null) {
      this.errors = 'Category Minsize can not be blank';
    } else if (Number(categoryminsize1) === Number('0')) {
      this.errors = 'Category Minimum size must be greater than zero';
    } else if (categorymaxsize1.trim() === undefined || categorymaxsize1.trim() === '' || categorymaxsize1.trim() === null) {
      this.errors = 'Category Maxsize can not be blank';
    } else if (Number(categorymaxsize1) === Number('0')) {
      this.errors = 'Category Maximum size must be greater than zero';
    } else if (Number(categoryminsize1) > Number(categorymaxsize1)) {
      this.errors = 'Category Minimum size must be lesser than Category Maximum size';
    } else if (this.generalPojo.categoryFileTypes.jpgType !== true && this.generalPojo.categoryFileTypes.pngType !== true &&
      this.generalPojo.categoryFileTypes.gifType !== true && this.generalPojo.categoryFileTypes.bmpType !== true) {
      this.errors = 'Please select File types for Category picture';
    } else if (minsize1.trim() === undefined || minsize1.trim() === '' || minsize1.trim() === null) {
      this.errors = 'Profile Minsize can not be blank';
    } else if (Number(minsize1) === Number('0')) {
      this.errors = 'Profile Minimum size must be greater than zero';
    } else if (maxsize1.trim() === undefined || maxsize1.trim() === '' || maxsize1.trim() === null) {
      this.errors = 'Profile Maxsize can not be blank';
    } else if (Number(maxsize1) === Number('0')) {
      this.errors = 'Profile Maximum size must be greater than zero';
    } else if (Number(minsize1) > Number(maxsize1)) {
      this.errors = 'Profile Picture Minimum size must be lesser than Profile Picture Maximum size';
    } else if (this.generalPojo.profilePicFileTypes.jpgType !== true && this.generalPojo.profilePicFileTypes.pngType !== true &&
      this.generalPojo.profilePicFileTypes.gifType !== true && this.generalPojo.profilePicFileTypes.bmpType !== true) {
      this.errors = 'Please select File types for Profile picture';
    } else if ((desc1.trim() !== undefined && desc1.trim() !== '' && desc1.trim() !== null) &&
      (avatarminsize1.trim() !== undefined && avatarminsize1.trim() !== '' && avatarminsize1.trim() !== null) &&
      (avatarmaxsize1.trim() !== undefined && avatarmaxsize1.trim() !== '' && avatarmaxsize1.trim() !== null) &&
      (this.generalPojo.avatarFileTypes.jpgType === true || this.generalPojo.avatarFileTypes.pngType === true ||
        this.generalPojo.avatarFileTypes.gifType === true || this.generalPojo.avatarFileTypes.bmpType === true) &&
      (categoryminsize1.trim() !== undefined && categoryminsize1.trim() !== '' && categoryminsize1.trim() !== null) &&
      (categorymaxsize1.trim() !== undefined && categorymaxsize1.trim() !== '' && categorymaxsize1.trim() !== null) &&
      (this.generalPojo.categoryFileTypes.jpgType === true || this.generalPojo.categoryFileTypes.pngType === true ||
        this.generalPojo.categoryFileTypes.gifType === true || this.generalPojo.categoryFileTypes.bmpType === true) &&
      (minsize1.trim() !== undefined && minsize1.trim() !== '' && minsize1.trim() !== null) &&
      (maxsize1.trim() !== undefined && maxsize1.trim() !== '' && maxsize1.trim() !== null) &&
      (this.generalPojo.profilePicFileTypes.jpgType === true || this.generalPojo.profilePicFileTypes.pngType === true ||
        this.generalPojo.profilePicFileTypes.gifType === true || this.generalPojo.profilePicFileTypes.bmpType === true)) {
      if (this.generalPojo.profilePicFileTypes.jpgType === true) {
      this.profileType.push('"jpgType": true');
    } if (this.generalPojo.profilePicFileTypes.pngType === true) {
      this.profileType.push('"pngType": true');
    } if (this.generalPojo.profilePicFileTypes.gifType === true) {
      this.profileType.push('"gifType": true');
    } if (this.generalPojo.profilePicFileTypes.bmpType === true) {
      this.profileType.push('"bmpType": true');
    }
    /*if (this.logoType.jpgType === true)
      this.selelogoType.push('JPG/JPEG');
    if (this.logoType.pngType === true)
      this.selelogoType.push('PNG');
    if (this.logoType.gifType === true)
      this.selelogoType.push('GIF');
    if (this.logoType.bmpType === true)
      this.selelogoType.push('BMP');*/
    if (this.generalPojo.avatarFileTypes.jpgType === true) {
      this.seleavatarType.push('"jpgType": true');
    } if (this.generalPojo.avatarFileTypes.pngType === true) {
      this.seleavatarType.push('"pngType": true');
    } if (this.generalPojo.avatarFileTypes.gifType === true) {
      this.seleavatarType.push('"gifType": true');
    } if (this.generalPojo.avatarFileTypes.bmpType === true) {
      this.seleavatarType.push('"bmpType": true');
    }
    if (this.generalPojo.categoryFileTypes.jpgType === true) {
      this.selecategoryType.push('"jpgType": true');
    } if (this.generalPojo.categoryFileTypes.pngType === true) {
      this.selecategoryType.push('"pngType": true');
    } if (this.generalPojo.categoryFileTypes.gifType === true) {
      this.selecategoryType.push('"gifType": true');
    } if (this.generalPojo.categoryFileTypes.bmpType === true) {
      this.selecategoryType.push('"bmpType": true');
    }
        this.generalService.saveImage(image1, desc1, this.file, this.profileType, maxsize1, minsize1, avatarminsize1,
        avatarmaxsize1, this.seleavatarType, categoryminsize1, categorymaxsize1, this.selecategoryType).subscribe(
        data => { this.general = data; },
        error => this.errorMessage = <any>error);
        this.router.navigateByUrl('/dashboard');
    } else {
      this.errors = 'General settings not saved';
    }
  }
  /* ----- Cancel General Settings Block ----- */
  cancel() {
    // const resetForm = <HTMLFormElement>document.getElementById('general_settings_form');
    // resetForm.reset();
    this.router.navigateByUrl('/dashboard');
  }
  /* ----- Clear Message ----- */
  clearmessage() {
    this.errors = '';
  }
  /* ---------- To Get General Block Details ---------- */
  getGeneralblockdetails() {
      this.generalService.getGeneralblockdetails().subscribe(data => {this.generalPojo = data; }
      );
  }
  /* ---------- To Disable Ctrl Key ---------- */
  isNumberKey(evt) {
    this.charCode = (evt.which) ? evt.which : event.target;
    if (evt.ctrlKey === false) {
         return true;
    } else {
         return false;
    }
  }
}
export class GeneralDetails {
  public imagename: string;
  public description: string;
}
export class GeneralPojo {
  public logoName: string;
  public logoDescription: string;
  public avatarMinSize: string;
  public avatarMaxSize: string;
  public avatarFileTypes: any = {};
  public categoryMinSize: string;
  public categoryMaxSize: string;
  public categoryFileTypes: any = {};
  public profilePicMin: string;
  public profilePicMax: string;
  public profilePicFileTypes: any = {};
}
