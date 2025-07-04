import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CurrencyConvertParams,
  CurrencyConvertResponse,
  CurrencyItem,
  GetCurrencyItemsResponse,
} from '../../shared/model/currency.model';
import { CURRENCY_BEACON_URL_TOKEN } from '../tokens/currency-beacon-url.token';

@Injectable({
  providedIn: 'root',
})
export class CurrencyHttpService {
  private readonly baseUrl = inject(CURRENCY_BEACON_URL_TOKEN);

  private readonly http = inject(HttpClient);

  getCurrencyList(): Observable<CurrencyItem[]> {
    return this.http
      .get<GetCurrencyItemsResponse>(`${this.baseUrl}/currencies`)
      .pipe(map((res) => res.response));
  }

  convert(params: CurrencyConvertParams): Observable<CurrencyConvertResponse> {
    return this.http.get<CurrencyConvertResponse>(`${this.baseUrl}/convert`, {
      params: params,
    });
  }
}
