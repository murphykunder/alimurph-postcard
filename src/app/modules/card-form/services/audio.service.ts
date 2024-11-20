import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  getAllAnniversaryAudio(){
    return [
      {
        id: 1,
        name: 'Just a beautiful day',
        url: '../../assets/audio/anniversary/1.mp3'
      },
      {
        id: 2,
        name: 'Lovely moment',
        url: '../../assets/audio/anniversary/2.mp3'
      },
      {
        id: 3,
        name: 'Romantic',
        url: '../../assets/audio/anniversary/3.mp3'
      },
      {
        id: 4,
        name: 'Until I found you - cover  ',
        url: '../../assets/audio/anniversary/4.mp3'
      },
    ]
  }

  getAllBirthdayAudios() {
    return [
      {
        id: 1,
        name: 'Piano v1',
        url: '../../assets/audio/birthday/1.mp3'
      },
      {
        id: 2,
        name: 'Piano v2',
        url: '../../assets/audio/birthday/2.mp3'
      },
      {
        id: 3,
        name: 'Acoustic',
        url: '../../assets/audio/birthday/3.mp3'
      },
      {
        id: 4,
        name: 'Jazz',
        url: '../../assets/audio/birthday/4.mp3'
      }
    ]
  }

  getAudio(occasion: string, audioId: number){
    if(occasion == 'anniversary'){
      return this.getAllAnniversaryAudio().find(audio => {
        return (audio.id == audioId)
      });
    }
    else {
      return this.getAllBirthdayAudios().find(audio => {
        return (audio.id == audioId)
      });
    }
  }

  playAudio(occasion: string, audioId: number, delayInMillSec: number = 0){
    const audio = new Audio();
    audio.src = this.getAudio(occasion, audioId)?.url || '';
    if(audio.src) {
      audio.load();
      audio.volume = 0.5;
      // play audio after certain duration of opening the envelope
      setTimeout(() => audio.play());
    }
  }

}