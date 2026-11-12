import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui';
import { BILL } from '../../data/bill';
import { colors } from '../../theme';

type BillData = typeof BILL;

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Amount({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.row}>
      <Text style={styles.feeLabel}>{label}</Text>
      <Text style={styles.fee}>${value}</Text>
    </View>
  );
}

// "All the Bills" карточка. bill и feeLabel нужны для электрички и других счетов
export function BillCard({ code, bill = BILL, feeLabel = 'Internet fee' }: {
  code: string; bill?: BillData; feeLabel?: string;
}) {
  return (
    <Card>
      <Text style={styles.title}>All the Bills</Text>
      <Row label="Name" value={bill.name} />
      <Row label="Address" value={bill.address} />
      <Row label="Phone number" value={bill.phone} />
      <Row label="Code" value={`#${code}`} />
      <Row label="From" value={bill.from} />
      <Row label="To" value={bill.to} />
      <View style={styles.gap} />
      <Amount label={feeLabel} value={bill.fee} />
      <Amount label="Tax" value={bill.tax} />
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.total}>${bill.fee + bill.tax}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingVertical: 5 },
  label: { color: colors.textSub, fontSize: 11.5 },
  value: { flex: 1, marginLeft: 16, color: colors.text, fontSize: 11.5, fontWeight: '700', textAlign: 'right' },
  gap: { height: 8 },
  feeLabel: { color: colors.textSub, fontSize: 12 },
  fee: { color: colors.primary, fontSize: 12.5, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.bgMuted, marginVertical: 8 },
  totalLabel: { color: colors.text, fontSize: 12, fontWeight: '800' },
  total: { color: colors.red, fontSize: 18, fontWeight: '800' },
});