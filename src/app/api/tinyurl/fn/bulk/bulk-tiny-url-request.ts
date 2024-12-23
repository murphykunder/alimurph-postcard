/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BulkRequest } from '../../models/bulk-request';
import { BulkStatusResponse } from '../../models/bulk-status-response';

export interface BulkTinyUrlRequest$Params {
      body: BulkRequest
}

export function bulkTinyUrlRequest(http: HttpClient, rootUrl: string, params: BulkTinyUrlRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<BulkStatusResponse>> {
  const rb = new RequestBuilder(rootUrl, bulkTinyUrlRequest.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BulkStatusResponse>;
    })
  );
}

bulkTinyUrlRequest.PATH = '/bulk';
