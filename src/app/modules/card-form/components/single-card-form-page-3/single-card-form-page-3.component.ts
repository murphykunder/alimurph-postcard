import {  Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Alignment, Bold, ClassicEditor, Essentials, FontBackgroundColor, FontColor, FontFamily, FontSize, Heading, Italic, Link, Paragraph, Undo, WordCount } from 'ckeditor5';
import { FormFieldErrorComponent } from '../form-field-error/form-field-error.component';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { ckEditorMaxLength, ckEditorMinLength } from '../../validators/ckeditor.validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../../../components/modals/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-single-card-form-page-3',
  standalone: true,
  imports: [CKEditorModule, ReactiveFormsModule, FormFieldErrorComponent, NavButtonComponent],
  templateUrl: './single-card-form-page-3.component.html',
  styleUrl: './single-card-form-page-3.component.scss',
})
export class SingleCardFormPage3Component {

  @Input() birthdayForm!: FormGroup;
  @Input() isSubmitting: boolean = false;
  @Input() isDownloading: boolean = false;
  @Output() return = new EventEmitter();
  @Output() createCard = new EventEmitter();
  @Output() exportCard = new EventEmitter();
  public isSubmitted: boolean = false;
  public messageCharacterCount: number = 0;
  public messageMinLength: number = 8;
  public messageMaxLength: number = 1500;
  public Editor = ClassicEditor;

  constructor(
    private modalService: NgbModal
  ){}

  public config = {
      placeholder: "Your message (Maximum " + this.messageMaxLength + " characters allowed)...",
      toolbar: [ 'undo', 'redo', '|', 'bold', 'italic',
        'alignment','fontBackgroundColor', 'fontColor', 'fontFamily', 'fontSize',
        'heading', 'link'
      ],
      toolbarLocation: 'bottom',
      fontSize: {
        options: [
            9,
            13,
            'default',
            19,
            23,
            27,
            32
        ]
      },
      plugins: [
          Bold, Essentials, Italic, Paragraph, Undo, Alignment, FontBackgroundColor, FontColor, FontFamily, FontSize , Heading, Link, WordCount
      ],
      wordCount: {
        onUpdate: (stats: any) => {
            this.messageCharacterCount = stats.characters;
        }
      }
  }

  ngOnInit(): void {
      this.birthdayForm.setControl('message', new FormControl('', [
        Validators.required,
        ckEditorMinLength(()=>this.messageCharacterCount, this.messageMinLength),
        ckEditorMaxLength(()=>this.messageCharacterCount, this.messageMaxLength)
      ]))
  }

  get message(){
    return this.birthdayForm?.get('message');
  }

  onReturn(){
    console.log(this.messageCharacterCount);
    if(this.messageCharacterCount > 0){
      const modal = this.modalService.open(ConfirmationModalComponent, {centered: true});
      modal.componentInstance.message = 'You will loose the message you have entered. Are you sure you want to go back ?';
      modal.componentInstance.result.subscribe((confirm: boolean) => {
        if(confirm) {
          this.return.emit();
        }
      });
    }
    else {
      this.return.emit();
    }

  }

  onExport(){
    this.isSubmitted = true;
    if(this.birthdayForm.valid){
      this.exportCard.emit();
    }
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.birthdayForm.valid){
      this.createCard.emit();
    }
  }

}
