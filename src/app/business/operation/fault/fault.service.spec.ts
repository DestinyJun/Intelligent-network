import { TestBed, inject } from '@angular/core/testing';

import { FaultService } from './fault.service';

describe('FaultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaultService]
    });
  });

  it('should be created', inject([FaultService], (service: FaultService) => {
    expect(service).toBeTruthy();
  }));
});
