import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export function TopBar({ title, variant = 'purple', onBack }: {
  title: string; variant?: 'purple' | 'white'; onBack?: () => void;
}) {
  const purple = variant === 'purple';
  return (
    <View style={[styles.bar, purple ? styles.purple : styles.white]}>
      <TouchableOpacity style={styles.back} onPress={onBack} activeOpacity={0.7}>
        <Ionicons name="chevron-back" size={22} color={purple ? colors.white : colors.text} />
        <Text style={[styles.title, { color: purple ? colors.white : colors.text }]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  purple: {},
  white: { backgroundColor: colors.bg },
  back: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  title: { fontSize: 16, fontWeight: '600', marginLeft: 2 },
});