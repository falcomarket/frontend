import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureDialogueComponent } from './signature-dialogue.component';

describe('SignatureDialogueComponent', () => {
  let component: SignatureDialogueComponent;
  let fixture: ComponentFixture<SignatureDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignatureDialogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignatureDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
