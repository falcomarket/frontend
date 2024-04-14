import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebarmembreComponent } from './codebarmembre.component';

describe('CodebarmembreComponent', () => {
  let component: CodebarmembreComponent;
  let fixture: ComponentFixture<CodebarmembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodebarmembreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodebarmembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
