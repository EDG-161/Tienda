import {Component, NgZone} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {ApiService} from './api.service';
import {Router, RouterEvent} from '@angular/router';
import {FormControl} from '@angular/forms';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {Handicraft} from './interfaces/handicraft';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private eventOptions: boolean|{capture?: boolean, passive?: boolean};
  handicrafts: Handicraft[] = [];
  title = 'tiamiqui-angular-app';
  responsive = false;
  showBack: boolean;
  hideLeft = false;
  pageLoaded = '';
  hideRight = false;
  isReset: boolean;
  text: string;
  results: Handicraft[];
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  constructor(
    breakpointObserver: BreakpointObserver,
    private zone: NgZone,
    private apiService: ApiService,
    private router: Router
  ) {
    // document.addEventListener('contextmenu', event => event.preventDefault());
    router.events.subscribe(val => {
      if (val instanceof RouterEvent) {
        this.pageLoaded = val.url.split('/')[1];
        if (this.pageLoaded === '' || this.pageLoaded === 'home') {
          this.hideLeft = false;
          this.hideRight = false;
        } else {
          this.hideLeft = true;
          this.hideRight = true;
        }
      }
    });
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.scrollEvent.bind(this), true);
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
    this.getHandicrafts().then(handicrafts => {
      handicrafts.forEach(handicraft => {
        this.handicrafts.push({
          artisan: handicraft.fields.Artesano,
          id: handicraft.id,
          images: handicraft.fields.imagen[0].url,
          link: handicraft.id,
          name: handicraft.fields.nombre,
          state: handicraft.fields.lugarelaboracion,
          type: handicraft.fields.tipo
        });
      });
    });
  }

  setToTop() {
    window.scroll(0, 0);
  }

  isVisible() {
    if (!this.pageLoaded) {
      this.pageLoaded = window.location.pathname.split('/')[1];
    }
    return this.pageLoaded !== 'home';
  }

  scrollEvent() {
    const scrollTop = window.scrollY;
    this.zone.run(() => {
      this.showBack = scrollTop >= screen.height;
      if (this.isReset && scrollTop === 0) {
        if (window.location.pathname === '/home') {
          window.location.reload();
        }
      }
    });
  }

  reset() {
    this.isReset = true;
    this.setToTop();
  }

  tiamiquiNavigationClass() {
    if (!this.hideRight && !this.hideLeft) {
      return 'tiamiqui-full-view';
    }

    if (this.hideRight && this.hideLeft) {
      return 'tiamiqui-view';
    }
  }

  public getHandicrafts() {
    return this.apiService.getInfo('Artesania');
  }

  toggleLeft() {
    this.hideLeft = !this.hideLeft;
  }

  goToArtesania(idArtesania) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/artesania/${idArtesania}`]);
    });
  }

  search(event) {
    this.results = this.handicrafts.filter(handicraft => {
      return handicraft.name.toLocaleLowerCase().search(event.query.toLocaleLowerCase()) > -1;
    });
    // this.mylookupservice.getResults(event.query).then(data => {
    //   this.results = data;
    // });
  }

  goToArtesaniaAutoComplete(event) {
    console.log(event.id);
    this.goToArtesania(event.id);
  }

  toggleRight() {
    this.hideRight = !this.hideRight;
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollEvent, true);
  }
}
