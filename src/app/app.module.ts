import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GalleryModule} from '@ngx-gallery/core';
import {LightboxModule} from '@ngx-gallery/lightbox';
import {GallerizeModule} from '@ngx-gallery/gallerize';
import {MatTabsModule} from '@angular/material/tabs';
import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatProgressBarModule, MatTooltipModule, MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArtesaniaComponent} from './artesania/artesania.component';
import {DialogOverviewExampleDialog} from './artesania/artesania.component';
import {TiamiquiCarouselComponent} from './components/tiamiqui-carousel/tiamiqui-carousel.component';
import {TiamiquiSectionComponent} from './components/tiamiqui-section/tiamiqui-section.component';
import {MapComponent} from './map/map.component';
import {TiamiquiProductComponent} from './components/tiamiqui-product/tiamiqui-product.component';
import {TiamiquiArtisanComponent} from './components/tiamiqui-artisan/tiamiqui-artisan.component';
import {NewsComponent} from './news/news.component';
import {ArtisanComponent} from './artisan/artisan.component';
import {PlaceComponent} from './place/place.component';
import {MarkdownModule} from 'ngx-markdown';
import {TiamiquiLeftSidebarComponent} from './components/tiamiqui-left-sidebar/tiamiqui-left-sidebar.component';
import {TiamiquiPaginateComponent} from './components/tiamiqui-paginate/tiamiqui-paginate.component';
import {NewComponent} from './new/new.component';
import { ArtisanCarruselComponent } from './artesania/artisan-carrousel/artisan-carrusel.component';
import { PlaceCarrouselComponent } from './artesania/place-carrousel/place-carrousel.component';
import { ArtisanPageComponent } from './artisan-page/artisan-page.component';
import { HelpComponent } from './help/help.component';
import { ArtisanHistoriesComponent } from './carouselPages/artisan-histories/artisan-histories/artisan-histories.component';
import { EthnicGroupsComponent } from './carouselPages/ethnic-groups/ethnic-groups/ethnic-groups.component';
import { HandicraftsHistoriesComponent } from './carouselPages/handicrafts-histories/handicrafts-histories/handicrafts-histories.component';
import { PlaceHistoriesComponent } from './carouselPages/place-histories/place-histories/place-histories.component';
import {
  ArtisanHistoriesDetailComponent
} from './carouselPages/artisan-histories/artisan-histories-detail/artisan-histories-detail.component';
import { PlaceHistoriesDetailComponent } from './carouselPages/place-histories/place-histories-detail/place-histories-detail.component';
import {
  HandicraftsHistoriesDetailComponent
} from './carouselPages/handicrafts-histories/handicrafts-histories-detail/handicrafts-histories-detail.component';
import { AllComponent } from './all/all.component';
import { EthnicGroupsDetailComponent } from './carouselPages/ethnic-groups/ethnic-groups-detail/ethnic-groups-detail.component';
import {AutoCompleteModule, CarouselModule} from 'primeng';
import { AllFoodComponent } from './carouselPages/food/all-food/all-food.component';
import { FoodDetailComponent } from './carouselPages/food/food-detail/food-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ArtesaniaComponent,
    DialogOverviewExampleDialog,
    TiamiquiCarouselComponent,
    TiamiquiSectionComponent,
    MapComponent,
    TiamiquiProductComponent,
    TiamiquiArtisanComponent,
    NewsComponent,
    ArtisanComponent,
    PlaceComponent,
    TiamiquiLeftSidebarComponent,
    TiamiquiPaginateComponent,
    NewComponent,
    ArtisanCarruselComponent,
    PlaceCarrouselComponent,
    ArtisanPageComponent,
    HelpComponent,
    ArtisanHistoriesComponent,
    EthnicGroupsComponent,
    HandicraftsHistoriesComponent,
    PlaceHistoriesComponent,
    ArtisanHistoriesDetailComponent,
    PlaceHistoriesDetailComponent,
    HandicraftsHistoriesDetailComponent,
    AllComponent,
    EthnicGroupsDetailComponent,
    AllFoodComponent,
    FoodDetailComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatDialogModule,
    LightboxModule,
    MatInputModule,
    GalleryModule.withConfig({
      loadingMode: 'indeterminate'
    }),
    GallerizeModule,
    MatTabsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    FormsModule,
    MarkdownModule.forRoot(),
    CarouselModule,
    AutoCompleteModule
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
