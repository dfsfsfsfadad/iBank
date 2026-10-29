import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const ROWS: [string, string, string][] = [
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '2m', '5.50%'],
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '6m', '2.50%'],
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '8m', '6.50%'],
  ['Individual customers', '1m', '4.50%'],
  ['Corporate customers', '7m', '6.80%'],
  ['Individual customers', '1m', '4.50%'],
  ['Individual customers', '12m', '5.90%'],
  ['Individual customers', '1m', '4.50%'],
];

export function InterestRateScreen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Interest rate" variant="white" onBack={() => navigate('search')} />
      <View style={styles.table}>
        <View style={[styles.row, styles.head]}>
          <Text style={[styles.th, { flex: 2.2 }]}>Interest kind</Text>
          <Text style={[styles.th, { flex: 1 }]}>Deposit</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Rate</Text>
        </View>
        {ROWS.map((r, i) => (
          <View key={i} style={styles.row}>
            <Text style={[styles.td, { flex: 2.2 }]}>{r[0]}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{r[1]}</Text>
            <Text style={[styles.rate, { flex: 1 }]}>{r[2]}</Text>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  table: { paddingHorizontal: 24, paddingTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  head: { paddingVertical: 10 },
  th: { color: colors.textSub, fontSize: 12 },
  td: { color: colors.text, fontSize: 12.5 },
  rate: { color: colors.primary, fontSize: 12.5, fontWeight: '700', textAlign: 'right' },
});
