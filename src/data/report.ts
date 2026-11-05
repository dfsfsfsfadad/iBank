import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import type { ChartPoint } from '../components/report/BalanceChart';

export const CHART: ChartPoint[] = [
  { m: 'Jan', up: 20, down: 26 },
  { m: 'Feb', up: 40, down: 48 },
  { m: 'Mar', up: 50, down: 30 },
  { m: 'Apr', up: 16, down: 38 },
  { m: 'May', up: 30, down: 22 },
  { m: 'Jun', up: 22, down: 20 },
];

export type Txn = {
  id: string; title: string; ok: boolean; amount: number;
  icon: keyof typeof Ionicons.glyphMap; color: string;
};

export const TXN_SECTIONS: { day: string; items: Txn[] }[] = [
  { day: 'Today', items: [
    { id: 't1', title: 'Water Bill',          ok: false, amount: -280,  icon: 'water',          color: colors.primary },
  ] },
  { day: 'Yesterday', items: [
    { id: 't2', title: 'Income: Salary Oct',  ok: true,  amount: 1200,  icon: 'document-text',  color: '#FF4D6D' },
    { id: 't3', title: 'Electric Bill',       ok: true,  amount: -480,  icon: 'flash',          color: colors.blue },
    { id: 't4', title: 'Income : Jane transfers', ok: true, amount: 500, icon: 'swap-horizontal', color: colors.orange },
    { id: 't5', title: 'Internet Bill',       ok: true,  amount: -100,  icon: 'wifi',           color: '#2DD4BF' },
  ] },
];

export const money = (n: number) => `${n < 0 ? '- ' : '+'}$${Math.abs(n)}`;

export const BANK_ACCOUNTS = [
  { title: 'Account 1', number: '1900 8988 1234', balance: '$20,000',  branch: 'New York' },
  { title: 'Account 2', number: '8988 1234',      balance: '$12,000',  branch: 'New York' },
  { title: 'Account 3', number: '1900 1234 2222', balance: '$230,000', branch: 'New York' },
];
