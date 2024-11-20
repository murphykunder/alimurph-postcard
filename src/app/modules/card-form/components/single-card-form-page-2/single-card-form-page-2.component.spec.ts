import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCardFormPage2Component } from './single-card-form-page-2.component';

describe('SingleCardFormPage2Component', () => {
  let component: SingleCardFormPage2Component;
  let fixture: ComponentFixture<SingleCardFormPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCardFormPage2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCardFormPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
