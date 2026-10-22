import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

export function PrimaryButton({ label, active = true, onPress }: {
  label: string; active?: boolean; onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.btn, !active && styles.disabled]}
      onPress={active ? onPress : undefined}
      activeOpacity={0.85}
      disabled={!active}
    >
      <Text style={[styles.text, !active && { color: '#C9CBDD' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: { height: 50, borderRadius: radius.btn, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  disabled: { backgroundColor: '#EDEEF6' },
  text: { color: colors.white, fontSize: 15, fontWeight: '700' },
});