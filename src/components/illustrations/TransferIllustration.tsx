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

// "Transfer successful" экранының суреті
export function TransferSuccessIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.floor} />
      <View style={styles.phone}>
        <Coin size={30} style={{ position: 'relative' }} />
      </View>
      <View style={styles.wallet}>
        <Ionicons name="wallet" size={56} color={colors.primary} />
      </View>
      <Coin style={{ top: 6, right: 40 }} />
      <Coin size={22} style={{ top: 60, left: 70 }} />
      <Coin size={22} style={{ bottom: 40, right: 28 }} />
      <View style={styles.plant}>
        <Ionicons name="leaf" size={34} color={colors.green} />
      </View>
      <View style={styles.person}>
        <Ionicons name="man" size={44} color={colors.red} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { alignSelf: 'center', width: 280, height: 180, alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 20 },
  floor: { position: 'absolute', bottom: 0, width: 270, height: 70, borderRadius: 999, backgroundColor: colors.lavender },
  phone: { width: 60, height: 108, borderRadius: 12, borderWidth: 3, borderColor: colors.primary, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginLeft: 70, marginBottom: 20 },
  wallet: { position: 'absolute', left: 36, bottom: 22 },
  coin: { position: 'absolute', borderRadius: 999, backgroundColor: colors.orange, alignItems: 'center', justifyContent: 'center' },
  coinText: { color: colors.white, fontWeight: '800' },
  plant: { position: 'absolute', right: 20, bottom: 24 },
  person: { position: 'absolute', bottom: 12, left: 118 },
});
