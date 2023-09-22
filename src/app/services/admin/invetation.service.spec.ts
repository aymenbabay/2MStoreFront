import { TestBed } from '@angular/core/testing';

import { InvetationService } from './invetation.service';

describe('InvetationService', () => {
  let service: InvetationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvetationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
