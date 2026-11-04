import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenShell } from '../components/layout';
import { TopBar, Field, PrimaryButton, Card, Dropdown } from '../components/ui';
import { TransferSuccessIllustration } from '../components/illustrations';
import { BillCard } from '../components/bill/BillCard';
import { BILL, BILL_ACCOUNTS, billStore } from '../data/bill';
import { useNavigation } from '../navigation/NavigationContext';
import { colors, radius } from '../theme';

export function PayBill2Screen() {
  const { navigate } = useNavigation();
  const [account, setAccount] = useState<string | null>(null);
  const [otp, setOtp] = useState('');
  const active = !!account && otp.length > 0;

  return (
    <ScreenShell>
      <TopBar title="Internet bill" variant="white" onBack={() => navigate('paybill1')} />
      <TransferSuccessIllustration />
      <Text style={styles.period}>{BILL.from} - {BILL.to}</Text>

      <BillCard code={billStore.code} />

      <Card>
        <Dropdown value={account} placeholder="Choose account/ card" options={BILL_ACCOUNTS} onSelect={setAccount} />
        <Text style={styles.label}>Get OTP to verify transaction</Text>
        <View style={styles.otpRow}>
          <View style={{ flex: 1 }}>
            <Field value={otp} onChangeText={setOtp} placeholder="OTP" keyboardType="numeric" />
          </View>
          {/* Макет: нақты SMS жоқ, "Get OTP" кодты автоматты түрде толтырады */}
          <TouchableOpacity
            style={[styles.otpBtn, !account && styles.otpOff]}
            disabled={!account}
            activeOpacity={0.85}
            onPress={() => setOtp('23798')}
          >
            <Text style={[styles.otpText, !account && { color: '#C9CBDD' }]}>Get OTP</Text>
          </TouchableOpacity>
        </View>
        <PrimaryButton label="Pay the bill" active={active} onPress={() => navigate('paybill3')} />
      </Card>
      <View style={{ height: 8 }} />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  period: { color: colors.textSub, fontSize: 10.5, textAlign: 'center', marginTop: -10 },
  label: { color: colors.textSub, fontSize: 12, marginBottom: 8 },
  otpRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  otpBtn: { height: 50, paddingHorizontal: 18, borderRadius: radius.field, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  otpOff: { backgroundColor: '#EDEEF6' },
  otpText: { color: colors.white, fontSize: 13, fontWeight: '700' },
});
