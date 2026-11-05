import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme';

export type ChartPoint = { m: string; up: number; down: number };

const HALF = 54;

// Простая столбчатая диаграмма: доход вверх (фиолетовый), расход вниз (розовый)
export function BalanceChart({ data, active }: { data: ChartPoint[]; active: string }) {
  return (
    <View style={styles.row}>
      {data.map(d => (
        <View key={d.m} style={styles.col}>
          <View style={[styles.half, { justifyContent: 'flex-end' }]}>
            <View style={[styles.bar, { height: d.up, backgroundColor: colors.primary }]} />
          </View>
          <View style={styles.mid} />
          <View style={[styles.half, { justifyContent: 'flex-start' }]}>
            <View style={[styles.bar, { height: d.down, backgroundColor: colors.red }]} />
          </View>
          <Text style={[styles.label, d.m === active && styles.labelOn]}>{d.m}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 6, marginTop: 14 },
  col: { alignItems: 'center', width: 36 },
  half: { height: HALF, alignItems: 'center' },
  bar: { width: 5, borderRadius: 3 },
  mid: { width: 5, height: 8, backgroundColor: '#F9C9D2' },
  label: { color: colors.textMute, fontSize: 9.5, marginTop: 10 },
  labelOn: { color: colors.primary, fontWeight: '800' },
});
