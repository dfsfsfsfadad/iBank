import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme';

export type NavTab = 'home' | 'search' | 'mail' | 'settings';

const TABS: { id: NavTab; icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'search', icon: 'search', label: 'Search' },
  { id: 'mail', icon: 'mail-outline', label: 'Mail' },
  { id: 'settings', icon: 'settings-outline', label: 'Settings' },
];

export function BottomNav({ active, onChange }: { active: NavTab; onChange: (t: NavTab) => void }) {
  return (
    <View style={styles.nav}>
      {TABS.map(it => {
        const on = active === it.id;
        return (
          <TouchableOpacity key={it.id} style={styles.item} onPress={() => onChange(it.id)} activeOpacity={0.7}>
            {on ? (
              <View style={styles.pill}>
                <Ionicons name={it.icon} size={18} color={colors.white} />
                <Text style={styles.pillText}>{it.label}</Text>
              </View>
            ) : (
              <Ionicons name={it.icon} size={22} color={colors.textSub} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', alignItems: 'center', height: 70, backgroundColor: colors.white, borderTopWidth: 1, borderTopColor: colors.border, paddingHorizontal: 10 },
  item: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.primary, paddingHorizontal: 18, paddingVertical: 9, borderRadius: radius.pill },
  pillText: { color: colors.white, fontSize: 13, fontWeight: '700' },
});
