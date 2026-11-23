import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, SearchField } from '../components/ui';
import { fetchBanks, fmtDist, getCenter, osmUrl, type Branch } from '../data/branches';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

type State = { loading: boolean; error: string | null; items: Branch[]; gps: boolean };

export function BranchScreen() {
  const { navigate } = useNavigation();
  const [q, setQ] = useState('');
  const [state, setState] = useState<State>({ loading: true, error: null, items: [], gps: false });

  const run = useCallback(async () => {
    const { center, gps } = await getCenter();
    try {
      const items = await fetchBanks(center);
      setState({ loading: false, error: null, items, gps });
    } catch (e) {
      const msg = e instanceof Error && e.name === 'AbortError' ? 'Request timed out' : 'Could not load branches';
      setState({ loading: false, error: msg, items: [], gps });
    }
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  const retry = () => {
    setState(s => ({ ...s, loading: true, error: null }));
    run();
  };

  const list = state.items.filter(b => {
    const s = q.trim().toLowerCase();
    return b.name.toLowerCase().includes(s) || b.address.toLowerCase().includes(s);
  });

  return (
    <ScreenShell>
      <TopBar title="Branch" variant="white" onBack={() => navigate('search')} />
      <View style={styles.banner}>
        <Ionicons name={state.gps ? 'navigate' : 'location-outline'} size={16} color={colors.primary} />
        <Text style={styles.bannerText}>
          {state.gps ? 'Branches near your location' : 'Location is off: showing the city center'}
        </Text>
      </View>

      <View style={styles.sheet}>
        <SearchField value={q} onChangeText={setQ} placeholder="Bank" />

        {state.loading && (
          <View style={styles.center}>
            <ActivityIndicator color={colors.primary} />
            <Text style={styles.hint}>Searching nearby banks...</Text>
          </View>
        )}

        {!state.loading && state.error && (
          <View style={styles.center}>
            <Text style={styles.hint}>{state.error}</Text>
            <TouchableOpacity style={styles.retry} onPress={retry} activeOpacity={0.85}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        )}

        {!state.loading && !state.error && list.map(b => (
          <TouchableOpacity key={b.id} style={styles.row} activeOpacity={0.7} onPress={() => Linking.openURL(osmUrl(b))}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{b.name}</Text>
              {!!b.address && <Text style={styles.sub}>{b.address}</Text>}
              {!!b.hours && <Text style={styles.sub}>{b.hours}</Text>}
            </View>
            <Text style={styles.dist}>{fmtDist(b.distM)}</Text>
          </TouchableOpacity>
        ))}

        {!state.loading && !state.error && list.length === 0 && (
          <Text style={styles.empty}>Nothing found</Text>
        )}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 24, marginTop: 8, marginBottom: 12, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 14, backgroundColor: colors.lavender },
  bannerText: { color: colors.primary, fontSize: 11.5, fontWeight: '700', flex: 1 },
  sheet: { flex: 1, paddingHorizontal: 24 },
  center: { alignItems: 'center', gap: 12, paddingVertical: 36 },
  hint: { color: colors.textSub, fontSize: 12.5, textAlign: 'center' },
  retry: { height: 40, paddingHorizontal: 22, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  retryText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  name: { color: colors.text, fontSize: 13, fontWeight: '600' },
  sub: { color: colors.textSub, fontSize: 10.5, marginTop: 2 },
  dist: { color: colors.textSub, fontSize: 11 },
  empty: { color: colors.textSub, fontSize: 13, textAlign: 'center', marginTop: 24 },
});