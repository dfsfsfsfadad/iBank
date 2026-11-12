import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export type CreditItem = {
  id: string; title: string; date: string; amount: number;
  icon: keyof typeof Ionicons.glyphMap; color: string;
};

export const CREDIT_ITEMS: CreditItem[] = [
  { id: 'c1', title: 'Buy Camera', date: '02/11/2018', amount: 1200, icon: 'camera', color: colors.primary },
  { id: 'c2', title: 'Buy Television', date: '02/11/2018', amount: 1200, icon: 'tv', color: colors.red },
  { id: 'c3', title: 'Buy Camera', date: '02/11/2018', amount: 1200, icon: 'camera', color: colors.blue },
  { id: 'c4', title: 'Buy Television', date: '02/11/2018', amount: 1200, icon: 'tv', color: colors.orange },
];

export const creditTotal = (items: CreditItem[]) => items.reduce((s, i) => s + i.amount, 0);