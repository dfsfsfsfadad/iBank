import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme';

export function Dropdown({ value, placeholder, options, onSelect }: {
  value: string | null; placeholder: string; options: string[]; onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.field} activeOpacity={0.8} onPress={() => setOpen(o => !o)}>
        <Text style={[styles.text, { color: value ? colors.text : colors.textMute }]}>{value || placeholder}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSub} />
      </TouchableOpacity>
      {open && (
        <View style={styles.list}>
          {options.map(o => (
            <TouchableOpacity key={o} style={styles.item} onPress={() => { onSelect(o); setOpen(false); }}>
              <Text style={[styles.text, { color: colors.text }, o === value && styles.on]}>{o}</Text>
              {o === value && <Ionicons name="checkmark" size={16} color={colors.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  field: { height: 50, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  text: { fontSize: 14 },
  list: { marginTop: 6, borderRadius: radius.field, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 14 },
  on: { color: colors.primary, fontWeight: '700' },
});
