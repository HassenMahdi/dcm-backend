// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { meta } from './environment.meta';

export const environment = {
  ...meta,
  production: false,
  test: false,
  import: 'http://localhost:5001/import/v2/',
  mapping: 'http://localhost:5003/mapping',
  cleansing: 'http://localhost:5004/check',
  transform: 'http://localhost:5002/transfo/',
  admin: 'http://localhost:5000/',
  upload: 'http://localhost:5005/upload/',
  auth: 'http://localhost:5010/',
  pipeline: 'http://localhost:5006/',

  env: 'DEV',

};