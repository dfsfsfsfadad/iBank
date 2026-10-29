import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

function Coin({ style }: { style: object }) {
  return (
    <View style={[styles.coin, style]}>
      <Text style={styles.coinText}>$</Text>
    </View>
  );
}

export function ExchangeIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.bg} />
      <View style={styles.phone}>
        <Ionicons name="cash" size={34} color={colors.orange} />
      </View>
      <Coin style={{ top: 8, left: 58 }} />
      <Coin style={{ top: 40, right: 56 }} />
      <Coin style={{ top: 96, left: 40 }} />
      <View style={styles.people}>
        <Ionicons name="people" size={46} color={colors.red} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { alignSelf: 'center', width: 260, height: 190, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  bg: { position: 'absolute', width: 170, height: 170, borderRadius: 999, backgroundColor: colors.lavender },
  phone: { width: 84, height: 140, borderRadius: 16, borderWidth: 4, borderColor: colors.primary, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  coin: { position: 'absolute', width: 30, height: 30, borderRadius: 999, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  coinText: { color: colors.white, fontWeight: '800', fontSize: 14 },
  people: { position: 'absolute', bottom: 0, right: 40 },
});
