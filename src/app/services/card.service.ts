import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Postcard } from '../api/alimurph_postcard_api/models';
import { EncryptionService } from './encryption.service';
import { ExportService } from './export.service';
import { PostcardService } from '../api/alimurph_postcard_api/services';
import { TinyUrlService } from '../api/tinyurl/services';
import { UrlAliasResponse } from '../api/tinyurl/models';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private encryptionService: EncryptionService,
    private exportService: ExportService,
    private postcardService: PostcardService,
    private tinyUrlService: TinyUrlService
  ) { }

  encryptCardData(request: Postcard): Observable<string>{
    return this.encryptionService.encryptData(JSON.stringify(request));
  }

  shortenUrl(cardUrl: string): Observable<UrlAliasResponse>{
    return this.tinyUrlService.createTinyUrl({
      body: {
        url: cardUrl,
      }
    });
  }

  createCard(request: Postcard):Observable<string|undefined>{
    return this.encryptCardData(request).pipe(
      switchMap((encryptedData: string) => {
        const cardUrl = window.location.protocol + "//" + window.location.host + "/card/" + encryptedData;
        return this.shortenUrl(cardUrl).pipe(
          map((response: UrlAliasResponse) => {
            if(response.code == 0 && response.data){
              return response.data?.tiny_url;
            }
            else {
              return cardUrl;
            }
          }),
          catchError((error) => {
            return of(cardUrl);
          })
        );
      })
    );
  }

  getCard(cardId: string): Observable<Postcard|undefined>{
    let card = undefined;
    this.encryptionService.decryptData(cardId)
    .subscribe({
      next: (response: Postcard|undefined) => {
          card = response;
      }
    });
    return of(card);
  }

  exportCard(card: Postcard): Observable<boolean>{
    const fileName = card.to + "_" + card.occasion + "_" + "card.pdf";

    return this.postcardService.export({
      body: card
    })
    .pipe(
      switchMap((response: any) => {
        return this.exportService.downloadFile(response, fileName)
      })
    );
  }

}
