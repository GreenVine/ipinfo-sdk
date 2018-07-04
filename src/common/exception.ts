// tslint:disable:max-classes-per-file

export class SDKError extends Error {
  constructor(code: string, message: string, critical: boolean) {
    if (new.target === SDKError) {
      throw new TypeError(`Error class ${new.target.name} cannot be initialised directly`);
    }

    const logger = critical ? console.error : console.log;
    logger(`[${code}] ${message}`);

    super(code);
  }
}

export class ConfigurationError extends SDKError {
  constructor(code: string | null, message: string) {
    super(code || 'CONFIG_ERROR', message, true);
  }
}

export class RateLimitError extends SDKError {
  constructor(code: string | null, message: string) {
    super(code || 'RATE_LIMIT_ERROR', message, true);
  }
}

export class InvalidParameterError extends SDKError {
  constructor(code: string | null, message: string) {
    super(code || 'INVALID_PARAMETER_ERROR', message, true);
  }
}
