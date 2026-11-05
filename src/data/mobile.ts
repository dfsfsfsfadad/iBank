import { colors } from '../theme';

export const MOBILE_AMOUNTS = ['$10', '$20', '$30'];

export const MOBILE_BENEFICIARIES = [
  { id: 'emma', name: 'Emma', phone: '+8564757899', color: colors.pink },
  { id: 'justin', name: 'Justin', phone: '+8564757800', color: colors.blue },
];

// Mobile prepaid #1 → Confirm: переносит выбранные значения
export const mobileStore: { acc: number | null; phone: string; amount: string } = { acc: null, phone: '', amount: '' };
