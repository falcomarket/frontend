import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementsMembreComponent } from './paiements-membre.component';

describe('PaiementsMembreComponent', () => {
  let component: PaiementsMembreComponent;
  let fixture: ComponentFixture<PaiementsMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementsMembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiementsMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
