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

export function PiggyIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.floor} />
      <View style={styles.pig}>
        <View style={styles.pigSnout} />
        <View style={styles.pigEar} />
      </View>
      <View style={styles.phone}>
        <Ionicons name="wallet-outline" size={22} color={colors.primary} />
      </View>
      <Coin style={{ top: 14, left: 40 }} />
      <Coin size={22} style={{ top: 50, right: 36 }} />
      <Coin size={30} style={{ bottom: 26, left: 90 }} />
      <Coin size={22} style={{ bottom: 36, right: 70 }} />
      <Ionicons name="cash" size={34} color={colors.green} style={styles.cash} />
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { alignSelf: 'center', width: 280, height: 170, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 18 },
  floor: { position: 'absolute', bottom: 0, width: 270, height: 66, borderRadius: 999, backgroundColor: colors.lavender },
  pig: { width: 120, height: 84, borderRadius: 42, backgroundColor: '#F7B7A8', marginLeft: 20, marginBottom: 10 },
  pigSnout: { position: 'absolute', right: -6, top: 30, width: 14, height: 20, borderRadius: 6, backgroundColor: '#F09A88' },
  pigEar: { position: 'absolute', top: -8, left: 40, width: 22, height: 22, borderRadius: 4, backgroundColor: '#F09A88', transform: [{ rotate: '20deg' }] },
  phone: { position: 'absolute', left: 80, bottom: 24, width: 44, height: 74, borderRadius: 10, borderWidth: 3, borderColor: colors.primary, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  cash: { position: 'absolute', top: 0, right: 64 },
  coin: { position: 'absolute', borderRadius: 999, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  coinText: { color: colors.white, fontWeight: '800' },
});