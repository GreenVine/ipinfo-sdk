import { resolve } from 'path';
import { readFileSync } from 'fs';

export const getSdkVersion = () => {
  const pkgRoot = resolve(__dirname, '..', '..');
  const pkgContents = readFileSync(`${pkgRoot}/package.json`);

  try {
    const json = JSON.parse(pkgContents.toString());

    if (json && json.version) {
      return json.version;
    } else {
      throw new Error('Version identifier does not exist');
    }
  } catch (e) {
    return '-1';
  }
};
