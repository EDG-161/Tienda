import {Component, Input, NgZone, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {any} from 'codelyzer/util/function';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {Handicraft} from '../../interfaces/handicraft';

@Component({
  selector: 'app-artisan-carrusel',
  templateUrl: './artisan-carrusel.component.html',
  styleUrls: ['./artisan-carrusel.component.scss']
})
export class ArtisanCarruselComponent implements OnInit {

  @Input() artisan;
  artesanias = [];
  public pageOfItems: Array<any> = [];
  public pageSize = 6;
  load = true;

  constructor(private router: Router,
              private apiService: ApiService,
              // tslint:disable-next-line:variable-name
              private _sanitizer: DomSanitizer,
              private zone: NgZone) { }

  getArtesanias() {
    this.apiService.get('Artesania').subscribe((data: any[]) => {
      const preArtesanias = data.filter(a => a.fields.Artesano[0] === this.artisan.id);
      preArtesanias.forEach(artesania => {
        this.artesanias.push({
          id: artesania.id,
          images: artesania.fields.imagen,
          name: artesania.fields.nombre,
          link: `artesania/${artesania.id}`
        });
      });
      this.load = false;
    });
  }

  gethandiCraftImage(handicraft) {
    return this._sanitizer.bypassSecurityTrustStyle(`background: url("${handicraft[0].url}");`);
  }

  goHandicraft(handicraftLink) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/${handicraftLink}`]);
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

  ngOnInit() {
    this.getArtesanias();
  }

}
