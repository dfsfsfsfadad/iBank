import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const LANGS: [string, string][] = [
  ['🇻🇳', 'Vietnamese'], ['🇫🇷', 'French'], ['🇬🇧', 'English'], ['🇯🇵', 'Japanese'],
  ['🇵🇹', 'Portuguese'], ['🇨🇳', 'Chinese'], ['🇰🇷', 'Korean'], ['🇳🇮', 'Nicaraguan'],
  ['🇷🇺', 'Russian'], ['🇵🇹', 'Portuguese'], ['🇫🇷', 'French'],
];

export function LanguageScreen() {
  const { navigate } = useNavigation();
  const [sel, setSel] = useState(2);
  return (
    <ScreenShell>
      <TopBar title="Language" variant="white" onBack={() => navigate('home')} />
      <View style={styles.list}>
        {LANGS.map((l, i) => (
          <TouchableOpacity key={i} style={styles.row} activeOpacity={0.7} onPress={() => setSel(i)}>
            <Text style={styles.flag}>{l[0]}</Text>
            <Text style={[styles.name, sel === i && styles.nameOn]}>{l[1]}</Text>
            {sel === i && <Ionicons name="checkmark" size={18} color={colors.primary} />}
          </TouchableOpacity>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 24, paddingTop: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  flag: { fontSize: 20 },
  name: { flex: 1, color: colors.textSub, fontSize: 13 },
  nameOn: { color: colors.text, fontWeight: '700' },
});
