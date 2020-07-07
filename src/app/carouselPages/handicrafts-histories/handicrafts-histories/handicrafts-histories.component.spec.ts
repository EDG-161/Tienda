import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicraftsHistoriesComponent } from './handicrafts-histories.component';

describe('HandicraftsHistoriesComponent', () => {
  let component: HandicraftsHistoriesComponent;
  let fixture: ComponentFixture<HandicraftsHistoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandicraftsHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicraftsHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
