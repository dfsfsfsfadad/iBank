import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const ROWS: [string, string][] = [
  ['Date of manufacture', 'Dec 2010'],
  ['Version', '9.0.2'],
  ['Language', 'English'],
];

// App information
export function AppInfoScreen() {
  const { navigate } = useNavigation();
  return (
    <ScreenShell>
      <TopBar title="App information" variant="white" onBack={() => navigate('setting')} />
      <View style={styles.body}>
        <Text style={styles.title}>iBank E-mobile Banking</Text>
        {ROWS.map(r => (
          <View key={r[0]} style={styles.row}>
            <Text style={styles.label}>{r[0]}</Text>
            <Text style={styles.value}>{r[1]}</Text>
          </View>
        ))}
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 18 },
  title: { color: colors.text, fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  label: { color: colors.text, fontSize: 12.5 },
  value: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});
