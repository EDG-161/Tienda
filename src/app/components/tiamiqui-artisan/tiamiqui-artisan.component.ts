import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiamiqui-artisan',
  templateUrl: './tiamiqui-artisan.component.html',
  styleUrls: ['./tiamiqui-artisan.component.scss']
})
export class TiamiquiArtisanComponent implements OnInit {

  @Input() item: any;
  constructor(private zone: NgZone, private router: Router) { }

  ngOnInit() {
    console.log(this.item);
  }

  goTo() {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/artesano/${this.item.id}`]);
    });
  }

}
