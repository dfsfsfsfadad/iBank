import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export type HomeAction = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export const homeActions: HomeAction[] = [
  { id: 'details',  label: 'Account\nand Card',   icon: 'wallet-outline',          color: colors.violet },
  { id: 'transfer', label: 'Transfer',            icon: 'swap-horizontal-outline', color: colors.red },
  { id: 'withdraw', label: 'Withdraw',            icon: 'cash-outline',            color: colors.blue },
  { id: 'mobile',   label: 'Mobile\nprepaid',     icon: 'phone-portrait-outline',  color: colors.orange },
  { id: 'paybill',  label: 'Pay the\nbill',       icon: 'document-text-outline',   color: colors.green },
  { id: 'topup',    label: 'Save\nonline',        icon: 'cloud-upload-outline',    color: colors.blue },
  { id: 'credit',   label: 'Credit\ncard',        icon: 'card-outline',            color: colors.orange },
  { id: 'report',   label: 'Transaction\nreport', icon: 'stats-chart-outline',     color: colors.violet },
  { id: 'benef',    label: 'Beneficiary',         icon: 'people-outline',          color: colors.red },
];
