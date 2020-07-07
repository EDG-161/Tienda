import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanHistoriesComponent } from './artisan-histories.component';

describe('ArtisanHistoriesComponent', () => {
  let component: ArtisanHistoriesComponent;
  let fixture: ComponentFixture<ArtisanHistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtisanHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
