import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NewPage} from '../interfaces/new-page';
import {Handicraft} from '../interfaces/handicraft';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Artisan} from '../interfaces/artisan';
import {ArtisanHistories} from '../carouselPages/artisan-histories/artisan-histories';

@Component({
  selector: 'app-artisan-page',
  templateUrl: './artisan-page.component.html',
  styleUrls: ['./artisan-page.component.scss']
})
export class ArtisanPageComponent implements OnInit {
  public id: string;
  public videoUrl: SafeResourceUrl;
  public artisan: Artisan;
  public handicrafts: Array<Handicraft> = [];
  public historiesFromArtisan: Array<ArtisanHistories> = [];

  public currentArtisanState: any = {};
  public currentArtisanEthnicGroup: any = {};
  public currentArtisanLanguages: any = [];
  public currentArtisanIdioms: any = [];

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
        this.loadArtisanData();
      }
    });
  }

  getInformationAboutArtisanById() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('Artesano').then(result => {
        solve(result.find(data => data.id === this.id));
      });
    });
  }

  getStyle() {
    if (this.artisan.image) {
      return this._sanitizer.bypassSecurityTrustStyle(`background:
      linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 100%),
      url("${this.artisan.image}");`);
    } else {
      return this._sanitizer.bypassSecurityTrustStyle(`background: linear-gradient(to top, #2196F3, rgba(255, 255, 255, 0.73));`);
    }
  }

  cleanData(information) {
    this.artisan = {
      name: `${information.fields.nombre} ${information.fields.apellidoPaterno} ${information.fields.apellidoMaterno}`,
      id: information.id,
      profile: information.fields.perfil,
      video: information.fields.video ? information.fields.video : '',
      image: information.fields.imagen ? information.fields.imagen[0].url : '',
      languages: information.fields.idioma,
      idiom: information.fields.Lengua,
      ethnicGroup: information.fields.grupo[0],
      genre: information.fields.genero === 'F',
      suffix: information.fields.sufijo,
      state: information.fields.estado[0],
      branch: information.fields.rama,
      place: information.fields.localidad,
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

  loadArtisanData() {
    this.getInformationAboutArtisanById().then(data => {
      this.cleanData(data);
      const promiseToGetHandicraftsFromArtisan = this.getHandicraftsFromArtisan();
      const promiseToGetHistoriesFromArtisan = this.getHistoriesFromArtisan();
      const promiseToGetLanguageFromArtisan = this.getLanguageFromArtisan();
      const promiseToGetIdiomFromArtisan = this.getIdiomFromArtisan();
      const promiseToGetEthnicFromArtisan = this.getEthnicFromArtisan();
      const promiseToGetStateFromArtisan = this.getStateFromArtisan();
      Promise.all([
        promiseToGetHandicraftsFromArtisan,
        promiseToGetLanguageFromArtisan,
        promiseToGetIdiomFromArtisan,
        promiseToGetEthnicFromArtisan,
        promiseToGetStateFromArtisan,
        promiseToGetHistoriesFromArtisan
      ]).then(() => {
        this.load = false;
      });
      if (this.artisan.video) {
        this.processVideo(this.artisan.video);
      }
    });
  }

  getLanguageFromArtisan() {
    return new Promise((solve) => {
      this.apiService.getBaseData('Lengua').then(result => {
        this.currentArtisanIdioms = result
          .filter(idiom => this.artisan.idiom.indexOf(idiom.id) >= 0);
      });
      solve();
      return;
    });
  }

  getIdiomFromArtisan() {
    return new Promise((solve) => {
      this.apiService.getBaseData('Idioma').then(result => {
        this.currentArtisanLanguages = result
          .filter(language => this.artisan.languages.indexOf(language.id) >= 0);
        solve();
      });
    });
  }


  getStateFromArtisan() {
    return new Promise((solve) => {
      this.apiService.getBaseData('Estados').then(result => {
        this.currentArtisanState = result
          .find(state => state.id === this.artisan.state);
        solve();
      });
    });
  }

  getEthnicFromArtisan() {
    return new Promise((solve) => {
      this.apiService.getBaseData('GrupoEtnico').then(result => {
        this.currentArtisanEthnicGroup = result
          .find(ethnicGroup => ethnicGroup.id === this.artisan.ethnicGroup);
        solve();
      });
    });
  }

  getHandicraftsFromArtisan() {
    this.apiService.getBaseData('Artesania').then(result => {
      this.handicrafts = result
        .filter(handicraft => handicraft.fields.Artesano[0] === this.artisan.id)
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

  getHistoriesFromArtisan() {
    this.apiService.getBaseData('HistoriasArtesanos').then(result => {
      this.historiesFromArtisan = result
        .filter(history => history.fields.artesano[0] === this.artisan.id)
        .map(history => {
          const artisanImage = history.fields.imagenHistoria;
          return {
            id: history.id,
            artisanId: history.fields.artesano[0],
            artisanLastName: history.fields.apellidoPaterno[0],
            artisanSurName: history.fields.apellidoMaterno[0],
            branch: history.fields.rama[0],
            artisanName: history.fields.nombre[0],
            video: history.fields.video,
            image: artisanImage[0].url,
            content: history.fields.contenido,
            artisanPlace: history.fields.localidad[0],
            subtitle: history.fields.subtitulo,
            title: history.fields.titulo
          };
        });
    });
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

  goHistory(id) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/artisanHistories/${id}`]);
    });
  }

  goGroup(id) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/ethnicGroups/${id}`]);
    });
  }

  ngOnInit() {
  }
}
