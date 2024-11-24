import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessageContainerComponent } from './flash-message-container.component';

describe('FlashMessageContainerComponent', () => {
  let component: FlashMessageContainerComponent;
  let fixture: ComponentFixture<FlashMessageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashMessageContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlashMessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
