import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiamiqui-left-sidebar',
  templateUrl: './tiamiqui-left-sidebar.component.html',
  styleUrls: ['./tiamiqui-left-sidebar.component.scss']
})
export class TiamiquiLeftSidebarComponent implements OnInit {
  public pageLoaded = '';
  public hideLeft = false;

  constructor(private router: Router) {

  }

  isVisible() {
    if (!this.pageLoaded) {
      this.pageLoaded = window.location.pathname.split('/')[1];
    }
    return this.pageLoaded === 'home';
  }

  ngOnInit() {
  }


  toggleLeft() {
    this.hideLeft = !this.hideLeft;
  }

}
