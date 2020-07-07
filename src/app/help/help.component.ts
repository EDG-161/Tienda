import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public content: string;
  public moving: boolean;
  public previousContent: string;
  public aboutData = [];

  public tos: string;
  public devolucion: string;
  public faq: string;
  public politica: string;

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
          if (!footerData[currentInfo.fields.name] && currentInfo.fields.sectionPage === 'help') {
            footerData[currentInfo.fields.name] = {
              content: currentInfo.fields.content,
              name: currentInfo.fields.name,
              id: currentInfo.fields.id,
            };
          }
          return footerData;
        }, {});
        this.tos = aboutData.tos.content;
        this.devolucion = aboutData.devolucion.content;
        this.faq = aboutData.faq.content;
        this.politica = aboutData.politica.content;
      });
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked() {
    if (!this.moving) {
      const ctn = document.getElementById(this.content ? this.content : 'tos');
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
