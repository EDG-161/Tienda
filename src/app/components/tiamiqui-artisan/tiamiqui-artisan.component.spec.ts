import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiamiquiArtisanComponent } from './tiamiqui-artisan.component';

describe('TiamiquiArtisanComponent', () => {
  let component: TiamiquiArtisanComponent;
  let fixture: ComponentFixture<TiamiquiArtisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiamiquiArtisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiamiquiArtisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
