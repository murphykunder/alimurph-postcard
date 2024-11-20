import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleCardFormPage1Component } from '../../components/single-card-form-page-1/single-card-form-page-1.component';
import { SingleCardFormPage2Component } from '../../components/single-card-form-page-2/single-card-form-page-2.component';
import { SingleCardFormPage3Component } from '../../components/single-card-form-page-3/single-card-form-page-3.component';
import { PostcardService } from '../../../../services/services';
import { PostcardCreateResponse } from '../../../../services/models';
import { ModalContentComponent } from '../../components/modals/modal-content/modal-content.component';

@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [CommonModule, NgbNavModule, SingleCardFormPage1Component, SingleCardFormPage2Component, SingleCardFormPage3Component],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SingleCardComponent {

  public active: number = 1;
  public birthdayForm!: FormGroup;
  public isSubmitting: boolean = false;
  public cardId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private postcardService: PostcardService,
    private modalService: NgbModal
  ) {
    this.birthdayForm = this.formBuilder.group({
      from: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      to: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      occasion: ['', [Validators.required]],
      audio: [''],
      message: ['']
    });
  }

  onNext() {
    this.active += 1;
  }

  onReturn() {
    if (this.active > 1) {
      this.active -= 1;
    }
  }

  createCard() {
    this.cardId = '';
    if(this.birthdayForm.valid){
      this.isSubmitting = true;
      this.postcardService.createCard({
        body: this.birthdayForm.value
      })
      .subscribe({
        next: (response: PostcardCreateResponse) => {
          this.isSubmitting = false;
          this.cardId = (response.cardId) ? response.cardId : '';
          if(this.cardId){
            this.onSuccess();
          }
          else{
            this.onError();
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.onError();
        }
      });
    }
  }

  onSuccess(){
    const cardUrl = window.location.protocol + "//" + window.location.host + "/card/" + this.cardId;
    const modalRef = this.modalService.open(ModalContentComponent, { centered: true });
    modalRef.componentInstance.cardUrl = cardUrl;
  }

  onError(){
    const modalRef = this.modalService.open(ModalContentComponent, {centered: true});
    modalRef.componentInstance.errorMessage = "An error occurred while creating the card. Please try again after sometime.";
  }

}
