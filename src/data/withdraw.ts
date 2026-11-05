export const OTHER = 'Other';
export const WITHDRAW_AMOUNTS = ['$10', '$50', '$100', '$150', '$200', OTHER];

export const digits = (s: string) => parseInt(s.replace(/\D/g, ''), 10) || 0;
