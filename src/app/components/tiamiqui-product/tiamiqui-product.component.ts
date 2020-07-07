import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiamiqui-product',
  templateUrl: './tiamiqui-product.component.html',
  styleUrls: ['./tiamiqui-product.component.scss']
})
export class TiamiquiProductComponent implements OnInit {
  @Input() item: any;
  constructor(private zone: NgZone, private router: Router) { }

  ngOnInit() {
    console.log(this.item);
  }

  goTo() {
    this.zone.run(() => {
      window.scroll(0, 0);
      this.router.navigate([`/artesania/${this.item.id}`]);
    });
  }
}
