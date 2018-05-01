'use babel';

import path from 'path';
import ReactGeneratr from './reactGeneratr';

export default {
  activate() {
    return new ReactGeneratr();
  },
  config: {
    pathToComponents: {
      type: 'string',
      default: path.join('src', 'components'),
    },
    pathToContainers: {
      type: 'string',
      default: path.join('src', 'containers'),
    },
    format: {
      type: 'string',
      default: 'pascal-case',
      enum: ['pascal-case', 'camel-case'],
    },
    useSemi: {
      type: 'boolean',
      default: true,
    },
    createOnAFolder: {
      type: 'boolean',
      default: true,
    },
  },
};
