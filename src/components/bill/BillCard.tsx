import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui';
import { BILL } from '../../data/bill';
import { colors } from '../../theme';

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

// "All the Bills" карточкасы
export function BillCard({ code }: { code: string }) {
  return (
    <Card>
      <Text style={styles.title}>All the Bills</Text>
      <Row label="Name" value={BILL.name} />
      <Row label="Address" value={BILL.address} />
      <Row label="Phone number" value={BILL.phone} />
      <Row label="Code" value={`#${code}`} />
      <Row label="From" value={BILL.from} />
      <Row label="To" value={BILL.to} />
      <View style={styles.gap} />
      <Amount label="Internet fee" value={BILL.fee} />
      <Amount label="Tax" value={BILL.tax} />
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.total}>${BILL.fee + BILL.tax}</Text>
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
