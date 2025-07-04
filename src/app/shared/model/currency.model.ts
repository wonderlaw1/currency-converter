export type GetCurrencyItemsResponse = {
  response: CurrencyItem[];
};

export type CurrencyItem = {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
};

export type CurrencyConvertParams = {
  from: string;
  to: string;
  amount: number;
};

export type CurrencyConvertResponse = {
  to: string;
  value: number;
};
