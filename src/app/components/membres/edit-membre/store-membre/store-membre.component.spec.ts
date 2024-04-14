import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMembreComponent } from './store-membre.component';

describe('StoreMembreComponent', () => {
  let component: StoreMembreComponent;
  let fixture: ComponentFixture<StoreMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreMembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
