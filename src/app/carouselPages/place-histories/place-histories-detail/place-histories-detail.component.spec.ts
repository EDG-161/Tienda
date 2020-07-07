import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceHistoriesDetailComponent } from './place-histories-detail.component';

describe('PlaceHistoriesDetailComponent', () => {
  let component: PlaceHistoriesDetailComponent;
  let fixture: ComponentFixture<PlaceHistoriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceHistoriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceHistoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
