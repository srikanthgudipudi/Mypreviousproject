import { Component } from '@angular/core';
import { SocialService } from './social.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: 'social.component.html',
  providers: [SocialService]
})
export class SocialComponent {
  errors = '';
  errors1 = '';
  socialfield: SocialFieldDetails = new SocialFieldDetails();
  sociallogin: SocialLoginDetails = new SocialLoginDetails();
  errorMessage: string;
  constructor(private socialService: SocialService, private router: Router) { }
  /* ----- Form Validation for Social Fields ----- */
  addSocialFields() {
    const fnRadio1 = <HTMLInputElement>document.getElementById('fn-radio1');
    const fnRadio_1 = fnRadio1.checked;
    const fnRadio2 = <HTMLInputElement>document.getElementById('fn-radio2');
    const fnRadio_2 = fnRadio2.checked;
    const lnRadio1 = <HTMLInputElement>document.getElementById('ln-radio1');
    const lnRadio_1 = lnRadio1.checked;
    const lnRadio2 = <HTMLInputElement>document.getElementById('ln-radio2');
    const lnRadio_2 = lnRadio2.checked;
    const ppRadio1 = <HTMLInputElement>document.getElementById('pp-radio1');
    const ppRadio_1 = ppRadio1.checked;
    const ppRadio2 = <HTMLInputElement>document.getElementById('pp-radio2');
    const ppRadio_2 = ppRadio2.checked;
    const elRadio1 = <HTMLInputElement>document.getElementById('el-radio1');
    const elRadio_1 = elRadio1.checked;
    const elRadio2 = <HTMLInputElement>document.getElementById('el-radio2');
    const elRadio_2 = elRadio2.checked;
    if (fnRadio_1 === false && fnRadio_2 === false) {
      this.errors = 'Enable/Disable First Name';
    } else if (lnRadio_1 === false && lnRadio_2 === false) {
      this.errors = 'Enable/Disable Last Name';
    } else if (ppRadio_1 === false && ppRadio_2 === false) {
      this.errors = 'Enable/Disable Profile Picture';
    } else if (elRadio_1 === false && elRadio_2 === false) {
      this.errors = 'Enable/Disable Email';
    } else if ((fnRadio_1 === true || fnRadio_2 === true) && (lnRadio_1 === true || lnRadio_2 === true) &&
      (ppRadio_1 === true || ppRadio_2 === true) && (elRadio_1 === true || elRadio_2 === true)) {
      this.socialService.saveSocialFields(fnRadio_1, fnRadio_2, lnRadio_1, lnRadio_2,
        ppRadio_1, ppRadio_2, elRadio_1, elRadio_2).subscribe(
        data => { this.socialfield = data; },
        error => this.errorMessage = <any>error);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.errors = 'Social Fields settings not saved';
    }
  }
  /* ----- Form Validation for Social Login Providers ----- */
  addSocialLogin() {
    const fnRadio1 = <HTMLInputElement>document.getElementById('fb1');
    const fnRadio_1 = fnRadio1.checked;
    const fnRadio2 = <HTMLInputElement>document.getElementById('fb2');
    const fnRadio_2 = fnRadio2.checked;
    const lnRadio1 = <HTMLInputElement>document.getElementById('tw1');
    const lnRadio_1 = lnRadio1.checked;
    const lnRadio2 = <HTMLInputElement>document.getElementById('tw2');
    const lnRadio_2 = lnRadio2.checked;
    const ppRadio1 = <HTMLInputElement>document.getElementById('goog1');
    const ppRadio_1 = ppRadio1.checked;
    const ppRadio2 = <HTMLInputElement>document.getElementById('goog2');
    const ppRadio_2 = ppRadio2.checked;
    const elRadio1 = <HTMLInputElement>document.getElementById('li1');
    const elRadio_1 = elRadio1.checked;
    const elRadio2 = <HTMLInputElement>document.getElementById('li2');
    const elRadio_2 = elRadio2.checked;
    if (fnRadio_1 === false && fnRadio_2 === false) {
      this.errors1 = 'Enable/Disable Facebook';
    } else if (lnRadio_1 === false && lnRadio_2 === false) {
      this.errors1 = 'Enable/Disable Twitter';
    } else if (ppRadio_1 === false && ppRadio_2 === false) {
      this.errors1 = 'Enable/Disable Google';
    } else if (elRadio_1 === false && elRadio_2 === false) {
      this.errors1 = 'Enable/Disable LinkedIn';
    } else if ((fnRadio_1 === true || fnRadio_2 === true) && (lnRadio_1 === true || lnRadio_2 === true) &&
      (ppRadio_1 === true || ppRadio_2 === true) && (elRadio_1 === true || elRadio_2 === true)) {
      this.socialService.saveSocialLogin(fnRadio_1, fnRadio_2, lnRadio_1, lnRadio_2,
        ppRadio_1, ppRadio_2, elRadio_1, elRadio_2).subscribe(
        data => { this.sociallogin = data; },
        error => this.errorMessage = <any>error);
      this.router.navigateByUrl('/dashboard');
    } else {
      this.errors1 = 'Social Login settings not saved';
    }
  }
  /* ----- To clear validation message ----- */
  clearmessage() {
    this.errors = '';
    this.errors1 = '';
  }
  /* ----- To reset Social Fields ----- */
  resetSocilaFields() {
    const resetForm = <HTMLFormElement>document.getElementById('Social_fields_form');
    resetForm.reset();
  }
  /* ----- To reset Social Login Providers ----- */
  resetSocilaProviders() {
    const resetForm = <HTMLFormElement>document.getElementById('Social_provider_form');
    resetForm.reset();
  }
}
export class SocialFieldDetails {
  public firstname: string;
  public lastname: string;
  public profilepic: string;
  public email: string;
}
export class SocialLoginDetails {
  public facebook: string;
  public twitter: string;
  public google: string;
  public linkedin: string;
}
