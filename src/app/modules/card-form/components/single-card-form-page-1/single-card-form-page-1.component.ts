import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';

@Component({
  selector: 'app-single-card-form-page-1',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldErrorComponent, NavButtonComponent],
  templateUrl: './single-card-form-page-1.component.html',
  styleUrl: './single-card-form-page-1.component.scss'
})
export class SingleCardFormPage1Component {

  public isSubmitted: boolean = false;
  @Input() birthdayForm!: FormGroup;
  @Output() next = new EventEmitter();

  get from(){
    return this.birthdayForm.get('from');
  }

  get to(){
    return this.birthdayForm.get('to');
  }

  get occasion(){
    return this.birthdayForm.get('occasion');
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.from?.valid && this.to?.valid && this.occasion?.valid){
      this.next.emit();
    }
  }

}
