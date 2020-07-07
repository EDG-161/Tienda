import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NewPage} from '../interfaces/new-page';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {ImageItem} from '@ngx-gallery/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  public id: string;
  public videoUrl: SafeResourceUrl;
  public finalData: object;
  public newData: NewPage;
  public load = true;

  constructor(
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
        this.loadNew();
      }
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

  getInformationAboutNew() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('Paginas').then(result => {
        solve(result.find(data => data.id === this.id));
      });
    });
  }

  cleanData(information) {
    this.newData = {
      title: information.fields.titulo,
      subtitle: information.fields.subtitulo ? information.fields.subtitulo : '',
      id: information.id,
      content: information.fields.contenido,
      video: information.fields.video ? information.fields.video : '',
      image: information.fields.imagen ? information.fields.imagen[0].url : '',
      attachment: information.fields.archivo ? information.fields.archivo[0].url : '',
      images: information.fields.imagenes ? information.fields.imagenes.map(imageItemList => {
        return new ImageItem({src: imageItemList.url, thumb: imageItemList.thumbnails.large.url});
      }) : [],
    };
  }

  processVideo(url) {
    let video;
    let results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];
    this.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  loadNew() {
    this.getInformationAboutNew().then(data => {
      this.cleanData(data);
      if (this.newData.video) {
        this.processVideo(this.newData.video);
      }
      // @ts-ignore
      this.finalData = data;
      this.load = false;
    });
  }

  ngOnInit() {
  }
}
