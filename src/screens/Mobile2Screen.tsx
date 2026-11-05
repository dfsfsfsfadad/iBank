import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, PrimaryButton, ReadField, OtpRow } from '../components/ui';
import { ACCOUNTS } from '../components/transfer/TransferForm';
import { mobileStore } from '../data/mobile';
import { useNavigation } from '../navigation/NavigationContext';
import { colors } from '../theme';

// Mobile prepaid — Confirm (OTP)
export function Mobile2Screen() {
  const { navigate } = useNavigation();
  const { acc, phone, amount } = mobileStore;
  const [otp, setOtp] = useState('');

  const from = acc === null ? '' : `**** **** ${ACCOUNTS[acc].label.slice(-4)}`;

  const confirm = () =>
    Alert.alert('Recharge successful', `${amount} → ${phone}`, [{
      text: 'OK',
      onPress: () => { mobileStore.acc = null; mobileStore.phone = ''; mobileStore.amount = ''; navigate('home'); },
    }]);

  return (
    <ScreenShell
      keyboard={
        <View style={styles.dock}>
          <PrimaryButton label="Confirm" active={otp.length > 0} onPress={confirm} />
        </View>
      }
    >
      <TopBar title="Confirm" variant="white" onBack={() => navigate('mobile1')} />
      <View style={styles.body}>
        <Text style={styles.heading}>Confirm transaction information</Text>
        <ReadField label="From" value={from} />
        <ReadField label="To" value={phone} />
        <ReadField label="Amount" value={amount} />
        <Text style={styles.otpLabel}>Get OTP to verify transaction</Text>
        {/* Макет: настоящего SMS нет, "Get OTP" подставляет код автоматически */}
        <OtpRow value={otp} onChangeText={setOtp} canRequest onRequest={() => setOtp('23798')} />
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  body: { paddingHorizontal: 24, paddingTop: 14 },
  heading: { color: colors.textSub, fontSize: 11, marginBottom: 14 },
  otpLabel: { color: colors.textSub, fontSize: 11, marginTop: 6, marginBottom: 8 },
  dock: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 20, backgroundColor: colors.bg },
});
