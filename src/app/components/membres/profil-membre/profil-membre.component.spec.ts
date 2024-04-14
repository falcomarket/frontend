import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMembreComponent } from './profil-membre.component';

describe('ProfilMembreComponent', () => {
  let component: ProfilMembreComponent;
  let fixture: ComponentFixture<ProfilMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilMembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
