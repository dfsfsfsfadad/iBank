import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme';

export function SelectField({ value, placeholder }: { value?: string; placeholder: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.text, { color: value ? colors.text : colors.textMute }]}>{value || placeholder}</Text>
      <View style={styles.chev}><Ionicons name="chevron-down" size={18} color={colors.textSub} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', marginBottom: 14, height: 50, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', paddingHorizontal: 16 },
  text: { fontSize: 14 },
  chev: { position: 'absolute', right: 6, top: 0, height: 50, width: 40, alignItems: 'center', justifyContent: 'center' },
});