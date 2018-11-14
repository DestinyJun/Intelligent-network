import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionAllComponent } from './inspection-all.component';

describe('InspectionAllComponent', () => {
  let component: InspectionAllComponent;
  let fixture: ComponentFixture<InspectionAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
