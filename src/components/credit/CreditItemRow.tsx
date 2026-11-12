import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';
import type { CreditItem } from '../../data/credit';

export function CreditItemRow({ item }: { item: CreditItem }) {
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={15} color={colors.white} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>- ${item.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  icon: { width: 30, height: 30, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.text, fontSize: 12, fontWeight: '700' },
  date: { color: colors.textSub, fontSize: 9, marginTop: 2 },
  amount: { color: colors.red, fontSize: 12, fontWeight: '800' },
});