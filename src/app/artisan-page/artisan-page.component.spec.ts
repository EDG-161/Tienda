import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanPageComponent } from './artisan-page.component';

describe('ArtisanPageComponent', () => {
  let component: ArtisanPageComponent;
  let fixture: ComponentFixture<ArtisanPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtisanPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
