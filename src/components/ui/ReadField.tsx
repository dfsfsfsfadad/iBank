import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';

// Тек оқуға арналған өріс (Confirm экранында)
export function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  label: { color: colors.textSub, fontSize: 11, marginBottom: 6 },
  box: { height: 46, borderRadius: radius.field, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', paddingHorizontal: 16 },
  value: { color: colors.text, fontSize: 13.5 },
});
