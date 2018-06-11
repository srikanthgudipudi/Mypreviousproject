/**
Application Name = Indoor Navigation
Version = 1.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 **/
/**
 * ngOnInit(): This is the default method called when page is loading.

 * clearmessage(): This method is used to clear the error messages.
 * extractData(res: Response): This method is used to extract json data.
 * handleError(error: Response | any): This method is used to handle error.
 */
import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastsManager } from 'ng2-toastr';
@Component({
  selector: 'app-logoheader',
  templateUrl: './pop-headerlayout.html',
})
export class LogoheaderComponent implements OnInit {
  @ViewChild('lgModal') public childModal: ModalDirective;
  token: any = window.localStorage.getItem('token');
  storage: Storage = window.localStorage;
  toastermessage: any;

  constructor(private el: ElementRef,
    private router: Router,
    public toastr: ToastsManager, private translateService: TranslateService,
    private sanitizer: DomSanitizer,
    @Inject('apiEndPoint') public apiEndPoint: string,
    @Inject('defaultCountry') private defaultCountry: string) {
  }
  ngOnInit() {
    if (this.token === undefined || this.token === null || this.token === '') {
      this.router.navigate(['']);
    } else {
    }
  }

}

