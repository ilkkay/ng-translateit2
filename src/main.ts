/* Some components (md-slide-toggle, md-slider, mdTooltip) rely on HammerJS
for gestures. In order to get the full feature-set of these components,
HammerJS must be loaded into the application.
*/
import 'hammerjs';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)

