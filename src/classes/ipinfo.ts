import { isUndefined } from 'util';
import { validate } from 'validate.js';
import { RequestInit } from 'node-fetch';

import { getSdkVersion } from '../common/utils';
import { SdkOptions } from '../interfaces/ipinfo';
import { ConfigurationError } from '../common/exception';
import { DEFAULT_SDK_OPTIONS } from '../common/constants';

export class IPInfo {
  protected readonly sdkOptions: SdkOptions;

  constructor(options?: SdkOptions) {
    if (new.target === IPInfo) {
      throw new TypeError(`Class ${new.target.name} cannot be initialised directly`);
    }

    const endpointValidateOptions = {
      website: {
        url: true
      }
    };

    if (options && options.apiEndpoint) {
      if (!!validate({ website: options.apiEndpoint }, endpointValidateOptions)) {
        throw new ConfigurationError('INVALID_API_ENDPOINT', 'Invalid API Endpoint');
      }
    }

    this.sdkOptions = { ...DEFAULT_SDK_OPTIONS, ...options };
  }

  protected buildApiRequest(
    prefix: string,
    suffix?: string
  ): { url: string; options: RequestInit } {
    return {
      url: `${this.sdkOptions.apiEndpoint}${prefix}${isUndefined(suffix) ? '/json' : suffix}`,
      options: {
        method: 'GET',
        headers: {
          ...(this.sdkOptions.accessToken
            ? { Authorization: `Bearer ${this.sdkOptions.accessToken}` }
            : null),
          Accept: 'application/json',
          'User-Agent': this.sdkOptions.userAgent || `ipinfo-sdk/${getSdkVersion()}`
        }
      }
    };
  }
}

export default IPInfo;
