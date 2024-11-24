import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Postcard } from '../api/alimurph_postcard_api/models';
import { environment } from '../../environments/environment';
import { Observable, of, timestamp } from 'rxjs';

const secretKey = environment.secret_key;

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encryptData(data: string): Observable<string>{
    let b64EncryptedData = CryptoJS.AES.encrypt(data,secretKey).toString();
    return of(encodeURIComponent(b64EncryptedData));
  }

  decryptData(data:string):Observable<Postcard|undefined>{
    let decodedText = decodeURIComponent(data);
    const decryptDataArray = CryptoJS.AES.decrypt(decodedText, secretKey);
    const decryptData = decryptDataArray.toString(CryptoJS.enc.Utf8);
    if(decryptData){
      return of(JSON.parse(decryptData));
    }
    else {
      return of(undefined);
    }
  }
}
