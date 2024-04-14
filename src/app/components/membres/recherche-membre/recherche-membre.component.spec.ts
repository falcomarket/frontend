import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheMembreComponent } from './recherche-membre.component';

describe('RechercheMembreComponent', () => {
  let component: RechercheMembreComponent;
  let fixture: ComponentFixture<RechercheMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheMembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechercheMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
