import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export function BeneficiaryRow({ name, card, color, onPress }: {
  name: string; card: string; color: string; onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <View style={[styles.avatar, { backgroundColor: color + '33' }]}>
        <Ionicons name="person" size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.card}>{card}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.bgMuted },
  avatar: { width: 36, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  name: { color: colors.text, fontSize: 12.5, fontWeight: '700' },
  card: { color: colors.textSub, fontSize: 10.5, marginTop: 2 },
});