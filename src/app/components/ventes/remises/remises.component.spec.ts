import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemisesComponent } from './remises.component';

describe('RemisesComponent', () => {
  let component: RemisesComponent;
  let fixture: ComponentFixture<RemisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
