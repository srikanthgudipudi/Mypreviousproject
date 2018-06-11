import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Http } from '@angular/http';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/Rx';
@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private direction: string;
  constructor(private translate: TranslateService,
    private http: Http, private titleService: Title, private router: Router, private activatedRoute: ActivatedRoute) {

  }
  ngOnInit() {
    this.translate.addLangs(['en', 'fr', 'hy']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|hy/) ? browserLang : 'en');
    if (this.translate.getBrowserLang() === 'ar') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }
    {
      this.router.events
        .filter(event => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter(route => route.outlet === 'primary')
        .mergeMap(route => route.data)
        .subscribe((event) => this.titleService.setTitle(event['title']));
    }
  }
}
