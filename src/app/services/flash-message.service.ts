import { Injectable } from '@angular/core';


export interface FlashMessage {
  flashMessage: string;
  className: string;
  delay: number;
}


@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  flashMessages: FlashMessage[] = [];

  show(message: FlashMessage){
    this.flashMessages.push(message);
  }

  remove(message: FlashMessage){
    this.flashMessages = this.flashMessages.filter((f) => f != message);
  }

  clear(){
    this.flashMessages.splice(0, this.flashMessages.length);
  }
}
