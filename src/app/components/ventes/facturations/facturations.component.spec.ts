import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturationsComponent } from './facturations.component';

describe('FacturationsComponent', () => {
  let component: FacturationsComponent;
  let fixture: ComponentFixture<FacturationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacturationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
