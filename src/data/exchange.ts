export const CURRENCIES = [
  { code: 'VND', name: 'Viet Nam Dong', rate: 0.048 },
  { code: 'HK$', name: 'Hong Kong Dollar', rate: 143 },
  { code: 'USD', name: 'Dollar', rate: 1122 },
  { code: 'NT$', name: 'Taiwan Dollar', rate: 40 },
  { code: 'J$', name: 'Jamaika Dollar', rate: 7.4 },
];

export const BASE = 'KRW';

export const exchangeStore = { amount: '', currencyIdx: 2, reverse: false };

export const fmt = (n: number) => (Number.isFinite(n) ? String(Math.round(n * 100) / 100) : '');
