import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanCarruselComponent } from './artisan-carrusel.component';

describe('ArtisanCarruselComponent', () => {
  let component: ArtisanCarruselComponent;
  let fixture: ComponentFixture<ArtisanCarruselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtisanCarruselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanCarruselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
