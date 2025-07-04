import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { catchError, debounceTime, filter, map, of, switchMap } from 'rxjs';
import {
  ConvertParams,
  ConvertResponse,
  CurrencyHttpService,
} from '../../core/services/currency-http.service';
import { Autocomplete } from '../../shared/components/autocomplete/autocomplete';
import { CurrencyItem } from '../../shared/model/currency.model';

// type FormValue = {
//   from: CurrencyItem;
//   to: CurrencyItem;
//   amount: number;
// };

@Component({
  selector: 'app-currency-converter',
  imports: [Autocomplete, MatInputModule, ReactiveFormsModule],
  templateUrl: './currency-converter.html',
  styleUrl: './currency-converter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyConverter {
  protected readonly form = new FormGroup({
    from: new FormControl<CurrencyItem | null>(null, Validators.required),
    to: new FormControl<CurrencyItem | null>(null, Validators.required),
    amount: new FormControl(0, Validators.required),
  });
  protected readonly currencies: Signal<CurrencyItem[] | undefined>;
  protected readonly result: Signal<ConvertResponse | null | undefined>;
  private currencyHttpService = inject(CurrencyHttpService);
  private destroy = inject(DestroyRef);

  constructor() {
    this.currencies = toSignal(this.currencyHttpService.getCurrencyList());

    this.result = toSignal(
      this.form.valueChanges.pipe(
        takeUntilDestroyed(this.destroy),
        debounceTime(300),
        filter(() => this.form.valid),
        map(({ from, to, amount }) => {
          return {
            from: from!.short_code,
            to: to!.short_code,
            amount,
          } as ConvertParams;
        }),
        switchMap((value) => {
          return this.currencyHttpService.convert(value);
        }),
        catchError((error) => {
          console.log(error);
          return of(null);
        }),
      ),
    );
  }
}
