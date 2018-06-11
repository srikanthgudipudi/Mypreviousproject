/**Application Name = Indoor Navigation
Version = 2.0
Release Date = September 06, 2017
Copyright = ©2017 SRISYS Inc
Developed by = Srisys Inc, 7908 Cincinnati Dayton Rd, Suite C, West Chester,
OH 45069 USA web: www.srisys.com
 */

/*
* All Fleets Component have below functionality.
* singleFleets(updateaction, fleetsid, userAccount, videoTitle, fleetsStatus):
   This method is used to u[pdate the fleets status.
* ngOnInit(): All fleets list will be loaded at loading time.
* helpDetails(updateaction, helpdata): method is used to call Help popup from component.
* ngAfterViewInit(): Component views intialisation.
* changemodelview(changemodelvalue): -To change model view.
* getAllhelpList(): To get all help list.
* getAllhelpSeachList(searchstring): To search the help list by string.
* advancedSearchhelp(): This method is used to open help advance popup.
* helpPageNameList(): This method is used to get page name list.
* helpPageFeaturusList(): This method is used to get Features list.
* Changepage(value): This method is used to change the page.
* Changefeature(value): This method is used to change the feature.
* gethelpList(event): Get Fleet List.
* advancedhelp() : method to perform advance search operation for help based on user inputs.
* exportData(searchstring): To export the data.
* hideAdvancedModal(): This method is used to close help advance popup.
* clearAdvancedModal(): This method is used to clear values for help advance popu.
* clearmessa(): To clear the messages.
* handleKeyPress(e): To Handle Key press.
*/

import {
  Component, ViewChild, OnInit, Inject, Output, AfterViewInit, ViewChildren,
  ViewContainerRef, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.component';
import { HelpPopUpComponent } from '../helppopup/helppopup.component';
import { HelpService } from './help.service';
import { HelpPopupService } from '../helppopup/helppopup.service';

@Component({
  templateUrl: 'help.html',
  providers: [HelpService, HelpPopupService]
})

export class HelpComponent implements OnInit, AfterViewInit {
  allhelpDetails: any;
  stacked: any;
  searchstring: string;
  userToken: any;
  toastermessage: any;
  helpeditstatus: any;
  helpaddstatus: any;
  helpviewstatus: any;
  helpdeletedstatus: any;
  helpexportstatus: any;
  loginstatuview = [];
  rowsPerPage = 10;
  storage: Storage = window.localStorage;
  helplocatestatus: any;
  utctimezone: any;
  utctimezonestring: any;
  userpreferedtimezone: any;
  enterpriseIconFilePath: any;
  statuslist: any;
  enabled: any;
  error: any;
  countries: any;
  advsearch: any;
  attributeList: any;
  addinfo: any;
  attributeId: any;
  attributeText: any;
  helpFeaturusList: any;
  helpNameList: any;
  enable = true;
  questionvalue: any;
  Answervalue: any;
  notevalue: any;

  @ViewChildren('input') vc;
  @Output() uploaded: EventEmitter<string> = new EventEmitter();
  @ViewChild(HelpPopUpComponent)
  private helpModalComponent: HelpPopUpComponent;
  @ViewChild('advancedModel') public advancedModel: ModalDirective;

  /* Constructor for Help list Component */
  constructor(private helpListService: HelpService,
    @Inject('apiEndPoint') public apiEndPoint: string,
    public toastr: ToastsManager,
    private translateService: TranslateService,
    private router: Router, private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  /*--- To load the all fleets list at loading time ----*/
  ngOnInit() {
    this.rowsPerPage = parseInt(window.localStorage.getItem('rowsPerPage'), 10);
    this.userToken = window.localStorage.getItem('token');
    /* time zone */
    const defaulttimezoneCode = window.localStorage.getItem('loginUserTimezone');
    const timezonevalue = defaulttimezoneCode.split('(UTC');
    const utcformat = timezonevalue[0].split('-');
    this.userpreferedtimezone = utcformat[0];
    const utcval = timezonevalue[1].split(')');
    this.utctimezone = utcval[0];
    this.utctimezonestring = utcval[0].toString();
    this.advsearch = {};
    if (this.userToken === undefined || this.userToken === null || this.userToken === '') {
      this.router.navigate(['']);
    } else {
      this.helpaddstatus = window.localStorage.getItem('helpaddstatus');
      this.helpeditstatus = window.localStorage.getItem('helpeditstatus');
      this.helpviewstatus = window.localStorage.getItem('helpviewstatus');
      this.helpdeletedstatus = window.localStorage.getItem('helpdeletedstatus');
      this.helpexportstatus = window.localStorage.getItem('helpexportstatus');
      this.getAllhelpList();
    }
  }

  /* Component views intialisation */
  ngAfterViewInit() {
    this.vc.first.nativeElement.focus();
  }

  /*-- method is used to call Help popup from component*/
  helpDetails(updateaction, helpdata) {
    this.helpModalComponent.showChildModal(updateaction, helpdata);
  }

  /*---- To get all help list ----*/
  getAllhelpList() {
    this.helpListService.getMyAllHelpList(this.userToken)
      .subscribe(
      AllhelpDetails => {
        this.allhelpDetails = AllhelpDetails['result'];
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).statusCode;
        switch (status) {
          case 500:
            break;
          case 400:
            this.toastermessage = this.translateService.get('COMMON_STATUS_CODES.' + statuscode);
            this.toastr.success(this.toastermessage.value);
            if (statuscode === '9961') {
              this.storage.removeItem('token');
              this.router.navigate(['/pages/login']);
            } break;
        }
      });
  }

  /*---- To search the help list by string ----*/
  getAllhelpSeachList(searchstring) {
    window.localStorage.removeItem('fleetsadvsearch');
    if (searchstring !== '' && searchstring !== undefined) {
      this.helpListService.getSearchResult(searchstring, this.userToken)
        .subscribe(
        AllhelpDetails => {
          this.allhelpDetails = AllhelpDetails['result'];
        },
        error => {
          const status = JSON.parse(error['status']);
          const statusCode = JSON.parse(error['_body']).statusCode;
          switch (status) {
            case 400:
              if (statusCode === '9961') {
                this.storage.removeItem('token');
                this.router.navigate(['/pages/login']);
              } break;
            case 500:
          }
        }
        );
    } else {
      this.getAllhelpList();
    }
  }

  /* This method is used to open help advance popup */
  advancedSearchhelp() {
    this.helpPageFeaturusList();
    this.helpPageNameList();
    this.advancedModel.show();
    this.enterpriseIconFilePath = window.localStorage.getItem('EnterpriseImage');
  }

  /* This method is used to get page name list */
  helpPageNameList() {
    this.helpListService.helpPageNameList(this.userToken).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.helpNameList = data['result'];
        }
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
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
      }
    );
  }

  /* This method is used to get Features list */
  helpPageFeaturusList() {
    this.helpListService.helpPageFeaturusList(this.userToken).subscribe(
      data => {
        if (data.statusCode === '1001') {
          this.helpFeaturusList = data['result'];
        }
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
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
      }
    );
  }

  /* This method is used to change the page */
  Changepage(value) {
    this.advsearch.page = value;
  }

  /* This method is used to change the feature */
  Changefeature(value) {
    this.advsearch.feature = value;
  }

  /** ---Get Fleet List--- */
  gethelpList(event) {
    this.getAllhelpList();
  }

  /* method to perform advance search operation for help based on user inputs*/
  advancedhelp() {
    if (this.advsearch.page !== '' && this.advsearch.page !== undefined) {
      this.advsearch.page = this.advsearch.page.trim().replace(/\s\s+/g, ' ');
    }
    if (this.advsearch.feature !== '' && this.advsearch.feature !== undefined) {
      this.advsearch.feature = this.advsearch.feature.trim().replace(/\s\s+/g, ' ');
    }
    if (this.questionvalue !== '' && this.questionvalue !== undefined) {
      this.questionvalue = this.questionvalue.trim().replace(/\s\s+/g, ' ');
      this.questionvalue = (this.questionvalue).replace(/[?]/g, '');
    }
    if (this.Answervalue !== '' && this.Answervalue !== undefined) {
      this.Answervalue = this.Answervalue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.notevalue !== '' && this.notevalue !== undefined) {
      this.notevalue = this.notevalue.trim().replace(/\s\s+/g, ' ');
    }
    if (this.advsearch.feature === 'select') {
      this.advsearch.feature = '';
    }
    if (this.advsearch.page === 'select') {
      this.advsearch.page = '';
    }
    this.advsearch = {
      'page': this.advsearch.page,
      'feature': this.advsearch.feature,
      'question': this.questionvalue,
      'answer': this.Answervalue,
      'notes': this.notevalue,
      'isEnabled': this.enable
    };
    this.helpListService.getadvancedHelpSearch(this.advsearch, this.userToken).subscribe(
      AllhelpDetails => {
        this.allhelpDetails = AllhelpDetails['result'];
        this.hideAdvancedModal();
        window.localStorage.setItem('helpadvsearch', 'helpadvsearch');
      },
      error => {
        const status = JSON.parse(error['status']);
        const statuscode = JSON.parse(error['_body']).status;
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
      }
    );
  }

  /**----To export the data---- */
  exportData(searchstring) {
    let searchdiff = '';
    if (window.localStorage.getItem('helpadvsearch') === 'helpadvsearch') {
      searchstring = JSON.stringify(this.advsearch);
      window.localStorage.removeItem('helpadvsearch');
      searchdiff = 'Advancesearch';
      searchstring = searchdiff + '~' + searchstring;
    } else if (searchstring !== '' && searchstring !== undefined) {
      searchdiff = 'search';
      searchstring = searchdiff + '~' + searchstring;
    }
    const filePath = this.helpListService.exportlist(searchstring, this.userToken);
    window.location.href = filePath;
  }

  /* This method is used to close help advance popup */
  public hideAdvancedModal(): void {
    this.advancedModel.hide();
  }

  /* This method is used to clear values for help advance popup */
  public clearAdvancedModal(): void {
    this.advsearch = {};
    this.addinfo = false;
    window.localStorage.removeItem('fleetsadvsearch');
    this.getAllhelpList();
    this.questionvalue = '';
    this.Answervalue = '';
    this.enable = true;
  }

  /*---- To clear the messages ----*/
  public clearmessage() {
    this.error = '';
  }

  /**---To Handle Key press --- */
  handleKeyPress(e) {
    const key = e.keyCode;
    if (key === 13) {
      this.getAllhelpSeachList(this.searchstring);
    }
  }
}


