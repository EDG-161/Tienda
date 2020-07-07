import {Component, Inject, NgZone} from '@angular/core';
import {ApiService} from '../api.service';
import {FormControl} from '@angular/forms';
import {Carousel} from 'primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public loadHomeData = true;
  public descripcion: string;
  public artesanias = [];
  public offset: string;
  types = new FormControl();
  ramas = new FormControl();
  artesanos: any[];
  carouselData = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.loadMainData();
  }

  goToMap() {
    window.scrollTo(0, 0);
    this.router.navigate([`/collection`]);
  }

  goToArtisan(id) {
    window.scrollTo(0, 0);
    this.router.navigate([`/artesano/${id}`]);
  }

  loadMainData() {
    const homePageData = [this.getHandicrafts(), this.getArtisans(), this.getCarousel()];
    Promise.all(homePageData).then(results => {
      this.artesanias = this.parseForSection(this.getHomeHandicrafts(results[0]), 'nombre');
      this.artesanos = this.parseForSection(this.getHomeArtisans(results[1]), 'nombreCompleto');
      this.carouselData = this.getCarouselCleanData(results[2]);
      this.loadHomeData = false;
    }).catch();
  }

  parseForSection(data, name) {
    return data.reduce((dataParse, item) => {
      dataParse.push({
        id: item.id,
        image: item.fields.imagen[0].url,
        text: item.fields[name]
      });
      return dataParse;
    }, []);
  }

  getHomeArtisans(artisans) {
    return artisans.filter((artisan) => {
      return artisan.fields.vistaPagina;
    }).map(artisan => {
      artisan.fields.nombreCompleto =
        `${artisan.fields.nombre} ${artisan.fields.apellidoPaterno}`;
      return artisan;
    });
  }

  getHomeHandicrafts(handicrafts) {
    return handicrafts.filter(handicraft => {
      return handicraft.fields.artesaniaDestacada;
    });
  }

  getCarouselCleanData(carouselData) {
    return carouselData.reduce((carouselParse, carouselItem) => {
      carouselParse.push({
        title: carouselItem.fields.titulo,
        img: carouselItem.fields.imagen[0].url,
        link: carouselItem.fields.link ? carouselItem.fields.link : undefined,
        type: carouselItem.fields.tipo,
        content: carouselItem.fields.descripcion,
        order: carouselItem.fields.orden
      });
      return carouselParse;
    }, []).sort((a, b) => {
      return a.order > b.order ? 1 : -1;
    });
  }

  public getArtisans() {
    return this.apiService.getInfo('Artesano');
  }

  public getCarousel() {
    return this.apiService.getInfo('Carrusel');
  }

  public getHandicrafts() {
    return this.apiService.getInfo('Artesania');
  }


}
