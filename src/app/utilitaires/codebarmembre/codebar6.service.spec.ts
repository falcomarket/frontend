import { TestBed } from '@angular/core/testing';

import { Codebar6MembreService } from './codebar6.service';

describe('Codebar6Service', () => {
  let service: Codebar6MembreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Codebar6MembreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
