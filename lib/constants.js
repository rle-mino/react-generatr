'use babel';

import pascalCase from 'pascal-case';
import camelCase from 'camel-case';

export const ESCAPE = 27;
export const ENTER = 13;
export const SPACE = 32;
export const TAB = 9;
export const FULLCOMP = 'statefullComponent';
export const LESSCOMP = 'statelessComponent';
export const FULLCONT = 'statefullContainer';
export const LESSCONT = 'statelessContainer';
export const CONFIG_BINDER = {
  [FULLCOMP]: 'pathToComponents',
  [LESSCOMP]: 'pathToComponents',
  [FULLCONT]: 'pathToContainers',
  [LESSCONT]: 'pathToContainers',
};
export const CASE_BINDER = {
  'pascal-case': pascalCase,
  'camel-case': camelCase,
};
