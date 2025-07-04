import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyConverter } from '../../features/currency-converter/currency-converter';

@Component({
  selector: 'app-currency-converter-page',
  imports: [CurrencyConverter],
  templateUrl: './currency-converter-page.html',
  styleUrl: './currency-converter-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyConverterPage {}
