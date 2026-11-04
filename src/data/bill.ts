export const COMPANIES = ['Capi Telecom', 'Viettel', 'VNPT'];
export const BILL_ACCOUNTS = ['4411 0000 1234', '4411 0000 5678'];

export const BILL = {
  name: 'Jackson Maine',
  address: '403 East 4th Street, Santa Ana',
  phone: '+8424599721',
  from: '01/10/2019',
  to: '01/11/2019',
  fee: 50,
  tax: 10,
};

// Pay the bill #1 → #2 арасында таңдалған мәндерді тасымалдайды
export const billStore: { company: string | null; code: string } = { company: null, code: '' };
