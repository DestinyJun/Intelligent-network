import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisposedComponent } from './disposed.component';

describe('DisposedComponent', () => {
  let component: DisposedComponent;
  let fixture: ComponentFixture<DisposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
