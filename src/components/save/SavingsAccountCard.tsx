import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export function SavingsAccountCard({ account, from, to, term, rate }: {
  account: string; from: string; to: string; term: string; rate: string;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.head}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.number}>{account}</Text>
      </View>
      <Row label="From" value={from} />
      <Row label="To" value={to} />
      <Row label="Time deposit" value={term} />
      <Row label="Interest rate" value={rate} />
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 14, marginBottom: 14, shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { color: colors.text, fontSize: 12, fontWeight: '700' },
  number: { color: colors.text, fontSize: 12, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  label: { color: colors.textSub, fontSize: 10 },
  value: { color: colors.primary, fontSize: 10, fontWeight: '700' },
});