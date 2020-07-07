import { Component, OnInit } from '@angular/core';
import {HandicraftHistory} from '../../handicrafts-histories/handicraft-history';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {Ethnic} from '../ethnic';
import {UtilsService} from '../../../common/utils.service';

@Component({
  selector: 'app-ethnic-groups',
  templateUrl: './ethnic-groups.component.html',
  styleUrls: ['./ethnic-groups.component.scss']
})
export class EthnicGroupsComponent implements OnInit {
  public ethnicGroups: Ethnic[] = [];
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
      this.apiService.getBaseData('GrupoEtnico').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    information.forEach(ethnicGroup => {
      const groupImage = ethnicGroup.fields.imagen ? ethnicGroup.fields.imagen[0] : {};
      this.ethnicGroups.push({
        content: ethnicGroup.fields.contenido,
        features: ethnicGroup.fields.caracteristicas,
        group: ethnicGroup.fields.grupo,
        history: ethnicGroup.fields.historia,
        id: ethnicGroup.id,
        image: groupImage.url,
        relatedArtisans: ethnicGroup.fields.Artesanos,
        social: ethnicGroup.fields.social,
        video: ethnicGroup.fields.video,
        localization: ethnicGroup.fields.localizacion,
      });
    });
  }

  sort(value) {
    this.ethnicGroups = UtilsService.sort(this.ethnicGroups, value, 'group');
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
