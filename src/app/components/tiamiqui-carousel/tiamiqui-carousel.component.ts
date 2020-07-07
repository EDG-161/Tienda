import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tiamiqui-carousel',
  templateUrl: './tiamiqui-carousel.component.html',
  styleUrls: ['./tiamiqui-carousel.component.scss']
})
export class TiamiquiCarouselComponent implements OnInit {
  @Input() tiamiquiCarousel;
  public currentIndex = 0;
  public max = 0;
  public activeHover = false;
  constructor() { }

  ngOnInit() {
    this.max = this.tiamiquiCarousel.length - 1;
    // setInterval(() => {
    //   this.next();
    // }, 4000);
    this.setTimeWithEffect();
  }

  setTimeWithEffect() {
    setTimeout(() => {
      this.activeHover = true;
    }, 500);
  }

  changeIndex(e) {
    this.activeHover = false;
    this.currentIndex = e;
    this.setTimeWithEffect();
  }

  previous() {
    this.activeHover = false;
    if (this.currentIndex >= 0) {
      this.currentIndex--;
    }
    if (this.currentIndex === -1) {
      this.currentIndex = this.max;
    }
    this.setTimeWithEffect();
  }

  next() {
    this.activeHover = false;
    if (this.currentIndex <= this.max) {
      this.currentIndex ++;
    }
    if (this.currentIndex > this.max) {
      this.currentIndex = 0;
    }
    this.setTimeWithEffect();
  }
}
