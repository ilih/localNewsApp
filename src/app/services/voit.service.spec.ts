import { TestBed, inject } from '@angular/core/testing';

import { VoitService } from './voit.service';

describe('VoitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoitService]
    });
  });

  it('should be created', inject([VoitService], (service: VoitService) => {
    expect(service).toBeTruthy();
  }));
});
