import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/currency-converter/currency-converter-page').then(
        (p) => p.CurrencyConverterPage,
      ),
  },
];
