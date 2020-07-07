import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NewPage} from '../interfaces/new-page';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {PlacePage} from '../interfaces/place-page';
import {ImageItem} from '@ngx-gallery/core';
import {Handicraft} from '../interfaces/handicraft';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  public id: string;
  public videoUrl: SafeResourceUrl;
  public finalData: object;
  public placeData: PlacePage;
  public load = true;
  public pageSize = 6;
  public handicrafts: Array<Handicraft> = [];
  public pageOfItems: Array<Handicraft> = [];
  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    // tslint:disable-next-line:variable-name
    private _sanitizer: DomSanitizer
  ) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.load = true;
        this.loadPlace();
      }
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

  getInformationAboutNew() {
    return new Promise((solve) => {
      let data = {};
      this.apiService.getBaseData('Paginas').then(result => {
        const informationOfPage = result.find(info => info.id === this.id);
        this.apiService.getBaseData('LugaresElaboracion').then(placeFrom => {
          const dataPlace = placeFrom.find(info => info.id === informationOfPage.fields.lugardeelaboracion[0]);
          data = {
            pageId: informationOfPage.id,
            ...informationOfPage.fields,
            placeId: dataPlace.id,
            ...dataPlace.fields,
          };
          solve(data);
        });
      });
    });
  }

  cleanData(information) {
    this.placeData = {
      title: information.titulo,
      subtitle: information.subtitulo ? information.subtitulo : '',
      id: information.placeId,
      content: information.contenido,
      video: information.video ? information.video : '',
      images: information.imagen.map(imageItemList => {
        return new ImageItem({src: imageItemList.url, thumb: imageItemList.thumbnails.large.url});
      }),
      place: information.Localidad
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

  loadPlace() {
    this.getInformationAboutNew().then(data => {
      this.cleanData(data);
      if (this.placeData.video) {
        this.processVideo(this.placeData.video);
      }
      // @ts-ignore
      this.finalData = data;
      this.load = false;
      this.getHandiCraftsFromPlace();
    });
  }

  getHandiCraftsFromPlace() {
    this.apiService.getBaseData('Artesania').then(result => {
      this.handicrafts = result
        .filter(handicraft => handicraft.fields.lugarelaboracion[0] === this.placeData.id)
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

  ngOnInit() {
  }

  onChangePage(pageOfItems: Array<Handicraft>) {
    this.pageOfItems = pageOfItems;
  }

}
