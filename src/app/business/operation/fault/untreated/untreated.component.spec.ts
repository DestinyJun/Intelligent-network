import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UntreatedComponent } from './untreated.component';

describe('UntreatedComponent', () => {
  let component: UntreatedComponent;
  let fixture: ComponentFixture<UntreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UntreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UntreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
