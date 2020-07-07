import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiamiquiProductComponent } from './tiamiqui-product.component';

describe('TiamiquiProductComponent', () => {
  let component: TiamiquiProductComponent;
  let fixture: ComponentFixture<TiamiquiProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiamiquiProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiamiquiProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
