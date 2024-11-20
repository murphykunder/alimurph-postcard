import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

const confettiColors: { [key:string]: string[]} = {
  "birthday": ['#FF4500', '#008080', '#FFD700'],
  "anniversary": ['#FFF', '#ffff00']
}


@Injectable({
  providedIn: 'root'
})
export class ConfettiService {

  celebrate(occasion: string){
    const duration = 8000;  // in millisec

    setTimeout(() => confetti({
        shapes: ['circle','square'],
        particleCount: 250,
        spread: 180,
        origin: { y: 0.6 },
        colors: confettiColors[occasion],
        startVelocity: 50,
      }), 5000   // display confetti after 5sec
    );
    // clear confetti using the reset function , after certain duration
    setTimeout(() => confetti.reset(), duration);
  }
}

