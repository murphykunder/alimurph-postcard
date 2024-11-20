import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

/**
 * Create a custom validator to limit the number of characters - ckeditor.validator.ts.
 * The validation function should accept AbstractControl data type parameter as input argument and
 * return ValidationErrors | null object. The ValidationErrors object can have any attributes.
 * In this file we define a function ckEditorMaxLength which will return the validator function to
 * use on the form element. ckEditorMaxLength is itself not a validator function.
 */

export function ckEditorMaxLength(getInputTextLength: () => Number, maxLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return (getInputTextLength() as number > maxLength) ? {ckEditorMaxLength: {value: maxLength}} : null;
  };
}

export function ckEditorMinLength(getInputTextLength: () => number, minLength: number){
  return (control: AbstractControl): ValidationErrors | null => {
    return (getInputTextLength() as number < minLength) ? {ckEditorMinLength: {value: minLength}} : null;
  }
}