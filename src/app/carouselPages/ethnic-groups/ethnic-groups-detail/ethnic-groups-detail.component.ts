import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HandicraftHistory} from '../../handicrafts-histories/handicraft-history';
import {Handicraft} from '../../../interfaces/handicraft';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {EthnicGroup} from '../../../interfaces/ethnic-group';
import {Ethnic} from '../ethnic';
import {Artisan} from '../../../interfaces/artisan';

@Component({
  selector: 'app-ethnic-groups-detail',
  templateUrl: './ethnic-groups-detail.component.html',
  styleUrls: ['./ethnic-groups-detail.component.scss']
})
export class EthnicGroupsDetailComponent implements OnInit {
  public id: string;
  public videoUrl: SafeResourceUrl;
  public ethnicGroup: Ethnic;
  public artisans: Array<Artisan> = [];
  public load = true;
  public pageSize = 6;
  public pageOfItems: Array<Artisan> = [];

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
      this.apiService.getBaseData('GrupoEtnico').then(result => {
        solve(result.find(data => data.id === this.id));
      });
    });
  }

  getStyle() {
    // @ts-ignore
    if (this.ethnicGroup.image) {
      // @ts-ignore
      const src = this.ethnicGroup.image;
      return this._sanitizer.bypassSecurityTrustStyle(`background:
      linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 100%),
      url("${src}");`);
    } else {
      return this._sanitizer.bypassSecurityTrustStyle(`background: linear-gradient(to top, #2196F3, rgba(255, 255, 255, 0.73));`);
    }
  }

  cleanData(information) {
    const ethnicGroupImage = information.fields.imagen ? information.fields.imagen[0] : {};
    this.ethnicGroup = {
      content: information.fields.contenido,
      features: information.fields.caracteristicas,
      group: information.fields.grupo,
      history: information.fields.historia,
      id: information.id,
      image: ethnicGroupImage.url,
      relatedArtisans: information.fields.Artesanos,
      social: information.fields.social,
      video: information.fields.video,
      localization: information.fields.localizacion
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
      if (this.ethnicGroup.video) {
        this.processVideo(this.ethnicGroup.video);
      }
      this.load = false;
    });
  }

  getHandicraftsFromArtisan() {
    if (this.ethnicGroup.relatedArtisans && this.ethnicGroup.relatedArtisans.length > 0) {
      this.apiService.getBaseData('Artesano').then(result => {
        this.artisans = result
          .filter(handicraft => this.ethnicGroup.relatedArtisans.indexOf(handicraft.id) >= 0)
          .map(handicraft => {
            return {
              name: handicraft.fields.nombre,
              images: handicraft.fields.imagen,
              link: `artesano/${handicraft.id}`,
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


  onChangePage(pageOfItems: Array<Artisan>) {
    this.pageOfItems = pageOfItems;
  }

  ngOnInit() {
  }
}
