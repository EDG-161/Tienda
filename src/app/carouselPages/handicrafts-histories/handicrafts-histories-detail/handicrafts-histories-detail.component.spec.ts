import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicraftsHistoriesDetailComponent } from './handicrafts-histories-detail.component';

describe('HandicraftsHistoriesDetailComponent', () => {
  let component: HandicraftsHistoriesDetailComponent;
  let fixture: ComponentFixture<HandicraftsHistoriesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandicraftsHistoriesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicraftsHistoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
