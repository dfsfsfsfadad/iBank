import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const ROWS: [string, string, string, string][] = [
  ['🇻🇳', 'Vietnam', '1,403', '1,746'],
  ['🇳🇮', 'Nicaragua', '9.123', '12.09'],
  ['🇰🇷', 'Korea', '3,704', '5,151'],
  ['🇷🇺', 'Russia', '116.0', '144.4'],
  ['🇨🇳', 'China', '1,725', '2,234'],
  ['🇵🇹', 'Portuguese', '1,403', '1,746'],
  ['🇰🇷', 'Korea', '3,454', '4,312'],
  ['🇫🇷', 'French', '23.45', '34.56'],
  ['🇳🇮', 'Nicaragua', '283.1', '300.3'],
  ['🇨🇳', 'China', '1,725', '2,234'],
];

export function ExchangeRateScreen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Exchange rate" variant="white" onBack={() => navigate('search')} />
      <View style={styles.table}>
        <View style={[styles.row, styles.head]}>
          <Text style={[styles.th, { flex: 2.4 }]}>Country</Text>
          <Text style={[styles.th, { flex: 1 }]}>Buy</Text>
          <Text style={[styles.th, { flex: 1 }]}>Sell</Text>
        </View>
        {ROWS.map((r, i) => (
          <View key={i} style={styles.row}>
            <View style={[styles.country, { flex: 2.4 }]}>
              <Text style={styles.flag}>{r[0]}</Text>
              <Text style={styles.td}>{r[1]}</Text>
            </View>
            <Text style={[styles.td, { flex: 1 }]}>{r[2]}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{r[3]}</Text>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  table: { paddingHorizontal: 24, paddingTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  head: { paddingVertical: 10 },
  th: { color: colors.textSub, fontSize: 12 },
  country: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  flag: { fontSize: 18 },
  td: { color: colors.text, fontSize: 12.5 },
});
