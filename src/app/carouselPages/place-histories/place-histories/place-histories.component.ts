import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {PlaceHistory} from '../place-history';
import {UtilsService} from '../../../common/utils.service';

@Component({
  selector: 'app-place-histories',
  templateUrl: './place-histories.component.html',
  styleUrls: ['./place-histories.component.scss']
})
export class PlaceHistoriesComponent implements OnInit {

  public placeHistories: PlaceHistory[] = [];
  public load: boolean;
  public active: any;

  constructor( private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.active = this.route.snapshot.paramMap.get('id');
        this.load = true;
        this.loadArtisanHistories();
      }
    });
  }

  getInformationArtisanHistories() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('HistoriasLugares').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    information.forEach(placeInfo => {
      const placeImages = placeInfo.fields.imagenLugar.map(imagen => {
        return imagen ? imagen.url : '';
      });
      this.placeHistories.push({
        handicraftsRelated: placeInfo.fields.artesanias,
        placeId: placeInfo.fields.lugarrelacionado[0],
        placeName: placeInfo.fields.localidad[0],
        id: placeInfo.id,
        video: placeInfo.fields.video,
        images: placeImages,
        content: placeInfo.fields.contenido,
        artisanPlace: placeInfo.fields.localidad[0],
        subtitle: placeInfo.fields.subtitulo,
        title: placeInfo.fields.titulo
      });
    });
  }

  sort(value) {
    this.placeHistories = UtilsService.sort(this.placeHistories, value, 'title');
  }

  loadArtisanHistories() {
    this.getInformationArtisanHistories().then(data => {
      this.cleanData(data);
      // @ts-ignore
      this.load = false;
    });
  }

  ngOnInit() {
  }
}
