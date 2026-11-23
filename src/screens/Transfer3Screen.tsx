import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton, ReadField, OtpRow } from '../components/ui';
import { BiometricVerify, TouchIdDialog } from '../components/transfer/BiometricVerify';
import { ACCOUNTS, transferStore } from '../components/transfer/TransferForm';
import { authenticateTouchId, isTouchIdAvailable } from '../data/biometric';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

const FEE = '10$';

// Transfer — Confirm
//  • карта нөмірі / сол банк → Touch ID
//  • басқа банк (tx = 2)     → Beneficiary bank + OTP
export function Transfer3Screen() {
  const { navigate } = useNavigation();
  const v = transferStore.values;
  const otpMode = v.tx === 2;
  const [verified, setVerified] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [otp, setOtp] = useState('');

  const from = v.acc === null ? '' : `**** **** ${ACCOUNTS[v.acc].label.slice(-4)}`;
  const ready = otpMode ? otp.length > 0 : verified;

  const onTouchId = async () => {
    if (!(await isTouchIdAvailable())) {
      if (__DEV__) return setDialog(true); // эмулятор: ескі макет терезесі
      return Alert.alert('Touch ID unavailable', 'Add a fingerprint in your device settings.');
    }
    const r = await authenticateTouchId('Confirm transaction');
    if (r.ok) setVerified(true);
    else if (r.error !== 'user_cancel') Alert.alert('Authentication failed', 'Please try again.');
  };

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Confirm" active={ready} onPress={() => navigate('transfer4')} />
        </View>
      }
    >
      <TopBar title="Confirm" variant="white" onBack={() => navigate('transfer2')} />
      <View style={styles.body}>
        <Text style={styles.heading}>Confirm transaction information</Text>
        <ReadField label="From" value={from} />
        <ReadField label="To" value={v.name} />
        {otpMode && <ReadField label="Beneficiary bank" value={v.bank ?? ''} />}
        <ReadField label="Card number" value={v.card} />
        <ReadField label="Transaction fee" value={FEE} />
        <ReadField label="Content" value={v.content} />
        <ReadField label="Amount" value={`$${v.amount}`} />
        {otpMode ? (
          <View style={styles.otp}>
            <Text style={styles.otpLabel}>Get OTP to verify transaction</Text>
            {/* Макет: нақты SMS жоқ, "Get OTP" кодты автоматты түрде толтырады */}
            <OtpRow value={otp} onChangeText={setOtp} canRequest onRequest={() => setOtp('23798')} />
          </View>
        ) : (
          <BiometricVerify kind="touch" verified={verified} onPress={onTouchId} />
        )}
      </View>
      <TouchIdDialog
        visible={dialog}
        onSuccess={() => { setVerified(true); setDialog(false); }}
        onCancel={() => setDialog(false)}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 14 },
  heading: { color: colors.textSub, fontSize: 11, marginBottom: 14 },
  otp: { marginTop: 6 },
  otpLabel: { color: colors.textSub, fontSize: 11, marginBottom: 8 },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});