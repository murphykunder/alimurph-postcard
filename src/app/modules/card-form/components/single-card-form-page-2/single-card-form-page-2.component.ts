import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import WaveSurfer from 'wavesurfer.js';
import { AudioService } from '../../services/audio.service';
import { NavButtonComponent } from '../nav-button/nav-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-card-form-page-2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavButtonComponent],
  templateUrl: './single-card-form-page-2.component.html',
  styleUrl: './single-card-form-page-2.component.scss'
})
export class SingleCardFormPage2Component {

  @Input() birthdayForm!: FormGroup;
  @Output() return = new EventEmitter();
  @Output() next = new EventEmitter();
  wavesurfer: WaveSurfer[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private audioService: AudioService
  ){}

  ngAfterViewInit(): void {
    // for each audio create a wavesurfer object
    this.audioList.forEach((audio, index) => {
      this.wavesurfer.push(this.createWavesurfer('#waveform'+(audio.id), audio.url));
    });
    this.cdr.detectChanges(); // add this line to manually detect the changes in the html view for play pause button after wavesurfer is created
  }

  createWavesurfer(selector: string, audioUrl: string){
    return WaveSurfer.create({
      container: selector,
      waveColor: '#98abf6',
      progressColor: '#8ce244',
      height: 20,
      barRadius: 4,
      barWidth: 2,
      url: audioUrl,
      interact: false,
      autoplay: false,
      duration: 0.5
    });
  }

  onPlayPause(index:number){
    this.wavesurfer[index]?.playPause();
  }

  isChecked(audioId: number){
    return (this.birthdayForm?.get('audio')?.value == audioId);
  }

  isPlaying(index: number){
    return this.wavesurfer[index]?.isPlaying();
  }

  onAudioChange(index: string = ''){
    this.wavesurfer.forEach(wavesurfer => {
      if(wavesurfer.isPlaying())
        wavesurfer.stop();
    });

    if(index){
      this.wavesurfer[parseInt(index)]?.playPause();
    }
  }

  get audioList(){
    if(this.birthdayForm?.get('occasion')?.value == 'anniversary'){
      return this.audioService.getAllAnniversaryAudio();
    }
    else{
      return this.audioService.getAllBirthdayAudios();
    }
  }

  onSubmit(){
    this.next.emit();
  }

  onReturn(){
    this.return.emit();
  }

}
