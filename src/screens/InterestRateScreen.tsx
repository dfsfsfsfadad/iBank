import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { FALLBACK_RATES, fetchInterestRates, type InterestRate } from '../data/interest';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

export function InterestRateScreen() {
  const { navigate } = useNavigation();
  const [rows, setRows] = useState<InterestRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows(await fetchInterestRates());
      setOffline(false);
    } catch {
      setRows(FALLBACK_RATES);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <ScreenShell>
      <TopBar title="Interest rate" variant="white" onBack={() => navigate('search')} />

      {offline && !loading && (
        <TouchableOpacity style={styles.banner} onPress={load} activeOpacity={0.8}>
          <Text style={styles.bannerText}>Offline data. Tap to refresh</Text>
        </TouchableOpacity>
      )}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <View style={styles.table}>
          <View style={[styles.row, styles.head]}>
            <Text style={[styles.th, { flex: 2.2 }]}>Interest kind</Text>
            <Text style={[styles.th, { flex: 1 }]}>Deposit</Text>
            <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Rate</Text>
          </View>
          {rows.map((r, i) => (
            <View key={i} style={styles.row}>
              <Text style={[styles.td, { flex: 2.2 }]}>{r.kind}</Text>
              <Text style={[styles.td, { flex: 1 }]}>{r.deposit}</Text>
              <Text style={[styles.rate, { flex: 1 }]}>{r.rate}</Text>
            </View>
          ))}
        </View>
      )}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  table: { paddingHorizontal: 24, paddingTop: 12 },
  center: { paddingVertical: 60, alignItems: 'center' },
  banner: { marginHorizontal: 24, marginTop: 8, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 12, backgroundColor: colors.lavender },
  bannerText: { color: colors.primary, fontSize: 11.5, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  head: { paddingVertical: 10 },
  th: { color: colors.textSub, fontSize: 12 },
  td: { color: colors.text, fontSize: 12.5 },
  rate: { color: colors.primary, fontSize: 12.5, fontWeight: '700', textAlign: 'right' },
});