import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardFormPage1Component } from './single-card-form-page-1.component';

describe('SingleCardFormPage1Component', () => {
  let component: SingleCardFormPage1Component;
  let fixture: ComponentFixture<SingleCardFormPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardFormPage1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCardFormPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
