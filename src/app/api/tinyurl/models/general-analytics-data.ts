/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { BrowserAnalyticsData } from '../models/browser-analytics-data';
import { DeviceAnalyticsData } from '../models/device-analytics-data';
import { OsAnalyticsData } from '../models/os-analytics-data';
export interface GeneralAnalyticsData {

  /**
   * Dataset items
   */
  dataset?: Array<{
'browser'?: BrowserAnalyticsData;
'os'?: OsAnalyticsData;
'device'?: DeviceAnalyticsData;
}>;
  total?: number;
}
