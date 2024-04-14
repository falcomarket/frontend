import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPaiementComponent } from './forms-paiement.component';

describe('FormsPaiementComponent', () => {
  let component: FormsPaiementComponent;
  let fixture: ComponentFixture<FormsPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsPaiementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
