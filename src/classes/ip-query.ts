import { isIP } from 'net';
import fetch, { RequestInit } from 'node-fetch';

import { IPInfo } from './ipinfo';
import { IpQueryResponse } from '../interfaces/ip-query';
import { InvalidParameterError } from '../common/exception';
import { CallbackFn, SdkOptions } from '../interfaces/ipinfo';

export class IP extends IPInfo {
  constructor(options?: SdkOptions) {
    super(options);
  }

  async ip(
    address?: string,
    options?: RequestInit,
    callback?: CallbackFn,
    endpointSuffix?: string
  ): Promise<IpQueryResponse> {
    address = address || ''; // leave blank to detect IP address automatically

    const builder = super.buildApiRequest(`/${address}`, endpointSuffix);
    const request = fetch(builder.url, { ...builder.options, ...options });

    const validatedAddress = address === '' || isIP(address);
    const validationError = new InvalidParameterError(
      'INVALID_IP_ADDRESS',
      `Invalid IP Address: ${address}`
    );

    if (typeof callback === 'function') {
      if (validatedAddress) {
        return request
          .then((res) => res.json())
          .then((json) => callback(null, json as IpQueryResponse))
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

export default IP;
