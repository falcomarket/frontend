import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementsMembeComponent } from './paiements-membe.component';

describe('PaiementsMembeComponent', () => {
  let component: PaiementsMembeComponent;
  let fixture: ComponentFixture<PaiementsMembeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaiementsMembeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaiementsMembeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
