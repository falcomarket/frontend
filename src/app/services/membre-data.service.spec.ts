import { TestBed } from '@angular/core/testing';

import { MembreDataService } from './membre-data.service';

describe('MembreDataService', () => {
  let service: MembreDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
