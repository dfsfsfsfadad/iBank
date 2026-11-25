export type InterestRate = { kind: string; deposit: string; rate: string };

// Өз API мекенжайыңды қой (JSON қайтаруы керек)
export const INTEREST_API_URL = 'https://YOUR_HOST/interest-rates.json';

// Интернет жоқ / сервер жауап бермесе көрсетілетін деректер
export const FALLBACK_RATES: InterestRate[] = [
  { kind: 'Individual customers', deposit: '1m', rate: '4.50%' },
  { kind: 'Corporate customers', deposit: '2m', rate: '5.50%' },
  { kind: 'Individual customers', deposit: '1m', rate: '4.50%' },
  { kind: 'Corporate customers', deposit: '6m', rate: '2.50%' },
  { kind: 'Individual customers', deposit: '1m', rate: '4.50%' },
  { kind: 'Corporate customers', deposit: '8m', rate: '6.50%' },
  { kind: 'Individual customers', deposit: '1m', rate: '4.50%' },
  { kind: 'Corporate customers', deposit: '7m', rate: '6.80%' },
  { kind: 'Individual customers', deposit: '1m', rate: '4.50%' },
  { kind: 'Individual customers', deposit: '12m', rate: '5.90%' },
  { kind: 'Individual customers', deposit: '1m', rate: '4.50%' },
];

export async function fetchInterestRates(): Promise<InterestRate[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 10000);
  try {
    const res = await fetch(INTEREST_API_URL, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!Array.isArray(json)) throw new Error('Bad format');
    return json
      .filter(r => r && r.kind && r.deposit && r.rate !== undefined)
      .map(r => ({
        kind: String(r.kind),
        deposit: String(r.deposit),
        rate: typeof r.rate === 'number' ? `${r.rate.toFixed(2)}%` : String(r.rate),
      }));
  } finally {
    clearTimeout(timer);
  }
}