import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TiamiquiLeftSidebarComponent} from './tiamiqui-left-sidebar.component';

describe('TiamiquiLeftSidebarComponent', () => {
  let component: TiamiquiLeftSidebarComponent;
  let fixture: ComponentFixture<TiamiquiLeftSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TiamiquiLeftSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiamiquiLeftSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
