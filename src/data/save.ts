export const DEPOSIT_TERMS = [
  { label: '3 months (interest rate 4%)', months: 3, rate: '4%' },
  { label: '6 months (interest rate 4.5%)', months: 6, rate: '4.5%' },
  { label: '12 months (interest rate 5%)', months: 12, rate: '5%' },
  { label: '16 months (interest rate 5.5%)', months: 16, rate: '5.5%' },
  { label: '24 months (interest rate 6%)', months: 24, rate: '6%' },
];

export const SAVINGS_ACCOUNTS = [
  { id: 'a1', account: '1900 8988 5456', from: '02/11/2018', to: '02/11/2020', term: '12 months', rate: '5%' },
  { id: 'a2', account: '1900 8112 5222', from: '02/11/2019', to: '02/11/2020', term: '12 months', rate: '5%' },
  { id: 'a3', account: '4411 0000 1234', from: '02/11/2019', to: '02/11/2020', term: '12 months', rate: '5%' },
];

// Save online #1 → #5 → #6: переносит введённые значения
export const saveStore: { account: string | null; term: number | null; amount: string } = {
  account: null, term: null, amount: '',
};