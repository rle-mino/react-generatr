'use babel';

import ReactGeneratr from './reactGeneratr';

export default {
  activate() {
    return new ReactGeneratr();
  },
  config: {
    pathToComponents: {
      type: 'string',
      default: 'src/components',
    },
    pathToContainers: {
      type: 'string',
      default: 'src/containers',
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
  },
};
