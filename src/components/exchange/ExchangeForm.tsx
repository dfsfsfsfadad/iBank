import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Field, PrimaryButton, Card } from '../ui';
import { ExchangeIllustration } from '../illustrations';
import { CURRENCIES, BASE, exchangeStore, fmt } from '../../data/exchange';
import { colors, radius } from '../../theme';

export function ExchangeForm({ amount, onAmountChange, onOpenCurrency, onSubmit }: {
  amount: string;
  onAmountChange: (t: string) => void;
  onOpenCurrency: () => void;
  onSubmit: () => void;
}) {
  const [reverse, setReverse] = useState(exchangeStore.reverse);
  const cur = CURRENCIES[exchangeStore.currencyIdx];
  const num = parseFloat(amount.replace(',', '.'));
  const valid = Number.isFinite(num) && num > 0;
  const result = valid ? fmt(reverse ? num / cur.rate : num * cur.rate) : '';
  const fromCode = reverse ? BASE : cur.code;
  const toCode = reverse ? cur.code : BASE;

  const toggle = () => {
    exchangeStore.reverse = !reverse;
    setReverse(!reverse);
  };

  return (
    <>
      <ExchangeIllustration />
      <Card>
        <Text style={styles.label}>From</Text>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Field value={amount} onChangeText={onAmountChange} placeholder="Amount" keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.cur} onPress={onOpenCurrency} activeOpacity={0.8}>
            <Text style={styles.curText}>{fromCode}</Text>
            <Ionicons name="chevron-expand" size={14} color={colors.textSub} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.swap} onPress={toggle} activeOpacity={0.7}>
          <Ionicons name="arrow-down" size={18} color={colors.primary} />
          <Ionicons name="arrow-up" size={18} color={colors.red} />
        </TouchableOpacity>

        <Text style={styles.label}>To</Text>
        <View style={styles.row}>
          <View style={[styles.box, { flex: 1 }]}>
            <Text style={{ color: result ? colors.text : colors.textMute, fontSize: 14 }}>{result || 'Amount'}</Text>
          </View>
          <TouchableOpacity style={styles.cur} onPress={onOpenCurrency} activeOpacity={0.8}>
            <Text style={styles.curText}>{toCode}</Text>
            <Ionicons name="chevron-expand" size={14} color={colors.textSub} />
          </TouchableOpacity>
        </View>

        <View style={styles.rateRow}>
          <Text style={styles.rateLabel}>Currency rate</Text>
          <Text style={styles.rateValue}>1 {cur.code} = {cur.rate} {BASE}</Text>
        </View>

        <PrimaryButton label="Exchange" active={valid} onPress={onSubmit} />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  label: { color: colors.textSub, fontSize: 12, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  cur: { height: 50, minWidth: 84, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  curText: { color: colors.text, fontSize: 13 },
  box: { height: 50, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', paddingHorizontal: 16 },
  swap: { alignSelf: 'center', flexDirection: 'row', gap: 6, paddingVertical: 4, marginBottom: 8 },
  rateRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, marginBottom: 6 },
  rateLabel: { color: colors.textSub, fontSize: 12 },
  rateValue: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
