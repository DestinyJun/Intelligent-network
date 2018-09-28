import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BursterComponent } from './burster.component';

describe('BursterComponent', () => {
  let component: BursterComponent;
  let fixture: ComponentFixture<BursterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BursterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BursterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
