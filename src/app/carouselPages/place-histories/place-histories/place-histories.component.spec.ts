import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceHistoriesComponent } from './place-histories.component';

describe('PlaceHistoriesComponent', () => {
  let component: PlaceHistoriesComponent;
  let fixture: ComponentFixture<PlaceHistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
