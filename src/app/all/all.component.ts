import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Handicraft} from '../interfaces/handicraft';
import {UtilsService} from '../common/utils.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  public handicrafts: any[] = [];
  public load: boolean;
  public active: any;

  constructor( private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.active = this.route.snapshot.paramMap.get('id');
        this.load = true;
        this.loadNews();
      }
    });
  }

  getInformationAboutNew() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('Artesania').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    this.handicrafts = information
      .map(handicraft => {
        return {
          name: handicraft.fields.nombre,
          image: handicraft.fields.imagen[0].url,
          id: handicraft.id
        };
      });
  }

  sort(value) {
    this.handicrafts = UtilsService.sort(this.handicrafts, value, 'name');
  }

  loadNews() {
    this.getInformationAboutNew().then(data => {
      this.cleanData(data);
      // @ts-ignore
      this.load = false;
    });
  }

  ngOnInit() {
  }
}
