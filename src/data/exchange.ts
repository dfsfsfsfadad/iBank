export const API_URL = 'https://open.er-api.com/v6/latest/KZT';

export const CURRENCIES = [
  { code: 'USD', name: 'Dollar',        rate: 445 },   // rate: интернет жоқ болса fallback
  { code: 'EUR', name: 'Euro',          rate: 491 },
  { code: 'RUB', name: 'Russian Ruble', rate: 5.4 },
  { code: 'CNY', name: 'Chinese Yuan',  rate: 66.7 },
  { code: 'KRW', name: 'Korean Won',    rate: 0.33 },
];

export const BASE = 'KZT';

export const exchangeStore = { amount: '', currencyIdx: 0, reverse: false };

export const fmt = (n: number) => (Number.isFinite(n) ? String(Math.round(n * 100) / 100) : '');

let loaded = false;
export async function loadRates(): Promise<boolean> {
  if (loaded) return true;
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    if (json.result !== 'success') return false;
    CURRENCIES.forEach(c => {
      const r = json.rates[c.code];
      if (r) c.rate = 1 / r;
    });
    loaded = true;
    return true;
  } catch {
    return false; // fallback курстар қалады
  }
}