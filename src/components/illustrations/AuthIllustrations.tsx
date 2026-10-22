import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

function DecorDots() {
  return (
    <>
      <View style={[styles.dot, { top: 18, right: 30, backgroundColor: colors.red }]} />
      <View style={[styles.dot, { bottom: 26, left: 24, width: 10, height: 10, backgroundColor: colors.blue }]} />
      <View style={[styles.dotS, { top: 40, left: 30, backgroundColor: colors.orange }]} />
      <View style={[styles.dotS, { bottom: 40, right: 36, backgroundColor: colors.blue }]} />
    </>
  );
}

export function LockIllustration() {
  return (
    <View style={styles.circle}>
      <DecorDots />
      <Ionicons name="lock-closed" size={40} color={colors.primary} />
    </View>
  );
}

export function PhoneIllustration() {
  return (
    <View style={styles.circle}>
      <DecorDots />
      <View style={styles.phone}>
        <View style={styles.notch} />
        <Ionicons name="chatbox-ellipses-outline" size={18} color={colors.primary} />
      </View>
    </View>
  );
}

export function SuccessIllustration() {
  return (
    <View style={styles.stage}>
      <View style={styles.plantL}><Ionicons name="leaf" size={26} color={colors.green} /></View>
      <View style={styles.plantR}><Ionicons name="leaf" size={26} color={colors.green} /></View>
      <View style={styles.phoneBox}>
        <View style={styles.check}><Ionicons name="checkmark" size={22} color={colors.white} /></View>
      </View>
      <View style={styles.shield}><Ionicons name="shield-checkmark" size={22} color={colors.white} /></View>
      <View style={styles.key}><Ionicons name="key" size={18} color={colors.orange} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignSelf: 'center', width: 150, height: 150, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.16)', alignItems: 'center', justifyContent: 'center', marginVertical: 22, overflow: 'visible' },
  dot: { position: 'absolute', width: 14, height: 14, borderRadius: 999 },
  dotS: { position: 'absolute', width: 8, height: 8, borderRadius: 999 },
  phone: { width: 56, height: 92, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: colors.primary },
  notch: { position: 'absolute', top: 6, width: 22, height: 4, borderRadius: 4, backgroundColor: colors.primary },
  stage: { width: 240, height: 200, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  phoneBox: { width: 90, height: 150, borderRadius: 16, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#C9C2FB' },
  check: { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.green, alignItems: 'center', justifyContent: 'center' },
  shield: { position: 'absolute', right: 30, bottom: 30, width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  key: { position: 'absolute', left: 36, bottom: 24 },
  plantL: { position: 'absolute', left: 8, bottom: 18 },
  plantR: { position: 'absolute', right: 8, bottom: 18 },
});