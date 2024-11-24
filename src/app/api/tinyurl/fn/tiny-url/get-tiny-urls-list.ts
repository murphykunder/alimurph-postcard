/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AliasResponse } from '../../models/alias-response';

export interface GetTinyUrlsList$Params {

/**
 * aliases list type
 */
  type: 'available' | 'archived';

/**
 * Datetime, indicating that only TinyURLs created after the datetime will be selected.
 */
  from?: string;

/**
 * Datetime, indicating that only TinyURLs created before the datetime will be selected.
 */
  to?: string;

/**
 * search for tag or alias
 */
  search?: string;
}

export function getTinyUrlsList(http: HttpClient, rootUrl: string, params: GetTinyUrlsList$Params, context?: HttpContext): Observable<StrictHttpResponse<AliasResponse>> {
  const rb = new RequestBuilder(rootUrl, getTinyUrlsList.PATH, 'get');
  if (params) {
    rb.path('type', params.type, {});
    rb.query('from', params.from, {});
    rb.query('to', params.to, {});
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AliasResponse>;
    })
  );
}

getTinyUrlsList.PATH = '/urls/{type}';
