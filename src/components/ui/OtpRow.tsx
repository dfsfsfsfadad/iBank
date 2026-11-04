import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Field } from './Field';
import { colors, radius } from '../../theme';

// OTP енгізу өрісі + "Get OTP" батырмасы
export function OtpRow({ value, onChangeText, canRequest, onRequest }: {
  value: string; onChangeText: (t: string) => void; canRequest: boolean; onRequest: () => void;
}) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Field value={value} onChangeText={onChangeText} placeholder="OTP" keyboardType="numeric" />
      </View>
      <TouchableOpacity
        style={[styles.btn, !canRequest && styles.off]}
        disabled={!canRequest}
        activeOpacity={0.85}
        onPress={onRequest}
      >
        <Text style={[styles.text, !canRequest && { color: '#C9CBDD' }]}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  btn: { height: 50, paddingHorizontal: 18, borderRadius: radius.field, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  off: { backgroundColor: '#EDEEF6' },
  text: { color: colors.white, fontSize: 13, fontWeight: '700' },
});
