import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpointSummaryComponent } from './checkpoint-summary.component';

describe('CheckpointSummaryComponent', () => {
  let component: CheckpointSummaryComponent;
  let fixture: ComponentFixture<CheckpointSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckpointSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpointSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
