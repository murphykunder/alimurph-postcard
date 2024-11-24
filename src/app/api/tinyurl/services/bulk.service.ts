/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BulkReportResponse } from '../models/bulk-report-response';
import { bulkRequestReport } from '../fn/bulk/bulk-request-report';
import { BulkRequestReport$Params } from '../fn/bulk/bulk-request-report';
import { bulkRequestStatus } from '../fn/bulk/bulk-request-status';
import { BulkRequestStatus$Params } from '../fn/bulk/bulk-request-status';
import { BulkStatusResponse } from '../models/bulk-status-response';
import { bulkTinyUrlRequest } from '../fn/bulk/bulk-tiny-url-request';
import { BulkTinyUrlRequest$Params } from '../fn/bulk/bulk-tiny-url-request';

@Injectable({ providedIn: 'root' })
export class BulkService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `bulkTinyUrlRequest()` */
  static readonly BulkTinyUrlRequestPath = '/bulk';

  /**
   * Create a new TinyURL processing batch.
   *
   * Crteates new batch
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bulkTinyUrlRequest()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  bulkTinyUrlRequest$Response(params: BulkTinyUrlRequest$Params, context?: HttpContext): Observable<StrictHttpResponse<BulkStatusResponse>> {
    return bulkTinyUrlRequest(this.http, this.rootUrl, params, context);
  }

  /**
   * Create a new TinyURL processing batch.
   *
   * Crteates new batch
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bulkTinyUrlRequest$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  bulkTinyUrlRequest(params: BulkTinyUrlRequest$Params, context?: HttpContext): Observable<BulkStatusResponse> {
    return this.bulkTinyUrlRequest$Response(params, context).pipe(
      map((r: StrictHttpResponse<BulkStatusResponse>): BulkStatusResponse => r.body)
    );
  }

  /** Path part for operation `bulkRequestStatus()` */
  static readonly BulkRequestStatusPath = '/bulk/{bulkRequestId}/status';

  /**
   * Return a bulk request status.
   *
   * Return a bulk request status
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bulkRequestStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  bulkRequestStatus$Response(params: BulkRequestStatus$Params, context?: HttpContext): Observable<StrictHttpResponse<BulkStatusResponse>> {
    return bulkRequestStatus(this.http, this.rootUrl, params, context);
  }

  /**
   * Return a bulk request status.
   *
   * Return a bulk request status
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bulkRequestStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  bulkRequestStatus(params: BulkRequestStatus$Params, context?: HttpContext): Observable<BulkStatusResponse> {
    return this.bulkRequestStatus$Response(params, context).pipe(
      map((r: StrictHttpResponse<BulkStatusResponse>): BulkStatusResponse => r.body)
    );
  }

  /** Path part for operation `bulkRequestReport()` */
  static readonly BulkRequestReportPath = '/bulk/{bulkRequestId}/report';

  /**
   * Return a bulk request report.
   *
   * Return a bulk request report
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bulkRequestReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  bulkRequestReport$Response(params: BulkRequestReport$Params, context?: HttpContext): Observable<StrictHttpResponse<BulkReportResponse>> {
    return bulkRequestReport(this.http, this.rootUrl, params, context);
  }

  /**
   * Return a bulk request report.
   *
   * Return a bulk request report
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `bulkRequestReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  bulkRequestReport(params: BulkRequestReport$Params, context?: HttpContext): Observable<BulkReportResponse> {
    return this.bulkRequestReport$Response(params, context).pipe(
      map((r: StrictHttpResponse<BulkReportResponse>): BulkReportResponse => r.body)
    );
  }

}
