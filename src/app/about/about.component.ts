import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, DoCheck, Inject, NgZone, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Page} from '../interfaces/page';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public content: string;
  public moving: boolean;
  public previousContent: string;
  public aboutData = [];

  public aboutUs: string;
  public team: string;
  public support: string;
  public collaborative: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private zone: NgZone
  ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.content = this.route.snapshot.paramMap.get('content');
        this.moving = false;
      }
    });
  }

  public getInformation() {
    this.apiService.getBaseData('Footer').then(result => {
      this.zone.run(() => {
        const aboutData = result.reduce((footerData, currentInfo) => {
          if (!footerData[currentInfo.fields.name] && currentInfo.fields.sectionPage === 'aboutUs') {
            footerData[currentInfo.fields.name] = {
              content: currentInfo.fields.content,
              name: currentInfo.fields.name,
              id: currentInfo.fields.id,
            };
          }
          return footerData;
        }, {});
        this.aboutUs = aboutData.nosotros.content;
        this.support = aboutData.soporte.content;
        this.collaborative = aboutData.colabora.content;
        this.team = aboutData.equipo.content;
      });
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    if (!this.moving) {
      const ctn = document.getElementById(this.content ? this.content : 'about');
      window.scrollTo(ctn.offsetLeft, ctn.offsetTop - 60);
      this.previousContent = this.content;
      this.moving = true;
    }
    if (this.previousContent !== this.content) {
      this.moving = false;
    }
  }

  ngOnInit() {
    this.getInformation();
  }

}
