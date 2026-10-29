import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Field, Checkbox, PrimaryButton, Card } from '../ui';
import { colors, radius } from '../../theme';

export type TransferValues = {
  acc: number | null; tx: number | null; benef: string | null;
  name: string; card: string; amount: string; content: string; save: boolean;
};

export const EMPTY_TRANSFER: TransferValues = {
  acc: null, tx: null, benef: null, name: '', card: '', amount: '', content: '', save: false,
};

export const FILLED_TRANSFER: TransferValues = {
  acc: 0, tx: 0, benef: 'emma', name: 'Capi Creative Design', card: '0123456789109',
  amount: '1000', content: '1000', save: true,
};

// Transfer #1 → Transfer #2 арасында мәндерді тасымалдайды
export const transferStore: { values: TransferValues } = { values: FILLED_TRANSFER };

const ACCOUNTS = [
  { label: 'VISA **** **** **** 1234', balance: '10,000$' },
  { label: 'MASTERCARD **** **** **** 5678', balance: '2,350$' },
];

const TX: { label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Transfer via card number', icon: 'card-outline' },
  { label: 'Transfer to the same bank', icon: 'person-outline' },
  { label: 'Transfer to another bank', icon: 'business-outline' },
];

const BENEFICIARIES = [
  { id: 'emma', name: 'Emma', fullName: 'Capi Creative Design', card: '0123456789109', color: colors.pink },
  { id: 'justin', name: 'Justin', fullName: 'Justin Wood', card: '0987654321098', color: colors.blue },
];

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
  'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function words(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + words(n % 100) : '');
  if (n < 1000000) return words(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + words(n % 1000) : '');
  return String(n);
}

function amountWords(s: string) {
  const n = parseInt(s.replace(/\D/g, ''), 10);
  if (!n) return '';
  const w = words(n);
  return w.charAt(0).toUpperCase() + w.slice(1) + ' dollar';
}

export function TransferForm({ initial, submitLabel, onSubmit }: {
  initial: TransferValues;
  submitLabel: string;
  onSubmit: (v: TransferValues) => void;
}) {
  const [v, setV] = useState<TransferValues>(initial);
  const [accOpen, setAccOpen] = useState(false);
  const set = (p: Partial<TransferValues>) => setV(prev => ({ ...prev, ...p }));

  const active = v.acc !== null && v.tx !== null && !!v.name && !!v.card && !!v.amount && !!v.content;
  const wordsText = amountWords(v.amount);

  const pickBenef = (id: string) => {
    const b = BENEFICIARIES.find(x => x.id === id);
    if (b) set({ benef: id, name: b.fullName, card: b.card });
  };

  return (
    <>
      <View style={styles.pad}>
        <TouchableOpacity style={styles.select} activeOpacity={0.8} onPress={() => setAccOpen(o => !o)}>
          <Text style={[styles.selectText, v.acc === null && { color: colors.textMute }]}>
            {v.acc === null ? 'Choose account / card' : ACCOUNTS[v.acc].label}
          </Text>
          <Ionicons name={accOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textSub} />
        </TouchableOpacity>
        {accOpen && (
          <View style={styles.dropdown}>
            {ACCOUNTS.map((a, i) => (
              <TouchableOpacity key={a.label} style={styles.dropItem} onPress={() => { set({ acc: i }); setAccOpen(false); }}>
                <Text style={styles.selectText}>{a.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {v.acc !== null && <Text style={styles.balance}>Available balance: {ACCOUNTS[v.acc].balance}</Text>}

        <Text style={[styles.label, { marginTop: 18 }]}>Choose transaction</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {TX.map((t, i) => {
            const on = v.tx === i;
            return (
              <TouchableOpacity key={t.label} style={[styles.tile, on && styles.tileOn]} activeOpacity={0.8} onPress={() => set({ tx: i })}>
                <Ionicons name={t.icon} size={20} color={on ? colors.white : colors.textSub} />
                <Text style={[styles.tileText, on && { color: colors.white }]}>{t.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.benefHead}>
          <Text style={styles.label}>Choose beneficiary</Text>
          <TouchableOpacity><Text style={styles.find}>Find beneficiary</Text></TouchableOpacity>
        </View>
        <View style={styles.benefRow}>
          <TouchableOpacity style={styles.add} activeOpacity={0.8}>
            <Ionicons name="add" size={26} color={colors.textMute} />
          </TouchableOpacity>
          {BENEFICIARIES.map(b => (
            <TouchableOpacity key={b.id} style={[styles.benef, v.benef === b.id && styles.benefOn]} onPress={() => pickBenef(b.id)} activeOpacity={0.8}>
              <View style={[styles.avatar, { backgroundColor: b.color + '33' }]}>
                <Ionicons name="person" size={22} color={b.color} />
              </View>
              <Text style={styles.benefName}>{b.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Card>
        <Field value={v.name} onChangeText={t => set({ name: t })} placeholder="Name" />
        <Field value={v.card} onChangeText={t => set({ card: t })} placeholder="Card number" keyboardType="numeric" />
        <Field value={v.amount} onChangeText={t => set({ amount: t })} placeholder="Amount" keyboardType="numeric" />
        {!!wordsText && <Text style={styles.words}>{wordsText}</Text>}
        <Field value={v.content} onChangeText={t => set({ content: t })} placeholder="Content" />
        <Checkbox checked={v.save} onToggle={() => set({ save: !v.save })}>Save to directory of beneficiary</Checkbox>
        <PrimaryButton label={submitLabel} active={active} onPress={() => onSubmit(v)} />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  pad: { paddingHorizontal: 24, paddingTop: 14 },
  select: { height: 44, borderRadius: radius.field, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14 },
  selectText: { color: colors.text, fontSize: 13 },
  dropdown: { marginTop: 6, borderRadius: radius.field, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  dropItem: { paddingVertical: 12, paddingHorizontal: 14 },
  balance: { color: colors.primary, fontSize: 11.5, fontWeight: '700', marginTop: 8 },
  label: { color: colors.textSub, fontSize: 12 },
  tile: { width: 120, height: 84, borderRadius: 14, backgroundColor: '#EDEEF6', padding: 12, justifyContent: 'space-between', marginTop: 8 },
  tileOn: { backgroundColor: colors.primary },
  tileText: { color: colors.textSub, fontSize: 10.5, lineHeight: 14 },
  benefHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 },
  find: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  benefRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 10 },
  add: { width: 60, height: 70, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  benef: { width: 70, height: 70, borderRadius: 16, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', gap: 4, borderWidth: 1.5, borderColor: 'transparent', shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 },
  benefOn: { borderColor: colors.primary },
  avatar: { width: 36, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  benefName: { color: colors.text, fontSize: 10.5 },
  words: { color: colors.primary, fontSize: 11, marginTop: -8, marginBottom: 12 },
});
