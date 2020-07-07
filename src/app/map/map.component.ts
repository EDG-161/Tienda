import {Component, ElementRef, Inject, NgZone, ViewChild} from '@angular/core';
import {ApiService} from '../api.service';
import {FormControl} from '@angular/forms';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4plugins_overlapBuster from '@amcharts/amcharts4/plugins/overlapBuster';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4geodata_mexico from '@amcharts/amcharts4-geodata/mexicoHigh';
import {Gallery, GalleryItem, ImageItem} from '@ngx-gallery/core';
import {ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';

const IMAGE_URL = 'https://source.unsplash.com/1600x900/?succulent,green,dark,table';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

am4core.useTheme(am4themes_animated);
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectChange} from '@angular/material';
import {DialogData, DialogOverviewExampleDialog} from '../artesania/artesania.component';
import config from '../../config/statesData';
import {Handicraft} from '../interfaces/handicraft';
import {Place} from '../interfaces/place';
import {Artisan} from '../interfaces/artisan';
import {Type} from '../interfaces/type';
import {Material} from '../interfaces/material';
import {EthnicGroup} from '../interfaces/ethnic-group';
import {Language} from '../interfaces/language';
import {State} from '../interfaces/state';
import {Branch} from '../interfaces/branch';
import {Idiom} from '../interfaces/idiom';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public searchHandicrafts = [];
  public pageOfItems: Array<Handicraft> = [];
  public places: Place[] = [];
  public artisans: Artisan[] = [];
  public handicrafts: Handicraft[] = [];
  public types: Type[] = [];
  public materials: Material[] = [];
  public ethnicGroups: EthnicGroup[] = [];
  public languages: Language[] = [];
  public states: State[] = [];
  public branches: Branch[] = [];
  public idioms: Idiom[] = [];
  public polygonSeries: any;
  public polygonTemplate: any;
  public pageSize = 4;

  public loadMap = true;

  public tiamiquiMap: am4maps.MapChart;
  public activeState: any;
  public hoverCountry: any;
  public overlap: any;
  public imageSeries: any;

  public currentCountry: State;
  public currentPlace: Place;
  // public videoCountry: SafeResourceUrl;
  // placeSelected = new FormControl();
  // types = new FormControl();
  // ramas = new FormControl();
  // ethnicGroups = new FormControl();
  // languages = new FormControl();

  constructor(
    private apiService: ApiService,
    private zone: NgZone,
    private ref: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _sanitizer: DomSanitizer
  ) {
    this.initInfo().then(() => {
      this.loadMap = false;
      this.initMap();
    });
  }

  public initMap() {
    this.createMap();
    this.createPolygons();
    this.createButtonsOnMap();
    // this.addBackgroundImageOnMap('/assets/mapa.png');
    this.setStatesActionsOnMap();
    this.loadPointsFromPlaces();
  }

  public createMap() {
    this.zone.runOutsideAngular(() => {
      this.tiamiquiMap = am4core.create('map-tiamiqui', am4maps.MapChart);
      this.tiamiquiMap.geodata = am4geodata_mexico;
      this.tiamiquiMap.chartContainer.wheelable = false;
      this.tiamiquiMap.projection = new am4maps.projections.Miller();
    });
  }

  public loadPointsFromPlaces() {
    this.imageSeries = this.tiamiquiMap.series.push(new am4maps.MapImageSeries());
    const imageSeriesTemplate = this.imageSeries.mapImages.template;
    imageSeriesTemplate.layout = 'absolute';
    imageSeriesTemplate.isMeasured = true;
    this.getCircle('#dd9a19', '#FFFFFF', imageSeriesTemplate);
    imageSeriesTemplate.propertyFields.latitude = 'latitude';
    imageSeriesTemplate.propertyFields.longitude = 'longitude';
    // this.loadArtesaniasGeoLocation(artesanias, this.imageSeries);
    this.loadPointsPlaces(this.imageSeries);
    this.hidePoints();
    // this.getAllPoints(map);
  }

  public showPoints() {
    this.imageSeries.show();
    this.imageSeries.toFront();
    this.imageSeries.setVisibility(true);
  }

  public hidePoints() {
    this.imageSeries.toBack();
    this.imageSeries.hide();
    this.imageSeries.closeAllPopups();

  }

  public loadPointsPlaces(imageSeries) {
    this.places.forEach(place => {
      this.addPoint(place, imageSeries);
    });
  }

  public addPoint(place, imageSeries) {
    return imageSeries.addData({
      ...place
    });
  }

  public createPolygons() {
    if (this.tiamiquiMap) {
      this.polygonSeries = this.createMapPolygonSeries(this.tiamiquiMap);
      this.polygonSeries.useGeodata = true;
      this.polygonTemplate = this.polygonSeries.mapPolygons.template;
      this.polygonTemplate.events.on('over', this.countryHover, this);
      this.polygonSeries.data = this.states;
      this.polygonSeries.propertyFields.latitude = 'latitude';
      this.polygonSeries.propertyFields.longitude = 'longitude';
      this.polygonTemplate.fill = am4core.color('#0094ed');
    }
  }

  public countryHover(e) {
    if (!this.currentCountry && !this.currentPlace) {
      e.target.tooltipHTML = `
      <div style="height: 230px">
        <div style="text-align: center; font-size: 18px; color: white; margin:15px">{name}</div>
        <div style="
          background: url('{image}');
          background-position: center !important;
          background-size: contain !important;
          background-repeat: no-repeat !important;
          width:190px;
          height:190px;">
        </div>
      <div>`;
      e.target.tooltip.show();
    } else {
      e.target.tooltipHTML = '';
      e.target.tooltip.hide();
    }
  }

  public setStatesActionsOnMap() {
    this.activeState = this.polygonTemplate.states.create('active');
    this.activeState.properties.fill = am4core.color('#1e7bc8');
    this.activeState.properties.fillOpacity = 0.7;
    this.polygonTemplate.events.on('hit', this.handleClickCountry, this);
  }

  public handleClickCountry(ev) {
    this.currentCountry = ev.target.dataItem.dataContext;
    this.currentPlace = undefined;
    this.getInformationAboutCountry();
    const description = this.currentCountry.description;
    ev.target.tooltip.openModal(
      `<strong>${ev.target.dataItem.dataContext.name}</strong> - ${description}`
    );
    ev.target.tooltip.modal.verticalAlign = 'top';
    ev.target.tooltip.modal.defaultStyles = true;
    ev.target.series.chart.zoomToMapObject(ev.target, 4);
    this.showPoints();
  }

  public getInformationAboutCountry() {
    this.zone.run(() => {
      if (this.currentCountry && this.currentCountry.handicraftsRelated && this.currentCountry.handicraftsRelated.length > 0) {
        this.searchHandicrafts = this.handicrafts.filter(handicraft => {
          return this.currentCountry.handicraftsRelated.indexOf(handicraft.id) > 0;
        });
      } else {
        this.searchHandicrafts = [];
      }
    });
  }

  public getCircle(fillColor, strokeColor = '#FFFFFF', imageSeriesTemplate) {
    const circle = imageSeriesTemplate.createChild(am4core.Circle);
    circle.radius = 6;
    circle.fill = am4core.color(fillColor);
    circle.stroke = am4core.color(strokeColor);
    circle.strokeWidth = 1;
    circle.nonScaling = true;
    circle.events.on('hit', (e) => {
      const description = e.target.dataItem.dataContext.description ? e.target.dataItem.dataContext.description : '';
      e.target.tooltip.openModal(
        `<strong>${e.target.dataItem.dataContext.name}</strong> - ${description}`
      );
      e.target.tooltip.modal.verticalAlign = 'top';
      e.target.tooltip.modal.defaultStyles = true;
      this.circleClick(e);
    });
    return circle;
  }

  public circleClick(e) {
    this.currentPlace = e.target.dataItem.dataContext;
    this.currentCountry = undefined;
    this.getInformationAboutPlace();
  }

  public getInformationAboutPlace() {
    this.zone.run(() => {
      if (this.currentPlace.handicraftsRelated.length > 0) {
        this.searchHandicrafts = this.handicrafts.filter(handicraft => {
          return this.currentPlace.handicraftsRelated.indexOf(handicraft.id) >= 0;
        });
      }
    });
  }

  public zoomToClick(ev) {
    this.tiamiquiMap.goHome();
    setTimeout(() => {
      ev.target.series.chart.zoomToMapObject(ev.target, 4);
    }, 100);
  }

  public createMapPolygonSeries(map) {
    return map.series.push(new am4maps.MapPolygonSeries());
  }

  public createButtonsOnMap() {
    const button = this.setButton(this.tiamiquiMap.chartContainer.createChild(am4core.Button));
    button.events.on('hit', () => {
      this.resetView();
    });
  }

  public gethandiCraftImage(handicraft) {
    return this._sanitizer.bypassSecurityTrustStyle(`background: url("${handicraft[0].url}");`);
  }

  public onChangePage(pageOfItems: Array<Handicraft>) {
    this.pageOfItems = pageOfItems;
  }

  public goHandicraft(handicraftLink) {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/artesania/${handicraftLink}`]);
    });
  }

  public resetView() {
    this.searchHandicrafts = this.handicrafts;
    this.tiamiquiMap.goHome();
    this.tiamiquiMap.closeModal();
    // @ts-ignore
    window.scrollTo(0, 0);
    this.currentCountry = undefined;
    this.currentPlace = undefined;
    this.hidePoints();
  }

  public setButton(button) {
    button.padding(5, 5, 5, 5);
    button.align = 'right';
    button.marginRight = 15;
    button.icon = new am4core.Sprite();
    button.icon.path = 'M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8';
    return button;
  }

  public addBackgroundImageOnMap(image: string) {
    const bgSeries = this.tiamiquiMap.series.push(new am4maps.MapImageSeries());
    bgSeries.toBack();
    const bgImage = bgSeries.mapImages.template.createChild(am4core.Image);
    bgImage.propertyFields.href = 'src';
    bgSeries.data = [{
      src: image
    }];
  }

  public async initInfo() {
    const information = await this.getInformationForMap();
    this.places = this.processPlaces(information[0]);
    this.artisans = this.processArtisans(information[1]);
    this.handicrafts = this.processHandicrafts(information[2]);
    this.searchHandicrafts = this.handicrafts;
    this.types = this.processTypeOfHandicraft(information[3]);
    this.materials = this.processMaterials(information[4]);
    this.ethnicGroups = this.processEthnicGroups(information[5]);
    this.languages = this.processLanguages(information[6]);
    this.idioms = this.processIdiom(information[7]);
    this.states = this.processStates(information[8]);
    this.branches = this.processBranches(information[9]);
  }

  public processPlaces(places) {
    const placeInfo: Place[] = [];
    places.forEach(place => {
      placeInfo.push({
        latitude: parseFloat(place.fields.latitud),
        longitude: parseFloat(place.fields.longitud),
        id: place.id,
        name: place.fields.Localidad,
        video: place.fields.video,
        description: place.fields.descripcion,
        handicraftsRelated: place.fields.artesania
      });
    });
    return placeInfo;
  }

  public processArtisans(artisans) {
    const artisansInfo: Artisan[] = [];
    artisans.forEach(artisan => {
      artisansInfo.push({
        id: artisan.id,
        name: `${artisan.fields.nombre} ${artisan.fields.apellidoPaterno} ${artisan.fields.apellidoMaterno}`,
        ethnicGroup: artisan.fields.grupo[0],
        idiom: artisan.fields.Lengua[0],
        image: artisan.fields.imagen[0].url,
        language: artisan.fields.idioma[0]
      });
    });
    return artisansInfo;
  }

  public processHandicrafts(handicrafts) {
    const handicraftInfo: Handicraft[] = [];
    handicrafts.forEach(handicraft => {
      handicraftInfo.push({
        id: handicraft.id,
        airtableId: handicraft.fields.Id,
        name: `${handicraft.fields.nombre}`,
        image: handicraft.fields.imagen[0].url,
        type: handicraft.fields.tipo,
        artisan: handicraft.fields.Artesano[0],
        images: handicraft.fields.imagen,
        link: `${handicraft.id}`,
        state: handicraft.fields.estado,
        materials: handicraft.fields.materiales,
        branches: handicraft.fields.ramas,
        originPlace: handicraft.fields.lugarelaboracion[0],
      });
    });
    return handicraftInfo.sort((a, b) => a.airtableId > b.airtableId ? - 1 : 1).reverse();
  }

  public processTypeOfHandicraft(types) {
    const typeInfo: Type[] = [];
    types.forEach(type => {
      typeInfo.push({
        id: type.id,
        name: type.fields.tipo
      });
    });
    return typeInfo;
  }

  public processMaterials(materials) {
    const materialsInfo: Material[] = [];
    materials.forEach(material => {
      materialsInfo.push({
        id: material.id,
        material: material.fields.material
      });
    });
    return materialsInfo;
  }

  public processEthnicGroups(ethnicGroups) {
    const ethnicGroupInfo: EthnicGroup[] = [];
    ethnicGroups.forEach(ethnic => {
      ethnicGroupInfo.push({
        id: ethnic.id,
        name: ethnic.fields.grupo
      });
    });
    return ethnicGroupInfo;
  }

  public processLanguages(languages) {
    const languagesInfo: Language[] = [];
    languages.forEach(language => {
      languagesInfo.push({
        id: language.id,
        language: language.fields.idioma
      });
    });
    return languagesInfo;
  }

  public processStates(states) {
    const processStateInfo: State[] = [];
    states.forEach(state => {
      processStateInfo.push({
        id: state.fields.id,
        codeState: state.id,
        description: state.fields.descripcion,
        handicraftsRelated: state.fields.Artesania,
        name: state.fields.name,
        image: state.fields.imagen ? state.fields.imagen[0].url : ''
      });
    });
    processStateInfo.map(state => {
      const searchInConfig = config.states.find(configState => configState.id === state.id);
      if (searchInConfig) {
        state.madeFromGeoData = true;
        state.colorFill = '#0094ed';
      }
    });
    return processStateInfo;
  }

  public processBranches(branches) {
    const branchesInfo: Branch[] = [];
    branches.forEach(branch => {
      branchesInfo.push({
        id: branch.id,
        name: branch.fields.rama
      });
    });
    return branchesInfo;
  }

  public processIdiom(idioms) {
    const idiomsInfo: Idiom[] = [];
    idioms.forEach(branch => {
      idiomsInfo.push({
        id: branch.id,
        name: branch.fields.rama
      });
    });
    return idiomsInfo;
  }

  public async getInformationForMap() {
    const placesPromise = this.apiService.getInfo('LugaresElaboracion');
    const artisansPromise = this.apiService.getInfo('Artesano');
    const handicraftsPromise = this.apiService.getInfo('Artesania');
    const handicraftTypesPromise = this.apiService.getInfo('TipoArtesania');
    const materialsPromise = this.apiService.getInfo('Material');
    const groupEthnicPromise = this.apiService.getInfo('GrupoEtnico');
    const languagePromise = this.apiService.getInfo('Idioma');
    const idiomPromise = this.apiService.getInfo('Lengua');
    const statesPromise = this.apiService.getInfo('Estados');
    const branchesPromise = this.apiService.getInfo('Ramas');
    return await Promise.all([
      placesPromise,
      artisansPromise,
      handicraftsPromise,
      handicraftTypesPromise,
      materialsPromise,
      groupEthnicPromise,
      languagePromise,
      idiomPromise,
      statesPromise,
      branchesPromise
    ]);

  }
}

