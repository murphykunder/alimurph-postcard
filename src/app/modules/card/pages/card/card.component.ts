import { Component, OnInit } from '@angular/core';
import { Postcard } from '../../../../api/alimurph_postcard_api/models';
import { ActivatedRoute } from '@angular/router';
import { AudioService } from '../../../card-form/services/audio.service';
import { ConfettiService } from '../../services/confetti.service';
import { CommonModule } from '@angular/common';
import { LetterComponent } from '../../components/letter/letter.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { CardService } from '../../../../services/card.service';
import { FlashMessageService } from '../../../../services/flash-message.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, LetterComponent, FooterComponent, NgbTooltip],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  public envelopeOpen: boolean = false;
  public cardData: Postcard | undefined;
  public errorMessage: string | undefined;
  public cardId: string | undefined;
  public isDownloading: boolean = false;
  public isCardLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private audioService: AudioService,
    private confettiService: ConfettiService,
    private cardService: CardService,
    private flashMessageService: FlashMessageService
  ){}

  ngOnInit(): void {
    this.cardId = this.activatedRoute.snapshot.params['id'];
    this.errorMessage = undefined;
    if(this.cardId){
      this.isCardLoading = true;

      this.cardService.getCard(this.cardId)
      .subscribe({
        next: (response: Postcard|undefined) => {
          this.isCardLoading = false;
          this.cardData = response;
        },
        error: () => {
          this.isCardLoading = false;
          this.errorMessage = 'Error occurred while generating the card. Please check the url and try again!';
        }
      });
    }
  }

  get occasion(){
    return this.cardData?.occasion;
  }

  get senderName(){
    return this.cardData?.from;
  }

  get receiverName(){
    return this.cardData?.to;
  }

  get audio(){
    return this.cardData?.audio;
  }

  openEnvelope(){
    this.envelopeOpen = true;
    if(this.cardData){
      if(this.cardData.audio)
        this.audioService.playAudio(this.cardData.occasion, this.cardData.audio);
      this.confettiService.celebrate(this.cardData.occasion);
    }
  }

  exportCard(){
    if(this.cardData){
      this.isDownloading = true;
      this.cardService.exportCard(this.cardData)
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

  onError(message: string){
    this.flashMessageService.show({flashMessage: message , className: 'flash-message-error', delay: 5000})
  }
}
