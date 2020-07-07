import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TiamiquiPaginateComponent} from './tiamiqui-paginate.component';

describe('TiamiquiPaginateComponent', () => {
  let component: TiamiquiPaginateComponent;
  let fixture: ComponentFixture<TiamiquiPaginateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TiamiquiPaginateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiamiquiPaginateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
