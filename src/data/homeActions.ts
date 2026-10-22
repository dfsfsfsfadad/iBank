import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export type HomeAction = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

export const homeActions: HomeAction[] = [
  { id: 'details',  label: 'Account\nDetails', icon: 'person-circle-outline',   color: colors.blue },
  { id: 'transfer', label: 'Transfer',         icon: 'swap-horizontal-outline', color: colors.red },
  { id: 'withdraw', label: 'Withdraw',         icon: 'cash-outline',            color: colors.orange },
  { id: 'mobile',   label: 'Mobile\npayment',  icon: 'phone-portrait-outline',  color: colors.orange },
  { id: 'paybill',  label: 'Pay the\nBill',    icon: 'document-text-outline',   color: colors.green },
  { id: 'topup',    label: 'Top up\nonline',   icon: 'add-circle-outline',      color: colors.violet },
  { id: 'credit',   label: 'Credit\ncard',     icon: 'card-outline',            color: colors.red },
  { id: 'report',   label: 'Transaction\nreport', icon: 'stats-chart-outline',  color: colors.blue },
  { id: 'benef',    label: 'Beneficiary',      icon: 'people-outline',          color: colors.pink },
];