import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export type MessageItem = {
  id: string; title: string; preview: string; date: string;
  icon: keyof typeof Ionicons.glyphMap; color: string;
};

export const MESSAGES: MessageItem[] = [
  { id: 'boa',      title: 'Bank of America', preview: 'Bank of America : 256486 is your authorization code which expires in 10 minutes.', date: 'Today', icon: 'business',      color: colors.primary },
  { id: 'account',  title: 'Account',         preview: 'Your account is limited. Please follow the steps in the app.',                  date: '12/11', icon: 'person',        color: colors.red },
  { id: 'alert',    title: 'Alert',           preview: 'Your statement is ready for you to view in the app.',                           date: '12/11', icon: 'notifications', color: colors.blue },
  { id: 'paypal',   title: 'Paypal',          preview: 'Your account has been locked. Please contact customer care.',                   date: '10/11', icon: 'logo-paypal',   color: colors.orange },
  { id: 'withdraw', title: 'Withdraw',        preview: 'Dear customer, 2987488 is your authorization code.',                            date: '10/11', icon: 'cash',          color: colors.green },
];

export type ChatItem =
  | { id: string; kind: 'date'; text: string }
  | { id: string; kind: 'msg'; from: 'bank' | 'me'; text: string };

export const CHAT_INITIAL: ChatItem[] = [
  { id: 'd1', kind: 'date', text: '9/10/2018' },
  { id: 'm1', kind: 'msg', from: 'bank', text: 'Did you attempt transaction on debit card ending in 0000 at Merchant in NJ for $1,200? Reply YES or NO' },
  { id: 'm2', kind: 'msg', from: 'me', text: 'Yes' },
  { id: 'd2', kind: 'date', text: '9/10/2018' },
  { id: 'm3', kind: 'msg', from: 'bank', text: "Bank of America : 256486 is your authorization code which expires in 10 minutes. If you didn't request the code. Call: 18009898 for assistance" },
];
