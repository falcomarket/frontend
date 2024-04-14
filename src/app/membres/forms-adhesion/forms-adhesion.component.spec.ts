import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsAdhesionComponent } from './forms-adhesion.component';

describe('FormsAdhesionComponent', () => {
  let component: FormsAdhesionComponent;
  let fixture: ComponentFixture<FormsAdhesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsAdhesionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsAdhesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
