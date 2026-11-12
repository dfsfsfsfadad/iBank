import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const ITEMS = [
  { route: 'saveAdd1' as const, title: 'Add', sub: 'Add new save online account', icon: 'add-circle-outline' as const, color: colors.primary },
  { route: 'saveManagement' as const, title: 'Management', sub: 'Manage your save online account', icon: 'albums-outline' as const, color: colors.orange },
];

export function SaveOnline1Screen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="Save online" variant="white" onBack={() => navigate('home')} />
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