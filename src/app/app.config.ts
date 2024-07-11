import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';

import { routes } from './app.routes';
import { IonicRouteStrategy } from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
  ],
};
