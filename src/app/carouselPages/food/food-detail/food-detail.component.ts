import {Component, NgZone, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {Food} from '../food';
import {ImageItem} from '@ngx-gallery/core';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {

  public id: string;
  public videoUrl: SafeResourceUrl;
  public food: Food;
  public load = true;

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

  getStyle() {
    // @ts-ignore
    if (this.food.images) {
      // @ts-ignore
      const src = this.food.images[0].data.src;
      return this._sanitizer.bypassSecurityTrustStyle(`background:
      linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 100%),
      url("${src}");`);
    } else {
      return this._sanitizer.bypassSecurityTrustStyle(`background: linear-gradient(to top, #2196F3, rgba(255, 255, 255, 0.73));`);
    }
  }

  cleanData(information) {
    this.food = {
      name: information.fields.nombre,
      id: information.id,
      content: information.fields.contenido,
      images: information.fields.imagen ? information.fields.imagen.map(imageItemList => {
        return new ImageItem({src: imageItemList.url, thumb: imageItemList.thumbnails.large.url});
      }) : '',
    };
  }

  loadNew() {
    this.getInformationAboutNew().then(data => {
      this.cleanData(data);
      this.load = false;
    });
  }

  getInformationAboutNew() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('Platillos').then(result => {
        solve(result.find(data => data.id === this.id));
      });
    });
  }

  gethandiCraftImage(food) {
    return this._sanitizer.bypassSecurityTrustStyle(`background: url("${food[0].url}");`);
  }

  ngOnInit() {
  }


}
