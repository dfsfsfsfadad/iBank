import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar } from '../components/ui';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const ROWS: [string, string][] = [
  ['Name', 'Push Puttichoi'],
  ['Card number', '**** **** 9018'],
  ['Valid from', '10/15'],
  ['Good thru', '10/20'],
  ['Available balance', '$10,000'],
];

// Card Detail
export function CardDetailScreen() {
  const { navigate } = useNavigation();

  const remove = () =>
    Alert.alert('Delete card', 'Are you sure you want to delete this card?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => navigate('home') },
    ]);

  return (
    <ScreenShell>
      <TopBar title="Card" variant="white" onBack={() => navigate('home')} />
      <View style={styles.body}>
        <View>
          {ROWS.map(r => (
            <View key={r[0]} style={styles.row}>
              <Text style={styles.label}>{r[0]}</Text>
              <Text style={styles.value}>{r[1]}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.delete} onPress={remove} activeOpacity={0.7}>
          <Text style={styles.deleteText}>Delete card</Text>
        </TouchableOpacity>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  label: { color: colors.textSub, fontSize: 11.5 },
  value: { color: colors.primary, fontSize: 11.5, fontWeight: '700' },
  delete: { alignSelf: 'center', paddingVertical: 24 },
  deleteText: { color: colors.red, fontSize: 12.5, fontWeight: '600' },
});
