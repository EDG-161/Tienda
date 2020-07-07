import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EthnicGroupsComponent } from './ethnic-groups.component';

describe('EthnicGroupsComponent', () => {
  let component: EthnicGroupsComponent;
  let fixture: ComponentFixture<EthnicGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EthnicGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EthnicGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
