import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { CURRENCIES, loadRates, fmt } from '../data/exchange';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const FLAGS: Record<string, string> = { USD: '🇺🇸', EUR: '🇪🇺', RUB: '🇷🇺', CNY: '🇨🇳', KRW: '🇰🇷' };

export function ExchangeRateScreen() {
  const { navigate } = useNavigation();
  const [, setTick] = useState(0);

  useEffect(() => {
    loadRates().then(() => setTick(t => t + 1));
  }, []);

  return (
    <ScreenShell>
      <TopBar title="Exchange rate" variant="white" onBack={() => navigate('search')} />
      <View style={styles.table}>
        <View style={[styles.row, styles.head]}>
          <Text style={[styles.th, { flex: 2.4 }]}>Currency</Text>
          <Text style={[styles.th, { flex: 1 }]}>Buy</Text>
          <Text style={[styles.th, { flex: 1 }]}>Sell</Text>
        </View>
        {CURRENCIES.map(c => (
          <View key={c.code} style={styles.row}>
            <View style={[styles.country, { flex: 2.4 }]}>
              <Text style={styles.flag}>{FLAGS[c.code] ?? '🏳️'}</Text>
              <Text style={styles.td}>{c.code} ({c.name})</Text>
            </View>
            <Text style={[styles.td, { flex: 1 }]}>{fmt(c.rate * 0.99)}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{fmt(c.rate * 1.015)}</Text>
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