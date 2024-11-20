import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Postcard } from '../../../../services/models';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { AudioService } from '../../../card-form/services/audio.service';
import { ConfettiService } from '../../services/confetti.service';
import { CommonModule } from '@angular/common';
import { PostcardService } from '../../../../services/services';
import { LetterComponent } from '../../components/letter/letter.component';
import { FooterComponent } from '../../../../components/footer/footer.component';
import { ExportService } from '../../services/export.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, LetterComponent, FooterComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {

  public envelopeOpen: boolean = false;
  public cardData: Postcard | undefined;
  public errorMessage: string = 'Error occurred while generating the card. Please check the url and try again!';
  public cardId: string | undefined;
  public isDownloading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private audioService: AudioService,
    private confettiService: ConfettiService,
    private postcardService: PostcardService,
    private exportService: ExportService
  ){}

  ngOnInit(): void {
    this.cardId = this.activatedRoute.snapshot.params['id'];
    if(this.cardId){
      this.postcardService.viewCard({
        cardId: this.cardId
      })
      .subscribe({
        next: (response: Postcard) => {
          this.cardData = response;
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
    if(this.cardData && this.cardData.audio){
      this.audioService.playAudio(this.cardData.occasion, this.cardData.audio);
      this.confettiService.celebrate(this.cardData.occasion);
    }
  }

  exportCard(){
    if(this.cardId){
      this.isDownloading = true;
      const fileName = this.receiverName + "_" + this.occasion + "_" + "card.pdf";
      this.postcardService.export({
        cardId: this.cardId
      })
      .subscribe({
        next: (responseBlob) => {
          this.exportService.downloadFile(responseBlob, fileName).subscribe({
            complete: () => this.isDownloading = false
          });
        }
      })
      ;
    }

  }

}
