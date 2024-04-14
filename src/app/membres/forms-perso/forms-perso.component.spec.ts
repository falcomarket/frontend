import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPersoComponent } from './forms-perso.component';

describe('FormsPersoComponent', () => {
  let component: FormsPersoComponent;
  let fixture: ComponentFixture<FormsPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsPersoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
