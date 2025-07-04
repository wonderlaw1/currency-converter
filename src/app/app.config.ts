import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { currencyResourceInterceptorInterceptor } from './core/interceptors/currency-resource-interceptor-interceptor';
import { CURRENCY_BEACON_URL_TOKEN } from './core/tokens/currency-beacon-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([currencyResourceInterceptorInterceptor]),
    ),
    {
      provide: CURRENCY_BEACON_URL_TOKEN,
      useValue: 'https://api.currencybeacon.com/v1',
    },
  ],
};
