import { IpQueryResponse } from './ip-query';
import { AsnQueryResponse } from './asn-query';

export interface SdkOptions {
  apiEndpoint?: string;
  accessToken?: string;
  userAgent?: string;
}

export type CallbackFn = (err: Error | null, data?: IpQueryResponse | AsnQueryResponse) => any;
