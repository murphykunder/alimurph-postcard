import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardFormPage3Component } from './single-card-form-page-3.component';

describe('SingleCardFormPage3Component', () => {
  let component: SingleCardFormPage3Component;
  let fixture: ComponentFixture<SingleCardFormPage3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardFormPage3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCardFormPage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
