/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
 */
import '@angular/localize/init';
// eslint-disable
import 'zone.js/dist/zone-node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { join } from 'path';
import { AppServerModule } from './main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

const express = require('express');
export const app = express();
const distFolder = join(process.cwd(), 'dist/ngx-serverless-starter/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule
  })
);
app.set('view engine', 'html');
app.set('views', distFolder);
// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get(
  '*.*',
  express.static(distFolder, {
    maxAge: '1y'
  })
);
// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
});
export * from './main.server';
