import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonFaultComponent } from './common-fault.component';

describe('CommonFaultComponent', () => {
  let component: CommonFaultComponent;
  let fixture: ComponentFixture<CommonFaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonFaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
