import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchField } from './SearchField';
import { colors, radius } from '../../theme';

// Басқанда таңдау терезесін ашатын өріс
export function PickField({ label, value, placeholder, onPress }: {
  label: string; value: string | null; placeholder: string; onPress: () => void;
}) {
  return (
    <View style={styles.wrap}>
      {!!value && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity style={styles.field} activeOpacity={0.8} onPress={onPress}>
        <Text style={[styles.text, { color: value ? colors.text : colors.textMute }]}>{value || placeholder}</Text>
        <Ionicons name={value ? 'chevron-forward' : 'chevron-down'} size={18} color={colors.textSub} />
      </TouchableOpacity>
    </View>
  );
}

// Тізімнен таңдау терезесі (іздеумен немесе іздеусіз)
export function PickerModal({ visible, title, options, value, searchable, onSelect, onClose }: {
  visible: boolean; title: string; options: string[]; value: string | null;
  searchable?: boolean; onSelect: (v: string) => void; onClose: () => void;
}) {
  const [q, setQ] = useState('');
  const list = options.filter(o => o.toLowerCase().includes(q.trim().toLowerCase()));
  const close = () => { setQ(''); onClose(); };
  const pick = (o: string) => { setQ(''); onSelect(o); };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={close} />
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          {searchable && <SearchField value={q} onChangeText={setQ} placeholder="Search" />}
          <ScrollView style={{ maxHeight: 340 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {list.map(o => (
              <TouchableOpacity key={o} style={styles.row} activeOpacity={0.7} onPress={() => pick(o)}>
                <Text style={[styles.rowText, o === value && styles.rowOn]}>{o}</Text>
                {o === value && <Ionicons name="checkmark" size={16} color={colors.primary} />}
              </TouchableOpacity>
            ))}
            {list.length === 0 && <Text style={styles.empty}>Nothing found</Text>}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { color: colors.textSub, fontSize: 11, marginBottom: 6 },
  field: { height: 50, borderRadius: radius.field, backgroundColor: colors.fieldBg, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  text: { fontSize: 14 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', paddingHorizontal: 24 },
  sheet: { backgroundColor: colors.white, borderRadius: 18, padding: 18 },
  title: { color: colors.text, fontSize: 14, fontWeight: '700', textAlign: 'center', marginBottom: 14 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  rowText: { color: colors.textSub, fontSize: 13 },
  rowOn: { color: colors.text, fontWeight: '700' },
  empty: { color: colors.textSub, fontSize: 13, textAlign: 'center', paddingVertical: 20 },
});
