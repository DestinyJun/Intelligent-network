import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFaultComponent } from './modal-fault.component';

describe('ModalFaultComponent', () => {
  let component: ModalFaultComponent;
  let fixture: ComponentFixture<ModalFaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
