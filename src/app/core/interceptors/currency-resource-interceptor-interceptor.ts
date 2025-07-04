import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CURRENCY_BEACON_API_KEY } from '../../../currency-beacon-api-key';
import { CURRENCY_BEACON_URL_TOKEN } from '../tokens/currency-beacon-url.token';

export const currencyResourceInterceptorInterceptor: HttpInterceptorFn = (
  req,
  next,
) => {
  const currencyBeaconUrl = inject(CURRENCY_BEACON_URL_TOKEN);
  if (req.url.includes(currencyBeaconUrl)) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${CURRENCY_BEACON_API_KEY}`,
        },
      }),
    );
  }
  return next(req);
};
