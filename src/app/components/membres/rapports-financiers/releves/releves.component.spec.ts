import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevesComponent } from './releves.component';

describe('RelevesComponent', () => {
  let component: RelevesComponent;
  let fixture: ComponentFixture<RelevesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelevesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
