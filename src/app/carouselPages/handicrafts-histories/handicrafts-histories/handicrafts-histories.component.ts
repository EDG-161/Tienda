import { Component, OnInit } from '@angular/core';
import {PlaceHistory} from '../../place-histories/place-history';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {ArtisanHistories} from '../../artisan-histories/artisan-histories';
import {HandicraftHistory} from '../handicraft-history';
import {UtilsService} from '../../../common/utils.service';

@Component({
  selector: 'app-handicrafts-histories',
  templateUrl: './handicrafts-histories.component.html',
  styleUrls: ['./handicrafts-histories.component.scss']
})
export class HandicraftsHistoriesComponent implements OnInit {

  public handicraftHistories: HandicraftHistory[] = [];
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
      this.apiService.getBaseData('HistoriasArtesanias').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    information.forEach(handicraftHistory => {
      const handicraftHistoryImage = handicraftHistory.fields.imagen ? handicraftHistory.fields.imagen[0] : {};
      this.handicraftHistories.push({
        id: handicraftHistory.id,
        video: handicraftHistory.fields.video,
        image: handicraftHistoryImage.url,
        content: handicraftHistory.fields.contenido,
        subtitle: handicraftHistory.fields.subtitulo,
        title: handicraftHistory.fields.titulo,
        handicraftsRelated: handicraftHistory.fields.artesaniasRelacionadas
      });
    });
  }

  sort(value) {
    this.handicraftHistories = UtilsService.sort(this.handicraftHistories, value, 'title');
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
