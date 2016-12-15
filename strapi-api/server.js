'use strict';

/**
 * Use `server.js` to run your application without `$ strapi start`.
 * To start the server, run: `$ npm start`.
 *
 * This is handy in situations where the Strapi CLI is not relevant or useful.
 */
require('app-module-path').addPath(__dirname + '/lib');
process.chdir(__dirname);

(function () {
  const strapi = require('strapi');
  strapi.start();
})();
