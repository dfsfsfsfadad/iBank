import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme';

export function SearchField({ value, onChangeText, placeholder }: {
  value: string; onChangeText: (t: string) => void; placeholder: string;
}) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="search" size={16} color={colors.primary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMute}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText('')} hitSlop={8}>
          <Ionicons name="close" size={16} color={colors.textSub} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 8, height: 44, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, marginBottom: 14 },
  input: { flex: 1, fontSize: 14, color: colors.text, paddingVertical: 0 },
});
