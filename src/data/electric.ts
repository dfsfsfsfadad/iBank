import { BILL } from './bill';

export const ELECTRIC_BILL = {
  ...BILL,
  fee: 470,
  tax: 10,
};

// Electric bill #1 → #4: переносит введённые значения
export const electricStore: { code: string; account: string | null } = {
  code: '',
  account: null,
};