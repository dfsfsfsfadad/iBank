import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar, SearchField } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const BRANCHES = [
  { name: 'Bank 1656 Union Street', dist: '54 m' },
  { name: 'Bank Secaucus', dist: '1.2 km' },
  { name: 'Bank 1657 Riverside Drive', dist: '5.5 km' },
  { name: 'Bank Rutherford', dist: '70 m' },
  { name: 'Bank 1656 Union Street', dist: '38 m' },
];

const PINS = [
  { top: 24, left: 24 }, { top: 60, left: 230 }, { top: 120, left: 80 },
  { top: 150, left: 200 }, { top: 40, left: 130 },
];

export function BranchScreen() {
  const { navigate } = useNavigation();
  const [q, setQ] = useState('');
  const list = BRANCHES.filter(b => b.name.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <ScreenShell>
      <TopBar title="Branch" variant="white" onBack={() => navigate('search')} />
      {/* Уақытша карта (макет). Нақты карта үшін: npx expo install react-native-maps */}
      <View style={styles.map}>
        <View style={[styles.road, { top: 70, transform: [{ rotate: '-18deg' }] }]} />
        <View style={[styles.road, { top: 130, transform: [{ rotate: '24deg' }] }]} />
        <View style={styles.river} />
        {PINS.map((p, i) => (
          <Ionicons key={i} name="location" size={26} color={colors.primary} style={{ position: 'absolute', ...p }} />
        ))}
      </View>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <SearchField value={q} onChangeText={setQ} placeholder="Bank" />
        {list.map((b, i) => (
          <View key={i} style={styles.row}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.name}>{b.name}</Text>
            <Text style={styles.dist}>{b.dist}</Text>
          </View>
        ))}
        {list.length === 0 && <Text style={styles.empty}>Nothing found</Text>}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  map: { height: 240, backgroundColor: '#E9ECF3', overflow: 'hidden', marginTop: 8 },
  road: { position: 'absolute', left: -20, width: 420, height: 8, backgroundColor: '#FFFFFF' },
  river: { position: 'absolute', top: 110, left: -40, width: 460, height: 24, backgroundColor: '#CFE3F6', transform: [{ rotate: '-35deg' }] },
  sheet: { flex: 1, marginTop: -28, backgroundColor: colors.white, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 24, paddingTop: 10, shadowColor: '#2A2350', shadowOpacity: 0.12, shadowRadius: 12, elevation: 8 },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 4, backgroundColor: colors.border, marginBottom: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  name: { flex: 1, color: colors.text, fontSize: 13 },
  dist: { color: colors.textSub, fontSize: 11 },
  empty: { color: colors.textSub, fontSize: 13, textAlign: 'center', marginTop: 24 },
});
