import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SingleCardFormPage1Component } from '../../components/single-card-form-page-1/single-card-form-page-1.component';
import { SingleCardFormPage2Component } from '../../components/single-card-form-page-2/single-card-form-page-2.component';
import { SingleCardFormPage3Component } from '../../components/single-card-form-page-3/single-card-form-page-3.component';
import { ModalContentComponent } from '../../../../components/modals/modal-content/modal-content.component';
import { CardService } from '../../../../services/card.service';
import { FlashMessageService } from '../../../../services/flash-message.service';

@Component({
  selector: 'app-single-card',
  standalone: true,
  imports: [CommonModule, NgbNavModule, SingleCardFormPage1Component, SingleCardFormPage2Component, SingleCardFormPage3Component],
  templateUrl: './single-card.component.html',
  styleUrl: './single-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SingleCardComponent{

  public active: number = 1;
  public birthdayForm!: FormGroup;
  public isSubmitting: boolean = false;
  public isDownloading: boolean = false;
  public cardUrl: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private cardService: CardService,
    private flashMessageService: FlashMessageService
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

  createCard(){
    this.cardUrl = undefined;
    if(this.birthdayForm.valid){
      this.isSubmitting = true;
      this.cardService.createCard(this.birthdayForm.value)
      .subscribe({
        next: (response: string|undefined) => {
          this.isSubmitting = false;
          if(response){
            this.cardUrl = response;
            this.onSuccess();
          }
          else{
            this.onError("Error ocurred while creating the card. Please try again after sometime");
          }
        },
        error: () => {
          this.isSubmitting = false;
          this.onError("Error ocurred while creating the card. Please try again after sometime");
        },
      });
    }
  }

  exportCard(){
    if(this.birthdayForm.valid){
      this.isDownloading = true;
      this.cardService.exportCard(this.birthdayForm.value)
      .subscribe({
        next: (result: boolean) => {
          if(!result){
            this.onError("Error ocurred while generating the Pdf. Please try again after sometime");
          }
          this.isDownloading = false;
        },
        error: () => {
          this.isDownloading = false;
          this.onError("Error ocurred while generating the Pdf. Please try again after sometime");
        },
      });
    }
  }

  onSuccess(){
    const modalRef = this.modalService.open(ModalContentComponent, { centered: true });
    modalRef.componentInstance.cardUrl = this.cardUrl;
  }

  onError(message: string){
    this.flashMessageService.show({flashMessage: message , className: 'flash-message-error', delay: 5000})
  }

}
