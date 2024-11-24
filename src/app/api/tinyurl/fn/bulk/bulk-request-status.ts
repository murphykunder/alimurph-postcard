/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BulkStatusResponse } from '../../models/bulk-status-response';

export interface BulkRequestStatus$Params {
  bulkRequestId: number;
}

export function bulkRequestStatus(http: HttpClient, rootUrl: string, params: BulkRequestStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<BulkStatusResponse>> {
  const rb = new RequestBuilder(rootUrl, bulkRequestStatus.PATH, 'get');
  if (params) {
    rb.path('bulkRequestId', params.bulkRequestId, {});
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

bulkRequestStatus.PATH = '/bulk/{bulkRequestId}/status';