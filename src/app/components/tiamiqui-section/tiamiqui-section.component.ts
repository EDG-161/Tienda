import {Component, Input, NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiamiqui-section',
  templateUrl: './tiamiqui-section.component.html',
  styleUrls: ['./tiamiqui-section.component.scss']
})
export class TiamiquiSectionComponent {
  @Input() title: string;
  @Input() items: any;
  @Input() baseUrl: any;

  constructor(private zone: NgZone, private router: Router) {
  }

  goTo(item) {
    if (this.baseUrl === 'artesania') {
      this.zone.run(() => {
        window.scroll(0, 0);
        this.router.navigate([`/${this.baseUrl}/${item.id}`]);
      });
    }
  }

}
