// tslint:disable:no-unused-expression
// tslint:disable:no-implicit-dependencies

import { expect } from 'chai';

import * as exported from '../src/index';

describe('Module entrypoint', () => {
  it('should export query classes', () => {
    expect(exported).is.a('object');
  });

  it('should conatin functions', () => {
    expect(exported.IP).is.a('function');
    expect(exported.ASN).is.a('function');
  });
});
