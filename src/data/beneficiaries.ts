export type Beneficiary = {
  id: string; name: string; fullName: string; card: string; color: string;
  bank?: string; branch?: string;
};

export const BENEFICIARY_GROUPS: { title: string; items: Beneficiary[] }[] = [
  {
    title: 'Transfer via card number',
    items: [
      { id: 'push', name: 'Push', fullName: 'Push Puttichai', card: '12718980890', color: '#F59E0B' },
      { id: 'olivia', name: 'Olivia', fullName: 'Olivia Wilson', card: '0345876231', color: '#EC4899' },
    ],
  },
  {
    title: 'Transfer to the same bank',
    items: [
      { id: 'alexander', name: 'Alexander', fullName: 'Alexander Pope', card: '12718980890', color: '#3B82F6' },
      { id: 'harper', name: 'Harper', fullName: 'Harper Lee', card: '0345876231', color: '#8B5CF6' },
    ],
  },
  {
    title: 'Transfer to another bank',
    items: [
      { id: 'thomas', name: 'Thomas', fullName: 'Thomas Shelby', card: '12718980890', color: '#22C55E', bank: 'Citibank', branch: 'New York' },
      { id: 'sanmotha', name: 'Sanmotha', fullName: 'Sanmotha Ray', card: '0345876231', color: '#EF4444', bank: 'Citibank', branch: 'New York' },
      { id: 'justin', name: 'Justin', fullName: 'Justin Biber', card: '12718960890', color: '#2DD4BF', bank: 'Wells Fargo', branch: 'Chicago' },
    ],
  },
];

export const ALL_BENEFICIARIES = BENEFICIARY_GROUPS.flatMap(g => g.items);

// Directory #2 → #4: переносит данные нового получателя
export const benefStore: { mode: 'same' | 'bank' | 'card' | null; bank: string | null; branch: string | null; name: string; card: string } = {
  mode: null, bank: null, branch: null, name: '', card: '',
};