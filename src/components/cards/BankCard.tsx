import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../theme';

const BLUE = ['#1B1464', '#2B2FB8'] as const;
const ORANGE = ['#FFB020', '#FFC857'] as const;

// Банковская карта (синяя VISA / оранжевая)
export function BankCard({
  variant = 'blue', stack, name = 'John Smith', tier = 'Amazon Platinium',
  number = '4756   ••••   ••••   9018', balance = '$3.469.52',
}: {
  variant?: 'blue' | 'orange'; stack?: boolean;
  name?: string; tier?: string; number?: string; balance?: string;
}) {
  const orange = variant === 'orange';
  return (
    <View style={stack && styles.stackWrap}>
      {stack && <View style={styles.under} />}
      <LinearGradient colors={orange ? ORANGE : BLUE} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <View style={[styles.circleBig, orange && styles.circleBigOrange]} />
        <View style={[styles.circleSmall, orange && styles.circleSmallOrange]} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.tier}>{tier}</Text>
        <Text style={styles.number}>{number}</Text>
        <View style={styles.bottom}>
          <Text style={styles.balance}>{balance}</Text>
          {orange ? (
            <View style={styles.toggle}>
              <View style={[styles.dot, { backgroundColor: 'rgba(255,255,255,0.95)' }]} />
              <View style={[styles.dot, { backgroundColor: 'rgba(255,255,255,0.55)', marginLeft: -8 }]} />
            </View>
          ) : (
            <Text style={styles.logo}>VISA</Text>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  stackWrap: { marginBottom: 8 },
  under: { position: 'absolute', left: 14, right: 14, bottom: -8, height: 40, borderRadius: 16, backgroundColor: '#F0506E' },
  card: { borderRadius: radius.card, padding: 18, overflow: 'hidden', shadowColor: '#2A2350', shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 8 },
  circleBig: { position: 'absolute', top: -50, right: -30, width: 170, height: 170, borderRadius: 999, backgroundColor: 'rgba(59,130,246,0.85)' },
  circleBigOrange: { backgroundColor: 'rgba(255,255,255,0.22)' },
  circleSmall: { position: 'absolute', bottom: -30, right: 40, width: 90, height: 90, borderRadius: 999, backgroundColor: 'rgba(147,197,253,0.35)' },
  circleSmallOrange: { backgroundColor: 'rgba(255,255,255,0.18)' },
  name: { color: colors.white, fontSize: 18, fontWeight: '800' },
  tier: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 14 },
  number: { color: colors.white, fontSize: 14, fontWeight: '600', letterSpacing: 1, marginTop: 8 },
  bottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 12 },
  balance: { color: colors.white, fontSize: 18, fontWeight: '800' },
  logo: { color: colors.white, fontStyle: 'italic', fontWeight: '900', fontSize: 18, letterSpacing: 1 },
  toggle: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 20, height: 20, borderRadius: 999 },
});
