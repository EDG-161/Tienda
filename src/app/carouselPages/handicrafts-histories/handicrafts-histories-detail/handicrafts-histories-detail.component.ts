import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {PlaceHistory} from '../../place-histories/place-history';
import {Handicraft} from '../../../interfaces/handicraft';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {ImageItem} from '@ngx-gallery/core';
import {HandicraftHistory} from '../handicraft-history';

@Component({
  selector: 'app-handicrafts-histories-detail',
  templateUrl: './handicrafts-histories-detail.component.html',
  styleUrls: ['./handicrafts-histories-detail.component.scss']
})
export class HandicraftsHistoriesDetailComponent implements OnInit {

  public id: string;
  public videoUrl: SafeResourceUrl;
  public handicraftHistory: HandicraftHistory;
  public handicrafts: Array<Handicraft> = [];
  public load = true;
  public pageSize = 6;
  public pageOfItems: Array<Handicraft> = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private zone: NgZone,
    // tslint:disable-next-line:variable-name
    private _sanitizer: DomSanitizer
  ) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load = true;
        this.loadNew();
      }
    });
  }

  getInformationAboutNew() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('HistoriasArtesanias').then(result => {
        solve(result.find(data => data.id === this.id));
      });
    });
  }

  getStyle() {
    // @ts-ignore
    if (this.handicraftHistory.image) {
      // @ts-ignore
      const src = this.handicraftHistory.image;
      return this._sanitizer.bypassSecurityTrustStyle(`background:
      linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 100%),
      url("${src}");`);
    } else {
      return this._sanitizer.bypassSecurityTrustStyle(`background: linear-gradient(to top, #2196F3, rgba(255, 255, 255, 0.73));`);
    }
  }

  cleanData(information) {
    const handicraftHistoryImage = information.fields.imagen ? information.fields.imagen[0] : {};
    this.handicraftHistory = {
      title: information.fields.titulo,
      subtitle: information.fields.subtitulo ? information.fields.subtitulo : '',
      id: information.id,
      content: information.fields.contenido,
      video: information.fields.video ? information.fields.video : null,
      handicraftsRelated: information.fields.artesaniasRelacionadas,
      image: handicraftHistoryImage.url
    };
  }

  processVideo(url) {
    let video;
    let results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
    this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  loadNew() {
    this.getInformationAboutNew().then(data => {
      this.cleanData(data);
      this.getHandicraftsFromArtisan();
      if (this.handicraftHistory.video) {
        this.processVideo(this.handicraftHistory.video);
      }
      this.load = false;
    });
  }

  getHandicraftsFromArtisan() {
    if (this.handicraftHistory.handicraftsRelated && this.handicraftHistory.handicraftsRelated.length > 0) {
      this.apiService.getBaseData('Artesania').then(result => {
        this.handicrafts = result
          .filter(handicraft => this.handicraftHistory.handicraftsRelated.indexOf(handicraft.id) >= 0)
          .map(handicraft => {
            return {
              name: handicraft.fields.nombre,
              images: handicraft.fields.imagen,
              link: `artesania/${handicraft.id}`,
              id: handicraft.id
            };
          });
      });
    }
  }


  gethandiCraftImage(handicraft) {
    return this._sanitizer.bypassSecurityTrustStyle(`background: url("${handicraft[0].url}");`);
  }

  goHandicraft(handicraftLink) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/${handicraftLink}`]);
    });
  }


  onChangePage(pageOfItems: Array<Handicraft>) {
    this.pageOfItems = pageOfItems;
  }

  ngOnInit() {
  }

}
