import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicGroupsDetailComponent } from './ethnic-groups-detail.component';

describe('EthnicGroupsDetailComponent', () => {
  let component: EthnicGroupsDetailComponent;
  let fixture: ComponentFixture<EthnicGroupsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthnicGroupsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthnicGroupsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
