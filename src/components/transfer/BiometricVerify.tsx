import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme';

export type BiometricKind = 'touch' | 'face';

function FaceIcon({ color }: { color: string }) {
  return (
    <View style={styles.faceBox}>
      <Ionicons name="scan-outline" size={64} color={color} />
      <Ionicons name="happy-outline" size={30} color={color} style={styles.faceInner} />
    </View>
  );
}

// Confirm экранындағы "Touch ID / Face ID" блогы
export function BiometricVerify({ kind, verified, onPress }: {
  kind: BiometricKind; verified: boolean; onPress: () => void;
}) {
  const face = kind === 'face';
  const tint = !face || verified ? colors.primary : '#CFD2E3';
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {face ? 'Use Face ID to verify transaction' : 'Get OTP to verify transaction'}
      </Text>
      <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.7} hitSlop={12}>
        {face ? <FaceIcon color={tint} /> : <Ionicons name="finger-print" size={64} color={tint} />}
      </TouchableOpacity>
    </View>
  );
}

// Touch ID терезесі (макет). Нақты биометрия үшін: npx expo install expo-local-authentication
export function TouchIdDialog({ visible, onSuccess, onCancel }: {
  visible: boolean; onSuccess: () => void; onCancel: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <TouchableOpacity style={styles.dialogBody} activeOpacity={0.7} onPress={onSuccess}>
            <Ionicons name="finger-print" size={44} color={colors.red} />
            <Text style={styles.dialogTitle}>Touch ID for iBank</Text>
            <Text style={styles.dialogSub}>Access to the application</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={onCancel} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 6 },
  label: { color: colors.textSub, fontSize: 11, marginBottom: 12 },
  btn: { alignSelf: 'center', padding: 6 },
  faceBox: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  faceInner: { position: 'absolute' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center' },
  dialog: { width: 270, borderRadius: 14, backgroundColor: colors.white, overflow: 'hidden' },
  dialogBody: { alignItems: 'center', paddingVertical: 18, paddingHorizontal: 16, gap: 6 },
  dialogTitle: { color: colors.text, fontSize: 14, fontWeight: '700', marginTop: 4 },
  dialogSub: { color: colors.textSub, fontSize: 11.5 },
  cancel: { height: 44, borderTopWidth: 1, borderTopColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  cancelText: { color: '#007AFF', fontSize: 15, fontWeight: '600' },
});
