import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NewPage} from '../interfaces/new-page';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Handicraft} from '../interfaces/handicraft';

@Component({
  selector: 'app-artisan',
  templateUrl: './artisan.component.html',
  styleUrls: ['./artisan.component.scss']
})
export class ArtisanComponent implements OnInit {
  public id: string;
  public videoUrl: SafeResourceUrl;
  public newData: NewPage;
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
      this.apiService.getBaseData('Paginas').then(result => {
        solve(result.find(data => data.id === this.id));
      });
    });
  }

  getStyle() {
    if (this.newData.image) {
      return this._sanitizer.bypassSecurityTrustStyle(`background:
      linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 100%),
      url("${this.newData.image}");`);
    } else {
      return this._sanitizer.bypassSecurityTrustStyle(`background: linear-gradient(to top, #2196F3, rgba(255, 255, 255, 0.73));`);
    }
  }

  cleanData(information) {
    this.newData = {
      title: information.fields.titulo,
      subtitle: information.fields.subtitulo ? information.fields.subtitulo : '',
      id: information.id,
      content: information.fields.contenido,
      video: information.fields.video ? information.fields.video : '',
      image: information.fields.imagen ? information.fields.imagen[0].url : '',
      attachment: '',
      images: [],
      artisan: information.fields.artesano[0],
      artisanName: information.fields.artisanName + ' ' + information.fields.artisanLast
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
      if (this.newData.video) {
        this.processVideo(this.newData.video);
      }
      this.load = false;
    });
  }

  getHandicraftsFromArtisan() {
    this.apiService.getBaseData('Artesania').then(result => {
      this.handicrafts = result
        .filter(handicraft => handicraft.fields.Artesano[0] === this.newData.artisan)
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
