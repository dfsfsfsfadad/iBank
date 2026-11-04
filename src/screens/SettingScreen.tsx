import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell, BottomNav } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { useTabNavigate } from '../navigation/useTabNavigate';
import type { Route } from '../navigation/types';
import { colors } from '../theme';

const ROWS: { label: string; route?: Route; value?: string }[] = [
  { label: 'Password', route: 'settingpw' },
  { label: 'Touch ID' },
  { label: 'Languages', route: 'language' },
  { label: 'App information', route: 'appinfo' },
  { label: 'Customer care', value: '18009998' },
];

// Setting
export function SettingScreen() {
  const { navigate } = useNavigation();
  const go = useTabNavigate();

  return (
    <ScreenShell purple keyboard={<BottomNav active="settings" onChange={go} />}>
      <TopBar title="Setting" onBack={() => navigate('home')} />
      <View style={styles.profile}>
        <View style={styles.avatar}><Ionicons name="person" size={40} color={colors.primary} /></View>
        <Text style={styles.name}>Push Puttichai</Text>
      </View>
      <View style={styles.sheet}>
        {ROWS.map(r => (
          <TouchableOpacity
            key={r.label}
            style={styles.row}
            activeOpacity={0.7}
            onPress={() => { if (r.route) navigate(r.route); }}
          >
            <Text style={styles.label}>{r.label}</Text>
            {r.value
              ? <Text style={styles.value}>{r.value}</Text>
              : <Ionicons name="chevron-forward" size={16} color={colors.textMute} />}
          </TouchableOpacity>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  profile: { alignItems: 'center', paddingTop: 10, paddingBottom: 22 },
  avatar: { width: 80, height: 80, borderRadius: 999, backgroundColor: colors.white, borderWidth: 3, borderColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.white, fontSize: 13, fontWeight: '700', marginTop: 10 },
  sheet: { flex: 1, backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 24, paddingTop: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  label: { color: colors.text, fontSize: 13 },
  value: { color: colors.textSub, fontSize: 11 },
});
