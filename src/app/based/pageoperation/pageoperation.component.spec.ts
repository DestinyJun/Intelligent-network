import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageoperationComponent } from './pageoperation.component';

describe('PageoperationComponent', () => {
  let component: PageoperationComponent;
  let fixture: ComponentFixture<PageoperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageoperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
