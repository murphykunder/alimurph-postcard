import { Injectable } from '@angular/core';
import { PostcardService } from '../../../services/services';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
  ) { }

  downloadFile(data: any, fileName: string): Observable<any>{

    const downloadObservable = new Observable(observer => {
      const blob = new Blob([data as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
      observer.complete();
    });

    return downloadObservable;
  }

}
