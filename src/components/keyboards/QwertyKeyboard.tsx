import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

const ROWS = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l'],
  ['z','x','c','v','b','n','m'],
];

export function QwertyKeyboard({ onPress }: { onPress: (k: string) => void }) {
  return (
    <View style={styles.root}>
      {ROWS.map((row, ri) => (
        <View key={ri} style={styles.row}>
          {ri === 2 && (
            <TouchableOpacity style={[styles.key, styles.wide]} onPress={() => onPress('shift')} activeOpacity={0.6}>
              <Ionicons name="arrow-up" size={16} color={colors.text} />
            </TouchableOpacity>
          )}
          {row.map(k => (
            <TouchableOpacity key={k} style={styles.key} onPress={() => onPress(k)} activeOpacity={0.6}>
              <Text style={styles.keyText}>{k}</Text>
            </TouchableOpacity>
          ))}
          {ri === 2 && (
            <TouchableOpacity style={[styles.key, styles.wide]} onPress={() => onPress('back')} activeOpacity={0.6}>
              <Ionicons name="backspace-outline" size={16} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.key, styles.wide]} onPress={() => onPress('123')} activeOpacity={0.6}><Text style={styles.keyText}>123</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.key, { flex: 3 }]} onPress={() => onPress(' ')} activeOpacity={0.6}><Text style={styles.keyText}>space</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.key, styles.wide]} onPress={() => onPress('return')} activeOpacity={0.6}><Text style={styles.keyText}>return</Text></TouchableOpacity>
      </View>
      <View style={styles.homeBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.bgMuted, paddingHorizontal: 4, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
  row: { flexDirection: 'row', marginBottom: 6, justifyContent: 'center' },
  key: { flex: 1, maxWidth: 38, height: 42, marginHorizontal: 2, backgroundColor: colors.white, borderRadius: 7, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, elevation: 1 },
  wide: { flex: 1.4, maxWidth: 60 },
  keyText: { fontSize: 15, color: colors.text },
  homeBar: { alignSelf: 'center', width: 120, height: 5, borderRadius: 5, backgroundColor: '#C7CAD8', marginVertical: 10 },
});