import { TestBed, inject } from '@angular/core/testing';

import { BigDataService } from './big-data.service';

describe('BigDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BigDataService]
    });
  });

  it('should be created', inject([BigDataService], (service: BigDataService) => {
    expect(service).toBeTruthy();
  }));
});
