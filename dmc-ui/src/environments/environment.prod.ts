import { meta } from './environment.meta';

const packageJson = require('../../package.json');

export const environment = {
  ...meta,
  production:
   true,
  test: false,

  import: 'http://13.36.203.148:5001/import/v2/',
  mapping: 'http://13.36.203.148:5003/mapping/',
  cleansing: 'http://13.36.203.148:5004/check',
  transform: 'http://13.36.203.148:5002/transfo/',
  admin: 'http://13.36.203.148:5000/',
  upload: 'http://13.36.203.148:5005/upload/',
  auth: 'http://13.36.203.148:5010/',
  pipeline: 'http://13.36.203.148:5006/',

  env: 'PRD',
};
