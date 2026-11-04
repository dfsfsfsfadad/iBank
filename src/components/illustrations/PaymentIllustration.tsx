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

// "Transaction successfully" экранының суреті
export function PaymentSuccessIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.floor} />
      <View style={styles.cardBack} />
      <View style={styles.cardFront}>
        <View style={styles.stripe} />
        <View style={styles.stripeS} />
      </View>
      <View style={styles.shield}>
        <Ionicons name="shield-checkmark" size={26} color={colors.white} />
      </View>
      <Coin style={{ top: 22, right: 46 }} />
      <Coin size={22} style={{ bottom: 34, right: 30 }} />
      <Coin size={22} style={{ bottom: 22, right: 62 }} />
      <View style={styles.plantL}><Ionicons name="leaf" size={30} color={colors.green} /></View>
      <View style={styles.plantR}><Ionicons name="leaf" size={30} color={colors.green} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { alignSelf: 'center', width: 280, height: 170, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 18 },
  floor: { position: 'absolute', bottom: 0, width: 270, height: 66, borderRadius: 999, backgroundColor: colors.lavender },
  cardBack: { position: 'absolute', top: 26, left: 56, width: 120, height: 78, borderRadius: 12, backgroundColor: colors.red, transform: [{ rotate: '-10deg' }] },
  cardFront: { width: 128, height: 82, borderRadius: 12, backgroundColor: colors.primary, padding: 12, justifyContent: 'flex-end', gap: 6, transform: [{ rotate: '4deg' }] },
  stripe: { width: 70, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.7)' },
  stripeS: { width: 40, height: 6, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.4)' },
  shield: { position: 'absolute', bottom: 18, left: 96, width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primary, borderWidth: 3, borderColor: colors.white, alignItems: 'center', justifyContent: 'center' },
  coin: { position: 'absolute', borderRadius: 999, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  coinText: { color: colors.white, fontWeight: '800' },
  plantL: { position: 'absolute', left: 14, bottom: 20 },
  plantR: { position: 'absolute', right: 8, bottom: 22 },
});
