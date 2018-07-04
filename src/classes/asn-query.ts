import fetch, { RequestInit } from 'node-fetch';

import { IPInfo } from './ipinfo';
import { AsnQueryResponse } from '../interfaces/asn-query';
import { InvalidParameterError } from '../common/exception';
import { CallbackFn, SdkOptions } from '../interfaces/ipinfo';

export class ASN extends IPInfo {
  constructor(options?: SdkOptions) {
    super(options);
  }

  async asn(
    asn: number,
    options?: RequestInit,
    callback?: CallbackFn,
    endpointSuffix?: string
  ): Promise<AsnQueryResponse> {
    const builder = super.buildApiRequest(`/AS${asn}`, endpointSuffix);
    const request = fetch(builder.url, { ...builder.options, ...options });

    const validatedAddress = Number.isInteger(asn) && Number(asn) >= 0;
    const validationError = new InvalidParameterError(
      'INVALID_AS_NUMBER',
      `Invalid AS Number: ${asn}`
    );

    if (typeof callback === 'function') {
      if (validatedAddress) {
        return request
          .then((res) => res.json())
          .then((json) => callback(null, json as AsnQueryResponse))
          .catch((err) => callback(err));
      } else {
        return callback(validationError);
      }
    } else {
      if (validatedAddress) {
        return (await request).json();
      } else {
        throw validationError;
      }
    }
  }
}

export default ASN;
