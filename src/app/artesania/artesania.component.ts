import {Component, OnInit, Inject, NgZone, AfterViewChecked} from '@angular/core';
import {ActivatedRoute, NavigationEnd} from '@angular/router';
import {ApiService} from '../api.service';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import {Artesania} from './artesania';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';

export interface DialogData {
  artesania: {
    precio: number,
    nombre: string
  };
  proceso: object;
  countries: object;
  costoEnvio: number;
  link: string;
  total: number;
  responsive: boolean;
}

@Component({
  selector: 'app-artesania',
  templateUrl: './artesania.component.html',
  styleUrls: ['./artesania.component.scss']
})
export class ArtesaniaComponent implements OnInit, AfterViewChecked {
  public activeFixed: any;
  countrySelected: any;
  costoEnvio: number;
  total: number;
  countries = [
    {
      name: 'Estados Unidos',
      costo: 250.00
    },
    {
      name: 'Canadá',
      costo: 350.00
    },
    {
      name: 'Francia',
      costo: 400.00
    },
    {
      name: 'España',
      costo: 400.00
    },
    {
      name: 'Italia',
      costo: 400.00
    },
    {
      name: 'Alemania',
      costo: 400.00
    }
  ];
  images: GalleryItem[] = [];
  artesania: Artesania;
  estado: any;
  estados: any;
  place: any;
  language: any;
  languages: any;
  ethnichGroup: any;
  ethnichGroups: any;
  proceso: any;
  material: any;
  type: any;
  artesanos: any;
  artesano: any;
  private id: string;
  public load = true;
  responsive = false;
  videoUrl: any;
  videoPlaceUrl: any;
  videoArtisanUrl: SafeResourceUrl;
  private eventLoad: boolean;
  private imagesEl;
  private imagesSize;
  private activeZoom;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router,
    private zone: NgZone,
    breakpointObserver: BreakpointObserver,
    // tslint:disable-next-line:variable-name
    private _sanitizer: DomSanitizer
  ) {
    this.activeFixed = false;
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.loadArtesania();
      }
    });
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    });
  }

  ngOnInit() {
    console.log('load handicraft');
  }

  goToArtisan(id) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/artesano/${id}`]);
    });
  }

  getUrl(url) {
    if (url) {
      let video;
      let results;

      if (url === null) {
        return '';
      }
      results = url.match('[\\?&]v=([^&#]*)');
      video   = (results === null) ? url : results[1];

      return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
    } else {
      return '';
    }
  }

  get infoArtesano() {
    if (this.artesanos) {
      return this.artesanos.filter(artisan => this.artesania.fields.Artesano.indexOf(artisan.id) > -1)[0];
    } else {
      return {};
    }
  }

  getBackground() {
    if (this.artesanos) {
      return `url(${this.infoArtesano.fields.imagen[0].url})`;
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  goToEthnic(id) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/ethnicGroups/${id}`]);
    });
  }

  loadArtesania() {
    this.images = [];
    this.load = true;
    this.apiService.get('Artesania').subscribe((data: any[]) => {
      const artesania = data.filter(a => a.id === this.id)[0];
      this.artesania = artesania;
      this.artesania.destacada = artesania.fields.artesaniaDestacada;
      this.artesania.descripcioncorta = artesania.fields.descripcioncorta;
      this.artesania.precio = artesania.fields.precio;
      this.artesania.descripcionlarga = artesania.fields.descripcionlarga;
      this.artesania.imagen = artesania.fields.imagen;
      this.artesania.nombre = artesania.fields.nombre;
      this.artesania.peso = artesania.fields.peso;
      this.artesania.talla = artesania.fields.talla;
      this.artesania.altura = artesania.fields.altura;
      this.artesania.mensaje = artesania.fields.mensaje;
      this.artesania.ancho = artesania.fields.ancho;
      this.artesania.largo = artesania.fields.largo;
      this.artesania.cantidad = artesania.fields.cantidad;
      this.videoUrl = this.getUrl(artesania.fields.video);
      this.artesania.descripcionartesania = artesania.fields.descripcionartesania;
      if (this.artesania.imagen) {
        this.artesania.imagen.forEach(artesaniaImage => {
          this.images.push(new ImageItem({src: artesaniaImage.url, thumb: artesaniaImage.thumbnails.large.url}));
        });
      }
      this.loadDataAboutArtesania();
      window.addEventListener('scroll', this.scroll, true);
    });
  }

  loadDataAboutArtesania() {
    this.loadProceso();
    Promise.all([this.loadLanguages(), this.loadEthnicGroups(), this.loadCountries()]).then(() => {
      this.loadArtisans();
    });
    this.loadPlaces();
    this.loadMaterials();
    this.loadTypes();
  }

  private loadCountries() {
    return new Promise((solve) => {
      this.apiService.get('Estados').subscribe((data: any[]) => {
        this.estados = data;
        this.estado = data.filter(estado => estado.id === this.artesania.fields.estado[0])[0];
        solve(data);
      });
    });
  }

  private loadPlaces() {
    this.apiService.get('LugaresElaboracion').subscribe((data: any[]) => {
      this.place = data.filter(estado => estado.id === this.artesania.fields.lugarelaboracion[0])[0];
      this.videoPlaceUrl = this.getUrl(this.place.fields.video);
    });
  }

  private loadLanguages() {
    return new Promise((solve) => {
      this.apiService.get('Idioma').subscribe((data: any[]) => {
        this.languages = data;
        solve(data);
      });
    });
  }

  private loadEthnicGroups() {
    return new Promise((solve) => {
      this.apiService.get('GrupoEtnico').subscribe((data: any[]) => {
        this.ethnichGroups = data;
        solve(data);
      });
    });
  }

  private loadMaterials() {
    this.apiService.get('Material').subscribe((data: any[]) => {
      this.material = data;
    });
  }

  private loadProceso() {
    this.apiService.get('Proceso').subscribe((data: any[]) => {
      this.proceso = data;
    });
  }

  private loadTypes() {
    this.apiService.get('TipoArtesania').subscribe((data: any[]) => {
      this.type = data;
    });
  }

  private loadArtisans() {
    this.apiService.get('Artesano').subscribe((data: any[]) => {
      this.artesanos = data;
      const currentArtisan = this.artesanos.filter(artisan => this.artesania.fields.Artesano.indexOf(artisan.id) > -1)[0];
      this.getEstadoArtesano();
      this.getInformationAboutArtisan(currentArtisan);
    });
  }

  getInformationAboutArtisan(artisan) {
    this.ethnichGroup = this.ethnichGroups.filter(ethnicGroup => artisan.fields.grupo.indexOf(ethnicGroup.id) > -1);
    this.language = this.languages.filter(language => artisan.fields.idioma.indexOf(language.id) > -1);
    this.load = false;
  }

  getEstadoArtesano() {
    this.infoArtesano.estado = this.estados.filter(estado => this.infoArtesano.fields.estado.indexOf(estado.id) > -1)[0].fields.name;
    if (this.infoArtesano.fields.video) {
      this.videoArtisanUrl = this.getUrl(this.infoArtesano.fields.video);
    }
  }

  buy() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        artesania: this.artesania,
        link: this.artesania.fields.shopify,
        countries: this.countries,
        proceso: this.proceso,
        costoEnvio: this.costoEnvio,
        total: this.total,
        responsive: this.responsive
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public scroll = (event): void => {
    // console.log(window.scrollY);
    // console.log(window.innerHeight, '----');
    let totalHeight;
    let heightElement = 0;
    if (document.getElementById('complete-size')) {
      totalHeight = window.getComputedStyle(document.getElementById('complete-size')).getPropertyValue('height')
      heightElement = parseInt(totalHeight.replace('px', ''), 10);
    }
    // console.log(heightElement);
    // console.log(heightElement + 709, 'info');
    // console.log(heightElement + 709, 'info');
    if (window.scrollY > 515) {

    }
    if (document.getElementById('float-container') && window.scrollY > document.getElementById('float-container').offsetTop) {
      document.getElementById('float-container').classList.add('fixed');
      this.activeFixed = true;
      if (document.querySelector('.space') && window.scrollY < 700) {
        setTimeout(() => {
          if (document.querySelector('.space') !== null) {
            // document.querySelector('.space').setAttribute('style', `padding-top: calc(${window.scrollY}px - 4rem) !important;`);
          }
        }, 500);
      }
    } else {
      if (document.querySelector('.space')) {
        // document.querySelector('.space').removeAttribute('style');
      }
      if (document.getElementById('float-container')) {
        document.getElementById('float-container').classList.remove('fixed');
      }
      this.activeFixed = false;
    }
  }

  removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  ngAfterViewChecked(): void {
    if (!this.load) {
      let result;
      let cx;
      let cy;
      if (document.getElementsByClassName('g-items-container')[0]) {
        this.removeElementsByClass('g-template');
        this.imagesEl = document.getElementsByClassName('g-items-container')[0].getElementsByClassName('g-image-item');
        if (this.imagesEl.length > 0) {
          if (this.imagesSize !== this.imagesEl.length) {
            this.imagesSize = this.imagesEl.length;
            this.eventLoad = false;
          }
          this.activeZoom = true;
          if (this.activeZoom && !this.eventLoad) {
            result = document.getElementById('div-result');
            for (const divImage of this.imagesEl) {
              const lens = document.createElement('DIV');
              lens.setAttribute('class', 'img-zoom-lens');
              divImage.parentElement.insertBefore(lens, divImage);
              cx = result.offsetWidth / 100;
              cy = result.offsetHeight / 100;

              result.style.opacity = '0';
              // tslint:disable-next-line:only-arrow-functions
              const getCursorPos = function(e) {
                let a;
                let x = 0;
                let y = 0;
                e = e || window.event;
                a = divImage.getBoundingClientRect();
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return {x, y};
              };
              // tslint:disable-next-line:only-arrow-functions
              const moveLens = function(e) {
                let pos;
                let x;
                let y;
                result.style.backgroundImage =  divImage.style.backgroundImage;
                result.style.backgroundSize = (divImage.offsetWidth * cx) + 'px ' + (divImage.offsetHeight * cy) + 'px';
                e.preventDefault();
                result.style.opacity = '1';
                result.style.zIndex = '3';
                pos = getCursorPos(e);
                x = pos.x - (100 / 2);
                y = pos.y - (100 / 2);
                if (x > divImage.width - lens.offsetWidth) {x = divImage.width - lens.offsetWidth; }
                if (x < 0) {x = 0; }
                if (y > divImage.height - lens.offsetHeight) {y = divImage.height - lens.offsetHeight; }
                if (y < 0) {y = 0; }
                lens.style.left = x + 'px';
                lens.style.top = y + 'px';
                result.style.backgroundPosition = '-' + (x * cx) + 'px -' + (y * cy) + 'px';
                result.style.left = ( divImage.getBoundingClientRect().left + divImage.offsetWidth) + 'px';

              };
              lens.addEventListener('mousemove', moveLens);
              divImage.addEventListener('mousemove', moveLens);
              divImage.addEventListener('mouseout', (e) => {
                result.style.opacity = '0';
                result.style.zIndex = '-1';
              });
            }
            this.eventLoad = true;
          }
        }
      }
    }
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./artesania.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  changeCountry(event: MatSelectChange) {
    this.data.costoEnvio = event.value.costo;
    this.data.link = event.value.link;
    // @ts-ignore
    this.data.total = parseFloat(this.data.costoEnvio) + parseFloat(this.data.artesania.precio);
  }

  goToLink() {
    // @ts-ignore
    window.location = this.data.link;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
