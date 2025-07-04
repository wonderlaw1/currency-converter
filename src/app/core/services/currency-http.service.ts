import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  CurrencyItem,
  GetCurrencyItemsResponse,
} from '../../shared/model/currency.model';
import { CURRENCY_BEACON_URL_TOKEN } from '../tokens/currency-beacon-url.token';

export type ConvertParams = {
  from: string;
  to: string;
  amount: number;
};

export type ConvertResponse = {
  to: string;
  value: number;
};

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

  convert(params: ConvertParams): Observable<ConvertResponse> {
    return this.http.get<ConvertResponse>(`${this.baseUrl}/convert`, {
      params: params,
    });
  }
}
