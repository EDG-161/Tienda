import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UtilsService} from '../common/utils.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public news;
  public load: boolean;
  public active: any;

  constructor( private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.active = this.route.snapshot.paramMap.get('id');
        this.news = [];
        this.load = true;
        this.loadNews();
      }
    });
  }

  getInformationAboutNew() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('Paginas').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    information ? information.forEach(New => {
      New.fields.tipo === 'noticias' ? this.news.push({
        title: New.fields.titulo,
        subtitle: New.fields.subtitulo ? New.fields.subtitulo : '',
        id: New.id,
        content: New.fields.contenido,
        image: New.fields.imagen ? New.fields.imagen[0].url : '',
      }) : false;
    }) : information = [];
    /**/
  }

  sort(value) {
    this.news = UtilsService.sort(this.news, value, 'title');
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
