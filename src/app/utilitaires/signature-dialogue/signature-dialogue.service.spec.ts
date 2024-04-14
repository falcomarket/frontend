import { TestBed } from '@angular/core/testing';

import { SignatureDialogueService } from '../signature-dialogue.service';

describe('SignatureDialogueService', () => {
  let service: SignatureDialogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignatureDialogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
