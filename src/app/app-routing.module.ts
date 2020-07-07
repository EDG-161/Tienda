import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ArtesaniaComponent} from './artesania/artesania.component';
import {MapComponent} from './map/map.component';
import {NewsComponent} from './news/news.component';
import {ArtisanComponent} from './artisan/artisan.component';
import {PlaceComponent} from './place/place.component';
import {TiamiquiLeftSidebarComponent} from './components/tiamiqui-left-sidebar/tiamiqui-left-sidebar.component';
import {NewComponent} from './new/new.component';
import {ArtisanPageComponent} from './artisan-page/artisan-page.component';
import {HelpComponent} from './help/help.component';
import {ArtisanHistoriesComponent} from './carouselPages/artisan-histories/artisan-histories/artisan-histories.component';
import {PlaceHistoriesComponent} from './carouselPages/place-histories/place-histories/place-histories.component';
import {HandicraftsHistoriesComponent} from './carouselPages/handicrafts-histories/handicrafts-histories/handicrafts-histories.component';
import {EthnicGroupsComponent} from './carouselPages/ethnic-groups/ethnic-groups/ethnic-groups.component';
import {
  ArtisanHistoriesDetailComponent
} from './carouselPages/artisan-histories/artisan-histories-detail/artisan-histories-detail.component';
import {PlaceHistoriesDetailComponent} from './carouselPages/place-histories/place-histories-detail/place-histories-detail.component';
import {
  HandicraftsHistoriesDetailComponent
} from './carouselPages/handicrafts-histories/handicrafts-histories-detail/handicrafts-histories-detail.component';
import {AllComponent} from './all/all.component';
import {EthnicGroupsDetailComponent} from './carouselPages/ethnic-groups/ethnic-groups-detail/ethnic-groups-detail.component';
import {AllFoodComponent} from './carouselPages/food/all-food/all-food.component';
import {FoodDetailComponent} from './carouselPages/food/food-detail/food-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about/:content', component: AboutComponent},
  {path: 'about', component: AboutComponent},
  {path: 'help/:content', component: HelpComponent},
  {path: 'help', component: HelpComponent},
  {path: 'map', component: MapComponent},
  {path: 'new/:id', component: NewComponent},
  {path: 'news', component: NewsComponent},

  {path: 'food', component: AllFoodComponent},
  {path: 'food/:id', component: FoodDetailComponent},
  {path: 'artisanHistories', component: ArtisanHistoriesComponent},
  {path: 'artisanHistories/:id', component: ArtisanHistoriesDetailComponent},
  {path: 'placeHistories', component: PlaceHistoriesComponent},
  {path: 'placeHistories/:id', component: PlaceHistoriesDetailComponent},
  {path: 'handicraftsHistories', component: HandicraftsHistoriesComponent},
  {path: 'handicraftsHistories/:id', component: HandicraftsHistoriesDetailComponent},
  {path: 'ethnicGroups', component: EthnicGroupsComponent},
  {path: 'ethnicGroups/:id', component: EthnicGroupsDetailComponent},
  {path: 'collection', component: AllComponent},

  {path: 'artisan/:id', component: ArtisanComponent},
  {path: 'artesano/:id', component: ArtisanPageComponent},
  {path: 'place/:id', component: PlaceComponent},
  {path: 'artesania/:id', component: ArtesaniaComponent},
  {path: '', component: TiamiquiLeftSidebarComponent, outlet: 'sidebar'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
