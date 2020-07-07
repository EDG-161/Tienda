import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiamiquiSectionComponent } from './tiamiqui-section.component';

describe('TiamiquiSectionComponent', () => {
  let component: TiamiquiSectionComponent;
  let fixture: ComponentFixture<TiamiquiSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiamiquiSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiamiquiSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
