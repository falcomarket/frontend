import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesMembreComponent } from './acces-membre.component';

describe('AccesMembreComponent', () => {
  let component: AccesMembreComponent;
  let fixture: ComponentFixture<AccesMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccesMembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
