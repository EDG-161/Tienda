import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiamiquiCarouselComponent } from './tiamiqui-carousel.component';

describe('TiamiquiCarouselComponent', () => {
  let component: TiamiquiCarouselComponent;
  let fixture: ComponentFixture<TiamiquiCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiamiquiCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiamiquiCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
