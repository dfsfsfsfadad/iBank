import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export function DepositTermModal({ visible, options, value, onSelect, onClose }: {
  visible: boolean;
  options: { label: string }[];
  value: number | null;
  onSelect: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheet}>
          <TouchableOpacity style={styles.close} onPress={onClose} hitSlop={8}>
            <Ionicons name="close" size={18} color={colors.textSub} />
          </TouchableOpacity>
          <Text style={styles.title}>Choose time deposit</Text>
          {options.map((o, i) => {
            const on = value === i;
            return (
              <TouchableOpacity key={o.label} style={styles.row} activeOpacity={0.7} onPress={() => onSelect(i)}>
                <Text style={[styles.text, on && styles.textOn]}>{o.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', paddingHorizontal: 28 },
  sheet: { backgroundColor: colors.white, borderRadius: 18, paddingVertical: 18, paddingHorizontal: 16 },
  close: { position: 'absolute', top: 12, right: 12, zIndex: 1 },
  title: { color: colors.text, fontSize: 13, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  row: { paddingVertical: 9, alignItems: 'center' },
  text: { color: colors.textSub, fontSize: 12 },
  textOn: { color: colors.primary, fontWeight: '700' },
});