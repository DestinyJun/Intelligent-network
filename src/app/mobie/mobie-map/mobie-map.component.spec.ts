import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobieMapComponent } from './mobie-map.component';

describe('MobieMapComponent', () => {
  let component: MobieMapComponent;
  let fixture: ComponentFixture<MobieMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobieMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobieMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
