import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoMembreComponent } from './perso-membre.component';

describe('PersoMembreComponent', () => {
  let component: PersoMembreComponent;
  let fixture: ComponentFixture<PersoMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersoMembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersoMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
