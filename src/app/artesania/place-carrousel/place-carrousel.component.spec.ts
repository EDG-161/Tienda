import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCarrouselComponent } from './place-carrousel.component';

describe('PlaceCarrouselComponent', () => {
  let component: PlaceCarrouselComponent;
  let fixture: ComponentFixture<PlaceCarrouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceCarrouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
