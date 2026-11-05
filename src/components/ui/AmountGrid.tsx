import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme';

// Сетка кнопок выбора суммы ($10 / $50 / ... / Other)
export function AmountGrid({ options, value, onSelect }: {
  options: string[]; value: string | null; onSelect: (v: string) => void;
}) {
  return (
    <View style={styles.grid}>
      {options.map(o => {
        const on = value === o;
        return (
          <TouchableOpacity key={o} style={[styles.chip, on && styles.chipOn]} activeOpacity={0.8} onPress={() => onSelect(o)}>
            <Text style={[styles.text, on && styles.textOn]}>{o}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12, marginTop: 8 },
  chip: { width: '31%', height: 46, borderRadius: 14, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', shadowColor: '#2A2350', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  chipOn: { backgroundColor: colors.primary },
  text: { color: colors.textSub, fontSize: 12.5 },
  textOn: { color: colors.white, fontWeight: '700' },
});
