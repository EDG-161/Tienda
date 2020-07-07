import { Component, OnInit } from '@angular/core';
import {Food} from '../food';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from '../../../api.service';
import {UtilsService} from '../../../common/utils.service';

@Component({
  selector: 'app-all-food',
  templateUrl: './all-food.component.html',
  styleUrls: ['./all-food.component.scss']
})
export class AllFoodComponent implements OnInit {

  public foods: Food[] = [];
  public load: boolean;
  public active: any;

  constructor( private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.active = this.route.snapshot.paramMap.get('id');
        this.load = true;
        this.getAllFood();
      }
    });
  }

  getFood() {
    return new Promise((solve, reject) => {
      this.apiService.getBaseData('Platillos').then(result => {
        solve(result);
      });
    });
  }

  cleanData(information ) {
    information.forEach(food => {
      const foodImage = food.fields.imagen ? food.fields.imagen[0] : {};
      this.foods.push({
        id: food.id,
        images: foodImage.url,
        content: food.fields.contenido,
        name: food.fields.nombre
      });
    });
  }

  sort(value) {
    this.foods = UtilsService.sort(this.foods, value, 'name');
  }

  getAllFood() {
    this.getFood().then(data => {
      this.cleanData(data);
      // @ts-ignore
      this.load = false;
    });
  }

  ngOnInit() {
  }

}
