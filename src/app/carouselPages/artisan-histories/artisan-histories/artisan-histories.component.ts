import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {ArtisanHistories} from '../artisan-histories';
import {UtilsService} from '../../../common/utils.service';

@Component({
  selector: 'app-artisan-histories',
  templateUrl: './artisan-histories.component.html',
  styleUrls: ['./artisan-histories.component.scss']
})
export class ArtisanHistoriesComponent implements OnInit {
  public artisanHistories: ArtisanHistories[] = [];
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
      this.apiService.getBaseData('HistoriasArtesanos').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    information.forEach(historiaArtesano => {
      const artisanImage = historiaArtesano.fields.imagenHistoria;
      this.artisanHistories.push({
        id: historiaArtesano.id,
        artisanId: historiaArtesano.fields.artesano[0],
        artisanLastName: historiaArtesano.fields.apellidoPaterno[0],
        artisanSurName: historiaArtesano.fields.apellidoMaterno[0],
        branch: historiaArtesano.fields.rama[0],
        artisanName: historiaArtesano.fields.nombre[0],
        video: historiaArtesano.fields.video,
        image: artisanImage[0].url,
        content: historiaArtesano.fields.contenido,
        artisanPlace: historiaArtesano.fields.localidad[0],
        subtitle: historiaArtesano.fields.subtitulo,
        title: historiaArtesano.fields.titulo
      });
    });
  }

  sort(value) {
    this.artisanHistories = UtilsService.sort(this.artisanHistories, value, 'title');
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
