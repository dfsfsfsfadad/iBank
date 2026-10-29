import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export function NumericKeyboard({ onPress }: { onPress: (k: string) => void }) {
  const keys = ['1','2','3','4','5','6','7','8','9'];
  return (
    <View style={styles.root}>
      <View style={styles.grid}>
        {keys.map(k => (
          <TouchableOpacity key={k} style={styles.key} onPress={() => onPress(k)} activeOpacity={0.6}>
            <Text style={styles.keyText}>{k}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        <View style={styles.empty} />
        <TouchableOpacity style={styles.key} onPress={() => onPress('0')} activeOpacity={0.6}>
          <Text style={styles.keyText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.key} onPress={() => onPress('back')} activeOpacity={0.6}>
          <Ionicons name="backspace-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.homeBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.bgMuted, paddingHorizontal: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  key: { width: '33.33%', aspectRatio: 1.7, backgroundColor: colors.white, borderRadius: 10, margin: 4, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, elevation: 1 },
  keyText: { fontSize: 20, fontWeight: '600', color: colors.text },
  empty: { width: '33.33%', margin: 4 },
  row: { flexDirection: 'row' },
  homeBar: { alignSelf: 'center', width: 120, height: 5, borderRadius: 5, backgroundColor: '#C7CAD8', marginVertical: 10 },
});
