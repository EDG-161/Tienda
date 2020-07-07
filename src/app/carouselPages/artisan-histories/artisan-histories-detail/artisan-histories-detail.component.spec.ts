import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanHistoriesDetailComponent } from './artisan-histories-detail.component';

describe('ArtisanHistoriesDetailComponent', () => {
  let component: ArtisanHistoriesDetailComponent;
  let fixture: ComponentFixture<ArtisanHistoriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtisanHistoriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanHistoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
