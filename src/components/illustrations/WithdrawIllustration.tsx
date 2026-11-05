import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

function Coin({ style, size = 26 }: { style: object; size?: number }) {
  return (
    <View style={[styles.coin, { width: size, height: size }, style]}>
      <Text style={[styles.coinText, { fontSize: size * 0.48 }]}>$</Text>
    </View>
  );
}

// Иллюстрация экранов Withdraw
export function WithdrawIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.floor} />
      <View style={styles.phone}>
        <Coin size={28} style={{ position: 'relative' }} />
      </View>
      <View style={styles.wallet}>
        <Ionicons name="wallet" size={60} color={colors.primary} />
      </View>
      <Coin style={{ top: 10, left: 120 }} />
      <Coin size={22} style={{ top: 70, right: 46 }} />
      <Coin size={22} style={{ bottom: 34, left: 40 }} />
      <View style={styles.plant}><Ionicons name="leaf" size={32} color={colors.green} /></View>
      <View style={styles.person}><Ionicons name="man" size={44} color={colors.red} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { alignSelf: 'center', width: 280, height: 180, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 20 },
  floor: { position: 'absolute', bottom: 0, width: 270, height: 70, borderRadius: 999, backgroundColor: colors.lavender },
  phone: { width: 56, height: 104, borderRadius: 12, borderWidth: 3, borderColor: colors.primary, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginLeft: 90, marginBottom: 20 },
  wallet: { position: 'absolute', left: 30, bottom: 26 },
  coin: { position: 'absolute', borderRadius: 999, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  coinText: { color: colors.white, fontWeight: '800' },
  plant: { position: 'absolute', left: 10, bottom: 40 },
  person: { position: 'absolute', bottom: 12, left: 118 },
});
