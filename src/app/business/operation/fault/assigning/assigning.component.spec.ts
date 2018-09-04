import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssigningComponent } from './assigning.component';

describe('AssigningComponent', () => {
  let component: AssigningComponent;
  let fixture: ComponentFixture<AssigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
