import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell, BottomNav } from '../components/layout';
import type { NavTab } from '../components/layout/BottomNav';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import type { Route } from '../navigation/types';
import { colors } from '../theme';

type Item = {
  route: Route; title: string; sub: string;
  icon: keyof typeof Ionicons.glyphMap; color: string;
};

const ITEMS: Item[] = [
  { route: 'branch',       title: 'Branch',        sub: 'Search for branch',        icon: 'location-outline',        color: colors.primary },
  { route: 'interest',     title: 'Interest rate', sub: 'Search for interest rate', icon: 'trending-up-outline',     color: colors.orange },
  { route: 'exchangeRate', title: 'Exchange rate', sub: 'Search for exchange rate', icon: 'cash-outline',            color: colors.green },
  { route: 'exchange1',     title: 'Exchange',      sub: 'Exchange amount of money', icon: 'swap-horizontal-outline', color: colors.red },
];

export function SearchScreen() {
  const { navigate } = useNavigation();
  const go = (t: NavTab) => {
    if (t === 'home') navigate('home');
    else if (t === 'settings') navigate('language');
  };

  return (
    <ScreenShell keyboard={<BottomNav active="search" onChange={go} />}>
      <TopBar title="Search" variant="white" onBack={() => navigate('home')} />
      <View style={styles.list}>
        {ITEMS.map(it => (
          <TouchableOpacity key={it.route} style={styles.card} activeOpacity={0.8} onPress={() => navigate(it.route)}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{it.title}</Text>
              <Text style={styles.sub}>{it.sub}</Text>
            </View>
            <View style={[styles.icon, { backgroundColor: it.color + '1A' }]}>
              <Ionicons name={it.icon} size={28} color={it.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 24, paddingTop: 18, gap: 14 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, borderRadius: 18, padding: 16, shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  title: { color: colors.text, fontSize: 14, fontWeight: '700' },
  sub: { color: colors.textSub, fontSize: 11.5, marginTop: 4 },
  icon: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
